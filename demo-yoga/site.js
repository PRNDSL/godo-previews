(function(){
  var K=[
    [2,'10:00','11:00','yoga','yukkuri','ゆっくりヨガ','沢渡',5],
    [2,'19:30','20:20','pila','shikkari','しっかりピラティス','戸川',6],
    [3,'10:00','10:50','pila','hajimete','はじめてのピラティス','戸川',4],
    [3,'13:30','14:20','pila','yukkuri','ゆっくりピラティス','戸川',3],
    [3,'19:30','20:45','yoga','shikkari','しっかりヨガ','沢渡',7],
    [4,'10:00','11:00','yoga','hajimete','はじめてのヨガ','沢渡',5],
    [4,'19:30','20:30','yoga','yukkuri','ゆっくりヨガ','沢渡',6],
    [5,'10:00','10:50','pila','shikkari','しっかりピラティス','戸川',5],
    [5,'19:30','20:30','yoga','hajimete','はじめてのヨガ','沢渡',2],
    [6,'9:00','10:15','yoga','shikkari','しっかりヨガ','沢渡',8],
    [6,'11:00','11:50','pila','hajimete','はじめてのピラティス','戸川',6],
    [6,'14:00','15:00','yoga','yukkuri','ゆっくりヨガ','沢渡',4],
    [0,'9:30','10:20','pila','yukkuri','ゆっくりピラティス','戸川',3],
    [0,'11:00','12:00','yoga','hajimete','はじめてのヨガ','沢渡',5]
  ];
  var YO=['日曜','月曜','火曜','水曜','木曜','金曜','土曜'];
  var JUN=[3,6,1,8,2,5,7,4];
  function mn(s){var a=s.split(':');return parseInt(a[0],10)*60+parseInt(a[1],10);}
  function each(l,fn){for(var i=0;i<l.length;i++)fn(l[i],i);}

  var heya=document.getElementById('heya');
  var kondo=document.getElementById('kondo');
  if(heya&&kondo){
    var now=new Date(),d=now.getDay(),m=now.getHours()*60+now.getMinutes();
    var ima=null,kyo=0,tsugi=null,o;
    each(K,function(c){
      if(c[0]===d){kyo++;if(mn(c[1])<=m&&m<mn(c[2]))ima=c;}
    });
    for(o=0;o<8;o++){
      var dd=(d+o)%7,best=null;
      each(K,function(c){
        if(c[0]!==dd)return;
        if(o===0&&mn(c[1])<=m)return;
        if(!best||mn(c[1])<mn(best[1]))best=c;
      });
      if(best){tsugi=best;break;}
    }
    if(tsugi){
      var hi=o===0?'今日 '+YO[tsugi[0]]:o===1?'明日 '+YO[tsugi[0]]:o===7?'来週の'+YO[tsugi[0]]:YO[tsugi[0]];
      var n=8-tsugi[7];
      kondo.innerHTML='<span class="kondo-ko">次のクラス</span><span class="k">'+hi+' '+tsugi[1]+'</span> <span class="k">'+tsugi[5]+'</span> <span class="k kondo-nokori">'+(n>0?'あと'+n+'枚':'満席')+'</span>';
      each(JUN,function(no,i){
        var mat=heya.querySelector('[data-m="'+no+'"]');
        if(!mat)return;
        mat.setAttribute('class','mat'+(i<tsugi[7]?' ume '+tsugi[3]:''));
      });
      heya.setAttribute('aria-label','上から見た教室。マット8枚のうち'+tsugi[7]+'枚が、'+hi+' '+tsugi[1]+'の'+tsugi[5]+'の予約で埋まっています。');
      var nota=document.getElementById('kondo-ima');
      var t='';
      if(ima)t='いまは'+ima[1]+'からの'+ima[5]+'の最中です('+ima[2]+'まで)。';
      else if(kyo===0)t='今日('+YO[d]+')は休みです。';
      else if(o>0)t='今日のクラスは終わりました。';
      if(nota&&t){nota.textContent=t;nota.hidden=false;}
    }
  }

  var erabu=document.querySelector('[data-erabu]');
  if(erabu){
    var jo={level:'',kind:''};
    var koma=document.querySelectorAll('.koma');
    var kazu=erabu.querySelector('[data-kazu]');
    erabu.hidden=false;
    function kakeru(){
      var n=0;
      each(koma,function(el){
        var ok=(!jo.level||el.getAttribute('data-level')===jo.level)&&(!jo.kind||el.getAttribute('data-kind')===jo.kind);
        el.classList.toggle('usui',!ok);
        if(ok)n++;
      });
      kazu.textContent=(jo.level||jo.kind)?'当てはまるのは週に'+n+'クラスです。':'全部で週に'+koma.length+'クラスです。';
    }
    each(erabu.querySelectorAll('button'),function(b){
      b.addEventListener('click',function(){
        var g=b.getAttribute('data-g');
        jo[g]=b.getAttribute('data-v');
        each(erabu.querySelectorAll('button[data-g="'+g+'"]'),function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
        kakeru();
      });
    });
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
