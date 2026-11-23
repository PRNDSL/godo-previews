(function(){
  var D={
    daidokoro:{mei:'台所',yaru:['シンクと排水口のぬめり取り','蛇口の根元の水あか','コンロと五徳の油汚れ','作業台と壁の油はね'],jikan:'約2時間',ryou:'14,000円',chu:'換気扇は別の料金です。台所と換気扇を続けて頼まれると、2人で分けて約3時間です。'},
    kankisen:{mei:'換気扇',yaru:['レンジフードの外側と内側','ファンとフィルターを外してつけ置き','外した部品を拭いて元に戻す'],jikan:'約2時間半',ryou:'16,000円',chu:'部品を外せない作りの物は拭くだけになります。料金は電話でお伝えします。'},
    yokushitsu:{mei:'浴室',yaru:['壁と床と浴槽','鏡と蛇口の水あか','排水口と、浴槽の前の板の裏(外せる物だけ)','天井は拭き掃除'],jikan:'約2時間半',ryou:'15,000円',chu:'浴室、洗面所、トイレをまとめると26,000円、2人で分けて約3時間です。'},
    senmen:{mei:'洗面所',yaru:['洗面ボウルと鏡','蛇口と排水口','収納の扉の外側と床'],jikan:'約1時間',ryou:'7,000円',chu:'浴室、洗面所、トイレをまとめると26,000円、2人で分けて約3時間です。'},
    toire:{mei:'トイレ',yaru:['便器の内と外、便座の裏','床と壁の下の方','手洗いとタンクの上'],jikan:'約1時間',ryou:'7,000円',chu:'浴室、洗面所、トイレをまとめると26,000円、2人で分けて約3時間です。'},
    mado:{mei:'窓と網戸',yaru:['ガラスの内側と外側','サッシのレールの砂と泥','網戸を外して洗う'],jikan:'1か所 約30分',ryou:'1か所 3,000円',chu:'掃き出し窓1か所の目安です。2階の外側は手が届く所までです。'},
    eakon:{mei:'エアコン',yaru:['前の板とフィルター','中の熱交換器とファンを洗う','下にカバーを付けて水を受ける'],jikan:'1台 約1時間半',ryou:'1台 12,000円',chu:'壁掛けの家庭用です。2台なら2人で1台ずつ分けて約2時間です。自動お掃除機能つきは1台22,000円、1人で約2時間半です。'}
  };
  var box=document.querySelector('[data-madori]');
  if(box){
    var btns=box.querySelectorAll('.erabu button');
    var heya=box.querySelectorAll('[data-basho]');
    var out=box.querySelector('[data-kekka]');
    var v=function(n){return out.querySelector('[data-v="'+n+'"]');};
    var erabu=function(k){
      var d=D[k];if(!d)return;
      for(var i=0;i<btns.length;i++)btns[i].setAttribute('aria-pressed',btns[i].getAttribute('data-k')===k?'true':'false');
      for(var j=0;j<heya.length;j++)heya[j].classList.toggle('on',heya[j].getAttribute('data-basho')===k);
      v('mei').textContent=d.mei;
      var ul=v('yaru');ul.textContent='';
      for(var n=0;n<d.yaru.length;n++){var li=document.createElement('li');li.textContent=d.yaru[n];ul.appendChild(li);}
      v('jikan').textContent=d.jikan;
      v('ryou').textContent=d.ryou;
      v('chu').textContent=d.chu;
      var a=v('link');a.href='basho.html#'+k;a.textContent=d.mei+'の作業をくわしく見る';
    };
    for(var i=0;i<btns.length;i++)btns[i].addEventListener('click',function(){erabu(this.getAttribute('data-k'));});
    for(var j=0;j<heya.length;j++)heya[j].addEventListener('click',function(){erabu(this.getAttribute('data-basho'));});
    erabu('daidokoro');
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
