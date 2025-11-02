const photos = function(n){
	return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Photos</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0"> 
    <link rel="icon" href="/favicon.ico">
    <meta itemprop="name" content="Картинки"/>
    <style>
    .imghalter{
		width:50%;
		margin: 0 auto;
	}
	.imghalter img{
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
    <span itemprop="item"><span itemprop="name">photos</span></span>
    <meta itemprop="position" content="2" /></li>
    </nav>
    
    <article itemscope itemtype="https://schema.org/WebPage"><header itemprop="name">Картинки</header>${getLinks(n)}</article>
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

module.exports = { photos }
function getLinks(n){
	//console.log("*** N *** ", n);
	let s = '';
//	n.items.forEach(function(el, i){
for(let i in n.items){
		s+=`<p><a href="/photos/${i}" itemprop="url">${i}</a></p>`;
	}
	//});
	return s;
}
