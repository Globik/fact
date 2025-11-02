var futs = document.querySelectorAll('#fruitscontiner img');
var duka;
var k=0;
function siwu(){
[...futs].forEach((el,i,arr)=>{
	//console.log(i)
	el.style.left=`${i*128+k}px`;
	bobo(arr,i);
})
}
function draw1(){
siwu();
k-=1;
duka=requestAnimationFrame(draw1)
}
duka=requestAnimationFrame(draw1);
