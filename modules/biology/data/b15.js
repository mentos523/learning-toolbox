/* ============================================================
 * 学习工具箱 · 生物 · 第十五章数据（生物 P10 生产队 2026-10-19）
 *
 * 课：b15.1.1 有氧呼吸（3 页）/ b15.1.2 无氧呼吸（3 页）/
 *     b15.1.3 呼吸速率的影响因素与应用（3 页）/
 *     b15.1.4 本章小结与习题（2 页）。共 11 页。
 * 交互：三阶段接力动画 / 两种发酵产物对比 / 储存条件调控
 * 沙盘，均为纯 HTML 内联 handler（window.BIO_B15，b06 的
 * window.BIO_B06 先例），不新增引擎组件。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 有氧呼吸第一阶段在细胞质基质（b15.1.1-p3 专治；
 *   「只在线粒体」= FAIL）
 * - 无氧呼吸产生少量能量（b15.1.2-p3 专治；
 *   「不产生能量」= FAIL）
 * - 粮食储存低氧非无氧（b15.1.3-p3 专治；
 *   「完全隔绝氧气最好」= FAIL）
 * - 酸奶=乳酸发酵，不是酒精发酵（b15.1.2-p2 辨析）
 * - BIO-R01：本章「呼吸作用」=细胞内氧化分解；
 *   「呼吸」只用于肺通气语境（认旧友 b03.1.3）
 * - 直引号；type:"text" 的块用 html 键（P4 教训）
 *
 * 门禁⑧：新术语首现即定义——有氧呼吸（b15.1.1-p1）/
 * 无氧呼吸/发酵（b15.1.2-p1）。
 * 门禁⑨：深链只用已生产课号（b03/b05/b06/b13/b14、b16–b21）；
 * b08/b12/b10 未生产只纯文本；b07↔b15 不硬链。
 * 门禁⑩：本批无新登记预告。
 * 门禁⑪：quiz 页题目数 > 0（b15.1.4 两页：3 + 4）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b15"] = {
  id: "b15",
  units: [
    {
      id: "b15.1",
      title: "呼吸作用的机理",
      lessons: [
        {
          id: "b15.1.1",
          title: "有氧呼吸",
          prereq: "b14 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：三阶段 + 首现定义 ============ */
            {
              id: "b15.1.1-p1",
              kind: "explain",
              title: "有氧呼吸：三阶段接力",
              blocks: [
                { type: "lead", text: "葡萄糖里的能量，怎么变成身体能用的能量？分三棒接力。" },
                { type: "text", html: "先认词——有氧呼吸：细胞在氧的参与下，把葡萄糖等有机物彻底氧化分解，释放大量能量的过程。" },
                { type: "text", html: "先认词——细胞质基质：细胞质中除细胞器外的胶状液体部分，第一阶段在此进行。" },
                { type: "text", html: "先认词——丙酮酸：葡萄糖分解的中间产物——第一阶段把葡萄糖拆成的就是它。" },
                { type: "text", html: "第一阶段（细胞质基质）：葡萄糖 → 丙酮酸，释放少量能量。第二阶段（线粒体基质）：丙酮酸 → 二氧化碳，释放少量能量。第三阶段（线粒体内膜）：[H] + 氧 → 水，释放大量能量。" },
                { type: "mathlink", text: "认旧友：b03.1.3——\"呼吸\"（肺通气）与\"呼吸作用\"（细胞内氧化分解）初中版已分清；本课细讲呼吸作用的机理。" },
                { type: "mathlink", text: "兑现：b12.1.3-a1 问过——\"线粒体→b15.1.1 有氧呼吸\"——答案：线粒体正是有氧呼吸的主要场所——第二、三阶段在线粒体里接力，第三阶段释放大量能量。" },
                { type: "note", text: "三问自查——三阶段的场所各是哪？产物各是什么？哪阶段能量最多？（答案在本页）" }
              ],
              point: "有氧呼吸三阶段：细胞质基质→线粒体基质→线粒体内膜；第三阶段能量最多。"
            },
            /* ============ p2：三阶段接力动画 ============ */
            {
              id: "b15.1.1-p2",
              kind: "explain",
              title: "接力动画：场所/产物/能量",
              blocks: [
                { type: "lead", text: "点三棒，看每一棒在哪跑、交出什么、赚多少能量。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B15.relay(1,this)\">第一棒</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B15.relay(2,this)\">第二棒</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B15.relay(3,this)\">第三棒</button>" +
                  "<div id=\"bioB15Relay\" style=\"min-height:6.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点按钮，看三棒接力。</div>" +
                  "</div>" },
                { type: "text", html: "总览：葡萄糖 + 氧 → 二氧化碳 + 水 + 大量能量。记住：氧气是第三棒的\"接棒员\"，没有氧，第三棒开不了工。" },
                { type: "note", text: "动手：遮住上面，按\"场所—产物—能量\"复述三棒。" }
              ],
              point: "三棒接力：场所/产物/能量一一对应；氧参与第三棒。"
            },
            /* ============ p3：误区专治 ============ */
            {
              id: "b15.1.1-p3",
              kind: "explain",
              title: "专治：\"有氧呼吸只在线粒体\"？",
              blocks: [
                { type: "lead", text: "\"有氧呼吸全程在线粒体里\"——第一棒表示不同意。" },
                { type: "text", html: "纠错：第一阶段在细胞质基质（葡萄糖 → 丙酮酸），根本没进线粒体！只有第二、三阶段在线粒体里。" },
                { type: "text", html: "记忆钩：场所口诀\"一浆（细胞质基质）二质（线粒体基质）三膜（线粒体内膜）\"。" },
                { type: "trap", text: "⚠️ \"有氧呼吸只在线粒体\"错——第一阶段在细胞质基质！三阶段接力，第一棒不在场内。" },
                { type: "note", text: "一句话：有氧呼吸第一阶段在细胞质基质。复述一遍。" }
              ],
              point: "有氧呼吸第一阶段在细胞质基质，不只在线粒体。"
            }
          ]
        },
        {
          id: "b15.1.2",
          title: "无氧呼吸",
          prereq: "有氧呼吸",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：两种发酵 + 对比 ============ */
            {
              id: "b15.1.2-p1",
              kind: "explain",
              title: "无氧呼吸：两条\"备胎路\"",
              blocks: [
                { type: "lead", text: "没氧的时候，细胞就\"躺平\"吗？不，它换条路走——无氧呼吸。" },
                { type: "text", html: "先认词——无氧呼吸：细胞在无氧条件下，把葡萄糖等有机物分解成不彻底的产物，释放少量能量的过程。先认词——发酵：无氧呼吸的两种常见形式（酒精发酵/乳酸发酵）。" },
                { type: "text", html: "酒精发酵（酵母菌）：葡萄糖 → 酒精（化学名乙醇） + 二氧化碳（馒头暄软、酿酒的原理）。乳酸发酵（乳酸菌/剧烈运动的人体肌肉）：葡萄糖 → 乳酸（剧烈运动后肌肉酸痛，就是它）。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B15.ferm('alcohol',this)\">酒精发酵</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B15.ferm('lactic',this)\">乳酸发酵</button>" +
                  "<div id=\"bioB15Ferm\" style=\"min-height:5.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点按钮，对比两种发酵。</div>" +
                  "</div>" },
                { type: "note", text: "动手：遮住上面，说出两种发酵的菌种和产物。" }
              ],
              point: "无氧呼吸=发酵；酒精发酵（酵母菌→酒精+CO₂）/乳酸发酵（乳酸菌→乳酸）。"
            },
            /* ============ p2：酸奶案例辨析 ============ */
            {
              id: "b15.1.2-p2",
              kind: "explain",
              title: "辨析：酸奶是哪种发酵？",
              blocks: [
                { type: "lead", text: "酸奶是\"酒味\"还是\"酸味\"？答案藏在发酵类型里。" },
                { type: "text", html: "酸奶是乳酸发酵，不是酒精发酵！乳酸菌把牛奶里的乳糖变成乳酸 → 奶变酸、变稠 → 酸奶。" },
                { type: "text", html: "判据：酒精发酵产酒精+二氧化碳（有酒味、冒泡）；酸奶无酒味、不冒泡，只有酸味 → 只能是乳酸发酵。" },
                { type: "trap", text: "⚠️ \"酸奶是酒精发酵\"错——酸奶=乳酸发酵！判据：无酒味、不冒泡。" },
                { type: "note", text: "两问：酸奶的菌种是什么？用什么判据排除酒精发酵？（答案在本页）" }
              ],
              point: "酸奶=乳酸发酵（乳酸菌），不是酒精发酵。"
            },
            /* ============ p3：场所 + 能量 + 误区专治 ============ */
            {
              id: "b15.1.2-p3",
              kind: "explain",
              title: "无氧呼吸：场所在哪？能量多少？",
              blocks: [
                { type: "lead", text: "\"无氧呼吸不产生能量\"——那酵母菌靠什么活？" },
                { type: "text", html: "场所：细胞质基质。全程没进线粒体（对比：有氧呼吸第一阶段也在细胞质基质，之后才进线粒体）。" },
                { type: "text", html: "能量：产生少量。大部分能量还锁在酒精/乳酸里没放出来——所以无氧呼吸是\"不彻底\"的分解，有氧呼吸才是\"彻底\"的。" },
                { type: "trap", text: "⚠️ \"无氧呼吸不产生能量\"错——产生少量！大部分能量还存在酒精/乳酸里。" },
                { type: "note", text: "一句话：无氧呼吸在细胞质基质，产生少量能量。复述一遍。" }
              ],
              point: "无氧呼吸场所=细胞质基质；产生少量能量（不彻底分解）。"
            }
          ]
        },
        {
          id: "b15.1.3",
          title: "呼吸速率的影响因素与应用",
          prereq: "无氧呼吸",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：温度/氧气浓度 + 单位变量 ============ */
            {
              id: "b15.1.3-p1",
              kind: "explain",
              title: "影响呼吸速率的两大因素",
              blocks: [
                { type: "lead", text: "同样的种子，冬天和夏天\"喘气\"一样快吗？" },
                { type: "text", html: "温度：呼吸作用靠酶，酶怕冷也怕热——温度太低酶活性低，太高酶失活。适宜温度下速率最快。" },
                { type: "text", html: "氧气浓度：在一定范围内，氧气越多，有氧呼吸越强；氧气不足会转无氧呼吸（能量少、产物还可能有毒害）。" },
                { type: "text", html: "单位与变量：呼吸速率常用\"单位时间释放的二氧化碳量\"表示；研究时一次只改一个因素（单一变量），其他保持相同（对照）。" },
                { type: "note", text: "三问自查——温度怎么影响？氧气不足会怎样？速率用什么单位表示？（答案在本页）" }
              ],
              point: "温度（酶）/氧气浓度影响呼吸速率；单位：单位时间 CO₂ 释放量。"
            },
            /* ============ p2：粮食储存 + 果蔬保鲜 + 沙盘 ============ */
            {
              id: "b15.1.3-p2",
              kind: "explain",
              title: "储存沙盘：粮食怎么存？",
              blocks: [
                { type: "lead", text: "粮食存久了会\"喘气\"把自己吃掉——怎么让它\"睡\"得久？" },
                { type: "text", html: "粮食储存三招：低温（酶活性低，呼吸弱）、干燥（水分少，呼吸弱还防霉）、低氧（氧气少，有氧呼吸弱）。三招齐下，粮食\"睡\"得最久。" },
                { type: "text", html: "果蔬保鲜同理：低温+低氧，呼吸弱、水分营养丢得慢。但注意：低氧≠无氧！" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B15.store('control',this)\">对照：常温常湿常氧</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B15.store('cold',this)\">低温</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B15.store('dry',this)\">干燥</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B15.store('lowo2',this)\">低氧</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B15.store('noo2',this)\">无氧（危险）</button>" +
                  "<div id=\"bioB15Store\" style=\"min-height:5.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点一种储存条件，看呼吸速率的变化。</div>" +
                  "</div>" },
                { type: "note", text: "动手：点一遍沙盘，说出每招抑制呼吸的道理。" }
              ],
              point: "粮食储存：低温/干燥/低氧；果蔬保鲜同理；低氧≠无氧。"
            },
            /* ============ p3：误区专治 ============ */
            {
              id: "b15.1.3-p3",
              kind: "explain",
              title: "专治：\"完全隔绝氧气最好\"？",
              blocks: [
                { type: "lead", text: "\"把氧气抽光，粮食就彻底不喘气了\"——听起来有理，实则烂粮。" },
                { type: "text", html: "纠错：完全无氧 → 细胞转无氧呼吸 → 产生酒精（烂粮、有异味），能量还少。低氧（不是无氧）才是最优：有氧呼吸被压住，又不至于转无氧。" },
                { type: "text", html: "记忆钩：\"低氧是刹车，无氧是翻车\"。" },
                { type: "trap", text: "⚠️ \"储存粮食完全隔绝氧气最好\"错——低氧非无氧！无氧转无氧呼吸，粮食会烂。" },
                { type: "note", text: "一句话：粮食储存要低氧，不能无氧。复述一遍。" }
              ],
              point: "低氧非无氧：无氧转无氧呼吸烂粮。"
            }
          ]
        },
        {
          id: "b15.1.4",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b15.1.4-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b15.1.1：有氧呼吸（氧参与、彻底氧化、大量能量）；三阶段（细胞质基质：葡萄糖→丙酮酸；线粒体基质：→CO₂；线粒体内膜：→水+大量能量）；三阶段接力动画；认旧友 b03.1.3（\"呼吸\"vs\"呼吸作用\"）；第一阶段在细胞质基质（专治\"只在线粒体\"）。b15.1.2：无氧呼吸/发酵下了定义；酒精发酵（酵母菌→酒精+CO₂）/乳酸发酵（乳酸菌→乳酸；剧烈运动肌肉酸痛）；酸奶=乳酸发酵（判据：无酒味、不冒泡）；场所=细胞质基质；产生少量能量（不彻底分解）。b15.1.3：温度（酶）/氧气浓度影响呼吸速率；单位：单位时间 CO₂ 释放量；单一变量+对照；粮食储存三招（低温/干燥/低氧）；果蔬保鲜同理；低氧非无氧（无氧转无氧呼吸烂粮）。" },
                { type: "choice", stem: "有氧呼吸第一阶段的场所是？",
                  options: ["线粒体基质", "细胞质基质", "线粒体内膜", "叶绿体基质"], answer: 1,
                  tip: "第一阶段在细胞质基质（葡萄糖→丙酮酸），根本没进线粒体（b15.1.1 第 1、3 页）。" },
                { type: "choice", stem: "有氧呼吸释放能量最多的阶段是？",
                  options: ["第一阶段", "第二阶段", "第三阶段", "三个阶段一样多"], answer: 2,
                  tip: "第三阶段（线粒体内膜，[H]+氧→水）释放大量能量，前两阶段只释放少量（b15.1.1 第 1、2 页）。" },
                { type: "choice", stem: "酸奶是哪种发酵的产物？",
                  options: ["酒精发酵", "乳酸发酵", "醋酸发酵", "不用发酵"], answer: 1,
                  tip: "酸奶=乳酸发酵！判据：无酒味、不冒泡，只有酸味（b15.1.2 第 2 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b15.1.4-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "choice", stem: "关于无氧呼吸的说法，正确的是？",
                  options: ["场所在线粒体，不产生能量", "场所在细胞质基质，产生少量能量", "场所在细胞质基质，产生大量能量", "场所在叶绿体，不产生能量"], answer: 1,
                  tip: "无氧呼吸全程在细胞质基质，产生少量能量——大部分能量还锁在酒精/乳酸里（b15.1.2 第 3 页）。" },
                { type: "choice", stem: "粮食储存用\"低氧\"而不用\"无氧\"，原因是？",
                  options: ["无氧成本太高", "无氧会转无氧呼吸，产生酒精烂粮", "低氧更省电", "无氧对人体有害"], answer: 1,
                  tip: "完全无氧→细胞转无氧呼吸→产酒精烂粮；低氧压住有氧呼吸又不转无氧（b15.1.3 第 3 页）。" },
                { type: "choice", stem: "剧烈运动后肌肉酸痛，与哪种生理过程有关？",
                  options: ["酒精发酵", "乳酸发酵", "有氧呼吸第三阶段", "光合作用"], answer: 1,
                  tip: "剧烈运动时肌肉缺氧，转乳酸发酵→乳酸积累→酸痛（b15.1.2 第 1 页）。" },
                { type: "choice", stem: "关于呼吸速率影响因素的说法，正确的是？",
                  options: ["温度越高呼吸速率越快", "氧气不足时细胞转无氧呼吸", "研究时要同时改变温度和氧气", "呼吸速率无法定量表示"], answer: 1,
                  tip: "温度太高酶失活（不是越高越快）；研究一次只改一个因素；速率用\"单位时间 CO₂ 释放量\"表示（b15.1.3 第 1 页）。" }
              ],
              point: "全章完。"
            }
          ]
        }
      ]
    }
  ]
};

/* ============================================================
 * b15 内联交互助手（纯 HTML 内联 handler，不新增引擎组件，
 * b03/b06/b13/b14/b21 先例）。命名空间 window.BIO_B15。
 * 三阶段接力 / 两种发酵对比 / 储存条件调控沙盘。
 * ============================================================ */
window.BIO_B15 = (function () {
  function say(id, html) { var m = document.getElementById(id); if (m) m.innerHTML = html; }
  function markBtn(btn) {
    if (!btn) return;
    var sibs = btn.parentNode.querySelectorAll("button");
    for (var i = 0; i < sibs.length; i++) sibs[i].style.outline = "";
    btn.style.outline = "3px solid var(--bio-highlight)";
    btn.style.outlineOffset = "1px";
  }
  /* ---------- 三阶段接力 ---------- */
  var RELAY = {
    1: "第一棒 <b>细胞质基质</b>：葡萄糖 → 丙酮酸。交出：2 分子丙酮酸 + 少量能量。注意：这一棒<b>没进线粒体</b>！",
    2: "第二棒 <b>线粒体基质</b>：丙酮酸 → 二氧化碳。交出：CO₂ + 少量能量 + [H]（送往第三棒）。",
    3: "第三棒 <b>线粒体内膜</b>：[H] + 氧 → 水。交出：<b>大量能量</b>！氧气是这一棒的\"接棒员\"——没氧，这棒开不了工。"
  };
  /* ---------- 两种发酵对比 ---------- */
  var FERM = {
    alcohol: "<b>酒精发酵</b>（酵母菌）：葡萄糖 → <b>酒精 + 二氧化碳</b>。生活版：馒头暄软、酿酒——冒泡的是 CO₂。",
    lactic: "<b>乳酸发酵</b>（乳酸菌 / 剧烈运动的人体肌肉）：葡萄糖 → <b>乳酸</b>。生活版：酸奶（无酒味、不冒泡）、剧烈运动后肌肉酸痛。"
  };
  /* ---------- 储存条件调控沙盘 ---------- */
  var STORE = {
    control: "<b>对照（常温常湿常氧）</b>：呼吸旺盛，粮食\"喘气\"把自己吃掉——存不久。",
    cold: "<b>低温</b>：酶活性低 → 呼吸弱。粮食\"睡\"得久，还省得发霉。",
    dry: "<b>干燥</b>：水分少 → 呼吸弱，还防霉。晒干、密封防潮就是这个道理。",
    lowo2: "<b>低氧</b>：氧气少 → 有氧呼吸被压住。注意：是低氧不是无氧！",
    noo2: "⚠️ <b>无氧（危险！）</b>：细胞转无氧呼吸 → 产酒精 → 烂粮！记住：<b>低氧非无氧</b>。"
  };
  return {
    relay: function (n, btn) { markBtn(btn); say("bioB15Relay", RELAY[n] || ""); },
    ferm: function (w, btn) { markBtn(btn); say("bioB15Ferm", FERM[w] || ""); },
    store: function (w, btn) { markBtn(btn); say("bioB15Store", STORE[w] || ""); }
  };
})();

