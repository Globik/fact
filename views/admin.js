const admin = function(n){
	return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8"><title>vk callback</title><head><body>
    <output id="out"></output>
    <form name="adminform">
    <label> Ник&nbsp;&nbsp;<input type="text" name="username" placeholder="your nick" required /></label><br><br>
    <label>Пароль&nbsp;&nbsp;<input type="password" name="password" placeholder="password" required /></label><br><br>
    <input type="submit" value="Send" />
    </form>
    <script src="/js/somevkcb.js"></script>
    </body></html>`;
}
module.exports = { admin }
