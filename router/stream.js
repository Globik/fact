const express = require('express')
const axios = require('axios').default;
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtsecret = "igaanegoposchte";
const { sendmessage } = require('../libs/maxbot.js');
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


router.get('/:id/:streamid', async(req, res)=>{
	//console.log('params ', req.params,' queries ', req.query);
	//console.log("sess ", req.session.suka);
	let owner=false;
	let donprog = (req.query.donprog && req.query.donprog === "yes"?"yes":"no");
	let donalert = (req.query.donalert && req.query.donalert === "yes"?"yes":"no");
	let nick = (req.query.nick?req.query.nick:(req.user?req.user.name:'anon'));
	//if(req.params&&req.params.id && req.user){
	//	if(Number(req.params.id)===req.user.id){
		//	owner=true;
		//}
	//}
	if(req.params.streamid === "no"){
		return res.redirect('/');
	}
	sendmessage({format:"html", txt: "Jemand sieht translation"});
	//console.log('user ', req.user);
	let usid = Number(req.params.id);
	let db = req.db;
	let fake_msgs;
	let fake = "no";
	if(usid == 600000 || usid == 600001 || usid == 600002 || usid == 600003 || usid == 600004 || usid == 600005){
		//console.warn("we here");
		fake = "yes";
		try{
		let a = await db.query("SELECT * FROM chat_messages ORDER BY created_at LIMIT 100");
		//console.log("messages ", a);
		if(a.length > 0)fake_msgs = a
	}catch(e){
		//console.log(e);
	}
	}
	let token = createJWT({ mama: shortid()}, jwtsecret );
	//botMessage('on streaming');
	res.rendel('streami',{ sess: (req.user?req.user.id:req.session.suka),tok: token, owner:owner, lang: 'ru' , userid:req.params.id, 
		streamid: req.params.streamid ,user:req.user, fake_msgs,donprog, donalert, nick, fake });
})


router.get('/:id', async(req, res)=>{
	sendmessage({format:"html", txt: "Jemand will Stream"});
	//console.log('params ', req.params.id, ' ', req.session.suka);
	let owner = false;
	
	let usid = Number(req.params.id);
	if(!req.user){
	if(usid === Number(req.session.suka)){
		owner = true;
	}
}else{
	if(req.user.id === usid){
		owner = true;
	}
	
	

}
let token = createJWT({ mama: shortid()}, jwtsecret );
	res.rendel('streami',{ tok: token, owner:owner, lang: 'ru' , userid: usid, user:req.user });
})
function get_msg_history(){}
module.exports = router;
