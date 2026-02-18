
	
var server = null;
var sfutest = null;
if(window.location.protocol === 'http:'){
	server = "ws://" + window.location.hostname + ":8188/janus";
}else{
	server = "wss://" + window.location.hostname + ":8989/janus";//:8989/janus";
}

var opaqueId = "videoroomtest-"+Janus.randomString(12);
async function getservers(){
	 try{
	let reqi = await fetch('/turn', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({ tok: gid("TOK").value })});
	if(reqi.ok){
		let config = await reqi.json();
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
async function start(el){
	let serv = await getservers();
	Janus.init({debug: "all", callback: function() {
	janus = new Janus(
				{
					server: server,
					iceServers: (serv?serv:null),
					// Should the Janus API require authentication, you can specify either the API secret or user token here too
					//		token: "mytoken",
					//	or
					//		apisecret: "serversecret",
					error:function(m){alert(m);},
					success:function(){
						el.style.display="none";
						getAttach();
						}})}})
				}
				//start();
function getAttach(){
// 1. Прикрепляем плагин (предполагается, что сессия `janus` уже создана)
janus.attach({
    plugin: "janus.plugin.streaming",
    success: function(pluginHandle) {
        console.log("Плагин подключен");
  sfutest=pluginHandle;
  Janus.log("Plugin attached! (" + sfutest.getPlugin() + ", id=" + sfutest.getId() + ")");
  let body = { request: "list" };
	Janus.debug("Sending message:", body);
	sfutest.send({ message: body, success: function(result) {
		console.log('list ', result);
		let body = { request: "watch", id: 10};
		sfutest.send({ message: body });
	}})
       
        // 3. Назначаем обработчики
        pluginHandle.onmessage = function(msg, jsep) {
            console.log("Получено сообщение:", msg);
let result = msg["result"];
if(result) {
										if(result["status"]) {
											let status = result["status"];
											if(status === 'starting'){
												console.log("Starting, please wait...");
											}else if(status === 'started'){
											//	$('#status').removeClass('hide').text("Started").removeClass('hide');
											}else if(status === 'stopped')
												stopStream();
										} else if(msg["streaming"] === "event") {
											// Does this event refer to a mid in particular?
											let mid = result["mid"] ? result["mid"] : "0";
											// Is simulcast in place?
											let substream = result["substream"];
											let temporal = result["temporal"];
											if((substream !== null && substream !== undefined) || (temporal !== null && temporal !== undefined)) {
												if(!simulcastStarted[mid]) {
													simulcastStarted[mid] = true;
													addSimulcastButtons(mid);
												}
												// We just received notice that there's been a switch, update the buttons
												updateSimulcastButtons(mid, substream, temporal);
											}
											// Is VP9/SVC in place?
											let spatial = result["spatial_layer"];
											temporal = result["temporal_layer"];
											if((spatial !== null && spatial !== undefined) || (temporal !== null && temporal !== undefined)) {
												if(!svcStarted[mid]) {
													svcStarted[mid] = true;
													addSvcButtons(mid);
												}
												// We just received notice that there's been a switch, update the buttons
												updateSvcButtons(mid, spatial, temporal);
											}
										}
									} else if(msg["error"]) {
										alert(msg["error"]);
										stopStream();
										return;
									}
									if(jsep) {
										Janus.debug("Handling SDP as well...", jsep);
										let stereo = (jsep.sdp.indexOf("stereo=1") !== -1);
										// Offer from the plugin, let's answer
										sfutest.createAnswer(
											{
												jsep: jsep,
												// We only specify data channels here, as this way in
												// case they were offered we'll enable them. Since we
												// don't mention audio or video tracks, we autoaccept them
												// as recvonly (since we won't capture anything ourselves)
												tracks: [
													{ type: 'data' }
												],
												customizeSdp: function(jsep) {
													if(stereo && jsep.sdp.indexOf("stereo=1") == -1) {
														// Make sure that our offer contains stereo too
														jsep.sdp = jsep.sdp.replace("useinbandfec=1", "useinbandfec=1;stereo=1");
													}
												},
												success: function(jsep) {
													Janus.debug("Got SDP!", jsep);
													let body = { request: "start" };
													sfutest.send({ message: body, jsep: jsep });
													//$('#watch').html("Stop").removeAttr('disabled').unbind('click').click(stopStream);
												},
												error: function(error) {
													Janus.error("WebRTC error:", error);
													alert("WebRTC error... " + error.message);
												}
											});
									}
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
        },
pluginHandle.onremotetrack= function(track, mid, on, metadata) {
									Janus.debug(
										"Remote track (mid=" + mid + ") " +
										(on ? "added" : "removed") +
										(metadata ? " (" + metadata.reason + ") ": "") + ":", track
									);
									let mstreamId = "mstream"+mid;
									//if(streamsList[selectedStream] && streamsList[selectedStream].legacy)
									//	mstreamId = "mstream0";
									/*if(!on) {
										// Track removed, get rid of the stream and the rendering
										$('#remotevideo' + mid).remove();
										if(track.kind === "video") {
											remoteVideos--;
											if(remoteVideos === 0) {
												// No video, at least for now: show a placeholder
												if($('#'+mstreamId+' .no-video-container').length === 0) {
													$('#'+mstreamId).append(
														'<div class="no-video-container">' +
														'<i class="fa-solid fa-video fa-xl no-video-icon"></i>' +
														'<span class="no-video-text">No remote video available</span>' +
													'</div>');
												}
											}
										}
										delete remoteTracks[mid];
										return;
									}*/
								//	if($('#remotevideo' + mid).length > 0)
									//	return;
									// If we're here, a new track was added
									//$('#spinner' + mid).remove();
									let stream = null;
									if(track.kind === "audio") {
										// New audio track: create a stream out of it, and use a hidden <audio> element
										stream = new MediaStream([track]);
										//remoteTracks[mid] = stream;
										Janus.log("Created remote audio stream:", stream);
										//$('#'+mstreamId).append('<audio class="hide" id="remotevideo' + mid + '" playsinline/>');
										//$('#remotevideo'+mid).get(0).volume = 0;
									/*	if(remoteVideos === 0) {
											// No video, at least for now: show a placeholder
											if($('#'+mstreamId+' .no-video-container').length === 0) {
												$('#'+mstreamId).append(
													'<div class="no-video-container audioonly">' +
														'<i class="fa-solid fa-video fa-xl no-video-icon"></i>' +
														'<span class="no-video-text">No video available</span>' +
													'</div>');
											}
										}*/
									} else {
										// New video track: create a stream out of it
										//remoteVideos++;
										//$('.no-video-container').remove();
										stream = new MediaStream([track]);
										//remoteTracks[mid] = stream;
										Janus.log("Created remote video stream:", stream);
									//	$('#'+mstreamId).append('<video class="rounded centered hide" id="remotevideo' + mid + '" width="100%" height="100%" playsinline/>');
										//$('#remotevideo'+mid).get(0).volume = 0;
										// Use a custom timer for this stream
										/*if(!bitrateTimer[mid]) {
											$('#curbitrate'+mid).removeClass('hide');
											bitrateTimer[mid] = setInterval(function() {
												if(!$("#remotevideo" + mid).get(0))
													return;
												// Display updated bitrate, if supported
												let bitrate = streaming.getBitrate(mid);
												$('#curbitrate'+mid).text(bitrate);
												// Check if the resolution changed too
												let width = $("#remotevideo" + mid).get(0).videoWidth;
												let height = $("#remotevideo" + mid).get(0).videoHeight;
												if(width > 0 && height > 0)
													$('#curres'+mid).removeClass('hide').text(width+'x'+height).removeClass('hide');
											}, 1000);
										}*/
									}
									// Play the stream when we get a playing event
									/*$("#remotevideo" + mid).bind("playing", function (ev) {
										$('.waitingvideo').remove();
										if(!this.videoWidth)
											return;
										$('#'+ev.target.id).removeClass('hide');
										let width = this.videoWidth;
										let height = this.videoHeight;
										$('#curres'+mid).removeClass('hide').text(width+'x'+height).removeClass('hide');
										if(Janus.webRTCAdapter.browserDetails.browser === "firefox") {
											// Firefox Stable has a bug: width and height are not immediately available after a playing
											setTimeout(function() {
												let width = $('#'+ev.target.id).get(0).videoWidth;
												let height = $('#'+ev.target.id).get(0).videoHeight;
												$('#curres'+mid).removeClass('hide').text(width+'x'+height).removeClass('hide');
											}, 2000);
										}
									});*/
									Janus.attachMediaStream(document.querySelector('#remotevideo' ),stream);
									/*let playPromise = document.querySelector('#remotevideo').play();
									if (playPromise !== undefined) {
										playPromise
											.then(function() {
												Janus.log('Started playing')
											})
											.catch(function(error) {
												Janus.error('Failed to play', error)
											});
									}*/
									//$('#remotevideo' + mid).get(0).volume = 1;
								},
								// eslint-disable-n
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
        //  freeLocalStream();
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
	//div.innerHTML="<span><b>" + "anon" + ": </b></span><br><span>" + esci(a.value.trim()) + "</span>";
	div.innerHTML = "<span>" + esci(a.value.trim()) + "</span>";
	chatbox.appendChild(div);
	chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
	}
	
	function wsend(obj){
	if(!sock) return;
	let d;
	obj.type = "janusstream";
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
				insert_message({value: el.message});
			});
		}
		 
	  }}catch(e){
		  console.error(e);
	  }
}
getMessages();
window.addEventListener("beforeunload",  function(ev){
	ev.preventDefault();
	alert(1);
	let body = { request: "stop" };
	sfutest.send({ message: body });
	sfutest.hangup();
});
document.addEventListener('visibilitychange', function(ev){
	alert(3);
	let body = { request: "stop" };
	sfutest.send({ message: body });
	sfutest.hangup();
});
window.addEventListener("pagehide", async function(ev){
	alert(2);
		 	let body = { request: "stop" };
	sfutest.send({ message: body });
	sfutest.hangup();

});
