const { nav } = require('./nav.js')
const { login } = require('./login.js');
const jstream = function(n){
	return `<html>
	<head><title>live stream</title>
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<meta itemprop="description" content="Видео стрим из спальни круглые сутки"/>
	<link rel="icon" href="/favicon.ico">
	<link href="/css/main22.css" rel="stylesheet">
		<link href="/css/login.css" rel="stylesheet">
		<link href="/css/mediabox2.css" rel="stylesheet"> 
	<link href="/css/streamjanus.css" rel="stylesheet">
		<link href="/css/donation.css" rel="stylesheet">
	<script src="/js/globalik.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/9.0.3/adapter.min.js" ></script>
	<script src="/js/janus.js"></script>
	<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script> -->
	<script>window.yaContextCb=window.yaContextCb||[]</script>
    <script src="https://yandex.ru/ads/system/context.js" async></script>
	</head><body>
	${nav(n)}
	<input type="hidden" id="TOK" value="${n.tok}"/>
	<input type="hidden" id="userName" value="${n.user?n.user.name:'anon'}">
	<a href="/">back</a><br><br><noscript>Javascript disabled</noscript>
	
	<div id="status"></div>
	<div><b>Online: </b><span id="janusCount">0</span></div> 
	<article class="slot"><div id="videocontainer"><div id="znakcontainer" onclick="start(this);"><img src="/img/play2.svg"/></div><video id="remotevideo" autoplay poster="/img/gold/some.jpg"></video>
	<audio id="audioElement" autoplay></audio>
	</div>
	<div id="chatcontainer"><div id="chatpanel"><b>Chat</b></div><div id="chatbox"></div>
	<div id="chatfooter"><div id="txtcontainer"><textarea id="txtarea" maxlength="150" placeholder="Your message"></textarea><button onclick="send(this);">send</button></div></div></div>
	</article><!-- <button onclick="fakeMessage();">fake donate</button><button onclick="getListOfDonation();">get list</button> -->
	<br><br>
	<div id="divDonate"><a href="https://www.donationalerts.com/r/globik2" target="_blank"><button id="btnDonate">DONATE</button></a></div>
	 <br><br><br><div class="widget" id="widget">
        <!-- Индикатор нового доната (появляется на 3 секунды) -->
        <div class="new-donation-indicator" id="newDonationIndicator" style="display: none;">
            🔥 Новый донат!
        </div>

        <div class="header">
            <h2>🎯 На вибратор</h2>
            <p>Поддержи стримера!</p>
        </div>

        <!-- Статистика -->
        <div class="stats" id="stats">
            <div class="stat-item">
                <div class="stat-label">Собрано</div>
                <div class="stat-value" id="currentAmount">0 <span>₽</span></div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Цель</div>
                <div class="stat-value" id="goalAmount">10000 <span>₽</span></div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Донатеров</div>
                <div class="stat-value" id="donorsCount">0</div>
            </div>
        </div>
         <!-- Прогресс бар -->
        <div class="progress-container">
            <div class="progress-header">
                <span>Прогресс</span>
                <span id="progressPercent">0%</span>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" id="progressBar"></div>
            </div>
        </div>

        <!-- Сколько осталось -->
        <div class="goal-remaining" id="goalRemaining">
            <div class="amount" id="remainingAmount">10000 ₽</div>
            <div class="text">осталось до цели</div>
        </div>

        <!-- Последние донаты -->
        <div class="recent-donations">
            <h3>📋 Последние донаты</h3>
            <div id="donationsList"></div>
        </div>
    </div>

    <!-- Всплывающее уведомление -->
    <div class="toast" id="toast">
        <div class="toast-username" id="toastUsername"></div>
        <div class="toast-amount" id="toastAmount"></div>
        <div class="toast-message" id="toastMessage"></div>
    </div>
    ${login(n)}
	 <script src="/js/jstream.js"></script> 
	 <script src="/js/login4.js"></script>
	<!-- <script src="/js/hlsstream.js"></script> --> 
	<footer id="pfooter">(c)2025</footer> 
	 <script>
	
	 
window.yaContextCb.push(()=>{
    // if(Ya.Context.AdvManager.getPlatform()==='desktop'){
		 
		 Ya.Context.AdvManager.render({
			 "blockId":"R-A-14255767-2",
			// "renderTo":"yandex_rtb_R-A-12098170-1
			"type":"floorAd",
			"platform":"desktop",
			"onClose":function(){
			console.log("Reklama closed")
		
		}
			})
		})
		// }else{
		 window.yaContextCb.push(()=>{
		 Ya.Context.AdvManager.render({
		 "blockId":"R-A-14255767-1",
		 "type":"floorAd",
			"platform":"touch",
			
		})
			
			})
	 </script>
	 <script src="/js/donation.js"></script>
	</body></html>`;
}
module.exports = {jstream }
