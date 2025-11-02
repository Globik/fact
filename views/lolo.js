const lolo = function(n){
	return `<html>
<head>
<title>horizontal roulette</title>
<style>
section#fruitscontiner{
	border:1px solid green;
	position:relative;
	height:138px;
	display:block;
	verflow:hidden;
	width:384px;
}

section#fruitscontiner img{
	padding-top:10px;
	padding-bottom:10px;
	position:absolute;
	display:inline-block;
	
}
</style>
<script src="/js/globalik.js"></script>
</head><body>
<section id="fruitscontiner">
<img src="/img/Apple.webp" onclick="alert(this.naturalWidth);" width="128" height="128"/>
<img src="/img/Strawberry.webp" />
<img src="/img/Cherry.webp" />
<img src="/img/Pear.webp" />
<img src="/img/Kiwi.webp" />
<img src="/img/Lemon.webp" />
</section>
<hr><div>
 <div>4100118676103827 me 410016439442251  er</div>
<output id="out">${n.yacount?n.yacount:'null'}</output>
<button onclick="setYacount(this);">set count</button>
</div>
<script>${setFunc(n)}</script>
<script src="/js/hroulete.js"></script>
<script src="/js/yacount.js"></script>
</body></html>
 `;}

module.exports={lolo}
function setFunc(n){
	let s='function bobo(arr,i){';
	n.arr.forEach(function(el,i,arr){
		s+=`
		if(k<=-128*(i+1)){arr[i].style.left=\`\${128*(arr.length+i)+k}px\`
	}
	if(k<=-128*(arr.length+1)){
		
		k=-128;
	}
	`;
	});
	s+='}'
	return s;
}
