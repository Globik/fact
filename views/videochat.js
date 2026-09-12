const videochat = function(n){
	return `
   <article class="slot">
    <aside id="slotinfo">
    <div id="videobox"><section id="mobileloader"><div class="loader"></div></section>
    <video id="local" autoplay muted class="Vid"></video>
     <div id="glas"><div><img src="/img/eye2.svg"></div><div><span id="spanViews">0</span></div></div>
    </div>
    
            
       
       <footer id="foot"> 
     <!--  ${n.owner?'<button class="panelbtn" onclick="getToy(this);">Игрушка</button>':''} -->
       <button class="panelbtn" id="pbtn" onclick="${n.owner?'letStart(this)':'subscribe(this)'}">${n.owner?'Start':'Subscribe'}</button>
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
