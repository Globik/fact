const { nav } = require('./nav.js')
const { login } = require('./login.js')
const { warnig } = require('./warnig.js');
const { footer } = require('./footer.js');
const { mheader } = require('./mheader.js');

	const games = function(n){
	
	return ` <!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Games</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta itemprop="description" content="Games">
   <link rel="icon" href="/favicon.ico">
   <script src="/js/globalik.js"></script>
   <link href="/css/main22.css" rel="stylesheet">
   <link href="/css/nav.css" rel="stylesheet">  
   <link href="/css/parade.css" rel="stylesheet">
		<link href="/css/login.css" rel="stylesheet">
		<link href="/css/myfooter.css" rel="stylesheet">
		<link href="/css/loader.css" rel="stylesheet">
<!--	<script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script> -->
	<script src="https://cdn.jsdelivr.net/npm/aframe@1.4.2/dist/aframe-master.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/ar.js@3.4.3/aframe/build/aframe-ar.js"></script>
    <style>
        
        /* Скрываем предупреждение о камере, оставляем только видео */
        .arjs-loader { display: none; }
    </style>
		
		</head><body>
		<div class="mymain">
		${nav(n)}
		<!-- ${warnig(n)} -->
		${mheader(n)}
		<main class="pagemain">
		<section class="article-section">
		<p><a href="/games/smash_hit">Mediocre smash hit</a></p>
		<p><a href="/games/smash_hit_1">Mediocre smash hit AR</a></p>
		<p>
		<img src="/img1/Pattern-hiro.png" alt="AR marker" style="border:1px solid #ccc;">
		 <!-- 2. AR Сцена -->
    <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: true; detectionMode: mono_and_matrix; matrixCodeType: 3x3;">
        
        <!-- 3. Определяем маркер, тип pattern, url указывает на твой .patt файл -->
        <!-- preset="custom" означает использование пользовательского маркера -->
        <a-marker type="custom" preset="custom" url="/img1/marker.patt" emitevents="true" id="corridor-marker"> 
                   <!-- <a-marker preset="hiro"> -->
            <!-- 4. Монтируем наш пользовательский компонент коридора -->
            <!-- Позиция и поворот корректируются в соответствии с системой координат AR.js -->
            <a-entity corridor-tunnel position="0 0 0" rotation="-90 0 0"></a-entity>
            
        </a-marker>
        
        <!-- Камера -->
        <a-entity camera></a-entity>
    </a-scene>
		</p>
		</section>
		</main>
		${footer(n)}
		</div>
		${login(n)}
		<script src="/js/marker.js"></script>
		<script src="/js/login4.js"></script>
		</body></html>`;
	}
	module.exports = { games }
