
	var janus = null;
	let localStream = null;
//var opaqueId = "videoroomtest-"+Janus.randomString(12);
     const local = document.querySelector(".Vid");
function createRoom(){
	let checkroom={
		request:"join",
		room: Number(useridi),
		ptype:"publisher",
		"is_private": false,
		notify_joining:true
	}
    fsend(checkroom);
}

  window.addEventListener('pagehide', () => {
  if (sock && sock.readyState === WebSocket.OPEN) {
    sock.close();
  }
 });

	document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
  //  sock.close();
  }
	});
	window.addEventListener("beforeunload", async function(ev){
	destroy();
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
					error: function(m){ note({ content: m, type: 'warn', time: 5 });},
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
	//el.disabled = true;
	
	if(Spinner){Spinner.style.display = "flex";}
	createOffer(sfutest, localStream);  
	}
	function getAttach(el){
	janus.attach({
    plugin: "janus.plugin.videoroom",
    success: function(pluginHandle) {
        console.log("Плагин подключен",pluginHandle);
  sfutest	=	pluginHandle;
        let joinRequest = {
            request: "create",
            display: "Ведущий",
           "room":useridi,
		     "ptype":"publisher",
		"is_private": false,
		"secret": TOK.value
        };
        sfutest.send({ message: joinRequest });
        createRoom();
        pluginHandle.onmessage = function(msg, jsep) {
            console.log("Получено сообщение:", msg);

            if (msg.videoroom === "joined") {
                note({ content: "✅ Вошли в комнату с ID:" + msg.room, type: "info", time: 5 });
            
            mystreamId = msg.id.toString();
                navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                    .then(function(stream) {
						localStream = stream;
                         //let stream = new MediaStream();
           //stream.addTrack(track);
           local.srcObject = stream;
                      
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
            if(msg.videoroom === 'event' && msg.unpublish === 'ok'){
			
				pluginHandle.detach();
			}
			if(msg.videoroom === 'event' && msg.leaving === 'ok'){
				console.log('leaving');
				freeLocalStream();
				pluginHandle.detach();
			}
            if (jsep) {
                pluginHandle.handleRemoteJsep({ jsep: jsep });
            }
        };
        pluginHandle.onlocaltrack = function(track,on) {
			if(on){
           if(track.kind=='video'){
            
           let stream = new MediaStream();
           stream.addTrack(track);
         //  local.srcObject = stream;
           //Janus.attachMediaStream(local,track.stream);
        }else if(track.kind == 'audio'){
			//alert('track audio');
			
			let stream = new MediaStream();
            stream.addTrack(track);
            //local.srcObject = stream;
			
		}
		} else {
            local.srcObject = null;
        }
          
        
        };
        pluginHandle.oncleanup = function() {
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
					wsend({ request: "janus", subtype: "remove", roomid:useridi , streamid: mystreamId,  userid:useridi });
				}
			},
});
}

 function freeLocalStream(){
	if(!localStream)return;
		 localStream.getTracks().forEach(track => {
	
     track.stop()
    
    })
    localStream = null;
    sfutest = null;
 }

 function createOffer(pluginHandle, stream){
                          pluginHandle.createOffer({
                media: {
                    stream: stream, 
                    audioSend: true,
                    videoSend: true,
                    audioRecv: false,
                    videoRecv: false
                },
                trickle: true,
                success: function(jsepOffer) {
                    let publishRequest = {
                        request: "publish",
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
	fsend({ request: 'destroy', secret: TOK.value, room: useridi });
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
