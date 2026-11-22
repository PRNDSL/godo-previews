(function(){
  var sw=document.getElementById('fee-switch');
  if(sw){
    var fees={30:[6700,8800],45:[9200,12100],60:[11700,15400]};
    var btns=sw.querySelectorAll('button[data-len]');
    var rows=document.querySelectorAll('.fee-table tbody tr');
    var yen=function(n){return n.toLocaleString('ja-JP');};
    var set=function(len){
      var f=fees[len];
      document.getElementById('out-len').textContent=len;
      document.getElementById('out-3').textContent=yen(f[0]);
      document.getElementById('out-4').textContent=yen(f[1]);
      for(var i=0;i<btns.length;i++){btns[i].setAttribute('aria-pressed',btns[i].getAttribute('data-len')==String(len)?'true':'false');}
      for(var j=0;j<rows.length;j++){rows[j].classList.toggle('is-on',rows[j].getAttribute('data-len')==String(len));}
    };
    for(var i=0;i<btns.length;i++){
      btns[i].addEventListener('click',function(){set(Number(this.getAttribute('data-len')));});
    }
    sw.hidden=false;
    set(30);
  }

  if(document.querySelector('.days')||document.querySelector('.tt')){
    var d=new Date().getDay();
    var isLessonDay=(d>=2&&d<=6);
    var openDay=isLessonDay?d:2;
    var det=document.querySelector('.day[data-day="'+openDay+'"]');
    if(det){
      det.open=true;
      var tg=det.querySelector('.today-tag');
      if(isLessonDay&&tg){tg.hidden=false;}
    }
    if(isLessonDay){
      var cells=document.querySelectorAll('.tt [data-day="'+d+'"]');
      for(var k=0;k<cells.length;k++){cells[k].classList.add('is-today');}
      var th=document.querySelector('.tt thead [data-day="'+d+'"]');
      if(th){var tag=document.createElement('span');tag.className='today-tag';tag.textContent='今日';th.appendChild(tag);}
    }
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
