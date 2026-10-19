/* ============================================================
 * 学习工具箱 · 生物 · 第零章数据（生物 P16 生产队 2026-10-19）
 *
 * 课：b00.1.1 生物是什么（2 页）/ b00.1.2 生物圈（3 页）/
 *     b00.1.3 生物与环境（2 页，辨析④预告 drafted）/
 *     b00.1.4 本章小结与习题（2 页）。共 9 页。
 *     前置：无（导论链起点；b00.1.1 前置小学科学）。
 * 交互：零新组件——页内小交互（现象拼图归类/生物圈分层点选/
 *     适应案例配对）为纯内联 HTML + window.BIO_B00 助手函数，
 *     不新增引擎组件；本批无 cell-builder 类交互需求。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 模式图声明：「模式图：非等比、非实物」（BIO-R32）
 * - 示意声明：「示意，非真实速度/比例。」（仅示意页）
 * - 直引号；type:"text" 的块用 html 键（P4 教训）
 *
 * 红线落实：
 * - 「机器人/钟乳石是生物」错→逐项对照六特征，一条不满足即非生物
 *   （b00.1.1-p1 归类交互＋p2 trap 专治；课程图纸误区）
 * - 病毒「非细胞生物」边界案例：无细胞结构但可复制繁殖——
 *   专治「非黑即白」（b00.1.1-p1/p2；课程图纸误区）
 * - 「生物圈=地球表面全部」错→有明确的厚度范围（约20千米厚），
 *   不是整个地球（b00.1.2-p1 trap 专治；课程图纸误区）
 * - 「适应=生物主动改造自己去适应」错→适应是长期自然选择的结果，
 *   不是「想变就变」（b00.1.3-p1 trap 专治＋辨析④预告 drafted；
 *   BIO-R19 WARN 口径：预告页已配该句）
 * - 结构口径：全批「结构决定…」零出现
 *
 * 门禁⑧：新术语首现即定义——生物（b00.1.1-p1）/新陈代谢
 * （b00.1.1-p2）/生物圈（b00.1.2-p1）/生态系统（b00.1.2-p3）。
 * 门禁⑨：本批深链 0 处（无数学呼应；生物内部深链 0 处）；
 * b00.1.3-p1 纯文本提及 b21.1.2（辨析④立靶，已上线），非深链，
 * 不写认旧友措辞（落点章待定，预告 drafted）。
 * 门禁⑩：本批新登记预告 1 条 drafted（b00.1.3-a1：辨析④预告，
 * 适应=长期自然选择的结果；落点章待辨析④体系后续批次确定）。
 * 门禁⑪：b00.1.1（2 页）/b00.1.4（2 页）为任务书课页分工的设计意图
 * （现象拼图＋特征 / 小结与习题），台账留痕，非缺页；
 * quiz 页题目数>0（b00.1.4 两页：review+3 choice / review+3 choice，
 * 含生活题 1 道＋实验设计题 1 道）。
 * 门禁⑫：本批无数学呼应（图纸确认），学生文本零数学课号引用。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
/* ---------- b00 页内小交互助手（纯内联，不新增引擎组件） ---------- */
window.BIO_B00 = {
  /* 通用步骤器（本批未用，预留与 BIO_B23 同口径） */
  go: function (id, idx) {
    var i = 0, s;
    while ((s = document.getElementById("bioB00Steps-" + id + "-" + i))) {
      s.style.display = i === idx ? "" : "none";
      i++;
    }
    var msg = document.getElementById("bioB00Msg-" + id);
    if (msg) msg.textContent = "第 " + (idx + 1) + " 步 / 共 " + i + " 步";
    return idx;
  },
  /* ---- b00.1.1-p1 现象拼图归类 ---- */
  _sortAns: { m1: "bio", m2: "non", m3: "non", m4: "edge" },
  _sortHints: {
    m1: "被碰合拢叶子——它能长大、繁殖后代吗？",
    m2: "会\"长大\"——它吃东西吗？能繁殖吗？",
    m3: "会动会说话——它吃东西长大、生宝宝吗？",
    m4: "无细胞结构，但能复制出更多自己——特殊情况。"
  },
  _sortNames: { m1: "含羞草", m2: "钟乳石", m3: "机器人", m4: "病毒" },
  _sortSel: null,
  _sortDone: 0,
  _sortHint: function (t) {
    var h = document.getElementById("bioB00SHint");
    if (h) h.textContent = t;
  },
  sortSel: function (id) {
    if (this._sortAns[id] === undefined) return this._sortDone;
    var el = document.getElementById("bioB00S-" + id);
    if (!el || el.dataset.locked) return this._sortDone;
    this._sortSel = id;
    var cards = document.querySelectorAll(".bioB00SCard"), i;
    for (i = 0; i < cards.length; i++)
      cards[i].style.outline = cards[i].dataset.mid === id ? "2px solid var(--bio-organelle)" : "";
    this._sortHint(this._sortNames[id] + "：" + this._sortHints[id] + "再点下面的归类。");
    return this._sortDone;
  },
  sortJudge: function (cat) {
    if (!this._sortSel) { this._sortHint("先点一张物品卡。"); return this._sortDone; }
    var id = this._sortSel, el = document.getElementById("bioB00S-" + id);
    if (!el || el.dataset.locked) return this._sortDone;
    if (this._sortAns[id] === cat) {
      el.dataset.locked = "1"; el.style.opacity = "0.55"; el.style.outline = "";
      if (el.textContent.indexOf("✓") < 0) el.textContent = el.textContent + " ✓";
      this._sortDone++; this._sortSel = null;
      this._sortHint("");
      var badge = document.getElementById("bioB00SBadge");
      if (badge && this._sortDone === 4) badge.style.display = "";
    } else {
      this._sortHint("对照六特征再想想：" + this._sortNames[id] + this._sortHints[id]);
    }
    return this._sortDone;
  },
  /* ---- b00.1.2-p1 生物圈分层点选 ---- */
  _zones: {
    air: "大气圈下部：飞鸟、昆虫，以及随风飘散的微生物孢子——10千米高空仍能采到微生物。",
    water: "水圈全部：从表层到深海——11千米的马里亚纳海沟底部，仍有生物活动。",
    rock: "岩石圈上部：土壤里、地表之下数千米的岩层中，都有微生物。"
  },
  zoneTap: function (id) {
    var t = this._zones[id] || "";
    var info = document.getElementById("bioB00ZoneInfo");
    if (info) info.textContent = t;
    var btns = document.querySelectorAll(".bioB00ZoneBtn"), i;
    for (i = 0; i < btns.length; i++)
      btns[i].style.outline = btns[i].dataset.zid === id ? "2px solid var(--bio-organelle)" : "";
    return t;
  },
  /* ---- b00.1.3-p1 适应案例配对（与 BIO_B23.pairPick 同口径，独立实现） ---- */
  _pairDefs: {
    adapt: [["camel", "desert"], ["penguin", "antarctic"], ["stick", "hide"]]
  },
  _pairs: {},
  _pairState: function (inst) {
    var P = this._pairs[inst];
    if (!P) P = this._pairs[inst] = { sel: null, done: 0 };
    return P;
  },
  _pairHint: function (inst, t) {
    var h = document.getElementById("bioB00PHint-" + inst);
    if (h) h.textContent = t;
  },
  pairPick: function (inst, side, id) {
    var self = this, P = this._pairState(inst);
    var el = document.getElementById("bioB00P-" + inst + "-" + side + "-" + id);
    if (!el || el.dataset.locked) return P.done;
    if (side === "L") {
      P.sel = id;
      var cards = document.querySelectorAll("#bioB00PBox-" + inst + " [data-side=\"L\"]"), i;
      for (i = 0; i < cards.length; i++)
        cards[i].style.outline = cards[i].dataset.pid === id ? "2px solid var(--bio-organelle)" : "";
      self._pairHint(inst, "已选——再点右边的卡。");
      return P.done;
    }
    if (!P.sel) { self._pairHint(inst, "先点左边的卡。"); return P.done; }
    var ok = false, defs = this._pairDefs[inst] || [], i;
    for (i = 0; i < defs.length; i++) if (defs[i][0] === P.sel && defs[i][1] === id) ok = true;
    var left = document.getElementById("bioB00P-" + inst + "-L-" + P.sel);
    if (ok) {
      [left, el].forEach(function (c) {
        if (!c) return;
        c.dataset.locked = "1"; c.style.opacity = "0.55"; c.style.outline = "";
        if (c.textContent.indexOf("✓") < 0) c.textContent = c.textContent + " ✓";
      });
      P.done++; P.sel = null;
      self._pairHint(inst, "");
      var badge = document.getElementById("bioB00PBadge-" + inst);
      if (badge && P.done === defs.length) badge.style.display = "";
    } else {
      self._pairHint(inst, "再想想：这个特征帮它应对什么环境？");
      P.sel = null;
      var cards2 = document.querySelectorAll("#bioB00PBox-" + inst + " [data-side=\"L\"]"), j;
      for (j = 0; j < cards2.length; j++) cards2[j].style.outline = "";
    }
    return P.done;
  }
};

/* ==================== 第零章数据 ==================== */
window.BIO_CH["b00"] = {
  id: "b00",
  units: [
    {
      id: "b00.1",
      title: "生物初见",
      lessons: [
        {
          id: "b00.1.1",
          title: "生物是什么",
          prereq: "小学科学",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：生活现象拼图归类 ============ */
            {
              id: "b00.1.1-p1",
              kind: "explain",
              title: "谁是生物？",
              exploreTip: "点一张卡，再点它是生物、非生物还是边界案例。",
              blocks: [
                { type: "lead", text: "含羞草、钟乳石、机器人、病毒——谁是生物？先猜，再逐项对照。" },
                { type: "text", html: "先认词——生物：具有生命特征的物体；具体哪六条，下一页逐条认。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">点物品卡，再点归类：</div>" +
                  "<div style=\"display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary bioB00SCard\" id=\"bioB00S-m1\" data-mid=\"m1\" style=\"min-height:44px\" onclick=\"BIO_B00.sortSel('m1')\">含羞草</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary bioB00SCard\" id=\"bioB00S-m2\" data-mid=\"m2\" style=\"min-height:44px\" onclick=\"BIO_B00.sortSel('m2')\">钟乳石</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary bioB00SCard\" id=\"bioB00S-m3\" data-mid=\"m3\" style=\"min-height:44px\" onclick=\"BIO_B00.sortSel('m3')\">机器人</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary bioB00SCard\" id=\"bioB00S-m4\" data-mid=\"m4\" style=\"min-height:44px\" onclick=\"BIO_B00.sortSel('m4')\">病毒</button>" +
                  "</div>" +
                  "<div id=\"bioB00SHint\" style=\"font-size:13px\">先点一张物品卡。</div>" +
                  "<div style=\"display:flex;gap:6px;margin:8px 0;flex-wrap:wrap\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B00.sortJudge('bio')\">生物</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B00.sortJudge('non')\">非生物</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B00.sortJudge('edge')\">边界案例</button>" +
                  "</div>" +
                  "<div id=\"bioB00SBadge\" style=\"display:none;font-size:13px;margin-top:6px\">归类完成：判据=六特征逐项对照，一条不满足即非生物！</div>" +
                  "</div>" },
                { type: "note", text: "归类判据：六特征逐项对照，一条不满足即非生物。" }
              ],
              point: "含羞草是生物；钟乳石/机器人不是；病毒是边界。"
            },
            /* ============ p2：生物的六个特征＋病毒边界 ============ */
            {
              id: "b00.1.1-p2",
              kind: "explain",
              title: "生物的六个特征",
              blocks: [
                { type: "lead", text: "生物和非生物的分界线，就是这六个特征——一条一条认。" },
                { type: "text", html: "先认词——六特征：①生活需要营养；②能进行呼吸；③能排出体内废物；④能对外界刺激作出反应；⑤能生长和繁殖；⑥有遗传和变异的特性。先认词——新陈代谢：生物体内的物质和能量变化（营养/呼吸/排废都属于它）。" },
                { type: "text", html: "边界案例：病毒——无细胞结构，但能利用宿主细胞复制繁殖；除病毒外，生物都由细胞构成。" },
                { type: "trap", text: "⚠️ \"机器人是生物\"错——逐项对照六特征：机器人无新陈代谢、不能繁殖，一条不满足即非生物。" },
                { type: "note", text: "六特征＋边界句：除病毒外，生物都由细胞构成。" }
              ],
              point: "六特征：营养/呼吸/排废/应激/生长繁殖/遗传变异。"
            }
          ]
        },
        {
          id: "b00.1.2",
          title: "生物圈",
          prereq: "生物是什么",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：生物圈分层示意交互 ============ */
            {
              id: "b00.1.2-p1",
              kind: "explain",
              title: "生物圈分哪几层",
              exploreTip: "点三层卡片：看每层的范围和住着谁。",
              blocks: [
                { type: "lead", text: "生物圈不是\"地球表面全部\"——点三层，看每层住着谁、到哪为止。" },
                { type: "text", html: "先认词——生物圈：地球上所有生物与其环境的总和。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">生物圈分层示意（模式图：非等比、非实物）——点卡片：</div>" +
                  "<div style=\"display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary bioB00ZoneBtn\" data-zid=\"air\" style=\"min-height:44px\" onclick=\"BIO_B00.zoneTap('air')\">大气圈下部</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary bioB00ZoneBtn\" data-zid=\"water\" style=\"min-height:44px\" onclick=\"BIO_B00.zoneTap('water')\">水圈全部</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary bioB00ZoneBtn\" data-zid=\"rock\" style=\"min-height:44px\" onclick=\"BIO_B00.zoneTap('rock')\">岩石圈上部</button>" +
                  "</div>" +
                  "<div id=\"bioB00ZoneInfo\" style=\"font-size:13px\">点一张圈层卡，看它的范围和住着谁。</div>" +
                  "<div style=\"font-size:12px;color:var(--bio-ink-soft);margin-top:4px\">示意，非真实速度/比例。</div>" +
                  "</div>" },
                { type: "trap", text: "⚠️ \"生物圈=地球表面全部\"错——有明确的厚度范围（约20千米厚），不是整个地球。" },
                { type: "note", text: "三层＋范围：大气圈下部/水圈全部/岩石圈上部。" }
              ],
              point: "生物圈=三层叠加，有厚度范围，不是整个地球。"
            },
            /* ============ p2：生物圈的厚度 ============ */
            {
              id: "b00.1.2-p2",
              kind: "explain",
              title: "生物圈有多厚",
              blocks: [
                { type: "lead", text: "从10千米高空到11千米深海——生物圈是个约20千米厚的\"生命薄层\"。" },
                { type: "text", html: "数据（约数）：高空约10千米（微生物孢子）→深海约11千米（马里亚纳海沟仍有生物）→地下数千米（岩石圈上部有微生物）；总厚度约20千米。" },
                { type: "text", html: "对比：地球半径约6400千米，生物圈只占薄薄一层——生命集中在这一层。" },
                { type: "note", text: "记数字：约20千米厚；三层范围各记一句。" }
              ],
              point: "生物圈约20千米厚：高空10千米→深海11千米。"
            },
            /* ============ p3：最大的生态系统 ============ */
            {
              id: "b00.1.2-p3",
              kind: "explain",
              title: "最大的生态系统",
              blocks: [
                { type: "lead", text: "森林、草原、海洋、农田……它们都是生态系统，而生物圈是最大的那个。" },
                { type: "text", html: "先认词——生态系统：一定区域内，生物与环境形成的统一整体。先认词——生物圈：地球上最大的生态系统。" },
                { type: "text", html: "生态系统多样性：森林、草原、海洋、湿地、农田、城市——类型多样，但都由生物＋环境组成。" },
                { type: "note", text: "生态系统=生物＋环境；生物圈=最大的生态系统。" }
              ],
              point: "生态系统是生物＋环境的统一整体；生物圈最大。"
            }
          ]
        },
        {
          id: "b00.1.3",
          title: "生物与环境",
          prereq: "生物圈",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：环境影响生物＋适应配对＋辨析④预告 ============ */
            {
              id: "b00.1.3-p1",
              kind: "explain",
              title: "环境塑造生物",
              exploreTip: "左边点特征，右边点环境，配成三对。",
              blocks: [
                { type: "lead", text: "光照、温度、水分——环境\"出题\"，生物\"适应\"作答。配一配。" },
                { type: "text", html: "环境影响生物：光照（向日葵向光）、温度（极地耐寒）、水分（沙漠耐旱）——这些叫非生物因素。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-size:13px;margin-bottom:6px\">左点形态特征，右点环境：</div>" +
                  "<div id=\"bioB00PBox-adapt\" style=\"display:flex;gap:8px\">" +
                  "<div style=\"flex:1;display:flex;flex-direction:column;gap:6px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB00P-adapt-L-camel\" data-side=\"L\" data-pid=\"camel\" style=\"min-height:44px\" onclick=\"BIO_B00.pairPick('adapt','L','camel')\">骆驼刺：根系发达</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB00P-adapt-L-penguin\" data-side=\"L\" data-pid=\"penguin\" style=\"min-height:44px\" onclick=\"BIO_B00.pairPick('adapt','L','penguin')\">企鹅：皮下厚脂肪</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB00P-adapt-L-stick\" data-side=\"L\" data-pid=\"stick\" style=\"min-height:44px\" onclick=\"BIO_B00.pairPick('adapt','L','stick')\">竹节虫：体色似竹枝</button>" +
                  "</div>" +
                  "<div style=\"flex:1;display:flex;flex-direction:column;gap:6px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB00P-adapt-R-antarctic\" data-side=\"R\" data-pid=\"antarctic\" style=\"min-height:44px\" onclick=\"BIO_B00.pairPick('adapt','R','antarctic')\">南极严寒</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB00P-adapt-R-hide\" data-side=\"R\" data-pid=\"hide\" style=\"min-height:44px\" onclick=\"BIO_B00.pairPick('adapt','R','hide')\">栖息地隐蔽、躲避天敌</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" id=\"bioB00P-adapt-R-desert\" data-side=\"R\" data-pid=\"desert\" style=\"min-height:44px\" onclick=\"BIO_B00.pairPick('adapt','R','desert')\">荒漠缺水</button>" +
                  "</div>" +
                  "</div>" +
                  "<div id=\"bioB00PHint-adapt\" style=\"font-size:13px;margin-top:6px\">先点左边特征卡。</div>" +
                  "<div id=\"bioB00PBadge-adapt\" style=\"display:none;font-size:13px;margin-top:6px\">配对完成！</div>" +
                  "</div>" },
                { type: "text", html: "预告（辨析④）：适应是长期自然选择的结果，不是\"想变就变\"——严格表述见立靶（b21.1.2），到时回填。" },
                { type: "trap", text: "⚠️ \"适应=生物主动改造自己\"错——是长期自然选择的结果，\"想变就变\"是拉马克式错误。" },
                { type: "note", text: "适应记一句：长期自然选择的结果，不是想变就变。" }
              ],
              point: "环境影响生物；适应=长期自然选择（辨析④预告）。"
            },
            /* ============ p2：生物影响环境 ============ */
            {
              id: "b00.1.3-p2",
              kind: "explain",
              title: "生物改变环境",
              blocks: [
                { type: "lead", text: "生物不只是\"被环境塑造\"——蚯蚓松土、植物防风，生物也在改写环境。" },
                { type: "text", html: "例子：蚯蚓松土（改善土壤通气透水）；植被防风固沙（保持水土）；\"千里之堤，溃于蚁穴\"（蚂蚁也能影响大堤）。" },
                { type: "text", html: "小结：生物与环境相互依存、相互影响——环境影响生物，生物适应环境，也影响环境。" },
                { type: "note", text: "双向记：环境→生物（影响）；生物→环境（改变）。" }
              ],
              point: "生物影响环境：蚯蚓松土、植被固沙；双向关系。"
            }
          ]
        },
        {
          id: "b00.1.4",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结（一）+ 3 choice ============ */
            {
              id: "b00.1.4-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b00.1.1：六特征（营养/呼吸/排废/应激/生长繁殖/遗传变异）；归类判据（一条不满足即非生物）；病毒边界（无细胞结构但可复制繁殖）。b00.1.2：三层（大气圈下部/水圈全部/岩石圈上部）；约20千米厚；生物圈是最大的生态系统。b00.1.3：环境影响生物（光/温度/水）；适应=长期自然选择（辨析④预告）；生物影响环境（蚯蚓/植被）。" },
                { type: "choice", stem: "下列属于生物的是？",
                  options: ["钟乳石", "机器人", "含羞草", "电脑病毒"], answer: 2,
                  tip: "逐项对照六特征：含羞草能生长繁殖；电脑病毒只是程序，不是生物（b00.1.1第1–2页）。" },
                { type: "choice", stem: "生物圈的范围不包括？",
                  options: ["大气圈下部", "水圈全部", "岩石圈上部", "地核"], answer: 3,
                  tip: "生物圈=大气圈下部＋水圈全部＋岩石圈上部，约20千米厚（b00.1.2第1–2页）。" },
                { type: "choice", stem: "骆驼刺根系发达，是对什么环境的适应？",
                  options: ["南极严寒", "荒漠缺水", "深海高压", "高山缺氧"], answer: 1,
                  tip: "根系发达→吸收更多水→适应荒漠缺水（b00.1.3第1页）。" }
              ],
              point: "小结（一）：特征、生物圈、环境。"
            },
            /* ============ p2：小结（二）易错专治 + 3 choice ============ */
            {
              id: "b00.1.4-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "review", html: "易错专治——\"机器人是生物\"→六特征逐项对照；\"生物圈=地球表面全部\"→有厚度范围（约20千米）；\"适应=想变就变\"→长期自然选择的结果；\"病毒是细胞\"→无细胞结构。" },
                { type: "choice", stem: "证明\"光照影响植物生长\"，对照组应如何设置？",
                  options: ["向光组vs背光组，只变光照一个条件", "只放向光处，不设对照", "向光组多浇水、背光组少浇水", "不设对照直接观察"], answer: 0,
                  tip: "三原则：对照（向光/背光）、单一变量（光照）、重复（实验设计题）。" },
                { type: "choice", stem: "\"千里之堤，溃于蚁穴\"说明？",
                  options: ["环境影响生物", "生物影响环境", "生物适应环境", "与生物无关"], answer: 1,
                  tip: "蚂蚁（生物）影响大堤（环境）——生物影响环境（b00.1.3第2页）。生活题。" },
                { type: "choice", stem: "关于病毒，正确的是？",
                  options: ["病毒是最小的细胞", "病毒无细胞结构，但能复制繁殖", "病毒没有遗传物质", "病毒与生物无关"], answer: 1,
                  tip: "病毒无细胞结构、能复制繁殖——边界案例（b00.1.1第2页）。" }
              ],
              point: "小结（二）：易错专治＋实验设计。"
            }
          ]
        }
      ]
    }
  ]
};
