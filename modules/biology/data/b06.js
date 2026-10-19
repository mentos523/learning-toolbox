/* ============================================================
 * 学习工具箱 · 生物 · 第六章数据（生物 P9 生产队 2026-10-19）
 *
 * 课：b06.1.1 呼吸系统的组成与气体交换（4 页）/ b06.2.1
 *     血液、血管与心脏（4 页）/ b06.2.2 血液循环（3 页）/
 *     b06.2.3 尿的形成与排出（3 页）/ b06.2.4 本章小结与
 *     习题（2 页）。共 16 页。
 * 交互：双循环路径闯关 / 心脏剖面 / 呼吸运动因果链 /
 * 气体交换 / 肾单位滤过—重吸收，均为纯 HTML 内联
 * handler（window.BIO_B06，b13 的 window.BIO_B13 先例），
 * 不立 B13（任务书红线：上限 1 个、优先复用现有原语；
 * 经评估 .tb-btn + 内联 SVG 可满足，协调者可挑战）。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 模式图声明：「模式图：非等比、非实物」（BIO-R32，
 *   每张结构示意图角落常驻）
 * - BIO-R01：「呼吸」只许用于肺通气语境；「呼吸作用」=
 *   细胞内氧化分解（b06.1.1-p4 专治）
 * - 辨析①回填兑现：b06.1.1-p2 出现「形配其用」认旧友 +
 *   深链回 b05.1.3（b05.1.3-a1 兑现；缺 = FAIL 类推 BIO-R11）
 * - 直引号；type:"text" 的块用 html 键（P4 教训）
 *
 * 门禁⑧：新术语首现即定义——肺泡（b06.1.1-p2）/
 * 肺通气（b06.1.1-p3）/ 血红蛋白（b06.2.1-p1）/
 * 瓣膜（b06.2.1-p4）/ 收缩压 / 舒张压（b06.2.2-p2）/
 * 肾单位 / 原尿 / 重吸收（b06.2.3-p1）。
 * 门禁⑨：深链只用已生产课号（b03 / b05 / b13、b16–b21；
 * b06↔b14 不硬链）+ 代数 ch00（XLINK_MATH 在表，
 * b06.2.2-p2 奠基）；b07 / b08 / b15 未生产只纯文本。
 * 门禁⑩：b06.1.1 为兑现（b05.1.3-a1），不记 drafted。
 * 门禁⑪：quiz 页题目数 > 0（b06.2.4 两页：3 + 4）。
 * 闯关记录：会话内有效，不写 localStorage（不发明新
 * recordKey 格式；见生产报告诚实声明）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b06"] = {
  id: "b06",
  units: [
    {
      id: "b06.1",
      title: "呼吸",
      lessons: [
        {
          id: "b06.1.1",
          title: "呼吸系统的组成与气体交换",
          prereq: "b05 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：呼吸道（温暖/湿润/清洁） ============ */
            {
              id: "b06.1.1-p1",
              kind: "explain",
              title: "呼吸道：空气的\"预处理车间\"",
              blocks: [
                { type: "lead", text: "鼻塞时被迫用嘴呼吸，喉咙为什么特别容易干？" },
                { type: "text", html: "呼吸系统由呼吸道和肺组成。呼吸道是气体进出肺的通道：鼻 → 咽 → 喉 → 气管 → 支气管。" },
                { type: "text", html: "呼吸道不只是\"管子\"——它是空气的\"预处理车间\"，三件事：① 温暖（鼻腔黏膜下毛细血管丰富，给冷空气加温）；② 湿润（黏液腺分泌黏液，给干空气加湿）；③ 清洁（鼻毛挡住大灰尘，黏液粘住小灰尘细菌，气管纤毛摆动把它们扫出去成痰）。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 220\" width=\"100%\" role=\"img\" aria-label=\"呼吸道模式图\" style=\"max-width:340px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<rect x=\"150\" y=\"8\" width=\"40\" height=\"26\" rx=\"8\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/><text x=\"170\" y=\"26\" style=\"fill:var(--bio-text)\">鼻</text>" +
                  "<rect x=\"150\" y=\"44\" width=\"40\" height=\"26\" rx=\"8\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/><text x=\"170\" y=\"62\" style=\"fill:var(--bio-text)\">咽·喉</text>" +
                  "<rect x=\"158\" y=\"80\" width=\"24\" height=\"60\" rx=\"6\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/><text x=\"170\" y=\"112\" style=\"fill:var(--bio-text)\">气管</text>" +
                  "<path d=\"M170,140 L120,180 M170,140 L220,180\" style=\"fill:none;stroke:var(--bio-organelle)\" stroke-width=\"8\" stroke-linecap=\"round\"/>" +
                  "<text x=\"100\" y=\"200\" style=\"fill:var(--bio-text)\">支气管</text><text x=\"240\" y=\"200\" style=\"fill:var(--bio-text)\">支气管</text>" +
                  "<text x=\"170\" y=\"216\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</g></svg>" },
                { type: "note", text: "三问自查——呼吸道由哪些器官组成？\"三暖\"（温暖/湿润/清洁）各靠谁完成？（答案在本页）" }
              ],
              point: "呼吸道：鼻咽喉气管支气管；温暖/湿润/清洁。"
            },
            /* ============ p2：肺泡 + 辨析①回填兑现 ============ */
            {
              id: "b06.1.1-p2",
              kind: "explain",
              title: "肺泡：\"形配其用\"再认",
              blocks: [
                { type: "lead", text: "肺泡的壁薄到什么程度？一层细胞——气体一穿就过。" },
                { type: "text", html: "先认词——肺泡：肺里蜂窝状的小气囊，是肺进行气体交换的场所。" },
                { type: "text", html: "肺泡长得\"刚刚好\"能换气，三条：① 壁很薄，只有一层上皮细胞（气体一穿就过，路程最短）；② 弹性好（能张能缩，配合呼吸运动）；③ 外面包着密密麻麻的毛细血管网（交换面积大，氧气一下船就上车）。" },
                { type: "mathlink", text: "认旧友：b05.1.3 第 1 页——小肠\"形配其用\"（辨析①立靶：结构的特点恰好适合它承担的功能）。肺泡是辨析①回填链第一站：壁薄/弹性/毛细血管网，形配其用再认。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 170\" width=\"100%\" role=\"img\" aria-label=\"肺泡模式图\" style=\"max-width:360px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<circle cx=\"170\" cy=\"70\" r=\"52\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/>" +
                  "<circle cx=\"170\" cy=\"70\" r=\"52\" style=\"fill:none;stroke:var(--bio-text)\" stroke-width=\"1\" stroke-dasharray=\"4,3\"/>" +
                  "<path d=\"M118,70 q26,-18 52,0 t52,0\" style=\"fill:none;stroke:var(--bio-target)\" stroke-width=\"3\"/>" +
                  "<path d=\"M118,86 q26,18 52,0 t52,0\" style=\"fill:none;stroke:var(--bio-target)\" stroke-width=\"3\"/>" +
                  "<text x=\"170\" y=\"72\" style=\"fill:var(--bio-text)\">肺泡</text>" +
                  "<text x=\"60\" y=\"40\" style=\"fill:var(--bio-target)\">毛细血管网</text>" +
                  "<text x=\"170\" y=\"150\" style=\"fill:var(--bio-ink-soft)\">壁：一层细胞（薄）</text>" +
                  "<text x=\"170\" y=\"166\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</g></svg>" },
                { type: "note", text: "动手：遮住上面三条，复述一遍肺泡\"形配其用\"的三条结构特点。" }
              ],
              point: "肺泡壁薄/弹性/毛细血管网——形配其用。"
            },
            /* ============ p3：肺通气（呼吸运动） ============ */
            {
              id: "b06.1.1-p3",
              kind: "explain",
              title: "肺通气：呼吸运动",
              blocks: [
                { type: "lead", text: "吸气时，是肺自己\"胀大\"的吗？——肺自己没有肌肉！" },
                { type: "text", html: "先认词——肺通气：外界与肺之间的气体交换过程，就是平常说的\"喘气\"（呼吸运动）。注意：这里的\"呼吸\"只许用在肺通气语境。" },
                { type: "text", html: "因果链别反：呼吸肌（肋间肌、膈肌）收缩 → 胸廓扩大 → 肺被动扩张 → 外界气体被\"吸\"进来。" },
                { type: "trap", text: "⚠️ 别搞反：\"吸气时肺自己胀大\"错——肺自己没有肌肉！是呼吸肌收缩 → 胸廓扩大 → 肺扩张，因果别反。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B06.breath(1,this)\">① 呼吸肌收缩</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B06.breath(2,this)\">② 胸廓扩大</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B06.breath(3,this)\">③ 肺扩张进气</button>" +
                  "<div id=\"bioB06Breath\" style=\"min-height:3.2em;margin-top:6px;font-size:0.95rem;line-height:1.6\">点按钮，一步步看吸气怎么发生。</div>" +
                  "</div>" },
                { type: "note", text: "动手：不看上面，口头走一遍\"呼吸肌→胸廓→肺\"的因果链，说出\"肺自己胀大\"错在哪。" }
              ],
              point: "肺通气=呼吸运动；因果链：呼吸肌→胸廓→肺。"
            },
            /* ============ p4：气体交换 + BIO-R01 专治 ============ */
            {
              id: "b06.1.1-p4",
              kind: "explain",
              title: "气体交换：两处\"换气站\"",
              blocks: [
                { type: "lead", text: "氧气怎么从肺泡\"跑\"进血液？二氧化碳又去哪了？" },
                { type: "text", html: "肺泡内的气体交换：肺泡里氧气多 → 扩散进毛细血管的血液；血液里二氧化碳多 → 扩散进肺泡，随呼气排出。交换后：静脉血 → 动脉血。" },
                { type: "text", html: "组织内的气体交换：反过来——血液把氧气给组织细胞，带走二氧化碳。交换后：动脉血 → 静脉血。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B06.gas('lung',this)\">肺泡内交换</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B06.gas('tissue',this)\">组织内交换</button>" +
                  "<div id=\"bioB06Gas\" style=\"min-height:4.5em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点按钮，看两处\"换气站\"的气体怎么走。</div>" +
                  "</div>" },
                { type: "trap", text: "⚠️ 一次分清：\"呼吸\"=肺通气（喘气）；\"呼吸作用\"=细胞内的氧化分解（b15 细讲）。\"呼吸=呼吸作用\"错！" },
                { type: "note", text: "三问自查——两处交换各在哪？气体各往哪走？\"呼吸\"与\"呼吸作用\"的区别？（答案在本页）" }
              ],
              point: "肺泡内/组织内气体交换；呼吸≠呼吸作用。"
            }
          ]
        }
      ]
    }
    ,
    {
      id: "b06.2",
      title: "循环与泌尿",
      lessons: [
        {
          id: "b06.2.1",
          title: "血液、血管与心脏",
          prereq: "呼吸与气体交换",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：血液的组成 ============ */
            {
              id: "b06.2.1-p1",
              kind: "explain",
              title: "血液：身体的\"运输队\"",
              blocks: [
                { type: "lead", text: "血常规化验单上，查的都是血液里的什么？" },
                { type: "text", html: "血液由血浆和血细胞组成。血浆是淡黄色的液体，运载血细胞，还运输养料和废物；血细胞有三类：红细胞、白细胞、血小板。" },
                { type: "text", html: "先认词——血红蛋白：红细胞里含铁的蛋白质，负责运输氧。氧气就是坐着它从肺跑到全身的。" },
                { type: "text", html: "三类血细胞分工：① 红细胞——数量最多，哺乳动物成熟的红细胞没有细胞核（腾出地方装更多血红蛋白）；② 白细胞——比红细胞大、有细胞核，能吞噬病菌（身体的\"卫兵\"）；③ 血小板——最小，负责止血和凝血。" },
                { type: "note", text: "三问自查——血浆运什么？血红蛋白是干什么的？哺乳动物成熟红细胞有什么特别？（答案在本页）" }
              ],
              point: "血浆+三类血细胞；血红蛋白运氧；成熟红细胞无核。"
            },
            /* ============ p2：三种血管 ============ */
            {
              id: "b06.2.1-p2",
              kind: "explain",
              title: "三种血管：\"形配其用\"再认",
              blocks: [
                { type: "lead", text: "血管壁厚薄，跟\"工作\"有什么关系？" },
                { type: "text", html: "动脉：把血液从心脏送到全身。管壁厚、弹性大，扛住泵血压力，血流快。" },
                { type: "text", html: "静脉：把血液从全身送回心脏。管壁薄、弹性小，管腔大；四肢静脉瓣防倒流。" },
                { type: "text", html: "毛细血管：连通小动脉和小静脉，管壁最薄（一层上皮细胞）、管腔最小（红细胞单行通过）、血流最慢——血液与组织细胞在此交换。\"形配其用\"：壁薄、慢、广，为交换而生。" },
                { type: "text", html: "<table style=\"width:100%;border-collapse:collapse;font-size:0.9rem;margin:8px 0\" aria-label=\"三种血管对比\">" +
                  "<tr style=\"background:var(--bio-panel)\"><th style=\"border:1px solid var(--bio-line);padding:6px\"></th><th style=\"border:1px solid var(--bio-line);padding:6px\">动脉</th><th style=\"border:1px solid var(--bio-line);padding:6px\">静脉</th><th style=\"border:1px solid var(--bio-line);padding:6px\">毛细血管</th></tr>" +
                  "<tr><td style=\"border:1px solid var(--bio-line);padding:6px\">管壁</td><td style=\"border:1px solid var(--bio-line);padding:6px\">厚、弹性大</td><td style=\"border:1px solid var(--bio-line);padding:6px\">较薄、弹性小</td><td style=\"border:1px solid var(--bio-line);padding:6px\">最薄（一层细胞）</td></tr>" +
                  "<tr><td style=\"border:1px solid var(--bio-line);padding:6px\">管腔</td><td style=\"border:1px solid var(--bio-line);padding:6px\">较小</td><td style=\"border:1px solid var(--bio-line);padding:6px\">较大</td><td style=\"border:1px solid var(--bio-line);padding:6px\">最小（红细胞单行）</td></tr>" +
                  "<tr><td style=\"border:1px solid var(--bio-line);padding:6px\">血流方向</td><td style=\"border:1px solid var(--bio-line);padding:6px\">心脏 → 全身</td><td style=\"border:1px solid var(--bio-line);padding:6px\">全身 → 心脏</td><td style=\"border:1px solid var(--bio-line);padding:6px\">动脉端 → 静脉端</td></tr>" +
                  "<tr><td style=\"border:1px solid var(--bio-line);padding:6px\">功能</td><td style=\"border:1px solid var(--bio-line);padding:6px\">送血出心脏</td><td style=\"border:1px solid var(--bio-line);padding:6px\">送血回心脏</td><td style=\"border:1px solid var(--bio-line);padding:6px\">物质交换</td></tr>" +
                  "</table>" },
                { type: "note", text: "动手：遮住表格——哪种血管壁最厚？哪种最适合交换？为什么？" }
              ],
              point: "动脉送出、静脉送回、毛细血管交换。"
            },
            /* ============ p3：心脏四腔 + 剖面交互 ============ */
            {
              id: "b06.2.1-p3",
              kind: "explain",
              title: "心脏：四腔两\"泵\"",
              blocks: [
                { type: "lead", text: "心脏有四个\"房间\"，哪间\"屋子\"的墙最厚？" },
                { type: "text", html: "心脏有四个腔：左心房、左心室、右心房、右心室。同侧的心房和心室相通，左右两边不直接相通。" },
                { type: "text", html: "左心室的壁最厚——它要把血液泵到全身，活最重，墙就得最结实。右心室只把血泵到肺，心房只把血送进心室，墙都薄一些。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<div style=\"font-size:0.85rem;color:var(--bio-ink-soft)\">点腔室，看壁厚和血流方向（模式图：非等比、非实物）</div>" +
                  "<svg viewBox=\"0 0 340 240\" width=\"100%\" role=\"img\" aria-label=\"心脏剖面模式图\" style=\"max-width:360px;display:block;margin:6px auto\">" +
                  "<g font-size=\"14.4\" text-anchor=\"middle\">" +
                  "<rect id=\"bioB06H-RA\" x=\"40\" y=\"30\" width=\"110\" height=\"70\" rx=\"14\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" onclick=\"BIO_B06.heart('RA')\"/>" +
                  "<text x=\"95\" y=\"70\" style=\"fill:var(--bio-text);pointer-events:none\">右心房</text>" +
                  "<rect id=\"bioB06H-RV\" x=\"40\" y=\"120\" width=\"110\" height=\"90\" rx=\"14\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"4\" onclick=\"BIO_B06.heart('RV')\"/>" +
                  "<text x=\"95\" y=\"168\" style=\"fill:var(--bio-text);pointer-events:none\">右心室</text>" +
                  "<rect id=\"bioB06H-LA\" x=\"190\" y=\"30\" width=\"110\" height=\"70\" rx=\"14\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" onclick=\"BIO_B06.heart('LA')\"/>" +
                  "<text x=\"245\" y=\"70\" style=\"fill:var(--bio-text);pointer-events:none\">左心房</text>" +
                  "<rect id=\"bioB06H-LV\" x=\"190\" y=\"120\" width=\"110\" height=\"90\" rx=\"14\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"7\" onclick=\"BIO_B06.heart('LV')\"/>" +
                  "<text x=\"245\" y=\"168\" style=\"fill:var(--bio-text);pointer-events:none\">左心室</text>" +
                  "<text x=\"170\" y=\"228\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</g></svg>" +
                  "<div id=\"bioB06Heart\" style=\"min-height:4.2em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点上面的腔室，看它的壁厚和血流去向。</div>" +
                  "</div>" },
                { type: "note", text: "动手：不看上面说出四个腔的名字，再说出为什么左心室壁最厚。" }
              ],
              point: "四腔：左右心房/心室；左心室壁最厚（泵全身）。"
            },
            /* ============ p4：瓣膜 + 误区专治 ============ */
            {
              id: "b06.2.1-p4",
              kind: "explain",
              title: "瓣膜：防倒流的\"单向门\"",
              blocks: [
                { type: "lead", text: "心脏不停地挤压，血为什么不会倒流？" },
                { type: "text", html: "先认词——瓣膜：心脏和静脉里防止血液倒流的\"单向门\"，只能朝一个方向开。" },
                { type: "text", html: "两类瓣膜：① 房室瓣——在心房和心室之间，保证血只能从心房流向心室；② 动脉瓣——在心室和动脉之间，保证血只能从心室流向动脉。门只能朝一个方向开，血就只能朝一个方向走。" },
                { type: "trap", text: "⚠️ 全书最爱考的\"例外\"：\"静脉里流的都是静脉血\"错——肺静脉流的是动脉血！按含氧量定义，不按血管名。" },
                { type: "trap", text: "⚠️ \"左心房壁最厚\"错——左心室壁最厚（它要把血泵到全身，活最重）。" },
                { type: "note", text: "三问自查——瓣膜是什么？两类瓣膜各在哪、管什么方向？肺静脉里流的是什么血？（答案在本页）" }
              ],
              point: "瓣膜防倒流；肺静脉流动脉血（按含氧量定义）。"
            }
          ]
        },
        {
          id: "b06.2.2",
          title: "血液循环",
          prereq: "血液血管心脏",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：双循环路径闯关 ============ */
            {
              id: "b06.2.2-p1",
              kind: "explain",
              title: "双循环路径闯关",
              blocks: [
                { type: "lead", text: "一滴血从右心室出发，走完一圈要经过哪些站？按顺序点出来。" },
                { type: "text", html: "两条路：① 肺循环——右心室 → 肺动脉 → 肺部毛细血管 → 肺静脉 → 左心房；② 体循环——左心室 → 主动脉 → 全身毛细血管 → 腔静脉 → 右心房。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<div style=\"font-size:0.85rem;color:var(--bio-ink-soft)\">按血液流动顺序点选 10 个站点（模式图：非等比、非实物）</div>" +
                  "<svg id=\"bioB06Circ\" viewBox=\"0 0 360 300\" width=\"100%\" role=\"img\" aria-label=\"血液循环路径闯关\" style=\"max-width:400px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<circle cx=\"180\" cy=\"40\" r=\"24\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"肺\" onclick=\"BIO_B06.circ('肺',this)\"/><text x=\"180\" y=\"45\" style=\"fill:var(--bio-text);pointer-events:none\">肺</text>" +
                  "<circle cx=\"80\" cy=\"90\" r=\"24\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"肺动脉\" onclick=\"BIO_B06.circ('肺动脉',this)\"/><text x=\"80\" y=\"95\" style=\"fill:var(--bio-text);pointer-events:none\">肺动脉</text>" +
                  "<circle cx=\"280\" cy=\"90\" r=\"24\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"肺静脉\" onclick=\"BIO_B06.circ('肺静脉',this)\"/><text x=\"280\" y=\"95\" style=\"fill:var(--bio-text);pointer-events:none\">肺静脉</text>" +
                  "<circle cx=\"80\" cy=\"170\" r=\"24\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"右心室\" onclick=\"BIO_B06.circ('右心室',this)\"/><text x=\"80\" y=\"175\" style=\"fill:var(--bio-text);pointer-events:none\">右心室</text>" +
                  "<circle cx=\"280\" cy=\"170\" r=\"24\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"左心房\" onclick=\"BIO_B06.circ('左心房',this)\"/><text x=\"280\" y=\"175\" style=\"fill:var(--bio-text);pointer-events:none\">左心房</text>" +
                  "<circle cx=\"280\" cy=\"250\" r=\"24\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"左心室\" onclick=\"BIO_B06.circ('左心室',this)\"/><text x=\"280\" y=\"255\" style=\"fill:var(--bio-text);pointer-events:none\">左心室</text>" +
                  "<circle cx=\"180\" cy=\"250\" r=\"24\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"主动脉\" onclick=\"BIO_B06.circ('主动脉',this)\"/><text x=\"180\" y=\"255\" style=\"fill:var(--bio-text);pointer-events:none\">主动脉</text>" +
                  "<circle cx=\"80\" cy=\"250\" r=\"24\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"右心房\" onclick=\"BIO_B06.circ('右心房',this)\"/><text x=\"80\" y=\"255\" style=\"fill:var(--bio-text);pointer-events:none\">右心房</text>" +
                  "<rect x=\"130\" y=\"120\" width=\"100\" height=\"48\" rx=\"12\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"全身\" onclick=\"BIO_B06.circ('全身',this)\"/><text x=\"180\" y=\"149\" style=\"fill:var(--bio-text);pointer-events:none\">全身毛细血管</text>" +
                  "<rect x=\"20\" y=\"201\" width=\"60\" height=\"44\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"腔静脉\" onclick=\"BIO_B06.circ('腔静脉',this)\"/><text x=\"50\" y=\"228\" style=\"fill:var(--bio-text);pointer-events:none;font-size:12.48\">腔静脉</text>" +
                  "<text x=\"180\" y=\"292\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</g></svg>" +
                  "<div><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B06.circReset()\">重新闯关</button></div>" +
                  "<div id=\"bioB06CircMsg\" style=\"min-height:3.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">起点：右心室。点\"右心室\"开始。</div>" +
                  "</div>" },
                { type: "trap", text: "⚠️ \"体循环和肺循环先后进行\"错——同时进行！心脏一跳，左右两边一起工作，两条路同时走。" },
                { type: "note", text: "动手：闯关后遮住图，复述 10 个站点。" }
              ],
              point: "肺循环+体循环；从右心室出发走一圈；两边同时进行。"
            },
            /* ============ p2：血压与心率 ============ */
            {
              id: "b06.2.2-p2",
              kind: "explain",
              title: "血压与心率",
              blocks: [
                { type: "lead", text: "体检单上的 \"120/80\" 是什么意思？" },
                { type: "text", html: "先认词——收缩压：心室收缩时动脉血压的最高值（俗称\"高压\"）；舒张压：心室舒张时动脉血压的最低值。\"120/80\"就是收缩压 120、舒张压 80，单位 mmHg（毫米汞柱）。" },
                { type: "text", html: "正常范围意识：体检指标给的是参考范围，不是判决书——数值是身体的\"仪表盘\"读数，只帮助了解大致状态，不做诊断暗示，异常请咨询医生。" },
                { type: "text", html: "心率：每分钟心跳的次数。安静时慢、运动后快——心脏按需调整输出，跟呼吸一样，是\"按需供应\"。" },
                { type: "mathlink", text: "数学呼应（奠基）：代数 ch00——血压 mmHg、心率\"次/分\"，都是数量级和单位的直觉，代数 ch00 细讲。" },
                { type: "note", text: "三问自查——收缩压/舒张压各指什么时候的血压？\"120/80\"的单位是什么？（答案在本页）" }
              ],
              point: "收缩压/舒张压（mmHg）；参考范围意识；心率次/分。"
            },
            /* ============ p3：误区专治（同时进行） ============ */
            {
              id: "b06.2.2-p3",
              kind: "explain",
              title: "专治：\"先后进行\"错",
              blocks: [
                { type: "lead", text: "心脏先走完肺循环，再走体循环？——错！" },
                { type: "text", html: "心脏的左、右两边是同时工作的：左心室把血泵向全身的同时，右心室正把血泵向肺。体循环和肺循环同时进行，不是排队。" },
                { type: "text", html: "想想：如果先后进行，肺循环走完才能走体循环，那身体岂不是要\"等\"肺先换好气？实际是一边送货、一边进货，两条线并行。" },
                { type: "trap", text: "⚠️ \"体循环和肺循环先后进行\"错——同时进行！心脏一跳，两边一起走。（本课核心误区，再认一遍）" },
                { type: "note", text: "动手：用自己的话解释——为什么\"先后进行\"在逻辑上就讲不通？" }
              ],
              point: "体循环肺循环同时进行（心脏左右两边同时工作）。"
            }
          ]
        },
        {
          id: "b06.2.3",
          title: "尿的形成与排出",
          prereq: "血液循环",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：肾单位 ============ */
            {
              id: "b06.2.3-p1",
              kind: "explain",
              title: "肾单位：尿的\"生产线\"",
              blocks: [
                { type: "lead", text: "尿是在哪里\"生产\"出来的？——肾脏里的\"车间\"叫肾单位。" },
                { type: "text", html: "先认词——肾单位：形成尿液的基本单位（肾小球、肾小囊、肾小管）。" },
                { type: "text", html: "两步走：① 肾小球滤过——血液中的小分子物质滤到肾小囊腔，形成原尿；② 肾小管重吸收——原尿中的有用物质回到血液，剩下形成尿液。" },
                { type: "text", html: "先认词——原尿：肾小球滤过到肾小囊腔的液体（有葡萄糖、无大分子蛋白质）。先认词——重吸收：肾小管把原尿中的有用物质（全部葡萄糖、大部分水、部分无机盐）吸收回血液。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B06.nephron(1,this)\">① 肾小球滤过</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B06.nephron(2,this)\">② 肾小管重吸收</button>" +
                  "<div style=\"font-size:0.85rem;color:var(--bio-ink-soft)\">模式图：非等比、非实物</div>" +
                  "<div id=\"bioB06Nephron\" style=\"min-height:4.5em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点按钮，看两道工序。</div>" +
                  "</div>" },
                { type: "note", text: "动手：遮住上面复述\"滤过→原尿→重吸收→尿液\"，解释三个新词。" }
              ],
              point: "肾单位：肾小球滤过→原尿；肾小管重吸收→尿液。"
            },
            /* ============ p2：三液对比 ============ */
            {
              id: "b06.2.3-p2",
              kind: "explain",
              title: "三液对比：血浆 / 原尿 / 尿液",
              blocks: [
                { type: "lead", text: "原尿和尿液，到底差在哪？" },
                { type: "text", html: "<table style=\"width:100%;border-collapse:collapse;font-size:0.9rem;margin:8px 0\" aria-label=\"血浆原尿尿液成分对比\">" +
                  "<tr style=\"background:var(--bio-panel)\"><th style=\"border:1px solid var(--bio-line);padding:6px\">成分</th><th style=\"border:1px solid var(--bio-line);padding:6px\">血浆</th><th style=\"border:1px solid var(--bio-line);padding:6px\">原尿</th><th style=\"border:1px solid var(--bio-line);padding:6px\">尿液</th></tr>" +
                  "<tr><td style=\"border:1px solid var(--bio-line);padding:6px\">大分子蛋白质</td><td style=\"border:1px solid var(--bio-line);padding:6px\">有</td><td style=\"border:1px solid var(--bio-line);padding:6px\">无（滤不过去）</td><td style=\"border:1px solid var(--bio-line);padding:6px\">无</td></tr>" +
                  "<tr><td style=\"border:1px solid var(--bio-line);padding:6px\">葡萄糖</td><td style=\"border:1px solid var(--bio-line);padding:6px\">有</td><td style=\"border:1px solid var(--bio-line);padding:6px\">有</td><td style=\"border:1px solid var(--bio-line);padding:6px\">无（全被重吸收）</td></tr>" +
                  "<tr><td style=\"border:1px solid var(--bio-line);padding:6px\">尿素</td><td style=\"border:1px solid var(--bio-line);padding:6px\">有</td><td style=\"border:1px solid var(--bio-line);padding:6px\">有</td><td style=\"border:1px solid var(--bio-line);padding:6px\">有（浓度高）</td></tr>" +
                  "<tr><td style=\"border:1px solid var(--bio-line);padding:6px\">水/无机盐</td><td style=\"border:1px solid var(--bio-line);padding:6px\">有</td><td style=\"border:1px solid var(--bio-line);padding:6px\">有</td><td style=\"border:1px solid var(--bio-line);padding:6px\">部分被重吸收</td></tr>" +
                  "</table>" },
                { type: "trap", text: "⚠️ \"尿液=原尿浓缩版\"错——重吸收有选择：全部葡萄糖、大部分水、部分无机盐被重吸收，有用的留下、废物排出，不是简单浓缩。" },
                { type: "note", text: "动手：遮住表格回答——原尿里有蛋白质吗？尿液里有葡萄糖吗？为什么？" }
              ],
              point: "三液对比；重吸收有选择，不是简单浓缩。"
            },
            /* ============ p3：排尿的意义 ============ */
            {
              id: "b06.2.3-p3",
              kind: "explain",
              title: "排尿的意义",
              blocks: [
                { type: "lead", text: "排尿只是\"倒垃圾\"吗？" },
                { type: "text", html: "排尿排出废物：尿素等代谢废物随尿液排出体外，不让它们在体内堆积。" },
                { type: "text", html: "排尿调节平衡：通过排出多余的水和无机盐，调节体内水和无机盐的平衡，维持体内环境的稳定（内环境：细胞直接生活的液体环境，也就是细胞外液）。" },
                { type: "text", html: "排尿是排泄的主要途径。排泄还有两条小路：皮肤排汗、呼吸排出二氧化碳——但尿是主力。" },
                { type: "note", text: "一句话总结：排尿=排出废物+调节水盐平衡。说出排泄的三条途径。" }
              ],
              point: "排尿：排出废物、调节水盐平衡；排泄三条途径。"
            }
          ]
        },
        {
          id: "b06.2.4",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b06.2.4-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b06.1.1：呼吸道（鼻/咽/喉/气管/支气管：温暖/湿润/清洁）；肺泡形配其用（壁薄/弹性/毛细血管网；认旧友 b05.1.3）；肺通气=呼吸运动（呼吸肌→胸廓→肺，因果别反）；肺泡内/组织内气体交换；呼吸≠呼吸作用。b06.2.1：血液（血浆+三类血细胞；血红蛋白运氧；成熟红细胞无核）；三种血管（动脉/静脉/毛细血管）；心脏四腔（左心室壁最厚）；瓣膜防倒流（肺静脉流动脉血）。b06.2.2：肺循环+体循环（从右心室出发走一圈；同时进行）；收缩压/舒张压（mmHg；参考范围意识）；心率；代数 ch00 奠基。b06.2.3：肾单位（肾小球滤过→原尿；肾小管重吸收→尿液）；三液对比（重吸收有选择）；排尿的意义。" },
                { type: "choice", stem: "肺泡适合气体交换的特点不包括？",
                  options: ["肺泡壁很薄，只有一层上皮细胞", "肺泡外包绕着丰富的毛细血管", "肺泡数量很多，总面积大", "肺泡能主动收缩进行呼吸运动"], answer: 3,
                  tip: "肺泡自己没有肌肉、不能主动收缩——扩张靠呼吸肌→胸廓→肺的因果链（b06.1.1 第 2、3 页）。" },
                { type: "choice", stem: "吸气时，正确的因果顺序是？",
                  options: ["肺扩张→胸廓扩大→呼吸肌收缩", "呼吸肌收缩→胸廓扩大→肺扩张", "胸廓扩大→呼吸肌收缩→肺扩张", "肺扩张→呼吸肌收缩→胸廓扩大"], answer: 1,
                  tip: "呼吸肌收缩 → 胸廓扩大 → 肺被动扩张，因果别反（b06.1.1 第 3 页）。" },
                { type: "choice", stem: "下列血管中，管壁最薄、血流最慢的是？",
                  options: ["动脉", "静脉", "毛细血管", "主动脉"], answer: 2,
                  tip: "毛细血管壁最薄（一层细胞）、血流最慢，专为物质交换而生（b06.2.1 第 2 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b06.2.4-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "choice", stem: "肺静脉里流动的是？",
                  options: ["静脉血", "动脉血", "原尿", "淋巴"], answer: 1,
                  tip: "全书最爱考的例外：肺静脉流动脉血——按含氧量定义，不按血管名（b06.2.1 第 4 页）。" },
                { type: "choice", stem: "关于体循环和肺循环，正确的是？",
                  options: ["先进行肺循环，再进行体循环", "先进行体循环，再进行肺循环", "两者同时进行", "只有运动时才同时进行"], answer: 2,
                  tip: "心脏左右两边同时工作，两条路同时走（b06.2.2 第 1、3 页）。" },
                { type: "choice", stem: "尿液中不含葡萄糖是正常的，因为？",
                  options: ["肾小球把葡萄糖滤掉了", "肾小管把葡萄糖全部重吸收了", "葡萄糖被膀胱分解了", "原尿中本来就没有葡萄糖"], answer: 1,
                  tip: "重吸收有选择：全部葡萄糖被重吸收回血液（b06.2.3 第 1、2 页）。" },
                { type: "choice", stem: "\"呼吸\"与\"呼吸作用\"的关系，正确的是？",
                  options: ["两者是同一个概念", "呼吸是肺通气，呼吸作用是细胞内的氧化分解", "呼吸作用是肺通气，呼吸是细胞内的氧化分解", "呼吸只在白天，呼吸作用只在晚上"], answer: 1,
                  tip: "\"呼吸\"=肺通气（喘气）；\"呼吸作用\"=细胞内氧化分解（回看 b06.1.1 第 4 页）。" }
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
 * b06 内联交互助手（纯 HTML 内联 handler，不新增引擎组件，
 * b03/b13/b21 先例）。命名空间 window.BIO_B06。
 * 呼吸运动因果链 / 气体交换两处切换 / 心脏剖面点选 /
 * 双循环路径闯关（会话内记分，不写 localStorage）/
 * 肾单位两步演示。
 * ============================================================ */
window.BIO_B06 = (function () {
  function say(id, html) { var m = document.getElementById(id); if (m) m.innerHTML = html; }
  function markBtn(btn) {
    if (!btn) return;
    var sibs = btn.parentNode.querySelectorAll("button");
    for (var i = 0; i < sibs.length; i++) sibs[i].style.outline = "";
    btn.style.outline = "3px solid var(--bio-highlight)";
    btn.style.outlineOffset = "1px";
  }
  /* ---------- 呼吸运动因果链 ---------- */
  var BREATH = {
    1: "① <b>呼吸肌收缩</b>：肋间肌、膈肌收缩——这是吸气的起点，动力来自肌肉，不是肺自己。",
    2: "② <b>胸廓扩大</b>：胸廓容积变大——注意，是胸廓先扩大，肺还没动。",
    3: "③ <b>肺扩张进气</b>：肺被动扩张，肺内气压下降，外界气体被压进来。呼气时反过来：呼吸肌舒张 → 胸廓缩小 → 肺回缩。"
  };
  /* ---------- 气体交换 ---------- */
  var GAS = {
    lung: "<b>肺泡内交换</b>：肺泡 O₂ 多 → 扩散进血液；血液 CO₂ 多 → 扩散进肺泡。结果：<b>静脉血 → 动脉血</b>。氧气总是从多的地方往少的地方扩散。",
    tissue: "<b>组织内交换</b>：血液 O₂ → 组织细胞；组织细胞 CO₂ → 血液。结果：<b>动脉血 → 静脉血</b>。"
  };
  /* ---------- 心脏剖面 ---------- */
  var HEART = {
    RA: "<b>右心房</b>：壁最薄的一档。接收上、下腔静脉送回的静脉血 → 送入右心室。",
    RV: "<b>右心室</b>：壁中等。把静脉血泵入肺动脉 → 肺（肺循环起点）。",
    LA: "<b>左心房</b>：壁最薄的一档。接收肺静脉送回的动脉血 → 送入左心室。",
    LV: "<b>左心室</b>：壁最厚！把动脉血泵入主动脉 → 全身（活最重，墙最结实）。"
  };
  /* ---------- 双循环闯关 ---------- */
  var ORDER = ["右心室", "肺动脉", "肺", "肺静脉", "左心房", "左心室", "主动脉", "全身", "腔静脉", "右心房"];
  var NUM = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];
  var ci = 0;
  function circNodes() {
    var svg = document.getElementById("bioB06Circ");
    return svg ? svg.querySelectorAll("[data-st]") : [];
  }
  /* ---------- 肾单位 ---------- */
  var NEPH = {
    1: "① <b>肾小球滤过</b>：血液流经肾小球，水、无机盐、葡萄糖、尿素等被滤过到肾小囊腔 → 形成<b>原尿</b>。大分子蛋白质和血细胞滤不过去。",
    2: "② <b>肾小管重吸收</b>：原尿流经肾小管，<b>全部葡萄糖、大部分水、部分无机盐</b>被重吸收回血液 → 剩下形成尿液。重吸收有选择，不是简单浓缩。"
  };
  return {
    breath: function (n, btn) { markBtn(btn); say("bioB06Breath", BREATH[n] || ""); },
    gas: function (w, btn) { markBtn(btn); say("bioB06Gas", GAS[w] || ""); },
    heart: function (p) {
      var map = { RA: "bioB06H-RA", RV: "bioB06H-RV", LA: "bioB06H-LA", LV: "bioB06H-LV" };
      Object.keys(map).forEach(function (k) {
        var s = document.getElementById(map[k]);
        if (s) s.style.stroke = (k === p) ? "var(--bio-highlight)" : "var(--bio-ink-soft)";
      });
      say("bioB06Heart", HEART[p] || "");
    },
    circ: function (st, el) {
      if (ci >= ORDER.length) return;
      if (st === ORDER[ci]) {
        if (el) {
          el.style.fill = "var(--bio-highlight)";
          var t = el.nextElementSibling;
          if (t && t.tagName && t.tagName.toLowerCase() === "text") {
            t.textContent = NUM[ci] + st;
            t.style.fill = "var(--bio-on-hl)";
          }
        }
        ci++;
        if (ci >= ORDER.length) {
          say("bioB06CircMsg", "🎉 <b>走完一圈！</b>右心室 → 肺动脉 → 肺 → 肺静脉 → 左心房 → 左心室 → 主动脉 → 全身 → 腔静脉 → 右心房 →（回到右心室）。记住：<b>体循环和肺循环同时进行，不是先后！</b>");
        } else {
          say("bioB06CircMsg", "✓ " + NUM[ci - 1] + st + " —— 下一站：<b>" + ORDER[ci] + "</b>");
        }
      } else {
        say("bioB06CircMsg", "再想想：现在应该点「<b>" + ORDER[ci] + "</b>」。提示：血液从右心室出来，先去肺\"换气\"。");
      }
    },
    circReset: function () {
      ci = 0;
      var nodes = circNodes();
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].style.fill = "var(--bio-panel)";
        nodes[i].style.stroke = "var(--bio-ink-soft)";
        var t = nodes[i].nextElementSibling;
        if (t && t.tagName && t.tagName.toLowerCase() === "text") { t.style.fill = ""; }
      }
      /* 恢复站点名（去掉序号） */
      var svg = document.getElementById("bioB06Circ");
      if (svg) {
        var texts = svg.querySelectorAll("[data-st] + text");
        for (var j = 0; j < texts.length; j++) {
          var stn = texts[j].previousElementSibling.getAttribute("data-st");
          /* WARN-E1 修复：「全身」站初始标签为「全身毛细血管」，data-st 只有「全身」，须写回全称 */
          texts[j].textContent = (stn === "全身") ? "全身毛细血管" : stn;
        }
      }
      say("bioB06CircMsg", "起点：右心室。点\"右心室\"开始。");
    },
    nephron: function (n, btn) { markBtn(btn); say("bioB06Nephron", NEPH[n] || ""); }
  };
})();
