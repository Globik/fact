const vBanned = function(n){
	return `<h3>Бан-список. </h3>
	<section id="hauptbansec">${getBannedList(n)}</section>`;
}
module.exports = { vBanned }

function getBannedList(n){
	let s = '';
	if(n.banlist.length > 0){
		s+=`<div><button onclick="banOutAll(this);">Всех разбанить</button></div>`;
		n.banlist.forEach(function(el,i){
		s+=`<section data-banid="${el.usid}" class="bansec"><div class="bandiv"><b>${i+1}</b></div><div class="bandiv"><b>${el.grund==4?'Транс':''}</b></div><div class="bandiv"><b>id: </b><b>${el.usid}</b></div>
			<div class="bandiv"><b>${el.nick}</b></div><div class="bandiv"><button data-usid="${el.usid}" onclick="banOutThat(this);">Разбанить</button></div></section>
			`;
	});
	}else{
		s+='<div style="text-align:center;"><b>Пока нет никого.</b></div>';
	}
	return s;
}
