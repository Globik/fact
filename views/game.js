
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
		<!-- <link href="/css/login.css" rel="stylesheet"> -->
		<link href="/css/loader.css" rel="stylesheet">
	
		${n.css?set_css(n.css):''}
		</head><body>
		
		
		<div class="cont">
		<a class="nava" href="/games/">Back</a>
		<div id="info"></div>
		<canvas id="cnv"></canvas>
	</div>
		
		${n.scripts?set_scripts(n.scripts):''}
		</body></html>`;
	}
	module.exports = { game }
   function set_scripts(arr){
	   let s = '';
	   if(Array.isArray(arr)){
		   if(arr.length > 0){
			   arr.forEach(function(el,i){
				   s+=`<script src="/js/games/${el}"></script>`;
			   });
		   }
	   }
	   return s;
   }
   function set_css(arr){
	   let s = '';
	   if(Array.isArray(arr)){
		   if(arr.length > 0){
			   arr.forEach(function(el,i){
				   s+=`<link href="/css/games/${el}" rel="stylesheet">`;
			   });
		   }
	   }
	   return s;
   }
