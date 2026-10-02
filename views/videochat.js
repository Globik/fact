const videochat = function(n){
	return `
   <article class="slot">
    <aside id="slotinfo">
    <div id="videobox"><section id="mobileloader"><div class="loader"></div></section>
    <span id="live-badge">LIVE</span>
    <span class="viewers">👁 <b id="spanViews">0</b></span>
    <video id="local" autoplay muted class="Vid" playsinline></video>
    <button class="icon-btn play-btn" id="playBtn" aria-label="Воспроизвести" onclick="${n.owner?'letStart(this)':'subscribe(this)'}">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <polygon points="6,4 20,12 6,20" />
    </svg>
  </button>

  <!-- Две палочки (пауза) — SVG -->
  <button class="icon-btn pause-btn" id="pauseBtn" aria-label="Пауза" onclick="${n.owner?'letStop(this)':'letUnsubscribe(this)'}">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="5"  y="4" width="4" height="16" rx="1" />
      <rect x="15" y="4" width="4" height="16" rx="1" />
    </svg>
  </button>
    </div>
    
            
       
       <footer id="foot"> 
    ${n.owner?`<button class="panelbtn" id="pbtn" onclick="letStreaming(this);">Start</button>`:''}
        </footer> 
        </aside>
        <aside id="boxinfo">
        <div id="chatnav"><span>Chat</span></div>
       <div id="chatbox">${n.fake_msgs?get_fake_msgs(n):''}</div>
       <footer id="pdf"> 
       <div class="part">
       <textarea id="txt" class="textarea" placeholder="Your message"></textarea>
       </div>
       <div class="part" id="sendbtn" onclick="sendMessage(this);">
       <img id="sukaimg" src="/img/send1.svg"/>
       </div>
        </footer> 
        </aside>
       <audio style="display:none;" id="audioel"></audio>
       </article>
       <style>#ex1,#ex2{width:100%;height:600px;border:1px solid green;}</style><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
       <h2>iframe</h2>
       <iframe id="ex1" src="https://tips.tips/ru/w/progress/486269/8b9845c67186fa270ca9b734c7c24ea0237989f38cccf6d7bd2b24be83903c8a"></iframe><br>
       <iframe id="ex2" src="https://tips.tips/ru/w/donation-alert/486269/8b9845c67186fa270ca9b734c7c24ea0237989f38cccf6d7bd2b24be83903c8a"></iframe>
       `
	}
	module.exports = { videochat }
	function get_fake_msgs(n){
	let s = '';
	if(Array.isArray(n.fake_msgs)){
		n.fake_msgs.forEach(function(el,i){
			s+=`<div class="msg"><b>${el.fromi}:</b>&nbsp;<b>${esci(el.message)}</b></div>`;
		});
	}
	return s;
	} 
	const html_sA={
	'\n':' ',
	'&':'&amp',
	'<':'&lt;',
	'>':'&gt;',
	'"':'&quot;',
	"'":'&#x27;',
	'/':'&#x2F;'
	}
	const er_sA=/[\n&<>"'\/]/g;
	function esci(str){
		return (''+str).replace(er_sA,function(m){return html_sA[m];});
		}
