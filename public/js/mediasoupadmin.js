
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
//var isOpen = false;

//var myPeerId;


var kK = 0;

var isSocketOpened = false;
let joined,
          // localCam,
          // localScreen,
           recvTransport,
           sendTransport,
           camVideoProducer,
           camAudioProducer,
           //screenVideoProducer,
           //screenAudioProducer,
           currentActiveSpeaker = {},
           lastPollSyncData = {},
           consumers = [];
           var histarget;
//
// entry point -- called by document.body.onload


 async function main() {
	 //alert(2);
 // console.log(`starting up ... my peerId is ${myPeerId}`);
  try {
    device = new window.mediasoup.Device();//new mediasoup.Device();
   device.observer.on('newtransport', function(t){
	//	alert('transport');
		t.observer.on('newproducer', function(p){
			//alert('new producer '+p.appData.mediaTag+' '+p.appData.peerId+' '+p.id);
			
			p.observer.on('close', function(){
				console.log('*** producer closed *** ', p.id);
			});
			
			
					wsend({ 
						type: 'Newproducer', 
						request: 'mediasoup2',
						 mediaTag: p.appData.mediaTag, 
						 peerId: MYSOCKETID ,
						 id: p.id,
						 nick: gid('userName').value
						 });
		
		
			
			
			
			
			
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

 
}
main()

// meeting control actions

 function sendRequestB(obj) {
	// alert('suka');
	
	 console.log('sending req B ', obj);
    return new Promise((resolve, reject) => {
		if(!isSocketOpened){
			//return resolve({ error: 'socket closed' });
		}
		if(!sock){
			return resolve({ error: 'socket closed' });
		}
        obj.request = "mediasoup2";
        obj.peerId = MYSOCKETID; 
   //  alert('myPeerId ' + obj.peerId);
     try{
        sock.send(JSON.stringify(obj));
	}catch(er){
		resolve({error: er});
		return;
	}
       // sock.addEventListener('message',  async function (e) {
			sock.onmessage = async function(e){
            let a;
           // console.log('a ', a);
            try {
                a = JSON.parse(e.data);
            } catch (er) {
                reject(er);
                
            }
          
			console.log('B ', a);
		
			if (a.type == obj.type) {
				console.log("d ", a.type," = ", obj.type);
                resolve(a);
                sock.onmessage  = null;
            }else if (a.type == "error") {
                reject(a.info);
                sock.onmessage  = null;
            }/*else if(a.type == "simulcast"){
			console.log(e.data);
				resolve(a);
			}else if(a.type =='simple'){
				resolve(a);
			}else if(a.type=='bye'){
			//	resolve(a);
			}*/
			else{
				console.log(a.type);
				
				}
			}
			//)
        

    });

}




async function joinRoom() {
//	alert('join room');
  if (joined) {
  //  return;
  }
//$('#join-button').disabled = true;
  console.log('join room');
  //$('#join-control').style.display = 'none';

  try {
    // signal that we're a new peer and initialize our
    // mediasoup-client device, if this is our first time connecting
    let { routerRtpCapabilities, state } = await sendRequestB({vid: "publish", type:'join-as-new-peer'});
    if (!device.loaded) {
      await device.load({ routerRtpCapabilities });
  }
     /* console.log('state ', state);
      if(state.length > 0){
			for(let item of state){
			await subscribeToTrack(item.peerid, item.media)
			}
		}
    */
    joined = true;
   // $('#leave-room').style.display = 'initial';
  } catch (e) {
    console.error(e);
    note({ content: e, type: "error", time: 5 });
    $('#join-button').disabled = false;
    joined = false;
    return;
  }

}

async function sendCameraStreams(localCam) {
	//alert('sending camera streams');
	//$('#send-camera').disabled = true;
	// let ku = $('#send-camera').getAttribute("data-state");
 //alert(ku);
  // if(ku == "start"){
  console.log('send camera streams');
 // $('#send-camera').style.display = 'none';
 //$('#send-camera').disabled = true;
  // make sure we've joined the room and started our camera. these
  // functions don't do anything if they've already been called this
  // session
  await joinRoom();
  //await startCamera();

  // create a transport for outgoing media, if we don't already have one
  if (!sendTransport) {
	 // alert('send transport');
	// alert('no transport');
    sendTransport = await createTransport('send');
  }else{
	 // alert('with transport '+JSON.stringify(sendTransport));
	  }

  // start sending video. the transport logic will initiate a
  // signaling conversation with the server to set up an outbound rtp
  // stream for the camera video track. our createTransport() function
  // includes logic to tell the server to start the stream in a paused
  // state, if the checkbox in our UI is unchecked. so as soon as we
  // have a client-side camVideoProducer object, we need to set it to
  // paused as appropriate, too.
  //if(!sendTransport.closed){
  camVideoProducer = await sendTransport.produce({
    track: localCam.getVideoTracks()[0],
    encodings: camEncodings(),
    appData: { mediaTag: 'cam-video' }
  });
 
  camVideoProducer.on('transportclose', function(){
	  console.log('camvideoproducer on transport close');
  });
  camVideoProducer.on('trackended', function(){
	  console.log('videoproducer track ended paused ', camVideoProducer.paused);
  });
//}
  /*
  	if(camVideoProducer){
					//alert('my peerId: '+ myPeerId+' mediTag '+camVideoProducer.appData.mediaTag+' producerId: '+camVideoProducer.id);
					wsend({ 
						type: 'Newproducer', 
						request: 'mediasoup',
						 mediaTag: camVideoProducer.appData.mediaTag, 
						 peerId: myPeerId ,
						 id: camVideoProducer.id
						 });
			}else{
				alert('cavideoProducer '+camVideoProducer);
			}
  */
  /*
  if (getCamPausedState()) {
    try {
      await camVideoProducer.pause();
    } catch (e) {
      console.error(e);
    }
  }
*/
  // same thing for audio, but we can use our already-created
   //if(!sendTransport.closed){
  camAudioProducer = await sendTransport.produce({
    track: localCam.getAudioTracks()[0],
    appData: { mediaTag: 'cam-audio' }
  });

  camAudioProducer.on('transportclose', function(){
	  console.log('camaudioproducer on transport close');
  });
  camAudioProducer.on('trackended', function(){
	  console.log('audioproducer track ended paused ', camAudioProducer.paused);
  });
//}
  /*
  if (getMicPausedState()) {
    try {
      camAudioProducer.pause();
    } catch (e) {
      console.error(e);
    }
  }
  */
 
	//wsend({ type: 'add-statistic', subtype: 'streamer', peerId: myPeerId , request: 'mediasoup' });
 
//}else{
	//stopStreams();
//}
}


 const CAM_VIDEO_SIMULCAST_ENCODINGS =
[
  { maxBitrate:  96000, scaleResolutionDownBy: 4 },
  { maxBitrate: 680000, scaleResolutionDownBy: 1 },
];

function camEncodings() {
  return CAM_VIDEO_SIMULCAST_ENCODINGS;
}

 async function stopStreams() {
//  if (!(localCam || localScreen)) {
 //   return;
 // }
  if (!sendTransport) {
	 // alert('no transport');
    return;
  }
//alert('transport')
  console.log('stop sending media streams');
  //$('#stop-streams').style.display = 'none';

  let { error } = await sendRequestB({ type: 'close-transport',
                            transportId: sendTransport.id });
  if (error) {
    console.error(error);
   // alert(error);
  }
  //alert('suka');
  // closing the sendTransport closes all associated producers. when
  // the camVideoProducer and camAudioProducer are closed,
  // mediasoup-client stops the local cam tracks, so we don't need to
  // do anything except set all our local variables to null.
	camVideoProducer.close();
  camAudioProducer.close();
// if(screenVideoProducer) screenVideoProducer.close();
//  if(screenAudioProducer)screenAudioProducer.close();
  try {
	 // alert('sendTransport.closed');
    //await 
    sendTransport.close()
  } catch (e) {
    console.warn(e);
  }
  sendTransport = null;
  camVideoProducer = null;
  camAudioProducer = null;
 // screenVideoProducer = null;
 // screenAudioProducer = null;
  //stopLocalStream(window.streami);
  //localCam = null;
  //localScreen = null;
 
 //   wsend({ type: 'minus-statistic', subtype: 'streamer', peerId: myPeerId , closeTransportrequest: 'mediasoup' });
  //  el.setAttribute('disabled', 1);

  // update relevant ui elements
 // $('#send-camera').style.display = 'initial';
 // $('#share-screen').style.display = 'initial';
 // $('#local-screen-pause-ctrl').style.display = 'none';
//  $('#local-screen-audio-pause-ctrl').style.display = 'none';
  leaveRoom();
  return 'ok';
 // showCameraInfo();
}

async function leaveRoom() {
  if (!joined) {
    return;
  }

  console.log('leave room');
  //$('#leave-room').style.display = 'none';


  // close everything on the server-side (transports, producers, consumers)
  let { error } = await sendRequestB({ type: 'leave' });
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
  wsend({ type: 'byeD', peerId: MYSOCKETID, request: 'mediasoup2' });
 // recvTransport = null;
  sendTransport = null;
  camVideoProducer = null;
  camAudioProducer = null;
 // screenVideoProducer = null;
 // screenAudioProducer = null;
 // localCam = null;
 // localScreen = null;
  lastPollSyncData = {};
  consumers.forEach( function(el){
	 // unsubscribeFromTrack(el.appData.peerId, el.appData.mediaTag) 
	  // removeVideoAudio(el);
	  // el.close();
  });
 // consumers = [];
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
 /* updateCamVideoProducerStatsDisplay();
  updateScreenVideoProducerStatsDisplay();
  updatePeersDisplay();
   $('#send-camera').textContent = "Войти в чат";
   $('#send-camera').setAttribute("data-state", "start");
   $('#send-camera').disabled = false;*/
}




// utility function to create a transport and hook up signaling logic
// appropriate to the transport's direction
//
async function createTransport(direction) {
  console.log(`create ${direction} transport`);

  // ask the server to create a server-side transport object and send
  // us back the info we need to create a client-side transport
  let transport,
      { transportOptions } = await sendRequestB({type:'create-transport',  direction });
  console.log ('transport options', transportOptions);

 /* if (direction === 'recv') {
	
    transport = await device.createRecvTransport(transportOptions);
    transport.appData.type = 'recv';
    transport.iceServers = iceServersid;
  } else */
  if (direction === 'send') {
	  
    transport = await device.createSendTransport(transportOptions);
    transport.appData.type = 'send';
    transport.appData.nick = 'alik'
        transport.iceServers = ICESERVERS.iceServers;
  } else {
    throw new Error(`bad transport 'direction': ${direction}`);
  }

  // mediasoup-client will emit a connect event when media needs to
  // start flowing for the first time. send dtlsParameters to the
  // server, then call callback() on success or errback() on failure.
  transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
    console.log('transport connect event', direction);
    let { error } = await sendRequestB({type:'connect-transport', 
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
       // paused = getCamPausedState();
      } else if (appData.mediaTag === 'cam-audio') {
      //  paused = getMicPausedState();
      }
      // tell the server what it needs to know from us in order to set
      // up a server-side producer object, and get back a
      // producer.id. call callback() on success or errback() on
      // failure.
      let { id } = await sendRequestB({type:'send-track', 
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
		// if(img_data)wsend({ request: 'mediasoup', img_data: img_data, type: 'pic' });
		}else{
		//	let ab = $('#send-camera').getAttribute("data-state");
	//	if(ab == "start")wsend({ type: 'add-statistic', subtype: 'consumer', peerId: myPeerId , request: 'mediasoup' });
		}
	//	alert('connected');
	 //$('#send-camera').disbabled = false;
	  
		note({ content: (direction=='send'?"Вы в эфире!":"Вы подписались!"), type: "info", time: 5 });
	}else if (state === 'closed' || state === 'failed' || state === 'disconnected') {
      console.log('transport closed ... leaving the room and resetting');
      leaveRoom();
    }
  });

  return transport;
}






