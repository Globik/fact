var WebSocket=require('ws');
const ws=new WebSocket("wss://rouletka.ru/gesamt",{rejectUnauthorized:false});
ws.on('open', ()=>{
	console.log('websocket opened');
})
ws.on('error',(err)=>{
	console.log('erri ',err);
})
