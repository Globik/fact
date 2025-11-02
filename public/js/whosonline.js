function showWhosOnline(){
	window.location.href = "#whosonline";
	wsend({ type: 'getList'});
	panelOpen();
	
      if(Brole.value==="admin") return;
    /* window.yaContextCb.push(()=>{
		 Ya.Context.AdvManager.render({
			 "blockId":"R-A-12098170-9",
			 "renderTo":"yandex_rtb_R-A-12098170-9",
			  "onClose":function(){
			console.log("Reklama closed")
			//setTimeout(function(){setbanner();}, 1000 * 30)
			}
		 })
	 })*/
}
function removeList(){
	wsend({ type: "removeList"});
	let whosonlinecontent = gid('whosonlinecontent');
	while(whosonlinecontent.firstChild){
		whosonlinecontent.firstChild.remove();
	}
	//let mu = gid("yandex_rtb_R-A-12098170-9");
	//if(mu)mu.innerHTML = "";
}
function closeRek(el){
	el.remove();
	let mu = gid("yandex_rtb_R-A-12098170-9");
	if(mu)mu.innerHTML = "";
}
function handleDynamic(obj){
	//return;
	//alert('dynamo');
	let whosonlinecontent = gid('whosonlinecontent');
	//console.log(obj);
	let conns2 = gid("conns2");
	let webcams2 = gid("webcams2");
	if(obj.sub == "total"){
		//camsCount.textContent = obj.cams.length;
	//	webcams2.textContent = obj.cams.length;
		
		let b = setConnects(obj.cams.length);
		//if(b){
		//connects.textContent = b;
		//conns2.textContent = b;
	//}
	
		obj.cams.forEach(function(el, i){
		let d = document.createElement("div");
		d.className="dynamicbox";
		d.setAttribute("data-id", el[1].id);
		d.setAttribute("data-finger", el[1].finger);
		//alert(el[1].finger);
		d.innerHTML=`<div class="caption">${el[1].nick.substring(0,5)}</div><div class="dynamicImgHalter"><img data-pid="${el[1].id}" onclick="callInkognito(this);" onerror="loadError(this);" src="${el[1].src}"/></div>`;
		if(Brole.value == 'admin'){
			let kdiv = document.createElement('div');
			kdiv.className = "kdiv";
			kdiv.innerHTML = `${String.fromCodePoint(0x274C)}`;
			kdiv.setAttribute("onclick", "banv(this);");
			kdiv.setAttribute('data-rid',el[1].id);
			kdiv.setAttribute('data-rfinger', el[1].finger);
			d.appendChild(kdiv);
		}
		whosonlinecontent.appendChild(d);
	})
	}else if(obj.sub == "remove"){
		//return;
		//camsCount.textContent = obj.camcount;
		//webcams2.textContent = obj.camcount;
				
		//let b = setConnects(obj.camcount);
		//return;
		//connects.textContent = b;
		//conns2.textContent = b;
	let el = document.querySelector(`[data-id="${obj.id}"]`);
	//alert(obj.id);
	if(el)el.remove();
	let asi = document.querySelectorAll(`[data-finger="${obj.finger}"]`);
	for(var i=0;i < asi.length;i++){
		var as = asi[i];
		if(as) as.remove();
	}
	}else if(obj.sub == "add"){
		//return;
		//alert('add');
		if(!obj.src)return;
		let d = document.createElement("div");
		d.className="dynamicbox";
		d.setAttribute("data-id", obj.id);
		d.setAttribute("data-finger", obj.finger);
		//console.log('obj.src ', obj.src);
		d.innerHTML=`<div class="caption">${obj.nick.substring(0,5)}</div><div class="dynamicImgHalter"><img data-pid="${obj.id}" onclick="callInkognito(this);" src="${obj.src}" onerror="loadError(this);"/></div>`;
		if(Brole.value == 'admin'){
			let kdiv = document.createElement('div');
			kdiv.className = "kdiv";
			kdiv.setAttribute("onclick", "banv(this);");
			kdiv.setAttribute('data-rid',obj.id);
			kdiv.setAttribute('data-rfinger',obj.finger);
			kdiv.innerHTML = `${String.fromCodePoint(0x274C)}`
			d.appendChild(kdiv);
		}
		whosonlinecontent.appendChild(d);
		//camsCount.textContent = obj.camcount;
		 webcams2.textContent = obj.camcount;
		let b = setConnects(obj.camcount);
		
		//connects.textContent = b;
	//conns2.textContent = b;
		
	}else if(obj.sub == "connects"){
		//alert('connects');
		//let b = Number(obj.connects);
		//if(b == 0)return;
		//connects.textContent = b / 2;
	}else if(obj.sub == "srcdata"){
		//return;
		let el = document.querySelector(`[data-pid="${obj.id}"]`);
		if(el) el.src = obj.src;
	}else{
		
	}
}

function loadError(ma){
	//return;
	let a = ma.getAttribute('data-pid');
	if(!a)return;
	let elu = document.querySelector(`[data-id="${a}"]`);
	if(elu)elu.remove();
	vax('post','/removePrizrak', { id: a }, function(){}, function(){}, null, false);
}
function banv(el){
	let a = el.getAttribute('data-rid');
	/*
	 if(gid("BAN").value === "1"){
		 if(confirm("Забанить по нику?")){
		if(a) banus(a);
		 
	 }
	 return;
	 }
	 */ 
	if(confirm("Забанить по fingerprint?")){
	
	//alert(a);
	wsend({ type: "target", subtype: "ban", from: MYSOCKETID, target: a, ziel: "no" });
}else{
	if(confirm(" по айпи адресу?")){
		wsend({ type: "target", subtype: "ban", from: MYSOCKETID, target: a , ziel: "yes"});
	}
}
}
function handleBanIp(msg){
	//alert('cam id ' + msg.videoinput + " len "+msg.videoinput.length+" nochinput "+msg.nochinput);
let d = {};
d.ip = msg.videoinput.substring(0, 40);
alert('ban ip ' + msg.ip + ' ' + msg.ziel + ' ' + d.ip)
//if(MYIP ==='23.23.22.35'){
	if(msg.ziel === "yes") d.ip = msg.ip;
//}
 vax('post','/admin/setBan', d, on_handleban, on_handleban_error, null, false);
}
function  on_handleban(l, ev){
	if(l.error){
		alert(l.message);
		note({ content: l.message, type: 'error', time: 5 });
		return;
	}
	note({ content: l.message, type: 'info', time: 5 });
} 
function on_handleban_error(l, ev){
	alert(l);
}
