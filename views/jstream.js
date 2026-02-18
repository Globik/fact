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
	</head><body>
	<input type="hidden" id="TOK" value="${n.tok}"/>
	<a href="/">back</a><br><br>
	<h3>Круглосуточный видео стрим прям из спальни</h3>
	<div><b>Online: </b><span id="janusCount">0</span></div> 
	<article class="slot"><div id="videocontainer"><div id="znakcontainer" onclick="start(this);"><img src="/img/play2.svg"/></div><video id="remotevideo" autoplay ></video></div>
	<div id="chatcontainer"><div id="chatpanel"><b>Chat</b></div><div id="chatbox"></div>
	<div id="chatfooter"><div id="txtcontainer"><textarea id="txtarea" maxlength="150" placeholder="Your message"></textarea><button onclick="send(this);">send</button></div></div></div>
	</article>
	
	<script src="/js/jstream.js"></script>
	<footer id="pfooter">(c)2025</footer> 
	</body></html>`;
}
module.exports = {jstream }
