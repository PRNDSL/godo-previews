(function(){
  var basho={
    mon:{na:'門まわり',te:['傾いた門柱を基礎から建て直す','門扉を取り替える、吊り直す','アプローチの段差をなくして手すりを付ける'],ki:'3〜7日',hi:'1万〜60万円'},
    chusha:{na:'駐車場',te:['土や砂利の所をコンクリートにする','ひび割れた土間を壊して打ち直す','2台目を停められるように広げる'],ki:'5〜10日',hi:'15万〜50万円|(1台分)'},
    hei:{na:'塀とフェンス',te:['古いブロック塀を低くしてフェンスを載せる','隣との境に目隠しのフェンスを立てる','傾いたフェンスの柱を据え直す'],ki:'3〜8日',hi:'2万〜55万円'},
    niwa:{na:'庭',te:['水たまりが残る所の水はけを直す','防草シートを敷いて砂利を入れる','立水栓や花壇を作り直す'],ki:'2〜6日',hi:'8万〜40万円'},
    deck:{na:'ウッドデッキ',te:['傷んだ板を張り替える','古いデッキを解体して作り直す','腐りにくい人工木で作り直す'],ki:'1〜5日',hi:'10万〜70万円'}
  };
  var btns=document.querySelectorAll('.basho-btn');
  var kotae=document.querySelector('.kotae');
  function erabu(b){
    var d=basho[b];
    if(!d||!kotae)return;
    for(var i=0;i<btns.length;i++){btns[i].setAttribute('aria-pressed',btns[i].getAttribute('data-b')===b?'true':'false');}
    var zs=document.querySelectorAll('.haichi .z');
    for(var j=0;j<zs.length;j++){zs[j].classList.toggle('on',zs[j].getAttribute('data-b')===b);}
    kotae.querySelector('[data-k="na"]').textContent=d.na;
    var ol=kotae.querySelector('[data-k="te"]');
    ol.innerHTML='';
    for(var k=0;k<d.te.length;k++){var li=document.createElement('li');li.textContent=d.te[k];ol.appendChild(li);}
    kotae.querySelector('[data-k="ki"]').textContent=d.ki;
    var hd=kotae.querySelector('[data-k="hi"]');hd.innerHTML='';var hs=d.hi.split('|');for(var h=0;h<hs.length;h++){var sp=document.createElement('span');sp.className='k';sp.textContent=hs[h];hd.appendChild(sp);}
    var a=kotae.querySelector('[data-k="a"]');
    a.href='kouji.html#'+b;
    a.textContent=d.na+'の工事を詳しく見る';
  }
  for(var i=0;i<btns.length;i++){
    btns[i].addEventListener('click',function(){erabu(this.getAttribute('data-b'));});
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
