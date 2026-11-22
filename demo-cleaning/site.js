function finishFor(now){
  var OPEN = 8*60, CUT = 17*60, CLOSE = 19*60;
  function day(d, n){ return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  var today = day(now, 0);
  var dow = now.getDay();
  var min = now.getHours()*60 + now.getMinutes();
  var kind, drop, add;
  if (dow === 0) {
    kind = 'sunday'; drop = day(today, 1); add = 2;
  } else if (min < OPEN) {
    kind = 'before'; drop = today; add = 2;
  } else if (min <= CUT) {
    kind = 'open'; drop = today; add = 2;
  } else if (min <= CLOSE) {
    kind = 'late'; drop = today; add = 3;
  } else {
    kind = 'closed'; drop = day(today, 1);
    if (drop.getDay() === 0) drop = day(drop, 1);
    add = 2;
  }
  var ready = day(drop, add), moved = false;
  if (ready.getDay() === 0) { ready = day(ready, 1); moved = true; }
  return { kind: kind, drop: drop, ready: ready, moved: moved };
}

(function(){
  var W = ['日','月','火','水','木','金','土'];
  function md(d){ return (d.getMonth()+1) + '月' + d.getDate() + '日(' + W[d.getDay()] + ')'; }
  function f(name){ return document.querySelector('[data-f="' + name + '"]'); }
  if (f('label')) {
    var now = new Date();
    var r = finishFor(now);
    var label = {
      open: 'いま出すと',
      late: 'いま出すと',
      before: '今日8時の開店後に出すと',
      closed: '今日の受付は終わりました。<span class="nw">' + md(r.drop) + 'に出すと</span>',
      sunday: '本日は定休日。月曜に出すと'
    }[r.kind];
    var why = {
      open: '17時までのお預かりなので、翌々日の夕方です。',
      late: '17時を過ぎたので、3日後の夕方です。',
      before: '17時までのお預かりなので、翌々日の夕方です。',
      closed: '受付は8時から。17時までに出せば翌々日の夕方です。',
      sunday: '月曜の17時までに出せば、水曜の夕方です。'
    }[r.kind];
    if (r.moved) why += '仕上がりが日曜に当たるので、月曜にしています。';
    f('label').innerHTML = label;
    f('date').textContent = md(r.ready);
    f('when').textContent = '17時に仕上がり';
    var hh = now.getHours(), mm = ('0' + now.getMinutes()).slice(-2);
    f('why').textContent = why;
    f('at').textContent = md(now) + ' ' + hh + ':' + mm + ' に開いた時の計算です';
  }

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
