/* ============================================================
 * 学习工具箱 · 生物 · 第七章数据（生物 P10 生产队 2026-10-19）
 *
 * 课：b07.1.1 神经系统的组成（3 页）/ b07.1.2 反射与反射弧
 *     （3 页）/ b07.1.3 眼、耳与感觉（2 页）/
 *     b07.1.4 激素调节（2 页）/ b07.1.5 本章小结与习题
 *     （2 页）。共 12 页。
 * 交互：神经元结构点选 / 反射弧五部分拼搭闯关 / 膝跳反射
 * 分步演示 / 眼球成像模拟（晶状体曲度可调看近视）/
 * 激素—腺体—作用配对，均为纯 HTML 内联 handler
 * （window.BIO_B07，b06 的 window.BIO_B06 双循环闯关先例），
 * B14 不立（任务书红线：上限 1 个、优先复用现有原语；
 * 经评估 .tb-btn + 内联 SVG 可满足，协调者可挑战）。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 「模式图：非等比、非实物」（BIO-R32，结构示意图常驻：
 *   神经元/反射弧/眼球/耳）
 * - 「虚拟实验：现实中须××」（BIO-R35，眼球成像模拟页写实：
 *   现实中须经医院专业验光配镜，不自行判断度数、网购眼镜）
 * - BIO-R05：神经≠神经元——「神经是神经纤维的集合，
 *   神经元是单个细胞」（b07.1.1-p3 专治）
 * - 反射弧五部分顺序固定（b07.1.2）
 * - 近视戴凹透镜（b07.1.3-p1；「凸透镜」= FAIL）
 * - 胰岛素口服无效：蛋白质，口服被消化，必须注射
 *   （b07.1.4-p2；「口服有效」= FAIL）
 * - 糖尿病表述克制：只讲机制，不讲诊疗建议
 * - 直引号；type:"text" 的块用 html 键（P4 教训）
 *
 * 门禁⑧：新术语首现即定义——神经元（b07.1.1-p2）/
 * 反射/反射弧/感受器/效应器（b07.1.2-p1）/
 * 晶状体/视网膜（b07.1.3-p1）/ 内分泌腺/激素/胰岛素
 * （b07.1.4-p1）。
 * 门禁⑨：深链只用已生产课号（b03/b05/b06/b13/b14、b16–b21）；
 * b08/b12 未生产只纯文本；b07↔b15 不硬链。
 * 门禁⑩：本批无新登记预告（b22 高中回填为纯文本提及，
 * 未生产不挂深链）。
 * 门禁⑪：quiz 页题目数 > 0（b07.1.5 两页：3 + 4）。
 * 闯关记录：会话内有效，不写 localStorage（不发明新
 * recordKey 格式；P9 先例）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b07"] = {
  id: "b07",
  units: [
    {
      id: "b07.1",
      title: "神经调节与激素调节（现象篇）",
      lessons: [
        {
          id: "b07.1.1",
          title: "神经系统的组成",
          prereq: "b06 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：中枢/周围两大部 ============ */
            {
              id: "b07.1.1-p1",
              kind: "explain",
              title: "神经系统：中枢和周围",
              blocks: [
                { type: "lead", text: "身体的\"指挥系统\"分两部分：一个坐镇中央，一个遍布全身。" },
                { type: "text", html: "先认词——神经系统：调节人体各项生命活动的系统，由中枢神经系统和周围神经系统两部分组成。" },
                { type: "text", html: "中枢神经系统：脑和脊髓。脑是大本营（管思考、记忆、发号施令）；脊髓是\"信息高速公路\"的主干道（上传下达）。" },
                { type: "text", html: "周围神经系统：脑神经和脊神经。它们像\"支线电缆\"：把中枢的命令送到全身各处，也把各处的消息传回中枢。" },
                { type: "note", text: "三问自查——中枢是哪两个？周围是哪两种神经？脑和脊髓谁管思考？（答案在本页）" }
              ],
              point: "神经系统=中枢（脑/脊髓）+周围（脑神经/脊神经）。"
            },
            /* ============ p2：神经元 + 结构点选 ============ */
            {
              id: "b07.1.1-p2",
              kind: "explain",
              title: "神经元：神经系统的\"元件\"",
              blocks: [
                { type: "lead", text: "神经系统由一个个小细胞搭起来——它们叫神经元。" },
                { type: "text", html: "先认词——神经元：构成神经系统的基本单位，是单个神经细胞，由胞体和突起两部分组成。" },
                { type: "text", html: "结构分工：胞体（细胞的主体，含细胞核）；突起分两种——树突（短而多，像树枝一样接收信号）、轴突（长而少，把信号传出去）。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<svg viewBox=\"0 0 380 170\" width=\"100%\" role=\"img\" aria-label=\"神经元模式图\" style=\"max-width:400px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<g style=\"cursor:pointer\" onclick=\"BIO_B07.neuron('dendrite',this)\"><path d=\"M110,85 L60,55 M110,85 L55,85 M110,85 L60,115\" style=\"fill:none;stroke:var(--bio-organelle)\" stroke-width=\"4\" stroke-linecap=\"round\"/><text x=\"70\" y=\"140\" style=\"fill:var(--bio-text)\">树突</text></g>" +
                  "<g style=\"cursor:pointer\" onclick=\"BIO_B07.neuron('soma',this)\"><circle cx=\"130\" cy=\"85\" r=\"24\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/><text x=\"130\" y=\"90\" style=\"fill:var(--bio-text)\">胞体</text></g>" +
                  "<g style=\"cursor:pointer\" onclick=\"BIO_B07.neuron('axon',this)\"><rect x=\"154\" y=\"79\" width=\"130\" height=\"12\" rx=\"6\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/><text x=\"219\" y=\"70\" style=\"fill:var(--bio-text)\">轴突</text></g>" +
                  "<g style=\"cursor:pointer\" onclick=\"BIO_B07.neuron('terminal',this)\"><path d=\"M284,85 L320,60 M284,85 L325,85 M284,85 L320,110\" style=\"fill:none;stroke:var(--bio-organelle)\" stroke-width=\"4\" stroke-linecap=\"round\"/><text x=\"315\" y=\"140\" style=\"fill:var(--bio-text)\">神经末梢</text></g>" +
                  "<text x=\"190\" y=\"162\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</g></svg>" +
                  "<div id=\"bioB07Neuron\" style=\"min-height:3.2em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点图中各部分，看它的分工。</div>" +
                  "</div>" },
                { type: "note", text: "动手：遮住上面，画出神经元并标出胞体/树突/轴突/神经末梢。" }
              ],
              point: "神经元=单个细胞（胞体+突起）；神经系统的基本单位。"
            },
            /* ============ p3：误区专治 神经≠神经元 ============ */
            {
              id: "b07.1.1-p3",
              kind: "explain",
              title: "专治：\"神经=神经元\"？",
              blocks: [
                { type: "lead", text: "\"神经\"和\"神经元\"，一字之差，意思差了十万八千里。" },
                { type: "text", html: "纠错——神经：是神经纤维的集合，像一条条\"线缆\"，把信号在中枢和各器官之间来回传送。" },
                { type: "text", html: "神经元：是单个细胞，是神经系统的\"元件\"。一个神经元只有一条轴突，而一条神经里集合了成千上万条神经纤维。" },
                { type: "trap", text: "⚠️ \"神经=神经元\"错——神经是神经纤维的集合（线缆），神经元是单个细胞（元件）。" },
                { type: "note", text: "一句话：神经是\"线缆\"（集合），神经元是\"元件\"（单个）。复述一遍。" }
              ],
              point: "神经是神经纤维的集合；神经元是单个细胞。"
            }
          ]
        },
        {
          id: "b07.1.2",
          title: "反射与反射弧",
          prereq: "神经系统的组成",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：反射弧五部分 + 拼搭闯关 ============ */
            {
              id: "b07.1.2-p1",
              kind: "explain",
              title: "反射弧：五部分接力",
              blocks: [
                { type: "lead", text: "手碰到烫的东西会立刻缩回——这条\"闪电通路\"叫反射弧。" },
                { type: "text", html: "先认词——反射：人体经神经系统，对外界或内部刺激发生的有规律的反应。先认词——反射弧：完成反射的神经结构。" },
                { type: "text", html: "先认词——感受器：接受刺激的末梢或感觉器官。先认词——效应器：传出神经末梢及其支配的肌肉或腺体。" },
                { type: "text", html: "五部分，顺序固定：感受器（收刺激）→ 传入神经（传向中枢）→ 神经中枢（分析发令）→ 传出神经（传出命令）→ 效应器（执行）。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<svg id=\"bioB07Arc\" viewBox=\"0 0 400 150\" width=\"100%\" role=\"img\" aria-label=\"反射弧拼搭闯关\" style=\"max-width:440px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<rect x=\"8\" y=\"30\" width=\"64\" height=\"52\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"感受器\" onclick=\"BIO_B07.arc('感受器',this)\"/><text x=\"40\" y=\"60\" style=\"fill:var(--bio-text);pointer-events:none\">感受器</text>" +
                  "<rect x=\"88\" y=\"30\" width=\"64\" height=\"52\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"传入神经\" onclick=\"BIO_B07.arc('传入神经',this)\"/><text x=\"120\" y=\"60\" style=\"fill:var(--bio-text);pointer-events:none;font-size:12.48\">传入神经</text>" +
                  "<rect x=\"168\" y=\"30\" width=\"64\" height=\"52\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"神经中枢\" onclick=\"BIO_B07.arc('神经中枢',this)\"/><text x=\"200\" y=\"60\" style=\"fill:var(--bio-text);pointer-events:none;font-size:12.48\">神经中枢</text>" +
                  "<rect x=\"248\" y=\"30\" width=\"64\" height=\"52\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"传出神经\" onclick=\"BIO_B07.arc('传出神经',this)\"/><text x=\"280\" y=\"60\" style=\"fill:var(--bio-text);pointer-events:none;font-size:12.48\">传出神经</text>" +
                  "<rect x=\"328\" y=\"30\" width=\"64\" height=\"52\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft);cursor:pointer\" stroke-width=\"2\" data-st=\"效应器\" onclick=\"BIO_B07.arc('效应器',this)\"/><text x=\"360\" y=\"60\" style=\"fill:var(--bio-text);pointer-events:none\">效应器</text>" +
                  "<text x=\"80\" y=\"56\" style=\"fill:var(--bio-aux)\">→</text><text x=\"160\" y=\"56\" style=\"fill:var(--bio-aux)\">→</text><text x=\"240\" y=\"56\" style=\"fill:var(--bio-aux)\">→</text><text x=\"320\" y=\"56\" style=\"fill:var(--bio-aux)\">→</text>" +
                  "<text x=\"200\" y=\"120\" style=\"fill:var(--bio-ink-soft)\">点方块拼顺序</text>" +
                  "<text x=\"200\" y=\"140\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</g></svg>" +
                  "<div><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B07.arcReset()\">重来</button></div>" +
                  "<div id=\"bioB07ArcMsg\" style=\"min-height:3.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点\"感受器\"开始拼。</div>" +
                  "</div>" },
                { type: "note", text: "动手：说出五部分顺序（传入在前、传出在后）。" }
              ],
              point: "反射弧五部分顺序固定：感受器→传入神经→神经中枢→传出神经→效应器。"
            },
            /* ============ p2：膝跳反射 ============ */
            {
              id: "b07.1.2-p2",
              kind: "explain",
              title: "膝跳反射：最简单的反射弧",
              blocks: [
                { type: "lead", text: "轻轻敲一下膝盖下面的韧带，小腿会不由自主地踢出去——为什么拦不住？" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B07.knee(1,this)\">① 敲击</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B07.knee(2,this)\">② 传入</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B07.knee(3,this)\">③ 中枢</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B07.knee(4,this)\">④ 传出</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B07.knee(5,this)\">⑤ 踢腿</button>" +
                  "<div id=\"bioB07Knee\" style=\"min-height:5em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点按钮，走一遍膝跳反射的反射弧。</div>" +
                  "</div>" },
                { type: "text", html: "关键：这个反射的中枢在脊髓，不经过大脑——所以你想拦也拦不住，快到\"不讲理\"。低级中枢平时受大脑调控（比如憋尿），但膝跳反射太快，大脑来不及插手。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 150\" width=\"100%\" role=\"img\" aria-label=\"膝跳反射模式图\" style=\"max-width:360px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<rect x=\"20\" y=\"50\" width=\"70\" height=\"50\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/><text x=\"55\" y=\"79\" style=\"fill:var(--bio-text);font-size:12.48\">膝盖韧带</text>" +
                  "<path d=\"M90,75 L130,75\" style=\"stroke:var(--bio-target)\" stroke-width=\"3\" marker-end=\"none\"/><text x=\"110\" y=\"65\" style=\"fill:var(--bio-target);font-size:12.48\">传入</text>" +
                  "<rect x=\"130\" y=\"50\" width=\"70\" height=\"50\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/><text x=\"165\" y=\"79\" style=\"fill:var(--bio-text);font-size:12.48\">脊髓中枢</text>" +
                  "<path d=\"M200,75 L240,75\" style=\"stroke:var(--bio-target)\" stroke-width=\"3\"/><text x=\"220\" y=\"65\" style=\"fill:var(--bio-target);font-size:12.48\">传出</text>" +
                  "<rect x=\"240\" y=\"50\" width=\"80\" height=\"50\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/><text x=\"280\" y=\"79\" style=\"fill:var(--bio-text);font-size:12.48\">大腿肌肉</text>" +
                  "<text x=\"170\" y=\"130\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</g></svg>" },
                { type: "note", text: "两问：膝跳反射的中枢在哪？为什么拦不住？（答案在本页）" }
              ],
              point: "膝跳反射：中枢在脊髓，不经大脑，所以拦不住。"
            },
            /* ============ p3：简单/复杂反射 + 误区专治 ============ */
            {
              id: "b07.1.2-p3",
              kind: "explain",
              title: "简单反射与复杂反射",
              blocks: [
                { type: "lead", text: "缩手、眨眼天生就会；\"望梅止渴\"却要先知道\"梅子酸\"才行。" },
                { type: "text", html: "简单反射：生来就有，不用学（缩手反射、眨眼反射、膝跳反射）。中枢多在脊髓、脑干等低级部位。" },
                { type: "text", html: "复杂反射：在生活经验基础上形成，需要大脑皮层参与（望梅止渴、谈虎色变、听到上课铃进教室）。条件变了还可能消退。" },
                { type: "trap", text: "⚠️ \"反射弧顺序可乱\"错——顺序固定！传入神经在前、传出神经在后，反了信号就走不通。" },
                { type: "note", text: "分类练习：眨眼/望梅止渴/缩手/谈虎色变，哪个是简单反射？（答案：眨眼、缩手）" }
              ],
              point: "简单反射生来有；复杂反射要学习、需大脑皮层；反射弧顺序固定。"
            }
          ]
        },
        {
          id: "b07.1.3",
          title: "眼、耳与感觉",
          prereq: "反射与反射弧",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：眼球 + 视觉 + 成像模拟 ============ */
            {
              id: "b07.1.3-p1",
              kind: "explain",
              title: "眼球：身体的\"照相机\"",
              blocks: [
                { type: "lead", text: "光线怎样变成\"看见\"的画面？看眼球这台\"照相机\"。" },
                { type: "text", html: "先认词——晶状体：透明有弹性的双凸透镜，会聚光线。先认词——视网膜：内层感光结构，光线在此成像。" },
                { type: "text", html: "视觉：光线→角膜→瞳孔→晶状体→玻璃体→视网膜（倒立缩小实像）→视神经→大脑。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B07.eye('normal',this)\">正常眼</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B07.eye('myopia',this)\">近视眼</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B07.eye('glasses',this)\">戴凹透镜</button>" +
                  "<svg viewBox=\"0 0 360 200\" width=\"100%\" role=\"img\" aria-label=\"眼球成像模拟\" style=\"max-width:400px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<ellipse cx=\"200\" cy=\"85\" rx=\"85\" ry=\"55\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/>" +
                  "<ellipse cx=\"165\" cy=\"85\" rx=\"13\" ry=\"30\" style=\"fill:var(--bio-organelle);opacity:0.55\"/>" +
                  "<text x=\"165\" y=\"132\" style=\"fill:var(--bio-text);font-size:12.48\">晶状体</text>" +
                  "<line x1=\"272\" y1=\"34\" x2=\"272\" y2=\"136\" style=\"stroke:var(--bio-target)\" stroke-width=\"4\"/>" +
                  "<text x=\"272\" y=\"154\" style=\"fill:var(--bio-text);font-size:12.48\">视网膜</text>" +
                  "<g id=\"bioB07EyeNormal\">" +
                  "<path d=\"M30,58 L272,85 M30,85 L272,85 M30,112 L272,85\" style=\"fill:none;stroke:var(--bio-highlight)\" stroke-width=\"2.5\"/>" +
                  "<circle cx=\"272\" cy=\"85\" r=\"5\" style=\"fill:var(--bio-highlight)\"/>" +
                  "</g>" +
                  "<g id=\"bioB07EyeMyopia\" style=\"display:none\">" +
                  "<path d=\"M30,58 L240,85 M30,85 L240,85 M30,112 L240,85\" style=\"fill:none;stroke:var(--bio-highlight)\" stroke-width=\"2.5\"/>" +
                  "<circle cx=\"240\" cy=\"85\" r=\"5\" style=\"fill:var(--bio-highlight)\"/>" +
                  "<path d=\"M240,85 L272,85\" style=\"stroke:var(--bio-aux)\" stroke-width=\"2\" stroke-dasharray=\"5,4\"/>" +
                  "</g>" +
                  "<g id=\"bioB07EyeGlasses\" style=\"display:none\">" +
                  "<path d=\"M110,38 Q122,85 110,132 M110,38 Q98,85 110,132\" style=\"fill:none;stroke:var(--bio-membrane)\" stroke-width=\"4\"/>" +
                  "<text x=\"110\" y=\"154\" style=\"fill:var(--bio-text);font-size:12.48\">凹透镜</text>" +
                  "<path d=\"M30,58 L110,68 L272,85 M30,85 L110,85 L272,85 M30,112 L110,102 L272,85\" style=\"fill:none;stroke:var(--bio-highlight)\" stroke-width=\"2.5\"/>" +
                  "<circle cx=\"272\" cy=\"85\" r=\"5\" style=\"fill:var(--bio-highlight)\"/>" +
                  "</g>" +
                  "<text x=\"180\" y=\"192\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</g></svg>" +
                  "<div id=\"bioB07Eye\" style=\"min-height:3.2em;margin-top:6px;font-size:0.95rem;line-height:1.7\">当前：正常眼（像落在视网膜上）。</div>" +
                  "<div style=\"font-size:0.85rem;color:var(--bio-ink-soft)\">虚拟实验：现实中须验光配镜。</div>" +
                  "</div>" },
                { type: "text", html: "近视：晶状体曲度过大，像落在视网膜前方→看不清远处；戴凹透镜矫正。" },
                { type: "text", html: "虚拟实验：现实中须去医院验光配镜。" },
                { type: "trap", text: "⚠️ \"近视戴凸透镜\"错——近视戴凹透镜！远视才戴凸透镜。" },
                { type: "note", text: "动手：点三遍模拟，复述近视成因和矫正。" }
              ],
              point: "晶状体会聚、视网膜成像；近视戴凹透镜。"
            },
            /* ============ p2：耳 + 听觉 ============ */
            {
              id: "b07.1.3-p2",
              kind: "explain",
              title: "耳：声音的\"接收器\"",
              blocks: [
                { type: "lead", text: "声音怎么变成你\"听见\"的话？耳分三段接力。" },
                { type: "text", html: "耳的结构：外耳（耳郭收集声波，外耳道传声）→ 中耳（鼓膜振动，听小骨放大传到内耳）→ 内耳（耳蜗：有听觉感受器，把振动变成神经信号）。" },
                { type: "text", html: "听觉形成：声波 → 外耳道 → 鼓膜（振动）→ 听小骨（放大）→ 耳蜗（听觉感受器产生信号）→ 听神经 → 大脑皮层听觉中枢（形成听觉）。" },
                { type: "text", html: "<svg viewBox=\"0 0 360 150\" width=\"100%\" role=\"img\" aria-label=\"耳结构模式图\" style=\"max-width:400px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<rect x=\"14\" y=\"45\" width=\"70\" height=\"60\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/><text x=\"49\" y=\"80\" style=\"fill:var(--bio-text);font-size:12.48\">外耳</text>" +
                  "<rect x=\"104\" y=\"45\" width=\"70\" height=\"60\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/><text x=\"139\" y=\"72\" style=\"fill:var(--bio-text);font-size:12.48\">中耳</text><text x=\"139\" y=\"92\" style=\"fill:var(--bio-text);font-size:12.48\">鼓膜·听小骨</text>" +
                  "<rect x=\"194\" y=\"45\" width=\"70\" height=\"60\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/><text x=\"229\" y=\"72\" style=\"fill:var(--bio-text);font-size:12.48\">内耳</text><text x=\"229\" y=\"92\" style=\"fill:var(--bio-text);font-size:12.48\">耳蜗</text>" +
                  "<rect x=\"284\" y=\"45\" width=\"62\" height=\"60\" rx=\"10\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/><text x=\"315\" y=\"80\" style=\"fill:var(--bio-text);font-size:12.48\">大脑</text>" +
                  "<text x=\"94\" y=\"80\" style=\"fill:var(--bio-aux)\">→</text><text x=\"184\" y=\"80\" style=\"fill:var(--bio-aux)\">→</text><text x=\"274\" y=\"80\" style=\"fill:var(--bio-aux)\">→</text>" +
                  "<text x=\"180\" y=\"132\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</g></svg>" },
                { type: "note", text: "护耳两条：不用尖锐物掏耳（防伤鼓膜）；巨大声响时张口或捂耳（防鼓膜震伤）。" }
              ],
              point: "耳分外/中/内；鼓膜→听小骨→耳蜗→听神经→大脑。"
            }
          ]
        },
        {
          id: "b07.1.4",
          title: "激素调节",
          prereq: "眼、耳与感觉",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：内分泌腺 + 三种激素 + 配对 ============ */
            {
              id: "b07.1.4-p1",
              kind: "explain",
              title: "激素：血液里的\"信使\"",
              blocks: [
                { type: "lead", text: "不用神经，身体里还有一套\"慢广播\"——激素。" },
                { type: "text", html: "先认词——内分泌腺：没有导管，分泌物（激素）直接进入血液的腺体。先认词——激素：由内分泌腺分泌、经血液传送、对身体有调节作用的化学物质。量很少，作用很大。" },
                { type: "text", html: "三对主角：垂体 → 生长激素（管长个儿）；甲状腺 → 甲状腺激素（管代谢快慢、生长发育）；胰岛（胰腺里分泌胰岛素的细胞团）→ 胰岛素（管血糖）。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B07.hormone(1,this)\">生长激素</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B07.hormone(2,this)\">甲状腺激素</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B07.hormone(3,this)\">胰岛素</button>" +
                  "<div id=\"bioB07Hor\" style=\"min-height:3.6em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点一种激素，看它由哪个腺体分泌、管什么。</div>" +
                  "</div>" },
                { type: "note", text: "动手：遮住上面，说出三种激素各由哪个腺体分泌、管什么。" }
              ],
              point: "内分泌腺无导管、激素入血；垂体—生长激素/甲状腺—甲状腺激素/胰岛—胰岛素。"
            },
            /* ============ p2：糖尿病（克制）+ 神经vs体液 + 误区专治 ============ */
            {
              id: "b07.1.4-p2",
              kind: "explain",
              title: "胰岛素与血糖：只讲机制",
              blocks: [
                { type: "lead", text: "胰岛素少了会怎样？先说清楚：这页只讲机制，不讲诊疗。" },
                { type: "text", html: "先认词——胰岛素：胰岛分泌的激素，促进血糖进入细胞被利用、把多余血糖存成糖原，从而降低血糖。" },
                { type: "text", html: "机制：胰岛素分泌不足 → 血糖长期偏高 → 糖尿病。本课只讲血糖调节的机制，不涉及看病（表述克制）。" },
                { type: "text", html: "神经调节 vs 体液调节：神经调节快而准（走神经，像\"打电话\"）；体液调节慢而广（激素经血液，像\"广播\"）。两者配合，身体才稳。" },
                { type: "trap", text: "⚠️ \"胰岛素口服有效\"错——胰岛素是蛋白质，口服会被消化掉，必须注射。" },
                { type: "note", text: "两问：胰岛素是干什么的？神经调节和体液调节各像什么？（答案在本页）" }
              ],
              point: "胰岛素降血糖（分泌不足→糖尿病，只讲机制）；胰岛素是蛋白质，口服无效须注射。"
            }
          ]
        },
        {
          id: "b07.1.5",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b07.1.5-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b07.1.1：神经系统=中枢（脑/脊髓）+周围（脑神经/脊神经）；神经元是单个细胞（胞体+树突/轴突）；神经是神经纤维的集合。b07.1.2：反射/反射弧；感受器/效应器下了定义；反射弧五部分顺序固定（感受器→传入神经→神经中枢→传出神经→效应器）；膝跳反射（中枢在脊髓，不经大脑）；简单反射生来有、复杂反射需大脑皮层。b07.1.3：晶状体（会聚）/视网膜（成像）；视觉形成通路；眼球成像模拟；近视像在视网膜前、戴凹透镜；耳分外/中/内，听觉形成通路。b07.1.4：内分泌腺/激素第一次给出定义；垂体—生长激素/甲状腺—甲状腺激素/胰岛—胰岛素；糖尿病只讲机制；神经调节快而准、体液调节慢而广；胰岛素是蛋白质，口服无效须注射。" },
                { type: "choice", stem: "神经系统由哪两部分组成？",
                  options: ["脑和脊髓", "中枢神经系统和周围神经系统", "脑神经和脊神经", "神经元和神经纤维"], answer: 1,
                  tip: "中枢（脑/脊髓）+周围（脑神经/脊神经）=神经系统（b07.1.1 第 1 页）。" },
                { type: "choice", stem: "反射弧的五个部分按顺序依次是？",
                  options: ["感受器→神经中枢→传入神经→传出神经→效应器", "感受器→传入神经→神经中枢→传出神经→效应器", "效应器→传出神经→神经中枢→传入神经→感受器", "感受器→传出神经→神经中枢→传入神经→效应器"], answer: 1,
                  tip: "顺序固定：感受器→传入神经→神经中枢→传出神经→效应器——传入在前、传出在后（b07.1.2 第 1 页）。" },
                { type: "choice", stem: "膝跳反射的中枢在哪里？为什么想拦也拦不住？",
                  options: ["在大脑，因为太快", "在脊髓，不经过大脑", "在小脑，因为是本能", "在脑干，因为信号强"], answer: 1,
                  tip: "中枢在脊髓，不经大脑——低级中枢的反射快到大脑来不及插手（b07.1.2 第 2 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b07.1.5-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "choice", stem: "关于神经和神经元的说法，正确的是？",
                  options: ["神经就是神经元", "神经是神经纤维的集合，神经元是单个细胞", "神经元是神经纤维的集合", "神经和神经元没有区别"], answer: 1,
                  tip: "神经=神经纤维的集合（线缆），神经元=单个细胞（元件）——一字之差，意思完全不同（b07.1.1 第 3 页）。" },
                { type: "choice", stem: "近视眼应该戴什么透镜矫正？",
                  options: ["凸透镜", "凹透镜", "平面镜", "什么都不用戴"], answer: 1,
                  tip: "近视像落在视网膜前方，戴凹透镜发散光线、把像推回视网膜上；远视才戴凸透镜（b07.1.3 第 1 页）。" },
                { type: "choice", stem: "胰岛素口服为什么无效？",
                  options: ["胰岛素有毒", "胰岛素是蛋白质，口服会被消化掉", "胰岛素太大，肠道不吸收", "胰岛素会被胃酸变成糖"], answer: 1,
                  tip: "胰岛素是蛋白质，口服会被消化掉，必须注射（b07.1.4 第 2 页）。" },
                { type: "choice", stem: "下列属于复杂反射的是？",
                  options: ["眨眼反射", "缩手反射", "望梅止渴", "膝跳反射"], answer: 2,
                  tip: "复杂反射在生活经验基础上形成、需要大脑皮层参与；眨眼/缩手/膝跳生来就有，是简单反射（b07.1.2 第 3 页）。" }
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
 * b07 内联交互助手（纯 HTML 内联 handler，不新增引擎组件，
 * b03/b06/b13/b14/b21 先例）。命名空间 window.BIO_B07。
 * 神经元点选 / 反射弧拼搭闯关 / 膝跳反射分步 / 眼球成像模拟 /
 * 激素—腺体—作用配对。
 * ============================================================ */
window.BIO_B07 = (function () {
  function say(id, html) { var m = document.getElementById(id); if (m) m.innerHTML = html; }
  function markBtn(btn) {
    if (!btn) return;
    var sibs = btn.parentNode.querySelectorAll("button");
    for (var i = 0; i < sibs.length; i++) sibs[i].style.outline = "";
    btn.style.outline = "3px solid var(--bio-highlight)";
    btn.style.outlineOffset = "1px";
  }
  /* ---------- 神经元点选 ---------- */
  var NEURON = {
    soma: "<b>胞体</b>：神经元的主体，含细胞核——\"司令部\"，管着整个细胞的代谢。",
    dendrite: "<b>树突</b>：短而多，像树枝——负责接收信号，把信号传向胞体。",
    axon: "<b>轴突</b>：长而少——负责把信号从胞体传出去，一个神经元只有一条轴突。",
    terminal: "<b>神经末梢</b>：轴突末端的分支——把信号传给下一个神经元、肌肉或腺体。"
  };
  /* ---------- 反射弧拼搭闯关 ---------- */
  var ORDER = ["感受器", "传入神经", "神经中枢", "传出神经", "效应器"];
  var NUM = ["①", "②", "③", "④", "⑤"];
  var ai = 0;
  function arcNodes() {
    var svg = document.getElementById("bioB07Arc");
    return svg ? svg.querySelectorAll("[data-st]") : [];
  }
  /* ---------- 膝跳反射 ---------- */
  var KNEE = {
    1: "① <b>敲击</b>：小锤敲膝盖下方的韧带——韧带里的感受器被\"惊动\"。",
    2: "② <b>传入</b>：信号沿传入神经进脊髓——\"快递\"出发，目的地是脊髓里的低级中枢。",
    3: "③ <b>中枢</b>：脊髓里的神经中枢分析信号、发出命令——注意：没经过大脑！",
    4: "④ <b>传出</b>：命令沿传出神经传到大腿肌肉——\"快递\"返程。",
    5: "⑤ <b>踢腿</b>：效应器（大腿的股四头肌）收缩，小腿踢出去。全程快到大脑来不及插手——这就是拦不住的原因。"
  };
  /* ---------- 眼球成像模拟 ---------- */
  var EYE = {
    normal: "正常眼：晶状体曲度合适，远处物体的像正好落在视网膜上。",
    myopia: "近视眼：晶状体曲度过大（或眼球前后径过长），像落在<b>视网膜前方</b>——看不清远处。",
    glasses: "戴凹透镜：凹透镜把光线发散开，像被\"推\"回<b>视网膜上</b>——看清了。记住：近视戴凹透镜！"
  };
  /* ---------- 激素—腺体—作用 ---------- */
  var HOR = {
    1: "<b>生长激素</b>：由<b>垂体</b>分泌——管长个儿（促进生长）。",
    2: "<b>甲状腺激素</b>：由<b>甲状腺</b>分泌——管代谢快慢和生长发育。",
    3: "<b>胰岛素</b>：由<b>胰岛</b>分泌——管血糖（促进血糖利用和储存，降血糖）。"
  };
  return {
    neuron: function (p, el) {
      var g = el;
      while (g && g.tagName && g.tagName.toLowerCase() !== "g") g = g.parentNode;
      var svg = g ? g.ownerSVGElement : null;
      if (svg) {
        var gs = svg.querySelectorAll("g[onclick]");
        for (var i = 0; i < gs.length; i++) {
          var sh = gs[i].querySelector("circle,rect,path");
          if (sh) sh.style.stroke = "var(--bio-ink-soft)";
        }
      }
      if (g) {
        var mine = g.querySelector("circle,rect,path");
        if (mine) mine.style.stroke = "var(--bio-highlight)";
      }
      say("bioB07Neuron", NEURON[p] || "");
    },
    arc: function (st, el) {
      if (ai >= ORDER.length) return;
      if (st === ORDER[ai]) {
        if (el) {
          el.style.fill = "var(--bio-highlight)";
          var t = el.nextElementSibling;
          if (t && t.tagName && t.tagName.toLowerCase() === "text") {
            t.textContent = NUM[ai] + st;
            t.style.fill = "var(--bio-on-hl)";
          }
        }
        ai++;
        if (ai >= ORDER.length) {
          say("bioB07ArcMsg", "🎉 <b>拼搭成功！</b>感受器 → 传入神经 → 神经中枢 → 传出神经 → 效应器。记住：<b>顺序固定，传入在前、传出在后，反了就错！</b>");
        } else {
          say("bioB07ArcMsg", "✓ " + NUM[ai - 1] + st + " —— 下一站：<b>" + ORDER[ai] + "</b>");
        }
      } else {
        say("bioB07ArcMsg", "再想想：现在应该点「<b>" + ORDER[ai] + "</b>」。提示：信号从感受器出发，先走传入神经进中枢。");
      }
    },
    arcReset: function () {
      ai = 0;
      var nodes = arcNodes();
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].style.fill = "var(--bio-panel)";
        nodes[i].style.stroke = "var(--bio-ink-soft)";
        var t = nodes[i].nextElementSibling;
        if (t && t.tagName && t.tagName.toLowerCase() === "text") {
          t.textContent = nodes[i].getAttribute("data-st");
          t.style.fill = "";
        }
      }
      say("bioB07ArcMsg", "点\"感受器\"开始拼。");
    },
    knee: function (n, btn) { markBtn(btn); say("bioB07Knee", KNEE[n] || ""); },
    eye: function (mode, btn) {
      markBtn(btn);
      var ids = { normal: "bioB07EyeNormal", myopia: "bioB07EyeMyopia", glasses: "bioB07EyeGlasses" };
      Object.keys(ids).forEach(function (k) {
        var g = document.getElementById(ids[k]);
        if (g) g.style.display = (k === mode) ? "" : "none";
      });
      say("bioB07Eye", EYE[mode] || "");
    },
    hormone: function (n, btn) { markBtn(btn); say("bioB07Hor", HOR[n] || ""); }
  };
})();

