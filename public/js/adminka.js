var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
var new_uri;
var sock = null;
if (window.location.protocol === "https:") {
  new_uri = "wss:";
} else {
  new_uri = "ws:";
}
var ISVIDEO = false;

function get_socket(){
 if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + "/administrator");

  sock.onopen = function () {
    console.log("websocket opened");
   // note({ content: "opened", type: "info", time: 5 });
  };
  sock.onerror = function (e) {
	  console.error(e);
    note({ content: "Websocket error: " + e, type: "error", time: 5 });
  };
  sock.addEventListener('message',  function (evt) {
	  
    let a;
    try {
      a = JSON.parse(evt.data);
      on_msg(a);
    } catch (e) {
      note({ content: e, type: "error", time: 5 });
    }
  });
  sock.onclose = function () {
    sock = null;
    console.log('websocket closed');
    note({ content: "Соединение с сервером закрыто!", type: "info", time: 5 });
  };
}
function wsend(obj){
	if(!sock) return;
	let d;
	try{
		d = JSON.stringify(obj);
		sock.send(d);
	}catch(e){}
}
get_socket();

function on_msg(msg) {
	//console.log("data type: ", msg.type);
	if(msg.type == 'dynamic'){
        handleDynamic(msg);
	}else if(msg.type == "connected2"){
		//let b = setConnects(msg.size);
		//connects.textContent = b;
		
		conns.textContent = msg.size;
	}else if(msg.type == "pick"){
	//wsend({type:'pock'});
	}else{
		adminMedia(msg);
	}
}
const someSpinner = gid("someSpinner");
function getUsers(el){
	//contentBox.innerHTML = "";
	//dynamicSection.style.display = "none";
	//someSpinner.className = "show";
	clearWindows();
	vax('get','/api/getUsers', {}, on_get_users, on_error, el, false);
	
	
}
function clearWindows(){
	contentBox.innerHTML = "";
	dynamicSection.style.display = "none";
	someSpinner.className = "show";
}
function on_get_users(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
}
function on_error(l, v){
	someSpinner.className = "hide";
	note({ content: l.message, type: "error", time: 5 });
}

function getStun(el){
	clearWindows();
	vax('get','/api/stun', {}, on_get_stun, on_error, el, false);
}

function on_get_stun(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
}

function whosOnline(el){
	contentBox.innerHTML = "";
	dynamicSection.style.display = "block";
}

function getSettings(el){
	clearWindows();
	vax('get','/api/getSettings', {}, on_get_settings, on_error, el, false);
}

function on_get_settings(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
	let f = document.forms.testPayment;
	f.addEventListener("submit", onSubmitTestPayment, false);
}

function onSubmitTestPayment(ev){
	ev.preventDefault();
	let d = {};
	d.testshopid = ev.target.testshopid.value;
	d.testshopsecret = ev.target.testshopsecret.value;
	//alert(JSON.stringify(d)+ev.target.method+ev.target.action);
	vax(ev.target.method, ev.target.action, d, on_set_test_payment, on_set_test_payment_error, ev.target, false);
	ev.target.disabled = true;
	ev.target.className = "puls";
}
function on_set_test_payment(l, el){
	el.className = "";
	el.disabled = false;
	note({ content: l.message, type: "info", time: 5 });
}
function on_set_test_payment_error(l, el){
	el.className = "";
	el.disabled = false;
	note({ content: l.message, type: "error", time: 5 });
}
 function setStun(el){
	 
	 let a = preStun.textContent;
	// alert(a);
	 if(!a){
		 note({ content: "A, чо пусто?", type: "error", time: 5 });
		 return;
	 }
	 let b;
	try{
		 b = JSON.parse(a);
	}catch(err){
		alert(err);
		note({ content: err, type: "error", time: 5});
		return;
	}
	vax('post','/api/setstun', b, on_set_stun, on_set_stun_error, el, false);
	el.className = "puls";
 
 }
function getTest(el){
	clearWindows();
	vax('get','/api/getTest', {}, on_get_test, on_error, el, false);
}
function on_get_test(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
	let s =document.forms.ordertodo;
	s.addEventListener('submit', pay, false);
}
const api_url = "https://api.yookassa.ru/v3/payments";
var sukasuka="10";
function pay(el){
	el.preventDefault();
	let dcount = sukasuka
	let damount = el.target.count.value;
	alert(dcount+" "+damount);
	return;
	let d = {};
	d.dcount = dcount;
	d.damount = damount;
	vax('post','/api/getPayUrl', d, on_get_payurl, on_payurl_error, el, false);
	el.className = "puls";
}

function dodo(el){
	//alert(el.getAttribute('data-count'));
	sukasuka = el.getAttribute('data-count');
}
function on_get_payurl(l, el){
	el.className = "";
	console.log(l.message);
	note({ content: l.message, type: "info", time: 5 });
}
function on_payurl_error(l, el){
	el.className = "";
	note({ content: l.message, type: "error", time: 5 });
}
function takeCb(el){
	el.className="puls";
	vax('post','/pay/api/takeCb', {}, on_takecb, on_error, el, false);
}
function on_takecb(l, el){
	el.className = "";
	out.innerHTML=JSON.stringify(l.message);
}
function on_set_stun(l, el){
	el.className = "";
	note({ content: l.message, type: "info", time: 5 });
}

function on_set_stun_error(l, el){
	el.className = "";
	note({ content: l.message, type: "error", time: 5 });
}
const channel = new BroadcastChannel('message');
	

function post_start(){
	//alert(1);
	//window.postMessage('message', "*");
	//const channel = new BroadcastChannel('message');
	channel.postMessage({ "type": "start"  });
}

function post_next(){
	//const channel = new BroadcastChannel('message');
	channel.postMessage({ "type": "next" });
}
function krestik(el){
	if(!window.confirm("Удалить?")) return;
	let k = el.getAttribute('data-kid');
	if(!k) return;
	wsend({ type: "krestik", id: k });
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
function handleDynamic(obj){
	return;
//	console.log(obj);
	if(obj.sub == "total"){
		camsCount.textContent = obj.cams.length;

		let b = setConnects(obj.cams.length);
		//if(b){
		connects.textContent = b;
		//connects.textContent = obj.connects;
	
		if(!ISVIDEO){
		obj.cams.forEach(function(el, i){
		let d = document.createElement("div");
		d.className="dynamicbox";
		d.setAttribute("data-id", el[1].id);
		d.innerHTML=`<caption>${el[1].nick}</caption><div class="dynamicImgHalter"><div class="krestik" data-kid="${el[1].id}" onclick="krestik(this);">&#x274E;</div><img data-pid="${el[1].id}" src="${el[1].src}"/></div>`;
		dynamicContainer.appendChild(d);
	
})
}
	}else if(obj.sub == "remove"){
		camsCount.textContent = obj.camcount;
		let b = setConnects(obj.camcount);
		
		connects.textContent = b;
		let el = document.querySelector(`[data-id="${obj.id}"]`);
		if(el)el.remove();
	}else if(obj.sub == "add"){
		console.log('on add');
		//alert(obj.waiting);
		//waiting.innerHTML = obj.waiting;
		if(!ISVIDEO){
		let d = document.createElement("div");
		d.className="dynamicbox";
	
		d.setAttribute("data-id", obj.id);
d.innerHTML=`<caption>${obj.nick}</caption><div class="dynamicImgHalter"><div class="krestik" data-kid="${obj.id}" onclick="krestik(this);">&#x274E;</div><img data-pid="${obj.id}" src="${obj.src}"/></div>`;
	
		dynamicContainer.appendChild(d);
	}
		camsCount.textContent = obj.camcount;
		 
		let b = setConnects(obj.camcount);
	
		connects.textContent = b;
		
		//connects.textContent = b / 2;
		
	}else if(obj.sub == "connects"){
		let b = Number(obj.connects);
		
	//	connects.textContent = b / 2;
	}else if(obj.sub == "srcdata"){
		if(!ISVIDEO){
		let el = document.querySelector(`[data-pid="${obj.id}"]`);
		if(el) el.src = obj.src;
	}
	}else{
		
	}
	
}
function getSomeContent(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
}
function getTestGifts(el){
	clearWindows();
	vax('get','/admin/getGiftTests', {}, getSomeContent, on_error, el, false);
}


function getPayments(el){
	clearWindows();
	vax('get','/admin/getPayments', {}, getSomeContent, on_error, el, false);
}



function getAllBanned(el){
	clearWindows();
	vax('get','/admin/getBanned', {}, getSomeContent, on_error, el, false);
}
 function getIps(el){
	 clearWindows();
	 vax('get','/admin/getBannedIps', {}, getSomeContent, on_error, el, false);
 }
function deleteIps(el){
	vax('post','/admin/deleteBannedIps', {}, ondeleteIps, on_error, el, false);
	el.className = 'puls';
}
function ondeleteIps(l, ev){
	ev.className = "";
	if(l.error){
		note({ content: l.message, type: "error", time: 5 });
		return;
	}
	note({ content: l.message, type: "info", time: 5 });
	let d = gid('fips');
	while(d.firstChild){
		d.firstChild.remove();
	}
}
function banOutThat(el){
	let a = el.getAttribute("data-usid");
	if(!a)return;
	//alert(a);
	let b = document.querySelector(`[data-banid="${a}"]`);
	//if(b)b.remove();
	vax('post','/admin/deleteOneBanned', { usid: a }, on_ban_out_that, on_banout_that_error, b, false);
	b.classList.add("puls");
}
function on_ban_out_that(l, el){
	if(l.error){
		el.classList.remove("puls");
		note({ content: l.message, type: "error", time: 5});
		return;
	}
	note({ content: l.message, type: "info", time: 5 });
	el.remove();
}
function on_banout_that_error(l, el){
	el.classList.remove("puls");
	console.error(l);
	alert(l);
}

function banOutAll(el){
	vax('post','/admin/bannedOutAll', {}, on_ban_out_all, on_banout_all_error, el, false);
	el.classList.add("puls");
}

function on_ban_out_all(l, el){
	el.classList.remove("puls");
	if(l.error){
		note({ content: l.message, type: "error", time: 5});
		return;
	}
	while(hauptbansec.firstChild){
		hauptbansec.firstChild.remove();
	}
	note({ content: l.message, type: "info", time: 5 });
}
 function on_banout_all_error(l, el){
	 el.classList.remove("puls");
	console.error(l);
	alert(l);
 }



























