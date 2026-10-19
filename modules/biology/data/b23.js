/* ============================================================
 * 学习工具箱 · 生物 · 第二十三章数据（生物 P16 生产队 2026-10-19）
 *
 * 课：b23.1.1 生长素的发现（3 页）/ b23.1.2 生长素的生理作用与
 *     其他植物激素（3 页：两重性曲线交互直观版一页＋预告代数 6.1）/
 *     b23.1.3 植物激素的应用与环境因素（3 页）/
 *     b23.1.4 本章小结与习题（2 页）。共 11 页。
 *     前置：b22 小结（课程表；b22 已上线）。
 * 交互：零新组件——
 *   B3 experiment-3q 复用 1 处（b23.1.1-p2 温特实验，
 *     recordKey=bio_3q_b23.1.1，三问顺序 对照→单一变量→重复冻结，
 *     answer 索引程序化校验；对照落点=A/B 琼脂块两组对照）；
 *   其余页内小交互（达尔文实验四步/温特实验四步回放/两重性曲线
 *     浓度滑块/激素名片点选/应用案例配对）为纯内联 HTML +
 *     window.BIO_B23 助手函数，不新增引擎组件；
 *   本批无 cell-builder 类交互需求（b23 无结构拼搭页）。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 模式图声明：「模式图：非等比、非实物」（BIO-R32）
 * - 虚拟实验声明：「虚拟实验：现实中须××」（BIO-R35，××逐页写实）
 * - 示意声明：「示意，非真实速度/比例。」（仅动画/虚拟实验页）
 * - 示意曲线声明：「示意曲线（非实测数据）」＋纵轴相对值（BIO-R70）
 * - 数据声明：「教学示意数据」（BIO-R69）
 * - 直引号；type:"text" 的块用 html 键（P4 教训）
 *
 * 红线落实：
 * - 「生长素由尖端产生所以只在尖端起作用」错→极性运输到作用部位，
 *   分布不均引起弯曲（b23.1.1-p3 trap 专治；课程图纸误区）
 * - 「生长素越多越好」错→两重性！除草剂=高浓度抑制原理
 *   （b23.1.2-p2 trap 专治；课程图纸误区）
 * - 「植物激素只管生长」错→调节生长发育全过程
 *   （b23.1.3-p2 trap 专治；课程图纸误区）
 * - 「尖端被光照到才弯曲」错→感光的是尖端、弯曲的是尖端下方
 *   （b23.1.1-p1 trap 专治）
 * - 「适应=生物主动改造自己去适应」与本章无关（b00.1.3 专治）
 * - 结构口径：全批「结构决定…」零出现
 *
 * 门禁⑧：新术语首现即定义——胚芽鞘（b23.1.1-p1）/生长素
 * （b23.1.1-p2）/极性运输（b23.1.1-p3）/两重性（b23.1.2-p1）/
 * 顶端优势（b23.1.2-p2）/植物激素/协同/拮抗（b23.1.2-p3）/
 * 赤霉素/细胞分裂素/脱落酸/乙烯（b23.1.2-p3）/
 * 生长素类似物/矮壮素（b23.1.3-p1）/春化作用（b23.1.3-p3）。
 * 门禁⑨：本批深链 1 处（b23.1.2-p1 mathlink→代数 6.1，引擎 XLINK_MATH
 * 自动转深链；课号为已上线数学课）；生物内部深链 0 处；
 * 未生产课号（b00/b01/b02/b24/b25）正文零引用。
 * 门禁⑩：本批新登记预告 1 条 drafted（b23.1.2-a1→代数 6.1，
 * 两重性曲线函数图像回填；预告措辞，非兑现）。
 * 门禁⑪：b23.1.4（2 页）为任务书课页分工的设计意图（小结与习题），
 * 台账留痕，非缺页；quiz 页题目数>0（b23.1.4 两页：review+3 choice /
 * review+3 choice，含生活题 1 道＋实验设计题 1 道）。
 * 门禁⑫：数学课号一律「代数 6.1」式（章.节），不用 ch06 式。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
/* ---------- b23 页内小交互助手（纯内联，不新增引擎组件） ---------- */
window.BIO_B23 = {
  /* 通用步骤器：bioB23Steps-<id>-<i>，dots: bioB23Dot-<id>-<i>，msg: bioB23Msg-<id> */
  go: function (id, idx) {
    var i = 0, s;
    while ((s = document.getElementById("bioB23Steps-" + id + "-" + i))) {
      s.style.display = i === idx ? "" : "none";
      var d = document.getElementById("bioB23Dot-" + id + "-" + i);
      if (d) d.style.background = i === idx ? "var(--bio-organelle)" : "var(--bio-line)";
      i++;
    }
    var msg = document.getElementById("bioB23Msg-" + id);
    if (msg) msg.textContent = "第 " + (idx + 1) + " 步 / 共 " + i + " 步";
    return idx;
  },
  /* ---- b23.1.2-p1 两重性曲线：浓度滑块→游标＋促进/抑制徽章 ---- */
  auxin: function (v) {
    v = Math.max(0, Math.min(100, Number(v) || 0));
    var t;
    if (v <= 60) t = "低浓度：促进生长——浓度升高，促进增强。";
    else if (v <= 78) t = "接近最适浓度：促进作用最强。";
    else t = "高浓度：抑制生长——超过最适，浓度越高抑制越强。";
    var path = document.getElementById("bioB23Path"), dot = document.getElementById("bioB23Dot");
    if (path && dot && path.getTotalLength) {
      try {
        var p = path.getPointAtLength(path.getTotalLength() * v / 100);
        dot.setAttribute("cx", p.x.toFixed(1)); dot.setAttribute("cy", p.y.toFixed(1));
      } catch (e) {}
    }
    var msg = document.getElementById("bioB23AuxMsg");
    if (msg) msg.textContent = t;
    var slider = document.getElementById("bioB23Conc");
    if (slider && String(slider.value) !== String(v)) slider.value = v;
    return t;
  },
  /* ---- b23.1.2-p3 激素名片点选 ---- */
  _hormones: {
    ga: "赤霉素：主要由未成熟的种子、幼根、幼芽合成；促进细胞伸长，促进种子萌发和果实发育。",
    ctk: "细胞分裂素：主要由根尖合成；促进细胞分裂；延缓叶片衰老。",
    aba: "脱落酸：主要由根冠、萎蔫的叶片合成；抑制细胞分裂，促进叶和果实的衰老、脱落。",
    eth: "乙烯：植物体各个部位都能合成；促进果实成熟。"
  },
  hormoneTap: function (id) {
    var t = this._hormones[id] || "";
    var info = document.getElementById("bioB23HormInfo");
    if (info) info.textContent = t;
    var btns = document.querySelectorAll(".bioB23HormBtn"), i;
    for (i = 0; i < btns.length; i++)
      btns[i].style.outline = btns[i].dataset.hid === id ? "2px solid var(--bio-organelle)" : "";
    return t;
  },
  /* ---- 通用配对：左点应用/特征，右点机制/环境 ----
   * 实例 app（b23.1.3-p1 应用案例配对）/ adapt（b00 不用；本文件仅 app）。
   * 配对表 _pairDefs[inst] = [[左id, 右id]...]；wrongHint[inst] 为配错提示。 */
  _pairDefs: {
    app: [["prune", "auxin"], ["ripe", "eth"], ["dwarf", "gai"], ["germ", "ga"]]
  },
  _pairWrong: {
    app: "再想想：这个应用利用了激素的哪种\"脾气\"？"
  },
  _pairs: {},
  _pairState: function (inst) {
    var P = this._pairs[inst];
    if (!P) P = this._pairs[inst] = { sel: null, done: 0 };
    return P;
  },
  _pairHint: function (inst, t) {
    var h = document.getElementById("bioB23PHint-" + inst);
    if (h) h.textContent = t;
  },
  pairPick: function (inst, side, id) {
    var self = this, P = this._pairState(inst);
    var el = document.getElementById("bioB23P-" + inst + "-" + side + "-" + id);
    if (!el || el.dataset.locked) return P.done;
    if (side === "L") {
      P.sel = id;
      var cards = document.querySelectorAll("#bioB23PBox-" + inst + " [data-side=\"L\"]"), i;
      for (i = 0; i < cards.length; i++)
        cards[i].style.outline = cards[i].dataset.pid === id ? "2px solid var(--bio-organelle)" : "";
      self._pairHint(inst, "已选——再点右边的卡。");
      return P.done;
    }
    if (!P.sel) { self._pairHint(inst, "先点左边的卡。"); return P.done; }
    var ok = false, defs = this._pairDefs[inst] || [], i;
    for (i = 0; i < defs.length; i++) if (defs[i][0] === P.sel && defs[i][1] === id) ok = true;
    var left = document.getElementById("bioB23P-" + inst + "-L-" + P.sel);
    if (ok) {
      [left, el].forEach(function (c) {
        if (!c) return;
        c.dataset.locked = "1"; c.style.opacity = "0.55"; c.style.outline = "";
        if (c.textContent.indexOf("✓") < 0) c.textContent = c.textContent + " ✓";
      });
      P.done++; P.sel = null;
      self._pairHint(inst, "");
      var badge = document.getElementById("bioB23PBadge-" + inst);
      if (badge && P.done === defs.length) badge.style.display = "";
    } else {
      self._pairHint(inst, this._pairWrong[inst] || "再想想。");
      P.sel = null;
      var cards2 = document.querySelectorAll("#bioB23PBox-" + inst + " [data-side=\"L\"]"), j;
      for (j = 0; j < cards2.length; j++) cards2[j].style.outline = "";
    }
    return P.done;
  }
};

/* ==================== 第二十三章数据 ==================== */
window.BIO_CH["b23"] = {
  id: "b23",
  units: [
    {
      id: "b23.1",
      title: "植物激素调节",
      lessons: [
        {
          id: "b23.1.1",
          title: "生长素的发现",
          prereq: "b22 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：达尔文向光性实验四步 ============ */
            {
              id: "b23.1.1-p1",
              kind: "explain",
              title: "向光弯曲的秘密",
              exploreTip: "点①②③④，看四种处理的胚芽鞘有什么不同。",
              blocks: [
                { type: "lead", text: "胚芽鞘为什么朝光弯？达尔文父子盯上了这个小动作。" },
                { type: "text", html: "先认词——胚芽鞘：禾本科幼苗顶端的锥形保护套。单侧光下，它向光弯曲——感光的是哪，弯曲的是哪？" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">达尔文实验四步（模式图：非等比、非实物）：</div>" +
                  "<div style=\"display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B23.go('dar',0)\">①</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B23.go('dar',1)\">②</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B23.go('dar',2)\">③</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B23.go('dar',3)\">④</button>" +
                  "</div>" +
                  "<div id=\"bioB23Steps-dar-0\">① 完整尖端：向光弯曲。</div>" +
                  "<div id=\"bioB23Steps-dar-1\" style=\"display:none\">② 切除尖端：不弯曲。</div>" +
                  "<div id=\"bioB23Steps-dar-2\" style=\"display:none\">③ 罩住尖端：不弯曲。</div>" +
                  "<div id=\"bioB23Steps-dar-3\" style=\"display:none\">④ 罩住尖端下方：仍弯曲。</div>" +
                  "<div id=\"bioB23Msg-dar\" style=\"font-size:12px;color:var(--bio-ink-soft);margin-top:6px\">第 1 步 / 共 4 步</div>" +
                  "<div style=\"font-size:12px;color:var(--bio-ink-soft);margin-top:4px\">示意，非真实速度/比例。</div>" +
                  "</div>" },
                { type: "text", html: "结论：尖端感受单侧光，产生某种\"影响\"传到下方，引起弯曲。" },
                { type: "trap", text: "⚠️ \"尖端被光照到才弯曲\"错——感光的是尖端，弯曲的是尖端下方（伸长区）。" },
                { type: "note", text: "三原则：切除/罩尖端=对照；单变量（尖端完整否）；多株重复。" }
              ],
              point: "向光性：尖端感光、下方弯曲；切除/罩尖端是对照。"
            },
            /* ============ p2：温特实验虚拟重演 + B3 ============ */
            {
              id: "b23.1.1-p2",
              kind: "explain",
              title: "温特的琼脂块实验",
              exploreTip: "点①②③④走完温特实验，再做三问自测。",
              blocks: [
                { type: "lead", text: "尖端产生的\"影响\"是什么？温特用两块琼脂块做了回答。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">温特实验四步（模式图：非等比、非实物）：</div>" +
                  "<div style=\"display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B23.go('went',0)\">①</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B23.go('went',1)\">②</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B23.go('went',2)\">③</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B23.go('went',3)\">④</button>" +
                  "</div>" +
                  "<div id=\"bioB23Steps-went-0\">① 切下尖端放琼脂块上，接触几小时。</div>" +
                  "<div id=\"bioB23Steps-went-1\" style=\"display:none\">② 琼脂块（A）放在去尖端胚芽鞘切面一侧。</div>" +
                  "<div id=\"bioB23Steps-went-2\" style=\"display:none\">③ A组：胚芽鞘向对侧弯曲。</div>" +
                  "<div id=\"bioB23Steps-went-3\" style=\"display:none\">④ 空白琼脂块（B）同样放：不弯曲。</div>" +
                  "<div id=\"bioB23Msg-went\" style=\"font-size:12px;color:var(--bio-ink-soft);margin-top:6px\">第 1 步 / 共 4 步</div>" +
                  "<div style=\"font-size:12px;color:var(--bio-ink-soft);margin-top:4px\">示意，非真实速度/比例。</div>" +
                  "</div>" },
                { type: "text", html: "结论：尖端产生了某种化学物质，进入琼脂块、向下运输促生长。" },
                { type: "text", html: "虚拟实验：现实中须用真实胚芽鞘与琼脂块操作，刀片锋利、注意安全。" },
                { type: "widget", widget: { type: "experiment-3q", params: {
                  purpose: "证明胚芽鞘尖端产生了某种促进生长的化学物质",
                  controlOptions: ["A/B两组对照：接触过尖端的琼脂块vs空白琼脂块", "只用接触过尖端的琼脂块，不设对照", "只用空白琼脂块，不设对照"],
                  variableOptions: ["琼脂块是否接触过尖端", "琼脂块的大小", "放置时间的长短"],
                  repeatOptions: ["1 次", "3 次", "10 次"],
                  answer: { control: 0, variable: 0, repeat: 1 },
                  thoughtExp: "如果只放接触过尖端的琼脂块（不设空白对照），弯曲了能说明是尖端物质的作用吗？也许是琼脂块本身压的——没有比较，就没有结论。",
                  recordKey: "bio_3q_b23.1.1",
                  replayHref: "#b23.1.1/2",
                  replayText: "回看第 2 页：温特实验虚拟重演"
                } } },
                { type: "text", html: "先认词——生长素：植物体内产生的、能促进生长的化学物质（1934年郭葛等从植物中分离出，化学本质是吲哚乙酸）。" },
                { type: "note", text: "三原则：A/B琼脂块对照；单变量=接触尖端否；重复。" }
              ],
              point: "温特实验：A/B琼脂块对照→尖端产生生长素。"
            },
            /* ============ p3：产生/运输/分布 ============ */
            {
              id: "b23.1.1-p3",
              kind: "explain",
              title: "生长素去哪了",
              blocks: [
                { type: "lead", text: "生长素在尖端产生，却让尖端下面弯曲——它会\"走路\"。" },
                { type: "text", html: "先认词——极性运输：生长素从形态学上端向形态学下端的定向运输（只从上往下，不倒流）。" },
                { type: "text", html: "单侧光→尖端发生横向运输→背光侧生长素多→背光侧长得快→向光弯曲。分布不均，弯曲才出现。" },
                { type: "trap", text: "⚠️ \"生长素由尖端产生，所以只在尖端起作用\"错——极性运输把它送到作用部位（伸长区），分布不均引起弯曲。" },
                { type: "note", text: "记两句：产生在尖端，干活在下方；横向不均，就弯曲。" }
              ],
              point: "极性运输（上→下）＋横向不均=向光弯曲。"
            }
          ]
        },
        {
          id: "b23.1.2",
          title: "生长素的生理作用与其他植物激素",
          prereq: "生长素发现",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：两重性曲线交互（直观版）＋预告代数 6.1 ============ */
            {
              id: "b23.1.2-p1",
              kind: "explain",
              title: "低促高抑：两重性",
              exploreTip: "拖滑块：看游标沿曲线走，读促进/抑制徽章。",
              blocks: [
                { type: "lead", text: "生长素是\"越多越好\"吗？拖浓度滑块，看曲线先升后降——这就是两重性。" },
                { type: "text", html: "先认词——两重性：低浓度促进生长、高浓度抑制生长；最适浓度时促进作用最强。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">生长素浓度效应曲线（示意曲线，非实测数据；纵轴为相对值）——拖滑块：</div>" +
                  "<svg id=\"bioB23Curve\" viewBox=\"0 0 300 170\" style=\"width:100%;height:auto;background:var(--bio-bg);border-radius:8px\" role=\"img\" aria-label=\"生长素两重性示意曲线\">" +
                  "<line x1=\"30\" y1=\"140\" x2=\"290\" y2=\"140\" stroke=\"var(--bio-ink-soft)\" stroke-width=\"1\"/>" +
                  "<line x1=\"30\" y1=\"140\" x2=\"30\" y2=\"10\" stroke=\"var(--bio-ink-soft)\" stroke-width=\"1\"/>" +
                  "<line x1=\"30\" y1=\"90\" x2=\"290\" y2=\"90\" stroke=\"var(--bio-ink-soft)\" stroke-width=\"1\" stroke-dasharray=\"4 3\"/>" +
                  "<text x=\"282\" y=\"155\" font-size=\"10.8\" style=\"fill:var(--bio-ink-soft)\">浓度</text>" +
                  "<text x=\"8\" y=\"94\" font-size=\"10.8\" style=\"fill:var(--bio-ink-soft)\">0</text>" +
                  "<text x=\"2\" y=\"30\" font-size=\"10.8\" style=\"fill:var(--bio-ink-soft)\">促进</text>" +
                  "<text x=\"2\" y=\"132\" font-size=\"10.8\" style=\"fill:var(--bio-ink-soft)\">抑制</text>" +
                  "<path id=\"bioB23Path\" d=\"M30,72 C70,70 90,45 130,38 C170,32 185,55 215,90 C235,112 260,122 290,126\" fill=\"none\" stroke=\"var(--bio-organelle)\" stroke-width=\"2.5\"/>" +
                  "<circle id=\"bioB23Dot\" cx=\"82\" cy=\"62\" r=\"6\" style=\"fill:var(--bio-organelle);stroke:#fff;stroke-width:2\"/>" +
                  "</svg>" +
                  "<div style=\"display:flex;gap:8px;align-items:center;margin:8px 0\">" +
                  "<span style=\"font-size:13px\">低</span>" +
                  "<input id=\"bioB23Conc\" type=\"range\" min=\"0\" max=\"100\" value=\"20\" style=\"flex:1;min-height:44px\" oninput=\"BIO_B23.auxin(this.value)\" aria-label=\"生长素浓度\">" +
                  "<span style=\"font-size:13px\">高</span></div>" +
                  "<div id=\"bioB23AuxMsg\" style=\"font-size:13px;margin-top:6px\">低浓度：促进生长——浓度升高，促进增强。</div>" +
                  "<div style=\"font-size:12px;color:var(--bio-ink-soft);margin-top:4px\">教学示意数据：曲线为趋势示意，非实测浓度值。</div>" +
                  "</div>" },
                { type: "text", html: "读图三问：①最高点在哪（最适浓度）？②左边上升说明什么（促进增强）？③右边掉到零线以下说明什么（高浓度抑制）？" },
                { type: "mathlink", text: "数学呼应：代数 6.1 细讲函数图像——这条先升后降的曲线就是一张函数图像（直观版：只读图，不讲定义）。" },
                { type: "text", html: "预告：学完代数 6.1 后回填认旧友——到时候回来，用函数语言重新说这条\"小山包\"曲线。" },
                { type: "note", text: "读图只记三句：低促、高抑、最适最强。" }
              ],
              point: "两重性=低促高抑；曲线先升后降；预告代数 6.1。"
            },
            /* ============ p2：顶端优势 ============ */
            {
              id: "b23.1.2-p2",
              kind: "explain",
              title: "顶端优势",
              blocks: [
                { type: "lead", text: "树为什么总是一根主干往上蹿？摘掉顶芽，侧枝会发生什么？" },
                { type: "text", html: "先认词——顶端优势：顶芽优先生长、侧芽生长受抑制的现象。原因：顶芽产生的生长素向下运输，侧芽处浓度过高→抑制。" },
                { type: "text", html: "生活证据：果树\"摘心\"——去掉顶芽，侧芽处生长素少了，抑制解除，侧枝长出，树冠开张多结果。" },
                { type: "trap", text: "⚠️ \"生长素越多越好\"错——两重性！除草剂（如2,4-D）就是高浓度抑制的原理：双子叶杂草被\"抑死\"，单子叶作物无恙。" },
                { type: "note", text: "除草剂=两重性的生活版：高浓度抑制。" }
              ],
              point: "顶端优势：顶芽生长素多→侧芽被抑制；摘心解除。"
            },
            /* ============ p3：其他植物激素＋协同/拮抗 ============ */
            {
              id: "b23.1.2-p3",
              kind: "explain",
              title: "激素大家庭",
              exploreTip: "点四张激素卡：看每种激素的合成部位和作用。",
              blocks: [
                { type: "lead", text: "植物体内不止生长素一种\"信使\"——点一点，看四种激素的\"名片\"。" },
                { type: "text", html: "先认词——植物激素：植物体内产生的、微量但显著调节生长发育的有机物。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">点激素卡看名片：</div>" +
                  "<div style=\"display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary bioB23HormBtn\" data-hid=\"ga\" style=\"min-height:44px\" onclick=\"BIO_B23.hormoneTap('ga')\">赤霉素</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary bioB23HormBtn\" data-hid=\"ctk\" style=\"min-height:44px\" onclick=\"BIO_B23.hormoneTap('ctk')\">细胞分裂素</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary bioB23HormBtn\" data-hid=\"aba\" style=\"min-height:44px\" onclick=\"BIO_B23.hormoneTap('aba')\">脱落酸</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary bioB23HormBtn\" data-hid=\"eth\" style=\"min-height:44px\" onclick=\"BIO_B23.hormoneTap('eth')\">乙烯</button>" +
                  "</div>" +
                  "<div id=\"bioB23HormInfo\" style=\"font-size:13px\">点一张激素卡，看它的\"名片\"（合成部位＋主要作用）。</div>" +
                  "</div>" },
                { type: "text", html: "先认词——协同：两种激素共同起促进作用；拮抗：两种激素作用相反。例子：生长素＋细胞分裂素协同促进细胞分裂；赤霉素（促萌发）与脱落酸（促休眠）拮抗。" },
                { type: "note", text: "一句话：激素调节生长发育全过程，不止\"长个\"。" }
              ],
              point: "四种激素各有名片；协同=一起干，拮抗=反着干。"
            }
          ]
        }
        ,
        {
          id: "b23.1.3",
          title: "植物激素的应用与环境因素",
          prereq: "生长素作用",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：应用案例配对 ============ */
            {
              id: "b23.1.3-p1",
              kind: "explain",
              title: "应用案例配对",
              exploreTip: "左边点应用，右边点激素机制，配成四对。",
              blocks: [
                { type: "lead", text: "四种生产应用，背后各是哪种激素机制在\"干活\"？配一配。" },
                { type: "text", html: "先认词——生长素类似物：人工合成的、与生长素作用相似的物质；矮壮素：抑制赤霉素合成的植物生长调节剂。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">左边点应用，右边点机制：</div>" +
                  "<div id=\"bioB23PBox-app\" style=\"display:flex;gap:8px\">" +
                  "<div style=\"flex:1;display:flex;flex-direction:column;gap:6px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB23P-app-L-prune\" data-side=\"L\" data-pid=\"prune\" style=\"min-height:44px\" onclick=\"BIO_B23.pairPick('app','L','prune')\">扦插枝条生根</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB23P-app-L-ripe\" data-side=\"L\" data-pid=\"ripe\" style=\"min-height:44px\" onclick=\"BIO_B23.pairPick('app','L','ripe')\">香蕉催熟</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB23P-app-L-dwarf\" data-side=\"L\" data-pid=\"dwarf\" style=\"min-height:44px\" onclick=\"BIO_B23.pairPick('app','L','dwarf')\">小麦矮壮抗倒伏</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB23P-app-L-germ\" data-side=\"L\" data-pid=\"germ\" style=\"min-height:44px\" onclick=\"BIO_B23.pairPick('app','L','germ')\">大麦种子发芽</button>" +
                  "</div>" +
                  "<div style=\"flex:1;display:flex;flex-direction:column;gap:6px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB23P-app-R-eth\" data-side=\"R\" data-pid=\"eth\" style=\"min-height:44px\" onclick=\"BIO_B23.pairPick('app','R','eth')\">乙烯</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB23P-app-R-auxin\" data-side=\"R\" data-pid=\"auxin\" style=\"min-height:44px\" onclick=\"BIO_B23.pairPick('app','R','auxin')\">生长素类似物</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB23P-app-R-ga\" data-side=\"R\" data-pid=\"ga\" style=\"min-height:44px\" onclick=\"BIO_B23.pairPick('app','R','ga')\">赤霉素</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB23P-app-R-gai\" data-side=\"R\" data-pid=\"gai\" style=\"min-height:44px\" onclick=\"BIO_B23.pairPick('app','R','gai')\">抑制赤霉素合成</button>" +
                  "</div>" +
                  "</div>" +
                  "<div id=\"bioB23PHint-app\" style=\"font-size:13px;margin-top:6px\">先点左边的应用卡。</div>" +
                  "<div id=\"bioB23PBadge-app\" style=\"display:none;font-size:13px;margin-top:6px\">配对完成：四种应用都找到了背后的激素机制！</div>" +
                  "</div>" },
                { type: "note", text: "应用=把激素的\"脾气\"用在生产上。" }
              ],
              point: "扦插—生长素；催熟—乙烯；矮壮—抑赤霉素；发芽—赤霉素。"
            },
            /* ============ p2：激素调节全过程 ============ */
            {
              id: "b23.1.3-p2",
              kind: "explain",
              title: "管的不只是长个",
              blocks: [
                { type: "lead", text: "植物激素\"只管生长\"吗？从发芽到衰老脱落，它全程在场。" },
                { type: "text", html: "生长发育全过程激素表：发芽——赤霉素打破休眠；生长——生长素/赤霉素促伸长，细胞分裂素促分裂；开花结果——乙烯催熟；衰老脱落——脱落酸/乙烯促进。" },
                { type: "trap", text: "⚠️ \"植物激素只管生长\"错——调节生长发育全过程：发芽、开花、衰老脱落都有它。" },
                { type: "note", text: "记链条：发芽→生长→开花→衰老，激素全程在线。" }
              ],
              point: "激素调节生长发育全过程，不止生长。"
            },
            /* ============ p3：环境因素参与调节 ============ */
            {
              id: "b23.1.3-p3",
              kind: "explain",
              title: "环境也来指挥",
              blocks: [
                { type: "lead", text: "光和温度也会\"发号施令\"——植物把环境信号和激素配合起来用。" },
                { type: "text", html: "光：光敏色素感受光信号→影响基因表达→调控生长发育（如莴苣种子萌发需要光）。" },
                { type: "text", html: "温度：春化作用——先认词：某些植物开花需经历一段低温（如冬小麦）。点到为止：只记\"低温促进开花\"这个现象，机理以后再说。" },
                { type: "text", html: "小结：植物的生长发育，是基因、激素、环境共同调节的结果。" },
                { type: "note", text: "春化只记现象（低温促开花），机理点到为止。" }
              ],
              point: "光/温度参与调节；生长发育=基因+激素+环境共调。"
            }
          ]
        },
        {
          id: "b23.1.4",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结（一）+ 3 choice ============ */
            {
              id: "b23.1.4-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b23.1.1：达尔文向光性（尖端感光、下方弯曲；切除/罩尖端=对照）；温特实验（A/B琼脂块对照→尖端产生了生长素）；极性运输（上→下）＋横向不均=弯曲。b23.1.2：两重性（低促高抑；曲线读图直观版；预告代数 6.1）；顶端优势（摘心解除）；四种激素名片；协同/拮抗。b23.1.3：应用配对（扦插/催熟/矮壮/发芽）；激素管全过程；光/温度参与（春化点到为止）。" },
                { type: "choice", stem: "温特实验中，起对照作用的是？",
                  options: ["接触过尖端的琼脂块（A）", "空白琼脂块（B）", "不去尖端的胚芽鞘", "不设对照"], answer: 1,
                  tip: "B是空白对照：只变\"是否接触过尖端\"一个量（b23.1.1第2页）。" },
                { type: "choice", stem: "关于生长素两重性，正确的是？",
                  options: ["浓度越高越促进", "低浓度促进、高浓度抑制", "只促进不抑制", "只抑制不促进"], answer: 1,
                  tip: "两重性=低促高抑；最适浓度促进最强（b23.1.2第1页）。" },
                { type: "choice", stem: "果农给棉花\"打顶\"（摘除顶芽）的主要目的是？",
                  options: ["让植株长得更高", "解除顶端优势，促进侧枝开花结果", "防止病虫害", "让叶片更大"], answer: 1,
                  tip: "摘心→侧芽处生长素减少→抑制解除→侧枝生长（b23.1.2第2页）。生活题。" }
              ],
              point: "小结（一）：发现、两重性、顶端优势。"
            },
            /* ============ p2：小结（二）易错专治 + 3 choice ============ */
            {
              id: "b23.1.4-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "review", html: "易错专治——\"尖端产生所以只在尖端起作用\"→极性运输送到下方；\"生长素越多越好\"→两重性（除草剂=高浓度抑制）；\"激素只管生长\"→管全过程；\"春化机理\"→本课只记现象，点到为止。" },
                { type: "choice", stem: "验证\"生长素只能从形态学上端运往下端\"，对照组应如何设置？",
                  options: ["含生长素的琼脂块放上端vs放下端，比较", "只放上端，不设对照", "两端都不放", "放上端但不观察"], answer: 0,
                  tip: "对照=放上端vs放下端，只变\"放置位置\"一个量（实验设计题；三原则）。" },
                { type: "choice", stem: "大麦种子用赤霉素处理后发芽率提高，说明赤霉素？",
                  options: ["抑制种子萌发", "促进种子萌发、打破休眠", "促进果实成熟", "没有作用"], answer: 1,
                  tip: "赤霉素促萌发；与脱落酸（促休眠）拮抗（b23.1.2第3页）。" },
                { type: "choice", stem: "解除顶端优势后，侧芽生长加快的直接原因是？",
                  options: ["侧芽处生长素浓度降低，抑制解除", "侧芽长出了新顶芽", "光照突然变强", "水分突然变多"], answer: 0,
                  tip: "顶芽是生长素来源；摘心后侧芽处浓度降→抑制解除（b23.1.2第2页）。" }
              ],
              point: "小结（二）：易错专治＋实验设计。"
            }
          ]
        }
      ]
    }
  ]
};
