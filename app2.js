const https=require( "https");
const fs =require( "fs");
const fsi = require('fs/promises')
const http2=require('http2-wrapper')
const http2ExpressBridge=require('http2-express-bridge')
const url = require('url');

const express = require('express');
const {ExpressPeerServer} = require('peer');
//var cors = require('cors');
const { oni, oni1 } = require('./libs/web_push.js');
var WebSocket = require('ws');
//require.resolve('bufferutil')
//console.log('bufferutil ', WebSocket.supports.perMessageDeflate) ^8.14.2
const crypto = require('crypto');
//console.log('crypto.', crypto.randomUUID())
const passport = require("passport");
const session = require('express-session');
const mariadb = require('mariadb');
const fileUpload = require('express-fileupload');
const path = require('path');
const { spawn } = require('child_process')
const jwt = require('jsonwebtoken');
const jwtsecret = "igaanegoposchte";
const render = require('./libs/render.js');
const shortid = require('shortid');
const admin = require('./router/admin.js');
const donationalerts = require('./router/donationalerts.js');
const {ev}=require('./router/donationalerts.js')
const pay = require('./router/pay.js');
const stream = require('./router/stream.js')
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware}=require('http-proxy-middleware')
//console.log('shortid', shortid())
//console.log('donation alerts ', donationalerts)
//const { handleMediasoup, ev , handleAdminMedia } = require("./libs/mediasoup_help.js")

const axios = require('axios').default;

//console.log('ev ', ev)
//const tg_api = '7129138329:AAGl9GvZlsK3RsL9Vb3PQGoXOdeoc97lpJ4';
const grid = '-1002095475544';
const tg_api = '7129138329:AAGl9GvZlsK3RsL9Vb3PQGoXOdeoc97lpJ4';
const VIDEOCHAT_TG_ID = '-1002494074502';

//var f = new FormData()
//let sdi = 'data:image/jpeg;base64,/u87uhuggygy';
//console.log('sdi: ', sdi.split(',')[1])
//const grid = 
//const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const me = '4100118676103827'; 
const er = '410016439442251'; 
var JETZT = er;
const bodyParser =require('body-parser');

var cors = require('cors')
var mediasoupadmin = "no";

const onLine = new Map();

var {config} = require('dotenv');

config();

//const bot = new TelegramBot(tg_api, {});

async function ibot(){
	try{
		//await bot.sendMessage(gr_id, 'Hello Alik!!!');
		 axios.post(`https://api.telegram.org/bot${tg_api}/sendMessage`, {
    chat_id: grid,
    text: 'hello alik',
    parse_mode: 'html',
    disable_notification: true
  });
	}catch(e){
		console.log(e);
		}
}
//ibot();
const pool = mariadb.createPool({ 
  //  host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    connectionLimit: 5 ,
   // trace: true,
    database:'chatikon',
    bigIntAsNumber: true
});
//const app = express();
const app=http2ExpressBridge(express)
const suka = "./public";

app.use(express.static(suka));
if(process.env.DEVELOPMENT !=="yes")app.set('env','production')
//app.use(cors());
//app.use('/turn', limiter)
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(render({root:'views', development: true}));
require('./auth/auth.js')(pool, passport);

app.use(session({
	secret:'blabla',
	resave:false,
	saveUninitialized: true,
	cookie:{
		secure:false,
		maxAge: 24 * 60 * 60 * 1000
	},
	maxAge: 24 * 60 * 60 * 1000
}))
/*
app.use('/janus', createProxyMiddleware({ //8989
	target:'ws://0.0.0.0:8188',
	ws:true,
	changeOrigin:true,
	pathRewrite:{
		'^/janus':''
	}
}))*/
var stun = null;
var testshopid;
var testshopsecret;
var istestheart;

var yoomoney_client_id;
var yoomoney_secret;
var yoomoney_token;
var y_notif;
async function getstun(){
	let a;
try{
		a = await pool.query('select * from sets');
	//	console.log("stun: ", a[0].stun);
		//console.log('stun2 ', JSON.parse(a[0].stun).stun2);
		//stun = JSON.parse(a[0].stun);
		if(a.length > 0){
			stun = a[0].stun;
			testshopid = a[0].testshopid;
			//testshopid='suka'
			testshopsecret = a[0].testshopsecret;
			//console.log("here ",testshopid, testshopsecret);
			istestheart = a[0].istestHeart;
			//console.log("istest heart ",  istestheart, (istestheart==1?true:false));
			yoomoney_client_id = a[0].yoomoney_client_id;
			yoomoney_secret = a[0].yoomoney_secret;
			//console.log("yoomoney_client_id: ", yoomoney_client_id);
			yoomoney_token = a[0].yoomoney_token;
			//console.log('token : ', yoomoney_token);
			y_notif = a[0].y_notif;
			//console.log('y_notif', y_notif);
			//var quant_n=5;
			//var userid='5';
			//await pool.query('update users set theart=theart+(?),heart=1 where id=(?)', [ quant_n, userid ]);
		}
	}catch(err){
		console.log('db error =>', err);
	}
}
getstun();
app.use(passport.initialize());
app.use(passport.session());
app.use(async(req, res, next)=>{
	req.app.locals.user = req.user;
	var isln = req.get('Accept-Language');
	var langstr = (isln&&isln.includes('ru')? 'ru':isln&&isln.includes('zh')?'zh': 'en');
	//console.log('langstr ',req.get('Accept-Language') );
  req.app.locals.ln =  langstr;
	req.app.locals.stun = stun;
	req.app.locals.testshopid = testshopid;
	req.app.locals.testshopsecret = testshopsecret;
	//console.log('req.app.locals.stun ', req.app.locals.stun);
	req.app.locals.istestheart = istestheart;
	
	req.yoomoney_client_id = yoomoney_client_id;
	req.yoomoney_secret = yoomoney_secret;
	req.yoomoney_token = yoomoney_token;
	
	req.y_notif = y_notif;
	//console.log("method ", req.method, " path ",  req.path);
	//console.log("HERE 2 ",stun,testshopid,testshopsecret, req.app.locals.testshopid, req.app.locals.testshopsecret);
	//console.log(testshopsecret);
	if(req.method == "POST"){
		if(req.isAuthenticated()){
			if(req.path == "/api/setstun"){
				try{
				stun = JSON.stringify(req.body, null, 2);
				req.app.locals.stun = stun;
			}catch(err){
				//console.log(err);
				stun = null;
			}
			}else if(req.path == "/api/setTestPayment"){
		
				//console.log("here ",req.body);
				if(req.body.testshopid && req.body.testshopsecret){
					testshopid = req.body.testshopid;
					testshopsecret = req.body.testshopsecret;
					req.app.locals.testshopid = testshopid;
					req.app.locals.testshopsecret = testshopsecret;
				}
			}else if(req.path == "/admin/saveYoomoney"){
				if(req.body.client_id && req.body.client_secret){
					yoomoney_client_id = req.body.client_id;
					yoomoney_secret = req.body.client_secret;
					req.yoomoney_client_id = yoomoney_client_id;
					req.yoomoney_secret = yoomoney_secret;
				}}else if(req.path == "/admin/saveNotif"){
					//console.log("*** REALLY",req.body.y_notif );
				y_notif = req.body.y_notif;
					req.y_notif = y_notif;
				}else{}
				
			}else{}
		}
		next();
	})

app.use((req, res, next)=>{
	req.db = pool;
	next();
})

app.use('/admin', admin);
app.use('/stream', stream);
app.use('/pay', pay);
app.use('/donationalerts', donationalerts.router)
 
var imgData = {};
const getUservkUrl = `https://api.vk.com/method/users.get`;
const skey='48b5165748b5165748b516572a4ba88941448b548b516572e682a9cdaa4cd958d2d985d';
const vkey = 'fM8VjwulM3xw9cJhFDIq';
const vparam = 5.199;
app.get('/errnotfound', async(req,res)=>{
	res.rendel('errnotfound',{});
})


function createJWT(payload, secret){
	return jwt.sign(payload, secret, {
		expiresIn:'1h',
		algorithm:'HS256'
		
	});
}
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
/*
 
gst-launch-1.0 v4l2src device=/dev/video0 ! \
video/x-raw, format=YUY2, width=640, height=480, framerate=30/1 ! \
videoconvert ! \
x264enc speed-preset=ultrafast tune=zerolatency ! \
h264parse ! \
video/x-h264, stream-format=avc, alignment=au ! \
avdec_h264 ! \
videoconvert ! \
autovideosink

 gst-launch-1.0 v4l2src device=/dev/video0 ! \
video/x-raw, format=YUY2, width=1280, height=720, framerate=30/1 ! \
videoconvert ! \
x264enc speed-preset=ultrafast tune=zerolatency bitrate=2500 ! \
h264parse ! \
video/x-h264, stream-format=byte-stream, alignment=nal ! \
mpegtsmux ! \
hlssink2 location=/public/media/segment_%05d.ts \
playlist-location=/public/media/index.m3u8 \
max-files=5 target-duration=2
* eta rabjtaet
* gst-launch-1.0 v4l2src device=/dev/video0 ! \
video/x-raw, format=YUY2, width=1280, height=720, framerate=30/1 ! \
videoconvert ! \
x264enc speed-preset=ultrafast tune=zerolatency bitrate=2500 ! \
h264parse ! \
mpegtsmux ! \
hlssink location=/home/globi/media/segment_%05d.ts \
playlist-location=/home/globi/media/index.m3u8 \
max-files=5 target-duration=2
* 
* gst-launch-1.0 v4l2src device=/dev/video0 ! \
videoconvert ! \
x264enc speed-preset=ultrafast tune=zerolatency bitrate=2500 ! \
h264parse ! \
mpegtsmux ! \
hlssink location=public/media/segment_%05d.ts \
playlist-location=public/media/index.m3u8 \
max-files=5 target-duration=2

* 
* 
* 
* vot eta tochno na raspberry rabotaet:
* gst-launch-1.0 libcamerasrc ! \
video/x-raw, width=640, height=480, framerate=30/1 ! \
videoconvert ! \
x264enc speed-preset=ultrafast tune=zerolatency bitrate=2500 ! \
h264parse ! \
mpegtsmux ! \
hlssink location=media/segment_%05d.ts \
playlist-location=media/index.m3u8 \
max-files=5 target-duration=2
* 
* 
* 
* 
* 
* gst-launch-1.0 v4l2src device=/dev/video0 ! \
video/x-raw, width=1280, height=720, framerate=30/1 ! \
videoconvert ! \
v4l2h264enc extra-controls="controls,repeat_sequence_header=1,video_bitrate=2500000" ! \
h264parse ! \
video/x-h264, stream-format=byte-stream, alignment=nal ! \
mpegtsmux ! \
hlssink location=media/segment_%05d.ts \
playlist-location=media/index.m3u8 \
max-files=5 target-duration=2
* 
* 
* GST_DEBUG=3 gst-launch-1.0 v4l2src device=/dev/video0 ! \
video/x-raw, width=240, height=280, framerate=30/1 ! \
videoconvert ! \
v4l2h264enc ! \
h264parse ! \
mpegtsmux ! \
hlssink location=/home/globi/media/segment_%05d.ts \
playlist-location=/home/globi/media/index.m3u8 \
max-files=5 target-duration=2 >&1 | tee gst-debug.log
* 
* gst-launch-1.0 v4l2src device=/dev/video0 ! \
video/x-raw, width=640, height=480, framerate=30/1 ! \
queue max-size-buffers=3 leaky=downstream ! \
videoconvert ! \
v4l2h264enc extra-controls="controls,repeat_sequence_header=1,video_bitrate=2500000,key_int_max=60" ! \
h264parse ! \
video/x-h264, stream-format=byte-stream, alignment=nal ! \
queue max-size-buffers=3 leaky=downstream ! \
mpegtsmux ! \
hlssink location=/home/globi/media/segment_%05d.ts \
playlist-location=/home/globi/media/index.m3u8 \
max-files=5 target-duration=2
* 
* 
* gst-launch-1.0 v4l2src device=/dev/video0 ! \
video/x-raw, width=640, height=480, framerate=30/1 ! \
videoconvert ! \
v4l2h264enc extra-controls="controls,video_bitrate=2500000,key_int_max=60" ! \
h264parse ! \
fakesink
* 
* 
* 
* 
* gst-launch-1.0 \
   libcamerasrc ! queue ! capsfilter caps=video/x-raw,width=640,height=480,framerate=25/1,format=NV12 ! \
   v4l2h264enc extra-controls="controls,repeat_sequence_header=1,force_key_frame=2,video_bitrate=256000,video_gop_size=30" ! \
   'video/x-h264,level=(string)4' ! h264parse config-interval=25 ! rtph264pay pt=96 config-interval=25 ! udpsink host=5.35.88.151 port=5000 sync=false
gst-launch-1.0 \
libcamerasrc ! \
queue ! \
videoconvert ! \
capsfilter caps=video/x-raw,width=640,height=480,framerate=25/1,format=I420 ! \
x264enc speed-preset=ultrafast tune=zerolatency bitrate=256 key_int_max=30 ! \
h264parse config-interval=25 ! \
rtph264pay pt=96 config-interval=25 ! \
udpsink host=5.35.88.151 port=5000 sync=false
 */
// const router = express.Router();
function getShortTimeId() {
  const now = new Date();
  
  // Берем часы, минуты, секунды и миллисекунды
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ms = now.getMilliseconds().toString().padStart(3, '0');
  
  // Склеиваем в одно большое число: ЧЧММССммм
  return Number(`${hours}${minutes}${seconds}${ms}`);
}
 
app.get("/", async(req, res)=>{
	console.log("REQ.QUERY: ", req.query);
	console.log('headers ', req.headers['purpose']||req.headers['sec-fetch-dest']);
	if(req.headers['purpose']==='image'||req.headers['sec-fetch-dest']==='image'){
		console.log('ignore image');
		return res.status(404).end();
		}
	//console.log("SUKA", req.path);
	
	let token = createJWT({ mama: shortid()}, jwtsecret );
	let db = req.db;
	let ip = req.ip;
	//console.log('session ', req.session , ' and ', req.session.suka);
	let sess = getShortTimeId();
	req.session.suka = sess;
	//console.log('sess ', req.session);
	//console.log('session ', req.session , ' and ', req.session.suka);
	botMessage("jemand on /");
	res.rendel('main', { tok: token, ip: ip, sess: (req.user?req.user.id:req.session.suka), mediasoupadmin: mediasoupadmin, imgData: imgData, lang: 'ru', yacount: JETZT, uuid: crypto.randomUUID(), VK:false });
})



app.get("/demospace", async(req, res)=>{
	console.log('session in demospace ', req.session, ' and ', req.session.suka);
	res.rendel('demospace',{});
})
app.get("/jstream", async(req, res)=>{
	let token = createJWT({ mama: shortid()}, jwtsecret );
	botMessage('see alik');
	res.json({message:'ok'});
//	res.rendel('jstream',{ tok: token,lang:'ru' });
})
app.post("/januscb", async(req,res)=>{
	console.log('januscb', req.body);
	res.json({message:'ok'});
})
const devlovetok = "ulC59bAUDtkH_pXtfO5Zvg_IJECp242NcfmMcfrPxRZGnehZXjHGLgDBaAPbJdXO";
// key e9483027fb324eb2
// iv B853ACD2950AF9E1
// cb url https://chatikon.ru/cb/love
app.post('/lovetoken', async(req, res)=>{
	let { uid, uname } = req.body;
	if(!uid || !uname){
		return res.json({ error: true, message: 'no data' });
	}
	try{
		const result=await axios.post("https://api.lovense-api.com/api/basicApi/getToken",{
			token:devlovetok,
			uid: uid,
			uname: uname
		});
		console.log('data ', result.data);
		res.json({message: result.data.message,authToken:result.data.data.authToken });
	}catch(e){
		return res.json({ error: true, message: e });
	}
})
 // verteidigen key fM8VjwulM3xw9cJhFDIq
 
 const obj6={
  vk_access_token_settings: 'status',
  vk_app_id: '52272918',
  vk_are_notifications_enabled: '0',
  vk_is_app_user: '1',
  vk_is_favorite: '0',
  vk_language: 'ru',
  vk_platform: 'mobile_web',
  vk_ref: 'other',
  vk_ts: '1726054014',
  vk_user_id: '98506638',
  sign: 'mUkbhW5QTZnZVfd-vywgTULqUKQ4GUrE_852WDps8Xo'
}  
//const sign = obj6.sign;
//delete obj6.sign;
 
//const s22 = `${obj6.vk_access_token_settings}&${obj6.vk_app_id}&${obj6.vk_are_notifications_enabled}&${obj6.vk_is_app_user}&${obj6.vk_is_favorite}&${obj6.vk_language}&${obj6.vk_platform}&${obj6.vk_ref}&${obj6.vk_ts}&${obj6.vk_user_id}`;

//const s22 = `vk_access_token_settings=${obj6.vk_access_token_settings}&vk_app_id=${obj6.vk_app_id}&vk_are_notifications_enabled=${obj6.vk_are_notifications_enabled}&vk_is_app_user=${obj6.vk_is_app_user}&vk_is_favorite=${obj6.vk_is_favorite}&vk_language=${obj6.vk_language}&vk_platform=${obj6.vk_platform}&vk_ref=${obj6.vk_ref}&vk_ts=${obj6.vk_ts}&vk_user_id=${obj6.vk_user_id}`;

function checkSign(ob){
//	console.log("OBJECT ", ob);
const sign = ob.sign;
delete ob.sign;
var ordered = '';
for(let k in ob){
	ordered+=`${k}=${ob[k]}&`;
}
ordered=ordered.substring(0, ordered.length-1);

let sha12_ha = sign;
let sh2 = crypto.createHmac('sha256', vkey);
let li2 = sh2.update(ordered).digest().toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=$/, '');
//console.log('li2: ',li2)
//console.log('sha2:', sha12_ha)
if(li2==sha12_ha){
	//console.log("vk OK");
	return true
}else{
	//console.log('vk not ok');
	return false;
}
}
/*
var ordered = '';
for(let k in obj6){
	if(k.includes('vk_'))ordered+=`${k}=${obj6[k]}&`;
}
ordered=ordered.substring(0, ordered.length-1);

console.log('si2 ', s22)
console.log("ordered ", ordered)
let sha12_ha = sign;
let sh2 = crypto.createHmac('sha256', vkey);
let li2 = sh2.update(ordered).digest().toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=$/, '');
console.log('li2: ',li2)
console.log('sha2:', sha12_ha)
if(li2==sha12_ha){
	console.log("vk OK");
}else{
	console.log('vk not ok');
}

*/

app.get('/en', async(req, res)=>{
	let ip = req.ip;
	let token = createJWT({ mama: shortid()}, jwtsecret );
	botMessage("jemand on /en");
res.rendel('main', { tok: token, ip, imgData: imgData, lang: 'en', yacount: JETZT, uuid: crypto.randomUUID() });
})
app.get('/zh', async(req, res)=>{
	let token = createJWT({ mama: shortid()}, jwtsecret);
	botMessage("jemond on /zh");
	res.rendel('main', { tok: token, ip:req.ip, imgData: imgData, lang: 'zh', yacount: JETZT, uuid: crypto.randomUUID() });
})
/*
app.get('/about/id', async(req, res)=>{
	let token = createJWT({ mama: shortid()}, jwtsecret);
	res.rendel('main', { tok: token, ip: req.ip, imgData: imgData, lang: 'id', yacount: JETZT, uuid: crypto.randomUUID() });
})
app.get("/", async(req, res)=>{
	//oni((req.user?req.user.name:'anonym'), " on about");
	res.rendel('about', {});
})
*/ 
app.get('/lolo', async(req,res)=>{
	res.rendel('lolo',{arr:[0,1,2,3,4,5], yacount: JETZT });
})

app.post('/checkip', async(req, res)=>{
	//console.log(req.body);
	let { ip } = req.body;
	if(!ip){
		return res.json({ error: true, message: 'no ip' });
	}
	let db = req.db;
	let result;
	try{
		result = await db.query('select*from banip where ip=(?)', [ ip ]);
		if(result.length > 0){
			return res.json({ message: result[0].ip});
		}
	}catch(e){
	//	console.log(e);
		return res.json({ error: true, message: e });
	}
	res.json({ message: 'nothing'});
})


app.post('/zartoone', checkAuth, async(req, res)=>{
	console.log('body: ', req.body);
	const { value, id } = req.body;
	let db = req.db;
	try{
		await db.query(`update users set zar=zar+(?) where id=(?)`, [ Number(value), id ]);
		res.json({ info: 'ok', value, id });
	}catch(err){
		//console.log(err);
		res.json({ error: err });
	}
	
})


const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

const parser = new XMLParser();
const seo = require('./libs/seo.json');

app.get('/photos', async(req,res)=>{
	res.rendel('photos', { items: seo });
})

app.get(`/photos/:okno`, async(req, res)=>{
//oooo
})

app.post('/api/getMax', async(req, res)=>{
	let db = req.db;
	try{
		//SELECT name,zar FROM users WHERE zar = (SELECT MAX(zar) FROM users);
		let r = await db.query(`select name, zar from users where zar=(select max(zar) from users)`, []);
		//console.log('result ', r);
		let info = {};
		let su = r.map(function(el){
			return { name:el.name,sum:el.zar.toString() }
		});
		
		res.json({ info:su });
	}catch(e){
		//console.log('err ', e);
		res.json({ error: e });
	}
})
app.post('/api/setyacount', async(req, res)=>{
	let {countya} = req.body;
	if(countya == me){
		JETZT = er;
	}else{
		JETZT = me;
	}
	res.json({ message: JETZT });
})
app.post('/api/auth', (req, res, next)=>{
	passport.authenticate("local", (err, user, info)=>{
		//console.log("err, user, info: ", err, user, info);
		if(err){
			return next(err);
		}
		if(!user){
			res.json(info);
			return;
		}
		req.logIn(user, (err)=>{
			if(err){
				return next(err);
			}
	
		res.json({ user: user });
		});
	})(req, res, next);
})
app.post('/logout', (req, res)=>{
	console.log('logout');
	req.logOut((err)=>{
		if(err){
			res.json({message:err, status:300});
			return;
		}
	});
	res.json({message: "ok", status:200 });
})

//app.get('/auth/telegram-login/callback', passport.authenticate('telegram-login', { session: true, successRedirect: '/about', failureRedirect:'/about'}))


/* username id hash auth_date first_name
 * 
 * userData  {
  id: '887539364',
  displayName: 'Alik',
  name: { familyName: undefined, givenName: 'Alik' },
  username: 'Globik2',
  profileUrl: 'https://t.me/Globik2',
  provider: 'telegram-login',
  _json: {
    id: '887539364',
    first_name: 'Alik',
    username: 'Globik2',
    auth_date: '1725640577'
  },
  _raw: {
    id: '887539364',
    first_name: 'Alik',
    username: 'Globik2',
    auth_date: '1725640577',
    hash: 'f8d4d60e1830c7f51b28a2d24bf8ccfad4f3d15caf74990037d00bf15a7e23ef'
  }
}

 */ 


app.get('/cb1', async(req, res)=>{
	let db = req.db;
	if(req.query&&req.query.code){
		try{
			let d = {
				code: req.query.code,
				client_id: req.yoomoney_client_id,
				grant_type: 'authorization_code',
				redirect_uri:'https://rouletka.ru/cb1',
				client_secret: req.yoomoney_secret
			}
			let r = await axios.post('https://yoomoney.ru/oauth/token', d,{headers: {
    'content-type': 'application/x-www-form-urlencoded' 
    }
    });
   // console.log("data : ", r.data);
    if(r.data.access_token){
		let a = r.data.access_token;
	//	console.log("YES access_token: ", a);
		yoomoney_token = a;
		req.yoomoney_token = a;
		await db.query('update sets set yoomoney_token=(?)', [ a ] );
		res.rendel('atoken', { message: "Получили токен " + a });
	}else{
		//console.log("no access_token");
		res.rendel('atoken', { message: "Неудача:  " + r.data.error  });
	}
		}catch(err){
		//	console.log(err);
			res.rendel('atoken', { message: err });
		}
		
	}else{
	res.rendel('atoken', { message: req.query.error });
}
})
/*
notification_type: 'p2p-incoming',
  bill_id: '',
  amount: '174.23',
  datetime: '2024-05-17T10:36:10Z',
  codepro: 'false',
  sender: '41001000040',
  sha1_hash: '03cfe527cab959f587a77085a851c3ac8b11dd19',
  test_notification: 'true',
  operation_label: '',
  operation_id: 'test-notification',
  currency: '643',
  label: ''
  * 
  * 
  * 
  * 
  * ============\
  *  notification_type: 'card-incoming',
  zip: '',
  bill_id: '',
  amount: '1.94',
  firstname: '',
  codepro: 'false',
  withdraw_amount: '2.00',
  city: '',
  unaccepted: 'false',
  label: 'id=3076&c=5',
  building: '',
  lastname: '',
  datetime: '2024-05-17T11:42:54Z',
  suite: '',
  sender: '',
  phone: '',
  sha1_hash: '26a45637e6dc053291d20744be20a56922999972',
  street: '',
  flat: '',
  fathersname: '',
  operation_label: '2dd95647-0011-5000-9000-1ce77551b7bd',
  operation_id: '769261374481140080',
  currency: '643',
  email: ''
}
li:  26a45637e6dc053291d20744be20a56922999972
sha: 26a45637e6dc053291d20744be20a56922999972
HASH IS GUET
SqlError: (conn=301, no: 1064, SQLState: 42000) You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near '`' at line 1
sql: update users set theart=theart+(?),heart=1 where id=(?)` - parameters:[5,'3076']
    at module.exports.createError (/root/apikon/node_modules/mariadb/lib/misc/errors.js:64:10)
 notification_type: 'p2p-incoming',
  bill_id: '',
  amount: '1.98',
  codepro: 'false',
  withdraw_amount: '2.00',
  unaccepted: 'false',
  label: 'id=3076&c=5',
  datetime: '2024-05-30T10:23:03Z',
  sender: '4100118676103827',
  sha1_hash: '72d6ef5bbbdb1368abd1fdc2cf1ca91cd0980696',
  operation_label: '2dea6740-0011-5000-a000-140dd82f7fa7',
  operation_id: '770379783211600084',
  currency: '643'
====
*  notification_type: 'p2p-incoming',
  bill_id: '',
  amount: '1.98',
  codepro: 'false',
  withdraw_amount: '2.00',
  unaccepted: 'false',
  label: 'id=3076&c=5',
  datetime: '2024-05-30T10:52:55Z',
  sender: '4100118676103827',
  sha1_hash: '1a0dde6e99b17fa7ff8e6e5c41880483109a9e6a',
  operation_label: '2dea6e3f-0011-5000-8000-1ef098a52e08',
  operation_id: '770381575877630108',
  currency: '643'

*/

var wi1 = {
  notification_type: 'p2p-incoming',
  bill_id: '',
  amount: '1.98',
  codepro: 'false',
  withdraw_amount: '2.00',
  unaccepted: 'false',
  label: 'id=3076&c=5',
  datetime: '2024-05-30T11:17:51Z',
  sender: '4100118676103827',
  sha1_hash: 'aef11d6c5e21ea96974d5138c4a9465740f0dfb7',
  operation_label: '2dea741b-0011-5000-a000-1cffa12cd341',
  operation_id: '770383071555008108',
  currency: '643'
}
var wi2={
  notification_type: 'p2p-incoming',
  bill_id: '',
  amount: '1.98',
  codepro: 'false',
  withdraw_amount: '2.00',
  unaccepted: 'false',
  label: 'id=3076\&c=5',
  datetime: '2024-05-30T11:33:29Z',
  sender: '4100118676103827',
  sha1_hash: '4b6a3a017adf45f5fa6834d653c2e2efc8832606',
  operation_label: '2dea77c5-0011-5000-a000-125001ba8330',
  operation_id: '770384009832968088',
  currency: '643'
}
var wi3={
  notification_type: 'p2p-incoming',
  bill_id: '',
  amount: '1.98',
  codepro: 'false',
  withdraw_amount: '2.00',
  unaccepted: 'false',
  label: 'id=3076*c=5',
  datetime: '2024-05-30T12:06:15Z',
  sender: '4100118676103827',
  sha1_hash: '7c38f10c3bad1667bb5c68a5b7074a1b37394c31',
  operation_label: '2dea7f73-0011-5000-a000-1e665691c32e',
  operation_id: '770385975307952108',
  currency: '643'
}
var wi={
	 
  notification_type: 'card-incoming',
  zip: '',
  bill_id: '',
  amount: '1.94',
  firstname: '',
  codepro: 'false',
  withdraw_amount: '2.00',
  city: '',
  unaccepted: 'false',
  label: 'id=3076&c=5',
  building: '',
  lastname: '',
  datetime: '2024-06-09T04:55:20Z',
  suite: '',
  sender: '',
  phone: '',
  sha1_hash: 'f160116ba94bdbf1be1f52627d337643e98d289e',
  street: '',
  flat: '',
  fathersname: '',
  operation_label: '2df74931-0011-5000-9000-1c62a771e8ea',
  operation_id: '771224120343575116',
  currency: '643',
  email: ''

}

//${notification_type}&${operation_id}&${amount}&${currency}&${datetime}&${sender}&${codepro}&${notification_secret}&${label}`
//const s2='card-incoming&769261374481140080&1.94&643&2024-05-17T11:42:54Z&&false&xY6P7xpSQbKBYFT0jmXtym+t&id=3076&c=5'
//const fucker = 'ZmV0Y7SBS8z1b0CIEWhKb9Qk';//ZmV0Y7SBS8z1b0CIEWhKb9Qk
const fucker = 'ZmV0Y7SBz1b0CIEWhKb9Qk';//LXLMTe9hgGIJcBTFfClIEMR4'
const s2 = `${wi.notification_type}&${wi.operation_id}&${wi.amount}&${wi.currency}&${wi.datetime}&${wi.sender}&${wi.codepro}&${fucker}&${wi.label}`;
//console.log('si2 ', s2)
let sha1_ha = wi.sha1_hash;
let sh = crypto.createHash('sha1')
let li = sh.update(s2).digest('hex')
//console.log('li: ',li)
//console.log('sha:', sha1_ha)
if(li==sha1_ha){
	//console.log("OK");
}else{
	//console.log('not ok');
}


async function setPrem(){
	try{
//	let a = await pool.query(`update users set prem="y", mon=(?) where id=5`, [ Date.now() ]);
	let a = await pool.query('select prem, mon from users');
	//let a = await pool.query('update users set prem="n", mon=null where id=5', [])
	//console.log(a);
}catch(e){
	console.log(e)
	}
}
//setPrem()
var sis="false";
var ww='Unknown';
var bh;
if(sis=="false"||ww=='Unknown'|| bh==undefined){
	console.log('bh please login ', bh);
}else{
	console.log('yes');
}
var iii2 = 0;
const dummy2 = new Map();
//var gridi = '887539364';
//	sendTelega({ grid: gridi, txt: "jemand buy partner vsnos"});
app.post('/testyoomoney1', async(req, res)=>{
	var gridi = '887539364';
	try{
	sendTelega({grid:gridi, txt: "*** CALLBACK! *** test youmany"+JSON.stringify(req.body) });
}catch(e){
	sendTelega({grid:gridi, txt: "not ok cb "+e});
}
let { notification_type,
		operation_id,
		amount,
		currency,
		datetime,
		sender,
		codepro,
		sha1_hash, 
		label,
		widthdraw_amount,
		unaccepted
		 } = req.body;
		 const buka1 = 1;
	//	const notification_secret = 'LXLMTe9hgGIJcBTFfClIEMR4';
		const notification_secret = req.y_notif;//xY6P7xpSQbKBYFT0jmXtym+t  xY6P7xpSQbKBYFT0jmXtym+t
		console.log('notofication secret', notification_secret);
let str = `${notification_type}&${operation_id}&${amount}&${currency}&${datetime}&${sender}&${codepro}&${notification_secret}&${label}`
	const paramStr = new URLSearchParams(label);
	
	//dummy2.set(iii2, req.body);
	
	iii2++;
	let db = req.db;
let sh = crypto.createHash('sha1')
let li = sh.update(str).digest('hex')
//console.log('li: ',li)
//console.log('sha:', sha1_hash)
//if(li == sha1_hash){
//console.log('HASH IS GUET')
let userid = paramStr.get('id');
let quant = paramStr.get('c');
let prem = paramStr.get('p');
let enti = paramStr.get('enti');
let quant_n = Number(quant);
//if(unaccepted == 'false'){
try{
	//console.log("updating users in db");
	if(quant){
	await db.query('update users set theart=theart+(?),heart=1 where id=(?)', [ quant_n, userid ]);
}
	if(prem){
		if(prem && Number(prem)==100){
	try{
		sendTelega({grid:gridi, txt: "pokupka premiu acc "+userid});
		await db.query(`update users set prem="y",mon=(?) where id=(?)`, [ Date.now(), userid ]);
	}catch(e){
		//console.log(e);
		sendTelega({grid:gridi, txt: "not ok prem "+e});
		return res.status(200).send({ message: "not ok" });
		}
		
		}else if(prem && Number(prem) == 300){
			try{
				let ipi = paramStr.get('ip');
				sendTelega({grid:gridi, txt: " ok ban "+userid});
				await db.query(`delete from ban where usid=(?)`, [ userid ]);
				await db.query(`update users set brole='non' where id=(?)`, [ userid ]);
			}catch(e){
			//	console.log(e);
			sendTelega({grid:gridi, txt: "not ok for ban "+e});
				return res.status(200).send({ message: "not ok" });
			}
		}else if(prem && Number(prem) == 900){
			let ipi = paramStr.get('ip');
			let coma = 'c';
			try{
				
				coma = await db.query(`delete from banip where ip=(?)`, [ ipi ]);
				try{
				sendTelega({grid:gridi, txt: " кто-то разбанивает свой айпи адрес "+ ipi });
			}catch(e){}
			}catch(e){
				sendTelega({grid:gridi, txt: "not ok for ban out ip "});
				return res.status(200).send({ message: "not ok ban out ip" });
			}
		}
}
if(enti){
	await db.query(`update users set entr=1 where id=(?)`, [ userid ]);
	var gri = '887539364';
	sendTelega({ grid: gri, txt: "jemand buy partner vsnos"});
}

}catch(err){
	//console.log(err);
	var gri = '887539364';
	sendTelega({ grid: gri, txt: err});
	return res.status(200).send({ message: "not ok" });
}
//}else{
//	return res.status(200).send({ message: "not ok" });
//}
//}else{
	let si = "HASH IS NOT GUET";
	//console.log(si);
	var gri = '887539364';
	//sendTelega({ grid: gri, txt: si});
	//return res.status(200).send({ message: "not ok" });
//}

	res.status(200).send({ message: "OK" });
})

app.post('/api/takeCb2', async(req, res)=>{
	let a = (dummy2.size==0?"Nothing": [...dummy2]);
	res.json({ message: a });
})
app.post('/api/removePremium', checkAuth, async(req, res)=>{
	let { usid } = req.body;
	if(usid){
		let db = req.db;
		try{
		await db.query('update users set prem="n", mon=null where id=(?)', [ usid ]);
	}catch(e){
		//console.log(e);
	}
	}
	res.json({ message: 'ok' });
})
app.post('/setfingerprint', async(req, res)=>{
	let { str } = req.body;
	if(!str){
		return res.json({ error: true, message: 'no string' });
	}
	let a;
	try{
		a = sha1(str);
		res.json({ message: 'ok', str: a });
	}catch(e){
		res.json({ error: true, message: e});
	}
})
function sha1(str){
	return crypto.createHash('sha1').update(str).digest('hex');
}
app.post('/api/checkBanned', checkAuth, async(req, res)=>{
	let { usid, myip } = req.body;
	let db = req.db;
	try{
		let a = await db.query(`select*from ban where ip=(?) and usid !=(?)`, [ myip, usid ]);
		if(a.length > 0){
			//found
			await db.query(`insert into ban(usid,ip,grund) values((?),(?),(?))`, [ usid, myip, 1 ]);
		}
	}catch(e){
		//console.log(e);
	}
	res.json({ message: 'ok' });
})
async function saka(){
	var r6 = await pool.query('select * from usergold where usid=1 and tgid=1');
	console.log('r6 ', r6);
}
//saka();
const dummy3 = new Map();
var iii3 = 0;



app.post('/cb/tgwebhook', async(req, res)=>{
	//console.log("*** CALLBACK from TELEGA! *** ", req.body);
	//dummy3.set(iii3, req.body);
	iii3++;
	const grid = '887539364';
	let { update_id, callback_query, pre_checkout_query, message } = req.body;
	try{
	if(callback_query){
	let { data } = callback_query;
	if(data){
		const paramStr = new URLSearchParams(data);
		
		const action = paramStr.get('action');
		if(action){
			if(action == 'gold'){
				const usid = paramStr.get('usid');
				const nick = paramStr.get('nick');
				let ph = callback_query.message.photo;
				const file_id = ph[ph.length - 1].file_id;
				let fileInfo = await getF(file_id);
				if(fileInfo){
					let file_path = fileInfo.file_path;
					let name = `${usid}.jpg`;
					await downloadF({ path: file_path, file_name: name });
					const f2 = new FormData();
					const rouletteGroup = "-1002247446123";
					console.log('nick ', nick);
					let suka1 = `nick=${nick}&fotolink=${name}&usid=${usid}&action=zwezda`;
					console.log('suka1 ', suka1);
	f2.append('chat_id', rouletteGroup);
	f2.append('title','Подписка на ' + nick);
	f2.append('description', 'Подписаться на уведомления о том, когда ' + nick+' будет онлайн в чат-рулетке https://rouletka.ru Уведомление придет к вам в телегу');
	f2.append('payload', suka1);
	f2.append('currency', 'XTR');
	f2.append('prices', `[{"label":"Subscribe on ${nick}","amount":1}]`);
	//f2.append('parse_mode', 'html');
	//693967662-3076.jpg
	let fn1 = `https://rouletka.ru/img/gold/${name}`;
	//console.log('fn1 ', fn1);
	f2.append('photo_url', fn1);
	await axios.post(`https://api.telegram.org/bot${tg_api}/sendInvoice`, f2); 
	await axios.post(`https://api.telegram.org/bot${tg_api}/sendMessage`, {
		chat_id: grid,
		text: 'Получилось!'
	});
				}
			}else if(action == "goldi"){
				let usid = paramStr.get('usid');
				let nick = paramStr.get('nick');
				let ph = callback_query.message.photo;
				let file_id = ph[ph.length - 1].file_id;
				let fileInfo = await getF(file_id);
				if(fileInfo){
					let file_path = fileInfo.file_path;
					let name = `${usid}.jpg`;
					await downloadF({ path: file_path, file_name: name });
					let f3 = new FormData();
					const rouletteGroup = "-1002247446123";
		//			console.log('nick ', nick);
					let suka1 = `nick=${nick}&fotolink=${name}&usid=${usid}&action=zwezda`;
			//		console.log('suka1 ', suka1);
					let whom = callback_query.from.id;
	f3.append('chat_id', whom);
	f3.append('title','Подписка на ' + nick);
	f3.append('description', 'Подписаться на уведомления о том, когда ' + nick+' будет онлайн в чат-рулетке https://rouletka.ru Уведомление придет к вам в телегу');
	f3.append('payload', suka1);
	f3.append('currency', 'XTR');
	f3.append('prices', `[{"label":"Subscribe on ${nick}","amount":1}]`);
	//f2.append('parse_mode', 'html');
	//693967662-3076.jpg
	let fn1 = `https://rouletka.ru/img/gold/${name}`;
	//console.log('fn1 ', fn1);
	f3.append('photo_url', fn1);
	await axios.post(`https://api.telegram.org/bot${tg_api}/sendInvoice`, f3); 
				
			}
		}else if(action == "unsub"){
			let usid = paramStr.get('usid');
			let tgid = paramStr.get('tgid');
			let nick = paramStr.get('nick');
			let lang = paramStr.get('lang');
			try{
			await pool.query('delete from usergold where tgid=(?) and usid=(?)', [ tgid, usid ]);
			await axios.post(`https://api.telegram.org/bot${tg_api}/sendMessage`, {
		chat_id: tgid,
		text: (lang=='ru'?'Вы отписались от ' + nick : 'You unsubscribed from ' + nick)
	});
		}catch(e){
			//console.log(e);
			}
		}else if(action == "ban"){
			let usid = paramStr.get('usid');
			let vip = paramStr.get('ip');
			let grund = paramStr.get('grund');
			let nick2 = paramStr.get('nick');
			let numb = 0;
			if(grund == 'vual'){
				numb = 1;
			}else if(grund == 'wix'){
				numb = 2;
			}
			try{
				let us = await pool.query(`select * from ban where usid=(?)`, [ usid ]);
				if(us.length > 0){
					//found return;
					sendTelega({ grid: grid, txt: "Уже забанили" });
					return res.status(200).send({ message: "OK" });
				}
				await pool.query(`insert into ban(usid,nick,grund) values((?),(?),(?))`, [ usid, nick2, numb ]);
				sendTelega({ grid: grid, txt: "OK, banned " + usid});
			}catch(e){
			//	console.log(e);
				sendTelega({ grid: grid, txt: e.toString() });
				// sendTelega({ grid: '887539364', txt: e.toString() });
			}
		}
	}	
	}}
//	console.log('^^^^^^^^^^^^^^^^^^^^^^ ', pre_checkout_query );
	if(pre_checkout_query){
		let { invoice_payload } = pre_checkout_query;
	//	console.log('******************** invoice_payload  ', invoice_payload );
		if(invoice_payload){
		const paramStr2 = new URLSearchParams(invoice_payload);
		let action = paramStr2.get('action');
		//console.log('**** ACTION ', action);
		if(action == "zwezda"){
			//console.log("ZWEZDA!");
			let nick = paramStr2.get('nick');
			var usid = paramStr2.get('usid');
			var fotolink = paramStr2.get('fotolink');
			var tgid = pre_checkout_query.from.id;
			
			var lang = pre_checkout_query.from.language_code;
			//console.log('tgid language code ', tgid, ' ', lang);
			var r6 = await pool.query('select * from usergold where usid=(?) and tgid=(?)', [ usid, tgid]);
			//console.log('r6 ', r6);
			if(r6.length > 0){
		let a2 = await axios.post(`https://api.telegram.org/bot${tg_api}/answerPreCheckoutQuery`, {
		pre_checkout_query_id: pre_checkout_query.id,
		ok: false,
		error_message: (lang == 'ru'?'Вы уже купили подписку на этого человека!':'You already subscribed to this user')
	});
	//console.log('a ', a.data);
			}else{
		let r7 = await axios.post(`https://api.telegram.org/bot${tg_api}/answerPreCheckoutQuery`, {
		pre_checkout_query_id: pre_checkout_query.id,
		ok: true,
		
	});
	//console.log('r7 ', r7.data);
	//SuccessfulPayment
	/*
	{update_id: 693967775,
  message: {
    message_id: 8873,
    from: {
      id: 887539364,
      is_bot: false,
      first_name: 'Alik',
      username: 'Globik2',
      language_code: 'ru'
    },
    chat: {
      id: 887539364,
      first_name: 'Alik',
      username: 'Globik2',
      type: 'private'
    },
    date: 1721763956,
    successful_payment: {
      currency: 'XTR',
      total_amount: 1,
      invoice_payload: 'nick=Asdfg&fotolink=6385.jpg&usid=6385&action=zwezda',
      telegram_payment_charge_id: 'stxyUm1pZ7obVLCzjjxMIfBNjFcLOD79978Bmb_gdbIiYf5vx64zTzNJauzJJqu0ck3ay0_EssX98ypMJWq-LuopUQPqt_wh8vTzsROKT9tgxp0K7vLbt16NoKzNz7DZZGF',
      provider_payment_charge_id: '887539364_1'
    }
  }
}
*/
			}
		}
	}
	}
	if(message && message.successful_payment){
		//console.log("SUCCESSFUL PAYMENT");
		let payload = message.successful_payment.invoice_payload;
		const paramStr3 = new URLSearchParams(payload);
		const fromid = message.from.id;
		let lang = message.from.language_code;
		let usid = paramStr3.get('usid');
		let fotolink = paramStr3.get('fotolink');
		let usnick = paramStr3.get('nick')
		/*usid MEDIUMINT NOT NULL,
nick VARCHAR (20) NOT NULL,
tgid MEDIUMINT NOT NULL,
photo varchar(50) not null,
lang varchar(3) not null
*/ 
		await pool.query('insert into usergold(usid,nick,tgid, photo, lang) values((?),(?),(?),(?),(?))', [ usid,usnick,fromid,fotolink,lang]);
		await axios.post(`https://api.telegram.org/bot${tg_api}/sendMessage`, {
		chat_id: fromid,
		text: (lang=='ru'?'Вы подписались на ' + usnick + ' Спасибо за подписку. Теперь оповещения будут поступать на ваш телеграм':'You subscribed on ' + usnick)
	});
	}
}catch(e){
	//console.log('hier error6666 ', e);
	await axios.post(`https://api.telegram.org/bot${tg_api}/sendMessage`, {
		chat_id: grid,
		text: 'Облом! ' + (e.response?JSON.stringify(e.response.data):e.toString())
	});
}
	
	
	res.status(200).send({ message: "OK" });
	})
	
	
async function sendTelega(obj){
	try{
		await axios.post(`https://api.telegram.org/bot${tg_api}/sendMessage`, {
		chat_id: obj.grid,
		text: obj.txt
	});
	}catch(e){
		//console.log(e);
		}
}
app.post('/api/takeCb3', async(req, res)=>{
	let a = (dummy3.size==0?"Nothing": [...dummy3]);
	res.json({ message: a });
})
app.get('/admin', async(req,res)=>{
	res.rendel('admin', {});
})
app.post('/newfucker', async(req,res)=>{
	//console.log("***ASOME BODY *** ", req.body);
	let  gridi = '887539364';
	try{
	sendTelega({grid:gridi, txt: "*** new fucker *** "+JSON.stringify(req.body) });
}catch(e){
	sendTelega({grid:gridi, txt: "not ok new fucker "+e});
}
	res.json({message:'ok'});
})
app.post('/api/register', (req, res, next)=>{
	passport.authenticate("local-signup", (err, user, info)=>{
		//console.log("err, user, info: ", err, user, info);
		if(err){
			return next(err);
		}
		if(!user){
			res.json(info);
			return;
		}
		req.logIn(user, (err)=>{
			if(err){
				return next(err);
			}
			//console.log("USERNAME: ", info.username);
	//	oni(info.name, " registered");
		res.json({ user: user,info:info });
		});
	})(req, res, next);
})
app.post('/api/setDonation', async(req, res)=>{
	console.log("signal: ", req.body);
	//oni(req.body.nick, " it looks like gone donation");
	res.json({ message: "ok"});
})
app.get("/dashboard", secured, isAdmin(['admin']), async(req, res)=>{
	let db = req.db;
	let a;let b;
	try{
		a = await db.query('select COUNT(*) from users');
	//console.log("a: ", a[0]['COUNT(*)'].toString());
	b = await db.query('select COUNT(*) from processTest');
	}catch(err){
		//console.log(err);
	}
	res.rendel('dashboard', { mediasoupadmin: mediasoupadmin, usercount: (a?a[0]['COUNT(*)'].toString():0), giftcount: (b?b[0]['COUNT(*)'].toString():0) });
})

app.post('/enableVideo', async(req, res)=>{
	let { checked } = req.body;
	if(checked == 'yes'){
		mediasoupadmin = 'yes';
		res.json({info: "Вы включили чат"});
	}else{
		mediasoupadmin = 'no';
		res.json({info: "Вы выключили чат"});
	}
})
app.get("/api/getUsers", checkAuth, checkRole(['admin']), async(req, res)=>{
	let db = req.db;
	try{
		//SELECT fields FROM table ORDER BY id DESC LIMIT 1;
		let a = await db.query('select name,brole, createdAt from users order by id desc limit 100');
		res.json({ content: res.compile('vUsers', { users: a })});
	}catch(err){
		res.status(400).send({ message: err.name });
	}
})

app.get("/api/stun", checkAuth, checkRole(['admin']), async(req, res)=>{
	let db = req.db;
	try{
		//SELECT fields FROM table ORDER BY id DESC LIMIT 1;
		let a = null;
		//let a = await db.query('select name,brole, createdAt from users order by id desc limit 1000');
		res.json({ content: res.compile('stun', {})});
	}catch(err){
		res.status(400).send({ message: err.name });
	}
})
app.post('/api/setstun', checkAuth, checkRole(['admin']), async(req, res)=>{
	//console.log("req.body: ", req.body);
	
	let db = req.db;
	try{
		let a = JSON.stringify(req.body, null, 2);
		let b = await pool.query('select stun from sets');
		if(b.length > 0){
		await db.query('update sets set stun=(?)', [ a ]);
	}else{
		await db.query('insert into sets(stun) values(?)', [ a ]);
	}
		res.json({ message: "OK, saved!" });
	}catch(err){
		//console.log("Error ", err);
		res.status(400).send({ message: err.name });
	}
})

const { OAuth2Client } = require('google-auth-library');
const cl = new OAuth2Client();
app.post('/checkGoogle', async(req, res)=>{
	let { token } = req.body;
	if(!token){
		return res.json({ error: true, message: 'no token or name' });
	}
	try{
	const ticket = await cl.verifyIdToken({
		idToken: token,
		audience: "670345469807-00tg40l1deqkmqqkc9db01r76tva6ien.apps.googleusercontent.com"
	});
	const payload = ticket.getPayload();
	const userid = payload['sub'];
	const name = payload['name'];
	res.json({ userid: userid, name: name });
}catch(e){
	res.json({ error: true, message: e });
}
})
const btcurl = "https://api.bitaps.com/btc/v1/";
const mybtcaddress = "bc1qjd6sdgd23h9vknhfd2l3gt3elsw3w8v9ngpj5t";
/* rr  {
  invoice: 'invPd7zbVPTGJMrXTKPfiYoygJFUUUVGzut69yKrkEvDYtBfBTtYU',
  payment_code: 'PMTvBAidjUHZPn1RxY3y8vM3CPSANXFfaaLcb75gXGTdsTs9TT16W',
  address: '3KuCztELFSgMLCkkT3MYt7bYrPFPXdJq12',
  domain: 'rouletka.ru',
  domain_hash: '9a3d1ff1f6285339f79d6788f4afff1fe3e614ff',
  confirmations: 3,
  callback_link: 'https://rouletka.ru/btccb',
  forwarding_address: 'bc1qjd6sdgd23h9vknhfd2l3gt3elsw3w8v9ngpj5t',
  currency: 'BTC'
}

 * 
 * 
 */ 
app.post("/api/getInvoice", checkAuth, async(req,res)=>{
	let { userid, inv=0 }  = req.body;
	//console.log('body ', req.body);
	if(!userid){
		return res.json({error:"No userid"});
	}
	let db = req.db;
	//WHERE creation_date < NOW() - INTERVAL '15' MINUTE select * from invoice WHERE crat > current_timestamp -  INTERVAL '6' MINUTE; 
	try{
		let su = await db.query(`select*from invoice where inv=(?) and crAt > current_timestamp -  INTERVAL '6' MINUTE`, [inv]);
	//	console.log("****SU**** ",su);
		if(su.length > 0){
		//	console.log("bbbbbb ",su);
			return res.json({ error: "Already pressed the button", status: 1 });
		}
	}catch(err){
		return res.json({"error": err.toString()});
	}
	let d = {};
	d.forwarding_address = mybtcaddress;
	d.callback_link = "https://rouletka.ru/btccb";
	d.confirmations = 3;
	try{
		let rr = await axios.post(btcurl+"create/payment/address", d); 
		//console.log('rr ', rr.data);
		sendTelega({ grid: '887539364', txt: JSON.stringify(rr.data) });
		//console.log(rr.data.response?rr.data.responce:'');
		await db.query(`insert into invoice(usid,inv,pc) values((?),(?),(?))`, [ userid,rr.data.invoice,rr.data.payment_code]);
		return res.json({ message:"ok", btcad: rr.data.address, inv:rr.data.invoice });
	}catch(err){
		//console.log(err);
		return res.json({error: err.toString()});
	}
	
	res.json({message: "ok"});
	
})
app.post('/btccb', async (req, res)=>{
	let { invoice, code, amount,event } = req.body;
	let db = req.db;
	if(event == "confirmed"){
		if(amount){}
	try{
		let a = await db.query(`select usid from invoice where inv=(?)`, [invoice]);
		if(a.length > 0){
			let b = await db.query(`update users set prem="y",mon=(?) where id=(?)`, [ Date.now(), a[0].usid ]);
		}
	}catch(err){
		sendTelega({ grid: '887539364', txt: err.toString() });
	}
	}
	sendTelega({ grid: '887539364', txt: amount + ' ' + event });
//res.status(200).send({ invoice:  invoice });
res.status(200).send(invoice)
})
app.post('/api/setviewdvk', async(req, res)=>{
	//console.log('body ', req.body);
	let { vkid } = req.body;
	if(!vkid){
		return res.json({message: "No vkid"});
	}
	let db = req.db;
	try{
		await db.query(`update users set entr=1 where vkid=(?)`, [ vkid ]);
	}catch(e){
		//console.log(e);
	}
	res.json({ message:"OK"});
});


function verifyJWT(token, secret){
	try{
		return jwt.verify(token, secret);
	}catch(err){
		//console.log(err);
		return null;
	}
}
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, //15 min
	max:100
})
app.post("/faketurn", limiter, async(req, res)=>{
	res.json({txt: 'some text'});
})
app.post("/turn", async(req,res)=>{
	let { tok } = req.body;
	if(!tok){
		return res.json({ username: 'valik', password: '1234'});
	}
	const origin = req.get('origin');
	if(process.env.DEVELOPMENT === 'yes'){}else{
	if(!origin || !origin.includes('chatikon.ru')){
		console.log('origin ', origin);
	var gridi = '887539364';
	
	sendTelega({grid:gridi, txt: origin });
		return res.json({ username: 'realik', password: '1234'});
	}
	
}
	const decoded = verifyJWT(tok, jwtsecret);
	if(!decoded){
		return res.json({ username: 'salik', password: '1234'});
	}
	const timestamp = Math.floor(Date.now() / 1000)+3600;
	const username = `${timestamp}:chatikon.ru`;
	const password = crypto.createHmac('sha1', 'abba41,c').update(username).digest('base64');
	
	res.json({ username, password });
})
app.get("/api/getSettings", checkAuth, checkRole(['admin']), async(req, res)=>{
		res.json({ content: res.compile('settings', {})});
})

app.post("/api/setTestPayment" , checkAuth, checkRole(['admin']), async(req, res)=>{
	//console.log("req.body: ", req.body);
	let { testshopid, testshopsecret } = req.body;
	
	if(!testshopid || !testshopsecret){
		return res.status(400).send({ message: "No data" });
	}
	let db = req.db;
	try{
let a = await db.query(`update sets set testshopid=(?),testshopsecret=(?)`, [ testshopid, testshopsecret ]);
	//	console.log('a: ', a);
		res.json({ message: "OK! Saved!" });
	}catch(er){
		//console.log("er: ", er);
		res.status(400).send({ message: er.name });
	}
})
app.get('/api/getTest', checkAuth, checkRole(['admin']), async(req, res)=>{
	res.json({ content: res.compile('ytest', {})});
})
app.get('/getMessages', async(req,res)=>{
	let db = req.db;
	try{
		await db.query(`DELETE FROM chat_messages 
WHERE created_at < (
    SELECT created_at FROM (
        SELECT created_at 
        FROM chat_messages 
        ORDER BY created_at DESC 
        LIMIT 1 OFFSET 39
    ) AS tmp
);`);
		let result = await db.query('select message,fromi from chat_messages');
	

		res.json({result:result});
	}catch(e){
		res.json({error:true, error: e});
	}
})
app.post('/removePrizrak', async(req, res)=>{
	let { id } = req.body;
	if(id){
		if(onLine.has(id)){
			onLine.delete(id);
		}
	}
	res.json({ message: 'ok' });
})
const fsa = require('node:fs/promises');
app.post('/api/filesupload'/*, checkAuth*/, async(req, res)=>{
	if(!req.files){
		return res.status(400).send('no files were uploaded.');
	}
	const file = req.files.video;
	const thumb = req.files.thumbnail
	//console.log('file ', file, ' ', thumb);
	//console.log('fields ', req.body);
	const { duration, userId, username, codec } = req.body;
	let p ="./public/img/files/"+file.name;
	let pp ="./public/img/files/" + thumb.name;
	try{
	//	console.log('suka');
	let a = await setFile(file, p);
	//console.log('*****************a ', a);
	let b = await setFile(thumb, pp);
	//console.log('b ****************** ', b);
	let c = await convertTomp({ p: a, user_id: userId, codec: codec });
	//console.log('c ', c);
	
	const f = new FormData();
		let grid = '887539364';
		//let ru =  fs.createReadStream(c);
		//let ru = await fucki(c);
		let ru = await fsa.readFile(c);
	//console.log('ru ', ru);
let ab = await fsa.readFile(b);
		f.append('video', new Blob([ru]));
		f.append('chat_id', grid);
		//if(imgdata2)
		f.append('thumbnail', new Blob([ab]));
		f.append('duration', duration);
		f.append('disable_notification', false);
		//f.append('caption', "Это я - <b>" + username + '</b> (' + userId + ') - зажигаю не по-детски в чат рулетке  на <a href="https://rouletka.ru/about">https://rouletka.ru</a>\n  Больше эротики в группе <a href="https://t.me/roulette7776">Рулетка</a>');
		f.append('parse_mode', 'html');
		
		const turl = `https://api.telegram.org/bot${tg_api}/sendVideo`;
		//const turl2 = `https://api.telegram.org/bot${tg_api}/sendVideoNote`;
		let rr = await axios.post(turl, f); 
		//console.log('rr ', rr.data);
		if(rr.data.ok== true){
			try{
			await fsa.unlink(a);
			await fsa.unlink(b);
			await fsa.unlink(c);
		}catch(err){
			//console.log('here err ', err);
		}
		}
		//let su = rr.data.result.video.file_id;
		//const f2 = new FormData();
		//f2.append('video_note', su);
		//f2.append('chat_id', grid);
		//f2.append('thumbnail', new Blob([ab]));
		//let vu = await axios.post(turl2,f2);
		//console.log('vv ', vu);
	//	});
}catch(er){
	if(er.response){
		
	console.log('error ', er.response.data);}else{console.log(er);}
}
	res.json({ ok: true, message: "OK! Saved!" });
})

function setFile(file,p){
	return new Promise(function(resolve, rej){
		file.mv(p, (err)=>{
		if(err){
		//	console.log(err);
			return rej(err);
			//return res.status(500).send(err);
		}
		//console.log(p);
return resolve(p);
		//return res.send({status:"ok", path:p});
	});
	});
}
function convertTomp(obj){
	// https://blog.addpipe/converting-webm-to-mp4-with-ffmpeg/
	return new Promise(function(resolve, rej){
		var du;
		if(obj.codec == 'video/webm;codecs=h264,opus'){
		 du = ['-y','-i',obj.p,'-c:v','copy','./public/img/files/'+ obj.user_id+'.mp4'];
	 }else if(obj.codec == 'video/webm;codecs=vp9,opus'){
		 du = ['-y', '-i',obj.p,'-movflags','faststart','-profile:v','high','-level','4.2','-async', '1','-vsync','1','-crf','18','./public/img/files/'+obj.user_id +'.mp4'];
	 }else if(obj.codec == 'video/webm;codecs=vp8,opus'){
		 du = ['-y', '-i',obj.p,'-movflags','faststart','-profile:v','high','-level','4.2','-async','1','-vsync','1','-crf','18','./public/img/files/'+obj.user_id +'.mp4'];
	 }else{}
		const ls = spawn('ffmpeg', du);
		ls.stderr.on('data', data=>{
			//console.log(data.toString())
			});
		ls.stdout.on('data', data=>{
		//	console.log(data.toString())
			});
		ls.on('close', code=>{
			if(code == 0){
				 resolve('./public/img/files/'+ obj.user_id+'.mp4');
			}else{  rej('error');}
			ls.on('exit', code=>{console.log('child process exit ', code)
				resolve('suka')});
		});
	});
}

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
		return res.redirect('/');
	}
}



const dkey = "/etc/letsencrypt/live/chatikon.ru/privkey.pem";
const dcert = "/etc/letsencrypt/live/chatikon.ru/fullchain.pem";
// /etc/letsencrypt/live/rouletka.ru-0001/fullchain.pem
//        /etc/letsencrypt/live/rouletka.ru-0001/privkey.pem
const http = require('http')
const port = 3000;//process.env.DEVELOPMENT=='yes'?3000:443;
var servi;

//if(process.env.DEVELOPMENT == "yesi"){
servi=http.createServer(app);
servi.listen(port, () => {
 console.log(`Started on localhost:${port}`);
})
let serverPeer=http.createServer(app)
//}else{
//servi = http2
 // .createSecureServer({
 //    key: fs.readFileSync(process.env.DEVELOPMENT=="yes"?"certs/privkey.pem":dkey),
  //   cert: fs.readFileSync(process.env.DEVELOPMENT=="yes"?"certs/fullchain.pem":dcert),maxVersion:'TLSv1.2',minVersion:'TLSv1.2',allowHTTP1:true
 //   },
  //  app)
  //.listen(port, ()=>{
  //  console.log('Started on https://chatikon.ru:' + port);
 // });
//}
const ORIGINAL = "https://chatikon.ru";
//const serverPeer = http2.createSecureServer({
 //    key: fs.readFileSync(process.env.DEVELOPMENT=="yes"?"certs/privkey.pem":dkey),
 //    cert: fs.readFileSync(process.env.DEVELOPMENT=="yes"?"certs/fullchain.pem":dcert),maxVersion:'TLSv1.2',minVersion:'TLSv1.2',allowHTTP1:true
 //   },app);
const wsServer = new WebSocket.Server({server: servi, verifyClient:(info,cb)=>{
	//console.log('info.origin: ', info.origin);
if(process.env.DEVELOPMENT === "yes"){cb(true);return;}else{
if(info.origin === ORIGINAL){cb(true);return;}
cb(false);
	}
	},/*, perMessageDeflate:{zlibDeflateOptions:3},zlibInflateOptions:{chunkSize:512}, threshold: 512 */});
const peerServer = ExpressPeerServer(serverPeer, {

    proxied: true,
    debug: true,
    // allow_discovery: true,//Allow to use GET /:key/peers
    path: '/peerjs',
    
    secure: true,//process.env.DEVELOPMENT != 'yesi',
    key: 'peerjs',
  //  ssl: process.env.DEVELOPMENT != 'yesi' ? {
   //     key: fs.readFileSync(process.env.DEVELOPMENT=="yes"?"certs/privkey.pem":dkey),
    //    cert: fs.readFileSync(process.env.DEVELOPMENT=="yes"?"certs/fullchain.pem":dcert),maxVersion:'TLSv1.2',minVersion:'TLSv1.2',allowHTTP1:true
    //} : {}
});
app.use( peerServer);
serverPeer.listen(9000, () => {
    console.log('✅ PeerJS сервер запущен на порту 9000');
});
peerServer.on('connection', (client) => {
	console.log('peer connected ');
})
let waitingQueue = [];
let matchedIds = new Map();
var connected = 0;//new Map();
function log (text) {
  const time = new Date()
  console.log('[' + time.toLocaleString() + '] ' + text)
}

function getPeerSocket (peerId) {
  for (let client of wsServer.clients) {
    if (client.id === peerId && client.readyState === WebSocket.OPEN) {
      return client
    }
  }

  return null
}

function isEven(n) {
   return n % 2 == 0;
}
//console.log(!isEven(1))
var ed=[[0,{}],[1,{}],[2,{}]]
var eda={a:[[0,{}]]};
console.log(JSON.stringify(eda))
var ign=new Map(ed);
var ed2=ign.has(3)
console.log('suka ', ed2, " ", ign.size)
//var bb=[...ign].some((l)=>l==2)
//console.log("isEven(1) ", isEven(1))
async function searchPeer (socket, msg, source) {
	let finger = msg.fingerPrint;
	//console.log("FINGER ", finger);
try{
		let result = await pool.query('select*from banip where ip=(?)', [ finger ]);
		if(result.length > 0){
			return;
		}
	}catch(e){
		
	}
	
	//console.log("BANIP ", socket.banip);
	let fingerip = socket.banip;
	try{
		let result = await pool.query('select*from banip where ip=(?)', [ fingerip ]);
		if(result.length > 0){
			//console.log(result);
			return;
		}else{
			//console.log('result2 ', result);
		}
	}catch(e){
		
	}
/*	if(socket.nick === 'anon'){
		
		if(onLine.has(socket.id)) {
			onLine.delete(socket.id)
			dynamic({ type: "dynamic", sub: "remove", id: socket.id, camcount: onLine.size });
		 if(isEven(matchedIds.size)) broadcasti({ type: "connected2", size: matchedIds.size /2,cams:onLine.size });
		  broadcasti({ type: 'connected3', cams: onLine.size });
		}
		socket.terminate();
		return;
	}*/
	//console.log('msg****',msg);
//searchPeer(socket, { type: 'peer-matched' }, { src: msg.src, ignores: msg.ignores })
	//	console.log("search peer 1",  waitingQueue.length, waitingQueue);
	//	console.log("*** MSG>IGNORES ***",  msg, " ", source.ignores);
  while (waitingQueue.length) {
	  
    let index = Math.floor(Math.random() * waitingQueue.length)
    let peerId = waitingQueue[index]
    if(socket.id == peerId) return;
    
   //  console.log("*** MSG>IGNORES ***",  msg, " ", source.ignores);
    let amap = new Map(source.ignores);
    
   
    
    
    let peerSocket = getPeerSocket(peerId)
     if(peerSocket){
	//	 console.log("**** PEER SOCKET ***");
		 
		 if(amap.has(peerSocket.id)){
			// console.log("*** HAS ignore!!! ***");
			 amap.clear();
			 return;
			// break;
		 }
	 }
 // console.log("waiting 2", waitingQueue);
    waitingQueue.splice(index, 1)
//console.log("search peer 2")
    if (peerSocket) {
		//console.log("search peer 3")
		//console.log('matchedIds1=>', [...matchedIds]);
      matchedIds.set(socket.id, peerId)
      matchedIds.set(peerId, socket.id)
     // console.log("IP: ", socket.vip);
      msg.vip = peerSocket.vip;
      msg.partnersocketid = peerSocket.id;
     // console.log('matchedIds2=>', [...matchedIds]);
      	msg.partnerId = peerSocket.userId;
      	msg.nick = peerSocket.nick;
      //	console.log("*** NICK *** ", peerSocket.nick, ' ', peerSocket.isprem);
      	msg.isprem = peerSocket.isprem;
      	let el = JSON.stringify(msg);
      //	console.log(" **** EL ***", el);
      socket.send(el);
     // console.log(`#${socket.id} matches #${peerId}`)
     if(!onLine.has(socket.id)) {
		//console.log("FINGERPRINT1 ", msg.fingerPrint);
if(source.src)	 onLine.set(socket.id, { id: socket.id, finger: msg.fingerPrint, src: source.src, nick: socket.nick });
	// broadcast({ type: "dynamic", sub: "add", id: socket.id, partnerid: peerId, nick: socket.nick, status: 'busy', camcount: onLine.size});
	if(source.src) dynamic({ type: "dynamic", sub: "add", id: socket.id, partnerid: peerId, src: source.src, nick: socket.nick, status: 'busy', camcount: onLine.size, waiting: waitingQueue, 
		finger: msg.fingerPrint });
	 if(isEven(matchedIds.size)) broadcasti({ type: "connected2", size: matchedIds.size/2 });
	 broadcasti({ type: 'connected3', cams: onLine.size });
	 // console.log('ONLINE ', onLine);
	// console.log("*************** MATCHEDIDS ****************, ", matchedIds);
	 
	
	 
	 
	 
	 
 }
      return;
    }
  }

  waitingQueue.push(socket.id);
  
 if(!onLine.has(socket.id)) {
	// console.log("*** ONLINE *** ", onLine.has(socket.id));
	// console.log("FINGERPRINT2 ", msg.fingerPrint);
	 onLine.set(socket.id, { id: socket.id, src: source.src, finger: msg.fingerPrint, nick: socket.nick });
	// broadcast({ type: "dynamic", sub: "add", id: socket.id, nick: socket.nick, status: 'free', camcount: onLine.size });
	
	if(source.src) dynamic({ type: "dynamic", sub: "add", id: socket.id, src: source.src, nick: socket.nick, camcount: onLine.size , finger: msg.fingerPrint });
	 //console.log('ONLINE 2', onLine);
	  broadcasti({ type: 'connected3', cams: onLine.size });
    if(isEven(matchedIds.size))broadcasti({ type: "connected2", size: matchedIds.size/2 });
//broadcasti({ type: "connected2", size: matchedIds.size });
//console.log("*************** MATCHEDIDS_3 ****************, ", matchedIds);
 }}
//  console.log(`#${socket.id} ${socket.nick} adds self into waiting queue`)
// console.log("waiting ", waitingQueue);
 //console.log("*** MSG>IGNORES ***",  msg, " ", source.ignores);
 //oni("Сейчас ", socket.nick + " online: " + wsServer.clients.size);
 
 /*
 if(!source || !source.src) return;
     
		try{
			
	let ra = await pool.query('select * from usergold where usid=(?)', [ socket.userId ]);
	console.log('ra ', ra);
	if(ra.length > 0){
	const notifyUsers = ra.map(async (val)=>{
    await axios.post(`https://api.telegram.org/bot${tg_api}/sendPhoto`, {
		photo: 'https://rouletka.ru/img/gold/' + val.photo,
		chat_id: val.tgid.toString(),
		disable_notification:false,
		parse_mode: "html",
		caption: (val.lang=='ru'?`<b>${val.nick}</b> online в чат рулетке на <a href="https://rouletka.ru/about">https://rouletka.ru/about</a>`:`
		<b>${val.nick}</b> is online on <a href="https://rouletka.ru/about">https://rouletka.ru/about</a>`),
		reply_markup:`{"inline_keyboard":[
	[{"text":"Unsubscribe","callback_data":"lang=${val.lang}&usid=${val.usid}&action=unsub&nick=${val.nick}&tgid=${val.tgid}"}]]}`
})
	}); 


await Promise.all(notifyUsers);*/
	
	//console.log('rr data ', rr.data);
	//console.log('photo ', JSON.stringify(rr.data.result.photo));
	//photo  [{"file_id":"AgACAgIAAxkDAAIDxGaZaPP98n4DhSIdhxsY8vnJkFlaAAKb5DEbP7LQSHWCfC1l2CawAQADAgADcwADNQQ","file_unique_id":"AQADm-QxGz-y0Eh4","file_size":554,"width":90,"height":67},
	//{"file_id":"AgACAgIAAxkDAAIDxGaZaPP98n4DhSIdhxsY8vnJkFlaAAKb5DEbP7LQSHWCfC1l2CawAQADAgADbQADNQQ","file_unique_id":"AQADm-QxGz-y0Ehy","file_size":6510,"width":320,"height":240}]
/*var f2 = new FormData();
f2.append('chat_id', grid);
	f2.append('title','Подписка на ' + socket.nick);
	f2.append('description', '<a href="HH.ru">test</a> Подписаться на уведомления о том, когда '+socket.nick+' будет онлайн в чат-рулетке. Уведомление придет к вам в телегу');
	f2.append('payload', 'payload');
	f2.append('currency', 'XTR');
	f2.append('prices', '[{"label":"my product","amount":1}]');
	f2.append('parse_mode', 'html');*/
	//f2.append('photo_url', "AQADm-QxGz-y0Eh4");
	//await axios.post(`https://api.telegram.org/bot${tg_api}/sendInvoice`, f2); 
	/*
	await axios.post(`https://api.telegram.org/bot${tg_api}/sendMessage`,{
		chat_id: grid,
		text:'Hello, buy me',
		reply_markup:{
			one_time_keyboard:false,
			inline_keyboard:[[{one_time_keyboard:false,text:'loser',callback_data:'sticker'}]]
			}
	});*/
		//}catch(e){
			//console.log(e);
		//}
	 
	 
  

async function sendFoti(socket,msg){
	if(!msg.src)return;
	let b11 = msg.src.split(',')[1];
    // console.log('b11 ', b11);
		let kk = 0;
		let buf = Buffer.from(b11, "base64");
		let grid = '887539364'
			console.log("socket.userId ", socket.userId);
		//	console.log('source ', source.src);
	var f = new FormData();
	f.append('chat_id', grid);
	f.append('parse_mode', 'html');
	//f.append('caption', '<b>'+ socket.nick + ' (' + socket.userId + ')</b>'+ ' VK ' + socket.VK + ' \n <a href="https://rouletka.ru/about">https://rouletka.ru</a>');
	f.append('disable_notification', true);
	f.append('photo', new Blob([buf]));
	/*f.append('reply_markup', `{"inline_keyboard":[
	[{"text":"Make it gold","callback_data":"usid=${socket.userId}&action=gold&nick=${socket.nick}"}],
	[{"text":"vual","callback_data":"usid=${socket.userId}&action=ban&grund=vual&ip=${socket.vip}&nick=${socket.nick}"}],
	[{"text":"wix","callback_data":"usid=${socket.userId}&action=ban&grund=wix&ip=${socket.vip}&nick=${socket.nick}"}]
	]}`);*/
	try{
	let rr = await axios.post(`https://api.telegram.org/bot${tg_api}/sendPhoto`, f); 
}catch(e){
	if(e.response){
	console.log('error in sendFoti ', e.response.data);
}else{
	console.log('error in sendFoti ', e);
}
}
}
//console.log("TIME ", Date.now())
async function setH(){
	try{
	var f = new FormData();
	f.append('url', 'https://rouletka.ru/cb/tgwebhook');
	f.append('secret_token', 'alik');
	f.append('allowed_updates',["callback_query"]);
	
	
//deleteWebhook
	let rr = await axios.post(`https://api.telegram.org/bot${tg_api}/setWebhook`, f); 
	//console.log('rr.data: ', rr.data)
}catch(e){
	console.log(e)
	}
}
//setH()
async function hookinfo(){
	try{
		let rr = await axios.post(`https://api.telegram.org/bot${tg_api}/getWebhookInfo`, {}); 
	console.log('rr.data: ', rr.data)
	}catch(e){console.log(e);}
}
//hookinfo();

//const file_id =  "AgACAgIAAxkDAAIDxGaZaPP98n4DhSIdhxsY8vnJkFlaAAKb5DEbP7LQSHWCfC1l2CawAQADAgADcwADNQQ";
//const file_id2 = "AgACAgIAAxkDAAIDxGaZaPP98n4DhSIdhxsY8vnJkFlaAAKb5DEbP7LQSHWCfC1l2CawAQADAgADbQADNQQ";

async function getF(fileid){
	try{
		let rr = await axios.post(`https://api.telegram.org/bot${tg_api}/getFile`, { file_id: fileid }); 
	//console.log('rr.data: ', rr.data)
	if(rr.data.ok == true){
	return rr.data.result;
}else{
	return undefined;
}
	}catch(e){console.log(e);return undefined;}
	/*{
	 ok: true,
  result: {
    file_id: 'AgACAgIAAxkDAAIDxGaZaPP98n4DhSIdhxsY8vnJkFlaAAKb5DEbP7LQSHWCfC1l2CawAQADAgADcwADNQQ',
    file_unique_id: 'AQADm-QxGz-y0Eh4',
    file_size: 554,
    file_path: 'photos/file_0.jpg'
  }
  * download a file https://api.telegram.org/file/bot${tg_api}/<file_path>
}*/
}
//getF()

async function downloadF(obj){
	const dir = './public/img/gold';
	try{
	let link = `https://api.telegram.org/file/bot${tg_api}/${obj.path}`;
	const response = await axios.get(link, { responseType: 'arraybuffer'})
	const fileData = Buffer.from(response.data, 'binary');
	await fsi.writeFile(`${dir}/${obj.file_name}`, fileData);
	console.log('jpg saved');
}catch(e){console.log(e)}
}
 //downloadF()
function machConnected(socket){
	if (matchedIds.has(socket.id)) {
   /* let peerId = matchedIds.get(socket.id)
    if(!connected.has(socket.id)){
		connected.set(socket.id, peerId);
		broadcast({ type: "connected2", size: connected.size });
	}
	*/ 
	//connected++;
	//(isEven(matchedIds.size))
	//broadcasti({ type: "connected2", size: matchedIds.size });
  //  let peerSocket = getPeerSocket(peerId)
}
if(isEven(matchedIds.size))broadcasti({ type: "connected2", size: matchedIds.size / 2 });
//console.log("*************** MATCHEDIDS_4 ****************, ", matchedIds);
}

function  machdisconnect(socket){
	//console.log('""""" disconnection ****');
	//connected--;
	// console.log('isEven(connected) ', connected, isEven(connected));
	//if(isEven(matchedIds.size/*connected*/)) 
//	broadcasti({ type: "connected2", size: matchedIds.size/*connected/2 */});
	
}

function hangUp (socketId, msg, bool, abrupt) {
	
	//console.log('bool ', bool, socketId);
	
	if(bool){
	if(onLine.has(socketId)){
//	console.log('online has ', socketId);
		onLine.delete(socketId);
		//broadcasti({ type: "dynamic", sub: "remove", id: socketId, camcount: onLine.size });
	//	broadcast_admin({ type: "dynamic", sub: "remove", id: socketId, camcount: onLine.size });
	dynamic({ type: "dynamic", sub: "remove", finger: msg.finger, id: socketId, camcount: onLine.size });
		 if(isEven(matchedIds.size)) broadcasti({ type: "connected2", size: matchedIds.size /2,cams:onLine.size });
		  broadcasti({ type: 'connected3', cams: onLine.size });
	}
}
  if (matchedIds.has(socketId)) {
    let peerId = matchedIds.get(socketId)
    let peerSocket = getPeerSocket(peerId)
//connected--;

    matchedIds.delete(socketId)
    matchedIds.delete(peerId)
   // console.log('isEven(connected) ',isEven(connected));
   if(isEven(matchedIds.size)) broadcasti({ type: "connected2", size: matchedIds.size/2, cams: onLine.size });
  //  console.log("*************** MATCHEDIDS ****************, ", matchedIds);
   broadcasti({ type: 'connected3', cams: onLine.size });
   
    
    
    
  //  broadcast({ type: "dynamic", sub: "connects", connects: matchedIds.size });
    if (peerSocket) {
		//connected--;
	
      peerSocket.send(JSON.stringify(msg))
     // console.log(`#${socketId} hangs up #${peerId}`)
    
    if(abrupt && abrupt == "abrupt"){
	if(peerSocket)	peerSocket.terminate();
	}
}
  } else {
    let myIndex = waitingQueue.indexOf(socketId)
    if (myIndex !== -1) {
      waitingQueue.splice(myIndex, 1)
     // console.log(`#${socketId} removes self from waiting queue`)
    }
  }
}

var ww='2024-05-10T12:01:28.271Z';
var ee=new Date(ww)
//console.log(ee.toDateString())
//console.log( new Date().toISOString().split('.')[0]+"Z" );

async function sendToPeer (socket, msg) {
	//console.log(" ************************************************* MSG SENDTOPEER ", msg);
  if (!matchedIds.has(socket.id)) {
    return
  }

  let peerId = matchedIds.get(socket.id)
  let peerSocket = getPeerSocket(peerId)

  if (peerSocket) {
	 if(msg.type=="gift"){
		// console.log('msg*** : ', msg);
		// console.log("userId, nick, userId , nick ", socket.userId, ' ', socket.nick, ' ', peerSocket.userId, ' ', peerSocket.nick);
		 if(peerSocket.isLogged == "no"){
			 wsend(socket, { type: "error", err: "Собеседник не залогинен!"});
			 return;
		 }
		 peerSocket.send(JSON.stringify(msg))
		 try{
			 let a = (msg.istestheart?'theart':'heart');
			 await pool.query(`update users set ${a}=${a}-(?) where id=(?)`, [ msg.quant, msg.from_id ]);
			 await pool.query(`update users set ${a}=${a}+(?) where id=(?)`, [ msg.quant,/* msg.to_id */ peerSocket.userId ] );
// rId, nick, userId , nick  3076   suka1   2276   alik8

await pool.query(`insert into processTest(from_id,from_nick,wieviel) values((?),(?),(?)) ON DUPLICATE KEY UPDATE wieviel=wieviel+(?)`, [ msg.from_id, msg.from_name, msg.quant, msg.quant ]);
			// peerSocket.send(JSON.stringify(msg))
		 }catch(err){
			 //console.log("SEND HEARTS ERROR ", err);
			 wsend(socket, { type: " error", err: err });
		 }
		 
	 }else{
		 //msg.nick = peerSocket.nick;
      	//console.log("*** NICK *** ", peerSocket.nick, ' ', peerSocket.isprem);
      	//msg.isprem = peerSocket.isprem;
      	let el = JSON.stringify(msg);
      	
    //  	console.log("msg from ", msg.from);
    peerSocket.send(JSON.stringify({ from: msg.from,type: msg.type, vip: msg.vip, isprem: socket.isprem, nick: socket.nick,partnerId: socket.userId, data: msg.data }))
   }
  }
}

let obid = function () {
  let tst = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    tst +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};


function noop() {}

const interval = setInterval(function ping() {
  wsServer.clients.forEach(function each(ws) {
	//  console.log("ws.isAlive", ws.isAlive);
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
   // console.log("ping");
    ws.ping(noop);
  });
},
 //1000 * 600
 1000 * 60
 //10
 );

function heartbeat() {
	//console.log("pong here", this.isAlive);
  this.isAlive = true;
  //this.send(JSON.stringify({type:"pick"}));
}
function doWas(obj){
//	console.log(" **** DO WAS!!!! ***");
	// { img_data: data.img_data, userId: ws.userId, nick: ws.nick, value: 0, publishedId: ws.id  }
	imgData.img_data = obj.img_data;
	imgData.userId = obj.userId;
	imgData.nick = obj.nick;
	imgData.value = obj.value;
	imgData.publishedId = obj.publishedId;
}
var janusonline = new Map();
/*
 ev.on('producer_published', doWas);
 ev.on("producer_unpublished", function doWas2(){
// console.log("producer unpublished event");
	clearProducer();
});

 function clearProducer(){
	 //console.log("*** clear producer ", imgData);
	 delete imgData.img_data;
	 delete imgData.userId;
	 delete imgData.nick;
	 delete imgData.value;
	 delete imgData.publishedId;
	 // console.log("*** clear producer ", imgData);
	 imgData = {}
	  //console.log("*** clear producer ", imgData);
 }
 
// ev.on("onconsume", function doWas3(obj){
	// imgData.value = obj.value;
 //});
 */
 ev.on(  'donationalerts', function(data){
	//console.log('data ', data);
	
	broadcast_janusDon(data);
})
wsServer.on('connection', async function (socket, req) {
socket.isAlive = true;
  socket.on("pong", heartbeat);
  console.log('req.url ', req.url);
	socket.burl = req.url;
	socket.dynamo = false;
	socket.isLogged = "no";
	socket.VK = false;
  const ip = req.socket.remoteAddress;
  
 // console.log('req.url ', req.url);
  if(req.url==="/janusstream"){
	 let ni = getJanusCount();
	 broadcast_janus(socket,{type:"januscount", count: ni });
  }
  const re = /([0-9]{1,3}[\.]){3}[0-9]{1,3}/;
	if(process.env.DEVELOPMENT == "yes"){
		
		try{
	let r3 = "23.23.22.35";	
	socket.banip = r3;
	wsend(socket, { type: "vip", vip: r3 })
}catch(e){}
	//console.log(r3);
	}else{
		try{
let a = ip.match(re);
let r = a[0];
socket.banip = r;
wsend(socket, { type:'vip', vip: r })
}catch(e){}
//console.log(r)
  
}
  
  
  
 // setIp(socket, ip);
  socket.id = obid();
  wsend(socket, { type: 'welcome', socketid: socket.id });
 
  
   broadcasti({ type: 'online', online: wsServer.clients.size, imgData: imgData.img_data })
  // console.log('isEven(connected) ', connected,isEven(connected));
  if(isEven(matchedIds.size /*connected)*/)) broadcasti({ type: "connected2", size:matchedIds.size/2,cams:onLine.size });

 broadcasti({ type: 'connected3', cams: onLine.size });
  
 // if(onLine.size !=0)wsend(socket, { type: "dynamic", sub: "total", cams: [...onLine] });
  
  if(janusonline.size !=0)broadcast_gesamt({type:"janus", who: [...janusonline ], subtype: "all"});
  
 
  
  
  
  
  
  
  
  
  
  let msg;
  socket.on('message', (message) => {
	  //var msg;
	  try{
     msg = JSON.parse(message)
    // console.log('msg ',msg);
}catch(e){return;}
if(msg.request == "mediasoup"){
	/*handleMediasoup.*/
	handleMediasoup(socket, msg, WebSocket, wsServer, pool).mediasoup_t();
	return;
}else if(msg.request == 'mediasoup2'){
	//handleAdminMedia(socket, msg, WebSocket, wsServer, pool).mediadmin();
	return;
}else if(msg.request == 'janus'){
	handleJanus(socket, msg, WebSocket, wsServer, pool);
	return;
}
    switch (msg.type) {
      case 'new-ice-candidate':
      case 'video-offer':
      case 'video-answer':
      case 'message':
      case "write":
      case "unwrite":
      case "gift":
      case 'addignore':
      
     // msg.vip = socket.vip
        sendToPeer(socket, msg)
        break
      //  case "mediasoup" :
         //       handleMediasoup.handleMediasoup(socket, msg, webSocket, wsServer, pool).mediasoup_t();
     //  break
     case "target":
     sendtotarget(msg);
     break
     case "getList":
     socket.dynamo = true;
     if(onLine.size !=0)wsend(socket, { type: "dynamic", sub: "total", cams: [...onLine] });
     
     break
     case "removeList":
     socket.dynamo = false;
     break;
        case "helloServer":
        socket.userId = msg.userId;
        socket.nick = msg.nick;
        socket.isLogged = msg.logged;
        socket.lang = msg.LANG;
        socket.isprem = msg.isprem;
        socket.VK = msg.VK;
        wsend(socket, { type: "helloServer", socketId: socket.id });
        break
        case 'introduce':
        socket.nick = msg.nick;
        break
        case "janusstream":
        broadcast_janus(socket, msg);
        break
        case "messagepublished":
      //  console.log('publish ', msg);
        broadcast_publish(socket, msg)
        break
        case "telegascreenshot":
        sendFoti(socket,msg);
        break;
      case 'hang-up':
      //console.log('hang-up', msg);
        hangUp(socket.id, { type: 'hang-up', finger: msg.finger, partnerId: socket.userId, ignore: msg.ignore },(msg.sub&&msg.sub=="here"?true:false), (msg.sub&&msg.sub=="abrupt"?"abrupt":"noabrupt"))
        break
      case 'search-peer':
       socket.nick = msg.nick;
        searchPeer(socket, { type: 'peer-matched', fingerPrint: msg.fingerPrint }, { src: msg.src, ignores: msg.ignores })
        break
        case 'srcdata':
    //   ev.emit('suka', { id: socket.id })
        dynamic({ type: "dynamic", sub: "srcdata", src: msg.src, id: socket.id });
        break
        case 'list':
        if(onLine.size !=0)wsend(socket, { type: "dynamic", sub: "total", cams: [...onLine] });
        break
      case 'pock':
     // console.log('pock');
    //   clearTimeout(this.pingTimeout);
	//this.pingTimeout = setTimeout(function(){
	//	socket.terminate();
	//}, 3000+1000);
        break
        case 'disconnection':
        machdisconnect(socket);
        break
        case 'connected':
        machConnected(socket);
        break
        case 'clearproducer':
       clearProducer();
        break
        case 'krestik':
        deleteConnection(msg.id);
        break
        case 'ban_publish' :
        broadcasti({ type: msg.type, nick: msg.nick });
        break
        case 'msg':
        console.log('msg ', msg);
        broadcast_room(msg);
        break
      default:
        break
    }
  })
socket.on('error', function(e){
	console.log("ERROR ***: ", e);
	socket.terminate();
})
  socket.on('close', (code, reason) => {
	  console.log("websocket closed");
	  clearTimeout(this.pingTimeout);
 //   console.log(`#${socket.id} disconnected: [${code}]${reason}`)
    broadcasti({ type: 'online', online: wsServer.clients.size })
    
    hangUp(socket.id, { type: 'hang-up', partnerId: socket.userId, ignore: false }, true, "noabrupt")
    janusclose(socket);
   // if(req.url==="/janusstream"){
	 let ni = getJanusCount();
	 broadcast_janus(socket,{type:"januscount", count: ni });
  //}
    /* handleMediasoup.*/
 // handleMediasoup(socket, msg, WebSocket, wsServer, pool).cleanUpPeer(socket.pubId);
   // handleAdminMedia(socket, msg, WebSocket, wsServer, pool).cleanMedia();
  })
})
function wsend(ws, obj) {
  try {
   let a = JSON.stringify(obj);
    if (ws.readyState === WebSocket.OPEN) ws.send(a);
  } catch (e) {}
}
function broadcast(obj){
	for (let el of wsServer.clients) {
		//console.log('broadcasto3 ');
		if(el.burl=="/gesamt")wsend(el, obj);
	}
}
function dynamic(obj){
	for (let el of wsServer.clients) {
		//console.log('broadcasto3 ');
		if(el.dynamo)wsend(el, obj);
	}
}
async function broadcast_publish(ws, obj){
		for (let el of wsServer.clients) {
			if(el.pubId && el.pubId == obj.publishedId){
				//console.log("GENAU!", el.pubId);
			wsend(el, obj);
		}
		}
		 if(obj.sub =="gift"){
		// console.log('msg gift*** : ', obj);
		 let peerSocket = getSocket(obj.publishedId);
		 if(peerSocket){
		// console.log("userId, nick, userId , nick ", socket.userId, ' ', socket.nick, ' ', peerSocket.userId, ' ', peerSocket.nick);
		 if(peerSocket.isLogged == "no"){
			// console.log('peerSocket NO logged!!!!');
			 wsend(ws, { type: "error", err: "Собеседник не залогинен!"});
			 return;
		 }
		// peerSocket.send(JSON.stringify(msg))
	//	console.log("peerSocket gift!!!!");
		wsend(peerSocket, { type: "gift2", quant: obj.quant });
		 try{
			 let a = (obj.istestheart?'theart':'heart');
			 await pool.query(`update users set ${a}=${a}-(?) where id=(?)`, [ obj.quant, obj.from_id ]);
			 await pool.query(`update users set ${a}=${a}+(?) where id=(?)`, [ obj.quant,/* msg.to_id */ peerSocket.userId ] );


await pool.query(`insert into processTest(from_id,from_nick,wieviel) values((?),(?),(?)) ON DUPLICATE KEY UPDATE wieviel=wieviel+(?)`, [ obj.from_id, obj.from_name, obj.quant, obj.quant ]);
		
		 }catch(err){
		//	 console.log("SEND HEARTS ERROR ", err);
			// wsend(socket, { type: " error", err: err });
		 }
		 
	 }else{
		// console.log('peerSocket not found!');
	 }
	 }
}

function getSocket(id){
	for (let el of wsServer.clients) {
		//console.log("el.id == id ", el.id, ' = ', id);
		if(el.id == id){
			return el;
		}
	}
	return undefined;
}
function broadcasti(obj){
	for (let el of wsServer.clients) {
		//console.log('broadcast', obj);
		wsend(el, obj);
	}
}
function broadcast_admin(obj){
	//console.log('brooadcast amin');
	for (let el of wsServer.clients) {
		//if(el.burl == "/administrator"){
	//	console.log('brooadcast amin' ,wsServer.clients.size);
		wsend(el, obj);
	//}
	}
}
async function broadcast_janusDon( obj){
	//console.log('obj ', obj);
	for (let el of wsServer.clients) {
		if(el.burl == "/janusstream"){
		
			wsend(el, obj);
		}
	}
}

async function broadcast_janus(ws, obj){
	//console.log('obj ', obj);
	for (let el of wsServer.clients) {
		if(el.burl == "/janusstream"){
		
			wsend(el, obj);
		}
	}
	try{
		//console.log('from ',obj.from);
	if(obj.value)	await pool.query('insert into chat_messages(message,fromi) values(?,?)', [obj.value,obj.from]);	
		}catch(e){
			//console.log(e);
			}	
}
function getJanusCount(){
	let n = 0;
	for (let el of wsServer.clients) {
		if(el.burl == "/janusstream"){
			n++;
		}
	}
	return n;
}
function sendtotarget(obj){
	for (let el of wsServer.clients) {
		if(el.id == obj.target){
			wsend(el, obj);
			return;
		}
		//wsend(el, { type: "target", subtype: "notfound" });
	}
}
function getPairsCount(){
	var kk=0;
	for (let el of wsServer.clients) {
    if (el.target) {
		//console.log("el.target **** ", el.target);
		kk++;
	}}
	return kk;
}
function deleteConnection(id){
	for (let el of wsServer.clients) {
		if(el.id == id){
			el.terminate();
			return;
		}
	}
}

function setIp(ws, ip){
	const re = /([0-9]{1,3}[\.]){3}[0-9]{1,3}/;
	if(process.env.DEVELOPMENT == "yes"){
	let r3 = "78.81.155.17";	
	ws.vip = r3;
	wsend(ws, { type: "vip", vip: ws.vip })
	}else{
let a = ip.match(re);
let r = a[0];
//console.log("IP: ", r)
ws.vip = r;
wsend(ws, { type: "vip", vip: ws.vip })
}
}
function handleJanus(socket, msg, WebSocket, wsServer, pool){
	if(msg.subtype  == "owner"){
		socket.owner = true;
		socket.roomid = msg.roomid;
		socket.streamid = msg.streamid;
		if(!janusonline.has(socket.roomid)) {

	
	 janusonline.set(socket.roomid, { roomid: socket.roomid, streamid: msg.streamid, src: msg.src, nick: msg.nick, views: 0 });
	// broadcast({ type: "dynamic", sub: "add", id: socket.id, nick: socket.nick, status: 'free', camcount: onLine.size });
	let a = janusonline.get(socket.roomid);
	//console.log('a.views ', a.views);
	broadcast_gesamt({type:'janus', subtype: 'add', roomid: msg.roomid, src:msg.src,nick:msg.nick,userid:msg.userid, streamid: msg.streamid, views: a.views}); 
}
	}else if(msg.subtype == "remove"){
		//console.log('on remove ', msg);
		janusclose(socket);
	}else if(msg.subtype == "subscriber"){
		socket.streamid = msg.streamid;
		socket.roomid = msg.userid
		if(janusonline.has(msg.userid)){
			let a = janusonline.get(msg.userid);
			let b = Number(a.views);
			
			b.views = b.views + 1;
			broadcast_gesamt({ type: "janus", subtype: "onviews", roomid: msg.roomid, views: b.views, userid: msg.userid, streamid: socket.streamid }); 
			broadcast_streamid({ type: "janus", subtype:"onviews", roomid: msg.roomid, views: b.views, streamid: socket.streamid });
		}
	}else if(msg.subtype == "unsubscriber"){
		if(janusonline.has(msg.roomid)){
			let a = janusonline.get(msg.roomid);
			let b = Number(a);
			b.views = b.views - 1;
			broadcast_gesamt({ type: "janus", subtype: "onviews", roomid: msg.roomid, views: b.views, userid: msg.userid, streamid: socket.streamid }); 
			broadcast_streamid({ type: "janus", subtype:"onviews", roomid: msg.roomid, views: b.views, streamid: socket.streamid , userid:msg.roomid});
			socket.roomid = 0;
			socket.streamid = 0;
			
		}
	}
}
function broadcast_gesamt(obj){

	for (let el of wsServer.clients) {
		if(el.burl == "/gesamt"){
		//console.log('brooadcast gesant' , obj);
		wsend(el, obj);
	}
	}
}
function clear_roomid(streamid){
	for (let el of wsServer.clients) {
		if(el.streamid === streamid){
			el.streamid = 0;
		}
	}
}
function broadcast_room(obj){
	for (let el of wsServer.clients) {
		if(el.burl === obj.room){
		//	console.log('broadcast room ', obj);
			wsend(el,obj);
		}}
}
function broadcast_streamid(obj){
	for (let el of wsServer.clients) {
		if(el.streamid === obj.streamid){
			wsend(obj);
		}}
		}
function janusclose(socket){
	if(socket.owner){
		if(janusonline.has(socket.roomid)){
			broadcast_gesamt({type: "janus", subtype: "remove", streamid: socket.streamid });
			janusonline.delete(socket.roomid);
			clear_roomid(socket.streamid);
			//broadcast_gesamt({type: "janus", subtype: "remove", streamid: socket.streamid });
			socket.owner = false;
			socket.roomid = 0;
			socket.streamid = 0;
			
		}
	}else{
		if(janusonline.has(socket.roomid)){
			let a = janusonline.get(socket.roomid);
			let b = Number(a);
			b.views = b.views - 1;
			broadcast_gesamt({ type: "janus", subtype: "onviews", views: b.views, userid: socket.userid, streamid: socket.streamid }); 
			broadcast_streamid({ type: "janus", subtype:"onviews", views: b.views, streamid: socket.streamid });
			
		}
	}
}
const { ApiClient } = require('@donation-alerts/api');
const { CentrifugoClient } = require('@donation-alerts/events');
const { v4: uuidv4 } = require('uuid');
const { RefreshingAuthProvider } = require('@donation-alerts/auth');


// temporary-auth.js


//const crypto = require('crypto');



// Твои данные из приложения
const CLIENT_ID = '17624';
const CLIENT_SECRET = 'e0mjT1cwCfsgBQqS2s4CFG6Ssh8HlJqhBsszCfd9';
const REDIRECT_URI = 'http://localhost:3000/callback';

app.get('/getToken', (req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  const authUrl = `https://www.donationalerts.com/oauth/authorize?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${REDIRECT_URI}&` +
    `response_type=code&` +
    `scope=oauth-user-show oauth-donation-index oauth-donation-subscribe&` +
    `state=${state}`;
  
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    const tokenResponse = await axios.post('https://www.donationalerts.com/oauth/token', 
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
    
    const { access_token, refresh_token, expires_in } = tokenResponse.data;
    
    // Получаем свой user_id
    const userResponse = await axios.get('https://www.donationalerts.com/api/v1/user/oauth', {
      headers: { 'Authorization': `Bearer ${access_token}` }
    });
    
    const userId = userResponse.data.data.id;
    
    console.log('\n🔥 СОХРАНИ ЭТИ ДАННЫЕ В БАЗУ:');
    console.log('--------------------------------');
    console.log(`User ID: ${userId}`);
    console.log(`Access Token: ${access_token}`);
    console.log(`Refresh Token: ${refresh_token}`);
    console.log(`Expires In: ${expires_in} секунд`);
    console.log('--------------------------------\n');
    
    res.send('✅ Токены получены! Скопируй их из консоли.');
    
  } catch (error) {
    console.error('Ошибка:', error.response?.data || error.message);
    res.send('❌ Ошибка. Смотри консоль.');
  }
});



// db.js



class TokenStorage {
  // Сохранить или обновить токены пользователя
  async saveUserTokens(daUserId, tokenData) {
    let conn;
    try {
    //  conn = await pool.getConnection();
      
      const {
        accessToken,
        refreshToken,
        expiresIn,
        obtainmentTimestamp,
        scopes = []
      } = tokenData;

      // Преобразуем массив scopes в строку через запятую
      const scopesString = Array.isArray(scopes) ? scopes.join(',') : scopes;

      const result = await pool.query(
        `INSERT INTO donationalerts 
         (da_user_id, access_token, refresh_token, expires_in, obtainment_timestamp, scopes) 
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
         access_token = VALUES(access_token),
         refresh_token = VALUES(refresh_token),
         expires_in = VALUES(expires_in),
         obtainment_timestamp = VALUES(obtainment_timestamp),
         scopes = VALUES(scopes)`,
        [
          daUserId,
          accessToken,
          refreshToken,
          expiresIn,
          obtainmentTimestamp,
          scopesString
        ]
      );
      
      console.log(`✅ Токены для пользователя ${daUserId} сохранены в MariaDB`);
      return result;
      
    } catch (error) {
      console.error('❌ Ошибка сохранения токенов:', error);
    //  throw error;
    } finally {
     // if (conn) conn.release(); // Всегда освобождаем соединение
    }
  }

  // Получить токены пользователя
  async getUserTokens(daUserId) {
    let conn;
    try {
    //  conn = await pool.getConnection();
      
      const rows = await pool.query(
        'SELECT * FROM donationalerts WHERE da_user_id = ?',
        [daUserId]
      );
      
      if (rows.length === 0) {
        return null;
      }
      
      const user = rows[0];
      
      // Преобразуем строку scopes обратно в массив
      if (user.scopes) {
        user.scopes = user.scopes.split(',').filter(s => s.trim());
      }
      
      return {
        accessToken: user.access_token,
        refreshToken: user.refresh_token,
        expiresIn: user.expires_in,
        obtainmentTimestamp: user.obtainment_timestamp,
        scopes: user.scopes || []
      };
      
    } catch (error) {
      console.error('❌ Ошибка получения токенов:', error);
     // throw error;
    } finally {
     // if (conn) conn.release();
    }
  }

  // Получить всех пользователей (если нужно)
  async getAllUsers() {
    let conn;
    try {
     // conn = await pool.getConnection();
      const rows = await pool.query('SELECT da_user_id FROM donationalerts');
      return rows.map(row => row.da_user_id);
    } catch (error) {
      console.error('❌ Ошибка получения пользователей:', error);
      throw error;
    } finally {
     // if (conn) conn.release();
    }
  }

  // Удалить пользователя (если нужно отозвать доступ)
  async deleteUser(daUserId) {
    let conn;
    try {
     // conn = await pool.getConnection();
      await pool.query('DELETE FROM donationalerts WHERE da_user_id = ?', [daUserId]);
      console.log(`🗑️ Пользователь ${daUserId} удален`);
    } catch (error) {
      console.error('❌ Ошибка удаления пользователя:', error);
      //throw error;
    } finally {
      //if (conn) conn.release();
    }
  }
}

var tokenStorage = new TokenStorage();
// auth.js

//const tokenStorage = require('./db');

const authProvider = new RefreshingAuthProvider({
  clientId: 17624, //process.env.CLIENT_ID,
  clientSecret: 'e0mjT1cwCfsgBQqS2s4CFG6Ssh8HlJqhBsszCfd9',//process.env.CLIENT_SECRET,
  redirectUri: 'https://localhost:3000/callback', //process.env.REDIRECT_URI,
  scopes: ['oauth-user-show', 'oauth-donation-index', 'oauth-donation-subscribe']
});

// 🔥 Критически важно: сохраняем токены при каждом обновлении
authProvider.onRefresh(async (userId, token) => {
  console.log(`🔄 Токен для пользователя ${userId} был обновлен, сохраняем в MariaDB`);
  
  await tokenStorage.saveUserTokens(userId, {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    expiresIn: token.expiresIn,
    obtainmentTimestamp: token.obtainmentTimestamp,
    scopes: token.scopes
  });
});

// Функция для добавления пользователя после OAuth
async function addUserAfterOAuth(daUserId, tokenData) {
  // Сохраняем в authProvider (в память)
  authProvider.addUser(daUserId, {
    accessToken: tokenData.accessToken,
    refreshToken: tokenData.refreshToken,
    expiresIn: tokenData.expiresIn,
    obtainmentTimestamp: tokenData.obtainmentTimestamp,
    scopes: tokenData.scopes
  });
  
  // Сохраняем в MariaDB
  await tokenStorage.saveUserTokens(daUserId, tokenData);
  
  return authProvider;
}

// Функция для загрузки всех пользователей при старте сервера
async function loadUsersFromDB() {
  try {
    const userIds = await tokenStorage.getAllUsers();
    
    for (const daUserId of userIds) {
      const tokenData = await tokenStorage.getUserTokens(daUserId);
      if (tokenData) {
        // Добавляем пользователя в authProvider
        authProvider.addUser(daUserId, {
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
          expiresIn: tokenData.expiresIn,
          obtainmentTimestamp: tokenData.obtainmentTimestamp,
          scopes: tokenData.scopes
        });
        console.log(`👤 Пользователь ${daUserId} загружен из MariaDB`);
      }
    }
  } catch (error) {
    console.error('❌ Ошибка загрузки пользователей из БД:', error);
  }
}

// Автоматически загружаем пользователей при импорте модуля
loadUsersFromDB();

//module.exports = { authProvider, addUserAfterOAuth, loadUsersFromDB };
// callback.js (эндпоинт /callback)
//const { authProvider, addUserAfterOAuth } = require('./auth');
//const tokenStorage = require('./db');

app.get('/callback333', async (req, res) => {
	console.log('hier soll callback donationalerts' , req.user?req.user.id:'no id');
  const { code } = req.query;
  
  try {
    // Обмениваем код на токен и сразу добавляем пользователя
    const tokenWithUser = await authProvider.addUserForCode(code, [
      'oauth-user-show', 
      'oauth-donation-index', 
      'oauth-donation-subscribe'
    ]);
    
    console.log('✅ Получены токены для пользователя:', tokenWithUser.userId);
    
    // Сохраняем в MariaDB
    await tokenStorage.saveUserTokens(tokenWithUser.userId, {
      accessToken: tokenWithUser.accessToken,
      refreshToken: tokenWithUser.refreshToken,
      expiresIn: tokenWithUser.expiresIn,
      obtainmentTimestamp: tokenWithUser.obtainmentTimestamp,
      scopes: tokenWithUser.scopes
    });const { ApiClient } = require('@donation-alerts/api');
const { CentrifugoClient } = require('@donation-alerts/events');
const { v4: uuidv4 } = require('uuid');
    
    res.send('✅ Авторизация успешна! Токены сохранены в MariaDB.');
  } catch (error) {
    console.error('❌ Ошибка:', error);
    res.status(500).send('Ошибка авторизации');
  }
});

app.post('/api/create-payment', async (req, res) => {
  const { username, amount, message } = req.body;
  
  try {
    // Получаем токен из БД (предположим, у нас один пользователь - стример)
    const userTokens = await tokenStorage.getUserTokens(YOUR_DA_USER_ID);
    
    if (!userTokens) {
      return res.status(401).json({ error: 'Пользователь не авторизован' });
    }
    
    // Создаем платеж через DonationAlerts API
    const response = await axios.post(
      'https://www.donationalerts.com/api/v1/payments/create',
      {
        amount: amount,
        currency: 'RUB',
        description: 'Донат на стриме',
        custom: { 
          username: username || 'Аноним',
          message: message || '',
          goal_id: 'new_triko_2026'
        },
        redirect_url: 'http://localhost:3000/success',
        webhook_url: 'http://localhost:3000/api/donation-webhook'
      },
      {
        headers: {
          'Authorization': `Bearer ${userTokens.accessToken}`,
          'Content-Type': 'application/json'
           }
      }
    );
    
    res.json({ payment_url: response.data.payment_url });
    
  } catch (error) {
    console.error('❌ Ошибка создания платежа:', error);
    res.status(500).json({ error: 'Ошибка создания платежа' });
  }
});

// Запуск WebSocket слушателя донатов
async function startDonationListener() {
	return;
  const apiClient = new ApiClient({ authProvider });
  
  // Получаем токен для подключения к WebSocket
  const connectionToken = await apiClient.users.getSocketConnectionToken(YOUR_DA_USER_ID);
  const clientId = uuidv4();
  
  // Подписываемся на канал донатов
  const donationChannel = await apiClient.centrifugo.subscribeUserToDonationAlertEvents(
    YOUR_DA_USER_ID, 
    clientId
  );
  
  const centrifugoClient = new CentrifugoClient({
    url: 'wss://centrifugo.donationalerts.com/connection/websocket',
    token: connectionToken
     });
  
  centrifugoClient.subscribe(donationChannel.channel, (ctx) => {
    const donation = ctx.data.data;
    console.log('🎉 Получен донат:', donation);
    
    // Здесь рассылаешь своим клиентам через WebSocket
    // wsServer.broadcastDonation(donation);
    
  }, { token: donationChannel.token });
  
  centrifugoClient.connect();
}
 startDonationListener().catch('er don list ', console.error);
app.post('/api/donation-webhook', async(req,res)=>{
	console.log('hook ', req.body);
	res.send('ok');
})
