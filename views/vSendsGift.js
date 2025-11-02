const vSendsGift = function(n){
	return `
	<h1>Кто послал cердечки</h1><h3>Показаны все люди</h3>
	<main id="mainGift">${n.giftcount?getTestGift(n.giftcount):"Никто не послал сердечек"}</main>
	`;
}
module.exports = { vSendsGift }

function getTestGift(arr){
	let s = `<style>section.gift-sec:nth-child(odd) {background: lime;}</style>`
	arr.forEach(function(el,i){
		s+=`<section class="gift-sec">${i+1})<div class="giftgrids">
		<div class="item">ID: ${el.from_id}</div>
		<div class="item">От: ${el.from_nick}</div>
		<div class="item">Cердечко: ${el.wieviel}</div>
		</div></section>`
	});
	return s;
}
