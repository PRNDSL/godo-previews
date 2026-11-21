/* 身長(cm)から車輪の大きさ(インチ)を1つに決める。境目はこの関数だけに置く */
function sizeFor(cm){
  if(cm<115) return 16;
  if(cm<125) return 18;
  if(cm<135) return 20;
  if(cm<142) return 22;
  if(cm<150) return 24;
  if(cm<160) return 26;
  return 27;
}
(function(){
  /* 身長のつまみ(トップの一枚目にだけある) */
  var input=document.getElementById('height');
  if(input){
    var out=document.getElementById('hOut');
    var cmText=document.getElementById('cmText');
    var inchEl=document.getElementById('inch');
    var bike=document.getElementById('bikeScale');
    var mark=document.getElementById('mark');
    var items=document.querySelectorAll('#chart li');
    var PX_PER_CM=1.69; /* 絵の目盛り: 27インチの車輪(直径約68.6cm)を半径58で描いた比 */
    var update=function(){
      var cm=Number(input.value);
      var inch=sizeFor(cm);
      out.textContent=cm+'cm';
      cmText.textContent=cm;
      inchEl.textContent=inch;
      bike.style.setProperty('--s',(inch/27).toFixed(4));
      mark.style.transform='translateY('+(-cm*PX_PER_CM).toFixed(1)+'px)';
      for(var i=0;i<items.length;i++){
        items[i].classList.toggle('on',Number(items[i].getAttribute('data-inch'))===inch);
      }
    };
    input.addEventListener('input',update);
    update();
  }

  /* 営業時間の板のうち今日に当たる1枚を黄にし、上に1文を出す(祝日の判定はしない) */
  var today=String(new Date().getDay());
  var lists=document.querySelectorAll('[data-plates]');
  for(var k=0;k<lists.length;k++){
    var box=lists[k].closest('.hours');
    var msg=box?box.querySelector('[data-today-msg]'):null;
    var plates=lists[k].querySelectorAll('.plate');
    for(var j=0;j<plates.length;j++){
      if(plates[j].getAttribute('data-days').split(' ').indexOf(today)>-1){
        plates[j].classList.add('today');
        var close=plates[j].getAttribute('data-close');
        var txt='今日は休みです';
        if(close){
          var nowD=new Date(),hm=close.split(':'),closeMin=(+hm[0])*60+(+hm[1]);
          txt=(nowD.getHours()*60+nowD.getMinutes()>=closeMin)?'今日は'+close+'で閉まりました':'今日は'+close+'まで';
        }
        if(msg){msg.textContent=txt;msg.hidden=false;}
      }
    }
  }

  /* 上へ戻る: ページが画面3つ分より長い時だけ、1画面ぶん下がったら出す */
  var ue=document.createElement('button');
  ue.type='button';ue.className='ue';ue.hidden=true;ue.textContent='上へ';
  ue.setAttribute('aria-label','ページの上へ戻る');
  document.body.appendChild(ue);
  ue.addEventListener('click',function(){window.scrollTo(0,0);});
  function miru(){
    var vh=window.innerHeight, nagai=document.documentElement.scrollHeight>vh*3;
    ue.hidden=!(nagai&&window.pageYOffset>vh);
  }
  window.addEventListener('scroll',miru,{passive:true});
  window.addEventListener('resize',miru);
  miru();
})();
