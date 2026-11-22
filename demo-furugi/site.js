(function(){
  var FUKU=[{"id": "f01", "na": "ネルシャツ", "iro_na": "青と灰の格子", "z": "shirt", "iro": "#6f8aa6", "kata": 46, "mi": 56, "take": 73, "sode": 60, "ne": 3800, "jo": "きれい", "uri": 0}, {"id": "f02", "na": "ネルシャツ", "iro_na": "赤茶の格子", "z": "shirt", "iro": "#9a5a46", "kata": 44, "mi": 53, "take": 70, "sode": 58, "ne": 3500, "jo": "少し色あせ", "uri": 0}, {"id": "f03", "na": "綿のシャツ", "iro_na": "白", "z": "shirt", "iro": "#eef0ee", "kata": 45, "mi": 54, "take": 76, "sode": 61, "ne": 2800, "jo": "直しあり", "uri": 0}, {"id": "f04", "na": "デニムの上着", "iro_na": "薄い藍", "z": "jacket", "iro": "#7790b2", "kata": 47, "mi": 57, "take": 64, "sode": 60, "ne": 6800, "jo": "少し色あせ", "uri": 0}, {"id": "f05", "na": "デニムの上着", "iro_na": "濃い藍", "z": "jacket", "iro": "#34507a", "kata": 50, "mi": 61, "take": 67, "sode": 62, "ne": 7500, "jo": "きれい", "uri": 0}, {"id": "f06", "na": "ワークコート", "iro_na": "灰色の綿", "z": "coat", "iro": "#8f9792", "kata": 49, "mi": 62, "take": 80, "sode": 61, "ne": 8200, "jo": "直しあり", "uri": 0}, {"id": "f07", "na": "綿の作業上着", "iro_na": "紺", "z": "jacket", "iro": "#3c4a63", "kata": 45, "mi": 55, "take": 68, "sode": 59, "ne": 5400, "jo": "少し色あせ", "uri": 0}, {"id": "f08", "na": "毛糸のベスト", "iro_na": "茶", "z": "vest", "iro": "#7a5a3e", "kata": 39, "mi": 50, "take": 62, "sode": 0, "ne": 2600, "jo": "きれい", "uri": 0}, {"id": "f09", "na": "毛糸のベスト", "iro_na": "灰", "z": "vest", "iro": "#9ea3a3", "kata": 41, "mi": 53, "take": 65, "sode": 0, "ne": 2400, "jo": "少し色あせ", "uri": 0}, {"id": "f10", "na": "毛糸のセーター", "iro_na": "藍", "z": "sweater", "iro": "#3f5878", "kata": 48, "mi": 58, "take": 66, "sode": 58, "ne": 4600, "jo": "直しあり", "uri": 0}, {"id": "f11", "na": "裏が起毛の丸首", "iro_na": "灰", "z": "sweater", "iro": "#a9adab", "kata": 46, "mi": 55, "take": 67, "sode": 60, "ne": 3200, "jo": "きれい", "uri": 1}, {"id": "f12", "na": "ワークコート", "iro_na": "紺", "z": "coat", "iro": "#2f3d55", "kata": 52, "mi": 63, "take": 82, "sode": 63, "ne": 8800, "jo": "少し色あせ", "uri": 1}];
  var HABA={"kata": 3, "mi": 4, "take": 5};
  var YOU='日月火水木金土';
  var ima=new Date();
  function hi(d){return (d.getMonth()+1)+'月'+d.getDate()+'日('+YOU[d.getDay()]+')';}
  function nenmatsu(d){var m=d.getMonth(),n=d.getDate();return (m===11&&n>=29)||(m===0&&n<=4);}
  function dashitaHi(d){
    var x=new Date(d.getFullYear(),d.getMonth(),d.getDate(),17,0,0,0);
    x.setDate(x.getDate()-((d.getDay()+2)%7));
    if(x.getTime()>d.getTime())x.setDate(x.getDate()-7);
    while(nenmatsu(x))x.setDate(x.getDate()-7);
    return x;
  }
  var mae=dashitaHi(ima), tsugi=new Date(mae.getFullYear(),mae.getMonth(),mae.getDate()+7,17,0,0,0);
  while(nenmatsu(tsugi))tsugi.setDate(tsugi.getDate()+7);
  var kinyou=ima.getDay()===5, mada=kinyou&&ima.getHours()<17;
  var kyou;
  if(nenmatsu(ima)){kyou='12月29日から1月4日までは年末年始の休みです。次の新しい服は'+hi(tsugi)+'の17時に出します。';}
  else if(mada){kyou='今日の17時に新しい服を出します。16時から17時は品出しで閉めています。いま一覧にあるのは'+hi(mae)+'に出した服です。';}
  else if(ima.getTime()-mae.getTime()>=7*864e5){kyou='いま出ている服は'+hi(mae)+'に出した物です。次は'+hi(tsugi)+'の17時です。';}
  else if(kinyou){kyou='今週の服は、今日'+hi(mae)+'の17時に出しました。次は'+hi(tsugi)+'の17時です。';}
  else{kyou='今週の服は'+hi(mae)+'の17時に出しました。次は'+hi(tsugi)+'の17時です。';}
  function each(sel,fn){var l=document.querySelectorAll(sel);for(var i=0;i<l.length;i++)fn(l[i]);}
  each('[data-dashita]',function(e){e.textContent=hi(mae);});
  each('[data-kyou]',function(e){e.textContent=kyou;});
  each('.jikan tr[data-d="'+ima.getDay()+'"]',function(e){e.classList.add('kyo');});

  var kekka=document.querySelector('[data-kekka]');
  if(kekka){
    var form=document.querySelector('.jibun'), kensu=document.querySelector('[data-kensu]'), nashi=document.querySelector('[data-nashi]');
    var SVGNS='http://www.w3.org/2000/svg';
    function en(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',')+'円';}
    function sa(n){return n>0?'+'+n+'cm':(n<0?'−'+(-n)+'cm':'±0');}
    function erabi(name){var c=form.querySelector('input[name="'+name+'"]:checked');return c?parseInt(c.value,10):0;}
    function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
    function dasu(){
      var j={kata:erabi('kata'),mi:erabi('mi'),take:erabi('take')};
      each('[data-v]',function(e){e.textContent=j[e.getAttribute('data-v')];});
      var l=[];
      for(var i=0;i<FUKU.length;i++){
        var f=FUKU[i];
        if(f.uri)continue;
        var d={kata:f.kata-j.kata,mi:f.mi-j.mi,take:f.take-j.take};
        if(Math.abs(d.kata)>HABA.kata||Math.abs(d.mi)>HABA.mi||Math.abs(d.take)>HABA.take)continue;
        l.push({f:f,d:d,s:Math.abs(d.kata)+Math.abs(d.mi)+Math.abs(d.take),n:i});
      }
      l.sort(function(a,b){return a.s-b.s||a.n-b.n;});
      while(kekka.firstChild)kekka.removeChild(kekka.firstChild);
      for(var k=0;k<l.length;k++){
        var f2=l[k].f, d2=l[k].d;
        var li=el('li','kk'); li.setAttribute('data-id',f2.id);
        var a=el('a','kk-a'); a.href='fuku.html#'+f2.id;
        var sv=document.createElementNS(SVGNS,'svg'); sv.setAttribute('class','kk-zu'); sv.setAttribute('aria-hidden','true'); sv.style.color=f2.iro;
        var us=document.createElementNS(SVGNS,'use'); us.setAttribute('href','#z-'+f2.z); sv.appendChild(us);
        a.appendChild(sv);
        var bun=el('span','kk-bun');
        var na=el('span','kk-na',f2.na); na.appendChild(el('small',null,f2.iro_na)); bun.appendChild(na);
        bun.appendChild(el('span','kk-ne',en(f2.ne)+' / '+f2.jo));
        var sl=el('span','kk-sa');
        [['肩幅','kata'],['身幅','mi'],['着丈','take']].forEach(function(p){
          var s=el('span','kk-s'); s.setAttribute('data-k',p[1]); s.setAttribute('data-sa',d2[p[1]]);
          s.appendChild(el('i',null,p[0])); s.appendChild(document.createTextNode(' '+sa(d2[p[1]]))); sl.appendChild(s);
        });
        sl.appendChild(el('span','kk-sode',f2.sode?'袖丈 '+f2.sode+'cm':'袖なし'));
        bun.appendChild(sl);
        a.appendChild(bun); li.appendChild(a); kekka.appendChild(li);
      }
      if(l.length){
        nashi.hidden=true;
        kensu.textContent=hi(mae)+'に出した服から '+l.length+'着。';
      }else{
        nashi.hidden=false;
        nashi.textContent='今週の服には、この寸法に近い物がありません。どれか1つを隣の数字に変えて試すか、一覧のページで全部の寸法を見てください。次の新しい服は'+hi(tsugi)+'の17時に出します。';
        kensu.textContent=hi(mae)+'に出した服から 0着。';
      }
    }
    form.addEventListener('change',dasu);
    dasu();
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
