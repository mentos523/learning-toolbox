/* ============================================================
 * 学习工具箱 · 生物 · 第九章数据（生物 P12 生产队 2026-10-19）
 *
 * 课：b09.1.1 无脊椎动物（上）（3 页）/ b09.1.2 软体动物与节肢动物（3 页）/
 *     b09.2.1 鱼类、两栖类与爬行类（2 页）/ b09.2.2 鸟类与哺乳动物（3 页）/
 *     b09.2.3 动物的运动、行为与在生物圈中的作用（2 页）/
 *     b09.2.4 本章小结与习题（2 页）。共 15 页。
 * 交互：各类群速查卡 / 昆虫判据闯关 / 蝗虫结构拆解（外骨骼/气门/足）/
 * 鱼鳃观察（放大鳃丝）/ 江豚三证据配对闯关 / 屈肘伸肘骨骼肌协作动画 /
 * 行为对号入座，均为纯 HTML 内联 handler（window.BIO_B09，
 * b08 的 window.BIO_B08 配对/防线闯关先例），不新增引擎组件。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 肌肉收缩+刚毛协助，缺一不可（b09.1.1-p3 专治；"走路靠刚毛"= FAIL）
 * - 节肢动物非昆虫！昆虫=3 对足 2 对翅（b09.1.2-p3 专治；"蜘蛛/蜈蚣是昆虫"= FAIL）
 * - 生殖离不开水：体外受精、水中发育（b09.2.1-p2 专治；"青蛙能在陆地生活一辈子"= FAIL）
 * - 哺乳动物（恒温+胎生+哺乳三判据）（b09.2.2-p3 专治；"鲸/江豚是鱼"= FAIL）
 * - 两组肌肉协作：屈肘时肱二头肌收缩、肱三头肌舒张（b09.2.3-p1 专治；"牵拉骨单向用力"= FAIL）
 * - "模式图：非等比、非实物"（BIO-R32；蝗虫结构/屈肘伸肘/鳃丝示意）
 * - 认旧友：形配其用（b09.2.1-p1 辨析①回填→b05.1.3 深链；兑现 b05.1.3-a2）
 * - 直引号；type:"text" 的块用 html 键（P4 教训）
 *
 * 门禁⑧：新术语首现即定义——辐射对称/刺细胞（b09.1.1-p1）/两侧对称
 * （b09.1.1-p2）/体节/刚毛（b09.1.1-p3）/外套膜（b09.1.2-p1）/外骨骼
 * （b09.1.2-p2）/侧线（b09.2.1-p1）/羊膜卵（b09.2.1-p2）/双重呼吸
 * （b09.2.2-p1）/膈/胎生（b09.2.2-p2）/先天性行为/学习行为/社会行为
 * （b09.2.3-p2）。
 * 门禁⑨：深链 2 处（b09.2.1-p1→b05.1.3 辨析①回填；b09.2.1-p2→b04.1.5
 * 变态发育认旧友）；均已生产；XLINK_BIO 补丁纳 b09 课号。
 * b10/b11/b12/b22 正文零引用。
 * 门禁⑩：本批无新登记预告。
 * 门禁⑪：quiz 页题目数 > 0（b09.2.4 两页：3 + 4）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b09"] = {
  id: "b09",
  units: [
    {
      id: "b09.1",
      title: "无脊椎动物",
      lessons: [
        {
          id: "b09.1.1",
          title: "无脊椎动物（上）",
          prereq: "b08 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：腔肠动物（水螅） ============ */
            {
              id: "b09.1.1-p1",
              kind: "explain",
              title: "腔肠动物——水螅",
              blocks: [
                { type: "lead", text: "水里的\"小花\"会捕食——它是动物吗？" },
                { type: "text", html: "先认词——辐射对称：身体通过中央轴有多个对称面（像一把伞，从哪个方向看都一样）。先认词——刺细胞：水螅触手上的特殊细胞，能弹出刺丝麻痹小动物。" },
                { type: "text", html: "水螅：生活在淡水中，身体呈圆筒形；触手捕食小动物；有口无肛门，食物残渣仍由口排出。" },
                { type: "text", html: "腔肠动物纲要：身体辐射对称；体表有刺细胞；有口无肛门。水母、海葵也是腔肠动物。" },
                { type: "note", text: "一句话：腔肠动物=辐射对称+刺细胞+有口无肛门。复述一遍。" }
              ],
              point: "腔肠动物：辐射对称、刺细胞、有口无肛门（水螅/水母/海葵）。"
            },
            /* ============ p2：扁形动物（涡虫）+ 线形动物（蛔虫） ============ */
            {
              id: "b09.1.1-p2",
              kind: "explain",
              title: "扁形动物与线形动物",
              blocks: [
                { type: "lead", text: "身体从\"伞形\"变成\"左右分\"——对称方式升级了。" },
                { type: "text", html: "先认词——两侧对称：身体只有一个对称面（像一辆车，分出前/后、左/右、背/腹）。涡虫：生活在清澈溪流中，身体背腹扁平、左右对称。" },
                { type: "text", html: "线形动物——蛔虫：身体细长、两端尖；寄生在人体小肠里，靠吸收现成的营养生活。" },
                { type: "note", text: "对比：辐射对称（水螅）→两侧对称（涡虫）；自由生活（涡虫）→寄生（蛔虫）。" }
              ],
              point: "扁形动物：两侧对称（涡虫）；线形动物：细长、寄生（蛔虫）。"
            },
            /* ============ p3：环节动物（蚯蚓）+ 专治 + 速查卡 ============ */
            {
              id: "b09.1.1-p3",
              kind: "explain",
              title: "环节动物——蚯蚓",
              blocks: [
                { type: "lead", text: "一节一节的身体，走路不用脚？" },
                { type: "text", html: "先认词——体节：蚯蚓的身体由许多相似的环形体节构成。先认词——刚毛：体节腹面的小突起，能伸缩、协助固定身体。" },
                { type: "text", html: "点下面四张卡：先猜代表动物，再看关键特征。" +
                  "<div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.card(0,this)\">腔肠动物</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.card(1,this)\">扁形动物</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.card(2,this)\">线形动物</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.card(3,this)\">环节动物</button>" +
                  "</div>" +
                  "<div id=\"bioB09CardMsg\" style=\"min-height:4.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点一张卡，看代表动物和关键特征。</div>" },
                { type: "trap", text: "⚠️ \"蚯蚓走路靠刚毛\"错——只靠刚毛动不了！正确：肌肉收缩+刚毛协助，缺一不可。" },
                { type: "note", text: "动手：四张卡全点开后，遮住特征说出代表动物。" }
              ],
              point: "环节动物：身体分节、有刚毛（蚯蚓）；运动靠肌肉收缩+刚毛协助。"
            }
          ]
        },
        {
          id: "b09.1.2",
          title: "软体动物与节肢动物",
          prereq: "无脊椎动物（上）",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：软体动物（河蚌） ============ */
            {
              id: "b09.1.2-p1",
              kind: "explain",
              title: "软体动物——河蚌",
              blocks: [
                { type: "lead", text: "硬壳里包着软身体——壳是谁造的？" },
                { type: "text", html: "先认词——外套膜：包裹柔软身体的膜，能分泌物质形成贝壳。" },
                { type: "text", html: "河蚌：生活在淡水中；身体柔软，外套膜分泌形成两片贝壳；用鳃呼吸。" },
                { type: "text", html: "软体动物纲要：身体柔软、有外套膜，大多有贝壳。蜗牛、乌贼也是软体动物。" },
                { type: "note", text: "一句话：软体动物=柔软身体+外套膜+（大多）贝壳。" }
              ],
              point: "软体动物：柔软、外套膜、贝壳（河蚌/蜗牛/乌贼）。"
            },
            /* ============ p2：节肢动物 + 昆虫判据闯关 ============ */
            {
              id: "b09.1.2-p2",
              kind: "explain",
              title: "节肢动物与昆虫",
              blocks: [
                { type: "lead", text: "动物界种类最多的一门，是谁？" },
                { type: "text", html: "先认词——外骨骼：节肢动物体表的坚硬外壳，能保护身体、防止体内水分蒸发。" },
                { type: "text", html: "节肢动物纲要：身体分节、体表有外骨骼、附肢分节。是动物界种类最多的一门：蝗虫、蜘蛛、蜈蚣都是节肢动物。" },
                { type: "text", html: "昆虫特征：身体分头、胸、腹三部分；胸部有 3 对足，大多有 2 对翅。点动物，再判\"是/不是昆虫\"。" +
                  "<div style=\"display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0\">" +
                  "<button type=\"button\" id=\"bioB09I-b1\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.insectSel('蝗虫',1,this)\">蝗虫</button>" +
                  "<button type=\"button\" id=\"bioB09I-b2\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.insectSel('蜜蜂',1,this)\">蜜蜂</button>" +
                  "<button type=\"button\" id=\"bioB09I-b3\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.insectSel('蝴蝶',1,this)\">蝴蝶</button>" +
                  "<button type=\"button\" id=\"bioB09I-b4\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.insectSel('蜘蛛',0,this)\">蜘蛛</button>" +
                  "<button type=\"button\" id=\"bioB09I-b5\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.insectSel('蜈蚣',0,this)\">蜈蚣</button>" +
                  "<button type=\"button\" id=\"bioB09I-b6\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.insectSel('河蚌',0,this)\">河蚌</button>" +
                  "</div>" +
                  "<div style=\"text-align:center;margin:4px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-primary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B09.insectVerdict(1)\">是昆虫</button>" +
                  "<button type=\"button\" class=\"tb-btn-primary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B09.insectVerdict(0)\">不是昆虫</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B09.insectReset()\">重新闯关</button>" +
                  "<div id=\"bioB09InsectMsg\" style=\"min-height:4.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">先点一个动物，再判\"是/不是昆虫\"。</div>" +
                  "</div>" },
                { type: "note", text: "判据口诀：昆虫=3 对足 2 对翅，对不上就不是昆虫。" }
              ],
              point: "节肢动物：外骨骼、分节附肢、种类最多；昆虫=3 对足 2 对翅。"
            },
            /* ============ p3：蝗虫结构拆解 + 专治 ============ */
            {
              id: "b09.1.2-p3",
              kind: "explain",
              title: "蝗虫结构拆解",
              blocks: [
                { type: "lead", text: "把蝗虫拆开看——三个结构，各管什么用？" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<svg id=\"bioB09LocustSvg\" viewBox=\"0 0 360 220\" style=\"max-width:100%;height:auto\" role=\"img\" aria-label=\"蝗虫结构模式图\">" +
                  "<ellipse cx=\"185\" cy=\"115\" rx=\"105\" ry=\"26\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink)\" stroke-width=\"2\"/>" +
                  "<circle cx=\"72\" cy=\"108\" r=\"20\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink)\" stroke-width=\"2\"/>" +
                  "<line x1=\"60\" y1=\"92\" x2=\"30\" y2=\"60\" stroke=\"var(--bio-ink)\" stroke-width=\"2\"/>" +
                  "<line x1=\"66\" y1=\"90\" x2=\"44\" y2=\"52\" stroke=\"var(--bio-ink)\" stroke-width=\"2\"/>" +
                  "<ellipse cx=\"230\" cy=\"88\" rx=\"55\" ry=\"14\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink)\" stroke-width=\"1.5\"/>" +
                  "<ellipse cx=\"235\" cy=\"100\" rx=\"48\" ry=\"12\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink)\" stroke-width=\"1.5\"/>" +
                  "<line x1=\"140\" y1=\"132\" x2=\"120\" y2=\"185\" stroke=\"var(--bio-ink)\" stroke-width=\"3\"/>" +
                  "<line x1=\"170\" y1=\"136\" x2=\"165\" y2=\"190\" stroke=\"var(--bio-ink)\" stroke-width=\"3\"/>" +
                  "<line x1=\"200\" y1=\"136\" x2=\"215\" y2=\"188\" stroke=\"var(--bio-ink)\" stroke-width=\"3\"/>" +
                  "<g fill=\"var(--bio-ink-soft)\"><circle cx=\"150\" cy=\"128\" r=\"3.5\"/><circle cx=\"175\" cy=\"131\" r=\"3.5\"/><circle cx=\"200\" cy=\"131\" r=\"3.5\"/><circle cx=\"225\" cy=\"128\" r=\"3.5\"/></g>" +
                  "<g id=\"bioB09Hs-exo\" style=\"cursor:pointer\" onclick=\"BIO_B09.struct('exo')\">" +
                  "<rect x=\"100\" y=\"80\" width=\"150\" height=\"60\" fill=\"transparent\"/>" +
                  "<text x=\"175\" y=\"72\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink)\">外骨骼（点我）</text></g>" +
                  "<g id=\"bioB09Hs-spi\" style=\"cursor:pointer\" onclick=\"BIO_B09.struct('spi')\">" +
                  "<rect x=\"140\" y=\"120\" width=\"100\" height=\"44\" fill=\"transparent\"/>" +
                  "<text x=\"190\" y=\"180\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink)\">气门（点我）</text></g>" +
                  "<g id=\"bioB09Hs-leg\" style=\"cursor:pointer\" onclick=\"BIO_B09.struct('leg')\">" +
                  "<rect x=\"105\" y=\"140\" width=\"125\" height=\"60\" fill=\"transparent\"/>" +
                  "<text x=\"70\" y=\"205\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink)\">足（点我）</text></g>" +
                  "<text x=\"352\" y=\"212\" text-anchor=\"end\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg></div>" +
                  "<div style=\"text-align:center\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B09.struct('exo')\">外骨骼</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B09.struct('spi')\">气门</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B09.struct('leg')\">足</button>" +
                  "<div id=\"bioB09StructMsg\" style=\"min-height:4.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点图上热点或按钮，看\"结构→它适合干什么\"。</div>" +
                  "</div>" },
                { type: "trap", text: "⚠️ \"蜘蛛/蜈蚣是昆虫\"错——节肢动物非昆虫！昆虫=3 对足 2 对翅：蜘蛛 4 对足，蜈蚣足更多。" },
                { type: "note", text: "结构—功能对问：外骨骼（保护+防水）/气门（呼吸）/足（运动）。" }
              ],
              point: "蝗虫：外骨骼保护防水、气门呼吸、足运动；节肢动物非昆虫！"
            }
          ]
        }
      ]
    },
    {
      id: "b09.2",
      title: "脊椎动物与行为",
      lessons: [
        {
          id: "b09.2.1",
          title: "鱼类、两栖类与爬行类",
          prereq: "软体动物与节肢动物",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：鱼 + 鱼鳃观察 + 辨析①回填 ============ */
            {
              id: "b09.2.1-p1",
              kind: "explain",
              title: "鱼与鱼鳃观察",
              blocks: [
                { type: "lead", text: "鱼在水里\"呼吸\"，鼻子在哪？" },
                { type: "text", html: "先认词——侧线：鱼身体两侧的细线，能感知水流、测定方向。鲫鱼：用鳃呼吸、用鳍游泳；体表有鳞片。" },
                { type: "text", html: "四大家鱼：青鱼、草鱼、鲢鱼、鳙鱼（我国淡水养殖的四大名鱼）。" },
                { type: "text", html: "鱼鳃观察：点\"放大看鳃丝\"，看鳃丝上密布的毛细血管。" +
                  "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.gillZoom()\">放大看鳃丝</button>" +
                  "<div id=\"bioB09GillWide\" style=\"margin-top:6px\">鳃：鱼头两侧、鳃盖下面的红色丝状结构。</div>" +
                  "<div id=\"bioB09GillZoom\" style=\"display:none;margin-top:6px\">" +
                  "<svg viewBox=\"0 0 320 170\" style=\"max-width:100%;height:auto\" role=\"img\" aria-label=\"鳃丝模式图\">" +
                  "<line x1=\"20\" y1=\"20\" x2=\"20\" y2=\"150\" stroke=\"var(--bio-ink)\" stroke-width=\"4\"/>" +
                  "<g stroke=\"var(--bio-organelle)\" stroke-width=\"2\">" +
                  "<line x1=\"20\" y1=\"35\" x2=\"150\" y2=\"30\"/><line x1=\"20\" y1=\"60\" x2=\"150\" y2=\"60\"/>" +
                  "<line x1=\"20\" y1=\"85\" x2=\"150\" y2=\"90\"/><line x1=\"20\" y1=\"110\" x2=\"150\" y2=\"120\"/>" +
                  "<line x1=\"20\" y1=\"135\" x2=\"150\" y2=\"150\"/></g>" +
                  "<g stroke=\"var(--bio-highlight)\" stroke-width=\"1\">" +
                  "<line x1=\"60\" y1=\"33\" x2=\"60\" y2=\"45\"/><line x1=\"100\" y1=\"58\" x2=\"100\" y2=\"70\"/>" +
                  "<line x1=\"60\" y1=\"88\" x2=\"60\" y2=\"100\"/><line x1=\"100\" y1=\"118\" x2=\"100\" y2=\"130\"/>" +
                  "<line x1=\"120\" y1=\"32\" x2=\"120\" y2=\"44\"/><line x1=\"80\" y1=\"113\" x2=\"80\" y2=\"125\"/></g>" +
                  "<text x=\"160\" y=\"40\" font-size=\"12\" fill=\"var(--bio-ink)\">鳃丝：又多又细</text>" +
                  "<text x=\"160\" y=\"105\" font-size=\"12\" fill=\"var(--bio-ink)\">密布毛细血管</text>" +
                  "<text x=\"312\" y=\"162\" text-anchor=\"end\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg><br>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.gillZoom()\">回到整体</button>" +
                  "</div></div>" },
                { type: "text", html: "辨析①回填：鳃丝又多又细、密布毛细血管——面积大，气体交换快。认旧友：形配其用（小肠绒毛增大面积，也是这个道理）。" },
                { type: "mathlink", text: "认旧友：b05.1.3——小肠 5 处结构\"形配其用\"（立靶页）；鱼鳃鳃丝密布毛细血管，同样\"形配其用\"。" },
                { type: "note", text: "一句话：鳃丝密布毛细血管——形配其用，气体交换快。" }
              ],
              point: "鱼：鳃呼吸、鳍游泳、侧线感知水流；鳃丝密布毛细血管=形配其用。"
            },
            /* ============ p2：两栖（青蛙）+ 爬行（蜥蜴）+ 专治 ============ */
            {
              id: "b09.2.1-p2",
              kind: "explain",
              title: "两栖类与爬行类",
              blocks: [
                { type: "lead", text: "能在水里游、能上岸跳——但它一辈子离得开水吗？" },
                { type: "text", html: "青蛙：幼体（蝌蚪）生活在水中、用鳃呼吸；成体水陆两栖、用肺呼吸、皮肤辅助呼吸。" },
                { type: "text", html: "先认词——羊膜卵：有坚韧卵壳、能防止水分蒸发的卵。蜥蜴（爬行类）：用肺呼吸；产羊膜卵——是真正的陆生脊椎动物（生殖发育完全摆脱了对水的依赖）。" },
                { type: "trap", text: "⚠️ \"青蛙能在陆地生活一辈子\"错——生殖离不开水：体外受精、水中发育（蝌蚪必须在水里长大）。" },
                { type: "mathlink", text: "认旧友：b04.1.5——青蛙的变态发育（蝌蚪→青蛙、体外受精）在 b04.1.5 学过。" },
                { type: "note", text: "分界线：两栖类生殖离不开水；爬行类靠羊膜卵真正登陆。" }
              ],
              point: "两栖类：生殖离不开水（体外受精、水中发育）；爬行类：肺+羊膜卵，真正的陆生脊椎动物。"
            }
          ]
        },
        {
          id: "b09.2.2",
          title: "鸟类与哺乳动物",
          prereq: "鱼类、两栖类与爬行类",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：鸟 ============ */
            {
              id: "b09.2.2-p1",
              kind: "explain",
              title: "鸟",
              blocks: [
                { type: "lead", text: "飞上天，要解决哪三个问题？" },
                { type: "text", html: "先认词——双重呼吸：鸟吸气和呼气时，肺都能进行气体交换（气囊辅助）。" },
                { type: "text", html: "鸟纲要：体表被覆羽毛、前肢变成翼；双重呼吸；体温恒定；卵生。" },
                { type: "text", html: "恒温的意义：体温不随环境变化，活动能力更强。" },
                { type: "note", text: "一句话：鸟=羽毛+翼+双重呼吸+恒温+卵生。" }
              ],
              point: "鸟：双重呼吸、恒定体温、卵生。"
            },
            /* ============ p2：哺乳动物 ============ */
            {
              id: "b09.2.2-p2",
              kind: "explain",
              title: "哺乳动物",
              blocks: [
                { type: "lead", text: "生下来就喝奶的动物，有什么共同点？" },
                { type: "text", html: "先认词——胎生：胚胎在母体子宫内发育，出生时已基本成形。先认词——膈：把体腔分为胸腔和腹腔的肌肉（哺乳动物特有）。" },
                { type: "text", html: "哺乳纲要：胎生、哺乳（幼崽喝母乳长大）；体表被毛；体温恒定；有膈。" },
                { type: "note", text: "哺乳三判据：胎生+哺乳+恒温（还有体表被毛、有膈）。" }
              ],
              point: "哺乳动物：胎生、哺乳、恒温、有膈。"
            },
            /* ============ p3：长江江豚案例 + 三证据闯关 + 专治 ============ */
            {
              id: "b09.2.2-p3",
              kind: "explain",
              title: "长江江豚：为什么它不是鱼",
              blocks: [
                { type: "lead", text: "长江里的\"微笑天使\"——它是鱼吗？" },
                { type: "text", html: "长江江豚：生活在长江里的水生动物，长得像鱼，但它不是鱼。配对闯关：左边点证据，右边点对应的表现。" +
                  "<div style=\"display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0\">" +
                  "<div style=\"display:flex;flex-direction:column;gap:8px\">" +
                  "<div style=\"font-size:0.85rem;color:var(--bio-ink-soft)\">证据（先点）</div>" +
                  "<button type=\"button\" id=\"bioB09E-lung\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.pair('ev','lung',this)\">用肺呼吸</button>" +
                  "<button type=\"button\" id=\"bioB09E-born\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.pair('ev','born',this)\">胎生</button>" +
                  "<button type=\"button\" id=\"bioB09E-warm\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.pair('ev','warm',this)\">恒温</button>" +
                  "</div>" +
                  "<div style=\"display:flex;flex-direction:column;gap:8px\">" +
                  "<div style=\"font-size:0.85rem;color:var(--bio-ink-soft)\">表现（后点）</div>" +
                  "<button type=\"button\" id=\"bioB09E-p1\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.pair('pf','warm',this)\">水温变化，体温稳定</button>" +
                  "<button type=\"button\" id=\"bioB09E-p2\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.pair('pf','lung',this)\">定期浮出水面换气</button>" +
                  "<button type=\"button\" id=\"bioB09E-p3\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.pair('pf','born',this)\">生下小江豚、用乳汁哺育</button>" +
                  "</div>" +
                  "</div>" +
                  "<div style=\"text-align:center;margin:4px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B09.pairReset()\">重新闯关</button>" +
                  "<div id=\"bioB09PairMsg\" style=\"min-height:4.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">先点左侧一个证据，再点右侧一个表现配对。</div>" +
                  "</div>" },
                { type: "trap", text: "⚠️ \"鲸/江豚是鱼\"错——江豚是哺乳动物（恒温+胎生+哺乳三判据）！" },
                { type: "note", text: "本地案例：长江江豚——水生但用肺呼吸、胎生。" }
              ],
              point: "江豚是哺乳动物：用肺呼吸、胎生、恒温（三判据）。"
            }
          ]
        },
        {
          id: "b09.2.3",
          title: "动物的运动、行为与在生物圈中的作用",
          prereq: "鸟类与哺乳动物",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：运动 + 屈肘伸肘协作动画 + 专治 ============ */
            {
              id: "b09.2.3-p1",
              kind: "explain",
              title: "动物的运动",
              blocks: [
                { type: "lead", text: "抬一下手臂——几块肌肉在配合？" },
                { type: "text", html: "运动系统：骨（杠杆）+关节（支点）+骨骼肌（动力）。骨骼肌两端附着在不同的骨上。点\"屈肘/伸肘\"看两组肌肉怎么配合。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<svg id=\"bioB09MuscleSvg\" viewBox=\"0 0 360 240\" style=\"max-width:100%;height:auto\" role=\"img\" aria-label=\"屈肘伸肘骨骼肌协作模式图\">" +
                  "<line x1=\"180\" y1=\"20\" x2=\"180\" y2=\"130\" stroke=\"var(--bio-ink-soft)\" stroke-width=\"10\" stroke-linecap=\"round\"/>" +
                  "<circle cx=\"180\" cy=\"130\" r=\"9\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink)\" stroke-width=\"2\"/>" +
                  "<g id=\"bioB09M-flex\">" +
                  "<line x1=\"180\" y1=\"130\" x2=\"92\" y2=\"102\" stroke=\"var(--bio-ink-soft)\" stroke-width=\"10\" stroke-linecap=\"round\"/>" +
                  "<rect x=\"148\" y=\"52\" width=\"28\" height=\"62\" rx=\"10\" fill=\"var(--bio-organelle)\"/>" +
                  "<rect x=\"184\" y=\"40\" width=\"12\" height=\"86\" rx=\"6\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\" stroke-width=\"1.5\"/>" +
                  "<text x=\"45\" y=\"45\" font-size=\"12\" fill=\"var(--bio-ink)\">肱二头肌：收缩</text>" +
                  "<text x=\"245\" y=\"45\" font-size=\"12\" fill=\"var(--bio-ink)\">肱三头肌：舒张</text>" +
                  "<text x=\"180\" y=\"225\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink)\">屈肘</text></g>" +
                  "<g id=\"bioB09M-extend\" style=\"display:none\">" +
                  "<line x1=\"180\" y1=\"130\" x2=\"180\" y2=\"218\" stroke=\"var(--bio-ink-soft)\" stroke-width=\"10\" stroke-linecap=\"round\"/>" +
                  "<rect x=\"156\" y=\"32\" width=\"14\" height=\"88\" rx=\"7\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\" stroke-width=\"1.5\"/>" +
                  "<rect x=\"182\" y=\"56\" width=\"26\" height=\"60\" rx=\"10\" fill=\"var(--bio-organelle)\"/>" +
                  "<text x=\"45\" y=\"45\" font-size=\"12\" fill=\"var(--bio-ink)\">肱二头肌：舒张</text>" +
                  "<text x=\"245\" y=\"45\" font-size=\"12\" fill=\"var(--bio-ink)\">肱三头肌：收缩</text>" +
                  "<text x=\"180\" y=\"225\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink)\">伸肘</text></g>" +
                  "<text x=\"8\" y=\"232\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "<text x=\"352\" y=\"232\" text-anchor=\"end\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">示意，非真实速度/比例</text>" +
                  "</svg></div>" +
                  "<div style=\"text-align:center\">" +
                  "<button type=\"button\" class=\"tb-btn-primary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B09.muscle('flex')\">屈肘</button>" +
                  "<button type=\"button\" class=\"tb-btn-primary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B09.muscle('extend')\">伸肘</button>" +
                  "<div id=\"bioB09MuscleMsg\" style=\"min-height:3.2em;margin-top:6px;font-size:0.95rem;line-height:1.7\">屈肘：肱二头肌收缩、肱三头肌舒张。</div>" +
                  "</div>" },
                { type: "trap", text: "⚠️ \"骨骼肌牵拉骨单向用力\"错——两组肌肉协作：屈肘时肱二头肌收缩、肱三头肌舒张。" },
                { type: "note", text: "记住：骨骼肌只能收缩牵拉骨；一个动作靠两组肌肉协作完成。" }
              ],
              point: "运动：骨+关节+骨骼肌；两组肌肉协作完成动作。"
            },
            /* ============ p2：行为 + 生物圈作用 + 对号入座 ============ */
            {
              id: "b09.2.3-p2",
              kind: "explain",
              title: "动物的行为与在生物圈中的作用",
              blocks: [
                { type: "lead", text: "蜘蛛结网不用学，小狗握手要人教——行为分几类？" },
                { type: "text", html: "先认词——先天性行为：生来就有、由遗传物质决定的行为（如蜘蛛结网）。先认词——学习行为：出生后通过生活经验和学习逐渐建立的行为（如小狗学握手）。" },
                { type: "text", html: "先认词——社会行为：群体内部形成一定组织、成员间有明确分工的行为（如蜜蜂分工酿蜜）。点例子，对号入座。" +
                  "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B09.behav('spider',this)\">蜘蛛结网</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B09.behav('dog',this)\">小狗学握手</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B09.behav('bee',this)\">蜜蜂分工酿蜜</button>" +
                  "<div id=\"bioB09BehavMsg\" style=\"min-height:4.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点一个例子，看它属于哪类行为。</div>" +
                  "</div>" },
                { type: "text", html: "动物在生物圈中的作用：食物链的一环；帮助植物传粉、传播种子。" },
                { type: "note", text: "一句话：先天（生来有）/学习（后天学）/社会（群体分工）。" }
              ],
              point: "行为：先天性/学习/社会行为；动物是食物链一环，还帮植物传粉、传播种子。"
            }
          ]
        },
        {
          id: "b09.2.4",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b09.2.4-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b09.1.1：腔肠动物（辐射对称、刺细胞、有口无肛门：水螅）；扁形动物（两侧对称：涡虫）；线形动物（寄生：蛔虫）；环节动物（体节、刚毛：蚯蚓；运动靠肌肉收缩+刚毛协助）。b09.1.2：软体动物（外套膜、贝壳：河蚌）；节肢动物（外骨骼、分节附肢、种类最多）；昆虫=3 对足 2 对翅（蝗虫；蜘蛛/蜈蚣不是昆虫）。b09.2.1：鱼（鳃呼吸、鳍游泳、侧线；四大家鱼：青/草/鲢/鳙；鳃丝密布毛细血管=形配其用，认旧友 b05.1.3）；两栖类（生殖离不开水：体外受精、水中发育）；爬行类（肺+羊膜卵，真正的陆生脊椎动物）。b09.2.2：鸟（双重呼吸、恒温、卵生）；哺乳动物（胎生、哺乳、恒温、有膈）；长江江豚是哺乳动物（用肺呼吸、胎生、恒温三判据）。b09.2.3：运动（骨+关节+骨骼肌；两组肌肉协作：屈肘时肱二头肌收缩、肱三头肌舒张）；先天性/学习/社会行为；动物在生物圈中的作用（食物链、传粉、传播种子）。" },
                { type: "choice", stem: "蚯蚓运动的方式是？",
                  options: ["只靠刚毛爬行", "肌肉收缩+刚毛协助", "靠体节一张一缩", "靠外骨骼保护"], answer: 1,
                  tip: "蚯蚓运动：肌肉收缩使身体伸缩，刚毛协助固定——肌肉收缩+刚毛协助，缺一不可（b09.1.1 第 3 页）。" },
                { type: "choice", stem: "昆虫的特征是？",
                  options: ["4 对足", "3 对足、2 对翅", "很多对足", "没有足"], answer: 1,
                  tip: "昆虫=3 对足 2 对翅；蜘蛛 4 对足、蜈蚣足更多，都不是昆虫（b09.1.2 第 2、3 页）。" },
                { type: "choice", stem: "关于长江江豚，正确的是？",
                  options: ["是鱼，用鳃呼吸", "是哺乳动物，用肺呼吸、胎生、恒温", "是两栖动物", "是爬行动物"], answer: 1,
                  tip: "江豚是哺乳动物！恒温+胎生+哺乳三判据全对上（b09.2.2 第 3 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b09.2.4-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "review", html: "本章小结——b09.1.1：腔肠动物（辐射对称、刺细胞：水螅）；扁形动物（两侧对称：涡虫）；线形动物（寄生：蛔虫）；环节动物（体节、刚毛：蚯蚓；运动靠肌肉收缩+刚毛协助）。b09.1.2：软体动物（外套膜、贝壳：河蚌）；节肢动物（外骨骼、分节附肢、种类最多）；昆虫=3 对足 2 对翅（蜘蛛/蜈蚣不是昆虫）。b09.2.1：鱼（鳃呼吸、鳍游泳、侧线）；两栖类（生殖离不开水：体外受精、水中发育）；爬行类（肺+羊膜卵，真正的陆生脊椎动物）。b09.2.2：鸟（双重呼吸、恒温、卵生）；哺乳动物（胎生、哺乳、恒温、有膈）；长江江豚是哺乳动物（用肺呼吸、胎生、恒温三判据）。b09.2.3：运动（骨+关节+骨骼肌；两组肌肉协作：屈肘时肱二头肌收缩、肱三头肌舒张）；先天性/学习/社会行为；动物在生物圈中的作用。" },
                { type: "choice", stem: "蜘蛛是不是昆虫？为什么？",
                  options: ["是，因为它有 8 条腿", "不是，昆虫=3 对足 2 对翅，蜘蛛 4 对足", "是，因为它会结网", "不是，因为它有毒"], answer: 1,
                  tip: "蜘蛛是节肢动物，但不是昆虫！昆虫=3 对足 2 对翅（b09.1.2 第 3 页）。" },
                { type: "choice", stem: "青蛙的生殖离不开水，是因为？",
                  options: ["青蛙喜欢待在水里", "体外受精、水中发育", "青蛙用鳃呼吸", "青蛙没有肺"], answer: 1,
                  tip: "青蛙生殖离不开水：体外受精、水中发育，蝌蚪必须在水里长大（b09.2.1 第 2 页）。" },
                { type: "choice", stem: "鸟类\"双重呼吸\"是指？",
                  options: ["有两个鼻孔", "吸气和呼气时肺都能进行气体交换", "用肺和皮肤一起呼吸", "一次吸两口气"], answer: 1,
                  tip: "双重呼吸：吸气和呼气时，肺都能进行气体交换，气囊辅助（b09.2.2 第 1 页）。" },
                { type: "choice", stem: "屈肘时，肱二头肌和肱三头肌的状态是？",
                  options: ["二头肌舒张、三头肌收缩", "二头肌收缩、三头肌舒张", "两块肌肉都收缩", "两块肌肉都舒张"], answer: 1,
                  tip: "两组肌肉协作：屈肘时肱二头肌收缩、肱三头肌舒张（b09.2.3 第 1 页）。" }
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
 * b09 内联交互助手（纯 HTML 内联 handler，不新增引擎组件，
 * b08 的 window.BIO_B08 配对/防线闯关先例）。命名空间 window.BIO_B09。
 * 速查卡 / 昆虫判据闯关 / 蝗虫结构点选 / 鱼鳃放大 /
 * 江豚三证据配对闯关 / 屈肘伸肘协作动画 / 行为对号入座。
 * 闯关记录：会话内有效，不写 localStorage（不发明新 recordKey）。
 * ============================================================ */
window.BIO_B09 = (function () {
  function say(id, html) { var m = document.getElementById(id); if (m) m.innerHTML = html; }
  function markBtn(btn) {
    if (!btn) return;
    var sibs = btn.parentNode.querySelectorAll("button");
    for (var i = 0; i < sibs.length; i++) sibs[i].style.outline = "";
    btn.style.outline = "3px solid var(--bio-highlight)";
    btn.style.outlineOffset = "1px";
  }
  /* ---------- 速查卡（b09.1.1-p3） ---------- */
  var CARD_TXT = [
    "<b>腔肠动物——水螅</b>：辐射对称、刺细胞、有口无肛门。",
    "<b>扁形动物——涡虫</b>：两侧对称、背腹扁平。",
    "<b>线形动物——蛔虫</b>：身体细长、寄生。",
    "<b>环节动物——蚯蚓</b>：身体分节、体表有刚毛。"
  ];
  var cardOpen = -1;
  /* ---------- 昆虫判据闯关（b09.1.2-p2） ---------- */
  var INSECT_WHY = {
    "蝗虫": "3 对足、2 对翅——是昆虫。",
    "蜜蜂": "3 对足、2 对翅——是昆虫。",
    "蝴蝶": "3 对足、2 对翅——是昆虫。",
    "蜘蛛": "4 对足——不是昆虫（是节肢动物）。",
    "蜈蚣": "足太多——不是昆虫（是节肢动物）。",
    "河蚌": "软体动物，没足没翅——不是昆虫。"
  };
  var selAnimal = null, selIsInsect = 0, doneInsect = {};
  var INSECT_IDS = { "蝗虫": "bioB09I-b1", "蜜蜂": "bioB09I-b2", "蝴蝶": "bioB09I-b3", "蜘蛛": "bioB09I-b4", "蜈蚣": "bioB09I-b5", "河蚌": "bioB09I-b6" };
  function insectBtn(name, done) {
    var b = document.getElementById(INSECT_IDS[name]);
    if (!b) return;
    b.style.opacity = done ? "0.45" : "";
    b.style.outline = "";
  }
  /* ---------- 蝗虫结构点选（b09.1.2-p3） ---------- */
  var STRUCT_TXT = {
    exo: "<b>外骨骼</b>：体表的坚硬外壳——保护内部柔软器官，还能防止体内水分蒸发。",
    spi: "<b>气门</b>：腹部两侧的小孔——气体进出身体的门户，蝗虫用气门呼吸。",
    leg: "<b>足</b>：胸部三对分节的足——适于跳跃、爬行。"
  };
  /* ---------- 鱼鳃放大（b09.2.1-p1） ---------- */
  var gillOn = false;
  /* ---------- 江豚三证据配对闯关（b09.2.2-p3） ---------- */
  var EV_NAME = { lung: "用肺呼吸", born: "胎生", warm: "恒温" };
  var PF_NAME = { lung: "定期浮出水面换气", born: "生下小江豚、用乳汁哺育", warm: "水温变化，体温稳定" };
  var PF_EX = {
    lung: "鱼用鳃呼吸，江豚却要出水换气——这是肺呼吸的证据。",
    born: "鱼大多产卵，江豚直接生下小江豚并哺乳——这是胎生的证据。",
    warm: "鱼是变温的，江豚体温恒定——这是恒温的证据。"
  };
  var selEv = null, donePairs = {};
  var EV_IDS = { lung: "bioB09E-lung", born: "bioB09E-born", warm: "bioB09E-warm" };
  var PF_IDS = { lung: "bioB09E-p2", born: "bioB09E-p3", warm: "bioB09E-p1" };
  function pairBtn(id, done) {
    var b = document.getElementById(id);
    if (!b) return;
    b.style.opacity = done ? "0.45" : "";
    b.style.outline = "";
  }
  /* ---------- 行为对号入座（b09.2.3-p2） ---------- */
  var BEHAV_TXT = {
    spider: "<b>蜘蛛结网</b>→<b>先天性行为</b>：生来就会，不用学，由遗传物质决定。",
    dog: "<b>小狗学握手</b>→<b>学习行为</b>：出生后通过训练逐渐建立的。",
    bee: "<b>蜜蜂分工酿蜜</b>→<b>社会行为</b>：群体有组织、有分工。"
  };
  return {
    card: function (i, btn) {
      markBtn(btn);
      if (cardOpen === i) { cardOpen = -1; say("bioB09CardMsg", "点一张卡，看代表动物和关键特征。"); return; }
      cardOpen = i;
      say("bioB09CardMsg", CARD_TXT[i] + "<br>—— 再点一次收起。");
    },
    insectSel: function (name, isInsect, btn) {
      if (doneInsect[name]) return;
      selAnimal = name; selIsInsect = isInsect;
      markBtn(btn);
      say("bioB09InsectMsg", "已选「<b>" + name + "</b>」——再判\"是/不是昆虫\"。判据：昆虫=3 对足 2 对翅。");
    },
    insectVerdict: function (v) {
      if (!selAnimal) { say("bioB09InsectMsg", "先点一个动物，再判。"); return; }
      if (doneInsect[selAnimal]) return;
      if (v === selIsInsect) {
        doneInsect[selAnimal] = 1;
        insectBtn(selAnimal, true);
        var n = Object.keys(doneInsect).length;
        selAnimal = null;
        if (n >= 6) {
          say("bioB09InsectMsg", "🎉 <b>6 个全判对！</b>记住：昆虫=3 对足 2 对翅；蜘蛛（4 对足）、蜈蚣（足太多）是节肢动物但不是昆虫。");
        } else {
          say("bioB09InsectMsg", "✓ 「<b>" + Object.keys(doneInsect)[n - 1] + "</b>」" + INSECT_WHY[Object.keys(doneInsect)[n - 1]] + " —— 还差 " + (6 - n) + " 个。");
        }
      } else {
        say("bioB09InsectMsg", "再想想：「<b>" + selAnimal + "</b>」——" + INSECT_WHY[selAnimal]);
      }
    },
    insectReset: function () {
      selAnimal = null; doneInsect = {};
      Object.keys(INSECT_IDS).forEach(function (k) { insectBtn(k, false); });
      say("bioB09InsectMsg", "先点一个动物，再判\"是/不是昆虫\"。");
    },
    struct: function (key) {
      say("bioB09StructMsg", STRUCT_TXT[key] || "");
    },
    gillZoom: function () {
      gillOn = !gillOn;
      var w = document.getElementById("bioB09GillWide"), z = document.getElementById("bioB09GillZoom");
      if (w) w.style.display = gillOn ? "none" : "";
      if (z) z.style.display = gillOn ? "" : "none";
    },
    pair: function (side, key, btn) {
      if (donePairs[key]) return;
      if (side === "ev") {
        selEv = key;
        markBtn(btn);
        say("bioB09PairMsg", "已选证据「<b>" + EV_NAME[key] + "</b>」——再点右侧一个表现配对。");
      } else {
        if (!selEv) { say("bioB09PairMsg", "先点左侧一个证据，再点表现。"); return; }
        if (selEv === key) {
          donePairs[key] = 1;
          pairBtn(EV_IDS[key], true); pairBtn(PF_IDS[key], true);
          selEv = null;
          var n = Object.keys(donePairs).length;
          if (n >= 3) {
            say("bioB09PairMsg", "🎉 <b>三对全对！</b>三证据齐了→江豚是哺乳动物：用肺呼吸、胎生、恒温。");
          } else {
            say("bioB09PairMsg", "✓ <b>" + EV_NAME[key] + " ↔ " + PF_NAME[key] + "</b>：" + PF_EX[key] + " —— 还差 " + (3 - n) + " 对。");
          }
        } else {
          say("bioB09PairMsg", "再想想：「<b>" + EV_NAME[selEv] + "</b>」对应的是哪个表现？");
        }
      }
    },
    pairReset: function () {
      selEv = null; donePairs = {};
      ["lung", "born", "warm"].forEach(function (k) { pairBtn(EV_IDS[k], false); pairBtn(PF_IDS[k], false); });
      say("bioB09PairMsg", "先点左侧一个证据，再点右侧一个表现配对。");
    },
    muscle: function (st) {
      var f = document.getElementById("bioB09M-flex"), e = document.getElementById("bioB09M-extend");
      if (f) f.style.display = st === "flex" ? "" : "none";
      if (e) e.style.display = st === "extend" ? "" : "none";
      say("bioB09MuscleMsg", st === "flex"
        ? "屈肘：肱二头肌收缩、肱三头肌舒张。"
        : "伸肘：肱三头肌收缩、肱二头肌舒张。");
    },
    behav: function (key, btn) {
      markBtn(btn);
      say("bioB09BehavMsg", BEHAV_TXT[key] || "");
    }
  };
})();
