const videochat = function(n){
	return `<article class="slot">
   
    <aside id="slotinfo">
    <div id="videobox">
    <video id="local" autoplay></video>
    </div>
    
            
        <div id="glas"><div><img src="/img/eye2.svg"></div><div><span id="spanViews">0</span></div></div>
       <footer id="foot"> 
     <!--  ${n.owner?'<button class="panelbtn" onclick="getToy(this);">Игрушка</button>':''} -->
       <button class="panelbtn" id="pbtn" onclick="${n.owner?'letStart(this)':'subscribe(this)'}">${n.owner?'Start':'Subscribe'}</button>
        </footer> 
        </aside>
        <aside id="boxinfo">
       <div id="chatbox"></div>
       <footer id="pdf"> 
       
       
        </footer> 
        </aside>
       
       </article>`
}
module.exports = { videochat }
