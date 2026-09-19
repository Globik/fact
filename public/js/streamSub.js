	var janus = null;
	const local = document.querySelector(".Vid");
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
	doleave();
	 });

	function handleFakeVideo(el,n){

	if(n == 600000){
		
		local.src = "/videos/girl1.webm";
		
	}else if(n == 600001){
		
		local.src = "/videos/girl2.webm";
		
	}else if(n == 600002){
		local.src = "/videos/boy.webm";
	}else if(n == 600003){
		local.src = "/videos/korova1.mp4";
	}else if(n == 600004){
		local.src = "/videos/korova2.mp4";
	}else if(n == 600005){
		local.src = "/videos/korova3.mp4";
	}
	local.onplay=function(){
		note({content:"Вы подписались, ok", type:"info", time: 5 });
	}
	
	local.muted = false;
	local.setAttribute("loop", true);
		 el.disabled = false;
		pauseBtn.style.transition = "";
	//getGirl();
	}
	function subscribe(el){
	el.disabled = true;
	let a = Number(streamId.value);
	if(a == 600000 || a == 600001 || a == 600002 || a == 600003 || a == 600004 || a == 600005){
	
		let l = document.querySelector("#videobox section");
	if(l){l.style.display="flex";}
		handleFakeVideo(el, streamId.value);
		return;
	}
	pfuck(el);
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
	//sfutest.send({message:{request:"unsubscribe", streams:[{feed: Number(streamId.value)}]}});
	doleave();
	wsend({ request: "janus", subtype: "unsubscriber", streamid: streamId.value, roomid: useridi });
	
	videobox.classList.remove("playing");
	playBtn.disabled = false;
	playBtn.classList.add("play-btn");
	el.style.transition = "none";
}

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

	setOboi();
	
	function setOboi(){
	
	let a = Number(streamId.value);
	if(a==600000 || a==600001 || a==600002 || a==600003 || a==600004 || a==600005){
		getOboi(streamId.value);
	}
	}
	function getOboi(n){
	
	if(n == 600000){
		
		local.poster = "/img1/girl1.png";
		
	}else if(n	==	600001){
		
		local.poster = "/img1/girl2.png";
		
	}else if(n == 600002){
		local.poster = "/img1/boy.png";
	}else if(n == 600003){
		local.poster = "/img1/korova1.png";
	}else if(n == 600004){
		local.poster = "/img1/korova2.png";
	}else if(n == 600005){
		local.poster = "/img1/korova3.png";
	}
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
					error:function(m){note({ content: m, type: 'warn', time: 5 });},
					success: function() {subscribeToStream(Number(useridi),Number(streamId.value), el);}
				})}})

	}
	local.onloadedmetadata = function(){
	let l = document.querySelector("#videobox section");
	if(l){
		l.style.display = "none";
		videobox.classList.add('playing');
		}
	}
	function subscribeToStream(roomId, publisherId, el) {
	el.disabled = true;
	let l = document.querySelector("#videobox section");
	if(l){l.style.display = "flex";}
	el.classList.remove("play-btn");
	pauseBtn.style.transition = "";
	
    janus.attach({
        plugin: "janus.plugin.videoroom",
        success: function(pluginHandle) {
            sfutest = pluginHandle;
            let joinRequest = {
                request: "join",
                room: roomId,
                ptype: "subscriber", 
                streams:[{feed:Number(streamId.value)}]
            };
            
            pluginHandle.send({ message: joinRequest });
           
				 pluginHandle.onremotetrack = function(track, mid, on) {
				
                let videoElement = local;
                
                if(!on){
				
					 videoElement.srcObject = null;
					
					 pluginHandle.detach();
					return;
				}
                let stream = new MediaStream();
                stream.addTrack(track);
                 if (track.kind === "video") {
        
        if (!videoElement) {
			
        }
        if (!videoElement.srcObject) {
            
            
            videoElement.srcObject = stream;
        } else {
		
            videoElement.srcObject=stream;
        }
        
 videoElement.muted = false;
        
    }else if(track.kind === 'audio'){
		//alert('audio');
		//let stream = new MediaStream();
		//Janus.attachMediaStream(videoElement,track.stream);
		videoElement.muted = false;
		audioel.srcObject = stream;
		audioel.play().catch(e => console.log('Ошибка воспроизведения: ' + e));
	}
            };
            pluginHandle.onremovetrack = function(){alert('remove');}
           
            pluginHandle.onmessage = function(msg, jsep) {
                console.log("📨 Сообщение от плагина:", msg);
                //{videoroom: 'event', error_code: 428, error: 'No such feed (0)'}
                if (msg.videoroom === "attached") {
                    let streams = msg["streams"];
                    if (!streams || streams.length === 0) {
                        return;
                    }
                    
                    
                    let targetPublisherId = publisherId || streams[0]["id"];
                    let startRequest = {
                        request: "start",
                        room: Number(useridi),
                        feed: targetPublisherId 
                    };
                    pluginHandle.send({ message: startRequest });
                    
                } 
                if (jsep) {
                   
                    pluginHandle.createAnswer({
                        jsep: jsep, 
                        media: { audio: true, video: true }, 
                        success: function(answerJsep) {
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
                    
                } 
                 if (msg.videoroom === "event" && msg.started === 'ok') {
                    
                
							  }
							  if(msg.videoroom === 'event'&& msg.left === 'ok'){
								  if (local) {
									  
        local.srcObject = null;
    }
							  }
					  },
					  pluginHandle.oncleanup = function(){
						 // note({content:'clean',type:'info',time:5});
						  }
            },
            cleanup:function(){
				console.log('cleanup');
			}, error:function(er){alert(er);},
			iceState: function(state) {
				console.log("ICE state (remote feed) changed to " + state);
			},
			webrtcState: function(on) {
				console.log("Janus says this WebRTC PeerConnection (remote feed) is " + (on ? "up" : "down") + " now");
				if(on){
					note({ content:"Вы подписались", type: "info", time: 5 });
					wsend({ request: "janus", subtype:"subscriber", streamid: streamId.value, userid: useridi });
				}else{
					note({ content:"Вы отписались", type:"info", time: 5  });
				}
			},
    });
	}

	function doleave(){
	fsend({ request:"leave" });
	}
