const { login } = require('./login.js');
const { nav } = require('./nav.js');
const { footer } = require('./footer.js');
const { mheader } = require('./mheader.js');
let wallet=function(n){
	return `<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Криптокошелек</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta itemprop="description" content="Hot wallet">
   <link rel="icon" href="/favicon.ico">
   <script src="/js/globalik.js"></script>
   <link href="/css/main22.css" rel="stylesheet">
   <link href="/css/parade.css" rel="stylesheet">
   <link href="/css/nav.css" rel="stylesheet">  
   <link href="/css/login.css" rel="stylesheet">
	<link href="/css/myfooter.css" rel="stylesheet">
	<link href="/css/loader.css" rel="stylesheet">
		<link href="/css/wallet.css" rel="stylesheet">
		</head><body>
		<div class="mymain">
		
		
		${nav(n)}
		${mheader(n)}
		<main class="pagemain">
		<div><span class="alfa">В разработке</span></div>
		<header class="walletHeader">Wallet</header>
		<section id="walletContainer">
		<button class="wbtn" onclick="getUSDCERC20(this);">Создать USDC ERC-20 кошелек</button>
		</section><br><br><br>
		<div class="forout">
		<pre id="out" style="white-space:pre-wrap;"></pre><br><br>
		<p>Просто создает горячий криптокошелек USDC-ERC20 пока в тестовой сети. Регистрироваться и логиниться не надо</p>
		</div>
		</main>
		${footer(n)}
		</div>
		${login(n)}
		
		<script src="/js/wallet.js"></script>
		<script src="/js/login4.js"></script>
		</body></html>`;
}
module.exports = { wallet }

