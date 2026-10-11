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
 *   vertex-drag       顶点拖拽（几何 G1）：拖三角形顶点，边长/角度读数实时更新
 *   angle-protractor  量角器（几何 G6）：旋转量角器测角，落定 flash+ripple 反馈
 *   step-play         分步播放（几何）：折叠/撕角/平移/作图步骤逐帧播放，◀/▶/⏯/↺
 *   tap-highlight     点击点亮分类（几何）：点元素按组高亮（组色+编号徽章双编码），
 *                     支持"一次只显示一组"
 *   compare-toggle    对比切换（几何）：双视图按钮切换或上下堆叠（如 SSS 稳定性对比）
 *   proof-replay      证明慢放机（几何）：证明三件套（画布+人话卡片+"为什么可以"
 *                     折叠）+ 两栏式"证明书"收尾；三问：已知（蓝）/求证（红）
 *   construction-step 作图步骤机（几何）：倒带/单步/播放 + 跟做模式（"待画"遮罩
 *                     先比划再揭晓），每步"为什么这样画"折叠
 *   cut-reassemble    切割拼补（几何 G5）：拖多边形散块到虚线目标轮廓，
 *                     顶点数一致且质心距离 < snapDist 即吸附对齐；
 *                     落定 flash+ripple（M6），拼完横幅反馈；
 *                     autoAssemble 一键拼好，↺ 复原
 *   pythag-grow       正方形生长（几何）：双滑块调直角边 a、b，三边上的
 *                     正方形实时生长；面积读数 a²+b²=c² 走 MathML；
 *                     badge 条件徽章；lockRight=true 直角硬约束（构造保证）
 *   ladder-slide      梯子滑块（几何）：拖梯子底端 / 滑块，梯子实时转动，
 *                     h=√(L²−x²) 走 MathML 实时显示，
 *                     showCheck 时 x²+h²=L² 实时验算，showTriangle 画直角三角形
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
   * 开方 sqrt()、π 及变量名。^ 转 ** 做幂。 */
  function evalExpr(expr, varName, varValue) {
    var e = String(expr == null ? "" : expr);
    e = e.replace(/\^/g, "**");
    // 白名单替换：三角函数、对数、开方与圆周率 → Math.*（先做，再代入变量）
    // 注意：log2( 必须先于 log( 处理，否则 log2( 会被误替换成 Math.log(2(
    e = e.replace(/\bsin\s*\(/g, "Math.sin(")
         .replace(/\bcos\s*\(/g, "Math.cos(")
         .replace(/\btan\s*\(/g, "Math.tan(")
         .replace(/\blog2\s*\(/g, "Math.log2(")
         .replace(/\blog\s*\(/g, "Math.log(")
         .replace(/\bln\s*\(/g, "Math.log(")
         .replace(/\bsqrt\s*\(/g, "Math.sqrt(")
         .replace(/\u03C0/g, "Math.PI");
    var escName = String(varName).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var re = new RegExp("\\b" + escName + "\\b", "g");
    e = e.replace(re, "(" + Number(varValue) + ")");
    // 安全检查：剥离白名单标识符后只允许数字、运算符、括号、空白
    var check = e.replace(/\bMath\.(sin|cos|tan|log2|log|sqrt|PI)\b/g, "");
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
   * params: {frames, duration, draw:{kind,params}, scrubber?, interactive?}
   * kind: "projectile"（抛物线：v0 初速 m/s、angle 角度、g 重力）/
   *       "pursuit"（追及：vFront 前车速、vBack 后车速须>vFront、gap 初始距离 m）/
   *       "meet"（相遇：v1 甲速度、v2 乙速度、distance 初始距离 m，两车相向）
   * interactive: true（仅 projectile）→ 页内显示 v0/angle 滑块，调参后重播
   *
   * 轨迹逐帧播放：播放/暂停/重播/单步 + 时间轴 scrubber。
   * 关键事件（落地/追上/相遇）高亮 + 音效震动反馈。
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

    if (kind !== "projectile" && kind !== "pursuit" && kind !== "meet") {
      container.appendChild(el("div", "ix-stub",
        "参数错误：slow-replay 的 draw.kind 须为 projectile / pursuit / meet"));
      return;
    }

    /* ---- 物理模型 ---- */
    var model;
    function buildProjectile(v0in, angleDegin, gin) {
      var v0 = Number(v0in); if (!isFinite(v0) || v0 <= 0) v0 = 20;
      var angleDeg = Number(angleDegin);
      if (!isFinite(angleDeg) || angleDeg <= 0 || angleDeg >= 90) angleDeg = 60;
      var g = Number(gin); if (!isFinite(g) || g <= 0) g = 9.8;
      var angle = angleDeg * Math.PI / 180;
      var vx = v0 * Math.cos(angle), vy = v0 * Math.sin(angle);
      var tFlight = 2 * vy / g;
      var range = vx * tFlight;
      var hMax = vy * vy / (2 * g);
      return {
        tEnd: tFlight,
        pos: function (t) {
          return { x: vx * t, y: Math.max(0, vy * t - 0.5 * g * t * t) };
        },
        xMax: range, yMax: hMax,
        eventAt: function (t) { return t >= tFlight - 1e-9 ? "land" : null; },
        eventText: "🎯 落地！",
        caption: "初速 " + fmt(v0) + " m/s，角度 " + fmt(angleDeg) + "°，重力 " + fmt(g) + " m/s²",
        v0: v0, angleDeg: angleDeg, g: g
      };
    }
    if (kind === "projectile") {
      model = buildProjectile(dp.v0, dp.angle, dp.g);
    } else if (kind === "pursuit") {
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
    } else {
      // meet：甲乙相向而行
      var v1 = Number(dp.v1); if (!isFinite(v1) || v1 <= 0) v1 = 5;
      var v2 = Number(dp.v2); if (!isFinite(v2) || v2 <= 0) v2 = 7;
      var dist = Number(dp.distance); if (!isFinite(dist) || dist <= 0) dist = 60;
      var tMeet2 = dist / (v1 + v2);
      model = {
        tEnd: tMeet2,
        pos: function (t) {
          return { a: v1 * t, b: dist - v2 * t };
        },
        xMax: dist * 1.25, yMax: 1,
        eventAt: function (t) { return t >= tMeet2 - 1e-9 ? "meet" : null; },
        eventText: "🎯 相遇了！相遇处就是方程的解",
        caption: "甲 " + fmt(v1) + " m/s，乙 " + fmt(v2) + " m/s，相距 " + fmt(dist) + " m"
      };
    }

    /* ---- SVG ---- */
    var W = 440, H = 300, mL = 36, mR = 16, mT = 20, mB = 40;
    function X(v) { return mL + (v / model.xMax) * (W - mL - mR); }
    function Y(v) { return mT + (1 - v / (model.yMax * 1.18)) * (H - mT - mB); }

    var wrap = el("div", "ix-replay");
    var captionEl = el("div", "ix-rule", esc(model.caption));
    wrap.appendChild(captionEl);
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, "class": "ix-svg" });
    wrap.appendChild(svg);

    /* ---- 交互调参（仅 projectile + interactive） ---- */
    var interactive = params.interactive === true && kind === "projectile";
    var fullTrajEl = null;
    if (interactive) {
      var pRow = el("div", "ix-slider-row");
      pRow.style.cssText = "display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:6px 0;";
      function mkParam(label, min, max, step, val, onChg) {
        var lab = el("span", "ix-slider-label", label + " ");
        var inp = document.createElement("input");
        inp.type = "range"; inp.min = min; inp.max = max;
        inp.step = step; inp.value = val; inp.className = "ix-range";
        inp.style.maxWidth = "120px";
        var vv = el("span", "ix-slider-val", String(val));
        inp.addEventListener("input", function () {
          vv.textContent = inp.value;
          onChg(Number(inp.value));
        });
        var box = el("span", "");
        box.appendChild(lab); box.appendChild(inp); box.appendChild(vv);
        return box;
      }
      var curV0 = model.v0, curAngle = model.angleDeg, curG = model.g;
      function rebuild() {
        stop();
        model = buildProjectile(curV0, curAngle, curG);
        captionEl.textContent = model.caption;
        // 重绘完整轨迹预判
        if (fullTrajEl) {
          var pts = [];
          for (var fi = 0; fi <= 60; fi++) {
            var ftt = model.tEnd * fi / 60;
            var fp = model.pos(ftt);
            pts.push(X(fp.x).toFixed(1) + "," + Y(fp.y).toFixed(1));
          }
          fullTrajEl.setAttribute("points", pts.join(" "));
        }
        drawFrame(0);
      }
      pRow.appendChild(mkParam("初速 v₀", 5, 40, 1, curV0,
        function (v) { curV0 = v; rebuild(); }));
      pRow.appendChild(mkParam("角度", 10, 80, 1, curAngle,
        function (v) { curAngle = v; rebuild(); }));
      wrap.appendChild(pRow);
    }

    var groundY = kind === "projectile" ? Y(0) : H - mB;
    svg.appendChild(svgEl("line", {
      x1: mL, y1: groundY, x2: W - mR, y2: groundY,
      stroke: "var(--m-line)", "stroke-width": 2
    }));

    var trail = null, ball = null, carF = null, carB = null, carA = null, meetMark = null;
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
      // 交互调参时需要重绘预判轨迹，记下引用
      fullTrajEl = svg.lastChild;
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
    } else if (kind === "pursuit") {
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
    } else {
      // meet：甲乙相向而行
      var roadYm = groundY;
      var tick0m = svgEl("text", { x: mL, y: roadYm + 22, "font-size": 11,
        fill: "var(--m-ink-soft)" });
      tick0m.textContent = "0";
      svg.appendChild(tick0m);
      var tickDm = svgEl("text", { x: X(model.xMax / 1.25), y: roadYm + 22,
        "font-size": 11, fill: "var(--m-ink-soft)" });
      tickDm.textContent = fmt(dp.distance || 60) + " m";
      svg.appendChild(tickDm);
      function mkCarM(color, label) {
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
      carA = mkCarM("var(--m-accent-strong)", "甲");
      carB = mkCarM("var(--m-accent)", "乙");
      svg.appendChild(carA); svg.appendChild(carB);
      meetMark = svgEl("text", { "text-anchor": "middle",
        y: roadYm - 36, "font-size": 24, visibility: "hidden" });
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
      } else if (kind === "pursuit") {
        var q = model.pos(t);
        carB.setAttribute("transform",
          "translate(" + X(q.back).toFixed(1) + "," + groundY + ")");
        carF.setAttribute("transform",
          "translate(" + X(q.front).toFixed(1) + "," + groundY + ")");
        var met = model.eventAt(t) === "meet";
        meetMark.setAttribute("visibility", met ? "visible" : "hidden");
        if (met) meetMark.setAttribute("x", X(q.back).toFixed(1));
      } else {
        // meet：甲从左向右，乙从右向左
        var r = model.pos(t);
        carA.setAttribute("transform",
          "translate(" + X(r.a).toFixed(1) + "," + groundY + ")");
        carB.setAttribute("transform",
          "translate(" + X(r.b).toFixed(1) + "," + groundY + ")");
        var metM = model.eventAt(t) === "meet";
        meetMark.setAttribute("visibility", metM ? "visible" : "hidden");
        if (metM) meetMark.setAttribute("x", X(r.a).toFixed(1));
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

  /* ============================================================
   * 12. vertex-drag 顶点拖拽（几何 G1）
   * params: {vertices:[{x,y,label} ×3], showLengths?, showAngles?,
   *          base?:[DSL 形状]（可选底图，画在三角形之下，如半圆+直径）}
   *
   * 逻辑坐标 0–100（y 向上），不写死 px。拖动三角形顶点，
   * 边长/角度读数实时更新；某角 ≈90°（±0.8°）时自动画出直角方块。
   * 标注走 window.GEOM 原语（M4 双编码 / M5 深色变量）。
   * ============================================================ */
  function renderVertexDrag(container, params) {
    var G = window.GEOM;
    if (!G) {
      container.appendChild(el("div", "ix-stub", "几何原语库未加载（js/geom-primitives.js）"));
      return;
    }
    var vs = params.vertices;
    if (!Array.isArray(vs) || vs.length !== 3) {
      container.appendChild(el("div", "ix-stub",
        "参数错误：vertex-drag 需要 vertices（3 个顶点 {x, y, label}）"));
      return;
    }
    var showLengths = params.showLengths !== false;
    var showAngles = params.showAngles !== false;
    var DEFAULT_LABELS = ["A", "B", "C"];

    var W = 420, H = 360, mL = 44, mR = 44, mT = 30, mB = 56;
    function X(x) { return mL + x / 100 * (W - mL - mR); }
    function Y(y) { return mT + (1 - y / 100) * (H - mT - mB); }
    function S(v) { return v / 100 * (W - mL - mR); }

    var init = vs.map(function (v, i) {
      return {
        x: Math.min(98, Math.max(2, Number(v.x))),
        y: Math.min(98, Math.max(2, Number(v.y))),
        label: v.label || DEFAULT_LABELS[i]
      };
    });
    var pts = JSON.parse(JSON.stringify(init));

    var wrap = el("div", "ix-geo-wrap");
    var readout = el("div", "ix-geo-readout", "");
    wrap.appendChild(readout);

    var svg = G.svg(W, H, "ix-svg geo-svg");
    wrap.appendChild(svg);

    // 可选底图（蓝队 2026-10-11：g07.1.5 半圆+直径）：DSL 形状，画在最下层，
    // 与顶点同用 0–100 逻辑坐标（y 向上），静态不随拖拽重绘。
    if (Array.isArray(params.base) && params.base.length) {
      var vfr = { X: X, Y: Y, S: S };
      params.base.forEach(function (sh) { drawGeoShape(svg, sh, vfr); });
    }

    // 边：sideNames[i] 是 pts[i] 的对边（a 对 A，以此类推）
    var sideNames = ["a", "b", "c"];
    var edges = [];       // 3 条边线段
    var lenLabels = [];   // 边长标注
    var angLabels = [];   // 角度标注
    var rightMarks = [];  // 直角方块（3 个，按需显示）
    var handles = [];     // 顶点拖拽手柄
    var handleLabels = [];

    var i;
    for (i = 0; i < 3; i++) {
      edges.push(G.segment(svg, 0, 0, 1, 1, { color: "line", width: 3 }));
    }
    for (i = 0; i < 3; i++) {
      lenLabels.push(G.label(svg, 0, 0, "", { size: 14, bold: true }));
      angLabels.push(G.label(svg, 0, 0, "", { size: 14, bold: true, color: "corrAngle" }));
      rightMarks.push(G.rightAngle(svg, 0, 0, 1, 0, 0, 1, 11, { width: 2 }));
      rightMarks[i].setAttribute("visibility", "hidden");
    }
    for (i = 0; i < 3; i++) {
      (function (idx) {
        var g = G.el("g", { "class": "geo-drag" });
        var hit = G.el("circle", { r: 18, fill: "transparent" });
        var dot = G.el("circle", {
          r: 8, fill: "var(--geo-known)", stroke: "#fff", "stroke-width": 2
        });
        g.appendChild(hit); g.appendChild(dot);
        svg.appendChild(g);
        handles.push({ g: g, dot: dot });
        handleLabels.push(G.label(svg, 0, 0, pts[idx].label,
          { size: 16, bold: true, color: "known" }));
        bindVertexDrag(g, idx);
      })(i);
    }

    var status = el("div", "ix-status",
      '<span class="ix-hint">拖动蓝色顶点，看边长和角度怎么变</span>');
    var foot = el("div", "ix-foot");
    var resetBtn = el("button", "ix-reset", "↺ 复原");
    resetBtn.type = "button";
    foot.appendChild(status); foot.appendChild(resetBtn);
    wrap.appendChild(foot);
    container.appendChild(wrap);

    function fmt1(n) {
      if (!isFinite(n)) return "—";
      return String(Math.round(n * 10) / 10);
    }
    // 边长（逻辑单位）与角度
    function sideLen(i2, j2) {
      return G.dist(pts[i2].x, pts[i2].y, pts[j2].x, pts[j2].y);
    }
    function angleAt(i2) {
      var a = pts[i2], b = pts[(i2 + 1) % 3], c = pts[(i2 + 2) % 3];
      var ab = G.dist(a.x, a.y, b.x, b.y), ac = G.dist(a.x, a.y, c.x, c.y);
      if (ab < 1e-9 || ac < 1e-9) return NaN;
      var cosA = ((b.x - a.x) * (c.x - a.x) + (b.y - a.y) * (c.y - a.y)) / (ab * ac);
      cosA = Math.max(-1, Math.min(1, cosA));
      return G.deg(Math.acos(cosA));
    }

    function redraw() {
      var lens = [sideLen(1, 2), sideLen(2, 0), sideLen(0, 1)];  // a,b,c
      var angs = [angleAt(0), angleAt(1), angleAt(2)];
      // 边
      var pairs = [[1, 2], [2, 0], [0, 1]];
      for (var e = 0; e < 3; e++) {
        var p = pts[pairs[e][0]], q = pts[pairs[e][1]];
        var se = edges[e];
        se.setAttribute("x1", X(p.x)); se.setAttribute("y1", Y(p.y));
        se.setAttribute("x2", X(q.x)); se.setAttribute("y2", Y(q.y));
        if (showLengths) {
          var mx = (X(p.x) + X(q.x)) / 2, my = (X(p.y) + X(q.y)) / 2;
          lenLabels[e].setAttribute("visibility", "visible");
          lenLabels[e].setAttribute("x", mx.toFixed(1));
          lenLabels[e].setAttribute("y", (my - 8).toFixed(1));
          lenLabels[e].textContent = sideNames[e] + " = " + fmt1(lens[e]);
        } else {
          lenLabels[e].setAttribute("visibility", "hidden");
        }
      }
      // 顶点：手柄、字母、角度
      var cx = (pts[0].x + pts[1].x + pts[2].x) / 3;
      var cy = (pts[0].y + pts[1].y + pts[2].y) / 3;
      for (var v = 0; v < 3; v++) {
        var pt = pts[v];
        var hx = X(pt.x), hy = Y(pt.y);
        handles[v].g.setAttribute("transform", "translate(" + hx + "," + hy + ")");
        // 字母标在远离形心一侧
        var dx = pt.x - cx, dy = pt.y - cy;
        var dl = Math.sqrt(dx * dx + dy * dy) || 1;
        handleLabels[v].setAttribute("x", (hx + dx / dl * 22).toFixed(1));
        handleLabels[v].setAttribute("y", (hy - dy / dl * 22).toFixed(1));
        if (showAngles && isFinite(angs[v])) {
          angLabels[v].setAttribute("visibility", "visible");
          angLabels[v].setAttribute("x", (hx - dx / dl * 30).toFixed(1));
          angLabels[v].setAttribute("y", (hy + dy / dl * 30 + 5).toFixed(1));
          angLabels[v].textContent = fmt1(angs[v]) + "°";
        } else {
          angLabels[v].setAttribute("visibility", "hidden");
        }
        // 直角自动标记（±0.8°）
        var isRight = isFinite(angs[v]) && Math.abs(angs[v] - 90) < 0.8;
        rightMarks[v].setAttribute("visibility", isRight ? "visible" : "hidden");
        if (isRight) {
          var o1 = pts[(v + 1) % 3], o2 = pts[(v + 2) % 3];
          var parent = rightMarks[v].parentNode;
          var fresh = G.rightAngle(svg, hx, hy, X(o1.x), Y(o1.y), X(o2.x), Y(o2.y), 11, { width: 2 });
          parent.replaceChild(fresh, rightMarks[v]);
          rightMarks[v] = fresh;
        }
      }
      // 顶部读数行
      var parts = [];
      if (showLengths) {
        parts.push("边 " + sideNames.map(function (s, k) {
          return s + " = " + fmt1(lens[k]);
        }).join("，"));
      }
      if (showAngles) {
        parts.push("角 " + pts.map(function (p2, k) {
          return p2.label + " = " + fmt1(angs[k]) + "°";
        }).join("，"));
      }
      readout.innerHTML = parts.map(function (s2) {
        return '<span class="ix-val">' + G.esc(s2) + "</span>";
      }).join('<span class="ix-sep">　</span>');
    }

    function bindVertexDrag(g, idx) {
      var dragging = false, dx = 0, dy = 0;
      g.style.cursor = "grab";
      g.addEventListener("pointerdown", function (evt) {
        evt.preventDefault();
        dragging = true;
        try { g.setPointerCapture(evt.pointerId); } catch (e) {}
        var p = G.svgPoint(svg, evt);
        dx = p.x - X(pts[idx].x); dy = p.y - Y(pts[idx].y);
        g.style.cursor = "grabbing";
      });
      g.addEventListener("pointermove", function (evt) {
        if (!dragging) return;
        var p = G.svgPoint(svg, evt);
        var lx = (p.x - dx - mL) / (W - mL - mR) * 100;
        var ly = (1 - (p.y - dy - mT) / (H - mT - mB)) * 100;
        pts[idx].x = Math.min(98, Math.max(2, lx));
        pts[idx].y = Math.min(98, Math.max(2, ly));
        redraw();
      });
      function end() {
        if (!dragging) return;
        dragging = false;
        g.style.cursor = "grab";
      }
      g.addEventListener("pointerup", end);
      g.addEventListener("pointercancel", end);
    }

    resetBtn.addEventListener("click", function () {
      for (var k = 0; k < 3; k++) {
        pts[k].x = init[k].x; pts[k].y = init[k].y;
      }
      redraw();
    });

    redraw();
  }

  /* ============================================================
   * 13. angle-protractor 量角器（几何 G6）
   * params: {angle, vertex?, dir1?, rayLabels?, tolerance?, feedback?}
   *
   * 玩法：拖动量角器旋转，把 0° 刻度线对准一条边，
   * 读另一条边压住的刻度。松手时读数与真实角度差 ≤ tolerance
   * 即吸附落定：flash 高亮 + ripple 扩散环（M6 视觉必选）+
   * 可选 vibrate（能力检测，静默跳过）+ 可选合成音。
   * 逻辑坐标 0–100（y 向上），不写死 px。
   * ============================================================ */
  function renderAngleProtractor(container, params) {
    var G = window.GEOM;
    if (!G) {
      container.appendChild(el("div", "ix-stub", "几何原语库未加载（js/geom-primitives.js）"));
      return;
    }
    var A = Number(params.angle);
    if (!(A > 0 && A < 180)) {
      container.appendChild(el("div", "ix-stub",
        "参数错误：angle-protractor 需要 angle（0°–180° 之间的度数）"));
      return;
    }
    var tolRaw = Number(params.tolerance);
    var tol = isFinite(tolRaw) ? Math.max(0.5, Math.min(10, tolRaw)) : 2;
    var V = params.vertex || {};
    var vx = isFinite(Number(V.x)) ? Number(V.x) : 50;
    var vy = isFinite(Number(V.y)) ? Number(V.y) : 56;
    var vLabel = V.label || "O";
    var dir1 = params.dir1 != null && isFinite(Number(params.dir1))
      ? G.norm360(Number(params.dir1)) : 180;
    var dir2 = G.norm360(dir1 - A);   // 角的另一条边
    var rayLabels = params.rayLabels || ["A", "B"];
    var fb = params.feedback || {};

    var W = 420, H = 380, mL = 44, mR = 44, mT = 30, mB = 56;
    function X(x) { return mL + x / 100 * (W - mL - mR); }
    function Y(y) { return mT + (1 - y / 100) * (H - mT - mB); }
    var Vx = X(vx), Vy = Y(vy);
    var S = (W - mL - mR) / 100;      // 逻辑单位 → px
    var R = 30 * S;                    // 量角器半径
    var rayLen = 44 * S;

    var wrap = el("div", "ix-geo-wrap");
    var readout = el("div", "ix-geo-readout", "");
    wrap.appendChild(readout);
    var svg = G.svg(W, H, "ix-svg geo-svg");
    wrap.appendChild(svg);

    /* —— 量角器拨盘（可旋转组；刻度 k 画在局部数学角 -k 处，
     *     世界方向 = θd - k；读数 = 另一条边压住的刻度） —— */
    var dial = G.el("g", { "class": "geo-drag" });
    // 半圆盘面（半透明，透出底图）
    dial.appendChild(G.el("path", {
      d: "M" + R.toFixed(1) + ",0 A" + R.toFixed(1) + "," + R.toFixed(1) +
         " 0 0 1 " + (-R).toFixed(1) + ",0 Z",
      fill: "var(--geo-bg)", opacity: 0.62, stroke: "none"
    }));
    // 外圈弧
    dial.appendChild(G.el("path", {
      d: "M" + R.toFixed(1) + ",0 A" + R.toFixed(1) + "," + R.toFixed(1) + " 0 0 1 " + (-R).toFixed(1) + ",0",
      fill: "none", stroke: G.colorOf("line"), "stroke-width": 2
    }));
    // 基线（直径）
    dial.appendChild(G.el("line", {
      x1: -R.toFixed(1), y1: 0, x2: R.toFixed(1), y2: 0,
      stroke: G.colorOf("line"), "stroke-width": 1.5
    }));
    // 刻度：每 10° 一道，30° 加长；数字每 30°
    var tickEls = [];
    for (var k = 0; k <= 180; k += 10) {
      var isMajor = k % 30 === 0;
      var p1 = G.polar(0, 0, R, -k);
      var p2 = G.polar(0, 0, R - (isMajor ? 8 : 4.5), -k);
      var tk = G.el("line", {
        x1: p1[0].toFixed(1), y1: p1[1].toFixed(1),
        x2: p2[0].toFixed(1), y2: p2[1].toFixed(1),
        stroke: G.colorOf("line"), "stroke-width": isMajor ? 2 : 1.2
      });
      dial.appendChild(tk);
      tickEls.push(tk);
      if (isMajor) {
        var np = G.polar(0, 0, R - 15, -k);
        var nt = G.el("text", {
          x: np[0].toFixed(1), y: (np[1] + 4).toFixed(1),
          "text-anchor": "middle", "font-size": 11, fill: G.colorOf("text")
        });
        nt.textContent = String(k);
        dial.appendChild(nt);
      }
    }
    // 旋转手柄（刻度中点外圈）
    var hp = G.polar(0, 0, R, -90);
    var knob = G.el("circle", {
      cx: hp[0].toFixed(1), cy: hp[1].toFixed(1), r: 8,
      fill: G.colorOf("highlight"), stroke: G.colorOf("line"), "stroke-width": 2
    });
    dial.appendChild(knob);
    svg.appendChild(dial);

    /* —— 角：两条射线 + 待测弧线 —— */
    var r1 = G.ray(svg, Vx, Vy, dir1, rayLen, { color: "known", width: 3 });
    var r2 = G.ray(svg, Vx, Vy, dir2, rayLen, { color: "line", width: 3 });
    var e1 = G.polar(Vx, Vy, rayLen + 12, dir1);
    var e2 = G.polar(Vx, Vy, rayLen + 12, dir2);
    G.label(svg, e1[0], e1[1], rayLabels[0] || "A", { size: 16, bold: true, color: "known" });
    G.label(svg, e2[0], e2[1], rayLabels[1] || "B", { size: 16, bold: true });
    var arcG = G.angleArc(svg, Vx, Vy, dir2, dir2 + A, 15, { color: "target", width: 2.5 });
    var midA = dir2 + A / 2;
    var lp = G.polar(Vx, Vy, 26, midA);
    var arcLabel = G.label(svg, lp[0], lp[1], "？", { size: 17, bold: true, color: "target" });
    // 中心销
    svg.appendChild(G.el("circle", {
      cx: Vx, cy: Vy, r: 3.5, fill: G.colorOf("line")
    }));
    G.label(svg, Vx + 12, Vy + 20, vLabel, { size: 15, bold: true });

    var status = el("div", "ix-status",
      '<span class="ix-hint">拖动量角器旋转：把 0° 刻度线对准一条边，读另一条边压住的刻度</span>');
    var foot = el("div", "ix-foot");
    var resetBtn = el("button", "ix-reset", "↺ 重量");
    resetBtn.type = "button";
    foot.appendChild(status); foot.appendChild(resetBtn);
    wrap.appendChild(foot);
    container.appendChild(wrap);

    /* —— 旋转状态 —— */
    var theta = dir1 + 38;   // 拨盘初始偏转（0° 未对准）
    var locked = false;
    var nearTick = -1;

    function reading() { return G.norm180(theta - dir2); }
    function angDist(a, b) {
      var d = Math.abs(a - b) % 180;
      return d > 90 ? 180 - d : d;
    }
    function paint() {
      dial.setAttribute("transform",
        "rotate(" + (-theta).toFixed(2) + " " + Vx.toFixed(1) + " " + Vy.toFixed(1) + ")");
      var rd = reading();
      readout.innerHTML = '<span class="ix-expr">量角器读数</span>' +
        '<span class="ix-eq"> = </span>' +
        '<span class="ix-val">' + fmt(rd) + "°</span>";
      // 接近提示：另一条边压住的刻度高亮
      var near = angDist(rd, A) <= 6;
      var ti = Math.round(rd / 10);
      if (near && !locked) {
        if (nearTick !== ti) {
          clearTick();
          nearTick = ti;
          if (tickEls[ti]) tickEls[ti].setAttribute("stroke", G.colorOf("highlight"));
        }
        if (status.dataset.mode !== "near") {
          status.dataset.mode = "near";
          status.innerHTML = '<span class="ix-hint">很接近了——对准刻度再松手！</span>';
        }
      } else {
        clearTick();
        if (!locked && status.dataset.mode === "near") {
          status.dataset.mode = "";
          status.innerHTML = '<span class="ix-hint">拖动量角器旋转：把 0° 刻度线对准一条边，读另一条边压住的刻度</span>';
        }
      }
    }
    function clearTick() {
      if (nearTick >= 0 && tickEls[nearTick]) {
        tickEls[nearTick].setAttribute("stroke", G.colorOf("line"));
      }
      nearTick = -1;
    }
    function fmt(n) {
      if (!isFinite(n)) return "—";
      return String(Math.round(n * 10) / 10);
    }

    function settle() {
      // 吸附到真实角度（取最近的等价位置）
      var rd = reading();
      var delta = A - rd;
      if (delta > 90) delta -= 180;
      if (delta < -90) delta += 180;
      theta += delta;
      locked = true;
      clearTick();
      paint();
      arcLabel.textContent = fmt(A) + "°";
      // M6：视觉必选（flash + ripple），震动/音效可选加分
      G.settle(svg, Vx, Vy, arcG, {
        vibrate: fb.vibrate === undefined ? [20, 30, 20] : fb.vibrate,
        beep: fb.beep === true
      });
      dial.style.cursor = "default";
      status.dataset.mode = "done";
      status.innerHTML = '<span class="ix-success">✓ 量角器读数 ' + fmt(A) +
        "°，这个角就是 " + fmt(A) + "°！</span>";
    }

    // 拖拽旋转
    var dragging = false, grabOff = 0;
    dial.style.cursor = "grab";
    dial.addEventListener("pointerdown", function (evt) {
      if (locked) return;
      evt.preventDefault();
      dragging = true;
      try { dial.setPointerCapture(evt.pointerId); } catch (e) {}
      var p = G.svgPoint(svg, evt);
      grabOff = G.angleOf(Vx, Vy, p.x, p.y) - theta;
      dial.style.cursor = "grabbing";
    });
    dial.addEventListener("pointermove", function (evt) {
      if (!dragging || locked) return;
      var p = G.svgPoint(svg, evt);
      theta = G.angleOf(Vx, Vy, p.x, p.y) - grabOff;
      paint();
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      dial.style.cursor = locked ? "default" : "grab";
      if (!locked && angDist(reading(), A) <= tol) settle();
    }
    dial.addEventListener("pointerup", endDrag);
    dial.addEventListener("pointercancel", function () {
      dragging = false;
      dial.style.cursor = locked ? "default" : "grab";
    });

    resetBtn.addEventListener("click", function () {
      theta = dir1 + 38;
      locked = false;
      status.dataset.mode = "";
      arcLabel.textContent = "？";
      dial.style.cursor = "grab";
      status.innerHTML = '<span class="ix-hint">拖动量角器旋转：把 0° 刻度线对准一条边，读另一条边压住的刻度</span>';
      paint();
    });

    paint();
  }

  /* ============================================================
   * 共享：几何帧 DSL → GEOM 原语（step-play / tap-highlight /
   * compare-toggle 共用）。
   *
   * 逻辑坐标 0–100（y 向上），零具体色值（只用语义色名）。
   * shape 描述：
   *  t:"seg"    {a:[x,y], b:[x,y], color?, width?, dash?, arrows?(0-3平行箭头),
   *              ticks?(1-3等长刻度), label?(中点标注)}
   *  t:"poly"   {pts:[[x,y]..], color?, width?, dash?, close?(默认true),
   *              fill?(语义色名), opacity?}
   *  t:"circle" {c:[x,y], r(逻辑), color?, width?, dash?, fill?, opacity?}
   *  t:"arcpath" {c:[x,y], r(逻辑), a1, a2(数学惯例度，逆时针), color?,
   *              width?, dash?} —— 以圆心为锚的圆周弧（如半圆背景）
   *  t:"pt"     {p:[x,y], label?, color?, r?}
   *  t:"txt"    {p:[x,y], text, size?, color?, anchor?, math?, bold?}
   *  t:"arc"    {v:[x,y], a1, a2(数学惯例度), r(逻辑), group?(1-3), color?}
   *  t:"ticks"  {a:[x,y], b:[x,y], count?(1-3), color?}
   *  t:"right"  {v:[x,y], p:[x,y], q:[x,y], size?(逻辑), color?}
   *  t:"ray"    {p:[x,y], ang(数学惯例度), len(逻辑), color?, width?}
   * ============================================================ */
  function geoFrame(H) {
    var G = window.GEOM;
    var W = 420, mL = 44, mR = 44, mT = 28, mB = 44;
    H = H || 360;
    function X(x) { return mL + x / 100 * (W - mL - mR); }
    function Y(y) { return mT + (1 - y / 100) * (H - mT - mB); }
    function S(v) { return v / 100 * (W - mL - mR); }
    return { svg: G.svg(W, H, "ix-svg geo-svg"), W: W, H: H, X: X, Y: Y, S: S };
  }
  function clearSvg(svg) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
  }
  // shape → 在 g（<g> 或 <svg>，GEOM 原语直接 append）内绘制，返回 g
  function drawGeoShape(g, sh, fr) {
    var G = window.GEOM;
    var t = sh.t, col = sh.color || "line", w = sh.width || 2.5;
    function P(p) { return [fr.X(p[0]), fr.Y(p[1])]; }
    if (t === "seg") {
      var a = P(sh.a), b = P(sh.b);
      G.segment(g, a[0], a[1], b[0], b[1],
        { color: col, width: w, dash: sh.dash });
      if (sh.arrows) G.parArrows(g, a[0], a[1], b[0], b[1],
        { count: Math.min(3, Math.max(1, sh.arrows)), color: col });
      if (sh.ticks) G.ticks(g, a[0], a[1], b[0], b[1],
        { count: Math.min(3, Math.max(1, sh.ticks)), color: col });
      if (sh.label) G.label(g, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 10,
        sh.label, { size: 14, bold: true });
    } else if (t === "poly") {
      var pts = (sh.pts || []).map(function (p) {
        var q = P(p); return q[0].toFixed(1) + "," + q[1].toFixed(1);
      }).join(" ");
      var close = sh.close !== false;
      var pg = G.el(close ? "polygon" : "polyline", {
        points: pts,
        fill: sh.fill ? G.colorOf(sh.fill) : "none",
        stroke: G.colorOf(col), "stroke-width": w,
        "stroke-linejoin": "round", "stroke-linecap": "round"
      });
      if (sh.fill) pg.setAttribute("fill-opacity",
        sh.opacity == null ? 0.22 : sh.opacity);
      if (sh.dash) pg.setAttribute("stroke-dasharray", sh.dash);
      g.appendChild(pg);
    } else if (t === "circle") {
      var c = P(sh.c);
      G.circle(g, c[0], c[1], fr.S(sh.r || 10),
        { color: col, width: w, dash: sh.dash, fill: sh.fill, opacity: sh.opacity });
    } else if (t === "arcpath") {
      var ac = P(sh.c);
      G.circleArc(g, ac[0], ac[1], fr.S(sh.r || 10), sh.a1 || 0, sh.a2 == null ? 360 : sh.a2,
        { color: col, width: w, dash: sh.dash });
    } else if (t === "pt") {
      var pp = P(sh.p);
      G.point(g, pp[0], pp[1],
        { label: sh.label, color: col, r: sh.r || 4.5 });
    } else if (t === "txt") {
      var tp = P(sh.p);
      G.label(g, tp[0], tp[1], sh.text,
        { size: sh.size || 15, color: col, anchor: sh.anchor || "middle",
          math: sh.math === true, bold: sh.bold === true });
    } else if (t === "arc") {
      var v = P(sh.v);
      G.angleArc(g, v[0], v[1], sh.a1 || 0, sh.a2 || 90, fr.S(sh.r || 12),
        { group: sh.group, color: col, width: w });
    } else if (t === "ticks") {
      var ta = P(sh.a), tb = P(sh.b);
      G.ticks(g, ta[0], ta[1], tb[0], tb[1],
        { count: Math.min(3, Math.max(1, sh.count || 1)), color: col });
    } else if (t === "right") {
      var rv = P(sh.v), rp = P(sh.p), rq = P(sh.q);
      G.rightAngle(g, rv[0], rv[1], rp[0], rp[1], rq[0], rq[1],
        fr.S(sh.size || 8), { color: col, width: w });
    } else if (t === "ray") {
      var rp2 = P(sh.p);
      G.ray(g, rp2[0], rp2[1], sh.ang || 0, fr.S(sh.len || 30),
        { color: col, width: w });
    }
    return g;
  }
  // DSL 图形的逻辑锚点（点击热区 / 徽章定位用）
  function shapeAnchor(sh) {
    if (sh.anchor) return sh.anchor;
    if (sh.a && sh.b) return [(sh.a[0] + sh.b[0]) / 2, (sh.a[1] + sh.b[1]) / 2];
    if (sh.v) return sh.v;
    if (sh.p) return sh.p;
    if (sh.c) return sh.c;
    if (sh.pts && sh.pts.length) {
      var sx = 0, sy = 0, n = sh.pts.length;
      sh.pts.forEach(function (p) { sx += p[0]; sy += p[1]; });
      return [sx / n, sy / n];
    }
    return [50, 50];
  }
  function geoErr(container, msg) {
    container.appendChild(el("div", "ix-stub", "参数错误：" + esc(msg)));
  }

  /* ============================================================
   * 14. step-play 分步播放（几何）
   * params: {steps:[{caption?, shapes:[DSL]}], interval?, autoplay?, loop?}
   *
   * 每步一帧 SVG + 说明文字；◀/▶ 步进，⏯ 自动播放/暂停，↺ 重头。
   * 帧切换做淡入过渡；播放到末尾自动停（loop:true 则循环）。
   * ============================================================ */
  function renderStepPlay(container, params) {
    var G = window.GEOM;
    if (!G) {
      container.appendChild(el("div", "ix-stub", "几何原语库未加载（js/geom-primitives.js）"));
      return;
    }
    var steps = params.steps;
    if (!Array.isArray(steps) || !steps.length) {
      geoErr(container, "step-play 需要 steps（非空数组，每步 {caption, shapes}）");
      return;
    }
    var iv = Number(params.interval);
    var interval = isFinite(iv) ? Math.max(800, Math.min(4000, iv)) : 1500;
    var loop = params.loop === true;
    var idx = 0, playing = false, timer = null;

    // （蓝队 2026-10-11 白队 g00 终查问题 1）单步 = 静态定格图：
    // 不渲染控制条（◀/▶/⏯/↺ 对单步无意义），也不显示"第 1 / 1 步"
    // 读数行，省出纵向空间，避免 390px 下控制条被裁掉看不见。
    var single = steps.length === 1;

    var wrap = el("div", "ix-geo-wrap");
    var readout = el("div", "ix-geo-readout", "");
    if (single) readout.style.display = "none";
    wrap.appendChild(readout);
    var fr = geoFrame();
    var frameBox = el("div", "ix-frame");
    frameBox.appendChild(fr.svg);
    wrap.appendChild(frameBox);
    var cap = el("div", "ix-step-cap", "");
    wrap.appendChild(cap);

    var btnPrev = null, btnPlay = null, btnNext = null, btnRestart = null;
    if (!single) {
      var ctrl = el("div", "ix-step-ctrl");
      function mkBtn(label) {
        var b = el("button", "ix-btn", label);
        b.type = "button";
        ctrl.appendChild(b);
        return b;
      }
      btnPrev = mkBtn("◀ 上一步");
      btnPlay = mkBtn("▶ 播放");
      btnNext = mkBtn("下一步 ▶");
      btnRestart = mkBtn("↺ 重头");
      wrap.appendChild(ctrl);
    }
    container.appendChild(wrap);

    function show(i) {
      idx = Math.max(0, Math.min(steps.length - 1, i));
      var st = steps[idx] || {};
      clearSvg(fr.svg);
      (st.shapes || []).forEach(function (sh) { drawGeoShape(fr.svg, sh, fr); });
      cap.textContent = st.caption || "";
      readout.innerHTML = '<span class="ix-val">第 ' + (idx + 1) + " / " + steps.length + " 步</span>";
      if (!single) {
        btnPrev.disabled = idx === 0;
        btnNext.disabled = idx === steps.length - 1;
      }
      // 帧切换淡入
      frameBox.classList.remove("ix-frame");
      void frameBox.offsetWidth;
      frameBox.classList.add("ix-frame");
    }
    function stop() {
      playing = false;
      if (timer) { clearInterval(timer); timer = null; }
      if (btnPlay) btnPlay.innerHTML = "▶ 播放";
    }
    if (!single) {
      btnPrev.addEventListener("click", function () { stop(); show(idx - 1); });
      btnNext.addEventListener("click", function () { stop(); show(idx + 1); });
      btnRestart.addEventListener("click", function () { stop(); show(0); });
      btnPlay.addEventListener("click", function () {
        if (playing) { stop(); return; }
        playing = true;
        btnPlay.innerHTML = "⏸ 暂停";
        timer = setInterval(function () {
          if (idx >= steps.length - 1) {
            if (loop) show(0);
            else stop();
          } else show(idx + 1);
        }, interval);
      });
    }

    show(0);
    if (!single && params.autoplay === true) btnPlay.click();  // 落页即播
  }

  /* ============================================================
   * 15. tap-highlight 点击点亮分类（几何）
   * params: {base?:[DSL], items:[{id?, label?, group, shape, anchor?}],
   *          groups:[{name, color(语义色名)}]}
   *
   * 玩法：点图形元素 → 高亮为组色 + 编号徽章（双编码：颜色+编号，
   * 色盲可辨）+ 状态栏显示归类；顶部组标签可"一次只显示一组"
   * （其余组淡化 0.22）。
   * ============================================================ */
  function renderTapHighlight(container, params) {
    var G = window.GEOM;
    if (!G) {
      container.appendChild(el("div", "ix-stub", "几何原语库未加载（js/geom-primitives.js）"));
      return;
    }
    var items = params.items;
    if (!Array.isArray(items) || !items.length) {
      geoErr(container, "tap-highlight 需要 items（非空数组，每项 {label, group, shape}）");
      return;
    }
    var groups = (Array.isArray(params.groups) && params.groups.length) ? params.groups : [
      { name: "A 组", color: "corrA" },
      { name: "B 组", color: "corrB" },
      { name: "C 组", color: "corrC" }
    ];
    function gIdxOf(gr) {
      if (typeof gr === "number") return (gr >= 0 && gr < groups.length) ? gr : 0;
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].name === gr) return i;
      }
      return 0;
    }
    var its = items.map(function (it, k) {
      return {
        id: it.id || ("i" + (k + 1)),
        label: it.label || ("元素" + (k + 1)),
        group: gIdxOf(it.group),
        shape: it.shape || { t: "pt", p: [50, 50] },
        classified: false,
        g: null
      };
    });

    var wrap = el("div", "ix-geo-wrap");
    var tabs = el("div", "ix-groups");
    wrap.appendChild(tabs);
    var readout = el("div", "ix-geo-readout", "");
    wrap.appendChild(readout);
    var fr = geoFrame();
    wrap.appendChild(fr.svg);
    var status = el("div", "ix-status",
      '<span class="ix-hint">点一点图形里的元素，看它属于哪一组</span>');
    wrap.appendChild(status);
    container.appendChild(wrap);

    // 背景静态图形
    (params.base || []).forEach(function (sh) { drawGeoShape(fr.svg, sh, fr); });

    var sel = -1;  // -1 = 全部；>=0 = 只显示该组
    function classifiedCount() {
      return its.filter(function (it) { return it.classified; }).length;
    }
    function paintCount() {
      readout.innerHTML = '<span class="ix-val">已点亮 ' + classifiedCount() +
        " / " + its.length + "</span>";
    }
    function applyFilter() {
      its.forEach(function (it) {
        if (it.g) it.g.style.opacity = (sel >= 0 && it.group !== sel) ? "0.22" : "1";
      });
    }
    function paintItem(it) {
      if (it.g && it.g.parentNode) it.g.parentNode.removeChild(it.g);
      var g = G.el("g", { "class": "geo-tap" });
      // 点亮：主色覆写为组色（shape 深拷贝，避免污染原始 params）
      var shape = it.shape;
      if (it.classified) {
        shape = JSON.parse(JSON.stringify(it.shape));
        shape.color = groups[it.group].color;
      }
      drawGeoShape(g, shape, fr);
      var an = shapeAnchor(it.shape);
      var ax = fr.X(an[0]), ay = fr.Y(an[1]);
      if (it.classified) {
        // 双编码：组色描边 + 编号徽章（不依赖颜色）+ 组名文字
        var bd = G.el("g", { "pointer-events": "none" });
        bd.appendChild(G.el("circle", {
          cx: (ax + 20).toFixed(1), cy: (ay - 20).toFixed(1), r: 11,
          fill: G.colorOf(groups[it.group].color), stroke: "#fff", "stroke-width": 2
        }));
        var tx = G.el("text", {
          x: (ax + 20).toFixed(1), y: (ay - 20 + 5).toFixed(1),
          "text-anchor": "middle", "font-size": 13, "font-weight": "bold", fill: "#fff"
        });
        tx.textContent = String(it.group + 1);
        bd.appendChild(tx);
        g.appendChild(bd);
        G.label(g, ax, ay + 28, it.label + " → " + groups[it.group].name,
          { size: 13, bold: true, color: groups[it.group].color });
      }
      // 透明点击热区（细线条也好点）
      var hit = G.el("circle", {
        cx: ax.toFixed(1), cy: ay.toFixed(1), r: 22,
        fill: "transparent", "pointer-events": "all", style: "cursor:pointer"
      });
      g.appendChild(hit);
      hit.addEventListener("click", function () { tap(it); });
      fr.svg.appendChild(g);
      it.g = g;
      applyFilter();
    }
    function tap(it) {
      if (!it.classified) {
        it.classified = true;
        paintItem(it);
        G.flash(it.g, 300);   // M6：点亮闪烁（视觉必选）
        paintCount();
        var done = classifiedCount() === its.length;
        status.innerHTML = '<span class="ix-success">✓ ' + esc(it.label) + " → " +
          esc(groups[it.group].name) + "</span>" +
          (done ? ' <span class="ix-hint">全部点亮！</span>' : "");
      } else {
        G.flash(it.g, 300);
        status.innerHTML = '<span class="ix-hint">' + esc(it.label) + " 已在 " +
          esc(groups[it.group].name) + "</span>";
      }
    }

    // 组标签：全部 + 各组（一次只显示一组）
    function mkTab(label, dotColor, active, onClick) {
      var b = el("button", "ix-group-btn" + (active ? " on" : ""),
        (dotColor ? '<span class="ix-dot" style="background:' +
          G.colorOf(dotColor) + '"></span>' : "") + esc(label));
      b.type = "button";
      b.addEventListener("click", onClick);
      tabs.appendChild(b);
      return b;
    }
    var tabBtns = [mkTab("全部", null, true, function () { selectGroup(-1); })];
    groups.forEach(function (gr, i) {
      tabBtns.push(mkTab(gr.name, gr.color, false, function () { selectGroup(i); }));
    });
    function selectGroup(i) {
      sel = i;
      tabBtns.forEach(function (b, k) {
        b.classList.toggle("on", (k - 1) === i);
      });
      applyFilter();
      status.innerHTML = i < 0
        ? '<span class="ix-hint">点一点图形里的元素，看它属于哪一组</span>'
        : '<span class="ix-hint">只显示「' + esc(groups[i].name) +
          "」——点元素继续点亮分类</span>";
    }

    its.forEach(paintItem);
    paintCount();
  }

  /* ============================================================
   * 16. compare-toggle 对比切换（几何）
   * params: {views:[{label, caption?, shapes:[DSL]}]（恰好 2 个）,
   *          layout?:"toggle"(默认，按钮切换) | "stack"(上下堆叠)}
   * ============================================================ */
  function renderCompareToggle(container, params) {
    var G = window.GEOM;
    if (!G) {
      container.appendChild(el("div", "ix-stub", "几何原语库未加载（js/geom-primitives.js）"));
      return;
    }
    var views = params.views;
    if (!Array.isArray(views) || views.length !== 2) {
      geoErr(container, "compare-toggle 需要 views（恰好 2 个视图 {label, shapes}）");
      return;
    }
    var layout = params.layout === "stack" ? "stack" : "toggle";

    var wrap = el("div", "ix-geo-wrap");
    container.appendChild(wrap);

    function paintView(svg, fr, v) {
      clearSvg(svg);
      ((v || {}).shapes || []).forEach(function (sh) { drawGeoShape(svg, sh, fr); });
      // 切换淡入
      svg.classList.remove("ix-frame");
      void svg.getBoundingClientRect();
      svg.classList.add("ix-frame");
    }

    if (layout === "toggle") {
      var seg = el("div", "ix-seg-row");
      var segCtl = el("div", "ix-seg");
      var btns = views.map(function (v, i) {
        var b = el("button", i === 0 ? "on" : "", esc(v.label || ("视图" + (i + 1))));
        b.type = "button";
        b.addEventListener("click", function () { show(i); });
        segCtl.appendChild(b);
        return b;
      });
      seg.appendChild(segCtl);
      wrap.appendChild(seg);
      var fr = geoFrame();
      wrap.appendChild(fr.svg);
      var cap = el("div", "ix-step-cap", "");
      wrap.appendChild(cap);
      function show(i) {
        paintView(fr.svg, fr, views[i]);
        cap.textContent = views[i].caption || "";
        btns.forEach(function (b, k) { b.classList.toggle("on", k === i); });
      }
      show(0);
    } else {
      // stack：上下堆叠，各带标题与说明
      views.forEach(function (v) {
        var vh = el("div", "ix-view-label", esc(v.label || ""));
        wrap.appendChild(vh);
        var fr2 = geoFrame(300);
        paintView(fr2.svg, fr2, v);
        wrap.appendChild(fr2.svg);
        if (v.caption) wrap.appendChild(el("div", "ix-step-cap", esc(v.caption)));
      });
    }
  }

  /* ============================================================
   * 17. proof-replay 证明慢放机（几何）
   * params: {given?, goal?, steps:[{caption?, card?, shapes:[DSL],
   *           why?, reason?}], summary?:[{statement, reason}]}
   *
   * 教学设计 §4.2：每步三件套 = 画布高亮 + 人话卡片（≤40 字，说
   * "这一步在干什么"）+ "为什么可以？"折叠（每个"因为"都有出
   * 处）；播完出两栏式"证明书"（左陈述 / 右理由）；页首三问：
   * 已知（蓝）/ 求证（红）/ 第一步依据。
   * 黄队字段兼容：主文案 = caption || card；依据 = why || reason。
   * 公式走 MX()（MathML / 降级），不许裸文本。
   * ============================================================ */
  function renderProofReplay(container, params) {
    var G = window.GEOM;
    if (!G) {
      container.appendChild(el("div", "ix-stub", "几何原语库未加载（js/geom-primitives.js）"));
      return;
    }
    var steps = params.steps;
    if (!Array.isArray(steps) || !steps.length) {
      geoErr(container, "proof-replay 需要 steps（非空数组，每步 {caption/card, shapes, why/reason}）");
      return;
    }
    var iv = Number(params.interval);
    var interval = isFinite(iv) ? Math.max(1000, Math.min(5000, iv)) : 2200;
    var hasSummary = Array.isArray(params.summary) && params.summary.length > 0;

    var wrap = el("div", "ix-geo-wrap ix-proof-replay");

    // 三问之已知 / 求证（已知标蓝，求证标红）
    // （蓝队 2026-10-11 白队一屏终查 B1/B2）每个"已知/求证"包成不可断行
    // 的 .ix-proof-meta-item，CSS 里单行优先、放不下时优雅换行（紧凑双行）
    if (params.given || params.goal) {
      var meta = el("div", "ix-proof-meta");
      if (params.given) {
        var givenItem = el("span", "ix-proof-meta-item");
        givenItem.appendChild(el("span", "ix-chip ix-chip-known", "已知"));
        givenItem.appendChild(el("span", "ix-proof-meta-expr", MX(params.given)));
        meta.appendChild(givenItem);
      }
      if (params.goal) {
        var goalItem = el("span", "ix-proof-meta-item");
        goalItem.appendChild(el("span", "ix-chip ix-chip-target", "求证"));
        goalItem.appendChild(el("span", "ix-proof-meta-expr", MX(params.goal)));
        meta.appendChild(goalItem);
      }
      wrap.appendChild(meta);
    }

    var readout = el("div", "ix-geo-readout", "");
    wrap.appendChild(readout);
    var fr = geoFrame();
    // （蓝队 2026-10-11 白队一屏终查 B1/B2）ix-frame-proof：移动端画布
    // 限高 22vh（原通用 26vh），只收紧 proof-replay，不碰其它交互
    var frameBox = el("div", "ix-frame ix-frame-proof");
    frameBox.appendChild(fr.svg);
    wrap.appendChild(frameBox);
    var cap = el("div", "ix-step-cap", "");
    wrap.appendChild(cap);
    var cardBox = el("div", "ix-proof-card", "");
    wrap.appendChild(cardBox);
    var whyBox = el("details", "ix-why");
    wrap.appendChild(whyBox);

    var ctrl = el("div", "ix-step-ctrl");
    function mkBtn(label) {
      var b = el("button", "ix-btn", label);
      b.type = "button";
      ctrl.appendChild(b);
      return b;
    }
    var btnPrev = mkBtn("◀ 上一步");
    var btnPlay = mkBtn("▶ 播放");
    var btnNext = mkBtn("下一步 ▶");
    var btnRestart = mkBtn("↺ 重头");
    wrap.appendChild(ctrl);

    // 证明书：两栏式收尾（左栏陈述 / 右栏理由），默认折叠
    var cert = null;
    if (hasSummary) {
      cert = el("details", "ix-proof-cert");
      cert.appendChild(el("summary", "", "证明书：陈述 ↔ 理由（两栏对照）"));
      var table = el("table", "ix-proof-table");
      table.appendChild(el("thead", "",
        "<tr><th>陈述（做了什么）</th><th>理由（凭什么）</th></tr>"));
      var tbody = el("tbody", "");
      params.summary.forEach(function (row, i) {
        var tr = el("tr", "");
        tr.appendChild(el("td", "",
          '<span class="ix-proof-num">' + (i + 1) + "</span>" +
          MX(row.statement || "")));
        tr.appendChild(el("td", "", MX(row.reason || "")));
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      cert.appendChild(table);
      wrap.appendChild(cert);
    }
    container.appendChild(wrap);

    var idx = 0, playing = false, timer = null;
    function show(i, flashIt) {
      idx = Math.max(0, Math.min(steps.length - 1, i));
      var st = steps[idx] || {};
      clearSvg(fr.svg);
      (st.shapes || []).forEach(function (sh) { drawGeoShape(fr.svg, sh, fr); });
      // 主文案：caption || card；caption 与 card 都存在且不同 → card 另出人话卡片
      var main = st.caption || st.card || "";
      cap.textContent = main;
      if (st.caption && st.card && st.caption !== st.card) {
        cardBox.style.display = "";
        cardBox.innerHTML = '<span class="ix-proof-card-tag">人话</span>' + esc(st.card);
      } else {
        cardBox.style.display = "none";
      }
      // "为什么可以？"折叠：每个"因为"都有出处
      var why = st.why || st.reason || "";
      if (why) {
        whyBox.style.display = "";
        whyBox.innerHTML = "";
        whyBox.appendChild(el("summary", "", "为什么可以？"));
        whyBox.appendChild(el("div", "", esc(why)));
        whyBox.open = false;
      } else {
        whyBox.style.display = "none";
      }
      readout.innerHTML = '<span class="ix-val">第 ' + (idx + 1) + " / " + steps.length + " 步</span>";
      btnPrev.disabled = idx === 0;
      btnNext.disabled = idx === steps.length - 1;
      // 帧切换淡入 + M6 视觉反馈
      frameBox.classList.remove("ix-frame");
      void frameBox.offsetWidth;
      frameBox.classList.add("ix-frame");
      if (flashIt) G.flash(fr.svg, 250);
    }
    function stop(atEnd) {
      playing = false;
      if (timer) { clearInterval(timer); timer = null; }
      btnPlay.innerHTML = "▶ 播放";
      // 播完出证明书：自动展开两栏对照
      if (atEnd && cert) cert.open = true;
    }
    btnPrev.addEventListener("click", function () { stop(false); show(idx - 1, true); });
    btnNext.addEventListener("click", function () { stop(false); show(idx + 1, true); });
    btnRestart.addEventListener("click", function () { stop(false); show(0, true); });
    btnPlay.addEventListener("click", function () {
      if (playing) { stop(false); return; }
      if (idx >= steps.length - 1) show(0);
      playing = true;
      btnPlay.innerHTML = "⏸ 暂停";
      timer = setInterval(function () {
        if (idx >= steps.length - 1) stop(true);
        else show(idx + 1, false);
      }, interval);
    });

    show(0, false);
  }

  /* ============================================================
   * 18. construction-step 作图步骤机（几何）
   * params: {steps:[{text, why, shapes:[DSL]}]}
   *
   * 教学设计 §4.1/§9.2：每步一句话指令（动词开头）+ 本步作图帧 +
   * "为什么这样画"折叠；控制条：◀/▶ 单步、▶ 播放、↺ 倒带、
   * 观看/跟做模式切换。跟做模式下点"下一步"先进入"待画"状态
   * （遮罩 + 本步指令）：学生先在心里/纸上比划，再点"我画好了，
   * 看这一步"揭晓验证——验证失败不惩罚（无扣分无红叉）。
   * ============================================================ */
  function renderConstructionStep(container, params) {
    var G = window.GEOM;
    if (!G) {
      container.appendChild(el("div", "ix-stub", "几何原语库未加载（js/geom-primitives.js）"));
      return;
    }
    var steps = params.steps;
    if (!Array.isArray(steps) || !steps.length) {
      geoErr(container, "construction-step 需要 steps（非空数组，每步 {text, why, shapes}）");
      return;
    }
    var iv = Number(params.interval);
    var interval = isFinite(iv) ? Math.max(1000, Math.min(4000, iv)) : 1800;

    var wrap = el("div", "ix-geo-wrap");

    // 观看 / 跟做 模式切换
    var modeRow = el("div", "ix-seg-row");
    var modeCtl = el("div", "ix-seg");
    var btnWatch = el("button", "on", "观看");
    btnWatch.type = "button";
    var btnFollow = el("button", "", "跟做");
    btnFollow.type = "button";
    modeCtl.appendChild(btnWatch);
    modeCtl.appendChild(btnFollow);
    modeRow.appendChild(modeCtl);
    wrap.appendChild(modeRow);

    var readout = el("div", "ix-geo-readout", "");
    wrap.appendChild(readout);
    var fr = geoFrame();
    var frameBox = el("div", "ix-frame");
    frameBox.style.position = "relative";
    frameBox.appendChild(fr.svg);
    // "待画"遮罩（跟做模式用）
    var pending = el("div", "ix-construct-pending");
    pending.style.display = "none";
    frameBox.appendChild(pending);
    wrap.appendChild(frameBox);

    var cap = el("div", "ix-step-cap", "");
    wrap.appendChild(cap);
    var whyBox = el("details", "ix-why");
    wrap.appendChild(whyBox);

    var ctrl = el("div", "ix-step-ctrl");
    function mkBtn(label) {
      var b = el("button", "ix-btn", label);
      b.type = "button";
      ctrl.appendChild(b);
      return b;
    }
    var btnPrev = mkBtn("◀ 上一步");
    var btnPlay = mkBtn("▶ 播放");
    var btnNext = mkBtn("下一步 ▶");
    var btnRestart = mkBtn("↺ 倒带");
    wrap.appendChild(ctrl);
    container.appendChild(wrap);

    var idx = 0, playing = false, timer = null, follow = false, revealed = true;

    function paint(i) {
      var st = steps[i] || {};
      clearSvg(fr.svg);
      (st.shapes || []).forEach(function (sh) { drawGeoShape(fr.svg, sh, fr); });
      frameBox.classList.remove("ix-frame");
      void frameBox.offsetWidth;
      frameBox.classList.add("ix-frame");
      G.flash(fr.svg, 250);
    }
    // 跟做"待画"：画布停在上一步，只出本步指令遮罩
    function showPending(i) {
      var st = steps[i] || {};
      clearSvg(fr.svg);
      if (i > 0) {
        var prev = steps[i - 1] || {};
        (prev.shapes || []).forEach(function (sh) { drawGeoShape(fr.svg, sh, fr); });
      }
      pending.style.display = "";
      pending.innerHTML = "";
      pending.appendChild(el("div", "ix-construct-pending-step",
        "第 " + (i + 1) + " 步（待画）"));
      pending.appendChild(el("div", "ix-construct-pending-text", esc(st.text || "")));
      pending.appendChild(el("div", "ix-hint", "先在纸上 / 心里比划，再看答案验证"));
      var rv = el("button", "ix-btn", "我画好了，看这一步");
      rv.type = "button";
      rv.addEventListener("click", function () {
        revealed = true;
        pending.style.display = "none";
        paint(i);
      });
      pending.appendChild(rv);
    }
    function show(i, opts) {
      opts = opts || {};
      stop();
      idx = Math.max(0, Math.min(steps.length - 1, i));
      var st = steps[idx] || {};
      cap.innerHTML = '<span class="ix-val">第 ' + (idx + 1) + " 步：</span>" + esc(st.text || "");
      var why = st.why || "";
      if (why) {
        whyBox.style.display = "";
        whyBox.innerHTML = "";
        whyBox.appendChild(el("summary", "", "为什么这样画？"));
        whyBox.appendChild(el("div", "", esc(why)));
        whyBox.open = false;
      } else {
        whyBox.style.display = "none";
      }
      readout.innerHTML = '<span class="ix-val">第 ' + (idx + 1) + " / " + steps.length + " 步</span>";
      btnPrev.disabled = idx === 0;
      btnNext.disabled = idx === steps.length - 1;
      // 跟做模式：前进时进入"待画"（后退/倒带直接看）
      if (follow && !opts.reveal && i > opts.from) {
        revealed = false;
        showPending(idx);
      } else {
        revealed = true;
        pending.style.display = "none";
        paint(idx);
      }
    }
    function stop() {
      playing = false;
      if (timer) { clearInterval(timer); timer = null; }
      btnPlay.innerHTML = "▶ 播放";
    }
    var fromIdx = 0;
    btnPrev.addEventListener("click", function () {
      fromIdx = idx;
      show(idx - 1, { from: fromIdx, reveal: true });
    });
    btnNext.addEventListener("click", function () {
      fromIdx = idx;
      show(idx + 1, { from: fromIdx });
    });
    btnRestart.addEventListener("click", function () {
      fromIdx = 0;
      show(0, { from: 0, reveal: true });
    });
    btnPlay.addEventListener("click", function () {
      if (playing) { stop(); return; }
      if (idx >= steps.length - 1) { fromIdx = -1; show(0, { from: -1, reveal: true }); }
      playing = true;
      btnPlay.innerHTML = "⏸ 暂停";
      timer = setInterval(function () {
        if (idx >= steps.length - 1) stop();
        else { fromIdx = idx; show(idx + 1, { from: fromIdx, reveal: true }); }
      }, interval);
    });
    function setFollow(f) {
      follow = f;
      btnWatch.classList.toggle("on", !f);
      btnFollow.classList.toggle("on", f);
      if (!f) { pending.style.display = "none"; revealed = true; paint(idx); }
    }
    btnWatch.addEventListener("click", function () { setFollow(false); });
    btnFollow.addEventListener("click", function () { setFollow(true); });

    show(0, { from: -1, reveal: true });
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
  ixRegister("vertex-drag", renderVertexDrag);
  ixRegister("angle-protractor", renderAngleProtractor);
  ixRegister("step-play", renderStepPlay);
  ixRegister("tap-highlight", renderTapHighlight);
  ixRegister("compare-toggle", renderCompareToggle);
  ixRegister("proof-replay", renderProofReplay);
  ixRegister("construction-step", renderConstructionStep);
})();
