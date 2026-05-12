const warnig = function(n){
	return `<div class="warnig">${n.ln=='ru'? 'Отключите VPN, чтобы сервис нормально функционировал.':'Please disable your VPN for the service to work properly.'}
	
	<br>${n.ln=='ru'?'Не используйте встроенный в мессенджер браузер. Воспользуйтесь обычным браузером Chrome или Firefox.':`Don't use the messenger's built-in browser. Open this link in Chrome or Firebox.`}</div>`;
}
module.exports = {warnig}
