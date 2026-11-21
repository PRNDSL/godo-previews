(function(){
  // 証明写真の台紙(トップだけにある)。最初の表示(履歴書)はHTMLに直接書いてあるので、JSが無くても読める
  var box = document.querySelector('[data-id-info]');
  if(box){
    var info = {
      menkyo:{ttl:'運転免許',mm:'24×30mm',time:'撮ってから15分',price:'2枚 1,320円',extra:'1枚 330円',memo:'免許の更新や新しく取る時の申請に使います。帽子と色の濃い眼鏡は外して撮ります。'},
      rireki:{ttl:'履歴書',mm:'30×40mm',time:'撮ってから15分',price:'2枚 1,650円',extra:'1枚 330円',memo:'撮った中から1枚を一緒に選びます。データもつけるなら550円足してください。'},
      passport:{ttl:'パスポートとマイナンバーカード',mm:'35×45mm',time:'撮ってから15分',price:'2枚 1,980円',extra:'1枚 330円',memo:'頭のてっぺんからあごまでが決まりの長さに入るよう測ってから切ります。'},
      visa:{ttl:'アメリカのビザ',mm:'51×51mm',time:'撮ってから20分',price:'2枚 2,420円',extra:'1枚 440円',memo:'申請の画面に上げる正方形のデータも一緒にお渡しします。眼鏡は外して撮ります。'}
    };
    var btns = document.querySelectorAll('.use-btn');
    var items = document.querySelectorAll('.frames li');
    var esc = function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
    var pick = function(key){
      var d = info[key]; if(!d) return;
      btns.forEach(function(b){b.setAttribute('aria-pressed', b.dataset.use===key ? 'true':'false');});
      items.forEach(function(li){li.classList.toggle('is-on', li.dataset.use===key);});
      box.querySelector('[data-f="ttl"]').innerHTML = esc(d.ttl)+' <span class="mm">'+esc(d.mm)+'</span>';
      box.querySelector('[data-f="time"]').textContent = d.time;
      box.querySelector('[data-f="price"]').textContent = d.price;
      box.querySelector('[data-f="extra"]').textContent = d.extra;
      box.querySelector('[data-f="memo"]').textContent = d.memo;
      box.dataset.selected = key;
    };
    btns.forEach(function(b){b.addEventListener('click',function(){pick(b.dataset.use);});});
    pick('rireki');
  }

  // 今日の営業を1文で出す。開店前・営業中・閉店後で文を変える(固定の「営業中」は書かない)
  // 祝日の判定はしていない(祝日の一覧を持たないため)。祝日は土日と同じ時間なので、平日の祝日だけ時刻がずれる
  var msgs = document.querySelectorAll('[data-today]');
  if(msgs.length){
    var hoursOf = function(d){
      var w = d.getDay();
      if(w===2) return null;
      if(w===3 && d.getDate()>=15 && d.getDate()<=21) return null;
      if(w===0 || w===6) return [9*60, 17*60, '9:00', '17:00'];
      return [9*60+30, 18*60+30, '9:30', '18:30'];
    };
    var now = new Date();
    var h = hoursOf(now);
    var mins = now.getHours()*60 + now.getMinutes();
    var text;
    if(!h){
      text = (now.getDay()===2) ? '今日は火曜でお休みです。' : '今日は第3水曜でお休みです。';
    }else if(mins < h[0]){
      text = '今日は'+h[2]+'から'+h[3]+'まで開いています。';
    }else if(mins < h[1]){
      text = '今日は'+h[3]+'まで開いています。';
    }else{
      var tm = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
      var th = hoursOf(tm);
      text = '今日は'+h[3]+'で閉まりました。|' + (th ? '明日は'+th[2]+'からです。' : '明日はお休みです。');
    }
    var state = h ? (mins < h[0] ? 'before' : (mins < h[1] ? 'open' : 'after')) : 'closed';
    msgs.forEach(function(msg){
      // 1文ずつ折れない塊にして、文の途中で行が割れないようにする
      msg.textContent = '';
      text.split('|').forEach(function(s){
        var sp = document.createElement('span'); sp.className = 'k'; sp.textContent = s; msg.appendChild(sp);
      });
      msg.hidden = false;
      msg.dataset.state = state;
    });
  }

  // 上へ戻る: ページが画面3つ分より長い時だけ、1画面ぶん下がったら出す
  var ue = document.createElement('button');
  ue.type = 'button'; ue.className = 'ue'; ue.hidden = true; ue.textContent = '上へ';
  ue.setAttribute('aria-label','ページの上へ戻る');
  document.body.appendChild(ue);
  ue.addEventListener('click',function(){window.scrollTo(0,0);});
  var miru = function(){
    var vh = window.innerHeight, nagai = document.documentElement.scrollHeight > vh*3;
    ue.hidden = !(nagai && window.pageYOffset > vh);
  };
  window.addEventListener('scroll',miru,{passive:true});
  window.addEventListener('resize',miru);
  miru();
})();
