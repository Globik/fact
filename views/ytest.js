function ytest(n){
	return `<h2>Купить сердечки</h2>
	<p>
	Одно сердечко стоит 10 руб 
	</p>
	<section id="heartsContainer">
	
	<form method="post" action="/api/getPayUrl" name="ordertodo">
	<div id="heartswrapper">
	<div class="heartbox"><label for="t1"><div class="heart" style="width:50px"></div><b>Купить 10 сердечек = 100 руб</b>
	<input id="t1" type="radio" name="count" suka="10" class="ten" data-count="10" value="100.00" checked onchange="dodo(this);"></label></div>
	<div class="heartbox"><label for="t2"><div class="heart" style="width:50px"></div><b>Купить 50 сердечек = 400 руб</b>
	<input id="t2" type="radio" name="count" data-count="50" value="400.00" onchange="dodo(this);"></label></div>
	<div class="heartbox"><label for="t3"><div class="heart" style="width:50px"></div><b>Купить 100 сердечек = 700 руб</b>
	<input id="t3" type="radio" name="count" data-count="100" value="700.00" onchange="dodo(this);"></label></div>
	</div>
	<div>
	<input type="submit" value="Купить">
	</div>
	</form>
	</section>
	<pre>
	  {
  id: '2d501afb-000f-5000-a000-13913c77edea',
  status: 'pending',
  amount: { value: '500.00', currency: 'RUB' },
  description: 'Сердечек покупка в количестве 10 штук',
  recipient: { account_id: '326070', gateway_id: '2179833' },
  created_at: '2024-02-03T09:28:27.916Z',
  confirmation: {
    type: 'redirect',
    confirmation_url: 'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2d501afb-000f-5000-a000-13913c77edea'
  },
  test: true,
  paid: false,
  refundable: false,
  metadata: { alikey: 'number one' }
}
</pre>
	<a href="https://yoomoney.ru/checkout/payments/v2/contract?orderId=2d501afb-000f-5000-a000-13913c77edea">https://yoomoney.ru/checkout/payments/v2/contract?orderId=2d501afb-000f-5000-a000-13913c77edea</a>
	<br><br><br><div><button onclick="takeCb(this);">Проверить есть ли какие сообщения от вебхука</button></div>
	<output id="out"></output><br><br>
	<pre>
	[[0,{"type":"notification","event":"payment.canceled","object":{"id":"2d501afb-000f-5000-a000-13913c77edea","status":"canceled","amount":{"value":"500.00","currency":"RUB"},
	"description":"Сердечек покупка в количестве 10 штук","recipient":{"account_id":"326070","gateway_id":"2179833"},
	"created_at":"2024-02-03T09:28:27.916Z","test":true,"paid":false,"refundable":false,"metadata":{"alikey":"number one"},"cancellation_details":{"party":"yoo_money",
	"reason":"expired_on_confirmation"}}}]]
	</pre>
	`;
}
module.exports = { ytest }
