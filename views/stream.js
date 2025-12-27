const { login } = require('./login.js')
const { nav } = require('./nav.js')
const { videochat } = require('./videochat.js')
const stream = function(n){
	const { lang , buser, user } = n;
	return ` <!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Stream</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta itemprop="description" content="Videostream">
   <link rel="icon" href="/favicon.ico">
   <script src="/js/globalik.js"></script>
   <link href="/css/main22.css" rel="stylesheet">
   <link href="/css/nav.css" rel="stylesheet">  
		<link href="/css/login.css" rel="stylesheet">
		<link href="/css/stream.css" rel="stylesheet">
		
		<script src="https://api.lovense-api.com/basic-sdk/core.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/9.0.3/adapter.min.js" ></script>
	<script src="/js/janus.js"></script>
		</head><body>
		${nav(n)}
		<a href="/">На главную</a>
		<input type="hidden" id="owner" value="${n.owner?'true':'false'}">
		<input type="hidden" id="userid" value="${n.userid?n.userid:0}">
		<input type="hidden" id="username" value="${n.user?n.user.name:'anon'}">
		<input type="hidden" id="streamId" value="${n.streamid?n.streamid:'0'}">
	
		${videochat(n)}
		
		${login(n)}
		<script src="/js/stream.js"></script>
		<script src="/js/login4.js"></script>
		</body></html>
    `;
}
module.exports = { stream }
