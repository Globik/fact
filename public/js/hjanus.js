var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
var new_uri;
var sock = null;
var MYSOCKETID;
if (window.location.protocol === "https:") {
  new_uri = "wss:";
} else {
  new_uri = "ws:";
}
function L(){ return Lang.value; }
function wsend(obj){
	if(!sock) return;
	let d;
	obj.from = MYSOCKETID;
	try{
		d = JSON.stringify(obj);
		if(sock.readyState == WebSocket.OPEN)sock.send(d);
	}catch(e){}
}
function Login(){
	if(isLogin.value == 'true'){
		return true;
	}else{
		return false;
	}
}
function get_socket() {
if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + "/gesamt");

  sock.onopen = function () {
	 console.log("websocket opened");
	// heartbeat();
	 wsend({ type: "helloServer", userId: gid("userId").value?gid("userId").value:'anon', isprem: Prem.value, nick: userName.value, logged:  Login()?"yes":"no", LANG: 'L' });
	 
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
    sock = null;
    note({ content: "Соединение с сервером закрыто!", type: "info", time: 5 });
    console.log('socket closed');
     };
}
get_socket();
function on_msg(msg) {
	//console.log("data type: ", msg.type);
	 switch (msg.type) {
		 
		 case 'helloServer':
		
		MYSOCKETID = msg.socketId;
		initPeer(MYSOCKETID);
		 break;
		 
      case 'online':
        onlineCount.textContent = msg.online
        break;
         case 'janus':
        handleJanus(msg);
        case 'error':
        note({ content: msg.err, type: "error", time: 5 });
        break;
	}
}

function handleJanus(obj){
	if(obj.subtype=="all"){
		if(poka)poka.remove();
		obj.who.forEach(function(el,i){
			let div=document.createElement('div');
			div.className="whobox";
			div.setAttribute('data-roomid', el[1].roomid);
			div.setAttribute('data-streamid', el[1].streamid);
			//alert(el[1].roomid);
			div.innerHTML = `<a href="/stream/${el[1].roomid}/${el[1].streamid}">
			<div class="imgbox"><img src="${el[1].src}"></div>
			<div class="glas"><div><img src="/img/eye2.svg"></div><div>&nbsp;<span data-nowroomid="${el[1].roomid}" class="spanViews">${el[1].views}</span></div></div>
			
			</a>`
			streamsection.appendChild(div);
		});
}else if(obj.subtype == 'add'){
	if(poka)poka.remove();
	let div = document.createElement('div');
	div.className="whobox";
			div.setAttribute('data-roomid', obj.roomid);
			div.setAttribute('data-streamid', obj.streamid);
			//div.setAttribute("onclick", `gofuck({roomid:${obj.roomid}, streamid:${obj.streamid} })`);
			div.innerHTML = `<a href="/stream/${obj.roomid}/${obj.streamid}">
			<div class="imgbox"><img src="${obj.src}"></div>
			<div class="glas">
			<div><img src="/img/eye2.svg"></div>
			<div><span data-nowroomid="${obj.roomid}" class="spanViews">${obj.views}</span></div>
			
		
			</div>
			</a>`;
			streamsection.appendChild(div);
	
}else if(obj.subtype == "remove"){
	//alert(obj.subtype);
	let a = document.querySelector(`[data-streamid="${obj.streamid}"]`);
	//alert(a + ' '+ obj.streamid);
	if(a)a.remove();
}else if(obj.type == "onviews"){
	let a = document.querySelector(`[data-nowroomid="${obj.roomid}"]`);
	if(a)a.textContent = obj.views;
}
}
function startTrans(el){
	//if(isLogin.value === "false"){
	//	window.location.href="#login";
	//}else{
		//alert(userId.value);
		//window.location.href = "/stream/"+userId.value;
		//alert(sess.value);
		window.location.href = "/papa";//+sess.value;
	//}
}
function initPeer(id){
	return;
	  const iceServersConfig = {
        iceServers: [
            // Бесплатный публичный STUN сервер от Google
            { urls: 'stun:stun.l.google.com:19302' },
            
            // Пример TURN сервера (нужен свой или платный)
            // {
            //     urls: 'turn:your-turn-server.com:3478',
            //     username: 'myusername',
            //     credential: 'mypassword'
            // }
        ],sdpSemantics: 'unified-plan'
    };
     peer = new Peer(id, {
        debug: 2,
        secure:false,
        path:"/myapp",
        host:"/",
        port:9000,
        key:'peerjs',
        config: iceServersConfig // Передаем конфиг сюда
    });

    peer.on('open', (id) => {
       // alert('opened '+id);
       // peer.socket.send(JSON.stringify({type:'durak',suka:true}));
     //  peer.socket.send({type:'NEW_REMOTE_PEER_REQUEST'});
    });
}
