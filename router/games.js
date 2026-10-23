const { sendmessage } = require('../libs/maxbot.js');
const map = new Map();
  map.set("smash_hit",{scripts:['game.js'], css:['game.css']});
  map.set("smash_hit_1",{scripts:['game_1.js'],css:['game.css']})
	const games = function(app){
	app.get('/games', async(req, res)=>{
	 sendmessage({format:"html", txt: "Jemand in games" });
	//console.log('games');
	res.rendel('games', {});
	});
	app.get("/games/:name", async (req, res)=>{
		let a = map.get(req.params.name);
		sendmessage({format:"html", txt: "Jemand in " + req.params.name });
		res.rendel('game', { gamename:req.params.name,scripts:(a?a.scripts:undefined), css:(a?a.css:undefined)});
	})
	}
	module.exports = games;
