const onesignal_app_key = "ZjVhNjdjYTMtYWJlNS00MjQ1LTljNzctYjEzYWI0NzQxMDc5";
const onesignal_app_id = "bdd08819-3e41-4e1b-a1bf-13da2ff35f7c";
const onesignal_notification_url = "https://onesignal.com/api/v1/notifications";
const axios = require('axios').default;
const app_id = '226ceb60-4d9a-4299-8d74-b0af22809342';//226ceb60-4d9a-4299-8d74-b0af22809342"
const app_key = 'OTYyYzFlMDctZmU4OC00OWExLTliNjUtNTVjNTY4NWFhZWRi';

//OTYyYzFlMDctZmU4OC00OWExLTliNjUtNTVjNTY4NWFhZWRi

async function oni(us, txt){
	if(process.env.DEVELOPMENT !="yes"){

let data = {
		app_id: onesignal_app_id,
		contents: {en: us + " " + txt},
	included_segments: ["Subscribed Users"],
		//include_player_ids: ["9a9c34d6-6c6e-4dfe-b510-20953def482f"],
		};
let headers = { "Authorization": "Basic " + onesignal_app_key };
try{
let r = await axios.post(onesignal_notification_url, data, { headers: headers });
console.log("r: ", r.data);
}catch(e){
console.log("err: ", e.toString());
}	
}
}


async function oni1(us, txt){
if(process.env.DEVELOPMENT !="yes"){ iii

let data = {
		app_id: app_id,
		contents: {en: us + " " + txt},
	included_segments: ["Total Subscriptions"]
		};
let headers = { "Authorization": "Basic " + app_key };
try{
let r = await axios.post(onesignal_notification_url, data, { headers: headers });
console.log("r: ", r.data);
}catch(e){
console.log("err: ", e.toString());
}	
}
}

module.exports = { oni, oni1 }
