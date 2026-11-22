(function(){
  var SIZES={
    '3':{nin:'2〜3人',go:4,cm:12,kiru:3,ne:'3,000'},
    '5':{nin:'4〜5人',go:5,cm:15,kiru:5,ne:'3,800'},
    '8':{nin:'6〜8人',go:6,cm:18,kiru:8,ne:'4,800'},
    '12':{nin:'9〜12人',go:7,cm:21,kiru:10,ne:'5,900'}
  };
  var NS='http://www.w3.org/2000/svg';
  function el(name,at,parent){
    var e=document.createElementNS(NS,name);
    for(var k in at){e.setAttribute(k,at[k]);}
    if(parent)parent.appendChild(e);
    return e;
  }
  function pt(cx,cy,r,deg){var a=deg*Math.PI/180;return [cx+r*Math.cos(a),cy+r*Math.sin(a)];}
  function f(n){return Math.round(n*100)/100;}

  function kaku(svg,s){
    while(svg.firstChild)svg.removeChild(svg.firstChild);
    var U=10, cx=130, cy=122, r=s.cm/2*U;
    el('circle',{cx:cx+2,cy:cy+4,r:r+2,fill:'rgba(70,40,15,.22)'},svg);
    el('circle',{cx:cx,cy:cy,r:r,fill:'#fffefb',stroke:'#cdbda6','stroke-width':1.2},svg);
    el('circle',{cx:cx,cy:cy,r:r*0.72,fill:'none',stroke:'#efe6da','stroke-width':1},svg);
    var n=s.kiru, step=360/n, a0=-90;
    var p1=pt(cx,cy,r,a0), p2=pt(cx,cy,r,a0+step);
    el('path',{d:'M'+cx+' '+cy+' L'+f(p1[0])+' '+f(p1[1])+' A'+r+' '+r+' 0 0 1 '+f(p2[0])+' '+f(p2[1])+' Z',fill:'#c88a3f','fill-opacity':.32,stroke:'#b5283b','stroke-width':1.6},svg);
    var ring=r-6.5, m=Math.max(14,Math.round(2*Math.PI*ring/11));
    for(var i=0;i<m;i++){
      var q=pt(cx,cy,ring,i*360/m);
      el('circle',{cx:f(q[0]),cy:f(q[1]),r:4.4,fill:'#ffffff',stroke:'#d6c7b2','stroke-width':.9},svg);
    }
    for(var j=0;j<n;j++){
      var mid=a0+step*j+step/2, b=pt(cx,cy,r-19,mid);
      var g=el('g',{transform:'translate('+f(b[0])+' '+f(b[1])+') rotate('+f(mid+90)+')'},svg);
      el('path',{d:'M0 -6 C5 -6 6 -1 4 3 C2.5 6 1 7.5 0 8 C-1 7.5 -2.5 6 -4 3 C-6 -1 -5 -6 0 -6 Z',fill:'#b5283b'},g);
      el('path',{d:'M-3.5 -6 L0 -8.5 L3.5 -6 L0 -5 Z',fill:'#5b7a39'},g);
    }
    for(var k=0;k<n;k++){
      var e=pt(cx,cy,r,a0+step*k);
      el('line',{x1:cx,y1:cy,x2:f(e[0]),y2:f(e[1]),stroke:'#6e3f1e','stroke-width':1.1,'stroke-dasharray':'3 2'},svg);
    }
    el('circle',{cx:cx,cy:cy,r:2,fill:'#6e3f1e'},svg);
    var L=cx-r, R=cx+r, dy=252;
    el('line',{x1:L,y1:cy,x2:L,y2:dy+18,stroke:'#6e3f1e','stroke-width':.8,'stroke-dasharray':'2 2'},svg);
    el('line',{x1:R,y1:cy,x2:R,y2:dy+18,stroke:'#6e3f1e','stroke-width':.8,'stroke-dasharray':'2 2'},svg);
    el('line',{x1:L+1,y1:dy,x2:R-1,y2:dy,stroke:'#2f2019','stroke-width':1.4},svg);
    el('path',{d:'M'+L+' '+dy+' l6 -3.5 v7 Z',fill:'#2f2019'},svg);
    el('path',{d:'M'+R+' '+dy+' l-6 -3.5 v7 Z',fill:'#2f2019'},svg);
    el('rect',{x:cx-24,y:dy-10,width:48,height:20,rx:3,fill:'#d8bc93'},svg);
    var t=el('text',{x:cx,y:dy+5,'text-anchor':'middle','font-size':14,'font-weight':700,fill:'#2f2019','font-family':'Murecho, sans-serif'},svg);
    t.textContent=s.cm+'cm';
    var y0=270, x0=L, C=Math.min(24,Math.floor((254-L)/U));
    el('rect',{x:x0-6,y:y0,width:C*U+12,height:28,rx:2,fill:'#fbf8f2',stroke:'#8c6a3f','stroke-width':1},svg);
    for(var c=0;c<=C;c++){
      var x=x0+c*U, h=(c%5===0)?10:5;
      el('line',{x1:x,y1:y0,x2:x,y2:y0+h,stroke:'#2f2019','stroke-width':c%5===0?1.1:.7},svg);
      if(c%5===0){
        var tt=el('text',{x:x,y:y0+23,'text-anchor':'middle','font-size':9,fill:'#2f2019','font-family':'Murecho, sans-serif'},svg);
        tt.textContent=String(c);
      }
    }
    svg.setAttribute('aria-label','真上から見た'+s.go+'号のホールケーキ。直径'+s.cm+'cm、'+s.kiru+'つに切る線と、1切れぶんの色付け。下にcmの物差し。');
  }

  function bun(s){
    var kiri=s.kiru<10?s.kiru+'つに切ると':s.kiru+'に切ると';
    return '<span class="k"><b>'+s.go+'号</b>(直径'+s.cm+'cm)。</span><span class="k">'+kiri+'</span><span class="k">1切れはこのくらい。</span><br><span class="k">'+s.ne+'円から。</span><span class="k">受け取りの3日前までに。</span>';
  }

  var svg=document.getElementById('keki');
  var kotae=document.getElementById('kotae');
  if(svg&&kotae){
    var tm=null;
    var mise=function(key,ugoku){
      var s=SIZES[key]; if(!s)return;
      if(ugoku){
        svg.classList.add('kawaru');
        clearTimeout(tm);
        tm=setTimeout(function(){kaku(svg,s);svg.classList.remove('kawaru');},120);
      }else{kaku(svg,s);}
      kotae.innerHTML=bun(s);
    };
    var radios=document.querySelectorAll('input[name="ninzu"]');
    var first='5';
    for(var i=0;i<radios.length;i++){
      if(radios[i].checked)first=radios[i].value;
      radios[i].addEventListener('change',function(){mise(this.value,true);});
    }
    mise(first,false);
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
