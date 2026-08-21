const { login } = require('./login.js')
const { nav } = require('./nav.js')
const { videochat } = require('./videochat.js')
const { warnig } = require('./warnig.js');
const streami =function(n){
	return 'hallo world'
}





let s= function(n){
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
	<!--	<script src="https://api.lovense-api.com/basic-sdk/core.min.js"></script> -->
	<script type="text/javascript" src="/js/adapter-latest.js" ></script> 
	<script src="/js/janus.js"></script>
	<script>window.yaContextCb=window.yaContextCb||[]</script>
    <script src="https://yandex.ru/ads/system/context.js" async></script> 
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
	 function getFloor(){
	 
window.yaContextCb.push(()=>{
     if(Ya.Context.AdvManager.getPlatform()==='desktop'){
		 
		 Ya.Context.AdvManager.render({
			 "blockId":"R-A-14255767-2",
			"type":"floorAd",
			"platform":"desktop",
			"onClose":function(){
			console.log("Reklama closed")
		setTimeout(function(){
				getFloor();
			},6000*20);
		}
			})
		 }else{
		 
		 Ya.Context.AdvManager.render({
		 "blockId":"R-A-14255767-1",
		 "type":"floorAd",
			"platform":"touch",
			"onClose":function(){
			console.log("Reklama closed")
			setTimeout(function(){
				getFloor();
			},6000*20);
		
		}
			
		})
			}
			})
		}
		getFloor();
	 </script>
	  <!-- Yandex.RTB R-A-14255767-3 -->
<script>
window.yaContextCb.push(() => {
    Ya.Context.AdvManager.render({
        "blockId": "R-A-14255767-3",
        "type": "fullscreen",
        "platform": "touch"
    })
})
</script>
<!-- Yandex.RTB R-A-14255767-4 -->
<script>
window.yaContextCb.push(() => {
    Ya.Context.AdvManager.render({
        "blockId": "R-A-14255767-4",
        "type": "fullscreen",
        "platform": "desktop"
    })
})
</script>
<!-- Yandex.RTB R-A-14255767-5 -->
<script>
window.addEventListener("load", () => {
    const render = (imageId) => {
        window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
                "renderTo": imageId,
                "blockId": "R-A-14255767-5",
                "type": "inImage",
                "onClose":function(){
					setTimeout(function(){
							console.warn("REKLAMA IN IMAGE MUST BE SHOWED");
          renderInImage(2, Array.from(document.querySelectorAll(".Vid")))
						}, 1000 * 30 * 1);
				}
            })
        })
    }
    const renderInImage = (images) => {
        if (!images.length) {
            return
        }
        const image = images.shift()
        image.id = 'yandex_rtb_R-A-14255767-5-${Math.random().toString(16).slice(2)}'
        if (image.tagName === "IMG" && !image.complete) {
            image.addEventListener("load", () => {
                render(image.id)
            }, { once: true })
        } else {
            render(image.id)
        }
        renderInImage(images)
    }
    renderInImage(Array.from(document.querySelectorAll(".Vid")))
}, { once: true })
</script>
		</body></html>
    `;
}
module.exports = { streami : s}
