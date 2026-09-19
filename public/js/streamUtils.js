	
	const Spinner =  document.querySelector("#videobox section");
	let spanViews = gid("spanViews");
	
	var loc1 = location.hostname + ":" + location.port;
	var loc2 = location.hostname;
	var loc3 = loc1 || loc2;
    const chatbox = gid("chatbox");
	var sock = null;
	var new_uri;
	var mystreamId = null;
	var streamId = gid("streamId");
	var useridi = Number(gid("userid").value);
	var MYSOCKETID;
	const liveBadge = gid("live-badge");
	var server = null;
	var sfutest = null;

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
		"stun:stun.l.google.com:19302",
		"stun:chatikon.ru:3479"
		]
		
		},
	{
		urls:[
		"turn:chatikon.ru:3479", 
		],
		username: config.username, credential:config.password 
		}]
	}
	return servers.iceServers;
	}
	return undefined;
	}catch(er){
	console.error(er);
	return undefined;
	}
	}
	if (window.location.protocol === "https:") {
	new_uri = "wss:";
	} else {
	new_uri = "ws:";
	}
	
	if(window.location.protocol === 'http:'){
	server = "ws://" + window.location.hostname + ":8188/janus";
	}else{
	server = "wss://" + window.location.hostname + ":8990/janus";
	}
	
	function get_socket() {
	if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + '/' + Number(userid.value));
	sock.onopen = function () {
	 console.log("websocket opened");
	 if(owner.value == "false"){
	 wsend({ "request": "janus", "subtype": "getposter", "streamid": useridi });
	}
  };
  sock.onerror = function (e) {
    note({ content: "Websocket: " + e.name, type: "error", time: 5 });
  };
  
  sock.addEventListener('message', function (evt) {
	  
    let a;
    try {
		
      a = JSON.parse(evt.data);
     // console.log(a);
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
	console.log('msg ',d);
	if(d.type === 'janus'){
		if(d.subtype == 'onviews'){
			spanViews.textContent = d.views;
		}else if(d.subtype === "getposter"){
		local.poster = d.src;
	}
	}else if(d.type === 'welcome'){
		MYSOCKETID = d.socketid;
	}else if(d.type === 'msg'){
		handle_message(d);
	}else if(d.type === 'online'){
		onlineCount.textContent = d.online;
	}else if(d.type === 'fakemsg'){
		handle_message(d);
	}else if(d.type === 'fake'){
		if(d.subtype == 'januscount'){
//alert(1);
			spanViews.textContent = d.count;
		}
	}else{}
}

	
	
	
	const txt = gid("txt");
	if(txt)txt.addEventListener('keydown', sendEnter, false);
	
	function sendEnter(ev){
		
		if(ev.key == "Enter"){
			
		if(ev.target.value.length == 0)return;
		
			let str = esci(ev.target.value.trim());
			if(str.length === 0){
				ev.target.value = "";
				return;
			}
			
			wsend({ type: (check_fakes()?"fakemsg":"msg"), txt: str, from: username.value, room: '/' + userid.value, owner: owner.value });	
		}
	}
	function handle_message(obj){
	insertMessage(obj);
	}

function check_fakes(){
	let a = Number(gid("streamId").value);
	if(a == 600000 || a == 600001 || a == 600002 || a == 600003 || a == 600004 || a == 600005){
		return true;
	}
	return false;
}
	function sendMessage(el){
	
	el.classList.add('puls');
	
	if(!txt.value) return;
	wsend({ type: (check_fakes()?"fakemsg":"msg"), txt: txt.value, from: username.value, room: '/' + userid.value, owner: owner.value });
	//insertMessage(txt.value);
	el.classList.add('puls');
	}
	
	function set_fake_msgs(){
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
	}
	set_fake_msgs();
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
	try{
		d = JSON.stringify(obj);
		if(sock.readyState == WebSocket.OPEN)sock.send(d);
	}catch(e){}
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
	function fsend(obj){
	if(!sfutest)return;
    sfutest.send({ message: obj, success: function(d){console.log(d)},error:function(er){console.error(er)}});
	}

function isexits(){
	let checkroom={
		request:"exists",
		room: useridi,
		ptype:"publisher",
		"is_private": false
	}
    fsend(checkroom);
	}

	function listpu(){
	fsend({ 
		request:"listparticipants",
        "room" : useridi,
        "publisher_id": mystreamId,
        });
	}
	function unpublish(){
	fsend({ request: "unpublish"  });
	}
