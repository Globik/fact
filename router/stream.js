const express = require('express')
const axios = require('axios').default;
const router = express.Router();
const app = express()

app.get('/:id/:streamid', async(req, res)=>{
	//console.log('params ', req.params);
	let owner=false;
	if(req.params&&req.params.id && req.user){
		if(Number(req.params.id)===req.user.id){
			owner=true;
		}
	}
	//console.log('user ', req.user);
	res.rendel('stream',{ owner:owner, lang: 'ru' , userid:req.params.id, streamid: req.params.streamid ,user:req.user});
})

app.get('/:id', async(req, res)=>{
	console.log('params ', req.params);
	let owner=false;
	if(req.params&&req.params.id && req.user){
		if(Number(req.params.id)===req.user.id){
			owner=true;
		}
	}
	console.log('user ', req.user);
	res.rendel('stream',{ owner:owner, lang: 'ru' , userid: req.params.id, user:req.user });
})
module.exports = app;
