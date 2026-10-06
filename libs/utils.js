const obid = function () {
  let tst = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    tst +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};
 
     const get_fake_msgs = function(n){
	let html = '';
	  let lastMessageDateKey = null;
	if(Array.isArray(n.fake_msgs)){
		n.fake_msgs.forEach(function(msg,i){
		//let r = formatChatTime(el.created_at);
		const msgDate = new Date(msg.created_at);
		const currentDateKey = `${msgDate.getFullYear()}-${msgDate.getMonth()}-${msgDate.getDate()}`;
	if (lastMessageDateKey === null || currentDateKey !== lastMessageDateKey) {
		 const formattedHeaderDate = msgDate.toLocaleDateString('ru-RU', { 
                day: 'numeric', 
                month: 'long' 
            });
		html+= `<div class="date-divider"><h1 class="h5-day">${formattedHeaderDate}</h1></div>`;
		lastMessageDateKey = currentDateKey;
	}
		html+=`<div class="msg-cont">${getStrForChat(msg)}</div>`;
		});
	}
	return html;
	} 
	const getStrForChat = function(msg){
 return `<div class="nick-cont"><b>${msg.fromi}:</b></div><div class="msg">${esci(msg.message)}</div><div class="time-cont"><span class="msg-time">${formatTimeOnly(msg.created_at?msg.created_at:Date().toString())}</span></div>`;

	}
	
	/**
 * Функция для рендера списка сообщений с группировкой по дням
 * @param {Array} messages - массив объектов сообщений [{ id, text, createdAt }, ...]
 * @returns {string} - HTML-строка
 */
function renderChatMessages(messages) {
    let html = '';
    
    // Переменная для хранения даты последнего обработанного сообщения
    // Изначально null, чтобы первое сообщение точно попало под условие "новая дата"
    let lastMessageDateKey = null; 

    // Предполагаем, что messages уже отсортированы по времени возрастания (старые сверху, новые снизу)
    // Или наоборот, главное — последовательность должна быть единой
    
    messages.forEach((msg, index) => {
        const msgDate = new Date(msg.createdAt); // Парсим дату из ответа сервера
        
        // Создаем уникальный ключ для сравнения дат (только год-месяц-день)
        // Это надежнее, чем сравнивать объекты Date напрямую
        const currentDateKey = `${msgDate.getFullYear()}-${msgDate.getMonth()}-${msgDate.getDate()}`;

        // ПРОВЕРКА: Нужно ли рисовать заголовок?
        // Рисуем, если это первое сообщение ИЛИ если дата отличается от предыдущей
        if (lastMessageDateKey === null || currentDateKey !== lastMessageDateKey) {
            
            // Форматируем дату красиво для заголовка (например, "3 октября")
            const formattedHeaderDate = msgDate.toLocaleDateString('ru-RU', { 
                day: 'numeric', 
                month: 'long' 
            });

            html += `<div class="date-divider"><h1>${formattedHeaderDate}</h1></div>`;
            
            // Обновляем ключ последней видимой даты
            lastMessageDateKey = currentDateKey;
        }

        // Добавляем само сообщение
        html += `
            <div class="message-item">
                <div class="author">${msg.authorName}</div>
                <div class="text">${msg.text}</div>
                <!-- Время внутри сообщения можно оставить мелким шрифтом -->
                <div class="time-small">${formatTimeOnly(msg.createdAt)}</div>
            </div>
        `;
    });

    return html;
}

// Вспомогательная функция только для времени (ЧЧ:ММ), без даты
const formatTimeOnly = function(dateString) {
    const d = new Date(dateString);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	const html_sA={
	'\n':' ',
	'&':'&amp',
	'<':'&lt;',
	'>':'&gt;',
	'"':'&quot;',
	"'":'&#x27;',
	'/':'&#x2F;'
	}
	const er_sA=/[\n&<>"'\/]/g;
	
	const esci = function(str){
		return (''+str).replace(er_sA,function(m){return html_sA[m];});
		}
	const formatChatTime = function(dateString) {
    // 1. Парсим исходную строку в объект Date
    const messageDate = new Date(dateString);
    
    // Проверка на корректность даты
    if (isNaN(messageDate.getTime())) {
        return "Некорректная дата";
    }

    // 2. Получаем текущую дату и время
    const now = new Date();
    
    // 3. Сбрасываем время до начала суток для обоих объектов, чтобы сравнивать только дни
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMessageDay = new Date(
        messageDate.getFullYear(), 
        messageDate.getMonth(), 
        messageDate.getDate()
    );

    // 4. Вычисляем разницу в миллисекундах
    const diffInMs = startOfToday - startOfMessageDay;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // 5. Логика вывода
    let out = {}
    let result = "";
	result = messageDate.toLocaleTimeString('ru-RU', { 
            hour: 'numeric', 
            minute: '2-digit' 
        });
        out.time = result;
    if (diffInDays === 0) {
        // Сегодня: выводим время ЧЧ:ММ
        // Используем toLocaleTimeString для получения формата без секунд
      //  result = messageDate.toLocaleTimeString('ru-RU', { 
          //  hour: 'numeric', 
          //  minute: '2-digit' 
      //  });
        
        // Если нужно именно "4:15", а не "04:15" или "16:15", можно немного доработать:
        // Но стандартный ru-RU часто дает 2 цифры. Для строгого вида "H:mm":
       // const hours = messageDate.getHours();
       // const minutes = String(messageDate.getMinutes()).padStart(2, '0');
       // result = `${hours}:${minutes}`;

    } 
    //else if (diffInDays === 1) {
        // Вчера
      //  result = "вчера";
    //} 
   // else if (diffInDays > 1 && diffInDays < 7) {
        // В пределах недели (например, позавчера, 3 дня назад)
        // Можно вывести день недели, если хотите более информативно
      //  result = messageDate.toLocaleDateString('ru-RU', { weekday: 'long' });
    //} 
    else {
        // Более 7 дней назад: выводим дату ДД МЕСЯЦ
        let result2 = messageDate.toLocaleDateString('ru-RU', { 
            day: 'numeric', 
            month: 'long' // Краткое название месяца, например: 5 окт
        });
        out.day = result2;
        // Если нужно полное название месяца ("5 октября"), замените 'short' на 'long':
        // result = messageDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    }
 return out;
   
}
/*
// Пример использования с вашей строкой:
const rawTime = "Sun Oct 04 2026 17:32:20 GMT+0500 (Yekaterinburg Standard Time)";
console.log(formatChatTime(rawTime)); 

// Допустим, сегодня 6 октября 2026 года:
// Результат будет: "октября 4" (или "4 окт" в зависимости от настроек локали браузера/системы)
*/

module.exports = { obid ,esci, formatChatTime, get_fake_msgs, getStrForChat,formatTimeOnly }
