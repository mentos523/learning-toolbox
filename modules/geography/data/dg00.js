/* ============================================================
 * 学习工具箱 · 地理 · 第零章数据（dg00 导论——地理是什么）
 *
 * 章 dg00 导论：4 课 11 页（dg00.1.1=2、1.2=3、1.3=3、1.4=3）。
 *
 * 真值来源（优先级，见真值口径 §0.1）：
 *  ① params（本文件即 params：闯关答案见 data/_review/ledger-dg00.json）；
 *  ② 同页文案；③ curriculum 红线四辨析；④ pedagogy 第九章/T 系列；
 *  ⑤ 真值口径 GEO-R01–R57/GEO-AX01。
 * 本章为导论章：无等高线/气候/区时计算内容，不涉及红线四辨析的
 * 立靶；适用断言以 GEO-R23–R29（地图诚实）、GEO-R40–R43（因果链）、
 * GEO-R44/R46/R49–R51（术语规范）、GEO-AX01（近似显性化）为主。
 *
 * 渲染器约束（诚实声明）：modules/geography/js/geography.js 当前仅实现
 *  contour-3d / contour-quest / guess-verify 三种组件。本章只用
 *  guess-verify（先猜后验）+ 自绘 SVG 示意图；curriculum 指定的
 *  「拖拽归类」「对比演示」类交互需 G1–G13 其余类型渲染器实现后
 *  才能落地——缺口已报回协调者（见本章诚实缺口清单），本文件不造
 *  新 type。
 * 地图诚实：本章不出现中国政区图与国界图；全部示意图自绘，
 *  每幅配「示意」声明 + 适用边界（GEO-R24/GEO-AX01）。
 * 文案口径：黄队「文案即脚本」；学生文案零图示指代语；
 * 「先直觉后严格」分层（本章以直觉为主，不设严格层）；
 * 首现术语当页定义或指向定义课（GEO-R50/硬门禁⑧）。
 * 数学呼应缺口（GEO-R51 A 案已落地，批 3 P1）：curriculum 标注
 *  dg00.1.2 呼应「代数 ch00 数量级」——实测代数 ch00 为
 * 「导论——从算术到代数」无数量级内容；用户 2026-10-17 拍板 A 案：
 *  改呼应物理 p00.1.4《数量级与估算》。dg00.1.2-p2 学生可见文案已
 *  嵌入 physicslink 深链（geography.js physicslinkify →
 *  ../physics/index.html#p00.1.4/1，真机点击实测见
 *  ~/workspace/geo-audit/batch3-prod/）。
 * ============================================================ */
window.GEOGRAPHY_DATA = window.GEOGRAPHY_DATA || {};
window.GEOGRAPHY_DATA["dg00"] = {
  id: "dg00",
  units: [
    {
      id: "dg00.1",
      title: "地理初见",
      lessons: [
        /* ============ dg00.1.1 地理学研究什么（2 页） ============ */
        {
          id: "dg00.1.1",
          title: "地理学研究什么",
          prereq: "小学科学",
          time: "30–45 分钟",
          pages: [
            {
              id: "dg00.1.1-p1",
              kind: "interact",
              title: "现象归类：三个筐",
              exploreTip: "先猜：下面两个现象，地理学家最关心哪一面？点选项，再看解释。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "台风要来了，手机上的台风路径预报——地理学最关心的是什么？",
                    options: ["台风的名字好不好听", "它现在在哪、走哪条路线、影响哪些地方", "它最喜欢吃什么"],
                    answer: 1,
                    recordKey: "geog_quiz_dg00.1.1a",
                    explain: "地理学先问“在哪里”：位置、路线、影响范围——这就是位置视角。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "外卖软件显示“这家店配送范围 3 公里”——地理学看到的是什么？",
                    options: ["这家店的老板是谁", "配送范围覆盖了哪些小区、连成什么形状", "今天外卖打几折"],
                    answer: 1,
                    recordKey: "geog_quiz_dg00.1.1b",
                    explain: "地理学看“怎么分布、长什么样”：配送范围的形状和覆盖——这就是格局视角。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "地理学家看世界带着三个“筐”：看到现象先问——位置、格局，还是过程？" },
                { type: "text", html: "<strong>位置</strong>：它在哪里（台风在哪、走哪条线）。<strong>格局</strong>：长什么样、怎么分布（覆盖哪些小区）。<strong>过程</strong>：为什么是这样（范围为什么是 3 公里）。" },
                { type: "trap", text: "⚠️ 地理学不是“背地名”：地名是载体，看出“城市为什么长在江河边”才叫懂。" },
                { type: "slogan", text: "看到现象，先问：位置、格局，还是过程？" }
              ],
              point: "三个筐装下所有地理问题：位置（在哪里）、格局（长什么样、怎么分布）、过程（为什么这样）。"
            },
            {
              id: "dg00.1.1-p2",
              kind: "explain",
              title: "地理学研究什么",
              exploreTip: "先自己猜：地理学到底研究什么？再看定义对答案。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "下面哪个说法，最符合地理学的研究对象？",
                    options: ["记住尽可能多的地名和首都", "研究地球表层自然现象和人文现象的空间格局，以及人与环境的关系", "只研究地图怎么画"],
                    answer: 1,
                    recordKey: "geog_quiz_dg00.1.1c",
                    explain: "地名是载体，空间格局与人地关系才是研究对象——这就是地理学。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "还记得吗？你刚把两个现象装进三个筐——位置、格局、过程。这三个筐，就是地理学的“研究对象”。" },
                { type: "text", html: "<strong>地理学</strong>：研究地球表层自然现象和人文现象的空间格局、以及人地关系的科学。人话版：研究“地表上的东西在哪、长什么样、为什么是这样、人和地怎么相处”。" },
                { type: "text", html: "地理学分两大块——<strong>自然地理</strong>：地形、气候、河流；<strong>人文地理</strong>：人口、城市、交通。两块合起来，就是“人地关系”。" },
                { type: "text", html: "地理在你手机里：导航（位置）、天气预报（过程）、按距离找店（格局）——处处是地理。" },
                { type: "trap", text: "⚠️ 钉牢：“地理=背地名”是误解。地名是载体，空间格局与人地关系才是研究对象。" },
                { type: "slogan", text: "地理学：地表事物的空间格局 + 人地关系。" }
              ],
              point: "地理学研究地球表层自然与人文现象的空间格局，以及人地关系——地名是载体，不是研究对象。"
            }
          ]
        },
        /* ============ dg00.1.2 地理视角：空间与尺度（3 页） ============ */
        {
          id: "dg00.1.2",
          title: "地理视角：空间与尺度",
          prereq: "dg00.1.1 地理学研究什么",
          time: "40–60 分钟",
          pages: [
            {
              id: "dg00.1.2-p1",
              kind: "interact",
              title: "尺度一换，问题就变",
              exploreTip: "先看图：同一座东湖，三个人看出三个问题。再猜一猜——为什么？",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "游客、规划师、环保志愿者看同一座东湖，关心的问题各不相同。这说明什么？",
                    options: ["东湖有三个，是不同的湖", "观察的尺度和立场不同，看到的问题就不同", "其中两个人看错了"],
                    answer: 1,
                    recordKey: "geog_quiz_dg00.1.2a",
                    explain: "尺度一换，问题就变：游客看风景，规划师看用地，环保志愿者看水质——同一座湖，三种问题。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "同一座东湖：游客看风景、规划师看用地、环保看水质——不是湖变了，是“尺度”变了。" },
                {
                  type: "text",
                  html: "<svg viewBox=\"0 0 360 96\" width=\"100%\" role=\"img\" aria-label=\"尺度五级示意图：教室、学校、武汉、中国、世界，范围一级比一级大\">" +
                    "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\">" +
                    "<rect x=\"6\" y=\"14\" width=\"60\" height=\"40\" rx=\"6\"/>" +
                    "<rect x=\"78\" y=\"14\" width=\"60\" height=\"40\" rx=\"6\"/>" +
                    "<rect x=\"150\" y=\"14\" width=\"60\" height=\"40\" rx=\"6\"/>" +
                    "<rect x=\"222\" y=\"14\" width=\"60\" height=\"40\" rx=\"6\"/>" +
                    "<rect x=\"294\" y=\"14\" width=\"60\" height=\"40\" rx=\"6\"/>" +
                    "<line x1=\"66\" y1=\"34\" x2=\"78\" y2=\"34\"/><path d=\"M73,30 l6,4 -6,4\" fill=\"none\"/>" +
                    "<line x1=\"138\" y1=\"34\" x2=\"150\" y2=\"34\"/><path d=\"M145,30 l6,4 -6,4\" fill=\"none\"/>" +
                    "<line x1=\"210\" y1=\"34\" x2=\"222\" y2=\"34\"/><path d=\"M217,30 l6,4 -6,4\" fill=\"none\"/>" +
                    "<line x1=\"282\" y1=\"34\" x2=\"294\" y2=\"34\"/><path d=\"M289,30 l6,4 -6,4\" fill=\"none\"/>" +
                    "</g>" +
                    "<g font-size=\"14\" fill=\"currentColor\" text-anchor=\"middle\">" +
                    "<text x=\"36\" y=\"39\">教室</text><text x=\"108\" y=\"39\">学校</text><text x=\"180\" y=\"39\">武汉</text>" +
                    "<text x=\"252\" y=\"39\">中国</text><text x=\"324\" y=\"39\">世界</text>" +
                    "</g>" +
                    "<text x=\"180\" y=\"80\" font-size=\"12.48\" fill=\"currentColor\" text-anchor=\"middle\">范围 → 一级比一级大</text>" +
                    "</svg>" +
                    "<p class=\"geog-note\">示意｜非精确比例：只看“范围一级比一级大”，不量距离。</p>"
                },
                { type: "text", html: "<strong>空间视角</strong>：看“在哪里、什么格局”的眼光。<strong>尺度</strong>：观察的范围大小，分全球、国家、区域、地方四级。" },
                { type: "trap", text: "⚠️ “尺度”不是尺子，是观察的范围大小。" },
                { type: "slogan", text: "尺度一换，问题就变。" }
              ],
              point: "空间视角就是看“在哪里、什么格局”的眼光；尺度是观察的范围：全球、国家、区域、地方。"
            },
            {
              id: "dg00.1.2-p2",
              kind: "explain",
              title: "空间视角和尺度",
              exploreTip: "两个词，一次钉牢：空间视角是什么，尺度怎么用。",
              blocks: [
                { type: "lead", text: "你看东湖看出三个问题——用的就是空间视角。现在把这两个词一次钉牢。" },
                { type: "text", html: "<strong>空间视角</strong>：看“在哪里、什么格局”的眼光。拿到任何现象先问两句：它在哪里？它长什么样、怎么分布？" },
                { type: "text", html: "<strong>尺度</strong>：观察的范围大小，分全球、国家、区域、地方四级。同一现象，尺度不同，结论可能完全不同。" },
                { type: "text", html: "比如“人多”：全国尺度是“中国是人口大国”；小区尺度是“早高峰挤”——不是一回事。" },
                { type: "text", html: "尺度还有个数感：小区和城市差几个量级？<strong>数量级</strong> = 用 10 的多少次方估大小：差 10 倍是 1 个量级，差 100 倍是 2 个量级。" },
                { type: "physicslink", text: "跨科呼应：物理 p00.1.4《数量级与估算》专门讲“数量级”——10 的幂、估算三招（测多算少、身体当尺、拆成小步），点击可跳转到物理模块查看。" },
                { type: "trap", text: "⚠️ 大坑：尺度不能随意切换。国家尺度的结论，不直接套用到城市；到了地方，要重新看。" },
                { type: "slogan", text: "先定尺度，再下结论。" }
              ],
              point: "空间视角（在哪里、什么格局）+ 选对尺度（全球/国家/区域/地方）。"
            },
            {
              id: "dg00.1.2-p3",
              kind: "interact",
              title: "尺度闯关",
              exploreTip: "两道题，检验“先定尺度，再下结论”——都答对才算过关。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "“我国南方多雨”——这句话用的是哪个尺度？",
                    options: ["地方尺度（一个小区）", "国家尺度", "全球尺度"],
                    answer: 1,
                    recordKey: "geog_quiz_dg00.1.2b",
                    explain: "“我国南方”是国家内部的区域划分——国家尺度。具体到某市，还要再看。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "有人说：“国家尺度下南方多雨，所以我家小区今年一定多雨。”错在哪？",
                    options: ["“多雨”这个词用错了", "把国家尺度的结论直接套到了小区尺度", "南方其实不多雨"],
                    answer: 1,
                    recordKey: "geog_quiz_dg00.1.2c",
                    explain: "尺度不能随意切换：大尺度的总体结论，到小尺度要重新看、重新验证。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "两道题，收走这节课最要紧的一句话。" },
                { type: "slogan", text: "先定尺度，再下结论。" }
              ],
              point: "同一现象，尺度不同结论可能不同——先定尺度，再下结论；大尺度结论不直接套小尺度。"
            }
          ]
        },
        /* ============ dg00.1.3 地图的语言（3 页） ============ */
        {
          id: "dg00.1.3",
          title: "地图的语言",
          prereq: "dg00.1.2 地理视角：空间与尺度",
          time: "40–60 分钟",
          pages: [
            {
              id: "dg00.1.3-p1",
              kind: "interact",
              title: "缺件的地图",
              exploreTip: "先看两幅示意图：左边完整，右边缺了一件。再猜——缺的这一件有什么用？",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "右图缺了指向标（方向）。没有它，会发生什么？",
                    options: ["没什么，图照样能用", "分不清哪边是北，“往北走三百米”就没法走了", "图上的字会变小"],
                    answer: 1,
                    recordKey: "geog_quiz_dg00.1.3a",
                    explain: "方向、比例尺、图例是地图的三要素，缺一件，地图就“瘸”了——信息丢了，图就没法用。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "地图是地理的第二语言：三件行头缺一件，就说不清话。" },
                {
                  type: "text",
                  html: "<svg viewBox=\"0 0 360 168\" width=\"100%\" role=\"img\" aria-label=\"对比示意图：左边是三要素齐全的完整地图，右边是缺了指向标的地图\">" +
                    "<g font-size=\"12.48\" fill=\"currentColor\" text-anchor=\"middle\">" +
                    "<text x=\"90\" y=\"16\">完整：三件齐</text><text x=\"270\" y=\"16\">缺件：少了方向</text>" +
                    "</g>" +
                    "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\">" +
                    "<rect x=\"8\" y=\"24\" width=\"164\" height=\"136\" rx=\"6\"/>" +
                    "<rect x=\"188\" y=\"24\" width=\"164\" height=\"136\" rx=\"6\"/>" +
                    "<path d=\"M20,120 C60,100 100,140 160,110\"/>" +
                    "<path d=\"M200,120 C240,100 280,140 340,110\"/>" +
                    "<rect x=\"20\" y=\"130\" width=\"52\" height=\"8\"/>" +
                    "<rect x=\"200\" y=\"130\" width=\"52\" height=\"8\"/>" +
                    "<rect x=\"100\" y=\"36\" width=\"60\" height=\"26\" rx=\"3\"/>" +
                    "<rect x=\"280\" y=\"36\" width=\"60\" height=\"26\" rx=\"3\"/>" +
                    "</g>" +
                    "<g stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\">" +
                    "<line x1=\"40\" y1=\"56\" x2=\"40\" y2=\"36\"/><path d=\"M34,42 L40,32 L46,42\"/>" +
                    "</g>" +
                    "<g font-size=\"12.48\" fill=\"currentColor\" text-anchor=\"middle\">" +
                    "<text x=\"40\" y=\"72\">北</text>" +
                    "<text x=\"130\" y=\"52\">图例</text><text x=\"310\" y=\"52\">图例</text>" +
                    "<text x=\"46\" y=\"146\">比例尺</text><text x=\"226\" y=\"146\">比例尺</text>" +
                    "</g>" +
                    "<g font-size=\"12.48\" fill=\"currentColor\" text-anchor=\"middle\">" +
                    "<text x=\"270\" y=\"60\">？</text>" +
                    "</g>" +
                    "<circle cx=\"270\" cy=\"52\" r=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/>" +
                    "</svg>" +
                    "<p class=\"geog-note\">示意｜非精确比例：看“缺件丢信息”，不量距离。</p>"
                },
                { type: "text", html: "<strong>地图</strong>：把地表现象画在平面上的图。说话靠三件套——<strong>方向</strong>（哪边是北）、<strong>比例尺</strong>（图上与实地距离的比）、<strong>图例</strong>（符号“翻译官”）。" },
                { type: "trap", text: "⚠️ 地图不是缩小照片：圆地球画到平纸上必有变形——它是“有选择的画像”。" },
                { type: "slogan", text: "无图，不地理。" }
              ],
              point: "地图有三件套：方向、比例尺、图例——缺一件，信息就丢一件。"
            },
            {
              id: "dg00.1.3-p2",
              kind: "explain",
              title: "地图三要素",
              exploreTip: "三件套一件一件看：每件是干什么的、缺了会丢什么。",
              blocks: [
                { type: "lead", text: "还记得缺方向的那幅图吗？现在把三件套一件一件钉牢——它们是全书所有地图的“身份证”。" },
                { type: "text", html: "<strong>方向</strong>：哪边是北。常见标记是指向标（箭头指北）。整套定向方法，见 dg01.3.2。" },
                { type: "text", html: "<strong>比例尺</strong>：图上距离和实地距离的比（“图上 1 厘米 = 实地 1 千米”）。三种表示与换算，见 dg01.3.1。" },
                { type: "text", html: "<strong>图例</strong>：符号的“翻译官”，不许猜。常见符号认读，见 dg01.3.2。" },
                { type: "text", html: "习惯：拿到地图先看三要素条——方向｜比例尺｜图例，齐了再读图。" },
                { type: "trap", text: "⚠️ 纠偏：地图不是“配图的插图”，是地理的论证载体——结论从图上读出来，无图不地理。" },
                { type: "slogan", text: "先看三要素，再读图。" }
              ],
              point: "地图是地理的第二语言；方向、比例尺、图例是它的三要素——先看三要素条，再读图。"
            },
            {
              id: "dg00.1.3-p3",
              kind: "interact",
              title: "三要素找茬",
              exploreTip: "一幅手绘路线图，缺了一件：找出来。再想想——等值线是什么？",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "这幅“从家到学校”的手绘路线图：有方向、有图例，缺了什么？",
                    options: ["缺了比例尺——不知道“三百米”在图上画多长", "缺了颜色", "什么都不缺"],
                    answer: 0,
                    recordKey: "geog_quiz_dg00.1.3b",
                    explain: "缺比例尺：“往前走三百米”在图上画多长？没比例尺，距离说不清。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "另一幅图：有方向、有比例尺，但满页符号没注释。缺了什么？",
                    options: ["缺了标题", "缺了图例——符号意思得靠猜", "缺了边框"],
                    answer: 1,
                    recordKey: "geog_quiz_dg00.1.3c",
                    explain: "缺图例：符号的意思必须查“翻译官”，不许猜。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "找茬：下面这幅手绘路线图，缺了一件三要素。" },
                {
                  type: "text",
                  html: "<svg viewBox=\"0 0 360 140\" width=\"100%\" role=\"img\" aria-label=\"手绘路线图示意：从家出发沿路向北三百米到学校，有指向标和图例，缺比例尺\">" +
                    "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\">" +
                    "<path d=\"M40,110 L40,70 L120,70 L120,40 L220,40\" stroke-dasharray=\"7 4\"/>" +
                    "<rect x=\"24\" y=\"100\" width=\"34\" height=\"22\" rx=\"3\"/>" +
                    "<rect x=\"203\" y=\"29\" width=\"34\" height=\"22\" rx=\"3\"/>" +
                    "<rect x=\"270\" y=\"86\" width=\"74\" height=\"40\" rx=\"3\"/>" +
                    "</g>" +
                    "<g stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\">" +
                    "<line x1=\"316\" y1=\"52\" x2=\"316\" y2=\"32\"/><path d=\"M310,38 L316,28 L322,38\"/>" +
                    "</g>" +
                    "<g font-size=\"12.48\" fill=\"currentColor\" text-anchor=\"middle\">" +
                    "<text x=\"41\" y=\"115\">家</text><text x=\"220\" y=\"44\">学校</text>" +
                    "<text x=\"316\" y=\"66\">北</text>" +
                    "<text x=\"307\" y=\"102\">图例：┄ 路线</text>" +
                    "<text x=\"80\" y=\"62\">向北三百米</text>" +
                    "</g>" +
                    "</svg>" +
                    "<p class=\"geog-note\">示意｜非精确比例：手绘路线图，看“缺件”，不量距离。“三百米”在图上画多长？没比例尺，说不清。</p>"
                },
                { type: "text", html: "预告：地图上还有一类特殊的线——把数值相等的地方连起来。比如把海拔相同的地方连起来，叫<strong>等高线</strong>；这类线统称<strong>等值线</strong>。整套讲法，见 dg01.3.3。" },
                              ],
              point: "三要素找茬过关。预告：等高线是“等值线”的一种——把海拔相同的地方连起来，整套见 dg01.3.3。"
            }
          ]
        },
        /* ============ dg00.1.4 区域认知的方法（3 页） ============ */
        {
          id: "dg00.1.4",
          title: "区域认知的方法",
          prereq: "dg00.1.3 地图的语言",
          time: "40–60 分钟",
          pages: [
            {
              id: "dg00.1.4-p1",
              kind: "interact",
              title: "认识武汉：先找到它",
              exploreTip: "先动手：在示意图上找到武汉。再猜——认识一个地方，第一步做什么？",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "要认识“武汉”这个地方，第一步应该做什么？",
                    options: ["先讲它为什么夏天热", "先在图上找到它：它在哪", "先背下它的人口数字"],
                    answer: 1,
                    recordKey: "geog_quiz_dg00.1.4a",
                    explain: "顺序不能反：先定位（它在哪），再描述（它什么样），最后解释（为什么这样）。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "认识一个地方，固定三步：定位→描述→解释。今天拿武汉走一遍。" },
                {
                  type: "text",
                  html: "<svg viewBox=\"0 0 360 150\" width=\"100%\" role=\"img\" aria-label=\"武汉位置示意图：长江横贯，汉江自北汇入，交汇处标出武汉\">" +
                    "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">" +
                    "<path d=\"M14,96 C80,84 140,104 210,92 C270,82 310,96 348,88\"/>" +
                    "<path d=\"M176,14 C170,44 186,66 180,92\"/>" +
                    "</g>" +
                    "<g stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\">" +
                    "<line x1=\"326\" y1=\"44\" x2=\"326\" y2=\"24\"/><path d=\"M320,30 L326,20 L332,30\"/>" +
                    "</g>" +
                    "<circle cx=\"180\" cy=\"92\" r=\"6\" fill=\"currentColor\"/>" +
                    "<g font-size=\"12.48\" fill=\"currentColor\" text-anchor=\"middle\">" +
                    "<text x=\"180\" y=\"116\">武汉</text>" +
                    "<text x=\"300\" y=\"80\">长江</text>" +
                    "<text x=\"150\" y=\"40\">汉江</text>" +
                    "<text x=\"326\" y=\"58\">北</text>" +
                    "</g>" +
                    "</svg>" +
                    "<p class=\"geog-note\">示意｜非精确比例｜方向仅供参考：看“武汉在两江交汇处”，不查距离、不量面积。</p>"
                },
                { type: "text", html: "<strong>定位</strong>：先在图上找到它。武汉约 30°N、114°E，在长江和汉江交汇处。三招：经纬网（见 dg01.2.3）、海陆位置（靠海还是内陆）、相对位置（在参照物的哪边）。" },
                              ],
              point: "认识区域第一步：定位——在图上找到它（经纬网/海陆/相对位置），顺序不能反。"
            },
            {
              id: "dg00.1.4-p2",
              kind: "explain",
              title: "定位→描述→解释",
              exploreTip: "三步一次建制：每一步是干什么、怎么做。",
              blocks: [
                { type: "lead", text: "先在图上找到武汉——那就是定位。现在把三步建制完整。" },
                { type: "text", html: "<strong>定位</strong>：它在哪。经纬网（武汉约 30°N、114°E，先纬后经，见 dg01.2.3）、海陆位置（靠海还是内陆）、相对位置（如“武汉在北京的南边”）。" },
                { type: "text", html: "<strong>描述</strong>：它长什么样。结构：位置→自然（地形、气候、河流）→人文（人口、城市、交通）。不许堆砌。" },
                { type: "text", html: "<strong>解释</strong>：为什么这样，讲因果链。武汉夏天热：纬度低晒得狠 + 平原低地散热慢 + 副热带高压笼罩（下沉增温，见 dg14.3.1）。" },
                { type: "trap", text: "⚠️ 描述≠堆砌，要有结构；解释≠复述，要讲因果链，不许单因论。" },
                { type: "text", html: "三步是全书区域课模板：dg06 起每学一区域，第一页先定位。" },
                { type: "slogan", text: "定位→描述→解释，顺序不许颠倒。" }
              ],
              point: "三步法：定位（在哪）→描述（什么样，有结构）→解释（为什么，讲因果链）。"
            },
            {
              id: "dg00.1.4-p3",
              kind: "interact",
              title: "走一遍：我们的小区",
              exploreTip: "三道题，带“我们的小区”走完三步——每步一题。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "第一步·定位：要介绍“我们的小区”，定位这一步该做什么？",
                    options: ["直接讲小区的房价", "说清它在哪：哪个城市、哪个区、在哪条路边", "数小区里有多少棵树"],
                    answer: 1,
                    recordKey: "geog_quiz_dg00.1.4b",
                    explain: "定位就是“在图上找到它”：城市、区位、相对位置，先把“在哪”钉牢。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "第二步·描述：下面哪种描述是“有结构”的？",
                    options: ["绿化好、门口有超市、房价贵、邻居热情（想到哪说到哪）", "位置→自然→人文：先说在哪，再说环境，最后说人和生活", "只说房价，别的都不说"],
                    answer: 1,
                    recordKey: "geog_quiz_dg00.1.4c",
                    explain: "描述的结构：位置→自然→人文。堆砌事实不叫描述。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "第三步·解释：“小区门口早餐店特别多”，下面哪个是“解释”？",
                    options: ["早餐店有 12 家（复述数字）", "因为小区人多、上班族赶时间——需求大，所以店多（因果链）", "早餐店都很好吃"],
                    answer: 1,
                    recordKey: "geog_quiz_dg00.1.4d",
                    explain: "解释讲因果链：“因为……所以……”，不许单因论，也不能只复述现象。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "拿“我们的小区”走一遍三步法——以后每个区域都这么走。" },
                { type: "text", html: "三步走完，你已经会“认识”一个地方。以后你还会发现：认识，是为了“用”——比如防汛先保哪、工厂建在哪，都是这三步的延续。" },
                { type: "slogan", text: "定位→描述→解释——全书区域课，一个模板。" }
              ],
              point: "三步法走完：先找到它，再说清它，最后讲透为什么——顺序不许颠倒。"
            }
          ]
        }
      ]
    }
  ]
};
