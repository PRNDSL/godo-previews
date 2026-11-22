(function(){
  var p=document.getElementById('pinto'), h=document.getElementById('hyou');
  if(p&&h){
    h.style.setProperty('--b',p.value);
    p.addEventListener('input',function(){h.style.setProperty('--b',p.value);});
  }

  var d=new Date().getDay();
  var l=document.querySelectorAll('[data-youbi] [data-d="'+d+'"]');
  for(var i=0;i<l.length;i++){if(!l[i].classList.contains('yasumi'))l[i].classList.add('kyo');}

  var ue=document.createElement('button');
  ue.type='button';ue.className='ue';ue.hidden=true;
  ue.setAttribute('aria-label','ページの上へ戻る');
  ue.innerHTML='<svg class="c" aria-hidden="true"><use href="#c"/></svg>上へ';
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
