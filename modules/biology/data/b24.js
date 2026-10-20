/* ============================================================
 * 学习工具箱 · 生物 · 第二十四章数据（生物 P17 生产队 2026-10-19）
 *
 * 课：b24.1.1 种群的特征与数量变化（5 页）
 *     b24.2.1 群落的结构与演替（4 页）
 *     b24.3.1 生态系统的结构（3 页）
 *     b24.3.2 能量流动（3 页）
 *     b24.3.3 物质循环（3 页）
 *     b24.4.1 生物多样性与保护（3 页）
 *     b24.4.2 本章小结与习题（2 页）。共 23 页。
 * 交互（全部内联实现，零新引擎组件；本批无 B1 引擎交互）：
 *   b24.1.1-p5 种群增长曲线模拟（资源无限 vs 有限）
 *   b24.2.1-p2 种间关系配对（捕食/竞争/寄生/互利共生）
 *   b24.3.1-p2 食物网构建（东湖生物名录连线，6 条正确边）
 *   b24.3.2-p2 能量流动滑块（10%–20%，相对值）
 *   b24.3.3-p2 碳循环箭头闯关（方向错打回，4 题）
 *   b24.4.1-p3 本地保护案例拼图（江豚/麋鹿/东湖）
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 辨析③口诀：「能量单向物循环」（BIO-R61；立靶 b24.3.2-p1，回填 b24.3.3-p1）
 * - 碳循环完整环路：「无机环境（CO₂）→生产者→消费者→分解者→无机环境」（BIO-R30）
 * - 模式图声明：「模式图：非等比、非实物」（BIO-R32）
 * - 示意曲线声明：「示意曲线（非实测数据）」（BIO-R70）
 *
 * 门禁⑧（新术语首现即定义，本章首现）：
 * 种群密度/出生率/年龄结构（b24.1.1-p1）/样方法/标记重捕法（b24.1.1-p2）/
 * J 型曲线/S 型曲线/K 值·环境容纳量（b24.1.1-p3/p4）/丰富度（b24.2.1-p1）/
 * 捕食/竞争/寄生/互利共生（b24.2.1-p2）/垂直结构/水平结构（b24.2.1-p3）/
 * 初生演替/次生演替（b24.2.1-p4）/生产者/消费者/分解者/非生物成分
 * （b24.3.1-p1）/营养级（b24.3.1-p2）/能量金字塔（b24.3.2-p1）/
 * 基因多样性/物种多样性/生态系统多样性（b24.4.1-p1）/
 * 就地保护/迁地保护（b24.4.1-p2）。
 *
 * 门禁⑨（深链只挂已上线课号；href 由 renderMathlink 按 XLINK 表生成）：
 * b03.1.5（XLINK_BIO 在表→#b03.1.5）/b21.1.3（→#b21.1.3）/
 * b09.2.2（→#b09.2.2）/代数 6.1（→../math/index.html#p=ch06-u1-l1-p1）/
 * 代数 ch00（→../math/index.html#p=ch00-u1-l1-p1）。
 * b23.1.4：b23 推送中，token 未入 XLINK_BIO——b24.1.1-p1 用 mathlink 纯文本
 * 先行（不造死链），staging 组装前协调者确认 b23 上线后补 token（PROD-REPORT
 * 已立 staging 动作项）。
 * 代数 8.1/8.2.1：纯文本预告措辞，不挂深链（drafted，见门禁⑩ a1）。
 *
 * 门禁⑩（预告台账草案框架；status=drafted；review_history 由专家队复签时写，
 * 生产队不写任何评审结论）：
 * - b24.3.3-e1：echo b03.1.5-a1（fulfilled）——回填句 b24.3.3-p1 mathlink，
 *   深链→b03.1.5（方向：兑现页→预告页）。
 * - b24.3.2-e2：echo b21.1.3-a1 能量篇（fulfilled）——回填句 b24.3.2-p3
 *   mathlink，深链→b21.1.3。
 * - b24.3.3-e3：echo b21.1.3-a1 物质篇（fulfilled）——回填句 b24.3.3-p3
 *   mathlink，深链→b21.1.3。
 * - b24.1.1-a1（drafted）：指数增长严格版预告——代数 8.1/8.2.1 学完后回填
 *   J 型曲线严格读图；本批 oldfriend 纯文本，无深链。
 * - b24.1.1-a2（drafted）：S 型曲线严格读图预告——代数 6.1 学完后回填；
 *   本批 mathlink 挂直观版呼应（目标已上线）。
 * 既有待兑现（b12.1.3-a1→b15.1.1 等）本批不动。
 *
 * 门禁⑪：本批 quiz 页仅 b24.4.2（2 页）；b24.4.2 两页为课程图纸既定设计意图
 * （小结+习题），台账留痕，非缺页。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b24"] = {
  id: "b24",
  units: [
    {
      id: "b24.1",
      title: "种群",
      lessons: [
        {
          id: "b24.1.1",
          title: "种群的特征与数量变化",
          prereq: "b23 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：回填一页（b23 小结→种群） ============ */
            {
              id: "b24.1.1-p1",
              kind: "explain",
              title: "回填：从个体到种群",
              blocks: [
                { type: "mathlink", text: "认旧友：b23.1.4（b23 小结）——生命系统结构层次：细胞→组织→器官→系统→个体→种群→群落→生态系统→生物圈；本章从\"种群\"这一级开讲。（b23 推送中，深链待 staging 确认补挂）" },
                { type: "lead", text: "一群人、一群鱼、一片草——什么时候能叫\"种群\"？" },
                { type: "text", html: "种群=一定区域内同种生物的全部个体。三个关键词：同种、同一区域、全部个体——缺一个都不算种群。" },
                { type: "text", html: "种群的数量特征：种群密度最基本（单位面积或体积内的个体数）；出生率/死亡率、迁入率/迁出率管\"进出\"；年龄结构、性别比例管\"未来\"。" }
              ],
              point: "种群=同种+同地+全部个体；密度是最基本的数量特征。"
            },
            /* ============ p2：调查方法 ============ */
            {
              id: "b24.1.1-p2",
              kind: "explain",
              title: "调查方法：样方与标记重捕",
              blocks: [
                { type: "lead", text: "一片草地几万株草，一个一个数不完——怎么查？" },
                { type: "text", html: "抽样调查：数一部分、推算整体——生物自带的直观版。样方法查植物：随机取样方（比如 1m²），数株数、求平均、再乘总面积。" },
                { type: "text", html: "标记重捕法查动物：捉一批做标记放回，过段时间再捉一批——总数≈首次标记数×重捕总数÷重捕到的标记数。" },
                { type: "note", text: "抽样是近似不是精确数：样方要随机、标记不能脱落、调查期间不能有大批迁入迁出——结论须注明方法与误差来源。" }
              ],
              point: "样方法数植物，标记重捕法数动物；抽样是近似。"
            },
            /* ============ p3：J 型曲线（直观版+预告） ============ */
            {
              id: "b24.1.1-p3",
              kind: "explain",
              title: "J 型曲线：理想条件下的增长",
              blocks: [
                { type: "lead", text: "细菌 20 分钟翻一倍——如果资源永远用不完，会长成什么样？" },
                { type: "text", html: "J 型曲线：资源无限、空间无限、没有天敌——理想条件下的增长，像字母 J。特点：越长越快，增长率不变。" },
                { type: "text", html: "看图说话：横轴时间、纵轴数量——曲线越往后越陡，说明单位时间增加的个体越来越多。" },
                { type: "note", text: "示意曲线（非实测数据）。\"资源无限\"是理想化假设，现实中不存在——本页只讲理想情形。" },
                { type: "oldfriend", text: "预告：J 型背后是数学里的指数增长——数学课讲到指数，再回来细看这条曲线。" },
                { type: "mathlink", text: "兑现：b24.1.1-a1 问过——“J 型背后是数学里的指数增长——数学课讲到指数，再回来细看这条曲线”——答案：J 型曲线就是代数 8.1/8.2.1 的指数函数图像：每过一个单位时间，数量乘上同一个倍数（增长率不变），底数大于 1 时图像越往后越陡——这正是 J 型‘越长越快’的数学本质。" }
              ],
              point: "J 型=理想条件下的增长：越长越快。"
            },
            /* ============ p4：S 型曲线与 K 值 ============ */
            {
              id: "b24.1.1-p4",
              kind: "explain",
              title: "S 型曲线：K 值由环境决定",
              blocks: [
                { type: "lead", text: "现实里没有无限资源——曲线会长成什么样？" },
                { type: "text", html: "S 型曲线：资源有限，增长先快后慢，最后在 K 值附近上下波动。K 值=环境容纳量：环境能养活的最大数量。" },
                { type: "trap", text: "⚠️ 别搞混：K 值不是固定死的——K 值由环境决定！环境改善（食物变多），K 值可以升高。" },
                { type: "note", text: "示意曲线（非实测数据）。" },
                { type: "mathlink", text: "代数 6.1：S 型曲线的读图——横轴时间、纵轴数量，拐点与平台怎么认，数学课的读图方法直接用。" },
                { type: "mathlink", text: "兑现：b24.1.1-a2 问过——“代数 6.1：S 型曲线的读图——横轴时间、纵轴数量，拐点与平台怎么认，数学课的读图方法直接用”——答案：用代数 6.1 的读图语言重说：横轴时间是自变量，纵轴数量是因变量；曲线全程看先慢、后快（拐点处涨得最快）、再慢，最后停在平台上——平台对应的数量就是 K 值，读 S 型图和读任何函数图像是同一套方法。" }
              ],
              point: "S 型：先快后慢；K 值由环境决定。"
            },
            /* ============ p5：种群增长曲线模拟（交互） ============ */
            {
              id: "b24.1.1-p5",
              kind: "interact",
              title: "模拟：资源无限 vs 有限",
              exploreTip: "点两个按钮，对比资源无限和资源有限两条曲线，看 K 值那条线出不出。",
              blocks: [
                { type: "text", html: "<div style=\"text-align:center;margin:2px 0 4px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 6px\" onclick=\"BIO_B24.grow('j',this)\">① 资源无限</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 6px\" onclick=\"BIO_B24.grow('s',this)\">② 资源有限</button>" +
                  "</div>" +
                  "<svg viewBox=\"0 0 340 210\" width=\"100%\" role=\"img\" aria-label=\"J 型与 S 型增长曲线对比示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"12.8\" text-anchor=\"middle\">" +
                  "<line x1=\"30\" y1=\"180\" x2=\"325\" y2=\"180\" style=\"stroke:var(--bio-ink-soft)\" stroke-width=\"1.5\"/>" +
                  "<line x1=\"30\" y1=\"180\" x2=\"30\" y2=\"15\" style=\"stroke:var(--bio-ink-soft)\" stroke-width=\"1.5\"/>" +
                  "<text x=\"315\" y=\"198\" style=\"fill:var(--bio-ink-soft)\">时间</text><text x=\"14\" y=\"24\" style=\"fill:var(--bio-ink-soft)\">数量</text>" +
                  "<path id=\"bioB24J\" d=\"M40,172 C110,168 190,140 300,30\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"3\"/>" +
                  "<path id=\"bioB24S\" d=\"M40,172 C90,168 120,140 160,128 C210,112 250,92 310,90\" style=\"fill:none;stroke:var(--bio-gene);opacity:0.25\" stroke-width=\"3\"/>" +
                  "<line id=\"bioB24K\" x1=\"30\" y1=\"90\" x2=\"325\" y2=\"90\" style=\"stroke:var(--bio-highlight);opacity:0.25\" stroke-width=\"2\" stroke-dasharray=\"7 5\"/>" +
                  "<text id=\"bioB24KL\" x=\"315\" y=\"82\" style=\"fill:var(--bio-highlight);opacity:0.25\">K 值</text>" +
                  "</g></svg>" +
                  "<div id=\"bioB24GrowMsg\" style=\"text-align:center;font-size:0.9rem;min-height:2.2em\">点按钮看两种情形</div>" +
                  "<div style=\"text-align:center;font-size:12px;color:var(--bio-ink-soft)\">示意曲线（非实测数据）；示意：非真实时间尺度</div>" },
                { type: "text", html: "看明白了吗：① 里曲线一路冲上去——资源无限；② 里曲线被 K 值那条虚线\"按住\"了——资源有限，环境说了算。" }
              ],
              point: "模拟结论：资源决定曲线形状，K 值由环境决定。"
            }
          ]
        }
      ]
    },
    {
      id: "b24.2",
      title: "群落",
      lessons: [
        {
          id: "b24.2.1",
          title: "群落的结构与演替",
          prereq: "种群",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：群落与丰富度 ============ */
            {
              id: "b24.2.1-p1",
              kind: "explain",
              title: "群落与丰富度",
              blocks: [
                { type: "lead", text: "一片草地里，草、虫、鸟、菌住在一起——它们合起来叫什么？" },
                { type: "text", html: "群落=同一区域所有种群的集合。群落的\"家底\"叫丰富度=物种数目的多少——群落研究的起点。" },
                { type: "text", html: "例：东湖水体群落——藻类、水草、浮游动物、螺、鲫鱼、鳜鱼、细菌……物种越多，丰富度越高。" }
              ],
              point: "群落=所有种群的集合；丰富度=物种数目。"
            },
            /* ============ p2：种间关系 + 配对交互 ============ */
            {
              id: "b24.2.1-p2",
              kind: "interact",
              title: "种间关系配对",
              exploreTip: "左边点一种关系，右边点对应的实例，配对成功四组才算过关。",
              blocks: [
                { type: "text", html: "住在一起就有关系——四种基本关系：捕食（一方吃一方）、竞争（抢同一资源）、寄生（一方受益一方受害）、互利共生（互相有利）。" },
                { type: "text", html: "<div style=\"text-align:center;margin:2px 0\">" +
                  "<div style=\"margin:4px 0\"><button type=\"button\" id=\"bioB24RL-cap\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.rel('cap',this)\">捕食</button>" +
                  "<button type=\"button\" id=\"bioB24RL-cmp\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.rel('cmp',this)\">竞争</button>" +
                  "<button type=\"button\" id=\"bioB24RL-par\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.rel('par',this)\">寄生</button>" +
                  "<button type=\"button\" id=\"bioB24RL-mut\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.rel('mut',this)\">互利共生</button></div>" +
                  "<div style=\"margin:4px 0\"><button type=\"button\" id=\"bioB24RR-x1\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.rel(null,'dodder',this)\">菟丝子吸大豆</button>" +
                  "<button type=\"button\" id=\"bioB24RR-x2\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.rel(null,'mantis',this)\">螳螂捕蝉</button>" +
                  "<button type=\"button\" id=\"bioB24RR-x3\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.rel(null,'rhizo',this)\">豆科植物与根瘤菌</button>" +
                  "<button type=\"button\" id=\"bioB24RR-x4\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.rel(null,'graze',this)\">羊与牛抢草</button></div>" +
                  "</div>" +
                  "<div id=\"bioB24RelMsg\" style=\"text-align:center;font-size:0.9rem;min-height:2.2em\">先点左边一种关系，再点右边对应实例</div>" },
                { type: "text", html: "配对口诀：先看谁受益、谁受害——一方吃一方是捕食，抢资源是竞争，一方白吃是寄生，双赢是互利共生。" }
              ],
              point: "配对结论：先看谁受益谁受害。"
            },
            /* ============ p3：垂直/水平结构 + 竞争专治 ============ */
            {
              id: "b24.2.1-p3",
              kind: "explain",
              title: "群落的结构：分层与镶嵌",
              blocks: [
                { type: "lead", text: "群落也有\"楼层\"和\"街区\"。" },
                { type: "text", html: "垂直结构=分层现象：森林里乔木、灌木、草本各占一层，都晒到太阳；水平结构=不同地段物种不同：向阳处与背阴处、岸边与水心，物种组成不一样。" },
                { type: "trap", text: "⚠️ 别搞混：竞争不等于一方灭绝！生态位分化（吃不同的草、住不同的层）让竞争者共存——共存才是常态。" }
              ],
              point: "垂直=分层，水平=镶嵌；竞争可共存。"
            },
            /* ============ p4：演替 ============ */
            {
              id: "b24.2.1-p4",
              kind: "explain",
              title: "演替：群落的变迁",
              blocks: [
                { type: "lead", text: "光秃秃的岩石上，怎么长出森林？" },
                { type: "text", html: "初生演替=从无到有：裸岩→地衣→苔藓→草本→灌木→森林，慢（几百年）。次生演替=从有到有：火灾后的草原、弃耕的农田，快（几十年）。" },
                { type: "text", html: "人类活动是重要影响因素：植树造林加速演替，过度放牧、围湖造田则让群落退化——人可以加速，也可以逆转。" }
              ],
              point: "初生慢、次生快；人类可加速可逆转。"
            }
          ]
        },
      ]
    },
    {
      id: "b24.3",
      title: "生态系统的结构与功能",
      lessons: [
        {
          id: "b24.3.1",
          title: "生态系统的结构",
          prereq: "群落",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：四成分 + 起点专治 ============ */
            {
              id: "b24.3.1-p1",
              kind: "explain",
              title: "生态系统的四种成分",
              blocks: [
                { type: "lead", text: "群落加上阳光、空气、水、土壤——就成了生态系统。" },
                { type: "text", html: "四成分：生产者（植物、藻类：制造有机物）、消费者（动物：直接或间接吃生产者）、分解者（细菌、真菌：分解遗体）、非生物成分（阳光、空气、水、土壤）。" },
                { type: "trap", text: "⚠️ 别搞混：食物链的起点是生产者！阳光是非生物部分——它不吃也不被吃，不能当起点。" },
                { type: "note", text: "模式图：非等比、非实物。" }
              ],
              point: "四成分：生产者、消费者、分解者、非生物。"
            },
            /* ============ p2：食物网构建（东湖） ============ */
            {
              id: "b24.3.1-p2",
              kind: "interact",
              title: "搭建东湖水生食物网",
              exploreTip: "先点被吃者，再点吃它者，把 6 条正确的\"吃\"连线连出来。",
              blocks: [
                { type: "text", html: "食物链：生产者→初级消费者→次级消费者……多条食物链交织成食物网。营养级=食物链上的位置（生产者是第一营养级）。" },
                { type: "text", html: "<svg viewBox=\"0 0 360 210\" width=\"100%\" role=\"img\" aria-label=\"东湖水生生物连线示意\" style=\"max-width:440px;display:block;margin:6px auto\">" +
                  "<defs><marker id=\"bioB24Ah\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 Z\" style=\"fill:var(--bio-organelle)\"/></marker></defs>" +
                  "<g id=\"bioB24WebLines\"></g>" +
                  "<g font-size=\"13.2\" text-anchor=\"middle\">" +
                  "<circle cx=\"52\" cy=\"52\" r=\"26\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2\"/><text x=\"52\" y=\"57\" style=\"fill:var(--bio-product)\">藻类</text>" +
                  "<circle cx=\"52\" cy=\"158\" r=\"26\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2\"/><text x=\"52\" y=\"163\" style=\"fill:var(--bio-product)\">水草</text>" +
                  "<circle cx=\"160\" cy=\"52\" r=\"26\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"2\"/><text x=\"160\" y=\"57\" style=\"fill:var(--bio-substrate)\">浮游动物</text>" +
                  "<circle cx=\"160\" cy=\"158\" r=\"26\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"2\"/><text x=\"160\" y=\"163\" style=\"fill:var(--bio-substrate)\">螺</text>" +
                  "<circle cx=\"262\" cy=\"105\" r=\"26\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"2\"/><text x=\"262\" y=\"110\" style=\"fill:var(--bio-substrate)\">鲫鱼</text>" +
                  "<circle cx=\"340\" cy=\"105\" r=\"20\" style=\"fill:none;stroke:var(--bio-gene)\" stroke-width=\"2\"/><text x=\"340\" y=\"110\" style=\"fill:var(--bio-gene)\">鳜鱼</text>" +
                  "</g></svg>" +
                  "<div style=\"text-align:center;margin:2px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.web('algae',this)\">藻类</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.web('grass',this)\">水草</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.web('zoo',this)\">浮游动物</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.web('snail',this)\">螺</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.web('carp',this)\">鲫鱼</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.web('perch',this)\">鳜鱼</button>" +
                  "</div>" +
                  "<div id=\"bioB24WebMsg\" style=\"text-align:center;font-size:0.9rem;min-height:2.2em\">先点被吃者，再点吃它者</div>" +
                  "<div style=\"text-align:center;font-size:12px;color:var(--bio-ink-soft)\">模式图：非等比、非实物；箭头=被吃者→捕食者</div>" },
                { type: "text", html: "连线规则：箭头从被吃者指向捕食者——能量跟着\"吃\"走。连错了会打回，想想谁吃谁。" }
              ],
              point: "食物网=交织的食物链；起点是生产者。"
            },
            /* ============ p3：能量输入起点 ============ */
            {
              id: "b24.3.1-p3",
              kind: "explain",
              title: "能量从哪里进入生态系统",
              blocks: [
                { type: "lead", text: "整个生态系统的能量，从哪来？" },
                { type: "text", html: "能量输入的起点：生产者固定的太阳能。阳光→生产者光合作用→有机物里的化学能——能量第一次有了\"载体\"。" },
                { type: "text", html: "记住：阳光是\"供能者\"不是\"起点\"——能量进入生物群落的门，是生产者。" }
              ],
              point: "能量起点：生产者固定的太阳能。"
            }
          ]
        },
        {
          id: "b24.3.2",
          title: "能量流动",
          prereq: "生态系统结构",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：辨析③立靶（能量篇） ============ */
            {
              id: "b24.3.2-p1",
              kind: "explain",
              title: "立靶：能量单向流动",
              blocks: [
                { type: "lead", text: "能量进了生态系统，是循环用，还是用完就走？" },
                { type: "text", html: "立靶：能量单向流动、逐级递减——每一级只把 10%–20% 传给下一级，剩下的变成热散掉。能量金字塔：级级缩小的塔，塔尖永远最小。" },
                { type: "slogan", text: "能量单向物循环" },
                { type: "trap", text: "⚠️ 别搞混：\"能量循环利用\"错！能量单向流动、不可循环——本课专治。" },
                { type: "note", text: "模式图：非等比、非实物；10%–20% 是范围，不是定值。" }
              ],
              point: "能量：单向流动，逐级递减。"
            },
            /* ============ p2：10%–20% 滑块交互 ============ */
            {
              id: "b24.3.2-p2",
              kind: "interact",
              title: "算一算：10%–20% 是多少",
              exploreTip: "拖动滑块选一个传递效率，看各级剩下的能量还剩多少。",
              blocks: [
                { type: "text", html: "<div style=\"text-align:center;margin:4px 0\">" +
                  "<label for=\"bioB24Eff\" style=\"font-size:0.95rem\">传递效率：<b id=\"bioB24EffV\">15%</b></label><br>" +
                  "<input type=\"range\" id=\"bioB24Eff\" min=\"10\" max=\"20\" step=\"1\" value=\"15\" style=\"width:min(320px,86%);min-height:44px\" oninput=\"BIO_B24.flow()\" aria-label=\"能量传递效率滑块\">" +
                  "</div>" +
                  "<div id=\"bioB24FlowOut\" style=\"text-align:center;font-size:0.95rem;line-height:1.9\">" +
                  "一→10000，二→1500，三→225，四→34（约 0.3%）</div>" +
                  "<div style=\"text-align:center;font-size:12px;color:var(--bio-ink-soft)\">能量值均为相对值（非实测数据）；第一营养级按 10000 算起</div>" },
                { type: "text", html: "粪便里的能量没被\"吃\"进去，不进入下一营养级——只算同化量的 10%–20%。" },
                { type: "mathlink", text: "代数 ch00：10%–20% 是百分比与比例——数学课的百分比计算，这里直接用。" }
              ],
              point: "效率 10%–20%；粪便能量不进下一级。"
            },
            /* ============ p3：兑现 b21.1.3-a1（能量篇） ============ */
            {
              id: "b24.3.2-p3",
              kind: "explain",
              title: "兑现：能量怎样流动",
              blocks: [
                { type: "mathlink", text: "兑现：b21.1.3 第 3 页问过——\"能量在生态系统中怎样流动\"——答案：单向流动、逐级递减（10%–20%），不可循环利用；粪便中的能量未进入下一营养级。" },
                { type: "lead", text: "一句话收束能量篇。" },
                { type: "text", html: "能量流动三句话：单向（被吃者→捕食者，不回头）、递减（每级只剩 10%–20%）、不循环（散掉的热回不来）。" }
              ],
              point: "能量篇兑现：单向、递减、不可循环。"
            }
          ]
        },
        {
          id: "b24.3.3",
          title: "物质循环",
          prereq: "能量流动",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：碳循环 + 兑现 b03.1.5-a1 + 辨析③回填 ============ */
            {
              id: "b24.3.3-p1",
              kind: "explain",
              title: "碳循环：认旧友回填",
              blocks: [
                { type: "mathlink", text: "认旧友：b03.1.5 第 2 页问过——\"碳在生物群落和无机环境之间怎样循环往复\"——看这张环路图找答案。" },
                { type: "text", html: "碳循环完整环路：无机环境（CO₂）→生产者→消费者→分解者→无机环境。箭头方向即对错：光合作用把碳\"搬\"进生物群落，呼吸作用和分解作用把碳\"送\"回无机环境。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 268\" width=\"100%\" role=\"img\" aria-label=\"碳循环环路示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.2\" text-anchor=\"middle\">" +
                  "<text x=\"170\" y=\"26\" style=\"fill:var(--bio-aux)\">无机环境（CO₂）</text>" +
                  "<text x=\"300\" y=\"112\" style=\"fill:var(--bio-product)\">生产者</text>" +
                  "<text x=\"170\" y=\"196\" style=\"fill:var(--bio-substrate)\">消费者</text>" +
                  "<text x=\"40\" y=\"112\" style=\"fill:var(--bio-aux)\">分解者</text>" +
                  "<path d=\"M205,40 C250,55 275,80 288,100\" style=\"fill:none;stroke:var(--bio-aux)\" stroke-width=\"2.5\" stroke-dasharray=\"7 5\" marker-end=\"url(#bioB24Cm)\"/>" +
                  "<path d=\"M288,124 C270,150 220,175 195,186\" style=\"fill:none;stroke:var(--bio-aux)\" stroke-width=\"2.5\" stroke-dasharray=\"7 5\" marker-end=\"url(#bioB24Cm)\"/>" +
                  "<path d=\"M145,186 C120,175 70,150 52,124\" style=\"fill:none;stroke:var(--bio-aux)\" stroke-width=\"2.5\" stroke-dasharray=\"7 5\" marker-end=\"url(#bioB24Cm)\"/>" +
                  "<path d=\"M52,100 C70,80 90,55 135,40\" style=\"fill:none;stroke:var(--bio-aux)\" stroke-width=\"2.5\" stroke-dasharray=\"7 5\" marker-end=\"url(#bioB24Cm)\"/>" +
                  "<text x=\"170\" y=\"112\" style=\"fill:var(--bio-aux)\" font-size=\"15\">循环</text>" +
                  "<defs><marker id=\"bioB24Cm\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 Z\" style=\"fill:var(--bio-aux)\"/></marker></defs>" +
                  "<text x=\"70\" y=\"248\" style=\"fill:var(--bio-ink-soft)\">化石燃料</text>" +
                  "<line x1=\"120\" y1=\"244\" x2=\"200\" y2=\"244\" style=\"stroke:var(--bio-highlight)\" stroke-width=\"2.5\" marker-end=\"url(#bioB24Cm)\"/>" +
                  "<text x=\"245\" y=\"248\" style=\"fill:var(--bio-ink-soft)\">大气</text>" +
                  "<text x=\"160\" y=\"232\" font-size=\"12\" style=\"fill:var(--bio-highlight)\">单向</text>" +
                  "</g></svg>" +
                  "<div style=\"text-align:center;font-size:12px;color:var(--bio-ink-soft)\">模式图：非等比、非实物；灰色虚线=物质循环</div>" },
                { type: "text", html: "辨析③回填：能量 vs 物质——能量箭头单向（被吃者→捕食者，越传越少）；物质箭头成环（生物群落↔无机环境，循环往复）。" },
                { type: "slogan", text: "能量单向物循环" },
                { type: "note", text: "化石燃料→大气是单向的，不循环——几亿年前的碳一去不回头。" }
              ],
              point: "碳循环：无机→生产者→消费者→分解者→无机。"
            },
            /* ============ p2：碳循环箭头闯关（交互） ============ */
            {
              id: "b24.3.3-p2",
              kind: "interact",
              title: "闯关：箭头方向对不对",
              exploreTip: "四道箭头题：每题选一个方向，方向错了打回，全对才算过关。",
              blocks: [
                { type: "text", html: "<div id=\"bioB24CbQ\" style=\"margin:4px 0\"></div>" +
                  "<div id=\"bioB24CbMsg\" style=\"text-align:center;font-size:0.9rem;min-height:2.2em\">点\"出题\"开始闯关</div>" +
                  "<div style=\"text-align:center\"><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B24.carbonAsk()\">出题</button></div>" },
                { type: "text", html: "闯关规则：物质循环的箭头方向就是对错——想清楚碳从哪来、到哪去，再点。" }
              ],
              point: "闯关结论：方向即对错；化石燃料→大气单向。"
            },
            /* ============ p3：温室效应 + 兑现 b21.1.3-a1（物质篇） ============ */
            {
              id: "b24.3.3-p3",
              kind: "explain",
              title: "温室效应：只讲机制",
              blocks: [
                { type: "lead", text: "大气里的 CO₂ 多了，地球会怎样？" },
                { type: "text", html: "机制：大气 CO₂ 像一层\"保温毯\"——太阳的短波辐射进得来，地面的长波辐射出不去，热量被留住。数据：工业革命以来，大气 CO₂ 浓度持续上升。" },
                { type: "note", text: "只讲机制与数据。化石燃料燃烧是重要的人为来源之一——这也是它\"单向\"的原因。" },
                { type: "mathlink", text: "兑现：b21.1.3 第 3 页问过——\"物质怎样循环\"——答案：物质在生物群落与无机环境之间循环往复，碳循环就是一例。" }
              ],
              point: "物质篇兑现：生物群落↔无机环境循环。"
            }
          ]
        }
      ]
    },
    {
      id: "b24.4",
      title: "生物多样性与保护",
      lessons: [
        {
          id: "b24.4.1",
          title: "生物多样性与保护",
          prereq: "物质循环",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：三个层次 ============ */
            {
              id: "b24.4.1-p1",
              kind: "explain",
              title: "生物多样性的三个层次",
              blocks: [
                { type: "lead", text: "生物多样性，不只是\"物种多\"。" },
                { type: "text", html: "三个层次：基因多样性（同种不同个体的差异）、物种多样性（物种数目的多少）、生态系统多样性（森林、草原、湿地等类型的丰富）。" },
                { type: "text", html: "三层的关系：基因多样性是基础，物种多样性是表现，生态系统多样性是舞台——保护要三层一起保。" }
              ],
              point: "三层次：基因、物种、生态系统。"
            },
            /* ============ p2：威胁 + 本地案例 ============ */
            {
              id: "b24.4.1-p2",
              kind: "explain",
              title: "保护：本地案例",
              blocks: [
                { type: "lead", text: "多样性在消失——头号凶手是栖息地丧失。" },
                { type: "text", html: "保护以就地保护为主：建立自然保护区，让生物在原来的家园繁衍生息。迁地保护（动物园、繁育中心）是补充。" },
                { type: "mathlink", text: "认旧友：b09.2.2 第 3 页——长江江豚是哺乳动物（用肺呼吸、胎生、恒温三判据）；它的家在长江——保护江豚，先保护长江。" },
                { type: "text", html: "本地案例：石首麋鹿——迁地保护繁育后野放回故乡；东湖生态修复——退渔还湖、水生植物重建，食物网正在恢复。" },
                { type: "trap", text: "⚠️ 别搞混：保护≠建动物园！就地保护（自然保护区）才是主力。" }
              ],
              point: "就地保护为主：保护栖息地。"
            },
            /* ============ p3：本地保护案例拼图（交互） ============ */
            {
              id: "b24.4.1-p3",
              kind: "interact",
              title: "拼图：本地保护案例",
              exploreTip: "左边点一个案例，右边点它的保护措施，配对成功三组才算拼好。",
              blocks: [
                { type: "text", html: "<div style=\"text-align:center;margin:2px 0\">" +
                  "<div style=\"margin:4px 0\"><button type=\"button\" id=\"bioB24CL-a\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.cse('L','porpoise',this)\">长江江豚</button>" +
                  "<button type=\"button\" id=\"bioB24CL-b\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.cse('L','deer',this)\">石首麋鹿</button>" +
                  "<button type=\"button\" id=\"bioB24CL-c\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.cse('L','lake',this)\">东湖</button></div>" +
                  "<div style=\"margin:4px 0\"><button type=\"button\" id=\"bioB24CR-x\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.cse('R','restore',this)\">生态修复</button>" +
                  "<button type=\"button\" id=\"bioB24CR-y\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.cse('R','reserve',this)\">建自然保护区</button>" +
                  "<button type=\"button\" id=\"bioB24CR-z\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B24.cse('R','rewild',this)\">迁地保护后野放</button></div>" +
                  "</div>" +
                  "<div id=\"bioB24CseMsg\" style=\"text-align:center;font-size:0.9rem;min-height:2.2em\">先点左边一个案例，再点右边对应措施</div>" }
              ],
              point: "拼图结论：保护=给生物留住家园。"
            }
          ]
        },
        {
          id: "b24.4.2",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b24.4.2-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b24.1.1：种群=同种+同地+全部个体；密度最基本；样方法/标记重捕法；J 型（资源无限）/S 型（K 值由环境决定）。b24.2.1：群落=所有种群集合；丰富度；四种种间关系；垂直/水平结构；竞争可共存；初生/次生演替。b24.3.1：四成分；食物链起点是生产者；食物网；营养级。b24.3.2：能量单向物循环（能量篇）；10%–20%；粪便能量不进下一级。b24.3.3：碳循环环路无机环境（CO₂）→生产者→消费者→分解者→无机环境；化石燃料→大气单向；温室效应只讲机制。b24.4.1：多样性三层次；就地保护为主；江豚/麋鹿/东湖。" },
                { type: "choice", stem: "下列关于食物链起点的说法，正确的是？",
                  options: ["起点是阳光", "起点是生产者", "起点是消费者", "起点是分解者"], answer: 1,
                  tip: "阳光是非生物部分，不吃不被吃——起点是生产者（b24.3.1 第 1 页）。" },
                { type: "judge", stem: "能量可以在生态系统中循环利用。",
                  answer: false, tip: "能量单向流动、不可循环——本课专治（b24.3.2 第 1 页）。" },
                { type: "judge", stem: "K 值是固定不变的，环境再好也不会升高。",
                  answer: false, tip: "K 值由环境决定，环境改善 K 值可升高（b24.1.1 第 4 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b24.4.2-p2",
              kind: "quiz",
              title: "习题（二）",
              questions: [
                { type: "match", stem: "把概念和它的含义配对：",
                  pairs: [["种群密度", "单位面积的个体数"], ["丰富度", "物种数目的多少"], ["营养级", "食物链上的位置"], ["K 值", "环境容纳量"]],
                  options: ["物种数目的多少", "环境容纳量", "单位面积的个体数", "食物链上的位置"],
                  tip: "密度=多少个体；丰富度=多少物种；营养级=第几级；K 值=养活上限。" },
                { type: "order", stem: "把碳循环的四个环节按碳的流向排好：",
                  items: ["无机环境（CO₂）", "生产者", "消费者", "分解者"],
                  scrambled: ["消费者", "无机环境（CO₂）", "分解者", "生产者"],
                  tip: "无机环境（CO₂）→生产者→消费者→分解者→无机环境（b24.3.3 第 1 页）。" },
                { type: "choice", stem: "草原上羊和牛都吃草，长期来看最可能的结果是？",
                  options: ["其中一方必然灭绝", "生态位分化后共存", "它们都不再吃草", "变成捕食关系"], answer: 1,
                  tip: "竞争≠灭绝：吃不同的草、住不同的层就能共存（b24.2.1 第 3 页）。" },
                { type: "choice", stem: "保护生物多样性最有效的措施是？",
                  options: ["建动物园", "建立自然保护区", "人工繁殖放归", "迁地保护为主"], answer: 1,
                  tip: "就地保护为主：自然保护区（b24.4.1 第 2 页）。" }
              ],
              point: "全章完：种群—群落—生态系统—保护，一条线。"
            }
          ]
        }
      ]
    }
  ]
};

/* ============ b24 内联交互命名空间（零新引擎组件；P18 引擎内容本批不引用） ============ */
window.BIO_B24 = (function () {
  function say(id, html) { var m = document.getElementById(id); if (m) m.innerHTML = html; }
  function markBtn(btn) {
    if (!btn) return;
    var sibs = btn.parentNode.querySelectorAll("button");
    for (var i = 0; i < sibs.length; i++) sibs[i].style.outline = "";
    btn.style.outline = "3px solid var(--bio-highlight)";
    btn.style.outlineOffset = "1px";
  }
  function dimBtn(id, done) {
    var b = document.getElementById(id);
    if (!b) return;
    b.style.opacity = done ? "0.45" : "";
    b.style.outline = "";
  }
  /* ---------- b24.1.1-p5：种群增长曲线模拟 ---------- */
  function grow(mode, btn) {
    markBtn(btn);
    var j = document.getElementById("bioB24J"), s = document.getElementById("bioB24S"),
        k = document.getElementById("bioB24K"), kl = document.getElementById("bioB24KL");
    if (mode === "j") {
      j.style.opacity = "1"; s.style.opacity = "0.25"; k.style.opacity = "0.25"; kl.style.opacity = "0.25";
      say("bioB24GrowMsg", "资源无限：J 型——一路冲上去，没有天花板。");
    } else {
      j.style.opacity = "0.25"; s.style.opacity = "1"; k.style.opacity = "1"; kl.style.opacity = "1";
      say("bioB24GrowMsg", "资源有限：S 型——被 K 值虚线\"按住\"，在环境容纳量附近波动。");
    }
  }
  /* ---------- 通用配对引擎（种间关系 / 保护案例拼图） ---------- */
  var PAIR_CFG = {
    rel: {
      msg: "bioB24RelMsg",
      pairs: { cap: "mantis", cmp: "graze", par: "dodder", mut: "rhizo" },
      names: { cap: "捕食", cmp: "竞争", par: "寄生", mut: "互利共生", mantis: "螳螂捕蝉", graze: "羊与牛抢草", dodder: "菟丝子吸大豆", rhizo: "豆科植物与根瘤菌" },
      ids: { L: { cap: "bioB24RL-cap", cmp: "bioB24RL-cmp", par: "bioB24RL-par", mut: "bioB24RL-mut" },
             R: { mantis: "bioB24RR-x2", graze: "bioB24RR-x4", dodder: "bioB24RR-x1", rhizo: "bioB24RR-x3" } },
      why: { cap: "螳螂吃蝉——一方吃一方。", cmp: "都吃草——抢同一资源。", par: "菟丝子吸大豆的养分——一方受益一方受害。", mut: "根瘤菌固氮、豆科植物供养分——双赢。" }
    },
    cse: {
      msg: "bioB24CseMsg",
      pairs: { porpoise: "reserve", deer: "rewild", lake: "restore" },
      names: { porpoise: "长江江豚", deer: "石首麋鹿", lake: "东湖", reserve: "建自然保护区", rewild: "迁地保护后野放", restore: "生态修复" },
      ids: { L: { porpoise: "bioB24CL-a", deer: "bioB24CL-b", lake: "bioB24CL-c" },
             R: { reserve: "bioB24CR-y", rewild: "bioB24CR-z", restore: "bioB24CR-x" } },
      why: { porpoise: "江豚的家在长江——建自然保护区，就地保护。", deer: "麋鹿先迁地繁育、再野放回故乡。", lake: "东湖退渔还湖、重建水生植物——生态修复。" }
    }
  };
  var pairState = {};
  function pairPlay(tag, side, key, btn) {
    var cfg = PAIR_CFG[tag];
    var st = pairState[tag] || (pairState[tag] = { sel: null, done: {} });
    markBtn(btn);
    if (side === "L") {
      if (st.done[key]) return;
      st.sel = key;
      say(cfg.msg, "已选「" + cfg.names[key] + "」——再点右边对应项");
      return;
    }
    if (!st.sel) { say(cfg.msg, "先点左边，再点右边"); return; }
    var l = st.sel;
    if (cfg.pairs[l] === key) {
      st.done[l] = true;
      dimBtn(cfg.ids.L[l], true); dimBtn(cfg.ids.R[key], true);
      st.sel = null;
      var n = Object.keys(st.done).length, total = Object.keys(cfg.pairs).length;
      say(cfg.msg, "✓ " + cfg.names[l] + "↔" + cfg.names[key] + "：" + cfg.why[l] + "（" + n + "/" + total + "）" +
        (n === total ? "——全部配对成功！" : ""));
    } else {
      say(cfg.msg, "✗ 不对——再想想「谁受益、谁受害」。");
      st.sel = null;
    }
  }
  /* ---------- b24.3.1-p2：食物网构建 ---------- */
  var WEB_POS = { algae: [52, 52], grass: [52, 158], zoo: [160, 52], snail: [160, 158], carp: [262, 105], perch: [340, 105] };
  var WEB_EDGE = { "algae>zoo": 1, "algae>snail": 1, "grass>snail": 1, "zoo>carp": 1, "snail>carp": 1, "carp>perch": 1 };
  var WEB_NAME = { algae: "藻类", grass: "水草", zoo: "浮游动物", snail: "螺", carp: "鲫鱼", perch: "鳜鱼" };
  var webSel = null, webDone = {};
  function web(key, btn) {
    markBtn(btn);
    if (!webSel) { webSel = key; say("bioB24WebMsg", "被吃者：「" + WEB_NAME[key] + "」——再点吃它者"); return; }
    if (webSel === key) { webSel = null; say("bioB24WebMsg", "先点被吃者，再点吃它者"); return; }
    var e = webSel + ">" + key;
    if (WEB_EDGE[e] && !webDone[e]) {
      webDone[e] = true;
      var g = document.getElementById("bioB24WebLines");
      if (g) {
        var p1 = WEB_POS[webSel], p2 = WEB_POS[key];
        var ln = document.createElementNS("http://www.w3.org/2000/svg", "line");
        ln.setAttribute("x1", p1[0]); ln.setAttribute("y1", p1[1]);
        ln.setAttribute("x2", p2[0]); ln.setAttribute("y2", p2[1]);
        ln.setAttribute("style", "stroke:var(--bio-organelle)");
        ln.setAttribute("stroke-width", "2.5");
        ln.setAttribute("marker-end", "url(#bioB24Ah)");
        g.appendChild(ln);
      }
      var n = Object.keys(webDone).length;
      say("bioB24WebMsg", "✓ " + WEB_NAME[webSel] + "→" + WEB_NAME[key] + " 连上了（" + n + "/6）" +
        (n === 6 ? "——食物网建成！" : ""));
    } else if (webDone[e]) {
      say("bioB24WebMsg", "这条已经连过了——换一对试试");
    } else {
      say("bioB24WebMsg", "✗ 连错了打回——想想谁吃谁（箭头从被吃者指向捕食者）");
    }
    webSel = null;
  }
  /* ---------- b24.3.2-p2：能量流动滑块 ---------- */
  function flow() {
    var r = document.getElementById("bioB24Eff");
    if (!r) return;
    var e = parseInt(r.value, 10);
    document.getElementById("bioB24EffV").textContent = e + "%";
    var v1 = 10000, v2 = Math.round(v1 * e / 100), v3 = Math.round(v2 * e / 100), v4 = Math.round(v3 * e / 100);
    say("bioB24FlowOut",
      "一→" + v1 + "，二→" + v2 + "（" + e + "%），三→" + v3 + "，四→" + v4 +
      "（约 " + (v4 / 100).toFixed(1) + "%）");
  }
  /* ---------- b24.3.3-p2：碳循环箭头闯关 ---------- */
  var CB_Q = [
    { a: "生产者", b: "消费者", ok: 0, why: "生产者→消费者：被吃者→捕食者。" },
    { a: "消费者", b: "分解者", ok: 0, why: "消费者→分解者：遗体归分解者。" },
    { a: "分解者", b: "无机环境（CO₂）", ok: 0, why: "分解者→无机环境：分解作用释放 CO₂。" },
    { a: "化石燃料", b: "大气", ok: 0, why: "化石燃料→大气：单向，不循环。" }
  ];
  var cbIdx = 0, cbDone = 0;
  function carbonAsk() {
    if (cbIdx >= CB_Q.length) {
      say("bioB24CbMsg", "闯关成功：碳循环方向全对！化石燃料→大气是单向的。");
      return;
    }
    var q = CB_Q[cbIdx];
    say("bioB24CbQ", "<div style=\"text-align:center;margin:6px 0\">第 " + (cbIdx + 1) + " 题：" +
      "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 6px\" onclick=\"BIO_B24.carbonGo(0,this)\">" + q.a + "→" + q.b + "</button>" +
      "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 6px\" onclick=\"BIO_B24.carbonGo(1,this)\">" + q.b + "→" + q.a + "</button></div>");
    say("bioB24CbMsg", "选一个方向（" + cbDone + "/4 已过）");
  }
  function carbonGo(dir, btn) {
    markBtn(btn);
    var q = CB_Q[cbIdx];
    if (dir === q.ok) {
      cbIdx++; cbDone++;
      say("bioB24CbMsg", "✓ 对！" + q.why + "（" + cbDone + "/4）");
      if (cbIdx < CB_Q.length) carbonAsk();
      else say("bioB24CbMsg", "闯关成功：碳循环方向全对！化石燃料→大气是单向的。");
    } else {
      say("bioB24CbMsg", "✗ 方向错了，打回——再想想碳从哪来、到哪去。");
    }
  }
  return {
    grow: grow,
    rel: function () {
      var a = Array.prototype.slice.call(arguments);
      if (a.length === 2) pairPlay("rel", "L", a[0], a[1]);
      else pairPlay("rel", "R", a[1], a[2]);
    },
    cse: function (side, key, btn) { pairPlay("cse", side, key, btn); },
    web: web,
    flow: flow,
    carbonAsk: carbonAsk,
    carbonGo: carbonGo
  };
})();
/* 能量滑块首帧读数已在 HTML 中按默认值 15% 预填（审计基线=第一帧）；拖动后 BIO_B24.flow() 重算 */
