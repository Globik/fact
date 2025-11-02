const express = require('express')
const router = express.Router()
const axios = require('axios').default;

router.get('/getGiftTests', checkAuth, isAdmin(['admin']), async(req, res) => {
	let db = req.db;
	try{
	let a = await db.query('select * from processTest');
	console.log("a ", a);
   res.json({ content: res.compile('vSendsGift', { giftcount: a })});
   }catch(err){
	   console.log("here", err);
		res.status(400).send({ message: err.name });
	}
})

router.get('/getPayments', checkAuth, checkRole(['admin']), async(req, res)=>{
	try{
		let r=await axios.get('https://api.yookassa.ru/v3/payments', {auth: {username: req.app.locals.testshopid, password: req.app.locals.testshopsecret },
  params: {
    status: "succeeded" 
  }});
 // console.log(r.data);
  let a = r.data;
  res.json({ content: res.compile('vPayments', { count: a })});
	}catch(err){
		console.log(err);
		res.json({ content: err });
	}
})

router.get('/yoomoneytest', secured, isAdmin(['admin']), async(req, res)=>{
	let d = { yoomoney_client_id: req.yoomoney_client_id, yoomoney_secret: req.yoomoney_secret,
		y_notif: req.y_notif }
	console.log(d);
	res.rendel('yoomoneytest', d);
})

router.post("/saveYoomoney", checkAuth, checkRole('admin'), async(req, res)=>{
	let { client_id, client_secret } = req.body;
	if(!client_id || !client_secret){
		return res.status(200).send({ error: true, message: "No data" });
	}
	let db = req.db;
	try{
		await db.query('update sets set yoomoney_client_id=(?),yoomoney_secret=(?)', [ client_id, client_secret ]);
		res.json({ client_id, client_secret, message: "OK, saved!" });
	}catch(err){
		res.status(200).send({ error: true, message: err });
	}
	
})

router.post('/getYoomoney', checkAuth, checkRole(['admin']), async (req, res)=>{
	let client_id = req.yoomoney_client_id;
	if(!client_id){
		return res.status(200).send({ error: true, message: "No client_id" });
	}
	let d = {
		client_id: client_id,
		response_type: "code",
		redirect_uri: 'https://rouletka.ru/cb1',
		scope: 'account-info operation-history operation-details incoming-transfers payment-p2p payment-shop money-source("wallet","card")'
	}
	try{
		let r=await axios.post('https://yoomoney.ru/oauth/authorize', d,
  {headers: {
    'content-type': 'application/x-www-form-urlencoded' 
    }
    }
    );
 console.log("***");
 console.log(r.status, " ", r.code);
 console.log(r.request.res.responseUrl);
  //let a = r.data;
  if(r.status == 200){
	 res.json({ message: r.request.res.responseUrl });
  }
  //res.json({ message: "OK, redirect to yoomoney"});
}catch(err){
	console.log(err);
	res.json({ error: true, message: err.toString() });
}
})
router.post('/getYoomoneyinfo',  checkAuth, checkRole(['admin']), async (req, res)=>{
	try{
		let r = await axios.post('https://yoomoney.ru/api/account-info', {}, 
		{headers: {
    'content-type': 'application/x-www-form-urlencoded' ,
     "Authorization": "Bearer " + req.yoomoney_token 
    }
    }
		);
		console.log("DATA : ", r.data);
		res.json({ list: r.data });
	}catch(err){
		console.log(err);
		res.json({ error: true, message: err });
	}
})
let tt = "4100118676103827.9B3BDB5E0714101632D123BD929408DB958034086B35C862D88428E18077203A7AFF960F64E42B34BF57DC223E5D91284E989BD659617A78625528F57A69CD38F59EC7FB6A5F83A39B06EEA3CD0B3A902737711ACF296EB7E6AB4161A71CA7EFBD88E3214ECD0C0622DB41F87777B2DC1DBA969299D9B24A43812B0B79EC7693"
router.post('/getYoomoneyHistory', checkAuth, checkRole(['admin']), async (req, res)=>{
	try{
		let r = await axios.post('https://yoomoney.ru/api/operation-history', {}, 
		{headers: {
    'content-type': 'application/x-www-form-urlencoded' ,
     "Authorization": "Bearer " + req.yoomoney_token 
    }
    }
		);
		console.log("DATA : ", r.data);
		res.json({ list: r.data });
	}catch(err){
		console.log(err);
		res.json({ error: true, message: err });
	}
})
/*
data:  {
  error: 'illegal_params',
  error_description: 'Unknown reciever',
  status: 'refused'
}
* 
* data:  {
  status: 'success',
  request_id: '2dda8ab6-0011-5000-8000-150576dd5dc5',
  contract_amount: 2,
  balance: 20.4,
  money_source: {
    wallet: { allowed: true },
    card: {
      id: 'bindId:5550990689',
      allowed: 'true',
      csc_required: 'true',
      pan_fragment: '220220******4638',
      type: 'Mir'
    },
    cards: { allowed: true, csc_required: true, items: [Array] }
  },
  fees: { service: 0.02, counterparty: 0 },
  recipient_account_status: 'identified',
  recipient_identified: true,
  recipient_account_type: 'personal',
  recipient_masked_account: '41001******2251',
  multiple_recipients_found: false
}

data:  {
  status: 'success',
  request_id: '2dda8dc2-0011-5000-9000-1462ec118399',
  contract_amount: 2,
  balance: 20.4,
  money_source: {
    wallet: { allowed: true },
    card: {
      id: 'bindId:5550990689',
      allowed: 'true',
      csc_required: 'true',
      pan_fragment: '220220******4638',
      type: 'Mir'
    },
    cards: { allowed: true, csc_required: true, items: [Array] }
  },
  fees: { service: 0.02, counterparty: 0 },
  recipient_account_status: 'identified',
  recipient_identified: true,
  recipient_account_type: 'personal',
  recipient_masked_account: '41001******2251',
  multiple_recipients_found: false
}
data2:  {
  status: 'success',
  balance: 18.4,
  payer: '4100118676103827',
  payee: '410016439442251',
  payee_uid: 613553077,
  payment_id: '769341061919693124',
  credit_amount: 1.98
}

*/ 

router.post("/setPayout", checkAuth, async (req, res)=>{
	let { account, amount, label } =req.body;
	if(!account || !amount || !label){
		return res.json({ error: true, message: "no data" });
	}
	let db = req.db;
	try{
		let data = {
			pattern_id: 'p2p',
			to: account,
			amount: amount,
			comment: "Выплата рубля",
			message: 'Получение рубля',
			label: label
		}
		let d = await axios.post('https://yoomoney.ru/api/request-payment', data, 
		{ headers: {
    'content-type': 'application/x-www-form-urlencoded' ,
     "Authorization": "Bearer " + req.yoomoney_token 
    }
    })
    console.log('data: ', d.data);
    if(d.data.error){
		return res.json({ error: true, message: d.data.error_description, status: d.data.status });
	}
	if(d.data.status == "success"){
		let request_id = d.data.request_id
		
		try{
			let data2 = {
				request_id: request_id
			}
			let r = await axios.post('https://yoomoney.ru/api/process-payment', data2, 
		{ headers: {
    'content-type': 'application/x-www-form-urlencoded' ,
     "Authorization": "Bearer " + req.yoomoney_token 
    }
    })
    console.log('data2: ', r.data);
    if(r.data.status == "success"){
		try{
			await db.query('update users set theart=0 where id=(?)', [ label ]);
		}catch(err){
			console.log(err);
		}
	}
    return res.json({ message: 'ok2' });
		}catch(err){
			console.log(err);
			return res.json({ error: true, message: err });
		}
	}
	res.json({ message: 'ok' });
	}catch(err){
		console.log(err);
		return res.json({ error: true, message: err });
	}
	//res.json({ message: 'ok' });
})

router.post("/saveNotif", checkAuth, checkRole(['admin']), async (req, res)=>{
	let { y_notif } = req.body;
	let db = req.db;
	if(!y_notif) return res.json({ error: true, message: "no data" });
	try{
		await db.query('update sets set y_notif=(?)', [ y_notif ]);
	}catch(err){
		console.log(err);
		return res.json({ error: true, message: err});
	}
	res.json({ message: "OK saved!" , y_notif: req.y_notif });
})

router.get('/getBanned', checkAuth, isAdmin(['admin']), async(req, res) => {
	let db = req.db;
	try{
	let a = await db.query('select * from ban');
	console.log("a ", a);
   res.json({ content: res.compile('vBanned', { banlist: a })});
   }catch(err){
	   console.log("Get ban err ", err);
		res.status(400).send({ message: err.name });
	}
})

router.post('/OneBanned', checkAuth, isAdmin(['admin']), async(req, res) => {
	let { usid, nick, numb } = req.body;
	console.log('body ', req.body);
	if(!usid || !nick || !numb){
		return res.json({ error: true, message: "No usid or nick or numb" });
	}
	
	let db = req.db;
	try{
		let us = await db.query(`select * from ban where usid=(?)`, [ usid ]);
				if(us.length > 0){
					//found return;
					return res.json({ error: true, message: "Уже забанили" });
				}
	await db.query('insert into ban(usid,nick,grund) values((?),(?),(?))', [ usid, nick, numb ]);
   res.json({ message: `OK - ${nick} banned!`});
   }catch(err){
	   console.log("insert ban err ", err);
		res.status(400).send({ message: err.name });
	}
})

router.post('/deleteOneBanned', checkAuth, isAdmin(['admin']), async(req, res) => {
	let { usid } = req.body;
	if(!usid){
		return res.json({ error: true, message: "No usid" });
	}
		let db = req.db;
	try{
	await db.query('delete from ban where usid=(?)', [ usid ]);
   res.json({ message: "OK - deleted!"});
   }catch(err){
	   console.log("delete ban err ", err);
		res.status(400).send({ message: err.name });
	}
})

router.post('/bannedOutAll', checkAuth, isAdmin(['admin']), async(req, res) => {
	
	let db = req.db;
	try{
	await db.query('delete from ban', [ ]);
   res.json({ message: "OK - all deleted!"});
   }catch(err){
	   console.log("delete ban err ", err);
		res.json({ error: true, message: err.name });
	}
})
router.post('/banAll', checkAuth, isAdmin(['admin']), async(req, res) => {
	
	let db = req.db;
	try{
	await db.query(`update users set brole='ban' where brole='non'`, [ ]);
   res.json({ info: "OK - all banned!"});
   }catch(err){
	   console.log(" ban all err ", err);
		res.json({ error: err.name });
	}
});
router.post('/banoutAll', checkAuth, isAdmin(['admin']), async(req, res) => {
	
	let db = req.db;
	try{
	await db.query(`update users set brole='non' where brole='ban'`, [ ]);
   res.json({ info: "OK - всех разбанили!"});
   }catch(err){
	   console.log(" ban щге all err ", err);
		res.json({ error: err.name });
	}
});

router.post('/setBan', checkAuth, isAdmin(['admin']), async(req, res)=>{
	let db = req.db;
	let { ip } = req.body;
	//console.log('ip ', ip);
	if(!ip)return res.json({ error: true, message: "No ip" });
	let result;
	try{
		result = await db.query('select*from banip where ip=(?)', [ip]);
		if(result&&result.length > 0){
			return res.json({  message: "Уже забанили" });
		}else{
			await db.query('insert into banip(ip) values((?))', [ ip ]);
		}
	}catch(e){
		console.log(e);
		return res.json({ error: true, message: e });
	}
	res.json({ message: "Ок, забанили" });
})
router.get('/getBannedIps', checkAuth, isAdmin(['admin']), async(req, res)=>{
	let db = req.db;
	let a;
	try{
		a = await db.query(`select*from banip`, []);
		
	}catch(e){
		console.log(e);
	}
	res.json({ content: res.compile('vBanips', { count: a })});
})
router.post('/deleteBannedIps', checkAuth, isAdmin(['admin']), async(req, res)=>{
	let db = req.db;
	try{
		await db.query(`delete from banip`, []);
	}catch(e){
		return res.json({ error: true, message: e});
	}
	res.json({ message: "OK" });
})
module.exports = router

function checkAuth(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	return res.status(401).send({ message: 'Залогиньтесь.'});
}
function secured(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/about');
}
function checkRole(roles){
	return function(req, res, next){
		if(roles.includes(req.user.brole)){
			return next();
		}
		return res.status(401).send({ message: 'Недостаточно прав!' });
	}
}
function isAdmin(roles){
	return function(req, res, next){
		if(roles.includes(req.user.brole)){
			return next();
		}
		return res.redirect('/about');
	}
}
