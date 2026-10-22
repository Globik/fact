const { sendmessage } = require('../libs/maxbot.js');

	const games = function(app){
	app.get('/games', async(req, res)=>{
	 sendmessage({format:"html", txt: "Jemand in games" });
	//console.log('games');
	res.rendel('games', {});
	});
	app.get("/games/:name", async (req, res)=>{
		sendmessage({format:"html", txt: "Jemand in " + req.params.name });
		res.rendel('game', { gamename:req.params.name});
	})
	}
	module.exports = games;
