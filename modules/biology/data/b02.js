/* ============================================================
 * 学习工具箱 · 生物 · 第二章数据（生物 P18 生产队 2026-10-19）
 *
 * 课：b02.1.1 细胞的分裂与分化（3 页，含指数直观版并入页，
 *     预告 drafted b02.1.1-a1）/ b02.1.2 组织（2 页）/
 *     b02.1.3 植物体与人体的结构层次（3 页）/
 *     b02.1.4 本章小结与习题（2 页）。共 10 页。
 *     前置：b01 小结（本批 b01.1.4，纯文本前链）。
 * 交互：零新组件——页内小交互（步骤器）为纯内联 HTML +
 * window.BIO_B02 助手函数，不新增引擎组件。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 模式图声明：「模式图：非等比、非实物」（BIO-R32）
 * - 示意曲线声明：「示意曲线（非实测数据）」（BIO-R70）
 * - 分裂口径：「先复制后均分，子细胞染色体数目不变」
 * - 血液口径：「结缔组织」（流动的组织）
 * - 植物层次：「植物无系统，器官直接构成植物体」（BIO-R47）
 *
 * 红线落实：
 * - 「分裂后染色体减半」错→先复制后均分，子细胞染色体数目不变
 *   （b02.1.1-p1 trap 专治）
 * - 「分化=细胞变大」错→分化是形态功能专门化（b02.1.1-p3 trap）
 * - 「血液是细胞不是组织」错→血液是结缔组织，流动的组织
 *   （b02.1.2-p2 闯关专治）
 * - 「植物也有系统」错→植物无系统，器官直接构成植物体
 *   （b02.1.3-p1 trap 专治；BIO-R47）
 * - 结构口径：全批「结构决定…」零出现
 *
 * 门禁⑧：新术语首现即定义——细胞分裂（b02.1.1-p1）/
 * 细胞生长/细胞分化（b02.1.1-p3）/组织（b02.1.2-p1）/
 * 器官（b02.1.3-p1）/系统（b02.1.3-p2）。
 * 门禁⑨：数学深链只挂已上线——代数 8.1/8.2.1（b02.1.1-p2
 * 预告深链，XLINK_COMBO 组合 token，href 逐字）；生物内部
 * 互链用 #课号/页码手写锚点或纯文本。
 * 门禁⑩：本批新登记预告 1 条 drafted——b02.1.1-a1（指数读图回填：
 * 学完代数 8.1/8.2.1 后回填翻倍曲线读图；echo_target=代数 8.1/8.2.1）。
 * 门禁⑪：b02.1.4（2 页）为任务书课页分工的设计意图（小结与习题），
 * 台账留痕，非缺页；quiz 页题目数>0（b02.1.2-p2 3 choice 闯关；
 * b02.1.3-p3 review+3 choice；b02.1.4-p1 review+3 choice，
 * p2 4 choice，含生活题 1 道＋探究题 1 道）。
 * 门禁⑫：数学课号统一「代数 8.1/8.2.1」式（本批无「ch08」式旧写法）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
/* ---------- b02 页内小交互助手（纯内联，不新增引擎组件） ---------- */
window.BIO_B02 = {
  /* 步骤器：id 前缀，idx 从 0 起；steps: "bioB02Steps-<id>-<i>" */
  go: function (id, idx) {
    var i = 0, s;
    while ((s = document.getElementById("bioB02Steps-" + id + "-" + i))) {
      s.style.display = i === idx ? "" : "none";
      i++;
    }
    var msg = document.getElementById("bioB02Msg-" + id);
    if (msg) msg.textContent = "第 " + (idx + 1) + " 步 / 共 " + i + " 步";
    return idx;
  }
};
window.BIO_CH["b02"] = {
  id: "b02",
  units: [
    {
      id: "b02.1",
      title: "从细胞到个体",
      lessons: [
        {
          id: "b02.1.1",
          title: "细胞的分裂与分化",
          prereq: "b01 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：细胞分裂（讲解页） ============ */
            {
              id: "b02.1.1-p1",
              kind: "explain",
              title: "细胞分裂：先复制，后均分",
              blocks: [
                { type: "lead", text: "一个细胞变两个：分裂让细胞数目增多。" },
                { type: "text", html: "先认词——细胞分裂：一个细胞分成两个细胞的过程。过程：染色体先复制（数目翻倍）→平均分配到两个子细胞→一个变两个，子细胞染色体数目不变。" },
                { type: "text", html: "<div style='border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel);text-align:center'>" +
                  "<div style='display:flex;justify-content:center;gap:18px;align-items:center;flex-wrap:wrap'>" +
                  "<div><div style='width:64px;height:64px;border:2px solid var(--bio-membrane);border-radius:50%;margin:0 auto;position:relative'>" +
                  "<span style='position:absolute;left:12px;top:24px;color:var(--bio-gene);font-size:16px'>●●</span>" +
                  "<span style='position:absolute;left:34px;top:24px;color:var(--bio-gene);font-size:16px'>●●</span></div>" +
                  "<div style='font-size:12px;margin-top:4px'>1 个细胞（4 条染色体）</div></div>" +
                  "<div style='font-size:22px'>→</div>" +
                  "<div style='display:flex;gap:8px'>" +
                  "<div><div style='width:52px;height:52px;border:2px solid var(--bio-membrane);border-radius:50%;margin:0 auto;position:relative'>" +
                  "<span style='position:absolute;left:8px;top:16px;color:var(--bio-gene);font-size:14px'>●●</span>" +
                  "<span style='position:absolute;left:26px;top:16px;color:var(--bio-gene);font-size:14px'>●●</span></div>" +
                  "<div style='font-size:12px;margin-top:4px'>子细胞（4 条）</div></div>" +
                  "<div><div style='width:52px;height:52px;border:2px solid var(--bio-membrane);border-radius:50%;margin:0 auto;position:relative'>" +
                  "<span style='position:absolute;left:8px;top:16px;color:var(--bio-gene);font-size:14px'>●●</span>" +
                  "<span style='position:absolute;left:26px;top:16px;color:var(--bio-gene);font-size:14px'>●●</span></div>" +
                  "<div style='font-size:12px;margin-top:4px'>子细胞（4 条）</div></div>" +
                  "</div></div>" +
                  "<div style='font-size:13px;margin-top:6px'>先复制（4→8），再均分（8→4+4）：子细胞染色体数目不变。</div>" +
                  "<div style='font-size:12px;color:var(--bio-ink-soft);margin-top:4px'>模式图：非等比、非实物</div></div>" },
                { type: "trap", text: "⚠️ “分裂后染色体减半”错——先复制后均分，子细胞染色体数目不变！" },
                { type: "note", text: "生物体长大：一靠分裂（数目多），二靠生长（体积大）。" }
              ],
              point: "先复制、后均分：数目不变，细胞变多。"
            },
            /* ============ p2：翻倍直觉（讲解页，指数直观版并入） ============ */
            {
              id: "b02.1.1-p2",
              kind: "explain",
              title: "翻倍直觉：1→2→4→8",
              blocks: [
                { type: "lead", text: "一次分裂变 2 个，再分裂变 4 个——这个“翻倍”越往后越快。" },
                { type: "text", html: "<div style='border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel);text-align:center'>" +
                  "<svg viewBox='0 0 264 130' style='max-width:280px;width:100%;height:auto' role='img' aria-label='细胞分裂翻倍示意曲线'>" +
                  "<g stroke='var(--bio-line)' stroke-width='1'><line x1='30' y1='10' x2='30' y2='110'/><line x1='30' y1='110' x2='230' y2='110'/></g>" +
                  "<g fill='var(--bio-organelle)' opacity='0.8'>" +
                  "<rect x='45' y='100' width='22' height='10'/><rect x='85' y='90' width='22' height='20'/>" +
                  "<rect x='125' y='70' width='22' height='40'/><rect x='165' y='30' width='22' height='80'/>" +
                  "</g>" +
                  "<g font-size='12' fill='var(--bio-text)' text-anchor='middle'>" +
                  "<text x='56' y='124'>0次</text><text x='96' y='124'>1次</text><text x='136' y='124'>2次</text><text x='176' y='124'>3次</text>" +
                  "</g>" +
                  "<text x='228' y='124' font-size='12' fill='var(--bio-ink-soft)' text-anchor='middle'>分裂次数→</text>" +
                  "</svg>" +
                  "<div style='font-size:12px;color:var(--bio-ink-soft);margin-top:4px'>示意曲线（非实测数据）</div></div>" },
                { type: "text", html: "数一数：第 1 次分裂后 2 个，第 2 次 4 个，第 3 次 8 个……每一次都是“×2”，个数是 2 的连乘。" },
                { type: "mathlink", text: "预告：学完代数 8.1/8.2.1（指数与对数），这条翻倍曲线就是指数函数的样子——那时我们回来读图（深链）。" },
                { type: "note", text: "直观版到此为止：不讲指数定义，只留“翻倍越来越快”的直觉。" }
              ],
              point: "翻倍直觉：1→2→4→8，越往后越快；指数读图等代数 8.1/8.2.1。"
            },
            /* ============ p3：生长与分化（讲解页） ============ */
            {
              id: "b02.1.1-p3",
              kind: "explain",
              title: "生长与分化",
              blocks: [
                { type: "lead", text: "数目多了还不够：细胞还要长大，还要“改行”。" },
                { type: "text", html: "先认词——细胞生长：细胞体积增大的过程（新分裂的细胞小，吸收营养长大）；细胞分化：细胞在形态、结构、功能上向专门化方向变化的过程。" },
                { type: "text", html: "分化举例：有的变成叶肉细胞（制造营养），有的变成导管细胞（运输水分）——样子不同，分工不同。" },
                { type: "trap", text: "⚠️ “分化=细胞变大”错——分化是形态功能专门化，不是单纯长大。" }
              ],
              point: "分裂管数目，生长管体积，分化管“改行”搞专门化。"
            }
          ]
        },
        {
          id: "b02.1.2",
          title: "组织",
          prereq: "细胞的分裂与分化",
          time: "40 分钟",
          pages: [
            /* ============ p1：组织（讲解页） ============ */
            {
              id: "b02.1.2-p1",
              kind: "explain",
              title: "组织：细胞的“班集体”",
              blocks: [
                { type: "lead", text: "分化相同的细胞抱团，就成了组织。" },
                { type: "text", html: "先认词——组织：形态相似、结构和功能相同的细胞群。" },
                { type: "text", html: "植物四大组织：分生组织（能分裂，根尖/茎尖）→保护组织（表皮，保护）→营养组织（叶肉，制造储存营养）→输导组织（导管/筛管，运输水分养分）。" },
                { type: "text", html: "动物四大组织：上皮组织（体表，保护分泌）→结缔组织（血液/骨，连接支持）→肌肉组织（收缩，运动）→神经组织（神经元，传导兴奋）。" },
                { type: "note", text: "记忆钩：植物“分保营输”，动物“上结肌神”。" }
              ],
              point: "组织=同类细胞抱团；植物四、动物四，各有分工。"
            },
            /* ============ p2：组织—功能配对闯关（练习页） ============ */
            {
              id: "b02.1.2-p2",
              kind: "quiz",
              title: "组织—功能配对闯关",
              questions: [
                { type: "choice", stem: "导管属于哪种组织？它的功能是？",
                  options: ["输导组织——运输水分和无机盐", "营养组织——制造营养", "保护组织——保护", "分生组织——分裂产生新细胞"], answer: 0,
                  tip: "导管=运输管道→输导组织（b02.1.2 第 1 页）。" },
                { type: "choice", stem: "血液属于？",
                  options: ["一种细胞", "结缔组织", "上皮组织", "肌肉组织"], answer: 1,
                  tip: "血液是“流动的组织”——结缔组织！“血液是细胞不是组织”错（b02.1.2 第 1 页）。" },
                { type: "choice", stem: "叶肉属于哪种组织？",
                  options: ["营养组织", "保护组织", "分生组织", "输导组织"], answer: 0,
                  tip: "叶肉制造储存营养→营养组织（b02.1.2 第 1 页）。" }
              ],
              point: "配对过：导管输导、叶肉营养、血液结缔。"
            }
          ]
        },
        {
          id: "b02.1.3",
          title: "植物体与人体的结构层次",
          prereq: "组织",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：植物体（讲解页） ============ */
            {
              id: "b02.1.3-p1",
              kind: "explain",
              title: "植物体：器官直接构成",
              blocks: [
                { type: "lead", text: "细胞→组织→器官→植物体：植物这条线，到器官就“到顶”了。" },
                { type: "text", html: "先认词——器官：由不同组织构成、能完成一定功能的结构。植物六大器官：根/茎/叶（营养器官）/花/果实/种子（生殖器官）。" },
                { type: "text", html: "植物的结构层次：细胞→组织→器官→植物体——植物没有系统，器官直接构成植物体。" },
                { type: "trap", text: "⚠️ “植物也有系统”错——植物无系统！器官直接构成植物体。" }
              ],
              point: "植物线：细胞→组织→器官→植物体（无系统）。"
            },
            /* ============ p2：人体（讲解页） ============ */
            {
              id: "b02.1.3-p2",
              kind: "explain",
              title: "人体：多了“系统”一级",
              blocks: [
                { type: "lead", text: "人体这条线比植物多一级：系统。" },
                { type: "text", html: "先认词——系统：能够共同完成一种或几种生理功能的多个器官构成的体系。人体八大系统：运动/消化/呼吸/循环/泌尿/神经/内分泌/生殖。" },
                { type: "text", html: "人体的结构层次：细胞→组织→器官→系统→个体。" },
                { type: "note", text: "概念边界：系统=多个器官为同一功能协作；植物没有这一级。" }
              ],
              point: "人体线：细胞→组织→器官→系统→个体。"
            },
            /* ============ p3：两条线拼搭闯关（练习页） ============ */
            {
              id: "b02.1.3-p3",
              kind: "quiz",
              title: "两条线拼搭闯关",
              questions: [
                { type: "review", html: "两条线——植物：细胞→组织→器官→植物体（无系统）；人体：细胞→组织→器官→系统→个体。" },
                { type: "choice", stem: "下列属于植物营养器官的是？",
                  options: ["根", "花", "果实", "种子"], answer: 0,
                  tip: "营养器官：根/茎/叶；生殖器官：花/果实/种子（b02.1.3 第 1 页）。" },
                { type: "choice", stem: "胃→消化系统→人体，其中的“消化系统”对应哪一级？",
                  options: ["组织", "器官", "系统", "个体"], answer: 2,
                  tip: "多个器官为消化功能协作→系统（b02.1.3 第 2 页）。" },
                { type: "choice", stem: "植物体与人体结构层次最大的区别是？",
                  options: ["植物无系统", "植物无器官", "人体无组织", "人体无细胞"], answer: 0,
                  tip: "植物：器官直接构成植物体，无系统；人体多了一级系统（b02.1.3 第 1 页）。" }
              ],
              point: "闯关过：植物无系统，人体有系统。"
            }
          ]
        },
        {
          id: "b02.1.4",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40 分钟",
          pages: [
            /* ============ p1：小结 + 习题（练习页） ============ */
            {
              id: "b02.1.4-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——分裂：先复制后均分，数目不变（b02.1.1）；生长长体积、分化搞专门化（b02.1.1）；组织：同类细胞抱团，植物四、动物四（b02.1.2）；层次：植物无系统，人体有系统（b02.1.3）。" },
                { type: "choice", stem: "细胞分裂后，子细胞的染色体数目？",
                  options: ["减半", "不变", "加倍", "不确定"], answer: 1,
                  tip: "先复制后均分：子细胞染色体数目不变（b02.1.1 第 1 页）。" },
                { type: "choice", stem: "下列属于细胞分化的是？",
                  options: ["细胞体积增大", "细胞数目增多", "受精卵发育成各种组织细胞", "细胞吸水涨破"], answer: 2,
                  tip: "分化=形态功能专门化：受精卵→各种组织细胞（b02.1.1 第 3 页）。" },
                { type: "choice", stem: "下列关于组织的说法正确的是？",
                  options: ["组织由形态功能相同的细胞构成", "血液不是组织", "植物没有组织", "组织可以直接构成个体"], answer: 0,
                  tip: "组织=形态相似、功能相同的细胞群；血液是结缔组织（b02.1.2 第 1 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（练习页） ============ */
            {
              id: "b02.1.4-p2",
              kind: "quiz",
              title: "习题（二）",
              questions: [
                { type: "choice", stem: "皮肤擦伤后伤口愈合，主要靠的是？",
                  options: ["细胞分裂", "细胞分化", "细胞生长", "细胞凋亡"], answer: 0,
                  tip: "长出新细胞补上去——细胞分裂（b02.1.1 第 1 页）。" },
                { type: "choice", stem: "人体结构层次的正确顺序是？",
                  options: ["细胞→组织→器官→个体", "细胞→组织→器官→系统→个体", "细胞→器官→组织→系统→个体", "组织→细胞→器官→系统→个体"], answer: 1,
                  tip: "人体：细胞→组织→器官→系统→个体（b02.1.3 第 2 页）。" },
                { type: "choice", stem: "某同学想论证“植物没有系统”，最站得住的依据是？",
                  options: ["解剖一朵花找系统", "结构层次定义：植物器官直接构成植物体，无系统一级", "把根切开看有没有系统", "问老师要答案"], answer: 1,
                  tip: "概念题用定义回答：植物的结构层次到器官就到顶，无系统（b02.1.3 第 1 页）。" },
                { type: "choice", stem: "番茄的果实属于？",
                  options: ["营养器官", "生殖器官", "营养组织", "生殖系统"], answer: 1,
                  tip: "果实/花/种子=生殖器官；植物无系统（b02.1.3 第 1 页）。" }
              ],
              point: "全章完。下章 b03 绿色植物的光合与呼吸（纯文本预告）。"
            }
          ]
        }
      ]
    }
  ]
};
