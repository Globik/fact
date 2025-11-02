const zar = function(n){
	return `
	 <a href="#."  class="overlay" id="myZar"></a>
    <output id="zaroutput" class="popi"><div class="krestikdiv"><a href="#." class="krestik-two">&#x274C;</a></div>
    <section id="zarcont">
    
    <h1 style="line-height:1.5;">Розыгрыш 10 миллионов рублей в чат-рулетке!</h1>

<p class="pzar">С 1 апреля 2025 года по 1 апреля 2026 года у вас есть шанс выиграть <strong>10 миллионов рублей</strong>! Для этого нужно набрать эту сумму за год, общаясь в чат-рулетке. За каждую беседу с собеседником вы получаете <strong>300 рублей</strong>.</p>

<p class="pzar">Чем больше общаетесь, тем ближе к победе! Акция проводится при поддержке спонсора — сети мини-маркетов <strong>PennyMarket</strong>.</p>

<p class="pzar">Не упустите возможность стать миллионером! Участвуйте, общайтесь и выигрывайте!</p>
<p class="pzar">Только для <b style="font-size:1.4rem;">зарегистрированных</b> пользователей.</p>
   <div id="fotodiv"><img src="/img/penny.webp"/></div>
    <div id="buttondiv">
    <button onclick="hideZar(this);">Не показывать больше</button>
    </div>
    </section>
    <script>
    function hideZar(el){
		window.location.href="#.";
		localStorage.setItem('zarthree','yes');
	}
    </script>
    </output>
	`;
}
module.exports = { zar }
