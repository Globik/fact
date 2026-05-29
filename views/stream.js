const { login } = require('./login.js')
const { nav } = require('./nav.js')
const { videochat } = require('./videochat.js')
const { warnig } = require('./warnig.js');
const stream = function(n){
	const { lang , buser, user } = n;
//	console.log('da user ', n);
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
		<link href="/css/loader.css" rel="stylesheet">
		<script src="https://api.lovense-api.com/basic-sdk/core.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/9.0.3/adapter.min.js" ></script>
	<script src="/js/janus.js"></script>
	<!-- <script>window.yaContextCb=window.yaContextCb||[]</script>
    <script src="https://yandex.ru/ads/system/context.js" async></script> -->
		</head><body>
		
		${nav(n)}
		${warnig(n)}
		<a href="/">На главную</a>
		<input type="hidden" id="owner" value="${n.owner?'true':'false'}">
		<input type="hidden" id="userid" value="${n.userid?n.userid:0}">
		<input type="hidden" id="username" value="${n.user?n.user.name:'anon'}">
		<input type="hidden" id="streamId" value="${n.streamid?n.streamid:'0'}">
		<input type="hidden" id="TOK" value="${n.tok}" />
	
		${videochat(n)}
		
		<audio id="audioel" style="display:none;"></audio>
		${login(n)}
		<script src="/js/stream.js"></script>
		<script src="/js/login4.js"></script>
		 <script>
	 /*
	 
window.yaContextCb.push(()=>{
     if(Ya.Context.AdvManager.getPlatform()==='desktop'){
		 
		 Ya.Context.AdvManager.render({
			 "blockId":"R-A-14255767-2",
			// "renderTo":"yandex_rtb_R-A-12098170-1
			"type":"floorAd",
			"platform":"desktop",
			"onClose":function(){
			console.log("Reklama closed")
		
		}
			})
		 }else{
		 
		 Ya.Context.AdvManager.render({
		 "blockId":"R-A-14255767-1",
		 "type":"floorAd",
			"platform":"touch",
			
		})
			}
			})
			*/
	 </script>
		</body></html>
    `;
}
module.exports = { stream }
