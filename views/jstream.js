const jstream = function(n){
	return `<html>
	<head><title>live stream</title>
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<meta itemprop="description" content="Видео стрим из спальни круглые сутки"/>
	<link rel="icon" href="/favicon.ico">
	<link href="/css/streamjanus.css" rel="stylesheet">
	<script src="/js/globalik.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/9.0.3/adapter.min.js" ></script>
	<script src="/js/janus.js"></script>
	<script>window.yaContextCb=window.yaContextCb||[]</script>
    <script src="https://yandex.ru/ads/system/context.js" async></script>
	</head><body>
	<input type="hidden" id="TOK" value="${n.tok}"/>
	<input type="hidden" id="userName" value="${n.user?n.user.name:'anon'}">
	<a href="/">back</a><br><br><noscript>Javascript disabled</noscript>
	<h3>Круглосуточный видео стрим прям из спальни</h3>

	<p>Если вы нажали на треугольник и ничего не происходит, то весьма вероятно, что
	либо я оффлайн, либо вы перешли по ссылке из Телеграм. Пожалуйста, скопируйте 
	ссылку на стрим и вбейте ее в адресную строку обычного рабочего браузера Хром или Firefox.</p>
	<div><b>Online: </b><span id="janusCount">0</span></div> 
	<article class="slot"><div id="videocontainer"><div id="znakcontainer" onclick="start(this);"><img src="/img/play2.svg"/></div><video id="remotevideo" autoplay ></video>
	<audio id="audioElement" autoplay></audio>
	</div>
	<div id="chatcontainer"><div id="chatpanel"><b>Chat</b></div><div id="chatbox"></div>
	<div id="chatfooter"><div id="txtcontainer"><textarea id="txtarea" maxlength="150" placeholder="Your message"></textarea><button onclick="send(this);">send</button></div></div></div>
	</article>
	
	<script src="/js/jstream.js"></script>
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
	</body></html>`;
}
module.exports = {jstream }
