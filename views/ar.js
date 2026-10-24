const ar=function(n){
	return `
	
	<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AR.js с маркером Hiro</title>
    
    <!-- Подключаем A-Frame -->
    <script src="https://cdn.jsdelivr.net/npm/aframe@1.4.2/dist/aframe-master.min.js"></script>
   <!-- <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script> -->
    
    <!-- Подключаем AR.js для A-Frame -->
    <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
    
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
</head>
<body>
  
    
    <a-scene 
        embedded 
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;">
        
        <!-- Маркер Hiro с настройками сглаживания -->
        <a-marker 
            preset="hiro"
            smooth="true"
            smoothCount="10"
            smoothTolerance="0.01"
            smoothThreshold="5">
            
            <!-- Маленький красный куб (размер 0.2 вместо 1) -->
            <a-box 
                position="0 0.1 0" 
                color="red" 
                depth="0.2" 
                height="0.2" 
                width="0.2"
                animation="property: rotation; to: 360 360 360; dur: 5000; easing: linear; loop: true">
            </a-box>
            
            <!-- Можно добавить еще объекты для примера -->
            <!-- Маленькая синяя сфера рядом -->
            <a-sphere 
                position="0.3 0.1 0" 
                radius="0.05" 
                color="blue"
                animation="property: position; to: 0.3 0.15 0; dir: alternate; dur: 1000; loop: true">
            </a-sphere>
             </a-marker>
        
        <!-- Камера -->
        <a-entity camera></a-entity>
        
    </a-scene>
</body>
</html>
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	`;
}
module.exports={ar}
