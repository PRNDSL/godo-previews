(function(){
  var NS = "http://www.w3.org/2000/svg";

  /* 印影: 入力した文字は text 要素の textContent でだけ入れる(innerHTML は使わない) */
  var svg = document.getElementById("inei");
  var moji = document.getElementById("moji");
  var input = document.getElementById("namae");
  if(svg && moji && input){
    var DEFAULT = "朝倉";
    /* 字数ごとの置き方 [中心x, 中心y, 字の大きさ, 横の伸ばし, 縦の伸ばし]。4字は右の列から読む */
    var LAYOUT = {
      1:[[100,100,108,1,1]],
      2:[[100,63,64,1.05,1.12],[100,137,64,1.05,1.12]],
      3:[[100,51,47,1.3,1],[100,100,47,1.3,1],[100,149,47,1.3,1]],
      4:[[129,71,53,1,1.05],[129,129,53,1,1.05],[71,71,53,1,1.05],[71,129,53,1,1.05]]
    };
    var chars = function(v){
      var a = Array.from(v.replace(/\s+/g,""));
      return a.slice(0,4);
    };
    var draw = function(){
      var c = chars(input.value);
      if(c.length === 0){ c = Array.from(DEFAULT); }
      var lay = LAYOUT[c.length];
      while(moji.firstChild){ moji.removeChild(moji.firstChild); }
      for(var i=0;i<c.length;i++){
        var p = lay[i];
        var t = document.createElementNS(NS,"text");
        t.setAttribute("x","0");
        t.setAttribute("y","0");
        t.setAttribute("text-anchor","middle");
        t.setAttribute("dominant-baseline","central");
        t.setAttribute("font-size",String(p[2]));
        t.setAttribute("transform","translate("+p[0]+" "+p[1]+") scale("+p[3]+" "+p[4]+")");
        t.textContent = c[i];
        moji.appendChild(t);
      }
      svg.setAttribute("aria-label", c.join("") + "の印影の見本");
    };
    var press = function(){
      svg.classList.add("press");
      setTimeout(function(){ svg.classList.remove("press"); }, 120);
    };
    input.addEventListener("input", draw);
    /* 空のまま離れたら、入力欄も最初の名字に戻す */
    input.addEventListener("blur", function(){
      if(chars(input.value).length === 0){ input.value = DEFAULT; draw(); }
    });
    var btns = document.querySelectorAll(".fonts button");
    Array.prototype.forEach.call(btns, function(b){
      b.addEventListener("click", function(){
        Array.prototype.forEach.call(btns, function(x){ x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        moji.setAttribute("font-family", b.getAttribute("data-font"));
        moji.setAttribute("font-weight", b.getAttribute("data-weight"));
        press();
      });
    });
    draw();
  }

  /* 営業時間: 今日の曜日の行に朱の丸印を付ける */
  var row = document.querySelector('.hours tr[data-day="' + new Date().getDay() + '"]');
  if(row){
    row.classList.add("today");
    var th = row.querySelector("th");
    var mark = document.createElementNS(NS, "svg");
    mark.setAttribute("viewBox", "0 0 42 42");
    mark.setAttribute("class", "today-in");
    mark.setAttribute("aria-hidden", "true");
    var c1 = document.createElementNS(NS, "circle");
    c1.setAttribute("cx", "21"); c1.setAttribute("cy", "21"); c1.setAttribute("r", "19"); c1.setAttribute("stroke-width", "2.4");
    var c2 = document.createElementNS(NS, "circle");
    c2.setAttribute("cx", "21"); c2.setAttribute("cy", "21"); c2.setAttribute("r", "15.5"); c2.setAttribute("stroke-width", "1");
    var t = document.createElementNS(NS, "text");
    t.setAttribute("x", "21"); t.setAttribute("y", "22"); t.setAttribute("text-anchor", "middle");
    t.setAttribute("dominant-baseline", "central"); t.setAttribute("font-size", "13");
    t.textContent = "今日";
    mark.appendChild(c1); mark.appendChild(c2); mark.appendChild(t);
    th.insertBefore(mark, th.firstChild);
    var sr = document.createElement("span");
    sr.className = "sr";
    sr.textContent = "(今日)";
    th.appendChild(sr);
  }

  /* 上へ戻る: ページが画面3つ分より長い時だけ、1画面ぶん下がったら出す */
  var ue = document.createElement("button");
  ue.type = "button"; ue.className = "ue"; ue.hidden = true; ue.textContent = "上へ";
  ue.setAttribute("aria-label", "ページの上へ戻る");
  document.body.appendChild(ue);
  ue.addEventListener("click", function(){ window.scrollTo(0, 0); });
  function miru(){
    var vh = window.innerHeight, nagai = document.documentElement.scrollHeight > vh * 3;
    ue.hidden = !(nagai && window.pageYOffset > vh);
  }
  window.addEventListener("scroll", miru, {passive:true});
  window.addEventListener("resize", miru);
  miru();
})();
