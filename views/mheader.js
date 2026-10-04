const mheader = function(n){
	return `
<header class="mheader">
  <h1><a href="/">Chatikon</a></h1>
  <p>Живые стримы с вебкой • Донаты в USDT • Горячий криптокошелёк</p>
  ${n.owner?``:`<button class="btn-start" onclick="startTrans(this);">🔥 Начать трансляцию</button>`}
</header>
<script>
function startTrans(el){
const sess = gid("sess");
	//if(isLogin.value === "false"){
	//	window.location.href="#login";
	//}else{
		//alert(userId.value);
		//window.location.href = "/stream/"+userId.value;
		//alert(sess.value);
		if(sock)sock.close();
		window.location.href = "/stream/"+sess.value;
	//}
}
</script>
`;
}
module.exports = { mheader }
