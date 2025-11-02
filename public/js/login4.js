/*
    window.onload=function(){
   const cat = localStorage.getItem("myCat");
   if(!cat && cat !=="Tom"){
    window.location.href="#regeln";
}else{
	let islogin = localStorage.getItem("islogin");
	if(!islogin && islogin !=="yes")window.location.href="#login";
}
}
   
    
function confirmRules(){
	localStorage.setItem("myCat", "Tom");
	window.location.href="#login";
}
function isOpenModal(){
	 window.location.href="#regeln";
}
*/
// const VK_APP_ID = 52271555;

function logi(el){
	el.preventDefault();
	//el.stopPropogation();
}

const myform = gid("myform");
const name = gid("name");
const password = gid("password");
const btnlogin = gid("btnlogin");
const btnregister = gid("btnregister");
if(btnlogin)btnlogin.addEventListener('click', register, false);
if(btnregister)btnregister.addEventListener('click', register, false);

async function register(el){
	el.preventDefault();
	//el.stopPropagation();
    errormsg.textContent = "";
   
   var sname = document.getElementById('name').value;
   if(!sname){
	    note({content:"Введите имя!", type:"info", time: 5});
	    return;
	}
	if(!password.value){
		note({content: "Введите пароль!", type: "info", time: 5});
		return;
	}
	el.target.disabled = true;
let user = {};
user.name = sname;
user.password = password.value;
user.type = "gewohn";

let uri = (el.target.className=="register-button" ? "/api/register":"/api/auth");
//alert(uri)
//console.warn(uri)
try{
var r=await fetch(uri, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(user)
    });
    
  console.log('res ', r);
    if(r.ok){
		console.log('ok');
		let data=await r.json();
		console.log('data: ', data);
		if(data.error){
			//Missing credentials", status: 401
			//'Пароль должен содержать минимум 6 символов, а Имя минимум 2!', status: 402
			//'Имя должно быть меньше 20 букв.', status: 403
			// 404 nick already in use
			//'Пользователь не найден!', status:406
			//'Имя или пароль неверный!!', status:407
			let s;
			if(data.status == 401){
				s=L()=='ru'?'Нет пароля или ника':L()=='en'?data.message:
				L()=='zh'?'没有密码或昵称':
				L()=='id'?'Bukan masalah atau masalah':'';
			}else if(data.status == 402){
				s=L()=='ru'?data.message:L()=='en'?'Password is minimum 6 symbols and nick 2 as a minimmum!':
				L()=='zh'?'密码必须至少包含 6 个字符，名称必须至少包含 2 个字符':
				L()=='id'?'Password minimal 6 simbol dan nick minimal 2!':'';
			}else if(data.status == 403){
				s=L()=='ru'?data.message:L()=='en'?'Nick must content less than 20 letters':
				L()=='zh'?'名称必须少于 20 个字母':
				L()=='id'?'Nick harus berisi kurang dari 20 huruf':'';
			}else if(data.status == 404){
				s=L()=='ru'?data.message:L()=='en'?'Nick already in use!':
				L()=='zh'?'名字已经在那里了!':
				L()=='id'?'Nick sudah digunakan':'';
			}else if(data.status == 406){
				s=L()=='ru'?data.message:L()=='en'?'User not found!':
				L()=='zh'?'未找到用户':
				L()=='id'?'Pengguna tidak ditemukan':"'";
			}else if(data.status == 407){
				s=L()=='ru'?data.message:L()=='en'?'Nick or password wrong':
				L()=='zh'?'用户名或密码不正确':
				L()=='id'?'Nick atau kata sandi salah':'';
			}else if(data.status == 409){
				s=L()=='ru'?data.message:"You're banned!";
			}else{
				s = data.message;
			}
			 errormsg.textContent = s;//data.message;
			
			  setTimeout(() => {
        el.target.disabled = false;
         errormsg.textContent = "";
        }, 3500)
return;
			 
		}
	
localStorage.setItem("islogin" , "yes");
const faka = document.querySelector('.overlay:target');
//if(faka)
window.removeEventListener('hashchange', hani, false);
window.location.href="#."
          window.location.reload();
         // in_rem_hash();
          
   
		
	}
	
}catch(error){
	
      

        setTimeout(() => {
          errormsg.textContent = "";
        }, 3500)

        console.error(error)
	
	}
//	el.style.backGround="green";
	}
	function logi(ev){
		ev.preventDefault();
	}
	
async function logout(){
	try{
var r=await fetch('/logout', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({user:'user'})
    });
    
  console.log('res ', r);
    if(r.ok){
		console.log('ok');
		let data=await r.json();
		console.log('data: ', data);
		if(data.error){
			console.error(data.error);
			 errormsg.textContent = data.message;
			
			  setTimeout(() => {
        
         errormsg.textContent = "";
        }, 3500)
return;
			 
		}
	//localStorage.removeItem("islogin");
	//localStorage.removeItem("myCat");
	location.reload();
}}catch(err){
	console.error(err);
	//alert(err);
}
}

async function onTelega(user){
	//alert(JSON.stringify(user));
	console.log(user);
	try{
var r = await fetch('/api/register', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({ type: "tg", password:'123456', tgid: user.id, hash: user.hash, name: user.username, auth_date: user.auth_date, first_name: user.first_name })
    });
    //alert(JSON.stringify(r));
  console.log('res ', r);
    if(r.ok){
		console.log('ok');
		let data=await r.json();
		console.log('data: ', data);
		if(data.error){
			 errormsg.textContent = data.message;
			
			  setTimeout(() => {
    //    el.target.disabled = false;
         errormsg.textContent = "";
        }, 3500)
return;
			 
		}
	
localStorage.setItem("islogin" , "yes");
window.location.href="#."
         window.location.reload(true);
}
}catch(error){
	console.log(error);
    //  alert(error);

        setTimeout(() => {
          errormsg.textContent = "";
        }, 3500)

        console.error(error)
	
	}
	//el.style.backGround="green";
	}
	/*
const VKID = window.VKIDSDK;
VKID.Config.init({
	app: VK_APP_ID,
	
})
OAuthList
*/ 
try{
const oauthList = new VKID.OAuthList();
const containervk = gid("VkIdSdkOAuthList");

const oauthListNames = [
VKID.OAuthName.VK,
VKID.OAuthName.OK,
];
if(containervk){
	oauthList.render({ container: containervk, oauthList: oauthListNames, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS,
		styles:{
			height: 64, borderRadius: 8
		}}).on(VKID.WidgetEvents.ERROR, vkerr);
}
function vkerr(err){
	//alert(err);
	console.log(err);
}
const url2 = new URL(window.location.href);
if(url2.search){
	

// console.log('url.search ', url2.search);
 const paramStr = new URLSearchParams(url2.search);
// out.textContent += 'code ' + paramStr.get('code') + ' device_id ' + paramStr.get('device_id');
let c = paramStr.get('code');
let d = paramStr.get('device_id');
//alert('device_id '+d+' code '+c)
if(c && d){
	async function ati(){
		try{
			//alert('device3 ', d);
			//await fetch('/newfucker', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({code: c, device: d })});
let som5=await VKID.Auth.exchangeCode(c, d);

//console.log('som5 ', som5);

//alert('som5 '+JSON.stringify(som5))
// access_token, refresh_token, token_type, _expires_in, user_id, id_token, scope

let usinfo = await VKID.Auth.userInfo(som5.access_token);
console.log('usinfo ', usinfo);
//await fetch('/newfucker', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify(usinfo)});
//alert('ok '+usinfo.ok)
//alert('usinfo '+JSON.stringify(usinfo))
//usinfo.type = "vk";
//usinfo.password = '123456';
let da2 = {};
da2.password='123456';
da2.user_id = usinfo.user.user_id;
da2.name = usinfo.user.first_name;
//da2.username = usinfo.first_name;
da2.type = "vk";
let abba=JSON.stringify(da2);
//alert('abba '+abba)
let res3 = await fetch('/api/register', { method: "POST",headers: {  "Content-Type": "application/json",},body: abba});
if(res3.ok){
		console.log('ok');
		let data=await res3.json();
		console.log('data: ', data);
		if(data.error){
			 errormsg.textContent = data.message;
			
			  setTimeout(() => {
    //    el.target.disabled = false;
         errormsg.textContent = "";
        }, 3500)
return;
			 
		}
	userName.value = da2.name;
	isLogin.value="true";
	userId.value=da2.user_id;
localStorage.setItem("islogin" , "yes");
window.location.href="#."
//setTimeout(function(){
	window.location.reload(true);
//},1000)
//location.reload();
}
}catch(e){
	/*
	userName.value = "Uknown";
	isLogin.value="true";
	userId.value="X";
	console.error(e);
	*/ 
	alert("Что-то пошло не так. Попробуйте войти через телеграм");
	//await fetch('/newfucker', {method: "POST",headers: {"Content-Type": "application/json",}, body: JSON.stringify(e) });
	//await fetch('/newfucker', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({txt:"some text",code: c, device: d })});
	setTimeout(() => {
          errormsg.textContent = "";
        }, 3500)

	}
}
ati();
}

}
}catch(e){console.warn(e)}

async function handleCredentialResponse(response){
	try{
	//let profile = response.getBasicProfile();
	//alert(response);
	console.warn(response);
	let id_token = response.credential;
	//alert('id_token '+id_token);
	let b = await fetch('/checkGoogle', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({name: 'm', token: id_token })});
	if(b.ok){
		let c = await b.json();
		if(c.error){
			note({ content: c.message, type: "error", time: 5 });
			return;
		}
		//alert(c);
		console.warn(c);
		let da2 = {};
da2.password='123456';
da2.user_id = c.userid;
da2.name = c.name;

da2.type = "gl";
let abba=JSON.stringify(da2);

let res3 = await fetch('/api/register', { method: "POST",headers: {  "Content-Type": "application/json",},body: abba});
if(res3.ok){
		console.log('ok');
		let data = await res3.json();
		//console.log('data: ', data);
		if(data.error){
			note({ content: data.message, type: "error", time: 5 });
return;
	}
	window.location.href="#."
	window.location.reload(true);
}
}
}catch(e){
	note({ content: e, type: 'error', time: 5 });
}
	
}
































