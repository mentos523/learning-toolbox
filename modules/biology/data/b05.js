/* ============================================================
 * 学习工具箱 · 生物 · 第五章数据（生物 P8 生产队 2026-10-19）
 *
 * 课：b05.1.1 营养物质与消化系统（4 页）/ b05.1.2 食物的消化
 *     （3 页）/ b05.1.3 营养物质的吸收与合理营养（3 页）/
 *     b05.1.4 本章小结与习题（2 页）。共 12 页。
 * 交互：零新组件（biology-engine.js diff 仅 B10 enzyme-lab）；
 * 消化系统拼图 / 小肠对问连线 / 皱襞→绒毛三级放大 /
 * 唾液淀粉酶温度滑块，均为纯 HTML 内联 handler（b03/b21
 * 先例：不新增引擎组件、不新增落点类型；window.BIO_B05
 * 助手函数）；B10 锁钥小游戏段挂载于 b05.1.2-p3
 * （recordKey=bio_enzyme_b05.1.2，tempLab:false 只出锁钥段，
 * 首立在 b13.1.2）。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 模式图声明：「模式图：非等比、非实物」（BIO-R32）
 * - 胆汁口径：「胆汁不含消化酶」（b05.1.1-p1，缺=WARN；
 *   BIO-R06）；「消化脂肪」一律写「乳化脂肪」
 * - 「形配其用」（b05.1.3-p1，BIO-R11，缺=FAIL；改字=FAIL）
 * - 「虚拟实验：现实中须××」（BIO-R35，××逐页写实）
 * - 直引号（中文引号用 \" \" 转义）；type:"text" 的块用
 *   html 键（P4 教训）
 *
 * 门禁⑧：新术语首现即定义——胆汁/乳化（b05.1.1-p1）/
 * 消化腺（b05.1.1-p2）/吸收（b05.1.3-p1）/平衡膳食
 * （b05.1.3-p3）。注：b05.1.2 中\"唾液淀粉酶/消化酶\"仅为
 * 物质名称出现、非术语定义（b21 先例），\"酶\"的正式定义
 * 首现仍在 b13.1.1-p2；\"专一性\"在 b05.1.2-p3 仅为现象预告，
 * 正式定义首现在 b13.1.2-p1。
 * 门禁⑨：深链只用已生产课号 + 本批 b05↔b13 互链；
 * b04/b06/b09/b11/b12 未生产，只纯文本，不挂深链。
 * 门禁⑩：b05.1.2 专一性预告为同批兑现（b13.1.2 落点 +
 * 本页 B10 锁钥段），不记 drafted，台账写明 in-batch 兑现点；
 * b05.1.3-p3 辨析①回填链 4 条纯文本预告 drafted
 * （b06.1.1/b09.2.1/b11.1.3/b12.1.3）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b05"] = {
  id: "b05",
  units: [
    {
      id: "b05.1",
      title: "营养与消化",
      lessons: [
        {
          id: "b05.1.1",
          title: "营养物质与消化系统",
          prereq: "b04 小结（纯文本前链）",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：六大营养物质 + 胆汁口径 ============ */
            {
              id: "b05.1.1-p1",
              kind: "explain",
              title: "营养物质面面观",
              blocks: [
                { type: "lead", text: "为何吃饭？为\"吃对\"，不只\"吃饱\"。" },
                { type: "text", html: "六大营养物质：糖类、脂肪、蛋白质供能；水、无机盐、维生素不供能，缺一不可。（化学课把这六类称\"六大营养素\"，其中的\"油脂\"就是这里的脂肪。）" },
                { type: "text", html: "对照——缺钙：佝偻病/骨质疏松（晒太阳、喝牛奶）；缺铁：缺铁性贫血（动物肝脏、瘦肉）；缺维生素 C：坏血病（新鲜蔬果）。" },
                { type: "text", html: "先认词——胆汁：肝脏分泌的黄绿色消化液。先认词——乳化：大油滴打散成微小油滴，非化学分解。" },
                { type: "text", html: "逐字——胆汁不含消化酶。" },
                { type: "trap", text: "⚠️ 别搞混：\"胆汁消化脂肪\"错——胆汁只乳化脂肪（大油滴→小油滴），无消化酶！" },
                { type: "note", text: "三问自查——六大营养物质能背吗？缺铁/缺维生素 C 补啥？胆汁含消化酶吗？" }
              ],
              point: "六大营养物质；胆汁无消化酶，只乳化脂肪。"
            },
            /* ============ p2：消化道/消化腺 + 拼图交互 ============ */
            {
              id: "b05.1.1-p2",
              kind: "explain",
              title: "消化系统的组成",
              blocks: [
                { type: "lead", text: "食物从嘴到\"出口\"，要经过一条\"流水线\"——先把它拼出来。" },
                { type: "text", html: "先认词——消化腺：分泌消化液的腺体。消化系统 = 消化道 + 消化腺。" },
                { type: "text", html: "消化道（食物的通道）：口腔→咽→食道→胃→小肠→大肠→肛门。消化腺（分泌消化液）：唾液腺、胃腺、肝脏、胰腺、肠腺——消化液里大多含有消化酶（胆汁除外！）。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 210\" width=\"100%\" role=\"img\" aria-label=\"消化系统组成示意\" style=\"max-width:380px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<ellipse cx=\"170\" cy=\"26\" rx=\"46\" ry=\"16\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"2\"/>" +
                  "<text x=\"170\" y=\"31\" style=\"fill:var(--bio-text)\">口腔</text>" +
                  "<rect x=\"162\" y=\"46\" width=\"16\" height=\"26\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"2\"/>" +
                  "<text x=\"205\" y=\"62\" text-anchor=\"start\" style=\"fill:var(--bio-ink-soft)\">食道</text>" +
                  "<path d=\"M150,76 q-24,10 -16,34 q6,18 30,16 q22,-2 20,-20 q-2,-16 -14,-22 z\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"2\"/>" +
                  "<text x=\"120\" y=\"112\" text-anchor=\"end\" style=\"fill:var(--bio-ink-soft)\">胃</text>" +
                  "<path d=\"M164,120 q60,6 40,40 q-14,24 -50,22 q-40,-2 -34,-34 q4,-22 44,-28\" style=\"fill:none;stroke:var(--bio-target)\" stroke-width=\"2\"/>" +
                  "<text x=\"238\" y=\"168\" text-anchor=\"start\" style=\"fill:var(--bio-target)\">小肠（盘曲）</text>" +
                  "<path d=\"M120,150 h100 v34 h-100 z\" style=\"fill:none;stroke:var(--bio-ink-soft)\" stroke-width=\"2\" stroke-dasharray=\"5,3\"/>" +
                  "<text x=\"170\" y=\"200\" style=\"fill:var(--bio-ink-soft)\">大肠（框住小肠）</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"208\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-weight:700;margin-bottom:6px\">🧩 消化系统拼图：先点词库里的词，再点对应的槽位</div>" +
                  "<div style=\"font-size:12.48px;color:var(--bio-ink-soft);margin-bottom:8px\">消化道 7 个槽位（按食物经过顺序）＋消化腺 5 个槽位</div>" +
                  "<div id=\"b05puz-start\"><button type=\"button\" class=\"tb-btn-primary\" style=\"min-height:44px\" onclick=\"BIO_B05.puzStart()\">开始拼图</button></div>" +
                  "<div id=\"b05puz-bank\" style=\"display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px\"></div>" +
                  "<div style=\"display:flex;gap:10px;flex-wrap:wrap\">" +
                  "<div style=\"flex:1;min-width:150px\"><div style=\"font-weight:700;font-size:13.6px;margin-bottom:4px\">消化道</div><div id=\"b05puz-tract\"></div></div>" +
                  "<div style=\"flex:1;min-width:150px\"><div style=\"font-weight:700;font-size:13.6px;margin-bottom:4px\">消化腺</div><div id=\"b05puz-gland\"></div></div>" +
                  "</div>" +
                  "<div id=\"b05puz-msg\" style=\"margin-top:8px;min-height:22px;font-weight:700\"></div>" +
                  "</div>" },
                { type: "note", text: "动手：把 12 个词全部归位——消化道按\"食物流向\"排，消化腺别放进消化道里。" }
              ],
              point: "消化道 7 站＋消化腺 5 腺，拼对才算认识。"
            },
            /* ============ p3：肝脏 + 胆汁误区专治 ============ */
            {
              id: "b05.1.1-p3",
              kind: "explain",
              title: "肝脏：最大的消化腺",
              blocks: [
                { type: "lead", text: "人体最大的消化腺，不是胃——是肝脏。" },
                { type: "text", html: "肝脏是人体最大的消化腺，分泌胆汁。胆汁经导管流入小肠，胆囊负责暂时储存和浓缩胆汁。" },
                { type: "text", html: "洗洁精类比：水洗不掉油盘子上的油，加洗洁精一搓就掉——洗洁精把大油滴打成小油滴。胆汁干的就是这件事：把脂肪大油滴乳化成微小油滴，增大与消化酶的接触面积。" },
                { type: "text", html: "再逐字一次——胆汁不含消化酶。它只乳化脂肪，不分解脂肪；真正的分解靠肠液、胰液里的消化酶。" },
                { type: "trap", text: "⚠️ 别搞混：\"胆汁消化脂肪\"错——胆汁只乳化脂肪（把大油滴打成小油滴），没有消化酶！" },
                { type: "note", text: "三问自查——最大的消化腺是？胆汁由谁分泌、储存在哪？胆汁能分解脂肪吗？（答案在本页）" }
              ],
              point: "肝脏最大；胆汁只乳化、不分解（无消化酶）。"
            },
            /* ============ p4：前链 b04（纯文本）+ 本章预告 ============ */
            {
              id: "b05.1.1-p4",
              kind: "explain",
              title: "本章导览",
              blocks: [
                { type: "lead", text: "上一章讲人从哪里来，这一章讲人怎样\"吃\"出能量。" },
                { type: "text", html: "纯文本前链：b04 人的由来与生殖发育讲了人的生殖和发育——新生命诞生后，要长大、要活动，能量和建筑材料都从食物里来，这就是本章要讲的。" },
                { type: "text", html: "本章路线：b05.1.2 食物的消化（唾液淀粉酶实验＋虚拟温度实验）→ b05.1.3 营养物质的吸收与合理营养（小肠\"形配其用\"＋膳食宝塔）→ b05.1.4 小结习题。" },
                { type: "text", html: "红线预告：b05.1.3 是全书红线辨析①\"形配其用\"的立靶页——学完本章，\"结构与功能相适应\"会反复回来找你。" }
              ],
              point: "b04（纯文本前链）→ 本章：消化 → 吸收 → 合理营养。"
            }
          ]
        },
        {
          id: "b05.1.2",
          title: "食物的消化",
          prereq: "营养物质与消化系统",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：唾液淀粉酶实验 ============ */
            {
              id: "b05.1.2-p1",
              kind: "explain",
              title: "实验：唾液消化淀粉",
              blocks: [
                { type: "lead", text: "馒头越嚼越甜——唾液在\"干活\"吗？" },
                { type: "text", html: "实验：两支试管加等量馒头碎屑，1 号加唾液、2 号加清水（其他全同，37℃ 保温 10 分钟），最后滴碘液。" },
                { type: "text", html: "三原则落点：对照（唾液 vs 清水）→ 单一变量（只差唾液）→ 重复（多做几次，结果才可信）。" },
                { type: "text", html: "<div style=\"display:flex;gap:12px;justify-content:center;margin:8px 0;flex-wrap:wrap\">" +
                  "<div style=\"text-align:center\"><svg viewBox=\"0 0 80 110\" width=\"80\" role=\"img\" aria-label=\"1号试管加唾液\"><rect x=\"30\" y=\"20\" width=\"20\" height=\"70\" rx=\"8\" style=\"fill:none;stroke:var(--bio-membrane)\" stroke-width=\"2\"/><rect x=\"32\" y=\"55\" width=\"16\" height=\"33\" style=\"fill:var(--bio-product)\" opacity=\"0.55\"/><text x=\"40\" y=\"104\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-text)\">1号</text><text x=\"40\" y=\"14\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-organelle)\">不变蓝</text></svg></div>" +
                  "<div style=\"text-align:center\"><svg viewBox=\"0 0 80 110\" width=\"80\" role=\"img\" aria-label=\"2号试管加清水\"><rect x=\"30\" y=\"20\" width=\"20\" height=\"70\" rx=\"8\" style=\"fill:none;stroke:var(--bio-membrane)\" stroke-width=\"2\"/><rect x=\"32\" y=\"55\" width=\"16\" height=\"33\" style=\"fill:var(--bio-target)\" opacity=\"0.55\"/><text x=\"40\" y=\"104\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-text)\">2号</text><text x=\"40\" y=\"14\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-target)\">变蓝</text></svg></div>" +
                  "</div><div style=\"text-align:center;font-size:12.48px;color:var(--bio-ink-soft)\">模式图：非等比、非实物</div>现象（碘液遇淀粉变蓝）：1 号不变蓝，2 号变蓝。结论只许到这一步：唾液能初步消化淀粉，且 37℃ 最适——不许推出\"唾液能消化一切\"，更不涉及\"酶\"是什么（结论不超范围）。" },
                { type: "trap", text: "⚠️ 别搞混：\"唾液消化一切\"错——唾液只初步消化淀粉！" },
                { type: "note", text: "动手：复述三原则。虚拟实验：现实中须规范采集唾液、注意碘液安全、重复多次。" }
              ],
              point: "唾液初步消化淀粉；对照/单一变量/重复。"
            },
            /* ============ p2：温度滑块虚拟实验 ============ */
            {
              id: "b05.1.2-p2",
              kind: "explain",
              title: "温度：消化的\"舒适区\"",
              blocks: [
                { type: "lead", text: "同样的唾液，换个温度，干活还一样卖力吗？" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-weight:700;margin-bottom:6px\">🌡 虚拟温度实验：拖动滑块（其他条件与第 1 页相同）</div>" +
                  "<div style=\"display:flex;align-items:center;gap:8px;flex-wrap:wrap\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;min-width:44px\" onclick=\"BIO_B05.tmpSet(0)\" aria-label=\"温度调到0度\">0℃</button>" +
                  "<input id=\"b05tmp\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" value=\"37\" aria-label=\"温度滑块\" style=\"flex:1;min-width:160px;min-height:44px\" oninput=\"BIO_B05.tmpShow(this.value)\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;min-width:44px\" onclick=\"BIO_B05.tmpSet(100)\" aria-label=\"温度调到100度\">100℃</button>" +
                  "<button type=\"button\" class=\"tb-btn-primary\" style=\"min-height:44px\" onclick=\"BIO_B05.tmpSet(37)\">回到37℃</button>" +
                  "</div>" +
                  "<div style=\"margin:8px 0\">当前温度：<b id=\"b05tmp-v\">37℃</b>　碘液检验：<b id=\"b05tmp-r\">不变蓝（淀粉被分解了）</b></div>" +
                  "<div id=\"b05tmp-c\" style=\"font-size:13.6px;color:var(--bio-ink-soft)\">37℃：唾液淀粉酶最\"舒服\"，干活最卖力。</div>" +
                  "</div>" },
                { type: "text", html: "看现象：37℃ 不变蓝，0℃、100℃ 变蓝。结论不超范围：只证明\"37℃ 最适\"。0℃ 和 100℃ 为什么低？b13.1.2 的 B10 里亲手找答案。注意：这页是简化演示——100℃ 到底能不能'回来'，留到 b13.1.2 的 B10 里亲手验证。" },
                { type: "mathlink", text: "深链：b13.1.2 第 1 页——B10 酶条件实验室，\"烫坏\"与\"冻住\"亲手试（本批互链）。" },
                { type: "text", html: "虚拟实验：现实中须用恒温水浴控制温度，注意高温烫伤安全。" },
                { type: "note", text: "动手：滑块拖到 0℃ 再拖回 37℃——\"低温\"和\"高温\"是一回事吗？" }
              ],
              point: "37℃ 最适；高低温为何不同，B10 里找答案。"
            },
            /* ============ p3：专一性预告同批兑现 + B10 锁钥段 ============ */
            {
              id: "b05.1.2-p3",
              kind: "explain",
              title: "一把锁，一把钥匙",
              blocks: [
                { type: "lead", text: "唾液只初步消化淀粉——胃液里的蛋白酶不管淀粉，胰液里的脂肪酶不管蛋白质，各认各的。" },
                { type: "text", html: "这就是酶的\"专一性\"（先记住现象：唾液只认淀粉；\"酶\"是什么、\"专一性\"的严格定义，b13.1.1–1.2 会正式讲——本页只立现象）。" },
                { type: "text", html: "同批兑现：本页 B10 锁钥小游戏段——亲手配三对\"酶—底物\"，验证\"一把锁只开一把钥匙\"。" },
                { type: "widget", widget: { type: "enzyme-lab", params: {
                  tempLab: false, lockKey: true, irreversDemo: false,
                  recordKey: "bio_enzyme_b05.1.2",
                  pairs: [
                    { enzyme: "唾液淀粉酶", substrate: "淀粉（馒头）" },
                    { enzyme: "胃蛋白酶", substrate: "蛋白质（肉）" },
                    { enzyme: "胰脂肪酶", substrate: "脂肪（油）" }
                  ]
                } } },
                { type: "mathlink", text: "深链：b13.1.2 第 1 页——专一性/高效性/作用条件温和细讲（本批互链，同批兑现）。" },
                { type: "note", text: "三问自查——唾液能消化蛋白质吗？配对成功后出现的小字写了什么？（答案：结合时会微调）" }
              ],
              point: "专一性初见：唾液只认淀粉；B10 锁钥段同批兑现。"
            }
          ]
        },
        {
          id: "b05.1.3",
          title: "营养物质的吸收与合理营养",
          prereq: "食物的消化",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：对问连线 + 形配其用立靶 ============ */
            {
              id: "b05.1.3-p1",
              kind: "explain",
              title: "小肠：为吸收而生",
              blocks: [
                { type: "lead", text: "5–6 米长的小肠是吸收的主战场——每个结构都为\"吸收\"服务。" },
                { type: "text", html: "先认词——吸收：营养物质通过消化道壁进入血液的过程。先认词——相适应：结构的特点恰好适合它承担的功能（只许说\"相适应\"，不许说\"结构决定一切\"）。逐字——形配其用：形（结构）配（适合）其用（功能），本章红线辨析①的立靶口诀。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"font-weight:700;margin-bottom:6px\">🔗 结构—功能对问：点左边结构，再点右边\"它适合干什么\"</div>" +
                  "<div id=\"b05qa-start\" style=\"margin-bottom:8px\"><button type=\"button\" class=\"tb-btn-primary\" style=\"min-height:44px\" onclick=\"BIO_B05.qaStart()\">开始连线</button></div>" +
                  "<div style=\"display:flex;gap:10px;flex-wrap:wrap\">" +
                  "<div style=\"flex:1;min-width:150px\"><div style=\"font-size:13.6px;color:var(--bio-ink-soft);margin-bottom:4px\">结构特征</div><div id=\"b05qa-s\"></div></div>" +
                  "<div style=\"flex:1;min-width:150px\"><div style=\"font-size:13.6px;color:var(--bio-ink-soft);margin-bottom:4px\">它适合干什么</div><div id=\"b05qa-f\"></div></div>" +
                  "</div>" +
                  "<div id=\"b05qa-msg\" style=\"margin-top:8px;min-height:22px;font-weight:700\"></div>" +
                  "</div>" },
                { type: "text", html: "立靶点题：小肠长、皱襞多、绒毛密、壁薄、毛细血管网丰富——每一处\"形\"都配它的\"用\"（吸收）。记住口诀，不许倒置为\"结构决定一切\"。" },
                { type: "note", text: "动手：连线全对后，遮住口诀背一遍\"形配其用\"。" }
              ],
              point: "立靶：形配其用——小肠 5 处结构各配其用。"
            },
            /* ============ p2：三级放大 + 吸收≠消化 ============ */
            {
              id: "b05.1.3-p2",
              kind: "explain",
              title: "皱襞→绒毛：三级放大",
              blocks: [
                { type: "lead", text: "小肠内表面为什么\"皱\"？——三级放大，一级比一级密。" },
                { type: "text", html: "<div style=\"text-align:center;margin:2px 0 4px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"margin:0 6px;min-height:44px\" onclick=\"BIO_B05.zoom(1)\">① 小肠段</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"margin:0 6px;min-height:44px\" onclick=\"BIO_B05.zoom(2)\">② 环形皱襞</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"margin:0 6px;min-height:44px\" onclick=\"BIO_B05.zoom(3)\">③ 小肠绒毛</button>" +
                  "</div>" +
                  "<div id=\"b05z1\"><svg viewBox=\"0 0 340 130\" width=\"100%\" role=\"img\" aria-label=\"小肠段示意\" style=\"max-width:340px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<path d=\"M60,40 q40,-18 80,0 q40,18 80,0 q40,-18 80,0\" style=\"fill:none;stroke:var(--bio-target)\" stroke-width=\"10\" stroke-linecap=\"round\"/>" +
                  "<text x=\"170\" y=\"90\" style=\"fill:var(--bio-text)\">① 小肠：长 5–6 米，盘曲在腹腔里</text>" +
                  "<text x=\"170\" y=\"112\" style=\"fill:var(--bio-ink-soft)\">先猜：这么长，是为了干什么？</text>" +
                  "</g><text x=\"170\" y=\"126\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text></svg></div>" +
                  "<div id=\"b05z2\" style=\"display:none\"><svg viewBox=\"0 0 340 130\" width=\"100%\" role=\"img\" aria-label=\"环形皱襞示意\" style=\"max-width:340px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<path d=\"M40,60 q20,-34 40,0 q20,34 40,0 q20,-34 40,0 q20,34 40,0 q20,-34 40,0\" style=\"fill:none;stroke:var(--bio-target)\" stroke-width=\"4\"/>" +
                  "<rect x=\"30\" y=\"60\" width=\"280\" height=\"26\" style=\"fill:var(--bio-target)\" opacity=\"0.12\"/>" +
                  "<text x=\"170\" y=\"108\" style=\"fill:var(--bio-text)\">② 内表面布满环形皱襞</text>" +
                  "</g><text x=\"170\" y=\"126\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text></svg></div>" +
                  "<div id=\"b05z3\" style=\"display:none\"><svg viewBox=\"0 0 340 140\" width=\"100%\" role=\"img\" aria-label=\"小肠绒毛示意\" style=\"max-width:340px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<path d=\"M60,110 L60,50 M110,110 L110,44 M160,110 L160,52 M210,110 L210,44 M260,110 L260,54\" style=\"stroke:var(--bio-target)\" stroke-width=\"14\" stroke-linecap=\"round\"/>" +
                  "<path d=\"M60,110 L60,50 M160,110 L160,52 M260,110 L260,54\" style=\"stroke:var(--bio-product)\" stroke-width=\"4\"/>" +
                  "<text x=\"170\" y=\"20\" style=\"fill:var(--bio-text)\">③ 绒毛：壁很薄，内有毛细血管网</text>" +
                  "<text x=\"170\" y=\"128\" style=\"fill:var(--bio-ink-soft)\">养分穿过薄壁→进入血液→运走</text>" +
                  "</g><text x=\"170\" y=\"140\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text></svg></div>" },
                { type: "text", html: "点题：三级放大（长→皱襞→绒毛）只为一件事——面积大、吸收多。这就是\"形配其用\"。" },
                { type: "trap", text: "⚠️ 别搞混：\"吸收 = 消化\"错——消化是\"分解\"（大变小），吸收是\"进入血液\"——两回事！" },
                { type: "note", text: "三问自查——三级放大是哪三级？\"壁薄\"配的是哪个\"用\"？（答案在本页）" }
              ],
              point: "三级放大为吸收；消化≠吸收（分解 vs 入血）。"
            },
            /* ============ p3：膳食宝塔 + 辨析①回填链预告 ============ */
            {
              id: "b05.1.3-p3",
              kind: "explain",
              title: "吃得对，才叫营养",
              blocks: [
                { type: "lead", text: "吃饱≠吃对——\"合理营养\"长什么样？看宝塔。" },
                { type: "text", html: "先认词——平衡膳食：各类营养物质种类齐全、数量充足、比例适当的膳食。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 190\" width=\"100%\" role=\"img\" aria-label=\"平衡膳食宝塔示意\" style=\"max-width:340px;display:block;margin:6px auto\">" +
                  "<g font-size=\"12.48\" text-anchor=\"middle\">" +
                  "<polygon points=\"170,8 200,38 140,38\" style=\"fill:var(--bio-aux)\" opacity=\"0.5\"/>" +
                  "<text x=\"170\" y=\"30\" style=\"fill:var(--bio-text)\">油盐（最少）</text>" +
                  "<polygon points=\"140,42 200,42 224,72 116,72\" style=\"fill:var(--bio-substrate)\" opacity=\"0.55\"/>" +
                  "<text x=\"170\" y=\"62\" style=\"fill:var(--bio-text)\">鱼肉蛋奶豆</text>" +
                  "<polygon points=\"116,76 224,76 248,106 92,106\" style=\"fill:var(--bio-organelle)\" opacity=\"0.55\"/>" +
                  "<text x=\"170\" y=\"96\" style=\"fill:var(--bio-text)\">蔬菜水果</text>" +
                  "<polygon points=\"92,110 248,110 272,140 68,140\" style=\"fill:var(--bio-gene)\" opacity=\"0.45\"/>" +
                  "<text x=\"170\" y=\"130\" style=\"fill:var(--bio-text)\">谷薯类（最多）</text>" +
                  "<text x=\"170\" y=\"160\" style=\"fill:var(--bio-ink-soft)\">＋足量饮水＋天天运动</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"182\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "text", html: "怎么用：谷薯类是主食（量最多）；蔬菜水果天天有；鱼肉蛋奶适量；油盐最少。" },
                { type: "text", html: "纯文本预告（辨析①回填链）：\"形配其用\"还会回来——肺泡（b06.1.1 细讲）、鱼鳃（b09.2.1 细讲）、蛋白质的结构与功能（b11.1.3 细讲）、线粒体嵴·叶绿体基粒（b12.1.3 细讲），到时候认旧友。" },
                { type: "note", text: "动手：对照宝塔想想自己昨天的三餐——哪一层超了、哪一层没够？" }
              ],
              point: "平衡膳食看宝塔；辨析①回填链纯文本预告。"
            }
          ]
        },
        {
          id: "b05.1.4",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b05.1.4-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b05.1.1：六大营养物质（缺钙/缺铁/缺维生素 C 生活对照）；消化道 7 站＋消化腺 5 腺；肝脏是最大的消化腺；胆汁不含消化酶、只乳化脂肪。b05.1.2：唾液淀粉酶实验（三原则：对照/单一变量/重复；37℃ 最适）；专一性初见（唾液只认淀粉；B10 锁钥段同批兑现→b13.1.2）。b05.1.3：吸收≠消化；小肠 5 处结构\"形配其用\"（立靶）；三级放大；平衡膳食宝塔；辨析①回填链纯文本预告（b06.1.1/b09.2.1/b11.1.3/b12.1.3)。" },
                { type: "choice", stem: "关于胆汁的说法，正确的是？",
                  options: ["胆汁能把脂肪分解成甘油和脂肪酸", "胆汁不含消化酶，只乳化脂肪", "胆汁由胆囊分泌", "胆汁含多种消化酶"], answer: 1,
                  tip: "胆汁不含消化酶！只乳化脂肪（大油滴→小油滴）（b05.1.1 第 1、3 页）。" },
                { type: "choice", stem: "小肠是吸收的主要部位，下列不属于\"小肠与吸收相适应\"的结构特点是？",
                  options: ["小肠很长（5–6 米）", "内表面有皱襞和绒毛", "绒毛壁薄、毛细血管网丰富", "胃能分泌胃液"], answer: 3,
                  tip: "前三个都是小肠的\"形配其用\"；胃液是胃的事（b05.1.3 第 1 页）。" },
                { type: "choice", stem: "唾液淀粉酶实验中，1 号试管（+唾液）不变蓝、2 号（+清水）变蓝，说明？",
                  options: ["唾液能消化一切营养物质", "唾液能初步消化淀粉", "清水能促进淀粉分解", "碘液能分解淀粉"], answer: 1,
                  tip: "只证明\"唾液初步消化淀粉\"，不许超范围（b05.1.2 第 1 页；结论不超范围）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b05.1.4-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "choice", stem: "\"消化就是吸收\"的说法错在哪？",
                  options: ["消化和吸收都发生在小肠", "消化是分解（大变小），吸收是进入血液，两回事", "消化比吸收更重要", "消化和吸收都需要消化酶"], answer: 1,
                  tip: "消化是\"分解\"，吸收是\"进入血液\"——两回事！（b05.1.3 第 2 页）。" },
                { type: "choice", stem: "下列做法符合\"平衡膳食\"的是？",
                  options: ["只吃蔬菜水果，不吃主食", "谷薯类为主，蔬果天天有，油盐最少", "每天大鱼大肉，多吃才有营养", "不吃早餐，晚餐吃到撑"], answer: 1,
                  tip: "看宝塔：谷薯最多、油盐最少（b05.1.3 第 3 页）。" },
                { type: "choice", stem: "某同学缺铁性贫血，下列食补建议最合理的是？",
                  options: ["多喝牛奶多晒太阳", "多吃动物肝脏、瘦肉", "多吃新鲜蔬菜水果", "多吃谷薯类主食"], answer: 1,
                  tip: "缺铁→补铁：动物肝脏、瘦肉（b05.1.1 第 1 页；牛奶补钙、蔬果补维生素 C）。" },
                { type: "choice", stem: "关于\"形配其用\"，下列理解正确的是？",
                  options: ["结构决定一切，功能不重要", "结构的特点适合它承担的功能", "功能相同的器官结构一定相同", "结构越复杂功能一定越强"], answer: 1,
                  tip: "只许说\"相适应\"，不许说\"结构决定一切\"（b05.1.3 第 1 页）。" }
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
 * b05 内联交互助手（纯 HTML 内联 handler，不新增引擎组件，
 * b03/b21 先例）。命名空间 window.BIO_B05。
 * 拼图/对问由页内"开始"按钮懒构建（SPA 翻页后 DOM 才存在，
 * 不自动 init）。
 * ============================================================ */
(function () {
  "use strict";
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function btn(label, attrs) {
    return "<button type=\"button\" " + attrs + " style=\"min-height:44px;min-width:44px;margin:3px;padding:6px 10px;border:1.5px solid var(--bio-line);border-radius:8px;background:var(--bio-panel);color:var(--bio-text);font-size:15px;cursor:pointer\">" + esc(label) + "</button>";
  }

  /* ---------- 消化系统拼图（b05.1.1-p2） ---------- */
  var TRACT = ["口腔", "咽", "食道", "胃", "小肠", "大肠", "肛门"];
  var GLAND = ["唾液腺", "胃腺", "肝脏", "胰腺", "肠腺"];
  var puz = { sel: null, done: 0 };
  function puzBuild() {
    var bank = document.getElementById("b05puz-bank");
    if (!bank || bank.children.length) return;
    var words = TRACT.concat(GLAND).slice();
    for (var i = words.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = words[i]; words[i] = words[j]; words[j] = t; }
    bank.innerHTML = words.map(function (w) { return btn(w, "data-w=\"" + esc(w) + "\" onclick=\"BIO_B05.puzPick(this)\""); }).join("");
    function slots(id, arr) {
      document.getElementById(id).innerHTML = arr.map(function (a, k) {
        return "<div style=\"margin:4px 0;display:flex;align-items:center;gap:6px\">" +
          "<span style=\"font-size:13px;color:var(--bio-ink-soft);min-width:18px\">" + (k + 1) + "</span>" +
          "<button type=\"button\" data-a=\"" + esc(a) + "\" onclick=\"BIO_B05.puzPlace(this)\" aria-label=\"槽位" + (k + 1) + "\" " +
          "style=\"flex:1;min-height:44px;border:1.5px dashed var(--bio-line);border-radius:8px;background:transparent;color:var(--bio-ink-soft);font-size:15px;cursor:pointer\">待归位</button></div>";
      }).join("");
    }
    slots("b05puz-tract", TRACT); slots("b05puz-gland", GLAND);
  }
  function puzMsg(t, ok) {
    var m = document.getElementById("b05puz-msg"); if (!m) return;
    m.textContent = t; m.style.color = ok ? "var(--bio-organelle)" : "var(--bio-target)";
  }
  puz.pick = function (b) {
    if (b.disabled) return;
    if (puz.sel) puz.sel.style.borderColor = "var(--bio-line)";
    puz.sel = b; b.style.borderColor = "var(--bio-highlight)"; b.style.borderWidth = "2.5px";
    puzMsg("已选\"" + b.getAttribute("data-w") + "\"→ 点一个槽位放进去", true);
  };
  puz.place = function (s) {
    if (!puz.sel) { puzMsg("先点词库里的一个词，再点槽位", false); return; }
    if (s.getAttribute("data-a") === puz.sel.getAttribute("data-w")) {
      s.textContent = puz.sel.getAttribute("data-w");
      s.style.borderStyle = "solid"; s.style.borderColor = "var(--bio-organelle)"; s.style.color = "var(--bio-text)";
      puz.sel.disabled = true; puz.sel.style.opacity = "0.35"; puz.sel.style.borderColor = "var(--bio-line)";
      puz.sel = null; puz.done++;
      if (puz.done === 12) puzMsg("🎉 拼对了！消化道 7 站＋消化腺 5 腺，全归位。", true);
      else puzMsg("✓ 对了！还剩 " + (12 - puz.done) + " 个。", true);
    } else {
      s.animate([{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }], { duration: 220 });
      puzMsg("再想想：" + puz.sel.getAttribute("data-w") + " 应该在哪个位置？", false);
    }
  };

  /* ---------- 小肠对问连线（b05.1.3-p1） ---------- */
  var QA_S = ["长 5–6 米", "环形皱襞", "小肠绒毛", "绒毛壁很薄（一层细胞）", "毛细血管网丰富"];
  var QA_F = ["吸收面积大", "面积再放大", "面积继续放大", "养分容易穿过薄壁", "吸收的养分立刻被运走"];
  var qa = { sel: null, done: 0 };
  function qaBuild() {
    var s = document.getElementById("b05qa-s");
    if (!s || s.children.length) return;
    s.innerHTML = QA_S.map(function (w, k) { return btn(w, "data-k=\"" + k + "\" onclick=\"BIO_B05.qaPick(this)\""); }).join("");
    var order = [3, 0, 4, 1, 2];
    document.getElementById("b05qa-f").innerHTML = order.map(function (k) { return btn(QA_F[k], "data-k=\"" + k + "\" onclick=\"BIO_B05.qaMatch(this)\""); }).join("");
  }
  function qaMsg(t, ok) {
    var m = document.getElementById("b05qa-msg"); if (!m) return;
    m.textContent = t; m.style.color = ok ? "var(--bio-organelle)" : "var(--bio-target)";
  }
  qa.pick = function (b) {
    if (b.disabled) return;
    if (qa.sel) qa.sel.style.borderColor = "var(--bio-line)";
    qa.sel = b; b.style.borderColor = "var(--bio-highlight)"; b.style.borderWidth = "2.5px";
  };
  qa.match = function (b) {
    if (b.disabled) return;
    if (!qa.sel) { qaMsg("先点左边的一个结构", false); return; }
    if (b.getAttribute("data-k") === qa.sel.getAttribute("data-k")) {
      b.disabled = true; qa.sel.disabled = true;
      b.style.borderColor = "var(--bio-organelle)"; qa.sel.style.borderColor = "var(--bio-organelle)";
      b.style.opacity = "0.75"; qa.sel.style.opacity = "0.75";
      qa.sel = null; qa.done++;
      if (qa.done === 5) qaMsg("🎉 全对！\"形配其用\"——5 处结构，各配其用。", true);
      else qaMsg("✓ 对上了！还剩 " + (5 - qa.done) + " 对。", true);
    } else {
      b.animate([{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }], { duration: 220 });
      qaMsg("再想想：这个结构的特点，适合干什么？", false);
    }
  };

  window.BIO_B05 = {
    puzStart: function () {
      var st = document.getElementById("b05puz-start"); if (st) st.style.display = "none";
      puzBuild();
    },
    qaStart: function () {
      var st = document.getElementById("b05qa-start"); if (st) st.style.display = "none";
      qaBuild();
    },
    puzPick: puz.pick, puzPlace: puz.place,
    qaPick: qa.pick, qaMatch: qa.match,
    zoom: function (n) {
      for (var i = 1; i <= 3; i++) { var d = document.getElementById("b05z" + i); if (d) d.style.display = (i === n) ? "" : "none"; }
    },
    tmpSet: function (v) { var r = document.getElementById("b05tmp"); if (r) { r.value = v; this.tmpShow(v); } },
    tmpShow: function (v) {
      v = Number(v);
      var vv = document.getElementById("b05tmp-v"), rr = document.getElementById("b05tmp-r"), cc = document.getElementById("b05tmp-c");
      if (!vv) return;
      vv.textContent = v + "℃";
      if (Math.abs(v - 37) <= 8) { rr.textContent = "不变蓝（淀粉被分解了）"; cc.textContent = "37℃：唾液淀粉酶最\"舒服\"，干活最卖力。"; }
      else if (v < 15) { rr.textContent = "变蓝（淀粉几乎没被分解）"; cc.textContent = "0℃ 附近：冷得\"冻住\"，几乎不干活。"; }
      else if (v > 60) { rr.textContent = "变蓝（淀粉没被分解）"; cc.textContent = "100℃ 附近：热得\"烫坏\"，不干活了。"; }
      else { rr.textContent = "浅蓝色（只分解了一部分）"; cc.textContent = "偏离 37℃：干活变慢了。"; }
    }
  };
})();
