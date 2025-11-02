const SALT = "fuck";
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const crypto = require('crypto');
const scmp = require('scmp');
const util = require("util");
const  pbkdf2 = util.promisify(crypto.pbkdf2);
const TelegramStrategy = require('passport-telegram-login');
const tg_api = '7129138329:AAGl9GvZlsK3RsL9Vb3PQGoXOdeoc97lpJ4'; 

module.exports = (db, passport)=>{

passport.serializeUser(function(user, cb){
	process.nextTick(function(){
		return cb(null,user);
	});
})

passport.deserializeUser(async function(user, cb){
	
	//console.log("deserialize user", user);
		try{
			let useri = await db.query('select id,name,zar,entr,vkid,tgid,glid, brole,heart,theart,prem,mon,grund from users left join ban on users.id=ban.usid where users.id=(?)', [ user ]);
			//console.log("USERI ", useri[0]);
		return cb(null, useri[0]);
	}catch(er){
		//console.log(er);
		return cb(er,null);
	}
	
})



passport.use('local',
new LocalStrategy({
	usernameField : 'name',
	passwordField : 'password'
},
async function(username, password, done){
	//console.log("username , paswword: ", username, password);
	
	 if (!username || !password) {
        return done(null, false, { error: true, message: 'Введите имя или пароль!', status: 401 });
    }
/*
    if (!(username.length >= 2 && password.length >= 6)) {
        return done(null, false, { error: true, message: 'Пароль должен содержать минимум 6 символов, а Имя минимум 2!' });
    }
    if(username.length >=20){
		return done(null, false, { error: true, message: 'Имя должно быть меньше 20 букв.' });
	}*/

 try{
	 
	 
	 
	 let a = await pbkdf2(Buffer.from(password), SALT, 10000, 64, 'sha512');	
	let b = a.toString('base64');
		//console.log('b: ',  b);
		let c = Buffer.from(b);
		
	 
	 
	 
	 
	 
	 
	 let wi=await db.query('select*from users where name=(?)',[username]);
	// console.log('wi :', wi);
	 if(wi.length==0){
		 return done(null, false, { error:true, message:'Пользователь не найден!', status:406 })
	 }
 let w=wi[0];

	//if(scmp(c, Buffer.from(w.password))){
	if(w.password == password){
			//console.log('MATCH!');
			return done(null, w.id, { message: "ok", status:200, name: w.name, id: w.id });
		}else{
			//console.log("NOT MATCH!");
			return done(null, false, {error: true, message:'Имя или пароль неверный!!', status:407 })
		}
	 
	

}catch(err){
	return done(null, false, { error: true, message: err.message, status: 405 })
}






}))


passport.use('local-signup', new LocalStrategy({usernameField: 'name', passReqToCallback: true}, async(req,username, password, done)=>{
//	console.log("username , paswword: ", username, password);
//	console.log('***BODY*** ', req.body);
	let ty = req.body.type;
	console.log('ty ', ty);
	
		if(ty=="gewohn"){
	if(!req.body.name || !password){return done(null,false,{error: true, message: "Missing credentials", status: 401 })}	

 //if (!username || !password) {
 //       return done(null, false, { error: true, message: 'Введите имя или пароль!', status: 402 });
  //  }

    if (!(username.length >= 2 && password.length >= 6)) {
        return done(null, false, { error: true, message: 'Пароль должен содержать минимум 6 символов, а Имя минимум 2!', status: 402 });
    }
    if(username.length >=20){
		return done(null, false, { error: true, message: 'Имя должно быть меньше 20 букв.', status: 403 });
	}
try{
	
//	console.log(" *** IP *** ", req.ip);
	var ipaddress = req.ip;
	const reg = /([0-9]{1,3}[\.]){3}[0-9]{1,3}/;
	if(process.env.DEVELOPMENT != "yes"){
		let ad = ipaddress.match(reg);
let rip = ad[0];
//console.log("*** IP2 *** ", rip);
let resultat = await db.query(`select * from ban where ip=(?)`, [ rip ]);
if(resultat.length  > 0){
	return done(null, false, { message: "Вы забанены", grund: resultat[0].grund, usid: resultat[0].usid, status: 409 });
}
	}

var useri = await db.query('select*from users where name=(?)', [ username ]);

//console.log('USER.rows[0]: ', useri)
if(useri.length==0) {
	//console.log("Not found user");
	let a = await pbkdf2(Buffer.from(password), SALT, 10000, 64, 'sha512');	
	let b64 = a.toString('base64');
	let qu = await db.query('insert into users(name, password) values(?,?)',[ username,  b64]);
//	console.log('qu: ', qu);
	return done(null, qu.insertId.toString(), { username: username, status: 200, message: "Success!" });
}else{
return done(null, false, {error:true, message: "Ник " + username + " уже есть!", status: 404 })

}
}catch(err){
//	console.log('custom error handling in local signup auth.js: ', err.message);

		
	return done(null, false, { error: true, message: err.message, status: 405 })
	
}			
}else if(ty == "tg"){
	//console.log("body ", req.body);
	let tgid = req.body.tgid;
	let name = req.body.name;
	if(!tgid){
		return done(null, false, { error: true, message: "no tgid", status: 405 })
	}
	try{
	let result = await db.query(`select*from users where tgid=(?)`, [ tgid ]);
	if(result.length > 0){
		return done(null, result[0].id, { message: "ok", status:200, name: result[0].name, id: result[0].id });
	}else{
		let result2 = await db.query(`insert into users(name, tgid, password) values(?,?,'1234')`, [ '@' + name, tgid ]);
		return done(null, result2.insertId.toString(), { username: '@'+ name, status: 200, message: "Success!" });
	}
}catch(err){
	//console.log(err);
	return done(null, false, { error: true, message: err.message, status: 405 })
}
}else if(ty == "vk"){
	//	console.log("body ", req.body);
		var { user_id, name } = req.body;
		
		try{
	let result4 = await db.query(`select*from users where vkid=(?)`, [ user_id ]);
	if(result4.length > 0){
		return done(null, result4[0].id, { message: "ok", status:200, name: result4[0].name, id: result4[0].id });
	}else{
		let result5 = await db.query(`insert into users(name, vkid, password) values(?,?,'1234')`, [ name, user_id ]);
		return done(null, result5.insertId.toString(), { username: name, status: 200, message: "Success!"});
	}
}catch(err){
	//console.log(err);
	return done(null, false, { error: true, message: err.message, status: 405 })
}
		
		
}else if(ty == "gl"){
	//	console.log("body ", req.body);
		var { user_id, name } = req.body;
		
		try{
	let result4 = await db.query(`select*from users where glid=(?)`, [ user_id ]);
	if(result4.length > 0){
		return done(null, result4[0].id, { message: "ok", status:200, name: result4[0].name, id: result4[0].id });
	}else{
		let result5 = await db.query(`insert into users(name, glid, password) values(?,?,'1234')`, [ name, user_id ]);
		return done(null, result5.insertId.toString(), { username: name, status: 200, message: "Success!"});
	}
}catch(err){
	//console.log(err);
	return done(null, false, { error: true, message: err.message, status: 405 })
}
		
		
}else{}
}
))

passport.use(new TelegramStrategy({
botToken:	tg_api
}, (userData, done)=>{
	//console.log('userData ', userData);
	if(userData){
		
	}
}
))

}
