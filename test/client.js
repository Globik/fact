const axios = require('axios');
const { default: axiosRetry } = require('axios-retry');
const PQueue = require('p-queue').default;

// === КОНФИГУРАЦИЯ ===
const API_BASE_URL = 'https://bitaps.com'; 
const REQUEST_LIMIT = 60;
const WINDOW_MS = 5000;
const BLOCK_DURATION_MS = 180000;
const url = 'https://api.bitaps.com/eth/testnet/v1/';
const wallet_id = 'ETHviSjvcPsm4epXYza7yMAKaTrw8UmFM3mEbNq91ApGgBUMQceDe';
const address = '0x2D981f69dD76aA2fa1d3296459ffA41160BD5203';
// 0x49eb086e2f1c6f8fe01ad77d92503670bdcf96a9b8909362f883b0ed3672631e
// https://sepolia.etherscan.io/address/0x16A8DaC8D2f04017DEa8184826171dCEa76E2bff
async function createWallet(){
	try{
		let d = await axios.post(url + 'create/wallet', {});
		if(d.status == 200){
			console.log('d ', d.data);
		}
	}catch(err){
		if(err.response){
			console.log(err.response.data);
		}else{
			console.log(err.name);
		}
	}
}
// === СОСТОЯНИЕ ===
const rateLimitState = {
    remaining: REQUEST_LIMIT,
    resetTime: null,
    consecutive429: 0,
    last429Time: 0,
    blockEndTime: null,
    isPaused: false
};

// === ОЧЕРЕДЬ ===
const queue = new PQueue({
    concurrency: 10,
    interval: WINDOW_MS,
    intervalCap: REQUEST_LIMIT,
    carryoverConcurrencyCount: true
});

queue.on('active', () => {
    console.log(`📦 Очередь: ${queue.size} ожидает, ${queue.pending} выполняется`);
});

// === AXIOS ===
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000*100,
    headers: { 'Content-Type': 'application/json' }
});

axiosRetry(apiClient, {
    retries: 2,
    retryCondition: (error) => {
        return axiosRetry.isNetworkError(error) || 
               (error.response?.status >= 500 && error.response?.status < 600);
    },
    retryDelay: axiosRetry.exponentialDelay,
    shouldResetTimeout: true
});

// === ФУНКЦИИ ===

function updateRateLimitFromHeaders(headers) {
    if (!headers) return;
    if (headers['ratelimit-remaining'] !== undefined) {
        rateLimitState.remaining = parseInt(headers['ratelimit-remaining'], 10);
    }
    if (headers['ratelimit-reset'] !== undefined) {
        rateLimitState.resetTime = parseInt(headers['ratelimit-reset'], 10);
    }
}

function calculateWaitTimeAfter429() {
    if (rateLimitState.resetTime) {
        const nowSec = Math.floor(Date.now() / 1000);
        const waitSec = rateLimitState.resetTime - nowSec + 2;
        // Защита от отрицательного времени, если сервер отдал прошлое время
        return Math.max(waitSec, 5) * 1000; 
    }
    return 60000; 
}

async function handle429Error(error) {
    rateLimitState.consecutive429++;
    rateLimitState.last429Time = Date.now();
    updateRateLimitFromHeaders(error.response?.headers);

    console.warn(`\n⚠️  ПОЛУЧЕНА ОШИБКА 429 (Попытка #${rateLimitState.consecutive429})`);

    if (rateLimitState.consecutive429 >= 2 && (Date.now() - rateLimitState.last429Time < 10000)) {
        if (!rateLimitState.blockEndTime) {
            rateLimitState.blockEndTime = Date.now() + BLOCK_DURATION_MS;
            console.error(`🚨 ОБНАРУЖЕНА БЛОКИРОВКА IP! Ожидание ${BLOCK_DURATION_MS/1000} сек...`);
        }
    }

    const waitMs = calculateWaitTimeAfter429();
    console.log(`⏳ Пауза очереди на ${Math.round(waitMs / 1000)} сек`);

    queue.pause();
    rateLimitState.isPaused = true;

    await new Promise(resolve => setTimeout(resolve, waitMs));

    if (rateLimitState.blockEndTime) {
        const now = Date.now();
        if (now < rateLimitState.blockEndTime) {
            const remainingBlock = rateLimitState.blockEndTime - now;
            console.log(`🔒 Блокировка активна. Доп. ожидание ${Math.round(remainingBlock / 1000)} сек`);
            await new Promise(resolve => setTimeout(resolve, remainingBlock));
        }
        rateLimitState.blockEndTime = null;
        console.log('✅ Блокировка предположительно снята');
    }

    rateLimitState.consecutive429 = 0;
    rateLimitState.isPaused = false;
    queue.start();
    console.log('✅ Очередь возобновлена\n');
}

// === ГЛАВНАЯ ФУНКЦИЯ ЗАПРОСА ===
// method: 'get' | 'post' | 'put' и т.д.
async function sendRequest(method, endpoint, payload = null) {
    return queue.add(async () => {
        const requestId = payload?.id || 'unknown';
        const startTime = Date.now();

        // 🔒 ПРОВЕРКА БЛОКИРОВКИ
        if (rateLimitState.blockEndTime && Date.now() < rateLimitState.blockEndTime) {
            const waitMs = rateLimitState.blockEndTime - Date.now();
            console.log(`🔒 Активная блокировка. Ожидание ${Math.round(waitMs / 1000)} сек`);
            await new Promise(resolve => setTimeout(resolve, waitMs));
            rateLimitState.blockEndTime = null;
        }

        // 📊 ПРОВЕРКА ЛИМИТА
        if (rateLimitState.remaining <= 0 && rateLimitState.resetTime) {
            const resetMs = rateLimitState.resetTime * 1000;
            const now = Date.now();
            if (now < resetMs) {
                const waitMs = resetMs - now + 1000;
                console.log(`📊 Лимит исчерпан. Ожидание ${Math.round(waitMs / 1000)} сек`);
                await new Promise(resolve => setTimeout(resolve, waitMs));
                rateLimitState.remaining = REQUEST_LIMIT;
            }
        }

        while (queue.isPaused || rateLimitState.isPaused) {
            await new Promise(r => setTimeout(r, 100));
        }

        try {
            // ✅ ИСПРАВЛЕНИЕ: Явно используем метод
            let response;
            if (method.toLowerCase() === 'get') {
                response = await apiClient.get(endpoint);
            } else if (method.toLowerCase() === 'post') {
                response = await apiClient.post(endpoint, payload);
            } else {
                response = await apiClient.request({ method, url: endpoint, data: payload });
            }
            
            rateLimitState.consecutive429 = 0;
            updateRateLimitFromHeaders(response.headers);

            const duration = Date.now() - startTime;
            console.log(`✅ [${requestId}] Успех (${duration}мс) | Осталось: ${rateLimitState.remaining}`);
            
            return response.data;

        } catch (error) {
            if (error.response?.headers) {
                updateRateLimitFromHeaders(error.response.headers);
            }

            if (error.response?.status === 429) {
                await handle429Error(error);
                if (rateLimitState.consecutive429 < 2) {
                    console.log(`🔄 Повтор запроса #${requestId} после паузы`);
                    return sendRequest(method, endpoint, payload);
                } else {
                    throw new Error(`Запрос #${requestId} не выполнен: превышен лимит 429`);
                }
            }

            const duration = Date.now() - startTime;
            console.log(`❌ [${requestId}] Ошибка ${error.response?.status || 'NET'} (${duration}мс): ${error.message}`);
            throw error;
        }
    });
}

// === ЗАПУСК ===
async function main() {
    console.log('🚀 СТАРТ ТЕСТА');
    console.log(`📊 Лимит: ${REQUEST_LIMIT} запросов / ${WINDOW_MS/1000} сек\n`);

    const startTime = Date.now();
    const tasks = [];

    // Пример: 70 запросов
    for (let i = 1; i <= 70; i++) {
        tasks.push(
            sendRequest('get',url+ 'wallet/state/' + wallet_id, { id: i }) // ✅ Явно указываем 'post'
                .catch(err => ({ error: err.message }))
        );
        await new Promise(r => setTimeout(r, 100)); 
    }

    const results = await Promise.allSettled(tasks);
    const successCount = results.filter(r => r.status === 'fulfilled' && !r.value?.error).length;
    const errorCount = results.filter(r => r.status === 'rejected' || r.value?.error).length;
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n' + '='.repeat(50));
    console.log('🏁 ТЕСТ ЗАВЕРШЁН');
    console.log(`⏱️  Время: ${duration} сек`);
    console.log(`✅ Успешно: ${successCount}`);
    console.log(`❌ Ошибки: ${errorCount}`);
    console.log('='.repeat(50));
}

main().catch(console.error);
