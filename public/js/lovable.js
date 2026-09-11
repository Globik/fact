var basicSdkInstance;
function gettoys(){
	if(!basicSdkInstance) return;
let a =	basicSdkInstance.getToys();
out.innerHTML+=JSON.stringify(a)+'<br>';
}
function setcommand(){
	if(!basicSdkInstance) return;
	basicSdkInstance.sendToyCommand({ vibrate:20});
}
function stop(){
	if(!basicSdkInstance) return;
	basicSdkInstance.stopToyAction();
}
async function getToken(){
	try{
		 let reqi = await fetch('/lovetoken', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({ uid: '12345', uname:'alik' })});
	if(reqi.ok){
		if(reqi.error){
			out.innerHTML+=reqi.message+'<br>'
			return;
		}
		let config = await reqi.json();
		authT = config.authToken;
		out.innerHTML+=authT;
		dowas();
	}
	}catch(e){
		out.innerHTML+=e+'<br>'
	}
}
async function dowas(){
 basicSdkInstance=new LovenseBasicSdk({
	platform:"Chatikon",
	authToken:authT,
	uid:"1234"
})
basicSdkInstance.on("ready",async(instance)=>{
	out.innerHTML+='ready'+'<br>';
	try{
		const codeRes=await instance.getQrcode();
		console.log('codeRes ', codeRes);
		out.innerHTML+=codeRes+'<br>';
		let im=document.createElement('img');
		im.src=codeRes.qrcodeUrl;
		im.className="imgqr";
		document.body.appendChild(im);
	}catch(e){
		out.innerHTML+=e+'<br>'
	}
	
})
basicSdkInstance.on("sdkError",(data)=>{
	out.innerHTML+=data.code+" "+data.message+"<br>"
})

}
function getappstatus(){
	if(!basicSdkInstance) return;
	let a=basicSdkInstance.getAppStatus();
out.innerHTML+='app status '+a+'<br>';
}
function getonlinetoys(){
	if(!basicSdkInstance) return;
	let a=basicSdkInstance.getOnlineToys();
	out.innerHTML+=JSON.stringify(a)+'<br>';
}
