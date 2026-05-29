const express = require('express')
const axios = require('axios').default;
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtsecret = "igaanegoposchte";

const shortid = require('shortid');

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

function createJWT(payload, secret){
	return jwt.sign(payload, secret, {
		expiresIn:'1h',
		algorithm:'HS256'
		
	});
}

/*
router.get('/:id/:streamid', async(req, res)=>{
	//console.log('params ', req.params);
	let owner=false;
	//if(req.params&&req.params.id && req.user){
	//	if(Number(req.params.id)===req.user.id){
		//	owner=true;
		//}
	//}
	//console.log('user ', req.user);
	let token = createJWT({ mama: shortid()}, jwtsecret );
	botMessage('on streaming');
	res.rendel('stream',{ tok: token, owner:owner, lang: 'ru' , userid:req.params.id, streamid: req.params.streamid ,user:req.user});
})
*/
router.get('/papa', async(req, res)=>{
	
	//console.log('params ', req.params.id, ' ', req.session.suka);
	let owner=false;
	//console.log('suka ', Number(req.params.id) === Number(req.session.suka));
	//if(req.params&&req.params.id && req.user){
	//	if(Number(req.params.id)===req.user.id){
	//		owner=true;
		//}
	//}
	/*
	if(!req.user){
	if(Number(req.params.id) === Number(req.session.suka)){
		owner=true;
	}
}else{
	if(req.user.id===Number(req.params.id)){
		owner = true;
	}
}*/
let token = createJWT({ mama: shortid()}, jwtsecret );
	console.log('owner', owner);
	//console.log('user ', req.user);
	botMessage('wanna stream');
	res.rendel('stream',{ tok: token, owner:owner, lang: 'ru' /*, userid: Number(req.params.id), user:req.user */});
})
module.exports = router;
