(function(){
  function each(sel,fn){var l=document.querySelectorAll(sel);for(var i=0;i<l.length;i++)fn(l[i]);}

  var hyou=document.getElementById('hyou');
  if(hyou){
    var RYO={
      s:[[4000,4500,4800],[5000,5800,6200],[6500,7500,8000],[8500,9800,10500],[10500,12000,13000]],
      c:[[5500,6800,7500],[6800,8500,9300],[8800,10800,11800],[11000,13800,15000],[13500,16500,18000]]
    };
    var JI={
      s:[[90,120],[120,150],[150,180],[180,210],[210,240]],
      c:[[120,150],[150,180],[180,240],[240,300],[270,330]]
    };
    var oRyo=document.getElementById('o-ryo'),oJi=document.getElementById('o-ji'),oMu=document.getElementById('o-mukae');
    var hanko=hyou.querySelector('.hanko');
    function en(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',')+'円';}
    function jikan(m){return Math.floor(m/60)+'時間'+(m%60?'半':'');}
    function mukae(m){var t=600+m;return '10時に預けたら'+Math.floor(t/60)+'時'+(t%60?'半':'')+'ごろ';}
    function kaku(osu){
      var a=hyou.querySelector('input[name="ookisa"]:checked'),
          k=hyou.querySelector('input[name="ke"]:checked'),
          c=hyou.querySelector('input[name="course"]:checked');
      if(!a||!k||!c)return;
      var i=+a.value,j=+k.value,m=JI[c.value][i][j?1:0];
      oRyo.textContent=en(RYO[c.value][i][j]);
      oJi.textContent=jikan(m);
      oMu.textContent=mukae(m);
      if(osu&&hanko){hanko.classList.remove('osu');void hanko.offsetWidth;hanko.classList.add('osu');}
    }
    hyou.addEventListener('change',function(){kaku(true);});
    hyou.addEventListener('submit',function(e){e.preventDefault();});
    kaku(false);
  }

  var kyou=document.querySelector('[data-kyou]');
  if(kyou){
    var YO=['日','月','火','水','木','金','土'];
    var now=new Date(),m=now.getHours()*60+now.getMinutes();
    function yasumi(d){return d.getDay()===1||(d.getDay()===2&&d.getDate()>=15&&d.getDate()<=21);}
    function tsugi(){
      var d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1);
      while(yasumi(d))d.setDate(d.getDate()+1);
      return '次は'+(d.getMonth()+1)+'月'+d.getDate()+'日('+YO[d.getDay()]+')の9:30に開けます。';
    }
    var hi='今日('+YO[now.getDay()]+')';
    var t;
    if(yasumi(now)){t=hi+'は休みです。'+tsugi();}
    else if(m<570){t=hi+'は開けます。9:30からです。';}
    else if(m<780){t=hi+'は開いています。トリミングの受付は13:00までです。';}
    else if(m<1080){t='今日のトリミングの受付は終わりました。ホテルの受け渡しは18:00までです。';}
    else{t='今日は閉めました。'+tsugi();}
    kyou.textContent=t;
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
