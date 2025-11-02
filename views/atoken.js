const atoken = function(n){
	return `<html><head><title>yoomoney result</title></head><body>
	<h1>Yoomoney result:</h1>
	<div>
	<b>${n.message?n.message:'No message'}</b>
	</div>
	<nav><a href="/">Home</a> | <a href="/admin/yoomoneytest">yoomoney</a></nav></body></html>
	`;
}
module.exports = { atoken }
