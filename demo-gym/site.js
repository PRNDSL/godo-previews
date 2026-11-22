(function(){
  function each(sel,fn){var l=document.querySelectorAll(sel);for(var i=0;i<l.length;i++)fn(l[i]);}

  var KIND=['hanasu','hogusu','ugoku','furikaeru'];
  var NA=['話を聞く','体をほぐす','動く','振り返る'];
  var MOKU={
    hisashi:{n:[3,4,3,2],t:[
      '最後に運動したのはいつ頃か、今どこが固いかを聞きます。',
      '床に寝て、股関節と背中から順に動かします。',
      'しゃがんで立つ動きを、椅子の高さから始めます。',
      '次の回までに家でやる事を1つだけ決めます。'
    ]},
    tairyoku:{n:[1,3,6,2],t:[
      '前の回から今日までの体の具合を聞きます。',
      '縄跳びとゴムのバンドで体を温めます。',
      '押す、引く、持ち上げる、運ぶを順に回します。',
      '今日扱った重さと回数を一緒に書き残します。'
    ]},
    kyougi:{n:[2,2,7,1],t:[
      '競技の中の動きを、その場でやって見せてもらいます。',
      '競技で使う向きに関節を動かします。',
      '競技に近い動きを、バーとケトルベルで練習します。',
      '次の試合までの練習の量を決めます。'
    ]},
    aruku:{n:[2,4,4,2],t:[
      '階段や坂道で、どこがつらいかを聞きます。',
      '足首と股関節を、座ったままと立って動かします。',
      '片足で立つ、またぐ、荷物を持って歩くを練習します。',
      '家の中でできる事を1つ、紙に書いて渡します。'
    ]}
  };

  var bar=document.querySelector('[data-bar]');
  var list=document.querySelector('[data-tsukai]');
  if(bar&&list){
    var itas=bar.querySelectorAll('.ita');
    var narabe=function(key){
      var m=MOKU[key];if(!m)return;
      var i=0,parts=[],html='';
      for(var k=0;k<4;k++){
        for(var j=0;j<m.n[k];j++){if(itas[i])itas[i].setAttribute('data-k',KIND[k]);i++;}
        parts.push(NA[k]+(m.n[k]*5)+'分');
        html+='<li data-k="'+KIND[k]+'"><span class="iro" aria-hidden="true"></span><b>'+NA[k]+'</b><span class="fun">'+(m.n[k]*5)+'分</span><span class="setsu">'+m.t[k]+'</span></li>';
      }
      bar.setAttribute('aria-label','60分の使い方。'+parts.join('、')+'。');
      list.innerHTML=html;
    };
    each('input[name="mokuteki"]',function(r){
      r.addEventListener('change',function(){if(r.checked)narabe(r.value);});
      if(r.checked)narabe(r.value);
    });
  }

  var kyo=document.querySelector('[data-kyou]');
  if(kyo){
    var now=new Date(),d=now.getDay(),h=now.getHours();
    var YASUMI={0:true,4:true};
    var YO=['日','月','火','水','木','金','土'];
    var nenmatsu=function(x){var mo=x.getMonth(),da=x.getDate();return (mo===11&&da>=29)||(mo===0&&da<=4);};
    var yasumi=function(x){return YASUMI[x.getDay()]||nenmatsu(x);};
    var tsugiBi=function(){
      for(var i=1;i<20;i++){var x=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i);if(!yasumi(x))return {x:x,i:i};}
      return null;
    };
    var hiduke=function(x){return (x.getMonth()+1)+'月'+x.getDate()+'日('+YO[x.getDay()]+'曜)';};
    var namae=function(n){
      if(!n)return '';
      if(n.i===1)return '明日('+YO[n.x.getDay()]+'曜)';
      if(n.i<7&&!nenmatsu(new Date(n.x.getFullYear(),n.x.getMonth(),n.x.getDate()-1)))return YO[n.x.getDay()]+'曜';
      return hiduke(n.x);
    };
    var t,n=tsugiBi();
    if(nenmatsu(now))t='年末年始の休みです。次は'+hiduke(n.x)+'の7時の枠から教えます。';
    else if(YASUMI[d])t='今日('+YO[d]+'曜)は休みです。次に教えるのは'+namae(n)+'の7時の枠からです。';
    else if(h<19)t='今日('+YO[d]+'曜)は教える日です。枠は7時から18時の回までの6つです。空きは電話でお尋ねください。';
    else t='今日の枠は終わりました。次に教えるのは'+namae(n)+'の7時の枠からです。';
    kyo.textContent=t;
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
