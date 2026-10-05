const nav = function(n){
	const lang = n.lang;
	return ` <nav id="navpanel"><div class="nav"><b>Онлайн: <span id="onlineCount">0</span></b>&nbsp;&nbsp;&nbsp; <b id="VKUSERNAME">${n.user?n.user.name:'anon'}</b> </div>
    
    <div id="settings" class="ita" onclick="panelOpen(this);">
  <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    <!-- Верхняя линия -->
    <line x1="10" y1="18" x2="40" y2="18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <!-- Средняя линия -->
    <line x1="10" y1="25" x2="40" y2="25" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <!-- Нижняя линия -->
    <line x1="10" y1="32" x2="40" y2="32" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>
    </div>


<div id="settingspanel">
${n.user && n.user.brole=='admin'?'<div class="settingspanel" onclick="toAdminPanel(this);">В админку</div>':''}
<div class="settingspanel"><p class="navp">Криптокошелек USDT</p></div>
${n.user?`<div class="settingspanel" onclick="logout(this);">Выйти</div>`:`<div class="settingspanel"><a href="#login" onclick="panelOpen();"><p class="navp">Войти</p></a></div>`}
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
