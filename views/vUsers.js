function vUsers(n){
	return `${n.users && n.users.length > 0 ? listUsers(n.users) : '<b>Нет никого.</b>'}`;
}
module.exports = { vUsers }

function listUsers(users){
	let s = '';
	users.forEach(function(el, i){
		s+=`<div>${i+1}) <b>имя: </b>${el.name}</div>`;
		s+=`${el.brole=='admin'?'<div>aдмин</div>':''}`;
		s+=`<div><b>регистрация: </b>${new Date(el.createdAt).toLocaleString()}</div><hr>`;
	});
	return s;
}
