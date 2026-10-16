/* ============================================================
 * 学习工具箱 · 化学 · BondStep 渲染器（波 C，2026.10.16.9）
 * 成键/断键分步呈现：与 Eng.StepPlayer 结合（前进/后退/重播/慢放/键盘），
 * 步内连续变化用 Eng.Tween 缓动（CHEMC-53 键角连续、CHEMC-29 电子对连续偏移、
 * CHEMC-75 电子连续位移——禁止跳变/瞬移）。
 *
 * 数据口径：化学专家队 chem-truth-criteria-C.md §二/§三/§六。
 * 步骤格式：{stepIndex, label, break:[键名…], form:[键名…],
 *            transfer?, energyLabel?, curveSlopeSign?}（§六 6.1）。
 * 分步铁律：单步单事件（CHEMC-20）、顺序冻结（CHEMC-22）、
 * 禁止先成后断（CHEMC-23，一票否决）。
 * 能量：白名单 −57.3/−571.6/285.8 kJ/mol（CHEMC-24，出处 cm18.1.1-p1）；
 * 禁止编造单键键能（CHEMC-25）；点燃/加热只作条件旁注（CHEMC-28/67）。
 * 线型：化学键实线、氢键/分子间作用力虚线（CHEMC-30）。
 * 字号：SVG 内文字 ≥3.4 逻辑单位（≈12.48px@390宽，YC-F/V8）。
 *
 * 依赖：window.Eng（StepPlayer/Tween/easeInOutCubic/FONT_STACK）。
 * 对外：window.ChemBond.render(params) → DOM 节点；
 *       chemistry.js 注册 "bond-step" 类型时调用。
 * IIFE + var，零构建，file:// 可跑。
 * ============================================================ */
(function () {
  'use strict';
  var SVG_NS = 'http://www.w3.org/2000/svg';
  /* YC-F：SVG 逻辑字号下限（viewBox 宽 100 → 390px 视口下 3.4≈13.3px） */
  var FS_MIN = 3.4;

  function el(tag, cls, text) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (text != null) d.textContent = text;
    return d;
  }
  function svgEl(name, attrs) {
    var n = document.createElementNS(SVG_NS, name);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function font(px) {
    var stack = (window.Eng && window.Eng.FONT_STACK) ||
      '-apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
    return px + 'px ' + stack;
  }

  /* ---------------- 步骤校验（CHEMC-20/21/22/23 生产侧自检） ---------------- */
  function validateSteps(steps) {
    var problems = [];
    (steps || []).forEach(function (st, i) {
      var nb = (st['break'] || []).length, nf = (st.form || []).length;
      var nt = st.transfer ? 1 : 0;
      /* 单步单事件：break/form/transfer/挤压/标注呈现 计一次事件；
       * 协同断裂（simultaneousBreak）计一次（CHEMC-20 例外口径） */
      var events = nb + nf + nt;
      if (st.simultaneousBreak) events = events - nb + 1;
      if (st.squeeze) events += 1;    /* 一次孤对挤压（CHEMC-20） */
      if (st.annotate) events += 1;   /* 标注/呈现类事件（CHEMC-20"呈现"） */
      if (events !== 1) problems.push('step' + i + ': 事件数=' + events + '（CHEMC-20 单步单事件）');
      if (st.stepIndex !== undefined && st.stepIndex !== i)
        problems.push('step' + i + ': stepIndex=' + st.stepIndex + ' 错位（CHEMC-22）');
    });
    /* CHEMC-23：form 不得先于 break（按步骤序检查） */
    var brokeAt = {}, formedAt = {};
    (steps || []).forEach(function (st, i) {
      (st['break'] || []).forEach(function (b) { if (brokeAt[b] === undefined) brokeAt[b] = i; });
      (st.form || []).forEach(function (f) { if (formedAt[f] === undefined) formedAt[f] = i; });
    });
    Object.keys(formedAt).forEach(function (f) {
      if (brokeAt[f] !== undefined && formedAt[f] < brokeAt[f])
        problems.push('键' + f + ': form 先于 break（CHEMC-23 一票否决）');
    });
    return problems;
  }

  /* ---------------- BondStep 主入口 ---------------- */
  function renderBondStep(p) {
    p = p || {};
    var steps = p.steps || [];
    var layout = p.layout || 'bond-shift';
    var scene = p.scene || {};
    var problems = validateSteps(steps);
    if (problems.length && typeof console !== 'undefined' && console.warn)
      console.warn('[ChemBond] 步骤校验: ' + problems.join('; '));

    var box = el('div', 'chm-widget chm-bondstep', '');
    if (p.title) box.appendChild(el('div', 'chm-bondstep-title', p.title));

    var svg = svgEl('svg', {
      viewBox: '0 0 100 62', 'class': 'chm-bondstep-stage',
      role: 'img', 'aria-label': p.ariaLabel || '成键断键分步示意'
    });
    box.appendChild(svg);

    /* 能量曲线小图（C5/C7 催化剂） */
    var eSvg = null;
    if (scene.energyCurve) {
      eSvg = svgEl('svg', {
        viewBox: '0 0 100 40', 'class': 'chm-bondstep-energy',
        role: 'img', 'aria-label': '能量曲线示意'
      });
      box.appendChild(eSvg);
    }

    var caption = el('div', 'chm-replay-caption', '');
    box.appendChild(caption);
    var stepTag = el('div', 'chm-replay-step', '');
    box.appendChild(stepTag);

    /* 播放条（复用 chm-playbar 样式） */
    var bar = el('div', 'chm-playbar', '');
    function btn(t, label) { var b = el('button', '', t); b.type = 'button'; b.setAttribute('aria-label', label); return b; }
    var prevB = btn('‹', '上一步'), playB = btn('▶', '播放/暂停'),
        reB = btn('↺', '重播'), nextB = btn('›', '下一步'),
        slowB = btn('0.5×', '慢放');
    bar.appendChild(prevB); bar.appendChild(playB); bar.appendChild(reB);
    bar.appendChild(nextB); bar.appendChild(slowB);
    box.appendChild(bar);

    if (p.reminder) {
      var rm = el('div', 'chm-note chm-bondstep-reminder', '');
      rm.textContent = p.reminder;
      box.appendChild(rm);
    }
    if (p.legend) {
      var lg = el('div', 'chm-note chm-bondstep-legend', '');
      lg.innerHTML = esc(p.legend);
      box.appendChild(lg);
    }

    /* ---- 状态机：u∈[0,1] 为帧内插值进度；帧序号由 player.frameIndex() 唯一确定 ----
     * 语义：primitive.step(MICRO) = "进入下一帧初态"（u 归零）；
     * 帧内 0→1 的连续变化由 Eng.Tween 驱动（自动播）或手动置位。 */
    var MICRO = 60;
    var stu = { u: 0 };
    var summaries = steps.map(function (s) { return s.label || ''; });
    /* YP-22：stepSummaries 不许空 */
    for (var si = 0; si < summaries.length; si++)
      if (!summaries[si]) summaries[si] = '第 ' + (si + 1) + ' 步';

    var primitive = {
      _player: null,
      step: function (n) { stu.u = 0; },
      reset: function () { stu.u = 0; },
      snapshot: function () { return { u: stu.u }; },
      restore: function (s) { stu.u = Math.max(0, Math.min(1, +s.u || 0)); },
      simTimeSec: function () {
        return (this._player ? this._player.frameIndex() : 0) * 1.5 + stu.u * 1.5;
      },
      stepCountN: function () {
        return (this._player ? this._player.frameIndex() : 0) * MICRO + Math.round(stu.u * MICRO);
      }
    };

    var Eng = window.Eng;
    var player = new Eng.StepPlayer({
      primitive: primitive,
      stepsPerFrame: MICRO,
      totalFrames: Math.max(1, steps.length - 1),
      stepSummaries: summaries,
      assumptions: (p.ax01 && p.ax01.assumptions) || ['分步为教学示意'],
      approximations: (p.ax01 && p.ax01.approximations) || ['二维示意'],
      errorEstimate: (p.ax01 && p.ax01.errorEstimate) || '定性示意，无数值误差口径',
      onFrame: function () { paint(); }
    });
    primitive._player = player;
    /* 注：totalFrames = steps.length-1（frame 0 为初态）；next() 到末帧停 */

    var ease = Eng.Tween.easeInOutCubic;
    var autoTween = null, holdTimer = null, playing = false, speed = 1;
    var HOLD_MS = p.holdMs || 2500;   /* 关键帧停留 2–4s（黄队） */
    var STEP_MS = p.stepMs || 1600;

    function curFrame() { return player.frameIndex(); }
    function paint() {
      var F = curFrame();
      drawScene(svg, layout, scene, steps, F, ease(stu.u), FS_MIN);
      if (eSvg) drawEnergy(eSvg, scene.energyCurve, steps, F, ease(stu.u));
      var cur = steps[F] || {};
      caption.textContent = cur.caption || cur.label || '';
      stepTag.textContent = steps.length ? '第 ' + (F + 1) + ' 步 / 共 ' + steps.length + ' 步' : '';
      prevB.disabled = F === 0;
      nextB.disabled = F === steps.length - 1;
      playB.textContent = playing ? '⏸' : '▶';
    }

    function stopAuto() {
      playing = false;
      if (autoTween) { autoTween.cancel(); autoTween = null; }
      if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
      paint();
    }
    function autoNext() {
      if (curFrame() >= steps.length - 1) { stopAuto(); return; }
      autoTween = Eng.Tween({
        durationMs: STEP_MS / speed,
        onUpdate: function (u) { stu.u = u; paint(); },
        onDone: function () {
          stu.u = 1; paint();
          holdTimer = setTimeout(function () {
            holdTimer = null;
            player.next(); stu.u = 0; paint();
            if (playing) autoNext();
          }, HOLD_MS);
        }
      });
      stu.u = 0;
      autoTween.start();
    }
    function togglePlay() {
      if (playing) { stopAuto(); return; }
      playing = true;
      if (curFrame() >= steps.length - 1) { player.gotoFrame(0); stu.u = 0; }
      paint();
      autoNext();
    }

    prevB.addEventListener('click', function () { stopAuto(); player.prev(); stu.u = 0; paint(); });
    nextB.addEventListener('click', function () { stopAuto(); player.next(); stu.u = 0; paint(); });
    reB.addEventListener('click', function () { stopAuto(); player.replay(); stu.u = 0; paint(); });
    playB.addEventListener('click', togglePlay);
    slowB.addEventListener('click', function () {
      speed = speed === 1 ? 0.5 : 1;
      slowB.textContent = speed === 1 ? '0.5×' : '1×';
      slowB.classList.toggle('on', speed !== 1);
    });
    player.bindKeys(box);
    box.tabIndex = 0;

    /* 调试/自测句柄（白队复验与过程证据采样用） */
    box._bond = {
      player: player,
      steps: steps,
      state: function () { return { frame: player.frameIndex(), u: stu.u }; },
      validateProblems: problems
    };
    if (p.autoplay) togglePlay(); else paint();
    return box;
  }

  /* ============ 场景绘制 ============ */
  function atomCircle(g, x, y, r, label, fs) {
    g.appendChild(svgEl('circle', {
      cx: x, cy: y, r: r, fill: '#FFFFFF',
      stroke: 'var(--chm-ink, #1A1A1A)', 'stroke-width': 0.7
    }));
    var t = svgEl('text', {
      x: x, y: y + fs * 0.36, 'text-anchor': 'middle',
      'font-size': fs, fill: 'var(--chm-ink, #1A1A1A)', 'font-weight': '700'
    });
    t.textContent = label;
    t.setAttribute('style', 'font-family:' + font(10).replace(/^\d+px\s*/, ''));
    g.appendChild(t);
  }
  function bondLine(g, x1, y1, x2, y2, dashed, w) {
    var a = { x1: x1, y1: y1, x2: x2, y2: y2, stroke: 'var(--chm-ink, #1A1A1A)', 'stroke-width': w || 1.1 };
    if (dashed) a['stroke-dasharray'] = '2.4 1.8';
    g.appendChild(svgEl('line', a));
  }
  function noteText(g, x, y, str, fs, anchor) {
    var t = svgEl('text', {
      x: x, y: y, 'text-anchor': anchor || 'middle',
      'font-size': Math.max(fs || FS_MIN, FS_MIN), fill: 'var(--chm-ink-soft, #555)'
    });
    t.textContent = str;
    t.setAttribute('style', 'font-family:' + font(10).replace(/^\d+px\s*/, ''));
    g.appendChild(t);
    return t;
  }
  function lerp(a, b, u) { return a + (b - a) * u; }

  /* 布局：bond-shift（C1 共价键极性） */
  function drawBondShift(svg, scene, steps, frame, u) {
    svg.innerHTML = '';
    var ex = (scene.examples && scene.examples[scene.exampleIndex || 0]) || {};
    var st = steps[frame] || {};
    /* 原子位置插值 */
    var pos = {};
    (st.atoms || ex.atoms || []).forEach(function (a) {
      pos[a.id] = {
        x: lerp(a.x0 !== undefined ? a.x0 : a.x, a.x1 !== undefined ? a.x1 : a.x, u),
        y: a.y, label: a.label
      };
    });
    var ids = Object.keys(pos);
    /* 键线（form 之后出现） */
    var formed = frame > 0 || (frame === 0 && u >= 1 && (st.form || []).length);
    if (ids.length >= 2 && (st.form || []).length && (frame >= 1 || u > 0.3)) {
      var A = pos[ids[0]], B = pos[ids[1]];
      bondLine(svg, A.x, A.y, B.x, B.y, false, 1.2);
    }
    /* 共用电子对云（椭圆，连续偏移 CHEMC-29） */
    var pr = st.pair || {};
    if (pr.show && ids.length >= 2) {
      var A2 = pos[ids[0]], B2 = pos[ids[1]];
      var mx = (A2.x + B2.x) / 2, my = (A2.y + B2.y) / 2;
      var shift = lerp(pr.shift0 || 0, pr.shift1 || 0, u); /* -1..1，>0 偏向 B */
      var bondLen = Math.hypot(B2.x - A2.x, B2.y - A2.y) || 1;
      var dirSgn = pr.shiftTo === 'A' ? -1 : 1; /* 偏向哪一端（CHEMC-48：指向 Cl） */
      var cx = mx + dirSgn * shift * bondLen * 0.42;
      var op = pr.appear === false ? 0 : Math.min(1, u * 2);
      var e = svgEl('ellipse', {
        cx: cx, cy: my, rx: 7.5, ry: 4.6,
        fill: 'var(--chm-electron-cloud, #B3D9FF)', opacity: 0.55 * op,
        stroke: 'var(--chm-ink-soft, #555)', 'stroke-width': 0.5, 'stroke-dasharray': '1.6 1.2'
      });
      svg.appendChild(e);
      if (pr.shiftLabel && u > 0.6) noteText(svg, cx, my - 7, pr.shiftLabel, 3.6);
    }
    ids.forEach(function (id) {
      var q = pos[id];
      atomCircle(svg, q.x, q.y, 6.5, q.label, 5);
    });
    if (st.note) noteText(svg, 50, 58, st.note, 3.6);
  }

  /* 布局：hybrid（C2 杂化+VSEPR） */
  function drawHybrid(svg, scene, steps, frame, u) {
    svg.innerHTML = '';
    var st = steps[frame] || {};
    var cx = 50, cy = 32;
    /* 中心原子 */
    atomCircle(svg, cx, cy, 7, scene.center || 'C', 5.5);
    /* 轨道瓣：4 个方向按当前键角分布（平面投影示意） */
    var ang = st.bondAngleDeg !== undefined ? st.bondAngleDeg :
      (st.lonePairs === 2 ? 105 : st.lonePairs === 1 ? 107 : 109.5);
    if (st.bondAngleFrom !== undefined)
      ang = lerp(st.bondAngleFrom, st.bondAngleDeg, u); /* CHEMC-53 连续插值 */
    var lone = st.lonePairs || 0;
    var dirs = [];
    /* 简化投影：左右两对，按 ang/2 对称张开 */
    var half = (ang / 2) * Math.PI / 180;
    dirs = [
      { x: Math.cos(Math.PI - half), y: -Math.sin(Math.PI - half), lone: false },
      { x: Math.cos(Math.PI + half), y: -Math.sin(Math.PI + half), lone: false },
      { x: Math.cos(-half), y: -Math.sin(-half), lone: lone >= 1 },
      { x: Math.cos(half), y: -Math.sin(half), lone: lone >= 2 }
    ];
    dirs.forEach(function (d, i) {
      var ex = cx + d.x * 20, ey = cy + d.y * 16;
      if (d.lone) {
        var lp = svgEl('ellipse', {
          cx: cx + d.x * 11, cy: cy + d.y * 9, rx: 5.2, ry: 3.6,
          fill: 'var(--chm-lonepair, #FFD54F)', opacity: 0.85,
          stroke: 'var(--chm-ink-soft, #555)', 'stroke-width': 0.5,
          transform: 'rotate(' + (Math.atan2(d.y, d.x) * 180 / Math.PI) + ' ' + (cx + d.x * 11) + ' ' + (cy + d.y * 9) + ')'
        });
        svg.appendChild(lp);
        noteText(svg, cx + d.x * 17, cy + d.y * 14, '孤对', 3.4);
      } else {
        bondLine(svg, cx + d.x * 7, cy + d.y * 6, ex, ey, false, 1.2);
        atomCircle(svg, ex, ey, 5, 'H', 4.4);
      }
    });
    /* Step1 杂化示意：s/p → 4 等同瓣 */
    if (st.hybridFrom) {
      noteText(svg, 50, 8, '1s + 3p → 4 个等同 sp³ 轨道（定性）', 3.6);
    }
    /* 键角大字标注（≥FS_MIN） */
    var at = svgEl('text', {
      x: 50, y: 58, 'text-anchor': 'middle', 'font-size': 5.2,
      fill: 'var(--chm-ink, #1A1A1A)', 'font-weight': '700'
    });
    at.textContent = '键角 ' + ang.toFixed(1) + '°';
    at.setAttribute('style', 'font-family:' + font(10).replace(/^\d+px\s*/, ''));
    svg.appendChild(at);
    if (st.note) noteText(svg, 50, 13, st.note, 3.6);
  }

  /* 布局：h-bond（C3 氢键） */
  function drawHBond(svg, scene, steps, frame, u) {
    svg.innerHTML = '';
    var st = steps[frame] || {};
    var sep = st.sep !== undefined ? lerp(st.sepFrom !== undefined ? st.sepFrom : st.sep, st.sep, u) : 26;
    if (st.sepFrom !== undefined) sep = lerp(st.sepFrom, st.sep, u);
    var cx1 = 50 - sep / 2, cx2 = 50 + sep / 2, cy = 32;
    function water(g, cx, flip) {
      var s = flip ? -1 : 1;
      g.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 7, fill: '#B3D9FF', stroke: 'var(--chm-ink,#1A1A1A)', 'stroke-width': 0.7 }));
      noteText(g, cx, cy + 2, 'O', 4.6);
      g.appendChild(svgEl('circle', { cx: cx + s * 9, cy: cy - 6, r: 4, fill: '#FFFFFF', stroke: 'var(--chm-ink,#1A1A1A)', 'stroke-width': 0.6 }));
      noteText(g, cx + s * 9, cy - 4.4, 'H', 3.8);
      g.appendChild(svgEl('circle', { cx: cx + s * 9, cy: cy + 6, r: 4, fill: '#FFFFFF', stroke: 'var(--chm-ink,#1A1A1A)', 'stroke-width': 0.6 }));
      noteText(g, cx + s * 9, cy + 7.6, 'H', 3.8);
      bondLine(g, cx + 5, cy - 3, cx + s * 9 - 3, cy - 6, false, 0.9);
      bondLine(g, cx + 5, cy + 3, cx + s * 9 - 3, cy + 6, false, 0.9);
    }
    water(svg, cx1, false);
    var isH2S = st.compare === 'H2S';
    if (isH2S) {
      noteText(svg, cx2, cy, 'H₂S（无"拉手"）', 3.8);
    } else {
      water(svg, cx2, true);
    }
    /* 氢键虚线（CHEMC-30/56）：距离 < 阈值出现 */
    var showHB = st.hbond === true || (st.hbondFrom !== undefined && u > 0.5);
    if (showHB && !isH2S) {
      var x1 = cx1 + 9, x2 = cx2 - 9;
      bondLine(svg, x1, cy - 6, x2, cy - 6, true, 1.3);
      noteText(svg, (x1 + x2) / 2, cy - 11, 'O−H···O 氢键', 3.6);
    }
    if (st.note) noteText(svg, 50, 58, st.note, 3.6);
  }

  /* 布局：substitute（C4 取代/消去对照） */
  function drawSubstitute(svg, scene, steps, frame, u) {
    svg.innerHTML = '';
    var st = steps[frame] || {};
    var lanes = [
      { x: 25, title: '取代', cond: 'NaOH 水溶液，加热' },
      { x: 75, title: '消去', cond: 'NaOH 醇溶液，加热' }
    ];
    lanes.forEach(function (L, li) {
      noteText(svg, L.x, 6, L.title, 4.2);
      noteText(svg, L.x, 11, '条件：' + L.cond, 3.4);
      var active = (st.lane === li);
      var g = svgEl('g', { opacity: active ? 1 : 0.38 });
      svg.appendChild(g);
      if (li === 0) {
        /* CH3CH2Br → CH3CH2OH */
        noteText(g, L.x - 12, 26, 'CH₃CH₂', 4);
        atomCircle(g, L.x + 2, 26, 5.5, 'Br', 4.2);
        var brk = active && (st['break'] || []).indexOf('C–Br') >= 0;
        if (!(active && brk && u > 0.4)) bondLine(g, L.x - 6, 26, L.x - 3, 26, false, 1.1);
        if (active && brk) {
          var by = 26 + u * 12;
          atomCircle(g, L.x + 2, by, 5.5, 'Br', 4.2);
          noteText(g, L.x, 46, 'C–Br 断裂', 3.4);
        }
        var frm = active && (st.form || []).indexOf('C–O') >= 0;
        if (frm) {
          bondLine(g, L.x - 6, 26, L.x - 2, 26, false, 1.1);
          noteText(g, L.x + 10, 26, 'OH', 4);
          noteText(g, L.x, 46, 'C–O 形成', 3.4);
        }
      } else {
        /* 右栏：消去 CH3CH2Br → CH2=CH2 */
        var brk2 = active && (st['break'] || []).length > 0;
        var frm2 = active && (st.form || []).indexOf('C=C') >= 0;
        if (frm2) {
          /* E2 成键态：CH2=CH2 */
          noteText(g, L.x - 6, 26, 'CH₂', 4.2);
          noteText(g, L.x + 6, 26, 'CH₂', 4.2);
          bondLine(g, L.x - 2, 24.6, L.x + 2, 24.6, false, 1.2);
          bondLine(g, L.x - 2, 27.4, L.x + 2, 27.4, false, 1.2);
          noteText(g, L.x, 40, 'C=C 形成', 3.6);
          noteText(g, L.x, 47, 'CH₂=CH₂', 4);
        } else if (brk2) {
          /* E1 断键态：C–Br 与 β-C–H 同时断裂（CHEMC-20 例外口径注记） */
          if (st.simultaneousBreak && u > 0.3)
            noteText(g, L.x, 17, 'C–Br 与 C–H 同时断裂', 3.4);
          noteText(g, L.x - 12, 26, 'CH₂', 4);
          noteText(g, L.x + 2, 26, 'CH₂', 4);
          var bdy = 26 + u * 10;
          atomCircle(g, L.x + 13, bdy, 5, 'Br', 4);
          noteText(g, L.x, 47, 'HBr 脱去', 3.6);
        } else {
          /* 初态：CH3CH2Br */
          noteText(g, L.x - 12, 26, 'CH₃CH₂', 4);
          bondLine(g, L.x - 5, 26, L.x + 1, 26, false, 1.1);
          atomCircle(g, L.x + 7, 26, 5.5, 'Br', 4.2);
        }
      }
    });
    if (st.note) noteText(svg, 50, 58, st.note, 3.6);
  }

  /* 布局：energy（C5 断键吸热/成键放热） */
  function drawEnergyScene(svg, scene, steps, frame, u) {
    svg.innerHTML = '';
    var st = steps[frame] || {};
    /* 左：分子示意 */
    var g = svgEl('g', {});
    svg.appendChild(g);
    if (st.molStage === 'break' || frame === 0) {
      atomCircle(g, 18, 30, 6, '反', 4.4);
      atomCircle(g, 32, 30, 6, '应', 4.4);
      bondLine(g, 24, 30, 26, 30, false, 1.2);
      if (st.molStage === 'break' && u > 0.3) {
        var dx = (u - 0.3) * 14;
        g.innerHTML = '';
        atomCircle(g, 18 - dx / 2, 30, 6, '反', 4.4);
        atomCircle(g, 32 + dx / 2, 30, 6, '应', 4.4);
        noteText(svg, 25, 48, '旧键断裂', 3.8);
      } else {
        noteText(svg, 25, 48, '反应物（旧键）', 3.8);
      }
    } else {
      atomCircle(g, 18, 30, 6, '生', 4.4);
      atomCircle(g, 32, 30, 6, '成', 4.4);
      bondLine(g, 24, 30, 26, 30, false, 1.2);
      noteText(svg, 25, 48, '生成物（新键）', 3.8);
    }
    /* 右：文字能量账（曲线在下方 eSvg） */
    if (st.energyLabel) {
      var t = svgEl('text', {
        x: 68, y: 30, 'text-anchor': 'middle', 'font-size': 4.6,
        fill: 'var(--chm-ink, #1A1A1A)', 'font-weight': '700'
      });
      t.textContent = st.energyLabel;
      t.setAttribute('style', 'font-family:' + font(10).replace(/^\d+px\s*/, ''));
      svg.appendChild(t);
    }
    if (st.settleLabel && u > 0.7) {
      var s2 = svgEl('text', {
        x: 68, y: 42, 'text-anchor': 'middle', 'font-size': 4,
        fill: 'var(--chm-ink, #1A1A1A)', 'font-weight': '700'
      });
      s2.textContent = st.settleLabel;
      s2.setAttribute('style', 'font-family:' + font(10).replace(/^\d+px\s*/, ''));
      svg.appendChild(s2);
    }
    if (st.note) noteText(svg, 50, 58, st.note, 3.6);
  }

  /* 能量曲线（CHEMC-26/65：断键斜率>0 上升"吸收能量"，成键斜率<0 下降"放出能量"） */
  function drawEnergy(svg, curve, steps, frame, u) {
    svg.innerHTML = '';
    var pts = curve.points || [{ x: 5, y: 32 }, { x: 50, y: 8 }, { x: 95, y: 24 }];
    /* 矮门替代路径（CHEMC-73）：虚线全程显示，起终点与主路径等高 */
    if (curve.altPath && curve.altPath.length >= 2) {
      var ad = 'M' + curve.altPath.map(function (q) { return q.x + ',' + q.y; }).join(' L');
      svg.appendChild(svgEl('path', {
        d: ad, fill: 'none', stroke: 'var(--chm-ink-soft, #888)',
        'stroke-width': 1.1, 'stroke-dasharray': '3 2'
      }));
      noteText(svg, 50, 5, '虚线：催化剂的"矮门"（活化能更低）', 3.2);
    }
    var upto = Math.min(pts.length - 1, frame + 1);
    var d = 'M' + pts[0].x + ',' + pts[0].y;
    for (var i = 1; i <= upto; i++) {
      var p0 = pts[i - 1], p1 = pts[i];
      var uu = (i === upto) ? u : 1;
      d += ' L' + lerp(p0.x, p1.x, uu).toFixed(1) + ',' + lerp(p0.y, p1.y, uu).toFixed(1);
    }
    svg.appendChild(svgEl('path', {
      d: d, fill: 'none', stroke: 'var(--chm-ink, #1A1A1A)', 'stroke-width': 1.2
    }));
    /* 坐标轴示意 */
    svg.appendChild(svgEl('line', { x1: 4, y1: 36, x2: 98, y2: 36, stroke: 'var(--chm-ink-soft,#555)', 'stroke-width': 0.7 }));
    noteText(svg, 50, 39.5, '反应进程 →', 3.2);
    var st = steps[frame] || {};
    if (st.energyLabel && u > 0.4) noteText(svg, 82, 6, st.energyLabel, 3.4);
    if (st.curveSlopeSign) {
      /* 斜率符号自检（生产侧）：断键>0 / 成键<0 */
      var a = pts[Math.min(frame, pts.length - 2)], b = pts[Math.min(frame + 1, pts.length - 1)];
      var sgn = Math.sign(a.y - b.y); /* y 向下：y 减小 = 能量上升 */
      if (sgn !== st.curveSlopeSign && typeof console !== 'undefined')
        console.warn('[ChemBond] 能量曲线斜率符号不符: step' + frame);
    }
  }

  /* 布局：hydrolysis（C6 水解） */
  function drawHydrolysis(svg, scene, steps, frame, u) {
    svg.innerHTML = '';
    var st = steps[frame] || {};
    if (frame === 0) {
      /* 水电离：大量水 + 极少 H+/OH- */
      for (var i = 0; i < 6; i++)
        noteText(svg, 18 + (i % 3) * 12, 24 + Math.floor(i / 3) * 12, 'H₂O', 4);
      if (u > 0.5) {
        noteText(svg, 62, 24, 'H⁺', 4.6);
        noteText(svg, 76, 24, 'OH⁻', 4.6);
        noteText(svg, 69, 40, '水极少量电离（示意已放大）', 3.4);
      }
    } else if (frame === 1) {
      var hx = lerp(62, 34, u);
      noteText(svg, 24, 26, 'CH₃COO⁻', 4.4);
      noteText(svg, hx, 26, 'H⁺', 4.6);
      if (u > 0.7) {
        noteText(svg, 30, 40, 'CH₃COOH', 4.4);
        noteText(svg, 50, 52, 'CH₃COO⁻ "抢"走 H⁺', 3.6);
      }
    } else {
      noteText(svg, 50, 22, 'CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻', 4.2);
      noteText(svg, 50, 34, 'OH⁻ 相对多 → 溶液显碱性', 4);
      noteText(svg, 50, 46, '有弱才水解', 4.6);
    }
    if (st.note) noteText(svg, 50, 58, st.note, 3.6);
  }

  /* 布局：collision（C7 有效碰撞） */
  function drawCollision(svg, scene, steps, frame, u) {
    svg.innerHTML = '';
    var st = steps[frame] || {};
    var lanes = [
      { x: 20, title: 'A 能量不够', ok: false },
      { x: 50, title: 'B 取向不对', ok: false },
      { x: 80, title: 'C 有效碰撞', ok: true }
    ];
    lanes.forEach(function (L, li) {
      var active = (st.lane === li);
      var g = svgEl('g', { opacity: active ? 1 : 0.4 });
      svg.appendChild(g);
      noteText(g, L.x, 6, L.title, 3.8);
      var cx = L.x;
      if (active && st.phase === 'collide') {
        var sep = lerp(14, 4, Math.min(1, u * 2));
        if (u > 0.5) sep = lerp(4, 14, (u - 0.5) * 2); /* 弹开 */
        atomCircle(g, cx - sep / 2, 26, 5, '甲', 4);
        atomCircle(g, cx + sep / 2, 26, 5, '乙', 4);
        if (u > 0.55) {
          var res = st.note ||
            ((st['break'] || []).length ? '旧键断开' : (st.form || []).length ? '新键形成' :
              (L.ok ? '旧键断、新键成' : '弹开，键不变'));
          noteText(g, cx, 44, res, 3.4);
        }
      } else {
        atomCircle(g, cx - 8, 26, 5, '甲', 4);
        atomCircle(g, cx + 8, 26, 5, '乙', 4);
      }
      if (active && st.energyTag) noteText(g, cx, 52, st.energyTag, 3.4);
    });
    if (st.note) noteText(svg, 50, 60, st.note, 3.4);
  }

  /* 布局：e-flow（C8/C9 电子转移） */
  function drawEFlow(svg, scene, steps, frame, u) {
    svg.innerHTML = '';
    var st = steps[frame] || {};
    var path = scene.wirePath || [{ x: 20, y: 31 }, { x: 80, y: 31 }];
    /* 场景 */
    (scene.nodes || []).forEach(function (nd) {
      if (nd.shape === 'wire') {
        var d = 'M' + path.map(function (q) { return q.x + ',' + q.y; }).join(' L');
        svg.appendChild(svgEl('path', {
          d: d, fill: 'none', stroke: 'var(--chm-apparatus, #888)',
          'stroke-width': 1.6
        }));
        noteText(svg, 50, 12, '导线（示意）', 3.4);
      } else {
        atomCircle(svg, nd.x, nd.y, nd.r || 7, nd.label, 4.6);
        if (nd.sub) noteText(svg, nd.x, nd.y + (nd.r || 7) + 5, nd.sub, 3.4);
      }
    });
    /* 电子连续位移（CHEMC-75：2 个点，H→Cu 连续，禁瞬移） */
    if (st.eflow) {
      var n = st.eflow.electrons || 2;
      for (var i = 0; i < n; i++) {
        var uu = Math.max(0, Math.min(1, u - i * 0.12));
        var q = pathPoint(path, uu);
        svg.appendChild(svgEl('circle', {
          cx: q.x, cy: q.y, r: 2.2, fill: 'var(--chm-electron, #29B6F6)',
          stroke: 'none'
        }));
      }
      if (st.eflow.label && u > 0.5) noteText(svg, 50, 52, st.eflow.label, 3.6);
    }
    /* 化合价标注（CHEMC-76/79 互锁） */
    (st.valenceTags || []).forEach(function (vt) {
      noteText(svg, vt.x, vt.y, vt.text, 3.8);
    });
    if (st.motto && u > 0.6) {
      var lines = st.motto.split('；');
      lines.forEach(function (ln, i) {
        noteText(svg, 50, 44 + i * 6, ln, 3.6);
      });
    }
    if (st.note) noteText(svg, 50, 60, st.note, 3.4);
  }
  function pathPoint(path, u) {
    if (path.length < 2) return path[0] || { x: 50, y: 31 };
    var segs = [], total = 0, i;
    for (i = 1; i < path.length; i++) {
      var L = Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y);
      segs.push(L); total += L;
    }
    var target = u * total;
    for (i = 0; i < segs.length; i++) {
      if (target <= segs[i] || i === segs.length - 1) {
        var f = segs[i] > 0 ? target / segs[i] : 0;
        return {
          x: lerp(path[i].x, path[i + 1].x, f),
          y: lerp(path[i].y, path[i + 1].y, f)
        };
      }
      target -= segs[i];
    }
    return path[path.length - 1];
  }

  function drawScene(svg, layout, scene, steps, frame, u, fsMin) {
    switch (layout) {
      case 'bond-shift': return drawBondShift(svg, scene, steps, frame, u);
      case 'hybrid': return drawHybrid(svg, scene, steps, frame, u);
      case 'h-bond': return drawHBond(svg, scene, steps, frame, u);
      case 'substitute': return drawSubstitute(svg, scene, steps, frame, u);
      case 'energy': return drawEnergyScene(svg, scene, steps, frame, u);
      case 'hydrolysis': return drawHydrolysis(svg, scene, steps, frame, u);
      case 'collision': return drawCollision(svg, scene, steps, frame, u);
      case 'e-flow': return drawEFlow(svg, scene, steps, frame, u);
      default:
        svg.innerHTML = '';
        noteText(svg, 50, 31, '未知布局：' + layout, 4);
    }
  }

  window.ChemBond = {
    render: renderBondStep,
    validateSteps: validateSteps,
    LAYOUTS: ['bond-shift', 'hybrid', 'h-bond', 'substitute', 'energy', 'hydrolysis', 'collision', 'e-flow']
  };
})();
