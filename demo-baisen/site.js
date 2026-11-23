(function(){
  function each(sel,fn){var l=document.querySelectorAll(sel);for(var i=0;i<l.length;i++)fn(l[i]);}
  var now=new Date(), d=now.getDay(), m=now.getHours()*60+now.getMinutes();
  var akeru={0:true,4:true,5:true,6:true};
  var yaku={1:'浅煎りと中浅煎りを焼く日',2:'中煎りと中深煎りを焼く日'};
  var you='日月火水木金土';
  function hi(n){return new Date(now.getFullYear(),now.getMonth(),now.getDate()+n);}
  function nenmatsu(x){var mo=x.getMonth(),da=x.getDate();return (mo===11&&da>=30)||(mo===0&&da<=4);}
  var tsugi=1,futsu=1;
  while(!akeru[hi(tsugi).getDay()]||nenmatsu(hi(tsugi)))tsugi++;
  while(!akeru[hi(futsu).getDay()])futsu++;
  var nx=hi(tsugi), nxs=(nx.getMonth()+1)+'月'+nx.getDate()+'日('+you[nx.getDay()]+')';
  var tobu=tsugi!==futsu;
  var txt;
  if(nenmatsu(now)){txt='年末年始は休みです。'+nxs+'の11時から開けます。';}
  else if(akeru[d]){
    if(m<660){txt='今日は11時から店を開けます。';}
    else if(m<1080){txt='今日は18時まで店を開けています。';}
    else if(tobu){txt='今日の店は閉めました。12月30日から1月4日までは年末年始の休みで、次は'+nxs+'の11時からです。';}
    else if(d===0){txt='今日の店は閉めました。次は木曜の11時からです。';}
    else{txt='今日の店は閉めました。明日も11時から開けます。';}
  }else if(tobu){txt='今日は店を閉めています。12月30日から1月4日までは年末年始の休みで、次は'+nxs+'の11時からです。';}
  else if(d===3){txt='今日は休みです。明日の木曜、11時から開けます。';}
  else{txt='今日は'+yaku[d]+'で、店は閉めています。次は木曜の11時からです。';}
  each('[data-kyo]',function(e){e.textContent=txt;});
  var getsu=(d+6)%7;
  each('[data-d]',function(e){
    var k=+e.getAttribute('data-d');
    if(!akeru[k]||!nenmatsu(hi((k+6)%7-getsu)))return;
    e.classList.remove('akeru');
    if(e.tagName==='LI'&&e.parentNode.classList.contains('shu')){e.lastChild.textContent='休み';}
    var sp=e.querySelector('.mise-jo span');
    if(sp){sp.classList.remove('ak');sp.textContent='年末年始の休み';}
    var dd=e.querySelector('dd[data-fuda]');
    if(dd){e.classList.add('yasumi');dd.textContent='年末年始の休み';}
  });
  each('[data-d="'+d+'"]',function(e){
    e.classList.add('kyo');
    var f=document.createElement('span');f.className='kyo-fuda';f.textContent='今日';
    var t=e.querySelector('[data-fuda]')||e;t.appendChild(f);
  });

  var t=document.getElementById('tsumami');
  if(t){
    var na=['','浅煎り','中浅煎り','中煎り','中深煎り','深煎り'];
    var out=document.getElementById('kekka');
    function kawaru(){
      var v=String(t.value), n=0;
      t.setAttribute('aria-valuetext',na[v]);
      each('.erabu li',function(li){var on=li.getAttribute('data-r')===v;li.hidden=!on;if(on)n++;});
      each('.mamegi g[data-b]',function(g){g.classList.toggle('ukabu',g.getAttribute('data-b')===v);});
      each('.dan-na button',function(b){b.classList.toggle('ima',b.getAttribute('data-set')===v);});
      out.textContent=na[v]+'の豆は、いま'+n+'種あります。';
    }
    t.addEventListener('input',kawaru);
    each('.dan-na button',function(b){b.addEventListener('click',function(){t.value=b.getAttribute('data-set');kawaru();t.focus();});});
    kawaru();
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
