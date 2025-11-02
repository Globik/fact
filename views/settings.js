function settings(n){
	return `
	<section id="settingsContainer">
	
	<div id="paymentsEnabled">
	<h2>yookassa</h2>
	<label for="idTestPaymentEnabled">Вкл / выкл платежи</label>
	<input type="checkbox" id="idTestPaymentEnabled" name="testPaymentEnabled" ${n.paymentTestEnabled?'checked':''} onchange="alert('change');">
	</div><hr>
	<form name="testPayment" method="post" action="/api/setTestPayment" >
	<h3>Тестовые платежи</h3>
	<p>
	<a href="https://yookassa.ru/my/shop-settings">https://yookassa.ru/my/shop-settings</a><br>326070
	</p>
	<div>
	<label>Test  Shop Id</label><br>
	<input type="text" name="testshopid" required value="${n.testshopid?n.testshopid:''}" placeholder="test shop id">
	</div>
	<div>
	<p>
	<a href="https://yookassa.ru/my/merchant/integration/api-keys">https://yookassa.ru/my/merchant/integration/api-keys</a><br>
	test_avr36GZhsj37wGmbWQoYXraXa9_eEWh7vZjEjEkOjh8
	</p>
	<label>Test Shop Secret</label><br>
	<input type="text" required name="testshopsecret" value="${n.testshopsecret?n.testshopsecret:''}" placeholder="test shop secret">
	</div>
	<div>
	<input type="submit" value="Сохранить">
	</div>
	</form>
	<hr>
	<form name="payment" method="post" action="/api/setPayment" onsubmit="onSubmitPayment(this);">
	<h3>Настоящие платежи</h3>
	<div>
	<label>Shop Id</label><br>
	<input type="text" name="shopid" required value="${n.shopid?n.shopid:''}" placeholder="shop id">
	</div>
	<div>
	<label>Shop Secret</label><br>
	<input type="text" required name="shopsecret" value="${n.shopsecret?n.shopsecret:''}" placeholder="shop secret">
	</div>
	<div>
	<input type="submit" value="Сохранить">
	</div>
	</form><hr>
	<form name="testPayout" method="post" action="/api/setTestPayout" onsubmit="onSubmitTestPayout(this);">
	<h3>Тестовые выплаты</h3>
	
	
	<div>
	<label>Test  Shop Id</label><br>
	<input type="text" name="testshopid" required value="${n.testshopid?n.testshopid:''}" placeholder="test shop id">
	</div>
	<div>
	<label>Test Shop Secret</label><br>
	<input type="text" required name="testshopsecret" value="${n.testshopsecret?n.testshopsecret:''}" placeholder="test shop secret">
	</div>
	<div>
	<input type="submit" value="Сохранить">
	</div>
	</form><hr>
	<form name="payout" method="post" action="/api/setPayout" onsubmit="onSubmitPayout(this);">
	<h3>Настоящие выплаты</h3>
	<div>
	<label>Shop Id</label><br>
	<input type="text" name="shopid" required value="${n.shopid?n.shopid:''}" placeholder="shop id">
	</div>
	<div>
	<label> Shop Secret</label><br>
	<input type="text" required name="shopsecret" value="${n.shopsecret?n.shopsecret:''}" placeholder="shop secret">
	</div>
	<div>
	<input type="submit" value="Сохранить">
	</div>
	</form>
	</section>
	`;
}

module.exports = { settings }
