const https = require( "https");
const fs = require( "fs");
const path = require('path');
const { config } = require('dotenv');
const axios = require('axios').default;
const maxurlme = "https://platform-api2.max.ru/me"

const rootCertPath = "/usr/local/share/ca-certificates/russian-trusted/russian_trusted_root_ca.crt";
const subCertPath = "/usr/local/share/ca-certificates/russian-trusted/russian_trusted_sub_ca.crt";
config({ path: path.resolve(__dirname, '../.env') });
let secureAgent;


//const agent = new https.Agent({ca: fs.readFileSync(rootCertPath), rejectUnAuthorized:true})
//const mclient = axios.create({httpsAgent:agent})
function getcertificates(){
try {
  // 2. Читаем оба сертификата с диска
  const rootCert = fs.readFileSync(rootCertPath);
  const subCert = fs.readFileSync(subCertPath);

  // 3. Создаем безопасный HTTPS-агент со строгой проверкой
  secureAgent = new https.Agent({  
    ca: rootCert,
    rejectUnauthorized: false  
  });
  console.log("Сертификаты Минцифры успешно загружены в HTTPS-агент.");
} catch (certError) {
  console.error("Не удалось прочитать файлы сертификатов по указанному пути:", certError.message);
}
}
getcertificates();

async function getme(){
	
	try{
		let a = await axios.get(maxurlme,{
			params:{},
			httpsAgent: secureAgent,
	  headers: {
    'content-type': 'application/json' ,
     "Authorization": process.env.MAX_BOT_TOKEN 
 }
    });
		console.log(a.data);
	}catch(er){
		console.error(er.response?er.response.data:er.message);
	}
}
getme();
