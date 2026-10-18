/* ============================================================
 * 学习工具箱 · 地理 · 批 4 新增渲染器（dg07 走进国家）
 *
 * 本文件在 js/geography.js、js/geo-batch2-widgets.js、
 * js/geo-batch3-widgets.js 之后引入，经 window.GEO.registerWidget 注册。
 *
 * 渲染器：
 *  - factor-scale：单因子滑块 → 结果分档读数（dg07.1.3 印度季风强弱→旱涝；
 *    dg07.1.4 俄罗斯纬度→寒冷→人口；dg07.2.4 巴西雨林破坏程度→生态后果）。
 *    真值 = GeoBatch4.bandOf(params, value) 纯函数（场层）；view.state()
 *    为 UI 可达值（GEO-RULING-2026-10-17-03 分场层/UI 两类）。
 *    教学示意模型：modelNote 必须写清"只看一个因子"与适用边界（GEO-AX01）。
 *  - cause-chain：因果链拼装（dg07.1.1 日本临海型布局 sequence；
 *    dg07.2.3 美国自然条件→农业带 match）。
 *    真值 = params.answer / params.pairs（场层）；view.state() 为学生
 *    拼装结果（UI 可达）。因果方向冻结 自然→人文（GEO-R40）。
 *
 * 零外部请求；深浅双色走 --geog-*；触摸热区 ≥44px；
 * 纯 DOM 实现，无 canvas 文字；HTML 文字只用 .fs-078… 工具类（V8 阶梯）。
 * 记录键经本地 store() 写 "ltb-geo-" + recordKey（与 geography.js 一致，
 * 老键 ltb-geo-rec-* 由 migrateLegacyRecords 迁移，不另起前缀）。
 * ============================================================ */
(function () {
  "use strict";
  if (!window.GEO || !window.GEO.registerWidget) return;

  /* ---------- 小工具 ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function store(k, v) {
    try { localStorage.setItem("ltb-geo-" + k, JSON.stringify(v)); } catch (e) {}
  }
  var _live = [];
  function track(v) { _live.push(v); return v; }
  function untrack(v) {
    var i = _live.indexOf(v); if (i >= 0) _live.splice(i, 1);
    try { if (window.GEO && window.GEO.unregisterView) window.GEO.unregisterView(v); } catch (e) {}
  }
  /* 2026-10-18 批 7 FAIL-1 修复（白队 QA）：深色切换 canvas 不重绘。
     body[data-theme] 变化时对挂载视图执行 resize()（即重排＋draw 重绘；
     try/catch 保护单视图异常不影响其余）。 */
  if (window.MutationObserver && document.body) {
    var _themeObserver = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].type === "attributes" && muts[i].attributeName === "data-theme") {
          _live.forEach(function (v) { try { v.resize(); } catch (e) {} });
          break;
        }
      }
    });
    _themeObserver.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
  }

  /* ============================================================
   * 纯函数真值层（渲染与白队断言共用，GEO-R30 类比）
   * ============================================================ */
  function bandOf(params, v) {
    var bands = (params && params.bands) || [];
    var val = Number(v);
    for (var i = 0; i < bands.length; i++) {
      if (val <= Number(bands[i].max)) {
        return { index: i, label: bands[i].label, outcome: bands[i].outcome, note: bands[i].note || "" };
      }
    }
    var last = bands[bands.length - 1] || {};
    return { index: bands.length - 1, label: last.label || "", outcome: last.outcome || "", note: last.note || "" };
  }
  function chainScore(params, pickedIds) {
    /* sequence：逐位置比对；match：逐对集合比对（顺序无关） */
    if (!params) return { score: 0, total: 0, detail: [] };
    if (params.mode === "match") {
      var want = {};
      (params.pairs || []).forEach(function (pr) { want[pr[0] + ">" + pr[1]] = true; });
      var got = {};
      (pickedIds || []).forEach(function (pr) { got[pr[0] + ">" + pr[1]] = true; });
      var detail = (params.pairs || []).map(function (pr) {
        return { pair: pr, ok: !!got[pr[0] + ">" + pr[1]] };
      });
      var score = detail.filter(function (d) { return d.ok; }).length;
      return { score: score, total: (params.pairs || []).length, detail: detail };
    }
    var ans = params.answer || [];
    var detail = ans.map(function (id, i) {
      return { pos: i, want: id, got: (pickedIds || [])[i] || null, ok: (pickedIds || [])[i] === id };
    });
    var s = detail.filter(function (d) { return d.ok; }).length;
    return { score: s, total: ans.length, detail: detail };
  }
  window.GeoBatch4 = { bandOf: bandOf, chainScore: chainScore };

  /* ============================================================
   * factor-scale · 单因子滑块 → 分档读数
   * ============================================================ */
  function FactorScaleView(box, P) {
    P = P || {};
    var F = P.factor || {};
    var min = Number(F.min != null ? F.min : 0);
    var max = Number(F.max != null ? F.max : 100);
    var init = Number(F.init != null ? F.init : (min + max) / 2);
    if (init < min) init = min; if (init > max) init = max;

    var wrap = el("div", "geog-w2");
    wrap.appendChild(el("div", "geog-w2-head fs-105", esc(P.title || "单因子实验")));
    if (P.intro) wrap.appendChild(el("div", "geog-w2-readout fs-095", esc(P.intro)));

    /* 示意徽章（GEO-R24 常驻，不可关） */
    var badge = el("div", "geog-w2-badge fs-078", "示意｜非精确比例｜只看一个因子");
    wrap.appendChild(badge);

    /* glyph 示意画布（SVG 矢量；2026-10-18 批 7 起 SVG 文字 12.5px 落 V8 阶梯，见 drawGlyph） */
    var stage = el("div", "geog-w2-stage");
    wrap.appendChild(stage);

    /* 滑块行 */
    var row = el("div", "geog-w2-row");
    row.appendChild(el("span", "fs-085", esc(F.lowLabel || "")));
    var slider = el("input");
    slider.type = "range"; slider.min = String(min); slider.max = String(max);
    slider.step = "1"; slider.value = String(init);
    slider.style.flex = "1"; slider.style.minHeight = "44px";
    slider.setAttribute("aria-label", F.name || "因子滑块");
    row.appendChild(slider);
    row.appendChild(el("span", "fs-085", esc(F.highLabel || "")));
    wrap.appendChild(row);

    var readout = el("div", "geog-w2-readout fs-095");
    wrap.appendChild(readout);
    var noteEl = el("div", "geog-w2-ax fs-085");
    wrap.appendChild(noteEl);
    if (P.modelNote) {
      wrap.appendChild(el("div", "geog-w2-ax fs-078",
        "模型诚实声明：" + esc(P.modelNote)));
    }
    box.appendChild(wrap);

    var NS = "http://www.w3.org/2000/svg";
    function svgEl(tag, attrs) {
      var n = document.createElementNS(NS, tag);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      return n;
    }
    function cssVar(name, fb) {
      try { var v = getComputedStyle(document.body).getPropertyValue(name).trim(); return v || fb; }
      catch (e) { return fb; }
    }
    /* 主题色实时读取（2026-10-18 批 8 小手术）：ink/soft/accent 改为
     * drawGlyph 内实时读 CSS 变量，主题切换后 resize 即跟随
     * （原闭包一次性读取，深色切换后 glyph 颜色不跟随）。 */
    function drawGlyph(v) {
      stage.innerHTML = "";
      var ink = cssVar("--geog-ink", "#1a1a1a");
      var soft = cssVar("--geog-ink-soft", "#5a5a5a");
      var accent = cssVar("--geog-accent", "#2a7de1");
      var glyph = P.glyph || "none";
      if (glyph === "none") return;
      /* V8 字号阶梯修复（2026-10-18 批 7）：viewBox 0 0 100 62 → 0 0 800 496
       *（坐标 ×8），SVG 文字 font-size 7 → 12.5（落阶梯 12.48±0.5），
       * 替代旧“SVG 矢量文字豁免”（无书面裁决，按门禁⑲无效）。图形比例不变。 */
      var svg = svgEl("svg", { viewBox: "0 0 800 496", width: "100%", role: "img" });
      var t = (v - min) / Math.max(1e-9, (max - min)); /* 0..1 */
      if (glyph === "monsoon") {
        /* 下：印度洋（海）→ 上：印度半岛（陆）；箭头粗细随强度 */
        svg.appendChild(svgEl("rect", { x: 0, y: 304, width: 800, height: 192, fill: "#bcd8f5", opacity: 0.8 }));
        svg.appendChild(svgEl("rect", { x: 0, y: 0, width: 800, height: 304, fill: "#cfe6c0", opacity: 0.8 }));
        var sea = svgEl("text", { x: 400, y: 448, "text-anchor": "middle", fill: soft, "font-size": 12.5 });
        sea.textContent = "印度洋（示意）"; svg.appendChild(sea);
        var land = svgEl("text", { x: 400, y: 80, "text-anchor": "middle", fill: soft, "font-size": 12.5 });
        land.textContent = "印度半岛（示意）"; svg.appendChild(land);
        var w = 16 + t * 56;
        [176, 400, 624].forEach(function (x) {
          var ln = svgEl("line", { x1: x, y1: 416, x2: x, y2: 160, stroke: accent, "stroke-width": w.toFixed(1), "stroke-linecap": "round" });
          svg.appendChild(ln);
          var hd = svgEl("polygon", { points: (x - 32) + ",192 " + (x + 32) + ",192 " + x + ",112", fill: accent });
          svg.appendChild(hd);
        });
        var lb = svgEl("text", { x: 400, y: 272, "text-anchor": "middle", fill: ink, "font-size": 12.5 });
        lb.textContent = "西南季风（箭头越粗越强）"; svg.appendChild(lb);
      } else if (glyph === "latitude") {
        /* 纵向温度梯度条：下暖上冷；标记当前位置 */
        var grad = svgEl("defs", {});
        var lg = svgEl("linearGradient", { id: "geog4-latg", x1: 0, y1: 0, x2: 0, y2: 1 });
        [["0%", "#7fb3e8"], ["55%", "#cfe0f2"], ["100%", "#f2c98a"]].forEach(function (s) {
          lg.appendChild(svgEl("stop", { offset: s[0], "stop-color": s[1] }));
        });
        grad.appendChild(lg); svg.appendChild(grad);
        svg.appendChild(svgEl("rect", { x: 304, y: 32, width: 192, height: 400, fill: "url(#geog4-latg)", stroke: soft }));
        var y = 432 - t * 400;
        svg.appendChild(svgEl("line", { x1: 256, y1: y, x2: 544, y2: y, stroke: "#d23c3c", "stroke-width": 16 }));
        var top = svgEl("text", { x: 240, y: 80, "text-anchor": "end", fill: soft, "font-size": 12.5 });
        top.textContent = "70°N 严寒"; svg.appendChild(top);
        var bot = svgEl("text", { x: 240, y: 448, "text-anchor": "end", fill: soft, "font-size": 12.5 });
        bot.textContent = "50°N 相对温暖"; svg.appendChild(bot);
        var cur = svgEl("text", { x: 592, y: y + 20, fill: "#d23c3c", "font-size": 12.5 });
        cur.textContent = "约 " + Math.round(v) + "°N"; svg.appendChild(cur);
      } else if (glyph === "forest") {
        /* 树冠随破坏程度消退 */
        var keep = 1 - t;
        svg.appendChild(svgEl("rect", { x: 0, y: 0, width: 800, height: 496, fill: "#e8f0e0", opacity: 0.6 }));
        for (var i = 0; i < 9; i++) {
          var cx = 80 + (i % 3) * 320, cy = 112 + Math.floor(i / 3) * 128;
          var alive = (i / 9) < keep;
          svg.appendChild(svgEl("circle", {
            cx: cx, cy: cy, r: alive ? 72 : 32,
            fill: alive ? "#3f8f4f" : "#b09a7a", opacity: alive ? 0.95 : 0.7
          }));
        }
        var fl = svgEl("text", { x: 400, y: 480, "text-anchor": "middle", fill: soft, "font-size": 12.5 });
        fl.textContent = "雨林覆盖（示意，随滑块消退）"; svg.appendChild(fl);
      }
      stage.appendChild(svg);
    }

    function render(v) {
      var b = bandOf(P, v);
      readout.innerHTML = "<strong>" + esc(F.name || "当前") + "：约 " + esc(String(Math.round(v))) +
        esc(F.unit || "") + "</strong><br>→ <strong>" + esc(b.label) + "</strong>：" + esc(b.outcome);
      noteEl.textContent = b.note || "";
      drawGlyph(v);
      return b;
    }
    var curBand = render(init);
    function onInput() {
      var v = Number(slider.value);
      curBand = render(v);
      store(P.recordKey || "geog_factor-scale", { value: v, band: curBand.label, ts: Date.now() });
    }
    slider.addEventListener("input", onInput);

    var view = {
      resize: function () { drawGlyph(Number(slider.value)); },
      destroy: function () { untrack(view); },
      /* 场层真值：任意值（含非滑块步进值）直接走纯函数（GEO-RULING-2026-10-17-03） */
      truth: function () { return { bands: P.bands, bandOf: function (v) { return bandOf(P, v); } }; },
      /* UI 可达：当前滑块值对应的分档 */
      state: function () {
        var v = Number(slider.value);
        var b = bandOf(P, v);
        return { value: v, bandIndex: b.index, bandLabel: b.label };
      },
      labelFonts: function () { return []; },
      _setValue: function (v) { slider.value = String(v); onInput(); }
    };
    track(view);
    return view;
  }
  window.GEO.registerWidget("factor-scale", function (box, params) { return FactorScaleView(box, params || {}); });

  /* ============================================================
   * cause-chain · 因果链拼装（sequence 排序 / match 配对）
   * ============================================================ */
  function CauseChainView(box, P) {
    P = P || {};
    var mode = P.mode === "match" ? "match" : "sequence";
    var wrap = el("div", "geog-w2");
    wrap.appendChild(el("div", "geog-w2-head fs-105", esc(P.title || "因果链拼装")));
    if (P.intro) wrap.appendChild(el("div", "geog-w2-readout fs-095", esc(P.intro)));
    wrap.appendChild(el("div", "geog-w2-badge fs-078", "因果方向：自然→人文，不许颠倒（GEO-R40）"));

    var work = el("div"); wrap.appendChild(work);
    var feedback = el("div", "geog-w2-readout fs-095"); wrap.appendChild(feedback);
    var row = el("div", "geog-w2-row"); wrap.appendChild(row);
    if (P.chainNote) wrap.appendChild(el("div", "geog-w2-ax fs-078", esc(P.chainNote)));
    box.appendChild(wrap);

    var submitted = false, scoreInfo = null;
    var cardById = {};
    function markBtn(btn, ok) {
      btn.classList.remove("geog-btn-primary");
      btn.innerHTML = (ok ? "✓ " : "✗ ") + esc(btn.getAttribute("data-label") || "");
      btn.style.borderColor = ok ? "#2e9e5b" : "#d23c3c";
    }

    if (mode === "sequence") {
      var cards = (P.cards || []).slice();
      cards.forEach(function (c) { cardById[c.id] = c; });
      var chain = []; /* 已选 id 序列 */
      var slotBox = el("div", "geog-w2-readout fs-095");
      work.appendChild(slotBox);
      var btnBox = el("div", "geog-w2-row");
      work.appendChild(btnBox);
      var btns = cards.map(function (c) {
        var b = el("button", "geog-btn fs-095", esc(c.text));
        b.type = "button";
        b.setAttribute("data-label", c.text);
        b.setAttribute("data-id", c.id);
        b.addEventListener("click", function () {
          if (submitted) return;
          if (chain.indexOf(c.id) >= 0 || chain.length >= cards.length) return;
          chain.push(c.id);
          b.disabled = true;
          paintChain();
        });
        btnBox.appendChild(b);
        return b;
      });
      function paintChain() {
        if (!chain.length) { slotBox.innerHTML = "点下面的卡片，按“因为 → 所以”排成一条链。"; return; }
        slotBox.innerHTML = chain.map(function (id, i) {
          return "<strong>" + (i + 1) + "</strong>. " + esc(cardById[id].text);
        }).join(" &nbsp;→&nbsp; ");
      }
      paintChain();
      var undo = el("button", "geog-btn fs-085", "撤销上一步"); undo.type = "button";
      undo.addEventListener("click", function () {
        if (submitted) return;
        var id = chain.pop();
        btns.forEach(function (b) { if (b.getAttribute("data-id") === id) b.disabled = false; });
        paintChain();
      });
      var reset = el("button", "geog-btn fs-085", "重排"); reset.type = "button";
      reset.addEventListener("click", function () {
        if (submitted) return;
        chain = []; btns.forEach(function (b) { b.disabled = false; });
        feedback.textContent = ""; paintChain();
      });
      var submit = el("button", "geog-btn geog-btn-primary fs-095", "提交验证"); submit.type = "button";
      submit.addEventListener("click", function () {
        if (submitted || chain.length !== cards.length) {
          feedback.textContent = chain.length !== cards.length ? "先把 " + cards.length + " 张卡片都排好，再提交。" : "";
          return;
        }
        submitted = true;
        scoreInfo = chainScore(P, chain);
        var ans = P.answer || [];
        feedback.innerHTML = scoreInfo.score === scoreInfo.total
          ? "✓ 因果链完整正确：" + esc(ans.map(function (id) { return cardById[id].text; }).join(" → "))
          : "✗ 这条链有 " + (scoreInfo.total - scoreInfo.score) + " 处顺序不对。正确顺序：" +
            esc(ans.map(function (id) { return cardById[id].text; }).join(" → ")) + "（想想：哪一步的“因为”站不住？）";
        btns.forEach(function (b) {
          var id = b.getAttribute("data-id");
          var pos = chain.indexOf(id);
          markBtn(b, pos >= 0 && ans[pos] === id);
        });
        store(P.recordKey || "geog_cause-chain", { mode: mode, chain: chain, score: scoreInfo.score, total: scoreInfo.total, ts: Date.now() });
      });
      row.appendChild(undo); row.appendChild(reset); row.appendChild(submit);
      var view = {
        resize: function () {}, destroy: function () { untrack(view); },
        truth: function () { return { mode: mode, answer: P.answer || [] }; },
        state: function () {
          return { mode: mode, chain: chain.slice(), submitted: submitted,
            score: scoreInfo ? scoreInfo.score : null, total: (P.answer || []).length };
        },
        labelFonts: function () { return []; }
      };
      track(view);
      return view;
    }

    /* ---- match 模式：左因右果配对 ---- */
    var causes = (P.causes || []).slice(), effects = (P.effects || []).slice();
    causes.forEach(function (c) { cardById["c:" + c.id] = c; });
    effects.forEach(function (c) { cardById["e:" + c.id] = c; });
    var pairsMade = []; /* [[causeId, effectId]] */
    var selCause = null;
    var cols = el("div", "geog-w2-row");
    cols.style.alignItems = "flex-start";
    var colC = el("div"); colC.style.flex = "1";
    var colE = el("div"); colE.style.flex = "1";
    colC.appendChild(el("div", "fs-085", "<strong>" + esc(P.causeLabel || "因") + "</strong>"));
    colE.appendChild(el("div", "fs-085", "<strong>" + esc(P.effectLabel || "果") + "</strong>"));
    cols.appendChild(colC); cols.appendChild(colE);
    work.appendChild(cols);
    var pairList = el("div", "geog-w2-readout fs-095");
    work.appendChild(pairList);

    var causeBtns = causes.map(function (c) {
      var b = el("button", "geog-btn fs-095", esc(c.text));
      b.type = "button"; b.style.width = "100%"; b.style.marginTop = "8px";
      b.setAttribute("data-id", c.id);
      b.addEventListener("click", function () {
        if (submitted) return;
        selCause = (selCause === c.id) ? null : c.id;
        causeBtns.forEach(function (x) {
          x.classList.toggle("geog-btn-primary", x.getAttribute("data-id") === selCause);
        });
      });
      colC.appendChild(b);
      return b;
    });
    var effectBtns = effects.map(function (c) {
      var b = el("button", "geog-btn fs-095", esc(c.text));
      b.type = "button"; b.style.width = "100%"; b.style.marginTop = "8px";
      b.setAttribute("data-id", c.id);
      b.addEventListener("click", function () {
        if (submitted || !selCause) {
          if (!submitted && !selCause) feedback.textContent = "先点左侧一个“因”，再点右侧配对的“果”。";
          return;
        }
        var already = pairsMade.some(function (pr) { return pr[0] === selCause || pr[1] === c.id; });
        if (already) { feedback.textContent = "这张卡已经配过对了，先解除再重配。"; return; }
        pairsMade.push([selCause, c.id]);
        causeBtns.forEach(function (x) { if (x.getAttribute("data-id") === selCause) x.disabled = true; });
        b.disabled = true;
        selCause = null;
        causeBtns.forEach(function (x) { x.classList.remove("geog-btn-primary"); });
        feedback.textContent = "";
        paintPairs();
      });
      colE.appendChild(b);
      return b;
    });
    function pairLabel(pr) {
      return cardById["c:" + pr[0]].text + " → " + cardById["e:" + pr[1]].text;
    }
    function paintPairs() {
      pairList.innerHTML = pairsMade.length
        ? "已配对（" + pairsMade.length + "/" + causes.length + "）：" +
          pairsMade.map(function (pr, i) {
            return "<div>" + (i + 1) + ". " + esc(pairLabel(pr)) +
              (submitted ? "" : " <button type=\"button\" class=\"geog-btn fs-078\" data-unpair=\"" + i + "\">解除</button>") + "</div>";
          }).join("")
        : "点左侧选“因”，再点右侧选“果”，配成一对。";
      pairList.querySelectorAll("[data-unpair]").forEach(function (x) {
        x.addEventListener("click", function () {
          if (submitted) return;
          var pr = pairsMade[Number(x.getAttribute("data-unpair"))];
          pairsMade.splice(Number(x.getAttribute("data-unpair")), 1);
          causeBtns.forEach(function (b) { if (b.getAttribute("data-id") === pr[0]) b.disabled = false; });
          effectBtns.forEach(function (b) { if (b.getAttribute("data-id") === pr[1]) b.disabled = false; });
          paintPairs();
        });
      });
    }
    paintPairs();
    var mReset = el("button", "geog-btn fs-085", "全部重配"); mReset.type = "button";
    mReset.addEventListener("click", function () {
      if (submitted) return;
      pairsMade = []; selCause = null;
      causeBtns.forEach(function (b) { b.disabled = false; b.classList.remove("geog-btn-primary"); b.style.borderColor = ""; });
      effectBtns.forEach(function (b) { b.disabled = false; b.style.borderColor = ""; });
      feedback.textContent = ""; paintPairs();
    });
    var mSubmit = el("button", "geog-btn geog-btn-primary fs-095", "提交验证"); mSubmit.type = "button";
    mSubmit.addEventListener("click", function () {
      if (submitted) return;
      if (pairsMade.length !== causes.length) {
        feedback.textContent = "还有 " + (causes.length - pairsMade.length) + " 对没配完。";
        return;
      }
      submitted = true;
      scoreInfo = chainScore(P, pairsMade);
      var lines = scoreInfo.detail.map(function (d, i) {
        var pr = d.pair;
        var wantE = (P.pairs || []).filter(function (w) { return w[0] === pr[0]; })[0];
        return (i + 1) + ". " + (d.ok ? "✓ " : "✗ ") + esc(pairLabel(pr)) +
          (d.ok ? "" : "（正解：" + esc(cardById["c:" + pr[0]].text + " → " + cardById["e:" + wantE[1]].text) + "）");
      });
      feedback.innerHTML = (scoreInfo.score === scoreInfo.total ? "✓ 全部配对正确！" : "✗ 对了 " + scoreInfo.score + "/" + scoreInfo.total + "。") +
        "<br>" + lines.join("<br>");
      store(P.recordKey || "geog_cause-chain", { mode: mode, pairs: pairsMade, score: scoreInfo.score, total: scoreInfo.total, ts: Date.now() });
    });
    row.appendChild(mReset); row.appendChild(mSubmit);

    var mview = {
      resize: function () {}, destroy: function () { untrack(mview); },
      truth: function () { return { mode: mode, pairs: P.pairs || [] }; },
      state: function () {
        return { mode: mode, pairs: pairsMade.map(function (pr) { return pr.slice(); }),
          submitted: submitted, score: scoreInfo ? scoreInfo.score : null, total: (P.pairs || []).length };
      },
      labelFonts: function () { return []; }
    };
    track(mview);
    return mview;
  }
  window.GEO.registerWidget("cause-chain", function (box, params) { return CauseChainView(box, params || {}); });
})();
