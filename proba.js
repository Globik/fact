const express = require('express');
const app = express();
app.use('/favicon.ico',(req,res)=>res.status(204).end());
app.get('/',(req,res)=>{
	console.log('pass',req.path);// дважды выводит в консоль, но так не должно быть, только один раз
/*	  if (req.headers['purpose'] === 'image' || 
        req.headers['sec-fetch-dest'] === 'image') {
        console.log('⚠️ Запрос изображения на "/", игнорируем');
        return res.status(404).end(); // или 204
	}*/
	console.log('Метод:', req.method);
    console.log('User-Agent:', req.headers['user-agent']);
    console.log('Purpose:', req.headers['purpose'] || req.headers['sec-fetch-dest']);
    console.log('Время:', new Date().toISOString());
	res.send('ok');
})
app.listen(3000)
