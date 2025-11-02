const whosonline = function(n){
	return `
	 <a href="#."  class="overlay line" id="whosonline"></a>
    <output id="whosonlineoutput" class="popi"><div class="krestikdiva">
    <b class="camsb">Cams:&nbsp;<span id="webcams2">0</span></b>&nbsp;<b class="camsb">Connects:&nbsp;
    <span id="conns2">0</span></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#." class="krestik-two" onclick="removeList();">&#x274C;</a></div>
     <!-- <div id="yandex_rtb_R-A-12098170-9"></div>
     <div onclick="closeRek(this);">close ad</div> -->
   <!--  <script>
     // https://yandex.ru/support2/partner/ru/web/units/sizes
     function setbanner(){
      if(Brole.value==="admin") return;
     window.yaContextCb.push(()=>{
		 Ya.Context.AdvManager.render({
			 "blockId":"R-A-12098170-9",
			 "renderTo":"yandex_rtb_R-A-12098170-9",
			  "onClose":function(){
			console.log("Reklama closed")
			//setTimeout(function(){setbanner();}, 1000 * 30)}
		 })
	 })
 }
 //setbanner();
	 </script> -->
    <section id="whosonlinecontent">
    
    </section>
  
    </output>
	`;
}
module.exports = { whosonline }
