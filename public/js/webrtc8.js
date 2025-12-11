var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
var new_uri;
var kK = 0;
var sock = null;
var pc = null;
var pc2 = null;
var MYIP = '23.23.22.35';
var HELP = 0;
var connectionState = "closed";
var mobChat = false;
var isOpen = false;
var PSENDER = false;
var fingerPrint;
var F = false;
//var VK_USER = false;
var isShow = false;
var someVideoSource;
var someInterval;
var goAg;
var OPENCLAIM = false;
var MAKEINCOGNITOCALL = false;
var INCOGNITOWAIT = false;
var MYINCOGNITOPARNERID = null;
var videoInput1, videoInput2;
const IPS = new Map();
var partnerId;
var TARGETID = null;
var MYSOCKETID = null;
var PARTNERSOCKETID = null;
var someIp = null;
var remote = gid("remote");
var local = gid("local");
const claimMenu = gid("claimMenu");
const startbtn = gid("startbtn");
const nextbtn = gid("nextbtn");
var userName = gid("userName");
local.srcObject = null;
remote.srcObject = null;
var esWar = null;
var polite = true;
var makingOffer = false;
var ignoreOffer = false;
var isSettingRemoteAnswerPending = false;
var unsubscribe = false;
var CONNECTED = false;
var isNegotiating = false;
var SUECH = true;
function L(){ return Lang.value; }
const heartcountels = document.querySelectorAll("div.heartcount");

var audioContext;// = new (window.AudioContext || window.webkitAudioContext)();
//var notes = new Sound(context);
//var nows = audioContext.currentTime;
var tru;
//const streamvideo = remote.captureStream();
var partnernick;
var partnerpremium="n";

//const recorder = new MediaRecorder(streamvideo, {mimetype:'video.webm'})
function G(){
	return Number(gid('Grund').value);
}
function getPubId(){
	let a = gid('publishedid');
	if(!a)return;
	return a.value == 'null'?false:true;
}
var publishedId = getPubId()?gid('publishedid').value:null;

function toggleCam(el){

	if(window.streami){
			if(Prem.value == "n" && Brole.value !="admin"){
		//window.location.href = "#gopremium";
		//panelOpen();
		//return;
	}
		window.streami.getTracks().forEach(function(track){
			track.stop();
		});
window.streami = undefined;
	local.srcObject = null;

	}else{
		let s = L()=='ru'?"Нажмите сперва на старт":L()=='en'?'First press "start"':
		L()=='zh'?'首先按“开始”':
		L()=='id'?'Tekan pertama "mulai"':'';
		note({ content: s, type: "warn", time: 5 });
		//panelOpen();
		return;
	}
	
	
	var dura;
	var si = el.getAttribute("data-current");
	if(si !== videoInput2){
	el.setAttribute("data-current", videoInput2);
	dura = videoInput2;
	
	F = true;
}else{
	el.setAttribute("data-current", videoInput1);
	dura = videoInput1;
	
	F = false;
}

		let constraints = {
			audio:{
      echoCancellation: {exact: true}
    }, 
    video:{deviceId: dura ? {exact: dura} : undefined}
    };
    
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
		isShow = true;
	local.srcObject = stream;	
	window.streami = stream;
	
	let starti = local.play();
if(starti !== undefined){
	starti.then(()=>{
		
	}).catch((err)=>{
		alert(err);
	});
}
	//panelOpen();
	
	if(!pc) {
		return;
	}
	// let videoTrack = stream.getVideoTracks()[0];
	   const audioTrack = stream.getTracks()[0];	
	   const videoTrack = stream.getTracks()[1];
	 console.log('videoTrack.kind ', audioTrack.kind," ", videoTrack.kind);
	// if(audioTrack){
	   var sender = pc.getSenders().find(function(s) {
		 console.log('s.track.kind ', s.track.kind);
		  if(s.track && audioTrack){ 
        return s.track.kind == audioTrack.kind;
	}else{
		return undefined;
		}
      });
      
 // }
      
       var sender2 = pc.getSenders().find(function(s) {
		 console.log('s.track.kind2 ', s.track.kind);
		  if(s.track && videoTrack){ 
        return s.track.kind == videoTrack.kind;
	
	}else{
		return undefined;
		}
      });
      
      
      
      
      
      
    
      if(sender){
      sender.replaceTrack(audioTrack).then(function(){
		  console.log('was denn');  
	  }).catch(handleError);
	  
  }
	  
	   if(sender2){
      sender2.replaceTrack(videoTrack).then(function(){
		console.log('was denn');  
	  }).catch(handleError);
	  
  }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	 
 }
	).catch(handleError)
	isShow = false;
}

var isSharing =false;
async function doSharing(el){
	let ismobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if(ismobile){
		note({ content: "Не работает в мобильниках!", type: "error", time: 5 });
		panelOpen();
		return;
	}
	if(window.streami){
		window.streami.getTracks().forEach(function(track){
			track.stop();
		});
window.streami = undefined;
	local.srcObject = null;

	}else{
		note({ content: "Нажми на старт-то!", type: "error", time: 5 });
		panelOpen();
		return;
	}
	var screenS = null;
	try{
		  const con = { video: { cursor: 'always' }, audio: true };
           screenS = await navigator.mediaDevices.getDisplayMedia(con);
          local.srcObject = screenS;
          window.streami = screenS;
          
          panelOpen();
          // const screenTrack = screenS.getVideoTracks()[0];
           const screenTrack = screenS.getTracks()[0];	
        if(!screenTrack){
			note({ content: "No sharing works. Oops.", type: "error", time: 5 });
			return;
		}
           if(screenTrack){
			   isSharing = true;
			   screenTrack.onended = ()=>{
				   panelOpen();
				   note({ content: "Screensharing ended", type: "info", time: 5 });
				   toggleCam(camToggle);
				   screenS = null;
				   isSharing = false;
				   
			   }
			   
			  
			
			   
		   }
          if(!pc){
			  return;
		  }
         
          if(screenTrack){
			  const sender = pc.getSenders().find(sender=> sender.track.kind === screenTrack.kind);
			  if(!sender) {
				  note({ content: "Oops", type: "error", time: 5 });
				  return;
				  }
			  sender.replaceTrack(screenTrack);
			  isShow = true;
		  }	  
	  }catch(e){
		 note({ content: e, type: "error", time: 5 });
		 isShow = false;
	  }finally{
	   setTimeout(function(){
				if(!isSharing){
					if(!screenS) {
						let constraintsi = {
		audio:{
      echoCancellation: true,
      autoGainControl: true,
      noiseSuppression: true,
      channelCount: 1,
      sampleRate:48000,
      sampleSize: 16
    }, 
	video: {deviceId: videoInput1 ? {exact: videoInput1} : undefined,
		width:320, height:240, 
	//	frameRate:15
		}
		};
	
	panelOpen();
	note({ content: "Отменв скриншэринга. Включаем вебку!", type: "info", time: 5 });
						navigator.mediaDevices.getUserMedia(constraintsi).then(function(stream){

	isShow = true;
	local.srcObject = stream;	
	window.streami = stream;
	
	
	if(!pc) {
		return;
	}
	 let videoTrack = stream.getVideoTracks()[0];
	   var sender = pc.getSenders().find(function(s) {
        return s.track.kind == videoTrack.kind;
      });
      
      sender.replaceTrack(videoTrack).then(function(){
		  
	  }).catch(handleError);
	 
	
	
	
	
	
}).catch(handleError);
					}
				}   
			   }, 0);
		   }
}
function mach(){
	if(pc){
		//if(sock)sock.close();
		pc.close();
		//pc=null;
		
	}
}
function gotDevices(deviceInfos){
	let a = navigator.mediaDevices.getSupportedConstraints();
	
	for(var i=0; i !== deviceInfos.length; ++i){
		
		const deviceInfo = deviceInfos[i];
		if(deviceInfo.kind === 'videoinput'){
			if(kK == 0){
				videoInput1 = deviceInfo.deviceId;
			
	
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
function ozenite(el){
	panelOpen();
}
function panelOpen(el){
			
			var settingspanel = document.getElementById("settingspanel");
			if(!isOpen){
			settingspanel.className = "open";
			isOpen = true;	
			
			
			//document.addEventListener("visibilitychange", newev);
	
	/*
	window.addEventListener('beforeunload', function(event) {
    // Send a message to all other tabs that this tab is closing
    console.log('tab-closing');
});
*/			
			
			
			
			
			}else{
				 //document.removeEventListener('visibilitychange', newev);
				settingspanel.className = "";
				isOpen = false;
			}
		}
function openClaim(el){
	
	if(!OPENCLAIM){
		if(claimMenu)	claimMenu.className = "show";
			OPENCLAIM = true;	
			}else{
				if(claimMenu)claimMenu.className = "";
				OPENCLAIM = false;
			}
}

function sendClaim(el){
	if(!CONNECTED){
		note({ content: "Дождитесь собеседника", type: "info", time: 5});
		return;
	}
	let d = el.getAttribute("data-claim");
	if(d == "ignor"){
		let s = L()=="ru"?"ОК. Добавили в игнор.":L()=='en'?"OK, added to ignore.":
		L()=='zh'?'好的，添加忽略。':
		L()=='id'?'Oke, ditambahkan untuk mengabaikan':'';
		note({ content: s, type: "info", time: 5 });
	}else if(d == "claim"){
		let l = claimMenu.getAttribute("data-vip");
		//alert(l+' '+partnernick);
		let d5 = claimMenu.getAttribute("data-was");
		if(d5 && d5 === "dataPublish"){
			if(!partnernick) return;
			let d = {}
		d.usid = l;
		d.nick = partnernick;
		d.numb =  4;
		vax('post','/admin/OneBanned', d, on_ban_it, on_ban_it_error, undefined, false);
		}
		wsend({ type: "ban_publish" , nick: partnernick });
		let s = L()=="ru"?"Спaсибо, модератор рассмотрит вашу жалобу.":
		L()=='en'?"Thanks, the moderator will look at your abuse":
		L()=='zh'?'谢谢，版主会看看你的滥用行为':
		L()=='id'?'Terima kasih, moderator akan melihat penyalahgunaan Anda':'';
		note({ content: s, type: "info", time: 5 });
	}
	openClaim(claimContainer);
	//let l = claimMenu.getAttribute("data-vip");
	//alert('parn sock id'+ PARTNERSOCKETID);//PARTNERSOCKETID
	if(PARTNERSOCKETID)insertIgnore(PARTNERSOCKETID);
}
function insertIgnore(ip){
	if(!remote.srcObject){
		return;
	}
	if(!IPS.has(ip)){
		//alert(ip);
		IPS.set(ip, {});
	}
	//alert("partnersocketid ", PARTNERSOCKETID);
	console.log("pressing next");
	wsend({type:'addignore', to: PARTNERSOCKETID , from: MYSOCKETID });
	//next(nextbtn, true, IPS, true);
}

function banit(el){
	let l = claimMenu.getAttribute("data-vip");
	//alert(l);
	if(l){
		if(!partnernick){
			console.warn("No partner nick");
			return;
		}
		let wa = claimMenu.getAttribute("data-was");
		let d = {}
		d.usid = l;
		d.nick = partnernick;
		d.numb = (wa&&wa === "dataPublish" ? 4 : 1);
		vax('post','/admin/OneBanned', d, on_ban_it, on_ban_it_error, el, false);
		wsend({ type: "ban_publish" , nick: partnernick });
		el.className = "puls";
	}else{
		console.warn("NO partner user id");
	}
}
function on_ban_it(l, el){
	if(el)el.classList.remove("puls");
	if(l.error){
		if(el)note({ content: l.message, type: "error", time: 5});
		return;
	}
	
	if(el)note({ content: l.message, type: "info", time: 5 });
	openClaim(claimContainer);
}
function on_ban_it_error(l, el){
	if(el)el.className="";
	note({ content: l, type: "error", time: 5 });
}

function closeClaim(el){
	/*
	if(OPENCLAIM){
			claimMenu.className = "";
				OPENCLAIM = false;
	}*/
	//openClaim();
}
if (window.location.protocol === "https:") {
  new_uri = "wss:";
} else {
  new_uri = "ws:";
}


async function newev(){
	 if (document.hidden){
        console.log("Browser tab is hidden")
    
		//  	let mediasoupAdmin = gid("mediasoupAdmin");
		  	  if(DEVELOPMENT === 'yes'){
				//  alert('yes');
			  }else{
				  removeMedia();
	 }
  }
 }

document.addEventListener('visibilitychange', newev);
window.addEventListener("pagehide", async function(ev){
	
		 	removeMedia();

});
window.addEventListener("beforeunload", async function(ev){
	removeMedia();
});
function wari(el){
	//alert('load');
	return;
	let s = document.querySelector('iframe');
	s.onclick=function(){
		//alert(1);
	}
	//s.contentWindow.postMessage('message', '*');
	//s.contentWindow.onopen=function(){
	//alert(6);
	//}
	
//	const channel = new BroadcastChannel('tab-activity');

// Listen for messages on the channel
/*
channel.addEventListener('message', (event) => {
    if (event.data === 'open-new-tab') {
        console.log('User opened another tab');
    }
});
*/ 
	//document.addEventListener("visibilitychange", newev);
	
	
	window.addEventListener('beforeunload', function(event) {
    // Send a message to all other tabs that this tab is closing
    console.log('tab-closing');
});
	
	
}

window.onmessage = function(event){
	//alert(1);
	//console.warn(event);
   if (event.origin == 'http://localhost:3000') {
      if(event.data == "message")  console.log('Message received! ', event.data);
       // alert('message ');
    }
};



const channel = new BroadcastChannel('message');
	channel.onmessage = function (ev) { 
		console.log(ev.data); 
		let a = ev.data.type;
		if(a == "start"){
			//start(startbtn);
		}else if(a == "next"){
			let amap = [[0,{}]];
			//next(nextbtn, true, amap, false);
		}else{}
		}


var isEnter = gid('isEnter');
function ifEnter(){
	if(isEnter.value === "true"){
		return true;
	}else{
		return false;
	}
}
function checkMonth(){
	let monthmilliseconds = 2592000000;
	let heute = Date.now();
	let mon = Mon.value;
	if(mon=="null")return;
	let mon2 = Number(mon)
	//alert(mon2);
	let ab = heute - mon2;
	if(ab < monthmilliseconds){
		//alert("premium account!");
	}else if(ab > monthmilliseconds){
		//alert("not a premium account");
		if(Login()){
			let d = {};
			d.usid = userId.value;
			vax('post','/api/removePremium', d, on_remove_prem, on_remprem_error, null, false);
		}
	}
}
checkMonth();
	function on_remove_prem(l, v){}
	function on_remprem_error(){};

function setSignal(){
	//alert("aha");
	//vax('post','/api/setDonation', { nick: NICK }, function(l, v){}, function(l, v){}, null, false);
	//document.removeEventListener('visibilitychange', newev);
}
//window.location.href="#myGame";
//window.onpagehide=function(){alert('open')}
function get_socket() {
	
	/* if(gid('isLogin').value === "false"){
		// sock.close();
		let s = L()=="ru"?"Залогиньтесь!":L()=='en'?"You should log in!":
		L()=='zh'?'您应该登录！':
		L()=='id'?'Anda harus masuk':'';
		 note({content: s, type: "warn", time: 5 });
		 window.location.href="#login";
	const faka = document.querySelector('.overlay:target');
	 if(faka){
	faka.onclick=function(e){
		e.preventDefault();
	}
		  return;
	  }}*/
	//  alert(ifEnter());
	/*
	if(ifEnter() && Brole.value !="admin"){
		window.location.href='#purchaseHREFI';
		 const faka = document.querySelector('.overlay:target');
	 if(faka){
	faka.onclick=function(e){
		e.preventDefault();
	}
}
window.onhashchange = function(ev){
	console.log('hashchanged');
	window.location.href='#purchaseHREF';
}
return window.location.href='#purchaseHREF';

}else{
	window.onhashchange = null;
}
*/ 
 if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + "/gesamt");

  sock.onopen = function () {
	 console.log("websocket opened");
	// heartbeat();
	 wsend({ type: "helloServer", VK: isVK.value, userId: gid("userId").value?gid("userId").value:'anon', isprem: Prem.value, nick: userName.value, logged:  Login()?"yes":"no", LANG: L });
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
	  wsend({type: "hang-up", ignore: false });
	  closeAll(startbtn);
	 // clearTimeout(pingTimeout);
    sock = null;
    let s = L()=="ru"?"Соединение с сервером закрыто!":L()=='en'?"Websocket closed!":
    L()=='zh'?'Websocket 已关闭':
    L()=='id'?'Soket web ditutup':'';
    note({ content: s, type: "info", time: 5 });
    console.log('socket closed');
    //closeAll(startbtn);
    
  };
}





var tr = undefined;
get_socket();
var pingTimeout;
var PARTNERUSERID;
var bobAudioStream = null;
/*
function heartbeat(){
	clearTimeout(pingTimeout);
	pingTimeout = setTimeout(function(){
		sock.close();
	}, 3000+5000);
}*/
function on_msg(msg) {
	//console.log("data type: ", msg.type);
	 switch (msg.type) {
		 case 'pick':
		// heartbeat();
		 wsend({type:'pock'});
		 break
		 case 'helloServer':
		
		MYSOCKETID = msg.socketId;
		//alert(msg.socketId);
		 break
		 case 'ban_publish':
		 unpublish();
		 disconnect2();
		 if(msg.nick === userName.value){
			 gid("Grund").value = 4;
		 }
		 break
		 case 'addignore':
		 console.log('addignore ',msg);
		 if(!IPS.has(msg.from)){
			// alert('addignore '+ msg.from);
			 IPS.set(msg.from, {});
		 }
		 break
      case 'online':
        onlineCount.textContent = msg.online
        if(!msg.imgData){
			//console.log('no imgData');
		partnernick = null;
			let a44 = gid("kartina");
			//a44.setAttribute("poster", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
			//gid("playContainer").setAttribute("data-state", "niemand");
		if(claimMenu)	claimMenu.setAttribute("data-was", "");
			if(claimMenu)claimMenu.setAttribute("data-vip", "0");
		}
        break
      case 'new-ice-candidate':
        handleNewIceCandidate(msg.data)
        break
      case 'video-offer':
       console.warn(msg.vip, " ", msg.partnerId,msg.nick,msg.isprem);
       console.log("your id: ", userId.value, "partner id ", msg.partnerId);
       // claimMenu.setAttribute("data-vip", msg.vip);
      if(claimMenu) claimMenu.setAttribute("data-vip", msg.partnerId);
       partnernick = msg.nick;
       PARTNERSOCKETID = msg.from;
    //   alert('videoffer partner sock id '+msg.from+msg.nick);
      partnerpremium = msg.isprem;
       //  let a = checkIp(msg.vip);
        let a = checkIp(msg.partnersocketid);
        if(!a){
        handleVideoOffer(msg.data)
	}else{
		console.log("NO VIDEO");
	//	wsend({type: "hang-up", subi: "here" });
	let amap=[[0,{}]];
	if(IPS.size > 0) amap = IPS;
	console.log('in ignor');
	//next(nextbtn, true, IPS, true);
	}
        break
      case 'video-answer':
      // partnernick = msg.nick;
      //   partnerpremium = msg.isprem;  
        console.warn('video answer ', msg.nick, msg.isprem);
        handleVideoAnswer(msg.data)
        break
      case 'hang-up':
      if(msg.ignore){
		  console.warn(msg.ignore, " ", msg.partnerId);
		  if(!IPS.has(msg.partnerId)){
			 // IPS.set(msg.partnerId, {});
		  }
	  }
	  console.warn("hangup! " + msg.ignore);
        handleHangUp()
        break
      case 'peer-matched':
      //alert(msg.isprem+' '+msg.nick);
     //alert('peer matched parnersocketid '+ msg.partnersocketid);
      PARTNERSOCKETID = msg.partnersocketid;
        console.log(msg.vip, " nick ", msg.partnerId,msg.nick);
        partnerId = msg.partnerId;
        partnernick = msg.nick;
        partnerpremium = msg.isprem;  
        console.log("your id: ", userId.value, "partner id ", msg.partnerId, 'partner nick ',msg.nick, msg.isprem);
       // claimMenu.setAttribute("data-vip", msg.vip);
      if(claimMenu)  claimMenu.setAttribute("data-vip", msg.partnerId);
       // let a3 = checkIp(msg.vip);
        let a3 = checkIp(msg.partnersocketid);
      //  console.warn("a3", a3);
       if(!a3){
		//	console.warn("was isch");
		handlePeerMatched();
	}else{
	//	alert('ignor');
		console.error("some ignor");
		//wsend({ type: "hang-up" });
		let amap=[[0,{}]];
	if(IPS.size > 0) amap = IPS;
	//next(nextbtn, true, IPS, true);
		
	}
        break
      case 'message':
        handleMessage(msg.data)
        break
        case "messagepublished":
       // alert('publish');
        insertPublished(msg);
        break
        case 'gift':
        handleGift(msg);
        break
        case 'gift2':
        handleGift2(msg);
        break
        case 'write':
   //  if(!tr){
       // printmsg2.className='write';
       // printmsg.className="write";
       znakPrint.classList.remove("hidden");
       znakPrint2.classList.remove("hidden");
	//}
		tr=setTimeout(function(){
			//printmsg2.className='';
			//printmsg.className="";
			znakPrint.classList.add("hidden");
			znakPrint2.classList.add("hidden");
			clearTimeout(tr);
			tr = undefined;
		}, 1000);
	
        break;
       case 'unwrite':
       // printmsg2.className='';
       // printmsg.className="";
        znakPrint.classList.add("hidden");
        znakPrint2.classList.add("hidden");
        break;
        case 'connected2':
        let conns2 = gid("conns2");
        gid('connects').textContent = msg.size;
        conns2.textContent = msg.size;
        //gid('webcams2').textContent =;
       // gid('cons2').textContent = ;
      // gid("camsCount").textContent = msg.cams;
        //alert(msg.size);
        break;
        case 'connected3':
        gid('webcams2').textContent = msg.cams;
        gid("camsCount").textContent = msg.cams;
        break;
        case 'dynamic':
       // alert('dynamic');
        handleDynamic(msg);
        break;
        case 'error':
        note({ content: msg.err, type: "error", time: 5 });
        break;
        case 'target':
        if(msg.subtype == 'callinkognito'){
			createInkognitoOffer(msg);
		}else if(msg.subtype == 'video-offer'){
			createInkognitoAnswer(msg);
		}else if(msg.subtype == 'video-answer' ){
			handleInkognitoVideoAnswer(msg);
		}else if(msg.subtype == 'new-ice-candidate'){
        handleIncognitoNewIceCandidate(msg);
		}else if(msg.subtype == 'bye-inkognito'){
			//alert("bye");
			inkognitocloseVideoCall();
		}else if(msg.subtype == 'inkognito-busy'){
			//alert("busy");
			note({ content: "Занято!", type: "info", time: 5 });
		}else if(msg.subtype == 'inkognitosetcall'){
			callAnfrage(msg);
		}else if(msg.subtype == 'info'){
			note({ content: msg.info, type: 'info', time: 6 });
		}else if(msg.subtype == 'pleasedocall'){
			console.warn('pleasedocall');
			pleaseDoCall(msg);
		}else if(msg.subtype == 'notfound'){
			console.warn('not FOUND');
			if(INCOGNITOWAIT){
				//INCOGNITOWAIT = true;
				console.warn('calling next');
				//next(nextbtn, false, false, false);
			}
		}else if(msg.subtype == "ban"){
			handleBan(msg);
		}else if(msg.subtype == "ban2"){
		//	alert('ban2');
			handleBan2(msg);
		}else if(msg.subtype == "ban3"){
			handleBan3(msg);
		}else if(msg.subtype == "bannedok"){
			PARTNERUSERID = msg.partneruserid;
			//alert('user ip ' + msg.ip);
			//note({ content: msg.message, type: "info", time: 5 });
			console.log('message ', msg.message);
			handleBanIp(msg);
			stopInkognito();
		}else if(msg.subtype == "bannedok2"){
		//	alert('bnok2');
			note({ content: "Забанили суку", type: "info", time: 5 });
			stopInkognito();
		}else if(msg.subtype == 'bannedok3'){
			note({ content: "Забанили суку по нику", type: "info", time: 5 });
			banOk3(msg);
			//stopInkognito();
		}else if(msg.subtype == 'lateroffer'){
			inkognitoSetRemoteDescription(msg);
		}else if(msg.subtype == 'incognitoconnected'){
			note({ content: "Вы в эфире!", type: "info", time: 5 });
		}else if(msg.subtype == "getsound"){
			handleGetSound(msg);
		}else if(msg.subtype == "soundoffer"){
			handleSoundOffer(msg);
		}else{}
		break;
        case 'vip':
        someIp = msg.vip;
        MYIP = msg.vip;
      //alert(MYIP);
        case 'media':
      //  goMedia(msg);
        break;
       
      default:
      goMedia(msg);
        break
    }
	
}
function checkIp(ip){
	let a = IPS.has(ip);
	return a;
}
//localStorage.removeItem("ban")
var ISINC = false;

async function callInkognito(el){
	//if(gid("Brole").value == "admin" || gid("Prem").value == "y") {
		if(gid("Brole").value == "admin"){
	console.log("MYSOCKETID ", MYSOCKETID);
	//alert(MYSOCKETID);
	if(pc){
		note({ content: "Сперва отключите камеру", type: "info", time: 5 });
		return;
	}
	let a = el.getAttribute('data-pid');
	if(!a)return;
	//alert(a);
	console.log("target ", a);
	if(a == MYSOCKETID)return;
	note({ content: "Просмотр", type: "info", time: 5 });
	TARGETID = a;
	wsend({ type: "target", subtype: "callinkognito", from: MYSOCKETID, target: a });
	try{
		//await audioContext.resume();
	}catch(e){
		console.error(e);
		alert(e);
	}
}
}

async function createInkognitoOffer(obj){
	
	if(!local.srcObject)return;
	if(pc2){
		wsend({ type: 'target', subtype: 'inkognito-busy', from: MYSOCKETID, target: obj.from });
		return;
	}
	ISINC = true;
	try{
		pc2 = await createInkognitoPeerConnection();
	const offer = await pc2.createOffer(offerOpts)
		await pc2.setLocalDescription(offer);
	TARGETID = obj.from;
		wsend({ type:'target', subtype: 'video-offer', data: pc2.localDescription, target: obj.from, from: MYSOCKETID });
	
	}catch(err){
		console.error(err);
		
	}
}

async function createInkognitoAnswer(obj){
	
	try{
	pc2 = await createInkognitoPeerConnection();
		
	await pc2.setRemoteDescription(obj.data);
	
	const answer =	await pc2.createAnswer();
		
			await pc2.setLocalDescription(answer);
		
				wsend({type: 'target', subtype: 'video-answer', target: obj.from, from: MYSOCKETID , data: pc2.localDescription});
	
	
	}catch(err){
		console.error(err);
	}
	
}
 function handleInkognitoVideoAnswer(obj){
	 //if(pc && pc.signalingState == "stable") return;
	 console.log("handle video answer");
	 if(pc2.signalingState=="have-local-offer"){
	 	pc2.setRemoteDescription(obj.data).then(function(){
			
		}).catch(function handleError(er){
			console.error(er);
		});
	}
 }
 function handleIncognitoNewIceCandidate(obj){
	 if(pc2){
	if(obj.data){
		pc2.addIceCandidate(obj.data).then(function(){
			
		}).catch(function handleError(er){
			
			console.error(er);
		});
	}
	}
 }
 async function createInkognitoPeerConnection(){
	 try{
		 let reqi = await fetch('/turn', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({ tok: gid("TOK").value })});
	if(reqi.ok){
		let config = await reqi.json();
		 let servers = {
		// iceTransportPolicy:"relay",
	"iceServers":[
    
	{
		"urls":[
		//"stun:127.0.0.1:3478",
		"stun:stun.l.google.com:19302",
		"stun:5.35.88.151:3479"
		]
		//stun:45.12.18.172:3479
		},
	{
		urls:[
	//"turn:127.0.1:3478",
		"turn:5.35.88.151:3479?transport=tcp", 
		//"turn:rouletka.ru:5348",
		//"turn:rouletka.ru:5348?transport=tcp" //no stun
		]
		,username: config.username, credential:config.password }]
	}
    pc2 = new RTCPeerConnection(servers);
}
}catch(er){
	console.error(er);
	//alert(er);
	return;
}
 if(local.srcObject)inkognitoaddLocalStream ();
 	if('ontrack' in pc2){
	pc2.ontrack = inkognitoaddStream;
}else{
	/*
	pc2.addStream(window.streami);
	pc2.onaddstream = function(e){
		alert('stream onadd');
		//remote.srcObject = e.stream;
	}*/
}
    pc2.addEventListener('icecandidate', inkogintoiceCandidateHandler, false);
    pc2.addEventListener('iceconnectionstatechange', inkognitoiceConnectionStateChangeHandler, false);
    pc2.addEventListener('icegatheringstatechange', inkognitoiceGatheringStateChangeHandler, false);
    pc2.addEventListener('signalingstatechange', inkognitosignalingStateChangeHandler, false);
    pc2.addEventListener('negotiationneeded', inkognitonegotiationNeededHandler, false);
    pc2.addEventListener('track', inkognitotrackHandler, false);
    pc2.addEventListener('removetrack ', inkognitoremoveTrackHandler, false);
    pc2.addEventListener('onicecandidateerror', inkognitoiceCandidateError, false);
    return pc2;
 }
 
   var si=0;
   var aliceAudioSource, bobAudioSource;
   var destination;
   var alice, bob;
async function inkognitoaddStream({ track, streams }){
	
	const uname = gid('userName').value;
	const auel = gid('auel');
//alert(track.kind)
	if(!INCOGNITOWAIT){
		//alert(4);
		
		if(track.kind === 'audio'){
			//if(si==0){
			/*
			if(!audioContext){
				await  setupAudioContext();
			}
			try{
			var audioSource = audioContext.createMediaStreamSource(streams[0]);
			//const audioSource = audioContext.createMediaStreamSource(streams[0]);
			//const destination = audioContext.createMediaStreamDestination();
			if(!aliceAudioSource.numberOfInputs){
				
				audioSource.connect(aliceAudioSource).connect(destination);
			}else{
				//bobAudioSource = audioContext.createMediaStreamSource(streams[0]);
				//const gainNode = audioContext.createGain();
				//gainNode.gain.value = 1.0;
				audioSource.connect(bobAudioSource).connect(destination);
				
			}
			
			
			const audioel = document.createElement('audio');
			audioel.className = "audioel";
			audioel.srcObject = destination.stream;//streams[0];
			audioel.autoplay = true;
			audioel.muted = false;
			document.body.appendChild(audioel);
			audioel.play().catch(er=>{alert(er)});
			//audioel.volume = 1.0;
			//alert('audioel '+si);
			*/
		//}
		if(!alice){
			alice = 'somedata';
		}else{
			bob ="data";
			auel.srcObject = streams[0];
			auel.play().catch(er=>{alert(er)});
		}}
	si++;
//}catch(e){alert(e)}
		//}
		if(track.kind === 'video'){
	var videoBox = gid("videoBox");
	
	if(videoBox && videoBox.srcObject){
		//alert('object!');
		//someVideoSource = streams[0];
		return;
	}else{
		//alert(2);
		someVideoSource = streams[0];
	}
	
	const anotherdiv = gid("whosonlinecontent");
	const div = document.createElement('div');
	div.className = "videoboxdiv";
	div.setAttribute ("id", "VideoDivi");
	let btn = document.createElement('button');
	btn.className = "btn-video-box";
	btn.setAttribute('onclick', "stopInkognito(this);");
	
	//const newText = document.createTextNode("&#x274C;");
	const newText = document.createTextNode(String.fromCodePoint(0x274C));
	const newText2 = document.createTextNode(String.fromCodePoint(0x1F4DE));
	const newText3 = document.createTextNode(String.fromCodePoint(0x1F50A));//🔊
	const newText4 = document.createTextNode(String.fromCodePoint(0x1F4F9));
	//btn.textContent = "&#x274C;";
	btn.appendChild(newText);
	const btncall = document.createElement('button');
			btncall.className = "btn-call";
			btncall.setAttribute('onclick', "callme(this);");
			btncall.appendChild(newText2);
			
			
			
			
			if(uname == "suka1" || uname == '@Globik2'){
	  const newText3 = document.createTextNode(String.fromCodePoint(0x1F4F7));
		var btnscan = document.createElement('button');
			btnscan.className = "btn-scan";
			btnscan.setAttribute('onclick', "scanme(this);");
			btnscan.appendChild(newText3);
			div.appendChild(btnscan);
			
			const btnsound = document.createElement('button');
			btnsound.className = "btn-sound";
			btnsound.setAttribute('onclick', "sounder(this);");
			btnsound.appendChild(newText4);
			div.appendChild(btnsound);
}
if(gid("Brole").value == "admin"){
	var btnban = document.createElement('button');
			btnban.className = "btn-ban";
			btnban.setAttribute('onclick', "ban();");
			btnban.textContent = "Ban";
			div.appendChild(btnban);
			
			var btnban2 = document.createElement('button');
			btnban2.className = "btn-ban2";
			btnban2.setAttribute('onclick', "ban2();");
			btnban2.textContent = "Ban2";
			div.appendChild(btnban2);
}
	  let el = document.createElement('video');
	  el.className = "video-box";
	  el.id = "videoBox";
    el.setAttribute('playsinline', true);
    el.setAttribute('autoplay', true);
    el.setAttribute('muted', false);
   // if(el.srcObject)return;
    el.srcObject = streams[0];

	div.appendChild(el);
	div.appendChild(btn);
	div.appendChild(btncall);
	
	
	  // el.volume = 1.0;
	   anotherdiv.appendChild(div);
   }

	  }else{
		  //alert(3);
		  addStream({ track, streams })
	  }
}
async function setupAudioContext(){
	try{
	audioContext = new (window.AudioContext || window.webkitAudioContext)();
	destination = audioContext.createMediaStreamDestination();
	aliceAudioSource = audioContext.createGain();
	bobAudioSource = audioContext.createGain();
	aliceAudioSource.gain.value = 1.0;
	bobAudioSource.gain.value = 0.8;
}catch(e){
	alert(e);
}
}

function stopInkognito(){
	inkognitocloseVideoCall()
}

 function inkognitoaddLocalStream () {
    var streami = window.streami;
 try{
    streami.getTracks().forEach(function(track){
	pc2.addTrack(track, streami);
	})
	if(bobAudioStream){
		const bobAudioTrack = bobAudioStream.getAudioTracks()[0];
		pc2.addTrack(bobAudioTrack, bobAudioStream);
	}
}catch(e){
	console.error(e);
	}
  }

 function inkogintoiceCandidateHandler(event){
	 if (event.candidate) {
    wsend({ type: 'target', subtype: 'new-ice-candidate', data: event.candidate, target: TARGETID, from: MYSOCKETID })
  }
 }
 function inkognitoiceConnectionStateChangeHandler(event){
	 
  switch (event.target.iceConnectionState) {
    case 'connected':
   console.log('connected');
    break;
    case 'complete':
      console.log('complete');
      break;
    case 'closed':
    console.log('ice closed');
    inkognitocloseVideoCall()
    break;
    case 'failed':
    console.log('ice failed');
  inkognitocloseVideoCall()
     break;
    case 'disconnected':
   
    console.log('ice disconnected');
    inkognitocloseVideoCall()
      break;
  }
 }
  
 function inkognitocloseVideoCall() {
 
console.log("PC2*** ")
console.log("MYSOCKETID ", MYSOCKETID);
	console.log("target ", TARGETID);
  if (!pc2) {
	  console.log("!pc2 return");
    return
  }
var videoBox = gid("videoBox")
  if (videoBox && videoBox.srcObject) {
	  if(window.recorder && window.recorder.state == 'recording'){
	// note({content: "Closing rec", type: "info", time: 5 });
 window.recorder.stop();
}
	  someVideoSource = null;
    videoBox.srcObject.getTracks().forEach(track => {
		console.log("track stop");
    
      track.stop()
    
    videoBox.srcObject = null;
    
  })
}
bob = null;
alice = null;
const auel = gid('auel');
if(auel.srcObject){
	auel.srcObject.getTracks().forEach(track => {
		console.log("track stop");
    
      track.stop()
    })
    auel.srcObject = null;
}
/*
let ds = document.querySelectorAll('.audioel');
for (let i = 0;i < ds.length;i++){
	var du = ds[i];
	if(du)du.remove();
}*/



if(!INCOGNITOWAIT){
	console.log("INCOGNITOWAIT ", INCOGNITOWAIT);
if(window.incognitostreami){
	window.incognitostreami.getTracks().forEach(track => {
		console.log("track stop");
    
      track.stop()
    
  })
  window.incognitostreami = null;
}
}

var suka = document.querySelector(".videoboxdiv");//gid("VideoDivi")
if(suka){
	//alert(1);
	//videoBox.remove();
	console.log(suka);
	//suka.style.position="relative";
	//suka.innerHTML="";
	suka.remove();
	//const node = document.getElementById("child");
	//while (suka.firstChild) {
 // suka.removeChild(suka.firstChild);
//}

}

  console.log('Closing the peer connection...');
  pc2.removeEventListener('icecandidate', iceCandidateHandler);
  pc2.removeEventListener('iceconnectionstatechange', iceConnectionStateChangeHandler);
  pc2.removeEventListener('icegatheringstatechange', iceGatheringStateChangeHandler);
  pc2.removeEventListener('signalingstatechange', signalingStateChangeHandler);
  pc2.removeEventListener('negotiationneeded', negotiationNeededHandler);
  pc2.removeEventListener('track', trackHandler);
  pc2.removeEventListener('removetrack ', removeTrackHandler);

//const anotherdiv = gid("whosonlinecontent");
//anotherdiv.removeChild(videoBox)
wsend({ type: 'target', subtype: 'bye-inkognito', target: TARGETID })
  pc2.close();
  pc2 = null;
  TARGETID = null;
  console.log("good");
  if(INCOGNITOWAIT){
	  INCOGNITOWAIT = false;
	  if(tru)tru.mode = "hidden";
	 next(nextbtn, false, false, false);
  }
}

 function inkognitoiceGatheringStateChangeHandler(){}
 function inkognitosignalingStateChangeHandler(){}
 function inkognitonegotiationNeededHandler(){}
 function inkognitotrackHandler(){}
 function inkognitoremoveTrackHandler(){}
 function inkognitoiceCandidateError(){}
 
 function callme(el){
	 //alert('call');
	 wsend({ type: "target", subtype: "inkognitosetcall", target: TARGETID, from: MYSOCKETID });
	 el.disabled = true;
 }
 
 function callAnfrage(obj){
	// alert(1);
	 if(!pc){
		// alert(2);
		 INCOGNITOWAIT = true;
		 MYINCOGNITOPARNERID = obj.from;
		 wsend({ type: "hang-up"});
		 wsend({ type:'target', subtype: 'pleasedocall', from: MYSOCKETID, target: MYINCOGNITOPARNERID });
	 }else{
		 if(!INCOGNITOWAIT){
			 INCOGNITOWAIT = true;
			 MYINCOGNITOPARNERID = obj.from;
			 wsend({ type: 'target', subtype: 'info', info: "Как только закончит сеанс с собеседником соединим вас", from: MYSOCKETID, target: obj.from });
		 }else{
			 wsend({ type: 'target', subtype: 'info', info: "Как только закончит сеанс с собеседником соединим вас", from: MYSOCKETID, target: obj.from });
		 }
	 }
 }
 
 function answerToIncognito(){
	 if(pc2){
		if(MYINCOGNITOPARNERID){
			wsend({ type:'target', subtype: 'pleasedocall', from: MYSOCKETID, target: MYINCOGNITOPARNERID });
		} 
	 }else{
		 next(nextbtn, false, false, false);
	 }
 }
 
async function pleaseDoCall(msg){
	 if(pc2){
		 try{
		 console.warn('pc2!');
		 let constraintsi = {
		audio:true , 
	video: {deviceId: videoInput1 ? {exact: videoInput1} : undefined,
		width:320, height:240, 
		}
		};
	
	
	
	
	const stream = await navigator.mediaDevices.getUserMedia(constraintsi);
	window.incognitostreami = stream;
	  //var streami = window.incognitostreami;
 try{
    stream.getTracks().forEach(function(track){
	pc2.addTrack(track, stream);
	})
}catch(e){
	console.error(e);
	}
	
	
	const offer = await pc2.createOffer();
	await pc2.setLocalDescription(offer);
	wsend({ type: 'target', subtype: 'lateroffer', from: MYSOCKETID, target: msg.from, sdp: offer });

		}catch(err){
			
			console.log(err);//permission denied NotAllowedError
			if(err.name == "NotFoundError" || err.name == "DevicesNotFoundError"){
				note({ content: "Вебкамера или микрофон не найдены", type: "warn", time: 5 });
			
			}else if(err.name == "NotAllowedError" || err.name == "PermissionDeniedError"){
				note({ content: "Пожалуйста, разрешите браузеру использовать камеру и микрофон.", type: "warn", time: 5 });
			}else{
				console.error(err);
				note({content: err.name + err,type:"warn", time: 5 });
			}
		}
		
		
	 }
 }
 function inkognitoSetRemoteDescription(msg){
	 pc2.setRemoteDescription(msg.sdp).then(function(){
			
		}).catch(function handleError(er){
			console.error(er);
		});
 }
 function handleSoundOffer(msg){
	 inkognitoSetRemoteDescription(msg);
 }
 function scanme(el){
	 let video = gid("videoBox");
	 if(video){
		 let cnv = document.createElement('canvas');
    let c = cnv.getContext('2d');
    var ww = video.videoWidth;
    var hh = video.videoHeight;
    cnv.width = ww;
    cnv.height = hh;
    var text = "rouletka.ru";
    c.font='bold 36px Robotics';
    c.fillStyle = "orange";
    
    c.drawImage(video, 0, 0, ww, hh);
  //  c.fillText(text, 6, cnv.height - 6);
    let imgdata = cnv.toDataURL('image/jpeg', 1.0);
    wsend({ type: "telegascreenshot", nick: (NICK?NICK:'Anonym'), src: imgdata });
    var img=document.createElement('img');
    img.src=imgdata;
    document.body.appendChild(img);
    //cnv.remove();
	 }
 }
 
 function screeni(){
	  let video = gid("videoBox");
	 if(video){
		 let cnv = document.createElement('canvas');
    let c = cnv.getContext('2d');
    var ww = video.videoWidth;
    var hh = video.videoHeight;
    cnv.width = ww;
    cnv.height = hh;
    var text = "rouletka.ru";
    c.font='bold 36px Robotics';
    c.fillStyle = "orange";
    
    c.drawImage(video, 0, 0, ww, hh);
  //  c.fillText(text, 6, cnv.height - 6);
    let imgdata = cnv.toDataURL('image/jpeg', 1.0);
    return imgdata;
 }
}
 var arsch;
 var bika = false;
 function ban(msg){
	 if(gid("BAN").value === "1"){
		 banus(TARGETID);
		 return;
	 }
	// alert('target '+ TARGETID+ ' my sock '+MYSOCKETID);
	//alert('userId '+gid('userId').value);
	 wsend({ type: "target", subtype: "ban", from: MYSOCKETID, target: TARGETID, vip: MYIP , ziel: msg.ziel });
 }
 
  function ban2(){
	//alert('target '+ TARGETID+ ' my sock '+MYSOCKETID);
	//alert('userId '+gid('userId').value);
	
	 wsend({ type: "target", subtype: "ban2", from: MYSOCKETID, target: TARGETID , vip: MYIP });
 }
 function banus(TARG){
	// alert('banus'+TARG);
	 wsend({ type: "target", subtype: "ban3", from: MYSOCKETID, target: TARG  });
 }
 function handleBan3(obj){
	// alert('handleban3');
	 window.location.href = "#banned";
	 gid("Grund").value = 1;
	 wsend({ type: "target", subtype: "bannedok3", target: obj.from , nick: gid('userName').value, usid: gid('userId').value, from: MYSOCKETID });	
	  closeAll(startbtn);
 }
 function banOk3(obj){
	 note({ content: obj.nick + " : " + obj.usid, type: "info", time: 5 });
	 let d = {};
	 d.nick = obj.nick;
	 d.usid = obj.usid;
	 d.numb = 1;
	 vax('post','/admin/OneBanned', d, on_ban_it, on_ban_it_error, null, false);
 }
 function handleBan2(obj){
	 //alert(obj.from);
	 let durak = "some";
	 if(videoInput1 == 0){
				if(fingerPrint) {
					 durak = fingerPrint.substring(0, 40);
				 }else{
					 durak = 'no data'
				 }
			  }else if(videoInput1 == undefined){
				  if(fingerPrint) {
					 durak = fingerPrint.substring(0, 40);
				 }else{
					 durak = 'no data'
				 }
			  }else{
				 if(videoInput1 !=0) {
					 durak = videoInput1.substring(0, 40);
				 }else{
					 durak = 'no videoinput';
				 }
			  }
	 window.location.href = "#banned";
	  let sud = gid("lValue");
			  sud.value+="&ip=" + durak;
		wsend({ type: "target", subtype: "bannedok2", target: obj.from , from: MYSOCKETID});	 
	 closeAll(startbtn);
	 
 }
 
 function handleBan(obj){
	 arsch = obj.from;
	 bika = true;
	 let durak = "some";
	 if(videoInput1 == 0){
				if(fingerPrint) {
					 durak = fingerPrint.substring(0, 40);
				 }else{
					 durak = 'no data'
				 }
			  }else if(videoInput1 == undefined){
				  if(fingerPrint) {
					 durak = fingerPrint.substring(0, 40);
				 }else{
					 durak = 'no data'
				 }
			  }else{
				 if(videoInput1 !=0) {
					 durak = videoInput1.substring(0, 40);
				 }else{
					 durak = 'no videoinput';
				 }
			  }
	 wsend({ type: "target",ip: MYIP, ziel: obj.ziel,
		  videoinput: durak, nochinput: videoInput2, partneruserid: gid('userId').value, name:gid('userName').value,subtype: "bannedok", target: obj.from, message: "OK, banned!" });
	/*
	 try{
	 window.localStorage.setItem("ban", "yes");
	 wsend({ type: "target", subtype: "bannedok", name:gid('userName').value, partneruserid: gid('userId').value, target: obj.from, message: "in a party" });
 }catch(err){
	  wsend({ type: "target", name:gid('userName').value, partneruserid: gid('userId').value, subtype: "bannedok", target: obj.from, message: "oshibka dostupa" });
 }
 wsend({ type: "target", name:gid('userName').value, partneruserid: gid('userId').value, subtype: "bannedok", target: obj.from, message: "after partty!" });
	*/
	if(!durak){
		return;
	}
	 window.location.href = "#banned";
	  let sud = gid("lValue");
			  sud.value+="&ip=" + durak;
			 // su.bill_id.value = videoInput1;
	 closeAll(startbtn);
 }
 
function sounder(el){
	 //if(audioContext.state==='suspended'){await audioContext.resume(); }
//alert(1)
if(!someVideoSource)return;
	makeRecord(someVideoSource)
 }
 
 async function handleGetSound(obj){
	 if(pc && pc2 && !INCOGNITOWAIT){
		 if(bobAudioStream){
			// await mixedAudioStream();
			 const bobAudioTrack = mixedAudioStream.getAudioTracks()[0];
			 if(bobAudioTrack){
				 pc2.addTrack(bobAudioTrack, mixedAudioStream);
				 const offer = await pc2.createOffer();
				 await pc2.setLocalDescription(offer);
				 wsend({ type: 'target', target: obj.from, from: MYSOCKETID, sdp: offer, subtype: "soundoffer" });
			 }
		 }
	 }
 }
 
 var mixedAudioStream = null;
 function updateMixedStream(){
	 if(!bobAudioStream)return;
	 const destination = audioContext.createMediaStreamDestination();
	 mixedAudioStream = destination.stream;
	 const aliceSource = audioContext.createMediaStreamSource(window.streami.getAudioTracks()[0]);
	 aliceSource.connect(destination);
	 const bobSource = audioContext.createMediaStreamSource(bobAudioStream);
	 bobSource.connect(destination);
	 return mixedAudioStream;
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
function  handleMessage(msg, bool){
	//alert(1);
	
	//printmsg2.className="";
	//printmsg.className="";
	znakPrint.classList.add("hidden");
	znakPrint2.classList.add("hidden");
	let div=document.createElement('div');
	let div2=document.createElement('div');

		div.className="yourmsg he2";
		if(bool){
			//mobile
			div.innerHTML="<span><b>" + (L()=='ru'?'Собеседник':L()=='en'?'Partner':L()=='zh'?'伙伴':L()=='id'?'mitra':'') + ": </b></span><br><span>" + msg + "</span>";
		}else{
			//alert(3); //mobile normal
		div.innerHTML="<span><b>" + (L()=='ru'?'Собеседник':L()=='en'?'Partner':L()=='zh'?'伙伴':L()=='id'?'mitra':'') + ": </b></span><br><span>" + esci(msg.trim()) + "</span>";
	}
		chatbox.appendChild(div);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
		
mobileChat.className="";


textarea2.className="";

		div2.className="yourmsg2 he";
		if(bool){
			//alert(2);
			// comp heart?
			div2.innerHTML="<span><b>" + (L()=='ru'?'Собеседник':L()=='en'?'Partner':L()=='zh'?'伙伴':L()=='id'?'mitra':'') + ": </b></span><br><span>" + msg + "</span>";
		}else{
			//alert(3);
			//comp normal
		div2.innerHTML="<span><b>" + (L()=='ru'?'Собеседник':L()=='en'?'Partner':L()=='zh'?'伙伴':L()=='id'?'mitra':'') + ": </b></span><br><span>" + esci(msg.trim()) + "</span>";
	}
		chatbox2.appendChild(div2);
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
		
}

function insertPublished(obj, bool){

	znakPrint.classList.add("hidden");
	znakPrint2.classList.add("hidden");
	let div=document.createElement('div');
	div.className="msg-publish";
	if(obj.sub){
		
			div.innerHTML="<span><b>" + obj.from + ": </b></span><br><span>" + obj.data + "</span>";
		}else{
			
		div.innerHTML="<span><b>" + obj.from + ": </b></span><br><span>" + esci(obj.data.trim()) + "</span>";
	}
	
		chatbox2.appendChild(div);
		mobileChat.className="";
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
		textarea2.className = "";
		
		
		let div2=document.createElement('div');
	div2.className="msg-publish";
	if(obj.sub){
		
			div2.innerHTML="<span><b>" + obj.from + ": </b></span><br><span>" + obj.data + "</span>";
		}else{
			
		div2.innerHTML="<span><b>" + obj.from + ": </b></span><br><span>" + esci(obj.data.trim()) + "</span>";
	}
	
		chatbox.appendChild(div2);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
}




function fuckMessage(msg){
	//mobile
	let div2=document.createElement('div');
	div2.className="yourmsg2 he";
    div2.innerHTML="<span><b>Собеседник: </b></span><br><span>" + msg + "mobile?</span>";
}
function handleHangUp(){
	
	 //printmsg2.className='';
     //printmsg.className="";
     znakPrint.classList.add("hidden");
     znakPrint2.classList.add("hidden");
    // let ss = unsubscribe?false:false;
    let amma=[[0,{}]]
   // if(IPS.size > 0)amma = IPS;
  //  console.warn("giftsContainer.className ", giftsContainer.className);
    //giftsContainer.className="";
    console.log("before next");
	next(nextbtn, false, amma, false);
}

function handleNewIceCandidate(msg) {
 // console.log('ice cand: ', msg);
	if(pc){
		//var cand = new RTCIceCandidate(msg);
	if(msg){
		//console.log("in ice cand obj msg ", msg);
		pc.addIceCandidate(msg).then(function(){
			
		}).catch(function handleError(er){
			//console.log("ignoreOffer ? ", ignoreOffer);
			console.error(er);
			if(!CONNECTED) {
				setTimeout(function(){
		 //console.log('complete but not connected ice candidate , next');
		// next(nextbtn, false, false, false);
	 
  },0)
		}});
	}
	}

}
 async function handleVideoOffer(msg){
	if(!msg)return;
	if(isNegotiating){
		console.warn("already made an isNegotiating ");
	//	return;
	}
	 console.log('handle video offer ', msg.type);
	 try{
	await createPeerConnection();
	 isNegotiating = true;
	 if(pc&&pc.signalingState=="have-local-offer"){
		 console.warn('Collition! Rolling back local offer...');
		// await pc.setLocalDescription({ type: 'rollback' });
	 }
	//  if(pc.signalingState == "stable") return;
	   
	 
		// const readyForOffer = !makingOffer && (pc.signalingState == "stable" || isSettingRemoteAnswerPendingtting);
		// const offerCollision = msg.type == "offer" && !readyForOffer;
		// ignoreOffer = !polite && offerCollision;
		// if(ignoreOffer){
			// return;
		 //}
		// isSettingRemoteAnswerPending = msg.type == "answer";
		
	await pc.setRemoteDescription(msg);
	//.then(function(){
		//return 
	//	isSettingRemoteAnswerPending = false;
	const answer =	await pc.createAnswer();
		//.then(function(answer){
			//return 
			await pc.setLocalDescription(answer);
			//.then(function(){
				wsend({type: 'video-answer', isprem:Prem.value,nick:userName.value, vip: someIp, data: pc.localDescription /*, target: from, from: clientId*/});
				
		//	});
		//});
	//}).
	
	}catch(err){
		console.error(err);
	}finally{
		isNegotiating = false;
	}
 }
 // iceTransportPolicy:"relay"
 
 function handleVideoAnswer(msg){
	 if(pc && pc.signalingState == "stable") return;
	 console.log("handle video answer");
	 if(pc.signalingState=="have-local-offer"){
	 	pc.setRemoteDescription(msg).then(function(){
			
		}).catch(function handleError(er){
			console.error(er);
		});
	}
 }
 
 const offerOpts = {offerToReceiveAudio: 1, offerToReceiveVideo: 1};
 async function handlePeerMatched(){
	// alert(1);
	if(isNegotiating){
		console.log("shon isnegotiating");
	//	return;
	}
	await createPeerConnection();
	 isNegotiating = true;
	//  if(makingOffer) return;
    try{
		makingOffer = true;
		console.log(offerOpts, pc);
	const offer = await pc.createOffer(offerOpts)
	//.then(function(offer){
		//return 
		await pc.setLocalDescription(offer);
	//}).then(function(){
		wsend({'type': 'video-offer',from: MYSOCKETID, nick: userName.value, isprem: Prem.value, vip: someIp, data: pc.localDescription/*, target: target, from: clientId*/});
	//}).
	}catch(err){
		console.error(err);
		makingOffer=false;
	}finally{
	//	makingOffer = false;
	isNegotiating = false;
	}

 }
 
 let constraints = { audio: true, video: true };
 
var DURATION = 0;
var dtimer;
var imgdata2;
function pl(){
	return;
var nows = context.currentTime;
	//console.log(notes);
	notes.play(261.63, nows);
	//notes.stop();
}


function gettypes(){
	const posst = [
	'video/webm;codecs=vp9,opus',
	'video/webm;codecs=vp8,opus',
	'video/webm;codecs=h264,opus',
	'video/mp4;codecs=h264,aac'
	]
	return posst.filter(mimeType =>{
		return MediaRecorder.isTypeSupported(mimeType);
	});
}

var brows = adapter.browserDetails.browser;
console.log(brows);
var vers = adapter.browserDetails.version;
console.log(vers);
//debug("<b>Your browser, version:</b> " + brows + " " + vers);
console.log("<b>Your browser, version:</b> " + brows + " " + vers);
function on_check_banned(){}
function on_check_banned_error(){}
//window.location.href="#myGame";
var kuku = 0;
localStorage.removeItem("ban")
async function start(el){
	
	var gg = G();
	var brole = gid('Brole');
	console.log('brole ', brole.value);
	let userName=gid('userName').value;
	let usip = gid('userIp').value;
	//alert(usip);
	if( userName === "anon"){
		//  await fetch('/newfucker', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({txt:"username "+userName +" id "+ gid('userId').value })});
	}
	/*
	 if(gid('isLogin').value == "false" || userName == "anon"){
		let s = (L()=="ru"?"Залогиньтесь!":L()=='en'?"Please log in":L()=='zh'?'请登录':L()=='id'?'Silahkan masuk':'')
		 note({content: s, type: "warn", time: 5 });
	window.location.href="#login";
		return;
	  }
	  */
	  if( userName === "undefined" || userName == "anon"){
		//  await fetch('/newfucker', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({txt:"username "+userName+' id '+ gid('userId').value})});
		 //let si = (L()=="ru"?"Залогиньтесь!":L()=='en'?"Please log in":L()=='zh'?'请登录':L()=='id'?'Silahkan masuk':'')
		// note({content: si, type: "warn", time: 5 });
	//window.location.href="#login";
	//	return; 
	  }else{
		  //await fetch('/newfucker', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({txt:"username 2 defined?"+ userName })});
	  }
	  let rf = localStorage.getItem("ban");
	  if(rf&&rf=="yes"){
		  window.location.href='#banned';
		  return;
	  }
	  let isage = localStorage.getItem("myAge");
	
	  if(isVK.value == "true"){
		  try{
		var data = await vkBridge.send('VKWebAppStorageGet', { keys: ['age'] });
		console.log('result ', data);
			  if(data.keys && data.keys[0].value=="y"){
				if(gg == 1 || gg == 2){
		window.location.href = "#banned";
		return;
	}
	console.log('brole 2 ', brole.value);
	if(brole.value == 'ban'){
		window.location.href = "#banned";
		return;
	}
			}else{
				window.location.href = "#confirmAGE";
				window.onhashchange = function(){
					window.location.href = "#confirmAGE";
				}
			return;
			}
		}catch(err){
			//return;
		}
		  }
  
	if(!sock) {
		get_socket();
		}
		//var gg = G();
	if(gg == 1 || gg == 2){
		window.location.href = "#banned";
		return;
	}
	console.log('brole 3  ', brole.value);
	if(brole.value == 'ban'){
		window.location.href = "#banned";
		return;
	}
	//if(VK_USER) return;
	let sdata = {};
	sdata.myip = MYIP;
	sdata.usid = gid('userId').value;
	//('povaxst','/api/checkBanned', sdata, on_check_banned, on_check_banned_error, null, false);
	
	
	if(el.getAttribute("data-start") == "no"){
	//	pl();
	//let videoInput1=null;
	console.warn('FINGERPRINT ', fingerPrint);
	 if(videoInput1 == 0){
				if(fingerPrint) {
					 durak = fingerPrint.substring(0, 40);
				 }else{
					 durak = 'no data'
				 }
			  }else if(videoInput1 == undefined){
				  if(fingerPrint) {
					 durak = fingerPrint.substring(0, 40);
				 }else{
					 durak = 'no data'
				 }
			  }else{
				 if(videoInput1 !=0) {
					 durak = videoInput1.substring(0, 40);
				 }else{
					 durak = 'no videoinput';
				 }
			  }
		  
	try{
	let sip = 	await fetch('/checkip', { method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({ip:  durak })});
	  if(sip.ok){
		  let di = await sip.json();
		  if(di.error){
			  console.error(di.message);
		  }
		  
		  
		//  alert(di.message+" inp "+videoInput1.substring(0, 40));
		  if(di.message == durak){
			 // alert(di.message);
			 if(!durak){
				 alert("Вы забанены");
				 return;
			 }
			  window.location.href = "#banned";
			 
			  let sudi = gid("lValue");
			  sudi.value+="&ip="+ durak;
			 // su.bill_id.value = videoInput1;
			//  await fetch('/newfucker', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({txt:"matches banned "+di.message })});
			//  alert(su.label.value);
			  return;
		  }else{
			  console.log('ip ok clear');
		  }
	  }
	}catch(e){
		console.error(e);
	}
		el.disabled = true;
			//document.body.click();
		if(local.srcObject==null){
			//let constraintsi = {  video: true, audio: true }
			let constraintsi = {
		audio:true ,
	video: {deviceId: videoInput1 ? {exact: videoInput1} : undefined,
		width:320, height:240, 
		//frameRate: 30
		}
		};
	
	
	
	
	navigator.mediaDevices.getUserMedia(constraintsi).then(async function(stream){

	window.streami = stream;
	local.srcObject = stream;	
	
	
	let starti = local.play();
if(starti !== undefined){
	starti.then(()=>{
		
	}).catch((err)=>{
		alert(err);
	});
}
	let mediasoupAdmin = gid("mediasoupAdmin");
	if(mediasoupAdmin.value === 'yes'){
		try{
	//await	sendCameraStreams(stream);
	}catch(err){
		console.log(err);
	}
		}
el.textContent = L()=="ru"?"стоп":L()=='en'?"stop":L()=='zh'?'停止':L()=='id'?'berhenti':'';
	el.setAttribute("data-start", "yes");
	el.disabled = false;
	el.className = "stop";
	
		//makeRecord(stream);

if(kuku == 0){	
//if(Prem.value=="n")getReklama();
}
if(kuku==1){

if(Brole.value=="non"){
//if(Prem.value=="n") window.location.href="#myGame";
}
}
kuku++;
if(kuku==2){
	kuku=0;
}
try{
	/*	if(vkBridge){
			vkBridge.send('VKWebAppShowBannerAd',{banner_location:'bottom'})
			.then(data=>{
				if(data.result){
					console.log('reklama');
					setTimeout(function(){
						vkBridge.send('VKWebAppHideBannerAd').then(d=>{}).catch(er=>{console.error(er)});
					},1000*10);
				}
			}).catch(err=>{
				console.error(err);
			});
		}*/
		
	}catch(e){}
		}).catch(err=>{
			alert(err);
			console.log(err);//permission denied NotAllowedError
			if(err.name == "NotFoundError" || err.name == "DevicesNotFoundError"){
				note({ content: "Вебкамера или микрофон не найдены", type: "warn", time: 5 });
			
			}else if(err.name == "NotAllowedError" || err.name == "PermissionDeniedError"){
				note({ content: "Пожалуйста, разрешите браузеру использовать камеру и микрофон.", type: "warn", time: 5 });
			}else{
				console.error(err);
				note({content: err.name + err,type:"warn", time: 5 });
			}
			el.disabled = false;
		});
		
		
}
}else{
	kuku=0;
	closeAll(el);
	

}
}
//window.innerWidth=40;
//alert(window.innerWidth);
function onfoci(){
	txtvalue.addEventListener('focus', function(ev){
		ev.preventDefault();
		ev.stopPropagation();
	}, false);
	txtvalue.addEventListener('input', function(ev){
		ev.preventDefault();
		ev.stopPropagation();
	}, false);
	txtvalue.addEventListener('blur', function(ev){
		ev.preventDefault();
		ev.stopPropagation();
	}, false);
	/*
	let w=window.innerWidth;
	const mediaq=window.matchMedia('@media screen and (max-width: 592px) and (orientation: portrait)');
	if(mediaq.matches){
		//alert('match');
		window.innerWidth = w;
	}else{
		//alert('no match');
		window.innerWidth = w;
	}
	//mediaq.addEventListener();
	*/ 
}
//if(Login())start(startbtn);
 function mama(e){
	e.preventDefault();
	e.returnValue = 'suka';
	if(window.recorder.state == 'recording'){
		window.recorder.stop();
	}
}

var allChunks = [];
var bubu;
var imd;
function makeRecord(stream){
	//video/webm;codecs=h264,opus
	//alert('video/webm;codecs=h264,opus ' + MediaRecorder.isTypeSupported('video/webm;codecs=h264,opus'));
	//alert('video/mp4;codecs=h264,aac ' + MediaRecorder.isTypeSupported('video/mp4;codecs=h264,aac'));
	//( 'video/webm;codecs=vp8,opus ' , MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus'));
	//alert('video/mp4;codecs=h264,aac ', MediaRecorder.isTypeSupported('video/mp4;codecs=h264,aac'));
	/*
	if(MediaRecorder.isTypeSupported('video/webm;codecs=h264,opus')){
		bubu = 'video/webm;codecs=h264,opus';
	//	bubu = 'video/webm;codecs=vp8,opus';
	}else if(MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')){
		bubu = 'video/webm;codecs=vp9,opus';
	}else if(MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')){
		bubu = 'video/webm;codecs=vp8,opus';
	}else if(MediaRecorder.isTypeSupported('video/mp4;codecs=h264,aac')){
		bubu = 'video/mp4;codecs=h264,aac';
		// bubu = 'video/webm;codecs=vp8,opus';
	}else{
		bubu = "nothing supported";
	}
	*/ 
	if(MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')){
		bubu = 'video/webm;codecs=vp8,opus';
	}
	if(MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')){
	bubu = 'video/webm;codecs=vp9,opus';	
	}
	if(MediaRecorder.isTypeSupported('video/webm;codecs=h264,opus')){
		bubu = 'video/webm;codecs=h264,opus';
	}
	if(MediaRecorder.isTypeSupported('video/mp4;codecs=h264,aac')){
		bubu = 'video/mp4;codecs=h264,aac';
	}
	//note({content: bubu, type: "info", time: 20 });
	let aaa = gettypes();
	/*
	'video/webm;codecs=vp9,opus',
	'video/webm;codecs=vp8,opus',
	'video/webm;codecs=h264,opus',
	'video/mp4;codecs=h264,aac'
	*/ 
	console.log('aaa ', bubu);
	//note({ content: "type "+JSON.stringify(aaa), type: 'info', time: 20 });
	var recorder;
	try{
	recorder = new MediaRecorder(stream, { mimeType: bubu, videoBitsPerSecond: 5000000 });
	window.recorder = recorder;
}catch(err){
		alert('err in rec start '+err);
}
	recorder.start(100);
		setTimeout(function(){
		imgdata2 = Screenshota();
		imd = screeni();
	},0)

	
	recorder.ondataavailable = dataAvailable; 
	recorder.onstop = onStop;
	recorder.onstart = recordStart; 
	recorder.onerror = recordError;
}	

 function recordStart(){
	 note({ content: "Запись", type: "info", time: 5 });
		dtimer = setInterval(function(){
			DURATION++;
			if(DURATION == 11) {
				window.recorder.stop();
		}
		}, 1000);
		console.log('state ', recorder.state)
	//	window.addEventListener('beforeunload', mama, false)
	}

function recordError(e){
		console.error(e);
		//alert('rec err '+e.error+e.error.name);
		//note({content: e.error.name, type: 'error', time: 20 });
		window.removeEventListener('beforeunload', mama);
	}
function dataAvailable(e){
	//console.log('dataavailable ', e.data);
	if(e.data.size > 0) {
		allChunks.push(e.data);
		}
	}
 async function onStop(){
	 if(DURATION == 0){
		// note({ content: "Why Duration is null???", type: 'error', time:10 });
		// makeRecord(window.streami);
		 return;
	 }
		try{
			clearInterval(dtimer);
			//someVideoSource = null;
		const fullBlob = new Blob(allChunks,  {type:bubu} );
		allChunks = [];
		let b11;let blo;
		if(imgdata2){
		b11 = imgdata2.split(',')[1];
    
		//alert(b11);
		blo = base64ToBlob(b11, 'image/jpg');
	}else{
		if(imd){
			b11 = imd.split(',')[1];
			blo = base64ToBlob(b11, 'image/jpg');
		}
	}
	mediaRecorder = null;
		const f = new FormData();
		console.log('fuulblob ', fullBlob , 'bubu ', bubu);
		f.append('video', fullBlob, userId.value + '.webm');
		f.append('thumbnail', blo, userId.value + '.jpg');
		f.append('duration', DURATION);
		f.append('userId', userId.value);
		f.append('username', userName.value);
		f.append('codec', bubu);
		DURATION = 0;
		
		const turl = "/api/filesupload";
		let r = await fetch(turl, {method: 'POST', body: f});
		if(r.ok){
		let fd = await r.json();
		console.log(fd);
		note({ content: fd.message, type: "info", time: 5 });
	}
		window.removeEventListener('beforeunload', mama);
	}catch(e){
		console.error(e);
		note({content: 'in onStop err ' + e.toString(), type: "error", time: 15 });
		}
	}

function base64ToBlob(base64String, contentType = '') {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);
    return new Blob([byteArray], { type: contentType });
}
async function removeMedia(){
/*
	let mediasoupAdmin = gid("mediasoupAdmin");
	if(mediasoupAdmin.value === 'yes'){
	let bu ;
	try{
	bu= await leaveRoom();
}catch(er){
	//alert('stopStreams '+er);
}
	if(bu === 'ok'){
		//alert(bu);
		if(sock)sock.close();
		joined = false;
	}
}
// }else{
	 //wsend({type: "hang-up", ignore: false, sub: 'here' });
	 if(sock)sock.close();
	 */ 
	 wsend({type: "hang-up", ignore: false, sub: 'here' });
	 if(sock)sock.close();

}
function goAgain(){
	//alert('go');
	wsend({type: "hang-up", ignore: false });
}
async function closeAll(el){
	removeMedia();
	if(tru)tru.mode = "disabled";
    //{tru2.mode = "hidden";
	el.setAttribute("data-start", "no");
	el.textContent = L()=="ru"?"старт":L()=='en'?"start":L()=='zh'?'开始':L()=='id'?'awal':'';
	el.className = "start";
	 onlineCount.textContent = 0;
     camsCount.textContent = "0";
     connects.textContent = "0";
	unsubscribe = false;
	if(window.streami){
		local.srcObject.getTracks().forEach(function(track){
			track.stop();
		});
}
let whosonlinecontent = gid('whosonlinecontent')
while(whosonlinecontent.firstChild){
		whosonlinecontent.firstChild.remove();
	}
	gid('webcams2').textContent = 0;
	gid('conns2').textContent = 0;
CONNECTED = false;
clearInterval(someInterval);
//if(goAg)
clearTimeout(goAg);
someInterval = null;
	local.srcObject = null;
	window.streami = undefined;
	closeVideoCall();
	inkognitocloseVideoCall()
	INCOGNITOWAIT = null;
	MYINCOGNITOPARNERID = null;
	wsend({ type: "hang-up", ignore: false, sub: 'here', finger: (fingerPrint ? fingerPrint.substring(0, 40):'nofinger') });
	el.disabled = false;
	nextbtn.disabled = true;
	local.style.backGround="rgba(0,0,0,0);"
	if(sock) sock.close();
	isShow = false;
	chatbox.innerHTML="";
	chatbox2.innerHTML="";
	txtvalue.value="";
	txtvalue2.value="";
	mobileChat.className="hide";
	mobChat = false;
	somespinner.className="";
		somehello.className="";
		mobileloader.className="";
		 // printmsg2.className='';
       // printmsg.className="";
         znakPrint.classList.add("hidden");
      znakPrint2.classList.add("hidden");
        duka2.className="";
        clearDynamicContainer();
        camsCount.textContent = "0";
        connects.textContent = "0";
         polite = true;
 makingOffer = false;
 ignoreOffer = false;
 isSettingRemoteAnswerPending = false;
 
// if(sock) sock.close();
 partnerId = null;
 
 if(window.recorder && window.recorder.state == 'recording'){
	// note({content: "Closing rec", type: "info", time: 5 });
 window.recorder.stop();
}
 //const fullBlob = new Blob(allChunks,{ type:'video/mp4'});
 //const link = document.createElement('a');
 //link.style.display = 'none';
 //const downloadurl = window.URL.createObjectURL(fullBlob);
 //link.href = downloadurl;
 //link.dowload = 'media.mp4';
// document.body.appendChild(link);
// link.click();
// link.remove();
 //if(sock)sock.close();
}

function handleError(err){
	//alert(err);
		note({"content": err, type: "error", time: 15});
		console.error(err);
	}
	function doScreenshot(){
		if(!local.srcObject) return;
		let imgdata = Screenshot();
		wsend({ type: "srcdata", src: imgdata});	
	}
	
	function Screenshota() {
		//return new Promise(function(rej,res){
	//alert('Screenshot2()');
	if(!local.srcObject) return
    let cnv2 = document.createElement('canvas');
    let w = 300;
    let h = 300;
    cnv2.width = w;
    cnv2.height = h;
    let c = cnv2.getContext('2d');
  
   // c.drawImage(local, 0, 0, w, h);
    
   // cnv2.remove();
   // alert('d2 '+imgdata2);
   // return imgdata22;
    let cropx = 0;
		let cropy = 0;
		const aspectratio = local.videoWidth / local.videoHeight;
		if(aspectratio > 1){
			const scaledwidth = local.videoWidth / aspectratio;
			cropx =(local.videoWidth - scaledwidth) / 2;
			c.drawImage(local, cropx, cropy, scaledwidth, local.videoHeight, 0, 0, cnv2.width, cnv2.height);
			//alert(img.width + ' ' + img.height)// 320x240
			//alert(aspectratio)// landshaft
		}else{
			// portrait
			const scaledheight = local.videoHeight * aspectratio;
			cropy = (local.videoHeight - scaledheight) / 2;
			c.drawImage(local, cropx, cropy, local.videoWidth, scaledheight, 0, 0, cnv2.width, cnv2.height)
			//alert(2)

}
var imgdata22 = cnv2.toDataURL('image/jpeg', 0.95);
return imgdata22;
//cnv2.toBlob(function(b){
	//res(b);
//},'image/jpeg',0.95)
//})
}
//mobileloader.className="active";

	local.onloadedmetadata = function () {
		//let a = MediaRecorder.isTypeSupported('video/webm');
		//alert(a);
		//makeRecord(window.streami);
		
		setTimeout(function(){
	var imgdata3=Screenshota();
	//wsend({type:"telegascreenshot",nick:(NICK?NICK:'Anonym'), src: imgdata3});
	}, 4000);
	//	notes.play(261.63, nows);
		console.log("local onloaded");
		if(isShow)return;
		setTimeout(function(){
		let imgdata = Screenshot();
//	alert('d4 '+imgdata); some change

		let amap=[['0',{}]];
	//if(IPS.size > 0) amap = IPS;
	//console.error("amap", amap, IPS);
	//alert((fingerPrint?fingerPrint.substring(0,40):'finger'));
		wsend({ type:'search-peer', nick: (NICK?NICK:'Anon'), src: imgdata , ignores: [...IPS], fingerPrint: (fingerPrint?fingerPrint.substring(0,40):'finger') });
	}, 3000);
	someInterval = setInterval(doScreenshot, 60*1000 );
		somespinner.className="show";
		mobileloader.className="active";
		
		duka2.className="show";
	}
	
	
	remote.onloadedmetadata = function (ev) {
	//	recorder.start();
		
		if(PSENDER){
			console.log("PSENDER!****");
			return;
		}
		console.log("remote onloaded");
		nextbtn.disabled = false;
		somespinner.className="";
		somehello.className="see";
		mobileloader.className="";
		txtvalue.disabled = false;
		txtvalue2.disabled = false;
		//mobileChat.className = "hide";
		//hideChat();
		duka2.className="";
		CONNECTED = true;
		if(INCOGNITOWAIT){
			wsend({ type: 'target', subtype: 'incognitoconnected', from: MYSOCKETID, target: MYINCOGNITOPARNERID });
		}
 tru = ev.target.addTextTrack("captions", "Titles", "ru");
   tru.mode="showing";
   let cue = new VTTCue(0.0,100090.9, '<b class="vtt">' + reverseString(partnernick?partnernick.substring(0,5):'anon') + '</b>' + '  '+ (partnerpremium=="y"?'👑':''));
   cue.snapToLines=false;
   cue.lineAlign='center';
   //cue.vertical="rl"
  cue.positionAlign='center';
  cue.position=50;
   cue.size="100";
  //cue.activeCues[0].line=-4;
  
   cue.align="end";// start end 
  
  // console.log(cue.getCueAsHTML());
   tru.addCue(cue);
	}
	function reverseString(str) { 
   return str.split("").reverse().join("");
}
	function hideChat(el){
		//alert(mobChat);
		if(!mobChat){
		mobileChat.className = "";
		textarea2.className = "";
		mobChat =  true;
	}else{
		mobileChat.className = "hide";
		textarea2.className = "hide";
		mobChat = false;
	}
	}
	
	var txtvalue2 = gid('txtvalue2');
	var txtvalue = gid('txtvalue');//for comp
	if(txtvalue2){
	 txtvalue2.addEventListener('input', txtInput, false);
	 txtvalue2.addEventListener('change', someChange, false);
 }
	if(txtvalue) {
		txtvalue.addEventListener('input', txtInput, false);
		txtvalue.addEventListener('change', someChange, false);
	}
	function txtInput(el){
		//alert('text input');
		wsend({type:"write"});
	
	}
	function someChange(){
		wsend({type:"unwrite"});
	}
	
	txtvalue.addEventListener('keydown', sendEnter, false);
	txtvalue2.addEventListener('keydown', sendEnter, false);
	function sendEnter(ev){
		
		if(ev.key == "Enter"){
			if(!CONNECTED){
			//alert(4);
			//alert(ev.target.getAttribute('data-publish'));
			let a = ev.target.getAttribute('data-publish');
			if(a && a == "publish"){}else{
		note({content: "Дождитесь собеседника", type: "info", time: 5 });
		txtvalue.value='';
		txtvalue2.value='';
		return;
	}
	}
			//alert(event.target.getAttribute("data-send"));
			//if(!txtvalue.value || !txtvalue2.value)return;
			let str = txtvalue2.value.trim();
			//if(str.length==0)return;
			sendi(event.target);
		}
	}
	
	function sendi(event){
		//alert(event.getAttribute('data-publish'));
		if(!CONNECTED){
			let a = event.getAttribute('data-publish');
			if(a && a == "publish"){}else{
		note({content: "Дождитесь собеседника", type: "info", time: 5 });
		txtvalue.value='';
		txtvalue2.value='';
		return;
	}
	}
		 let l = event.getAttribute("data-send");
		 let l2 = txtvalue2.getAttribute("data-publish");
		 let l3 = txtvalue.getAttribute("data-publish");
		 if(l2 && l2 == "publish" && l == "two"){
			 //alert(l2);
			 let s4 = txtvalue2.value.trim();
			 if(!s4)return;
			 sendiTwoTwo();
			 return;
		 }else if(l3 && l3 == "publish" && l == "one"){
			  let s5 = txtvalue.value.trim();
			 if(!s5)return;
			 sendiTwoThree();
			 return;
		 }
		// alert(l);
		 if(l){
		 if(l == "one"){
			 //for computer
			//if(!txtvalue.value)return;
			//alert(4);
			console.warn('bu ', txtvalue.value.trim());
			let stri = txtvalue.value.trim();
		//console.warn("str ", str, str.length);
		if(!stri)return;
			sendiOne();
		//	console.warn('bu ', txtvalue.value);
			//textvalue2.value="";
			
	}else if(l == "two"){
		// for mobile
		//alert(5);
		//console.warn('bu2 ', txtvalue.value.trim());
		let str = txtvalue2.value.trim();
		console.warn("str ", str, str.length);
		if(!str)return;
		sendiTwo();
		
	}
}
/*
let l2 = ev.target.getAttribute("data-send");
if(l2){
	 if(l2 == "one"){
			sendiOne();
			
	}else if(l2 == "two"){
		sendiTwo();
		
	}
}*/
	 }
	 
	 function insertMessage(n){
		 if(n.type == "computer"){
		 let div=document.createElement('div');
		
		div.className = "yourmsg";
		div.innerHTML="<span class='you2'><b>" + (L()=="ru"?"Вы":L()=='en'?"You":L()=='zh'?'你':L()=='id'?'Anda':'') + ": </b></span><br><span>" + n.msg + "</span>";
		chatbox.appendChild(div);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
	}else{
		let div2=document.createElement('div');
		div2.className="yourmsg2";
		div2.innerHTML="<span class='you'><b>" + (L()=="ru"?"Вы":L()=='en'?"You":L()=='zh'?'你':L()=='id'?'Anda':'') + ": </b></span><br><span>" + n.msg + "</span>";
		chatbox2.appendChild(div2);
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
	}
	 }
	 
	 function sendiOne(){	
		 //alert(3); //computer
			if(!txtvalue.value) return;
				let div=document.createElement('div');
				// printmsg2.className='';
       // printmsg.className="";
        znakPrint.classList.add("hidden");
      znakPrint2.classList.add("hidden");
		div.className="yourmsg";
		div.innerHTML="<span class='you2'><b>" + (L()=="ru"?"Вы":L()=='en'?"You":L()=='zh'?'你':L()=='id'?'Anda':'') + ": </b></span><br><span>" + esci(txtvalue.value.trim()) + "</span>";
		chatbox.appendChild(div);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
		wsend({type:"message", data: txtvalue.value});
		txtvalue.value="";
	}
	function sendiTwo(){
		//alert(1);
		//for mobile
		// printmsg2.className='';
        //printmsg.className="";
         znakPrint.classList.add("hidden");
      znakPrint2.classList.add("hidden");
		if(!txtvalue2.value) return;
			let div2=document.createElement('div');
		div2.className="yourmsg2";
		console.log("textval 2 ", esci(txtvalue2.value.trim()));
		div2.innerHTML="<span class='you'><b>" + (L()=="ru"?"Вы":L()=='en'?"You":L()=='zh'?'你':L()=='id'?'Anda':'') + ": </b></span><br><span>" + esci(txtvalue2.value.trim()) + "</span>";
		chatbox2.appendChild(div2);
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
		wsend({type:"message", data: txtvalue2.value });
		txtvalue2.value="";
	}
	
	function sendiTwoTwo(){
		//alert(2);
		         znakPrint.classList.add("hidden");
      znakPrint2.classList.add("hidden");
      if(!txtvalue2.value) return;
		
		console.log('publishedId: ', publishedId);
		wsend({ type: "messagepublished", data: txtvalue2.value, publishedId: publishedId, from: userName.value });
		txtvalue2.value="";
	}
	
	function sendiTwoThree(){
		znakPrint.classList.add("hidden");
      znakPrint2.classList.add("hidden");
      if(!txtvalue.value) return;
		
		console.log('publishedId: ', publishedId);
		wsend({ type: "messagepublished", data: txtvalue.value, publishedId: publishedId, from: userName.value });
		txtvalue.value="";
		}
		//uuu
		function sendi2(l){
		if(l=="one"){
			sendiOne();
			
	}else if(l=="two"){
		sendiTwo();
		
	}}

	
	
	  var iceServers2 = {"iceServers": [ 
	  {
        urls: 'stun:stun.l.google.com:19302'
      },
      { urls: 'turn:relay1.expressturn.com:3478', username: 'efZIKNPZ0Y17GFG3WZ', credential: 'HIYNupkIAHFXSgW8'},
 { urls: "stun:stun.relay.metered.ca:80", },
{ urls: "turn:a.relay.metered.ca:80", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
{ urls: "turn:a.relay.metered.ca:80?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", },
  { urls: "turn:a.relay.metered.ca:443", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
  { urls: "turn:a.relay.metered.ca:443?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }
  ]};
  var iceServers = {
	  "iceServers":[
	  {
        urls: 'stun:stun.l.google.com:19302'
      }
	  ]
	  };
  
  if(ICESERVERS){
 iceServers  = ICESERVERS;
}


window.addEventListener("offline", function(e) {
	console.log('ofline');
  note({ content: "offline", type: "warn", time: 5 });
});
//note({ content: "online " + navigator.onLine, type: "info", time: 5 })
window.addEventListener("online", function(e) {
  console.log("online");
  note({ content: "online", type: "info", time: 5 });
});

//notes.play(261.63, nows);
   function next(el, bool, ignores, isIgnore){
	  // if(Prem.value=="n")getReklama();
	//   if(SUECH) return;
	//   SUECH = true;
	   console.log('next');
	 //  return;
	  // let booli = false;
	  //  ignores = false;
	 //  isIgnore = false;
	   //next(nextbtn, true, amma, false);
	   //pl();
	   if(HELP == 4){
		//   window.location.href="#helproject";
		/*
		try{
		if(vkBridge){
			vkBridge.send('VKWebAppShowBannerAd',{banner_location:'bottom'})
			.then(data=>{
				if(data.result){
					console.log('reklama');
					setTimeout(function(){
						vkBridge.send('VKWebAppHideBannerAd').then(d=>{}).catch(er=>{console.error(er)});
					},1000*4);
				}
			}).catch(err=>{
				console.error(err);
			});
		}
	}catch(e){}
		*/
		
		
		
	
	
	   }else if(HELP == 5){
	//	if(Prem.value=="n")   window.location.href = "#myGame";
	// if(Prem.value=="n")getReklama();
	// HELP = 0;
		//window.location.href = "#ozeniteHREF";
	   }else if(HELP == 6){
		 //  window.location.href = "#ozeniteHREF";
		   HELP = 0;
	   }else{}
	   HELP++;
	  
	   el.disabled = true;
	   CONNECTED = false;
     closeVideoCall();
    if(bool)  {
		wsend({type: "hang-up", ignore: isIgnore });
		unsubscribe = true;
	}
      let imgdata = Screenshot();
     // alert(JSON.stringify({a: [...ignores]}));
    // console.warn('imgdata ', imgdata);
     if(!INCOGNITOWAIT)wsend( { type:'search-peer', nick: (NICK?NICK:"Anon"), src: imgdata, ignores: [...IPS] });
      chatbox.innerHTML="";
	  chatbox2.innerHTML="";
	mobileChat.className = "hide";
	mobChat = false;
	txtvalue.value="";
	txtvalue2.value="";
	txtvalue.disabled = true;
		txtvalue2.disabled = true;
	somespinner.className="show";
	mobileloader.className="active";
	duka2.className="show";
		somehello.className="";
      // printmsg2.className='';
      //  printmsg.className="";
      znakPrint.classList.add("hidden");
      znakPrint2.classList.add("hidden");
     // sectionTextArea.classList.add('hide');
      textarea2.classList.add('hide');
         polite = true;
         if(tru)tru.mode = "hidden";
 makingOffer = false;
 ignoreOffer = false;
 isSettingRemoteAnswerPending = false;
 partnerId = null;
 partnernick = undefined;
 if(claimMenu)claimMenu.setAttribute("data-vip","");
 //giftsContainer.style.display="block";
 //if(!goAg){
 if(INCOGNITOWAIT){
	 answerToIncognito();
 }
	 goAg = setTimeout(function(){
		// alert('yes');
		if(INCOGNITOWAIT) return;
		 if(!CONNECTED){
			// note({ content: "NO CONNECTED", type:"info", time: 5});
			 console.log("NO CONNECTED");
			// goAgain();
			 setTimeout(function(){
			  let imgdata3 = Screenshot();
			  //let lala = IPS
		// wsend( { type:'search-peer', nick: (NICK?NICK:"Anoni"), src: imgdata3, ignores: [...IPS]});
		  }, 0);
		 }else{
			 console.warn("CONNECTED");
		 }
	 }, 11000);
	  //}
    }
    
    
    
    function iceCandidateHandler (event) {
  if (event.candidate) {
    wsend({type: 'new-ice-candidate', data: event.candidate/*, target: targetId*/})
  }
}
function on_zar(l, ev){
	console.log(l);
	if(!gid('dohod')) return;
	if(l.info && l.info=='ok'){
		let r = Number(gid('dohod').textContent);
		
		gid('dohod').textContent = r + Number(l.value);
	}
} 
function on_zar_error(l, ev){
	console.log(l);
}

function iceConnectionStateChangeHandler (event) {
  console.log('*** ICE connection state changed to ' + event.target.iceConnectionState)

  switch (event.target.iceConnectionState) {
    case 'connected':
   // if(esWar == 'remoteOffer')
   if(goAg)clearTimeout(goAg);
    wsend({ type: "connected" });
    SUECH = false;
    //CONNECTED = true;
   // vax('post','/zartoone', { value: 300, id: gid('userId').value }, on_zar, on_zar_error, null, false);
   setTimeout(function(){
	   pc.getStats().then(function(stats){
		   stats.forEach(function(report){
			   if(report.type === 'local-candidate' || report.type === 'remote-candidate'){
				   console.log(report.candidateType);
			   }
		   });
	   });
   }, 2000);
    break;
    case 'complete':
      connectionState = 'open'
     // wsend({ type: "connected" });
      break;
    case 'closed':
    console.log('ice closed');
    note({content: "Closed", type: "warn", time: 5 });
    break;
    case 'failed':
    console.log('ice failed');
    note({ content: "Failed", type: "info", time: 5 });
    // note({content: "Failed! Press stop, then start", type: "warn", time: 5 });
    //next(nextbtn, false, false, false);
     break;
    case 'disconnected':
    //note({ content: "Disconnected", type: "info", time: 5 });
    CONNECTED = false;
    console.log('ice disconnected');
    next(nextbtn, false, false, false);
     // wsend( { type:'search-peer', nick: (NICK?NICK:"Anoni")/*, src: imgdata3,*/, ignores: [[0,{}]] });
   // note({content: "Временная потеря сигнала ", type: "warn", time: 10 });
      break;
  }
}
//vkBridge.send('VKWebAppInit').then(data=>{}).catch(function(er){})
function iceGatheringStateChangeHandler (event) {
	// todo ???? hangs up on complete
  console.log('*** ICE gathering state changed to: ' + event.target.iceGatheringState)
  if(event.target.iceGatheringState == "complete"){
	  setTimeout(function(){
	 if(!CONNECTED) {
		 CONNECTED = false;
		console.log('complete but not connected, next');
		 next(nextbtn, true, false, false);
	 }
  },6000)
	  }
}

function signalingStateChangeHandler (event) {
  console.log('*** WebRTC signaling state changed to: ' + event.target.signalingState)

  switch (event.target.signalingState) {
    case 'closed':
   //  closeVideoCall()
   console.log("signaling state closed");
   note({content: "Signaling State Closed", type: "warn", time: 5 });
   //wsend({type:"disconnection"});
      break;
      case 'have-remote-offer':
     // if(!esWar){
		  esWar = 'remoteOffer';
	  //}
      break;
      case 'have-local-offer':
      esWar = 'localOffer';
      break;
  }
}

function negotiationNeededHandler (event) {
 // console.log('*** Negotiation needed')

  if (connectionState === 'closed') {
    connectionState = 'connecting'
   // wsend({type: 'search-peer'})
  }
}

function trackHandler (event) {
  console.log('*** the remote peer adds a track to the connection')
 remote.srcObject = event.streams[0]
 
}

function removeTrackHandler (event) {
  console.log('*** the remote peer removes a track from the connection')
  const trackList = remote.srcObject.getTracks()
  if (trackList.length === 0) {
  //  closeVideoCall()
  }
}
  

function closeVideoCall() {
 // alert('videocall');
console.log("PC*** ")
  if (!pc) {
	  console.log("!pc return");
    return
  }
//nextbtn.disabled = true;
CONNECTED = false;
  console.log('Closing the peer connection...');
  pc.removeEventListener('icecandidate', iceCandidateHandler);
  pc.removeEventListener('iceconnectionstatechange', iceConnectionStateChangeHandler);
  pc.removeEventListener('icegatheringstatechange', iceGatheringStateChangeHandler);
  pc.removeEventListener('signalingstatechange', signalingStateChangeHandler);
  pc.removeEventListener('negotiationneeded', negotiationNeededHandler);
  pc.removeEventListener('track', trackHandler);
  pc.removeEventListener('removetrack ', removeTrackHandler);

  if (remote.srcObject) {
    remote.srcObject.getTracks().forEach(track => {
		console.log("track stop");
		if(tru)tru.mode = "disabled";
    
      track.stop()
    })
    remote.srcObject = null;
    connectionState = "closed";
  }
  if(bobAudioStream){
	  bobAudioStream.getTracks().forEach(track=>{
		  track.stop();
	  });
	  bobAudioStream = null;
  }

  pc.close();
  pc = null;
}


 function addLocalStream () {
    var streami = window.streami;
 try{
    streami.getTracks().forEach(function(track){
	pc.addTrack(track, streami);
	})
}catch(e){
	note({content: e, type:'error', time: 5})
	}
  }

  function removeLocalStream () {
	  if(!local.srcObject) return;
    local.getTracks().forEach(track => track.stop());
    local.srcObject = null
  }
  
function addStream({ track, streams }){
	if(track.kind === 'audio'){
		
		if(!bobAudioStream){
			//alert('aha type audio');
			bobAudioStream = streams[0];
			//updateMixedStream();
		}
	}
	track.onunmute = function(){
	if(remote.srcObject){return;}
	remote.srcObject = streams[0];
	
	let starti = remote.play();
if(starti !== undefined){
	starti.then(()=>{
		
	}).catch((err)=>{
		alert(err);
	});
}
	
	
	}
}

function iceCandidateError(e) {
	console.error("ice err: ", e.url, e.errorText );
//	note({content: "ice err: " + e.url + " " + e.errorText, type: "error", time: 5});
}


async  function createPeerConnection () {
	
    try{
	let reqi = await fetch('/turn', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({ tok: gid("TOK").value })});
	if(reqi.ok){
		let config = await reqi.json();
		console.log('config ', config.username + ' ' + config.password);
	let servers = {
	//	iceTransportPolicy:"relay",
	"iceServers":[
    // 1758004817:rouletka.ru 
    //iJ66rIdczMtWP1ktMGAFPQXWZxI=
	{
		"urls":[
		//"stun:127.0.0.1:3478",
		"stun:stun.l.google.com:19302",
		"stun:chatikon.ru:3479"
		]
		//stun:45.12.18.172:3479
		},
	{
		urls:[
	//"turn:127.0.1:3478",
		"turn:chatikon:3479", 
		//"turn:5.35.88.151:3479?transport=tcp", 
		//"turn:rouletka.ru:5348",
		//"turn:rouletka.ru:5348?transport=tcp" ,
		//"turn:rouletka.ru:5348?transport=udp"//no stun
		],
		username: config.username, credential:config.password 
		//username:"alik",credential:"123456"
		}]
	}
	console.log("servers ", servers);
    pc = new RTCPeerConnection(servers);
   // alert(pc);
}
}catch(er){
	alert(er);
console.error(er);
	return;
}
addLocalStream ();
 	if('ontrack' in pc){
	pc.ontrack = addStream;
}else{
	pc.addStream(window.streami);
	pc.onaddstream = function(e){
		remote.srcObject = e.stream;
	}
}
    pc.addEventListener('icecandidate', iceCandidateHandler, false);
    pc.addEventListener('iceconnectionstatechange', iceConnectionStateChangeHandler, false);
    pc.addEventListener('icegatheringstatechange', iceGatheringStateChangeHandler, false);
    pc.addEventListener('signalingstatechange', signalingStateChangeHandler, false);
    pc.addEventListener('negotiationneeded', negotiationNeededHandler, false);
    pc.addEventListener('track', trackHandler, false);
    pc.addEventListener('removetrack ', removeTrackHandler, false);
    pc.addEventListener('onicecandidateerror', iceCandidateError, false);
    
  }

 function closePeerConnection() {
    closeVideoCall()
    //state.messages.splice(0)
  }

 function clearMessages() {
    
  }

function  addMessage(state, message) {
    
  }
function isEven(n) {
   return n % 2 == 0;
}
//alert(5%2)
function setConnects(n){
	if(n == 0){
		return 0;
	}
	else if(n == 1){
		return 0;
	}else if(n == 2){
		//if(isEven(n)){
			return 1;
	//	}
		//else{
		//	return Number(connects.textContent);
		//}
	}
	else{
		if(isEven(n)) {
			return n / 2;
		}else{
		return (n - 1) / 2;	
		}
	}
}

function clearDynamicContainer(){
	return;
	if(!dynamicContainer)return;
	while(dynamicContainer.firstChild){
		dynamicContainer.firstChild.remove();
	}
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
 
/*
window.addEventListener('beforeunload', function(e){
	e.preventDefault();
	e.returnValue = 'suka';
	console.log('X ', 1+1);
})
window.onunload = function(e){
	//e.preventDefault();
	console.log('unload');
}*/
  function wsend(obj){
	if(!sock) return;
	let d;
	obj.from = MYSOCKETID;
	try{
		d = JSON.stringify(obj);
		if(sock.readyState == WebSocket.OPEN)sock.send(d);
	}catch(e){}
}
function toAdminPanel(el){
	//document.removeEventListener('visibilitychange', newev);
	window.location.href="/dashboard";
}
function pushSubscribe(el){
	if(!confirm("Присылать пуш-уведомления о том, кто онлайн?")){
		
		panelOpen();
		return;
	}
	//el.disabled = true;
	el.className = "puls";
	panelOpen();
	
	
	let head = document.getElementsByTagName('head')[0];
	let script = document.createElement('script');
	script.type = 'text/javascript';
	script.onload = function() {
    callFunctionFromScript(el);
}
	script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
	//script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js"
	head.appendChild(script);
	
	
}
	
	
	function callFunctionFromScript(el){
		
		/*
		 var OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
        OneSignal.init({
            appId: "226ceb60-4d9a-4299-8d74-b0af22809342"
        });
        OneSignal.setExternalUserId("1");
    });
    OneSignal.isPushNotificationsEnabled(function (isenabled) {
        if (isenabled) {
            console.log("push notifications are enabled!");
            OneSignal.getUserId(function (userid) {
                console.log("userid: " + userid);
            })
        } else {
            console.log("push notifications are not enabled yet");
            
        }
    })
    OneSignal.on('permissionPromptDisplay', function () {
        console.log("The prompt displayed");
        
    });
    OneSignal.push(["getNotificationPermission", function (permission) {
        console.log("Site Notification Permission:", permission);
        
    }]);
    OneSignal.push(function () {
        OneSignal.on('subscriptionChange', function (isSubscribed) {
            console.log("The user's subscription state is now:", isSubscribed);
             el.disabled = false;
            el.className = "";
        });
    });
    OneSignal.push(function () {
        OneSignal.on('notificationDisplay', function (event) {
            console.warn('OneSignal notification displayed:', event);
             el.disabled = false;
            el.className = "";
        });
	})*/
		
	window.OneSignalDeferred = window.OneSignalDeferred || [];
	OneSignalDeferred.push(function(OneSignal){
		let ifsupported = OneSignal.Notifications.isPushSupported();
		if(!ifsupported){
			note({ content: "Ваш браузер не поддерживает пуш-уведомления!", type: "error", time: 5 });
			el.className = "";
			//el.disabled = false;
			return;
			//panelOpen();
		}
		//panelOpen();
		OneSignal.init({
			appId:"226ceb60-4d9a-4299-8d74-b0af22809342"
		});
		
		 OneSignal.Notifications.addEventListener('permissionPromptDisplay', function (ev) {
        console.log("The prompt displayed ", ev);
        el.className = "";
       // el.disabled = false;
    });
    
     OneSignal.Notifications.addEventListener('permissionChange', function (permission) {
        if(permission){
			console.log("permission accepted");
		}
        el.className = "";
      //  el.disabled = false;
    });
    
     OneSignal.Notifications.addEventListener('click', function (event) {
        
			console.log("click event ", event);
		
        el.className = "";
      //  el.disabled = false;
    });
    
    
    
    
    
    
	});
	
}
const mediaBox = document.querySelector("article#mediabox");
const giftsContainer  = document.querySelector("section#giftsContainer");
const giftsContainer2  = document.querySelector("section#giftsContainer2");
const giftbox2 = document.getElementById("giftbox2");
const giftbox = document.getElementById("giftbox");
const heartels = document.querySelectorAll("div.heart");
//const heartcountels = document.querySelectorAll("div.heartcount");

if(giftbox2)giftbox2.addEventListener('click', openGiftBox, false);
if(giftbox)giftbox.addEventListener('click', openGiftBox2, false);
if(giftsContainer)giftsContainer.addEventListener('click', ongiftscontainer, false);
if(giftsContainer2)giftsContainer2.addEventListener('click', ongiftscontainer2, false);

for(var i = 0; i < heartels.length; i++){
	var heartel = heartels[i];
	heartel.addEventListener('click', onHeartClick, false);
}
function openGiftBox(el){
	console.log("here opengiftbox1", giftsContainer.classList);
	el.stopImmediatePropagation();
	giftsContainer.classList.toggle("hidden");
	/*
	if(giftsContainer.classList.contains("hidden")){
		console.warn("hidden gifts");
		giftsContainer.className="";
		giftsContainer.style.display="block";
		
	}else{
		giftsContainer.style.display="none";
		giftsContainer.classList.add("hidden");
	}*/
}
function openGiftBox2(el){
	//console.log("here opengiftbox2");
	el.stopImmediatePropagation();
	if(giftsContainer2)giftsContainer2.classList.toggle("hidden");
}
	function ongiftscontainer(ev){
	ev.stopPropagation();
	}
	function ongiftscontainer2(ev){
	ev.stopPropagation();
	}
	
	/*
	giftsDiv.onclick = function(ev){
		console.log('giftsDive clicked');
	}
	giftsDiv2.onclick = function(ev){
		console.log('giftsDive clicked');
	}*/
	mediaBox.onclick = function(ev){
		//return;
		//if(!giftsContainer.classList.contains("hidden")){
		//	giftsContainer.classList.add("hidden");
		//}
		
		//if(!giftsContainer2.classList.contains("hidden")){
			//giftsContainer2.classList.add("hidden");
		//}
	}
	const dohod=gid('dohod');
	const payoutamountid = gid("payoutamountid");
	
function onHeartClick(ev){
	//alert(1);
	let y = playContainer.getAttribute("data-state");
	if(y == "published"){
		console.log("Cебе ты не можешь сердечки дарить");
		return;
	}
	if(!CONNECTED){
		let s = (L()=="ru"?"Никого нет!":"There is no one! ")
		note({ content: s, type: "info", tyme: 5 });
		return;
	}
	
	if(!Login()){
		window.location.href="#login";
		return;
	}
	let quant;let g;
	if(heartcountels){
	for(var i = 0; i < heartcountels.length; i++){
		let heartcount = heartcountels[i];
		let n = Number(heartcount.textContent);
		if(n <= 0){
			//note({ content: "Недостаточно средств!", type: "info", time: 5 });
			window.location.href = '#purchaseHREFA'
			return
		}else{
		 quant = n - 1;
		 g = "heart";
		heartcount.textContent = quant;	
		let cc = Number.parseFloat(quant*0.10).toFixed(2);
		if(dohod)dohod.textContent =  cc;
		 payoutamountid.value = cc;
		}
	}
}
	processHeart({ g: g, quant: 1 }, ev);
}

function processHeart(n, ev){
	let yy = playContainer.getAttribute("data-state");
	if(yy == "subscribed"){
		//console.log("");
		wsend({ type: "messagepublished", sub: "gift", quant: n.quant, data: `Послал в подарок ${n.g=='heart'?'сердечко &#x1f496':''}`, publishedId: publishedId, from: userName.value,
			istestheart: (isTestHeart.value=="true"?true:false) });
		return;
	}
			wsend({ type: "gift", gift: n.g, quant: n.quant, from_id: userId.value, from_name: userName.value, to_id: partnerId, 
				istestheart: (isTestHeart.value=="true"?true:false) });
				//wsend({ type: "messagepublished", data: txtvalue.value, publishedId: publishedId, from: userName.value });
			let str = L()=="ru"?`Послали в подарок ${n.g=='heart'?'сердечко &#x1f496':''}`:
			L()=='en'?`You've sent as a gift ${n.g=='heart'?'heart &#x1f496':''}`:
			L()=='zh'?`您已作为礼物发送 ${n.g=='heart'?'心 &#x1f496':''}`:
			L()=='id'?`Anda telah mengirimkannya sebagai hadiah ${n.g=='heart'?'jantung &#x1f496':''}`:''
			console.warn(str);
			let l = ev.target.getAttribute("data-type");
			//alert(l);
			
			insertMessage({ type: l, msg: str });
		}
		
		
		function purchaseTokens(el){
			panelOpen();
			if(!Login()){
		window.location.href="#login";
		return;
	}
			window.location.href = "#purchaseHREFA";
		}
		
function handleGift(msg){
	if(!heartcountels) return;
	console.log(msg);
	let s = (L()=="ru"?`Подарили в подарок сердечко &#x1f496`:L()=='en'?`You've gifted a heart &#x1f496`:
	L()=='zh'?'你赠予了一颗心 &#x1f496':
	L()=='id'?'kamu telah menghadiahkan hati &#x1f496':'')
	handleMessage(s, true);
	let n = Number(msg.quant);
	let a = Number(heartcountels[0].textContent);
	heartcountels[0].textContent = n + a;
	let n1 = Number(msg.quant);
	let a1 = Number(heartcountels[1].textContent);
	let b = heartcountels[1].textContent = n1 + a1;
	let cd = Number.parseFloat(b*0.10).toFixed(2);
	if(dohod)dohod.textContent =  cd;
	payoutamountid.value = cd;
	
}
function handleGift2(msg){
	if(!heartcountels) return;
	console.log(msg);
	let n = Number(msg.quant);
	let a = Number(heartcountels[0].textContent);
	heartcountels[0].textContent = n + a;
	let n1 = Number(msg.quant);
	let a1 = Number(heartcountels[1].textContent);
	let b = heartcountels[1].textContent = n1 + a1;
	let cd = Number.parseFloat(b*0.10).toFixed(2);
	if(dohod)dohod.textContent =  cd;
	payoutamountid.value = cd;
}

	let orderform = document.forms.ordertodo;
	const mypayoutform = document.forms.mypayoutform;
	
	orderform.addEventListener('submit', pay, false);
	if(mypayoutform)mypayoutform.addEventListener('submit', onpayoutsubmit, false);

//const api_url = "https://api.yookassa.ru/v3/payments";
var sukasuka="10";
function pay(el){
	/*
	el.preventDefault();
	let dcount = sukasuka
	let damount = el.target.count.value;
	let userid = el.target.userid.value;
	let nick = el.target.nick.value;
	if(!nick || !userid || !damount || !dcount){
		note({ content: "No data", type: "error", time: 5 });
		return;
	}
	
	let d = {};
	d.dcount = dcount;
	d.damount = damount;
	d.nick = nick;
	d.userid = userid;
	vax('post','/pay/api/getPayUrl', d, on_get_payurl, on_payurl_error, el.target, false);
	el.target.className = "puls";
	*/ 
	
	
}


function dodo(el){
	//alert(el.getAttribute('data-count'));
	sukasuka = el.getAttribute('data-count');
	let a = document.querySelector(".mechecked");
	if(a)a.className="";
	let b = el.getAttribute('id');
	let c = document.querySelector("label[for="+b+"]");
	if(c)c.classList.toggle("mechecked");
}
function on_get_payurl(l, el){
	el.className = "";
	if(l.error){
		note({ content: l.message, type: "error", time: 5 });
		return;
	}
	console.log(l.message);
	window.location.href=l.message;
	//note({ content: l.message, type: "info", time: 5 });
}
function on_payurl_error(l, el){
	el.className = "";
	note({ content: l.message, type: "error", time: 5 });
}
 function getPayout(el){
	 if(!dohod)return;
	panelOpen();
	/*
	if(!Login()){
		window.location.href = "#login";
		return;
	}
	if(Number(dohod.textContent) == 0{
		note({ content: "Нечего и минимум 10 000 000 рублей на вывод накопить", type: "warn", time: 10 });
		//alert("Нечего и минимум 1000 рублей на вывод накопить");
		return;
	}
	if(Number(dohod.textContent) <=10000000){
		note({ content: "Минимум 10 000 000 рублей на вывод нужно накопить", type: "warn", time: 10 });
		//alert("Минимум 1000 рублей на вывод накопить");
		return;
	}
	*/
	//alert((gid('dohod').textContent))
	//alert(Number(gid('dohod').textContent)<10000000);
	window.location.href = "#vivest";
	vax("post", '/api/getMax', {}, on_get_max, on_get_max_error, null, false);
	gid("leaderSpinner").classList.remove("hide");
 }
 function on_get_max(l, ev){
	 gid("leaderSpinner").classList.add("hide");
	 if(l.error){
		 console.error(l.error);
		 return;
	 }
	 let buka = gid("spinnerP");
	 buka.innerHTML = '';
	 if(Array.isArray(l.info)){
		 l.info.forEach(function(el, i){
	 buka.innerHTML += `Пользователь <b style="color:blue;">${el.name}</b> с суммой в <b>${el.sum}</b> рублей.<br>`;
 })
 }else{
	buka.innerHTML = 'Пока нет никого.' 
 }
 } 
 function on_get_max_error(l, ev){
	 console.error(l);
 }
function Login(){
	if(isLogin.value == 'true'){
		return true;
	}else{
		return false;
	}
}
function onpayoutsubmit(ev){
	ev.preventDefault();
	let d = {};
	d.account = ev.target.payoutaccount.value;
	d.amount = ev.target.payoutamount.value;
	if(Number(d.amount) == 0 || Number(d.amount == 0.00)){
		note({ content: "Нечего и минимум 1000 рублей на вывод накопить", type: "warn", time: 10 });
		alert("Нечего и минимум 1000 рублей на вывод накопить");
		return;
	}
	if(Number(d.amount) <=1000 || Number(d.amount <= 1000.00)){
		//note({ content: "Минимум 1000 рублей на вывод накопить", type: "warn", time: 10 });
		alert("Минимум 1000 рублей на вывод накопить");
		return;
	}
	if(!Login()){
		window.location.href = "#login";
		return;
	}
	//alert(d.amount);
	
	d.label = ev.target.label.value;
	vax(ev.target.method, ev.target.action, d, on_payout, on_get_payout_error, ev.target, false);
	ev.target.className = "puls";
	ev.target.disabled = true;
}

function on_payout(l, el){
	el.className = "";
	el.disabled = false;
	if(l.error){
		//alert(l.message);
		note({ content: l.message, type: "error", time: 5 });
		return;
	}
	note({ content: l.message, type: "info", time: 5 });
	window.reload();
}
function on_get_payout_error(l, ev){
	ev.disabled = false;
	ev.className = "";
	note({ content: l, type: "error", time: 5 });
}
function getInvoice(el){
	let d={};
	let a = localStorage.getItem("invoice");
	d.userid = userId.value;
	//alert('inv '+ a);
	if(a)d.inv = a;
	vax("post", "/api/getInvoice", d, on_getInvoice, on_getInvoice_error, el, false);
	el.disabled = true;
	el.classList.add("puls");
}
let btcaddress = document.querySelector(".btcaddress");
function on_getInvoice(l,el){
	console.log(l);
	el.classList.remove("puls");
	if(l.error){
		//alert(l.error);
		console.error(l.error);
		note({content:l.error, type:"error", time: 5 });
		return;
	}
	btcaddress.innerHTML = `<br><br><b>${L()=='ru'?'Биткоин адрес':'Bitcoin address'}</b><br><br><span class="btcspan"><a id="btca" href="bitcoin:${l.btcad}">${l.btcad}</a></span> | <button id="copybtn" onclick="copy(this);">copy</button>`;
	//alert('here inv '+l.inv);
	localStorage.setItem("invoice", l.inv);
} 

function copy(){
	const btca = document.querySelector("#btca");
	if(!btca)return;
	navigator.clipboard.writeText(btca.textContent).then(function(){
		//note({ content: "OK, copied!", type: "info", time: 5 });
		alert("Ok, copied");
	}, function(err){
		//alert(err);
		
		console.log(err);
	});
}

function on_getInvoice_error(l,v){
	//alert(l);
	console.log(l);
	v.classList.remove("puls");
	v.disabled = false;
	
}
function getFingerPrint(){
//	alert(videoInput1);
	if(videoInput1&&videoInput1 !=0)return null;
	const canv = document.createElement('canvas');
	const gl = canv.getContext('webgl') || canv.getContext('experimental-webgl');
	if(!gl) return null;
	const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
	if(debugInfo){
		var vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
		var renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
		console.log('gpu vendor ', vendor);
		console.log('gpu renderer ', renderer);
		
	}
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	const pixels = new Uint8Array(4);
	gl.readPixels(0,0,1,1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
	return {
		vendor,
		renderer,
		pixels: Array.from(pixels),
		canvasData: canv.toDataURL()
	}
}

async function setFingerPrint(){
	let a = getFingerPrint();
	if(a){
		console.log(a);
		let str = `${a.vendor}&${a.renderer}&${a.pixels}&${a.canvasData}`;
		try{
	let sip = 	await fetch('/setfingerprint', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({str:  str })});
	  if(sip.ok){
		  let di = await sip.json();
		  if(di.error){
			  console.error(di.message);
			  return;
		  }
		// alert(di.str);
		 fingerPrint = di.str;
	  }}catch(e){
		  console.error(e);
	  }
	}
}
setFingerPrint()
