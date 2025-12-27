//alert(1);
var janus=null;
var authT;
var basicSdkInstance;
let localStream=null;
var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
isOpen = false;
var sock = null;
var new_uri;
var mystreamId = null;
function letStart(el){
	//alert('suka');
	if(userid.value == "0") return;
	el.disabled = true;
	getJanus(el);
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
	
 if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + "/stream");

  sock.onopen = function () {
	 console.log("websocket opened");
	 
	
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
    
  };
}
get_socket();
function on_msg(d){
	if(d.type==='janus'){
		if(d.subtype == 'onviews'){
			spanViews.textContent = d.views;
		}
	}
}
async function getToken(){
	try{
		 let reqi = await fetch('/lovetoken', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({ uid: '12345', uname:'alik' })});
	if(reqi.ok){
		if(reqi.error){
			out.innerHTML+=reqi.message+'<br>'
			return;
		}
		let config = await reqi.json();
		authT = config.authToken;
		out.innerHTML+=authT;
		dowas();
	}
	}catch(e){
		out.innerHTML+=e+'<br>'
	}
}
async function dowas(){
 basicSdkInstance=new LovenseBasicSdk({
	platform:"Chatikon",
	authToken:authT,
	uid:"1234"
})
basicSdkInstance.on("ready",async(instance)=>{
	out.innerHTML+='ready'+'<br>';
	try{
		const codeRes=await instance.getQrcode();
		console.log('codeRes ', codeRes);
		out.innerHTML+=codeRes+'<br>';
		let im=document.createElement('img');
		im.src=codeRes.qrcodeUrl;
		im.className="imgqr";
		document.body.appendChild(im);
	}catch(e){
		out.innerHTML+=e+'<br>'
	}
	
})
basicSdkInstance.on("sdkError",(data)=>{
	out.innerHTML+=data.code+" "+data.message+"<br>"
})

}
function getappstatus(){
	if(!basicSdkInstance) return;
	let a=basicSdkInstance.getAppStatus();
out.innerHTML+='app status '+a+'<br>';
}
function getonlinetoys(){
	if(!basicSdkInstance) return;
	let a=basicSdkInstance.getOnlineToys();
	out.innerHTML+=JSON.stringify(a)+'<br>';
}
function gettoys(){
	if(!basicSdkInstance) return;
let a =	basicSdkInstance.getToys();
out.innerHTML+=JSON.stringify(a)+'<br>';
}
function setcommand(){
	if(!basicSdkInstance) return;
	basicSdkInstance.sendToyCommand({ vibrate:20});
}
function stop(){
	if(!basicSdkInstance) return;
	basicSdkInstance.stopToyAction();
}

var server = null;
var sfutest = null;
if(window.location.protocol === 'http:'){
	server = "ws://" + window.location.hostname + ":8188/janus";
}else{
	server = "wss://" + window.location.hostname + ":8989/janus";//:8989/janus";
}

var opaqueId = "videoroomtest-"+Janus.randomString(12);

function createRoom(){
	if(!sfutest)return;
	//alert(roomnum.value);
	let checkroom={
		request:"join",
		room: Number(userid.value),
		ptype:"publisher",
		"is_private": false,
		notify_joining:true
	}
    sfutest.send({message:checkroom});
    //alert(a);
}

function getJanus(el){
Janus.init({debug: "all", callback: function() {
	janus = new Janus(
				{
					server: server,
					iceServers: null,
					// Should the Janus API require authentication, you can specify either the API secret or user token here too
					//		token: "mytoken",
					//	or
					//		apisecret: "serversecret",
					error:function(m){alert('2 '+ m);},
					success:function(){
						getAttach(el);
						}})}})
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
            "room": Number(userid.value),
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
                console.log("✅ Вошли в комнату с ID:", msg.id);
            // idvalue.value=msg.id;
            mystreamId = msg.id;
                // КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: getUserMedia вызывается здесь
                navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                    .then(function(stream) {
						localStream = stream;
                        
                        console.log("Медиа получены, ожидаю onlocalstream...");
                        
                        createOffer(pluginHandle, stream);   
                        
                    }).catch(function(error) { console.error("Ошибка получения медиа:", error);});
            }
            if(msg.videoroom==='event'&&msg.unpublish==='ok'){
				alert('unpublish');
			
				pluginHandle.detach();
			}
			if(msg.videoroom==='event' && msg.leaving==='ok'){
				//alert('leaving');
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
           if(track.kind=='video'){
            if (on) {
            let stream = new MediaStream();
            stream.addTrack(track);
            local.srcObject = stream;
        } else {
            local.srcObject = null;
        }
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
					el.disabled = false;
					el.textContent = "Stop";
					el.setAttribute('onclick',"destroy(this);");
					setTimeout(function(){
					let imgdata = Screenshot();
					//alert('userid '+userid.value);
					wsend({ request: 'janus', subtype: "owner", roomid: userid.value, userid:userid.value,nick: username.value, streamid: mystreamId, src: imgdata });
					note({ content: "on air", type:'info', time:5 });
				}, 3000);
				}
			},
});
}

function freeLocalStream(){
		 localStream.getTracks().forEach(track => {
		console.log("track stop");
     track.stop()
    local.srcObject = null;})
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

function Screenshot() {
	if(!local.srcObject) return;
    let cnv = document.createElement('canvas');
    let w = 80;
    let h = 50;
  // cnv.width = w;
   // cnv.height = h;
    let c = cnv.getContext('2d');
    var ww = local.videoWidth/4;
    var hh = local.videoHeight/4;
     cnv.width = ww;
    cnv.height = hh;
    c.drawImage(local, 0, 0, ww, hh);
    var imgdata = cnv.toDataURL('image/jpeg', 5.0);
    cnv.remove();
    return imgdata;
    
}

function destroy(el){
	if(!sfutest)return;
	sfutest.send({message:{request:'destroy', secret:'suka', room:Number(userid.value)}});
	el.textContent = "Start";
	el.setAttribute("onclick","letStart(this);");
	wsend({ request: "janus", subtype: "remove", roomid:Number(userid.value) , streamid: mystreamId });
}


function Screenshot() {
	if(!local.srcObject) return;
    let cnv = document.createElement('canvas');
    let w = 80;
    let h = 50;
  // cnv.width = w;
   // cnv.height = h;
    let c = cnv.getContext('2d');
    var ww = local.videoWidth/4;
    var hh = local.videoHeight/4;
     cnv.width = ww;
    cnv.height = hh;
    c.drawImage(local, 0, 0, ww, hh);
    var imgdata = cnv.toDataURL('image/jpeg', 5.0);
    cnv.remove();
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

function unsubscribe(el){
	if(!sfutest)return;
	sfutest.send({message:{request:"unsubscribe", streams:[{feed: Number(streamId.value)}]}});
	wsend({ request: "janus", subtype: "unsubscriber", streamid: streamId.value, roomid: userid.value });
}
function pfuck(el){

Janus.init({debug: "all", callback: function() {
	janus = new Janus(
				{
					server: server,
					iceServers: null,
					// Should the Janus API require authentication, you can specify either the API secret or user token here too
					//		token: "mytoken",
					//	or
					//		apisecret: "serversecret",
					error:function(m){alert('4 '+ m);},
					success: function() {subscribeToStream(Number(userid.value),Number(streamId.value), el);}
				})}})

}

function subscribeToStream(roomId, publisherId, el) {
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
                console.log("🎬 Получен удалённый видеопоток!");
                let videoElement = document.getElementById('local');
                // Отображаем поток в элементе <video>
                if(!on){
					 videoElement.srcObject = null;
					 pluginHandle.detach();
					return;
				}
                
                 if (track.kind === "video") {
        
        if (!videoElement) {
            videoElement = document.createElement('video');
            videoElement.id = 'remoteVideo';
            videoElement.autoplay = true;
            videoElement.playsinline = true;
            document.body.appendChild(videoElement);
        }

        // Важно: нужно создать новый MediaStream для этого одного трека
        // или добавить трек в существующий поток
        if (!videoElement.srcObject) {
            let stream = new MediaStream();
            stream.addTrack(track);
            videoElement.srcObject = stream;
        } else {
            videoElement.srcObject.addTrack(track);
        }
        el.disabled = false;
        el.textContent = "Stop";
        el.setAttribute("onclick", "unsubscribe(this);");
 wsend({ request: "janus", subtype:"subscriber", streamid: streamId.value, userid: userid.value });
        videoElement.play().catch(e => console.error("Ошибка воспроизведения:", e));
        
    }
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
               
            };
            // 2. Обработчик всех сообщений от плагина
            pluginHandle.onmessage = function(msg, jsep) {
                console.log("📨 Сообщение от плагина:", msg);
                if(jsep)console.log(jsep);
                // А. Ответ на вход в комнату
                if (msg.videoroom === "attached") {
                    console.log("✅ Присоединились к комнате как подписчик. Настраиваем подписку...");
                   
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
                        room: Number(userid.value),
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
        remoteVideo.srcObject = null;
    }
							  }
					  },
					  plaginHandle.oncleanup=function(){alert('clean');}
            },
            cleanup:function(){
				alert('cleanup');
			}, error:function(er){alert(er);},
			iceState: function(state) {
				console.log("ICE state (remote feed) changed to " + state);
			},
			webrtcState: function(on) {
				console.log("Janus says this WebRTC PeerConnection (remote feed) is " + (on ? "up" : "down") + " now");
			},
            //alert(pluginHandler);
            // 4. Обработчик появления удалённого видеопотока
          
            
            // Обработчик, если что-то пошло не так
        
            // Сохраняем handle для дальнейшего использования
          
    });
}
function subscribe(el){
	el.disabled = true;
	pfuck(el);
	//subscribeToStream(roomnum.value);
}

function insertMessage(txt){
				
				let div = document.createElement("div");
				div.className = "msg";
				div.innerHTML = '<b>' + txt + '</b>';
				chatbox.appendChild(div);
				chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
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
