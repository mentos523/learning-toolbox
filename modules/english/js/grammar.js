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
 *   G7 规则身份证（翻面：规则面 ↔ 条件面）
 *   G8 中式对拍（✗/✓ 双编码）
 *   Y1 先猜后验（只记录，不判对错）
 *   Y2 例句朗读（speechSynthesis；不支持时隐藏按钮）
 *   Y3 改错判分（选择即时判分；填空字符串归一化比对）
 * 反馈走 M6 口径：视觉必选（flash/✓✗），震动与合成音为可选。
 * ============================================================ */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
    box.innerHTML = "🌉 汉语： " + esc(b.zh) + "<br>英语： " + esc(b.en) +
      '<br><span class="unbridge">拆桥：' + esc(b.unbridge) + "</span>";
    return box;
  }

  /* ---------------- 拼写条 ---------------- */
  function widgetSpell(b) {
    var box = el("div");
    if (b.title) box.appendChild(el("div", "", "<b>" + esc(b.title) + "</b>"));
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
        (showTip && q.tip ? '<br><span class="tip">💡 ' + esc(q.tip) + "</span>" : "");
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
    back.setAttribute("aria-label", "返回语法筹备页");
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
    var point = el("p", "g-point" + (page.pointScroll ? " scroll" : ""), "💡 " + esc(page.point || ""));
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
