(function(){
  document.documentElement.classList.add('js');
  var YOU=['日','月','火','水','木','金','土'];
  var AKU=[0,1,4,5,6], AKE=420, SHIME=900, DENWA=1020;
  var now=new Date(), d=now.getDay(), m=now.getHours()*60+now.getMinutes();
  function aku(x){return AKU.indexOf(x)>=0;}
  function tsugiNo(x){for(var i=1;i<=7;i++){var n=(x+i)%7;if(aku(n))return {d:n,ato:i};}return {d:x,ato:7};}
  function hm(t){return Math.floor(t/60)+':'+('0'+(t%60)).slice(-2);}
  function each(sel,fn,root){var l=(root||document).querySelectorAll(sel);for(var i=0;i<l.length;i++)fn(l[i],i);}
  function tsugiBun(){var n=tsugiNo(d);return (n.ato===1?'明日、':'')+YOU[n.d]+'曜の7時から';}
  var jo=!aku(d)?'yasumi':(m<AKE?'mae':(m>=SHIME?'owari':'eigyo'));
  var hi=(jo==='yasumi'||jo==='owari')?tsugiNo(d).d:d;
  var YUGE='<svg class="yuge" viewBox="0 0 22 20" aria-hidden="true"><path class="ke" d="M6 8q-2-3 0-6"/><path class="ke" d="M11 8q-2-3 0-6"/><path class="ke" d="M16 8q-2-3 0-6"/><path d="M2 19v-5a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v5z" fill="#1a2226"/></svg>';

  each('.hyou[data-hyou]',function(h){
    var kyo=h.getAttribute('data-hyou')==='kyo';
    var gyo=[].slice.call(h.querySelectorAll('.gyo'));
    var ari=[];
    gyo.forEach(function(g){
      var nokori=0;
      each('.hin>span',function(s){
        var dd=s.getAttribute('data-d');
        var ok=!dd||dd.indexOf(String(hi))>=0;
        if(kyo){s.hidden=!ok;}
        else if(!ok){s.classList.add('nashi');}
        if(ok)nokori++;
      },g);
      if(nokori)ari.push(g);else if(kyo)g.classList.add('kakusu');
    });
    function annai(g,t){var a=g.querySelector('.annai');if(a)a.innerHTML=t;}
    var miseru=[], msg='', sub='', mei='';
    if(jo==='eigyo'){
      var ima=0;
      ari.forEach(function(g,i){if(+g.getAttribute('data-t')<=m)ima=i;});
      ari.forEach(function(g,i){
        var t=+g.getAttribute('data-t');
        if(i<ima){g.classList.add('sumi-gyo');annai(g,'出ました');}
        else if(i===ima){g.classList.add('ima');annai(g,YUGE+'出ています');}
        else if(i===ima+1){g.classList.add('tsugi-gyo');annai(g,'次 あと'+(t-m)+'分');}
        else{g.classList.add('yotei');annai(g,'予定');}
      });
      miseru=ari.slice(ima,ima+5);
      if(ima===ari.length-1){msg='今日の窯はこれでおしまいです。';sub='棚にある分が売り切れたら閉めます。遅くとも15時までです。';}
      else{msg='開いています。次の窯は'+hm(+ari[ima+1].getAttribute('data-t'))+'です。';sub='売り切れたら、その時点で閉めます。遅くとも15時までです。';}
      mei=(now.getMonth()+1)+'月'+now.getDate()+'日('+YOU[d]+')の焼き上がり';
    }else if(jo==='mae'){
      var hajime=true;
      ari.forEach(function(g){
        var t=+g.getAttribute('data-t');
        if(t<=AKE){g.classList.add(hajime?'tsugi-gyo':'yotei');annai(g,'7時に並びます');hajime=false;}
        else{g.classList.add('yotei');annai(g,'予定');}
      });
      miseru=ari.slice(0,5);
      msg='7時に開きます。'+(AKE-m<=90?'あと'+(AKE-m)+'分です。':'');
      sub='開けた時には、6:30と7:00の窯の分が並んでいます。';
      mei=(now.getMonth()+1)+'月'+now.getDate()+'日('+YOU[d]+')の焼き上がり';
    }else{
      ari.forEach(function(g){g.classList.add('yotei');annai(g,'予定');});
      miseru=ari.slice(0,4);
      msg=(jo==='yasumi'?'今日はお休みです。':'今日は閉めました。')+'次は'+tsugiBun()+'です。';
      sub=kyo?'下は'+YOU[hi]+'曜の朝いちばんの窯です。':YOU[hi]+'曜に焼かない物には線を引いています。';
      mei=YOU[hi]+'曜の予定';
    }
    if(kyo){gyo.forEach(function(g){if(miseru.indexOf(g)<0)g.classList.add('kakusu');});}
    each('[data-mei]',function(e){e.textContent=mei;},h);
    each('[data-msg]',function(e){e.innerHTML=msg+'<small>'+sub+'</small>';},h);
    each('[data-tokei]',function(e){e.hidden=false;e.innerHTML='いま<b>'+hm(m)+'</b>';},h);
  });

  each('.yobi li[data-d="'+d+'"]',function(e){e.classList.add('kyo');});
  each('.jikan-hyou tr[data-d="'+d+'"]',function(e){e.classList.add('kyo');});

  each('[data-denwa]',function(e){
    var t;
    if(!aku(d))t='今日は休みで、電話に出られません。次は'+tsugiBun()+'です。';
    else if(m<AKE)t='電話は7時からです。';
    else if(m<DENWA)t='いまは電話を受けている時間です。17時まで。';
    else t='今日の電話は終わりました。次は'+tsugiBun()+'です。';
    e.textContent=t;
  });

  var f=document.querySelector('.shibori');
  if(f){
    var out=document.querySelector('[data-kazu]'), nai=document.querySelector('.nai-toki');
    var kosu=function(){
      var shu=f.querySelector('input[name="shu"]:checked').value;
      var free=document.getElementById('tamanyu').checked, n=0;
      each('.pan',function(p){
        var ok=(shu==='all'||(' '+p.getAttribute('data-shu')+' ').indexOf(' '+shu+' ')>=0)&&(!free||p.hasAttribute('data-free'));
        p.hidden=!ok;if(ok)n++;
      });
      out.textContent=n;
      nai.classList.toggle('miseru',n===0);
    };
    f.addEventListener('change',kosu);
    kosu();
  }

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
