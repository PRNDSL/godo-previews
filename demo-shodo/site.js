(function(){
  var TEHON={
    g12:[
      ['はつひ',[['k',0,'shita','むすびを小さく'],['k',1,'naka','丸みを大きく'],['m',2,'naka']]],
      ['ゆき',[['m',0,'naka'],['k',0,'shita','丸みを大きく'],['k',1,'ue','右上がりに']]],
      ['はな',[['k',0,'ue','たて画をまっすぐ'],['m',1,'ue'],['k',1,'shita','むすびを小さく']]],
      ['はる',[['m',0,'hidari'],['k',0,'naka','つなぎを軽く'],['k',1,'shita','下を丸く大きく']]],
      ['そら',[['k',0,'ue','上の折れを小さく'],['m',0,'shita'],['k',1,'shita','丸みを大きく']]],
      ['あめ',[['k',0,'shita','丸みを大きく'],['m',1,'naka'],['k',1,'ue','一画目を短く']]],
      ['うみ',[['m',0,'ue'],['k',0,'shita','丸みを大きく'],['k',1,'naka','むすびを小さく']]],
      ['なつ',[['k',0,'ue','右上がりに'],['m',0,'shita'],['k',1,'naka','丸みを大きく']]],
      ['つき',[['k',0,'naka','丸みを大きく'],['k',1,'ue','右上がりに'],['m',1,'shita']]],
      ['あき',[['m',0,'naka'],['k',0,'shita','丸みを大きく'],['k',1,'ue','右上がりに']]],
      ['もみじ',[['k',0,'shita','下を丸く曲げる'],['m',1,'naka'],['k',2,'ue','点を小さく']]],
      ['ふゆ',[['k',0,'naka','点の間をあける'],['m',1,'naka'],['k',1,'shita','最後を長く']]]
    ],
    g34:[
      ['お正月',[['m',0,'naka'],['k',1,'shita','最後の横画を長く'],['h',2,'migishita']]],
      ['雪だるま',[['k',0,'ue','かんむりを平たく'],['m',2,'naka'],['k',3,'shita','むすびを小さく']]],
      ['春風',[['m',0,'ue'],['k',0,'shita','はらいを長く'],['h',1,'migishita']]],
      ['友だち',[['k',0,'naka','左はらいを長く'],['m',1,'naka'],['k',2,'shita','丸みを大きく']]],
      ['若葉',[['k',0,'naka','左はらいを長く'],['m',1,'ue'],['k',1,'shita','横画を長く']]],
      ['雨の音',[['h',0,'migishita'],['k',1,'naka','丸みを大きく'],['m',2,'shita']]],
      ['夏の山',[['k',0,'shita','右はらいを長く'],['m',1,'naka'],['k',2,'ue','まん中を高く']]],
      ['花火',[['h',0,'migishita'],['m',1,'ue'],['k',1,'shita','右はらいを長く']]],
      ['月見',[['h',0,'migishita'],['k',1,'ue','目を細長く'],['m',1,'shita']]],
      ['秋の空',[['k',0,'shita','右はらいを長く'],['m',1,'naka'],['k',2,'shita','最後の横画を長く']]],
      ['落ち葉',[['k',0,'ue','点をそろえる'],['k',1,'shita','丸みを大きく'],['m',2,'shita']]],
      ['冬の星',[['k',0,'naka','右はらいを長く'],['m',1,'naka'],['k',2,'shita','最後の横画を長く']]]
    ],
    g56:[
      ['新春/の光',[['m',0,'naka'],['k',1,'shita','はらいを長く'],['h',3,'migishita']]],
      ['冬の/朝日',[['k',0,'naka','右はらいを長く'],['h',2,'migishita'],['m',3,'naka']]],
      ['旅立ち',[['k',0,'ue','一画目の位置'],['k',1,'shita','最後の横画を長く'],['m',2,'naka']]],
      ['希望/の朝',[['h',0,'migishita'],['k',1,'shita','最後の横画を長く'],['m',3,'naka']]],
      ['青葉/の山',[['h',0,'migishita'],['k',1,'shita','横画を長く'],['m',3,'naka']]],
      ['緑の/季節',[['k',0,'naka','左右の間をあける'],['h',2,'shita'],['m',3,'ue']]],
      ['夏の/夜空',[['k',0,'shita','右はらいを長く'],['m',2,'naka'],['k',3,'shita','最後の横画を長く']]],
      ['平和/の心',[['k',0,'naka','たて画をまっすぐ'],['m',1,'naka'],['h',3,'migishita']]],
      ['実り/の秋',[['k',0,'shita','はらいを長く'],['m',1,'naka'],['k',3,'naka','左右の間をあける']]],
      ['秋晴れ',[['k',0,'shita','右はらいを長く'],['h',1,'migishita'],['m',2,'naka']]],
      ['晩秋/の空',[['h',0,'migishita'],['m',1,'naka'],['k',3,'shita','最後の横画を長く']]],
      ['冬の/星座',[['k',0,'naka','右はらいを長く'],['m',2,'naka'],['k',3,'shita','最後の横画を長く']]]
    ],
    chu:[
      ['初春/の空',[['h',0,'migishita'],['k',1,'shita','はらいを長く'],['m',3,'naka']]],
      ['早春/の光',[['k',0,'shita','たて画をまっすぐ'],['m',1,'ue'],['h',3,'migishita']]],
      ['飛躍/の時',[['k',0,'ue','一画目の位置'],['k',1,'naka','左右の間をあける'],['h',3,'migishita']]],
      ['花の/便り',[['h',0,'migishita'],['m',1,'naka'],['k',2,'shita','右はらいを長く']]],
      ['薫風',[['m',0,'ue'],['k',0,'shita','点の間をそろえる'],['h',1,'migishita']]],
      ['梅雨/晴れ',[['k',0,'naka','左右の間をあける'],['h',1,'migishita'],['m',2,'naka']]],
      ['清流',[['h',0,'migishita'],['k',1,'ue','点をそろえる'],['m',1,'shita']]],
      ['入道雲',[['k',0,'naka','右はらいを長く'],['m',1,'shita'],['k',2,'ue','かんむりを平たく']]],
      ['名月',[['k',0,'ue','一画目の位置'],['m',0,'shita'],['h',1,'migishita']]],
      ['読書/の秋',[['k',0,'naka','左右の間をあける'],['m',1,'shita'],['k',3,'shita','右はらいを長く']]],
      ['紅葉/の山',[['k',0,'naka','糸へんを細く'],['m',1,'naka'],['k',3,'ue','まん中を高く']]],
      ['冬木立',[['k',0,'naka','右はらいを長く'],['m',1,'naka'],['k',2,'shita','最後の横画を長く']]]
    ],
    otona:[
      ['一陽/来復',[['k',0,'naka','右上がりに'],['h',1,'migishita'],['m',2,'naka']]],
      ['梅花/の香',[['m',0,'naka'],['h',1,'migishita'],['k',3,'ue','左右のはらいを広く']]],
      ['春和/景明',[['k',0,'shita','はらいを長く'],['m',1,'naka'],['h',3,'migishita']]],
      ['行雲/流水',[['h',0,'migishita'],['k',1,'ue','かんむりを平たく'],['m',2,'naka']]],
      ['山紫/水明',[['k',0,'ue','まん中を高く'],['m',1,'naka'],['h',2,'shita']]],
      ['雨過/天晴',[['h',0,'migishita'],['k',1,'shita','しんにょうを長く'],['m',2,'shita']]],
      ['清風/明月',[['k',0,'naka','点をたてにそろえる'],['h',1,'migishita'],['m',2,'naka']]],
      ['夏雲/奇峰',[['k',0,'shita','右はらいを長く'],['m',1,'ue'],['h',2,'migishita']]],
      ['月白/風清',[['h',0,'migishita'],['m',1,'naka'],['k',2,'naka','中を小さく']]],
      ['灯火/可親',[['h',0,'migishita'],['k',1,'shita','右はらいを長く'],['m',3,'naka']]],
      ['和顔/愛語',[['m',0,'naka'],['k',1,'naka','左右の間をあける'],['k',2,'shita','右はらいを長く']]],
      ['歳寒/三友',[['h',0,'migishita'],['m',1,'shita'],['k',2,'naka','下の横画を長く']]]
    ]
  };
  var NA={g12:'1・2年',g34:'3・4年',g56:'5・6年',chu:'中学生',otona:'大人'};
  var JUN=['g12','g34','g56','chu','otona'];
  var TSUKI=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
  var SHIRASE=[
    '1月は、新年はじめの稽古の週に書き初めを書きます。長い紙を使うので、汚れてもいい服で来てください。',
    '2月は硬筆の月です。毛筆と、鉛筆やペンの字を半分ずつ書きます。',
    '3月は今の学年の最後の課題です。4月からは新しい学年の課題になります。',
    '4月は見学が多い月なので、見学は1回に2人までにしています。電話の時に日を決めます。',
    '5月の連休は、稽古を休みます。連休の前と後の週はいつもどおりです。',
    '6月は紙が湿りやすいので、清書は乾いた日に回すことがあります。',
    '7月は、学校の夏休みの宿題の習字を稽古の時間に書いてかまいません。課題の紙を持ってきてください。',
    '8月はお盆の週を休みます。ほかの週はいつもどおりです。',
    '秋の町の作品展に出す人は、9月から下書きを始めます。出すかどうかは自由です。',
    '10月は作品展の清書を書く月です。出さない人は、いつもの課題を書きます。',
    '11月から、いつもの課題に戻ります。大人の時間では、年賀状の筆ペンの練習もできます。',
    '12月は年内最後の稽古の週まで、いつもどおりです。休みに入る日は11月の稽古で紙を配っています。'
  ];
  var now=new Date(), m=now.getMonth();

  function each(sel,fn){var l=document.querySelectorAll(sel);for(var i=0;i<l.length;i++)fn(l[i]);}
  each('[data-tsuki]',function(e){e.textContent=TSUKI[m]+'の課題';});
  each('[data-kongetsu]',function(e){e.textContent=SHIRASE[m];});

  var paper=document.querySelector('[data-hanshi]');
  if(paper){
    var ji=paper.querySelector('[data-ji]');
    var yomi=document.querySelector('[data-yomi]');
    var MARU='<svg class="aka maru p-%P%" viewBox="0 0 100 100" aria-hidden="true"><path pathLength="1" d="M54 7 C80 8 95 30 93 55 C91 80 69 95 45 93 C21 91 6 70 8 46 C10 23 29 7 60 11"/></svg>';
    var HANE='<svg class="aka hane p-%P%" viewBox="0 0 100 100" aria-hidden="true"><path pathLength="1" d="M62 6 C64 34 64 58 60 80 C56 92 40 90 26 74 M26 74 L30 92 M26 74 L44 72"/></svg>';
    var render=function(g,ugoki){
      if(!TEHON[g])g='g34';
      var item=TEHON[g][m], cols=item[0].split('/'), n=0, i, j, html='', chars=[];
      for(i=0;i<cols.length;i++){if(cols[i].length>n)n=cols[i].length;}
      for(i=0;i<cols.length;i++){
        html+='<div class="gyo">';
        for(j=0;j<cols[i].length;j++){html+='<span class="moji">'+cols[i].charAt(j)+'</span>';chars.push(i);}
        html+='</div>';
      }
      paper.style.setProperty('--n',n);
      paper.style.setProperty('--c',cols.length);
      ji.innerHTML=html;
      var spans=ji.querySelectorAll('.moji'), yomu=[];
      for(i=0;i<item[1].length;i++){
        var d=item[1][i], sp=spans[d[1]];
        if(!sp)continue;
        if(d[0]==='m'){sp.insertAdjacentHTML('beforeend',MARU.replace('%P%',d[2]));yomu.push(sp.firstChild.nodeValue+'に丸');}
        else if(d[0]==='h'){sp.insertAdjacentHTML('beforeend',HANE.replace('%P%',d[2]));yomu.push(sp.firstChild.nodeValue+'のはねの向き');}
        else{
          var side=chars[d[1]]===0?'migi':'hidari';
          sp.insertAdjacentHTML('beforeend','<span class="aka kaki '+side+' p-'+d[2]+'" aria-hidden="true">'+d[3]+'</span>');
          yomu.push(sp.firstChild.nodeValue+'に「'+d[3]+'」');
        }
      }
      var aka=ji.querySelectorAll('.aka');
      for(i=0;i<aka.length;i++){
        var dl=(i*0.08).toFixed(2)+'s';
        aka[i].style.transitionDelay=dl;
        var p=aka[i].querySelector('path'); if(p)p.style.transitionDelay=dl;
      }
      if(ugoki){paper.classList.add('kakinaoshi');void paper.offsetWidth;paper.classList.remove('kakinaoshi');}
      if(yomi)yomi.textContent=NA[g]+'の'+TSUKI[m]+'の課題は「'+cols.join('')+'」です。先生の直しは、'+yomu.join('、')+'。';
    };
    var radios=document.querySelectorAll('input[name="gakunen"]'), first='g34';
    for(var r=0;r<radios.length;r++){
      if(radios[r].checked)first=radios[r].value;
      radios[r].addEventListener('change',function(){if(this.checked)render(this.value,true);});
    }
    render(first,false);
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
