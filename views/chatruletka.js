const chatruletka = function(n){
	var lang = n.lang;
	return `
 <article id="mediabox">
    <nav id="navpanel"><div class="nav"><b>Онлайн: <span id="onlineCount">0</span></b>&nbsp;&nbsp;&nbsp; <b id="VKUSERNAME">${n.user?n.user.name:'anon'}</b>
 
   
    </div>
    
    <div id="settings" class="ita" onclick="panelOpen(this);">
 <img class="setimg" src="/img/set2.svg">
</div>


<div id="settingspanel">
${n.user && n.user.brole=='admin'?'<div class="settingspanel" onclick="toAdminPanel(this);">В админку</div>':''}


<div class="settingspanel"><b>${lang=='ru'?'Вебок':
lang=='en'?'Cams':
lang=='zh'?'网络摄像头':
lang=='id'?'kamera web':''}:</b> <span id="camsCount">0</span> | <b>${lang=='ru'?'Коннектов':
lang=='en'?'Connects':
lang=='zh'?'连接':
lang=='id'?'koneksi':''}:</b> <span id="connects">0</span></div>
 
 <div class="settingspanel" onclick="showWhosOnline();">${lang=='ru'?'Кто онлайн':"Who's online"}</div>




 
 

${n.user?`<div class="settingspanel" onclick="logout(this);">${lang=='ru'?'Выйти':lang=='en'?'Logout':lang=='zh'?'登出':lang=='id'?'keluar':''}</div>`:
`${!n.VK ? `<div class="settingspanel"><a href="#login" onclick="panelOpen();">${lang=='ru'?'Войти':lang=='en'?'Log in':lang=='zh'?'登录':
	lang=='id'?'Gabung':''}</a></div>`:''}`}

</div>
</nav>

    <section id="container">
    <div id="remotecontainer" onclick="closeClaim(this);">
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
  
     <div id="duka2">Жизнь как рулетка. Никогда не узнаешь, кого встретишь следующим...</div>
     
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
	
	</div>
<section id="sectionTextArea" class="hide">
<div id="textarea2" class="hide"><textarea id="txtvalue2" style="${n.VK?'width:calc(100% - 65px - 30px);':''}" data-publish="none" data-send="two" placeholder="${lang=='ru'?'Сообщение':
lang=='en'?'Message':
lang=='zh'?'信息':
lang=='id'?'pesan':''}"  disabled  onfocus="onfoci();" onblur=""></textarea>

</div></section>
</section> 

    </div>
<div id="localcontainer"><video id="local"  class=""  autoplay muted playsinline  poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video></div>

<div id="controlsContainer"><button id="startbtn" class="start" data-start="no" onclick="start(this);">${lang=='ru'?'старт':lang=='en'?'start':lang=='zh'?'开始':lang=='id'?'awal':''}</button>
<button id="nextbtn" class="next" onclick="next(this,true);" disabled>${lang=='ru'?'далее':lang=='en'?'next':lang=='zh'?'下一个':lang=='id'?'Berikutnya':''}</button>
 <div id="somespinner" class="text">
 
      <span class="duka">${lang=='ru'?'Жизнь как рулетка. Никогда не узнаешь, кого встретишь следующим':
      lang=='en'?'Life is like roulette. You never know who you\'ll meet next':
      lang=='zh'?'生活就像轮盘赌。你永远不知道接下来会遇到谁':
      lang=='id'?'Hidup itu seperti rolet. Anda tidak pernah tahu siapa yang akan Anda temui selanjutnya':''}...</span>
      </div>
       <div id="somehello" class="text">
        <span class="tip"><i class="fas fa-check"></i></span>
        ${lang=='ru'?'Просто поздоровайтесь друг с другом':
        lang=='en'?'Just say hello to each other':
        lang=='zh'?'只是互相打个招呼':
        lang=='id'?'Katakan saja halo satu sama lain':''} :D
      </div>
<div id="foot">

 <div class="ya-share2" data-curtain data-size="m" data-shape="round"  data-services="vkontakte,telegram,odnoklassniki" 
data-url="https://chatikon.ru" data-image="https://chatikon.ru/og_image.png"></div>
</div></div>

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

 <div class="send" data-publish="none" data-send="one" onclick="sendi(this);" value="papa" ><img style="cursor:pointer;" src="/img/send1.svg"/></div> 
</div>
</section>
</div>

    </section>
    </article>
    `}
    module.exports = {chatruletka}
