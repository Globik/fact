const yoomoneytest = function(n){
	return ` <!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>yoomoney test</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0"> 
    <link href="/css/main22.css" rel="stylesheet">
    <link href="/css/yoomoneytest.css" rel="stylesheet">
    <script src="/js/globalik.js"></script>
    </head><body>
    <h1>Yoomoney</h1>
    <hr>1) <a href="https://yoomoney.ru/settings/oauth-services">https://yoomoney.ru/settings/oauth-services</a>
    <form name="myyoomoney" class="myyoomoney" action="/admin/saveYoomoney" method="post">
    <div>
    <label><b>client_id:</b></label><br>
    <textarea  id="clientId" name="client_id" required disabled placeholder="client_id" value="${n.yoomoney_client_id?n.yoomoney_client_id:''}">${n.yoomoney_client_id?n.yoomoney_client_id:''}</textarea>
    </div>
    <div>
    <label><b>client secret:</b></label><br>
    <textarea placeholder="client_secret" required disabled name="client_secret" value="${n.yoomoney_secret?n.yoomoney_secret:''}">${n.yoomoney_secret?n.yoomoney_secret:''}</textarea>
    </div>
    <div>
    <input class="sub" type="submit" disabled name="submit" value="save" />&nbsp;&nbsp;&nbsp;<input class="sub" name="reset" type="reset" disabled onclick="doWas(this);" value="Сбросить" />
    </div>
    <hr><a href="https://yoomoney.ru/transfer/myservices/http-notification?lang=ru">https://yoomoney.ru/transfer/myservices/http-notification?lang=ru</a><hr>
    </form>
    <button onclick="redact(this);">Редактировать</button>
    <hr>
    <form name="ynotif" action="/admin/saveNotif" method="post">
    <header> yoomoney notification secret</header>
    <div><input type="text" name="y_notif" required value="${n.y_notif?n.y_notif:'suka'}" /></div>
    <div><input type="submit" value="save" /></div>
    </form>
    <hr>2) Авторизация
    <div>
    <button onclick="goAuth(this);">go to yoomoney</button>
    </div>
    <hr>
    <hr>3) Info
    <div>
    <button onclick="getInfo(this);">get info</button>
    <br><br><output id="out"></output>
    </div>
    <hr>
    <hr>4) History
    <div>
    <button onclick="getHistory(this);">get history</button>
    <br><br><output id="out2"></output>
    </div>
    <hr>5) Проверить уведомления, есть ли
    <div><button onclick="takeCb2(this);">check webhook</button></div>
    <div><ooutput id="out3"></output></div>
    
    <hr>
    <hr>6) Платный вход
    <form class="ymform"  method="POST" action="https://yoomoney.ru/quickpay/confirm">
    <div><label for="receiver"><b>Получатель:</b></label><br><input type="text" id="receiver" placeholder="олучатель yoomoney" name="receiver" value="4100118676103827" required/> </div>
    <input type="hidden" name="label" value="id=${n.user?n.user.id:'0'}&c=5"/>
    <input type="hidden" name="quickpay-form" value="button" />
    <input type="hidden" name="formcomment" value="Покупка сердечек 5 штук" />
    <input type="hidden" name="targets" value="Купить 10 сердечек" />
    <input type="hidden" name="successURL" value="https://rouletka.ru/about" />
    <h3>Платить будете:</h3>
   <div><label for="sum"><b>Cумма в рублях:</b>&nbsp;&nbsp;&nbsp;</label><input class="number"  type="text" id="sum" name="sum" value="2.00" required data-type="number"/></div>
   <div><label for="ym" ><b>ЮMoney:</b></label>&nbsp;&nbsp;&nbsp;<input id="ym" class="input" type="radio" checked name="paymentType" value="PC" /></div>
   <div><label for="bc" ><b>Банковской картой:</b></label>&nbsp;&nbsp;&nbsp;<input id="bc"  class="input" type="radio" name="paymentType" value="AC" /></div>
   <div><input type="submit" value="Купить"/></div>
    </form>
    <hr>
    
    <hr>7) Получить юзеру рубль на свой счет
    <p>То есть, пусть одно сердечко, допустим, 10 руб стоит. Мы продаем за 10 руб.
    Юзер, который накопит 500 сердечек как минимум захочет полуучить за них бабки. 
    Мы меняем сердечки на бабки. 10 процентов юзеру, 90% себе. То есть
    500 сердечек по себестоимости = 5 000 руб. Отдаем деньги юзеру 500 руб</p>
    <div>
    <form name="mypayoutform" action="/admin/setPayout" method="post">
    <input type="hidden" name="label" value="${n.user?n.user.id:'0'}"/>
    <div><label for="payoutamountid">Хочу в руб:</label>&nbsp;&nbsp;<input type="number" id="payoutamountid" name="payoutamount" required min="0.00" max="1000.00" value="247.52"/></div>
    <div><label for="payoutaccountid">Счет в юмани:</label>&nbsp;&nbsp;<input type="number" id="payoutaccountid" name="payoutaccount" required  value="4100118676103827"/></div>
    <div><input type="submit" value="Получить" /></div>
    </form>
    </div>
    <hr><h1>Telegram API</h1>
    <hr>8) Проверить уведомления, есть ли from telegram bot
    <div><button onclick="takeCb3(this);">check webhook</button></div>
    <div><ooutput id="out333"></output></div>
    
    <hr>
    <button onclick="banAll(this);">Забанить всех</button> | <button onclick="banoutAll(this);">Разбанить всех</button> 
    <script src="/js/yoomoneytest.js"></script>
    </body></html>
    `
}
module.exports = { yoomoneytest }


























