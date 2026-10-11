const axios = require('axios').default;
const url = 'https://api.bitaps.com/usdc-erc20/testnet/v1/';
const { sendmessage } = require('../libs/maxbot.js');

const wallet = function(app){
app.get('/wallet', async(req, res)=>{
	 sendmessage({format:"html", txt: "Jemand in hot wallet"});
	console.log('wallet');
	res.rendel('wallet', {});
});
app.post('/getUSDTErc20wallet', async(req,res)=>{
	try{
		//console.log('e');
		let d = await axios.post(url + 'create/wallet', {});
		//console.log(d);
		if(d.status == 200){
		//	console.log('d ', d.data);
		sendmessage({format:"html", txt: "Jemand created wallet_id "+d.data.wallet_id });
			res.json({message:"OK",data: d.data });
		}else{
			return res.json({error:true,message:"not ok" });
		}
	}catch(err){
		if(err.response){
			console.log(err.response.data);
			return res.json({error:true, message: err.response.data });
		}else{
			console.log(err.name);
			return res.json({error:true,message:err.name});
		}
	}
	
})
}
module.exports=wallet;
