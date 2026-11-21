(function(){
  // 剪定の暦: 今月の欄に印を付け、今月の仕事の札を書き替える(暦のあるページだけ)
  var m = new Date().getMonth() + 1;
  var cell = document.querySelector('.month[data-m="' + m + '"]');
  if(cell){
    document.documentElement.classList.add('has-js');
    cell.classList.add('is-now');
    cell.setAttribute('aria-current', 'date');
    var label = document.getElementById('now-label');
    var list = document.getElementById('now-tasks');
    var note = document.getElementById('now-note');
    var ask = document.getElementById('ask-label');
    if(label) label.textContent = m + '月の仕事';
    if(list){
      list.innerHTML = '';
      cell.querySelectorAll('.tasks li').forEach(function(t){
        var li = document.createElement('li');
        li.textContent = t.textContent;
        list.appendChild(li);
      });
    }
    if(note) note.textContent = cell.getAttribute('data-note');
    if(ask) ask.textContent = 'この仕事を頼む';
  }

  // 上へ戻る: ページが画面3つ分より長い時だけ、1画面ぶん下がったら出す
  var ue = document.createElement('button');
  ue.type = 'button'; ue.className = 'ue'; ue.hidden = true; ue.textContent = '上へ';
  ue.setAttribute('aria-label', 'ページの上へ戻る');
  document.body.appendChild(ue);
  ue.addEventListener('click', function(){ window.scrollTo(0, 0); });
  function miru(){
    var vh = window.innerHeight, nagai = document.documentElement.scrollHeight > vh * 3;
    ue.hidden = !(nagai && window.pageYOffset > vh);
  }
  window.addEventListener('scroll', miru, {passive:true});
  window.addEventListener('resize', miru);
  miru();
})();
