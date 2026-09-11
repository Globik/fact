const { login } = require('./login.js');
const { nav } = require('./nav.js');
const { streamsection } = require('./streams-section.js');
const { getSeoText } = require('./getSeoText.js');
const { footer } = require('./footer.js')
const { warnig } = require('./warnig.js');

function main(n){
	const { lang , buser, user } = n;
return `
 <!DOCTYPE html>
<html lang="${n.lang}">
  <head>
    <meta charset="utf-8">
    <title>${lang=="ru"?"Chatikon — стримы с вебкой и донаты в USDT":
    lang=='en'?"Chatikon: Free Random Video Chat with Strangers":
    lang=='zh'?'聊天轮盘 - 在互联网上进行休闲约会的视频聊天':
    lang=='id'?'Rouletka: Obrolan Video Acak Gratis dengan Orang Asing':''}.</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- <meta name="viewport" content="width=device-width,initial-scale=1.0"> -->
    <meta name="viewport" content="width=device-width,user-scalable=no" />
   
    <link rel="icon" href="/favicon.ico">
    <meta name="yandex-verification" content="ce1d7ca1f03c0f9c"/>
  
		<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
		<link rel="icon" type="image/png" sizes="144x144"  href="/android-icon-144x144.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"> 
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
		<meta name="theme-color" content="#ffffff">
		<link rel="canonical" href="https://chatikon.ru${lang=='ru'?'':lang=='zh'?'/zh':'/en'}" />
		<link rel="alternate" href="https://chatikon.ru" hreflang="ru" />
		<link rel="alternate" href="https://chatikon.ru/en" hreflang="en" />
		<link rel="alternate" href="https://chatikon.ru/zh" hreflang="zh" />
<meta name="description" content="${lang=="ru"?"Чатикон — это чат-рулетка с видеосвязью для знакомств и общения в реальном времени. Находи новых друзей со всего мира случайным образом — просто включи камеру и начни чат!":
lang=='en'?"Chatikon is a video chat roulette for real-time meetups and conversations. Meet new friends from around the world instantly—just turn on your camera and start chatting!":
lang=='zh'?'Chatikon - 与陌生人进行的随机视频聊天轮盘':''}" />
  
 
  <meta property="og:title" content="${lang=="ru"?"Чатикон — чат-рулетка":
  lang=='en'?"Chat roulette: Free Random Video Chat with Strangers":
  lang=='zh'?'Chatikon - 与陌生人进行的随机视频聊天轮盘':''}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="//chatikon.ru/" />
  <meta property="og:image" content="//chatikon.ru/og_image.png" />
  <meta property="og:site_name" content="${lang=="ru"?"Чат-рулетка":
  lang=='en'?"Chat roulette":
  lang=='zh'?'Chat':''}" />
  

  <meta property="og:description" content="${lang=="ru"?"Чатикон — это чат-рулетка с видеосвязью для знакомств и общения в реальном времени. Находи новых друзей со всего мира случайным образом — просто включи камеру и начни чат!":
  lang=='en'?`Open the world of communication and new acquaintances both for body and soul, and for commercial business.
   Choose the language of the interlocutor, country, city and plunge into the world of full contact with the interlocutor, selected at random according to your criteria.`:
   lang=='zh'?`与女孩和男孩进行的随机匿名视频聊天轮盘。 在Chatikon上与来自世界各地的陌生人交友和交流！",
	"key":"聊天輪盤視頻聊天交友網戀輪盤隨機相識隨機查看器`:''}" />
  
 
<meta itemprop="description" content="${lang=="ru"?"Чатикон — это чат-рулетка с видеосвязью для знакомств и общения в реальном времени. Находи новых друзей со всего мира случайным образом — просто включи камеру и начни чат!":
lang=='en'?`Open the world of communication and new acquaintances both for body and soul, and for commercial business. 
Choose the language of the interlocutor, country, city and plunge into the world of full contact with the interlocutor, selected at random according to your criteria.`:
lang=='zh'?`与女孩和男孩进行的随机匿名视频聊天轮盘。 在Chatikon上与来自世界各地的陌生人交友和交流！",
	"key":"聊天輪盤視頻聊天交友網戀輪盤隨機相識隨機查看器`:''}" />

<script type="application/ld+json"> { "@context": "https://schema.org", "@type": "Organization", "url": "https://chatikon.ru", "logo": "https://chatikon.ru/og_image.png" } </script>
  
		<link href="/css/main22.css" rel="stylesheet">
		<link href="/css/nav.css" rel="stylesheet">
		<link href="/css/parade.css" rel="stylesheet">
		<link href="/css/login.css" rel="stylesheet">
		<link href="/css/myfooter.css" rel="stylesheet">
		<!-- <link href="/css/mediabox2.css" rel="stylesheet"> 
		<link href="/css/gallery.css" rel="stylesheet"> -->
		<!--<link href="/css/coin.css" rel="stylesheet"> -->
   <!-- <script src="/js/peerjs.min.js"></script> -->
<script src="/js/globalik.js"></script>

 <script src="/js/adapter-latest.js"></script> 
<!-- <script src="/js/sound.js"></script> -->

<script async src="https://yastatic.net/share2/share.js"></script>



    <script>window.yaContextCb=window.yaContextCb||[]</script>
    <script src="https://yandex.ru/ads/system/context.js" async></script>
  </head>
  <body>
    <noscript>
    <div><img src="https://mc.yandex.ru/watch/103428143" style="position:absolute;left:-9999px;" alt=""/></div>
      <strong>We're sorry but chatikon doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
  
    <input type="hidden" id="isLogin" value="${n.user?true:false}"/>
    <input type="hidden" id="userId" value="${n.user?n.user.id:0}">
    <input type="hidden" id="userName" value="${n.user?n.user.name:'anon'}">
   <input type="hidden" id="Mon" value="${n.user?n.user.mon:null}" />
    <input type="hidden" id="Prem" value="${n.user?n.user.prem:"n"}" />
    <input type="hidden" id="Brole" value="${n.user?n.user.brole:'non'}"/>
    <input type="hidden" id="Lang" value="${n.lang}" />
    <input type="hidden" id="isEnter" value="${n.user?n.user.entr==0?true:false:false}" />
   <input type="hidden" id="TOK" value="${n.tok}" />
   <input type="hidden" id="sess" value="${n.sess?n.sess:'no'}" />
    <script>const DEVELOPMENT = "${process.env.DEVELOPMENT === "yes"?"yes":"no"}";</script>
 ${nav(n)}
<header class="mheader">
  <h1>Chatikon</h1>
  <p>Живые стримы с вебкой • Донаты в USDT • Горячий криптокошелёк</p>
  <button class="btn-start" onclick="startTrans(this);">🔥 Начать трансляцию</button>
</header>
${streamsection(n)}
${getSeoText()}
${footer(n)}

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

  
   
    ${login(n)}
    
    
    
 
    
    
   <script src="/js/login4.js"></script>
   
   <!-- <script src="/js/webrtc8.js"></script>
    <script src="/js/whosonline.js"></script>
    <script src="/js/soupi444.js"></script> -->
    <script src="/js/hjanus.js"></script>
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
       </body>
</html>`;
}
module.exports=  {main:main};
