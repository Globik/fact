const { login } = require('./login.js')
const { nav } = require('./nav.js')
const { videochat } = require('./videochat.js')
const { warnig } = require('./warnig.js');
const { footer } = require('./footer.js');
const { mheader } = require('./mheader.js');
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
   <link href="/css/parade.css" rel="stylesheet">
		<link href="/css/login.css" rel="stylesheet">
		<link href="/css/myfooter.css" rel="stylesheet">
		<link href="/css/stream.css" rel="stylesheet">
		<link href="/css/loader.css" rel="stylesheet">
		<link href="/css/videobuttons.css" rel="stylesheet">
		<link href="/css/donations.css" rel="stylesheet">
		
	<!--	<script src="https://api.lovense-api.com/basic-sdk/core.min.js"></script> -->
	<script type="text/javascript" src="/js/adapter-latest.js" ></script> 
	<script src="/js/janus.js"></script>
	${process.env.DEVELOPMENT=="yes"?'':`<script>window.yaContextCb=window.yaContextCb||[]</script>
    <script src="https://yandex.ru/ads/system/context.js" async></script> `}
		</head><body>
		<main class="mymain">
		${nav(n)}
		<!-- ${warnig(n)} -->
		${mheader(n)}
		
		<input type="hidden" id="owner" value="${n.owner?'true':'false'}">
		<input type="hidden" id="roomid" value="${n.roomid?n.roomid:0}">
		<input type="hidden" id="userid" value="${n.userid?n.userid:0}">
		<input type="hidden" id="username" value="${n.user?n.user.name:'anon'}">
		<input type="hidden" id="streamId" value="${n.streamid?n.streamid:'0'}">
		<input type="hidden" id="TOK" value="${n.tok}" />
		<input type="hidden" id="sess" value="${n.sess?n.sess:'no'}" />
	
	
		${videochat(n)}
		
		<section class="article-section">
		<h2>Донаты от <strong>tips.tips</strong> - без комиссии и скрытых платежей</h2>
		<p>
		Вы можете получать или посылать донаты, пользуясь сервисом <a href="https://tips.tips/r/5d6f55ea-2d02-4b49-93df-87e11fa73ee4">https://tips.tips</a><br>
			-	Вывод любой суммы на любую карту РФ — 0 ₽<br>
			-	Легально, без сборов и скрытых комиссий<br>
			-	<strong>tips.tips</strong> не блокируется РКН в отличие от DonationAlerts<br>
		</p>
		<p>
		Там же в личном кабинете можно получить и настроить виджет прогресса сбора средств, виджет оповещения о поступлении денег.
		Ссылки на виджеты можно вставить прямо здесь, если Вы не ведете стрим через <strong>OBS Studio</strong>. 
		</p>
		</section>
		${footer(n)}
		</main>
		${login(n)}
		<script src="/js/streamUtils.js"></script>
		${n.owner?`<script src="/js/stream.js"></script>`:`<script src="/js/streamSub.js"></script>`}
		<script src="/js/login4.js"></script>
		${process.env.DEVELOPMENT=="yes"?'':`
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
setTimeout(function(){
window.yaContextCb.push(() => {
    Ya.Context.AdvManager.render({
        "blockId": "R-A-14255767-3",
        "type": "fullscreen",
        "platform": "touch"
    })
})
},1000*30)
</script>
<!-- Yandex.RTB R-A-14255767-4 -->
<script>
setTimeout(function(){
window.yaContextCb.push(() => {
    Ya.Context.AdvManager.render({
        "blockId": "R-A-14255767-4",
        "type": "fullscreen",
        "platform": "desktop"
    })
})},1000*30);
</script>
<!-- Yandex.RTB R-A-14255767-5 -->
<script>
/*
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
}, { once: true })*/
</script>`}
		</body></html>
    `;
}
module.exports = { streami : s}
