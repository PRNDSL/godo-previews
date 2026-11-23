(function(){
  var heya=document.querySelector('[data-heya]');
  var kotoba=document.querySelector('[data-heri-kotoba]');
  var btns=document.querySelectorAll('[data-heri]');
  function erabu(b){
    for(var i=0;i<btns.length;i++)btns[i].setAttribute('aria-pressed',btns[i]===b?'true':'false');
    document.documentElement.style.setProperty('--heri-bg',b.getAttribute('data-bg'));
    if(kotoba){
      kotoba.textContent='';
      var na=document.createElement('b');
      na.textContent=b.getAttribute('data-na');
      kotoba.appendChild(na);
      kotoba.appendChild(document.createTextNode(b.getAttribute('data-hito')));
    }
  }
  if(heya){
    for(var i=0;i<btns.length;i++){
      btns[i].addEventListener('click',function(){erabu(this);});
    }
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
