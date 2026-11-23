(function(){
  var dan=document.querySelectorAll('.dan-mae');
  for(var i=0;i<dan.length;i++){
    (function(b){
      var naka=document.getElementById(b.getAttribute('aria-controls'));
      if(!naka)return;
      naka.hidden=true;
      b.setAttribute('aria-expanded','false');
      b.addEventListener('click',function(){
        var aku=b.getAttribute('aria-expanded')!=='true';
        b.setAttribute('aria-expanded',aku?'true':'false');
        naka.hidden=!aku;
      });
    })(dan[i]);
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
