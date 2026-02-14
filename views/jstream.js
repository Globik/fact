const jstream = function(n){
	return `<html>
	<head><title>janus stream</title>
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<style>
	.imgqr{
	width:500px;
	height:500px;
}
	</style>
	
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/9.0.3/adapter.min.js" ></script>
	<script src="/js/janus.js"></script>
	</head><body>hi
	<button onclick="start(this);">start</button><video id="remotevideo" autoplay></video>
	<script src="/js/jstream.js"></script>
	</body></html>`;
}
module.exports = {jstream }
