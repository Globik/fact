const yform = document.forms.myyoomoney;
yform.addEventListener('submit', saveSecret, false);
function saveSecret(ev){
	ev.preventDefault();
	let client_id = ev.target['client_id'].value.trim();
	let client_secret = ev.target.client_secret.value.trim();
	if(!client_id || !client_secret) return;
	let d = {};
	d.client_id = client_id;
	d.client_secret = client_secret;
	console.log(d);
vax(ev.target.method, ev.target.action, d, on_save_client, on_error, ev.target, false);
ev.target.className = "puls";
ev.target.disabled = true;
}
function on_save_client(l, ev){
	ev.className = "";
	ev.target.disabled = false;
	note({ content: l.message, type: (l.error?"error":"info"), time: 5 });
	if(!yform.client_secret.disabled){
		yform.client_secret.disabled = true;
	}
	if(!yform.client_id.disabled){
		yform.client_id.disabled = true;
	}
}
function on_error(l, ev){
	ev.className = "";
	ev.target.disabled = false;
	note({ content: l.message, type:"error", time: 5 });
}

function goAuth(el){
	el.className = "puls";
	el.disabled = true;
	vax('post', '/admin/getYoomoney', {}, on_save_getAuth, on_getAuth_error, el, false);
}
function on_save_getAuth(l, el){
	el.className = "";
	el.disabled = false;
	note({ content: l.message, type: (l.error?"error":"info"), time: 5 });
	window.location.href=l.message;
}

function on_getAuth_error(l, el){
	el.className = "";
	el.disabled = false;
	note({ content: l, type:"error", time: 5 });
}
let ynotif = document.forms.ynotif;
ynotif.addEventListener('submit', onnotif, false);
function onnotif(ev){
	ev.preventDefault();
	let data ={}
	data.y_notif = ynotif.y_notif.value;
	//alert(ynotif.method);
	vax( ynotif.method, ynotif.action, data, on_set_notif, on_getAuth_error, ev.target, false);
	ynotif.className = "puls";
}
function on_set_notif(l,el){
	ynotif.className="";
	note({ content: l.message, type:'info', time: 5 });
}
function getInfo(el){
	el.className = "puls";
	el.disabled = true;
	vax('post', '/admin/getYoomoneyinfo', {}, on_get_info, on_getAuth_error, el, false);
}

function on_get_info(l, el){
	el.className = "";
	el.disabled = false;
	console.log(l.message, l.list);
	if(l.error){
		note({ content: l.message.code, type: 'error', time: 5 });
		return;
	}
	for(let i in l.list){
		let a = Array.isArray(l.list[i]);
		let b = (typeof l.list[i] === 'object' && l.list[i] !== null);
		if(a){
			l.list[i].forEach(function(el, k){
				out.innerHTML+='<b>bank card:</b><br>' + el.type + "<br>" + el.id + "<br>" + el.pan_fragment + "<br>";
			});
		}else if(b){
			out.innerHTML+='<b>' + i + ":</b><br>";
			for(let k in l.list[i]){
			out.innerHTML+= k + " " + l.list[i][k] + '<br>';
		}
		}else{
	out.innerHTML += i + " " + l.list[i] + '<br>';
}
}
}

function getHistory(el){
	el.className = "puls";
	el.disabled = true;
	vax('post', '/admin/getYoomoneyHistory', {}, on_get_history, on_getAuth_error, el, false);
}
function on_get_history(l, el){
	el.className = "";
	el.disabled = false;
	console.log(l.message, l.list);
	if(l.error){
		note({ content: l.message.code, type: 'error', time: 5 });
		return;
	}
	if(Array.isArray(l.list.operations)){
		l.list.operations.forEach(function(k, i){
			for(let d in k){
				let suka = Array.isArray(k[d]);
			console.log(suka);
			if(suka){
				out2.innerHTML+='<b>' + d + ':</b><br>';
				k[d].forEach(function(elem, bas){
					console.log('eli ', elem);
					for(let basa in elem){
						console.log(elem);
						out2.innerHTML+= basa + ": " + elem[basa] + "<br>";
					}
				});}else{
			out2.innerHTML += d + ": " + k[d] + '<br>';
		}
		}
		out2.innerHTML+='<hr>'
		}
		);
	/*for(let i in l.list){
		out2.innerHTML += i + " " + l.list[i] + '<br>';
}*/

}else{
	out2.innerHTML = "Nothing special<br>";
}
}

function redact(el){
	if(yform.client_secret.disabled){
		yform.client_secret.disabled = false;
	}
	if(yform.client_id.disabled){
		yform.client_id.disabled = false;
	}
	yform.reset.disabled = false;
	yform.submit.disabled = false;
}
function doWas(el){
	gid('clientId').textContent = "";
	console.error(clientId.value);
	yform.client_secret.textContent = '';
	
}
function takeCb2(el){
	el.className="puls";
	vax('post','/api/takeCb2', {}, on_takecb2, on_getAuth_error, el, false);
}
function on_takecb2(l, el){
	el.className = "";
	out3.innerHTML=JSON.stringify(l.message);
}

function takeCb3(el){
	el.className="puls";
	vax('post','/api/takeCb3', {}, on_takecb3, on_getAuth_error, el, false);
}
function on_takecb3(l, el){
	el.className = "";
	out333.innerHTML=JSON.stringify(l.message);
}



const mypayout = document.forms.mypayoutform;
mypayout.addEventListener('submit', onpayoutsubmit, false);
function onpayoutsubmit(ev){
	ev.preventDefault();
	let d = {};
	d.account = ev.target.payoutaccount.value;
	d.amount = ev.target.payoutamount.value;
	d.label = ev.target.label.value;
	vax(ev.target.method, ev.target.action, d, on_payout, on_getAuth_error, ev.target, false);
	ev.target.className = "puls";
	ev.target.disabled = true;
}

function on_payout(l, el){
	el.className = "";
	el.disabled = false;
	if(l.error){
		note({ content: l.message, type: "error", time: 5 });
		return;
	}
	note({ content: l.message, type: "info", time: 5 });
}
function banAll(el){
	vax('post', '/admin/banAll', {}, on_get_banall, on_banall_error, el, false);
	el.className = 'puls';
}
function on_get_banall(l,ev){
	ev.className ="";
	if(l.error){
		note({ content: l.error, type: 'error', time : 5 });
		return;
	}
	note({ content: l.info, type:'info', time: 5});
} 
function on_banall_error(l, ev){
	ev.className = "";
	alert(l);
}
function banoutAll(el){
	vax('post', '/admin/banoutAll', {}, on_get_banoutall, on_banall_error, el, false);
	el.className = 'puls';
}
function on_get_banoutall(l,ev){
	ev.className ="";
	if(l.error){
		note({ content: l.error, type: 'error', time : 5 });
		return;
	}
	note({ content: l.info, type:'info', time: 5});
} 

