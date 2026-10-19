/* ============================================================
 * Eng.CellBuilder —— B1 cell-builder（细胞结构拼搭）引擎级渲染器
 * 版本：2026.10.19.14-dev（生物 P16 并行工作流，CEO 裁决②交付物）
 *
 * 定位：docs/biology-interactions.md §B1 行为契约的引擎级实现。
 * P15（b12.1.3-p3）用 window.BIO_B12 内联实现过关（专家逐项核对）；
 * 本渲染器与其行为契约一致，纯 DOM、自包含、零外部依赖，
 * file:// 双击可跑、headless Chrome 可跑。
 *
 * 用法：
 *   var cb = new Eng.CellBuilder(container, params, options);
 *   cb.place("mito", "z2");      // 程序化放置（QA 走查用；与拖拽落点同一逻辑）
 *   cb.setMode("plant");         // 模式切换（含二次确认，confirmFn 可注入）
 *   cb.reset();                   // 清空已放卡片
 *   cb.state();                   // 状态读回（防御性拷贝，ENG-10）
 *   cb.snapshot(); / cb.restore(s);
 *   cb.destroy();
 *   Eng.CellBuilder.ax();         // AX01 三字段（YP-25）
 *   Eng.CellBuilder.STR;          // 冻结文案常量（逐字）
 *
 * params 形状照抄 §B1 schema：
 *   mode: "animal"|"plant"（默认 "animal"）
 *   organelles: [{id,label,func,plantOnly?,animalOnly?}]（必填非空）
 *   zones: [{zoneId,label,accepts:[organelleId...],hint}]（必填非空）
 *   showFuncPop: boolean（默认 true）
 *   diagramNote: string（默认 "模式图：非等比、非实物"，冻结）
 *   resetOnModeSwitch: boolean（默认 true）
 *   doneText: string（默认 "拼搭完成"；课页可覆盖，如 b12 的"拼搭完成——形配其用！"）
 * options:
 *   confirmFn: function(msg)->bool（模式切换二次确认；默认 window.confirm）
 *
 * 非法输入抛错（ENG-66）：organelles/zones 空或缺失、id 重复、
 * accepts 引用不存在的 organelle id、accepts 空、mode 非法。
 * 渲染只消费 params（图=render(数据)，ENG-64 精神）；状态读回一律
 * 防御性拷贝（ENG-10）；无 Math.random()/Date.now()（确定性）。
 * ============================================================ */
(function () {
  "use strict";

  var Eng = window.Eng = window.Eng || {};

  var VERSION = "2026.10.19.14-dev";

  /* ---------- 既定类名常量（灰队口径：demo/测试一律从此复制，
   * 不凭记忆手写；类名全部 bio-cb- 前缀，避开页内既有类） ---------- */
  var CLS = {
    root:  "bio-cb-root",
    modes: "bio-cb-modes",
    modeA: "bio-cb-mode-a",
    modeP: "bio-cb-mode-p",
    tray:  "bio-cb-tray",
    card:  "bio-cb-card",
    gray:  "bio-cb-gray",
    placed:"bio-cb-placed",
    zone:  "bio-cb-zone",
    zlabel:"bio-cb-zlabel",
    zhint: "bio-cb-zhint",
    slot:  "bio-cb-slot",
    pop:   "bio-cb-pop",
    badge: "bio-cb-badge",
    hint:  "bio-cb-hint",
    note:  "bio-cb-note"
  };

  /* ---------- 冻结文案（逐字抄 §B1 / P15 参考实现） ---------- */
  var STR = {
    DIAGRAM_NOTE: "模式图：非等比、非实物",
    WRONG_PLACE: "再想想它该待在哪",
    MODE_RESET_CONFIRM: "切换模式会清空已放卡片，继续吗？",
    GRAY_ANIMAL: "动物细胞没有它",
    GRAY_PLANT: "植物细胞没有它",
    DONE: "拼搭完成",
    POP_DEFAULT: "点已放好的结构卡，看“结构—功能”一句话。",
    MODE_A_LABEL: "动物细胞",
    MODE_P_LABEL: "植物细胞"
  };

  var AX_DEFAULTS = {
    assumptions: [
      "细胞模式图为教学示意图（角落常驻“模式图：非等比、非实物”）",
      "结构卡与目标区域为教学抽象，不表示真实大小与位置"
    ],
    approximations: [
      "吸附判定：卡片中心进入目标区域即吸附（矩形包围盒判定）",
      "“放对/放错”以 zone.accepts 查表为准，不做语义理解"
    ],
    errorEstimate: "离散交互，无数值积分误差"
  };

  function deepCopy(o) { return JSON.parse(JSON.stringify(o)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "&lt;": "&lt;", "&gt;": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function isObj(x) { return x !== null && typeof x === "object" && !Array.isArray(x); }

  /* ---------- params 校验（ENG-66：非法输入拒绝，不静默放行） ---------- */
  function validateParams(p) {
    if (!isObj(p)) throw new TypeError("cell-builder: params 必须是对象");
    var mode = p.mode == null ? "animal" : p.mode;
    if (mode !== "animal" && mode !== "plant")
      throw new TypeError('cell-builder: mode 非法（只许 "animal"/"plant"）');
    var orgs = p.organelles;
    if (!Array.isArray(orgs) || orgs.length === 0)
      throw new TypeError("cell-builder: organelles 必填且非空");
    var seen = {};
    orgs.forEach(function (o, i) {
      if (!isObj(o) || typeof o.id !== "string" || !o.id)
        throw new TypeError("cell-builder: organelles[" + i + "].id 非法");
      if (seen[o.id]) throw new TypeError("cell-builder: organelles id 重复：" + o.id);
      seen[o.id] = true;
      if (typeof o.label !== "string" || !o.label)
        throw new TypeError("cell-builder: organelles[" + o.id + "].label 非法");
      if (typeof o.func !== "string" || !o.func)
        throw new TypeError("cell-builder: organelles[" + o.id + "].func 非法（必须一句话）");
    });
    var zones = p.zones;
    if (!Array.isArray(zones) || zones.length === 0)
      throw new TypeError("cell-builder: zones 必填且非空");
    var zseen = {};
    zones.forEach(function (z, i) {
      if (!isObj(z) || typeof z.zoneId !== "string" || !z.zoneId)
        throw new TypeError("cell-builder: zones[" + i + "].zoneId 非法");
      if (zseen[z.zoneId]) throw new TypeError("cell-builder: zoneId 重复：" + z.zoneId);
      zseen[z.zoneId] = true;
      if (typeof z.label !== "string" || !z.label)
        throw new TypeError("cell-builder: zones[" + z.zoneId + "].label 非法");
      if (!Array.isArray(z.accepts) || z.accepts.length === 0)
        throw new TypeError("cell-builder: zones[" + z.zoneId + "].accepts 必填且非空");
      z.accepts.forEach(function (id) {
        if (!seen[id])
          throw new TypeError("cell-builder: zones[" + z.zoneId + "].accepts 引用了不存在的 organelle id：" + id);
      });
    });
    return {
      mode: mode,
      organelles: deepCopy(orgs),
      zones: deepCopy(zones),
      showFuncPop: p.showFuncPop !== false,
      diagramNote: (typeof p.diagramNote === "string" && p.diagramNote) ? p.diagramNote : STR.DIAGRAM_NOTE,
      resetOnModeSwitch: p.resetOnModeSwitch !== false,
      doneText: (typeof p.doneText === "string" && p.doneText) ? p.doneText : STR.DONE
    };
  }

  /* ---------- 一次性注入组件样式（CSS 变量走 --bio-* 主题，params 永不出现色值） ---------- */
  function ensureCss() {
    if (typeof document === "undefined") return;
    if (document.getElementById("eng-cellbuilder-css")) return;
    var st = document.createElement("style");
    st.id = "eng-cellbuilder-css";
    st.textContent = [
      "." + CLS.root + " { border:1px solid var(--bio-line,#999); border-radius:10px; padding:12px; margin:6px 0; background:var(--bio-panel,#f7f7f7); }",
      "." + CLS.modes + " { display:flex; gap:8px; margin-bottom:8px; }",
      "." + CLS.modes + " button { min-height:44px; min-width:88px; padding:8px 12px; border:1px solid var(--bio-line,#999); border-radius:8px; background:var(--bio-bg,#fff); color:var(--bio-text,#222); cursor:pointer; }",
      "." + CLS.tray + " { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:8px; min-height:52px; }",
      "." + CLS.card + " { min-height:44px; min-width:64px; padding:8px 10px; border:1px solid var(--bio-line,#999); border-radius:8px; background:var(--bio-bg,#fff); color:var(--bio-text,#222); cursor:grab; touch-action:none; font-size:14px; }",
      "." + CLS.card + "." + CLS.gray + " { opacity:0.45; cursor:not-allowed; }",
      "." + CLS.card + "." + CLS.placed + " { cursor:pointer; }",
      "." + CLS.zone + " { border:1px dashed var(--bio-line,#999); border-radius:8px; padding:8px; margin:6px 0; background:var(--bio-bg,#fff); min-height:64px; }",
      "." + CLS.zlabel + " { font-size:15px; font-weight:bold; color:var(--bio-text,#222); }",
      "." + CLS.zhint + " { font-size:12px; color:var(--bio-ink-soft,#777); }",
      "." + CLS.slot + " { display:flex; flex-wrap:wrap; gap:6px; min-height:50px; margin-top:4px; }",
      "." + CLS.pop + " { font-size:13px; border:1px solid var(--bio-line,#999); border-radius:8px; padding:8px; margin:6px 0; background:var(--bio-bg,#fff); color:var(--bio-text,#222); min-height:20px; }",
      "." + CLS.badge + " { font-size:15px; font-weight:bold; color:var(--bio-organelle,#009e73); margin:6px 0; }",
      "." + CLS.hint + " { font-size:13px; color:var(--bio-warn,#b36b00); min-height:22px; }",
      "." + CLS.note + " { font-size:12px; color:var(--bio-ink-soft,#777); margin-top:4px; }"
    ].join("\n");
    document.head.appendChild(st);
  }

  /* ============================================================
   * CellBuilder 构造器
   * ============================================================ */
  function CellBuilder(container, params, options) {
    if (!(this instanceof CellBuilder)) return new CellBuilder(container, params, options);
    if (!container || typeof container.appendChild !== "function")
      throw new TypeError("cell-builder: container 非法");
    ensureCss();
    var P = validateParams(params);
    options = isObj(options) ? options : {};

    var self = this;
    this.VERSION = VERSION;
    this.params = deepCopy(P); /* 渲染只消费此快照 */
    this.confirmFn = (typeof options.confirmFn === "function")
      ? options.confirmFn
      : function (msg) { return window.confirm(msg); };

    /* ---- 建 DOM ---- */
    var root = document.createElement("div");
    root.className = CLS.root;
    this.root = root;

    var modeBar = document.createElement("div");
    modeBar.className = CLS.modes;
    var btnA = document.createElement("button");
    btnA.type = "button"; btnA.className = CLS.modeA; btnA.textContent = STR.MODE_A_LABEL;
    var btnP = document.createElement("button");
    btnP.type = "button"; btnP.className = CLS.modeP; btnP.textContent = STR.MODE_P_LABEL;
    btnA.addEventListener("click", function () { self.setMode("animal"); });
    btnP.addEventListener("click", function () { self.setMode("plant"); });
    modeBar.appendChild(btnA); modeBar.appendChild(btnP);
    root.appendChild(modeBar);

    var trayLabel = document.createElement("div");
    trayLabel.className = CLS.zhint; trayLabel.textContent = "结构卡（拖到对的位置）：";
    root.appendChild(trayLabel);

    var tray = document.createElement("div");
    tray.className = CLS.tray;
    root.appendChild(tray);

    var zoneEls = {}; /* zoneId -> {zone, slot} */
    P.zones.forEach(function (z) {
      var zone = document.createElement("div");
      zone.className = CLS.zone;
      zone.setAttribute("data-zone", z.zoneId);
      var lab = document.createElement("div");
      lab.className = CLS.zlabel; lab.textContent = z.label;
      var zh = document.createElement("div");
      zh.className = CLS.zhint; zh.textContent = z.hint || "";
      var slot = document.createElement("div");
      slot.className = CLS.slot;
      zone.appendChild(lab); zone.appendChild(zh); zone.appendChild(slot);
      root.appendChild(zone);
      zoneEls[z.zoneId] = { zone: zone, slot: slot };
    });

    var pop = document.createElement("div");
    pop.className = CLS.pop; pop.textContent = STR.POP_DEFAULT;
    root.appendChild(pop);

    var badge = document.createElement("div");
    badge.className = CLS.badge; badge.style.display = "none";
    badge.textContent = P.doneText;
    root.appendChild(badge);

    var hint = document.createElement("div");
    hint.className = CLS.hint;
    root.appendChild(hint);

    var note = document.createElement("div");
    note.className = CLS.note; note.textContent = P.diagramNote;
    root.appendChild(note);

    container.appendChild(root);

    /* ---- 卡片 ---- */
    var cardEls = {}; /* id -> button */
    var orgById = {};
    P.organelles.forEach(function (o) {
      orgById[o.id] = o;
      var c = document.createElement("button");
      c.type = "button"; c.className = CLS.card;
      c.setAttribute("data-id", o.id);
      c.dataset.id = o.id;
      c.dataset.placed = "";
      c.dataset.x = "0"; c.dataset.y = "0";
      c.textContent = o.label;
      tray.appendChild(c);
      cardEls[o.id] = c;
      bindDrag(c);
      c.addEventListener("click", function () {
        if (c.dataset.moved) { c.dataset.moved = ""; return; }
        if (c.dataset.placed === "1") self.tapFunc(o.id);
      });
    });

    /* ---- pointer 拖拽（统一鼠标/触控；卡片半透明跟随） ---- */
    function bindDrag(elm) {
      var sx = 0, sy = 0, ox = 0, oy = 0, dragging = false, moved = 0;
      elm.style.touchAction = "none";
      elm.addEventListener("pointerdown", function (e) {
        if (elm.disabled) return;
        if (elm.dataset.placed === "1") return; /* 落定锁定：已放卡片不可再拖 */
        dragging = true; moved = 0; sx = e.clientX; sy = e.clientY;
        ox = parseFloat(elm.dataset.x || "0"); oy = parseFloat(elm.dataset.y || "0");
        try { elm.setPointerCapture(e.pointerId); } catch (err) {}
        elm.style.zIndex = "50"; elm.style.opacity = "0.8";
      });
      elm.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
        elm.dataset.x = ox + dx; elm.dataset.y = oy + dy;
        elm.style.transform = "translate(" + elm.dataset.x + "px," + elm.dataset.y + "px)";
      });
      function up() {
        if (!dragging) return; dragging = false;
        elm.style.zIndex = ""; elm.style.opacity = "";
        elm.dataset.moved = moved > 6 ? "1" : "";
        self.drop(elm);
      }
      elm.addEventListener("pointerup", up);
      elm.addEventListener("pointercancel", up);
    }

    /* ---- 内部状态 ---- */
    this._P = P; this._tray = tray; this._cards = cardEls; this._orgs = orgById;
    this._zones = zoneEls; this._pop = pop; this._badge = badge; this._hint = hint;
    this._btnA = btnA; this._btnP = btnP;

    this.applyMode();
  }

  /* 置灰判定：plantOnly 在 animal 模式置灰；animalOnly 在 plant 模式置灰
   *（§B1：置灰 + 文字说明原因，不消失） */
  CellBuilder.prototype.grayed = function (o) {
    var m = this._P.mode;
    return (m === "animal" && !!o.plantOnly) || (m === "plant" && !!o.animalOnly);
  };
  CellBuilder.prototype.grayReason = function () {
    return this._P.mode === "animal" ? STR.GRAY_ANIMAL : STR.GRAY_PLANT;
  };

  /* 模式应用：置灰 + 模式按钮高亮 */
  CellBuilder.prototype.applyMode = function () {
    var self = this, P = this._P;
    P.organelles.forEach(function (o) {
      var c = self._cards[o.id]; if (!c) return;
      if (self.grayed(o)) {
        c.disabled = true;
        c.classList.add(CLS.gray);
        c.textContent = o.label + "（" + self.grayReason() + "）";
      } else {
        c.disabled = false;
        c.classList.remove(CLS.gray);
        c.textContent = o.label;
      }
    });
    this._btnA.style.outline = P.mode === "animal" ? "2px solid var(--bio-organelle,#009e73)" : "";
    this._btnP.style.outline = P.mode === "plant" ? "2px solid var(--bio-organelle,#009e73)" : "";
  };

  /* 拖拽落点：与程序化 place 共用判定核心 */
  CellBuilder.prototype.drop = function (elm) {
    var id = elm.getAttribute("data-id");
    var o = this._orgs[id];
    if (!o || this.grayed(o)) { this.back(elm); return false; }
    var r = elm.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var hitId = null, zid;
    for (zid in this._zones) {
      if (!Object.prototype.hasOwnProperty.call(this._zones, zid)) continue;
      var zr = this._zones[zid].zone.getBoundingClientRect();
      if (cx >= zr.left && cx <= zr.right && cy >= zr.top && cy <= zr.bottom) { hitId = zid; break; }
    }
    if (hitId) return this._placeInto(id, hitId, elm, true);
    this.back(elm);
    return false;
  };

  /* place 核心：accepts 查表；放对吸附落定（M6 flash），放错回弹 + 提示 */
  CellBuilder.prototype._placeInto = function (id, zoneId, elm, fromDrag) {
    var z = null, i, P = this._P;
    for (i = 0; i < P.zones.length; i++) if (P.zones[i].zoneId === zoneId) z = P.zones[i];
    var o = this._orgs[id];
    if (!z || !o || this.grayed(o) || z.accepts.indexOf(id) < 0) {
      this._hint.textContent = STR.WRONG_PLACE;
      if (fromDrag && elm) this.back(elm);
      return false;
    }
    var c = this._cards[id];
    c.dataset.placed = "1"; c.dataset.x = "0"; c.dataset.y = "0";
    c.style.transform = "";
    c.classList.add(CLS.placed);
    this._zones[zoneId].slot.appendChild(c);
    this._hint.textContent = "";
    /* M6：落定视觉反馈必选（flash）；震动可选 */
    var self = this;
    c.style.boxShadow = "0 0 0 2px var(--bio-organelle,#009e73)";
    setTimeout(function () { c.style.boxShadow = ""; }, 600);
    try { if (navigator.vibrate) navigator.vibrate(10); } catch (e) {}
    if (P.showFuncPop) this.tapFunc(id);
    this.checkDone();
    return true;
  };

  /* 程序化放置（QA 走查用；与拖拽落点同一逻辑） */
  CellBuilder.prototype.place = function (id, zoneId) {
    return this._placeInto(id, zoneId, null, false);
  };

  /* 温和回弹：回卡片栏，无红叉、不判错 */
  CellBuilder.prototype.back = function (elm) {
    elm.dataset.placed = ""; elm.dataset.x = "0"; elm.dataset.y = "0";
    elm.style.transform = "";
    elm.classList.remove(CLS.placed);
    this._tray.appendChild(elm);
    this.checkDone();
  };

  /* 功能卡：落定后点已放结构，弹出 func 一句话 */
  CellBuilder.prototype.tapFunc = function (id) {
    var o = this._orgs[id];
    if (!o) return "";
    if (this._P.showFuncPop) this._pop.textContent = o.label + "：" + o.func;
    return o.func;
  };

  /* 拼搭完成判定：全部非置灰卡片已放 → 徽章（配文字，不只靠颜色） */
  CellBuilder.prototype.checkDone = function () {
    var need = 0, got = 0, self = this;
    this._P.organelles.forEach(function (o) {
      if (self.grayed(o)) return;
      need++;
      var c = self._cards[o.id];
      if (c && c.dataset.placed === "1") got++;
    });
    var done = need > 0 && got === need;
    this._badge.style.display = done ? "" : "none";
    return done;
  };

  /* 清空已放卡片 */
  CellBuilder.prototype.reset = function () {
    var self = this, ids = Object.keys(this._cards);
    ids.forEach(function (id) { self.back(self._cards[id]); });
    this._badge.style.display = "none";
    this._pop.textContent = STR.POP_DEFAULT;
    this._hint.textContent = "";
    this.applyMode();
  };

  /* 模式切换：resetOnModeSwitch 时二次确认（§B1 常见坑①） */
  CellBuilder.prototype.setMode = function (mode) {
    if (mode !== "animal" && mode !== "plant") return false;
    var P = this._P;
    if (P.mode === mode) return true;
    var placed = 0, ids = Object.keys(this._cards);
    for (var i = 0; i < ids.length; i++)
      if (this._cards[ids[i]].dataset.placed === "1") placed++;
    if (placed > 0 && P.resetOnModeSwitch) {
      var ok = false;
      try { ok = !!this.confirmFn(STR.MODE_RESET_CONFIRM); } catch (e) { ok = false; }
      if (!ok) return false;
    }
    P.mode = mode;
    this.params.mode = mode;
    this.reset();
    return true;
  };

  /* ---- 状态读回（ENG-10：防御性拷贝） ---- */
  CellBuilder.prototype.state = function () {
    var placed = {}, self = this;
    this._P.organelles.forEach(function (o) {
      var c = self._cards[o.id];
      var slot = c.parentNode;
      var zone = slot && slot.parentNode;
      var zid = zone && zone.getAttribute ? zone.getAttribute("data-zone") : null;
      if (c.dataset.placed === "1" && zid) placed[o.id] = zid;
    });
    var grayed = [];
    this._P.organelles.forEach(function (o) { if (self.grayed(o)) grayed.push(o.id); });
    var need = 0, got = 0;
    this._P.organelles.forEach(function (o) {
      if (self.grayed(o)) return;
      need++;
      if (placed[o.id]) got++;
    });
    return deepCopy({
      version: VERSION,
      mode: this._P.mode,
      placed: placed,
      placedCount: got,
      needCount: need,
      done: this.checkDone(),
      grayedIds: grayed
    });
  };
  CellBuilder.prototype.snapshot = function () { return this.state(); };
  CellBuilder.prototype.restore = function (s) {
    if (!isObj(s) || !isObj(s.placed)) throw new TypeError("cell-builder: restore 快照非法");
    this.reset();
    if (s.mode && s.mode !== this._P.mode) {
      /* 恢复时不弹确认（内部状态恢复，非用户操作） */
      this._P.mode = s.mode; this.params.mode = s.mode; this.applyMode();
    }
    var self = this, ok = true;
    Object.keys(s.placed).forEach(function (id) {
      if (!self.place(id, s.placed[id])) ok = false;
    });
    return ok;
  };

  CellBuilder.prototype.destroy = function () {
    if (this.root && this.root.parentNode) this.root.parentNode.removeChild(this.root);
  };

  /* ---- 静态 ---- */
  CellBuilder.VERSION = VERSION;
  CellBuilder.STR = deepCopy(STR);
  CellBuilder.CLS = deepCopy(CLS);
  CellBuilder.ax = function () { return deepCopy(AX_DEFAULTS); };

  Eng.CellBuilder = CellBuilder;
})();
