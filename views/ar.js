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
    <!-- AR сцена с маркером Hiro -->
    <a-scene embedded arjs>
        
        <!-- Маркер Hiro -->
        <a-marker preset="hiro">
            
            <!-- Красный куб на маркере -->
            <a-box 
                position="0 0.5 0" 
                color="red" 
                depth="1" 
                height="1" 
                width="1"
                animation="property: rotation; to: 360 360 360; dur: 5000; easing: linear; loop: true">
            </a-box>
            
        </a-marker>
        
        <!-- Камера -->
        <a-entity camera></a-entity>
        
    </a-scene>
</body>
</html>
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	`;
}
module.exports={ar}
