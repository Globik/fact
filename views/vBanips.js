const vBanips = function(n){
	return `<h1>Забаненные айпи адреса</h1><section id="fips">${n.count.length > 0 ? getL(n.count):"Пока нет ничего"}</section> `;
}
module.exports = { vBanips }
function getL(arr){
	let s=`<button onclick="deleteIps(this);">Стереть все</button>`;
	arr.forEach(function(el, i){
		s+=`<div>${el.ip}</div>`;
	});
	return s;
}
