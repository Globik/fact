
const { login } = require('./login.js')



	const game = function(n){
	
	return ` <!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>${n.gamename?n.gamename:'Game'}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta itemprop="description" content="${n.gamename?n.gamename:'Game'}">
   <link rel="icon" href="/favicon.ico">
   <script src="/js/globalik.js"></script>
		<link href="/css/login.css" rel="stylesheet">
		<link href="/css/loader.css" rel="stylesheet">
	<link href="/css/game.css" rel="stylesheet">
		
		</head><body>
		
		
		<div class="cont">
		<a class="nava" href="/games/">Back</a>
		<canvas id="cnv"></canvas>
	</div>
		<script src="/js/game.js"></script>
		
		</body></html>`;
	}
	module.exports = { game }
