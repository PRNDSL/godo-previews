(function(){
  var yu={1:['よもぎ','草の香り'],2:['生姜','芯から温まる'],3:['定休日','釜の掃除'],4:['ラベンダー','寝る前に'],5:['ゆず','皮ごと浮かべる'],6:['ひのき','木の玉入り'],0:['みかんの皮','朝干したもの']};
  var now=new Date(), d=now.getDay(), m=now.getHours()*60+now.getMinutes();
  var txt, on=false;
  if(d===3){txt='本日定休';}
  else if(m<900){txt='15時から';}
  else if(m<1410){txt='営業中';on=true;}
  else{txt='本日は終了';}
  function each(sel,fn){var l=document.querySelectorAll(sel);for(var i=0;i<l.length;i++)fn(l[i]);}
  each('[data-state]',function(e){e.textContent=txt;});
  if(on)each('[data-lamp]',function(e){e.classList.add('on');});
  each('[data-kyo-yu]',function(e){e.textContent=yu[d][0];});
  each('[data-kyo-kou]',function(e){e.textContent=yu[d][1];});
  each('.hi[data-d="'+d+'"]',function(e){e.classList.add('kyo');});

  // 上へ戻る: ページが画面3つ分より長い時だけ、1画面ぶん下がったら出す
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
