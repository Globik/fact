//alert(1);
var janus=null;
var authT;
const Spinner =  document.querySelector("#videobox section");
let localStream=null;
const local=document.querySelector(".Vid");
var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
isOpen = false;
var sock = null;
var new_uri;
var mystreamId = null;
//alert(userid.value)
var useridi = Number(userid.value);//getShortTimeId();
//alert(useridi)
var MYSOCKETID;
const liveBadge = gid("live-badge");
function getShortTimeId() {
  const now = new Date();
  
  // Берем часы, минуты, секунды и миллисекунды
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ms = now.getMilliseconds().toString().padStart(3, '0');
  
  // Склеиваем в одно большое число: ЧЧММССммм
  return Number(`${hours}${minutes}${seconds}${ms}`);
}

// Пример вывода: 143055123 (14 часов, 30 минут, 55 секунд, 123 миллисекунды)
console.log(getShortTimeId());


async function getservers(){
	 try{
	let reqi = await fetch('/turn', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({ tok: gid("TOK").value })});
	if(reqi.ok){
		let config = await reqi.json();
		console.log(config);
		console.log('config ', config.username + ' ' + config.password);
	let servers = {
	//	iceTransportPolicy:"relay",
	"iceServers":[
	{
		"urls":[
		//"stun:127.0.0.1:3478",
		"stun:stun.l.google.com:19302",
		"stun:chatikon.ru:3479"
		]
		
		},
	{
		urls:[
	//"turn:127.0.1:3478",
		"turn:chatikon.ru:3479", 
		//"turn:5.35.88.151:3479?transport=tcp", 
		//"turn:rouletka.ru:5348",
		//"turn:rouletka.ru:5348?transport=tcp" ,
		//"turn:rouletka.ru:5348?transport=udp"//no stun
		],
		username: config.username, credential:config.password 
		//username:"alik",credential:"123456"
		}]
	}
	return servers.iceServers;
}
return undefined;
}catch(er){
	alert(er);
console.error(er);
	return undefined;
}
}




function panelOpen(el){
			
			var settingspanel = document.getElementById("settingspanel");
			if(!isOpen){
			settingspanel.className = "open";
			isOpen = true;	
			}else{
				 
				settingspanel.className = "";
				isOpen = false;
			}
		}
		if (window.location.protocol === "https:") {
  new_uri = "wss:";
} else {
  new_uri = "ws:";
}

		function get_socket() {
	//alert(2);
	
 if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + '/'+Number(userid.value));
 //sock=new WebSocket("wss://rouletka.ru/gesamt");

  sock.onopen = function () {
	 console.log("websocket opened");
	 // alert(owner.value);
	 if(owner.value=="false"){
		// alert(useridi);
	 wsend({"request":"janus","subtype":"getposter", "streamid":useridi});
	}
  };
  sock.onerror = function (e) {
   // note({ content: "Websocket error: " + e, type: "error", time: 5 });
  };
  
  sock.addEventListener('message', function (evt) {
	  
    let a;
    try {
		
      a = JSON.parse(evt.data);
      //console.log(a);
      on_msg(a);
    } catch (e) {
      note({ content: e, type: "error", time: 5 });
    }
  });
  sock.onclose = function () {
    
  };
}
get_socket();
function on_msg(d){
	if(d.type==='janus'){
		if(d.subtype == 'onviews'){
			spanViews.textContent = d.views;
		}else if(d.subtype==="getposter"){
		local.poster=d.src;
	}
	}else if(d.type==='welcome'){
		MYSOCKETID=d.socketid;
	}else if(d.type==='msg'){
		//alert(d);
		handle_message(d);
	}else if(d.type === 'online'){
		onlineCount.textContent = d.online;
	}else{}
}

var server = null;
var sfutest = null;
if(window.location.protocol === 'http:'){
	server = "ws://" + window.location.hostname + ":8188/janus";
}else{
	server = "wss://" + window.location.hostname + ":8990/janus";//:8989/janus";
}

var opaqueId = "videoroomtest-"+Janus.randomString(12);
//alert(opaqueId)
function createRoom(){
	if(!sfutest)return;
	//alert(roomnum.value);
	let checkroom={
		request:"join",
		room: Number(useridi),
		ptype:"publisher",
		"is_private": false,
		notify_joining:true
	}
    sfutest.send({message:checkroom});
    //alert(a);
}
function check(){
	//alert(roomnum.value);
	let checkroom={
		request:"list",
		
	}
    sfutest.send({message:checkroom});
    sfutest.send({message:{request:"listparticipants",
        "room" : Number(useridi)}});
}
// Close socket when page is hidden/cached
window.addEventListener('pagehide', () => {
  if (sock && sock.readyState === WebSocket.OPEN) {
    sock.close();
  }
});

// Alternative: also handle visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
 //alert("hidden");
  //  sock.close();
  }
});
function getJanus(el){
	//el.disabled = true;
	let l = document.querySelector("#videobox section");
	if(l){l.style.display="flex";}
Janus.init({debug: "all", callback: async function() {
	let serv = await getservers();
	janus = new Janus(
				{
					server: server,
					iceServers: (serv?serv:null),
					// Should the Janus API require authentication, you can specify either the API secret or user token here too
					//		token: "mytoken",
					//	or
					//		apisecret: "serversecret",
					error:function(m){alert('2 '+ m);},
					success:function(){
						getAttach(el);
						}})}})
				}
function letStreaming(el){
	
	if(!localStream){
		note({ content:"Сперва включите веб камеру-то!", type: "error",time:5 });
		return;
	}
	if(!sfutest){
		note({ content: "What the fuck is going on here?", type: "error", time: 5 });
		return;
	}
	el.disabled = true;
	
	if(Spinner){Spinner.style.display = "flex";}
	createOffer(sfutest, localStream);  
}
function getAttach(el){
// 1. Прикрепляем плагин (предполагается, что сессия `janus` уже создана)
janus.attach({
    plugin: "janus.plugin.videoroom",
    success: function(pluginHandle) {
        console.log("Плагин подключен");
  sfutest=pluginHandle;
        // 2. Входим в комнату как публикующий
        let joinRequest = {
            request: "create",
            display: "Ведущий",
           // "room": Number(userid.value),
           "room":useridi,
		     "ptype":"publisher",
		"is_private": false,
		"secret":"suka"
        };
     //   pluginHandle.send({ message: joinRequest });
        sfutest.send({ message: joinRequest });
        createRoom();
//alert(3)
        // 3. Назначаем обработчики
        pluginHandle.onmessage = function(msg, jsep) {
			//alert(4);
            console.log("Получено сообщение:", msg);

            // 3.1. Успешный вход в комнату - ТОЛЬКО ТЕПЕРЬ запрашиваем медиа
            if (msg.videoroom === "joined") {
                note({ content: "✅ Вошли в комнату с ID:" + msg.room, type: "info", time: 5 });
            // idvalue.value=msg.id;
            mystreamId = msg.id;
                // КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: getUserMedia вызывается здесь
                navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                    .then(function(stream) {
						localStream = stream;
                        
                        console.log("Медиа получены, ожидаю onlocalstream...");
                         //let stream = new MediaStream();
           //stream.addTrack(track);
           local.srcObject = stream;
                       // createOffer(pluginHandle, stream);   
                       /*
                       let foo={
						   request:"destroy",
						    "room":useridi,
		//     "ptype":"publisher",
		//"is_private": false,
		"secret":"suka"
						   
					   }
					   
                        pluginHandle.send({ message:foo});
                        */ 
                    }).catch(function(err) { 
						if(err.name == "NotFoundError" || err.name == "DevicesNotFoundError"){
				note({ content: "Вебкамера или микрофон не найдены", type: "warn", time: 5 });
			
			}else if(err.name == "NotAllowedError" || err.name == "PermissionDeniedError"){
				note({ content: "Пожалуйста, разрешите браузеру использовать камеру и микрофон.", type: "warn", time: 5 });
			}else{
				console.error(err);
				note({content: err.name, type:"warn", time: 5 });
			}
			el.disabled = false;
						
						});
            }else if(msg.videoroom === "destroyed"){
				note({ content: "Вы вышли из комнаты " + msg.room, type: "info", time: 5 });
			}
            if(msg.videoroom==='event'&&msg.unpublish==='ok'){
				alert('unpublish');
			
				pluginHandle.detach();
			}
			if(msg.videoroom==='event' && msg.leaving==='ok'){
				alert('leaving');
				console.log('leaving');
				freeLocalStream();
				pluginHandle.detach();
			}

            // 3.2. Обработка SDP-ответа от сервера
            if (jsep) {
                pluginHandle.handleRemoteJsep({ jsep: jsep });
            }
        };

        // 4. КЛЮЧЕВОЙ ОБРАБОТЧИК: сработает, когда библиотека janus.js подключит поток к PeerConnection
        pluginHandle.onlocaltrack = function(track,on) {
			if(on){
           if(track.kind=='video'){
			  //alert('video');
            //if (on) {
            
           let stream = new MediaStream();
           stream.addTrack(track);
         //  local.srcObject = stream;
           
           // }
           //Janus.attachMediaStream(local,track.stream);
        }else if(track.kind=='audio'){
			//alert('track audio');
			//if(on){
			let stream = new MediaStream();
            stream.addTrack(track);
            //local.srcObject = stream;
			//}
		}
		} else {
            local.srcObject = null;
        }
          
        
        };

        // 7. Обработчик успешной публикации
        pluginHandle.oncleanup = function() {
            console.log("Публикация завершена");
          freeLocalStream();
        };
    },
    error: function(error) {
        console.error("Ошибка подключения к плагину:", error);
    },
    iceState: function(state) {
				console.log("ICE state (remote feed) changed to " + state);
			},
			webrtcState: function(on) {
				console.log("Janus says this WebRTC PeerConnection (remote feed) is " + (on ? "up" : "down") + " now");
				if(on){
					//alert('sex');
					pbtn.disabled = false;
					pbtn.textContent = "Stop";
					pbtn.setAttribute('onclick',"destroy(this);");
					let l = document.querySelector("#videobox section");
					if(l){l.style.display="none";}
					videobox.classList.remove('playing');
					liveBadge.style.display = "flex";
					note({ content: "Вы в эфире!", type:'info', time:5 });
					setTimeout(function(){
					let imgdata = Screenshot();
					//alert('userid '+userid.value);
					wsend({ request: 'janus', subtype: "owner", roomid: useridi, userid:useridi, nick: username.value, streamid: mystreamId, src: imgdata });
					
					
				}, 1000);
				}else{
					liveBadge.style.display = "none";
					note({content:"Вышли из эфира!", type:"info", time: 5 });
					el.disabled = false;
					pbtn.textContent = "Start";
					pbtn.setAttribute("onclick",`letStreaming(this);`);
					playBtn.disabled = false;
					playBtn.classList.add("play-btn");
					//pauseBtn.style.transition = "none";
					sfutest.detach();
					wsend({ request: "janus", subtype: "remove", roomid:Number(userid.value) , streamid: mystreamId });
				}
			},
});
}

function freeLocalStream(){
		 localStream.getTracks().forEach(track => {
	
     track.stop()
    
    })
    localStream = null;
    sfutest = null;
}

 function createOffer(pluginHandle, stream){
                          pluginHandle.createOffer({
                media: {
                    stream: stream, // Явно передаем полученный поток
                    audioSend: true,
                    videoSend: true,
                    audioRecv: false, // Для публикующего обычно false
                    videoRecv: false
                },
                trickle: true,
                success: function(jsepOffer) {
                    console.log("Создано SDP-предложение");

                    // 6. Отправляем запрос на публикацию с нашим предложением
                    let publishRequest = {
                        request: "publish", // Используем Publish[citation:10]
                        audio: true,
                        video: true
                    };
                    pluginHandle.send({
                        message: publishRequest,
                        jsep: jsepOffer
                    });
                },
                error: function(error) {
                    console.error("Ошибка createOffer:", error);
                }
            })
                        
              }         


function destroy(){
	if(!sfutest)return;
	sfutest.send({message:{request:'destroy', secret:'suka', room:Number(useridi)}});
}


function Screenshot() {
	if(!local.srcObject) return;
    let cnv = document.createElement('canvas');
    let c = cnv.getContext('2d');
    var ww = local.videoWidth;//4;
    var hh = local.videoHeight;//4;
    cnv.width = ww;
    cnv.height = hh;
    c.filter = 'blur(9px)';
    c.drawImage(local, 0, 0, ww, hh);
    var imgdata = cnv.toDataURL('image/jpeg', 1.0);
 
   cnv.remove();
    //document.body.appendChild(cnv);
   return imgdata;
}


function isexits(){
	if(!sfutest)return;
	//alert(roomnum.value);
	let checkroom={
		request:"exists",
		room: Number(roomnum.value),
		ptype:"publisher",
		"is_private": false
	}
    sfutest.send({message:checkroom});
}
function list(){
	if(!sfutest)return;
	//alert(roomnum.value);
	let checkroom={
		request:"list",
		
	}
    sfutest.send({message:checkroom});
    //alert(a);
}
function listp(){
	if(!sfutest)return;
	sfutest.send({message:{request:"listparticipants",
        "room" : Number(roomnum.value)}});
}
function unpublish(){
	if(!sfutest)return;
	sfutest.send({message:{request:"unpublish"}});
}
function leave(){
	if(!sfutest)return;
	sfutest.send({message:{request:"leave"}});
}


function pfuck(el){

Janus.init({debug: "all", callback: async function() {
	let serv = await getservers();
	janus = new Janus(
				{
					server: server ,
					iceServers: (serv?serv:null),
					// Should the Janus API require authentication, you can specify either the API secret or user token here too
					//		token: "mytoken",
					//	or
					//		apisecret: "serversecret",
					error:function(m){alert('4 '+ m);},
					success: function() {subscribeToStream(Number(useridi),Number(streamId.value), el);}
				})}})

}
local.onloadedmetadata=function(){
	let l = document.querySelector("#videobox section");
	if(l){
		l.style.display="none";
		videobox.classList.add('playing');
		}
}
function subscribeToStream(roomId, publisherId, el) {
	el.disabled = true;
	let l = document.querySelector("#videobox section");
	if(l){l.style.display="flex";}
	el.classList.remove("play-btn");
	pauseBtn.style.transition = "";
	//alert(publisherId);
    janus.attach({
        plugin: "janus.plugin.videoroom",
        success: function(pluginHandle) {
			//alert('sucess');
            console.log("✅ Подключились к плагину VideoRoom как подписчик");
            sfutest=pluginHandle;
            // 1. Входим в комнату как подписчик (ptype: "subscriber")
            let joinRequest = {
                request: "join",
                room: roomId,
                ptype: "subscriber", // Ключевой параметр для зрителя!
                streams:[{feed:Number(streamId.value)}]
            };
            
            pluginHandle.send({ message: joinRequest });
           //  pluginHandle.onremotestream = function(stream) {
				 pluginHandle.onremotetrack = function(track, mid, on) {
				//alert('fuck');
                //console.log("🎬 Получен удалённый видеопоток!");
                let videoElement = local;//document.getElementById('local');
                // Отображаем поток в элементе <video>
                if(!on){
					//alert("null");
					 videoElement.srcObject = null;
					
					 pluginHandle.detach();
					return;
				}
                let stream = new MediaStream();
                stream.addTrack(track);
                 if (track.kind === "video") {
        
        if (!videoElement) {
			/*
			alert("video");
            videoElement = document.createElement('video');
            videoElement.id = 'remoteVideo';
            videoElement.autoplay = true;
            videoElement.playsinline = true;
            document.body.appendChild(videoElement);
            */ 
        }

        // Важно: нужно создать новый MediaStream для этого одного трека
        // или добавить трек в существующий поток
        if (!videoElement.srcObject) {
            
            
            videoElement.srcObject = stream;
        } else {
			//stream.addTrack(track);
            videoElement.srcObject=stream;//addTrack(track);
        }
        //el.disabled = false;
        //el.textContent = "Stop";
       // el.setAttribute("onclick", "unsubscribe(this);");
 wsend({ request: "janus", subtype:"subscriber", streamid: streamId.value, userid: useridi });
 videoElement.muted=false;
       // videoElement.play().catch(e => console.error("Ошибка воспроизведения:", e));
        
    }else if(track.kind==='audio'){
		//alert('audio');
		//let stream = new MediaStream();
		//Janus.attachMediaStream(videoElement,track.stream);
		videoElement.muted=false;
		//ideoElement.play().catch(e => console.error("Ошибка воспроизведения:", e));
		audioel.srcObject=stream;//addTrack(track);//=stream;
		audioel.play().catch(e => console.log('Ошибка воспроизведения: ' + e));
	}
            };
            // 2. Обработчик всех сообщений от плагина
            pluginHandle.onmessage = function(msg, jsep) {
                console.log("📨 Сообщение от плагина:", msg);
                //{videoroom: 'event', error_code: 428, error: 'No such feed (0)'}
                if(jsep)console.log(jsep);
                // А. Ответ на вход в комнату
                if (msg.videoroom === "attached") {
                    note({ content: "✅ Присоединились к комнате как подписчик. Настраиваем подписку...", type: "info", time: 5});
                   
                    // У нас есть идентификатор потока (publisher), на который нужно подписаться
                    // publisherId можно передать в функцию или получить из msg["streams"]
                    let streams = msg["streams"];
                    if (!streams || streams.length === 0) {
						aqlert('fucl');
                        console.warn("⚠️ В комнате нет активных потоков для подписки");
                        return;
                    }
                    
                    // Подписываемся на первый доступный поток (или на конкретный publisherId)
                    let targetPublisherId = publisherId || streams[0]["id"];
                    
                    // 3. Отправляем запрос "start" для начала приёма медиа
                    let startRequest = {
                        request: "start",
                        room: Number(useridi),
                        feed: targetPublisherId // ID публикующего, на которого подписываемся
                    };
                    pluginHandle.send({ message: startRequest });
                    
                // Б. Обработка SDP-offer от сервера (jsep содержит предложение)
                } 
                if (jsep) {
                    console.log("🔄 Получен SDP-offer от сервера для подписки. Отвечаем...");
                    // Создаём ответ (SDP-answer) на предложение сервера
                    pluginHandle.createAnswer({
                        jsep: jsep, // Предложение от сервера
                        media: { audio: true, video: true }, // Мы хотим и аудио, и видео
                        success: function(answerJsep) {
							//alert('da');
                            console.log("✅ SDP-answer создан. Отправляем обратно...");
                            // Отправляем наш answer обратно на сервер
                            let startRequest = {
                                request: "start",
                                room: Number(streamId.value)
                            };
                            pluginHandle.send({ 
                                message: startRequest, 
                                jsep: answerJsep 
                            });
                        },
                        error: function(error) {
                            console.error("❌ Ошибка создания SDP-answer:", error);
                        }
                    });
                    
                // В. Подтверждение успешной подписки
                } 
                 if (msg.videoroom === "event" && msg.started === 'ok') {
                    console.log("🎉 Успешно подписались на поток! Медиа начнёт поступать.");
                
							  }
							  if(msg.videoroom==='event'&& msg.left==='ok'){
								  if (remoteVideo) {
									  alert("left");
        remoteVideo.srcObject = null;
    }
							  }
					  },
					  pluginHandle.oncleanup=function(){
						  note({content:'clean',type:'info',time:5});
						  }
            },
            cleanup:function(){
				//alert('cleanup');
			}, error:function(er){alert(er);},
			iceState: function(state) {
				console.log("ICE state (remote feed) changed to " + state);
			},
			webrtcState: function(on) {
				console.log("Janus says this WebRTC PeerConnection (remote feed) is " + (on ? "up" : "down") + " now");
				if(on){
					note({content:"Вы подписались", type:"info", time: 5 });
				}else{
					note({content:"Вы отписались", type:"info", time: 5 });
				}
			},
            //alert(pluginHandler);
            // 4. Обработчик появления удалённого видеопотока
          
            
            // Обработчик, если что-то пошло не так
        
            // Сохраняем handle для дальнейшего использования
          
    });
}
function subscribe(el){
	el.disabled = true;
	let a=Number(streamId.value);
	if(a == 600000 || a == 600001 || a == 600002 || a == 600003 || a == 600004 || a == 600005){
		//alert('suka '+streamId.value);
		let l = document.querySelector("#videobox section");
	if(l){l.style.display="flex";}
		handleFakeVideo(el, streamId.value);
		return;
	}
	pfuck(el);
	//subscribeToStream(roomnum.value);
}

setOboi();
function setOboi(){
	//alert(1);
	let a = Number(streamId.value);
	if(a==600000 || a==600001 || a==600002 || a==600003 || a==600004 || a==600005){
		getOboi(streamId.value);
	}
}
function getOboi(n){
	//alert(n);
	if(n==600000){
		
		local.poster="/img1/girl1.png";
		
	}else if(n==600001){
		
		local.poster="/img1/girl2.png";
		
	}else if(n==600002){
		local.poster="/img1/boy.png";
	}else if(n==600003){
		local.poster="/img1/korova1.png";
	}else if(n==600004){
		local.poster="/img1/korova2.png";
	}else if(n==600005){
		local.poster="/img1/korova3.png";
	}
}
function handle_message(obj){
	insertMessage(obj);
}


function sendMessage(el){
	el.classList.add('puls');
	let txt=gid('txt');
	if(!txt.value) return;
	console.log('2 ',txt.value);
	wsend({type:"msg", txt: txt.value, from:username.value,room:'/'+userid.value,owner:owner.value});
	//insertMessage(txt.value);
	el.classList.add('puls');
}
function insertMessage(obj){
				
				let div = document.createElement("div");
				div.className = "msg";
				div.innerHTML = '<b>'+obj.from+':</b>&nbsp;<b>' + esci(obj.txt) + '</b>';
				chatbox.appendChild(div);
				chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
				txt.value = '';
				sendbtn.classList.remove('puls');
			}
function wsend(obj){
	if(!sock) return;
	let d;
	//obj.from = MYSOCKETID;
	try{
		d = JSON.stringify(obj);
		if(sock.readyState == WebSocket.OPEN)sock.send(d);
	}catch(e){}
}
function handleFakeVideo(el,n){

	if(n==600000){
		
		local.src="/videos/girl1.webm";
		
	}else if(n==600001){
		
		local.src="/videos/girl2.webm";
		
	}else if(n==600002){
		local.src="/videos/boy.webm";
	}else if(n==600003){
		local.src="/videos/korova1.mp4";
	}else if(n==600004){
		local.src="/videos/korova2.mp4";
	}else if(n==600005){
		local.src="/videos/korova3.mp4";
	}
	local.onplay=function(){
		note({content:"Вы подписались, ok", type:"info", time: 5 });
	}
	
	local.muted = false;
	local.setAttribute("loop", true);
		 el.disabled = false;
		// pauseBtn.style.transition="opacity 0.5s ease, visibility 0.5s linear";
		// pauseBtn.style.transitionDelay="1s";
		pauseBtn.style.transition="";
       // el.textContent = "Stop";
       // el.classList.add("redi");
        //el.setAttribute("onclick", `unsubscribeFake(this,"${n}");`);
	//getGirl();
}
function letUnsubscribe(el){
	let a = Number(streamId.value);
	if(a==600000 || a==600001 || a==600002 || a==600003 || a==600004 || a==600005){
		local.src = null;
	    videobox.classList.remove('playing');
	el.style.transition="none";
	}else{
		unsubscribe(el);
	}
}
function unsubscribe(el){
	if(!sfutest)return;
	sfutest.send({message:{request:"unsubscribe", streams:[{feed: Number(streamId.value)}]}});
	wsend({ request: "janus", subtype: "unsubscriber", streamid: streamId.value, roomid: userid.value });
	
	videobox.classList.remove("playing");
	playBtn.disabled = false;
	playBtn.classList.add("play-btn");
	el.style.transition = "none";
}
/*
function unsubscribeFake(el,n){
	local.src=null;
	//el.textContent="Subscribe";
	videobox.classList.remove('playing');

	//handleFakeVideo(el,n);
	el.setAttribute("onclick", `handleFakeVideo(this,"${n}");`);
}
*/ 
function getGirl(){
		let canvas=document.createElement('canvas');
		var ctx = canvas.getContext("2d");
		local.addEventListener('loadedmetadata', () => {
  canvas.width = local.videoWidth;
  canvas.height = local.videoHeight;
  setTimeout(function(){ctx.drawImage(local, 0, 0, canvas.width, canvas.height);
  },1000)
 document.body.appendChild(canvas);
});
}

function letStart(el){
	el.disabled = true;
	el.classList.remove("play-btn");
	pauseBtn.style.transition = "";
	getJanus(el);
}
function letStop(el){
	if(localStream){
	freeLocalStream();
	destroy();
	
	videobox.classList.remove("playing");
	playBtn.disabled = false;
	playBtn.classList.add("play-btn");
	el.style.transition = "none";
	
	}
}

if(txt)txt.addEventListener('keydown', sendEnter, false);
	
	function sendEnter(ev){
		
		if(ev.key == "Enter"){
		//alert(ev.target.value);	
		if(ev.target.value.length==0)return;
		
			let str = esci(ev.target.value.trim());
			if(str.length===0){
				ev.target.value="";
				return;
			}
			console.log('4 ', str,',',str.length);
			wsend({type:"msg", txt: str, from: username.value, room:'/' + userid.value, owner: owner.value });	
		}
	}
