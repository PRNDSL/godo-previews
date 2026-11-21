(function(){
  function all(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel));}
  function one(sel){return document.querySelector(sel);}

  var tips=all('.tip');
  if(tips.length){
    var eIro=one('[data-e-iro]'),eNa=one('[data-e-na]'),eNagasa=one('[data-e-nagasa]'),eMemo=one('[data-e-memo]');
    tips.forEach(function(t){
      t.addEventListener('click',function(){
        tips.forEach(function(x){x.setAttribute('aria-pressed',x===t?'true':'false');});
        if(eIro)eIro.style.setProperty('--c',t.getAttribute('data-c'));
        if(eNa)eNa.textContent=t.getAttribute('data-na');
        if(eNagasa)eNagasa.textContent=t.getAttribute('data-nagasa');
        if(eMemo)eMemo.textContent=t.getAttribute('data-memo');
      });
    });
  }

  var k=one('[data-keisan]');
  if(k){
    var kin=one('[data-k-kin]'),kara=one('[data-k-kara]'),ji=one('[data-k-ji]'),uchi=one('[data-k-uchi]');
    function yen(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');}
    function jikan(m){var h=Math.floor(m/60),r=m%60;return (h?h+'時間':'')+(r?r+'分':'');}
    function keisan(){
      var sum=0,fun=0,isKara=false,rows=[];
      ['design','nagasa','off'].forEach(function(n){
        var c=k.querySelector('input[name="'+n+'"]:checked');
        if(!c)return;
        var y=parseInt(c.getAttribute('data-yen'),10),f=parseInt(c.getAttribute('data-fun'),10);
        sum+=y;fun+=f;
        if(c.getAttribute('data-kara'))isKara=true;
        if(y>0)rows.push('<li><span>'+c.getAttribute('data-na')+'</span><span>'+(n==='design'?'':'+')+yen(y)+'円</span></li>');
      });
      kin.textContent=yen(sum);
      kara.textContent=isKara?'から':'';
      ji.textContent=jikan(fun);
      if(fun>150)rows.push('<li><span>2時間半を超えるので、2回に分けて来てもらっています</span><span></span></li>');
      uchi.innerHTML=rows.join('');
    }
    k.addEventListener('change',keisan);
    keisan();
  }

  var mihon=one('[data-mihon]');
  if(mihon){
    var kei='all',fu='all',items=all('li',mihon),kazu=one('[data-kazu]'),nai=one('[data-nai]');
    var kb=all('[data-kei-b]'),fb=all('[data-fun-b]');
    function shiboru(){
      var n=0;
      items.forEach(function(li){
        var ok=(kei==='all'||li.getAttribute('data-kei')===kei)&&(fu==='all'||(' '+li.getAttribute('data-fun')+' ').indexOf(' '+fu+' ')>-1);
        li.hidden=!ok;if(ok)n++;
      });
      kazu.textContent=n+'色を表示しています';
      nai.hidden=n>0;
    }
    kb.forEach(function(b){b.addEventListener('click',function(){kei=b.getAttribute('data-kei-b');kb.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});shiboru();});});
    fb.forEach(function(b){b.addEventListener('click',function(){fu=b.getAttribute('data-fun-b');fb.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});shiboru();});});
    shiboru();
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
