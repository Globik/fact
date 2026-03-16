 const GOAL_AMOUNT = 10000;
        let currentAmount = 60;
        let donorsCount = 1;
        let donations = [
            {
                username: 'Тестовый донатер',
                amount: 60,
                message: 'Начинаем сбор!'
            }
        ];

        // DOM элементы
        const widget = document.getElementById('widget');
        const stats = document.getElementById('stats');
        const goalRemaining = document.getElementById('goalRemaining');
        const currentAmountEl = document.getElementById('currentAmount');
        const goalAmountEl = document.getElementById('goalAmount');
        const donorsCountEl = document.getElementById('donorsCount');
        const progressBarEl = document.getElementById('progressBar');
        const progressPercentEl = document.getElementById('progressPercent');
        const remainingAmountEl = document.getElementById('remainingAmount');
        const donationsListEl = document.getElementById('donationsList');
        const toast = document.getElementById('toast');
        const toastUsername = document.getElementById('toastUsername');
        const toastAmount = document.getElementById('toastAmount');
        const toastMessage = document.getElementById('toastMessage');
        const newDonationIndicator = document.getElementById('newDonationIndicator');
  let newDonationTimer;
        let toastTimer;

        // Функция обновления UI
        function updateUI() {
            currentAmountEl.innerHTML = `${currentAmount} <span>₽</span>`;
            donorsCountEl.textContent = donorsCount;
            
            const percent = Math.min(100, (currentAmount / GOAL_AMOUNT) * 100);
            progressBarEl.style.width = `${percent}%`;
            progressPercentEl.textContent = `${percent.toFixed(1)}%`;
            
            const remaining = Math.max(0, GOAL_AMOUNT - currentAmount);
            remainingAmountEl.textContent = `${remaining} ₽`;
            
            updateDonationsList();
        }

        // Функция обновления списка донатов
        function updateDonationsList() {
            donationsListEl.innerHTML = '';
            
            donations.slice(-10).reverse().forEach((donation, index) => {
                const item = document.createElement('div');
                item.className = 'donation-item';
                // Если это самый новый донат (первый в списке), добавляем класс new
                if (index === 0 && donation.isNew) {
                    item.classList.add('new');
                    // Убираем флаг new через 5 секунд
                    setTimeout(() => {
                        item.classList.remove('new');
                    }, 5000);
                }
                item.innerHTML = `
                    <div>
                        <div class="donation-user">${donation.username}</div>
                        <div class="donation-message">${donation.message || 'Без сообщения'}</div>
                    </div>
                    <div class="donation-amount">+${donation.amount} ₽</div>
                `;
                donationsListEl.appendChild(item);
            });
        }

        // Функция показа всплывающего уведомления
         function showToast(donation) {
            // Очищаем предыдущий таймер
            if (toastTimer) clearTimeout(toastTimer);
            
            // Заполняем данные
            toastUsername.textContent = donation.username || 'Аноним';
            toastAmount.textContent = `+${donation.amount} ₽`;
            toastMessage.textContent = donation.message || 'Без сообщения';
            
            // Показываем уведомление
            toast.classList.add('show');
            
            // Скрываем через 5 секунд
            toastTimer = setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }

        // Функция анимации нового доната
            function animateNewDonation(amount) {
            // 1. Пульсация на всём виджете
            widget.classList.add('new-donation-pulse');
            setTimeout(() => {
                widget.classList.remove('new-donation-pulse');
            }, 1500);

            // 2. Подсветка блока статистики
            stats.classList.add('new-donation');
            setTimeout(() => {
                stats.classList.remove('new-donation');
            }, 1000);

            // 3. Подсветка блока "осталось"
            goalRemaining.classList.add('new-donation');
            setTimeout(() => {
                goalRemaining.classList.remove('new-donation');
            }, 1000);

            // 4. Анимация цифры текущей суммы
            currentAmountEl.classList.add('amount-changed');
            setTimeout(() => {
                currentAmountEl.classList.remove('amount-changed');
            }, 500);

            // 5. Показываем индикатор "Новый донат!"
            newDonationIndicator.style.display = 'block';
            if (newDonationTimer) clearTimeout(newDonationTimer);
            newDonationTimer = setTimeout(() => {
                newDonationIndicator.style.display = 'none';
                   }, 3000);
        }

        // Функция добавления нового доната
        function addDonation(donation) {
            // Помечаем донат как новый
            const newDonation = {
                username: donation.username || 'Аноним',
                amount: donation.amount,
                message: donation.message || '',
                isNew: true
            };
            
            // Добавляем в историю
            donations.push(newDonation);
            
            // Увеличиваем сумму
            const previousAmount = currentAmount;
            currentAmount += donation.amount;
            
            // Увеличиваем счетчик донатеров
            donorsCount++;
            
            // Обновляем UI
            updateUI();
               animateNewDonation(donation.amount);
            
            // Показываем всплывающее уведомление
            showToast(donation);
            
            // Логируем
            console.log('💰 Новый донат:', donation.amount, '₽ от', donation.username);
        }
          updateUI();
        

        // Для теста: добавляем случайный донат каждые 10 секунд
        setInterval(() => {
            const testDonation = {
                username: ['Иван', 'Петр', 'Анна', 'Дмитрий', 'Елена'][Math.floor(Math.random() * 5)],
                amount: Math.floor(Math.random() * 500) + 50,
                message: ['Крутой стрим!', 'За трико!', 'Топ', 'Лови донат', ''][Math.floor(Math.random() * 5)]
            };
            addDonation(testDonation);
        }, 10000);
        setInterval(()=>{
			let us = Math.floor(Math.random()*200)+ 100;
			janusCount.textContent = us;
		},1000);
async function fakeMessage(){
	try{
		 let reqi = await fetch('/donationalerts/getFake', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({ tok: "hello" })});
	if(reqi.ok){
		let config = await reqi.json();
		console.log(config);
	}
	}catch(e){console.log(e);}
}
function doDonation(obj){
	console.log(obj);
	addDonation({username: obj.username, message: obj.message, amount: obj.amount });
}
async function getListOfDonation(){
	try{
		 let reqi = await fetch('/donationalerts/list', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({ tok: "hello" })});
	if(reqi.ok){
		let config = await reqi.json();
		console.log(config.data.data);
		let b = config.data.data;
		if(b.length > 0){
			//currentAmount+=Number(b[0].amount_in_user_currency)
			b.forEach(function(el, i){
				currentAmount+=Number(el.amount_in_user_currency);
				addDonation({username: el.username, message: (el.message?el.message:'no text'),amount: el.amount });
			});
		}
	}else{
		console.log('something wrong');
	}
	}catch(e){console.log(e);}
}
getListOfDonation();
