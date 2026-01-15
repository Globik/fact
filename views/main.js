
const getSeoText = require('./getSeoText.js')
const { zar } = require('./zar.js')
const { whosonline } = require('./whosonline.js')
const { banus } = require('./banus.js')
const { banip } = require('./banip.js')
const { login } = require('./login.js');
function main(n){
	const BAN = 0;
	let istestheart = (n.istestheart==1?true:false);
	const { lang , buser, user } = n;
	//console.log('da da user ', n);
	//console.log("N ",n);
	//console.log("ENVIRONMENT ",n.settings.env, "n.VK ", n.VK, ' n.buser.vkid: ', n.buser);
	//console.log("^^^ USER ****", user);
	//console.log("*** BUSER ****", buser);
	//console.log("fucker *** ", n.FUCKER);
	const bur = n.buser;
	//const user = n.user;
	const namealik='suka';
	//console.log('buser2 ', bur);
return `
 <!DOCTYPE html>
<html lang="${n.lang}">
  <head>
    <meta charset="utf-8">
    <title>${lang=="ru"?"Чат рулетка":
    lang=='en'?"Chatikon: Free Random Video Chat with Strangers":
    lang=='zh'?'聊天轮盘 - 在互联网上进行休闲约会的视频聊天':
    lang=='id'?'Rouletka: Obrolan Video Acak Gratis dengan Orang Asing':''}.</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- <meta name="viewport" content="width=device-width,initial-scale=1.0"> -->
    <meta name="viewport" content="width=device-width,user-scalable=no" />
   
    <link rel="icon" href="/favicon.ico">
    <meta name="yandex-verification" content="ce1d7ca1f03c0f9c"/>
    <!--
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"> -->
		<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
		<link rel="icon" type="image/png" sizes="144x144"  href="/android-icon-144x144.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"> 
	 <link rel="manifest" href="/manifest.json"> 
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
		<link href="/css/login.css" rel="stylesheet">
		<link href="/css/mediabox2.css" rel="stylesheet">
		<link href="/css/coin.css" rel="stylesheet">
    
<script src="/js/globalik.js"></script>

 <script src="/js/adapter-latest.js"></script> 
<!-- <script src="/js/sound.js"></script> -->

<script async src="https://yastatic.net/share2/share.js"></script>


${process.env.DEVELOPMENT == "yes" ? '':`<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=103428143", "ym");

   ym(103428143, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        ssr:true
   });
</script>`}

<!-- /Yandex.Metrika counter -->

    <script src="/pwabuilder-sw-register.js"></script> 
    <script>window.yaContextCb=window.yaContextCb||[]</script>
    <script src="https://yandex.ru/ads/system/context.js" async></script>
  </head>
  <body>
    <noscript>
    <div><img src="https://mc.yandex.ru/watch/103428143" style="position:absolute;left:-9999px;" alt=""/></div>
      <strong>We're sorry but chatroulette doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <section id="langbox">
    <div class="langs">
${lang=='en'?'':'<a href="/en" hreflang="en">'} <img title="English Version" alt="English Version" src="/img/en.png" width="35" height="22"> ${n.ln=='en'?'':'</a>'}
${lang=='ru'?'':'<a href="/" hreflang="ru">'} <img alt="Русская версия" src="/img/ru.png"  width="35" height="22">${n.ln=='ru'?'':'</a>'}
${lang=='zh'?'':'<a href="/zh" hreflang="zh">'}<img title="Китай" alt="中文网站" src="/img/zh.png"  width="35" height="22">${n.ln=='zh'?'':'</a>'}

</div> 
${lang=='ru'?`<h1>Анонимная чат рулетка</h1>
<h2>Весело провести время!</h2>
<div class="terms">Нажимая кнопку «Начать..», я подтверждаю что мне <br>исполнилось 18 лет и я достиг совершеннолетия,<br> принимаю условия и политику конфеденциальности.</div>`:''}
               
               ${lang=='zh'?`           
<h1>免费随机视频聊天</h1>
<h2>认识新朋友</h2>

<div class="terms">点击开始，我声明我至少18岁，<br>已达到我所在地的法定年龄，<br>并接受我们的条款和隐私政策。</div>`:``}
${lang=='en'?`<h1>Free Random Video Chat</h1>
<h2>LOOKING FOR A GOOD TIME?</h2>
<div class="terms">Pressing start I certify I am at least 18-years old and <br>have reached the age of majority where I live, <br> and I accept our Terms and Privacy Policy.</div>`:''}
</section> 
    <input type="hidden" id="BAN" value="${BAN==1?'1':'0'}" />
   <input type="hidden" id="isLogin" value="${n.user?true:false}"/>
    <input type="hidden" id="userId" value="${n.user?n.user.id:0}">
    <input type="hidden" id="userIp" value="${n.ip?n.ip:'noip'}"/>
    <input type="hidden" id="userName" value="${n.user?n.user.name:'anon'}">
    <input type="hidden" id="isTestHeart" value="${istestheart}">
    <input type="hidden" id="publishedid" value="${n.imgData && n.imgData.img_data?n.imgData.publishedId:null}" >
    <input type="hidden" id="Mon" value="${n.user?n.user.mon:null}" />
    <input type="hidden" id="Prem" value="${n.user?n.user.prem:"n"}" />
    <input type="hidden" id="Brole" value="${n.user?n.user.brole:'non'}"/>
    <input type="hidden" id="Lang" value="${n.lang}" />
    <input type="hidden" id="Grund" value="${n.user?n.user.grund:0}" />
    <input type="hidden" id="isEnter" value="${n.user?n.user.entr==0?true:false:false}" />
    <input type="hidden" id="VKID" value="${n.buser?n.buser.vkid:null}" /> 
   <input type="hidden" data-vk="${n.VK}" id="isVK" value="${n.VK?true:false}" /> 
   <input type="hidden" id="PARTNERNICK" value="${n.imgData&&n.imgData.img_data?n.imgData.nick:false}"/>
    <input type="hidden" id="mediasoupAdmin" value="${n.mediasoupadmin=='yes'?'yes':'no'}"/>
    <input type="hidden" id="TOK" value="${n.tok}" />
   
    
    ${!n.user?`<script>
   //alert("UNDEFINED");
    var NICK = "anon";
   // window.location.href='#banned';
    //location.href="#login2"
    function setA(){
    let isage = localStorage.getItem("myAge");
	if(!isage && isage !=="y"){
	//alert('age');
		//window.location.href="#confirmAGE";
	 const faka = document.querySelector('.overlay:target');
if(faka){
	faka.onclick=function(e){
		e.preventDefault();
	}
}
}
 }
 
   
    window.onload=function(){
		setA();
	let islogin = localStorage.getItem("islogin");
	console.warn('islogin ', islogin);
		//get_socket(); 
	
	
	
	const myAgeForm2 = document.forms.verifyageform;
 if(myAgeForm2){
 myAgeForm2.addEventListener('submit', confirm_agenot, false);
 var agi = localStorage.getItem("myAge2");
if(agi) myAgeForm.bday.value = agi;
}else{
	showSomething();
}

	//getZar();

function confirm_agenot(ev){
	ev.preventDefault();
	
	try{
	//alert(ev.target.bday.value);
	if(isover18(new Date(ev.target.bday.value))){
		//alert('VKID '+gid('VKID').value);
		localStorage.setItem("myAge2", ev.target.bday.value);
		localStorage.setItem("myAge", "y");
		 window.onhashchange = null;
		 //window.location.href="#."
		try{
		showSomething();
	}catch(e){
		
	}
	}else{
		gid('outputing').style.visibility = 'visible';
	}
}catch(e){
	//alert(e);
	console.log(e);
}
}
showSomething();
	function showSomething(){
	//alert(1)
	return;
   var cat = localStorage.getItem("myCat");
   if(!cat && cat !=="Tom"){
	   console.warn("NO REGELN");
    location.href="#regeln";
    const faka = document.querySelector('.overlay:target');
if(faka){
	faka.addEventListener('click', function(e){
		e.preventDefault();
	//alert(1);
	//window.location.href="#lregeln";
	//return;
	}, false);
	faka.addEventListener('hashchange', han, false);
}
}else{
	${!n.VK?`
		//let islogin = localStorage.getItem("islogin");
	//if(!islogin && islogin !=="yes")
	console.warn("must login")
 // window.location.href="#login";
//window.location.href="#gopremium";
	
const faka = document.querySelector('.overlay:target');
if(faka){
	faka.onclick=function(e){
		e.preventDefault();
	
	}
	window.addEventListener('hashchange', hani, false);
}`:''}
}
}
//in_rem_hash();

}
function getZar(){
	 // if(gid("Brole").value=='non'){
	// alert('suka');
	 localStorage.removeItem('zartwo');
	  let d = localStorage.getItem('zarthree');
	  if(d&&d=='yes'){
		//  alert(d);
		  return;
	  }
	  window.location.href="#myZar";
  //}
}
//window.location.href="#setPrem";
  // getZar();
   function han(ev){
	 //  alert('regeln');
	  // window.location.href="#regeln";
   }; 
function confirmRules(){
	//alert('confirmrules');
	localStorage.setItem("myCat", "Tom");
	
	
	 const faka = document.querySelector('.overlay:target');
	 window.removeEventListener('hashchange', han);
	 window.location.href='#.'
	 return;
	 //window.location.href="#login";
	 if(faka){
	faka.addEventListener('click', function(e){
		//alert('click');
		e.preventDefault();
	},false);
	//window.addEventListener('hashchange', hani, false);
}

}
function hani(ev){
	//alert('login');
	//window.location.href="#login";
}
function isOpenModal(){
	 window.location.href="#regeln";
	 const faka = document.querySelector('.overlay:target');
	 if(faka){
	faka.addEventListener('click', function(e){
		e.preventDefault();
	}, false);
	window.addEventListener('hashchange', han, false);
}
}
//get_socket();
    </script>`:`<script>
   // alert('alik defined');
    in_rem_hash();
    const NICK = "${n.user?n.user.name:'anon'}";
   // var VK_USER = false;
  // alert("NICK "+NICK);
  
    window.onload = function(){
	
	
		if(FLAGVK){
			VK_USER = false;
//gid("settings").style.display = "none";
gid("foot").style.display = "none";
gid("foot2").style.display = "none"
//gid('playContainer').style.display = 'none';
// {n.user?n.user.entr==0?'window.location.href="#confirmAGE";':'':''}
/*
let isage = localStorage.getItem("myAge");
	if(!isage && isage !=="y"){
window.location.href="#confirmAGE"
}
const faka = document.querySelector('.overlay:target');
if(faka){
	faka.onclick=function(e){e.preventDefault();}
}
window.onhashchange = function(ev){
	console.log('hashchanged');
	window.location.href='#confirmAGE';
}
*/
}
		
    }
    
    function confirmRules(){

	localStorage.setItem("myCat", "Tom");
	window.onhashchange = null;
	window.location.href="#.";
}



    </script>
    
    `}
   
    <script>
  const DEVELOPMENT = "${process.env.DEVELOPMENT === "yes"?"yes":"no"}";</script>
     <script>
     var partnernick = "${n.imgData&&n.imgData.img_data?n.imgData.nick:''}";
     </script>
  
	 <script>
	 function getTop(){
	 if(Brole.value==="admin") return;
	 // if(Prem.value !="n") return;
		 window.yaContextCb.push(()=>{
	 Ya.Context.AdvManager.render({
	 "blockId":"R-A-12098170-11",
	 "type":"topAd",
	 "onClose":function(){
			console.log("Reklama closed")
			//setTimeout(function(){getTop();}, 1000 * 60*2)
			}
 })
})
	 }
	getTop();
	 </script> 
     <article id="mediabox">
    <nav id="navpanel"><div class="nav"><b>Онлайн: <span id="onlineCount">0</span></b>&nbsp;&nbsp;&nbsp; <b id="VKUSERNAME">${n.user?n.user.name:'anon'}</b>
 
   ${n.user && n.user.prem=="y"? '&nbsp;&nbsp;&nbsp;<span style="color:#d5a8a8;">Premium &nbsp;&nbsp;&#x1F451;</span>':''} 
    </div>
    
    <div id="settings" class="ita" onclick="panelOpen(this);">
 <img class="setimg" src="/img/set2.svg">
</div>


<div id="settingspanel">
${n.user && n.user.brole=='admin'?'<div class="settingspanel" onclick="toAdminPanel(this);">В админку</div>':''}
<!-- <div class="settingspanel" data-current="" id="camToggle" onclick="toggleCam(this);">${lang=='ru'?'Переключить камеру':
lang=='en'?'Toggle cam':
lang=='zh'?'切换网络摄像头':
lang=='id'?'beralih kamera':''}</div> -->
<!-- <div class="settingspanel" onclick="doSharing(this);">Скриншэринг</div> -->
<div class="settingspanel"><b>${lang=='ru'?'Вебок':
lang=='en'?'Cams':
lang=='zh'?'网络摄像头':
lang=='id'?'kamera web':''}:</b> <span id="camsCount">0</span> | <b>${lang=='ru'?'Коннектов':
lang=='en'?'Connects':
lang=='zh'?'连接':
lang=='id'?'koneksi':''}:</b> <span id="connects">0</span></div>
 
<!-- ${lang=='ru'&&!n.VK ?`<div class="settingspanel"  onclick="purchaseTokens(this);">Купить сердечки &#x1f496;</div>`:''} -->
 <div class="settingspanel" onclick="showWhosOnline();">${lang=='ru'?'Кто онлайн':"Who's online"}</div>
<!-- <div class="settingspanel"><a href="https://chatroulett.ru" style="color:red;">Опробывать новый чат</a></div> --> 
${n.user?`<!-- <div class="settingspanel">
<div class="some doh"style="overflow-x:auto;" >${n.user?n.user.name:'anon6'}  Ваш доход&nbsp;&nbsp;<span id="dohod">${n.user? n.user.zar:'0'}</span>&nbsp;руб.</div>
<div class="du" onclick="getPayout(this);"><div>Получить</div> <div id="coinContainer">${getCoin()}</div></div>
</div> -->`:''}
${!n.VK ? `<!--
<div class="settingspanel"><a href="https://t.me/rouletka3">${lang=='ru'?'Наш Телеграм':
lang=='en'?'Our Telegram':
lang=='zh'?'我们的电报':
lang=='id'?'Telegram kami':''}</a></div> -->`:''}
${lang=='ru' && !n.VK ? `<!-- <div class="settingspanel" ><a href="#ozeniteHREF" onclick="ozenite(this);"><span class="ozenka">Оцените приложение</span></a></div> -->`:''}
 
 ${!n.VK?`<!-- <div class="settingspanel"  id="donatis">Помочь проекту<br>
 <iiiframe src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=AWVMCQLpAcY.240125&" width="330" height="50" frameborder="0" allowtransparency="true" scrolling="no"></iframe></div> --> `:''}
<!-- ${n.user?`<div class="settingspanel"><a href="#setPrem" onclick="panelOpen();">Премиум аккаунт</a></div> `:''} -->
${n.user?`<div class="settingspanel" onclick="logout(this);">${lang=='ru'?'Выйти':lang=='en'?'Logout':lang=='zh'?'登出':lang=='id'?'keluar':''}</div>`:
`${!n.VK ? `<div class="settingspanel"><a href="#login" onclick="panelOpen();">${lang=='ru'?'Войти':lang=='en'?'Log in':lang=='zh'?'登录':
	lang=='id'?'Gabung':''}</a></div>`:''}`}
<!-- <div class="settingspanel"><button onclick="mach();">mach</button></div> -->
</div>
</nav>
    <section id="container">
    <div id="remotecontainer" onclick="closeClaim(this);">
 











<!--
 ${n.imgData && n.imgData.img_data?'<style>div#playContainer svg{fill:rgba(234,223,244,0.6);}</style>':''}
 
    <div id="playContainer" class="${lang=='en'?'eng':lang=='zh'?'溪流':lang=='id'?'id':''}" data-state="${n.imgData && n.imgData.img_data?'busy':'niemand'}" onclick="beginTranslation(this);">
<svg version="1.1" id="kartinasvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve" >
<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
<g><path d="M500,10C229.4,10,10,229.4,10,500s219.4,490,490,490c270.6,0,490-219.4,490-490S770.6,10,500,10z M500,881.1c-210.5,0-381.1-170.6-381.1-381.1S289.5,118.9,500,118.9c210.5,0,381.1,170.6,381.1,381.1S710.5,881.1,500,881.1z"/><path d="M390.2,282.2l326.7,218.6L390.2,719.5V282.2z"/></g>
</svg>
<div id="kresti"><b id="kres">&#x274E;</b></div> 
<video id="kartina" ${n.imgData && n.imgData.img_data?` poster=${n.imgData.img_data}`:`data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"`} playsinline ></video></div>
-->


    <div class="icon-change-cam-div" onclick="toggleCam(this);" title="change cam"><img class="icon-change-cam" src="/icons/change.svg"/></div>
   
    <section id="claimContainer" onclick="openClaim(this);"><div id="claimBox">!</div></section>
    <div id="claimMenu" data-was="${n.imgData&&n.imgData.img_data?'dataPublish':''}"
     data-vip="${n.imgData&&n.imgData.img_data?n.imgData.userId:''}">
      <div data-claim="ignor" onclick="sendClaim(this);">${lang=='ru'?'В игнор':lang=='en'?'To ignore':
    lang=='zh'?'忽略':
    lang=='id'?'untuk mengabaikan':''}!</div>
    <div data-claim="claim" onclick="sendClaim(this);">${lang=='ru'?'Пожаловаться':lang=='en'?'Abuse':
    lang=='zh'?'虐待':
    lang=='id'?'melecehkan':''}!</div> 
    ${n.user&&n.user.brole=="admin"?`<div onclick="banit(this);">Забанить</div>`:''}
    </div> 
    <section id="mobileloader"><div class="loader"></div></section>
    
    <video id="remote"  class="Vid" autoplay playsinline poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
   <!-- <section id="fotocont"><img id="chatik" src="/img/chatikon.png"/>
    <header>Групповой Видеочат</header>
    <section class="flgame"><p> <a target="_blank" href="https://chatikon.ru"> Перейти на <span class="chatikon">chatikon.ru</span></a></p></section>
  
    </section> -->
     <div id="duka2">Жизнь как рулетка. Никогда не узнаешь, кого встретишь следующим...</div>
     <!-- MOBILE! -->
 <section id="mobileChat" class="hide">
		<div id="hidechat" onclick="hideChat(this);"><img  class="chaticon" src="/img/chat.svg"/></div>
		
		<div id="znakChat2">
	<div id="znakPrint2" class="typing hidden">
    <div class="typing__dot"></div>
    <div class="typing__dot"></div>
    <div class="typing__dot"></div>
  </div>
  </div>
	<div id="chat4"><div id="chatbox2">
	</div>
	<!-- <section id="giftsContainer2" class="hidden"><header><span>Подарки</span><a href="#purchaseHREF"><span class="purchaseSpan">Купить сердечек</span></a></header>
<div id="giftsDiv2">
<div class="flexgiftsitem">
<div class="heart" data-type="mobile" style="">&#x1f496</div>
<div class="bname">Сердечко</div>

</div>
</div>

</section> -->
	</div>
<section id="sectionTextArea" class="hide">
<div id="textarea2" class="hide"><textarea id="txtvalue2" style="${n.VK?'width:calc(100% - 65px - 30px);':''}" data-publish="none" data-send="two" placeholder="${lang=='ru'?'Сообщение':
lang=='en'?'Message':
lang=='zh'?'信息':
lang=='id'?'pesan':''}"  disabled  onfocus="onfoci();" onblur=""></textarea>
<!-- oninput="txtInput(this);" onchange="someChange();" -->
${n.VK?'':`<!-- <div id="giftbox">
<div class="flexgiftsitem">
<div class="heart" data-type="mobile">&#x1f496</div>
<div class="heartcount">${n.user?istestheart?n.user.theart:n.user.heart:0}</div>
</div>
</div> --> `}
<!-- <div class="send"  data-publish="none" data-send="two" onclick="sendi(this);"><img style="cursor:pointer;" src="/img/send1.svg"/></div> -->
</div></section>
</section> 
<!-- END MOBILE! -->
    </div>
<div id="localcontainer"><video id="local"  class=""  autoplay muted playsinline  poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video></div>

<div id="controlsContainer"><button id="startbtn" class="start" data-start="no" onclick="start(this);">${lang=='ru'?'старт':lang=='en'?'start':lang=='zh'?'开始':lang=='id'?'awal':''}</button>
<button id="nextbtn" class="next" onclick="next(this,true);" disabled>${lang=='ru'?'далее':lang=='en'?'next':lang=='zh'?'下一个':lang=='id'?'Berikutnya':''}</button>
 <div id="somespinner" class="text"><!-- https://cssloaders.github.io/ -->
 
      <span class="duka">${lang=='ru'?'Жизнь как рулетка. Никогда не узнаешь, кого встретишь следующим':
      lang=='en'?'Life is like roulette. You never know who you\'ll meet next':
      lang=='zh'?'生活就像轮盘赌。你永远不知道接下来会遇到谁':
      lang=='id'?'Hidup itu seperti rolet. Anda tidak pernah tahu siapa yang akan Anda temui selanjutnya':''}...</span>
       <!-- Life is like a non-stop roulette. You never know who you will meet next...-->
      </div>
       <div id="somehello" class="text">
        <span class="tip"><i class="fas fa-check"></i></span>
        ${lang=='ru'?'Просто поздоровайтесь друг с другом':
        lang=='en'?'Just say hello to each other':
        lang=='zh'?'只是互相打个招呼':
        lang=='id'?'Katakan saja halo satu sama lain':''} :D
      </div>
<div id="foot"><!--<a href="/"> ${lang=='ru'?'О проекте':
lang=='en'?'About us':
lang=='zh'?'关于我们':
lang=='id'?'tentang kami':''}</a> -->

 <div class="ya-share2" data-curtain data-size="m" data-shape="round"  data-services="vkontakte,telegram,odnoklassniki" 
data-url="https://chatikon.ru" data-image="https://chatikon.ru/og_image.png"></div>
</div></div>

<!-- COMPUTER VERSION -->
<div id="sectionChat">
	<div id="znakChat">
	<div id="znakPrint" class="typing hidden">
    <div class="typing__dot"></div>
    <div class="typing__dot"></div>
    <div class="typing__dot"></div>
  </div>
  </div>
  
<div id="chatbox"></div>

<section id="giftsContainer" class="hidden"><header><span>Подарки</span><a href="#purchaseHREF"><span class="purchaseSpan">Купить сердечек</span></a></header>
<div id="giftsDiv">
<div class="flexgiftsitem">
<div class="heart" data-type="computer" style="">&#x1f496</div>
<div class="bname">Сердечко</div>
<div class="heartcount">${n.user?istestheart?n.user.theart:n.user.heart:0}</div>
</div>
</div>
</section> 

<section id="MainSectionTextArea">

<div id="textarea"><textarea id="txtvalue" style="${n.VK?'width:calc(100% - 65px - 12px);':''}" data-publish="none" data-send="one" placeholder="${lang=='ru'?`Сообщение`:
lang=='en'?'Message':
lang=='zh'?'信息': 
lang=='id'?'pesan':''}" disabled></textarea>
${n.VK?'':`<!-- <div id="giftbox2" data-state="closed">

<div class="flexgiftsitem">
<div class="heart" data-type="computer">&#x1f496</div>
<div class="heartcount">${n.user?istestheart?n.user.theart:n.user.heart:0}</div>

</div>
</div> -->`}
 <div class="send" data-publish="none" data-send="one" onclick="sendi(this);" value="papa" ><img style="cursor:pointer;" src="/img/send1.svg"/></div> 
</div>
</section>
</div>

    </section>
    </article>
    <div><a href="/demospace">demo</a></div><br>
    <div id="startTr"><button id="transbtn" onclick="startTrans(this);">Начать трансляцию</button></div><br><br><br>
		<section id="streamsection"><div id="poka">Пока никого. Будьте первыми.</div></section>
		<section >FUCK <a href="https://tglinks.ru/Psycheya_XXI_vek">gruppe</a></section>
		<br>< a href="https://tglinks.ru/Globik2">Globik2</a>
    <section id="texterst">
  ${lang=='en'?`<h1>What Is Chatikon</h1>
<p>Want to meet people from the other side of the world? It's easier than you think. All you need to start Chatikon and hundreds of new acquaintances will be available to chat in a single click. Our video chat feature is a godsend for making friends, online dating, chit-chats, and in-depth conversations about everything under the sun. Get to know so many interesting people from all across the globe with random connections via Chatikon.</p>

<p>You will never know who our algorithm hooks you up with next time. Maybe it is a girl next door or maybe it is someone who lives thousands of miles away. You’ll never know until you try it. Prepare yourself for great surprises and joyful conversations with strangers every time and all the time. Open yourself up to new exciting adventures!</p>

<p>Thousands of pleasant rendezvous lie ahead. You are ready for them? Don’t hesitate, join our friendly Chatikon community now.</p>`:''}
${lang=='ru'?`<h1>Chatikon: Анонимный видео чат</h1>
<p>Хотите познакомиться с людьми с другого конца света и получать донаты в криптовалюте? Все, что вам нужно – это нажать кнопку старт. Сотни новых знакомств и поклонников будут доступны для общения в один клик. Случайная видео чат рулетка - находка для поиска друзей, онлайн-знакомств, болтовни и разговоров обо всем, что у вас на уме вы можете поделиться с собеседником, а можете просто выслушать. Знакомьтесь со множеством интересных людей со всего мира с помощью рандомного чата Chatikon.</p>

<p>Вы никогда не угадаете заранее, с кем наш алгоритм видеочат рулетки соединит вас в следующий раз. Может быть, это девушка по соседству, а может, это кто-то, кто живет за тысячи километров от вас. Вы никогда не узнаете, пока не попробуете. Готовьтесь к сюрпризам и веселым беседам с незнакомцами каждый раз, когда вы нажимаете кнопку “Далее”. Откройте для себя новые увлекательные приключения!</p>

<p>Впереди тысячи приятных свиданий. Вы готовы к ним? Не сомневайтесь, присоединяйтесь к нашему дружелюбному сообществу Chatikon прямо сейчас.</p>`:''}
${lang=='zh'?`<h1>什么是Chatikon</h1>
<p>想认识来自世界另一端的人吗？比你想象的更容易。只需启动Chatikon，数百个新朋友将在一个点击中可用于聊天。我们的视频聊天功能是结交朋友、在线约会、闲聊和深入谈论各种话题的救星。通过Chatikon进行随机连接，结识来自全球各地的许多有趣的人。</p>

<p>您永远不会知道我们的算法下一次会连接您与谁。也许是邻家女孩，也许是住在数千英里之外的人。你永远不会知道，直到你尝试它。随时随地为与陌生人的惊喜对话做好准备。打开自己，迎接新的刺激冒险！</p>

<p>成千上万个愉快的约会在前方等待着。你准备好了吗？不要犹豫，现在就加入我们友好的Chatikon社区。</p>`:''} 

 <!-- <div id="yandex_rtb_R-A-12098170-1"></div> -->
   ${process.env.DEVELOPMENT==="yes"?'<script>function getReklama(){}</script>':`<script>
     // https://yandex.ru/support2/partner/ru/web/units/sizes
     var kkk = 0;
     function getReklama(){
		 return;
		 if(Brole.value==="admin") return;
     window.yaContextCb.push(()=>{
     if(Ya.Context.AdvManager.getPlatform()==='desktop'){
		kkk++;
		 Ya.Context.AdvManager.render({
			 "blockId":"R-A-12098170-3",
			// "renderTo":"yandex_rtb_R-A-12098170-1
			"type":"floorAd",
			"platform":"desktop",
			"onClose":function(){
			console.log("Reklama closed")
			setTimeout(function(){getReklama();}, 1000 * 60)
			if(kkk == 1){
				//if(isLogin.value=="true")
			//	window.location.href="#setPrem";
			kkk = 0;
		}
			},
		 })
	 }else{
	 /*
	 
		 kkk++;
		 Ya.Context.AdvManager.render({
		 "blockId":"R-A-12098170-5",
		 "type":"floorAd",
			"platform":"touch",
			"onClose":function(){
			console.log("Reklama closed")
			setTimeout(function(){getReklama();}, 1000 * 60)
			if(kkk == 1){
			//if(isLogin.value=="true")
		//	window.location.href="#setPrem";
		kkk = 0;
		}
			}
		})
	*/
	}
	 })
 }
if(isLogin.value=="false") getReklama();
	 </script> 
	 <script>
	 
	 
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
	 </script>
	 
	 `}
	 ${getSeoText.getSeoText(lang)}
	 ${zar({})}
	 ${whosonline({})}
	 <a href="#."  class="overlay" id="myGame"></a>
    <output id="mygameoutput" class="popi"><div><a href="#" style="font-size:1.1rem;color:blue;">Закрыть</a></div>
    <section id="fotocont">
    <header>Групповой Видеочат</header>
    <section class="flgame"><p>Общайтесь группой до десяти человек! <a target="_blank" href="https://chatikon.ru"> Перейти на сайт <span class="chatikon">chatikon.ru</span></a></p></section>
  
    </section>
    </output>
	 
	 
	 
	 
	 
	 
 <a href="#."  class="overlay" id="confirmAGE"></a>
    <output id="confirmageoutput" class="popi">
  <!--  <form name="verifyageform"><h2>Предупреждение</h2> -->
    <span>Чат рулетка может содержать контент, неприемлемый для несовершеннолетних.</span><span> Вам есть 18?</span>
  <!-- <input type="date" name="bday" required min="1940-01-01" max="2014-01-01" autocomplete />
    <input type="submit" name="contin" value="Продолжить"/> 
    
    </form>
    <span id="outputing" style="visibility:hidden;color:red;">Вам нет 18-ти лет. Покиньте чат.</span> -->
    <div class="agecontainer">
    <button class="agebtn" onclick="handleYes();">Да</button>
    <button class="agebtn" onclick="handleNo();">Нет</button>
    </div>
    </output>
    
   <!--
    <a href="#."  class="overlay" id="purchaseHREF"></a>
    <output id="purchaseoutput" class="popi">
    <section id="heartsContainer">
	
	<form id="purchaseForm" method="post" action="/api/getPayUrl" name="ordertodo">
	<div id="heartswrapper">
	<div class="heartbx"><label class="mechecked" for="t1">&#x1f496 &nbsp;&nbsp;<b>10 сердечек = 100 руб</b></label>
	<input id="t1" type="radio" name="count" class="ten" data-count="10" value="100.00" checked onchange="dodo(this);"></div>
	<div class="heartbx"><label for="t2">&#x1f496 &nbsp;&nbsp;<b>50 сердечек = 400 руб</b></label>
	<input id="t2" type="radio" name="count" data-count="50" value="400.00" onchange="dodo(this);"></div>
	<div class="heartbx"><label for="t3">&#x1f496 &nbsp;&nbsp;<b>100 сердечек = 700 руб</b></label><input id="t3" type="radio" name="count" data-count="100" value="700.00" onchange="dodo(this);"></div>
    <input type="hidden" name="nick" value="${n.user?n.user.name:"anon"}">
    <input type="hidden" name="userid" value="${n.user?n.user.id:'null'}">
	</div>
	<div>
	<input id="purchaseInput" type="submit" value="Купить">
	</div>
	</form>
	</section>
    </output> -->
     
   
  
	
	
	</section> 
	</output>
	<!--4100118676103827 me 410016439442251  er -->
	<a href="#."  class="overlay" id="purchaseHREFA"></a>
    <output id="purchaseoutput2" class="popi">
	
	<section id="heartsContainer">
	
	<form id="purchaseForm" method="post" action="https://yoomoney.ru/quickpay/confirm" name="ordertodo">
<p class="intro">Купить 50 сердечек &#x1f496; за 50 рублей</p>
	<div id="heartswrapper">
	 <div><input type="hidden" id="receiver333" placeholder="Получатель yoomoney" name="receiver" value="${n.yacount}" required/> </div>
	<input type="hidden" name="label" value="id=${n.user?n.user.id:'0'}&c=5"/>
    <input type="hidden" name="quickpay-form" value="button" />
    <input type="hidden" name="successURL" value="https://rouletka.ru/about" />
    <input type="hidden" name="formcomment" value="Покупка" />
    <input type="hidden" name="targets" value="Покупка 50 сердечек" />
    <div><input class="number"  type="hidden" name="sum" value="50.00" required data-type="number"/></div>
   <input class="input" type="hidden" checked name="paymentType" value="PC" /></div>
   <div><input  class="input" type="hidden" name="paymentType" value="AC" /></div>
   <div><input type="submit" id="duckersubmit333" value="Купить"/></div>
	
	</div>
	</form>
	</section> 
	
	
    </output>
    ${BAN==0?banip(n):banus(n)}
   
     <a href="#."  class="overlay" id="helproject"></a>
    <output id="helpoutput" class="popi">
    <div>Пожалуйста, перечислите финансы на развитие проекта. Вы будете перенаправлены в yoomoney</div><br><br><br>
    <div><iframe src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=AWVMCQLpAcY.240125&" width="330" height="50" frameborder="0" allowtransparency="true" scrolling="no"></iframe></div> 
</output>

	
<a href="#."  class="overlay" id="gopremium"></a>
    <output id="premiumoutput" class="popi">
    <section id="premContainer">
	${lang=='ru'?`
	<form id="premForm" method="post" action="https://yoomoney.ru/quickpay/confirm" name="ordertodo">
<p class="intro">Чтобы пользоваться дополнительным функционалом приобретайте премиум аккаунт  &#x1F451; за 50 рублей в месяц. <br>Вы будете преренаправлены в yoomoney</p>
	<div id="premrapper"> 
	 <div><input type="hidden" id="receiver2" placeholder="Получатель yoomoney" name="receiver" value="410016439442251" required/> </div>
	<input type="hidden" name="label" value="id=${n.user?n.user.id:'0'}&p=100"/>
    <input type="hidden" name="quickpay-form" value="button" />
    <input type="hidden" name="successURL" value="https://rouletka.ru/about" />
    <input type="hidden" name="formcomment" value="Покупка премиум аккаунта на месяц" />
    <input type="hidden" name="targets" value="Купить премиум аккаунт на месяц" />
    <div><input class="number"  type="hidden" id="sum2" name="sum" value="50.00" required data-type="number"/></div>
   <input  class="input" type="hidden" checked name="paymentType" value="PC" /></div>
   <div><input  class="input" type="hidden" name="paymentType" value="AC" /></div>
   <div><input type="submit" id="premBtn" value="Купить"/></div>
	
	</div>
	</form>`:''}
	<p class="btcp"> ${lang=='ru'?`Или оплатить биткоинами <span class="btcpresent">0.000034 BTC</span> в месяц`:`
	To use additional functionality, purchase a premium account 👑 for <span class="btcpresent">0.000034 BTC</span> per month.
	`}.</p>
	<button class="btcbtn" onclick="getInvoice(this);"><div  class="btckup">${lang=='ru'?'Купить':'Buy'}</div>
	<div class="btcsvg">
	<svg version="1.1"   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<g><path d="M500,148.7C306,148.7,148.7,306,148.7,500S306,851.3,500,851.3c194,0,351.3-157.3,351.3-351.3S694,148.7,500,148.7z M571.2,703.4c-4,0-8,0-12,0V794h-55.5v-90.6c-12.4,0-24.8,0-37,0V794h-55.5v-90.6c-60.7,0-107.3,0-107.3,0l1.9-58.3c0,0,31.4,0,42.5,0c11.1,0,21.3-6.5,21.3-26.8c0-20.3,0-231.1,0-245.9c0-14.8-9.2-20.3-27.7-20.3c-18.5,0-41.6,0-41.6,0v-57.3c0,0,53.3,0,110.9,0V206h55.5v88.7c13.2,0,25.7,0,37,0V206h55.5v89.8c56.5,4.8,126.9,27.2,135,86.8c9.3,68.4-46.2,96.1-46.2,96.1s74.9,17.6,74.9,93.4C722.8,647.9,684.9,703.4,571.2,703.4z"/><path d="M537.9,521.3c-16.6,0-27.7,0-27.7,0h-43.4v118.3c6,0,21.6,0,61,0c59.2,0,87.8-24,87.8-68.4C615.6,526.8,554.6,521.3,537.9,521.3z"/><path d="M588.7,405.7c0-45.3-54.6-49.9-82.3-49.9c-20,0-33.6,0-39.8,0v108.6h73.4C559.5,461.8,588.7,446.6,588.7,405.7z"/><path d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,949.3C251.8,949.3,50.7,748.1,50.7,500C50.7,251.8,251.8,50.7,500,50.7c248.2,0,449.3,201.2,449.3,449.3C949.3,748.2,748.2,949.3,500,949.3z"/></g>
</svg></div></button>
<div class="btcaddress"></div>
	</div>
	</section> 
    </output>
    <a href="#."  class="overlay" id="vivest"></a>
    <output id="payoutoutput" class="popi"><div class="krestikdiv"><a href="#." class="krestik-two">&#x274C;</span></div>
    <section id="secleader">
    <p>В лидерах:</p>
   <p><div id="leaderSpinner" class="loader hide"></div><span id="spinnerP"></span></p>
   <p> У вас тоже есть шанс победить - продолжайте крутить рулетку и копите свои <b>300 рублей</b> за каждую беседу!</p>
   <p><b><small>До конца <a href="#myZar" style="color:blue;text-decoration:underline;">акции</a> осталось ${daysUntilActionEnd()} дней.</small></b></p>
    </section>
    <!--
    <form name="mypayoutform" action="/admin/setPayout" method="post">
    
    <input type="hidden" name="label" value="${n.user?n.user.id:'0'}"/>
    <div><input type="hidden" id="payoutamountid" name="payoutamount"  value="${n.user? Number(n.user.theart * 0,10).toFixed(2):0}"/></div>
    <div class="pfo"><label for="payoutaccountid">Счет в <a  id="mpa" href="https://yoomoney.ru">yoomoney</a>:</label>&nbsp;&nbsp;<input type="number" id="payoutaccountid" name="payoutaccount" required placeholder="410016439442251"  value=""/></div>
    <div class="pfo"><input id="payoutsub" type="submit" value="Получить" /></div>
    </form> -->
    </output>
    
    
    <!-- 410016439442251 -->
    <a href="#."  class="overlay" id="goinfo"></a>
    <output id="infooutput" class="popi">
    <p>
    Добро пожаловать в чат-рулетку. Вы можете купить сердечки &#x1f496 за 50 руб, а затем дарить их
    тем, кто вам нравится. Сердечко находится между текстовым полем и знакoм *отправить* при открытии чата. Кликаете
    на сердечко и одно сердечка отправляется собеседнику. В свою очередь собеседник, поднакопив сердечек
    может вывести их в деньги с помощью юмани.</p>
    <p>А еще у нас есть одна суперкомната для одного человека, который может вести стрим для всех присоединившихся.
    Торопитесь ее занять. Кликнув на треугольник, что справа находится в видеокошке собеседника, вы можете начать трансляцию.
    Увидев в треугольнике ваше лицо и кликнув по нему вы сможете подписаться на трансляцию. Удачи вам!
    </p>
    </output>
    
    
     <a href="#."  class="overlay" id="ozeniteHREF"></a>
    <output id="ozenite" class="popi">
    <h1>Пожалуйста, оцените наше приложение</h1>
    <p class="zwezda"><span>&#x2B50;</span><span>&#x2B50;</span><span>&#x2B50;</span><span>&#x2B50;</span><span>&#x2B50;</span></p>
    <p>
    Лучший способ поддержать - это рассказать другим
    </p>
    <p><small>Для оценки вы будете перенаправлены в Play Market</small></p>
    <p><a href="https://play.google.com/store/apps/details?id=ru.rouletka.pwa"><div id="ozeniteBtn"><div>Оценить</div></div></a></p>
    </output>
    
    <!-- 
    test_Yl7GFsIK2B4xGOQ_UazguZshpPDjosDeS1BN-DOqUZ4  shopId 383452
    -->
    <a href="#."  class="overlay" id="regeln"></a>
    <output id="regelnoutput" class="popi">
    <div class="modal-header">
          <h1>${lang=='ru'?'Правила видеочата':lang=='en'?'Chat rules':lang=='id'?'aturan obrolan':lang=='zh'?'聊天规则':''}</h1>
        </div>
        <div class="modal-body">
         ${get_rules(lang)}
          <div class="center-button">
            <button class="register-button" onclick="confirmRules();">${lang=='ru'?'Принять':lang=='en'?'Agree':lang=='zh'?'同意':lang=='id'?'setuju':''}</button>
          </div>
        </div>
      
    </output>
   
    ${login(n)}
    
    <!-- 410016439442251 er
    me 4100118676103827
    -->
    
 <a href="#."  class="overlay" id="setPrem"></a>
    <output id="premiumoutput2" class="popi">
    <section id="premContainer2"><div class="krestikdiv"><a href="#." class="krestik-two">&#x274C;</span></div>

	<form id="premForm2" method="post" action="https://yoomoney.ru/quickpay/confirm" name="ordertodo">
<p class="intro">Вы можете отключить рекламу, купив премиум аккаунт  &#x1F451; всего за 2 рублей в месяц. Но сперва залогиньтесь <a style="color:blue;text-decoration:underline;" href="#login">Войти</a> <br>Вы будете преренаправлены в yoomoney</p>
	<div id="premrapper2"> 
	 <div><input type="hidden" placeholder="Получатель yoomoney" name="receiver" value="4100118676103827" required/> </div>
	<input type="hidden" name="label" value="id=${n.user?n.user.id:'0'}&p=100"/>
    <input type="hidden" name="quickpay-form" value="button" />
    <input type="hidden" name="successURL" value="https://rouletka.ru/about" />
    <input type="hidden" name="formcomment" value="Покупка премиум аккаунта на месяц" />
    <input type="hidden" name="targets" value="Купить премиум аккаунт на месяц" />
    <div><input class="number"  type="hidden"  name="sum" value="2.00" required data-type="number"/></div>
   <input  class="input" type="hidden" checked name="paymentType" value="PC" /></div>
   <div><input  class="input" type="hidden" name="paymentType" value="AC" /></div>
   <div><input type="submit" id="premBtn2" value="Купить"/></div>
	
	</div>
	</form></output> 
    
    
    
    <dialog id="mydialog">
    <section id="inbox"></section>
     <form method="dialog">
     <menu>
     <button value="cancel">Нет</button>
      <button id="confirmBtn" value="confirm">Да</button></menu>
  </form>
    
    </dialog>
    
    
    <audio style="display:none;" id="auel" autoplay></audio> 
    
   <script src="/js/login4.js"></script>
   
    <script src="/js/webrtc8.js"></script>
    <script src="/js/whosonline.js"></script>
    <script src="/js/soupi444.js"></script>
    <script src="/js/hjanus.js"></script>
   <!-- <script src="/js/mediasoupadmin.js"></script> -->
    
    
    <script>
window.addEventListener("load", () => {
	return;
	if(Prem.value !="n") return;
    const render = (imageId) => {
        return new Promise((resolve, reject) => {
            window.yaContextCb.push(() => {
                Ya.Context.AdvManager.render({
                    "renderTo": imageId,
                    "blockId": "R-A-12098170-10",
                    "type": "inImage",
                    "onRender": resolve,
                    "onError": reject,
                    "altCallback": reject,
                    "onClose": function(){
						console.warn("reklama in Image closed");
						setTimeout(function(){
							console.warn("REKLAMA IN IMAGE MUST BE SHOWED");
							renderInImage(2, Array.from(document.querySelectorAll(".Vid")))
						}, 1000 * 60 * 1);
					}
                })
            })
        })
    }
    const renderInImage = (adImagesCounter, images) => {
		return;
        if (adImagesCounter <= 0 || !images.length) {
            return
        }
        const image = images.shift()
        image.id = 'yandex_rtb_R-A-12098170-10-${Math.random().toString(16).slice(2)}'
        if (image.tagName === "IMG" && !image.complete) {
            image.addEventListener("load", () => {
                render(image.id)
                    .then(() => renderInImage(adImagesCounter - 1, images))
                    .catch(() => renderInImage(adImagesCounter, images))
            }, { once: true })
        } else {
            render(image.id)
                .then(() => renderInImage(adImagesCounter - 1, images))
                .catch(() => renderInImage(adImagesCounter, images))
        }
    }
    renderInImage(2, Array.from(document.querySelectorAll(".Vid")))
}, { once: true })
</script>
    <br><br><br>
   <footer id="pfooter">(c)2025</footer> 
 
    
       </body>
</html>`;
}
module.exports=  {main:main};

const rules_ru =` <ol>
            <li id="1">
              <h4>Запрещено проявлять неуважительное отношение к собеседнику:</h4>
              <ul>
                <li>вести себя по-хамски и использовать ненормативную лексику;</li>
                <li>оскорблять по национальным, расовым и религиозным признакам;</li>
                <li>угрожать собеседнику.</li>
              </ul>
            </li>
            <li id="2">
              <h4>Запрещено вести себя вульгарно:</h4>
              <ul>
               <!-- <li><u>находиться в чате с голой грудью, не показывая своё лицо</u>;</li> -->
                <li>предлагать виртуальный секс;</li>
                <li>использовать слова, которые могут иметь неприличный сексуальный подтекст (вирт, пошалим, и
                  т.п.);
                </li>
              <!--  <li>находиться в чат рулетке без одежды или в нижнем белье;</li>
                <li>демонстрировать половые органы и другие интимные части тела;</li>
                <li>прикасаться к половым органам даже через одежду;</li>
                <li>направлять камеру ниже груди (старайтесь, чтобы ваше лицо было в кадре);</li> -->
                <li>совершать любые действия, которые могут расцениваться как непристойные.</li>
              </ul>
            </li>
            <li id="3">
              <h4>Запрещено показывать вместо себя посторонние изображения:</h4>
              <ul>
                <li>направлять камеру на экран монитора, планшета, телефона или телевизора;</li>
                <li>направлять камеру на фотографии;</li>
                <li>направлять камеру на любые текстовые сообщения;</li>
                <li>использовать эмуляторы веб-камеры.</li>
              </ul>
            </li>
            <li id="4">
              <h4>Запрещено спамить:</h4>
              <ul>
                <li>транслировать изображения или писать сообщения рекламного характера;</li>
                <li>отправлять в чате любые ссылки;</li>
                <li>осуществлять массовые рассылки сообщений;</li>
                <li>просить посетителей видеочата совершать действия в интернете: проголосовать, поставить лайки,
                  принять участие в опросе, зайти на сайт и т.п.
                </li>
              </ul>
            </li>
            <li id="5">
              <h4>Система жалоб</h4>
              <ul>
                <li>Любой посетитель видеочата может отправить жалобу на своего собеседника. К жалобе прикрепляется
                  изображение пользователя и его сообщение, на основании которых модератор принимает решение о
                  бане. Модераторы реагируют на жалобы круглосуточно, без выходных.
                </li>
                <li>Если на человека, нарушающего правила чата, часто жалуется большое количество пользователей, он
                  банится автоматически. Сложный механизм системы жалоб исключает случайные или несправедливые
                  баны.
                </li>
              </ul>
            </li>
          </ol>
          <p>Администрация видеочата не несёт ответственности за действия посетителей, но всеми силами старается бороться с нарушителями. Физически невозможно уследить за всеми нарушениями в чат рулетке, поэтому настоятельно просим вас жаловаться на нарушителей. Ваши жалобы помогают нам делать чат чище и лучше.</p>
          <p>Пользуясь чатом, вы принимаете и соглашаетесь выполнять установленные правила. Если вы не согласны с действующими правилами, вам следует прекратить пользоваться чатом.</p>
          `;
          const rules_en = `
          <h4>It is forbidden to show disrespect to the interlocutor:</h4>
          <ul>
                <li>behave rudely and use profanity;</li>
                <li>offend on national, racial and religious grounds;</li>
                <li>threaten the interlocutor.</li>
              </ul>
            </li>
            <li id="2">
              <h4>Vulgar behavior is prohibited:</h4>
              <ul>
                <li><u>being bare-chested in a chat without showing your face</u>;</li>
                <li>offer virtual sex;</li>
                <li>use words that may have indecent sexual connotations (virt, naughty, and
                  etc.);
                </li>
                <li>being in chat roulette without clothes or in underwear;</li>
                <li>exhibit genitals and other intimate parts of the body;</li>
                <li>touch the genitals even through clothing;</li>
                <li>point the camera below your chest (try to keep your face in the frame);</li>
                <li>commit any actions that may be considered obscene.</li>
              </ul>
            </li>
            <li id="3">
              <h4>It is prohibited to show other images instead of yourself:</h4>
              <ul>
                <li>point the camera at the screen of a monitor, tablet, phone or TV;</li>
                <li>point the camera at photos;</li>
                <li>point the camera at any text messages;</li>
                <li>use webcam emulators.</li>
              </ul>
            </li>
            <li id="4">
              <h4>Spam is prohibited:</h4>
              <ul>
                <li>broadcast images or write advertising messages;</li>
                <li>send any links in chat;</li>
                <li>carry out mass mailings of messages;</li>
                <li>ask video chat visitors to perform actions on the Internet: vote, like,
                  take part in a survey, visit the website, etc.
                </li>
              </ul>
            </li>
            <li id="5">
              <h4>Complaint system</h4>
              <ul>
                <li>Any video chat visitor can send a complaint against their interlocutor. Attached to the complaint
                  the user's image and his message, on the basis of which the moderator makes a decision about
                  bath. Moderators respond to complaints 24/7, 7 days a week.
                </li>
                <li>If a large number of users often complain about a person who violates chat rules, he
                  gets banned automatically. The complex mechanism of the complaint system excludes accidental or unfair
                  bans.
                </li>
              </ul>
            </li>
          </ol>
          <p>The video chat administration is not responsible for the actions of visitors, but does its best to combat violators. It is physically impossible to keep track of all violations in chat roulette, so we urge you to report violators. Your complaints help us make the chat cleaner and better.</p>
          <p>By using the chat, you accept and agree to abide by the established rules. If you do not agree with the current rules, you should stop using the chat.</p>
         
          `;
          
          const rules_zh = `
          <h4>禁止对对话者表现出不尊重：</h4>
          <ul>
                <li>行为粗鲁并使用脏话；</li>
                <li>基于民族、种族和宗教原因的冒犯；</li>
                <li>威胁对话者。</li>
              </ul>
            </li>
            <li ID="2">
              <h4>禁止粗俗行为：</h4>
              <ul>
                <li><u>聊天时赤裸上身，不露脸</u>；</li>
                <li>提供虚拟性爱；</li>
                <li>使用可能带有不雅性暗示的词语（virt、顽皮和
                  ETC。）;
                </li>
                <li>不穿衣服或不穿内衣参与聊天轮盘；</li>
                <li>展示生殖器和身体其他私密部位；</li>
                <li>即使隔着衣服也可以触摸生殖器；</li>
                <li>将相机对准您的胸部下方（尽量将您的脸保持在取景框内）；</li>
                <li>做出任何可能被视为猥亵的行为。</li>
              </ul>
            </li>
            <li ID="3">
              <h4>禁止显示其他图像而不是您自己：</h4>
              <ul>
                <li>将摄像头对准显示器、平板电脑、手机或电视的屏幕；</li>
                <li>将相机对准照片；</li>
                <li>将摄像头对准任何短信；</li>
                <li>使用网络摄像头模拟器。</li>
              </ul>
            </li>
            <李id =“4”>
              <h4>禁止垃圾邮件：</h4>
              <ul>
                <li>广播图像或撰写广告信息；</li>
                <li>在聊天中发送任何链接；</li>
                <li>进行群发邮件；</li>
                <li>要求视频聊天访问者在互联网上执行操作：投票、点赞、
                  参加调查、访问网站等。
                </li>
              </ul>
            </li>
            <李id =“5”>
              <h4>投诉系统</h4>
              <ul>
                <li>任何视频聊天访客都可以对其对话者提出​​投诉。附投诉书
                  用户的形象和他的信息，主持人据此做出决定
                  洗澡。版主每周 7 天、24/7 全天候回复投诉。
                </li>
                <li>如果经常有大量用户投诉某个人违反聊天规则，他
                  自动被禁止。投诉系统的复杂机制排除了意外或不公平的情况
                  禁令。
                </li>
              </ul>
            </li>
          </ol>
          <p>视频聊天管理部门不对访问者的行为负责，但会尽力打击违规者。从物理上来说，跟踪聊天轮盘赌中的所有违规行为是不可能的，因此我们强烈建议您举报违规者。您的投诉可以帮助我们让聊天变得更干净、更好。</p>
          <p>使用聊天即表示您接受并同意遵守既定规则。如果您不同意当前规则，则应停止使用聊天功能。</p>
          `;
          const rules_id = `
          <h4>Dilarang menunjukkan rasa tidak hormat kepada lawan bicara:</h4>
          <ul>
                <li>berperilaku kasar dan menggunakan kata-kata kotor;</li>
                <li>melanggar alasan kebangsaan, ras, dan agama;</li>
                <li>mengancam lawan bicaranya.</li>
              </ul>
            </li>
            <liid="2">
              <h4>Perilaku vulgar dilarang:</h4>
              <ul>
                <li><u>bertelanjang dada dalam obrolan tanpa menunjukkan wajah Anda</u>;</li>
                <li>menawarkan seks virtual;</li>
                <li>menggunakan kata-kata yang mungkin berkonotasi seksual tidak senonoh (baik, nakal, dan
                  dll.);
                </li>
                <li>berada dalam rolet obrolan tanpa pakaian atau pakaian dalam;</li>
                <li>menunjukkan alat kelamin dan bagian tubuh intim lainnya;</li>
                <li>menyentuh alat kelamin bahkan melalui pakaian;</li>
                <li>arahkan kamera ke bawah dada Anda (usahakan agar wajah Anda tetap berada dalam bingkai);</li>
                <li>melakukan tindakan apa pun yang mungkin dianggap cabul.</li>
              </ul>
            </li>
            <liid="3">
              <h4>Dilarang menampilkan gambar lain selain gambar Anda sendiri:</h4>
              <ul>
                <li>arahkan kamera ke layar monitor, tablet, ponsel, atau TV;</li>
                <li>arahkan kamera ke foto;</li>
                <li>arahkan kamera ke pesan teks apa pun;</li>
                <li>gunakan emulator webcam.</li>
              </ul>
            </li>
            <liid="4">
              <h4>Spam dilarang:</h4>
              <ul>
                <li>menyiarkan gambar atau menulis pesan iklan;</li>
                <li>kirim tautan apa pun dalam obrolan;</li>
                <li>melakukan pengiriman pesan secara massal;</li>
                <li>meminta pengunjung obrolan video untuk melakukan tindakan di Internet: pilih, sukai,
                  ikut serta dalam survei, mengunjungi situs web, dll.
                </li>
              </ul>
            </li>
            <liid="5">
              <h4>Sistem pengaduan</h4>
              <ul>
                <li>Setiap pengunjung obrolan video dapat mengirimkan keluhan terhadap lawan bicaranya. Terlampir pada pengaduan
                  gambar pengguna dan pesannya, yang menjadi dasar keputusan moderator
                  mandi. Moderator menanggapi keluhan 24/7, 7 hari seminggu.
                </li>
                <li>Jika banyak pengguna yang sering mengeluh tentang seseorang yang melanggar aturan obrolan, dia
                  akan dilarang secara otomatis. Mekanisme kompleks dari sistem pengaduan tidak termasuk yang disengaja atau tidak adil
                  larangan.
                </li>
              </ul>
            </li>
          </ol>
          <p>Administrasi obrolan video tidak bertanggung jawab atas tindakan pengunjung, namun melakukan yang terbaik untuk memberantas pelanggar. Secara fisik tidak mungkin untuk melacak semua pelanggaran dalam chat rolet, jadi kami mendorong Anda untuk melaporkan pelanggar. Keluhan Anda membantu kami menjadikan obrolan lebih bersih dan lebih baik.</p>
          <p>Dengan menggunakan obrolan, Anda menerima dan setuju untuk mematuhi aturan yang telah ditetapkan. Jika Anda tidak setuju dengan aturan saat ini, Anda sebaiknya berhenti menggunakan chat.</p>
          `;
function get_rules(lang){
	return lang=='ru'?rules_ru:lang=='en'?rules_en:lang=='zh'?rules_zh:lang=='id'?rules_id:'';
}
function daysUntilActionEnd(){
	const today = new Date();
	const nextyear = today.getFullYear() + 1;
	const actiondate = new Date(nextyear,3,1);
	const diffinmilliseconds = actiondate - today;
	const diffindays = Math.ceil(diffinmilliseconds / (1000 * 60 * 60 * 24));
	return diffindays;
}
function getCoin(){
return `
<div class="purse">
  <div class="coin">
    <div class="front"></div>
    <div class="back"></div>
    <div class="side">
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
      <div class="spoke"></div>
    </div>
  </div>
</div>
`;
}
