const express = require('express')
const axios = require('axios').default;
const router = express.Router();
const app = express()
const VIDEOCHAT_TG_ID = '-1002494074502';
const tg_api = '7129138329:AAGl9GvZlsK3RsL9Vb3PQGoXOdeoc97lpJ4';
async function botMessage(txt){
	if(process.env.DEVELOPMENT == 'yes')return;
	try{
		await axios.post(`https://api.telegram.org/bot${tg_api}/sendMessage`, {
    chat_id: VIDEOCHAT_TG_ID,
    text: txt,
    parse_mode: 'html',
    disable_notification: false
  });
	}catch(e){
		console.log(e);
		}
}

app.get('/:id/:streamid', async(req, res)=>{
	//console.log('params ', req.params);
	let owner=false;
	if(req.params&&req.params.id && req.user){
		if(Number(req.params.id)===req.user.id){
			owner=true;
		}
	}
	//console.log('user ', req.user);
	botMessage('on streaming');
	res.rendel('stream',{ owner:owner, lang: 'ru' , userid:req.params.id, streamid: req.params.streamid ,user:req.user});
})

app.get('/:id', async(req, res)=>{
	console.log('params ', req.params);
	let owner=false;
	if(req.params&&req.params.id && req.user){
		if(Number(req.params.id)===req.user.id){
			owner=true;
		}
	}
	console.log('user ', req.user);
	botMessage('wanna stream');
	res.rendel('stream',{ owner:owner, lang: 'ru' , userid: req.params.id, user:req.user });
})
module.exports = app;
