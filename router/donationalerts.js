const express = require('express')
const router = express.Router()
const axios = require('axios').default;
const UserID = 13425852;

const ExpiresIn= 31536000 ;//секунд

//ef50200c093cddfbd32ce68213f4f23d82bc8f0976ff529552b0bc1079a9dd351991bd3c6a082118f535be036b457e287ef163ed9a4ba354023d129b0d48d3e8b7e54ab4183bfac9a4b2bd8e113d307b2f25257036394020cae58c2858d5d1cd57c832fc821bbbfb761292792a45124d40320ea213d9297b87790e2b5dc5d442f6d3a52a4c1b98271f4391c40e60226d1a5052289fa812f8f23798f78b66558a7c436553747e0a83dcbf8daa25489e3b9b0ddfecfd4153c86c035bc26c79b4cc960d53bf0276b5465daebaf0b74f3471ab9e2aee755f592d6c39a3cfd81c966cf20f867959b707bf47897d7fdbe2d1294c1809601a227b5c67d461461bdd86bfee578128789c0b34e3daa5d7acfa69ba74af365feee065034c5457b00fcc30c3011895b1ed708fe46131cd98801494828f5a4ae970b871c909fd62980d07deeabd9116cff17dd2eb891975f898ec2d7c7f56e209c08125c75ba8f942f1830dc62007f9d1ec5b70139273bb6b203f02a845758e77b65fc4fb4a612de1cbd219d1efc6567a28d0f084175abca8982958e7ad2ebb867b3b2250eb4c38f53f74d92e514550865b472eda171f5d31a98e8';
var AccessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNzYyNCIsImp0aSI6ImVlZTY0NzhiYzEzMjMxMTYxMDJiZTc2MjQxZWEyYzFmMjdmNWNiYWViZmRkMTY3OGJmNjc5ZmNkMjJlZmVjZWMyYmZjZDJlOGQ0ZjFkYTUwIiwiaWF0IjoxNzczNTA0NDYwLjE1MjQsIm5iZiI6MTc3MzUwNDQ2MC4xNTI0LCJleHAiOjE4MDUwNDA0NjAuMTQyMSwic3ViIjoiMTM0MjU4NTIiLCJzY29wZXMiOlsib2F1dGgtdXNlci1zaG93Iiwib2F1dGgtZG9uYXRpb24taW5kZXgiLCJvYXV0aC1kb25hdGlvbi1zdWJzY3JpYmUiXX0.bZCFhqvHAkLKshuUhLTF-Vp9-QvrMjf01lBnc_l1XTm1vGsmnrv5lbV_oH1VpmGEDvyO7VakKlUo9GTc5fEmcFE1ZU1zYGUFLxFHS5Ypfjd4ipcrOPmJYi1ScEXXaDhBkEWhdBlucQMqib0CAva85JEd4ouzsG1DIcLuRfpqXYU9dOgFEJtA9P7_seUnvAMboOD7Z2f3_RBikH-SAsMd82UvhXh5Owr4xQeobhiTyjUC6txlI0JKMXkgGPEZB6CZQ-UgyQpG9yzmPQzfzp60anTUDiea2YVWcCtr9uShkixgZgR4GGKAsXbgBAzwg1XGG0NXm4FIH2nYur5VVUAKq-PUPjDriTg9VlYBV_3eZssoAWyCuSLVv7_Hq80ZcipfbY67JnhI8BuUvyRKK8hWYNFI7m0HtNamwtFjFH8OvkOUcRKgIOmz4peprHLnmycnRJlByMDLohLaXJt74zDbegaJpaoh1FWqE21WW_1sksdelJMIAc26IMUm7earXSldU9nWIZlurdiTCp6I5f5O0PzwCkKXEy1ZPewtCprtgw8IXhfg4opTBgYdaYgINuwMPSkv4XSFR0vxtMP78B3sr4odPwQyZ05VXwUAtwGz1jibfXpQSA-acZWot7_CWeYwgnM3ISBdNuFeHztvhks2qe3_M-6dzUPIVXUoIPqQiX8';
var RefreshToken = 'def502006c7264fe9e6c87252ec7c2f9d45c82363d557be59d47d9cb0f007e14b7627a2f9393d827287607da490f73363c55a124a1307f8525949cc29c9d53ac49368c3d04fe8ee8f78d66571d722a827b36ea40f60fbb9d1e14b73b857ce8b6e84e8c8e2797789abd1cfad4447122157cd52f82274e1c203d17712919f84aaa0fa431182d057a6ca032bac7712a46b34ed920f9e40259ba621759b8bf66ed82045027dd047a0e57b630e241bc434ea1b9d013c212ded8f446382d79fe2acd7ed4d0dc0e62329933d80b8891b6bb0a6f686706d9c792a9b147613274bf73b1cc0000bdd18b4fe9483740a05cc77c16b9d1157959515b66b4b099704acbfd333ef609358c16132e232a1f864c52028fbcddfe653bdc9a08f4f76836409943d54c55f3f17c992b29ee91f786bf185715881e881e3143cc5842d67ed5f31fc926554f4b3c40e92aca542b2855951a96f45a3c96fd76980c07ecbab5fee71c55654436694c9e76bc3b44b1d16904328115437c17197220f0b27763962c2cdf179f4c84b31bb681f0f3434d5ed35dca691d113f147476b81f86309a2587cc0de22db6375cbc8d1d135c4309366f922c2545';
const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();

const CLIENT_ID = '17624';
const CLIENT_SECRET = 'e0mjT1cwCfsgBQqS2s4CFG6Ssh8HlJqhBsszCfd9';
//const { UserEventsClient ,DonationAlertsDonationEvent} = require('@donation-alerts/events');
//const { ApiClient } = require('@donation-alerts/api');
//const { RefreshingAuthProvider } = require('@donation-alerts/auth');
var scopes = 'oauth-user-show oauth-donation-index oauth-donation-subscribe'

  var WebSocket = require('ws');
  

//var { Centrifuge } =require('centrifuge');

var crypto=require('crypto')
// 🔥 ЭТИ ДАННЫЕ ТЫ ПОЛУЧИЛ ИЗ ПЕРВОГО ШАГА


async function startDonationListener() {
	console.log('СОЗДАЕМ AUTH PROVIDER');
    try {
        // 1. СОЗДАЕМ AUTH PROVIDER
        /*
        const authProvider = new RefreshingAuthProvider({
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
        });

        // 2. ДОБАВЛЯЕМ ПОЛЬЗОВАТЕЛЯ С ТОКЕНАМИ
        authProvider.addUser(UserID, {
            accessToken: AccessToken,
            refreshToken: RefreshToken,
            expiresIn: 31536000,
            obtainmentTimestamp: Date.now(),
            scopes: ['oauth-user-show', 'oauth-donation-index', 'oauth-donation-subscribe']
        });

        // 3. СОЗДАЕМ API CLIENT (он использует authProvider)
        const apiClient = new ApiClient({ authProvider });

        console.log('✅ API клиент создан, получаем токены для Centrifugo...');

        // 4. ПОЛУЧАЕМ ТОКЕН ДЛЯ WEBSOCKET (через API клиент)
        const connectionToken = await apiClient.users.getSocketConnectionToken(UserID);
        console.log('🔑 Connection token получен');

        // 5. ГЕНЕРИРУЕМ UUID v4 (обязательно!)
        const clientId = crypto.randomUUID();
        console.log('🆔 Client ID:', clientId);

        // 6. ПОЛУЧАЕМ КАНАЛ ДЛЯ ДОНАТОВ
        const donationChannel = await apiClient.centrifugo.subscribeUserToDonationAlertEvents(
            UserID,
            clientId
        );
        console.log('📡 Канал донатов:', donationChannel.channel);
        console.log('Токен канала есть?', !!donationChannel.token);
        console.log('Token length:', donationChannel.token?.length);
        console.log('Полный donationChannel:', donationChannel);
// 🔥 
*/

// 🔥 ПОЛУЧАЕМ канал донатов и его токен


// 2. ПОТОМ - используем connectionToken в WebSocket






// Твои данные
//const connectionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDbGllbnQ6MTc2MjQifQ.R9-HZHiQfBJ7gzEvcQfiTNfNeVO2yMIR0xFA5Fo8VFs';
const channel = '$alerts:donation_13425852';
//const channelToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFubmVsIjoiJGFsZXJ0czpkb25hdGlvbl8xMzQyNTg1MiIsImNsaWVudCI6ImI5OWVkMzhiLWJiN2QtNDY3Ni05OTdjLWFiYTYzZDYwMzg3MiJ9.FMxHjK4WJgAu2ERDleNo7krhroBjzBU4dQ_3qdeXuas';

// Создаём WebSocket



/*

         data: {
    data: {
      id: 13425852,
      code: 'globik2',
      name: 'Globik2',
      is_active: 1,
      avatar: 'https://t.me/i/userpic/320/dTyJQkS9chKnfMg4CcpmOSANKC-bNOgfdB2gTF51q0U.jpg',
      email: null,
      language: 'ru_RU',
      socket_connection_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDbGllbnQ6MTc2MjQifQ.R9-HZHiQfBJ7gzEvcQfiTNfNeVO2yMIR0xFA5Fo8VFs'
    }
  }
*/
        
        
        
     

   async function connect() {
    console.log('Получаем сокет-токен через API');
    const socketTokenRes = await axios.get(
        `https://www.donationalerts.com/api/v1/user/oauth`,
        {
            headers: { 'Authorization': `Bearer ${AccessToken}` }
        }
    );
    
    const socketToken = socketTokenRes.data.data.socket_connection_token;
    console.log('sock tok ',socketToken);
    // 2. Подключаемся через специальный URL с токеном
    //return;
    const ws = new WebSocket(
        `wss://centrifugo.donationalerts.com/connection/websocket`
    );
     let pingInterval;
    let pongTimeout;
    
    ws.on('open', () => {
        console.log('✅ Подключено');
        
        
        // Отправляем subscribe
        ws.send(JSON.stringify({
            params: {
                token: socketToken
            },
           // method: 1,
            id: 1
        }));
       /* pingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                const pingId = Date.now();
                console.log('📤 Ping отправлен, id:', pingId);
                
                ws.send(JSON.stringify({
                    method: 5,  // метод 5 = ping
                    id: pingId
                }));
                
                // Ставим таймаут на pong
                pongTimeout = setTimeout(() => {
                    console.error('❌ Pong не получен, переподключаюсь...');
                 //   ws.terminate(); // принудительно закрываем
                }, 10000); // ждём pong 10 секунд
            }
              }, 25000); // каждые 25 секунд
              */ 
    });
        ws.on('message', async (data) => {
        var msg;
        try{
			msg = JSON.parse(data);
		}catch(e){
			console.log(e);
			return;
		}
         if (msg.result === {} && msg.id) {
            console.log('🏓 Pong получен для id:', msg.id);
            // Очищаем таймаут для этого pong
          /*  if (pongTimeout) {
                clearTimeout(pongTimeout);
                pongTimeout = null;
            }
            return;*/
        }
        console.log('msg ', msg);
        if(msg.id==1){
			let client=msg.result.client
			console.log('msg1 ', msg);
			try{
			let response = await axios.post('https://www.donationalerts.com/api/v1/centrifuge/subscribe', {channels:[channel], client:client},
			{ headers:{'Authorization': `Bearer ${AccessToken}`,'Content-Type':'application/json'}}
			);
			console.log('response ', response.data);
			let chan = response.data.channels[0].channel;
			let tok = response.data.channels[0].token;
			console.log('tok ', tok);
			console.log('channel ', chan);
			ws.send(JSON.stringify({
            params: {
				channel:chan,
                token: tok
            },
            method: 1,
            id: 2
        }));
		}catch(e){console.log(e);}
		}
		if( msg.result.data){
			console.log('msg3 ', msg,msg.result.data.info);
		}
		if (msg.id === 2 && msg.result) {
            console.log('✅ Успешно подписан на канал! Жду донаты...');
        }
        
        if (msg.id === 2 && msg.error) {
            console.error('❌ Ошибка подписки:', msg.error);
        }
        if (msg.result?.data?.data) {
            console.log('💰 Донат:', msg.result.data.data);
            let d = msg.result.data.data;
            let r = {};
            r.amount = d.amount;
            r.currency = d.currency;
            r.amount_in_user_currency = d.amount_in_user_currency;
            r.username = d.username;
            r.type = "donationalerts";
            r.message=(d.message?d.message:'no text');
            r.recipientid = d.recipient.user_id;
            eventEmitter.emit('donationalerts', r);
        }
        if (msg.method === 5) { // сервер прислал ping
    console.log('🏓 Отвечаем на ping сервера');
    ws.send(JSON.stringify({
        method: 5,
        id: msg.id // отвечаем тем же id
    }));
    return;
}
    });
     ws.on('close', (code, reason) => {
        console.log(`🔌 Соединение закрыто: ${code} - ${reason}`);
          //   if (pingInterval) clearInterval(pingInterval);
        //if (pongTimeout) clearTimeout(pongTimeout);
        // Переподключаемся через 5 секунд
        setTimeout(() => connect(), 5000);
    });
    
    ws.on('error', (error) => {
        console.error('❌ Ошибка WebSocket:', error);
    });


        
        /*
         *  Донат: {
  id: 181538543,
  name: 'Donations',
  username: 'Globik2',
  message: null,
  message_type: 'text',
  payin_system: null,
  amount: 10,
  currency: 'RUB',
  is_shown: 0,
  amount_in_user_currency: 10,
  recipient_name: 'Globik2',
  recipient: {
    user_id: 13425852,
    code: 'globik2',
    name: 'Globik2',
    avatar: 'https://t.me/i/userpic/320/dTyJQkS9chKnfMg4CcpmOSANKC-bNOgfdB2gTF51q0U.jpg'
  },
  created_at: '2026-03-14 22:09:18',
  shown_at: null,
  reason: 'default'
}
*/
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
  



























     
        
}
await connect();
}catch(e){}

}
router.post('/getFake', async(req, res)=>{
	let r = {};
            r.amount = 10;
            r.currency = "RUB";
            r.amount_in_user_currency = 60;
            r.username = "alik";
            r.type = "donationalerts";
            r.message='no text';
            r.recipientid = 1234;
            eventEmitter.emit('donationalerts', r);
            res.json({message: "OK"});
})
router.post('/list', async(req, res)=>{
	let response;
	try{
		 response = await axios.get('https://www.donationalerts.com/api/v1/alerts/donations',
			{ headers:{'Authorization': `Bearer ${AccessToken}`,'Content-Type':'application/json'}});
			console.log(response.data);
	}catch(e){
		console.log(e);
		return res.json({error:true, message: e});
	}
	res.json({data: response.data});
})
// ЗАПУСКАЕМ
startDonationListener().catch(console.error);

module.exports = {router,ev: eventEmitter}

function checkAuth(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	return res.status(401).send({ message: 'Залогиньтесь.'});
}
function secured(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/about');
}
function checkRole(roles){
	return function(req, res, next){
		if(roles.includes(req.user.brole)){
			return next();
		}
		return res.status(401).send({ message: 'Недостаточно прав!' });
	}
}
function isAdmin(roles){
	return function(req, res, next){
		if(roles.includes(req.user.brole)){
			return next();
		}
		return res.redirect('/about');
	}
}
