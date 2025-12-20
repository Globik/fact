const demospace = function(n){
	return `<html>
	<head><title>demo</title>
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<style>
	.imgqr{
	width:500px;
	height:500px;
}
	</style>
	<script src="https://api.lovense-api.com/basic-sdk/core.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/9.0.3/adapter.min.js" ></script>
	<script src="/js/janus.js"></script>
	</head><body>
	demo
	<div><button onclick="getToken();">get token</button></div>
	<div><button onclick="getappstatus();">app status</button>
	<button onclick="getonlinetoys();">getonlinetoys</button>
	<button onclick="gettoys();">gettoys</button>
	<button onclick="setcommand();">command</button>
	<button onclick="stop();">stop</button>
	
	</div>
	<ouptut id="out"></output>
	<div><button onclick="getJanus();">get janus</button><br>
	<input type="number" id="roomnum" value="1"/><br>
	<button onclick="createRoom();">join room</button><br>
	<button onclick="isexits();">exists</button><br>
	<button onclick="list();">list</button><br>
	<button onclick="listp();">list particiants</button><br>
	<button onclick="leave();">leave</button><br>
	<button onclick="unpublish();">unpublish</button><br>
	<button onclick="destroy();">destroy</button><br>
	<button onclick="subscribe();">subscribe</button> | <input type="text" id="idvalue"/>
	<button onclick="unsubscribe();">unsubscribe</button><br>
	</div>
	<div><video id="local" autoplay></video></div>
	<div> remote<video id="remoteVideo" autoplay></video>
	<script src="/js/demospace.js"></script>
	</body></html>`
}

module.exports = { demospace }
