
function stun(n){
	return `<section id="stunContainer">
	<header>STUN / TURN - JSON-format:</header>
	<pre id="preStun" contenteditable="true">
	 ${n.stun?n.stun:`{
	 "iceServers": [ 
	  {
        "urls": "stun:stun.l.google.com:19302"
      },
    { 
    "urls": "turn:relay1.expressturn.com:3478", 
    "username": "efZIKNPZ0Y17GFG3WZ",
    "credential": "HIYNupkIAHFXSgW8"
    },
 { 
 "urls": "stun:stun.relay.metered.ca:80"
  },
{ 
"urls": "turn:a.relay.metered.ca:80", 
	"username": "33c88ed716afa1a802b5116a", 
	"credential": "YlI1/qfkEWya3Q4p"
	 }, 
{ 
"urls": "turn:a.relay.metered.ca:80?transport=tcp", 
	"username": "33c88ed716afa1a802b5116a", 
	"credential": "YlI1/qfkEWya3Q4p"
	 },
  { 
  "urls": "turn:a.relay.metered.ca:443", 
  "username": "33c88ed716afa1a802b5116a", 
  "credential": "YlI1/qfkEWya3Q4p"
  }, 
  {
   "urls": "turn:a.relay.metered.ca:443?transport=tcp", 
   "username": "33c88ed716afa1a802b5116a", 
   "credential": "YlI1/qfkEWya3Q4p"
    }
  ]
  }`}
	</pre>
	<button id="gostun" onclick="setStun(this);">Сохранить</button>
	</section>`;
}
module.exports = { stun }

