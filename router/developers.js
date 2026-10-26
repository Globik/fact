const { sendmessage } = require('../libs/maxbot.js');
const developers = function(app){
	app.get('/developers', async(req, res)=>{
	 sendmessage({format:"html", txt: "Jemand in developers" });
	res.rendel('developers', {});
	});
}
module.exports = developers;
