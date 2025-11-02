/*function adminMedia(msg){
	console.log(msg);
}
*/
var videoInput1, videoInput2;
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var isOpen = false;


//const localVideo = gid('localVideo');

var kK = 0;
var myPeerId;// = uuidv4();
//gid('clientId').textContent = myPeerId;
var isSocketOpened = false;
let device,
           joined,
           localCam,
           localScreen,
           recvTransport,
           sendTransport,
           camVideoProducer,
           camAudioProducer,
           screenVideoProducer,
           screenAudioProducer,
           currentActiveSpeaker = {},
           lastPollSyncData = {},
           consumers = [];
           var histarget;
           

//
// entry point -- called by document.body.onload
//

 async function main() {
  console.log(`starting up ... my peerId is ${myPeerId}`);
  try {
    device = new window.mediasoup.Device();//new mediasoup.Device();
   device.observer.on('newtransport', function(t){
	//	alert('transport');
		t.observer.on('newproducer', function(p){
			//alert('new producer '+p.appData.mediaTag+' '+p.appData.peerId+' '+p.id);
			
			p.observer.on('close', function(){
				console.log('*** producer closed *** ', p.id);
			});
			
			//setTimeout(function(){

			//if(camVideoProducer){
					//alert('my peerId: '+ myPeerId+' mediTag '+camVideoProducer.appData.mediaTag+' producerId: '+camVideoProducer.id);
					wsend({ 
						type: 'Newproducer', 
						request: 'mediasoup',
						 mediaTag: p.appData.mediaTag, 
						 peerId: myPeerId ,
						 id: p.id
						 });
			//}else{
				//alert('cavideoProducer '+camVideoProducer);
			//}
	//},100);
	/*
		setTimeout(function(){
			if(camAudioProducer){
			//	alert('my peerId: '+ myPeerId+' mediTag '+camAudioProducer.appData.mediaTag+' producerId: '+camAudioProducer.id);
			wsend({
			type: 'Newproducer', 
						request: 'mediasoup',
						 mediaTag: camAudioProducer.appData.mediaTag, 
						 peerId: myPeerId,
						 id: camAudioProducer.id 		
			});
			}else{
				alert('camAudioProducer '+camAudioProducer);
			}
	},101);
		*/	
		
			
			
			
			
			
		});
		t.observer.on('close', function(){
			console.log('***** transport closed ***** ', t.id, ' ', t.appData);
			if(t.appData.type == 'recv'){
				// wsend({ type: 'minus-statistic', subtype: 'consumer', peerId: myPeerId , request: 'mediasoup' });
			}
		});
		t.observer.on('newconsumer', function(c){
			console.log('new consumer ', c.id);
			c.observer.on('close', function(){
				console.log('**** consumer closed **** ', c.id, ' ', c.appData.mediaTag);
			});
		});
		
	});
  } catch (e) {
    if (e.name === 'UnsupportedError') {
      console.error('browser not supported for video calls');
      return;
    } else {
      console.error(e);
    }
  }

  // use sendBeacon to tell the server we're disconnecting when
  // the page unloads
//  window.addEventListener('unload', () => sig('leave', {}, true));
}
main()
//
// meeting control actions
//

 
async function adminMedia(a){
	//alert(a.type);
	if(!a.type == 'sync')console.log('msg type ', a.type);
	if(a.type == 'howmuch'){
		$('#onlineCount').textContent = a.value;
	//	$('#totalSpeakers').textContent = a.count;
	//	$('#consumerCount').textContent = a.consumerscount;
	}else if(a.type == 'welcome'){
		myPeerId = a.socketid;
	}else if(a.type == "Newproducer"){
		if(!joined){
			//alert(' not else joined, returning...');
			return;
			}

		if(ISVIDEO) {
			/*
		if(a.mediaTag == 'cam-video'){
	
		setTimeout(async ()=>{	
			await subscribeToTrack(a.peerId, a.mediaTag, a.nick) 
			},4000)
		}
	else if(a.mediaTag == 'cam-audio'){
		setTimeout(async ()=>{
				await subscribeToTrack(a.peerId, a.mediaTag, a.nick)
			}, 5000) 
	 }*/
	 //alert(JSON.stringify(a));
	 subscribi(a.peerId, a.mediaTag, a.nick, a.transportId, a.producerId);
 }
	}else if(a.type == 'byeD'){
		//alert('booo '+a.type);
		console.log(a);
		await unsubscribeFromTrack(a.peerId, 'video')
		setTimeout(async function(){
			await unsubscribeFromTrack(a.peerId, 'audio')
		},100);
		/*
		let consumer = findConsumerForTrack(a.peerId, 'video');
  if (!consumer) {
	 console.log('no consumer',a.peerId, consumers);
    return;
  }
  console.log('unsubscribe from track', a.peerId);
  try {
    await closeConsumer(consumer);
  } catch (e) {
    console.error(e);
  }
  
let consumeri = findConsumerForTrack(a.peerId, 'audio');
  if (!consumeri) {
	console.log('no consumeri', a.peerId, consumers);
    return;
  }
  console.log('unsubscribe from track', a.peerId);
  try {
    await closeConsumer(consumeri);
  } catch (e) {
    console.error(e);
  }*/
	}else if(a.type == 'total_speakers'){
	//	$('#totalSpeakers').textContent = a.count;
	}else if(a.type == 'total_consumers'){
			//	$('#consumerCount').textContent = a.count;
	}else if(a.type == 'no_target'){
		note({ content: "Нет в эфире!", type: 'info', time: 5 });
	}else if(a.type == 'msg'){
		handlePrivat(a);
	}else if(a.type == 'simulcast'){
		console.log('simulcast', a);
		setConsumerParameters(a)
	}else if(a.type == 'simple'){
		console.log('simple ', a);
		setConsumerParameters(a)
		}else if(a.type == 'resume-consumer'){
			addvideoaudio(a);
		}else if(a.type == 'join-as-new-peer'){
			fucker(a.routerRtpCapabilities, a.state)
		}else if(a.type=='place'){
			console.log('room state ', a.roomState);
		}else if(a.type=='close-producer'){
			console.log(a);
			//alert(a.closed);
		}else if(a.type == 'error'){
			note({ content: a.error, type: 'error', time: 5 });
			console.error(a.error);
		}else{
			//console.log("unknown type ", a.type);
			}

	
}

 function sendRequest(obj) {
    return new Promise((resolve, reject) => {
		if(!isSocketOpened){
			//return resolve({ error: 'socket closed' });
		}
        obj.request = "mediasoup2";
       // alert('peerid '+ myPeerId);
        obj.peerId = myPeerId; 
     
     //console.log(obj);
        sock.send(JSON.stringify(obj));
       // sock.addEventListener('message',  async function (e) {
			sock.onmessage = function(e){
            let a;
           // console.log('a ', a);
            try {
                a = JSON.parse(e.data);
            } catch (er) {
                reject(er);
                
            }
          
			//console.log('B ', a);
		
			if (a.type == obj.type) {
				//console.log("d ", a.type," = ", obj.type);
                resolve(a);
                sock.onmessage = null;
          //  }
            //else if(a.type == 'dynamic'){
				//if(a.sub == 'total'){
//				camsCount.textContent = a.cams.length;

		//let b = setConnects(a.cams.length);
		//if(b){
		//connects.textContent = b;
		//connects.textContent = obj.connects;
	
		//if(!ISVIDEO){
		/*a.cams.forEach(function(el, i){
		let d = document.createElement("div");
		d.className="dynamicbox";
		d.setAttribute("data-id", el[1].id);
		d.innerHTML=`<caption>${el[1].nick}</caption><div class="dynamicImgHalter"><div class="krestik" data-kid="${el[1].id}" onclick="krestik(this);">&#x274E;</div><img data-pid="${el[1].id}" src="${el[1].src}"/></div>`;
		dynamicContainer.appendChild(d);*/
	
//}
//}else if(a.sub=='remove'){
	/*camsCount.textContent = a.camcount;
		let b = setConnects(a.camcount);
		
		connects.textContent = b;
		let el = document.querySelector(`[data-id="${a.id}"]`);
		if(el)el.remove();*/
//}
			}else if (a.type == "error") {
				alert(a.error);
                reject(a);
                sock.onmessage = null;
            }else if(a.type == "simulcast"){
			console.log(e.data);
				resolve(a);
				 sock.onmessage = null;
			}else if(a.type =='simple'){
				resolve(a);
				 sock.onmessage = null;
			}else if(a.type=='bye'){
			//	resolve(a);
			}
			else{
				//console.log(a.type);
				resolve(a);
				 sock.onmessage = null;
				}
			}
        

    });

}


function setVideos(el){
	if(el.checked){
		 vax('post','/enableVideo', { checked: 'yes' }, on_check, on_check_error, null, false);
	}else{
		vax('post','/enableVideo', { checked: 'no' }, on_check, on_check_error, null, false);
	}
}

function on_check(l){
	note({ content: l.info, type: "info", time: 5 });
} 
function on_check_error(l){
	console.log(l);
}

async function exec(functions){
	const results = [];
	for(const {fn, params} of functions){
		const result = await fn(...params);
		results.push(result);
	}
	return results;
}

async function execwithdelay(functions, delay){
	for (const funci of functions){
		//if(typeof func === 'function'){
		//funci.fn();	
		//}
		//console.log(funci.fn);
		await new Promise(resolve=>{
			//if(typeof func === 'function'){
		funci.fn();	
	//}
			setTimeout(resolve, delay);
		});
	}
}



async function joinRoom(el) {
	if(!myVideo.checked){
		note({ content: "Сперва включите чат", type: "info", time: 5 });
		return;
	}
 
//$('#join-button').disabled = true;
  console.log('join room');
  //$('#join-control').style.display = 'none';
let l = el.getAttribute("data-start");
//alert(l)
if(l == 'yes'){
	 if (joined) {
	 // alert('shon joined returning');
   return;
  }
   while(dynamicContainer.firstChild){
		dynamicContainer.firstChild.remove();
	}
	ISVIDEO = true;
 // try {
    // signal that we're a new peer and initialize our
    // mediasoup-client device, if this is our first time connecting
   // let { routerRtpCapabilities, state } = await sendRequest({type:'join-as-new-peer'});
   wsend({ type:'join-as-new-peer', request: 'mediasoup2', peerId: myPeerId });
  //  console.log('rtpcapabilities ', routerRtpCapabilities);
  el.setAttribute("data-start", "no");
   el.textContent = "Выйти";
   el.disabled = false;
}else{
	 ISVIDEO = false;
	 joined = false;
	el.textContent = "Войти в чат";
	el.setAttribute('data-start', "yes");
	leaveRoom();
}
}
    async function fucker(routerRtpCapabilities, state){
    if(!routerRtpCapabilities){
		note({ content: "Повторите попытку", type: "info", time: 5 });
		return;
	}
    if (!device.loaded) {
      await device.load({ routerRtpCapabilities });
  }
  let abba = [];
      console.log('state ', state);
      if(state.length > 0){
			for(let item of state){
				await subscribi(item.peerid, item.media, item.nick, item.transportId, item.producerId);
			
		//		setTimeout(async function(){
		abba.push({fn:  ()=>{ let s = subscribi(item.peerid, item.media, item.nick, item.transportId, item.producerId);return s;}, params:[item.peerid, item.media, item.nick, item.transportId, item.producerId] });
		//alert(item.transportId);
			//await subscribeToTrack(item.peerid, item.media, item.nick)
		//}, 3);
			}
			/*
			(async ()=>{
				try{
					const results = await exec(abba);
					console.log('results ', results);
				}catch(er){
					console.error(er);
				}
			})()*/
			//execwithdelay(abba, 1010);
		
	}	
		
    
    joined = true;
}
/*
   // $('#leave-room').style.display = 'initial';
   el.setAttribute("data-start", "no");
   el.textContent = "Выйти";
   el.disabled = false;
  } catch (e) {
	  ISVIDEO = false;
    console.error(e);
    note({ content: e, type: "error", time: 5 });
    $('#join-button').disabled = false;
    joined = false;
    return;
  }
}else{
	 ISVIDEO = false;
	 joined = false;
	el.textContent = "Войти в чат";
	el.setAttribute('data-start', "yes");
	leaveRoom();
}

}*/
setInterval(async function(){
	try{
	await sendRequest({ type:'sync' });
}catch(er){
	console.error(er);
}
}, 1000*11)
 
function pauseVideo(element) {
    element.pause();
    element.srcObject = null;
}
function stopLocalStream(stream) {
    let tracks = stream.getTracks();
    if (!tracks) {
        console.warn('NO tracks');
        return;
    }
	tracks.forEach(track => track.stop());
}
async function leaveRoom() {
  if (!joined) {
	//  alert('!joined');
   // return;
  }

 // alert('leave room');
  //$('#leave-room').style.display = 'none';


  // close everything on the server-side (transports, producers, consumers)
  let { error } = await sendRequest({ type: 'leave' });
  if (error) {
    console.error(error);
  }

  // closing the transports closes all producers and consumers. we
  // don't need to do anything beyond closing the transports, except
  // to set all our local variables to their initial states
  try {
    recvTransport && await recvTransport.close();
    sendTransport && await sendTransport.close();
  } catch (e) {
    console.error(e);
  }
  wsend({ type: 'byeD', peerId: myPeerId , request: 'mediasoup2' });
  recvTransport = null;
  sendTransport = null;
  camVideoProducer = null;
  camAudioProducer = null;
  screenVideoProducer = null;
  screenAudioProducer = null;
  localCam = null;
  localScreen = null;
  lastPollSyncData = {};
  consumers.forEach( function(el){
	  unsubscribeFromTrack(el.appData.peerId, el.appData.mediaTag) 
	  // removeVideoAudio(el);
	  // el.close();
  });
  consumers = [];
  ISVIDEO = false;
  wsend({ type: 'list' });
 // joined = false;

  // hacktastically restore ui to initial state
//  $('#join-control').style.display = 'initial';
 // $('#send-camera').style.display = 'initial';
 // $('#stop-streams').style.display = 'none';
  //$('#remote-video').innerHTML = '';
//  $('#share-screen').style.display = 'initial';
 // $('#local-screen-pause-ctrl').style.display = 'none';
 // $('#local-screen-audio-pause-ctrl').style.display = 'none';
 // showCameraInfo();
 // updateCamVideoProducerStatsDisplay();
  //updateScreenVideoProducerStatsDisplay();
  //updatePeersDisplay();
  // $('#send-camera').textContent = "Войти в чат";
   //$('#send-camera').setAttribute("data-state", "start");
   //$('#send-camera').disabled = false;
}

async function subscribi(peerId, mediaTag, nick, transportId, producerId){
	 console.log('subscribe to track', peerId, mediaTag);
if(mediaTag == 'video'){
	mediaTag = 'cam-video';
}else if(mediaTag == 'audio'){
	mediaTag = 'cam-audio';
}else{}
 if (!recvTransport) {
   recvTransport = await createTransport('recv');
  }

  // if we do already have a consumer, we shouldn't have called this
  // method
 let consumer = findConsumerForTrack(peerId, mediaTag);
  if (consumer) {
    console.error('already have consumer for track', peerId, mediaTag)
    return;
 };
  if(mediaTag == 'cam-video'){
 let  consumer =   consumeAnd(recvTransport, mediaTag, peerId, nick,transportId, producerId);
 if(consumer){
// consumers.push(consumer);
	consumer.on('trackended', function(){
		alert('videoconsumer on track ended pused '+ videoConsumer.paused);
	//	unsubscribeFromTrack(peerId, mediaTag)
	});
	consumer.on('transportclose', function(){
		console.log('transport closed so videoconsumer must close');
	})
}
}else{
 let consumer =  consumeAnd(recvTransport, mediaTag, peerId, nick,transportId, producerId);
 if(consumer){
 //consumers.push(consumer);
consumer.on('trackended', function(){
	alert('audio consumer on track ended pause '+audioConsumer.paused); 
	// unsubscribeFromTrack(peerId, mediaTag)
 }
 );
 consumer.on('transportclose', function(){
		console.log('transport closed so audioconsumer must close');
	})
}
}
}
function consumeAnd(recvTransport, mediaTag, peerId, nick,transportId, producerId){
	// let consumer;
  //  try {
      //  consumer =  
        bconsumi(recvTransport, mediaTag, peerId, nick,transportId, producerId);
        
  /*  } catch (err) {
	
		console.error("err: ", err);
        note({content: err.toString(), type: "error", time: 10 });
    }*/
  //  if (consumer) {
		
       // console.log('-- track exist, consumer ready. kind=' + kind);
      //  console.log('----- consumer: ', consumer);
      //alert(kind);
        if (mediaTag === 'cam-video' /*|| 'cam-audio'*/) {
			
           // console.log('-- resume kind=' + kind + ' --consumer.id = ' + consumer.id);
            //try {
               // let { error } = await sendRequest({type: 'resume-consumer' , kind: kind, consumerId: consumer.id })
            //   wsend({type: 'resume-consumer', request: 'mediasoup2', peerId: myPeerId, kind: kind, consumerId: consumer.id});
                console.log('resume OK');
               
               // return consumer;
           /* } catch (err) {
				console.error(err);
                note({content: err.toString(), type: "error", time: 10 });
                return consumer;
            }*/
        } else {
            console.log('-- do not resume kind=' + mediaTag);
          //  alert('-- do not resume kind=' + kind);
          // return consumer;
        }
 //   } else {
      //  console.log('-- no consumer yet. kind=' + kind);
       // alert('-- no consumer yet. kind=' + kind);
    //    return null;
   // }
}
function bconsumi(recvTransport, kind, peerId, nick,transportId, producerId){
	  console.log('--start of consume --kind=' + kind);
	  //alert('here 4 '+transportId+' '+producerId);
    const { rtpCapabilities } = device;
   // var data;
    
   // let consumerParameters;let error;
    try {
		// mediaTag,
   // mediaPeerId: peerId,
   // rtpCapabilities: device.rtpCapabilities
      //  data
    //  consumerParameters  = await sendRequest({type: 'recv-track' /*'consume'*/, rtpCapabilities, mediaTag: trackKind, mediaPeerId: peerId })
  // if(error)alert(error);
 wsend({ type: 'recv-track' /*'consume'*/, rtpCapabilities, mediaTag: kind, mediaPeerId: peerId, request:'mediasoup2', peerId: myPeerId, usernick: nick , transportId, producerId}) 
    } catch (err) {
		console.error(err);
        note({contrent: 'Consume ERROR: ' + err, type: "error", time: 5});
        return null
    }
}
    
//console.error(data)
//console.log('consumerParameters ', JSON.stringify(consumerParameters))
async function setConsumerParameters(consumerParameters){

   const producerId = consumerParameters.producerId;
  //  const id = data.params.id;
  //  const kind = data.params.kind;
  //  const rtpParameters = data.params.rtpParameters;
let mediaTag = consumerParameters.kind; 
let peerId = consumerParameters.peerid;
let nick =        consumerParameters.usernick;
let transportId = consumerParameters.transportId;
//alert('here 3 '+ transportId)
//let producerId = consumerParameters.producerId;
//alert(nick)
console.log('consumerParameters ', consumerParameters)
       let codecOptions = {};
        let consumer;
        try {
            consumer = await recvTransport.consume({
                //id,
              //  producerId,
              //  kind,
              //  rtpParameters,
               // codecOptions,
               ...consumerParameters,
    appData: { peerId, mediaTag, nick , transportId, producerId }
            });
            console.log(consumerParameters.kind);
      
        } catch (err) {
			console.error(err);
            note({content: err.toString(), type: "error", time: 5});
            return null;
        }
//if(consumerParameters.kind == 'video')  
  wsend({type: 'resume-consumer', request: 'mediasoup2', peerId: peerId, kind: consumerParameters.kind, consumerId: consumer.id});
       consumers.push(consumer);
        //  addRemoteTrack(MYSOCKETID, consumer.track);
   // setTimeout(async function(){
		//   addVideoAudio(consumer);
	  //},2000)
		//updatePeersDisplay();
       
        return consumer;
   // } else {
    //    note({content: 'Remote producer NOT READY ' + mediaTag, type: "info", time: 5});

     //   return null;
    //}
}
function addvideoaudio(a){
	let consumer = findConsumerForTrack(a.peerId, a.mediaTag);
	if(consumer){
		addVideoAudio(consumer);
	}else{
		console.log('no consumer for add video');
	}
}
function fucking(){
	alert('ok');
	wsend({ type: 'clear',  request:'mediasoup2' });
}
async function unsubscribeFromTrack(peerId, mediaTag) {
	alert('fucker');
  let consumer = findConsumerForTrack(peerId, mediaTag);
  if (!consumer) {
	  alert('not a consumer');
    return;
  }
alert('unsubscribe')
  console.log('unsubscribe from track', peerId, mediaTag);
  try {
    await closeConsumer(consumer);
  } catch (e) {
    console.error(e);
    alert(e);
  }
  // force update of ui
 // updatePeersDisplay();
}
async function resumeConsumer(consumer) {
  if (consumer) {
    console.log('resume consumer', consumer.appData.peerId, consumer.appData.mediaTag);
    try {
    
       await sendRequest({ type: 'resume-consumer',  consumerId: consumer.id });
      await consumer.resume();
    } catch (e) {
      console.error(e);
    }
  }
}
async function subscribeToTrack(peerId, mediaTag, nick) {
  console.log('subscribe to track', peerId, mediaTag);
if(mediaTag == 'video'){
	mediaTag = 'cam-video';
}else if(mediaTag == 'audio'){
	mediaTag = 'cam-audio';
}else{}


return new Promise(async function(resolve,reject){
try{
  // create a receive transport if we don't already have one
  if (!recvTransport) {
    recvTransport = await createTransport('recv');
  }

  // if we do already have a consumer, we shouldn't have called this
  // method
 let consumer = findConsumerForTrack(peerId, mediaTag);
  if (consumer) {
    console.error('already have consumer for track', peerId, mediaTag)
    return;
 };
  
  //alert('mediatag ' + mediaTag);
 //videoConsumer = 
if(mediaTag == 'cam-video'){
 let  consumer =  await consumeAndResume(recvTransport, mediaTag, peerId, nick);
 if(consumer){
 consumers.push(consumer);
	consumer.on('trackended', function(){
		alert('videoconsumer on track ended pused '+ videoConsumer.paused);
	//	unsubscribeFromTrack(peerId, mediaTag)
	});
	consumer.on('transportclose', function(){
		console.log('transport closed so videoconsumer must close');
	})
}
}else{
 let consumer = await consumeAndResume(recvTransport, mediaTag, peerId, nick);
 if(consumer){
 consumers.push(consumer);
consumer.on('trackended', function(){
	alert('audio consumer on track ended pause '+audioConsumer.paused); 
	// unsubscribeFromTrack(peerId, mediaTag)
 }
 );
 consumer.on('transportclose', function(){
		console.log('transport closed so audioconsumer must close');
	})
}
}

resolve('ok')
  // ask the server to create a server-side consumer object and send
  // us back the info we need to create a client-side consumer
  
  
  //bconsumer = await bconsume(recvTransport, mediaTag);
  /*
  let consumerParameters = await sendRequest({type:'recv-track', // consume
    mediaTag,
    mediaPeerId: peerId,
    rtpCapabilities: device.rtpCapabilities
  });
  console.log('consumer parameters', consumerParameters);
  consumer = await recvTransport.consume({
    ...consumerParameters,
    appData: { peerId, mediaTag }
  });
  console.log('created new consumer', consumer.id);
*/
  // the server-side consumer will be started in paused state. wait
  // until we're connected, then send a resume request to the server
  // to get our first keyframe and start displaying video
 // while (recvTransport.connectionState !== 'connected') {
   // console.log('  transport connstate', recvTransport.connectionState );
  //  await sleep(100);
  //}
  // okay, we're ready. let's ask the peer to send us media
 // await resumeConsumer(consumer);

  // keep track of all our consumers
 // consumers.push(consumer);
}catch(e){
	resolve(e);
	console.error(e);
//alert(e);
}
 // ui
  //await addVideoAudio(consumer);
 // updatePeersDisplay();
})
}


async function consumeAndResume(recvTransport, kind, peerId, nick) {
    let consumer;
    try {
        consumer = await bconsume(recvTransport, kind, peerId, nick);
        
    } catch (err) {
	
		console.error("err: ", err);
        note({content: err.toString(), type: "error", time: 10 });
    }
    if (consumer) {
		
        console.log('-- track exist, consumer ready. kind=' + kind);
        console.log('----- consumer: ', consumer);
      //alert(kind);
        if (kind === 'cam-video' /*|| 'cam-audio'*/) {
			
            console.log('-- resume kind=' + kind + ' --consumer.id = ' + consumer.id);
            try {
                let { error } = await sendRequest({type: 'resume-consumer' , kind: kind, consumerId: consumer.id })
if(error) alert(error)
                console.log('resume OK');
               
                return consumer;
            } catch (err) {
				console.error(err);
                note({content: err.toString(), type: "error", time: 10 });
                return consumer;
            }
        } else {
            console.log('-- do not resume kind=' + kind);
          //  alert('-- do not resume kind=' + kind);
          // return consumer;
        }
    } else {
        console.log('-- no consumer yet. kind=' + kind);
       // alert('-- no consumer yet. kind=' + kind);
        return null;
    }
}
async function bconsume(transport, trackKind, peerId, nick) {
    console.log('--start of consume --kind=' + trackKind);
    const { rtpCapabilities } = device;
    var data;
    
    let consumerParameters;let error;
    try {
		// mediaTag,
   // mediaPeerId: peerId,
   // rtpCapabilities: device.rtpCapabilities
      //  data
      consumerParameters  = await sendRequest({type: 'recv-track' /*'consume'*/, rtpCapabilities, mediaTag: trackKind, mediaPeerId: peerId })
  // if(error)alert(error);
    } catch (err) {
		console.error(err);
        note({contrent: 'Consume ERROR: ' + err, type: "error", time: 5});
        return null
    }
    
//console.error(data)
//console.log('consumerParameters ', JSON.stringify(consumerParameters))

   const producerId = consumerParameters.producerId;
  //  const id = data.params.id;
  //  const kind = data.params.kind;
  //  const rtpParameters = data.params.rtpParameters;
mediaTag = trackKind;
    if (producerId) {
        let codecOptions = {};
        let consumer;
        try {
            consumer = await transport.consume({
                //id,
              //  producerId,
              //  kind,
              //  rtpParameters,
               // codecOptions,
               ...consumerParameters,
    appData: { peerId, mediaTag, nick }
            });
        } catch (err) {
			console.error(err);
            note({content: err.toString(), type: "error", time: 5});
            return null;
        }
     
        //  addRemoteTrack(MYSOCKETID, consumer.track);
      await addVideoAudio(consumer);
		//updatePeersDisplay();
       
        return consumer;
    } else {
        note({content: 'Remote producer NOT READY ' + mediaTag, type: "info", time: 5});

        return null;
    }
}

async function unsubscribeFromTrack(peerId, mediaTag) {
  let consumer = findConsumerForTrack(peerId, mediaTag);
  if (!consumer) {
    return;
  }

  console.log('unsubscribe from track', peerId, mediaTag);
  try {
    await closeConsumer(consumer);
  } catch (e) {
    console.error(e);
  }
  // force update of ui
 // updatePeersDisplay();
}
async function resumeConsumer(consumer) {
  if (consumer) {
    console.log('resume consumer', consumer.appData.peerId, consumer.appData.mediaTag);
    try {
    
       await sendRequest({ type: 'resume-consumer',  consumerId: consumer.id });
      await consumer.resume();
    } catch (e) {
      console.error(e);
    }
  }
}
async function pauseConsumer(consumer) {
  if (consumer) {
    console.log('pause consumer', consumer.appData.peerId, consumer.appData.mediaTag);
    try {
      await sendRequest({type:'pause-consumer',  consumerId: consumer.id });
      await consumer.pause();
    } catch (e) {
      console.error(e);
    }
  }
}

async function pauseProducer(producer) {
  if (producer) {
    console.log('pause producer', producer.appData.mediaTag);
    try {
      await sendRequest({type:'pause-producer',  producerId: producer.id });
      await producer.pause();
    } catch (e) {
      console.error(e);
    }
  }
}

async function resumeProducer(producer) {
  if (producer) {
    console.log('resume producer', producer.appData.mediaTag);
    try {
      await sendRequest({type:'resume-producer',  producerId: producer.id });
      await producer.resume();
    } catch (e) {
      console.error(e);
    }
  }
}

async function closeConsumer(consumer) {
  if (!consumer) {
	 // alert('no consumer');
    return;
  }
  console.log('closing consumer', consumer.appData.peerId, consumer.appData.mediaTag, consumer.id);
  try {
    // tell the server we're closing this consumer. (the server-side
    // consumer may have been closed already, but that's okay.)
    //let {error} = await sendRequest({ type:'close-consumer',  consumerId: consumer.id });
   // if(error)console.warn(error);
    await consumer.close();

    consumers = consumers.filter((c) => c !== consumer);
    removeVideoAudio(consumer);
   
  } catch (e) {
    console.error(e);
  }
}
const	iceServersid = [
	{
      "urls": "stun:stun.l.google.com:19302"
    },
	{
		"urls":[
		"stun:rouletka.ru:3479",
		"stun:rouletka.ru:5348"
		]
		},
	{urls:[
	"turn:rouletka.ru:3479?transport=udp",
		"turn:rouletka.ru:3479?transport=tcp", 
		"turn:rouletka.ru:5348?transport=udp",
		"turn:rouletka.ru:5348?transport=tcp" //no stun
		]
		,username:"alik",credential:"1234"}
		]
 //const ICESERVERS = {
  //iceTransportPolicy:"relay",

		//};
//alert(iceServersid.length)
// utility function to create a transport and hook up signaling logic
// appropriate to the transport's direction
//
async function createTransport(direction) {
  console.log(`create ${direction} transport`);

  // ask the server to create a server-side transport object and send
  // us back the info we need to create a client-side transport
  let transport,
      { transportOptions } = await sendRequest({type:'create-transport',  direction });
  console.log ('transport options', transportOptions);

  if (direction === 'recv') {
	
    transport = await device.createRecvTransport(transportOptions);
    transport.appData.type = 'recv';
    transport.iceServers = iceServersid;
  } else if (direction === 'send') {
	  
    transport = await device.createSendTransport(transportOptions);
    transport.appData.type = 'send';
        transport.iceServers = iceServersid;
  } else {
    throw new Error(`bad transport 'direction': ${direction}`);
  }

  // mediasoup-client will emit a connect event when media needs to
  // start flowing for the first time. send dtlsParameters to the
  // server, then call callback() on success or errback() on failure.
  transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
    console.log('transport connect event', direction);
    let { error } = await sendRequest({type:'connect-transport', 
      transportId: transportOptions.id,
      dtlsParameters
    });
    if (error) {
      console.error('error connecting transport', direction, error);
      errback();
      return;
    }
    callback();
  });

  if (direction === 'send') {
    // sending transports will emit a produce event when a new track
    // needs to be set up to start sending. the producer's appData is
    // passed as a parameter
    transport.on('produce', async ({ kind, rtpParameters, appData },
                                   callback, errback) => {
      console.log('transport produce event', appData.mediaTag);
      // we may want to start out paused (if the checkboxes in the ui
      // aren't checked, for each media type. not very clean code, here
      // but, you know, this isn't a real application.)
      let paused = false;
      if (appData.mediaTag === 'cam-video') {
        paused = getCamPausedState();
      } else if (appData.mediaTag === 'cam-audio') {
        paused = getMicPausedState();
      }
      // tell the server what it needs to know from us in order to set
      // up a server-side producer object, and get back a
      // producer.id. call callback() on success or errback() on
      // failure.
      let { id } = await sendRequest({type:'send-track', 
        transportId: transportOptions.id,
        kind,
        rtpParameters,
        paused,
        appData
      });
     // alert(id);
    //  if (error) {err('error setting up server-side producer', error); errback(); return;}
      callback({ id });
    });
  }

  // for this simple demo, any time a transport transitions to closed,
  // failed, or disconnected, leave the room and reset
  //
  transport.on('connectionstatechange', async (state) => {
	  //alert(state);
    console.log(`transport ${transport.id} connectionstatechange ${state}`);
    // for this simple sample code, assume that transports being
    // closed is an error (we never close these transports except when
    // we leave the room)
    if(state == "connected"){
		if(direction == 'send'){
			
		//$('#send-camera').textContent = "Выйти из чата";
		// let img_data = Screenshot2();
		// if(img_data)wsend({ request: 'mediasoup2', img_data: img_data, type: 'pic' });
		}else{
		//	let ab = $('#send-camera').getAttribute("data-state");
		//if(ab == "start")wsend({ type: 'add-statistic', subtype: 'consumer', peerId: myPeerId , request: 'mediasoup' });
		}
	//	alert('connected');
	// $('#send-camera').disbabled = false;
	  
		note({ content: (direction=='send'?"Вы в эфире!":"Вы подписались!"), type: "info", time: 5 });
	}else if (state === 'closed' || state === 'failed' || state === 'disconnected') {
      console.log('transport closed ... leaving the room and resetting');
      leaveRoom();
    }
  });

  return transport;
}

//
// polling/update logic
//

async function pollAndUpdate() {
	//alert(1);
  let { peers, activeSpeaker, error } = await sendRequest({type:'sync'});
 // console.log('polling peers', peers);
 // console.log('polling active speaker ',activeSpeaker);
  if (error) {
	  console.error(error);
    return ({ error });
  }

  // always update bandwidth stats and active speaker display
  if(activeSpeaker)currentActiveSpeaker = activeSpeaker;
  updateActiveSpeaker();
  updateCamVideoProducerStatsDisplay();
  updateScreenVideoProducerStatsDisplay();
  updateConsumersStatsDisplay();

  // decide if we need to update tracks list and video/audio
  // elements. build list of peers, sorted by join time, removing last
  // seen time and stats, so we can easily do a deep-equals
  // comparison. compare this list with the cached list from last
  // poll.
  if(peers){
  let thisPeersList = sortPeers(peers),
      lastPeersList = sortPeers(lastPollSyncData);
  if (!deepEqual(thisPeersList, lastPeersList)) {
    updatePeersDisplay(peers, thisPeersList);
  }

  // if a peer has gone away, we need to close all consumers we have
  // for that peer and remove video and audio elements
  for (let id in lastPollSyncData) {
    if (!peers[id]) {
      console.log(`peer ${id} has exited`);
      consumers.forEach((consumer) => {
        if (consumer.appData.peerId === id) {
          closeConsumer(consumer);
        }
      });
    }
  }
}

  // if a peer has stopped sending media that we are consuming, we
  // need to close the consumer and remove video and audio elements
  if(peers){
  consumers.forEach((consumer) => {
    let { peerId, mediaTag } = consumer.appData;
    if (!peers[peerId].media[mediaTag]) {
      console.log(`peer ${peerId} has stopped transmitting ${mediaTag}`);
      closeConsumer(consumer);
    }
  });
}
 if(peers) lastPollSyncData = peers;
  return ({}); // return an empty object if there isn't an error
}

function sortPeers(peers) {
  return  Object.entries(peers)
    .map(([id, info]) => ({id, joinTs: info.joinTs, media: { ...info.media }}))
    .sort((a,b) => (a.joinTs>b.joinTs) ? 1 : ((b.joinTs>a.joinTs) ? -1 : 0));
}

function findConsumerForTrack(peerId, mediaTag) {
  return consumers.find((c) => (c.appData.peerId === peerId &&
                                c.appData.mediaTag === mediaTag));
}

//
// -- user interface --
//

function getCamPausedState() {
 // return !$('#local-cam-checkbox').checked;
}

function getMicPausedState() {
 // return !$('#local-mic-checkbox').checked;
}

function getScreenPausedState() {
 // return !$('#local-screen-checkbox').checked;
}

function getScreenAudioPausedState() {
 // return !$('#local-screen-audio-checkbox').checked;
}

 async function changeCamPaused() {
  if (getCamPausedState()) {
    pauseProducer(camVideoProducer);
    $('#local-cam-label').innerHTML = 'camera (paused)';
  } else {
    resumeProducer(camVideoProducer);
    $('#local-cam-label').innerHTML = 'camera';
  }
}

 async function changeMicPaused() {
  if (getMicPausedState()) {
    pauseProducer(camAudioProducer);
    $('#local-mic-label').innerHTML = 'mic (paused)';
  } else {
    resumeProducer(camAudioProducer);
    $('#local-mic-label').innerHTML = 'mic';
  }
}

async function changeScreenPaused() {
  if (getScreenPausedState()) {
    pauseProducer(screenVideoProducer);
    $('#local-screen-label').innerHTML = 'screen (paused)';
  } else {
    resumeProducer(screenVideoProducer);
    $('#local-screen-label').innerHTML = 'screen';
  }
}

 async function changeScreenAudioPaused() {
  if (getScreenAudioPausedState()) {
    pauseProducer(screenAudioProducer);
    $('#local-screen-audio-label').innerHTML = 'screen (paused)';
  } else {
    resumeProducer(screenAudioProducer);
    $('#local-screen-audio-label').innerHTML = 'screen';
  }
}


async function updatePeersDisplay(peersInfo = lastPollSyncData,
                                         sortedPeers = sortPeers(peersInfo)) {
											 /*
  console.log('room state updated', peersInfo);

  $('#available-tracks').innerHTML = '';
  if (camVideoProducer) {
    $('#available-tracks')
      .appendChild(makeTrackControlEl('my', 'cam-video',
                                      peersInfo[myPeerId].media['cam-video']));
  }
  if (camAudioProducer) {
    $('#available-tracks')
      .appendChild(makeTrackControlEl('my', 'cam-audio',
                                      peersInfo[myPeerId].media['cam-audio']));
  }
  if (screenVideoProducer) {
    $('#available-tracks')
      .appendChild(makeTrackControlEl('my', 'screen-video',
                                    peersInfo[myPeerId].media['screen-video']));
  }
  if (screenAudioProducer) {
    $('#available-tracks')
      .appendChild(makeTrackControlEl('my', 'screen-audio',
                                    peersInfo[myPeerId].media['screen-audio']));
  }

  for (let peer of sortedPeers) {
    if (peer.id === myPeerId) {
      continue;
    }
    for (let [mediaTag, info] of Object.entries(peer.media)) {
      $('#available-tracks')
        .appendChild(makeTrackControlEl(peer.id, mediaTag, info));
    }
  } */
}

function makeTrackControlEl(peerName, mediaTag, mediaInfo) {
	
  let div = document.createElement('div'),
      peerId = (peerName === 'my' ? myPeerId : peerName),
      consumer = findConsumerForTrack(peerId, mediaTag);
  div.classList = `track-subscribe track-subscribe-${peerId}`;

  let sub = document.createElement('button');
  if (!consumer) {
    sub.innerHTML += 'подписаться на спикера в качестве зрителя или слушателя'
    sub.onclick = () => 
    subscribeToTrack(peerId, mediaTag);
    div.appendChild(sub);

  } else {
    sub.innerHTML += 'отписаться от спикера видео или аудио'
   sub.onclick = () => unsubscribeFromTrack(peerId, mediaTag);
   div.appendChild(sub);
  }

  let trackDescription = document.createElement('span');
  trackDescription.innerHTML = `${peerName} ${mediaTag}`
  div.appendChild(trackDescription);

  try {
    if (mediaInfo) {
      let producerPaused = mediaInfo.paused;
      let prodPauseInfo = document.createElement('span');
      prodPauseInfo.innerHTML = producerPaused ? '[producer paused]'
                                               : '[producer playing]';
      div.appendChild(prodPauseInfo);
    }
  } catch (e) {
    console.error(e);
  }

  if (consumer) {
    let pause = document.createElement('span'),
        checkbox = document.createElement('input'),
        label = document.createElement('label');
    pause.classList = 'nowrap';
    checkbox.type = 'checkbox';
    checkbox.checked = !consumer.paused;
    checkbox.onchange = async () => {
      if (checkbox.checked) {
        await resumeConsumer(consumer);
      } else {
        await pauseConsumer(consumer);
      }
      updatePeersDisplay();
    }
    label.id = `consumer-stats-${consumer.id}`;
    if (consumer.paused) {
      label.innerHTML = '[consumer paused]'
    } else {
      let stats = lastPollSyncData[myPeerId].stats[consumer.id],
          bitrate = '-';
      if (stats) {
        bitrate = Math.floor(stats.bitrate / 1000.0);
      }
      label.innerHTML = `[consumer playing ${bitrate} kb/s]`;
    }
    pause.appendChild(checkbox);
    pause.appendChild(label);
    div.appendChild(pause);

    if (consumer.kind === 'video') {
      let remoteProducerInfo = document.createElement('span');
      remoteProducerInfo.classList = 'nowrap track-ctrl';
      remoteProducerInfo.id = `track-ctrl-${consumer.producerId}`;
      div.appendChild(remoteProducerInfo);
    }
  }

  return div;
}

function addVideoAudio(consumer) {
  if (!(consumer && consumer.track)) {
	  alert('no track');
    return;
  }
  //alert('here transportid '+consumer.appData.transportId);
  /*
  while(dynamicContainer.firstChild){
		dynamicContainer.firstChild.remove();
	}
*/
//if(consumer.kind == 'video'){
  let anotherdiv = document.createElement('div');
  anotherdiv.setAttribute('data-peerid', consumer.appData.peerId);
  anotherdiv.setAttribute('data-transportid', consumer.appData.transportId);
  if(consumer.kind=='video'){
  anotherdiv.setAttribute('data-produceridvideo', consumer.appData.producerId);
}else{
	anotherdiv.setAttribute('data-produceridaudio', consumer.appData.producerId);
}
 anotherdiv.setAttribute('onclick', "getFucker(this);");
  let mynamediv = document.createElement('div');
  mynamediv.className = "for-name";
  mynamediv.textContent = consumer.appData.nick;
  anotherdiv.appendChild(mynamediv);
  anotherdiv.className = "video-box";
  
	
	let div2 = document.createElement('div');
	let input = document.createElement('input');
	input.setAttribute('type', 'checkbox');
	input.setAttribute('checked', true);
	input.setAttribute('data-peer', consumer.appData.peerId);
	input.setAttribute( 'onchange' , 'soundControl(this);');
	div2.className = "input-div";
	div2.appendChild(input);
	
	  let el = document.createElement(consumer.kind);
    el.setAttribute('playsinline', true);
    el.setAttribute('autoplay', true);
    el.setAttribute('muted', true);
 
 let newstream = new MediaStream(/*[ consumer.track.clone() ]*/);
 newstream.addTrack(consumer.track);
 //alert(consumer.track +' '+consumer.kind);
  el.srcObject = newstream;
 if(consumer.kind == 'video'){
	 anotherdiv.appendChild(el);
	
	  // el.volume = 1.0;
	   anotherdiv.appendChild(div2);
	   // let btndiv = document.createElement('div');
	    //btndiv.className = "for-privat";
 //btndiv.innerHTML = `<div class="donbtn" onclick="getPrivat(this);" data-hispeerid="${consumer.appData.peerId}" ><span class="trubka">&#128222;</span></div>`
	//  anotherdiv.appendChild(btndiv);
	 //  $(`#remote-${consumer.kind}`)
	   dynamicContainer.appendChild(anotherdiv);
   }
  el.consumer = consumer;

}
function getFucker(el){
	let a = el.getAttribute('data-transportid');
	let b = el.getAttribute('data-produceridvideo');
	let c = el.getAttribute('data-produceridaudio');
	alert('transportid '+a+' producerid video '+ b+' producerid audio '+ c);
	wsend({type: 'close-producer', request:'mediasoup2', producerId: b , peerId:myPeerId});
}
function removeVideoAudio(consumer) {
 /* document.querySelectorAll(consumer.kind).forEach((v) => {
    if (v.consumer === consumer) {
		console.log("yes " + consumer.kind);
      v.parentNode.removeChild(v);
    }
  });
  */
 // alert(consumer.appData.peerId);
 // let el = document.querySelector(`[data-id="${obj.id}"]`);
  let el = document.querySelector(`[data-peerid="${consumer.appData.peerId}"]`); 
 //alert('el '+el);
  if(el)el.remove();
}






async function soundControl(el){
	let peerId = el.getAttribute('data-peer');
	let consumer = findConsumerForTrack(peerId, 'cam-audio');
	//el.checked = !consumer.paused;
    
      if (el.checked) {
        await resumeConsumer(consumer);
      } else {
        await pauseConsumer(consumer);
      }
}
async function showCameraInfo() {
  let deviceId = await getCurrentDeviceId(),
      infoEl = $('#camera-info');
  if (!deviceId) {
    infoEl.innerHTML = '';
    return;
  }
  let devices = await navigator.mediaDevices.enumerateDevices(),
      deviceInfo = devices.find((d) => d.deviceId === deviceId);
  infoEl.innerHTML = `
      ${ deviceInfo.label }
      <button data-current="" onclick="cycleCamera(this);">switch camera</button>
  `;
}

async function getCurrentDeviceId() {
  if (!camVideoProducer) {
    return null;
  }
  let deviceId = camVideoProducer.track.getSettings().deviceId;
  if (deviceId) {
    return deviceId;
  }
  // Firefox doesn't have deviceId in MediaTrackSettings object
  let track = localCam && localCam.getVideoTracks()[0];
  if (!track) {
    return null;
  }
  let devices = await navigator.mediaDevices.enumerateDevices(),
      deviceInfo = devices.find((d) => d.label.startsWith(track.label));
  return deviceInfo.deviceId;
}

function gotDevices(deviceInfos){
	let a = navigator.mediaDevices.getSupportedConstraints();
	
	for(var i=0; i !== deviceInfos.length; ++i){
		
		const deviceInfo = deviceInfos[i];
		if(deviceInfo.kind === 'videoinput'){
			if(kK == 0){
				videoInput1 = deviceInfo.deviceId;
			curd = videoInput1;
	
			}else if(kK == 1){
				
				videoInput2 = deviceInfo.deviceId;
			}
			
			kK++;
		}
	}
}
function getDevice(){
if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices){
note({ content: "Your browser navigator.mediaDevices not supported", type: "warn", time: 5 });
}else{
navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(function(err){console.error(err)});
}
}

getDevice();

function updateActiveSpeaker() {
  $$('.track-subscribe').forEach((el) => {
    el.classList.remove('active-speaker');
  });
  if (currentActiveSpeaker.peerId) {
    $$(`.track-subscribe-${currentActiveSpeaker.peerId}`).forEach((el) => {
      el.classList.add('active-speaker');
    });
  }
}

function updateCamVideoProducerStatsDisplay() {
	return;
  let tracksEl = $('#camera-producer-stats');
  tracksEl.innerHTML = '';
  if (!camVideoProducer || camVideoProducer.paused) {
    return;
  }
  makeProducerTrackSelector({
    internalTag: 'local-cam-tracks',
    container: tracksEl,
    peerId: myPeerId,
    producerId: camVideoProducer.id,
    currentLayer: camVideoProducer.maxSpatialLayer,
    layerSwitchFunc: (i) => {
      console.log('client set layers for cam stream');
      camVideoProducer.setMaxSpatialLayer(i) }
  });
}

function updateScreenVideoProducerStatsDisplay() {
	return;
  let tracksEl = $('#screen-producer-stats');
  tracksEl.innerHTML = '';
  if (!screenVideoProducer || screenVideoProducer.paused) {
    return;
  }
  makeProducerTrackSelector({
    internalTag: 'local-screen-tracks',
    container: tracksEl,
    peerId: myPeerId,
    producerId: screenVideoProducer.id,
    currentLayer: screenVideoProducer.maxSpatialLayer,
    layerSwitchFunc: (i) => {
      console.log('client set layers for screen stream');
      screenVideoProducer.setMaxSpatialLayer(i) }
  });
}

async function updateConsumersStatsDisplay() {
  try {
    for (let consumer of consumers) {
      let label = $(`#consumer-stats-${consumer.id}`);
      if (label) {
        if (consumer.paused) {
          label.innerHTML = '(consumer paused)'
        } else {
          let stats = lastPollSyncData[myPeerId].stats[consumer.id],
              bitrate = '-';
          if (stats) {
            bitrate = Math.floor(stats.bitrate / 1000.0);
          }
          label.innerHTML = `[consumer playing ${bitrate} kb/s]`;
        }
      }

      let mediaInfo = lastPollSyncData[consumer.appData.peerId] &&
                      lastPollSyncData[consumer.appData.peerId]
                        .media[consumer.appData.mediaTag];
      if (mediaInfo && !mediaInfo.paused) {
        let tracksEl = $(`#track-ctrl-${consumer.producerId}`);
        if (tracksEl && lastPollSyncData[myPeerId]
                               .consumerLayers[consumer.id]) {
          tracksEl.innerHTML = '';
          let currentLayer = lastPollSyncData[myPeerId]
                               .consumerLayers[consumer.id].currentLayer;
          makeProducerTrackSelector({
            internalTag: consumer.id,
            container: tracksEl,
            peerId: consumer.appData.peerId,
            producerId: consumer.producerId,
            currentLayer: currentLayer,
            layerSwitchFunc: async(i) => {
              console.log('ask server to set layers');
              await sendRequest({type: 'consumer-set-layers',  consumerId: consumer.id,
                                           spatialLayer: i });
            }
          });
        }
      }
    }
  } catch (e) {
    console.log('error while updating consumers stats display', e);
  }
}

function makeProducerTrackSelector({ internalTag, container, peerId, producerId,
                                     currentLayer, layerSwitchFunc }) {
  try {
    let pollStats = lastPollSyncData[peerId] &&
                    lastPollSyncData[peerId].stats[producerId];
    if (!pollStats) {
      return;
    }

    let stats = [...Array.from(pollStats)]
                  .sort((a,b) => a.rid > b.rid ? 1 : (a.rid<b.rid ? -1 : 0));
    let i=0;
    for (let s of stats) {
      let div = document.createElement('div'),
          radio = document.createElement('input'),
          label = document.createElement('label'),
          x = i;
      radio.type = 'radio';
      radio.name = `radio-${internalTag}-${producerId}`;
      radio.checked = currentLayer == undefined ?
                          (i === stats.length-1) :
                          (i === currentLayer);
      radio.onchange = () => layerSwitchFunc(x);
      let bitrate = Math.floor(s.bitrate / 1000);
      label.innerHTML = `${bitrate} kb/s`;
      div.appendChild(radio);
      div.appendChild(label);
      container.appendChild(div);
      i++;
    }
    if (i) {
      let txt = document.createElement('div');
      txt.innerHTML = 'tracks';
      container.insertBefore(txt, container.firstChild);
    }
  } catch (e) {
    console.log('error while updating track stats display', e);
  }
}

//
// encodings for outgoing video
//

// just two resolutions, for now, as chrome 75 seems to ignore more
// than two encodings
//
const CAM_VIDEO_SIMULCAST_ENCODINGS =
[
  { maxBitrate:  96000, scaleResolutionDownBy: 4 },
  { maxBitrate: 680000, scaleResolutionDownBy: 1 },
];

function camEncodings() {
  return CAM_VIDEO_SIMULCAST_ENCODINGS;
}

// how do we limit bandwidth for screen share streams?
//
function screenshareEncodings() {
  null;
}



//
// promisified sleep
//

//async function sleep(ms) {
  //return new Promise((r) => setTimeout(() => r(), ms));
//}
function deepEqual(x, y) {
  if (x === y) {
    return true;
  }
  else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
    if (Object.keys(x).length != Object.keys(y).length)
      return false;

    for (var prop in x) {
      if (y.hasOwnProperty(prop))
      {  
        if (! deepEqual(x[prop], y[prop]))
          return false;
      }
      else
        return false;
    }
    
    return true;
  }
  else 
    return false;
}
function wsend(obj){
	//if(isSocketOpened)
		let a;
		try{
		a = JSON.stringify(obj);
		sock.send(a);
		}catch(e){console.error(e);}
	} 

