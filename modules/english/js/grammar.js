/* ============================================================
 * 英语 · 语法 SPA 引擎（蓝队 2026-10-14，试点 gr05.1.1）
 *
 * 命名空间隔离铁律：本文件只使用 window.ENG_GRAMMAR 与
 * window.ENG_CH（语法数据），只渲染 #grammar-app 容器内；
 * 不读取、不调用数学引擎（window.MATH_*）与讲词根代码的
 * 任何变量与函数；CSS 类名前缀 g-，见 css/grammar.css。
 *
 * 数据驱动：页面全部来自 window.ENG_CH[grNN].units[].lessons[]
 * .pages[]，pageKind = observe / interact / explain / quiz。
 * 蓝队 2026-10-14 F1–F3 根因修复（黄队裁决方案 a：区内滚动）：
 * .g-zone 由 overflow:hidden 改为区内纵向滚动（同几何 hints 口径），
 * 配套「下滑查看更多」提示、练习题导航、讲解页身份证卡渲染前置、
 * Y1 猜测条 sticky 贴底、G7 翻面后 zone 内自动对齐；.g-zone 仍是
 * 唯一滚动容器，body 永不滚动。
 * 交互实现（全部真实可用，无占位）：
 *   G1 成分拖拽标注（点选 + 拖拽双通道，即时判分）
 *   G3 句型积木拼装（五种槽形；双谓语报警，跃升 1）
 *   G5 从句槽（槽类型校验，放错弹回）
 *   G6 词性换装（后缀外套状态机；卧底报警）
 *   G7 规则身份证（翻面：规则面 ↔ 条件面）
 *   G8 中式对拍（✗/✓ 双编码）
 *   Y1 先猜后验（只记录，不判对错）
 *   Y2 例句朗读（speechSynthesis；不支持时隐藏按钮）
 *   Y3 改错判分（选择即时判分；填空字符串归一化比对）
 *   Y4 成分标注练习（G1 引擎 + 题库；限时；只记正确率）
 * G2/G4 本阶段不实现（B-M1/B-M2 降级口径冻结，理由见
 * docs/english-grammar-interactions.md：G2 不做"听发音辨时态"、
 * G4 不做自由输入批改）。
 * 反馈走 M6 口径：视觉必选（flash/✓✗），震动与合成音为可选。
 * ============================================================ */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  /* ---------------- R-B4（2026-10-15 自学审计整改）：#r=<id> 真跳转 ----------------
   * 语法页内的“（呼应讲词根 #r=inter，R3 审计通过）”类纯文本引用，
   * 在渲染时转为可点击的跨卡链接，目标为讲词根对应词条。
   * 目标 hash 口径（实测 english.js 三处解析点 719/931/968 均只认字面量 "#r="）：
   *   用旧深链 "#r=<id>"（如 #r=inter），hashchange 与初始化深链均能选中对应词条；
   *   "#card=roots&r=<id>" 中的 "&r=" 不被旧正则识别，会回退到第一个词根，故不用。
   * 样式 .eng-xlink：内联跨科链接统一口径（下划线 + 可辨色）。
   * 只处理 window.ROOTS_DATA 中真实存在的词条 id，未知 id 原样输出，避免死链。
   * 输入为已 esc 的 HTML（先转义再替换，避免把用户文本里的尖括号当标签）。 */
  var ROOT_D = {};
  try {
    (window.ROOTS_DATA || []).forEach(function (r) { if (r && r.r) ROOT_D[r.r] = r.d; });
  } catch (e) { /* 无词根数据时退化为纯文本 */ }
  function linkifyRoots(escapedHtml) {
    return String(escapedHtml).replace(/#r=([a-z]+)/g, function (m, id) {
      if (!ROOT_D[id]) return m;
      var label = String(ROOT_D[id]).split(" / ")[0];
      return '<a class="eng-xlink" href="#r=' + id + '"' +
        ' title="去“讲词根”看词条：' + esc(label) + '（' + esc(id) + ' 家族）">' +
        esc(label) + "</a>";
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, cls, html) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html != null) d.innerHTML = html;
    return d;
  }
  /* M6：视觉反馈必选；震动可选加分 */
  function flash(node, ok) {
    if (!node) return;
    node.classList.remove("g-flash-ok", "g-flash-bad");
    void node.offsetWidth;
    node.classList.add(ok ? "g-flash-ok" : "g-flash-bad");
    try { if (navigator.vibrate) navigator.vibrate(ok ? 12 : [20, 40, 20]); } catch (e) {}
  }
  function store(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }
  function load(k, fb) {
    try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; }
    catch (e) { return fb; }
  }
  /* ---------- 区内滚动工具（蓝队 2026-10-14 F1–F3 根因修复）
   * 黄队硬性要求 5：.g-zone 是唯一滚动容器，body 永不出滚动条。
   * 因此滚动一律只改 zone.scrollTop，绝不调用 scrollIntoView
   *（它会连带滚动 body/页面，破坏一屏不变量）。以下函数均为
   * smoke 测试的最小 DOM stub 安全：缺 API 时静默跳过。 ---------- */
  function later(fn, ms) {
    if (typeof setTimeout === "function") { setTimeout(fn, ms || 0); return; }
    try { fn(); } catch (e) {}
  }
  function rectOf(node) {
    if (!node || typeof node.getBoundingClientRect !== "function") return null;
    try { return node.getBoundingClientRect(); } catch (e) { return null; }
  }
  function scrollZoneDelta(zone, delta) {
    if (!zone) return;
    zone.scrollTop = (zone.scrollTop || 0) + delta;
  }
  /* 把目标顶部对齐到 zone 可视区顶部（留 guard 间隙），只动 zone */
  function scrollZoneTo(zone, target, guard) {
    var zr = rectOf(zone), tr = rectOf(target);
    if (!zr || !tr) return;
    scrollZoneDelta(zone, tr.top - zr.top - (guard == null ? 8 : guard));
  }

  /* ---------------- 数据查找 ---------------- */
  function findLesson(lessonId) {
    var CH = window.ENG_CH || {};
    var ids = Object.keys(CH);
    for (var i = 0; i < ids.length; i++) {
      var ch = CH[ids[i]];
      var units = ch.units || [];
      for (var u = 0; u < units.length; u++) {
        var lessons = units[u].lessons || [];
        for (var l = 0; l < lessons.length; l++) {
          if (lessons[l].id === lessonId) {
            return { chapter: ch, unit: units[u], lesson: lessons[l] };
          }
        }
      }
    }
    return null;
  }
  function hasLesson(lessonId) { return !!findLesson(lessonId); }

  /* ---------------- Y2 例句朗读 ---------------- */
  var speakOK = ("speechSynthesis" in window);
  function speak(text) {
    if (!speakOK || !text) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.9;
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function speakBtn(text) {
    if (!speakOK) return null;
    var b = el("button", "g-speak", "🔊");
    b.type = "button";
    b.setAttribute("aria-label", "朗读例句");
    b.addEventListener("click", function (e) { e.stopPropagation(); speak(text); });
    return b;
  }

  /* ---------------- 句子块（G1 呈现态：分块标注，色块 + 文字标签） ---------------- */
  function chunkHtml(c) {
    return '<span class="g-chunk role-' + esc(c.role) + '">' +
      '<span class="w">' + esc(c.w) + '</span>' +
      '<span class="r">' + esc(c.label) + "</span></span>";
  }
  function sentenceBlock(sent) {
    var box = el("div", "g-sent");
    var head = el("div", "g-sent-head");
    var en = el("div", "g-sent-en", esc(sent.en) +
      (sent.reg ? '<span class="g-reg">' + esc(sent.reg) + "</span>" : ""));
    head.appendChild(en);
    var sb = speakBtn(sent.en);
    if (sb) head.appendChild(sb);
    box.appendChild(head);
    box.appendChild(el("div", "g-sent-zh", esc(sent.zh)));
    /* R-E3（2026-10-15 自学审计整改）：“首现即定义”门禁——术语首次出现配脚注。
     * 数据侧 sent.fn 为脚注文本（如 there be 的前置说明）。 */
    if (sent.fn) box.appendChild(el("div", "g-sent-fn", "📌 " + esc(sent.fn)));
    if (sent.tagged && sent.tagged.length) {
      var chunks = el("div", "g-chunks");
      chunks.style.marginTop = "6px";
      chunks.innerHTML = sent.tagged.map(chunkHtml).join("");
      box.appendChild(chunks);
    }
    return box;
  }

  /* ---------------- G1 成分拖拽标注（交互态） ---------------- */
  function widgetTagging(params) {
    var wrap = el("div");
    var hint = el("div", "g-tag-hint", esc(params.hint || "把标签放到对的词块上。"));
    var chunksBox = el("div", "g-chunks");
    var tagsBox = el("div", "g-tags");
    var chunks = params.sentence.map(function (c, i) {
      var s = el("span", "g-chunk draggable role-" + c.role);
      s.innerHTML = '<span class="w">' + esc(c.w) + "</span>" +
        '<span class="r">？</span>';
      s.dataset.role = c.role;
      s.dataset.idx = i;
      s.dataset.wrong = "0";
      s.dataset.done = "0";
      s.setAttribute("tabindex", "0");
      s.setAttribute("role", "button");
      s.setAttribute("aria-label", "词块：" + c.w + "，待标注");
      return s;
    });
    chunks.forEach(function (s) { chunksBox.appendChild(s); });
    var tags = params.slots.map(function (t) {
      var b = el("button", "g-tag role-" + t.role, esc(t.label));
      b.type = "button";
      b.dataset.role = t.role;
      b.setAttribute("aria-pressed", "false");
      return b;
    });
    tags.forEach(function (b) { tagsBox.appendChild(b); });
    wrap.appendChild(chunksBox);
    wrap.appendChild(tagsBox);
    wrap.appendChild(hint);

    var armed = null;   // 当前点选的标签
    function arm(tag) {
      if (armed === tag) {
        armed = null;
        tag.setAttribute("aria-pressed", "false");
        return;
      }
      if (armed) armed.setAttribute("aria-pressed", "false");
      armed = tag;
      tag.setAttribute("aria-pressed", "true");
    }
    function tagLabel(role) {
      for (var i = 0; i < params.slots.length; i++) {
        if (params.slots[i].role === role) return params.slots[i].label;
      }
      return role;
    }
    function place(tagRole, chunk) {
      if (chunk.dataset.done === "1") return;
      var ok = (tagRole === chunk.dataset.role);
      if (ok) {
        chunk.dataset.done = "1";
        chunk.querySelector(".r").textContent = tagLabel(tagRole);
        chunk.classList.remove("picked");
        flash(chunk, true);
        hint.innerHTML = '<span class="ok">✓ 对了</span> “' +
          esc(chunk.querySelector(".w").textContent) + "”是" +
          esc(tagLabel(tagRole)) + "。";
        // 用过的标签淡化（同 role 可能多词块：仅当该 role 全部放对才淡化）
        var remain = chunks.some(function (c) {
          return c.dataset.role === tagRole && c.dataset.done !== "1";
        });
        tags.forEach(function (t) {
          if (t.dataset.role === tagRole && !remain) t.classList.add("used");
        });
        if (armed) { armed.setAttribute("aria-pressed", "false"); armed = null; }
        if (chunks.every(function (c) { return c.dataset.done === "1"; })) {
          hint.innerHTML = '<span class="ok">✓ 全对！</span>成分标注完成。';
        }
      } else {
        var n = (+chunk.dataset.wrong) + 1;
        chunk.dataset.wrong = String(n);
        chunk.classList.remove("placed-bad");
        void chunk.offsetWidth;
        chunk.classList.add("placed-bad");
        flash(chunk, false);
        if (n >= 2) {
          // 错 2 次：高亮正确标签位置（不直接给答案，只指标签）
          hint.innerHTML = '<span class="bad">✗ 再想想</span> 提示：看一看 <b>' +
            esc(tagLabel(chunk.dataset.role)) + "</b> 标签，它在向你招手。";
          tags.forEach(function (t) {
            if (t.dataset.role === chunk.dataset.role) flash(t, true);
          });
        } else {
          hint.innerHTML = '<span class="bad">✗ 不对</span> 再想想：这个词块在句中做什么？';
        }
      }
    }
    tags.forEach(function (t) {
      t.addEventListener("click", function () { arm(t); });
      // 桌面拖拽通道
      t.draggable = true;
      t.addEventListener("dragstart", function (e) {
        try { e.dataTransfer.setData("text/plain", t.dataset.role); } catch (err) {}
      });
    });
    chunks.forEach(function (s) {
      s.addEventListener("click", function () {
        if (armed) place(armed.dataset.role, s);
        else {
          s.classList.add("picked");
          setTimeout(function () { s.classList.remove("picked"); }, 600);
          hint.textContent = "先点一个标签，再点这个词块。";
        }
      });
      s.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && armed) {
          e.preventDefault();
          place(armed.dataset.role, s);
        }
      });
      s.addEventListener("dragover", function (e) { e.preventDefault(); });
      s.addEventListener("drop", function (e) {
        e.preventDefault();
        var role = null;
        try { role = e.dataTransfer.getData("text/plain"); } catch (err) {}
        if (role) place(role, s);
      });
    });
    return wrap;
  }

  /* ---------------- 跃升 2 信号灯：主语拨动 → -s 灯联动 ---------------- */
  function widgetSignal(params) {
    var wrap = el("div", "g-signal");
    var row = el("div", "g-subj-row");
    row.setAttribute("role", "group");
    row.setAttribute("aria-label", "选择主语");
    var lampRow = el("div", "g-lamp-row");
    var lamp = el("span", "g-lamp", '<span class="dot"></span><span class="t"></span>');
    var verb = el("span", "g-verb-form");
    lampRow.appendChild(lamp);
    lampRow.appendChild(verb);
    var demo = el("div", "g-sent");
    wrap.appendChild(row);
    wrap.appendChild(lampRow);
    wrap.appendChild(demo);

    function select(sub) {
      Array.prototype.forEach.call(row.children, function (b) {
        b.setAttribute("aria-pressed", b._sub === sub ? "true" : "false");
      });
      var on = !!sub.third;
      lamp.classList.toggle("on", on);
      lamp.querySelector(".t").textContent = on ? params.lampOn : params.lampOff;
      verb.textContent = sub.verb;
      demo.innerHTML = "";
      var head = el("div", "g-sent-head");
      var en = el("div", "g-sent-en");
      en.innerHTML = '<span class="g-chunk role-subject" style="min-height:0;padding:2px 8px;"><span class="w">' +
        esc(sub.s) + '</span><span class="r">主语</span></span> ' +
        '<span class="g-chunk role-verb" style="min-height:0;padding:2px 8px;"><span class="w">' +
        esc(sub.verb) + '</span><span class="r">谓语' + (on ? "（+ -s）" : "") + "</span></span>";
      head.appendChild(en);
      var sb = speakBtn(sub.s + " " + sub.verb);
      if (sb) head.appendChild(sb);
      demo.appendChild(head);
      flash(lamp, on);
    }
    params.subjects.forEach(function (sub, i) {
      var b = el("button", "g-subj", esc(sub.s));
      b.type = "button";
      b._sub = sub;
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { select(sub); });
      row.appendChild(b);
      if (i === 2) select(sub);   // 默认选中 he：-s 灯亮，先见现象
    });
    return wrap;
  }

  /* ---------------- G7 规则身份证 ---------------- */
  function widgetIdCard(b, zone) {
    var wrap = el("div", "g-idcard");
    var inner = el("div", "g-idcard-inner");
    inner.innerHTML =
      '<div class="g-idcard-face front">' +
        '<div class="g-idcard-kicker">规则 RULE</div>' +
        '<div class="g-idcard-rule">' + esc(b.rule) + "</div>" +
      "</div>" +
      '<div class="g-idcard-face back">' +
        '<div class="g-idcard-kicker">身份证 CONDITION · 适用条件</div>' +
        '<div class="g-idcard-cond">' + esc(b.condition) + "</div>" +
      "</div>";
    wrap.appendChild(inner);
    var btn = el("button", "g-idcard-flip", "点我翻面：看适用条件 ⤾");
    btn.type = "button";
    function flip() {
      wrap.classList.toggle("flipped");
      var f = wrap.classList.contains("flipped");
      btn.textContent = f ? "点我翻回：看规则 ⤾" : "点我翻面：看适用条件 ⤾";
      btn.setAttribute("aria-pressed", f ? "true" : "false");
      /* 黄队硬性要求 3：翻到条件面后，若卡片超出 zone 可视区，
       * 把卡片顶部对齐到 zone 顶部（只滚 .g-zone 自身，绝不碰 body）。
       * 翻面动画 0.18s，200ms 后再量；动画本身不动。 */
      if (f) later(function () {
        if (!wrap.classList.contains("flipped")) return;
        var zr = rectOf(zone), cr = rectOf(inner);
        if (!zr || !cr) return;
        if (cr.top < zr.top - 2 || cr.bottom > zr.bottom + 2) {
          scrollZoneDelta(zone, cr.top - zr.top - 8);
        }
      }, 200);
    }
    btn.addEventListener("click", flip);
    inner.addEventListener("click", flip);
    wrap.appendChild(btn);
    return wrap;
  }

  /* ---------------- G8 中式对拍 ---------------- */
  function widgetContrast(b) {
    var box = el("div", "g-contrast");
    box.innerHTML =
      '<div class="side wrong"><span class="mark">✗ 错句</span><br>' + esc(b.wrong) +
        (b.wrongZh ? '<br><span style="font-size:0.78rem;color:var(--eng-ink-soft);">' + esc(b.wrongZh) + "</span>" : "") + "</div>" +
      '<div class="side right"><span class="mark">✓ 对句</span><br>' + esc(b.right) + "</div>" +
      '<div class="why"><b>为什么：</b>' + esc(b.why) + "</div>";
    return box;
  }

  /* ---------------- 汉语桥（第 8 条铁律） ---------------- */
  function widgetBridge(b) {
    var box = el("div", "g-bridge");
    box.innerHTML = "🌉 汉语： " + linkifyRoots(esc(b.zh)) + "<br>英语： " + linkifyRoots(esc(b.en)) +
      '<br><span class="unbridge">拆桥：' + linkifyRoots(esc(b.unbridge)) + "</span>";
    return box;
  }

  /* ---------------- 拼写条 ---------------- */
  function widgetSpell(b) {
    var box = el("div");
    if (b.title) box.appendChild(el("div", "", "<b>" + esc(b.title) + "</b>"));
    /* P0 防御（2026-10-14 白队 QA）：畸形 spell 块（items 缺失/非数组，
     * 如 gr16 的 {type:"spell", rule}）渲染提示行而非抛错，保证页面不崩；
     * 正常渲染路径（items 为数组）一字未动。 */
    if (!Array.isArray(b.items)) {
      box.appendChild(el("div", "g-spell-missing", "⚠ 内容配置缺失，请联系老师。"));
      return box;
    }
    var ul = el("ul");
    ul.style.margin = "6px 0 0";
    ul.style.paddingLeft = "20px";
    ul.style.fontSize = "0.9rem";
    ul.style.lineHeight = "1.7";
    b.items.forEach(function (it) {
      ul.appendChild(el("li", "", esc(it)));
    });
    box.appendChild(ul);
    return box;
  }

  /* ---------------- Y1 先猜后验 ---------------- */
  function widgetGuess(g, pageId) {
    var box = el("div", "g-guess");
    box.appendChild(el("div", "g-guess-q", "🤔 " + esc(g.q)));
    var opts = el("div", "g-guess-opts");
    var saved = load("ltb-eng-guess", {})[pageId];
    g.options.forEach(function (op, i) {
      var b = el("button", "", esc(op));
      b.type = "button";
      b.setAttribute("aria-pressed", saved === i ? "true" : "false");
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(opts.children, function (x) {
          x.setAttribute("aria-pressed", "false");
        });
        b.setAttribute("aria-pressed", "true");
        var all = load("ltb-eng-guess", {});
        all[pageId] = i;
        store("ltb-eng-guess", all);
        note.textContent = "已记录你的猜测，继续往下验证吧——猜错也没关系。";
      });
      opts.appendChild(b);
    });
    box.appendChild(opts);
    var note = el("div", "g-guess-note", esc(g.note || "只记录，不判对错。"));
    box.appendChild(note);
    return box;
  }

  /* ============================================================
   * 蓝队 2026-10-14（阶段三）：G 系列交互补齐。
   * 新增 interact widgets：sentence-builder（G3）、clause-slots
   * （G5）、morph-dressup（G6）、constituent-quiz（Y4）。
   * 旧部件（signal-light/tagging/idcard/contrast/guess/speak/
   * quiz 判分）一字未动；新增代码只读数据、不碰既有函数。
   * 口径遵守：.g-zone 是唯一滚动容器（新增代码不创建滚动
   * 容器、不调用 scrollIntoView）；触控目标 ≥44px；双编码。
   * ============================================================ */

  var ROLE_ZH = {
    subject: "主语", verb: "谓语", object: "宾语",
    complem: "补语", adverb: "状语", attrib: "定语", clause: "从句"
  };
  function roleZh(role) { return ROLE_ZH[role] || role; }

  /* 双通道放置（点选 + 拖拽），G3/G5/Y4 共用；tagging 原实现不动。
   * decide(tag, target) 返回：
   *   {kind:"ok"}           放置成功
   *   {kind:"bad", msg}      放错（msg 提示，不放置）
   *   {kind:"alarm", msg}    报警（msg 警报，不放置）
   *   null / {kind:"ignore"} 无视（如槽已满、块已用）
   * apply(tag, target, d) 执行放置/反馈（各部件自定）。 */
  function bindDual(tags, targets, decide, apply) {
    var armed = null;
    function disarm() {
      if (armed) { try { armed.setAttribute("aria-pressed", "false"); } catch (e) {} }
      armed = null;
    }
    function attempt(tag, tg) {
      if (!tag) return;
      var d = null;
      try { d = decide(tag, tg); } catch (e) { return; }
      if (!d || d.kind === "ignore") return;
      try { apply(tag, tg, d); } catch (e) {}
      disarm();
    }
    tags.forEach(function (t) {
      t.addEventListener("click", function () {
        if (armed === t) { disarm(); return; }
        disarm();
        armed = t;
        try { t.setAttribute("aria-pressed", "true"); } catch (e) {}
      });
      try { t.draggable = true; } catch (e) {}
      t.addEventListener("dragstart", function (e) {
        try { e.dataTransfer.setData("text/plain", t.dataset.role || t.dataset.kind || ""); }
        catch (err) {}
      });
    });
    targets.forEach(function (tg) {
      tg.addEventListener("click", function () { attempt(armed, tg); });
      tg.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && armed) {
          e.preventDefault();
          attempt(armed, tg);
        }
      });
      tg.addEventListener("dragover", function (e) { e.preventDefault(); });
      tg.addEventListener("drop", function (e) {
        e.preventDefault();
        var key = "";
        try { key = e.dataTransfer.getData("text/plain"); } catch (err) {}
        var tag = null;
        tags.forEach(function (t) {
          if ((t.dataset.role || t.dataset.kind) === key) tag = t;
        });
        attempt(tag, tg);
      });
    });
    return { disarm: disarm };
  }

  /* ---------------- G3 句型积木拼装 sentence-builder ----------------
   * params: { pattern, blocks:[{w, role}], hint, doneNote }
   * pattern: SV / SVO / SVP / SVIO DO / SVOC（大小写、空格不敏感）；
   * 槽由 pattern 派生（五种句型五种槽形：槽名即槽形）。
   * 双谓语报警（跃升 1）：已有谓语块入槽时，再放谓语块即报警。 */
  var PATTERN_SLOTS = {
    SV:     [["subject", "主语"], ["verb", "谓语"]],
    SVO:    [["subject", "主语"], ["verb", "谓语"], ["object", "宾语"]],
    SVP:    [["subject", "主语"], ["verb", "谓语"], ["complem", "表语"]],
    SVIODO: [["subject", "主语"], ["verb", "谓语"], ["object", "间接宾语"], ["object", "直接宾语"]],
    SVOC:   [["subject", "主语"], ["verb", "谓语"], ["object", "宾语"], ["complem", "补语"]]
  };
  function widgetSentenceBuilder(params) {
    var wrap = el("div", "g-builder");
    var key = String(params.pattern || "SVO").toUpperCase().replace(/\s+/g, "");
    var defs = PATTERN_SLOTS[key] || PATTERN_SLOTS.SVO;
    var hint = el("div", "g-tag-hint",
      esc(params.hint || "把积木放进对的槽，拼出一句完整的话。"));
    var slotsBox = el("div", "g-builder-slots");
    var pool = el("div", "g-tags");
    var doneBox = el("div", "g-builder-done");
    var slots = defs.map(function (d) {
      var s = el("div", "g-builder-slot empty");
      s.innerHTML = '<span class="g-builder-slot-label">' + esc(d[1]) + "槽</span>" +
        '<span class="g-builder-slot-tip">（放' + esc(d[1]) + "）</span>";
      s.dataset.accept = d[0];
      s.dataset.slotLabel = d[1];
      s.dataset.filled = "0";
      s.setAttribute("tabindex", "0");
      s.setAttribute("role", "button");
      s.setAttribute("aria-label", d[1] + "槽：空");
      slotsBox.appendChild(s);
      return s;
    });
    var blocks = (params.blocks || []).map(function (b) {
      var c = el("span", "g-chunk draggable role-" + b.role);
      c.innerHTML = '<span class="w">' + esc(b.w) + '</span><span class="r">' +
        esc(roleZh(b.role)) + "</span>";
      c.dataset.role = b.role;
      c.dataset.word = b.w;
      c.dataset.used = "0";
      c.setAttribute("tabindex", "0");
      c.setAttribute("role", "button");
      c.setAttribute("aria-label", "积木：" + b.w);
      pool.appendChild(c);
      return c;
    });
    wrap.appendChild(slotsBox);
    wrap.appendChild(pool);
    wrap.appendChild(hint);
    wrap.appendChild(doneBox);

    function verbPlaced() {
      return slots.some(function (s) {
        return s.dataset.filled === "1" && s.dataset.vrole === "verb";
      });
    }
    function decide(tag, slot) {
      if (slot.dataset.filled === "1" || tag.dataset.used === "1") return { kind: "ignore" };
      var role = tag.dataset.role;
      if (role === "verb" && verbPlaced()) {
        return { kind: "alarm", msg: "⚠ 双谓语警报！一个句子只能有一个谓语动词——把多余的动词拿回去。" };
      }
      if (role !== slot.dataset.accept) {
        return { kind: "bad", msg: "✗ 不对：“" + tag.dataset.word + "”是" + roleZh(role) +
          "，不能放进" + slot.dataset.slotLabel + "槽。再想想。" };
      }
      return { kind: "ok" };
    }
    function apply(tag, slot, d) {
      if (d.kind !== "ok") {
        hint.innerHTML = '<span class="bad">' + esc(d.msg) + "</span>";
        tag.classList.remove("placed-bad");
        void tag.offsetWidth;
        tag.classList.add("placed-bad");
        flash(tag, false);
        return;
      }
      tag.dataset.used = "1";
      try { tag.draggable = false; } catch (e) {}
      tag.classList.remove("draggable");
      slot.appendChild(tag);
      slot.dataset.filled = "1";
      slot.dataset.vrole = tag.dataset.role;
      slot.classList.remove("empty");
      slot.setAttribute("aria-label", slot.dataset.slotLabel + "槽：已放 " + tag.dataset.word);
      flash(slot, true);
      if (slots.every(function (s) { return s.dataset.filled === "1"; })) {
        var sent = slots.map(function (s) {
          var b = s.querySelector(".g-chunk");
          return b ? b.dataset.word : "";
        }).join(" ");
        hint.innerHTML = '<span class="ok">✓ 拼好了！</span>';
        doneBox.innerHTML = '<span class="ok">✓</span> ' + esc(sent) +
          (params.doneNote ? "<br>" + esc(params.doneNote) : "");
        flash(doneBox, true);
      } else {
        hint.innerHTML = "放对了！继续拼。";
      }
    }
    bindDual(blocks, slots, decide, apply);
    return wrap;
  }

  /* ---------------- G5 从句槽 clause-slots ----------------
   * params: { main, mainSlots:[{id, label, accept:[kind]}], clauseBlocks:[{text, kind}], hint }
   * kind: subject/object/attrib/adverbial（主语/宾语/定语/状语从句）；
   * 放错槽弹回 + 提示（W-G5：从句块黄底 + "从句"文字标签）。 */
  var CLAUSE_ZH = { subject: "主语从句", object: "宾语从句", attrib: "定语从句", adverbial: "状语从句" };
  function clauseZh(k) { return CLAUSE_ZH[k] || k; }
  function widgetClauseSlots(params) {
    var wrap = el("div", "g-clause");
    var hint = el("div", "g-tag-hint",
      esc(params.hint || "把从句块放进对的槽。放错槽会弹回来。"));
    if (params.main) {
      wrap.appendChild(el("div", "g-clause-main", "主句： " + esc(params.main)));
    }
    var slotsBox = el("div", "g-clause-slots");
    var pool = el("div", "g-tags");
    var doneBox = el("div", "g-clause-done");
    var slots = (params.mainSlots || []).map(function (m) {
      var s = el("div", "g-clause-slot empty");
      s.innerHTML = '<span class="g-clause-slot-label">' + esc(m.label) + "</span>" +
        '<span class="g-clause-slot-tip">（放' + esc(m.label) + "）</span>";
      s.dataset.label = m.label;
      s.dataset.accepts = (m.accept || []).join(",");
      s.dataset.filled = "0";
      s.setAttribute("tabindex", "0");
      s.setAttribute("role", "button");
      s.setAttribute("aria-label", m.label + "：空");
      slotsBox.appendChild(s);
      return s;
    });
    var clauses = (params.clauseBlocks || []).map(function (c) {
      var b = el("button", "g-clause-block");
      b.type = "button";
      b.innerHTML = '<span class="t">' + esc(c.text) + "</span>" +
        '<span class="k">从句 · ' + esc(clauseZh(c.kind)) + "</span>";
      b.dataset.kind = c.kind;
      b.dataset.text = c.text;
      b.dataset.used = "0";
      b.setAttribute("aria-label", "从句块：" + c.text + "，" + clauseZh(c.kind));
      pool.appendChild(b);
      return b;
    });
    wrap.appendChild(slotsBox);
    wrap.appendChild(pool);
    wrap.appendChild(hint);
    wrap.appendChild(doneBox);

    function decide(tag, slot) {
      if (slot.dataset.filled === "1" || tag.dataset.used === "1") return { kind: "ignore" };
      var accepts = (slot.dataset.accepts || "").split(",").filter(Boolean);
      if (accepts.indexOf(tag.dataset.kind) < 0) {
        return { kind: "bad", msg: "✗ " + clauseZh(tag.dataset.kind) +
          "不能当" + slot.dataset.label + "——弹回来了，再想想。" };
      }
      return { kind: "ok" };
    }
    function apply(tag, slot, d) {
      if (d.kind !== "ok") {
        hint.innerHTML = '<span class="bad">' + esc(d.msg) + "</span>";
        tag.classList.remove("placed-bad");
        void tag.offsetWidth;
        tag.classList.add("placed-bad");
        flash(tag, false);
        return;
      }
      tag.dataset.used = "1";
      try { tag.draggable = false; } catch (e) {}
      slot.appendChild(tag);
      slot.dataset.filled = "1";
      slot.classList.remove("empty");
      slot.setAttribute("aria-label", slot.dataset.label + "：已放 " + tag.dataset.text);
      flash(slot, true);
      if (slots.every(function (s) { return s.dataset.filled === "1"; })) {
        var parts = slots.map(function (s) {
          var t = s.querySelector(".g-clause-block");
          return t ? t.dataset.text : "";
        });
        hint.innerHTML = '<span class="ok">✓ 从句拼装完成！</span>';
        var main = params.main ? String(params.main) : "";
        var shown = main.indexOf("___") >= 0
          ? main.split("___").join(parts.join(" / "))
          : parts.join("；");
        doneBox.innerHTML = '<span class="ok">✓</span> ' + esc(shown);
        flash(doneBox, true);
      } else {
        hint.innerHTML = "放对了！继续。";
      }
    }
    bindDual(clauses, slots, decide, apply);
    return wrap;
  }

  /* ---------------- G6 词性换装 morph-dressup ----------------
   * params: { root, rootPos, suffixes:[{suf, pos, word}], traps:[{root, suf, pos, word, note}], hint }
   * 纯展示 + 状态机：点外套穿上（词性变化），再点脱下；
   * traps 是"卧底"：点之 ✗ + 文字报警（W-G6：不只靠颜色）。 */
  function widgetMorph(params) {
    var wrap = el("div", "g-morph");
    var hint = el("div", "g-tag-hint",
      esc(params.hint || "给词根小人穿上后缀外套，看看词性怎么变。小心卧底外套！"));
    var stage = el("div", "g-morph-stage");
    var root = el("div", "g-morph-root");
    root.innerHTML = '<span class="p">🤖</span>' +
      '<span class="w">' + esc(params.root || "") + "</span>" +
      '<span class="pos">' + esc(params.rootPos || "") + "</span>";
    var arrow = el("div", "g-morph-arrow", "→");
    arrow.setAttribute("aria-hidden", "true");
    var result = el("div", "g-morph-result empty");
    result.innerHTML = '<span class="tip">点一件外套穿上</span>';
    stage.appendChild(root);
    stage.appendChild(arrow);
    stage.appendChild(result);
    wrap.appendChild(stage);

    var rack = el("div", "g-morph-rack");
    rack.setAttribute("role", "group");
    rack.setAttribute("aria-label", "后缀外套");
    var worn = null;
    function compose(sf, baseRoot) {
      return sf.word || (String(baseRoot) + String(sf.suf || "").replace(/^-/, ""));
    }
    (params.suffixes || []).forEach(function (sf) {
      var b = el("button", "g-suffix", "🧥 " + esc(sf.suf));
      b.type = "button";
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", "后缀外套 " + sf.suf + "，穿上变" + (sf.pos || ""));
      b.addEventListener("click", function () {
        if (worn === sf) {
          worn = null;
          b.setAttribute("aria-pressed", "false");
          result.className = "g-morph-result empty";
          result.innerHTML = '<span class="tip">点一件外套穿上</span>';
          hint.textContent = "脱下了。再试一件。";
          return;
        }
        worn = sf;
        Array.prototype.forEach.call(rack.children, function (x) {
          try { x.setAttribute("aria-pressed", "false"); } catch (e) {}
        });
        b.setAttribute("aria-pressed", "true");
        var word = compose(sf, params.root || "");
        result.className = "g-morph-result";
        result.innerHTML = '<span class="w">' + esc(word) + "</span>" +
          '<span class="pos">' + esc(sf.pos || "") + "</span>" +
          '<span class="ch">' + esc(params.root || "") + "（" + esc(params.rootPos || "") +
          "） + " + esc(sf.suf) + " → " + esc(word) + "（" + esc(sf.pos || "") + "）</span>";
        hint.innerHTML = "穿上了！" + esc(params.root || "") + "从" +
          esc(params.rootPos || "") + "变成了" + esc(sf.pos || "") + "。";
        flash(result, true);
      });
      rack.appendChild(b);
    });
    wrap.appendChild(rack);

    var traps = params.traps || [];
    if (traps.length) {
      var trapsBox = el("div", "g-morph-traps");
      trapsBox.appendChild(el("div", "g-morph-trap-title", "⚠ 卧底外套（点它试试）"));
      var trapRow = el("div", "g-morph-rack");
      traps.forEach(function (t) {
        var b = el("button", "g-suffix trap", "🥷 " + esc(t.suf));
        b.type = "button";
        b.setAttribute("aria-label", "可疑外套 " + t.suf);
        b.addEventListener("click", function () {
          var word = compose(t, t.root || params.root || "");
          var note = t.note || (word + " 穿上 " + t.suf + " 词性没变！");
          result.className = "g-morph-result alarm";
          result.innerHTML = '<span class="w">' + esc(word) + "</span>" +
            '<span class="pos">还是' + esc(t.pos || "") + "！</span>" +
            '<span class="ch">✗ 卧底警报：' + esc(note) + "</span>";
          hint.innerHTML = '<span class="bad">✗ 卧底！</span>' + esc(note);
          flash(result, false);
        });
        trapRow.appendChild(b);
      });
      trapsBox.appendChild(trapRow);
      wrap.appendChild(trapsBox);
    }
    wrap.appendChild(hint);
    return wrap;
  }

  /* ---------------- Y4 成分标注练习 constituent-quiz ----------------
   * G1 引擎 + 题库配置：随机抽句、限时标注；不排名，只记录正确率。
   * params: { items:[{id, sentence:[{w, role}]}], slots:[{role, label}],
   *           rounds, timeLimitSec, hint }
   * 正确率存 localStorage（store/load 已 try/catch 降级）；
   * W-G12：明确的"退出练习"按钮；一屏内完成（紧凑布局）。
   * 注意：.g-zone 是唯一滚动容器——本部件不创建滚动容器、
   * 不调用 scrollIntoView；页面切换后部件脱离文档时定时器自清。 */
  function widgetConstituentQuiz(params, pageId) {
    var wrap = el("div", "g-quiz4");
    var bar = el("div", "g-quiz4-bar");
    var roundLab = el("span", "g-quiz4-stat", "");
    var timerLab = el("span", "g-quiz4-stat g-quiz4-timer", "");
    var scoreLab = el("span", "g-quiz4-stat", "");
    var exit = el("button", "g-quiz4-exit", "退出练习");
    exit.type = "button";
    exit.setAttribute("aria-label", "退出成分标注练习");
    bar.appendChild(roundLab);
    bar.appendChild(timerLab);
    bar.appendChild(scoreLab);
    bar.appendChild(exit);
    var body = el("div", "g-quiz4-body");
    var hint = el("div", "g-tag-hint",
      esc(params.hint || "限时标注句子成分，全部标对得 1 分。"));
    wrap.appendChild(bar);
    wrap.appendChild(body);
    wrap.appendChild(hint);

    var bank = (params.items || []).slice();
    var rounds = Math.max(1, (params.rounds | 0) || 3);
    var limit = Math.max(5, (params.timeLimitSec | 0) || 45);
    var order = [];
    var done = 0, correct = 0, timer = null, active = false, left = limit;
    /* smoke 最小 DOM stub 安全：无 setInterval 时降级为不限时练习 */
    var hasTimer = (typeof setInterval === "function") && (typeof clearInterval === "function");

    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    function nextItem() {
      if (!order.length) order = shuffle(bank.slice());
      return order.pop();
    }
    function stopTimer() {
      if (timer && hasTimer) { try { clearInterval(timer); } catch (e) {} }
      timer = null;
    }
    function tick() {
      if (wrap.isConnected === false) { stopTimer(); return; }
      left--;
      timerLab.textContent = "⏱ " + left + "s";
      if (left <= 0) finishRound(false, "⏱ 时间到！这句记为未完成。");
    }
    function slotLabel(role) {
      var ss = params.slots || [];
      for (var i = 0; i < ss.length; i++) {
        if (ss[i].role === role) return ss[i].label;
      }
      return roleZh(role);
    }
    function startRound() {
      stopTimer();
      var it = nextItem();
      if (!it) { summary(); return; }
      active = true;
      left = limit;
      roundLab.textContent = "第 " + (done + 1) + " / " + rounds + " 句";
      timerLab.textContent = hasTimer ? "⏱ " + left + "s" : "⏱ 不限时";
      scoreLab.textContent = "得分 " + correct + " / " + done;
      body.innerHTML = "";
      var fb = el("div", "g-tag-hint", "开始！");
      var chunksBox = el("div", "g-chunks");
      var tagsBox = el("div", "g-tags");
      var chunks = it.sentence.map(function (c) {
        var s = el("span", "g-chunk draggable role-" + c.role);
        s.innerHTML = '<span class="w">' + esc(c.w) + "</span>" + '<span class="r">？</span>';
        s.dataset.role = c.role;
        s.dataset.done = "0";
        s.setAttribute("tabindex", "0");
        s.setAttribute("role", "button");
        s.setAttribute("aria-label", "词块：" + c.w + "，待标注");
        chunksBox.appendChild(s);
        return s;
      });
      var tags = (params.slots || []).map(function (t) {
        var b = el("button", "g-tag role-" + t.role, esc(t.label));
        b.type = "button";
        b.dataset.role = t.role;
        b.setAttribute("aria-pressed", "false");
        tagsBox.appendChild(b);
        return b;
      });
      body.appendChild(chunksBox);
      body.appendChild(tagsBox);
      body.appendChild(fb);
      function decide(tag, chunk) {
        if (!active || chunk.dataset.done === "1") return { kind: "ignore" };
        if (tag.dataset.role === chunk.dataset.role) return { kind: "ok" };
        return { kind: "bad", msg: "✗ 不对，再想想：这个词块在句中做什么？" };
      }
      function apply(tag, chunk, d) {
        if (d.kind !== "ok") {
          fb.innerHTML = '<span class="bad">' + esc(d.msg) + "</span>";
          chunk.classList.remove("placed-bad");
          void chunk.offsetWidth;
          chunk.classList.add("placed-bad");
          flash(chunk, false);
          return;
        }
        chunk.dataset.done = "1";
        chunk.querySelector(".r").textContent = slotLabel(tag.dataset.role);
        flash(chunk, true);
        if (chunks.every(function (c) { return c.dataset.done === "1"; })) {
          finishRound(true, "✓ 全对！这句 +1 分。");
        } else {
          fb.innerHTML = '<span class="ok">✓ 对了</span> 继续！';
        }
      }
      bindDual(tags, chunks, decide, apply);
      if (hasTimer) timer = setInterval(tick, 1000);
    }
    function finishRound(ok, msg) {
      if (!active) return;
      active = false;
      stopTimer();
      done++;
      if (ok) correct++;
      hint.innerHTML = msg;
      scoreLab.textContent = "得分 " + correct + " / " + done;
      /* 反馈停顿 0.9s 后再进下一轮（只读 wrap 连通性，绝不滚 body） */
      later(function () {
        if (wrap.isConnected === false) return;
        if (done >= rounds) summary();
        else startRound();
      }, 900);
    }
    function summary() {
      stopTimer();
      active = false;
      var rate = done ? Math.round(correct / done * 100) : 0;
      store("ltb-eng-constituent-quiz", {
        page: pageId || "", total: done, correct: correct, rate: rate, ts: Date.now()
      });
      roundLab.textContent = "已完成";
      timerLab.textContent = "";
      scoreLab.textContent = "正确率 " + correct + " / " + done;
      body.innerHTML = "";
      var box = el("div", "g-quiz4-summary");
      box.innerHTML = '<div class="big">🏁 练习结束</div>' +
        '<div class="rate">正确率：' + correct + " / " + done + "（" + rate + "%）</div>" +
        '<div class="note">不排名，只记录——已存到本机学习记录。</div>';
      var again = el("button", "g-quiz4-again", "再练一次");
      again.type = "button";
      again.addEventListener("click", function () {
        done = 0; correct = 0; order = [];
        hint.textContent = "开始新一轮练习！";
        startRound();
      });
      box.appendChild(again);
      body.appendChild(box);
    }
    exit.addEventListener("click", function () {
      if (active) {
        active = false;
        stopTimer();
        hint.innerHTML = "已退出练习。";
      }
      summary();
    });
    if (!bank.length) {
      body.appendChild(el("div", "g-tag-hint", "题库为空，请生产队补充 items。"));
      exit.style.display = "none";
    } else {
      startRound();
    }
    return wrap;
  }

  /* ---------------- 页面渲染 ---------------- */
  var cur = null;   // {found, pageIdx}
  var appRoot = null;

  function pageKindLabel(kind) {
    return { observe: "观察", interact: "交互", explain: "讲解", quiz: "练习" }[kind] || kind;
  }

  /* 黄队硬性要求 2（蓝队 2026-10-14 F1 根因修复）：G7 身份证卡是讲解页的
   * 关键教学组件，初始必须可识别（≥1/3 高度或完整标题行）。数据顺序
   * examples → idcard（先现象后规则）在窄屏下会把卡片挤出首屏（实测
   * 390px 下完全不可见）。渲染层把首张 idcard 提前到首个 examples
   * 之前；数据顺序不动，其余块相对顺序不变。
   * 内容侧跟进（不属本次改动）：examples.note「先看现象，再看规则的
   * 身份证」措辞与呈现顺序不一致，待黄队修订。 */
  function explainBlockOrder(blocks) {
    var ex = -1, id = -1;
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].type === "examples" && ex < 0) ex = i;
      if (blocks[i].type === "idcard" && id < 0) id = i;
    }
    if (ex >= 0 && id > ex) {
      var out = blocks.slice();
      out.splice(ex, 0, out.splice(id, 1)[0]);
      return out;
    }
    return blocks;
  }

  function renderZone(page, chapter) {
    var zone = el("div", "g-zone");
    if (page.kind === "observe") {
      (page.sentences || []).forEach(function (s) { zone.appendChild(sentenceBlock(s)); });
      if (page.guess) zone.appendChild(widgetGuess(page.guess, page.id));
    } else if (page.kind === "interact") {
      if (page.exploreTip) zone.appendChild(el("div", "g-tip", "🖐 " + esc(page.exploreTip)));
      (page.widgets || []).forEach(function (w) {
        if (w.type === "signal-light") zone.appendChild(widgetSignal(w.params));
        else if (w.type === "tagging") zone.appendChild(widgetTagging(w.params));
        else if (w.type === "sentence-builder") zone.appendChild(widgetSentenceBuilder(w.params));
        else if (w.type === "clause-slots") zone.appendChild(widgetClauseSlots(w.params));
        else if (w.type === "morph-dressup") zone.appendChild(widgetMorph(w.params));
        else if (w.type === "constituent-quiz") zone.appendChild(widgetConstituentQuiz(w.params, page.id));
      });
    } else if (page.kind === "explain") {
      if (page.lead) zone.appendChild(el("div", "g-tip", "👋 " + esc(page.lead)));
      explainBlockOrder(page.blocks || []).forEach(function (b) {
        if (b.type === "examples") {
          var ids = b.ids || [];
          if (b.note) zone.appendChild(el("div", "g-tag-hint", esc(b.note)));
          ids.forEach(function (id) {
            var s = (chapter.sentences || {})[id];
            if (s) zone.appendChild(sentenceBlock(s));
          });
        }
        else if (b.type === "idcard") zone.appendChild(widgetIdCard(b, zone));
        else if (b.type === "bridge") zone.appendChild(widgetBridge(b));
        else if (b.type === "spell") zone.appendChild(widgetSpell(b));
        else if (b.type === "contrast") zone.appendChild(widgetContrast(b));
      });
    } else if (page.kind === "quiz") {
      var qs = page.questions || [];
      /* 黄队硬性要求 2：练习题导航——sticky 置顶，初始完整可见；
       * 点选后只滚动 .g-zone（scrollZoneTo），不触发页面滚动。 */
      if (qs.length > 1) {
        var nav = el("nav", "g-qnav");
        nav.setAttribute("aria-label", "题目导航");
        qs.forEach(function (q, qi) {
          var chip = el("button", "", "第 " + (qi + 1) + " 题");
          chip.type = "button";
          chip.setAttribute("aria-label", "跳到第 " + (qi + 1) + " 题");
          chip.addEventListener("click", function () {
            var list = zone.querySelectorAll(".g-q");
            var guard = 8;
            var nr = rectOf(nav);
            if (nr) guard = nr.height + 8;
            scrollZoneTo(zone, list[qi], guard);
          });
          nav.appendChild(chip);
        });
        zone.appendChild(nav);
      }
      qs.forEach(function (q, qi) {
        zone.appendChild(renderQuestion(q, page.id + "-q" + qi));
      });
    }
    return zone;
  }

  /* ---------------- Y3 判分：选择 / 填空 ---------------- */
  function norm(s) {
    return String(s == null ? "" : s).trim().toLowerCase().replace(/\s+/g, " ");
  }
  function renderQuestion(q, key) {
    var box = el("div", "g-q");
    var fb = el("div", "g-q-fb");
    var wrong = 0;
    function say(ok, msg, showTip) {
      fb.innerHTML = (ok
        ? '<span class="ok">✓ 答对了</span> '
        : '<span class="bad">✗ 不对</span> ') + esc(msg) +
        (showTip && q.tip ? '<br><span class="tip">💡 ' + linkifyRoots(esc(q.tip)) + "</span>" : "");
      flash(box, ok);
    }
    if (q.type === "choice") {
      box.appendChild(el("div", "g-q-stem", esc(q.stem)));
      var opts = el("div", "g-q-opts");
      q.options.forEach(function (op, i) {
        var b = el("button", "", esc(op));
        b.type = "button";
        b.addEventListener("click", function () {
          if (b.classList.contains("judged-ok")) return;
          if (i === q.answer) {
            b.classList.add("judged-ok");
            say(true, "就是它。");
          } else {
            wrong++;
            b.classList.add("judged-bad");
            say(false, "再想想。", wrong >= 2);
          }
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);
    } else if (q.type === "fill") {
      var stem = el("div", "g-q-stem");
      stem.innerHTML = esc(q.stemBefore || "") +
        ' <input type="text" style="width:7em;display:inline-block;" aria-label="填空">' +
        " " + esc(q.stemAfter || "") + (q.hint ? ' <span style="color:var(--eng-ink-soft);font-size:0.82rem;">' + esc(q.hint) + "</span>" : "");
      // stemBefore/stemAfter 可能含括号提示如（like）：并入 hint 行
      box.appendChild(stem);
      var input = stem.querySelector("input");
      var btn = el("button", "g-q-check", "检查");
      btn.type = "button";
      btn.addEventListener("click", function () {
        var v = norm(input.value);
        var ok = (q.accept || [q.answer]).some(function (a) { return norm(a) === v; });
        if (ok) say(true, "拼写正确。");
        else { wrong++; say(false, "再想想。", wrong >= 2); }
      });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") btn.click();
      });
      box.appendChild(btn);
    }
    box.appendChild(fb);
    return box;
  }

  /* 黄队硬性要求 1 & 5（蓝队 2026-10-14 F1–F3 根因修复）：
   * .g-zone 是唯一滚动容器。区内可滚动且未滚到底时，在内容区底部
   * 显示「下滑查看更多」渐隐提示（.g-zone-wrap.show-more），滚到底后
   * 消失。滚动/尺寸变化/内容变化（判分反馈、翻面等）都会重算。
   * smoke 最小 DOM stub 安全：缺 API 时只做一次静态计算。 */
  var zoneCleanup = null;
  function bindZoneScroll(zone, wrap) {
    if (zoneCleanup) { try { zoneCleanup(); } catch (e) {} zoneCleanup = null; }
    function update() {
      var sh = zone.scrollHeight || 0;
      var ch = zone.clientHeight || 0;
      var st = zone.scrollTop || 0;
      var can = sh > ch + 4;
      var atBottom = st + ch >= sh - 4;
      wrap.classList.toggle("show-more", can && !atBottom);
    }
    var rafFn = (typeof window.requestAnimationFrame === "function")
      ? window.requestAnimationFrame.bind(window) : null;
    var cafFn = (typeof window.cancelAnimationFrame === "function")
      ? window.cancelAnimationFrame.bind(window) : null;
    var raf = 0;
    function schedule() {
      if (raf) return;
      if (rafFn) { raf = rafFn(function () { raf = 0; update(); }); }
      else update();
    }
    function onScroll() { schedule(); }
    function onResize() { schedule(); }
    if (zone.addEventListener) {
      try { zone.addEventListener("scroll", onScroll, { passive: true }); }
      catch (e) { zone.addEventListener("scroll", onScroll); }
    }
    var hasWinListen = (typeof window.addEventListener === "function");
    if (hasWinListen) window.addEventListener("resize", onResize);
    var mo = null;
    if (typeof window.MutationObserver === "function") {
      mo = new window.MutationObserver(schedule);
      mo.observe(zone, { childList: true, subtree: true, characterData: true });
    }
    update();
    var cancelled = false;
    zoneCleanup = function () {
      if (cancelled) return;
      cancelled = true;
      if (zone.removeEventListener) {
        try { zone.removeEventListener("scroll", onScroll); } catch (e) {}
      }
      if (hasWinListen && typeof window.removeEventListener === "function") {
        try { window.removeEventListener("resize", onResize); } catch (e) {}
      }
      if (mo) { try { mo.disconnect(); } catch (e) {} }
      if (raf && cafFn) { try { cafFn(raf); } catch (e) {} }
      raf = 0;
    };
  }

  function render() {
    if (!cur || !appRoot) return;
    var found = cur.found;
    var pages = found.lesson.pages;
    var page = pages[cur.pageIdx];
    appRoot.innerHTML = "";

    var head = el("header", "g-head");
    var back = el("button", "g-back", "← 返回");
    back.type = "button";
    back.setAttribute("aria-label", "返回语法首页");
    back.addEventListener("click", function () {
      try {
        window.dispatchEvent(new CustomEvent("eng-grammar-exit"));
      } catch (e) {}
    });
    head.appendChild(back);
    head.appendChild(el("h1", "", esc(found.lesson.title)));
    head.appendChild(el("span", "g-page-tag",
      pageKindLabel(page.kind) + " " + (cur.pageIdx + 1) + "/" + pages.length));
    appRoot.appendChild(head);

    appRoot.appendChild(el("div", "g-crumb",
      esc(found.chapter.id) + " · " + esc(found.unit.title) + " · " + esc(found.lesson.id)));

    var main = el("main", "g-main");
    main.appendChild(el("h2", "g-title", esc(page.title)));
    /* 黄队硬性要求 1：zone 外包 .g-zone-wrap（相对定位），底部叠放
     * .g-more「下滑查看更多」提示条（aria-hidden，纯视觉提示）。 */
    var zone = renderZone(page, found.chapter);
    var zoneWrap = el("div", "g-zone-wrap");
    zoneWrap.appendChild(zone);
    var more = el("div", "g-more",
      '<span class="g-more-pill"><span class="t">下滑查看更多</span>' +
      '<span class="arr">↓</span></span>');
    more.setAttribute("aria-hidden", "true");
    zoneWrap.appendChild(more);
    main.appendChild(zoneWrap);
    var point = el("p", "g-point" + (page.pointScroll ? " scroll" : ""), "💡 " + linkifyRoots(esc(page.point || "")));
    main.appendChild(point);
    appRoot.appendChild(main);

    var pager = el("nav", "g-pager");
    var prev = el("button", "", "← 上一页");
    var next = el("button", "g-next", cur.pageIdx === pages.length - 1 ? "完成 ✓" : "下一页 →");
    prev.type = "button"; next.type = "button";
    prev.disabled = cur.pageIdx === 0;
    prev.addEventListener("click", function () {
      if (cur.pageIdx > 0) { cur.pageIdx--; render(); }
    });
    next.addEventListener("click", function () {
      if (cur.pageIdx < pages.length - 1) { cur.pageIdx++; render(); }
      else {
        try {
          window.dispatchEvent(new CustomEvent("eng-grammar-exit"));
        } catch (e) {}
      }
    });
    pager.appendChild(prev);
    pager.appendChild(next);
    appRoot.appendChild(pager);
    /* 渲染完成、布局就绪后再绑定区内滚动提示（读 clientHeight 需在文档流中） */
    bindZoneScroll(zone, zoneWrap);
  }

  function open(lessonId) {
    var found = findLesson(lessonId);
    if (!found) return false;
    appRoot = document.getElementById("g-app");
    if (!appRoot) return false;
    cur = { found: found, pageIdx: 0 };
    render();
    return true;
  }
  function close() { cur = null; }

  window.ENG_GRAMMAR = {
    hasLesson: hasLesson,
    open: open,
    close: close
  };
})();
