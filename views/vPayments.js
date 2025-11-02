const vPayments = function(n){
	return `<h1>Кто купил сердечки</h1>
	${getItems(n)}
	`;
}
module.exports = { vPayments }

function getItems(n){
	let s=`${n.count.type}:<br><br>`
	
	n.count.items.forEach(function(el,i){
		s+=`<div>${el.metadata.count} сердечек = ${el.amount.value} ${el.amount.currency}</div>
		<div>${el.metadata.userid} - <b>${el.metadata.nick}</b></div>
		<div>${el.captured_at}</div><div>${el.payment_method.type}</div>
		<hr>`
	});
	return s;
}
