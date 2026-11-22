(function(){
  var kushi=document.getElementById('kushi');
  if(kushi){
    var M={
      cut:['カット',60,4400],
      cc:['カットとカラー',150,11000],
      cp:['カットとパーマ',180,13200],
      co:['カラーだけ',90,6600],
      ma:['前髪だけ',15,1100]
    };
    var AKU=600, SHIME=1140, HABA=SHIME-AKU;
    var f=document.getElementById('erabu'), iri=document.getElementById('iri');
    var kukan=document.getElementById('kukan'), kotae=document.getElementById('kotae'), saigoBun=document.getElementById('kotae-saigo');
    var hm=function(m){return Math.floor(m/60)+':'+('0'+(m%60)).slice(-2);};
    var en=function(p){return String(p).replace(/\B(?=(\d{3})+(?!\d))/g,',')+'円';};
    var kaku=function(){
      var c=f.querySelector('input[name="m"]:checked');
      var m=M[c?c.value:'cut'], d=m[1], a=parseInt(iri.value,10);
      var saigo=Math.floor((SHIME-d)/30)*30, owari=a+d;
      kushi.style.setProperty('--a',((a-AKU)/HABA).toFixed(4));
      kushi.style.setProperty('--s',((saigo-AKU)/HABA).toFixed(4));
      while(kotae.firstChild)kotae.removeChild(kotae.firstChild);
      if(owari<=SHIME){
        kushi.style.setProperty('--b',(d/HABA).toFixed(4));
        kukan.classList.remove('kosu');
        kotae.classList.remove('dame');
        kotae.appendChild(document.createTextNode(hm(a)+'に入ると、'+hm(owari)+'ごろ出られます。'));
        var b=document.createElement('b');
        b.textContent=en(m[2]);
        kotae.appendChild(b);
      }else{
        kushi.style.setProperty('--b',((SHIME-a)/HABA).toFixed(4));
        kukan.classList.add('kosu');
        kotae.classList.add('dame');
        kotae.appendChild(document.createTextNode('この時刻からは受けられません。'+hm(saigo)+'までに入ってください。'));
      }
      saigoBun.textContent=m[0]+'の最終受付は'+hm(saigo)+'です。';
    };
    f.addEventListener('change',kaku);
    kaku();
  }

  var ue=document.createElement('button');
  ue.type='button';ue.className='ue';ue.hidden=true;ue.textContent='上へ';
  ue.setAttribute('aria-label','ページの上へ戻る');
  document.body.appendChild(ue);
  ue.addEventListener('click',function(){window.scrollTo(0,0);});
  var miru=function(){
    var vh=window.innerHeight, nagai=document.documentElement.scrollHeight>vh*3;
    ue.hidden=!(nagai&&window.pageYOffset>vh);
  };
  window.addEventListener('scroll',miru,{passive:true});
  window.addEventListener('resize',miru);
  miru();
})();
