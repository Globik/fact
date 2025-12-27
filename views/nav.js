const nav = function(n){
	console.log('hier user ', n.user);
	return `	<nav id="navpanel">
    <div id="settings" class="ita" onclick="panelOpen(this);">
 <img class="setimg" src="/img/set2.svg">
</div>
<div id="settingspanel">
${n.user && n.user.brole=='admin'?'<div class="settingspanel" onclick="toAdminPanel(this);">В админку</div>':''}
${n.user ? '<div class="settingspanel" onclick="logout(this);">Выйти</div>':'<div class="settingspanel"><a href="#login" onclick="panelOpen();">Войти</a></div>'}
</div>
</nav>`
}
module.exports = { nav }
