/* ============================================================
 * 学习工具箱 · 生物 · 第十二章数据（生物 P15 生产队 2026-10-19）
 *
 * 课：b12.1.1 细胞学说（2 页）/ b12.1.2 细胞膜（3 页）/
 *     b12.1.3 细胞器（3 页）/ b12.1.4 细胞核与生物膜系统（3 页）/
 *     b12.1.5 细胞的物质输入与输出（3 页）/
 *     b12.1.6 本章小结与习题（2 页）。共 16 页。
 *     前置：b11 小结（课程表）；b13.1.1 的前置是"b12 小结"，
 *     本批生产后 b13 前置提示链完整。
 * 交互：零新组件——
 *   B3 experiment-3q 复用 1 处（b12.1.5-p2 质壁分离虚拟实验，
 *     recordKey=bio_3q_b12.1.5，三问顺序 对照→单一变量→重复冻结，
 *     answer 索引程序化校验；对照落点=自身前后对照）；
 *   B1 cell-builder 行为契约内联实现（b12.1.3-p3；远端基线引擎
 *     未实现 B1 渲染器——B1 仅见 docs/biology-interactions.md §B1
 *     文档 spec，首落点 b01.1.3 未生产；故按任务书"其余交互一律
 *     内联实现"口径，用页内 HTML + window.BIO_B12 实现 §B1 全部
 *     行为：拖拽/吸附/功能卡/动植物模式切换/diagramNote 冻结/
 *     plantOnly 置灰；biology-engine.js 零改动）；
 *   其余页内小交互（细胞学说时间轴/磷脂三明治拖拽/融合实验三步/
 *     分泌蛋白旅程/染色质↔染色体切换/质壁分离浓度滑块）为纯内联
 *     HTML + window.BIO_B12 助手函数，不新增引擎组件。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 模式图声明：「模式图：非等比、非实物」（BIO-R32）
 * - 虚拟实验声明：「虚拟实验：现实中须××」（BIO-R35，××逐页写实）
 * - 示意声明：「示意，非真实速度/比例。」（仅动画/虚拟实验页）
 * - T1 边界句：「"三明治"只讲排布样子、不讲"静止"——膜是流动的」
 * - 渗透压一句话：「浓度差产生渗透压——水总往渗透压高（溶质浓）的一侧走」
 * - 辨析①回填：b12.1.3-p1「认旧友：形配其用——结构与功能相适应」
 *   + mathlink 深链 #b05.1.3（兑现 b05.1.3-a4，回填链四站闭环）
 * - 直引号；type:"text" 的块用 html 键（P4 教训）
 *
 * 红线落实：
 * - 结构口径：全批只写"结构与功能相适应"，"结构决定…"零出现（BIO-R09）
 * - "形配其用"四字逐字（BIO-R10/R57），改字=FAIL
 * - 水通道口径：只写"水分子主要经水通道蛋白以协助扩散方式进出
 *   （顺浓度、不耗能）"（B-M1；"要载体所以是主动运输"=FAIL）
 * - 叶绿体口径：只写"只在绿色部分（根细胞无叶绿体）；线粒体普遍
 *   存在，呼吸时刻进行"（b12.1.3-p3 trap 专治）
 * - 染色质口径：只写"同一物质在细胞周期不同时期的两种形态"
 *   （b12.1.4-p1 trap 专治）
 * - 细胞学说口径："施莱登一人提出"=FAIL→"施莱登+施旺共同建立，
 *   后人修正补充"（b12.1.1-p1 trap 专治）
 * - 细胞膜口径："静态三明治"=FAIL→"流动的"（b12.1.2-p2 trap 专治）
 *
 * 门禁⑧：新术语首现即定义——细胞学说（b12.1.1-p1）/流动镶嵌模型
 * （b12.1.2-p1）/选择透过性（b12.1.2-p3）/线粒体/嵴/叶绿体/基粒
 * （b12.1.3-p1）/内质网/高尔基体/核糖体/溶酶体/液泡/中心体
 * （b12.1.3-p2）/核膜/核仁/染色质（b12.1.4-p1）/生物膜系统
 * （b12.1.4-p2）/被动运输/扩散/协助扩散/水通道蛋白（b12.1.5-p1）/
 * 主动运输/载体蛋白（b12.1.5-p1）/渗透作用/渗透压/质壁分离
 * （b12.1.5-p2）。
 * 门禁⑨：深链 4 处（b12.1.3-p1→b05.1.3 辨析①回填认旧友；
 * b12.1.3-p3→b15.1.1/b14.1.1 后续预告；b12.1.5-p3→b13.1.1 后续预告），
 * 课号均已生产；b00/b01/b02/b23/b24/b25 正文零引用；
 * 方向铁律：b12→b13/b14/b15 一律"预告"措辞，不许写成认旧友。
 * 门禁⑩：本批新登记预告 3 条 drafted（b12.1.3-a1→b15.1.1；
 * b12.1.3-a2→b14.1.1；b12.1.5-a1→b13.1.1）；a4 为 in-batch 兑现，
 * 记 ledger-b12.1.3 foretell fulfilled，不记 drafted。
 * 门禁⑪：b12.1.1（2 页）/b12.1.6（2 页）为任务书课页分工的设计意图
 * （学说+时间轴 / 小结与习题），台账留痕，非缺页；
 * quiz 页题目数>0（b12.1.6 两页：review+3 choice / review+3 choice，
 * 题型梯度 review+choice，不许全单选）。
 * 门禁⑫：本批无数学呼应（图纸确认），学生文本零数学课号引用。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
/* ---------- b12 页内小交互助手（纯内联，不新增引擎组件） ---------- */
window.BIO_B12 = {
  /* 通用步骤器：bioB12Steps-<id>-<i>，dots: bioB12Dot-<id>-<i>，msg: bioB12Msg-<id> */
  go: function (id, idx) {
    var i = 0, s;
    while ((s = document.getElementById("bioB12Steps-" + id + "-" + i))) {
      s.style.display = i === idx ? "" : "none";
      var d = document.getElementById("bioB12Dot-" + id + "-" + i);
      if (d) d.style.background = i === idx ? "var(--bio-organelle)" : "var(--bio-line)";
      i++;
    }
    var msg = document.getElementById("bioB12Msg-" + id);
    if (msg) msg.textContent = "第 " + (idx + 1) + " 步 / 共 " + i + " 步";
  },
  /* 通用 pointer 拖拽绑定（卡片半透明跟随；松手回调用 onDrop(el)） */
  _drag: function (el, onDrop) {
    var sx = 0, sy = 0, ox = 0, oy = 0, dragging = false, moved = 0;
    el.style.touchAction = "none";
    el.addEventListener("pointerdown", function (e) {
      dragging = true; moved = 0; sx = e.clientX; sy = e.clientY;
      ox = parseFloat(el.dataset.x || "0"); oy = parseFloat(el.dataset.y || "0");
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
      el.style.zIndex = "50"; el.style.opacity = "0.8";
    });
    el.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
      el.dataset.x = ox + dx; el.dataset.y = oy + dy;
      el.style.transform = "translate(" + el.dataset.x + "px," + el.dataset.y + "px)";
    });
    var up = function () {
      if (!dragging) return; dragging = false;
      el.style.zIndex = ""; el.style.opacity = "";
      el.dataset.moved = moved > 6 ? "1" : "";
      if (onDrop) onDrop(el);
    };
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  },
  /* ---- b12.1.2-p1 磷脂三明治：拖拽磷脂分子看流动 ---- */
  membraneDemo: function () {
    var i = 0, mol, firstBefore = "", firstAfter = "";
    while ((mol = document.getElementById("bioB12Mol-" + i))) {
      if (i === 0) firstBefore = mol.style.transform || "none";
      var nx = (parseFloat(mol.dataset.x || "0") + 18);
      if (nx > 60) nx = nx - 60;
      mol.dataset.x = nx; mol.style.transform = "translate(" + nx + "px,0px)";
      if (i === 0) firstAfter = mol.style.transform;
      i++;
    }
    var msg = document.getElementById("bioB12MemMsg");
    if (msg) msg.textContent = "看——磷脂分子\"动\"了，位置变了，膜没散：这就是流动。";
    return { moved: i, changed: firstBefore !== firstAfter };
  },
  /* ---- b12.1.4-p1 染色质↔染色体切换 ---- */
  _chromState: "A",
  chromToggle: function () {
    var a = document.getElementById("bioB12ChromA"), b = document.getElementById("bioB12ChromB");
    if (!a || !b) return this._chromState;
    if (this._chromState === "A") { a.style.display = "none"; b.style.display = ""; this._chromState = "B"; }
    else { a.style.display = ""; b.style.display = "none"; this._chromState = "A"; }
    var msg = document.getElementById("bioB12ChromMsg");
    if (msg) msg.textContent = this._chromState === "A" ? "当前：染色质（细丝状，分裂间期）" : "当前：染色体（棒状，分裂期）——同一物质！";
    return this._chromState;
  },
  /* ---- b12.1.5-p2 质壁分离浓度滑块 ---- */
  plasma: function (v) {
    v = Math.max(0, Math.min(100, Number(v) || 0));
    var proto = document.getElementById("bioB12Proto"), msg = document.getElementById("bioB12PlasMsg");
    var w = 100 - v * 0.72;
    if (proto) proto.style.width = "calc(" + w.toFixed(1) + "% - 24px)";
    var t;
    if (v <= 20) t = "清水：细胞吸水饱满。";
    else if (v <= 60) t = "蔗糖溶液变浓：细胞失水，原生质层开始收缩。";
    else t = "高浓度：质壁分离——原生质层收缩，与细胞壁分离！";
    if (msg) msg.textContent = t;
    var slider = document.getElementById("bioB12Conc");
    if (slider && String(slider.value) !== String(v)) slider.value = v;
    return t;
  }
};
/* ---------- B1 cell-builder 内联实现（b12.1.3-p3；§B1 行为契约） ----------
 * 远端基线引擎无 B1 渲染器（B1 仅文档 spec），故页内内联实现：
 * 拖结构卡→区域吸附→放错回弹（"再想想它该待在哪"，无红叉不判错）→
 * 点已放结构弹 func 一句话→动/植物模式切换（plantOnly 置灰"动物细胞
 * 没有它"，切换二次确认清空）→全对出"拼搭完成"徽章→diagramNote 常驻。
 * 参数形状照抄 §B1 schema（mode/organelles/zones/diagramNote）。 */
window.BIO_B12.cbData = {
  mode: "animal",
  diagramNote: "模式图：非等比、非实物",
  organelles: [
    { id: "nucleus", label: "细胞核", func: "遗传信息库——DNA 在染色质上，指挥细胞的代谢与遗传" },
    { id: "mito", label: "线粒体", func: "有氧呼吸的主要场所——内膜折叠成嵴，增大面积，适合大量供能" },
    { id: "chloro", label: "叶绿体", func: "光合作用的场所——类囊体堆叠成基粒，含色素，适合捕获光能", plantOnly: true },
    { id: "er", label: "内质网", func: "蛋白质加工、脂质合成的\"车间\"" },
    { id: "golgi", label: "高尔基体", func: "蛋白质分类包装的\"发货部\"" },
    { id: "ribo", label: "核糖体", func: "合成蛋白质的\"生产机\"" },
    { id: "lyso", label: "溶酶体", func: "分解衰老、损伤结构的\"清洁队\"" },
    { id: "vac", label: "液泡", func: "贮存物质、维持细胞形态——植物大液泡特别发达", plantOnly: true },
    { id: "centro", label: "中心体", func: "与动物细胞分裂有关——发出星射线牵引染色体", animalOnly: true },
    { id: "mem", label: "细胞膜", func: "系统的边界——控制物质进出，有选择透过性" },
    { id: "wall", label: "细胞壁", func: "支持和保护——植物细胞最外层的坚韧外壳", plantOnly: true }
  ],
  zones: [
    { zoneId: "z1", label: "指挥中心", accepts: ["nucleus"], hint: "核在哪？" },
    { zoneId: "z2", label: "能量车间", accepts: ["mito", "chloro"], hint: "供能的在哪？" },
    { zoneId: "z3", label: "流水线", accepts: ["ribo", "er", "golgi"], hint: "三站在哪？" },
    { zoneId: "z4", label: "后勤", accepts: ["lyso", "vac"], hint: "清洁贮存？" },
    { zoneId: "z5", label: "边界", accepts: ["mem", "wall", "centro"], hint: "边界分裂？" }
  ]
};
/* 拖拽懒绑定：页面渲染是动态的，用 MutationObserver 在卡片/磷脂分子
 * 入 DOM 时绑定 _drag（静态 HTML，无需 init 调用） */
(function () {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  if (window.BIO_B12._mobInstalled) return; window.BIO_B12._mobInstalled = true;
  function bindCard(c) {
    if (c.dataset.bound) return; c.dataset.bound = "1";
    window.BIO_B12._drag(c, function (el) { window.BIO_B12.cbDrop(el); });
    c.addEventListener("click", function () {
      if (c.dataset.moved) { c.dataset.moved = ""; return; }
      if (c.dataset.placed) window.BIO_B12.cbTap(c.dataset.id);
    });
  }
  function bindMol(m) {
    if (m.dataset.bound) return; m.dataset.bound = "1";
    window.BIO_B12._drag(m, null);
  }
  function scan(root) {
    if (!root || !root.querySelectorAll) return;
    var cs = root.querySelectorAll(".bioB12CbCard"), i, fresh = false;
    for (i = 0; i < cs.length; i++) {
      if (!cs[i].dataset.bound) fresh = true;
      bindCard(cs[i]);
    }
    /* 新渲染的卡片栏：按当前模式置灰 plantOnly/animalOnly */
    if (fresh) {
      var trays = root.querySelectorAll ? root.querySelectorAll("#bioB12CbTray") : [];
      if ((root.id === "bioB12CbTray" || trays.length)) {
        try { window.BIO_B12.cbApplyMode(); } catch (e) {}
      }
    }
    var ms = root.querySelectorAll(".bioB12Mol");
    for (i = 0; i < ms.length; i++) bindMol(ms[i]);
  }
  function install() {
    var de = document.documentElement; if (!de) return;
    scan(de);
    if (window.MutationObserver) {
      new MutationObserver(function (muts) {
        for (var k = 0; k < muts.length; k++) {
          var ns = muts[k].addedNodes;
          for (var j = 0; j < ns.length; j++) scan(ns[j]);
        }
      }).observe(de, { childList: true, subtree: true });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();
window.BIO_B12.cbCard = function (id) {
  var cards = document.querySelectorAll(".bioB12CbCard"), i;
  for (i = 0; i < cards.length; i++) if (cards[i].dataset.id === id) return cards[i];
  return null;
};
window.BIO_B12.cbGrayed = function (o) {
  var m = window.BIO_B12.cbData.mode;
  return (m === "animal" && o.plantOnly) || (m === "plant" && o.animalOnly);
};
window.BIO_B12.cbApplyMode = function () {
  var D = window.BIO_B12.cbData, self = window.BIO_B12;
  var tray = document.getElementById("bioB12CbTray");
  D.organelles.forEach(function (o) {
    var c = self.cbCard(o.id); if (!c) return;
    if (self.cbGrayed(o)) {
      c.disabled = true; c.style.opacity = "0.45"; c.style.cursor = "not-allowed";
      c.textContent = o.label + "（" + (D.mode === "animal" ? "动物细胞没有它" : "植物细胞没有它") + "）";
    } else { c.disabled = false; c.style.opacity = ""; c.style.cursor = "grab"; c.textContent = o.label; }
  });
  var bA = document.getElementById("bioB12CbModeA"), bP = document.getElementById("bioB12CbModeP");
  if (bA) bA.style.outline = D.mode === "animal" ? "2px solid var(--bio-organelle)" : "";
  if (bP) bP.style.outline = D.mode === "plant" ? "2px solid var(--bio-organelle)" : "";
  if (tray) { /* 置灰卡片移回卡片栏，避免残留 */ }
};
window.BIO_B12.cbReset = function () {
  var self = window.BIO_B12, tray = document.getElementById("bioB12CbTray");
  if (!tray) return;
  var cards = document.querySelectorAll(".bioB12CbCard"), i;
  for (i = 0; i < cards.length; i++) {
    var c = cards[i];
    c.dataset.placed = ""; c.dataset.x = "0"; c.dataset.y = "0";
    c.style.transform = ""; tray.appendChild(c);
  }
  var badge = document.getElementById("bioB12CbBadge"); if (badge) badge.style.display = "none";
  var pop = document.getElementById("bioB12CbPop");
  if (pop) pop.textContent = "点已放好的结构卡，看\"结构—功能\"一句话。";
  self.cbApplyMode();
};
window.BIO_B12.cbMode = function (mode) {
  var D = window.BIO_B12.cbData, self = window.BIO_B12;
  if (D.mode === mode) return;
  var placed = document.querySelectorAll(".bioB12CbCard[data-placed=\"1\"]").length;
  if (placed > 0 && !window.confirm("切换模式会清空已放卡片，继续吗？")) return;
  D.mode = mode; self.cbReset();
};
window.BIO_B12.cbDrop = function (el) {
  var self = window.BIO_B12, D = self.cbData;
  var id = el.dataset.id;
  var o = null, i;
  for (i = 0; i < D.organelles.length; i++) if (D.organelles[i].id === id) o = D.organelles[i];
  if (!o || self.cbGrayed(o)) { self.cbBack(el); return; }
  var r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  var zones = document.querySelectorAll(".bioB12CbZone"), hit = null, zi;
  for (zi = 0; zi < zones.length; zi++) {
    var zr = zones[zi].getBoundingClientRect();
    if (cx >= zr.left && cx <= zr.right && cy >= zr.top && cy <= zr.bottom) { hit = zones[zi]; break; }
  }
  var hint = document.getElementById("bioB12CbHint");
  if (hit) {
    var zid = hit.dataset.zone, z = null;
    for (i = 0; i < D.zones.length; i++) if (D.zones[i].zoneId === zid) z = D.zones[i];
    if (z && z.accepts.indexOf(id) >= 0) {
      var slot = hit.querySelector(".bioB12CbSlot");
      el.dataset.placed = "1"; el.dataset.x = "0"; el.dataset.y = "0"; el.style.transform = "";
      slot.appendChild(el);
      if (hint) hint.textContent = "";
      el.style.boxShadow = "0 0 0 2px var(--bio-organelle)";
      setTimeout(function () { el.style.boxShadow = ""; }, 600);
      self.cbTap(id); self.cbCheckDone(); return;
    }
    if (hint) hint.textContent = "再想想它该待在哪";
  }
  self.cbBack(el);
};
window.BIO_B12.cbBack = function (el) {
  var tray = document.getElementById("bioB12CbTray");
  el.dataset.placed = ""; el.dataset.x = "0"; el.dataset.y = "0";
  el.style.transform = "";
  if (tray) tray.appendChild(el);
  window.BIO_B12.cbCheckDone();
};
window.BIO_B12.cbTap = function (id) {
  var D = window.BIO_B12.cbData, pop = document.getElementById("bioB12CbPop"), i;
  for (i = 0; i < D.organelles.length; i++) if (D.organelles[i].id === id) {
    if (pop) pop.textContent = D.organelles[i].label + "：" + D.organelles[i].func;
    return D.organelles[i].func;
  }
  return "";
};
/* 程序化放置（QA 走查用；与拖拽落点同一逻辑） */
window.BIO_B12.cbPlace = function (id, zoneId) {
  var self = window.BIO_B12, D = self.cbData;
  var o = null, i;
  for (i = 0; i < D.organelles.length; i++) if (D.organelles[i].id === id) o = D.organelles[i];
  if (!o || self.cbGrayed(o)) return false;
  var z = null;
  for (i = 0; i < D.zones.length; i++) if (D.zones[i].zoneId === zoneId) z = D.zones[i];
  if (!z || z.accepts.indexOf(id) < 0) {
    var hint = document.getElementById("bioB12CbHint");
    if (hint) hint.textContent = "再想想它该待在哪";
    return false;
  }
  var c = self.cbCard(id); if (!c) return false;
  var slot = document.querySelector(".bioB12CbZone[data-zone=\"" + zoneId + "\"] .bioB12CbSlot");
  if (!slot) return false;
  c.dataset.placed = "1"; c.dataset.x = "0"; c.dataset.y = "0"; c.style.transform = "";
  slot.appendChild(c);
  var hint2 = document.getElementById("bioB12CbHint"); if (hint2) hint2.textContent = "";
  self.cbCheckDone();
  return true;
};
window.BIO_B12.cbCheckDone = function () {
  var D = window.BIO_B12.cbData, self = window.BIO_B12;
  var need = 0, got = 0, i;
  for (i = 0; i < D.organelles.length; i++) {
    if (self.cbGrayed(D.organelles[i])) continue;
    need++;
    var c = self.cbCard(D.organelles[i].id);
    if (c && c.dataset.placed) got++;
  }
  var badge = document.getElementById("bioB12CbBadge");
  if (badge) badge.style.display = (need > 0 && got === need) ? "" : "none";
  return got === need && need > 0;
};

/* ==================== 第十二章数据 ==================== */
window.BIO_CH["b12"] = {
  id: "b12",
  units: [
    {
      id: "b12.1",
      title: "细胞的结构",
      lessons: [
        {
          id: "b12.1.1",
          title: "细胞学说",
          prereq: "b11 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：共同建立 + 内容三点 + 专治 ============ */
            {
              id: "b12.1.1-p1",
              kind: "explain",
              title: "谁提出了细胞学说",
              blocks: [
                { type: "lead", text: "细胞学说是\"施莱登一人提出\"的吗？——是两人接力，外加后人补笔。" },
                { type: "text", html: "先认词——细胞学说：关于\"细胞是生物体基本单位\"的学说。提出者：德国植物学家施莱登与动物学家施旺，两人共同建立。" },
                { type: "text", html: "内容三点：①细胞是一个有机体，一切动植物都由细胞发育而来；②细胞是生物体结构和功能的基本单位；③新细胞由老细胞分裂产生。" },
                { type: "trap", text: "⚠️ \"施莱登一人提出细胞学说\"错——施莱登研究植物、施旺研究动物，共同建立；后人修正补充。" },
                { type: "note", text: "一句话：细胞学说=施莱登+施旺共同建立，后人修正补充。" }
              ],
              point: "细胞学说：施莱登+施旺共同建立；三点：细胞是单位、动植物由细胞发育而来、新细胞来自老细胞。"
            },
            /* ============ p2：时间轴 + 魏尔肖 + 意义 ============ */
            {
              id: "b12.1.1-p2",
              kind: "explain",
              title: "细胞学说的建立与发展",
              blocks: [
                { type: "lead", text: "从\"看见细胞\"到\"说出学说\"，人类走了近两百年。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">细胞学说建立时间轴：</div>" +
                  "<div style=\"display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.go('tl',0)\">①</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.go('tl',1)\">②</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.go('tl',2)\">③</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.go('tl',3)\">④</button>" +
                  "</div>" +
                  "<div id=\"bioB12Steps-tl-0\">① 1665 虎克：显微镜下看到软木\"小室\"，命名为 cell（细胞）。</div>" +
                  "<div id=\"bioB12Steps-tl-1\" style=\"display:none\">② 1838 施莱登：植物体由细胞构成。</div>" +
                  "<div id=\"bioB12Steps-tl-2\" style=\"display:none\">③ 1839 施旺：动物体也由细胞构成——细胞学说建立。</div>" +
                  "<div id=\"bioB12Steps-tl-3\" style=\"display:none\">④ 1858 魏尔肖：\"一切细胞来自细胞\"（新细胞由老细胞分裂产生）。</div>" +
                  "<div id=\"bioB12Msg-tl\" style=\"font-size:12px;color:var(--bio-ink-soft);margin-top:6px\">第 1 步 / 共 4 步</div>" +
                  "</div>" },
                { type: "text", html: "意义：把动物界和植物界统一到细胞水平，证明生物界有共同的结构基础；后人不断修正补充，学说持续发展。" },
                { type: "note", text: "记时间轴：看见（虎克）→植物（施莱登）→动物（施旺）→分裂（魏尔肖）。" }
              ],
              point: "时间轴：虎克看见→施莱登植物→施旺动物→魏尔肖\"一切细胞来自细胞\"。"
            }
          ]
        },
        {
          id: "b12.1.2",
          title: "细胞膜",
          prereq: "细胞学说",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：直觉页——磷脂三明治拖拽 + T1 边界句 ============ */
            {
              id: "b12.1.2-p1",
              kind: "explain",
              title: "三明治排布",
              blocks: [
                { type: "lead", text: "细胞膜像一块\"三明治\"——两层磷脂是\"面包片\"。拖一拖，看它们动不动。" },
                { type: "text", html: "先认词——流动镶嵌模型：描述细胞膜结构的模型（磷脂双分子层为基本支架，蛋白质镶嵌其中）。本页先看\"三明治\"排布，严格细节后两页。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">磷脂双分子层（模式图：非等比、非实物）——拖动\"磷脂分子\"，看它\"流动\"：</div>" +
                  "<div id=\"bioB12Mem\" style=\"position:relative;height:120px;background:var(--bio-bg);border-radius:8px;overflow:hidden\">" +
                  "<div class=\"bioB12Mol\" id=\"bioB12Mol-0\" data-x=\"0\" style=\"position:absolute;left:4%;top:8px;width:26px;cursor:grab;touch-action:none\"><div style=\"width:14px;height:14px;border-radius:50%;background:var(--bio-membrane);margin:0 auto\"></div><div style=\"display:flex;justify-content:center;gap:4px\"><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div></div></div>" +
                  "<div class=\"bioB12Mol\" id=\"bioB12Mol-1\" data-x=\"0\" style=\"position:absolute;left:20%;top:8px;width:26px;cursor:grab;touch-action:none\"><div style=\"width:14px;height:14px;border-radius:50%;background:var(--bio-membrane);margin:0 auto\"></div><div style=\"display:flex;justify-content:center;gap:4px\"><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div></div></div>" +
                  "<div class=\"bioB12Mol\" id=\"bioB12Mol-2\" data-x=\"0\" style=\"position:absolute;left:36%;top:8px;width:26px;cursor:grab;touch-action:none\"><div style=\"width:14px;height:14px;border-radius:50%;background:var(--bio-membrane);margin:0 auto\"></div><div style=\"display:flex;justify-content:center;gap:4px\"><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div></div></div>" +
                  "<div class=\"bioB12Mol\" id=\"bioB12Mol-3\" data-x=\"0\" style=\"position:absolute;left:52%;top:8px;width:26px;cursor:grab;touch-action:none\"><div style=\"width:14px;height:14px;border-radius:50%;background:var(--bio-membrane);margin:0 auto\"></div><div style=\"display:flex;justify-content:center;gap:4px\"><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div></div></div>" +
                  "<div class=\"bioB12Mol\" id=\"bioB12Mol-4\" data-x=\"0\" style=\"position:absolute;left:68%;top:8px;width:26px;cursor:grab;touch-action:none\"><div style=\"width:14px;height:14px;border-radius:50%;background:var(--bio-membrane);margin:0 auto\"></div><div style=\"display:flex;justify-content:center;gap:4px\"><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div></div></div>" +
                  "<div class=\"bioB12Mol\" id=\"bioB12Mol-5\" data-x=\"0\" style=\"position:absolute;left:84%;top:8px;width:26px;cursor:grab;touch-action:none\"><div style=\"width:14px;height:14px;border-radius:50%;background:var(--bio-membrane);margin:0 auto\"></div><div style=\"display:flex;justify-content:center;gap:4px\"><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div></div></div>" +
                  "<div class=\"bioB12Mol\" id=\"bioB12Mol-6\" data-x=\"0\" style=\"position:absolute;left:4%;bottom:8px;width:26px;cursor:grab;touch-action:none\"><div style=\"display:flex;justify-content:center;gap:4px\"><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div></div><div style=\"width:14px;height:14px;border-radius:50%;background:var(--bio-membrane);margin:0 auto\"></div></div>" +
                  "<div class=\"bioB12Mol\" id=\"bioB12Mol-7\" data-x=\"0\" style=\"position:absolute;left:20%;bottom:8px;width:26px;cursor:grab;touch-action:none\"><div style=\"display:flex;justify-content:center;gap:4px\"><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div></div><div style=\"width:14px;height:14px;border-radius:50%;background:var(--bio-membrane);margin:0 auto\"></div></div>" +
                  "<div class=\"bioB12Mol\" id=\"bioB12Mol-8\" data-x=\"0\" style=\"position:absolute;left:36%;bottom:8px;width:26px;cursor:grab;touch-action:none\"><div style=\"display:flex;justify-content:center;gap:4px\"><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div></div><div style=\"width:14px;height:14px;border-radius:50%;background:var(--bio-membrane);margin:0 auto\"></div></div>" +
                  "<div class=\"bioB12Mol\" id=\"bioB12Mol-9\" data-x=\"0\" style=\"position:absolute;left:52%;bottom:8px;width:26px;cursor:grab;touch-action:none\"><div style=\"display:flex;justify-content:center;gap:4px\"><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div></div><div style=\"width:14px;height:14px;border-radius:50%;background:var(--bio-membrane);margin:0 auto\"></div></div>" +
                  "<div class=\"bioB12Mol\" id=\"bioB12Mol-10\" data-x=\"0\" style=\"position:absolute;left:68%;bottom:8px;width:26px;cursor:grab;touch-action:none\"><div style=\"display:flex;justify-content:center;gap:4px\"><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div></div><div style=\"width:14px;height:14px;border-radius:50%;background:var(--bio-membrane);margin:0 auto\"></div></div>" +
                  "<div class=\"bioB12Mol\" id=\"bioB12Mol-11\" data-x=\"0\" style=\"position:absolute;left:84%;bottom:8px;width:26px;cursor:grab;touch-action:none\"><div style=\"display:flex;justify-content:center;gap:4px\"><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div><div style=\"width:3px;height:24px;background:var(--bio-ink-soft)\"></div></div><div style=\"width:14px;height:14px;border-radius:50%;background:var(--bio-membrane);margin:0 auto\"></div></div>" +
                  "</div>" +
                  "<div style=\"margin-top:8px\"><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.membraneDemo()\">看它们流动</button></div>" +
                  "<div id=\"bioB12MemMsg\" style=\"font-size:13px;margin-top:6px\">把\"磷脂分子\"拖一拖——位置变了，膜没散，这就是流动。</div>" +
                  "<div style=\"font-size:12px;color:var(--bio-ink-soft);margin-top:4px\">示意，非真实速度/比例。</div>" +
                  "</div>" },
                { type: "text", html: "\"三明治\"只讲排布样子、不讲\"静止\"——膜是流动的。" },
                { type: "note", text: "排布记\"两层磷脂当面包片\"；流动记\"膜不是静止的\"。" }
              ],
              point: "细胞膜=磷脂双分子层\"三明治\"；\"三明治\"只讲排布，膜是流动的。"
            },
            /* ============ p2：脚手架——荧光标记融合实验证据 ============ */
            {
              id: "b12.1.2-p2",
              kind: "explain",
              title: "膜是流动的证据",
              blocks: [
                { type: "lead", text: "两种颜色的膜蛋白混到一起了——膜在流动！" },
                { type: "text", html: "证据：荧光标记小鼠—人细胞融合实验——红、绿荧光分别标记两种细胞的膜蛋白，诱导融合；一段时间后红绿荧光均匀混合。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">三步看融合（示意，非真实速度/比例。）：</div>" +
                  "<div style=\"display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.go('fus',0)\">①</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.go('fus',1)\">②</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.go('fus',2)\">③</button>" +
                  "</div>" +
                  "<div id=\"bioB12Steps-fus-0\">①标记：小鼠细胞膜蛋白染红，人细胞膜蛋白染绿（模式图：非等比、非实物）。</div>" +
                  "<div id=\"bioB12Steps-fus-1\" style=\"display:none\">②融合：诱导两细胞融合成一个，红色一半、绿色一半。</div>" +
                  "<div id=\"bioB12Steps-fus-2\" style=\"display:none\">③混匀：红绿荧光均匀混合——膜蛋白会移动！</div>" +
                  "<div id=\"bioB12Msg-fus\" style=\"font-size:12px;color:var(--bio-ink-soft);margin-top:6px\">第 1 步 / 共 3 步</div>" +
                  "</div>" },
                { type: "text", html: "结论：膜蛋白会移动→细胞膜是流动的。" },
                { type: "trap", text: "⚠️ \"细胞膜是静态三明治\"错——流动的！证据就是荧光标记融合实验。" },
                { type: "note", text: "实验名：荧光标记小鼠—人细胞融合实验；结论：膜蛋白会动。" }
              ],
              point: "流动性证据：荧光标记小鼠—人细胞融合实验，红绿混匀→膜在流动。"
            },
            /* ============ p3：严格页——蛋白质三种方式 + 选择透过性 ============ */
            {
              id: "b12.1.2-p3",
              kind: "explain",
              title: "蛋白质排布与选择透过性",
              blocks: [
                { type: "lead", text: "严格版来了：蛋白质在膜上有三种\"坐姿\"，膜还会\"看门\"。" },
                { type: "text", html: "蛋白质镶嵌/贯穿/覆盖三种方式：有的镶在磷脂双分子层表面，有的全部或部分嵌入其中，有的贯穿整个磷脂双分子层。（模式图：非等比、非实物）" },
                { type: "text", html: "先认词——选择透过性：细胞膜让水分子自由通过，选择吸收离子和小分子，挡住不需要或有害的物质。" },
                { type: "note", text: "边界：\"三明治\"只画了磷脂排布；严格版拼图=蛋白质三种\"坐姿\"+选择透过性。" }
              ],
              point: "蛋白质三种排布：镶嵌表面/嵌入/贯穿；细胞膜有选择透过性。"
            }
          ]
        },
        {
          id: "b12.1.3",
          title: "细胞器",
          prereq: "细胞膜",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：线粒体 + 叶绿体 + 辨析①回填 a4 兑现 ============ */
            {
              id: "b12.1.3-p1",
              kind: "explain",
              title: "能量车间：线粒体与叶绿体",
              blocks: [
                { type: "lead", text: "细胞里的\"能量车间\"长什么样？——看褶皱和堆叠。" },
                { type: "text", html: "先认词——线粒体：有氧呼吸的主要场所；内膜向内折叠成嵴（先认词——嵴：线粒体内膜的褶皱）。先认词——叶绿体：光合作用的场所；类囊体堆叠成基粒（先认词——基粒：类囊体的堆叠）。" },
                { type: "text", html: "辨析①回填：线粒体内膜折叠成嵴、叶绿体类囊体堆叠成基粒——增大膜面积，适合大量进行有氧呼吸、光合作用。认旧友：形配其用——结构与功能相适应（还记得小肠吗？小肠绒毛增大吸收面积，适合吸收）。" },
                { type: "mathlink", text: "认旧友：b05.1.3——小肠 5 处结构\"形配其用\"（立靶页）；线粒体嵴、叶绿体基粒增大膜面积，同样\"形配其用\"。" },
                { type: "text", html: "模式图（线粒体/叶绿体）：模式图：非等比、非实物。" },
                { type: "note", text: "嵴=线粒体内膜褶皱；基粒=类囊体堆叠；都是\"增大面积，形配其用\"。" }
              ],
              point: "线粒体：内膜嵴→有氧呼吸；叶绿体：基粒→光合；形配其用。"
            },
            /* ============ p2：其余六细胞器 + 分泌蛋白旅程 ============ */
            {
              id: "b12.1.3-p2",
              kind: "explain",
              title: "分工合作：分泌蛋白旅程",
              blocks: [
                { type: "lead", text: "细胞里还有六位\"员工\"：分工合作像快递流水线。" },
                { type: "text", html: "先认词——内质网：加工蛋白质、合成脂质；高尔基体：分类包装；核糖体：合成蛋白质；溶酶体：分解衰老结构；液泡：贮存物质、维持形态；中心体：与动物细胞分裂有关。" },
                { type: "text", html: "共有：细胞膜、细胞质、细胞核、线粒体、内质网、高尔基体、核糖体、溶酶体；植物特有：细胞壁、叶绿体、大液泡；动物特有：中心体。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">分泌蛋白旅程（模式图：非等比、非实物；示意，非真实速度/比例。）：</div>" +
                  "<div style=\"display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.go('sec',0)\">核糖体</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.go('sec',1)\">内质网</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.go('sec',2)\">高尔基体</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.go('sec',3)\">膜外</button>" +
                  "</div>" +
                  "<div id=\"bioB12Steps-sec-0\">核糖体合成蛋白质。</div>" +
                  "<div id=\"bioB12Steps-sec-1\" style=\"display:none\">内质网加工折叠。</div>" +
                  "<div id=\"bioB12Steps-sec-2\" style=\"display:none\">高尔基体分类包装。</div>" +
                  "<div id=\"bioB12Steps-sec-3\" style=\"display:none\">经细胞膜排出膜外。</div>" +
                  "<div id=\"bioB12Msg-sec\" style=\"font-size:12px;color:var(--bio-ink-soft);margin-top:6px\">第 1 步 / 共 4 步</div>" +
                  "</div>" },
                { type: "note", text: "旅程：核糖体→内质网→高尔基体→膜外。" }
              ],
              point: "分工合作：核糖体→内质网→高尔基体→膜外。"
            },
            /* ============ p3：B1 cell-builder 内联 + 专治 + 后续预告 2 条 ============ */
            {
              id: "b12.1.3-p3",
              kind: "explain",
              title: "拼搭细胞",
              blocks: [
                { type: "lead", text: "动手拼一座细胞：把结构卡拖到对的位置，点一点看\"结构—功能\"一句话。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"display:flex;gap:8px;margin-bottom:8px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB12CbModeA\" style=\"min-height:44px\" onclick=\"BIO_B12.cbMode('animal')\">动物细胞</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB12CbModeP\" style=\"min-height:44px\" onclick=\"BIO_B12.cbMode('plant')\">植物细胞</button>" +
                  "</div>" +
                  "<div style=\"font-size:13px;color:var(--bio-ink-soft);margin-bottom:4px\">结构卡（拖到对的位置）：</div>" +
                  "<div id=\"bioB12CbTray\" style=\"display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;min-height:48px\">" +
                  "<button type=\"button\" class=\"bioB12CbCard\" data-id=\"nucleus\" style=\"min-height:44px;padding:8px 10px;border:1px solid var(--bio-line);border-radius:8px;background:var(--bio-bg);color:var(--bio-text);cursor:grab;touch-action:none\">细胞核</button>" +
                  "<button type=\"button\" class=\"bioB12CbCard\" data-id=\"mito\" style=\"min-height:44px;padding:8px 10px;border:1px solid var(--bio-line);border-radius:8px;background:var(--bio-bg);color:var(--bio-text);cursor:grab;touch-action:none\">线粒体</button>" +
                  "<button type=\"button\" class=\"bioB12CbCard\" data-id=\"chloro\" style=\"min-height:44px;padding:8px 10px;border:1px solid var(--bio-line);border-radius:8px;background:var(--bio-bg);color:var(--bio-text);cursor:grab;touch-action:none\">叶绿体</button>" +
                  "<button type=\"button\" class=\"bioB12CbCard\" data-id=\"er\" style=\"min-height:44px;padding:8px 10px;border:1px solid var(--bio-line);border-radius:8px;background:var(--bio-bg);color:var(--bio-text);cursor:grab;touch-action:none\">内质网</button>" +
                  "<button type=\"button\" class=\"bioB12CbCard\" data-id=\"golgi\" style=\"min-height:44px;padding:8px 10px;border:1px solid var(--bio-line);border-radius:8px;background:var(--bio-bg);color:var(--bio-text);cursor:grab;touch-action:none\">高尔基体</button>" +
                  "<button type=\"button\" class=\"bioB12CbCard\" data-id=\"ribo\" style=\"min-height:44px;padding:8px 10px;border:1px solid var(--bio-line);border-radius:8px;background:var(--bio-bg);color:var(--bio-text);cursor:grab;touch-action:none\">核糖体</button>" +
                  "<button type=\"button\" class=\"bioB12CbCard\" data-id=\"lyso\" style=\"min-height:44px;padding:8px 10px;border:1px solid var(--bio-line);border-radius:8px;background:var(--bio-bg);color:var(--bio-text);cursor:grab;touch-action:none\">溶酶体</button>" +
                  "<button type=\"button\" class=\"bioB12CbCard\" data-id=\"vac\" style=\"min-height:44px;padding:8px 10px;border:1px solid var(--bio-line);border-radius:8px;background:var(--bio-bg);color:var(--bio-text);cursor:grab;touch-action:none\">液泡</button>" +
                  "<button type=\"button\" class=\"bioB12CbCard\" data-id=\"centro\" style=\"min-height:44px;padding:8px 10px;border:1px solid var(--bio-line);border-radius:8px;background:var(--bio-bg);color:var(--bio-text);cursor:grab;touch-action:none\">中心体</button>" +
                  "<button type=\"button\" class=\"bioB12CbCard\" data-id=\"mem\" style=\"min-height:44px;padding:8px 10px;border:1px solid var(--bio-line);border-radius:8px;background:var(--bio-bg);color:var(--bio-text);cursor:grab;touch-action:none\">细胞膜</button>" +
                  "<button type=\"button\" class=\"bioB12CbCard\" data-id=\"wall\" style=\"min-height:44px;padding:8px 10px;border:1px solid var(--bio-line);border-radius:8px;background:var(--bio-bg);color:var(--bio-text);cursor:grab;touch-action:none\">细胞壁</button>" +
                  "</div>" +
                  "<div class=\"bioB12CbZone\" data-zone=\"z1\" style=\"border:1px dashed var(--bio-line);border-radius:8px;padding:8px;margin:6px 0;background:var(--bio-bg)\"><div style=\"font-size:14px;font-weight:bold\">指挥中心</div><div style=\"font-size:12px;color:var(--bio-ink-soft)\">核在哪？</div><div class=\"bioB12CbSlot\" style=\"display:flex;flex-wrap:wrap;gap:4px;min-height:48px;margin-top:4px\"></div></div>" +
                  "<div class=\"bioB12CbZone\" data-zone=\"z2\" style=\"border:1px dashed var(--bio-line);border-radius:8px;padding:8px;margin:6px 0;background:var(--bio-bg)\"><div style=\"font-size:14px;font-weight:bold\">能量车间</div><div style=\"font-size:12px;color:var(--bio-ink-soft)\">供能的在哪？</div><div class=\"bioB12CbSlot\" style=\"display:flex;flex-wrap:wrap;gap:4px;min-height:48px;margin-top:4px\"></div></div>" +
                  "<div class=\"bioB12CbZone\" data-zone=\"z3\" style=\"border:1px dashed var(--bio-line);border-radius:8px;padding:8px;margin:6px 0;background:var(--bio-bg)\"><div style=\"font-size:14px;font-weight:bold\">流水线</div><div style=\"font-size:12px;color:var(--bio-ink-soft)\">三站在哪？</div><div class=\"bioB12CbSlot\" style=\"display:flex;flex-wrap:wrap;gap:4px;min-height:48px;margin-top:4px\"></div></div>" +
                  "<div class=\"bioB12CbZone\" data-zone=\"z4\" style=\"border:1px dashed var(--bio-line);border-radius:8px;padding:8px;margin:6px 0;background:var(--bio-bg)\"><div style=\"font-size:14px;font-weight:bold\">后勤</div><div style=\"font-size:12px;color:var(--bio-ink-soft)\">清洁贮存？</div><div class=\"bioB12CbSlot\" style=\"display:flex;flex-wrap:wrap;gap:4px;min-height:48px;margin-top:4px\"></div></div>" +
                  "<div class=\"bioB12CbZone\" data-zone=\"z5\" style=\"border:1px dashed var(--bio-line);border-radius:8px;padding:8px;margin:6px 0;background:var(--bio-bg)\"><div style=\"font-size:14px;font-weight:bold\">边界</div><div style=\"font-size:12px;color:var(--bio-ink-soft)\">边界分裂？</div><div class=\"bioB12CbSlot\" style=\"display:flex;flex-wrap:wrap;gap:4px;min-height:48px;margin-top:4px\"></div></div>" +
                  "<div id=\"bioB12CbPop\" style=\"font-size:13px;border:1px solid var(--bio-line);border-radius:8px;padding:8px;margin:6px 0;background:var(--bio-bg)\">点已放好的结构卡，看\"结构—功能\"一句话。</div>" +
                  "<div id=\"bioB12CbBadge\" style=\"display:none;font-size:14px;font-weight:bold;color:var(--bio-organelle);margin:6px 0\">拼搭完成——形配其用！</div>" +
                  "<div id=\"bioB12CbHint\" style=\"font-size:13px;color:var(--bio-warn);min-height:20px\"></div>" +
                  "<div style=\"font-size:12px;color:var(--bio-ink-soft);margin-top:4px\">模式图：非等比、非实物</div>" +
                  "</div>" },
                { type: "trap", text: "⚠️ \"叶绿体所有植物细胞都有\"错——只在绿色部分！根细胞无叶绿体；线粒体则普遍存在，呼吸时刻进行。" },
                { type: "mathlink", text: "预告：b15.1.1——有氧呼吸（线粒体把有机物里的能量释放出来，b15.1.1 细讲）。" },
                { type: "mathlink", text: "预告：b14.1.1——捕获光能的色素（叶绿体里的色素如何捕获光能，b14.1.1 细讲）。" },
                { type: "note", text: "拼搭口诀：指挥（核）/能量（线粒体、叶绿体）/流水线（核糖体、内质网、高尔基体）。" }
              ],
              point: "动植物细胞异同：植物特有细胞壁/叶绿体/大液泡；动物特有中心体；其余共有。"
            }
          ]
        },
        {
          id: "b12.1.4",
          title: "细胞核与生物膜系统",
          prereq: "细胞器",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：核膜/核仁/染色质 + 形态切换 ============ */
            {
              id: "b12.1.4-p1",
              kind: "explain",
              title: "染色质与染色体",
              blocks: [
                { type: "lead", text: "细胞核里，同一份\"图纸\"有两种样子——点一下切换看看。" },
                { type: "text", html: "先认词——核膜：细胞核的界膜；核仁：与核糖体形成有关；染色质：易被碱性染料染成深色的物质，主要由 DNA 和蛋白质组成。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">染色质↔染色体（模式图：非等比、非实物；示意，非真实速度/比例。）：点按钮切换</div>" +
                  "<div id=\"bioB12ChromA\" style=\"text-align:center;padding:10px\">" +
                  "<div style=\"font-size:22px;color:var(--bio-gene);letter-spacing:4px\">∿∿∿∿∿</div>" +
                  "<div style=\"font-size:22px;color:var(--bio-gene);letter-spacing:4px\">∿∿∿∿∿</div>" +
                  "<div style=\"font-size:13px;margin-top:4px\">染色质：细丝状（分裂间期）</div></div>" +
                  "<div id=\"bioB12ChromB\" style=\"display:none;text-align:center;padding:10px\">" +
                  "<div style=\"font-size:34px;color:var(--bio-gene);letter-spacing:10px\">✕ ✕</div>" +
                  "<div style=\"font-size:13px;margin-top:4px\">染色体：棒状（分裂期）</div></div>" +
                  "<div style=\"margin:8px 0\"><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.chromToggle()\">切换：染色质 / 染色体</button></div>" +
                  "<div id=\"bioB12ChromMsg\" style=\"font-size:13px\">当前：染色质（细丝状，分裂间期）</div>" +
                  "</div>" },
                { type: "trap", text: "⚠️ \"染色质和染色体是两种物质\"错——同一物质在细胞周期不同时期的两种形态！" },
                { type: "note", text: "记住：染色质=染色体；间期细丝状，分裂期棒状。" }
              ],
              point: "染色质与染色体：同一物质，细胞周期不同时期的两种形态。"
            },
            /* ============ p2：遗传信息库 + 生物膜系统 ============ */
            {
              id: "b12.1.4-p2",
              kind: "explain",
              title: "遗传信息库与生物膜系统",
              blocks: [
                { type: "lead", text: "细胞核是\"信息库\"，细胞里的膜还是\"一家人\"。" },
                { type: "text", html: "细胞核是遗传信息库：遗传物质 DNA 主要在染色质上，控制细胞的代谢与遗传。" },
                { type: "text", html: "先认词——生物膜系统：细胞膜、核膜、细胞器膜等结构共同构成；在结构和功能上紧密联系（分泌蛋白旅程就是膜在\"接力\"）。" },
                { type: "note", text: "生物膜系统=细胞膜+核膜+细胞器膜；联系见分泌蛋白旅程。" }
              ],
              point: "细胞核：遗传信息库；生物膜系统：膜结构的总称，膜间有联系。"
            },
            /* ============ p3：模式图 vs 实物图声明 ============ */
            {
              id: "b12.1.4-p3",
              kind: "explain",
              title: "模式图与实物图",
              blocks: [
                { type: "lead", text: "看图先看\"身份\"：模式图还是实物图？" },
                { type: "text", html: "模式图：为讲清结构画的示意图，角落常驻\"模式图：非等比、非实物\"——比例大小不必当真，看的是结构关系。" },
                { type: "text", html: "实物图：显微/电镜拍的真实照片，必须注明\"实物图\"——看到的是真实样子，细节需要解读。" },
                { type: "text", html: "<div style=\"display:flex;gap:8px;flex-wrap:wrap;margin:6px 0\">" +
                  "<div style=\"flex:1;min-width:140px;border:1px solid var(--bio-line);border-radius:10px;padding:10px;background:var(--bio-panel)\">" +
                  "<div style=\"width:70px;height:70px;border-radius:50%;border:2px solid var(--bio-organelle);margin:0 auto;position:relative\"><div style=\"position:absolute;left:24px;top:24px;width:22px;height:22px;border-radius:50%;background:var(--bio-gene);opacity:0.6\"></div></div>" +
                  "<div style=\"font-size:12px;text-align:center;margin-top:6px\">细胞核模式图</div>" +
                  "<div style=\"font-size:12px;color:var(--bio-ink-soft);text-align:center\">模式图：非等比、非实物</div></div>" +
                  "<div style=\"flex:1;min-width:140px;border:1px solid var(--bio-line);border-radius:10px;padding:10px;background:var(--bio-panel)\">" +
                  "<div style=\"height:70px;border-radius:6px;background:var(--bio-bg);display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--bio-ink-soft)\">电镜实物图位</div>" +
                  "<div style=\"font-size:12px;text-align:center;margin-top:6px\">真实电镜照片须注明\"实物图\"</div>" +
                  "<div style=\"font-size:12px;color:var(--bio-ink-soft);text-align:center\">没有真实照片时，不许伪造实物图</div></div>" +
                  "</div>" },
                { type: "note", text: "看图三问：模式图还是实物图？声明在哪？比例能当真吗？" }
              ],
              point: "模式图看结构关系；实物图看真实样子（须注明\"实物图\"）。"
            }
          ]
        },
        {
          id: "b12.1.5",
          title: "细胞的物质输入与输出",
          prereq: "细胞核",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：被动运输 + 主动运输 + 水通道口径 ============ */
            {
              id: "b12.1.5-p1",
              kind: "explain",
              title: "被动运输与主动运输",
              blocks: [
                { type: "lead", text: "物质进出细胞：有的\"顺流而下\"，有的要\"花钱买票\"。" },
                { type: "text", html: "先认词——被动运输：顺浓度梯度、不耗能；扩散：物质从高浓度到低浓度；协助扩散：需要转运蛋白帮助的扩散。水分子主要经水通道蛋白（先认词——水通道蛋白：只允许水分子通过的通道）以协助扩散方式进出——顺浓度、不耗能。" },
                { type: "text", html: "先认词——主动运输：逆浓度梯度，需要载体蛋白（先认词——载体蛋白：膜上协助运输的蛋白质）协助，并消耗能量。" },
                { type: "trap", text: "⚠️ \"水分子进出要载体所以是主动运输\"错——是协助扩散！顺浓度、不耗能。水总往溶质浓的一侧走（讲清流向）。" },
                { type: "note", text: "判据两问：顺浓度还是逆浓度？耗能吗？" }
              ],
              point: "被动（扩散/协助扩散，顺浓度不耗能；水经水通道蛋白）vs 主动（载体+能量，逆浓度）。"
            },
            /* ============ p2：渗透 + 质壁分离虚拟实验 + B3 ============ */
            {
              id: "b12.1.5-p2",
              kind: "explain",
              title: "渗透作用与质壁分离",
              blocks: [
                { type: "lead", text: "细胞泡进糖水——拖浓度滑块，看它\"缩水\"还是\"复原\"。" },
                { type: "text", html: "先认词——渗透作用：水经半透膜的扩散。渗透压一句话：浓度差产生渗透压——水总往渗透压高（溶质浓）的一侧走。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">质壁分离实验：拖动蔗糖浓度滑块</div>" +
                  "<div style=\"display:flex;gap:8px;align-items:center;margin:8px 0\">" +
                  "<span style=\"font-size:13px\">清水</span>" +
                  "<input id=\"bioB12Conc\" type=\"range\" min=\"0\" max=\"100\" value=\"0\" style=\"flex:1;min-height:44px\" oninput=\"BIO_B12.plasma(this.value)\" aria-label=\"蔗糖浓度\">" +
                  "<span style=\"font-size:13px\">浓蔗糖溶液</span></div>" +
                  "<div style=\"position:relative;height:130px;border:2px solid var(--bio-line);border-radius:8px;background:var(--bio-bg);margin:6px 0\">" +
                  "<div id=\"bioB12Proto\" style=\"position:absolute;left:12px;top:12px;bottom:12px;width:calc(100% - 24px);background:var(--bio-organelle);opacity:0.35;border-radius:6px;transition:width .3s\"></div>" +
                  "<div style=\"position:absolute;left:8px;top:2px;font-size:12px\">细胞壁</div>" +
                  "<div style=\"position:absolute;right:8px;bottom:2px;font-size:12px\">原生质层</div></div>" +
                  "<div><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B12.plasma(0)\">复原（换清水）</button></div>" +
                  "<div id=\"bioB12PlasMsg\" style=\"font-size:13px;margin-top:6px\">清水：细胞吸水饱满。</div>" +
                  "<div style=\"font-size:12px;color:var(--bio-ink-soft);margin-top:4px\">虚拟实验：现实中须用显微镜观察洋葱鳞片叶外表皮细胞，溶液不入口、不触眼。</div>" +
                  "<div style=\"font-size:12px;color:var(--bio-ink-soft)\">示意，非真实速度/比例。</div>" +
                  "</div>" },
                { type: "widget", widget: { type: "experiment-3q", params: {
                  purpose: "证明质壁分离与复原取决于外界溶液浓度",
                  controlOptions: ["自身前后对照（同一细胞加蔗糖溶液前/后比）", "两个不同细胞分别加清水和蔗糖溶液", "不设对照，直接观察"],
                  variableOptions: ["蔗糖溶液浓度", "观察时间长短", "细胞种类"],
                  repeatOptions: ["1 次", "3 次", "10 次"],
                  answer: { control: 0, variable: 0, repeat: 1 },
                  thoughtExp: "如果不设自身前后对照（只看加蔗糖溶液后的细胞），你怎么知道收缩是蔗糖造成的？可能是细胞本来就这样——没比较，就没结论。",
                  recordKey: "bio_3q_b12.1.5",
                  replayHref: "#b12.1.5/2",
                  replayText: "回看第 2 页：质壁分离虚拟实验"
                } } },
                { type: "text", html: "先认词——原生质层：细胞膜、液泡膜以及两层膜之间的细胞质。" },
                { type: "text", html: "先认词——质壁分离：高浓度溶液中，原生质层收缩、与细胞壁分离；换清水复原。" },
                { type: "note", text: "三原则：自身前后对照、单一变量（蔗糖浓度）、重复。" }
              ],
              point: "渗透：水往渗透压高处走；质壁分离=原生质层收缩、脱离细胞壁，可复原。"
            },
            /* ============ p3：三种方式总览 + 预告 b13.1.1 ============ */
            {
              id: "b12.1.5-p3",
              kind: "explain",
              title: "载体是蛋白质",
              blocks: [
                { type: "lead", text: "三种运输方式一张表收齐——再看\"载体\"的真身。" },
                { type: "text", html: "总览：扩散（顺浓度、不耗能、无需载体）/协助扩散（顺浓度、不耗能、需水通道蛋白等载体）/主动运输（逆浓度、耗能、需载体）。" },
                { type: "text", html: "载体是蛋白质——蛋白质家族里有一类叫酶，能降低化学反应的活化能。" },
                { type: "mathlink", text: "预告：b13.1.1——酶的作用与本质（载体是蛋白质，酶也是蛋白质——它如何降低活化能？b13.1.1 细讲）。" },
                { type: "note", text: "载体=蛋白质；酶是蛋白质中的\"催化剂\"。" }
              ],
              point: "载体是蛋白质；酶降低活化能→b13.1.1 细讲。"
            }
          ]
        },
        {
          id: "b12.1.6",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结（一）+ 3 choice ============ */
            {
              id: "b12.1.6-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b12.1.1：细胞学说（施莱登+施旺共同建立；三点；魏尔肖\"一切细胞来自细胞\"）。b12.1.2：细胞膜（流动镶嵌模型；\"三明治\"只讲排布、膜是流动的；蛋白质镶嵌/嵌入/贯穿；选择透过性）。b12.1.3：细胞器（线粒体嵴→有氧呼吸、叶绿体基粒→光合，形配其用，认旧友 b05.1.3；分泌蛋白旅程：核糖体→内质网→高尔基体→膜外；动植物细胞异同）。b12.1.4：细胞核（核膜/核仁/染色质=染色体同一物质两种形态；遗传信息库；生物膜系统）。b12.1.5：物质进出（被动/主动；水经水通道蛋白协助扩散；渗透；质壁分离）。" },
                { type: "choice", stem: "细胞学说的建立者是？",
                  options: ["施莱登一人", "施莱登+施旺共同建立", "魏尔肖一人", "虎克一人"], answer: 1,
                  tip: "细胞学说由施莱登（植物）与施旺（动物）共同建立，魏尔肖等后人修正补充（b12.1.1 第 1 页）。" },
                { type: "choice", stem: "叶绿体存在于？",
                  options: ["所有植物细胞", "只在植物绿色部分的细胞", "所有细胞", "只在根细胞"], answer: 1,
                  tip: "叶绿体只在绿色部分！根细胞无叶绿体；线粒体则普遍存在（b12.1.3 第 3 页）。" },
                { type: "choice", stem: "水分子进出细胞的方式是？",
                  options: ["主动运输", "协助扩散（经水通道蛋白）", "只能是扩散", "胞吞胞吐"], answer: 1,
                  tip: "水分子主要经水通道蛋白以协助扩散方式进出：顺浓度、不耗能（b12.1.5 第 1 页）。" }
              ],
              point: "小结（一）：学说、细胞膜、细胞器。"
            },
            /* ============ p2：小结（二）易错专治 + 3 choice ============ */
            {
              id: "b12.1.6-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "review", html: "易错专治小结——牢记\"结构与功能相适应\"；\"静态三明治\"→膜是流动的；\"叶绿体所有植物细胞都有\"→只在绿色部分；\"染色质染色体两种物质\"→同一物质两种形态；\"水要载体所以主动运输\"→协助扩散（经水通道蛋白）。" },
                { type: "choice", stem: "染色质与染色体的关系是？",
                  options: ["两种物质", "同一物质在细胞周期不同时期的两种形态", "染色体是染色质的复制品", "没有关系"], answer: 1,
                  tip: "染色质=染色体：同一物质，分裂间期细丝状、分裂期棒状（b12.1.4 第 1 页）。" },
                { type: "choice", stem: "质壁分离发生时，原生质层？",
                  options: ["膨胀", "收缩、与细胞壁分离", "不变", "消失"], answer: 1,
                  tip: "高浓度溶液中，原生质层失水收缩、与细胞壁分离；放回清水可复原（b12.1.5 第 2 页）。" },
                { type: "choice", stem: "线粒体内膜折叠成嵴、叶绿体类囊体堆叠成基粒，说明？",
                  options: ["结构越复杂越好", "形配其用：增大膜面积适合大量供能/光合", "只是为了好看", "与功能无关"], answer: 1,
                  tip: "形配其用——结构与功能相适应：增大膜面积，适合大量进行有氧呼吸与光合作用（b12.1.3 第 1 页）。" }
              ],
              point: "小结（二）：细胞核、物质进出、易错专治。"
            }
          ]
        }
      ]
    }
  ]
};
