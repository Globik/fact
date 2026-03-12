var sock = null;
var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
var new_uri;
if (window.location.protocol === "https:") {
  new_uri = "wss:";
} else {
  new_uri = "ws:";
}
function send(el){
	//alert(txtarea.value);
	if(!txtarea.value) return;
	wsend({ value: esci(txtarea.value.trim()) });
		txtarea.value = "";
}
function get_socket() {
	
	
 if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + "/janusstream");

  sock.onopen = function () {
	 console.log("websocket opened");
	// heartbeat();
  };
  sock.onerror = function (e) {
   // note({ content: "Websocket error: " + e, type: "error", time: 5 });
  };
  sock.addEventListener('message', function (evt) {
	  
    let a;
    try {
      a = JSON.parse(evt.data);
      on_msg(a);
    } catch (e) {
      note({ content: e, type: "error", time: 5 });
    }
  });
  sock.onclose = function () {
	
    console.log('socket closed');
    
  };
}
get_socket();
function on_msg(a){
	if(a.type == "janusstream"){
	
		insert_message(a);
	
	}else if(a.type == "januscount"){
		janusCount.textContent = a.count;
	}
}
function insert_message(a){
let div=document.createElement('div');
	div.className="msg";
	div.innerHTML="<span><b>" + (a.fromi?a.fromi:"anon") + ": </b></span><br><span>" + esci(a.value.trim()) + "</span>";
	//div.innerHTML = "<span>" + esci(a.value.trim()) + "</span>";
	chatbox.appendChild(div);
	chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
	}
	
	function wsend(obj){
	if(!sock) return;
	let d;
	obj.type = "janusstream";
	//alert(userName.value);
	obj.from = userName.value;
	try{
		d = JSON.stringify(obj);
		if(sock.readyState == WebSocket.OPEN)sock.send(d);
	}catch(e){}
}
async function getMessages(){
	try{
	let sip = 	await fetch('/getMessages', {method: "GET", headers: {"Content-Type": "application/json",}});
	  if(sip.ok){
		  let di = await sip.json();
		  if(di.error){
			  console.error(di.error);
			  return;
		  }
		//console.log(di.result);
		if(di.result.length > 0 ){
			di.result.forEach(function(el, i){
				console.log(el);
					//for(var i=0;i<40;i++){
				insert_message({fromi:(el.fromi?el.fromi:'anon'), value: el.message});
				
//}
			});
		}
		 
	  }}catch(e){
		//  console.error(e);
	  }
}
getMessages();
 const video = document.getElementById('remotevideo');
        const status = document.getElementById('status');
        const source = '/media/index.m3u8';

        if (Hls.isSupported()) {
        //  const hls = new Hls({ debug: true, enableWorker: true });
          const hls = new Hls({
      // ✅ Важно для live-стрима:
      debug:false,
      liveSyncDurationCount: 3,
      liveMaxLatencyDurationCount: 6,
      enableWorker: true,
      lowLatencyMode: false,
      backBufferLength: 90
    });
          hls.loadSource(source);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            status.innerText = '✅ HLS Connected (hls.js)';
            video.play().catch(e => console.log('Autoplay blocked'));
          });
          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) status.innerText = '❌ Fatal Error: ' + data.type;
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = source;
          video.addEventListener('loadedmetadata', () => {
            status.innerText = '✅ HLS Connected (Native)';
            video.play();
          });
        } else {
          status.innerText = '❌ HLS not supported in this browser';
        }
