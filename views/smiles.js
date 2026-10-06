const smilesfolder = "/img1/faces/";
const { smilesMap } = require('../libs/utils.js');
const smiles = function(n){
	return `<link href="/css/smiles.css" rel="stylesheet">
	<div id="smilesCont"><button id="smilesKontakt" onclick="openSmiles(this);">${getSvg()}</button><div id="smilesProkladka">${getSmiles()}</div></div>`;
}
module.exports = { smiles };

function getSmiles(){
	let s = '';
	for(let i in smilesMap){
		//console.log(i, ' ',smilesMap[i]);
		s+= `<div class="smile-box" title="${i}" onclick="setSmile(this);" data-marker="::${i}::"><img alt="${i}" onerror="this.remove();" class="inline-smile" src="${smilesfolder}${smilesMap[i]}"/></div>`;
	}
	return s;
}

function getSvg(){
	return `<svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Белый фон квадрата -->
  <rect width="100" height="100" fill="white"/>
  
  <!-- Лицо (круг) -->
  <circle cx="50" cy="50" r="40" fill="#FFD700" stroke="#E6C200" stroke-width="2"/>
  
  <!-- Левый глаз -->
  <circle cx="35" cy="40" r="5" fill="black"/>
  
  <!-- Правый глаз -->
  <circle cx="65" cy="40" r="5" fill="black"/>
  
  <!-- Улыбка (дуга) -->
  <path d="M 30 60 Q 50 80 70 60" 
        fill="none" 
        stroke="black" 
        stroke-width="3" 
        stroke-linecap="round"/>
</svg>`;
}
