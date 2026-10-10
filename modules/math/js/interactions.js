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
 *   subdivision       细分动画：档位切换，矩形逼近求和（右端点矩形和）
 *   shape-area        图形面积：拖正方形边长，看面积 x² 实时变化（数形结合）
 *   placeholder-morph 占位符渐变：□→△→x，算术→方程过渡（最小可用版本）
 *   zoomer            放大镜：级数按钮逐级放大看"变直"，配割线斜率读数（最小可用版本）
 *   slow-replay       慢动作回放：抛物线/追及轨迹逐帧播放，播放/暂停/重播/单步+时间轴
 *
 * 数学排版（蓝队 2026-10-10 修复）：交互内的表达式（expr/term/label/
 * 轴标签）统一走 window.MathExpr.html() —— ASCII 子集 → MathML
 * （MathML 可用时）/ HTML <sup>/<sub>（降级），解析失败回退转义
 * 纯文本。禁止出现 x^2 裸文本。见 js/expr-mathml.js。
 * ============================================================ */
(function () {
  "use strict";

  /* 表达式 → 数学排版 HTML（MathML / 降级 sup-sub / 回退纯文本） */
  function MX(s) {
    try {
      if (window.MathExpr) return window.MathExpr.html(s);
    } catch (e) {}
    return esc(s);
  }

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
    // 表达式显示（数学排版：x^2 → x²，禁止裸文本）
    var exprLine = el("div", "ix-expr-line",
      '<span class="ix-expr">' + MX(expr) + "</span>" +
      '<span class="ix-eq"> = </span>' +
      '<span class="ix-val">0</span>' +
      (params.unit ? ' <span class="ix-unit">' + esc(params.unit) + "</span>" : ""));
    var valSpan = exprLine.querySelector(".ix-val");
    // 滑块行
    var row = el("div", "ix-slider-row");
    var labSpan = el("span", "ix-slider-label", MX(label) + " = ");
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
          (perX !== null ? MX(lX[0].label || "x") + " = " + fmt(perX) : "左边共 " + lX.length + " 个 x = " + fmt(total)) +
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
          '<span class="ix-expr">' + MX(v.label || v.expr || "") + "</span>" +
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
      // SVG <text> 只能放纯文本，表达式用 <foreignObject> 包裹 HTML 数学排版
      // （与 HTML 上下文同一渲染器，保证 x^2 → x² 在 SVG 内同样生效）
      function axisLabel(x, y, w, h, align, expr) {
        var fo = svgEl("foreignObject", { x: x, y: y, width: w, height: h });
        var div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
        div.setAttribute("style", "font-size:13px;color:var(--m-ink-soft);" +
          "text-align:" + align + ";line-height:1.5;white-space:nowrap;");
        div.innerHTML = MX(expr);
        fo.appendChild(div);
        return fo;
      }
      svg.appendChild(axisLabel(W - mR - 176, H - 34, 172, 28, "right",
        pointViews[0].axisLabelX || pointViews[0].xExpr || "x"));
      svg.appendChild(axisLabel(2, 0, 176, 28, "left",
        pointViews[0].axisLabelY || pointViews[0].yExpr || "y"));
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
   * kind 为其它已注册类型（如 plot-points / shape-area）时查表调用其渲染器，
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
      } else if (cfg && cfg.kind === "shape-area") {
        // 内嵌 shape-area（蓝队 2026-10-10 缺陷C修复）：同 plot-points 模式，
        // 查表调用已注册渲染器，params 原样透传
        ixByType["shape-area"](col, cfg.params || {});
        cores.push(null);  // shape-area 无 getResult/onInput，同步行跳过该栏
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
    var lineProg = textRow("通项 ", el("span", "ix-expr", MX(term || "—")),
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

  /* ============================================================
   * 7. subdivision 细分动画
   * params: {fn, a, b, steps, showError?}
   * 右端点矩形和 S_n = dx·Σ f(a+i·dx)；档位按钮切换重绘矩形，
   * 显示当前和、真实值（细分估算）与误差。非法 params 给提示不崩溃。
   * ============================================================ */
  function renderSubdivision(container, params) {
    var NS = "http://www.w3.org/2000/svg";
    function svgEl(tag, attrs) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    var fn = String(params.fn == null ? "" : params.fn).trim();
    var a = Number(params.a), b = Number(params.b);
    if (!fn || !(a < b)) {
      container.appendChild(el("div", "ix-stub",
        "参数错误：subdivision 需要 fn 且 a < b（积分下限小于上限）"));
      return;
    }
    // 自变量名：fn 里出现独立的 x 用 x，否则独立的 t 用 t（兼容 "2*t"）
    var varName = /\bx\b/.test(fn) ? "x" : (/\bt\b/.test(fn) ? "t" : "x");
    function f(x) { return evalExpr(fn, varName, x); }
    var bad = false;
    [a, (a + b) / 2, b].forEach(function (v) { if (!isFinite(f(v))) bad = true; });
    if (bad) {
      container.appendChild(el("div", "ix-stub",
        "参数错误：fn 求值失败，请检查函数写法（自变量用 x 或 t）"));
      return;
    }
    // steps：去重、递增、只取前 4 档；非法时回退默认
    var steps = params.steps;
    var clean = [];
    if (Array.isArray(steps)) steps.forEach(function (s) {
      s = Math.round(Number(s));
      if (isFinite(s) && s > 0 && clean.indexOf(s) < 0) clean.push(s);
    });
    clean.sort(function (p, q) { return p - q; });
    clean = clean.slice(0, 4);
    if (clean.length === 0) clean = [4, 16, 64, 256];
    var showError = params.showError !== false;

    // 数字格式化：最多 4 位小数，去尾零
    function fmtS(n) {
      if (!isFinite(n)) return "—";
      return String(Math.round(n * 10000) / 10000);
    }
    // 右端点矩形和
    function rsum(n) {
      var dx = (b - a) / n, s = 0;
      for (var i = 1; i <= n; i++) s += f(a + i * dx);
      return s * dx;
    }
    // 真实值：用更细的档位做数值估算（显示保留 2 位小数）
    var trueApprox = rsum(Math.min(8192, Math.max.apply(null, clean) * 32));
    var trueShown = Math.round(trueApprox * 100) / 100;

    // 量程：采样取 y 范围
    var yMax = -Infinity, yMin = Infinity, sy;
    for (var si = 0; si <= 120; si++) {
      sy = f(a + (b - a) * si / 120);
      if (isFinite(sy)) { if (sy > yMax) yMax = sy; if (sy < yMin) yMin = sy; }
    }
    if (!isFinite(yMax)) { yMax = 1; yMin = 0; }
    if (yMax <= 0) yMax = 1;
    if (yMin > 0) yMin = 0;
    var yPad = (yMax - yMin) * 0.12 || 1;
    yMax += yPad; yMin -= yPad * 0.2;

    var W = 420, H = 300, mL = 38, mR = 12, mT = 14, mB = 30;
    var x0 = a - (b - a) * 0.06, x1 = b + (b - a) * 0.06;
    function X(v) { return mL + (v - x0) / (x1 - x0) * (W - mL - mR); }
    function Y(v) { return mT + (1 - (v - yMin) / (yMax - yMin)) * (H - mT - mB); }

    var wrap = el("div", "ix-plot");
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, "class": "ix-svg" });
    svg.style.maxWidth = "100%";
    // x 轴（y=0）
    svg.appendChild(svgEl("line", { x1: mL, y1: Y(0), x2: W - mR, y2: Y(0),
      stroke: "var(--m-line)", "stroke-width": 1.5 }));
    // y 轴画在 x=a 处
    svg.appendChild(svgEl("line", { x1: X(a), y1: mT, x2: X(a), y2: H - mB,
      stroke: "var(--m-line)", "stroke-width": 1.5 }));
    // 矩形组（档位切换时重建；先于曲线加入，压在曲线下方）
    var gRects = svgEl("g", {});
    svg.appendChild(gRects);
    // 曲线
    var pts = [];
    for (var ci = 0; ci <= 120; ci++) {
      var cx = a + (b - a) * ci / 120, cy = f(cx);
      if (isFinite(cy)) pts.push(X(cx).toFixed(1) + "," + Y(cy).toFixed(1));
    }
    svg.appendChild(svgEl("polyline", { points: pts.join(" "), fill: "none",
      stroke: "var(--m-accent-strong)", "stroke-width": 2.5 }));
    // a/b 刻度
    var labA = svgEl("text", { x: X(a), y: H - 10, "text-anchor": "middle",
      fill: "var(--m-ink-soft)", "font-size": 13 });
    labA.textContent = fmtS(a);
    svg.appendChild(labA);
    var labB = svgEl("text", { x: X(b), y: H - 10, "text-anchor": "middle",
      fill: "var(--m-ink-soft)", "font-size": 13 });
    labB.textContent = fmtS(b);
    svg.appendChild(labB);
    wrap.appendChild(svg);

    // 读数行
    var status = el("div", "ix-status", "");
    wrap.appendChild(status);
    // 误差条
    var errFill = null;
    if (showError) {
      var errBar = el("div", "", "");
      errBar.style.cssText = "height:10px;background:var(--m-line-soft,#e8e8e8);" +
        "border-radius:5px;overflow:hidden;margin:2px 0 6px;";
      errFill = el("div", "", "");
      errFill.style.cssText = "height:100%;width:0;background:var(--m-accent);" +
        "border-radius:5px;transition:width .25s;";
      errBar.appendChild(errFill);
      wrap.appendChild(errBar);
    }

    // 各档位和、误差预计算
    var sums = {}, errOf = {}, maxErr = 0;
    clean.forEach(function (n) {
      sums[n] = rsum(n);
      errOf[n] = Math.abs(sums[n] - trueShown);
      if (errOf[n] > maxErr) maxErr = errOf[n];
    });

    // 档位按钮行
    var foot = el("div", "ix-foot", "");
    foot.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;align-items:center;";
    var btns = [];
    clean.forEach(function (n) {
      var bt = el("button", "ix-reset", "n = " + n);
      bt.type = "button";
      bt.addEventListener("click", function () { draw(n); tickSound(); hapticTick(); });
      foot.appendChild(bt);
      btns.push(bt);
    });
    wrap.appendChild(foot);
    container.appendChild(wrap);

    function draw(n) {
      // 重建矩形
      while (gRects.firstChild) gRects.removeChild(gRects.firstChild);
      var dx = (b - a) / n;
      for (var i = 1; i <= n; i++) {
        var xl = a + (i - 1) * dx, xr = a + i * dx, v = f(xr);
        if (!isFinite(v)) continue;
        var yTop = Y(Math.max(v, 0)), yBot = Y(Math.min(v, 0));
        gRects.appendChild(svgEl("rect", {
          x: X(xl).toFixed(2), y: yTop.toFixed(2),
          width: Math.max(0.2, X(xr) - X(xl)).toFixed(2),
          height: Math.max(0.2, yBot - yTop).toFixed(2),
          fill: "var(--m-accent)", opacity: 0.32
        }));
      }
      // 按钮高亮
      clean.forEach(function (m, idx) {
        var on = (m === n);
        btns[idx].style.fontWeight = on ? "bold" : "";
        btns[idx].style.borderColor = on ? "var(--m-accent-strong)" : "";
        btns[idx].style.boxShadow = on ? "0 0 0 2px var(--m-accent-soft,#ffd)" : "";
      });
      // 读数：n=256：和=16.0625；真实值≈16；误差≈0.0625
      var html = "n=" + n + "：和=" + fmtS(sums[n]) +
        "；真实值≈" + fmtS(trueShown);
      if (showError) html += "；误差≈" + fmtS(errOf[n]);
      status.innerHTML = html;
      if (errFill) errFill.style.width =
        (maxErr > 0 ? (errOf[n] / maxErr * 100).toFixed(1) : 0) + "%";
    }
    draw(clean[0]);
  }

  /* ============================================================
   * 8. shape-area 图形面积
   * params: {min, max, step, label?, initial?, unit?, showGrid?}
   *
   * 可拖动的正方形：边长 x 变化时面积 x² 实时显示，
   * 演示"平方就是正方形面积"的数形结合。整数边长（1–10）
   * 时叠加单位网格，可数格子验证面积。
   * 右下角手柄拖拽 + 下方滑块双向同步；零依赖 SVG，一屏内。
   * ============================================================ */
  function renderShapeArea(container, params) {
    var NS = "http://www.w3.org/2000/svg";
    function svgEl(tag, attrs) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    var min = Number(params.min), max = Number(params.max);
    var step = Number(params.step) || 1;
    if (!(min < max) || !(step > 0) || !(min >= 0)) {
      container.appendChild(el("div", "ix-stub",
        "参数错误：shape-area 需要 0 ≤ min < max 且 step > 0"));
      return;
    }
    var vName = params.label || "x";
    var showGrid = params.showGrid !== false;
    var unit = params.unit || "";
    function snap(v) {
      v = Math.min(max, Math.max(min, v));
      var s = Math.round((v - min) / step) * step + min;
      return Math.round(s * 1e9) / 1e9;  // 去浮点噪声
    }
    var init = params.initial !== undefined && params.initial !== null &&
      isFinite(Number(params.initial)) ? snap(Number(params.initial)) : min;

    var wrap = el("div", "ix-shape");

    // —— 读数行（DOM 拼接，避免 "面积 = x^2" 混排被整体回退） ——
    function htmlSpan(h) {
      var s = el("span", "", "");
      s.innerHTML = h;
      return s;
    }
    var line1 = el("div", "ix-expr-line");
    line1.appendChild(document.createTextNode("边长 "));
    line1.appendChild(htmlSpan(MX(vName)));
    line1.appendChild(document.createTextNode(" = "));
    var sideVal = el("span", "ix-val", "");
    line1.appendChild(sideVal);
    if (unit) line1.appendChild(document.createTextNode(" " + unit));
    var line2 = el("div", "ix-expr-line");
    line2.appendChild(document.createTextNode("面积 = "));
    line2.appendChild(htmlSpan(MX(vName + "^2")));
    line2.appendChild(document.createTextNode(" = "));
    var areaVal = el("span", "ix-val", "");
    line2.appendChild(areaVal);
    if (unit) line2.appendChild(document.createTextNode(" " + unit + "²"));
    wrap.appendChild(line1);
    wrap.appendChild(line2);

    // —— SVG ——
    var W = 420, H = 300;
    var SX = 70, SY = 20;          // 正方形左上锚点
    var L_MIN = 36, L_MAX = 216;   // 边长 px 范围
    function Lof(x) { return L_MIN + (x - min) / (max - min) * (L_MAX - L_MIN); }
    function XofL(L) { return snap(min + (L - L_MIN) / (L_MAX - L_MIN) * (max - min)); }

    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, "class": "ix-svg" });
    svg.style.maxWidth = "100%";
    var rect = svgEl("rect", { x: SX, y: SY, "class": "sa-square" });
    svg.appendChild(rect);
    var gridG = svgEl("g", { "class": "sa-grid" });
    svg.appendChild(gridG);
    // 底边尺寸标注线
    var dimY = 0;
    var dimLine = svgEl("line", { "class": "sa-dim" });
    var dimT1 = svgEl("line", { "class": "sa-dim" });
    var dimT2 = svgEl("line", { "class": "sa-dim" });
    svg.appendChild(dimLine); svg.appendChild(dimT1); svg.appendChild(dimT2);
    var dimFo = svgEl("foreignObject", { width: 200, height: 30 });
    var dimDiv = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
    dimDiv.setAttribute("style", "font-size:14px;text-align:center;color:var(--m-ink);" +
      "line-height:1.4;white-space:nowrap;");
    dimFo.appendChild(dimDiv);
    svg.appendChild(dimFo);
    // 拖拽手柄（右下角）
    var handle = svgEl("circle", { r: 11, "class": "sa-handle" });
    handle.style.cursor = "nwse-resize";
    handle.style.touchAction = "none";
    svg.appendChild(handle);
    var handleHint = svgEl("text", {
      x: 0, y: 0, "text-anchor": "middle", "class": "sa-handle-hint"
    });
    handleHint.textContent = "⇲";
    svg.appendChild(handleHint);
    wrap.appendChild(svg);

    // —— 滑块（与拖拽双向同步） ——
    var row = el("div", "ix-slider-row");
    var labSpan = el("span", "ix-slider-label", "");
    labSpan.innerHTML = MX(vName) + " = ";
    var valLab = el("span", "ix-slider-val", "");
    var input = document.createElement("input");
    input.type = "range";
    input.min = min; input.max = max; input.step = step;
    input.className = "ix-range";
    input.setAttribute("aria-label", "边长 " + vName);
    row.appendChild(labSpan); row.appendChild(input); row.appendChild(valLab);
    wrap.appendChild(row);

    var status = el("div", "ix-status", "");
    wrap.appendChild(status);
    container.appendChild(wrap);

    function svgPoint(evt) {
      var pt = svg.createSVGPoint();
      pt.x = evt.clientX; pt.y = evt.clientY;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    }

    var cur = init;
    function draw() {
      var L = Lof(cur);
      rect.setAttribute("width", L.toFixed(1));
      rect.setAttribute("height", L.toFixed(1));
      // 网格：整数边长 1–10 时画单位格
      while (gridG.firstChild) gridG.removeChild(gridG.firstChild);
      var xi = Math.round(cur);
      if (showGrid && Math.abs(cur - xi) < 1e-9 && xi >= 1 && xi <= 10) {
        var u = L / xi;
        for (var i = 1; i < xi; i++) {
          gridG.appendChild(svgEl("line", {
            x1: (SX + i * u).toFixed(1), y1: SY,
            x2: (SX + i * u).toFixed(1), y2: (SY + L).toFixed(1),
            "class": "sa-grid-line"
          }));
          gridG.appendChild(svgEl("line", {
            x1: SX, y1: (SY + i * u).toFixed(1),
            x2: (SX + L).toFixed(1), y2: (SY + i * u).toFixed(1),
            "class": "sa-grid-line"
          }));
        }
      }
      // 尺寸标注
      dimY = SY + L + 16;
      dimLine.setAttribute("x1", SX); dimLine.setAttribute("y1", dimY);
      dimLine.setAttribute("x2", SX + L); dimLine.setAttribute("y2", dimY);
      dimT1.setAttribute("x1", SX); dimT1.setAttribute("y1", dimY - 5);
      dimT1.setAttribute("x2", SX); dimT1.setAttribute("y2", dimY + 5);
      dimT2.setAttribute("x1", SX + L); dimT2.setAttribute("y1", dimY - 5);
      dimT2.setAttribute("x2", SX + L); dimT2.setAttribute("y2", dimY + 5);
      dimFo.setAttribute("x", SX + L / 2 - 100);
      dimFo.setAttribute("y", dimY + 4);
      dimDiv.innerHTML = MX(vName) + " = " + fmt(cur);
      // 手柄
      handle.setAttribute("cx", SX + L);
      handle.setAttribute("cy", SY + L);
      handleHint.setAttribute("x", SX + L);
      handleHint.setAttribute("y", SY + L + 5);
      // 读数
      sideVal.textContent = fmt(cur);
      valLab.textContent = fmt(cur);
      areaVal.textContent = fmt(Math.round(cur * cur * 1e9) / 1e9);
      // 状态文案
      if (showGrid && Math.abs(cur - Math.round(cur)) < 1e-9 &&
          Math.round(cur) >= 1 && Math.round(cur) <= 10) {
        status.innerHTML = '<span class="ix-hint">数一数：正方形里有 ' +
          fmt(cur * cur) + " 个 1×1 小格——面积就是 " + fmt(cur) + "²</span>";
      } else {
        status.innerHTML = '<span class="ix-hint">拖右下角 ⇲ 或拉滑块，' +
          "看边长与面积一起变</span>";
      }
    }

    function setX(v, fromSlider) {
      cur = snap(v);
      if (!fromSlider) input.value = cur;
      draw();
    }
    input.addEventListener("input", function () { setX(Number(input.value), true); });

    // 手柄拖拽（对角线方向取 max，自然）
    var dragging = false;
    handle.addEventListener("pointerdown", function (evt) {
      evt.preventDefault();
      dragging = true;
      try { handle.setPointerCapture(evt.pointerId); } catch (e) {}
    });
    handle.addEventListener("pointermove", function (evt) {
      if (!dragging) return;
      var p = svgPoint(evt);
      var L = Math.max(p.x - SX, p.y - SY);
      L = Math.min(L_MAX, Math.max(L_MIN, L));
      setX(XofL(L), false);
    });
    function endDrag() { dragging = false; }
    handle.addEventListener("pointerup", endDrag);
    handle.addEventListener("pointercancel", endDrag);

    input.value = init;
    draw();
  }

  /* ============================================================
   * 9. placeholder-morph 占位符渐变（蓝队 2026-10-10 缺陷B修复：最小可用版本）
   * params: {stages: ["□","△","x"], expr: "□ + 5 = 12", autoPlay?, interval?}
   *
   * 表达式中的首阶段符号逐阶段替换为当前阶段符号，演示
   * "占位符 → 未知数 x"的算术→方程过渡。
   * 自动播放（默认开）+ 手动"下一步" + 点表达式切换；到终点自动停。
   * ============================================================ */
  function renderPlaceholderMorph(container, params) {
    var stages = params.stages || [];
    var expr = String(params.expr == null ? "" : params.expr);
    if (stages.length < 2 || !expr || expr.indexOf(stages[0]) < 0) {
      container.appendChild(el("div", "ix-stub",
        "参数错误：placeholder-morph 需要 stages（≥2 阶段）且 expr 含首阶段符号"));
      return;
    }
    var interval = Math.max(400, Number(params.interval) || 1200);
    var wrap = el("div", "ix-morph");

    // 阶段符号条
    var chipsRow = el("div", "ix-morph-stages");
    var chips = stages.map(function (s, i) {
      var c = el("span", "ix-morph-chip", esc(s));
      chipsRow.appendChild(c);
      return c;
    });
    wrap.appendChild(chipsRow);

    // 大字表达式（首阶段符号替换为当前阶段符号；□/△ 等非 ASCII 走 MX 回退转义，安全）
    var exprLine = el("div", "ix-morph-expr", "");
    exprLine.style.cursor = "pointer";
    exprLine.setAttribute("role", "button");
    exprLine.setAttribute("aria-label", "点我切换到下一阶段");
    wrap.appendChild(exprLine);

    var status = el("div", "ix-status", "");
    wrap.appendChild(status);

    var foot = el("div", "ix-foot");
    var playBtn = el("button", "ix-reset", "⏸ 暂停");
    playBtn.type = "button";
    var nextBtn = el("button", "ix-reset", "下一步 →");
    nextBtn.type = "button";
    foot.appendChild(playBtn); foot.appendChild(nextBtn);
    wrap.appendChild(foot);
    container.appendChild(wrap);

    var idx = 0, timer = null;
    function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
    function show(i) {
      idx = i;
      var cur = stages[idx];
      exprLine.innerHTML = MX(expr.replace(new RegExp(escRe(stages[0]), "g"), cur));
      chips.forEach(function (c, j) { c.classList.toggle("on", j === idx); });
      if (idx === 0) {
        status.innerHTML = '<span class="ix-hint">第 1 步：先用方框 □ 占住这个不知道的数</span>';
      } else if (idx === stages.length - 1) {
        status.innerHTML = '<span class="ix-success">🎉 最后一步：把占位符换成字母 ' +
          esc(cur) + "，这就是代数里的未知数！</span>";
      } else {
        status.innerHTML = '<span class="ix-hint">第 ' + (idx + 1) +
          " 步：占位符变成 " + esc(cur) + "</span>";
      }
      playBtn.textContent = timer ? "⏸ 暂停" : "▶ 自动播放";
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      show(idx);
    }
    function play() {
      stop();
      if (idx >= stages.length - 1) idx = 0;  // 到终点再点播放：从头重来
      show(idx);
      timer = setInterval(function () {
        if (!document.body.contains(wrap)) { stop(); return; }  // 已切页，停
        if (idx >= stages.length - 1) { stop(); tickSound(); return; }
        show(idx + 1);
      }, interval);
    }
    function step() { stop(); show(idx >= stages.length - 1 ? 0 : idx + 1); }
    playBtn.addEventListener("click", function () { timer ? stop() : play(); });
    nextBtn.addEventListener("click", step);
    exprLine.addEventListener("click", step);

    show(0);
    if (params.autoPlay !== false) play();  // schema 默认 true
  }

  /* ============================================================
   * 10. zoomer 放大镜（蓝队 2026-10-10 缺陷B修复：最小可用版本）
   * params: {fn: "x^2", center: 1, levels: 4, window: 2, caption?}
   *
   * 级别按钮切换放大级数：每级窗口半宽减半（window/2^(k-1)），
   * 重采样绘制曲线，配窗口两端割线斜率读数——直观看到
   * "放大到足够大，曲线看起来像直线"（割线逼近切线）。
   * 求值复用 evalExpr（fn 为 x 的表达式，LaTeX 子集）。
   * ============================================================ */
  function renderZoomer(container, params) {
    var fn = String(params.fn == null ? "" : params.fn);
    var center = Number(params.center);
    var levels = Math.max(2, Math.min(6, Math.round(Number(params.levels)) || 4));
    var halfW = Number(params.window);
    var caption = params.caption || "";
    if (!fn || !isFinite(center) || !(halfW > 0)) {
      container.appendChild(el("div", "ix-stub",
        "参数错误：zoomer 需要 fn、center 与正数 window"));
      return;
    }
    if (!isFinite(evalExpr(fn, "x", center))) {
      container.appendChild(el("div", "ix-stub",
        "zoomer：表达式在放大中心处无法求值：" + esc(fn)));
      return;
    }
    var NS = "http://www.w3.org/2000/svg";
    function svgEl(tag, attrs) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    var wrap = el("div", "ix-zoomer");
    var fnLine = el("div", "ix-expr-line", "");
    fnLine.innerHTML = "y = " + MX(fn);
    fnLine.style.marginBottom = "2px";
    wrap.appendChild(fnLine);

    var W = 440, H = 236, PAD = 32;
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, "class": "ix-svg" });
    svg.style.maxWidth = "100%";
    var axesG = svgEl("g", {}); svg.appendChild(axesG);
    var curve = svgEl("path", { fill: "none", stroke: "var(--m-accent-strong)",
      "stroke-width": 2.5 });
    svg.appendChild(curve);
    var secant = svgEl("line", { stroke: "#15803d", "stroke-width": 2,
      "stroke-dasharray": "6 4" });
    svg.appendChild(secant);
    var winLab = svgEl("text", { x: W / 2, y: H - 6, "text-anchor": "middle",
      "font-size": 12, fill: "var(--m-ink-soft)" });
    svg.appendChild(winLab);
    wrap.appendChild(svg);

    var status = el("div", "ix-status", "");
    wrap.appendChild(status);

    var foot = el("div", "ix-foot");
    var btns = [];
    for (var L = 1; L <= levels; L++) {
      (function (lv) {
        var b = el("button", "ix-reset", "第 " + lv + " 级");
        b.type = "button";
        b.addEventListener("click", function () { draw(lv); });
        foot.appendChild(b); btns.push(b);
      })(L);
    }
    wrap.appendChild(foot);
    if (caption) {
      var cap = el("div", "ix-hint", esc(caption));
      cap.style.textAlign = "center"; cap.style.marginTop = "4px";
      wrap.appendChild(cap);
    }
    container.appendChild(wrap);

    function draw(level) {
      var hw = halfW / Math.pow(2, level - 1);
      var N = 90, xs = [], ys = [];
      for (var i = 0; i < N; i++) {
        var x = center - hw + 2 * hw * i / (N - 1);
        xs.push(x); ys.push(evalExpr(fn, "x", x));
      }
      var valid = ys.filter(isFinite);
      if (!valid.length) {
        status.innerHTML = '<span class="ix-hint">该窗口内函数无有效值</span>';
        return;
      }
      var yMin = Math.min.apply(null, valid), yMax = Math.max.apply(null, valid);
      if (yMax - yMin < 1e-9) { yMin -= 1; yMax += 1; }
      var pad = (yMax - yMin) * 0.12;
      yMin -= pad; yMax += pad;
      function X(v) { return PAD + (v - (center - hw)) / (2 * hw) * (W - 2 * PAD); }
      function Y(v) { return H - PAD - (v - yMin) / (yMax - yMin) * (H - 2 * PAD); }
      // 坐标轴（x=center 竖线；y=0 横线，仅在范围内画）
      while (axesG.firstChild) axesG.removeChild(axesG.firstChild);
      var axC = svgEl("line", { x1: X(center), y1: PAD, x2: X(center), y2: H - PAD,
        stroke: "var(--m-line)", "stroke-width": 1.5 });
      axesG.appendChild(axC);
      if (yMin <= 0 && 0 <= yMax) {
        var ax0 = svgEl("line", { x1: PAD, y1: Y(0), x2: W - PAD, y2: Y(0),
          stroke: "var(--m-line)", "stroke-width": 1.5 });
        axesG.appendChild(ax0);
      }
      // 曲线：按有限点分段，避免跨间断点连笔
      var segs = [[]];
      for (var j = 0; j < N; j++) {
        if (isFinite(ys[j])) {
          segs[segs.length - 1].push(X(xs[j]).toFixed(1) + "," + Y(ys[j]).toFixed(1));
        } else if (segs[segs.length - 1].length) { segs.push([]); }
      }
      var d = "";
      segs.forEach(function (sg) { if (sg.length > 1) d += "M" + sg.join(" L"); });
      curve.setAttribute("d", d);
      // 窗口两端割线 + 斜率读数
      var x0 = center - hw, x1 = center + hw;
      var y0 = evalExpr(fn, "x", x0), y1 = evalExpr(fn, "x", x1);
      var slope = (isFinite(y0) && isFinite(y1)) ? (y1 - y0) / (2 * hw) : NaN;
      if (isFinite(slope)) {
        secant.setAttribute("x1", X(x0)); secant.setAttribute("y1", Y(y0));
        secant.setAttribute("x2", X(x1)); secant.setAttribute("y2", Y(y1));
        secant.style.visibility = "visible";
      } else { secant.style.visibility = "hidden"; }
      winLab.textContent = "x ∈ [" + fmt(x0) + ", " + fmt(x1) + "]";
      status.innerHTML = '<span class="' + (level >= 3 ? "ix-success" : "ix-hint") +
        '">第 ' + level + " 级：窗口半宽 " + fmt(hw) +
        "，割线斜率 ≈ " + (isFinite(slope) ? fmt(slope) : "—") +
        (level >= 3 ? " —— 曲线看起来越来越像直线了！" : "") + "</span>";
      btns.forEach(function (b, i) {
        b.style.fontWeight = (i === level - 1) ? "bold" : "";
        b.style.borderColor = (i === level - 1) ? "var(--m-accent-strong)" : "";
      });
    }
    draw(1);
  }

  /* ============================================================
   * 11. slow-replay 慢动作回放
   * params: {frames, duration, draw:{kind,params}, scrubber?}
   * kind: "projectile"（抛物线：v0 初速 m/s、angle 角度、g 重力）/
   *       "pursuit"（追及：vFront 前车速、vBack 后车速须>vFront、gap 初始距离 m）
   *
   * 轨迹逐帧播放：播放/暂停/重播/单步 + 时间轴 scrubber。
   * 关键事件（落地/追上）高亮 + 音效震动反馈。
   * ============================================================ */
  function renderSlowReplay(container, params) {
    var NS = "http://www.w3.org/2000/svg";
    function svgEl(tag, attrs) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    var frames = Math.max(2, Math.min(120, Math.round(Number(params.frames)) || 60));
    var duration = Math.max(500, Math.min(5000, Number(params.duration) || 3000));
    var draw = params.draw || {};
    var kind = draw.kind;
    var dp = draw.params || {};
    var showScrubber = params.scrubber !== false;

    if (kind !== "projectile" && kind !== "pursuit") {
      container.appendChild(el("div", "ix-stub",
        "参数错误：slow-replay 的 draw.kind 须为 projectile 或 pursuit"));
      return;
    }

    /* ---- 物理模型 ---- */
    var model;
    if (kind === "projectile") {
      var v0 = Number(dp.v0); if (!isFinite(v0) || v0 <= 0) v0 = 20;
      var angleDeg = Number(dp.angle);
      if (!isFinite(angleDeg) || angleDeg <= 0 || angleDeg >= 90) angleDeg = 60;
      var g = Number(dp.g); if (!isFinite(g) || g <= 0) g = 9.8;
      var angle = angleDeg * Math.PI / 180;
      var vx = v0 * Math.cos(angle), vy = v0 * Math.sin(angle);
      var tFlight = 2 * vy / g;
      var range = vx * tFlight;
      var hMax = vy * vy / (2 * g);
      model = {
        tEnd: tFlight,
        pos: function (t) {
          return { x: vx * t, y: Math.max(0, vy * t - 0.5 * g * t * t) };
        },
        xMax: range, yMax: hMax,
        eventAt: function (t) { return t >= tFlight - 1e-9 ? "land" : null; },
        eventText: "🎯 落地！",
        caption: "初速 " + fmt(v0) + " m/s，角度 " + fmt(angleDeg) + "°，重力 " + fmt(g) + " m/s²"
      };
    } else {
      var vFront = Number(dp.vFront); if (!isFinite(vFront) || vFront < 0) vFront = 10;
      var vBack = Number(dp.vBack); if (!isFinite(vBack) || vBack <= 0) vBack = 15;
      var gap = Number(dp.gap); if (!isFinite(gap) || gap < 0) gap = 50;
      if (vBack <= vFront) {
        container.appendChild(el("div", "ix-stub",
          "参数错误：pursuit 需要 vBack > vFront（后车更快才能追上）"));
        return;
      }
      var tMeet = gap / (vBack - vFront);
      model = {
        tEnd: tMeet,
        pos: function (t) {
          return { front: gap + vFront * t, back: vBack * t };
        },
        xMax: gap + vFront * tMeet + gap * 0.25, yMax: 1,
        eventAt: function (t) { return t >= tMeet - 1e-9 ? "meet" : null; },
        eventText: "🎯 追上了！相遇处就是方程的解",
        caption: "前车 " + fmt(vFront) + " m/s，后车 " + fmt(vBack) + " m/s，相距 " + fmt(gap) + " m"
      };
    }

    /* ---- SVG ---- */
    var W = 440, H = 300, mL = 36, mR = 16, mT = 20, mB = 40;
    function X(v) { return mL + (v / model.xMax) * (W - mL - mR); }
    function Y(v) { return mT + (1 - v / (model.yMax * 1.18)) * (H - mT - mB); }

    var wrap = el("div", "ix-replay");
    wrap.appendChild(el("div", "ix-rule", esc(model.caption)));
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, "class": "ix-svg" });
    wrap.appendChild(svg);

    var groundY = kind === "projectile" ? Y(0) : H - mB;
    svg.appendChild(svgEl("line", {
      x1: mL, y1: groundY, x2: W - mR, y2: groundY,
      stroke: "var(--m-line)", "stroke-width": 2
    }));

    var trail = null, ball = null, carF = null, carB = null, meetMark = null;
    if (kind === "projectile") {
      // 完整轨迹（淡色虚线，供预判）
      var fullPts = [];
      for (var fi = 0; fi <= 60; fi++) {
        var ftt = model.tEnd * fi / 60;
        var fp = model.pos(ftt);
        fullPts.push(X(fp.x).toFixed(1) + "," + Y(fp.y).toFixed(1));
      }
      svg.appendChild(svgEl("polyline", {
        points: fullPts.join(" "), fill: "none",
        stroke: "var(--m-accent)", "stroke-width": 1.5,
        opacity: 0.35, "stroke-dasharray": "5,4"
      }));
      trail = svgEl("polyline", {
        points: "", fill: "none",
        stroke: "var(--m-accent-strong)", "stroke-width": 2.5
      });
      svg.appendChild(trail);
      ball = svgEl("circle", {
        r: 8, fill: "var(--m-accent-strong)", stroke: "#fff", "stroke-width": 2
      });
      svg.appendChild(ball);
      // 轴标签（数学排版经由 SVG text 纯文本即可，无公式）
      var xl = svgEl("text", { x: W - mR - 2, y: H - 8, "text-anchor": "end",
        fill: "var(--m-ink-soft)", "font-size": 13 });
      xl.textContent = "x (m)";
      svg.appendChild(xl);
    } else {
      var roadY = groundY;
      // 距离刻度
      var tick0 = svgEl("text", { x: mL, y: roadY + 22, "font-size": 11,
        fill: "var(--m-ink-soft)" });
      tick0.textContent = "0";
      svg.appendChild(tick0);
      function mkCar(color, label) {
        var gr = svgEl("g", {});
        gr.appendChild(svgEl("rect", { x: -22, y: -16, width: 44, height: 20,
          rx: 4, fill: color, stroke: "#fff", "stroke-width": 1.5 }));
        gr.appendChild(svgEl("rect", { x: -14, y: -24, width: 28, height: 10,
          rx: 3, fill: color, opacity: 0.7 }));
        gr.appendChild(svgEl("circle", { cx: -12, cy: 6, r: 5, fill: "#333" }));
        gr.appendChild(svgEl("circle", { cx: 12, cy: 6, r: 5, fill: "#333" }));
        var lb = svgEl("text", { "text-anchor": "middle", y: 24,
          "font-size": 12, fill: "var(--m-ink-soft)" });
        lb.textContent = label;
        gr.appendChild(lb);
        return gr;
      }
      carB = mkCar("var(--m-accent-strong)", "后车");
      carF = mkCar("var(--m-accent)", "前车");
      svg.appendChild(carB); svg.appendChild(carF);
      meetMark = svgEl("text", { "text-anchor": "middle",
        y: roadY - 36, "font-size": 24, visibility: "hidden" });
      meetMark.textContent = "💥";
      svg.appendChild(meetMark);
    }

    /* ---- 状态行 ---- */
    var status = el("div", "ix-status", "");
    wrap.appendChild(status);

    /* ---- Scrubber ---- */
    var scrub = null, scrubVal = null;
    if (showScrubber) {
      var sRow = el("div", "ix-slider-row");
      sRow.appendChild(el("span", "ix-slider-label", "t = "));
      scrub = document.createElement("input");
      scrub.type = "range";
      scrub.min = 0; scrub.max = frames; scrub.step = 1; scrub.value = 0;
      scrub.className = "ix-range";
      scrub.setAttribute("aria-label", "时间轴");
      scrubVal = el("span", "ix-slider-val", "0 s");
      sRow.appendChild(scrub); sRow.appendChild(scrubVal);
      wrap.appendChild(sRow);
    }

    /* ---- 按钮行 ---- */
    var foot = el("div", "ix-foot");
    foot.style.cssText = "display:flex;gap:8px;justify-content:center;flex-wrap:wrap;";
    var replayBtn = el("button", "ix-reset", "⏮ 重播"); replayBtn.type = "button";
    var prevBtn = el("button", "ix-reset", "◀ 单步"); prevBtn.type = "button";
    var playBtn = el("button", "ix-reset", "▶ 播放"); playBtn.type = "button";
    var nextBtn = el("button", "ix-reset", "单步 ▶"); nextBtn.type = "button";
    foot.appendChild(replayBtn); foot.appendChild(prevBtn);
    foot.appendChild(playBtn); foot.appendChild(nextBtn);
    wrap.appendChild(foot);
    container.appendChild(wrap);

    /* ---- 播放逻辑 ---- */
    var frame = 0, rafId = null, lastTs = 0;
    var msPerFrame = duration / frames;
    var announced = false;

    function drawFrame(f) {
      frame = Math.max(0, Math.min(frames, Math.round(f)));
      var t = model.tEnd * frame / frames;
      if (kind === "projectile") {
        var p = model.pos(t);
        ball.setAttribute("cx", X(p.x).toFixed(1));
        ball.setAttribute("cy", Y(p.y).toFixed(1));
        var tp = [];
        for (var i = 0; i <= frame; i++) {
          var tt = model.tEnd * i / frames;
          var pp = model.pos(tt);
          tp.push(X(pp.x).toFixed(1) + "," + Y(pp.y).toFixed(1));
        }
        trail.setAttribute("points", tp.join(" "));
      } else {
        var q = model.pos(t);
        carB.setAttribute("transform",
          "translate(" + X(q.back).toFixed(1) + "," + groundY + ")");
        carF.setAttribute("transform",
          "translate(" + X(q.front).toFixed(1) + "," + groundY + ")");
        var met = model.eventAt(t) === "meet";
        meetMark.setAttribute("visibility", met ? "visible" : "hidden");
        if (met) meetMark.setAttribute("x", X(q.back).toFixed(1));
      }
      if (scrub) scrub.value = frame;
      if (scrubVal) scrubVal.textContent = fmt(t) + " s";
      var ev = model.eventAt(t);
      if (ev) {
        status.innerHTML = '<span class="ix-success">' + esc(model.eventText) + "</span>";
        if (frame === frames && !announced) {
          announced = true;
          tickSound(); hapticTick();
        }
      } else {
        announced = false;
        status.innerHTML = '<span class="ix-hint">t = ' + fmt(t) +
          " s（" + frame + " / " + frames + " 帧）</span>";
      }
    }

    function stop() {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      playBtn.textContent = "▶ 播放";
    }
    function play() {
      stop();
      if (frame >= frames) drawFrame(0);
      lastTs = 0;
      playBtn.textContent = "⏸ 暂停";
      function tick(ts) {
        if (!document.body.contains(wrap)) { stop(); return; }
        if (!lastTs) lastTs = ts;
        var dt = ts - lastTs;
        lastTs = ts;
        var nf = frame + dt / msPerFrame;
        if (nf >= frames) { drawFrame(frames); stop(); return; }
        drawFrame(nf);
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
    }

    playBtn.addEventListener("click", function () { rafId ? stop() : play(); });
    replayBtn.addEventListener("click", function () { stop(); drawFrame(0); play(); });
    prevBtn.addEventListener("click", function () { stop(); drawFrame(frame - 1); });
    nextBtn.addEventListener("click", function () { stop(); drawFrame(frame + 1); });
    if (scrub) {
      scrub.addEventListener("input", function () { stop(); drawFrame(Number(scrub.value)); });
    }

    drawFrame(0);
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
  ixRegister("subdivision", renderSubdivision);
  ixRegister("shape-area", renderShapeArea);
  ixRegister("placeholder-morph", renderPlaceholderMorph);
  ixRegister("zoomer", renderZoomer);
  ixRegister("slow-replay", renderSlowReplay);
})();
