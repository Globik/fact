function dashboard(n){
return `
 <!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Админка</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- <meta name="viewport" content="width=device-width,initial-scale=1.0"> -->
    <meta name="viewport" content="width=device-width,user-scalable=no" />
    <link rel="icon" href="favicon.ico">
  <!--  <link href="/css/main2.css" type="text/css" rel="stylesheet"> -->
    <link href="/css/main22.css" rel="stylesheet">
    <link href="/css/adminka.css" rel="stylesheet">
    <link href="/css/hearts.css" rel="stylesheet">
    <script src="/js/globalik.js"></script>
    <script src="/js/mediasoup-client.min.js"></script>
    </head><body>
    <a href="/about">На главную</a>
    <nav id="adminNav"><button onclick="getUsers(this);">Пользователи</button><button onclick="getStun(this)";>Stun / turn</button><button onclick="whosOnline(this);">Кто онлайн</button>
    <button id="settings" onclick="getSettings(this);">Настройки</button><!-- <button onclick="getTest(this);">Купить</button> -->
    <button onclick="getTestGifts(this);">Сердечки тест</button><button onclick="getPayments(this);">Платежи</button>
    <button onclick="getAllBanned(this);">Бан</button><button onclick="getIps(this);">ban ips</button>
    </nav>
   <!-- <div>
    <button onclick="post_start();">post start</button>&nbsp;&nbsp;<button onclick="post_next();">post next</button>
    </div> -->
    <output id="waiting"></output>
    <hr>
    <div id="dynamicNav">
    
    <div><b>Юзеров:</b> <span>${n.usercount?n.usercount:0}</span></div>
 

    <div><b>Пересылок:</b> <span>${n.giftcount}</span></div>
    
    <div><b>Веб-камер:</b> <span id="camsCount">0</span></div><div><b>Коннектов:</b> <span id="connects">0</span> (<span id="conns">0</span>)</div></div>
    <hr> <a href="/admin/yoomoneytest">yoomoney</a>
    <hr>
    <section id="adminContainer">
    <div id="someSpinner" class="hide"><div class="loader"></div></div>
    <section id="contentBox"></section>
   <!-- <button data-start="yes" onclick="joinRoom(this);">Войти в чат</button>
    <input type="checkbox" id="myVideo" onchange="setVideos(this);" ${n.mediasoupadmin=='yes'?'checked':''}/>
    <button onclick="fucking();">clear</button> -->
    <section id="dynamicSection"><div id="dynamicContainer"></div></section>
    </section>
    <script src="/js/adminka.js"></script>
    <script src="/js/adminM.js"></script>
    </body></html>`;
}
module.exports = { dashboard }
