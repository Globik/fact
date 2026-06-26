const express = require('express');
const fs=require('fs');
const http2=require('http2')
const http2ExpressBridge=require('http2-express-bridge')
const port=3000;
//const app = express();
const app=http2ExpressBridge(express)
//app.use('/favicon.ico',(req,res)=>res.status(204).end());

app.get('/',(req,res)=>{
	console.log('pass',req.path);// дважды выводит в консоль, но так не должно быть, только один раз

	console.log('Метод:', req.method);
    console.log('User-Agent:', req.headers['user-agent']);
    console.log('Purpose:', req.headers['purpose'] || req.headers['sec-fetch-dest']);
    console.log('Время:', new Date().toISOString());
	res.send('ok');
})

//app.listen(3000)
const server=http2
  .createSecureServer({
     key: fs.readFileSync("certs/privkey.pem"),
     cert: fs.readFileSync("certs/fullchain.pem"),maxVersion:'TLSv1.2',minVersion:'TLSv1.2',allowHTTP1:true
    },app);
  server.listen(port, ()=>{
    console.log('Started on https://chatikon.ru:' + port);
  });
server.on('error ',(err)=>{
	console.log('some err ',err);
})
//server.on('stream',(stream,headers)=>{
	//stream.respond({'content-type':'text/html;charset=utf-8',':status':200});
	//stream.end('<h1>hello world</h1>');
//})
