const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Хранилище для подсчета запросов
let requestCount = 0;
const MAX_REQUESTS = 5;        // Лимит запросов
const WINDOW_MS = 10000;       // Окно времени (10 секунд)
let windowStart = Date.now();

// Сброс счетчика каждые 10 секунд
setInterval(() => {
    requestCount = 0;
    windowStart = Date.now();
    console.log('\n--- Окно запросов сброшено ---\n');
}, WINDOW_MS);

app.post('/api/data', (req, res) => {
    const now = Date.now();
    
    // Проверка: вышло ли время текущего окна
    if (now - windowStart > WINDOW_MS) {
        requestCount = 0;
        windowStart = now;
    }

    // Если лимит превышен
    if (requestCount >= MAX_REQUESTS) {
        const retryAfterSeconds = Math.ceil((windowStart + WINDOW_MS - now) / 1000);
        console.log(`❌ 429: Лимит превышен. Ждем ${retryAfterSeconds} сек.`);
        
        res.set('Retry-After', retryAfterSeconds.toString());
        return res.status(429).json({
            error: 'Too Many Requests',
            retryAfter: retryAfterSeconds
        });
    }

    // Успешный запрос
    requestCount++;
    console.log(`✅ Запрос #${requestCount}/${MAX_REQUESTS} принят`);
    
    res.json({
        success: true,
        requestId: requestCount,
        timestamp: new Date().toISOString(),
        data: req.body
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📊 Лимит: ${MAX_REQUESTS} запросов каждые ${WINDOW_MS/1000} сек\n`);
});
