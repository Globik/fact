//const seo = require('../libs/seo.json')
const okno = function(n){
	return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>${n.title}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0"> 
    <meta itemprop="name" content="${n.items[0]}"/>
    <link rel="icon" href="/favicon.ico">
    <style>
    section#cont{
    display:flex;
	flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
		align-items: center;
	}
    figure.imghalter{
		width:200px;
		height:200px;
	}
	figure.imghalter img{
	width:100%;
}


ul{
list-style-type:none;
}
li{display:inline;}
    </style>
     <script>window.yaContextCb=window.yaContextCb||[]</script>
    <script src="https://yandex.ru/ads/system/context.js" async></script>
    </head><body><nav itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="iem" href="/"><span itemprop="name">rouletka.ru</span></a>
    <meta itemprop="position" content="1" /></li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="iem" href="/photos"><span itemprop="name">photos</span></a>
    <meta itemprop="position" content="2" /></li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <span itemprop="name">${n.title}</span>
    <meta itemprop="position" content="3" /></li>
    </nav>
    <section id="cont">${getPhoteli(n)}</section>
     <script>
	 window.yaContextCb.push(()=>{
	 Ya.Context.AdvManager.render({
	 "blockId":"R-A-12098170-7",
	 "type":"fullscreen",
	 "platform":"touch"
 })
})

window.yaContextCb.push(()=>{
	 Ya.Context.AdvManager.render({
	 "blockId":"R-A-12098170-8",
	 "type":"fullscreen",
	 "platform":"desktop"
 })
})
	 </script>
	 <div id="yandex_rtb_R-A-12098170-9"></div>
	 <script>
	 window.yaContextCb.push(()=>{
	 Ya.Context.AdvManager.render({
	 "blockId":"R-A-12098170-9",
	 "renderTo":"yandex_rtb_R-A-12098170-9"
 })
})
	 </script>
    </body></html>`;
}
module.exports = { okno }


function getPhoteli(n){
	//console.log(n.jObj.yandexsearch.response.results.grouping.group);
	let s='';
	
	n.jObj.yandexsearch.response.results.grouping.group.forEach(function(el, i){
		s+=`<figure itemscope itemtype="http://schema.org/ImageObject" class="imghalter"><img onerror="this.remove();" src="${el.doc["image-properties"]["thumbnail-link"]}" itemprop="contentUrl"/><figcaption><span itemprop="description"><b>${n.items[i]}.</b></span></figcaption></figure>`
	});
	return s;
}
