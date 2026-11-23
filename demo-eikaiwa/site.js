(function(){
  var kurasu={
    a:{na:'はじめて',sub:'先生 柚木。4人まで、60分',setsu:'中学で習った文を、声に出すところから始めます。日本語で質問してかまいません。',hi:[['月曜','10:30〜11:30'],['木曜','19:30〜20:30']],id:'hajimete',betsu:''},
    b:{na:'旅行と日常',sub:'先生 ヘイデン。5人まで、60分',setsu:'ホテル、駅、薬局、レストラン。その日の場面を決めて、一人ずつやり取りを練習します。',hi:[['火曜','10:30〜11:30'],['金曜','19:30〜20:30'],['土曜','10:00〜11:00']],id:'tabi',betsu:''},
    c:{na:'仕事で使う',sub:'先生 柚木とヘイデン。4人まで、60分',setsu:'会議の一言や電話を、2人の先生を相手に言ってみます。自分の仕事の場面で練習できます。',hi:[['火曜','20:00〜21:00'],['土曜','13:30〜14:30']],id:'shigoto',betsu:'本や記事を読んで話したいなら「読んで話す」(水曜 14:00〜15:15、土曜 15:30〜16:45)も合います。'}
  };
  var hako=document.querySelector('[data-kotae]');
  var btns=document.querySelectorAll('[data-lv]');
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function dasu(lv){
    var k=kurasu[lv];if(!k||!hako)return;
    var li='';
    for(var i=0;i<k.hi.length;i++){li+='<li><b>'+esc(k.hi[i][0])+'</b><span>'+esc(k.hi[i][1])+'</span></li>';}
    hako.innerHTML='<div><h3>合いそうなクラスは「'+esc(k.na)+'」<small>'+esc(k.sub)+'</small></h3><p>'+esc(k.setsu)+'</p>'+(k.betsu?'<p>'+esc(k.betsu)+'</p>':'')+'</div>'+
      '<ul aria-label="このクラスの曜日と時間">'+li+'</ul>'+
      '<p class="betsu"><a href="class.html#'+k.id+'">このクラスをくわしく</a><a href="taiken.html">体験のしかた</a>体験の後で、別のクラスに替えることもできます。</p>';
  }
  for(var i=0;i<btns.length;i++){
    btns[i].addEventListener('click',function(){
      for(var j=0;j<btns.length;j++){btns[j].setAttribute('aria-pressed',btns[j]===this?'true':'false');}
      dasu(this.getAttribute('data-lv'));
    });
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
