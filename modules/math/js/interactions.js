/* ============================================================
 * 学习工具箱 · 数学模块 · 交互渲染器
 *
 * 蓝队实现（试点 4 页）。零依赖，SVG/DOM 原生实现，一屏内。
 * 注册到 window.MATH_INTERACTIONS（见 js/math.js）。
 *
 * 已实现：
 *   slider-lab    滑块实验：拖参数看表达式实时变化，命中目标咔哒反馈
 *   balance-drag  拖拽天平：拖砝码保持平衡，解方程的动作化
 * ============================================================ */
(function () {
  "use strict";

  /* ---------------- 共享：表达式求值（LaTeX 子集） ----------------
   * 支持：+ - * / ^() 及变量名。^ 转 ** 做幂。 */
  function evalExpr(expr, varName, varValue) {
    var e = String(expr == null ? "" : expr);
    e = e.replace(/\^/g, "**");
    var escName = String(varName).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var re = new RegExp("\\b" + escName + "\\b", "g");
    e = e.replace(re, "(" + Number(varValue) + ")");
    if (!/^[0-9+\-*/().\s]*$/.test(e)) return NaN;
    try {
      var v = Function('"use strict"; return (' + e + ")")();
      return (typeof v === "number" && isFinite(v)) ? v : NaN;
    } catch (err) { return NaN; }
  }

  /* ---------------- 共享：咔哒音效（参考英语页 tickSound） ---------------- */
  var tickCtx = null;
  function tickSound() {
    try {
      if (!tickCtx) tickCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (tickCtx.state === "suspended") tickCtx.resume();
      var t = tickCtx.currentTime;
      var o = tickCtx.createOscillator();
      var g = tickCtx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(2400, t);
      o.frequency.exponentialRampToValueAtTime(1200, t + 0.03);
      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      o.connect(g); g.connect(tickCtx.destination);
      o.start(t); o.stop(t + 0.06);
    } catch (e) {}
  }
  function hapticTick() {
    try { if (navigator.vibrate) navigator.vibrate(8); } catch (e) {}
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function el(tag, cls, html) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html != null) d.innerHTML = html;
    return d;
  }
  // 数字格式化：避免 0.30000000004
  function fmt(n) {
    if (!isFinite(n)) return "—";
    var r = Math.round(n * 1000) / 1000;
    return String(r);
  }

  /* ============================================================
   * 1. slider-lab 滑块实验
   * params: {min,max,step,label,expr,target?,targetLabel?,unit?}
   * ============================================================ */
  function renderSliderLab(container, params) {
    var min = Number(params.min);
    var max = Number(params.max);
    var step = Number(params.step) || 1;
    var label = params.label || "x";
    var expr = params.expr || label;
    var hasTarget = params.target !== undefined && params.target !== null;
    var target = Number(params.target);

    var wrap = el("div", "ix-slider");
    // 表达式显示
    var exprLine = el("div", "ix-expr-line",
      '<span class="ix-expr">' + esc(expr) + "</span>" +
      '<span class="ix-eq"> = </span>' +
      '<span class="ix-val" id="">0</span>' +
      (params.unit ? ' <span class="ix-unit">' + esc(params.unit) + "</span>" : ""));
    var valSpan = exprLine.querySelector(".ix-val");
    // 滑块行
    var row = el("div", "ix-slider-row");
    var labSpan = el("span", "ix-slider-label", esc(label) + " = ");
    var valLab = el("span", "ix-slider-val", "");
    var input = document.createElement("input");
    input.type = "range";
    input.min = min; input.max = max; input.step = step;
    input.value = min;
    input.className = "ix-range";
    input.setAttribute("aria-label", label);
    // 目标标记
    if (hasTarget) {
      var pct = ((target - min) / (max - min)) * 100;
      var tick = el("div", "ix-target-tick");
      tick.style.left = pct + "%";
      tick.title = params.targetLabel || ("目标 " + target);
      row.appendChild(tick);
    }
    row.appendChild(labSpan);
    row.appendChild(input);
    row.appendChild(valLab);
    // 状态行
    var status = el("div", "ix-status", "");

    wrap.appendChild(exprLine);
    wrap.appendChild(row);
    wrap.appendChild(status);
    container.appendChild(wrap);

    var hitTarget = false;
    function update() {
      var v = Number(input.value);
      valLab.textContent = fmt(v);
      var r = evalExpr(expr, label, v);
      valSpan.textContent = fmt(r);
      if (hasTarget) {
        if (r === target && !hitTarget) {
          hitTarget = true;
          tickSound(); hapticTick();
          status.innerHTML = '<span class="ix-success">🎯 ' +
            esc(params.targetLabel || ("达到目标 " + target)) + "！</span>";
          wrap.classList.add("ix-hit");
        } else if (r !== target && hitTarget) {
          hitTarget = false;
          status.innerHTML = "";
          wrap.classList.remove("ix-hit");
        } else if (!hitTarget) {
          var diff = target - r;
          status.innerHTML = '<span class="ix-hint">' +
            (diff > 0 ? "还差 " + fmt(diff) : "超过了 " + fmt(-diff)) + "</span>";
        }
      }
    }
    input.addEventListener("input", update);
    update();
  }

  /* ============================================================
   * 2. balance-drag 拖拽天平
   * params: {left:[], right:[], goal, rule?}
   * item: {kind:"unknown"|"weight", id?, label?, value?}
   *
   * 玩法：把一边的砝码拖到另一边的砝码上，相减；
   *       拖出天平则直接拿走（会倾斜）。
   * 成功：左边只剩 x 盒子，右边只剩砝码 → 显示 x = ?
   * ============================================================ */
  function renderBalanceDrag(container, params) {
    var NS = "http://www.w3.org/2000/svg";
    function svgEl(tag, attrs) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    // 深拷贝物品
    var left = JSON.parse(JSON.stringify(params.left || []));
    var right = JSON.parse(JSON.stringify(params.right || []));
    var uidc = 0;
    function tagItems(arr, side) {
      arr.forEach(function (it) {
        it._uid = "w" + (uidc++);
        it._side = side;
      });
    }
    tagItems(left, "L"); tagItems(right, "R");

    var wrap = el("div", "ix-balance");
    // 目标与规则
    var goalDiv = el("div", "ix-goal", "🎯 " + esc(params.goal || ""));
    var ruleDiv = el("div", "ix-rule", esc(params.rule || "两边同时拿走同样多，天平依然平衡"));
    wrap.appendChild(goalDiv);
    wrap.appendChild(ruleDiv);

    // SVG 天平
    var W = 400, H = 300;
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, "class": "ix-svg" });
    var CX = 200, BEAM_Y = 150, ARM = 130, PAN_DROP = 46;
    // 底座
    svg.appendChild(svgEl("rect", { x: CX - 40, y: 268, width: 80, height: 10, rx: 4, "class": "bl-base" }));
    // 支柱
    svg.appendChild(svgEl("rect", { x: CX - 5, y: BEAM_Y, width: 10, height: 118, "class": "bl-post" }));
    // 横梁（旋转组）
    var beamG = svgEl("g", { "class": "bl-beam" });
    var beam = svgEl("rect", { x: CX - ARM - 8, y: BEAM_Y - 5, width: ARM * 2 + 16, height: 10, rx: 5, "class": "bl-beam-bar" });
    beamG.appendChild(beam);
    // 中心铆钉
    beamG.appendChild(svgEl("circle", { cx: CX, cy: BEAM_Y, r: 8, "class": "bl-pin" }));
    svg.appendChild(beamG);
    // 左右吊绳 + 秤盘（秤盘保持水平，需反向旋转补偿）
    function makePan(side) {
      var g = svgEl("g", { "class": "bl-pan" });
      var x = side === "L" ? CX - ARM : CX + ARM;
      g.appendChild(svgEl("line", { x1: x, y1: BEAM_Y, x2: x, y2: BEAM_Y + PAN_DROP, "class": "bl-string" }));
      g.appendChild(svgEl("ellipse", { cx: x, cy: BEAM_Y + PAN_DROP + 6, rx: 52, ry: 10, "class": "bl-pan-plate" }));
      svg.appendChild(g);
      return { g: g, x: x };
    }
    var panL = makePan("L"), panR = makePan("R");
    wrap.appendChild(svg);

    // 状态行 + 重置
    var status = el("div", "ix-status", "");
    var resetBtn = el("button", "ix-reset", "↺ 重置");
    resetBtn.type = "button";
    var foot = el("div", "ix-foot");
    foot.appendChild(status); foot.appendChild(resetBtn);
    wrap.appendChild(foot);
    container.appendChild(wrap);

    // 物品重量：unknown 盒子不计入可比重量（未知），weight 计 value
    function sideWeight(arr) {
      var s = 0;
      arr.forEach(function (it) { if (it.kind === "weight") s += Number(it.value) || 0; });
      return s;
    }
    function hasUnknown(arr) {
      return arr.some(function (it) { return it.kind === "unknown"; });
    }

    // 渲染物品为 SVG rect（可拖拽）
    var itemEls = {};  // _uid -> {g, item}
    var WW = 46, WH = 30;
    function drawItems() {
      // 清旧
      Object.keys(itemEls).forEach(function (uid) {
        var o = itemEls[uid];
        if (o.g.parentNode) o.g.parentNode.removeChild(o.g);
      });
      itemEls = {};
      [["L", left, panL], ["R", right, panR]].forEach(function (t) {
        var side = t[0], arr = t[1], pan = t[2];
        arr.forEach(function (it, idx) {
          var g = svgEl("g", { "class": "bl-item" + (it.kind === "unknown" ? " bl-unknown" : "") });
          var px = pan.x - (arr.length * (WW + 6)) / 2 + idx * (WW + 6) + 3;
          var py = BEAM_Y + PAN_DROP + 6 - 10 - WH;  // 盘面上方
          var r = svgEl("rect", { x: 0, y: 0, width: WW, height: WH, rx: 6, "class": it.kind === "unknown" ? "bl-box" : "bl-weight" });
          g.appendChild(r);
          var tx = svgEl("text", {
            x: WW / 2, y: WH / 2 + 6, "text-anchor": "middle",
            "class": "bl-label"
          });
          tx.textContent = it.kind === "unknown" ? (it.label || "x") : String(it.value);
          g.appendChild(tx);
          g.setAttribute("transform", "translate(" + px + "," + py + ")");
          g.dataset.uid = it._uid;
          g.dataset.side = side;
          g.dataset.idx = idx;
          svg.appendChild(g);
          itemEls[it._uid] = { g: g, item: it, homeX: px, homeY: py };
          bindDrag(g, it);
        });
      });
      updateBeam();
      checkWin();
    }

    // 横梁倾斜：按两边砝码总重差
    function updateBeam() {
      var diff = sideWeight(left) - sideWeight(right);
      // x 盒子视为未知，不参与倾斜计算；若一边只有 x，另一边有砝码则倾斜
      var lW = sideWeight(left), rW = sideWeight(right);
      var lHasX = hasUnknown(left), rHasX = hasUnknown(right);
      var ang;
      if (lHasX && !rHasX && rW > 0 && lW === 0) ang = 10;       // 左只有x，右有砝码 → 右沉
      else if (rHasX && !lHasX && lW > 0 && rW === 0) ang = -10;  // 反之
      else ang = Math.max(-12, Math.min(12, (lW - rW) * 1.5));
      beamG.setAttribute("transform", "rotate(" + (-ang) + " " + CX + " " + BEAM_Y + ")");
      // 吊盘位置跟随横梁端点，盘面保持水平
      var rad = (-ang) * Math.PI / 180;
      var lx = CX - ARM * Math.cos(rad), ly = BEAM_Y + ARM * Math.sin(rad);
      var rx = CX + ARM * Math.cos(rad), ry = BEAM_Y - ARM * Math.sin(rad);
      positionPan(panL, lx, ly); positionPan(panR, rx, ry);
      // 物品跟随盘子（未被拖拽时）
      [["L", left, panL], ["R", right, panR]].forEach(function (t) {
        var arr = t[1], pan = t[2];
        arr.forEach(function (it) {
          var o = itemEls[it._uid];
          if (o && !o.dragging) {
            var idx = arr.indexOf(it);
            var px = pan._x - (arr.length * (WW + 6)) / 2 + idx * (WW + 6) + 3;
            var py = pan._plateY - WH;
            o.g.setAttribute("transform", "translate(" + px + "," + py + ")");
            o.homeX = px; o.homeY = py;
          }
        });
      });
    }
    function positionPan(pan, x, y) {
      pan._x = x;
      pan._plateY = y + PAN_DROP + 6 - 10;
      var line = pan.g.querySelector("line");
      var ell = pan.g.querySelector("ellipse");
      line.setAttribute("x1", x); line.setAttribute("y1", y);
      line.setAttribute("x2", x); line.setAttribute("y2", y + PAN_DROP);
      ell.setAttribute("cx", x); ell.setAttribute("cy", y + PAN_DROP + 6);
    }

    // 胜利判定：左边只有 x 盒子（无砝码），右边只有砝码（无 x）
    function checkWin() {
      var lW = left.filter(function (it) { return it.kind === "weight"; });
      var rX = right.filter(function (it) { return it.kind === "unknown"; });
      var lX = left.filter(function (it) { return it.kind === "unknown"; });
      if (lX.length > 0 && lW.length === 0 && rX.length === 0 && right.length > 0) {
        var total = sideWeight(right);
        var perX = lX.length === 1 ? total : null;
        status.innerHTML = '<span class="ix-success">🎉 天平平衡！' +
          (perX !== null ? esc(lX[0].label || "x") + " = " + fmt(perX) : "左边共 " + lX.length + " 个 x = " + fmt(total)) +
          "</span>";
        tickSound(); hapticTick();
        return true;
      }
      return false;
    }

    // 拖拽（pointer events，兼容鼠标/触屏）
    function svgPoint(evt) {
      var pt = svg.createSVGPoint();
      pt.x = evt.clientX; pt.y = evt.clientY;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    }
    function bindDrag(g, item) {
      var o = itemEls[item._uid];
      g.style.touchAction = "none";
      g.style.cursor = "grab";
      g.addEventListener("pointerdown", function (evt) {
        evt.preventDefault();
        o.dragging = true;
        g.setPointerCapture(evt.pointerId);
        var p = svgPoint(evt);
        o.dx = p.x - o.homeX; o.dy = p.y - o.homeY;
        g.style.cursor = "grabbing";
        // 提到最上层
        svg.appendChild(g);
      });
      g.addEventListener("pointermove", function (evt) {
        if (!o.dragging) return;
        var p = svgPoint(evt);
        o.curX = p.x - o.dx; o.curY = p.y - o.dy;
        g.setAttribute("transform", "translate(" + o.curX + "," + o.curY + ")");
      });
      g.addEventListener("pointerup", function (evt) {
        if (!o.dragging) return;
        o.dragging = false;
        g.style.cursor = "grab";
        var p = svgPoint(evt);
        handleDrop(item, p.x, p.y);
      });
      g.addEventListener("pointercancel", function () {
        o.dragging = false;
        snapBack(item);
      });
    }
    function snapBack(item) {
      var o = itemEls[item._uid];
      if (o) {
        o.g.setAttribute("transform", "translate(" + o.homeX + "," + o.homeY + ")");
        updateBeam();
      }
    }
    // 命中测试：点是否在某个物品上（排除自己）
    function hitItem(x, y, excludeUid) {
      for (var uid in itemEls) {
        if (uid === excludeUid) continue;
        var o = itemEls[uid];
        var t = o.g.getAttribute("transform") || "";
        var m = t.match(/translate\(([-\d.]+),([-\d.]+)\)/);
        if (!m) continue;
        var ix = Number(m[1]), iy = Number(m[2]);
        if (x >= ix && x <= ix + WW && y >= iy && y <= iy + WH) return o.item;
      }
      return null;
    }
    // 点是否在天平区域内（用于判断"拖出拿走"）
    function inBalance(x, y) {
      return x > 20 && x < W - 20 && y > 60 && y < 280;
    }
    function removeItem(item) {
      var arr = item._side === "L" ? left : right;
      var i = arr.indexOf(item);
      if (i !== -1) arr.splice(i, 1);
      drawItems();
    }
    function handleDrop(item, x, y) {
      var target = hitItem(x, y, item._uid);
      if (target && target.kind === "weight" && item.kind === "weight" &&
          target._side !== item._side) {
        // 跨盘相减：把拖动的砝码"减"到目标砝码上
        var a = Number(item.value) || 0, b = Number(target.value) || 0;
        removeItem(item);
        if (b > a) {
          target.value = b - a;
        } else if (b === a) {
          removeItem(target);
        } else {
          // 目标更小：反向相减，剩余留在拖动方（不常见，简化处理：交换后减）
          target.value = a - b;
          // 把剩余放回拖动物品原边
          var arr = item._side === "L" ? left : right;
          arr.push({ kind: "weight", value: a - b, _uid: "w" + (uidc++), _side: item._side });
        }
        status.innerHTML = '<span class="ix-hint">两边同时减去 ' + fmt(Math.min(a, b)) + "，天平依然平衡</span>";
        tickSound();
        drawItems();
        return;
      }
      if (!inBalance(x, y)) {
        // 拖出天平：直接拿走
        if (item.kind === "unknown") {
          status.innerHTML = '<span class="ix-hint">x 是未知数，不能拿走哦</span>';
          snapBack(item);
          return;
        }
        removeItem(item);
        status.innerHTML = '<span class="ix-hint">拿走了 ' + fmt(item.value) + "，天平" +
          (sideWeight(left) === sideWeight(right) ? "仍然" : "不再") + "平衡</span>";
        return;
      }
      // 落回盘内：吸附回位
      snapBack(item);
    }

    resetBtn.addEventListener("click", function () {
      left = JSON.parse(JSON.stringify(params.left || []));
      right = JSON.parse(JSON.stringify(params.right || []));
      uidc = 0;
      tagItems(left, "L"); tagItems(right, "R");
      status.innerHTML = "";
      drawItems();
    });

    positionPan(panL, CX - ARM, BEAM_Y);
    positionPan(panR, CX + ARM, BEAM_Y);
    drawItems();
  }

  /* ---------------- 注册 ---------------- */
  if (window.MATH_INTERACTIONS) {
    window.MATH_INTERACTIONS.register("slider-lab", renderSliderLab);
    window.MATH_INTERACTIONS.register("balance-drag", renderBalanceDrag);
  }
})();
