const express = require('express')
const axios = require('axios').default;
const router = express.Router()
const api_url = "https://api.yookassa.ru/v3/payments";
const { v4: uuidv4 } = require('uuid');
//const uu = uuidv4();


router.post('/api/getPayUrl', checkAuth, async(req, res)=>{
	let { damount, dcount, nick, userid } = req.body;
	//console.log(req.body);
	if(!damount || !dcount || !nick || !userid){
		return res.status(200).send({ "error": true, message: "No data" });
	}
let db = req.db;
let data = {
		"amount": {
			"value": damount,
			"currency": "RUB"
		}, 
		capture:true,
		"confirmation":
		 {"type": "redirect",
		"return_url":"https://rouletka.ru" 
			 },
			"description": "Сердечек покупка в количестве " + dcount + " штук",
			"metadata": { "userid": userid, "nick": nick, "count": dcount },
			"receipt":{
				customer:{"email":"gafarovalik411@yandex.ru"},
					items:[{
					description:"Сердечек покупка в количестве " + dcount + " штук",
					quantity:"1",
					vat_code:"1",
					amount:{"value":damount,currency:"RUB"}
					}]}
			
		};
//let headers = { "Authorization": "Basic " + onesignal_app_key };
	console.log('req.app.locals ', req.app.locals.testshopid, ' ', req.app.locals.testshopsecret);
	if(!req.app.locals.testshopid || !req.app.locals.testshopsecret){
		return res.status(200).send({ error: true, message: "No test shop id or test secret" });
	}
	let uu = uuidv4();
let headers = {'Idempotence-Key': uu };
let r;
try{
 r = await axios.post(api_url, data, {auth: {username: req.app.locals.testshopid, password: req.app.locals.testshopsecret } , headers: headers });
console.log("r: ", r.data);
let d = r.data;
// insert into testPurchase(id,status,nick,userid,amount,dcount,created_at) values('44444ddffgr5','pending','dima','5','10.00',9,'2013-07-18 13:44:22.123456');

//await db.query('insert into testPurchase(id,status,nick,userid,amount,dcount) values((?),(?),(?),(?),(?),(?))' , [ d.id, d.status, d.metadata.nick, d.metadata.userid,d.amount.value,d.metadata.count ]);
if(r.data.confirmation && r.data.confirmation.confirmation_url)res.json({ message: r.data.confirmation.confirmation_url });
}catch(e){
console.log("err: ", e);
res.status(200).send({ error: true, message: e });
}	
})

/*
 * 2200000000000004
  {
  id: '2dcf0ce8-000f-5000-a000-1ac95d0d4664',
  status: 'pending',
  amount: { value: '100.00', currency: 'RUB' },
  description: 'Сердечек покупка в количестве 10 штук',
  recipient: { account_id: '383452', gateway_id: '2239359' },
  created_at: '2024-05-09T16:26:17.000Z',
  confirmation: {
    type: 'redirect',
    confirmation_url: 'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2dcf0ce8-000f-5000-a000-1ac95d0d4664'
  },
  test: true,
  paid: false,
  refundable: false,
  metadata: { alikey: 'number one' }
}
 
 {"type":"notification",
 * "event":"payment.waiting_for_capture","
 * object":{
 * "id":"2dd02058-000f-5000-9000-11b023044aa4",
 * "status":"waiting_for_capture",
 * "amount":{
 * "value":"100.00",
 * "currency":"RUB"
 * },
 * "description":"Сердечек покупка в количестве 10 штук",
 * "recipient":{
 * "account_id":"383452",
 * "gateway_id":"2239359"
 * },
 * "payment_method":{
 * "type":"bank_card",
 * "id":"2dd02058-000f-5000-9000-11b023044aa4",
 * "saved":false,
 * "title":"Bank card *0004",
 * "card":{
 * "first6":"220000",
 * "last4":"0004","expiry_year":"2025","expiry_month":"12","card_type":"Mir"}},"
 * created_at":"2024-05-10T12:01:28.271Z",
 * "expires_at":"2024-05-17T12:02:42.901Z",
 * "test":true,
 * "paid":true,
 * "refundable":false,
 * "metadata":{"alikey":"number one"},
 * "authorization_details":{"rrn":"332781340030135","auth_code":"409319","three_
 * d_secure":{"applied":true,"protocol":"v1","method_completed":false,"challenge_completed":true}}
 * }
 * }
 ================
 {"type":"notification",
  "event":"payment.succeeded",
  "object":{
  "id":"2dd14ab4-000f-5000-9000-1e1153132ef8",
  "status":"succeeded",
  "amount":{"value":"700.00","currency":"RUB"},
   "income_amount":{"value":"675.50","currency":"RUB"},
   "description":"Сердечек покупка в количестве 100 штук",
    "recipient":{"account_id":"383452","gateway_id":"2239359"},
    "payment_method":{"type":"bank_card","id":"2dd14ab4-000f-5000-9000-1e1153132ef8","saved":false,"title":"Bank card *0004",
    "card":{"first6":"220000","last4":"0004","expiry_year":"2012","expiry_month":"12","card_type":"Mir"}
    },
    "captured_at":"2024-05-11T09:15:14.241Z",
    "created_at":"2024-05-11T09:14:28.469Z",
    "test":true,
    "refunded_amount":{"value":"0.00","currency":"RUB"},
    "paid":true,
    "refundable":true,
    "receipt_registration":"succeeded",
    "metadata":{"count":"100","nick":"suka1","userid":"5"},
    "authorization_details":{
    "rrn":"497929218766510",
    "auth_code":"671955",
 "three_d_secure":{"applied":true,"protocol":"v1","method_completed":false,"challenge_completed":true}
 }
 }
}
 */ 
var iii = 0;
const dummy = new Map();
//dummy.set(4,{name:"alik"})
let du=true;
if(du=='true'){
	console.log("TRUE HERE");
}
router.post("/cb/testyookassa", async(req, res)=>{
	let d = req.body;
	let db = req.db;
	
	dummy.set(iii, d);
	console.log('body: ', d);
	iii++;
	
	if(d.event=="payment.succeeded"){
		console.log("*************** SUCCEEDED!!! *****************", d.object.paid);
		//if(d.object.paid==true){
			console.log("vor try");
			try{
				/*
				console.log('****************** ON DUPLICATE KEY UPDATE *************')
await db.query(`insert into testPurchase(id,status,nick,userid,amount,dcount) values((?),(?),(?),(?),(?),(?)) ON DUPLICATE KEY UPDATE status=(?)` , 
[ 
d.object.id, 
d.object.status, 
d.object.metadata.nick, 
d.object.metadata.userid,
d.object.amount.value,
d.object.metadata.count,
d.object.status
]);
*/ 
let a = Number(d.object.metadata.count);
await db.query(`update users set theart=theart+(?) where id=(?)`, [ a, d.object.metadata.userid ])
			}catch(err){
				console.log(err);
			}
		//}
	}
	
	
	
	res.status(200).send({ message: "OK" });
})
//console.log('dummy: ', dummy)
router.post('/api/takeCb',/* checkAuth, checkRole(['admin']),*/ async(req, res)=>{
	
	let a = (dummy.size==0?"Nothing": [...dummy]);
	res.json({ message: a });
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
	res.redirect('/');
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
		return res.redirect('/');
	}
}
