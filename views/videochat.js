const {esci, formatChatTime, getStrForChat, formatTimeOnly, get_fake_msgs  } = require('../libs/utils.js');
const videochat = function(n){
	return `
	${n.donprog && n.donprog === "yes"?`
	<section id="ifprogress">
	<iframe 
	onerror="gid('ifprogress').remove();"
    class="donation-widget-overlay" 
    src="https://tips.tips/ru/w/progress/486269/8b9845c67186fa270ca9b734c7c24ea0237989f38cccf6d7bd2b24be83903c8a" 
    frameborder="0" 
    width="200"
    height="100"
    scrolling="no"
    style="border:none;"
    allowtransparency="true">
  </iframe>
	</section>`:''}
	${n.fake && n.fake==="yes"?`<div id="myqr" class="qrCont" title="https://tips.tips/000486269">
	<a title="https://tips.tips/000486269" href="https://tips.tips/000486269" target="_blank" onclick="${n.fake&&n.fake==='yes'?'donateFake(this);':'donateNotFake(this);'}">
	<img alt="https://tips.tips/000486269" class="someQr" onerror="gid('myqr').remove();" src="https://api.tips.tips/storage/images/2026/10/02/5b8cbdb0-7407-4255-9a91-15c47c2c0f12.png"/>
	</a></div>`:''}
	<div id="someNick"><span id="nickspan">${n.nick?n.nick:(n.user?n.user.name:'anon')}</span></div>
   <article class="slot">
    <aside id="slotinfo">
    <div id="videobox"><section id="mobileloader"><div class="loader"></div></section>
    ${n.donalert && n.donalert === "yes"?`
    <div id="alertdon-container">
       <iframe id="ex2" 
       onerror="gid('alertdon-container').remove();"
        frameborder="0" 
    width="1200"
    height="1200"
    scrolling="no"
   
    allowtransparency="true"
       src="https://tips.tips/ru/w/donation-alert/486269/8b9845c67186fa270ca9b734c7c24ea0237989f38cccf6d7bd2b24be83903c8a"></iframe>
       </div> 
      `:''}
    <span id="live-badge">LIVE</span>
    <span class="viewers">👁 <b id="spanViews">0</b></span>
    <video id="local" autoplay muted class="Vid" playsinline></video>
    <button class="icon-btn play-btn" id="playBtn" aria-label="Воспроизвести" onclick="${n.owner?'letStart(this)':'subscribe(this)'}"> 
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <polygon points="6,4 20,12 6,20" />
    </svg>
  </button>
  <button class="icon-btn pause-btn" id="pauseBtn" aria-label="Пауза" onclick="${n.owner?'letStop(this)':'letUnsubscribe(this)'}">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="5"  y="4" width="4" height="16" rx="1" />
      <rect x="15" y="4" width="4" height="16" rx="1" />
    </svg>
  </button> 
    </div>
    
            
       
       <footer id="foot"> 
    ${n.owner?`<button class="panelbtn" id="pbtn" onclick="letStreaming(this);">Start</button>`:`
    Поддержать донатом&nbsp;<a href="https://tips.tips/000486269" target="_blank" onclick="${n.fake&&n.fake==='yes'?'donateFake(this);':'donateNotFake(this);'}">
    https://tips.tips/000486269</a>`}
        </footer> 
        </aside>
        <aside id="boxinfo">
        <div id="chatnav"><div id="chatSpanCont"><span><b>Чат</b></span></div>
        <div id="settingsStream" class="ita2" onclick="panelOpenStream(this);"><img class="setimg2" src="/img/set2.svg"></div>
        <div id="settingspanel2" class="">

${n.owner?`<div class="settingspanel2"><p class="navp2"><a href="#settingsDonation" onclick="getSettingDonation();">Настроить донат</a></p></div>`:''}
</div>
        </div>
       <div id="chatboxcontainer"><div id="chatbox">${n.fake_msgs?get_fake_msgs(n):''}</div></div>
       <footer id="pdf"> 
       <div class="part">
       <textarea id="txt" class="textarea" placeholder="Your message"></textarea>
       </div>
       <div class="part" id="sendbtn" onclick="sendMessage(this);">
       <img id="sukaimg" src="/img/send1.svg"/>
       </div>
        </footer> 
        </aside>
      
       </article>
       <audio style="display:none;" id="audioel"></audio>
       <script>
       window.addEventListener('message', (event) => {
      // alert("event " + event.origin);
    // SECURITY CHECK: Always verify the origin!
    if (event.origin !== 'https://tips.tips') {
        return; // Ignore messages from unknown sources
    }

    console.log('Received data from Tips.tips:', event.data);
    
    // Now you can update your UI based on this data
    // e.g., show a custom HTML notification instead of relying on the iframe's internal rendering
});
	const formatChatTime = ${formatChatTime}
	const getStrForChat = ${getStrForChat}
	const formatTimeOnly = ${formatTimeOnly}
       </script>`
	}
	
	module.exports = { videochat }
	
