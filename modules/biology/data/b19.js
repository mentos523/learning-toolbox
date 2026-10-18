/* ============================================================
 * 学习工具箱 · 生物 · 第十九章数据（生物 P4 生产队 2026-10-18）
 *
 * 课：b19.1.1 DNA 的结构（3 页）/ b19.1.2 DNA 的复制（3 页）/
 *     b19.1.3 转录与翻译（4 页）/ b19.1.4 基因对性状的控制（3 页）/
 *     b19.1.5 本章小结与习题（2 页）。共 15 页。
 * 交互：无新增组件（零新组件、零新落点；过程示意用内联 SVG，
 * 见 docs/biology-interactions.md B-F7 配色冻结）。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 分层（b19.1.1，B-M2 史实口径）：p1 直觉版在前——富兰克林
 * DNA 衍射照片（Photo 51）；p2 严格版在后——
 * 沃森、克里克双螺旋模型（球棍模型≠实物）；p3 碱基互补配对
 * 严格规则。两页边界明示（直觉版/严格版角标 + 过渡句）。
 * b19.1.2-p3 为预支数学清单第 6 项直观版（复制 n 次→2ⁿ，只数数，
 * 不讲指数函数定义；预告代数 8.1/8.2.1 走 mathlink 深链，
 * 目标页已实测存在：ch08-u1-l1-p1 整数指数幂、ch08-u2-l1-p1
 * 指数函数（8.2.1 定义））。
 * b19.1.4-p1 为红线辨析②立靶页（口诀/红线表述/T5 边界句逐字；
 * 回填 b18.1.3 携带者、b18.1.4 遗传病，走 mathlink 深链）。
 *
 * 本批冻结引用（逐字）：
 * - 模式图声明：「模式图：非等比、非实物」；DNA 球棍模型：
 *   「模型≠实物」（BIO-R32/R34）
 * - T14 完整句：「亲代两条链各带一条传下去，新合成另一条」
 * - B-F7 配色：亲代链 --bio-gene（紫红）/ 新合成链 --bio-product
 *   （天蓝）+ 文字标签；「半保留」文字徽章必配
 * - 辨析②口诀：「性状=基因+环境」；红线表述：「基因型是底稿、
 *   表现型是成品、环境是加工条件」「携带致病基因≠注定发病」
 * - T5 边界句：「"加工条件"不是被动的——环境可影响基因表达；
 *   性状=基因+环境是共同作用」
 * - 辨析②回填句：「性状=基因+环境」；「携带致病基因≠注定发病——
 *   携带者表型正常，但能传递致病基因」
 * 门禁⑨：深链 token 只用已生产课号（b16.1.3/b18.1.3/b18.1.4）
 * 与已实测数学页（代数 8.1/8.2）；b20 基因突变只纯文本预告。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b19"] = {
  id: "b19",
  units: [
    {
      id: "b19.1",
      title: "基因的本质与表达",
      lessons: [
        {
          id: "b19.1.1",
          title: "DNA 的结构",
          prereq: "b18 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：Photo 51（直觉版） ============ */
            {
              id: "b19.1.1-p1",
              kind: "explain",
              title: "一张照片里的螺旋",
              blocks: [
                { type: "note", text: "直觉版——本页只讲富兰克林的照片故事；模型见第 2 页。" },
                { type: "lead", text: "1952 年，富兰克林拍到一张 DNA 的 X 射线衍射照片，编号 Photo 51。" },
                { type: "text", html: "先认词——DNA（脱氧核糖核酸）：存储生物遗传指令的分子。b16.1.1 认词时见过它（染色体的组成成分），这里给正式定义。衍射照片：用 X 射线\"照\"分子、从条纹反推分子形状的技术。" },
                { type: "text", html: "<svg viewBox=\"0 0 320 150\" width=\"100%\" role=\"img\" aria-label=\"Photo 51 衍射图样示意\" style=\"max-width:360px;display:block;margin:6px auto\">" +
                  "<rect x=\"70\" y=\"8\" width=\"180\" height=\"104\" rx=\"8\" style=\"fill:none;stroke:var(--bio-ink-soft)\" stroke-width=\"1.5\"/>" +
                  "<line x1=\"70\" y1=\"8\" x2=\"250\" y2=\"112\" style=\"stroke:var(--bio-text)\" stroke-width=\"4\"/>" +
                  "<line x1=\"250\" y1=\"8\" x2=\"70\" y2=\"112\" style=\"stroke:var(--bio-text)\" stroke-width=\"4\"/>" +
                  "<line x1=\"70\" y1=\"60\" x2=\"250\" y2=\"60\" style=\"stroke:var(--bio-ink-soft)\" stroke-width=\"1.5\" stroke-dasharray=\"6 5\"/>" +
                  "<text x=\"160\" y=\"132\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">Photo 51 衍射图样示意（模式图：非等比、非实物）</text>" +
                  "</svg>" },
                { type: "text", html: "照片上有个清晰的 X 形条纹——这个形状在\"说话\"：能转出这种条纹的，八成是个螺旋，像旋转楼梯。" },
                { type: "oldfriend", text: "预告：看到这张照片的沃森和克里克，第二年就搭出了 DNA 的模型——第 2 页见。" }
              ],
              point: "X 形条纹 = 螺旋的证据。严格表述见下一页。"
            },
            /* ============ p2：双螺旋模型（严格版） ============ */
            {
              id: "b19.1.1-p2",
              kind: "explain",
              title: "双螺旋：两条反向的链",
              blocks: [
                { type: "note", text: "严格版——本页是 DNA 的结构模型。" },
                { type: "oldfriend", text: "认旧友：上一页 Photo 51 的 X 形条纹说\"它是螺旋\"——现在看搭出来的模型。" },
                { type: "lead", text: "1953 年，沃森和克里克搭出 DNA 双螺旋结构模型。" },
                { type: "text", html: "双螺旋：两条链像旋转楼梯的扶手一样互相缠绕。两条链方向相反——这叫反向平行。" },
                { type: "text", html: "先认词——脱氧核糖核苷酸（DNA 的基本组成单位）：由磷酸、脱氧核糖（一种五碳糖）、碱基三部分组成。碱基：核苷酸上携带信息的部分，有 A、T、G、C 四种。" },
                { type: "text", html: "<svg viewBox=\"0 0 320 210\" width=\"100%\" role=\"img\" aria-label=\"DNA 双螺旋球棍模型示意\" style=\"max-width:340px;display:block;margin:6px auto\">" +
                  "<g style=\"stroke:var(--bio-text)\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\">" +
                  "<path d=\"M160.0,10.0 L202.4,25.0 L220.0,40.0 L202.4,55.0 L160.0,70.0 L117.6,85.0 L100.0,100.0 L117.6,115.0 L160.0,130.0 L202.4,145.0 L220.0,160.0 L202.4,175.0 L160.0,190.0\"/>" +
                  "<path d=\"M160.0,10.0 L117.6,25.0 L100.0,40.0 L117.6,55.0 L160.0,70.0 L202.4,85.0 L220.0,100.0 L202.4,115.0 L160.0,130.0 L117.6,145.0 L100.0,160.0 L117.6,175.0 L160.0,190.0\"/>" +
                  "</g>" +
                  "<g style=\"stroke:var(--bio-ink-soft)\" stroke-width=\"2\">" +
                  "<line x1=\"220\" y1=\"40\" x2=\"100\" y2=\"40\"/><line x1=\"100\" y1=\"100\" x2=\"220\" y2=\"100\"/><line x1=\"220\" y1=\"160\" x2=\"100\" y2=\"160\"/>" +
                  "</g>" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-text)\">" +
                  "<text x=\"160\" y=\"34\">A—T</text><text x=\"160\" y=\"94\">G—C</text><text x=\"160\" y=\"154\">T—A</text>" +
                  "</g>" +
                  "<text x=\"160\" y=\"206\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物；球棍模型≠实物</text>" +
                  "</svg>" },
                { type: "text", html: "看图三问——层次：分子层次；结构：两条反向平行的链 + 四种碱基；功能：碱基的排列顺序不同，携带的指令就不同（下一页讲配对规则）。" }
              ],
              point: "双螺旋 = 两条反向平行的链 + 四种碱基。配对规则见下一页。"
            },
            /* ============ p3：碱基互补配对（严格规则） ============ */
            {
              id: "b19.1.1-p3",
              kind: "explain",
              title: "碱基互补配对",
              blocks: [
                { type: "oldfriend", text: "认旧友：上一页四种碱基 A、T、G、C——配对有固定规则。" },
                { type: "lead", text: "两条链之间，碱基的配对不能随意。" },
                { type: "text", html: "碱基互补配对：A 与 T 配对、G 与 C 配对。碱基之间以氢键相连（氢键：一种较弱的化学键；A—T 之间 2 个，G—C 之间 3 个）。" },
                { type: "text", html: "推论：一条链的碱基顺序定了，另一条链的顺序也就定了。先认词——遗传信息：DNA 分子中碱基的排列顺序。" },
                { type: "trap", text: "⚠️ 别搞混：\"DNA 是单链\"错——双链反向平行！\"碱基配对可随意\"错——A—T、G—C 固定！" }
              ],
              point: "A—T、G—C：配对固定，顺序即信息。"
            }
          ]
        },
        {
          id: "b19.1.2",
          title: "DNA 的复制",
          prereq: "DNA 的结构",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：半保留复制 ============ */
            {
              id: "b19.1.2-p1",
              kind: "explain",
              title: "半保留复制",
              blocks: [
                { type: "oldfriend", text: "认旧友：b16.1.1 的\"复印\"——间期染色体数目复制，用的就是这一页的机制。" },
                { type: "lead", text: "一条 DNA 变两条：亲代的两条链，去哪了？" },
                { type: "text", html: "先认词——半保留复制：亲代两条链各带一条传下去，新合成另一条。" },
                { type: "text", html: "过程三步：①解开双链；②按 A—T、G—C 配对连上新的核苷酸；③两条新链各自卷成双螺旋。" },
                { type: "text", html: "<svg viewBox=\"0 0 360 190\" width=\"100%\" role=\"img\" aria-label=\"半保留复制示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g stroke-width=\"5\" stroke-linecap=\"round\">" +
                  "<line x1=\"50\" y1=\"40\" x2=\"50\" y2=\"130\" style=\"stroke:var(--bio-gene)\"/>" +
                  "<line x1=\"80\" y1=\"40\" x2=\"80\" y2=\"130\" style=\"stroke:var(--bio-gene)\"/>" +
                  "</g>" +
                  "<text x=\"65\" y=\"150\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-gene)\">亲代链</text>" +
                  "<text x=\"65\" y=\"28\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">亲代 DNA</text>" +
                  "<text x=\"125\" y=\"95\" font-size=\"20\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">→</text>" +
                  "<g stroke-width=\"5\" stroke-linecap=\"round\">" +
                  "<line x1=\"180\" y1=\"40\" x2=\"180\" y2=\"130\" style=\"stroke:var(--bio-gene)\"/>" +
                  "<line x1=\"210\" y1=\"40\" x2=\"210\" y2=\"130\" style=\"stroke:var(--bio-product)\"/>" +
                  "<line x1=\"270\" y1=\"40\" x2=\"270\" y2=\"130\" style=\"stroke:var(--bio-gene)\"/>" +
                  "<line x1=\"300\" y1=\"40\" x2=\"300\" y2=\"130\" style=\"stroke:var(--bio-product)\"/>" +
                  "</g>" +
                  "<text x=\"195\" y=\"150\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">子代 DNA</text>" +
                  "<text x=\"285\" y=\"150\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">子代 DNA</text>" +
                  "<text x=\"255\" y=\"28\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-product)\">新合成链</text>" +
                  "<rect x=\"128\" y=\"160\" width=\"104\" height=\"24\" rx=\"12\" style=\"fill:none;stroke:var(--bio-text)\" stroke-width=\"1.5\"/>" +
                  "<text x=\"180\" y=\"177\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-text)\">半保留</text>" +
                  "</svg>" },
                { type: "note", text: "模式图：非等比、非实物；示意，非真实比例。" },
                { type: "text", html: "证据：半保留是同位素标记实验的结论——科学家给亲代 DNA 的原子做上\"记号\"（同位素标记：用特殊的原子做记号、追踪分子去向的技术），复制后看记号的去向。它不是直接\"看到\"链分开，而是实验推出的结论。" },
                { type: "trap", text: "⚠️ 别搞混：\"复制是全保留\"错——半保留！证据是同位素标记实验。" }
              ],
              point: "各带一条：亲代链传下去，新链现合成。"
            },
            /* ============ p2：准确性保障 ============ */
            {
              id: "b19.1.2-p2",
              kind: "explain",
              title: "复制的准确性",
              blocks: [
                { type: "lead", text: "几十亿个碱基一次复制完，怎么保证不出错？" },
                { type: "text", html: "双保险：①配对规则本身——A 只能跟 T 配，错配\"放不进\"；②边复制边检查，发现配错就纠正。" },
                { type: "text", html: "边界：准确性高≠绝对不出错。偶尔的\"写错\"就是基因突变（b20 细讲）。" }
              ],
              point: "配对规则 + 边复制边纠错 = 高准确性。"
            },
            /* ============ p3：复制 n 次→2ⁿ（直观版） ============ */
            {
              id: "b19.1.2-p3",
              kind: "explain",
              title: "复制 n 次，有几个 DNA？",
              blocks: [
                { type: "lead", text: "复制 1 次变 2 个，复制 2 次变几个？" },
                { type: "text", html: "数一数：复制 1 次→2 个；复制 2 次→4 个；复制 3 次→8 个——每次翻倍。" },
                { type: "text", html: "数出来的规律：复制 n 次，DNA 有 2ⁿ 个（2ⁿ 就是 n 个 2 连乘，这里只数数、不讲定义）。" },
                { type: "mathlink", text: "预告：代数 8.1/8.2.1 指数函数学完后回来——2ⁿ 就是指数增长，翻倍的学名。" },
                { type: "note", text: "直观版：本页只数\"翻倍\"，不讲指数函数的定义。" }
              ],
              point: "复制 n 次 → 2ⁿ 个：数出来的翻倍规律。"
            }
          ]
        },
        {
          id: "b19.1.3",
          title: "转录与翻译",
          prereq: "DNA 的复制",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：转录 ============ */
            {
              id: "b19.1.3-p1",
              kind: "explain",
              title: "转录：抄一份送出核",
              blocks: [
                { type: "oldfriend", text: "认旧友：b19.1.2 的复制是\"复印\"整条 DNA——转录只\"抄\"一段。" },
                { type: "lead", text: "DNA 出不了细胞核，信息怎么送出去干活？" },
                { type: "text", html: "先认词——转录：以 DNA 的一条链为模板，按碱基互补配对合成 RNA 的过程。mRNA（信使 RNA）：把 DNA 信息\"抄\"下来、送出细胞核的 RNA。" },
                { type: "text", html: "配对小变化：RNA 里没有 T，用 U 代替——DNA 的 A 对 RNA 的 U（U：RNA 特有的碱基，DNA 里没有它）。" },
                { type: "text", html: "<svg viewBox=\"0 0 360 170\" width=\"100%\" role=\"img\" aria-label=\"转录示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g stroke-width=\"5\" stroke-linecap=\"round\" style=\"stroke:var(--bio-text)\">" +
                  "<line x1=\"40\" y1=\"50\" x2=\"150\" y2=\"50\"/><line x1=\"40\" y1=\"80\" x2=\"150\" y2=\"80\"/>" +
                  "</g>" +
                  "<text x=\"95\" y=\"36\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">DNA（解开一段）</text>" +
                  "<text x=\"195\" y=\"70\" font-size=\"20\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">→</text>" +
                  "<path d=\"M230,50 Q245,40 260,50 Q275,60 290,50 Q305,40 320,50\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"5\" stroke-linecap=\"round\"/>" +
                  "<text x=\"275\" y=\"90\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-product)\">mRNA</text>" +
                  "<text x=\"275\" y=\"110\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">送出细胞核</text>" +
                  "<text x=\"180\" y=\"150\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物；示意，非真实比例</text>" +
                  "</svg>" }
              ],
              point: "转录：DNA→mRNA，抄一份送出核。"
            },
            /* ============ p2：密码子与翻译 ============ */
            {
              id: "b19.1.3-p2",
              kind: "explain",
              title: "密码子与翻译",
              blocks: [
                { type: "lead", text: "mRNA 送到了，信息怎么变成蛋白质？" },
                { type: "text", html: "先认词——密码子：mRNA 上决定一个氨基酸的三个相邻碱基。氨基酸：蛋白质的基本组成单位（b16.1.1 认词时见过\"蛋白质\"，这里补它的\"零件\"）。" },
                { type: "text", html: "数一数：4 种碱基，三个一组 → 4×4×4=64 种密码子（只数数，不讲排列定义）。" },
                { type: "text", html: "先认词——翻译：按 mRNA 上密码子的顺序，把氨基酸连成蛋白质的过程。核糖体：读取 mRNA、把氨基酸连起来的\"装配台\"。tRNA（转运 RNA）：一头认密码子、一头带来对应氨基酸的\"搬运工\"。" },
                { type: "trap", text: "⚠️ 别搞混：\"一个碱基决定一个氨基酸\"错——三个！64 种密码子。" }
              ],
              point: "三个碱基定一个氨基酸：密码子共 64 种。"
            },
            /* ============ p3：中心法则 ============ */
            {
              id: "b19.1.3-p3",
              kind: "explain",
              title: "中心法则",
              blocks: [
                { type: "oldfriend", text: "认旧友：转录（DNA→mRNA）+ 翻译（mRNA→蛋白质）——合起来一句话。" },
                { type: "lead", text: "遗传信息的流向，一句话说完。" },
                { type: "text", html: "中心法则：DNA→RNA→蛋白质。DNA 的信息先转录成 RNA，再翻译成蛋白质。" },
                { type: "text", html: "<svg viewBox=\"0 0 360 120\" width=\"100%\" role=\"img\" aria-label=\"中心法则示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"16\" text-anchor=\"middle\">" +
                  "<rect x=\"10\" y=\"30\" width=\"70\" height=\"40\" rx=\"8\" style=\"fill:none;stroke:var(--bio-gene)\" stroke-width=\"2\"/>" +
                  "<text x=\"45\" y=\"56\" style=\"fill:var(--bio-gene)\">DNA</text>" +
                  "<rect x=\"105\" y=\"30\" width=\"70\" height=\"40\" rx=\"8\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2\"/>" +
                  "<text x=\"140\" y=\"56\" style=\"fill:var(--bio-product)\">RNA</text>" +
                  "<rect x=\"200\" y=\"30\" width=\"80\" height=\"40\" rx=\"8\" style=\"fill:none;stroke:var(--bio-text)\" stroke-width=\"2\"/>" +
                  "<text x=\"240\" y=\"56\" style=\"fill:var(--bio-text)\">蛋白质</text>" +
                  "</g>" +
                  "<g font-size=\"20\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">" +
                  "<text x=\"92\" y=\"58\">→</text><text x=\"187\" y=\"58\">→</text>" +
                  "</g>" +
                  "<text x=\"300\" y=\"56\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">→ 性状</text>" +
                  "<text x=\"180\" y=\"100\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "note", text: "边界：这是信息流的主干方向；RNA→DNA 等特殊情形本章不展开。" }
              ],
              point: "中心法则：DNA→RNA→蛋白质。"
            },
            /* ============ p4：基因选择性表达（回填 b16.1.3） ============ */
            {
              id: "b19.1.3-p4",
              kind: "explain",
              title: "基因选择性表达",
              blocks: [
                { type: "mathlink", text: "认旧友：b16.1.3 分化树——一个受精卵变出神经细胞、肌肉细胞等多种细胞，DNA 却都一样。" },
                { type: "lead", text: "同样的 DNA，为什么有神经细胞、肌肉细胞？" },
                { type: "text", html: "先认词——选择性表达：同一个体的不同细胞中，基因有选择地表达（有的\"开工\"，有的\"休息\"）。" },
                { type: "text", html: "细胞分化就是选择性表达的结果：DNA 相同，开工的基因不同 → 细胞的形态功能不同。" },
                { type: "text", html: "边界：\"加工条件\"不是被动的——环境可影响基因表达（b19.1.4 展开）。" }
              ],
              point: "DNA 相同、开工基因不同 → 细胞不同。"
            }
          ]
        },
        {
          id: "b19.1.4",
          title: "基因对性状的控制",
          prereq: "转录与翻译",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：辨析②立靶页 ============ */
            {
              id: "b19.1.4-p1",
              kind: "explain",
              title: "性状=基因+环境",
              blocks: [
                { type: "lead", text: "基因怎么变成性状？先记住一句话，再看清它的边界。" },
                { type: "text", html: "链条：基因→蛋白质→性状。基因通过控制蛋白质的合成来控制性状。" },
                { type: "slogan", text: "性状=基因+环境" },
                { type: "text", html: "基因型是底稿、表现型是成品、环境是加工条件。" },
                { type: "text", html: "\"加工条件\"不是被动的——环境可影响基因表达；性状=基因+环境是共同作用。" },
                { type: "text", html: "携带致病基因≠注定发病。" },
                { type: "oldfriend", text: "认旧友：b18.1.3 先认词——基因型：个体的基因组成；表现型：表现出来的性状。" },
                { type: "mathlink", text: "回填：b18.1.3 第 4 页——携带致病基因≠注定发病：携带者表型正常，但能传递致病基因。" },
                { type: "mathlink", text: "回填：b18.1.4 第 1 页——三类遗传病：多基因病更要看环境。" }
              ],
              point: "底稿 + 加工条件 = 成品；携带 ≠ 发病。"
            },
            /* ============ p2：同卵双生（直觉页） ============ */
            {
              id: "b19.1.4-p2",
              kind: "explain",
              title: "同卵双生：环境作证",
              blocks: [
                { type: "note", text: "直觉版——本页只讲一个活例子；严格表述见第 1 页。" },
                { type: "lead", text: "基因型完全相同的人，放到不同环境里长大，会怎样？" },
                { type: "text", html: "先认词——同卵双胞胎：来自同一个受精卵的双胞胎，基因型相同。" },
                { type: "text", html: "例子：同卵双生的两人，一个长期户外劳作、一个长期室内工作，多年后肤色、体格出现明显差异——基因型相同，表现型不同，差在环境。" },
                { type: "text", html: "这就是\"性状=基因+环境\"的活例子：底稿一样，加工条件不同，成品就不同。" }
              ],
              point: "同基因型 + 不同环境 = 不同表现型。"
            },
            /* ============ p3：转基因食品专治误区 ============ */
            {
              id: "b19.1.4-p3",
              kind: "explain",
              title: "转基因食品：专治误区",
              blocks: [
                { type: "lead", text: "\"吃了转基因食品，会改变人的基因吗？\"" },
                { type: "text", html: "先认词——转基因食品：用导入了特定基因的生物制成的食品。" },
                { type: "text", html: "答案是不会。食物经过消化被分解成小分子（氨基酸、葡萄糖等），DNA 也被分解成碎片——不会整合到人的 DNA 里。" },
                { type: "text", html: "只讲事实：转基因食品有现行的安全管理规范（审批、标识），本章不做价值判断。" },
                { type: "trap", text: "⚠️ 别搞混：\"吃了会改变人的基因\"错——消化成小分子，不整合入人体！" }
              ],
              point: "消化成小分子：吃进去的基因到不了你的 DNA。"
            }
          ]
        },
        {
          id: "b19.1.5",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b19.1.5-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——DNA 的结构：双螺旋（两条反向平行的链；A—T、G—C 配对），富兰克林 Photo 51 是螺旋的证据（b19.1.1）；DNA 的复制：半保留（亲代链各带一条），配对规则 + 边复制边纠错保准确，复制 n 次→2ⁿ 个（b19.1.2）；基因表达：转录（DNA→mRNA）、密码子（三个碱基定一个氨基酸，64 种）、翻译（核糖体 + tRNA）、中心法则 DNA→RNA→蛋白质、基因选择性表达（b19.1.3）；基因对性状的控制：性状=基因+环境，携带致病基因≠注定发病（b19.1.4）。" },
                { type: "choice", stem: "DNA 的两条链的关系是？",
                  options: ["反向平行", "同向平行", "只有一条链", "交叉缠绕不分方向"], answer: 0,
                  tip: "两条链方向相反，叫反向平行（b19.1.1 第 2 页）。" },
                { type: "choice", stem: "DNA 一条链的碱基顺序是 A—G—T—C，另一条链对应的是？",
                  options: ["T—C—A—G", "A—G—T—C", "U—C—A—G", "T—G—A—C"], answer: 0,
                  tip: "A—T、G—C 配对（b19.1.1 第 3 页）。" },
                { type: "choice", stem: "一个 DNA 复制 3 次，得到几个 DNA？",
                  options: ["8 个", "6 个", "4 个", "3 个"], answer: 0,
                  tip: "每次翻倍：2→4→8（b19.1.2 第 3 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b19.1.5-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "choice", stem: "下列说法正确的是？",
                  options: ["携带致病基因≠注定发病", "携带致病基因一定会发病", "性状只由基因决定", "环境对性状没有影响"], answer: 0,
                  tip: "性状=基因+环境；携带≠发病（b19.1.4 第 1 页）。" },
                { type: "choice", stem: "\"吃了转基因食品会改变人的基因\"错在哪里？",
                  options: ["食物被消化成小分子，DNA 不会整合到人的 DNA 里", "转基因食品没有 DNA", "人的 DNA 不能被改变", "转基因食品不含蛋白质"], answer: 0,
                  tip: "消化成小分子，不整合（b19.1.4 第 3 页）。" },
                { type: "choice", stem: "要验证\"DNA 复制是半保留的\"，实验思路最关键的是？",
                  options: ["给亲代 DNA 做同位素标记，复制后追踪标记的去向", "用显微镜直接看两条链分开", "只复制一次就下结论", "只数子代 DNA 有几个"], answer: 0,
                  tip: "半保留是标记追踪实验的结论，不是直接看到的（b19.1.2 第 1 页）。" }
              ],
              point: "全章完。"
            }
          ]
        }
      ]
    }
  ]
};
