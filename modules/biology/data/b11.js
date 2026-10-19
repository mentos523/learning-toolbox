/* ============================================================
 * 学习工具箱 · 生物 · 第十一章数据（生物 P14 生产队 2026-10-19）
 *
 * 课：b11.1.1 组成细胞的元素与化合物（3 页）/ b11.1.2 糖类与脂质（3 页）/
 *     b11.1.3 蛋白质（3 页）/ b11.1.4 核酸（3 页）/
 *     b11.1.5 检测生物组织中的有机物（2 页）/
 *     b11.1.6 本章小结与习题（2 页）。共 16 页。
 * 交互：元素含量柱状图（鲜重/干重）/ 糖类家族树 / 氨基酸脱水缩合动画 /
 * 核苷酸拼搭 / 虚拟鉴定实验（试剂选择+颜色判读）+ B3 实验三问设计器
 * 复用，均为纯 HTML 内联 handler（window.BIO_B11，b09 的 window.BIO_B09
 * 配对先例），B3 走引擎既有组件，不新增引擎组件。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - "认旧友：形配其用"回填句（b11.1.3-p2 辨析①回填；BIO-R11；
 *   兑现 b05.1.3-a3，台账 foretell 记 fulfilled）
 * - "模型≠实物"（BIO-R34；b11.1.4-p2 DNA 双螺旋模型示意）
 * - "示意，非真实速度/比例。"（BIO-R35；脱水缩合动画）
 * - "虚拟实验：现实中须××"（BIO-R35；b11.1.5-p1 虚拟鉴定实验）
 * - "教学示意数据（非实测）"（BIO-R69/R70；b11.1.1-p1 元素柱状图）
 * - 认旧友深链 1 处（b11.1.4-p2 mathlink→b19.1.1 DNA 的结构）
 * - 直引号；type:"text" 的块用 html 键（P4 教训）
 *
 * 红线落实：
 * - 微量元素口径："微量元素不重要"= FAIL→只写"缺了就病：缺铁贫血、
 *   缺碘大脖子病"（b11.1.1-p3 trap）
 * - 纤维素口径："纤维素能被人体消化"= FAIL→只写"不能（人体无纤维素酶）"
 *   （b11.1.2-p3 trap）
 * - 蛋白质口径："蛋白质功能=营养"= FAIL→只写"功能多样：催化/运输/
 *   免疫/结构/调节"（b11.1.3-p3 trap）
 * - 基因口径："DNA=基因"= FAIL→只写"基因是有遗传效应的 DNA 片段"
 *   （b11.1.4-p3 trap；审计清单第 1 条/BIO-R04）
 *
 * B3 复用（b11.1.5-p1；experiment-3q 引擎组件，recordKey 沿用
 * bio_3q_<课号> 既有格式）：purpose=双缩脲鉴定豆浆蛋白质；
 * controlOptions[0]=清水（阴性对照）为真对照（BIO-R13）；
 * answer={control:0,variable:0,repeat:1} 索引合法（BIO-R15）；
 * 三问顺序对照→单一变量→重复由引擎冻结（BIO-R12）。
 *
 * 门禁⑧：新术语首现即定义——大量元素/微量元素/结合水/自由水
 * （b11.1.1）/单糖/二糖/多糖/磷脂/固醇（b11.1.2）/
 * 氨基酸/肽键/脱水缩合（b11.1.3）/核苷酸/碱基（b11.1.4）/
 * 斐林试剂/双缩脲试剂（b11.1.5-p1）。
 * 门禁⑨：深链课号 b19.1.1 已生产；b12/b23/b24/b25 本批正文零课号引用。
 * 门禁⑩：本批无新登记预告（b10.1.1-a1 见 b10 台账）。
 * 门禁⑪：quiz 页题目数 > 0（b11.1.6 两页：review+3 choice / review+3 choice）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b11"] = {
  id: "b11",
  units: [
    {
      id: "b11.1",
      title: "组成细胞的分子",
      lessons: [
        {
          id: "b11.1.1",
          title: "组成细胞的元素与化合物",
          prereq: "b10 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：大量/微量元素+柱状图 ============ */
            {
              id: "b11.1.1-p1",
              kind: "explain",
              title: "组成细胞的元素",
              blocks: [
                { type: "lead", text: "你的身体里，什么元素最多？" },
                { type: "text", html: "先认词——大量元素：含量多的元素（C、H、O、N、P、S）。先认词——微量元素：含量极少但必不可少的元素（Fe、Mn、Zn、Cu 等；\"微量\"指量少，不指不重要）。" },
                { type: "text", html: "口诀\"碳氢氧氮磷硫\"：C、H、O、N 是\"四大金刚\"（占 96% 以上），P、S 随后。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel);text-align:center\">" +
                  "<div style=\"margin-bottom:8px\"><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B11.chart('fresh')\">鲜重</button> " +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B11.chart('dry')\">干重</button></div>" +
                  "<div id=\"bioB11Chart\" style=\"text-align:left;font-size:0.95rem;line-height:2\"><b>鲜重</b>：O 最多（水多）。<div style=\"display:flex;align-items:center;gap:6px\"><span style=\"width:3.2em\">O</span><span style=\"display:inline-block;height:16px;border-radius:4px;background:var(--bio-organelle);width:72%;min-width:8px\"></span><span style=\"color:var(--bio-ink-soft)\">65%</span></div><div style=\"display:flex;align-items:center;gap:6px\"><span style=\"width:3.2em\">C</span><span style=\"display:inline-block;height:16px;border-radius:4px;background:var(--bio-organelle);width:20%;min-width:8px\"></span><span style=\"color:var(--bio-ink-soft)\">18%</span></div><div style=\"display:flex;align-items:center;gap:6px\"><span style=\"width:3.2em\">H</span><span style=\"display:inline-block;height:16px;border-radius:4px;background:var(--bio-organelle);width:11%;min-width:8px\"></span><span style=\"color:var(--bio-ink-soft)\">10%</span></div><div style=\"display:flex;align-items:center;gap:6px\"><span style=\"width:3.2em\">N</span><span style=\"display:inline-block;height:16px;border-radius:4px;background:var(--bio-organelle);width:8%;min-width:8px\"></span><span style=\"color:var(--bio-ink-soft)\">3%</span></div><div style=\"display:flex;align-items:center;gap:6px\"><span style=\"width:3.2em\">其他</span><span style=\"display:inline-block;height:16px;border-radius:4px;background:var(--bio-organelle);width:8%;min-width:8px\"></span><span style=\"color:var(--bio-ink-soft)\">4%</span></div></div>" +
                  "<div style=\"font-size:12.5px;color:var(--bio-ink-soft);margin-top:4px\">柱状图为教学示意数据（非实测）。</div>" +
                  "</div>" },
                { type: "note", text: "鲜重看水（O 多）、干重看骨架（C 多）——同一个细胞，两种算法。" }
              ],
              point: "大量元素 C/H/O/N/P/S；微量元素量少但必需。"
            },
            /* ============ p2：水与无机盐 ============ */
            {
              id: "b11.1.1-p2",
              kind: "explain",
              title: "水与无机盐",
              blocks: [
                { type: "lead", text: "晒干的种子还活着——水都去哪了？" },
                { type: "text", html: "先认词——结合水：和蛋白质等结合在一起的水，是细胞结构的一部分。先认词——自由水：能自由流动的水，是细胞里的\"运输队\"（运营养、排废物）和\"反应场\"（化学反应在它里面发生）。" },
                { type: "text", html: "无机盐：缺铁→缺铁性贫血（血红蛋白缺铁，运氧少了，人就乏力）；缺钙→抽搐（肌肉不听使唤地抖）。" },
                { type: "note", text: "水两种形态：结合水（结构）+自由水（运输+反应）；无机盐缺了就病。" }
              ],
              point: "水：结合水/自由水；缺铁贫血、缺钙抽搐。"
            },
            /* ============ p3：误区专治+数学奠基 ============ */
            {
              id: "b11.1.1-p3",
              kind: "explain",
              title: "专治：微量元素与百分比",
              blocks: [
                { type: "lead", text: "量少≠不重要——缺一点就生病。" },
                { type: "trap", text: "⚠️ \"微量元素不重要\"错——\"微量\"指量少，不指不重要！正确：缺了就病：缺铁→贫血、缺碘→大脖子病（甲状腺肿大）。" },
                { type: "text", html: "碘：甲状腺激素的原料。缺碘→甲状腺肿大（大脖子病）；沿海吃海带、内陆吃加碘盐，都是补碘的办法——每天需要的碘只有一小撮盐那么多。铁：血红蛋白的原料，缺铁→运氧不足→头晕乏力。" },
                { type: "text", html: "数学呼应：元素含量是\"百分之几\"——小学学过的百分比。65% 就是\"100 份里占 65 份\"，读图时先看\"谁的条最长\"。" },
                { type: "note", text: "百分比三步：找总量→看占比→比长短。" }
              ],
              point: "微量元素缺了就病；含量用百分比读。"
            }
          ]
        },
        {
          id: "b11.1.2",
          title: "糖类与脂质",
          prereq: "组成细胞的元素与化合物",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：糖类+家族树 ============ */
            {
              id: "b11.1.2-p1",
              kind: "explain",
              title: "糖类：单糖、双糖、多糖",
              blocks: [
                { type: "lead", text: "米饭、糖、棉花——都是\"糖\"变的？" },
                { type: "text", html: "先认词——单糖：不能再水解的糖（葡萄糖、果糖）。先认词——二糖：两个单糖手拉手（蔗糖、麦芽糖、乳糖）。先认词——多糖：很多单糖串成长链（淀粉、糖原、纤维素）。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel);font-size:0.95rem;line-height:1.9\">" +
                  "<div style=\"text-align:center\"><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B11.tree()\">展开糖类家族树</button></div>" +
                  "<div id=\"bioB11Tree\" style=\"display:none;margin-top:8px\">单糖（葡萄糖、果糖）<br>　↓ 两两相连<br>二糖（蔗糖=葡萄糖+果糖；麦芽糖；乳糖）<br>　↓ 串成长链<br>多糖——淀粉（植物储能）/ 糖原（动物储能）/ 纤维素（植物细胞壁）</div>" +
                  "</div>" },
                { type: "note", text: "家族树一句话：单糖是\"砖\"，二糖是\"两块砖\"，多糖是\"砖墙\"。" }
              ],
              point: "单糖→二糖→多糖：淀粉/糖原/纤维素。"
            },
            /* ============ p2：脂质 ============ */
            {
              id: "b11.1.2-p2",
              kind: "explain",
              title: "脂质：脂肪、磷脂、固醇",
              blocks: [
                { type: "lead", text: "脂肪=发胖？——它还有两副面孔。" },
                { type: "text", html: "脂肪：储能冠军（1 克脂肪存的能量约是糖的 2 倍多），还是\"保温层+缓冲垫\"。先认词——磷脂：构成细胞膜的脂质。先认词——固醇：另一类脂质——胆固醇、性激素、维生素 D 都属于它。" },
                { type: "text", html: "胆固醇常被当成\"坏蛋\"——其实它是细胞膜的\"稳定剂\"，没有它，膜会太\"软\"；只是多了会沉积在血管壁上。" },
                { type: "note", text: "脂质三兄弟：脂肪（储能）、磷脂（成膜）、固醇（胆固醇/性激素/维 D）。" }
              ],
              point: "脂肪储能；磷脂构成细胞膜；固醇（胆固醇/性激素/维 D）。"
            },
            /* ============ p3：误区专治 ============ */
            {
              id: "b11.1.2-p3",
              kind: "explain",
              title: "专治：纤维素能消化吗",
              blocks: [
                { type: "lead", text: "吃进去的芹菜，出来还是芹菜——它在你的肠道里经历了什么？" },
                { type: "trap", text: "⚠️ \"纤维素能被人体消化\"错——不能！正确：人体没有纤维素酶，纤维素原样穿过肠道，只起促进肠道蠕动的作用（就是\"膳食纤维\"）。" },
                { type: "text", html: "牛羊能消化草，是因为瘤胃（牛的第一个胃）里住着能分解纤维素的微生物\"房客\"——先分解，牛羊再吸收。人肠道里没养这批房客，所以啃不动草。" },
                { type: "text", html: "那纤维素对人就没用吗？大有用！它吸水膨胀、刺激肠壁蠕动，帮你把废物推出去，还能增加饱腹感——\"膳食纤维\"就是它的艺名。" },
                { type: "note", text: "记住：人无纤维素酶→纤维素不消化→只促蠕动。" }
              ],
              point: "人体无纤维素酶，纤维素不能被消化。"
            }
          ]
        },
        {
          id: "b11.1.3",
          title: "蛋白质",
          prereq: "糖类与脂质",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：氨基酸+脱水缩合动画 ============ */
            {
              id: "b11.1.3-p1",
              kind: "explain",
              title: "氨基酸与脱水缩合",
              blocks: [
                { type: "lead", text: "20 种\"积木\"，搭出千变万化的蛋白质。" },
                { type: "text", html: "先认词——氨基酸：组成蛋白质的小分子，约 20 种。每个氨基酸都有一个氨基（-NH₂）和一个羧基（-COOH）连在同一个碳上——这是它们的\"标准接口\"。" },
                { type: "text", html: "先认词——脱水缩合：一个氨基酸的羧基脱去 -OH，另一个的氨基脱去 -H，脱去一分子水，两者连起来。连接处叫先认词——肽键。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel);text-align:center\">" +
                  "<svg viewBox=\"0 0 300 120\" width=\"100%\" role=\"img\" aria-label=\"脱水缩合动画\" style=\"max-width:320px;display:block;margin:0 auto\">" +
                  "<rect x=\"30\" y=\"40\" width=\"70\" height=\"40\" rx=\"8\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/>" +
                  "<text x=\"65\" y=\"64\" font-size=\"13\" text-anchor=\"middle\" style=\"fill:var(--bio-text)\">氨基酸1</text>" +
                  "<rect x=\"200\" y=\"40\" width=\"70\" height=\"40\" rx=\"8\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/>" +
                  "<text x=\"235\" y=\"64\" font-size=\"13\" text-anchor=\"middle\" style=\"fill:var(--bio-text)\">氨基酸2</text>" +
                  "<text id=\"bioB11Water\" x=\"150\" y=\"30\" font-size=\"14\" text-anchor=\"middle\" style=\"fill:var(--bio-aux)\">H₂O</text>" +
                  "<line id=\"bioB11Bond\" x1=\"100\" y1=\"60\" x2=\"200\" y2=\"60\" style=\"stroke:var(--bio-highlight);stroke-width:4;display:none\"/>" +
                  "<text x=\"150\" y=\"112\" font-size=\"12.5\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">示意，非真实速度/比例。</text>" +
                  "</svg>" +
                  "<div style=\"margin:6px 0\"><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B11.dehydrate()\">脱水：脱去一分子水</button> " +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B11.dehydrateReset()\">重来</button></div>" +
                  "<div id=\"bioB11DehyMsg\" style=\"min-height:2.6em;font-size:0.95rem;line-height:1.7\">按\"脱水\"：看 -OH 和 -H 手拉手变成水飞走，两个氨基酸连成肽键。</div>" +
                  "</div>" },
                { type: "note", text: "串珠口诀：脱水（去 H₂O）→成键（肽键）→成链（多肽）。" }
              ],
              point: "氨基酸脱水缩合形成肽键，串成多肽链。"
            },
            /* ============ p2：结构多样性→功能多样性+辨析①回填 ============ */
            {
              id: "b11.1.3-p2",
              kind: "explain",
              title: "结构多样性决定功能多样性",
              blocks: [
                { type: "lead", text: "头发、肌肉、抗体——都是蛋白质，凭什么干的活不一样？" },
                { type: "text", html: "氨基酸的种类、数目、排列顺序不同，肽链盘曲折叠的方式不同——蛋白质的结构千差万别（20 种氨基酸，排列组合近乎无穷）；结构不同，功能就不同。" },
                { type: "text", html: "辨析①回填：蛋白质结构多样性→功能多样性。认旧友：形配其用——结构与功能相适应（还记得鱼鳃吗？鳃丝又多又细、密布毛细血管，适合气体交换）。" },
                { type: "mathlink", text: "认旧友：b05.1.3——小肠 5 处结构\"形配其用\"；蛋白质结构多样→功能多样，同样\"形配其用\"。" },
                { type: "note", text: "回填链：小肠（b05.1.3）→肺泡（b06.1.1）→鱼鳃（b09.2.1）→蛋白质（本页）。" }
              ],
              point: "蛋白质结构多样→功能多样：认旧友：形配其用。"
            },
            /* ============ p3：误区专治 ============ */
            {
              id: "b11.1.3-p3",
              kind: "explain",
              title: "专治：蛋白质的功能",
              blocks: [
                { type: "lead", text: "提到蛋白质，你只想到\"吃鸡蛋补营养\"吗？那就太小看它了。" },
                { type: "trap", text: "⚠️ \"蛋白质功能=营养\"错——营养只是它最不起眼的身份！正确：功能多样——催化（消化酶）、运输（血红蛋白运氧）、免疫（抗体）、结构（肌肉蛋白）、调节（胰岛素降血糖）。" },
                { type: "text", html: "一一举例：酶（催化消化）、血红蛋白（运输氧气）、抗体（免疫防御）、肌肉蛋白（构成肌肉）、胰岛素（调节血糖）——五个身份，各司其职。" },
                { type: "text", html: "所以\"多吃蛋白粉长肌肉\"只说对一半：肌肉确实是蛋白质，但吃进去的蛋白质先被消化成氨基酸，身体再按需重建——吃啥不直接变啥。" },
                { type: "note", text: "五功能口诀：催（酶）运（血红蛋白）免（抗体）结（肌肉）调（胰岛素）。" }
              ],
              point: "蛋白质功能多样：催化/运输/免疫/结构/调节。"
            }
          ]
        },
        {
          id: "b11.1.4",
          title: "核酸",
          prereq: "蛋白质",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：核苷酸+拼搭 ============ */
            {
              id: "b11.1.4-p1",
              kind: "explain",
              title: "核苷酸：三件套",
              blocks: [
                { type: "lead", text: "遗传的\"密码本\"，由三种小零件拼成。" },
                { type: "text", html: "先认词——核苷酸：组成核酸的小分子=一分子磷酸+一分子五碳糖+一分子碱基（三件套）。先认词——碱基：含氮的碱基，5 种——A（腺嘌呤）、T（胸腺嘧啶）、C（胞嘧啶）、G（鸟嘌呤）、U（尿嘧啶）。" },
                { type: "text", html: "DNA：五碳糖是脱氧核糖，碱基 A/T/C/G；RNA：五碳糖是核糖，碱基 A/U/C/G（T 换成 U）。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel);text-align:center\">" +
                  "<div style=\"margin-bottom:6px;font-size:0.95rem\">点零件，拼一个核苷酸：</div>" +
                  "<div><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B11.assemble('磷酸')\">磷酸</button> " +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B11.assemble('五碳糖')\">五碳糖</button> " +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B11.assemble('碱基')\">碱基</button> " +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B11.assembleReset()\">重来</button></div>" +
                  "<div id=\"bioB11AsmMsg\" style=\"min-height:3em;margin-top:6px;font-size:0.95rem;line-height:1.7\">三种零件集齐=一个核苷酸。点碱基时想一想：选 T 还是 U？</div>" +
                  "</div>" },
                { type: "note", text: "口诀：磷酸+五碳糖+碱基=核苷酸；DNA 有 T 无 U，RNA 有 U 无 T。" }
              ],
              point: "核苷酸=磷酸+五碳糖+碱基；DNA（A/T/C/G）、RNA（A/U/C/G）。"
            },
            /* ============ p2：DNA 是主要的遗传物质+认旧友 b19 ============ */
            {
              id: "b11.1.4-p2",
              kind: "explain",
              title: "DNA 是主要的遗传物质",
              blocks: [
                { type: "lead", text: "细胞里分子那么多，凭什么 DNA 当\"总司令\"？" },
                { type: "text", html: "DNA 是主要的遗传物质：绝大多数生物的遗传信息都写在 DNA 里（极少数病毒用 RNA）。" +
                  "<svg viewBox=\"0 0 200 130\" width=\"100%\" role=\"img\" aria-label=\"DNA 双螺旋模型示意\" style=\"max-width:200px;display:block;margin:6px auto\">" +
                  "<path d=\"M70 10 q 60 27 0 55 q -60 28 0 55\" style=\"fill:none;stroke:var(--bio-organelle)\" stroke-width=\"3\"/>" +
                  "<path d=\"M130 10 q -60 27 0 55 q 60 28 0 55\" style=\"fill:none;stroke:var(--bio-organelle)\" stroke-width=\"3\"/>" +
                  "<line x1=\"78\" y1=\"30\" x2=\"122\" y2=\"30\" style=\"stroke:var(--bio-ink-soft)\" stroke-width=\"2\"/>" +
                  "<line x1=\"70\" y1=\"65\" x2=\"130\" y2=\"65\" style=\"stroke:var(--bio-ink-soft)\" stroke-width=\"2\"/>" +
                  "<line x1=\"78\" y1=\"100\" x2=\"122\" y2=\"100\" style=\"stroke:var(--bio-ink-soft)\" stroke-width=\"2\"/>" +
                  "<text x=\"100\" y=\"126\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">DNA 双螺旋模型示意（模型≠实物）</text>" +
                  "</svg>" },
                { type: "text", html: "为什么是 DNA？它稳定（双链互补，信息有\"备份\"）、能复制（细胞分裂时一分为二，信息不丢）、能表达（信息能\"翻译\"成蛋白质）——\"总司令\"得靠谱。" },
                { type: "mathlink", text: "认旧友：b19.1.1——DNA 双螺旋的结构在 b19.1.1 细讲过；长长的双链，就是为了装下遗传信息。" },
                { type: "note", text: "记住：DNA 是主要的遗传物质（绝大多数生物；极少数病毒用 RNA）。" }
              ],
              point: "DNA 是主要的遗传物质（认旧友 b19.1.1）。"
            },
            /* ============ p3：误区专治 ============ */
            {
              id: "b11.1.4-p3",
              kind: "explain",
              title: "专治：DNA 与基因",
              blocks: [
                { type: "lead", text: "基因和 DNA，到底是谁装着谁？" },
                { type: "trap", text: "⚠️ \"DNA=基因\"错——基因只是 DNA 上的一小段！正确：基因是有遗传效应的 DNA 片段；一条 DNA 长得多，上面排着很多基因。" },
                { type: "text", html: "打个比方：DNA 是一整本\"说明书\"，基因是其中\"有用的段落\"——段落不等于整本书。" },
                { type: "text", html: "人的 DNA 拉直约 2 米，上面排着约 2 万个基因——基因只占全长一小部分；其余序列有调控等作用，不是\"没用\"的。" },
                { type: "text", html: "所以基因检测不是\"测整条 DNA\"：只读和目标性状相关的片段，又快又便宜——DNA 是\"书库\"，基因是\"要查的那几页\"。" },
                { type: "note", text: "口诀：基因是 DNA 的片段，DNA 长得多。" }
              ],
              point: "基因是有遗传效应的 DNA 片段；DNA 长得多。"
            }
          ]
        },
        {
          id: "b11.1.5",
          title: "检测生物组织中的有机物",
          prereq: "核酸",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：三种鉴定+虚拟实验+B3 ============ */
            {
              id: "b11.1.5-p1",
              kind: "explain",
              title: "鉴定实验：试剂与颜色",
              blocks: [
                { type: "lead", text: "三杯无色液体，哪杯是糖水、哪杯是豆浆？——让试剂\"说话\"。" },
                { type: "text", html: "先认词——斐林试剂：鉴定还原糖（葡萄糖、果糖）的试剂，出现砖红色沉淀=有还原糖。脂肪用苏丹Ⅲ染液：橘黄色=有脂肪。先认词——双缩脲试剂：鉴定蛋白质的试剂，变紫色=有蛋白质。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel);text-align:center\">" +
                  "<div style=\"margin-bottom:6px;font-size:0.95rem\">虚拟实验室：选样品 + 选试剂，看颜色判读。</div>" +
                  "<div style=\"display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:6px\">" +
                  "<select id=\"bioB11Sample\" class=\"tb-btn-secondary\" style=\"min-height:44px\"><option value=\"苹果汁\">苹果汁</option><option value=\"花生油\">花生油</option><option value=\"豆浆\">豆浆</option></select>" +
                  "<select id=\"bioB11Reagent\" class=\"tb-btn-secondary\" style=\"min-height:44px\"><option value=\"斐林试剂\">斐林试剂</option><option value=\"苏丹Ⅲ染液\">苏丹Ⅲ染液</option><option value=\"双缩脲试剂\">双缩脲试剂</option></select>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B11.ident()\">鉴定</button></div>" +
                  "<div id=\"bioB11IdentMsg\" style=\"min-height:3em;font-size:0.95rem;line-height:1.7\">选好样品和试剂，按\"鉴定\"。</div>" +
                  "<div style=\"font-size:12.5px;color:var(--bio-ink-soft);margin-top:4px\">虚拟实验：现实中须斐林试剂现配现用、水浴加热，颜色以真实试剂为准。</div>" +
                  "</div>" },
                { type: "widget", widget: { type: "experiment-3q", params: {
                  purpose: "用双缩脲试剂鉴定豆浆中是否含蛋白质",
                  controlOptions: ["清水（阴性对照）", "已知蛋白液（阳性对照）", "不设对照"],
                  variableOptions: ["样品种类（豆浆/清水）", "试剂用量", "反应时间"],
                  repeatOptions: ["1 次", "3 次", "10 次"],
                  answer: { control: 0, variable: 0, repeat: 1 },
                  thoughtExp: "如果不设清水对照，豆浆加双缩脲变紫了，你怎么知道紫色不是试剂自己变出来的？——对照就是\"参照物\"。",
                  recordKey: "bio_3q_b11.1.5",
                  replayHref: "#b11.1.5/1",
                  replayText: "回看第 1 页：虚拟鉴定全流程"
                } } },
                { type: "note", text: "颜色判读：砖红色=还原糖、橘黄色=脂肪、紫色=蛋白质。" }
              ],
              point: "斐林（砖红）/苏丹Ⅲ（橘黄）/双缩脲（紫）鉴定三类有机物。"
            },
            /* ============ p2：三原则+误区专治 ============ */
            {
              id: "b11.1.5-p2",
              kind: "explain",
              title: "三原则与变量意识",
              blocks: [
                { type: "lead", text: "做实验的三条\"军规\"——缺一条，结论就站不住。" },
                { type: "text", html: "三原则：对照（清水/已知样做\"参照物\"）、单一变量（一次只变一个）、重复（多做几次防偶然）。" },
                { type: "trap", text: "⚠️ \"煮沸的豆浆做蛋白质鉴定不变紫\"错——照样变紫！正确：高温破坏空间结构（变性），但肽键还在，双缩脲认的是肽键。变量意识：变的是\"结构\"，不是\"有没有肽键\"。" },
                { type: "text", html: "对照组是\"参照物\"：清水+双缩脲不变紫，证明紫色不是试剂\"自带\"的；豆浆变紫，紫色才是豆浆的\"功劳\"——这就是对照的逻辑。" },
                { type: "text", html: "没有对照的实验，结论都是\"自说自话\"——先问\"跟谁比\"，再谈结论。" },
                { type: "note", text: "口诀：对照（参照物）、单一变量（只变一个）、重复（防偶然）。" }
              ],
              point: "三原则：对照/单一变量/重复；煮沸豆浆双缩脲照样紫。"
            }
          ]
        },
        {
          id: "b11.1.6",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40 分钟",
          pages: [
            /* ============ p1：习题（一） ============ */
            {
              id: "b11.1.6-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b11.1.1：元素（大量元素 C/H/O/N/P/S；微量元素 Fe/Mn/Zn 等，量少但必需；鲜重 O 多、干重 C 多）；水（结合水/自由水）；无机盐（缺铁贫血、缺钙抽搐；缺碘大脖子病）。b11.1.2：糖类（单糖→二糖→多糖：淀粉/糖原/纤维素）；脂质（脂肪储能、磷脂成膜、固醇：胆固醇/性激素/维 D；人体无纤维素酶）。b11.1.3：蛋白质（氨基酸脱水缩合→肽键→多肽；结构多样→功能多样：认旧友：形配其用；功能：催化/运输/免疫/结构/调节）。" },
                { type: "choice", stem: "鲜重与干重含量最多的元素分别是？",
                  options: ["C、O", "O、C", "H、N", "N、P"], answer: 1,
                  tip: "鲜重水多→O 最多；干重有机物骨架→C 最多（b11.1.1 第 1 页）。" },
                { type: "choice", stem: "人体不能消化纤维素，是因为？",
                  options: ["纤维素有毒", "人体无纤维素酶", "纤维素不溶于水", "肠道太短"], answer: 1,
                  tip: "人体没有纤维素酶——纤维素只促肠道蠕动（b11.1.2 第 3 页）。" },
                { type: "choice", stem: "脱水缩合中脱去的是？",
                  options: ["二氧化碳", "一分子水", "氧气", "氨基酸"], answer: 1,
                  tip: "羧基脱 -OH、氨基脱 -H，脱去一分子水形成肽键（b11.1.3 第 1 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b11.1.6-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "review", html: "本章小结——b11.1.4：核酸（核苷酸=磷酸+五碳糖+碱基；DNA：A/T/C/G，RNA：A/U/C/G；DNA 是主要的遗传物质；基因是有遗传效应的 DNA 片段）。b11.1.5：鉴定（斐林试剂→砖红色=还原糖；苏丹Ⅲ→橘黄色=脂肪；双缩脲→紫色=蛋白质）；三原则（对照/单一变量/重复；煮沸豆浆双缩脲照样紫：肽键还在）。" },
                { type: "choice", stem: "组成 DNA 的碱基是？",
                  options: ["A/U/C/G", "A/T/C/G", "A/T/C/U", "A/G/U"], answer: 1,
                  tip: "DNA 有 T 无 U，RNA 有 U 无 T（b11.1.4 第 1 页）。" },
                { type: "choice", stem: "用双缩脲试剂鉴定豆浆，变紫色说明？",
                  options: ["含还原糖", "含脂肪", "含蛋白质", "含水"], answer: 2,
                  tip: "双缩脲试剂认肽键——变紫=有蛋白质（b11.1.5 第 1 页）。" },
                { type: "choice", stem: "煮沸的豆浆做蛋白质鉴定仍变紫，是因为？",
                  options: ["高温产生新蛋白质", "高温变性但肽键还在", "试剂失效了", "豆浆里本来就有紫色"], answer: 1,
                  tip: "高温破坏空间结构（变性），肽键还在——双缩脲认的是肽键（b11.1.5 第 2 页）。" }
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
 * b11 内联交互助手（纯 HTML 内联 handler，不新增引擎组件，
 * b09 的 window.BIO_B09 配对先例）。命名空间 window.BIO_B11。
 * 元素柱状图 / 糖类家族树 / 脱水缩合动画 / 核苷酸拼搭 /
 * 虚拟鉴定实验（试剂选择+颜色判读）。
 * ============================================================ */
window.BIO_B11 = (function () {
  function say(id, html) { var m = document.getElementById(id); if (m) m.innerHTML = html; }
  /* ---------- 元素含量柱状图（b11.1.1-p1；教学示意数据） ---------- */
  var CHART = {
    fresh: [["O", 65], ["C", 18], ["H", 10], ["N", 3], ["其他", 4]],
    dry: [["C", 55], ["O", 14], ["N", 14], ["H", 8], ["其他", 9]]
  };
  function chart(mode) {
    var rows = CHART[mode] || CHART.fresh;
    var html = rows.map(function (r) {
      return "<div style=\"display:flex;align-items:center;gap:6px\">" +
        "<span style=\"width:3.2em\">" + r[0] + "</span>" +
        "<span style=\"display:inline-block;height:16px;border-radius:4px;background:var(--bio-organelle);width:" + (r[1] * 1.1).toFixed(0) + "%;min-width:8px\"></span>" +
        "<span style=\"color:var(--bio-ink-soft)\">" + r[1] + "%</span></div>";
    }).join("");
    say("bioB11Chart", (mode === "dry" ? "<b>干重</b>：C 最多（有机物是碳骨架）。" : "<b>鲜重</b>：O 最多（水多）。") + html);
  }
  /* ---------- 糖类家族树（b11.1.2-p1） ---------- */
  function tree() {
    var d = document.getElementById("bioB11Tree");
    if (d) d.style.display = d.style.display === "none" ? "block" : "none";
  }
  /* ---------- 脱水缩合动画（b11.1.3-p1） ---------- */
  var dehyDone = false;
  function dehydrate() {
    if (dehyDone) return;
    dehyDone = true;
    var w = document.getElementById("bioB11Water");
    if (w) w.style.display = "none";
    var b = document.getElementById("bioB11Bond");
    if (b) b.style.display = "inline";
    say("bioB11DehyMsg", "-OH 和 -H 手拉手变成水飞走了！两个氨基酸连成肽键——再串更多氨基酸，就是多肽链。");
  }
  function dehydrateReset() {
    dehyDone = false;
    var w = document.getElementById("bioB11Water");
    if (w) w.style.display = "inline";
    var b = document.getElementById("bioB11Bond");
    if (b) b.style.display = "none";
    say("bioB11DehyMsg", "按\"脱水\"：看 -OH 和 -H 手拉手变成水飞走，两个氨基酸连成肽键。");
  }
  /* ---------- 核苷酸拼搭（b11.1.4-p1） ---------- */
  var asmParts = [];
  function assemble(part) {
    if (asmParts.indexOf(part) < 0) asmParts.push(part);
    if (asmParts.length >= 3) {
      say("bioB11AsmMsg", "拼好了！磷酸+五碳糖+碱基=一个核苷酸。再想一想：如果碱基选 T，拼的是 DNA 版；选 U，拼的是 RNA 版。");
    } else {
      say("bioB11AsmMsg", "已放入：" + asmParts.join("、") + "——还差 " + (3 - asmParts.length) + " 种零件。");
    }
  }
  function assembleReset() {
    asmParts = [];
    say("bioB11AsmMsg", "三种零件集齐=一个核苷酸。点碱基时想一想：选 T 还是 U？");
  }
  /* ---------- 虚拟鉴定实验（b11.1.5-p1；试剂选择+颜色判读） ---------- */
  var IDENT = {
    "苹果汁|斐林试剂": "砖红色沉淀！苹果汁里有还原糖（果糖、葡萄糖）——判读正确。",
    "花生油|苏丹Ⅲ染液": "橘黄色！花生油里有脂肪——判读正确。",
    "豆浆|双缩脲试剂": "紫色！豆浆里有蛋白质——判读正确。"
  };
  function ident() {
    var s = document.getElementById("bioB11Sample");
    var r = document.getElementById("bioB11Reagent");
    if (!s || !r) return;
    var key = s.value + "|" + r.value;
    var hit = IDENT[key];
    say("bioB11IdentMsg", hit
      ? "<b style=\"color:var(--bio-organelle)\">" + hit + "</b>"
      : s.value + " + " + r.value + "：无明显颜色变化——" + r.value + "不鉴定这类物质，换一组试试。");
  }
  if (typeof document !== "undefined") chart("fresh");
  return { chart: chart, tree: tree, dehydrate: dehydrate, dehydrateReset: dehydrateReset,
    assemble: assemble, assembleReset: assembleReset, ident: ident };
})();
