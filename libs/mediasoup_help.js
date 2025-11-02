const tg_api = '7129138329:AAGl9GvZlsK3RsL9Vb3PQGoXOdeoc97lpJ4';
const grid = '-1002095475544';//-1002247446123
const { Blob } =require('node:buffer')
const fs = require('fs');
const {Duplex} = require('stream');
const crypto = require('crypto');
//const { oni } = require('./web_push.js');
var BID = undefined;
//const { oni } = require('./libs/web_push.js');
const axios = require('axios').default;
const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();


let onLine = new Map();

const os = require('os')
//const mediasoup = require('mediasoup')

const numWorkers =  Object.keys(os.cpus()).length;


//const tg_api = '7129138329:AAGl9GvZlsK3RsL9Vb3PQGoXOdeoc97lpJ4';
//const VIDEOCHAT_TG_ID = '-1002494074502';

//const axios = require("axios").default;
const config = require('./config.js')
// one mediasoup worker and router
//onsole.log('config ', config)
let worker, router, audioLevelObserver;
const log = console.log;
const warn = console.warn;
const err = console.error;
//
// and one "room" ...
//
var TOTAL_SPEAKERS = 0;
var TOTAL_CONSUMERS = 0;

const roomState = {
  // external
  peers: {},
  activeSpeaker: { producerId: null, volume: null, peerId: null },
  // internal
  transports: {},
  producers: [],
  consumers: []
}

eventEmitter.on('suka', function(d){
	//console.log('mydata ', d);
//	 roomState.peers[d.id].lastSeenTs = Date.now();
	     if(roomState.peers[d.id]){
   roomState.peers[d.id].lastSeenTs = Date.now();
   /*
       let now = Date.now();
    console.log('my data join-as-new-peer', d.id);

    roomState.peers[d.id] = {
      joinTs: now,
      lastSeenTs: now,
      media: {}, consumerLayers: {}, stats: {}
    };
 */
}
})



 function on_producer_transport_close(){
		console.log("***************************************")
		console.log("producer transport closed")
		console.log("***********************************")
     if (videoProducer) {
        videoProducer.close();
        videoProducer = null;
      }
      if (audioProducer) {
        audioProducer.close();
        audioProducer = null;
      }
      
      producerTransport.observer.removeListener('close', on_producer_transport_close)
      console.log('producerTransport listeners ', producerTransport.observer.listeners('close'))
      producerTransport = null;
      console.log('videoproducer: ', videoProducer)
      console.log('audioproducer: ', audioProducer)
       
    }
   function on_video_transport_closed(){
	   console.log('**************************************')
	   console.log('video transport closed')
	   if (videoProducer) {
        videoProducer.close();
        videoProducer = null;
      }
	   }
	   function on_audio_transport_closed(){
	   console.log('**************************************')
	   console.log('audio transport closed')
	   if (audioProducer) {
        audioProducer.close();
        audioProducer = null;
      }
	   }
   function on_videoproducer_close(n) {
	   console.log("***************************************")
        console.log('videoProducer closed ---', n);
        console.log("***************************************")
      }
      
      function on_audioproducer_close(n) {
		  console.log("***************************************")
        console.log('audioProducer closed ---', n);
        console.log("***************************************")
      }
      
     
      
const handleMediasoup =  function(ws, data, WebSocket, sock, pool){
	function wsend(ws, obj){
	//console.log('hallo wsend')
	let a;
	try{
		a = JSON.stringify(obj);
		//console.log('ws.readyState ', ws.readyState);
		if(obj.type != "producer_published")console.log('a : ', a)
		if(ws.readyState === WebSocket.OPEN)ws.send(a)
		}catch(e){console.log(e)}
	}
	function broadcast(obj){
		sock.clients.forEach(function(client){
			if( client !== ws ) wsend( client, obj );
			})
		}
		
		function broadcast_all(obj){
		sock.clients.forEach(function(client){
			wsend(client, obj);
			})
		}
	
	 function on_consumer_transport_close() {
      const id = getId(ws);
      console.log('--- consumerTransport closed. --')
      let consumer = getVideoConsumer(getId(ws));
      if (consumer) {
        consumer.close();
        removeVideoConsumer(id);
      }
      consumer = getAudioConsumer(getId(ws));
      if (consumer) {
        consumer.close();
        removeAudioConsumer(id);
      }
      removeConsumerTransport(id);
    }
      
	
	
	const mediasoup_t = async function(){
	//console.log("DATA : ", data);
	if(data.type == 'getRouterRtpCapabilities'){
		console.log('videoproducer: ', videoProducer)
		console.log('audioProducer: ', audioProducer)
				//console.log('router : ', router);
				if(data.vid == "publish"){
					if(producerTransport){
						wsend(ws, {type: "error", info: "Трансляция идет! Повторите ппопытку позднее."})
						return;
						}
			try{
			if(!worker)	await	startWorker();
			}catch(e){console.log(e);return;}
			}else if(data.vid == "subscribe"){
				if(!producerTransport){
					wsend(ws, { type: "error", info: "Нет видеотрансляции!" });
					return;
					}
				}else{}
				if (router) {
     // console.log('getRouterRtpCapabilities: ', router.rtpCapabilities);
      var ew = router.rtpCapabilities;
     // ws.send(JSON.stringify({dura:'suka'}))
      wsend(ws, {type: data.type, routerrtpCapabilities: ew});
    }
				}else if(data.type == 'createProducerTransport'){
    console.log('-- createProducerTransport ---');
    producerSocketId = getId(ws);
    console.log('producerSocketId: ', producerSocketId)
    try{
    const { transport, params } = await createTransport();
    producerTransport = transport;
   // producerTransport.on('routerclose', function(){console.log('*** router closed ***')})
   // producerTransport.observer.on('close', on_producer_transport_close);
    //console.log('listeners transport close: ', producerTransport.observer.listeners('close'));
    
    //transport.on('routerclose', fn())
   // producerTransport.observer.removeListener('close', on_producer_close)
    
   // producerTransport.close();
    //console.log('-- createProducerTransport params:', params);
    ws.publish = true;
    let r = {};
    r.type = "createProducerTransport";
    r.params = params
    wsend(ws, r);
}catch(er){
	ws.publish = false;
	wsend(ws, {type: "error", info: er.toString()})
	}
 }else if(data.type == 'connectProducerTransport'){ 
	 console.log('connect producer transport',data);
	let b=data.dtlsParameters;
	 try{
    await producerTransport.connect({ 'dtlsParameters': data.dtlsParameters });
    wsend(ws, {type: "connectProducerTransport"});
}catch(e){
	ws.publish = false;
	console.log('producer transport connect error ', e.toString());
	wsend(ws, {type: "error", info: e.toString()})
	}
    
    }else if(data.type == 'produce'){
    const { kind, rtpParameters } = data;
    console.log('-- produce --- kind=', kind);
    if (kind === 'video') {
		try{
      videoProducer = await producerTransport.produce({ kind, rtpParameters });
      wsend(ws,{ type: 'produce', id: videoProducer.id });
  }catch(er){
	  ws.publish = false;
	  wsend(ws, {type: "error", info: er.toString()})
	  }
    }
    else if (kind === 'audio') {
		try{
      audioProducer = await producerTransport.produce({ kind, rtpParameters });
      
      wsend(ws, {type: 'produce', id: audioProducer.id });
  }catch(er){
	  ws.publish = false;
	  wsend(ws, {type: "error", info: er.toString()})
	  }
    }
    else {
      console.error('produce ERROR. BAD kind:', kind);
      ws.publish = false;
      wsend(ws, {type: "produce"});
      return;
    }

    // inform clients about new producer
    console.log('--broadcast newProducer -- kind=', kind);
    broadcast({type: 'newProducer', kind: kind });

  }else if(data.type == 'createConsumerTransport'){
    console.log('-- createConsumerTransport ---');
    try{
    const { transport, params } = await createTransport();
    addConsumerTrasport(getId(ws), transport);
    transport.observer.on('close', function(){
		console.log('consumer transport closed')
		removeConsumerTransport(getId(ws));
		});
    //console.log('-- createTransport params:', params);
    wsend(ws,{type: data.type, params: params}); 
  }catch(er){
	  
	  wsend(ws, {type: "error", info: er.toString()})
  }
	  
  }else if(data.type == 'connectConsumerTransport'){
    console.log('-- connectConsumerTransport ---');
    let transport = getConsumerTrasnport(getId(ws));
    if (!transport) {
      console.error('transport NOT EXIST for id=' + getId(ws));
      wsend(ws,{type: data.type});
      return;
    }
    await transport.connect({ dtlsParameters: data.dtlsParameters });
    wsend(ws,{type: data.type});
  }else if(data.type == 'consume') {
    const kind = data.kind;
    console.log('-- consume --kind=' + kind);

    if (kind === 'video') {
      if (videoProducer) {
        let transport = getConsumerTrasnport(getId(ws));
        if (!transport) {
          console.error('transport NOT EXIST for id=' + getId(ws));
          return;
        }
        const { consumer, params } = await createConsumer(transport, videoProducer, data.rtpCapabilities); // producer must exist before consume
        //subscribeConsumer = consumer;
        const id = getId(ws);
        addVideoConsumer(id, consumer);
        consumer.observer.on('close', () => {
          console.log('consumer closed video---');
           removeVideoConsumer(id);
        })
        consumer.on('producerclose', () => {
          console.log('consumer -- on.producerclose');
          consumer.close();
          removeVideoConsumer(id);

          // -- notify to client ---
          wsend(ws,{type: 'producerClosed', localId: id, remoteId: producerSocketId, kind: 'video' });
        });

        console.log('-- consumer ready ---');
        wsend(ws,{type: data.type, params:params});
      }
      else {
        console.log('-- consume, but video producer NOT READY');
        const params = { type:'producerId', producerId: null, id: null, kind: 'video', rtpParameters: {} };
        wsend(ws, {type: data.type, params: params});
      }
    }
    else if (kind === 'audio') {
      if (audioProducer) {
        let transport = getConsumerTrasnport(getId(ws));
        if (!transport) {
          console.error('transport NOT EXIST for id=' + getId(ws));
          return;
        }
        const { consumer, params } = await createConsumer(transport, audioProducer, data.rtpCapabilities); // producer must exist before consume
        //subscribeConsumer = consumer;
        const id = getId(ws);
        addAudioConsumer(id, consumer);
        consumer.observer.on('close', () => {
          console.log('consumer closed  audio---');
           removeAudioConsumer(id);
        })
        consumer.on('producerclose', () => {
          console.log('consumer -- on.producerclose');
          consumer.close();
          removeAudioConsumer(id);

          // -- notify to client ---
          wsend(ws, {type: 'producerClosed',  localId: id, remoteId: producerSocketId, kind: 'audio' });
        });

        console.log('-- consumer ready ---');
        wsend(ws, {type: data.type, params });
      }
      else {
        console.log('-- consume, but audio producer NOT READY');
        const params = { producerId: null, id: null, kind: 'audio', rtpParameters: {} };
        wsend(ws,{type: data.type, params: params});
      }
    }
    else {
      console.error('ERROR: UNKNOWN kind=' + kind);
    }
  }else if(data.type == 'resume') {
    const kind = data.kind;
    console.log('-- resume -- kind=' + kind);
    if (kind === 'video') {
      let consumer = getVideoConsumer(getId(ws));
      if (!consumer) {
        console.error('consumer NOT EXIST for id=' + getId(ws));
        wsend(ws, {type: data.type});
        return;
      }
      await consumer.resume();
      wsend(ws, {type: data.type});
    }
    else {
      console.warn('NO resume for audio');
    }

						
		}else if(data.type == 'stop'){
			cleanUpPeer(ws.pubId);
			}else if(data.type=='file'){
				let f = new FormData();
	console.log('data.file ', data.pile);
	try{
	
	}catch(e){console.log(e);}
			}else if( data.type == "pic" ){
				console.log(" **** PIC! ****");
				try{
					//oni(ws.nick, "have published a WebRTC translation");
		
		let b11 = data.img_data.split(',')[1];
		let kk = 0;
		let buf = Buffer.from(b11, "base64");
		try{
	let bot='887539364';
console.log('ws.nick ', ws.nick)
	var f = new FormData();
	f.append('chat_id', (data.isprem=="y"?grid:bot));
	f.append('parse_mode', 'html');
	f.append('caption', '<b>'+ws.nick+'</b>'+' запустил трансляцию. \nПосмотреть на <a href="https://rouletka.ru/about">https://rouletka.ru</a>\nВы можете купить подписку на уведомления о том, когда <b>' + ws.nick + '</b> онлайн');
	f.append('disable_notification', true);
	f.append('photo', new Blob([buf]));
    f.append('reply_markup', `{"inline_keyboard":[
	[{"text":"Купить за звездочки","callback_data":"usid=${ws.userId}&action=goldi&nick=${ws.nick}" }]
	]}`);
	
	// [{"text":"Купить за тонкоин","callback_data":"buyton"}]

	await axios.post(`https://api.telegram.org/bot${tg_api}/sendPhoto`,
	/*{
		chat_id: grid,
		photo:buf
	}*/f/*,
	{
		headers:  {
		'Content-Type': 'multipart/form-data',
			//'Content-Disposition':'form-data; name="30"; filename="f.png"'
		 }
	}*/
	); 
	let ra = await pool.query('select * from usergold where usid=(?)', [ ws.userId ]);
	console.log('ra2 ', ra);
	if(ra.length > 0){
	const notifyUsers = ra.map(async (val)=>{
    await axios.post(`https://api.telegram.org/bot${tg_api}/sendPhoto`, {
		photo: 'https://rouletka.ru/img/gold/' + val.photo,
		chat_id: val.tgid.toString(),
		disable_notification:false,
		parse_mode: "html",
		caption: (val.lang=='ru'?`<b>${val.nick}</b> online в чат рулетке на <a href="https://rouletka.ru/about">https://rouletka.ru/about</a>`:`
		<b>${val.nick}</b> is online on <a href="https://rouletka.ru/about">https://rouletka.ru/about</a>`),
		reply_markup:`{"inline_keyboard":[
	[{"text":"Unsubscribe","callback_data":"lang=${val.lang}&usid=${val.usid}&action=unsub&nick=${val.nick}&tgid=${val.tgid}"}]]}`
})
	}); 


await Promise.all(notifyUsers);
	}
}catch(e){
	console.log(e);
	}

 if(!onLine.has(getId(ws)))onLine.set(getId(ws), { img_data: data.img_data, userId: ws.userId, publishedId: getId(ws), nick: ws.nick, value: 0 })
 eventEmitter.emit('producer_published', { img_data: data.img_data, userId: ws.userId, nick: ws.nick, value: 0, publishedId: ws.id  });
 ws.pubId = ws.id;
  broadcast({ type: "producer_published", img_data: data.img_data, userId: ws.userId, nick: ws.nick, value: 0, publishedId: ws.id });			
			}catch(e){
				console.log('db error: ', e.toString())
				wsend(ws, { type: "perror", info: e.toString() });
				}
				}else if( data.type == "onconsume" ){
					console.log(" *************** ONCONSUME ***************", data);
					ws.pubId = data.publishedId;
					try{
						//oni("Jemand", "have subscribed to WebRTC");
						//let v = await pool.query("update vroom set v=v+1 returning v");
					if(onLine.has(data.publishedId)){
						let a = onLine.get(data.publishedId);
						a.value = a.value + 1;
						broadcast_all({ type: data.type, value: a.value });
						eventEmitter.emit(data.type, { value: a.value });
					}else{
						console.log(" ********** NO ONE !!!! *****");
					}
						}catch(err){
						wsend(ws, { type: "perror", info: err.toString() })
						}
					}else if(data.type == "unconsume"){
						unsubscribe(ws.pubId);
					}else{
				console.log("Unknown type: ", data.type);
				}
	}
	/*	
	function getPub(id){
		for (let el of sock.clients) {
    if (el.id == id) {
		console.log("el.target **** ", el.id, ' = ', id);
		return el.id
	}}
	
	}*/
		
		function unsubscribe(pubId){
		const id = getId(ws);
  const consumer = getVideoConsumer(id);
  if (consumer) {
	  try{
		//  oni("Jemand", "have unsubscribed the WebRTC");
						
						}catch(err){
						console.log(err.toString());
						}
    consumer.close();
    removeVideoConsumer(id);
  }
const aconsumer = getAudioConsumer(id);
if(aconsumer){
	aconsumer.close();
removeAudioConsumer(id);
} 
  const transport = getConsumerTrasnport(id);
  if (transport) {
	  console.log("*************************")
	  console.log("closing consumer transport ", id)
	  console.log("*******************************");
	  if(onLine.has(pubId)){
						let a = onLine.get(pubId);
						a.value = a.value - 1;
						ws.pubId = null;
						broadcast_all({ type: "onconsume", value: a.value });
						eventEmitter.emit("onconsume", { value: a.value });
					}
    transport.close();
    removeConsumerTransport(id);
  }
  
}
		
		
const  cleanUpPeer = async function(pubId) {
	console.log("SOCKET CLOSED!!*******************************")
  const id = getId(ws);
  const consumer = getVideoConsumer(id);
  if (consumer) {
	  try{
		  oni("Jemand", "have unsubscribed the WebRTC");
						
						}catch(err){
						console.log(err.toString());
						}
    consumer.close();
    removeVideoConsumer(id);
  }
const aconsumer = getAudioConsumer(id);
if(aconsumer){
	aconsumer.close();
removeAudioConsumer(id);
} 
  const transport = getConsumerTrasnport(id);
  if (transport) {
	  console.log("*************************")
	  console.log("closing consumer transport ", id)
	  console.log("*******************************");
	  if(onLine.has(pubId)){
						let a = onLine.get(pubId);
						a.value = a.value - 1;
						ws.pubId = null;
						broadcast_all({ type: "onconsume", value: a.value });
						eventEmitter.emit("onconsume", { value: a.value });
					}
    transport.close();
    removeConsumerTransport(id);
  }
  
  
  
  
  
  
  if (producerSocketId === id) {
    console.log('---- cleanup producer ---');
   // oni("Jemand", "have unpublished the WebRTC translation");
    eventEmitter.emit("producer_unpublished");
  
  /*
  
    try{
	
		 axios.post(`https://api.telegram.org/bot${tg_api}/sendMessage`, {
    chat_id: grid,
    text: '<b>'+ws.nick+'</b> закончил трансляцию',
    parse_mode: 'html',
    disable_notification: true
  });
	}catch(e){
		console.log(e);
		}
		*/ 
    if(onLine.has(getId(ws))){
		onLine.delete(getId(ws));
		
	}
    broadcast({ type: "producer_unpublished" })
    ws.pubId = null;
    
    try{
	//	await pool.query('delete from vroom');
	
		}catch(err){
			console.log(err.toString())
		wsend({ type: "perror", info: err.toString() });
		}
    
    if (videoProducer) {
     videoProducer.close();
     videoProducer = null;
     
    }
    if (audioProducer) {
      audioProducer.close();
     audioProducer = null;
     }

    if (producerTransport) {
      producerTransport.close();
      producerTransport = null;
    }

    producerSocketId = null;

    // --- clenaup all consumers ---
    //console.log('---- cleanup clenaup all consumers ---');
    removeAllConsumers();
    if(router){router.close(); router=null;}
    
    if(worker){worker.close();worker=null;}
    
    
     /*try{
	
	axios.post(`https://api.telegram.org/bot${tg_api}/sendMessage`, {
    chat_id: grid,
    text: '<b>'+ws.nick+'</b> закончил трансляцию',
    parse_mode: 'html',
    disable_notification: true
  });
	}catch(e){
		console.log(e.name);
		}*/
    
    
    
    
    
    
    
  }
}
		
		return { mediasoup_t, cleanUpPeer  }
		
	}
	
	
	function handleAdminMedia(ws, data, WebSocket, sock, pool){
		const socket = ws;
		const msg = data;
		const wss = sock;
		function broadcast_admin(obj){
	for (let el of wss.clients) {
		if(el.burl == "/administrator"){
		wsend(el, obj);
	}
	}
}
	function wsend(ws, obj){
	if(!obj.type=='sync')console.log('hallo wsend ', obj)
	let a;
	try{
		a = JSON.stringify(obj);
		//console.log('ws.readyState ', ws.readyState);
		//if(obj.type != "producer_published")console.log('a : ', a)
		if(ws.readyState === WebSocket.OPEN)ws.send(a)
		}catch(e){console.log(e)}
	}
	function broadcast(obj){
		//console.log("*** BROADCASTING !!!");
		wss.clients.forEach(function(client){
			if( client !== ws ) wsend( client, obj );
			})
		}
		function broadcast_room(target, obj){
			wss.clients.forEach(function(client){
			if( client.roomname == target ) wsend( client, obj );
			})
		}
		function broadcast_all(obj){
		wss.clients.forEach(function(client){
			//console.log("*** BROADCASTING !!!");
			wsend(client, obj);
			})
		}
		async function mediadmin(){
			if(msg.type == 'sync'){
		 let { peerId } = msg;
		// console.log('type sync peerId ', peerId);
  try {
    // make sure this peer is connected. if we've disconnected the
    // peer because of a network outage we want the peer to know that
    // happened, when/if it returns
    if (!roomState.peers[peerId]) {
      throw new Error('type sync not connected');
    }

    // update our most-recently-sem timestamp -- we're not stale!
    if(roomState.peers[peerId]){
   roomState.peers[peerId].lastSeenTs = Date.now();
   
       let now = Date.now();
   // console.log('join-as-new-peer', peerId);

    roomState.peers[peerId] = {
      joinTs: now,
      lastSeenTs: now,
      media: {}, consumerLayers: {}, stats: {}
    };
 
}
   
//console.error("************** active sper******************* ", roomState.activeSpeaker)
    wsend(ws, { 
	  type:msg.type,
      peers: roomState.peers,
      activeSpeaker: roomState.activeSpeaker
    });
  } catch (e) {
    console.error(e.message);
    wsend(ws, { type: msg.type, error: e.message });
  }
	}else if(msg.type == 'join-as-new-peer'){
		//broadcast_all({ type: 'total_speakers', count: TOTAL_SPEAKERS 
		  
				if(!worker)await	startWorker();
	  
    let { peerId } = msg;
    console.log('here2 join-as-new-peer peerId ', peerId);
        now = Date.now();
    //log('join-as-new-peer', peerId);
socket.peerId = peerId;
    roomState.peers[peerId] = {
      joinTs: now,
      lastSeenTs: now,
      media: {}, consumerLayers: {}, stats: {}
    };
    if(msg.vid == 'publish'){
		wsend(ws, { type: msg.type, routerRtpCapabilities: router.rtpCapabilities });
	}else{
//console.error(msg.type, ' roomState.producers ', roomState.producers)
let suka = [];

for (let [key, value] of Object.entries(roomState.producers)){
	console.log('key value.media ',key, ' ', value.appData, 'producer id ', value.id, 'transport id ', value.appData.transportId);
	suka.push({ peerid: value.appData.peerId, media: value.appData.mediaTag, nick: value.appData.nick,  producerId: value.id , transportId: value.appData.transportId});
}
    wsend(ws, { type: msg.type, routerRtpCapabilities: router.rtpCapabilities, state: suka });
}
}else if(msg.type == 'get_speakers'){
	console.log(msg);
	const { peerId } =  msg;
	console.log('*** peerId *** ', peerId);
	let suka = [];
for (let [key, value] of Object.entries(roomState.producers)){
	console.log('key value.media ',key, ' ', value.appData);
	console.log('must 2', (peerId !== value.appData.peerId),' ', peerId, ' ', value.appData.peerId);
	if(peerId != value.appData.peerId){
		
		suka.push({ peerid: value.appData.peerId, media: value.appData.mediaTag });
	}
}
wsend(ws, { type: msg.type, state: suka })
}else if(msg.type == 'add-statistic'){
	if(msg.subtype == 'streamer'){
		TOTAL_SPEAKERS += 1;
		eventEmitter.emit('total_speakers', { count: TOTAL_SPEAKERS });
	}else if(msg.subtype == 'consumer'){
		if(ws.producer == false){
		TOTAL_CONSUMERS +=1;
		eventEmitter.emit('total_consumers', { count: TOTAL_CONSUMERS });
		ws.consumer = true;
	}else{
		//TOTAL_CONSUMERS -=1;
		eventEmitter.emit('total_consumers', { count: TOTAL_CONSUMERS });
		ws.consumer = false;
	}
	}
}else if(msg.type == 'minus-statistic'){
	if(msg.subtype == 'streamer'){
		TOTAL_SPEAKERS -=1;
		eventEmitter.emit('total_speakers', { count: TOTAL_SPEAKERS });
	}else if(msg.subtype == 'consumer'){
		if(ws.producer == false){
		TOTAL_CONSUMERS -=1;
		eventEmitter.emit('total_consumers', { count: TOTAL_CONSUMERS });
		ws.consumer = false;
	}
	}
	
}else if(msg.type == 'leave'){
	 try {
    let { peerId } = msg;
    log('leave', peerId);

    await closePeer(peerId);
    ws.publish = false;
    wsend(ws, { type: msg.type, left: true });
  } catch (e) {
    console.error('error in /signaling/leave', e);
    wsend(ws, { type: msg.type, error: e });
  }
}else if(msg.type == 'create-transport'){
	try {
    let { peerId, direction } = msg;
    log('create-transport', peerId, direction);

    let transport = await createWebRtcTransport({ peerId, direction });
    roomState.transports[transport.id] = transport;

    let { id, iceParameters, iceCandidates, dtlsParameters } = transport;
    wsend(ws, { type: msg.type,
      transportOptions: { id, iceParameters, iceCandidates, dtlsParameters }
    });
  } catch (e) {
    console.error('error in /signaling/create-transport', e);
    wsend(ws, { type: msg.type, error: e });
  }
}else if(msg.type == 'connect-transport'){
	try {
    let { peerId, transportId, dtlsParameters } = msg,
        transport = roomState.transports[transportId];

    if (!transport) {
      err(`connect-transport: server-side transport ${transportId} not found`);
      wsend(ws, { type: msg.type, error: `server-side transport ${transportId} not found` });
      return;
    }

    log('connect-transport', peerId, transport.appData);

    await transport.connect({ dtlsParameters });
    wsend(ws, { type: msg.type, connected: true });
  } catch (e) {
    console.error('error in /signaling/connect-transport', e);
    wsend(ws, { type: msg.type, error: e });
  }
}else if(msg.type == 'close-transport'){
  try {
    let { peerId, transportId } = msg,
        transport = roomState.transports[transportId];

    if (!transport) {
      err(`close-transport: server-side transport ${transportId} not found`);
      wsend(ws, { type: msg.type, error: `server-side transport ${transportId} not found` });
      return;
    }

    log('close-transport', peerId, transport.appData);

    await closeTransport(transport);
    if(ws.producer && ws.producer == true){
		ws.producer = false;
	}
    wsend(ws, { type: msg.type, closed: true });
  } catch (e) {
    console.error('error in /signaling/close-transport', e);
    wsend(ws, { type: msg.type, error: e.message });
  }
	
}else if(msg.type == 'close-producer'){
	
  try {
    let { peerId, producerId } = msg,
        producer = roomState.producers.find((p) => p.id === producerId);

    if (!producer) {
      err(`close-producer: server-side producer ${producerId} not found`);
      wsend(ws, { type: msg.type, error: `server-side producer ${producerId} not found` });
      return;
    }

    log('close-producer', peerId, producer.appData);

    await closeProducer(producer);
    wsend(ws, { type: msg.type, closed: true });
  } catch (e) {
    console.error(e);
    wsend(ws, { type: msg.type, error: e.message });
  }
}else if(msg.type == 'send-track'){
  try {
    let { peerId, transportId, kind, rtpParameters,
          paused = false, appData } = msg,
        transport = roomState.transports[transportId];
        
    if (!transport) {
      err(`send-track: server-side transport ${transportId} not found`);
      wsend(ws, { type:  msg.type, error: `server-side transport ${transportId} not found`});
      return;
    }

    let producer = await transport.produce({
      kind,
      rtpParameters,
      paused,
      appData: { ...appData, peerId, transportId , nick: ws.nick }
    });
console.log("******** PRODUCER ID ******* ", producer.id);
transport.appData.producerId = producer.id;
    // if our associated transport closes, close ourself, too
    producer.on('transportclose', () => {
      log('producer\'s transport closed', producer.id);
      closeProducer(producer);
    });

    // monitor audio level of this producer. we call addProducer() here,
    // but we don't ever need to call removeProducer() because the core
    // AudioLevelObserver code automatically removes closed producers
    if (producer.kind === 'audio') {
   // audioLevelObserver.addProducer({ producerId: producer.id });
    }
   /*
 audioLevelObserver.on('volumes', (volumes) => {
    const { producer, volume } = volumes[0];
    //console.log('*****************audio-level volumes event', producer.appData.peerId, volume);
    roomState.activeSpeaker.producerId = producer.id;
    roomState.activeSpeaker.volume = volume;
    roomState.activeSpeaker.peerId = producer.appData.peerId;
    broadcast({ type: 'oksync', peers: roomState.peers, activeSpeaker: roomState.activeSpeaker });
  });
  */
    roomState.producers.push(producer);
    roomState.peers[peerId].media[appData.mediaTag]={
		paused, 
		encodings: rtpParameters.encodings
	}
  

    // make sure this peer is connected. if we've disconnected the
    // peer because of a network outage we want the peer to know that
    // happened, when/if it returns
   
    // update our most-recently-seem timestamp -- we're not stale!
    
//console.log("************** active speaker******************* ", roomState.activeSpeaker)
  
    console.log("********* ROOMSTATE ******** ", roomState);
    
    ws.producer = true;
    if(ws.consumer == true){
		ws.consumer = false;
		TOTAL_CONSUMERS -=1;
		eventEmitter.emit('total_consumers', { count: TOTAL_CONSUMERS });
	}
    wsend(ws, { type: msg.type, id: producer.id });
   
  } catch (e) {
	  console.log(e);
	  wsend(ws, { type: msg.type, error: e });
  }
}else if(msg.type == 'Newproducer'){
	socket.partnernick = msg.nick;
	 broadcast_admin({ type: "Newproducer", id: msg.id , peerId: msg.peerId, mediaTag: msg.mediaTag , nick: msg.nick });
}else if(msg.type == 'byeD'){
	broadcast_admin({ type: msg.type, peerId: msg.peerId });
}else if(msg.type == 'recv-track'){ // can change to consumer.type == 'simulcast' or 'simple' video/audio to reply
	
  try {
    let { peerId, mediaPeerId, mediaTag, rtpCapabilities, usernick } = msg;
console.log('msg recvack  ', msg)
    let producer = roomState.producers.find(
      (p) => {
		  
		  let lu = (p.appData.mediaTag === mediaTag && p.appData.peerId === mediaPeerId)
		  console.error('p.appData.mediaTag '+p.appData.mediaTag);
		  console.error('p.appData.peerId '+p.appData.peerId)
		  console.error('lu '+lu); 
		  return lu;
		  });
    console.error(msg.type);
console.log('peerId: ', peerId);
console.log('mediaPeerId :', mediaPeerId)
console.log('roomState.producers: ', JSON.stringify(roomState.producers))
    if (!producer) {
      let msgi = 'server-side producer for ' +
                  `${mediaPeerId}:${mediaTag} not found`;
      err('recv-track: ' + msgi);
      wsend(ws, { type: "error", error: msgi });
      return;
    }

    if (!router.canConsume({ producerId: producer.id,
                             rtpCapabilities })) {
      let msg = `client cannot consume ${mediaPeerId}:${mediaTag}`;
      err(`recv-track: ${peerId} ${msg}`);
      wsend(ws, { type: 'error', error: msg });
      return;
    }

    let transport = Object.values(roomState.transports).find((t) =>
      t.appData.peerId === peerId && t.appData.clientDirection === 'recv'
    );

    if (!transport) {
      let msg = `server-side recv transport for ${peerId} not found`;
      err('recv-track: ' + msg);
      wsend(ws, { type: "error", error: msg });
      return;
    }
console.log("************** producer.kind ", producer.kind)
    let consumer = await transport.consume({
      producerId: producer.id,
      rtpCapabilities,
      paused: producer.kind === 'video', // see note above about always starting paused
      appData: { peerId, mediaPeerId, mediaTag }
    });
    console.log('******* CONSUMER ID ******** ', consumer.id);
transport.appData.consumerId = consumer.id;
    // need both 'transportclose' and 'producerclose' event handlers,
    // to make sure we close and clean up consumers in all
    // circumstances
    consumer.on('transportclose', () => {
      log(`consumer's transport closed`, consumer.id);
      closeConsumer(consumer);
    });
    consumer.on('producerclose', () => {
      log(`consumer's producer closed`, consumer.id);
     closeConsumer(consumer);
    });

    // stick this consumer in our list of consumers to keep track of,
    // and create a data structure to track the client-relevant state
    // of this consumer
    roomState.consumers.push(consumer);
    //roomState.peers[peerId].consumerLayers[consumer.id] = {
    //  currentLayer: null,
    //  clientSelectedLayer: null
   // };

    // update above data structure when layer changes.
    /*
    consumer.on('layerschange', (layers) => {
      log(`consumer layerschange ${mediaPeerId}->${peerId}`, mediaTag, layers);
      if (roomState.peers[peerId] &&
          roomState.peers[peerId].consumerLayers[consumer.id]) {
        roomState.peers[peerId].consumerLayers[consumer.id]
          .currentLayer = layers && layers.spatialLayer;
      }
    });
*/
    wsend(ws, {
      producerId: producer.id,
      id: consumer.id,
      usernick: usernick ,
      transportId: transport.id,
      peerid: mediaPeerId,
      kind: consumer.kind,
      rtpParameters: consumer.rtpParameters,
      type: consumer.type, // simulcast for video and simple for audio
      producerPaused: consumer.producerPaused
    });
  } catch (e) {
    console.error('error in /signaling/recv-track', e);
    wsend (ws, { type: "error", error: e });
  }
	
	
}else if(msg.type == 'pause-consumer'){
	 try {
    let { peerId, consumerId } = msg,
        consumer = roomState.consumers.find((c) => c.id === consumerId);

    if (!consumer) {
      err(`pause-consumer: server-side consumer ${consumerId} not found`);
      wsend(ws, {type:msg.type, error: `server-side producer ${consumerId} not found` });
      return;
    }

    log('pause-consumer', consumer.appData);

    await consumer.pause();

    wsend(ws, { type: msg.type, paused: true});
  } catch (e) {
    console.error('error in /signaling/pause-consumer', e);
    wsend(ws, { type: msg.type, error: e });
  }
}else if(msg.type == 'resume-consumer'){
	 try {
		
    let { peerId, consumerId, kind } = msg,
        consumer = roomState.consumers.find((c) => c.id === consumerId);

    if (!consumer) {
      err(`resume-consumer: server-side consumer ${consumerId} not found`);
      wsend(ws, { type: msg.type, error: `server-side consumer ${consumerId} not found` });
      return;
    }

    log('resume-consumer', consumer.appData, ' kind ', kind);

// if(kind == 'cam-video') { 
 await consumer.resume();

    wsend(ws, { type: msg.type, resumed: true, peerId: peerId, mediaTag: kind });
//}
  } catch (e) {
    console.error('error in /signaling/resume-consumer', e);
    wsend(ws, { type: msg.type, error: e });
  }
}else if(msg.type == 'close-consumer'){
	try {
  let { peerId, consumerId } = msg,
      consumer = roomState.consumers.find((c) => c.id === consumerId);

    if (!consumer) {
      err(`close-consumer: server-side consumer ${consumerId} not found`);
      wsend(ws, { type: msg.type, error: `server-side consumer ${consumerId} not found` });
      return;
    }

    await closeConsumer(consumer);

    wsend(ws, { type: msg.type, closed: true });
  } catch (e) {
    console.error('error in /signaling/close-consumer', e);
    wsend(ws, {type:msg.type, error: e });
  }
}else if(msg.type == 'consumer-set-layers'){
	/*
  try {
    let { peerId, consumerId, spatialLayer } = msg,
        consumer = roomState.consumers.find((c) => c.id === consumerId);

    if (!consumer) {
      err(`consumer-set-layers: server-side consumer ${consumerId} not found`);
      wsend(ws, {type:msg.type, error: `server-side consumer ${consumerId} not found` });
      return;
    }

    log('consumer-set-layers', spatialLayer, consumer.appData);

    await consumer.setPreferredLayers({ spatialLayer });

    wsend(ws, { type: msg.type, layersSet: true });
  } catch (e) {
    console.error('error in /signaling/consumer-set-layers', e);
    wsend({ type: msg.type, error: e });
  }*/
  wsend(ws, { type: msg.type, layersSet: true });
}else if(msg.type == 'pause-producer'){
	try {
    let { peerId, producerId } = msg,
        producer = roomState.producers.find((p) => p.id === producerId);

    if (!producer) {
      err(`pause-producer: server-side producer ${producerId} not found`);
      wsend(ws, {type:msg.type, error: `server-side producer ${producerId} not found` });
      return;
    }

    log('pause-producer', producer.appData);

    await producer.pause();

    roomState.peers[peerId].media[producer.appData.mediaTag].paused = true;

    wsend(ws, { type: msg.type, paused: true });
  } catch (e) {
    console.error('error in /signaling/pause-producer', e);
    wsend(ws, { type: msg.type, error: e });
  }
	}else if(msg.type == 'resume-producer'){
		 try {
    let { peerId, producerId } = msg,
        producer = roomState.producers.find((p) => p.id === producerId);

    if (!producer) {
      err(`resume-producer: server-side producer ${producerId} not found`);
      wsend(ws, { type: msg.type, error: `server-side producer ${producerId} not found` });
      return;
    }

    log('resume-producer', producer.appData);

    await producer.resume();

    roomState.peers[peerId].media[producer.appData.mediaTag].paused = false;

    wsend(ws, { type: msg.type, resumed: true });
  } catch (e) {
    console.error('error in /signaling/resume-producer', e);
    wsend(ws, { type: msg.type, error: e });
  }
	}else if(msg.type == 'clear'){
		fucker();
	}else{}




		}
		
		
		
		
		
		
		
		
		
	async	function cleanMedia(){
				 try {
   // let { peerId } = msg;
   // log('leave', peerId);

    await closePeer(socket.peerId);
   // wsend({type:msg.type, left: true });
   broadcast({ type: 'bye', peerId: socket.peerId });
   if(socket.producer && socket.producer == true){
	   //TOTAL_SPEAKERS-=1;
	  // eventEmitter.emit('total_speakers', { count: TOTAL_SPEAKERS });
   }
   if(socket.producer == false){
	   if(socket.consumer == true){
		 //  TOTAL_CONSUMERS -=1;
		 //  eventEmitter.emit('total_consumers', { count: TOTAL_CONSUMERS });
	   }
   }
   //broadcast_all({ type: 'total_speakers', count: TOTAL_SPEAKERS });
   //eventEmitter.emit('total_speakers', { count: TOTAL_SPEAKERS });
  } catch (e) {
    console.error('error in /signaling/leave', e);
  //  wsend({type:msg.type, error: e });
  }
		}
			
function closePeer(peerId) {
	//2
  log('closing peer', peerId);
  for (let [id, transport] of Object.entries(roomState.transports)) {
    if (transport.appData.peerId === peerId) {
      closeTransport(transport);
    }
  }
  delete roomState.peers[peerId];
  broadcast_admin({type:'bye', peerId:peerId });
}

async function closeTransport(transport) {
	//1
  try {
    log('closing transport', transport.id, transport.appData);

    // our producer and consumer event handlers will take care of
    // calling closeProducer() and closeConsumer() on all the producers
    // and consumers associated with this transport
    await transport.close();

    // so all we need to do, after we call transport.close(), is update
    // our roomState data structure
    delete roomState.transports[transport.id];
  } catch (e) {
    err(e);
  }
}

async function closeProducer(producer) {
  log('closing producer', producer.id, producer.appData);
  try {
    await producer.close();

    // remove this producer from our roomState.producers list
    roomState.producers = roomState.producers
      .filter((p) => p.id !== producer.id);

    // remove this track's info from our roomState...mediaTag bookkeeping
    if (roomState.peers[producer.appData.peerId]) {
      delete (roomState.peers[producer.appData.peerId]
              .media[producer.appData.mediaTag]);
    }
  } catch (e) {
    err(e);
  }
}

async function closeConsumer(consumer) {
  log('closing consumer', consumer.id, consumer.appData);
  await consumer.close();

  // remove this consumer from our roomState.consumers list
  roomState.consumers = roomState.consumers.filter((c) => c.id !== consumer.id);

  // remove layer info from from our roomState...consumerLayers bookkeeping
  if (roomState.peers[consumer.appData.peerId]) {
    delete roomState.peers[consumer.appData.peerId].consumerLayers[consumer.id];
  }
}


  function fucker(){
	   let now = Date.now();
    Object.entries(roomState.peers).forEach(([id, p]) => {
		console.error('fucker must close peer');
      if ((now - p.lastSeenTs) > 1) {
        warn(`removing stale peer ${id}`);
        closePeer(id);
       // console.log('fucker roomState ', roomState);
      }
    })
    console.log('fucker2 roomState ', roomState);
    wsend(ws, { type: "place", roomState, roomState});
  }
/*config  {
  worker: {
    rtcMinPort: 10000,
    rtcMaxPort: 20100,
    logLevel: 'error',
    logTags: [ 'info', 'ice', 'dtls', 'rtp', 'srtp', 'rtcp' ]
  },
  router: { mediaCodecs: [ [Object], [Object], [Object], [Object], [Object] ] },
  webRtcTransport: { listenInfos: [ [Object], [Object] ] }
}

 * 
 * 
 * 
 */

async function createWebRtcTransport({ peerId, direction }) {
  //const {
    //listenIps,
   // initialAvailableOutgoingBitrate
 // } = config.mediasoup.webRtcTransport;
//console.log("**** ROUTER ****", router)
  const transport = await router.createWebRtcTransport({
    listenInfos: config.webRtcTransport.listenInfos,
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
    initialAvailableOutgoingBitrate: 1000000,
    appData: { peerId, clientDirection: direction }
  });

  return transport;
}


async function updatePeerStats() {
  for (let producer of roomState.producers) {
    if (producer.kind !== 'video') {
      continue;
    }
    try {
      let stats = await producer.getStats(),
          peerId = producer.appData.peerId;
      roomState.peers[peerId].stats[producer.id] = stats.map((s) => ({
        bitrate: s.bitrate,
        fractionLost: s.fractionLost,
        jitter: s.jitter,
        score: s.score,
        rid: s.rid
      }));
    } catch (e) {
      warn('error while updating producer stats', e);
    }
  }

  for (let consumer of roomState.consumers) {
    try {
      let stats = (await consumer.getStats())
                    .find((s) => s.type === 'outbound-rtp'),
          peerId = consumer.appData.peerId;
      if (!stats || !roomState.peers[peerId]) {
        continue;
      }
      roomState.peers[peerId].stats[consumer.id] = [{
        bitrate: stats.bitrate,
        fractionLost: stats.fractionLost,
        score: stats.score
      }]
    } catch (e) {
      warn('error while updating consumer stats', e);
    }
  }
}
		return { mediadmin, cleanMedia }
	}
 
		
	module.exports = { handleMediasoup: handleMediasoup, ev: eventEmitter, handleAdminMedia: handleAdminMedia }
	
	
		
		function sendResponse(response, callback) {
    //console.log('sendResponse() callback:', callback);
    callback(null, response);
  }

  // --- send error to client ---
  function sendReject(error, callback) {
    callback(error.toString(), null);
  }

  function sendback(ws, message) {
    wsend(ws, message);
  }


function getId(ws) {
  return ws.id;
}

function closePeeri(peerId) {
	//2
  log('closing peeri', peerId);
  for (let [id, transport] of Object.entries(roomState.transports)) {
    if (transport.appData.peerId === peerId) {
		console.log("*** APP DATA *** ", transport.appData);
      closeTransporti(transport);
    }
  }
  delete roomState.peers[peerId];
//  broadcast_admin({ type:'bye', peerId: peerId });
}

async function closeTransporti(transport) {
	//1
  try {
    log('closing transporti', transport.id, transport.appData);
let producerId = transport.appData.producerId;
let consumerId = transport.appData.consumerId;
    // our producer and consumer event handlers will take care of
    // calling closeProducer() and closeConsumer() on all the producers
    // and consumers associated with this transport
    await transport.close();

    // so all we need to do, after we call transport.close(), is update
    // our roomState data structure
    delete roomState.transports[transport.id];
    if(producerId){
		console.log('there is producer to cloce ', producerId);
		let producer = roomState.producers.find((p) => p.id === producerId);
		if(producer){
			await closeProduceri(producer);
		}
	}
	if(consumerId){
		console.log('there is consumer to cloce ', consumerId);
		let consumer = roomState.consumers.find((c) => c.id === consumerId);
		if(consumer){
			await closeConsumeri(consumer);
		}
	}
   // let consumer = roomState.consumers.find((c) => c.id === consumerId);
  } catch (e) {
    err(e);
  }
}

async function closeProduceri(producer) {
  log('closing produceri', producer.id, producer.appData);
  try {
    await producer.close();

    // remove this producer from our roomState.producers list
    roomState.producers = roomState.producers
      .filter((p) => p.id !== producer.id);

    // remove this track's info from our roomState...mediaTag bookkeeping
    if (roomState.peers[producer.appData.peerId]) {
      delete (roomState.peers[producer.appData.peerId]
              .media[producer.appData.mediaTag]);
    }
  } catch (e) {
    err(e);
  }
}

async function closeConsumeri(consumer) {
  log('closing consumeri', consumer.id, consumer.appData);
  await consumer.close();

  // remove this consumer from our roomState.consumers list
  roomState.consumers = roomState.consumers.filter((c) => c.id !== consumer.id);

  // remove layer info from from our roomState...consumerLayers bookkeeping
  if (roomState.peers[consumer.appData.peerId]) {
    delete roomState.peers[consumer.appData.peerId].consumerLayers[consumer.id];
  }
}


function davaj(){
setInterval(() => {
    let now = Date.now();
    Object.entries(roomState.peers).forEach(([id, p]) => {
		console.error('must close peer');
      if ((now - p.lastSeenTs) > 15000) {
        warn(`removing stale peer ${id}`);
        closePeeri(id);
        //console.log('roomState ', roomState);
      }
    });
  }, 1000*13);
}
davaj();
const mediasoup = require("mediasoup");
const mediasoupOptions = {
  // Worker settings
  worker: {
    rtcMinPort: 10000,
    rtcMaxPort: 20100,
    logLevel: 'error',
    logTags: [
      'info',
      'ice',
      'dtls',
      'rtp',
      'srtp',
      'rtcp',
      // 'rtx',
      // 'bwe',
      // 'score',
      // 'simulcast',
      // 'svc'
    ],
  },
  // Router settings
  router: {
    mediaCodecs:
      [
        {
          kind: 'audio',
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2
        },
        {
          kind: 'video',
          mimeType: 'video/VP8',
          clockRate: 90000,
          parameters:
          {
            'x-google-start-bitrate': 1000
          }
        },
        {
			kind:'video',
			mimeType:'video/Vp9',
			clockRate:90000,
			parameters:{
				'profile-id':2,
				'x-google-start-bitrate':1000
			}
		},
		{
			kind:'video',
			mimeType:'video/h264',
			clockRate: 90000,
			parameters:{
				'packetization-mode':1,
				'profile-level-id':'4d0032',
				'level-asymmetry-allowed': 1,
				'x-google-start-bitrate':1000
			}
		},
		{
			kind:'video',
			mimeType:'video/h264',
			clockRate:90000,
			parameters:
			{
				'packetization-mode':1,
				'profile-level-id':'42e01f',
				'level-asymmetry-allowed':1,
				'x-google-start-bitrate':1000
			}
		}
      ]
  },
  // WebRtcTransport settings 45.12.18.172
  webRtcTransport: {
   /*    listenIps: [
      { ip: (process.env.DEVELOPMENT == "yes" ? '127.0.0.1' : "45.12.18.172") , announcedIp: null }
    ]*/
    listenInfos:[
    {
		protocol:"udp",
		ip:(process.env.DEVELOPMENT == "yes" ? '127.0.0.1' : "45.12.18.172"),
	},{
		protocol:"tcp",
		ip:(process.env.DEVELOPMENT == "yes" ? '127.0.0.1' : "45.12.18.172"),
	}
	],
   // enableUdp: true,
   // enableTcp: true,
   // preferUdp: true,
   // maxIncomingBitrate: 1500000,
   // initialAvailableOutgoingBitrate: 1000000,
  }
};

//let worker = null;
//let router = null;
let producerTransport = null;
let videoProducer = null;
let audioProducer = null;
let producerSocketId = null;
//let consumerTransport = null;
//let subscribeConsumer = null;

const dkey = "/etc/letsencrypt/live/rouletka.ru/privkey.pem";
const dcert = "/etc/letsencrypt/live/rouletka.ru/fullchain.pem";
async function startWorker() {
	try{
  const mediaCodecs = mediasoupOptions.router.mediaCodecs;
 
  worker = await mediasoup.createWorker(
/*  {
  dtlsCertificateFile : dcert,
  dtlsPrivateKeyFile  : dkey
}*/
  );
 
 //router.observer.on('close', function(){console.log('router closed')})
	  worker.observer.on('close', function(){console.log('worker closed')})
  console.log('-- mediasoup worker start. --')
  worker.observer.on('newrouter', function(r){
	  console.error('******************************************************ron new outer ');
	  r.observer.on('close', function(){console.log('router closed')});
	  r.observer.on('newtransport', function(t){
		  console.log('******************************************************* new transport ***********************', t.appData);
		  t.observer.on('newproducer', function(p, a){
			  console.log('***************************  new producer! ******************** ', p.id, p.producerId, p.appData, a);
				p.observer.on('close', function(){
					console.log('**** producer closed ***** ', p.id);
				});
		  });
		  t.observer.on('newconsumer', function(c){
			  console.log('*** new consumer *****');
			  c.observer.on('close', function(){
				  console.log('*** consumer closed **** ', c.id);
			  });
		  });
		  t.observer.on('close', function(){
			  console.log('*** transport closed **** ', t.id, ' appData ', t.appData);
		  });
	  });
  });
   router = await worker.createRouter({ mediaCodecs });
 // worker.fuck();
 router.on('workerclose', function(){ console.log('worker closed so router closed') })
}catch(e){console.log(e);}

//worker.close();
}

// startWorker();

//
// Room {
//   id,
//   transports[],
//   consumers[],
//   producers[],
// }
//

// --- multi-consumers --
let transports = {};
let videoConsumers = {};
let audioConsumers = {};

function getConsumerTrasnport(id) {
  return transports[id];
}

function addConsumerTrasport(id, transport) {
  transports[id] = transport;
  console.log('consumerTransports count=' + Object.keys(transports).length);
}

function removeConsumerTransport(id) {
  delete transports[id];
  console.log('consumerTransports count=' + Object.keys(transports).length);
}

function getVideoConsumer(id) {
  return videoConsumers[id];
}

function addVideoConsumer(id, consumer) {
  videoConsumers[id] = consumer;
  console.log('videoConsumers count=' + Object.keys(videoConsumers).length);
}

function removeVideoConsumer(id) {
  delete videoConsumers[id];
  console.log('videoConsumers count=' + Object.keys(videoConsumers).length);
}

function getAudioConsumer(id) {
  return audioConsumers[id];
}

function addAudioConsumer(id, consumer) {
  audioConsumers[id] = consumer;
  console.log('audioConsumers count=' + Object.keys(audioConsumers).length);
}

function removeAudioConsumer(id) {
  delete audioConsumers[id];
  console.log('audioConsumers count=' + Object.keys(audioConsumers).length);
}

function removeAllConsumers() {
  for (const key in videoConsumers) {
    const consumer = videoConsumers[key];
    console.log('key=' + key + ',  consumer:', consumer);
    consumer.close();
    delete videoConsumers[key];
  }
  console.log('removeAllConsumers videoConsumers count=' + Object.keys(videoConsumers).length);

  for (const key in audioConsumers) {
    const consumer = audioConsumers[key];
    console.log('key=' + key + ',  consumer:', consumer);
    consumer.close();
    delete audioConsumers[key];
  }
}

async function createTransport() {
  const transport = await router.createWebRtcTransport(mediasoupOptions.webRtcTransport);
  console.log('-- create transport id=' + transport.id);

  return {
    transport: transport,
    params: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters
    }
  };
}

async function createConsumer(transport, producer, rtpCapabilities) {
  let consumer = null;
  if (!router.canConsume(
    {
      producerId: producer.id,
      rtpCapabilities,
    })
  ) {
    console.error('can not consume');
    return;
  }

  //consumer = await producerTransport.consume({ // NG: try use same trasport as producer (for loopback)
  consumer = await transport.consume({ // OK
    producerId: producer.id,
    rtpCapabilities,
    paused: producer.kind === 'video',
  }).catch(err => {
    console.error('consume failed', err);
    return;
  });

  //if (consumer.type === 'simulcast') {
  //  await consumer.setPreferredLayers({ spatialLayer: 2, temporalLayer: 2 });
  //}

  return {
    consumer: consumer,
    params: {
      producerId: producer.id,
      id: consumer.id,
      kind: consumer.kind,
      rtpParameters: consumer.rtpParameters,
      type: consumer.type,
      producerPaused: consumer.producerPaused
    }
  };
}


  
  
  
  
  
  
  
  

