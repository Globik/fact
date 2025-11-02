const errnotfound = function(n){
	return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,user-scalable=no" />
    <link rel="icon" href="/favicon.ico">
	<title>404 not found</title>
	<style>
	#errcontainer{
	width:50%;
	margin:0 auto;
	padding: 20px;
	text-align: center;
	
	}
	#errcontainer h1{
font-color: rgb(23,45,23);
line-height:1.5;
margin:20px;
font-size: 60px;
}
#errcontainer span{
	font-color: rgb(23,45,23);
line-height:1.5;
margin:20px;
font-size: 40px;
}
@media screen and (max-width: 452px) and (orientation: portrait){
		#errcontainer{
			width:98%;
		
		}
	}
	</style>
	<script src="https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js"></script>
	<script>
	var FLAGVK = false;
	
vkBridge.send('VKWebAppInit').then(data=>{}).catch(function(er){})
</script>
	</head><body><div id="errcontainer"><h1>404</h1><span>СТРАНИЦА НЕ НАЙДЕНА!</span></div></body></html>`;
}
module.exports = { errnotfound }
