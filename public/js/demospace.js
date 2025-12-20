//alert(1);
var janus=null;
var authT;
var basicSdkInstance;
let localStream=null;
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
	server = "wss://" + window.location.hostname + ":8989/janus";
}

var opaqueId = "videoroomtest-"+Janus.randomString(12);
/*
function getJanus(){
	//alert('suka');
	Janus.init({debug: "all", callback: function() {
	janus = new Janus(
				{
					server: "ws://",
					iceServers: null,
					// Should the Janus API require authentication, you can specify either the API secret or user token here too
					//		token: "mytoken",
					//	or
					//		apisecret: "serversecret",
					error:function(m){alert(888);},
					success: function() {
					//	alert('success');
						// Attach to video room test plugin
						janus.attach(
							{
								plugin: "janus.plugin.videoroom",
								opaqueId: opaqueId,
								onmessage:function(msg,jsep){alert(1)},
								success: function(pluginHandle) {
									//alert('success atach');
									sfutest=pluginHandle;
									//pluginHandle.onmessage=function(msg,jsep){console.log('msg ', msg)};
									pluginHandle.onerror=function(er){alert(er);}
									let checkroom={
		"request":"create",
		"room": Number(roomnum.value),
		"ptype":"publisher",
		"is_private": false
	}
    pluginHandle.send({message:checkroom});
								// pluginHandle;
									
								},error:function(m){alert(m);},
								onmessage:function(msg,jsep){
									console.log('msg ', msg);
									if(msg.videoroom === 'joined'){
										idvalue.value=msg.id;
										navigator.mediaDevices.getUserMedia({audio:true,video:true})
										.then(function(stream){
											let publishConfig={media:{audioSend:true,videoSend:true}};
											sfutest.createOffer({
												media:publishConfig,
												success: function(offer){
													let publishRequest={request:"configure",audio:true,video:true};
													sfutest.send({message:publishRequest,jsep:offer});
												}, error:function(error){
													console.error(error);
												}
											});
											console.log("we re about enable local video");
											local.srcObject=stream;
											//idvalue.value=stream.id;
										}).catch(function(er){console.error(er)});
									}
									if(jsep){
										sfutest.handleRemoteJsep({jsep:jsep});
									}
									if(msg.videoroom==='event' && msg.configured=='ok'){
										console.log('publisched');
									}
									},
									onlocalstream: function(stream) {
										alert('potok');
                    console.log("Локальный поток доступен:", stream.id);
                   // idvalue.value=stream.id;
                },
									error: function(e){console.error(e);}
								
							
						
								
								
								
								})
								
								},
								error:function(m){alert(m);},
								onmessage:function(){alert(8);},
								destroyed:function(){alert('dest');}
								})}})}
								*/
							
function createRoom(){
	if(!sfutest)return;
	//alert(roomnum.value);
	let checkroom={
		request:"join",
		room: Number(roomnum.value),
		ptype:"publisher",
		"is_private": false,
		notify_joining:true
	}
    sfutest.send({message:checkroom});
    //alert(a);
}
function getJanus(){
Janus.init({debug: "all", callback: function() {
	janus = new Janus(
				{
					server: "ws://"+ window.location.hostname + ":8188/janus",
					iceServers: null,
					// Should the Janus API require authentication, you can specify either the API secret or user token here too
					//		token: "mytoken",
					//	or
					//		apisecret: "serversecret",
					error:function(m){alert(m);},
					success:function(){
						getAttach();
						}})}})
				}

function getAttach(){
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
            "room": Number(roomnum.value),
		     "ptype":"publisher",
		"is_private": false,
		"secret":"suka"
        };
        pluginHandle.send({ message: joinRequest });

        // 3. Назначаем обработчики
        pluginHandle.onmessage = function(msg, jsep) {
            console.log("Получено сообщение:", msg);

            // 3.1. Успешный вход в комнату - ТОЛЬКО ТЕПЕРЬ запрашиваем медиа
            if (msg.videoroom === "joined") {
                console.log("✅ Вошли в комнату с ID:", msg.id);
             idvalue.value=msg.id;
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



function destroy(){
	if(!sfutest)return;
	sfutest.send({message:{request:'destroy', secret:'suka', room:Number(roomnum.value)}});
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

function unsubscribe(){
	if(!sfutest)return;
	sfutest.send({message:{request:"unsubscribe", streams:[{feed: Number(idvalue.value)}]}});
}
function fuck(){

Janus.init({debug: "all", callback: function() {
	janus = new Janus(
				{
					server: "ws://"+ window.location.hostname + ":8188/janus",
					iceServers: null,
					// Should the Janus API require authentication, you can specify either the API secret or user token here too
					//		token: "mytoken",
					//	or
					//		apisecret: "serversecret",
					error:function(m){alert(m);},
					success: function() {subscribeToStream(Number(roomnum.value),Number(idvalue.value));}
				})}})

}

function subscribeToStream(roomId, publisherId) {
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
                streams:[{feed:Number(idvalue.value)}]
            };
            
            pluginHandle.send({ message: joinRequest });
           //  pluginHandle.onremotestream = function(stream) {
				 pluginHandle.onremotetrack = function(track,mid,on) {
				//alert('fuck');
                console.log("🎬 Получен удалённый видеопоток!");
                let videoElement = document.getElementById('remoteVideo');
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
                        room: roomId,
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
                                room: roomId
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
function subscribe(){
	fuck();
	//subscribeToStream(roomnum.value);
}

