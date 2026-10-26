	async function getUSDCERC20(el){
	try{
	let sip = 	await fetch('/getUSDTErc20wallet', {method: "POST", headers: {"Content-Type": "application/json",},body: JSON.stringify({str:  'str' })});
	  if(sip.ok){
		  let di = await sip.json();
		  if(di.error){
			  console.error(di.message);
			  
			  return;
		  }
		  let out=gid("out");
		  console.log(di.message);
		  if(out){
			  out.textContent = JSON.stringify(di.data);
			 // out.textContent+=di.message+"\n";
			 // out.textContent+=di.data.wallet_id+"\n";
			 // out.textContent +=di.data.warning+"\n";
		  }
	}
	}catch(er){
		console.error(er);
		out.textContent +=er+"\n";
	}
	}
