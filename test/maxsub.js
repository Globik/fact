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
const max_your_secret = process.env.MAX_YOUR_SECRET;
let secureAgent;

function getcertificates(){
try {
  // 2. Читаем оба сертификата с диска
 
  
  const rootCert = fs.readFileSync(rootCertPath);
  const subCert = fs.readFileSync(subCertPath);

  // 3. Создаем безопасный HTTPS-агент со строгой проверкой
  secureAgent = new https.Agent({  
    ca: [rootCert,subCert],
    rejectUnauthorized: (process.env.DEVELOPMENT==="yes"?false:false) 
  });
  console.log("Сертификаты Минцифры успешно загружены в HTTPS-агент.");
} catch (certError) {
  console.error("Не удалось прочитать файлы сертификатов по указанному пути:", certError.message);
}
}
getcertificates();
async function maxsub(){
	

	try{
let a= await axios.post(`${maxurl}subscriptions`, {
  "url": "https://chatikon.ru/maxwebhook",
  "update_types": ["message_created", "bot_started","message_callback"],
  "secret": max_your_secret  
  },{
	  params:{},
	  httpsAgent: secureAgent,
	  headers: {
    'content-type': 'application/json' ,
     "Authorization": process.env.MAX_BOT_TOKEN 
    }
    });
    
  console.log(a.data);
  
	}catch(e){
		console.log(e.response?e.response.data:e.message);
		}
}
//maxsub()
async function maxsetcommand(){
	

	try{
let a= await axios.patch(`${maxurl}me/commands`, {
  "commands": [
          {
            "name": "hello",
            "description": "get last five users from chatikon"
          }
        ]
  },{
	  params:{},
	  httpsAgent: secureAgent,
	  headers: {
    'content-type': 'application/json' ,
     "Authorization": process.env.MAX_BOT_TOKEN 
    }
    });
    
  console.log(a.data);
  
	}catch(e){
		console.log(e.response?e.response.data:e.message);
		}
}
//maxsetcommand();
