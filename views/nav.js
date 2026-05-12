const nav = function(n){
	const lang = n.lang;
	return ` <nav id="navpanel"><div class="nav"><b>Онлайн: <span id="onlineCount">0</span></b>&nbsp;&nbsp;&nbsp; <b id="VKUSERNAME">${n.user?n.user.name:'anon'}</b> </div>
    
    <div id="settings" class="ita" onclick="panelOpen(this);"><img class="setimg" src="/img/set2.svg"></div>


<div id="settingspanel">
${n.user && n.user.brole=='admin'?'<div class="settingspanel" onclick="toAdminPanel(this);">В админку</div>':''}
<div class="settingspanel">Криптокошелек USDT</div>
${n.user?`<div class="settingspanel" onclick="logout(this);">Выйти</div>`:`<div class="settingspanel"><a href="#login" onclick="panelOpen();">Войти</a></div>`}
</div>
</nav><script>
var isOpen = false;
function panelOpen(el){
			var settingspanel = document.getElementById("settingspanel");
			if(!isOpen){
			settingspanel.className = "open";
			isOpen = true;
			}else{
				settingspanel.className = "";
				isOpen = false;
			}
		}
		</script>	`
}
module.exports = { nav }
