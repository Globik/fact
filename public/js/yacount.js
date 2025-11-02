function setYacount(el){
	vax('post','/api/setyacount', {countya: out.textContent }, on_set_yacount, on_error, el, false);
}

function on_set_yacount(l, v){
out.textContent=l.message;	
}
function on_error(l,ev){
	alert(l);
}
