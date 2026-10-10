/* ============================================================
 * 学习工具箱 · 数学模块 · 交互渲染器
 *
 * 蓝队实现（试点 4 页）。零依赖，SVG/DOM 原生实现，一屏内。
 * 注册到 window.MATH_INTERACTIONS（见 js/math.js）。
 *
 * 已实现：
 *   slider-lab        滑块实验：拖参数看表达式实时变化，命中目标咔哒反馈
 *   balance-drag      拖拽天平：拖砝码保持平衡，解方程的动作化
 *   linked-dashboard  联动仪表盘：一个滑块驱动数值读数 + SVG 坐标点/轨迹
 *   plot-points       描点成像：拖滑块逐个点亮坐标点，连成曲线（可自动播放）
 *   side-compare      并排对比：左右两栏简化 slider-lab，支持滑块同步联动
 *   numeric-lab       数值实验台：点按钮/输数看趋势（accumulate 累加棋盘麦粒）
 * ============================================================ */
(function () {
  "use strict";

  /* ---------------- 共享：表达式求值（LaTeX 子集） ----------------
   * 支持：+ - * / ^()、三角函数 sin/cos/tan、对数 log2/log/ln（ln=log=自然对数）、
   * π 及变量名。^ 转 ** 做幂。 */
  function evalExpr(expr, varName, varValue) {
    var e = String(expr == null ? "" : expr);
    e = e.replace(/\^/g, "**");
    // 白名单替换：三角函数、对数与圆周率 → Math.*（先做，再代入变量）
    // 注意：log2( 必须先于 log( 处理，否则 log2( 会被误替换成 Math.log(2(
    e = e.replace(/\bsin\s*\(/g, "Math.sin(")
         .replace(/\bcos\s*\(/g, "Math.cos(")
         .replace(/\btan\s*\(/g, "Math.tan(")
         .replace(/\blog2\s*\(/g, "Math.log2(")
         .replace(/\blog\s*\(/g, "Math.log(")
         .replace(/\bln\s*\(/g, "Math.log(")
         .replace(/\u03C0/g, "Math.PI");
    var escName = String(varName).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var re = new RegExp("\\b" + escName + "\\b", "g");
    e = e.replace(re, "(" + Number(varValue) + ")");
    // 安全检查：剥离白名单标识符后只允许数字、运算符、括号、空白
    var check = e.replace(/\bMath\.(sin|cos|tan|log2|log|PI)\b/g, "");
    if (!/^[0-9+\-*/().\s]*$/.test(check)) return NaN;
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
   *
   * sliderLabCore 是无目标反馈的精简构建器，供 side-compare 复用。
   * 返回 {wrap,row,input,getValue,getResult,setValue,onInput}。
   * ============================================================ */
  function sliderLabCore(container, params) {
    var min = Number(params.min);
    var max = Number(params.max);
    var step = Number(params.step) || 1;
    var label = params.label || "x";
    var expr = params.expr || label;

    var wrap = el("div", "ix-slider");
    // 表达式显示
    var exprLine = el("div", "ix-expr-line",
      '<span class="ix-expr">' + esc(expr) + "</span>" +
      '<span class="ix-eq"> = </span>' +
      '<span class="ix-val">0</span>' +
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
    row.appendChild(labSpan);
    row.appendChild(input);
    row.appendChild(valLab);
    wrap.appendChild(exprLine);
    wrap.appendChild(row);
    container.appendChild(wrap);

    var cbs = [];
    function refresh() {
      var v = Number(input.value);
      valLab.textContent = fmt(v);
      var r = evalExpr(expr, label, v);
      valSpan.textContent = fmt(r);
      return { v: v, r: r };
    }
    input.addEventListener("input", function () {
      var s = refresh();
      cbs.forEach(function (cb) { cb(s.v, s.r); });
    });
    refresh();
    return {
      wrap: wrap, row: row, input: input,
      getValue: function () { return Number(input.value); },
      getResult: function () { return evalExpr(expr, label, Number(input.value)); },
      setValue: function (v) {  // 程序设值（同步联动用），同样触发回调
        input.value = Math.min(max, Math.max(min, Number(v)));
        var s = refresh();
        cbs.forEach(function (cb) { cb(s.v, s.r); });
      },
      onInput: function (cb) { cbs.push(cb); }
    };
  }

  function renderSliderLab(container, params) {
    var core = sliderLabCore(container, params);
    attachTargetFeedback(core.wrap, params, core);
    return core;
  }

  /* 目标语义（🎯 旗帜 + r===target 命中反馈），slider-lab 与 side-compare 复用。
   * 无 target 时：只挂载空状态行（slider-lab 历史行为，无视觉反馈）；
   * side-compare 仅在栏内 params 含 target 时调用，不改变无 target 栏的布局。 */
  function attachTargetFeedback(wrap, params, core) {
    var hasTarget = params.target !== undefined && params.target !== null;
    var target = Number(params.target);
    // 目标标记："结果目标"单独标注。target 是结果值 r 的目标，不能按输入滑块轴定位
    // （此前用 (target-min)/(max-min) 定位到轨道上，r 与 v 量程不同时 tick 会飞出轨道被裁剪）。
    if (hasTarget) {
      var flag = el("div", "ix-target-flag",
        "🎯 " + esc(params.targetLabel || ("目标 " + target)));
      flag.title = "把结果拖到这个值";
      wrap.appendChild(flag);
    }
    // 状态行
    var status = el("div", "ix-status", "");
    wrap.appendChild(status);

    var hitTarget = false;
    function update(v, r) {
      if (!hasTarget) return;
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
    core.onInput(update);
    update(core.getValue(), core.getResult());
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
        try { g.setPointerCapture(evt.pointerId); } catch (e) {}
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

  /* ============================================================
   * 3. linked-dashboard 联动仪表盘
   * params: {source:{label,min,max,step,initial}, views:[...]}
   * views[].kind: "readout"（数值读数）/ "point"（坐标点+轨迹）
   *
   * 一个滑块驱动多视图：拖动 source，读数实时变，SVG 里点沿轨迹动。
   * ============================================================ */
  function renderLinkedDashboard(container, params) {
    var NS = "http://www.w3.org/2000/svg";
    function svgEl(tag, attrs) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    var src = params.source || {};
    var vName = src.label || "x";
    var min = Number(src.min), max = Number(src.max);
    var step = Number(src.step) || 1;
    if (!(min < max)) {
      container.appendChild(el("div", "ix-stub", "参数错误：source.min 必须 < source.max"));
      return;
    }
    var init = (src.initial !== undefined && src.initial !== null && isFinite(Number(src.initial)))
      ? Number(src.initial) : min;

    var views = params.views || [];
    var wrap = el("div", "ix-dashboard");

    // —— 滑块（复用 slider-lab 样式） ——
    var row = el("div", "ix-slider-row");
    var labSpan = el("span", "ix-slider-label", esc(vName) + " = ");
    var valLab = el("span", "ix-slider-val", "");
    var input = document.createElement("input");
    input.type = "range";
    input.min = min; input.max = max; input.step = step;
    input.value = init;
    input.className = "ix-range";
    input.setAttribute("aria-label", vName);
    row.appendChild(labSpan); row.appendChild(input); row.appendChild(valLab);
    wrap.appendChild(row);

    // —— readout 视图：数值读数 ——
    var readouts = [];
    views.forEach(function (v) { if (v && v.kind === "readout") readouts.push(v); });
    var readoutSpans = [];
    if (readouts.length) {
      var rb = el("div", "ix-dash-readouts");
      rb.style.cssText = "display:flex;flex-wrap:wrap;gap:4px 24px;padding:4px 0;";
      readouts.forEach(function (v) {
        var line = el("div", "ix-expr-line",
          '<span class="ix-expr">' + esc(v.label || v.expr || "") + "</span>" +
          '<span class="ix-eq"> = </span><span class="ix-val">0</span>');
        rb.appendChild(line);
        readoutSpans.push(line.querySelector(".ix-val"));
      });
      wrap.appendChild(rb);
    }

    // —— point 视图：共享一个 SVG，自动量程 ——
    var pointViews = [];
    views.forEach(function (v) { if (v && v.kind === "point") pointViews.push(v); });
    views.forEach(function (v) {
      if (v && v.kind !== "readout" && v.kind !== "point") {
        var stub = el("div", "ix-stub", "视图 " + esc(v.kind) + " 暂不支持");
        stub.style.cssText = "font-size:.85rem;padding:2px 0;";
        wrap.appendChild(stub);
      }
    });

    var xMin, xMax, yMin, yMax;
    var dots = [], coordLabels = [];
    var W = 420, H = 300, mL = 40, mR = 14, mT = 16, mB = 30;
    function X(x) { return mL + (x - xMin) / (xMax - xMin) * (W - mL - mR); }
    function Y(y) { return mT + (1 - (y - yMin) / (yMax - yMin)) * (H - mT - mB); }

    if (pointViews.length) {
      // 全 range 采样求量程
      xMin = Infinity; xMax = -Infinity; yMin = Infinity; yMax = -Infinity;
      var SAMPLES = 60;
      var trails = pointViews.map(function (v) {
        var pts = [];
        for (var i = 0; i <= SAMPLES; i++) {
          var t = min + (max - min) * i / SAMPLES;
          var px = evalExpr(v.xExpr, vName, t);
          var py = evalExpr(v.yExpr, vName, t);
          if (isFinite(px) && isFinite(py)) {
            pts.push({ x: px, y: py });
            if (px < xMin) xMin = px; if (px > xMax) xMax = px;
            if (py < yMin) yMin = py; if (py > yMax) yMax = py;
          }
        }
        return pts;
      });
      if (!isFinite(xMin)) { xMin = min; xMax = max; yMin = 0; yMax = 1; }
      var xPad = (xMax - xMin) * 0.08 || 1;
      var yPad = (yMax - yMin) * 0.12 || 1;
      xMin -= xPad; xMax += xPad; yMin -= yPad; yMax += yPad;

      var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, "class": "ix-svg" });
      svg.style.maxWidth = "100%";
      // 过零坐标轴
      if (yMin <= 0 && yMax >= 0) {
        svg.appendChild(svgEl("line", { x1: mL, y1: Y(0), x2: W - mR, y2: Y(0),
          stroke: "var(--m-line)", "stroke-width": 1.5 }));
      }
      if (xMin <= 0 && xMax >= 0) {
        svg.appendChild(svgEl("line", { x1: X(0), y1: mT, x2: X(0), y2: H - mB,
          stroke: "var(--m-line)", "stroke-width": 1.5 }));
      }
      // 轴标签（可选 axisLabelX/axisLabelY；默认取首个 point 视图的表达式）
      var xLab = svgEl("text", { x: W - mR - 2, y: H - 8, "text-anchor": "end",
        fill: "var(--m-ink-soft)", "font-size": 13 });
      xLab.textContent = pointViews[0].axisLabelX || pointViews[0].xExpr || "x";
      svg.appendChild(xLab);
      var yLab = svgEl("text", { x: 6, y: mT + 6, fill: "var(--m-ink-soft)", "font-size": 13 });
      yLab.textContent = pointViews[0].axisLabelY || pointViews[0].yExpr || "y";
      svg.appendChild(yLab);
      // 轨迹（淡）+ 当前点（亮）+ 坐标标注
      trails.forEach(function (pts) {
        svg.appendChild(svgEl("polyline", {
          points: pts.map(function (p) { return X(p.x).toFixed(1) + "," + Y(p.y).toFixed(1); }).join(" "),
          fill: "none", stroke: "var(--m-accent)", "stroke-width": 2, opacity: 0.25
        }));
        var dot = svgEl("circle", { r: 7, fill: "var(--m-accent-strong)",
          stroke: "#fff", "stroke-width": 2 });
        svg.appendChild(dot);
        var cl = svgEl("text", { "font-size": 13, fill: "var(--m-ink)", "font-weight": "bold" });
        svg.appendChild(cl);
        dots.push(dot); coordLabels.push(cl);
      });
      wrap.appendChild(svg);
    }

    container.appendChild(wrap);

    function update() {
      var t = Number(input.value);
      valLab.textContent = fmt(t);
      readouts.forEach(function (v, i) {
        readoutSpans[i].textContent = fmt(evalExpr(v.expr, vName, t));
      });
      pointViews.forEach(function (v, i) {
        var px = evalExpr(v.xExpr, vName, t);
        var py = evalExpr(v.yExpr, vName, t);
        if (!isFinite(px) || !isFinite(py)) {
          dots[i].setAttribute("visibility", "hidden");
          coordLabels[i].setAttribute("visibility", "hidden");
          return;
        }
        dots[i].setAttribute("visibility", "visible");
        coordLabels[i].setAttribute("visibility", "visible");
        dots[i].setAttribute("cx", X(px).toFixed(1));
        dots[i].setAttribute("cy", Y(py).toFixed(1));
        var cl = coordLabels[i];
        cl.textContent = "(" + fmt(px) + ", " + fmt(py) + ")";
        var lx = X(px) + 12;
        if (lx > W - 100) { lx = X(px) - 12; cl.setAttribute("text-anchor", "end"); }
        else cl.setAttribute("text-anchor", "start");
        cl.setAttribute("x", lx.toFixed(1));
        cl.setAttribute("y", (Y(py) - 10).toFixed(1));
      });
    }
    input.addEventListener("input", update);
    update();
  }

  /* ============================================================
   * 4. plot-points 描点成像
   * params: {fn, xMin, xMax, step, autoPlay?, speed?}
   *
   * 给定 x 列表，拖滑块逐个"点亮"坐标点，点亮的点连成曲线。
   * 自动播放逐点点亮（用户一拖滑块即接管，暂停自动播放）。
   * ============================================================ */
  function renderPlotPoints(container, params) {
    var NS = "http://www.w3.org/2000/svg";
    function svgEl(tag, attrs) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    var fn = params.fn || "x";
    var xMin = Number(params.xMin), xMax = Number(params.xMax);
    var step = Number(params.step) || 1;
    if (!(xMin < xMax) || !(step > 0)) {
      container.appendChild(el("div", "ix-stub", "参数错误：需 xMin < xMax 且 step > 0"));
      return;
    }
    var count = Math.round((xMax - xMin) / step);
    var xs = [], ys = [];
    for (var i = 0; i <= count; i++) {
      var x = Math.round((xMin + i * step) * 1000) / 1000;
      xs.push(x);
      ys.push(evalExpr(fn, "x", x));
    }
    var n = xs.length;

    // 量程
    var yMin = Infinity, yMax = -Infinity;
    ys.forEach(function (y) {
      if (isFinite(y)) { if (y < yMin) yMin = y; if (y > yMax) yMax = y; }
    });
    if (!isFinite(yMin)) { yMin = 0; yMax = 1; }
    var yPad = (yMax - yMin) * 0.15 || 1;
    yMin -= yPad; yMax += yPad;
    var x0 = xMin - step * 0.6, x1 = xMax + step * 0.6;

    var W = 420, H = 320, mL = 42, mR = 14, mT = 16, mB = 32;
    function X(v) { return mL + (v - x0) / (x1 - x0) * (W - mL - mR); }
    function Y(v) { return mT + (1 - (v - yMin) / (yMax - yMin)) * (H - mT - mB); }

    var wrap = el("div", "ix-plot");
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, "class": "ix-svg" });
    svg.style.maxWidth = "100%";
    // 坐标轴
    if (yMin <= 0 && yMax >= 0) {
      svg.appendChild(svgEl("line", { x1: mL, y1: Y(0), x2: W - mR, y2: Y(0),
        stroke: "var(--m-line)", "stroke-width": 1.5 }));
    }
    if (x0 <= 0 && x1 >= 0) {
      svg.appendChild(svgEl("line", { x1: X(0), y1: mT, x2: X(0), y2: H - mB,
        stroke: "var(--m-line)", "stroke-width": 1.5 }));
    }
    var xLab = svgEl("text", { x: W - mR - 2, y: H - 8, "text-anchor": "end",
      fill: "var(--m-ink-soft)", "font-size": 13 });
    xLab.textContent = "x";
    svg.appendChild(xLab);
    var yLab = svgEl("text", { x: 6, y: mT + 6, fill: "var(--m-ink-soft)", "font-size": 13 });
    yLab.textContent = "y";
    svg.appendChild(yLab);

    // 点：未点亮=空心，点亮=实心；连线穿过已点亮的点
    var ghostDots = [], litDots = [];
    for (var d = 0; d < n; d++) {
      var ok = isFinite(ys[d]);
      var g = svgEl("circle", { cx: X(xs[d]).toFixed(1), cy: ok ? Y(ys[d]).toFixed(1) : -50,
        r: 5, fill: "none", stroke: "var(--m-accent)", "stroke-width": 1.5, opacity: 0.45,
        visibility: ok ? "visible" : "hidden" });
      var l = svgEl("circle", { cx: X(xs[d]).toFixed(1), cy: ok ? Y(ys[d]).toFixed(1) : -50,
        r: 6, fill: "var(--m-accent-strong)", stroke: "#fff", "stroke-width": 2,
        visibility: "hidden" });
      svg.appendChild(g); svg.appendChild(l);
      ghostDots.push(g); litDots.push(l);
    }
    var line = svgEl("polyline", { points: "", fill: "none",
      stroke: "var(--m-accent-strong)", "stroke-width": 2.5 });
    svg.appendChild(line);
    var coordLab = svgEl("text", { "font-size": 13, fill: "var(--m-ink)",
      "font-weight": "bold", visibility: "hidden" });
    svg.appendChild(coordLab);
    wrap.appendChild(svg);

    // 状态行
    var status = el("div", "ix-status", "");
    wrap.appendChild(status);

    // 滑块：点亮个数
    var row = el("div", "ix-slider-row");
    var labSpan = el("span", "ix-slider-label", "点亮 ");
    var valLab = el("span", "ix-slider-val", "");
    var input = document.createElement("input");
    input.type = "range";
    input.min = 0; input.max = n; input.step = 1; input.value = 0;
    input.className = "ix-range";
    input.setAttribute("aria-label", "点亮的点数");
    row.appendChild(labSpan); row.appendChild(input); row.appendChild(valLab);
    wrap.appendChild(row);

    // 按钮行
    var foot = el("div", "ix-foot");
    foot.style.cssText = "display:flex;gap:8px;justify-content:flex-start;";
    var playBtn = el("button", "ix-reset", "▶ 自动播放");
    playBtn.type = "button";
    var resetBtn = el("button", "ix-reset", "↺ 重置");
    resetBtn.type = "button";
    foot.appendChild(playBtn); foot.appendChild(resetBtn);
    wrap.appendChild(foot);
    container.appendChild(wrap);

    var timer = null;
    var speed = Math.max(100, Number(params.speed) || 800);
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      playBtn.textContent = "▶ 自动播放";
    }
    function play() {
      stop();
      timer = setInterval(function () {
        if (!document.body.contains(wrap)) { stop(); return; }  // 已切页，停
        var k = Number(input.value);
        if (k >= n) { stop(); return; }
        setLit(k + 1);
      }, speed);
      playBtn.textContent = "⏸ 暂停";
    }
    function setLit(k) {
      input.value = k;
      valLab.textContent = k + " / " + n;
      // 按间断点分段：非有限点处断开 polyline，避免跨间断连笔（如双曲线过原点）
      var segs = [[]];
      for (var j = 0; j < n; j++) {
        var lit = j < k;
        litDots[j].setAttribute("visibility", lit ? "visible" : "hidden");
        ghostDots[j].setAttribute("visibility", lit ? "hidden" : "visible");
        if (lit && isFinite(ys[j])) {
          segs[segs.length - 1].push(X(xs[j]).toFixed(1) + "," + Y(ys[j]).toFixed(1));
        } else if (segs[segs.length - 1].length > 0) {
          segs.push([]);
        }
      }
      // 清除旧线段，重绘
      var oldLines = svg.querySelectorAll(".pp-seg");
      for (var q = 0; q < oldLines.length; q++) oldLines[q].remove();
      segs.forEach(function (sg) {
        if (sg.length < 2) return;
        var sl = svgEl("polyline", { points: sg.join(" "), fill: "none",
          stroke: "var(--m-accent-strong)", "stroke-width": 2.5, "class": "pp-seg" });
        svg.insertBefore(sl, coordLab);
      });
      line.setAttribute("points", "");
      // 最新点坐标标注
      if (k > 0 && isFinite(ys[k - 1])) {
        coordLab.setAttribute("visibility", "visible");
        coordLab.textContent = "(" + fmt(xs[k - 1]) + ", " + fmt(ys[k - 1]) + ")";
        var lx = X(xs[k - 1]) + 10;
        if (lx > W - 100) { lx = X(xs[k - 1]) - 10; coordLab.setAttribute("text-anchor", "end"); }
        else coordLab.setAttribute("text-anchor", "start");
        coordLab.setAttribute("x", lx.toFixed(1));
        coordLab.setAttribute("y", (Y(ys[k - 1]) - 10).toFixed(1));
      } else {
        coordLab.setAttribute("visibility", "hidden");
      }
      // 状态文案
      if (k >= n) {
        status.innerHTML = '<span class="ix-success">🎉 ' + n +
          " 个点连成了一条曲线——这就是描点法画图像！</span>";
        tickSound(); hapticTick();
      } else if (k > 0) {
        status.innerHTML = '<span class="ix-hint">已点亮 ' + k + " / " + n +
          " 个点，继续拖滑块或点自动播放</span>";
      } else {
        status.innerHTML = '<span class="ix-hint">拖滑块逐个点亮坐标点，看它们连成曲线</span>';
      }
    }
    playBtn.addEventListener("click", function () { timer ? stop() : play(); });
    resetBtn.addEventListener("click", function () { stop(); setLit(0); });
    input.addEventListener("input", function () { stop(); setLit(Number(input.value)); });  // 用户接管

    setLit(0);
    if (params.autoPlay !== false) play();  // schema 默认 true
  }

  /* ============================================================
   * 5. side-compare 并排对比
   * params: {left:{kind,params}, right:{kind,params}, sync?, labels?}
   *
   * 左右两栏：kind==="slider-lab" 时用简化版 slider-lab（sliderLabCore），
   * 栏内 params 含 target/targetLabel 时复用与 slider-lab 完全相同的
   * attachTargetFeedback（🎯 旗帜 + r===target 命中反馈）；无 target 的栏布局不变。
   * kind 为其它已注册类型（如 plot-points）时查表调用其渲染器，
   * params 原样透传（plot-points 的 autoPlay 定时器用 wrap 闭包 + 切页保护，
   * 两栏实例互不干扰；SVG 有 max-width:100%，窄栏自适应）。
   * 未知 kind 走占位分支，不抛错。
   * sync 列出的参数名：同名滑块联动（拖一边，另一边跟着动）。
   * 约束：不允许嵌套 side-compare。
   * ============================================================ */
  function renderSideCompare(container, params) {
    if (!params.left || !params.right) {
      container.appendChild(el("div", "ix-stub", "参数错误：需要 left 与 right"));
      return;
    }
    var wrap = el("div", "ix-compare");
    wrap.style.cssText = "display:flex;gap:12px;flex-wrap:wrap;";
    var cfgs = [params.left, params.right];
    var titles = params.labels || ["左", "右"];
    var cores = [];
    cfgs.forEach(function (cfg, i) {
      var col = el("div", "ix-compare-col");
      col.style.cssText = "flex:1 1 220px;min-width:0;";
      var t = el("div", "ix-compare-title", esc(titles[i] || ("图" + (i + 1))));
      t.style.cssText = "font-weight:bold;margin-bottom:2px;";
      col.appendChild(t);
      if (cfg && cfg.kind === "slider-lab") {
        var scParams = cfg.params || {};
        var scCore = sliderLabCore(col, scParams);
        // 目标语义打通：栏内含 target 时复用与 renderSliderLab 相同的旗帜+命中反馈
        if (scParams.target !== undefined && scParams.target !== null) {
          attachTargetFeedback(scCore.wrap, scParams, scCore);
        }
        cores.push(scCore);
      } else if (cfg && cfg.kind === "plot-points") {
        // 内嵌 plot-points：查表调用已注册渲染器，params 原样透传
        ixByType["plot-points"](col, cfg.params || {});
        cores.push(null);  // plot-points 无 getResult/onInput，同步行跳过该栏
      } else {
        var stub = el("div", "ix-stub", "暂不支持内嵌类型：" + esc(cfg && cfg.kind));
        col.appendChild(stub);
        cores.push(null);
      }
      wrap.appendChild(col);
    });
    // 底部同步状态行
    var syncLine = el("div", "ix-status", "");
    syncLine.style.flexBasis = "100%";
    wrap.appendChild(syncLine);
    container.appendChild(wrap);

    var syncLabels = params.sync || [];
    var syncing = false;  // 防回环
    function updateSyncLine() {
      var parts = [], vals = [];
      cores.forEach(function (c, i) {
        if (!c) return;
        vals.push(c.getResult());
        parts.push("图" + (i + 1) + " = " + fmt(c.getResult()));
      });
      var same = vals.length === 2 && vals[0] === vals[1];
      syncLine.innerHTML = '<span class="' + (same ? "ix-success" : "ix-hint") + '">' +
        esc(parts.join("，")) + (same ? " ✅ 两边相等" : "") + "</span>";
    }
    cores.forEach(function (c, i) {
      if (!c) return;
      var myLabel = (cfgs[i].params || {}).label;
      c.onInput(function (v) {
        if (!syncing && syncLabels.indexOf(myLabel) !== -1) {
          syncing = true;
          cores.forEach(function (o, j) {
            if (o && j !== i && (cfgs[j].params || {}).label === myLabel) o.setValue(v);
          });
          syncing = false;
        }
        updateSyncLine();
      });
    });
    updateSyncLine();
  }

  /* ============================================================
   * 6. numeric-lab 数值实验台
   * params: {mode, term, maxSteps, buttonLabel?, showTrend?}
   * mode: accumulate（逐项累加，如棋盘麦粒）/ iterate（只看每一项）/
   *       input（输入 n 看第 n 项）
   * 点按钮（输数），看趋势。适用：等比求和、极限、无穷级数、试解。
   * term 走 evalExpr 白名单（含 ^ 与变量 n），大数字千分位显示。
   * ============================================================ */
  function fmtInt(n) {
    if (!isFinite(n)) return "—";
    if (Math.abs(n - Math.round(n)) > 1e-9) return fmt(n);
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function renderNumericLab(container, params) {
    var mode = params.mode || "accumulate";
    var term = params.term || "";
    var maxSteps = Math.min(Math.max(parseInt(params.maxSteps, 10) || 20, 1), 50);
    var buttonLabel = params.buttonLabel || "加一步";
    var showTrend = params.showTrend !== false;
    var stepWord = mode === "accumulate" ? "格" : "项";
    // 精度参数：小数位数，缺省 3（与全局 fmt 一致）；如极限实验需要
    // 更多小数位（"永远差一点"教学点），课程数据可传 precision: 6
    var precision = parseInt(params.precision, 10);
    if (!isFinite(precision) || precision < 0) precision = 3;
    function fmtP(n) {
      if (!isFinite(n)) return "—";
      var m = Math.pow(10, precision);
      return String(Math.round(n * m) / m);
    }
    function fmtIntP(n) {
      if (!isFinite(n)) return "—";
      if (Math.abs(n - Math.round(n)) > 1e-9) return fmtP(n);
      return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var n = 0, sum = 0, terms = [];

    // 行构建器：字符串按原文追加，元素保持引用（innerHTML 解析出的节点
    // 拿不到引用，且不利于无头测试，故显式 append）
    function textRow() {
      var d = el("div", "ix-expr-line");
      for (var i = 0; i < arguments.length; i++) {
        var a = arguments[i];
        d.appendChild(typeof a === "string" ? document.createTextNode(a) : a);
      }
      return d;
    }

    var wrap = el("div", "ix-numeric");
    var status = el("div", "ix-status", "");

    var progSpan = el("span", "ix-val", "0");
    var lineProg = textRow("通项 ", el("span", "ix-expr", esc(term || "—")),
      " · 已放 ", progSpan, " / " + maxSteps + " " + stepWord);

    var nCurSpan = el("span", "ix-val", "—");
    var curSpan = el("span", "ix-val", "—");
    var lineCur = textRow("第 ", nCurSpan, " " + stepWord + "：", curSpan, " 粒");

    var sumSpan = el("span", "ix-val", "0");
    var lineSum = textRow("累计：", sumSpan, " 粒");

    var inputEl = null;
    if (mode === "input") {
      inputEl = document.createElement("input");
      inputEl.type = "number";
      inputEl.setAttribute("style", "width:5em;font-size:1rem;");
    }

    var goBtn = el("button", "ix-reset", esc(buttonLabel));
    goBtn.type = "button";
    goBtn.setAttribute("data-k", "go");
    var resetBtn = el("button", "ix-reset", "↺ 重来");
    resetBtn.type = "button";
    var foot = el("div", "ix-foot");
    if (inputEl) foot.appendChild(inputEl);
    foot.appendChild(goBtn);
    foot.appendChild(resetBtn);

    wrap.appendChild(lineProg);
    wrap.appendChild(lineCur);
    if (mode === "accumulate") wrap.appendChild(lineSum);
    wrap.appendChild(status);
    wrap.appendChild(foot);
    container.appendChild(wrap);

    // 趋势判断：最近两次"相邻比"是否稳定，是则返回该比值
    function stableRatio() {
      if (terms.length < 3) return 0;
      var r1 = terms[terms.length - 1] / terms[terms.length - 2];
      var r0 = terms[terms.length - 2] / terms[terms.length - 3];
      if (!isFinite(r1) || !isFinite(r0)) return 0;
      return Math.abs(r1 - r0) <= 1e-9 * Math.max(1, Math.abs(r0)) ? r1 : 0;
    }

    function refresh() {
      progSpan.textContent = String(n);
      if (n >= maxSteps) {
        goBtn.disabled = true;
        var endWord = mode === "accumulate" ? "格放完了" :
                      (mode === "iterate" ? "项算完了" : "次试完了");
        status.innerHTML = '<span class="ix-success">🎉 ' + maxSteps + " " + endWord +
          (mode === "accumulate" ? "，累计 " + fmtIntP(sum) + " 粒" : "") + "</span>";
        return;
      }
      if (showTrend && mode !== "input") {
        if (n >= 2) {
          var r = terms[n - 1] / terms[n - 2];
          if (isFinite(r)) {
            var sr = stableRatio();
            status.innerHTML = sr
              ? '<span class="ix-success">每一' + stepWord + "都是上一" + stepWord +
                "的 " + fmtP(sr) + " 倍</span>"
              : '<span class="ix-hint">第 ' + n + stepWord + "是上一" + stepWord +
                "的 " + fmtP(r) + " 倍，继续点看规律</span>";
          }
        } else if (n === 1) {
          status.innerHTML = '<span class="ix-hint">继续点，看' +
            (mode === "accumulate" ? "累计数" : "每一项") + "怎么涨</span>";
        }
      } else if (n === 0) {
        status.innerHTML = '<span class="ix-hint">点「' + esc(buttonLabel) + "」开始</span>";
      }
    }

    function step() {
      if (goBtn.disabled || n >= maxSteps) return;
      if (mode === "input") {
        var k = inputEl ? parseFloat(inputEl.value) : NaN;
        if (!isFinite(k)) {
          status.innerHTML = '<span class="ix-hint">先输入一个数</span>';
          return;
        }
        n++;
        var tk = term ? evalExpr(term, "n", k) : k;
        terms.push(tk);
        nCurSpan.textContent = String(k);
        curSpan.textContent = fmtIntP(tk);
        tickSound(); hapticTick();
        refresh();
        return;
      }
      var t = evalExpr(term, "n", n + 1);
      if (!isFinite(t)) {
        status.innerHTML = '<span class="ix-hint">第 ' + (n + 1) + stepWord +
          "算不出来，检查通项写法</span>";
        return;
      }
      n++;
      if (mode === "accumulate") sum += t;
      terms.push(t);
      nCurSpan.textContent = String(n);
      curSpan.textContent = fmtIntP(t);
      if (mode === "accumulate") sumSpan.textContent = fmtIntP(sum);
      tickSound(); hapticTick();
      refresh();
    }

    function reset() {
      n = 0; sum = 0; terms = [];
      goBtn.disabled = false;
      if (inputEl) inputEl.value = "";
      progSpan.textContent = "0";
      nCurSpan.textContent = "—"; curSpan.textContent = "—";
      if (mode === "accumulate") sumSpan.textContent = "0";
      refresh();
    }

    goBtn.addEventListener("click", step);
    resetBtn.addEventListener("click", reset);
    refresh();
  }

  /* ---------------- 渲染器内嵌查表 ----------------
   * 与 window.MATH_INTERACTIONS 同源：注册时同步记一份本地表。
   * side-compare 内嵌时按 kind 查表调用已注册渲染器（不复制渲染器代码）。*/
  var ixByType = {};
  function ixRegister(type, fn) {
    ixByType[type] = fn;
    if (window.MATH_INTERACTIONS) window.MATH_INTERACTIONS.register(type, fn);
  }

  /* ---------------- 注册 ---------------- */
  ixRegister("slider-lab", renderSliderLab);
  ixRegister("balance-drag", renderBalanceDrag);
  ixRegister("linked-dashboard", renderLinkedDashboard);
  ixRegister("plot-points", renderPlotPoints);
  ixRegister("side-compare", renderSideCompare);
  ixRegister("numeric-lab", renderNumericLab);
})();
