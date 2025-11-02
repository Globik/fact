 const myadmin = document.forms.adminform;
 if(myadmin)myadmin.addEventListener('submit', onadmin, false);
 
 async function onadmin(ev){
	 ev.preventDefault();
	 //alert(ev.target.username.value+' '+ev.target.password.value);
	 try{
	 let r =  await fetch('/api/auth', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({ name: ev.target.username.value, password: ev.target.password.value })
    });
    
  console.log('res ', r);
    if(r.ok){
		console.log('ok');
		let data=await r.json();
		console.log('data: ', data);
		if(data.error){
			out.textContent = data.message;
			return;
		}
		window.location.href = "/about";
 }
}catch(e){
	alert(e);
}
}
