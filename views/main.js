
const getSeoText = require('./getSeoText.js')
const { zar } = require('./zar.js')
const { whosonline } = require('./whosonline.js')
const { banus } = require('./banus.js')
const { banip } = require('./banip.js')
const { login } = require('./login.js');
const { nav } = require('./nav.js');
const { chatruletka } = require('./chatruletka.js')

const { warnig } = require('./warnig.js');

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
	<!-- <link rel="manifest" href="/manifest.json"> -->
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
		<link href="/css/gallery.css" rel="stylesheet">
		<!--<link href="/css/coin.css" rel="stylesheet"> -->
    <script src="/js/peerjs.min.js"></script>
<script src="/js/globalik.js"></script>

 <script src="/js/adapter-latest.js"></script> 
<!-- <script src="/js/sound.js"></script> -->

<script async src="https://yastatic.net/share2/share.js"></script>



<!-- /Yandex.Metrika counter -->

  <!--  <script src="/pwabuilder-sw-register.js"></script> -->
    <script>window.yaContextCb=window.yaContextCb||[]</script>
    <script src="https://yandex.ru/ads/system/context.js" async></script>
  </head>
  <body>
    <noscript>
    <div><img src="https://mc.yandex.ru/watch/103428143" style="position:absolute;left:-9999px;" alt=""/></div>
      <strong>We're sorry but chatroulette doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
   <!-- <section id="langbox">
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
</section> -->
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
   <input type="hidden" id="sess" value="${n.sess?n.sess:'no'}" />
    <script>
  const DEVELOPMENT = "${process.env.DEVELOPMENT === "yes"?"yes":"no"}";</script>
    </script>
 
  ${nav(n)}
    <br><br><br><br>
    <div id="startTr"><button id="transbtn2" onclick="startTrans(this);">Начать трансляцию</button></div><br><br><br>
		<section id="streamsection"><div id="poka"></div>
		<div class="whobox">
		<!-- <a href="/jstream">
			<div class="imgbox"><img src="/img/gold/some.jpg"></div>
			<div class="glas">
			<div><img src="/img/eye2.svg"></div>
			<div><span data-nowroomid="sss" class="spanViews">69</span></div>
			</div>
			
			</a> --></div>
		
		
		</section>
	
		<br>
 
 
	
	 
	 
	 
	 
	 

    
   
	
	
	
	
   
    ${BAN==0?banip(n):banus(n)}
    
    
    
  
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
    
    
    
 
    
    
    
    
    
    <audio style="display:none;" id="auel" autoplay></audio> 
    
   <script src="/js/login4.js"></script>
   
   <!-- <script src="/js/webrtc8.js"></script>
    <script src="/js/whosonline.js"></script>
    <script src="/js/soupi444.js"></script> -->
    <script src="/js/hjanus.js"></script>
   
    
    <!--
   
    <br><br><br>
   <footer id="pfooter">(c)2025&nbsp;&nbsp;&nbsp;</footer> 
  
    
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
