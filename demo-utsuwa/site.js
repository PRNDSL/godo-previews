(function(){
  var DOW='日月火水木金土';
  var now=new Date();
  var kyo=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  var fun=now.getHours()*60+now.getMinutes();
  function each(sel,fn){var l=document.querySelectorAll(sel);for(var i=0;i<l.length;i++)fn(l[i],i);}
  function hi(t){return (t.getMonth()+1)+'月'+t.getDate()+'日('+DOW[t.getDay()]+')';}
  function nanbanme(y,m,w,n){var f=new Date(y,m,1).getDay();return new Date(y,m,1+((w-f+7)%7)+7*(n-1));}
  function shiire(t){return t.getDay()===4&&t.getDate()<=7;}
  function nenmatsu(t){var m=t.getMonth(),d=t.getDate();return (m===11&&d>=29)||(m===0&&d<=4);}
  function akeru(t){var w=t.getDay();return (w===0||w>=4)&&!shiire(t)&&!nenmatsu(t);}
  function sa(a,b){return Math.round((b-a)/86400000);}
  function tsugi(t){var x=new Date(t.getFullYear(),t.getMonth(),t.getDate()+1);for(var i=0;i<40&&!akeru(x);i++)x.setDate(x.getDate()+1);return x;}
  function tsugiBun(){var x=tsugi(kyo);return '次は'+(sa(kyo,x)===1?'明日、':'')+hi(x)+'の11時からです。';}

  var bun;
  if(akeru(kyo)){
    if(fun<660)bun='今日は11時に開けて、18時までです。';
    else if(fun<1080)bun='いま開けています。今日は18時までです。';
    else bun='今日は18時で閉めました。'+tsugiBun();
  }else if(shiire(kyo))bun='今日は作り手の窯へ仕入れに出ていて、休みです。'+tsugiBun();
  else if(nenmatsu(kyo))bun='年末年始の休みです。'+tsugiBun();
  else bun='今日は休みの曜日です。'+tsugiBun();
  each('[data-kyo]',function(e){e.textContent=bun;});
  each('[data-yobi="'+kyo.getDay()+'"]',function(e){e.classList.add('yobi-kyo');});

  var y=kyo.getFullYear(),m=kyo.getMonth();
  var ev=[
    {s:nanbanme(y,m,5,1),e:nanbanme(y,m,0,3),na:'須賀 なつめの器展「藍の線」'},
    {s:nanbanme(y,m+1,6,2),e:null,na:'ほうきの日(穂積 さださんの実演)'},
    {s:nanbanme(y,m+2,5,2),e:nanbanme(y,m+2,0,4),na:'戸祭 一の器展「飴と黒」'}
  ];
  function kikan(o){return o.e?hi(o.s)+'から'+hi(o.e)+'まで':hi(o.s)+' 13時から16時';}
  function jotai(o){
    var owari=o.e||o.s;
    if(sa(owari,kyo)>0)return ['owari','終わりました'];
    if(sa(o.s,kyo)>=0)return ['naka',o.e?'会期中です':'今日です'];
    var n=sa(kyo,o.s);
    if(n===1)return ['mae',o.e?'明日からです':'明日です'];
    return ['mae','あと'+n+'日'];
  }
  each('[data-ev]',function(el){
    var o=ev[+el.getAttribute('data-ev')],j=jotai(o);
    el.classList.add('ev-'+j[0]);
    el.querySelector('[data-ev-jo]').textContent=j[1];
    var h=el.querySelector('[data-ev-hi]');
    h.textContent='';
    var parts=o.e?[hi(o.s)+'から',hi(o.e)+'まで']:[hi(o.s),'13時から16時'];
    for(var i=0;i<parts.length;i++){var s=document.createElement('span');s.className='k';s.textContent=parts[i];h.appendChild(s);if(i===0)h.appendChild(document.createTextNode(' '));}
  });
  each('[data-chikai]',function(el){
    for(var i=0;i<ev.length;i++){
      var j=jotai(ev[i]);
      if(j[0]!=='owari'){
        el.textContent='';
        el.appendChild(document.createTextNode(ev[i].na+'。'+kikan(ev[i])+'。'+j[1]+'。'));
        var a=document.createElement('a');a.href='kikaku.html';a.textContent='企画展の予定';
        el.appendChild(a);
        break;
      }
    }
  });

  each('[data-dan]',function(dan){
    var bs=dan.querySelectorAll('.utsuwa-b'),moji=dan.querySelector('.obi-moji');
    function oshita(b){
      for(var j=0;j<bs.length;j++)bs[j].setAttribute('aria-pressed','false');
      b.setAttribute('aria-pressed','true');
      moji.textContent='';
      var parts=[['b',b.getAttribute('data-na')],['span',b.getAttribute('data-ts')],['span',b.getAttribute('data-oo')],['span',b.getAttribute('data-ne')]];
      for(var k=0;k<parts.length;k++){var x=document.createElement(parts[k][0]);x.textContent=parts[k][1];moji.appendChild(x);}
    }
    for(var i=0;i<bs.length;i++)bs[i].addEventListener('click',function(){oshita(this);});
  });

  var form=document.querySelector('[data-shibori]');
  if(form){
    var items=document.querySelectorAll('[data-ichiran] > li'),kazu=document.querySelector('[data-kazu]'),nashi=document.querySelector('[data-nashi]');
    function val(name){var c=form.querySelector('input[name="'+name+'"]:checked');return c?c.value:'all';}
    function kakeru(){
      var ts=val('ts'),sh=val('sh'),ne=val('ne'),n=0;
      for(var i=0;i<items.length;i++){
        var it=items[i];
        var ok=(ts==='all'||it.getAttribute('data-ts')===ts)&&(sh==='all'||it.getAttribute('data-sh')===sh)&&(ne==='all'||it.getAttribute('data-ne')===ne);
        it.hidden=!ok;
        if(ok)n++;
      }
      kazu.textContent=(ts==='all'&&sh==='all'&&ne==='all')?items.length+'点あります。':items.length+'点のうち、'+n+'点を出しています。';
      nashi.hidden=n>0;
    }
    form.addEventListener('change',kakeru);
    form.addEventListener('submit',function(e){e.preventDefault();});
    document.querySelector('[data-modosu]').addEventListener('click',function(){
      each('[data-shibori] input[value="all"]',function(x){x.checked=true;});
      kakeru();
      kazu.setAttribute('tabindex','-1');kazu.focus();
    });
    var q=location.search.match(/[?&]ts=([a-z]+)/);
    if(q){var r=form.querySelector('input[name="ts"][value="'+q[1]+'"]');if(r)r.checked=true;}
    kakeru();
  }

  var ue=document.createElement('button');
  ue.type='button';ue.className='ue';ue.hidden=true;ue.textContent='上へ';
  ue.setAttribute('aria-label','ページの上へ戻る');
  document.body.appendChild(ue);
  ue.addEventListener('click',function(){window.scrollTo(0,0);});
  function miru(){
    var vh=window.innerHeight,nagai=document.documentElement.scrollHeight>vh*3;
    ue.hidden=!(nagai&&window.pageYOffset>vh);
  }
  window.addEventListener('scroll',miru,{passive:true});
  window.addEventListener('resize',miru);
  miru();
})();
