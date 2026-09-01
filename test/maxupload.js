const https = require( "https");
const fs = require( "fs");
const path = require('path');
const { config } = require('dotenv');
const axios = require('axios').default;
const base64 = require("./image.js");
const maxurl = "https://platform-api2.max.ru/"

const rootCertPath = "/usr/local/share/ca-certificates/russian-trusted/russian_trusted_root_ca.crt";
const subCertPath = "/usr/local/share/ca-certificates/russian-trusted/russian_trusted_sub_ca.crt";
config({ path: path.resolve(__dirname, '../.env') });
const some_user_id = process.env.ME_MAX_USER_ID;
let secureAgent;

function getcertificates(){
try {
  // 2. Читаем оба сертификата с диска
 
  
  const rootCert = fs.readFileSync(rootCertPath);
  const subCert = fs.readFileSync(subCertPath);

  // 3. Создаем безопасный HTTPS-агент со строгой проверкой
  secureAgent = new https.Agent({  
    ca: rootCert,
    rejectUnauthorized: (process.env.DEVELOPMENT==="yes"?false:true) 
  });
  console.log("Сертификаты Минцифры успешно загружены в HTTPS-агент.");
} catch (certError) {
  console.error("Не удалось прочитать файлы сертификатов по указанному пути:", certError.message);
}
}
getcertificates();
async function sendmessage(obj){
	if(!obj.txt)return;
	if(obj.txt.length > 4000)return;
	const hasAttachment = obj.type && obj.token;

	try{
let a= await axios.post(`${maxurl}messages`, {
  text: obj.txt, // required
  format:"html",
    ...(hasAttachment && {
        attachments: [
          {
            type: obj.type, // Сюда автоматически подставится 'image', 'video', 'file' и т.д.
            payload: {
              token: obj.token
            }
          }
        ]
      })
     
  },{
	  params:{
		 user_id: some_user_id 
	  },
	  httpsAgent: secureAgent,
	  headers: {
    'content-type': 'aplication/json' ,
     "Authorization": process.env.MAX_BOT_TOKEN 
    }
    });
    
  console.log(a.data);
  
	}catch(e){
		console.log(e.response?e.response.data:e.message);
		}
}
//sendmessage({txt:"hello from server"})
async function maximg(obj){
		try{
let a = await axios.post(`${maxurl}uploads`, {},
	{
		params:{
		 type: "image" 
	  },
	  httpsAgent: secureAgent,
	  headers: {
    'content-type': 'application/json' ,
     "Authorization": process.env.MAX_BOT_TOKEN 
    }
    });
   
  console.log(a.data);
  if(a.data.url){
	  setTimeout(async function(){
		  if(!obj.src)return;
		let b11 = obj.src.split(',')[1];
    
		let buf = Buffer.from(b11, "base64");
		var f = new FormData();
        const fileBlob = new Blob([buf], { type: 'image/jpeg' });
        f.append("file", fileBlob, "fromservertest.jpeg");
	try{
		
	  let b = await axios.post(a.data.url, f,
	  { 
		  httpsAgent: secureAgent,
		  headers: 
		  {
		    "Authorization": process.env.MAX_BOT_TOKEN
		  }, 
		  
    });
	  console.log(b.data);
	   const photoKey = Object.keys(b.data.photos)[0];
          const finalFileToken = b.data.photos[photoKey].token;
          sendmessage({ token: finalFileToken, txt:"Lueg ma nomol!", type:'image' });
  }catch(error){
	  console.error(error.response ? error.response.data : error.message);
  }
  }, 1000);
  }
	}catch(e){
		 console.error(e.response?e.response.data:e.message);
		}
}
	maximg({ src: base64.src });
