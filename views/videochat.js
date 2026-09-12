const videochat = function(n){
	return `
   <article class="slot">
    <aside id="slotinfo">
    <div id="videobox"><section id="mobileloader"><div class="loader"></div></section>
    <span id="live-badge">LIVE</span>
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
     <div id="glas"><div><img src="/img/eye2.svg"></div><div><span id="spanViews">0</span></div></div>
    </div>
    
            
       
       <footer id="foot"> 
    ${n.owner?`<button class="panelbtn" id="pbtn" onclick="letStreaming(this);">Start</button>`:''}
        </footer> 
        </aside>
        <aside id="boxinfo">
        <div id="chatnav"><span>Chat</span></div>
       <div id="chatbox"></div>
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
       </article>`
}
module.exports = { videochat }
