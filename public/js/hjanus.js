function handleJanus(obj){
	if(obj.subtype=="all"){
		if(poka)poka.remove();
		obj.who.forEach(function(el,i){
			let div=document.createElement('div');
			div.className="whobox";
			div.setAttribute('data-roomid', el[1].roomid);
			div.setAttribute('data-streamid', el[1].streamid);
			//alert(el[1].roomid);
			div.innerHTML = `<a href="/stream/${el[1].roomid}/${el[1].streamid}">
			<div class="imgbox"><img src="${el[1].src}">
			<div class="glas"><div><img src="/img/eye2.svg"></div><div><span data-nowroomid="${el[1].roomid}" class="spanViews">${el[1].views}</span></div></div>
			</div>
			</a>`
			streamsection.appendChild(div);
		});
}else if(obj.subtype == 'add'){
	if(poka)poka.remove();
	let div = document.createElement('div');
	div.className="whobox";
			div.setAttribute('data-roomid', obj.roomid);
			div.setAttribute('data-streamid', obj.streamid);
			//div.setAttribute("onclick", `gofuck({roomid:${obj.roomid}, streamid:${obj.streamid} })`);
			div.innerHTML = `<a href="/stream/${obj.roomid}/${obj.streamid}">
			<div class="imgbox"><img src="${obj.src}">
			<div class="glas"><div><img src="/img/eye2.svg"></div><div><span data-nowroomid="${obj.roomid}" class="spanViews">${obj.views}</span></div></div>
			</div>
			</a>`
			streamsection.appendChild(div);
	
}else if(obj.subtype == "remove"){
	//alert(obj.subtype);
	let a = document.querySelector(`[data-streamid="${obj.streamid}"]`);
	//alert(a + ' '+ obj.streamid);
	if(a)a.remove();
}else if(obj.type == "onviews"){
	let a = document.querySelector(`[data-nowroomid="${obj.roomid}"]`);
	if(a)a.textContent = obj.views;
}
}
function startTrans(el){
	if(isLogin.value === "false"){
		window.location.href="#login";
	}else{
		alert(userId.value);
		window.location.href = "/stream/"+userId.value;
	}
}
