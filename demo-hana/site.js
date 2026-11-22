(function(){
  function each(sel,fn){var l=document.querySelectorAll(sel);for(var i=0;i<l.length;i++)fn(l[i],i);}
  function rnd(seed){var s=seed%2147483647;if(s<=0)s+=2147483646;return function(){s=s*16807%2147483647;return (s-1)/2147483646;};}
  function f(n){return Math.round(n*10)/10;}
  var KUKI='#4f7a3d', EDA='#5a4632';

  function kuki(x1,y1,x2,y2,c,w){
    var cx=f((x1+x2)/2+(x2-x1)*0.25), cy=f((y1+y2)/2);
    return '<path d="M'+f(x1)+' '+f(y1)+' Q'+cx+' '+cy+' '+f(x2)+' '+f(y2)+'" stroke="'+(c||KUKI)+'" stroke-width="'+(w||2.2)+'" fill="none" stroke-linecap="round"/>';
  }
  function maru(x,y,r,c1,c2,cls){
    var s='<g'+(cls?' class="'+cls+'"':'')+'>';
    for(var k=0;k<8;k++){var a=k*Math.PI/4;s+='<circle cx="'+f(x+Math.cos(a)*r*0.55)+'" cy="'+f(y+Math.sin(a)*r*0.55)+'" r="'+f(r*0.5)+'" fill="'+c1+'"/>';}
    s+='<circle cx="'+f(x)+'" cy="'+f(y)+'" r="'+f(r*0.62)+'" fill="'+c1+'" stroke="'+c2+'" stroke-width="1.2"/>';
    s+='<circle cx="'+f(x)+'" cy="'+f(y)+'" r="'+f(r*0.3)+'" fill="'+c2+'"/></g>';
    return s;
  }
  function tsutsu(x,y,sc,c1,c2,rot){
    return '<g transform="translate('+f(x)+' '+f(y)+') rotate('+(rot||0)+') scale('+sc+')"><path d="M-8 0 C-10 -10 -7 -18 0 -19 C7 -18 10 -10 8 0 C4 5 -4 5 -8 0Z" fill="'+c1+'"/><path d="M0 -17 V-3" stroke="'+c2+'" stroke-width="1.6"/></g>';
  }
  function fusa(x,y,R,c1,c2,n,r){
    var s='';
    for(var k=0;k<n;k++){s+='<circle cx="'+f(x+(R()-0.5)*16)+'" cy="'+f(y+(R()-0.5)*14)+'" r="'+f(r*(0.7+R()*0.5))+'" fill="'+(k%3?c1:c2)+'"/>';}
    return s;
  }
  function ha(x,y,len,rot,c){
    return '<ellipse cx="'+f(x)+'" cy="'+f(y)+'" rx="'+f(len*0.3)+'" ry="'+f(len*0.5)+'" fill="'+c+'" transform="rotate('+f(rot)+' '+f(x)+' '+f(y)+')"/>';
  }

  function hanaE(h,R,box){
    var L=box.l,Rr=box.r,top=box.t,bot=box.b,base=box.base,s='';
    var w=Rr-L, k, x, y, n;
    if(h.kata==='maru'){
      n=h.n||5;
      var pos=[];
      for(k=0;k<n;k++){x=L+w*(k+0.5)/n+(R()-0.5)*8;y=top+R()*(bot-top)*0.45+(k%2)*12;pos.push([x,y]);
        s+=kuki(base.x+(R()-0.5)*20,base.y,x,y+6);s+=ha((x+base.x)/2+5,(y+base.y)/2,10,40,KUKI);}
      for(k=0;k<n;k++){s+=maru(pos[k][0],pos[k][1],(h.r||12),h.iro,h.iro2);}
    }else if(h.kata==='tsutsu'){
      n=5;
      for(k=0;k<n;k++){x=L+w*(k+0.5)/n+(R()-0.5)*6;y=top+12+R()*(bot-top)*0.5;
        s+=kuki(base.x+(R()-0.5)*20,base.y,x,y,KUKI,2.6);
        if(h.suzu){for(var j=0;j<3;j++){var t=0.12+j*0.17;var bx=x+(base.x-x)*t,by=y+(base.y-y)*t;s+=tsutsu(bx+4,by,0.55,h.iro,h.iro2,25);}}
        else{s+=tsutsu(x,y+2,0.95,h.iro,h.iro2,(k-2)*8);}
      }
    }else if(h.kata==='fusa'){
      n=4;
      for(k=0;k<n;k++){x=L+w*(k+0.5)/n;y=top+R()*(bot-top)*0.4+8;
        s+=kuki(base.x+(R()-0.5)*16,base.y,x,y+10,KUKI,1.6);
        for(var m=0;m<3;m++){var dx=x+(m-1)*11+(R()-0.5)*4,dy=y+(m%2)*12+R()*6;
          s+=kuki(x,y+16,dx,dy,KUKI,1.1);
          s+=h.kemuri?('<circle cx="'+f(dx)+'" cy="'+f(dy)+'" r="10" fill="'+h.iro+'" opacity=".55"/>'+fusa(dx,dy,R,h.iro2,h.iro,4,2)):fusa(dx,dy,R,h.iro,h.iro2,h.tsubu||8,h.r||2.6);}
      }
    }else if(h.kata==='eda'){
      n=3;
      for(k=0;k<n;k++){x=L+w*(k+0.5)/n+(R()-0.5)*14;y=top-4+R()*14;
        s+=kuki(base.x+(k-1)*8,base.y,x,y,EDA,2.4);
        for(var e=1;e<6;e++){var t2=e/6,ex=x+(base.x-x)*t2,ey=y+(base.y-y)*t2,sx=ex+(e%2?14:-14),sy=ey-10;
          s+=kuki(ex,ey,sx,sy,EDA,1.3);
          if(h.mi){s+=fusa(sx,sy,R,h.iro,'#7a1f1a',4,2.4);s+=ha(ex+(e%2?-6:6),ey-2,10,e%2?-40:40,'#2f5131');}
          else if(h.happa){s+=ha(sx,sy,8,e%2?50:-50,h.iro);s+=ha((ex+sx)/2,(ey+sy)/2-3,7,e%2?20:-20,h.iro);}
          else{for(var d=0;d<4;d++){s+='<circle cx="'+f(ex+(sx-ex)*d/4)+'" cy="'+f(ey+(sy-ey)*d/4-1)+'" r="1.8" fill="'+h.iro+'"/>';}}
        }
      }
    }else if(h.kata==='ha'){
      n=5;
      for(k=0;k<n;k++){x=L+w*(k+0.5)/n+(R()-0.5)*8;y=top+R()*(bot-top)*0.4;
        if(h.hoso){s+='<path d="M'+f(base.x+(k-2)*4)+' '+base.y+' Q'+f(x)+' '+f((y+base.y)/2)+' '+f(x+(k-2)*10)+' '+f(y)+'" stroke="'+h.iro+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
          s+='<path d="M'+f(x+(k-2)*10)+' '+f(y)+' q'+((k-2)*3)+' -8 '+(4+(k-2)*4)+' -14" stroke="'+h.iro2+'" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>';}
        else if(h.hari){s+=kuki(base.x+(k-2)*5,base.y,x,y+10,EDA,2.6);
          for(var p=0;p<3;p++){var px=x+(base.x-x)*p*0.25,py=y+10+(base.y-y)*p*0.25;
            for(var q=-3;q<=3;q++){s+='<path d="M'+f(px)+' '+f(py)+' l'+(q*3)+' '+(-9+Math.abs(q))+'" stroke="'+h.iro+'" stroke-width="1.4" stroke-linecap="round"/>';}}}
        else{s+=kuki(base.x+(k-2)*5,base.y,x,y,h.iro2||'#6a7f73',1.6);
          for(var g=0;g<6;g++){var t3=g/6,gx=x+(base.x-x)*t3,gy=y+(base.y-y)*t3;
            s+='<circle cx="'+f(gx-5)+'" cy="'+f(gy)+'" r="'+f(5.2-g*0.3)+'" fill="'+h.iro+'"/><circle cx="'+f(gx+5)+'" cy="'+f(gy+3)+'" r="'+f(5.2-g*0.3)+'" fill="'+h.iro+'"/>';}}
      }
    }
    return s;
  }

  var KISETSU={
    haru:{na:'春',hana:[
      {na:'ラナンキュラス',ne:350,kata:'maru',iro:'#e8855f',iro2:'#b9472c',hi:'月曜',mochi:'5〜7日',mizu:'水は花瓶の底から5cmくらいの浅さで、毎日替えます。茎がやわらかいので、替える時にぬめりを洗ってください。'},
      {na:'スイートピー',ne:250,kata:'fusa',iro:'#c9a3d9',iro2:'#f1e6f2',hi:'木曜',mochi:'4〜6日',mizu:'毎日替えます。霧吹きはかけません。つぼみは咲き切らないこともあります。'},
      {na:'チューリップ',ne:250,kata:'tsutsu',iro:'#e9c33e',iro2:'#c9822a',hi:'月曜',mochi:'4〜6日',mizu:'浅めの水を毎日替えます。切った後も伸びるので、曲がってきたら短く切り直してください。'},
      {na:'ミモザ',ne:400,kata:'fusa',iro:'#f0c419',iro2:'#d9a514',tsubu:11,r:2.4,hi:'木曜',mochi:'3〜5日',mizu:'乾きやすいので水はたっぷり。飾り終わったら逆さに吊るすと、そのまま乾いて残ります。'},
      {na:'雪柳',ne:350,kata:'eda',iro:'#f4f4ef',hi:'月曜',mochi:'7〜10日',mizu:'切り口に十字の割りを入れて、深めの水に。水は2日に1回。花が散るので下に紙を敷いてください。'},
      {na:'ユーカリ',ne:300,kata:'ha',iro:'#8fa99b',iro2:'#6a7f73',hi:'木曜',mochi:'10〜14日',mizu:'水は3日に1回替えれば十分です。濁ってきたら早めに替えてください。'}
    ]},
    natsu:{na:'夏',hana:[
      {na:'ひまわり',ne:300,kata:'maru',iro:'#f2b632',iro2:'#6b3f1d',n:4,r:14,hi:'月曜',mochi:'5〜7日',mizu:'よく水を吸うので、朝と夜に水の量を見てください。夏は毎日替えて、花瓶も洗います。'},
      {na:'トルコキキョウ',ne:400,kata:'maru',iro:'#8f6bb8',iro2:'#efe8f4',hi:'木曜',mochi:'7〜10日',mizu:'毎日替えます。咲き終わった花を根元から摘むと、残りのつぼみが開きます。'},
      {na:'カラー',ne:350,kata:'tsutsu',iro:'#f4f4ef',iro2:'#e1c23a',hi:'月曜',mochi:'7〜10日',mizu:'水は3cmくらいの浅さで。深い水だと茎の切り口から傷みます。'},
      {na:'スモークツリー',ne:500,kata:'fusa',kemuri:1,iro:'#c79aa0',iro2:'#a06a72',hi:'木曜',mochi:'5〜7日',mizu:'枝の根元を割って深い水に。ふわふわの所は水にぬらさないでください。'},
      {na:'ドウダンツツジ',ne:600,kata:'eda',happa:1,iro:'#5f8f3e',hi:'月曜',mochi:'2〜3週間',mizu:'根元に十字の割りを入れると水を吸います。水は2日に1回、夏は毎日。'},
      {na:'レモンリーフ',ne:250,kata:'eda',happa:1,iro:'#3f6a35',hi:'木曜',mochi:'2週間ほど',mizu:'丈夫な葉ものです。水は3日に1回替えてください。'}
    ]},
    aki:{na:'秋',hana:[
      {na:'ダリア',ne:450,kata:'maru',iro:'#9c2236',iro2:'#d4495e',n:4,r:14,hi:'月曜',mochi:'3〜5日',mizu:'もちは短めです。水を毎日替えて、そのたびに茎を少し切り戻してください。'},
      {na:'リンドウ',ne:300,kata:'tsutsu',suzu:1,iro:'#3f4fa0',iro2:'#2a336b',hi:'木曜',mochi:'7〜10日',mizu:'水は2日に1回。日が当たらないと開きにくいので明るい所に置いてください。'},
      {na:'吾亦紅',ne:250,kata:'fusa',iro:'#6e2a2e',iro2:'#8c3a3c',tsubu:5,r:3,hi:'月曜',mochi:'7〜10日',mizu:'水は2日に1回。茎が細いので、切る時はよく切れるはさみで。'},
      {na:'小菊',ne:200,kata:'maru',iro:'#e8d36a',iro2:'#b89a2a',n:6,r:8,hi:'木曜',mochi:'10日ほど',mizu:'水に浸かる葉は全部取ります。水が濁りやすいので毎日替えてください。'},
      {na:'紅葉ドウダン',ne:700,kata:'eda',happa:1,iro:'#c0492e',hi:'月曜',mochi:'2週間ほど',mizu:'根元を割って深い水に。葉が乾くと落ちるので、エアコンの風を避けてください。'},
      {na:'ススキ',ne:200,kata:'ha',hoso:1,iro:'#8a9a5b',iro2:'#d8c99a',hi:'木曜',mochi:'5〜7日',mizu:'穂が開いて飛ぶので、店ではつぼみの穂を選んでいます。水は2日に1回。'}
    ]},
    fuyu:{na:'冬',hana:[
      {na:'アネモネ',ne:300,kata:'maru',iro:'#b5304a',iro2:'#1f1c2a',hi:'木曜',mochi:'5〜7日',mizu:'水は浅めで毎日。暖房の風が当たると首から曲がります。'},
      {na:'水仙',ne:200,kata:'tsutsu',iro:'#f4f4ef',iro2:'#e9b62c',hi:'月曜',mochi:'5〜7日',mizu:'切り口からぬめりが出ます。ほかの花と合わせる前に、半日ほど別の水に入れてください。'},
      {na:'かすみ草',ne:400,kata:'fusa',iro:'#f4f4ef',iro2:'#dfe4d6',tsubu:12,r:2,hi:'木曜',mochi:'7〜10日',mizu:'水が汚れやすいので、冬でも毎日替えて切り戻してください。'},
      {na:'千両',ne:600,kata:'eda',mi:1,iro:'#c0392b',hi:'月曜',mochi:'2週間ほど',mizu:'実が落ちやすいので、持つ時は茎を。水は2日に1回。'},
      {na:'若松',ne:500,kata:'ha',hari:1,iro:'#2f5a35',hi:'月曜',mochi:'2〜3週間',mizu:'切り口から脂が出ます。水は3日に1回、替える時に切り口を洗ってください。'},
      {na:'葉牡丹',ne:400,kata:'maru',iro:'#cfd9c8',iro2:'#8a4f8c',n:3,r:15,hi:'木曜',mochi:'2週間ほど',mizu:'下の葉が傷んだら取ります。水は2日に1回。'}
    ]}
  };
  function kisetsuOf(mo){return mo>=3&&mo<=5?'haru':mo>=6&&mo<=8?'natsu':mo>=9&&mo<=11?'aki':'fuyu';}

  function baketsuSvg(h,i){
    var R=rnd(i*977+131);
    var s='<svg viewBox="0 0 140 250" aria-hidden="true" focusable="false"><defs><linearGradient id="bk'+i+'" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#5f6b6e"/><stop offset=".33" stop-color="#cdd5d6"/><stop offset=".6" stop-color="#9aa6a8"/><stop offset="1" stop-color="#566265"/></linearGradient></defs>';
    s+='<ellipse cx="70" cy="243" rx="56" ry="6" fill="#0d1211" opacity=".45"/>';
    s+='<path d="M24 160 Q70 145 116 160" stroke="#6c787b" stroke-width="3" fill="#1a2220"/>';
    s+='<ellipse cx="70" cy="160" rx="45" ry="7" fill="#1a2220"/>';
    s+='<g class="yure" style="animation-delay:-'+(i*1.7)+'s">'+hanaE(h,R,{l:12,r:128,t:10+R()*18,b:130,base:{x:70,y:166}})+'</g>';
    s+='<path d="M24 160 L35 236 Q70 245 105 236 L116 160 Q70 172 24 160Z" fill="url(#bk'+i+')"/>';
    s+='<path d="M27 182 Q70 193 113 182" stroke="#7b878a" stroke-width="2" fill="none"/><path d="M31 213 Q70 223 109 213" stroke="#7b878a" stroke-width="2" fill="none"/>';
    s+='<path d="M24 160 Q70 175 116 160" stroke="#e3e9ea" stroke-width="3" fill="none"/>';
    s+='<path d="M24 167 q-9 4 -6 13" stroke="#8d9799" stroke-width="2.6" fill="none"/><path d="M116 167 q9 4 6 13" stroke="#8d9799" stroke-width="2.6" fill="none"/>';
    return s+'</svg>';
  }

  var now=new Date(), MO=now.getMonth()+1;
  var kk=kisetsuOf(MO), ks=KISETSU[kk];
  each('[data-kisetsu-tsuki]',function(e){e.textContent=MO+'月 '+ks.na+'の並び';});

  var narabi=document.querySelector('[data-baketsu]'), setsu=document.getElementById('baketsu-setsu');
  if(narabi&&setsu){
    var html='';
    ks.hana.forEach(function(h,i){
      html+='<button type="button" class="baketsu" aria-expanded="false" aria-controls="baketsu-setsu" data-i="'+i+'">'+baketsuSvg(h,i)+
        '<span class="fuda"><b>'+h.na+'</b><small>1本 '+h.ne+'円</small></span></button>';
    });
    narabi.innerHTML=html;
    var botan=narabi.querySelectorAll('.baketsu');
    for(var b=0;b<botan.length;b++){botan[b].addEventListener('click',function(){
      var i=+this.getAttribute('data-i'), h=ks.hana[i], was=this.getAttribute('aria-expanded')==='true';
      for(var c=0;c<botan.length;c++)botan[c].setAttribute('aria-expanded','false');
      if(was){setsu.innerHTML=setsu.getAttribute('data-hajime');return;}
      this.setAttribute('aria-expanded','true');
      setsu.innerHTML='<p class="setsu-na">'+h.na+'<small>1本 '+h.ne+'円</small></p><dl>'+
        '<div><dt>いつ入るか</dt><dd>'+h.hi+'の仕入れで入ります。仕入れは月曜と木曜の朝です。</dd></div>'+
        '<div><dt>何日くらいもつか</dt><dd>目安で'+h.mochi+'。部屋の温度や水の替え方で変わります。</dd></div>'+
        '<div><dt>水の替え方</dt><dd>'+h.mizu+'</dd></div></dl>'+
        '<p class="setsu-sita"><a href="teire.html">花ごとの手入れを見る</a></p>';
      var r=setsu.getBoundingClientRect();
      if(r.bottom>window.innerHeight)setsu.scrollIntoView({block:'nearest'});
    });}
    setsu.setAttribute('data-hajime',setsu.innerHTML);
  }

  each('[data-kata]',function(e){
    var h={kata:e.getAttribute('data-kata'),iro:e.getAttribute('data-iro'),iro2:e.getAttribute('data-iro2')||'#4f7a3d',n:3,r:9};
    var v=e.getAttribute('data-hen');if(v)h[v]=1;
    var R=rnd(e.getAttribute('data-kata').length*131+(e.getAttribute('data-iro')||'').charCodeAt(2)*7);
    e.innerHTML='<svg viewBox="0 0 60 90" aria-hidden="true" focusable="false">'+hanaE(h,R,{l:6,r:54,t:8,b:56,base:{x:30,y:88}})+'</svg>';
  });

  var TABA={
    3000:{n:3,naka:'小花と葉もの',h:35,w:20,ko:1,eda:0,ha:4},
    5000:{n:5,naka:'小花2種類と葉もの',h:45,w:25,ko:2,eda:0,ha:6},
    8000:{n:7,naka:'小花2種類と枝もの1本と葉もの',h:55,w:30,ko:2,eda:1,ha:7},
    10000:{n:9,naka:'小花3種類と枝もの2本と葉もの',h:60,w:35,ko:3,eda:2,ha:8}
  };
  var YOTO={
    tanjo:{na:'誕生日',kata:'丸く組みます。持って帰りやすく、そのまま花瓶に入れられる形です。',kami:'#b98c58',hosa:1},
    iwai:{na:'お祝い',kata:'正面から見て横に広がる形に組みます。渡す場で見栄えがするように、紙を2枚重ねます。',kami:'#2d5a34',hosa:1.12},
    kuyo:{na:'お供え',kata:'仏花の形(ひし形)に組みます。2つで1対にする時は、1つずつこの値段です。',kami:'#e9ece7',hosa:0.72},
    jitaku:{na:'自宅用',kata:'紙1枚で簡単に包みます。花瓶に入れやすい長さに切ってお渡しします。',kami:'#cfae84',hosa:0.92}
  };
  var IRO={
    makase:{na:'おまかせ'},
    shiro:{na:'白と緑',p:['#f6f6f1','#e4ead6','#f6f6f1'],ko:'#f6f6f1'},
    aka:{na:'赤み',p:['#b8322f','#c4466a','#d9623f'],ko:'#e8a3a8'},
    ki:{na:'黄み',p:['#f2b632','#e08a2c','#f2d86a'],ko:'#f4e27a'}
  };
  var MAKASE={tanjo:['#e2704a','#f2b632','#f6f6f1'],iwai:['#c4466a','#e08a2c','#f2b632'],kuyo:['#f6f6f1','#f2d04a','#8f6bb8'],jitaku:['#e2704a','#8f6bb8','#f6f6f1']};

  function tabaSvg(y,t,c){
    var d=TABA[y], u=YOTO[t], PX=5, Y0=380, CX=175;
    var p=c==='makase'?MAKASE[t]:IRO[c].p, ko=c==='makase'?'#f6f6f1':IRO[c].ko;
    var H=d.h*PX, W=d.w*PX*u.hosa, yt=Y0-H, yb=Y0-H*0.3, ym=Y0-H*0.56;
    var R=rnd(+y+t.length*17), s='';
    s+='<line x1="34" y1="'+(Y0-350)+'" x2="34" y2="'+Y0+'" stroke="#475356" stroke-width="2"/>';
    for(var cm=0;cm<=70;cm+=5){var ty=Y0-cm*PX;s+='<line x1="'+(cm%10?28:22)+'" y1="'+ty+'" x2="34" y2="'+ty+'" stroke="#475356" stroke-width="'+(cm%10?1:1.6)+'"/>';
      if(cm%10===0)s+='<text x="18" y="'+(ty+4)+'" font-size="11" text-anchor="end" fill="#1c2526" font-family="Zen Kaku Gothic New,sans-serif">'+cm+'</text>';}
    s+='<text x="40" y="'+(Y0-352)+'" font-size="11" fill="#1c2526" font-family="Zen Kaku Gothic New,sans-serif">cm</text>';
    s+='<line x1="34" y1="'+yt+'" x2="'+(CX-W/2-6)+'" y2="'+yt+'" stroke="#7e5a33" stroke-width="1.4" stroke-dasharray="4 4"/>';
    s+='<text x="42" y="'+(yt-6)+'" font-size="13" font-weight="700" fill="#1c2526" font-family="Zen Kaku Gothic New,sans-serif">約'+d.h+'cm</text>';
    var heads=[], cy=(yt+ym)/2+8, rx=Math.max(20,W/2-14), ry=Math.max(18,(ym-yt)/2-6);
    var tot=d.n+d.ko*3, GA=2.39996;
    for(var k=0;k<tot;k++){var rr=Math.sqrt((k+0.5)/tot), a=k*GA;heads.push([CX+Math.cos(a)*rr*rx,cy+Math.sin(a)*rr*ry]);}
    var minY=Math.min.apply(null,heads.map(function(hp){return hp[1];})), sa=yt+13-minY;
    heads.forEach(function(hp){hp[1]+=sa;});
    var eda='';
    for(var e=0;e<d.eda;e++){var ex=CX+(e?1:-1)*W*0.22;eda+=kuki(CX,yb,ex,yt,EDA,2.2);
      for(var q=1;q<5;q++){var qx=CX+(ex-CX)*q/5,qy=yb+(yt-yb)*q/5;eda+=kuki(qx,qy,qx+(q%2?10:-10),qy-9,EDA,1.2)+'<circle cx="'+f(qx+(q%2?10:-10))+'" cy="'+f(qy-9)+'" r="2" fill="'+(c==='aka'?'#c0392b':'#f6f6f1')+'"/>';}}
    s+=eda;
    for(var l=0;l<d.ha;l++){var la=Math.PI*(1.1+l*0.8/(d.ha-1||1)), lx=CX+Math.cos(la)*rx*1.02, ly=cy+Math.sin(la)*ry*0.2+ry*0.55;
      s+=kuki(CX,yb,lx,ly,KUKI,1.6)+ha(lx,ly,16,(lx<CX?-50:50),l%2?KUKI:'#7d9a8a');}
    heads.forEach(function(hp){s+=kuki(CX+(R()-0.5)*6,yb,hp[0],hp[1]+6,KUKI,1.8);});
    s+='<path d="M'+(CX-6)+' '+yb+' L'+(CX-9)+' '+(Y0-2)+' M'+CX+' '+yb+' L'+CX+' '+Y0+' M'+(CX+6)+' '+yb+' L'+(CX+9)+' '+(Y0-2)+'" stroke="'+KUKI+'" stroke-width="2.2"/>';
    var mi=0, ki=0;
    heads.forEach(function(hp,k){
      if(k%((tot/d.n)|0||1)===0&&mi<d.n){s+=maru(hp[0],hp[1],13,p[mi%3],shade(p[mi%3]),'atama');mi++;}
      else{s+=fusa(hp[0],hp[1],R,ko,c==='shiro'?'#cfe0b4':'#f6f6f1',7,2.2);ki++;}
    });
    while(mi<d.n){var ex2=CX+(R()-0.5)*rx,ey2=cy+(R()-0.5)*ry;s+=maru(ex2,ey2,13,p[mi%3],shade(p[mi%3]),'atama');mi++;}
    var pw=W*0.5+10, pt=Y0-H*0.48;
    s+='<path d="M'+(CX-12)+' '+(Y0+4)+' L'+f(CX-pw)+' '+f(pt)+' L'+f(CX-pw*0.3)+' '+f(pt+18)+' L'+f(CX+pw*0.35)+' '+f(pt+10)+' L'+f(CX+pw)+' '+f(pt-4)+' L'+(CX+12)+' '+(Y0+4)+'Z" fill="'+u.kami+'" stroke="#00000040" stroke-width="1"/>';
    if(t==='iwai')s+='<path d="M'+(CX-10)+' '+(Y0+4)+' L'+f(CX-pw*0.82)+' '+f(pt+14)+' L'+f(CX+pw*0.8)+' '+f(pt+12)+' L'+(CX+10)+' '+(Y0+4)+'Z" fill="#f5f6f3" opacity=".9"/>';
    s+='<rect x="'+(CX-16)+'" y="'+f(yb+H*0.06)+'" width="32" height="7" fill="'+(t==='kuyo'?'#8f6bb8':'#7e5a33')+'"/>';
    return s;
  }
  function shade(hex){
    var n=parseInt(hex.slice(1),16),r=(n>>16)&255,g=(n>>8)&255,b=n&255;
    function d(v){return Math.max(0,Math.round(v*0.72));}
    return '#'+((1<<24)+(d(r)<<16)+(d(g)<<8)+d(b)).toString(16).slice(1);
  }

  var shikake=document.querySelector('[data-taba]');
  if(shikake){
    var svg=shikake.querySelector('[data-taba-e]'), kekka=shikake.querySelector('[data-kekka]'),
        yotoP=shikake.querySelector('[data-yoto-bun]'), iroP=shikake.querySelector('[data-iro-bun]'), chui=shikake.querySelector('[data-chui]');
    function val(n){var c=shikake.querySelector('input[name="'+n+'"]:checked');return c?c.value:null;}
    function kaku(){
      var y=val('yosan')||'5000', t=val('yoto')||'tanjo', c=val('iro')||'makase', d=TABA[y], u=YOTO[t];
      svg.innerHTML=tabaSvg(y,t,c);
      svg.setAttribute('aria-label',(+y).toLocaleString('ja-JP')+'円の'+u.na+'の束の絵。高さ約'+d.h+'cm、主役の花'+d.n+'本');
      kekka.textContent='この予算だと、主役の花'+d.n+'本と'+d.naka+'で、持つとこのくらいの大きさです(高さ約'+d.h+'cm)。';
      yotoP.textContent=u.na+'の束: '+u.kata;
      iroP.textContent=c==='makase'?(t==='kuyo'?'色はおまかせ: その週に入った花から、白を中心に黄色と紫を合わせて組みます。':'色はおまかせ: その週に入った花から、'+u.na+'に合う色で組みます。'):('色は'+IRO[c].na+'で組みます。主役の花はその週に入った物から選びます。');
      if(t==='kuyo'){
        chui.hidden=false;
        chui.textContent=c==='aka'?'お供えに赤い花を入れるのを気にされる方もいるので、店からはおすすめしていません。故人の好きだった色を入れたい時は、そのままお作りします。電話で一言お伝えください。':c==='makase'?'赤い花は入れずに組みます。故人の好きだった色を入れたい時は、電話で一言お伝えください。':'お供えは、白を中心に黄色や紫を合わせるのが店のおすすめです。選んだ色で組み、赤い花は入れません。';
      }else{chui.hidden=true;chui.textContent='';}
    }
    each('[data-taba] input',function(i){i.addEventListener('change',kaku);});
    kaku();
  }

  function kyoBun(n){
    var mo=n.getMonth()+1, da=n.getDate(), d=n.getDay(), m=n.getHours()*60+n.getMinutes();
    if(mo===1&&da<=4){var d5=new Date(n.getFullYear(),0,5).getDay();return 'お正月の休み中です。年明けは1月'+(d5===3?6:5)+'日の10時から開けます。';}
    if(mo===12&&da>=29){
      if(m<540)return '今日は年末の時間で、9時から19時まで開けます。';
      if(m<1140)return '開いています。今日は年末の時間で、19時までです。';
      return da===31?'今年の営業は終わりました。年明けは1月'+(new Date(n.getFullYear()+1,0,5).getDay()===3?6:5)+'日の10時から開けます。':'今日は閉めました。明日も年末の時間で、9時から開けます。';
    }
    if(d===3)return mo===12&&da===28?'今日は水曜で休みです。明日から年末の時間で、9時から開けます。':'今日は水曜で休みです。木曜の10時から開けます。';
    var yobi='日月火水木金土'.charAt(d)+'曜', close=d===0?1020:1140;
    if(m<close)return d===0?'今日(日曜)は10時から17時までです。':'今日('+yobi+')は10時から19時までです。祝日は17時までです。';
    if(mo===12&&da===28)return '今日は閉めました。明日から年末の時間で、9時から開けます。';
    return d===2?'今日は閉めました。明日は水曜で休みです。木曜の10時から開けます。':'今日は閉めました。明日は10時から開けます。';
  }
  each('[data-kyo]',function(e){e.textContent=kyoBun(now);});

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
