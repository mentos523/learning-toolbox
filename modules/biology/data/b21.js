/* ============================================================
 * 学习工具箱 · 生物 · 第二十一章数据（生物 P6 生产队 2026-10-19）
 *
 * 课：b21.1.1 自然选择学说（3 页）/ b21.1.2 种群是进化的基本单位
 *     （3 页）/ b21.1.3 物种形成与共同进化（3 页）/
 *     b21.1.4 人类的起源（2 页）/ b21.1.5 本章小结与习题（2 页）。
 *     共 13 页。本章是全书进化表述的"宪法章"。
 * 交互：零新组件（biology-engine.js diff 为空）；过程示意用内联
 * SVG；b21.1.2-p2 基因频率模拟用内联原生 range 滑块（纯 HTML
 * 内联 handler，不新增引擎组件、不新增落点类型）。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 模式图声明：「模式图：非等比、非实物」（BIO-R32）
 * - 辨析④立靶（b21.1.2-p2）：「进化=种群基因频率的定向改变」
 *   （BIO-R64，缺=FAIL）；「进化是种群的事」（BIO-R63，改字=FAIL）
 * - 定型表述：「自然选择作用于个体，进化体现在种群」
 *   （b21.1.2-p3；pedagogy b21.1 策略）
 * - BIO-R19：「变异先存在，抗生素只是选择」
 *   （"抗生素诱导细菌变异"=FAIL）
 * - 拉马克专治：「个体不进化，长脖子个体被选择留下，
 *   种群基因频率改变」（b21.1.2-p2）
 * - 新物种标志：「生殖隔离」（b21.1.3-p1；"样子差别大"=FAIL）
 * - T6 口径：「算总账」仅限点拨口语，本批正式页不出现
 *
 * 门禁⑧：新术语首现即定义——自然选择（b21.1.1-p1）/
 * 种群/基因库/基因频率（b21.1.2-p1）/
 * 地理隔离/生殖隔离（b21.1.3-p1）/共同进化（b21.1.3-p3）。
 * 注：b20.js 中"种群"仅见于辨析④回填句引用、"自然选择"仅见于
 * 一道题的干扰项，均非术语定义；正式定义首现仍在本章。
 * 门禁⑨：深链 token 只用已生产课号（b20.1.1/b20.1.2 回填链、
 * b21.1.2 章内立靶回链；XLINK_BIO 在表）；b04.1.1 未生产，
 * b21.1.4 只做纯文本内容回填，不挂深链。
 * 门禁⑩：兑现 b20.1.2-a1（b21.1.2-p3 mathlink 回链 #b20.1.2，
 * 关键词「有利突变是进化的原材料（b21 细讲）」）；本章后指
 * b21.1.3-a1（能量流动与物质循环，b24 细讲）纯文本预告 drafted。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b21"] = {
  id: "b21",
  units: [
    {
      id: "b21.1",
      title: "生物的进化",
      lessons: [
        {
          id: "b21.1.1",
          title: "自然选择学说",
          prereq: "b20 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：达尔文、过度繁殖、生存斗争 ============ */
            {
              id: "b21.1.1-p1",
              kind: "explain",
              title: "达尔文与自然选择",
              blocks: [
                { type: "lead", text: "\"小猎犬号\"五年环球考察——达尔文带回一个大问题：物种从哪来？" },
                { type: "text", html: "先认词——自然选择：生物经激烈的生存斗争，适应者存活、不适应者被淘汰的现象。学说四点：过度繁殖、生存斗争、遗传变异、适者生存。" },
                { type: "text", html: "第一点——过度繁殖：生物都有繁殖过剩的倾向。一对家蝇一个夏天能繁殖出上亿后代——但天并没有被苍蝇铺满。" },
                { type: "text", html: "第二点——生存斗争：资源有限，生物为食物、空间、配偶展开竞争——同种个体之间、不同物种之间、生物与无机环境之间。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 130\" width=\"100%\" role=\"img\" aria-label=\"过度繁殖与有限资源示意\" style=\"max-width:400px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<text x=\"90\" y=\"22\" style=\"fill:var(--bio-ink-soft)\">一对亲本</text>" +
                  "<text x=\"90\" y=\"52\" style=\"fill:var(--bio-gene)\" font-size=\"20\">●●</text>" +
                  "<text x=\"90\" y=\"76\" style=\"fill:var(--bio-ink-soft)\">↓ 繁殖过剩</text>" +
                  "<text x=\"90\" y=\"104\" style=\"fill:var(--bio-gene)\" font-size=\"15.2\">●●●●●●●●…</text>" +
                  "<text x=\"250\" y=\"22\" style=\"fill:var(--bio-ink-soft)\">有限的资源</text>" +
                  "<circle cx=\"250\" cy=\"66\" r=\"34\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2\"/>" +
                  "<text x=\"250\" y=\"72\" style=\"fill:var(--bio-product)\">食物/空间</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"126\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "note", text: "三问自查——过度繁殖带来什么问题？生存斗争发生在谁和谁之间？（答案在本页）" }
              ],
              point: "自然选择四点①②：过度繁殖→生存斗争。"
            },
            /* ============ p2：抗药性形成动画（辨析④预告） ============ */
            {
              id: "b21.1.1-p2",
              kind: "explain",
              title: "抗药性形成",
              blocks: [
                { type: "lead", text: "同样的抗生素，用了几年就不灵了——细菌\"学会\"抵抗了吗？" },
                { type: "text", html: "三步看懂（看图①→②→③）：①用药前：细菌群体里绝大多数是敏感菌，极少数天生带抗性基因——变异先存在！②用药：抗生素杀死敏感菌，抗性菌活下来——抗生素只是\"选择\"，不是\"诱导\"。③繁殖：活下来的抗性菌大量繁殖，整个群体几乎全是抗性菌。" },
                { type: "text", html: "<div style=\"text-align:center;margin:2px 0 4px\">" +
                  "<button type=\"button\" aria-label=\"只看阶段①：用药前\" style=\"margin:0 8px;padding:6px 16px;font-size:16px\" onclick=\"document.getElementById('abxT1').style.display='';document.getElementById('abxS1').style.display='';document.getElementById('abxT2').style.display='none';document.getElementById('abxS2').style.display='none';document.getElementById('abxT3').style.display='none';document.getElementById('abxS3').style.display='none';\">①</button>" +
                  "<button type=\"button\" aria-label=\"只看阶段②：用药后\" style=\"margin:0 8px;padding:6px 16px;font-size:16px\" onclick=\"document.getElementById('abxT1').style.display='none';document.getElementById('abxS1').style.display='none';document.getElementById('abxT2').style.display='';document.getElementById('abxS2').style.display='';document.getElementById('abxT3').style.display='none';document.getElementById('abxS3').style.display='none';\">②</button>" +
                  "<button type=\"button\" aria-label=\"只看阶段③：繁殖后\" style=\"margin:0 8px;padding:6px 16px;font-size:16px\" onclick=\"document.getElementById('abxT1').style.display='none';document.getElementById('abxS1').style.display='none';document.getElementById('abxT2').style.display='none';document.getElementById('abxS2').style.display='none';document.getElementById('abxT3').style.display='';document.getElementById('abxS3').style.display='';\">③</button>" +
                  "</div>" +
                  "<svg viewBox=\"0 0 340 150\" width=\"100%\" role=\"img\" aria-label=\"抗药性形成三阶段示意\" style=\"max-width:430px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<text id=\"abxT1\" x=\"62\" y=\"16\" style=\"fill:var(--bio-ink-soft)\">① 用药前</text>" +
                  "<text id=\"abxT2\" x=\"172\" y=\"16\" style=\"display:none;fill:var(--bio-ink-soft)\">② 用药后</text>" +
                  "<text id=\"abxT3\" x=\"282\" y=\"16\" style=\"display:none;fill:var(--bio-ink-soft)\">③ 繁殖后</text>" +
                  "<g id=\"abxS1\">" +
                  "<circle cx=\"30\" cy=\"34\" r=\"5\" style=\"fill:var(--bio-product)\"/><circle cx=\"48\" cy=\"34\" r=\"5\" style=\"fill:var(--bio-product)\"/><circle cx=\"66\" cy=\"34\" r=\"5\" style=\"fill:var(--bio-product)\"/><circle cx=\"84\" cy=\"34\" r=\"5\" style=\"fill:var(--bio-product)\"/>" +
                  "<circle cx=\"30\" cy=\"52\" r=\"5\" style=\"fill:var(--bio-product)\"/><circle cx=\"48\" cy=\"52\" r=\"5\" style=\"fill:var(--bio-product)\"/><circle cx=\"66\" cy=\"52\" r=\"5\" style=\"fill:var(--bio-product)\"/><circle cx=\"84\" cy=\"52\" r=\"5\" style=\"fill:var(--bio-product)\"/>" +
                  "<circle cx=\"30\" cy=\"70\" r=\"5\" style=\"fill:var(--bio-product)\"/><circle cx=\"48\" cy=\"70\" r=\"5\" style=\"fill:var(--bio-product)\"/><circle cx=\"66\" cy=\"70\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"84\" cy=\"70\" r=\"5\" style=\"fill:var(--bio-product)\"/>" +
                  "<circle cx=\"30\" cy=\"88\" r=\"5\" style=\"fill:var(--bio-product)\"/><circle cx=\"48\" cy=\"88\" r=\"5\" style=\"fill:var(--bio-product)\"/><circle cx=\"66\" cy=\"88\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"84\" cy=\"88\" r=\"5\" style=\"fill:var(--bio-product)\"/>" +
                  "</g><g id=\"abxS2\" style=\"display:none\">" +
                  "<circle cx=\"140\" cy=\"34\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/><circle cx=\"158\" cy=\"34\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/><circle cx=\"176\" cy=\"34\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/><circle cx=\"194\" cy=\"34\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/>" +
                  "<circle cx=\"140\" cy=\"52\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/><circle cx=\"158\" cy=\"52\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/><circle cx=\"176\" cy=\"52\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/><circle cx=\"194\" cy=\"52\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/>" +
                  "<circle cx=\"140\" cy=\"70\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/><circle cx=\"158\" cy=\"70\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/><circle cx=\"176\" cy=\"70\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"194\" cy=\"70\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/>" +
                  "<circle cx=\"140\" cy=\"88\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/><circle cx=\"158\" cy=\"88\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/><circle cx=\"176\" cy=\"88\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"194\" cy=\"88\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/>" +
                  "</g><g id=\"abxS3\" style=\"display:none\">" +
                  "<circle cx=\"250\" cy=\"34\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"268\" cy=\"34\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"286\" cy=\"34\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"304\" cy=\"34\" r=\"5\" style=\"fill:var(--bio-gene)\"/>" +
                  "<circle cx=\"250\" cy=\"52\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"268\" cy=\"52\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"286\" cy=\"52\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"304\" cy=\"52\" r=\"5\" style=\"fill:var(--bio-gene)\"/>" +
                  "<circle cx=\"250\" cy=\"70\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"268\" cy=\"70\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"286\" cy=\"70\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"304\" cy=\"70\" r=\"5\" style=\"fill:var(--bio-gene)\"/>" +
                  "</g>" +
                  "<circle cx=\"30\" cy=\"118\" r=\"5\" style=\"fill:var(--bio-product)\"/><text x=\"62\" y=\"122\" font-size=\"12.48\" text-anchor=\"start\" style=\"fill:var(--bio-ink-soft)\">敏感菌</text>" +
                  "<circle cx=\"120\" cy=\"118\" r=\"5\" style=\"fill:var(--bio-gene)\"/><text x=\"152\" y=\"122\" font-size=\"12.48\" text-anchor=\"start\" style=\"fill:var(--bio-ink-soft)\">抗性菌</text>" +
                  "<circle cx=\"210\" cy=\"118\" r=\"5\" style=\"fill:var(--bio-ink-soft)\"/><text x=\"242\" y=\"122\" font-size=\"12.48\" text-anchor=\"start\" style=\"fill:var(--bio-ink-soft)\">被杀死</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"144\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "text", html: "辨析④预告：是种群基因频率变了，不是\"细菌个体努力进化\"。（红线：抗生素没有\"诱导\"细菌变异。）" },
                { type: "mathlink", text: "认旧友：b20.1.2 第 3 页——抗生素没有\"诱导\"细菌变异：变异先存在，选择才作用。" },
                { type: "trap", text: "⚠️ 别搞混：\"细菌努力变异抵抗抗生素\"错——变异先存在！抗生素只是选择。" }
              ],
              point: "抗药性：变异先存在，抗生素只是选择。"
            },
            /* ============ p3：遗传变异、适者生存 ============ */
            {
              id: "b21.1.1-p3",
              kind: "explain",
              title: "遗传变异与适者生存",
              blocks: [
                { type: "lead", text: "同样的环境，有的活下来，有的没活下来——差在哪？" },
                { type: "text", html: "第三点——遗传变异：同种生物的个体间总有差异，有的差异能遗传给后代。变异是不定向的（b20.1.2：低频/随机/多害少利/不定向）——\"想要\"的变异不会自己出现。" },
                { type: "text", html: "第四点——适者生存：具有有利变异的个体，容易在生存斗争中获胜、留下更多后代。注意：\"适者\"指适应环境的个体，不是最强壮、最高大的个体。" },
                { type: "text", html: "四点串起来：过度繁殖→生存斗争→（遗传变异提供差异）→适者生存。这就是达尔文的自然选择学说。" },
                { type: "note", text: "三问自查——变异能\"想要\"就有吗？\"适者\"=最强壮吗？学说四点背得出吗？" }
              ],
              point: "四点③④：遗传变异提供差异，适者生存。"
            }
          ]
        },
        {
          id: "b21.1.2",
          title: "种群是进化的基本单位",
          prereq: "自然选择学说",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：种群、基因库、基因频率 ============ */
            {
              id: "b21.1.2-p1",
              kind: "explain",
              title: "种群与基因库",
              blocks: [
                { type: "oldfriend", text: "认旧友：b21.1.1 自然选择四点——但选择到底改变了什么？" },
                { type: "lead", text: "自然选择改变的，不是某个个体——而是整个种群的\"账本\"。" },
                { type: "text", html: "先认词——种群：生活在一定区域的同种生物的全部个体。先认词——基因库：一个种群中全部个体所含的全部基因。先认词——基因频率：在一个种群的基因库中，某个基因占全部等位基因数的比率。" },
                { type: "text", html: "打个比方：基因库是种群的\"基因账本\"，基因频率就是账本上每一笔的占比。进化，就是这本账的占比发生了定向改变。" },
                { type: "mathlink", text: "认旧友：b20.1.1 第 2 页——可遗传变异三来源（基因突变/基因重组/染色体变异）：它们都在基因库里，是进化的原材料。" }
              ],
              point: "种群/基因库/基因频率：账本与占比。"
            },
            /* ============ p2：红线辨析④立靶 + 基因频率模拟 ============ */
            {
              id: "b21.1.2-p2",
              kind: "explain",
              title: "辨析④：进化是种群的事",
              blocks: [
                { type: "lead", text: "本章红线，立靶：" },
                { type: "text", html: "逐字——进化=种群基因频率的定向改变。" },
                { type: "text", html: "逐字——进化是种群的事。拉马克专治：个体不进化，长脖子个体被选择留下，种群基因频率改变。\"长颈鹿为吃高处的叶子而进化出长脖子\"错——错在把进化的单位安在了个体头上。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-ink-soft);border-radius:8px;padding:10px;margin:6px 0\">" +
                  "<div style=\"margin-bottom:4px\">基因频率模拟：拖动滑块（选择压力对 a 基因不利）</div>" +
                  "<input type=\"range\" min=\"5\" max=\"95\" step=\"5\" value=\"5\" aria-label=\"选择压力滑块\" style=\"width:100%;min-height:44px\" oninput=\"var v=this.value;document.getElementById('gfbA').style.width=v+'%';document.getElementById('gfba').style.width=(100-v)+'%';document.getElementById('gflA').textContent='A：'+v+'%';document.getElementById('gfla').textContent='a：'+(100-v)+'%';\">" +
                  "<div style=\"display:flex;height:28px;border-radius:6px;overflow:hidden;margin:8px 0 4px\"><div id=\"gfbA\" style=\"width:5%;background:var(--bio-gene)\"></div><div id=\"gfba\" style=\"width:95%;background:var(--bio-product)\"></div></div>" +
                  "<div><span id=\"gflA\">A：5%</span>　<span id=\"gfla\">a：95%</span></div>" +
                  "<div style=\"font-size:12.48px;color:var(--bio-ink-soft)\">有利基因 A 的基因频率随选择压力定向上升——这就是进化的样子。示意值（非实测数据）</div>" +
                  "</div>" },
                { type: "text", html: "读模拟：滑块=选择压力。A 基因有利，压力越大 A 的基因频率越高——定向改变。自然选择不创造变异，它只决定方向。" }
              ],
              point: "立靶：进化=种群基因频率的定向改变。"
            },
            /* ============ p3：自然选择决定进化方向 + 兑现 b20.1.2-a1 ============ */
            {
              id: "b21.1.2-p3",
              kind: "explain",
              title: "选择决定方向",
              blocks: [
                { type: "mathlink", text: "兑现：b20.1.2 第 1 页说过——有利突变是进化的原材料（b21 细讲）。兑现了：变异提供原材料，自然选择决定方向。" },
                { type: "lead", text: "变异不定向，选择定方向——进化的方向盘在谁手里？" },
                { type: "text", html: "分工：变异（基因突变/基因重组/染色体变异）提供原材料，它不定向、不可控；自然选择决定方向——环境\"选中\"谁，谁的基因频率就上升。" },
                { type: "text", html: "定型表述：自然选择作用于个体，进化体现在种群。回看抗生素案例（b21.1.1 第 2 页）：抗生素杀死的是一个个细菌个体，改变的是整个种群的基因频率。" },
                { type: "trap", text: "⚠️ 别搞混：\"自然选择创造了有利变异\"错——变异先存在！选择只负责\"挑\"。" }
              ],
              point: "变异给材料，选择定方向；作用于个体，体现在种群。"
            }
          ]
        },
        {
          id: "b21.1.3",
          title: "物种形成与共同进化",
          prereq: "种群是进化的基本单位",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：隔离 ============ */
            {
              id: "b21.1.3-p1",
              kind: "explain",
              title: "隔离与新物种",
              blocks: [
                { type: "lead", text: "一个种群被劈成两半，互不见面——久了会怎样？" },
                { type: "text", html: "先认词——地理隔离：同种生物因地理障碍分隔、不能相遇交配的现象（如大河两岸、高山两侧）。先认词——生殖隔离：不同种群的个体不能自由交配，或交配后不能产生可育后代的现象。" },
                { type: "text", html: "链条：地理隔离→各自积累不同的变异→基因频率各自改变→生殖隔离→新物种。记住：生殖隔离是新物种形成的标志——不是\"样子差别大\"！" },
                { type: "mathlink", text: "回看：b21.1.2 第 2 页立靶——\"进化=种群基因频率的定向改变\"。隔离，就是让两个种群的\"定向改变\"各走各的。" },
                { type: "trap", text: "⚠️ 别搞混：\"两个种群样子差别大就是新物种\"错——标志是生殖隔离！" }
              ],
              point: "地理隔离→生殖隔离→新物种。"
            },
            /* ============ p2：地雀喙型—食性配对 ============ */
            {
              id: "b21.1.3-p2",
              kind: "explain",
              title: "地雀的喙",
              blocks: [
                { type: "lead", text: "加拉帕戈斯群岛：不同的岛，不同的喙——配对挑战。" },
                { type: "text", html: "背景：达尔文在加拉帕戈斯群岛发现，地雀的喙形态各异——这是自然选择塑造的经典案例。" },
                { type: "text", html: "先自己配：①大而有力的喙→？②长而尖的喙→？③小而细的喙→？食性候选：碾碎大而硬的种子/取食仙人掌/捕食小昆虫。答案在本页末尾的小结里。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 120\" width=\"100%\" role=\"img\" aria-label=\"三种地雀喙型示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<polygon points=\"30,28 78,40 30,52\" style=\"fill:var(--bio-gene)\"/>" +
                  "<text x=\"150\" y=\"44\" text-anchor=\"start\" style=\"fill:var(--bio-text)\">① 大而有力的喙</text>" +
                  "<polygon points=\"30,66 92,74 30,82\" style=\"fill:var(--bio-gene)\"/>" +
                  "<text x=\"150\" y=\"78\" text-anchor=\"start\" style=\"fill:var(--bio-text)\">② 长而尖的喙</text>" +
                  "<polygon points=\"30,100 58,106 30,112\" style=\"fill:var(--bio-gene)\"/>" +
                  "<text x=\"150\" y=\"110\" text-anchor=\"start\" style=\"fill:var(--bio-text)\">③ 小而细的喙</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"118\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" }
              ],
              point: "配对：大喙→大种子；长喙→仙人掌；小喙→小昆虫。"
            },
            /* ============ p3：共同进化与生物多样性形成 ============ */
            {
              id: "b21.1.3-p3",
              kind: "explain",
              title: "共同进化",
              blocks: [
                { type: "lead", text: "喙变了，种子呢？——进化从来不是独角戏。" },
                { type: "text", html: "先认词——共同进化：不同物种之间、生物与无机环境之间，在相互影响中不断进化和发展的现象。" },
                { type: "text", html: "例子：地雀的喙与植物的种子（喙变→种子跟着变）；猎豹与羚羊（跑得快↔跑得更快）；开花植物与传粉昆虫（花形↔口器）。" },
                { type: "text", html: "生物多样性三个层次：基因多样性（基因库的丰富程度）/物种多样性（物种种类多少）/生态系统多样性（生态系统类型多少）。" },
                { type: "text", html: "纯文本预告：能量在生态系统中怎样流动、物质怎样循环——b24 细讲。" }
              ],
              point: "共同进化：相互影响，共同发展。"
            }
          ]
        },
        {
          id: "b21.1.4",
          title: "人类的起源",
          prereq: "物种形成",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：b04.1.1 内容回填（纯文本，不挂深链） ============ */
            {
              id: "b21.1.4-p1",
              kind: "explain",
              title: "人从哪里来",
              blocks: [
                { type: "lead", text: "人从哪里来？——只讲证据。" },
                { type: "text", html: "人类与现代类人猿有共同的祖先：森林古猿。" },
                { type: "text", html: "关键一步——直立行走：从森林到草原，古猿开始直立行走，解放了双手。这是人猿分界的重要标志。" },
                { type: "text", html: "制造工具：会制造和使用工具，是人类的又一特征。脑量也随之增大。" }
              ],
              point: "森林古猿→直立行走→制造工具。"
            },
            /* ============ p2：表述克制 ============ */
            {
              id: "b21.1.4-p2",
              kind: "explain",
              title: "讲人类起源的三条线",
              blocks: [
                { type: "lead", text: "讲人类起源，有三条克制线。" },
                { type: "text", html: "只讲科学事实：化石是最直接的证据（如南方古猿\"露西\"化石显示直立行走）；不确定的细节不编故事。" },
                { type: "text", html: "不做价值审判：不说\"高级/低级\"——现存物种都适应各自的环境，没有优劣之分。" },
                { type: "text", html: "不制造神秘感：人类起源是科学问题，用证据说话；\"外星人/神创\"不在本课讨论范围。" },
                { type: "note", text: "三问自查——证据是什么？克制线有哪三条？（答案在本页）" }
              ],
              point: "讲事实、不审判、不造神秘。"
            }
          ]
        },
        {
          id: "b21.1.5",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b21.1.5-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b21.1.1：自然选择学说四点（过度繁殖/生存斗争/遗传变异/适者生存）；抗药性案例（变异先存在，抗生素只是选择；辨析④预告）。b21.1.2：种群/基因库/基因频率；立靶\"进化=种群基因频率的定向改变\"\"进化是种群的事\"；自然选择作用于个体，进化体现在种群；兑现 b20.1.2-a1（有利突变是进化的原材料）。b21.1.3：地理隔离/生殖隔离（新物种标志）；地雀喙型—食性配对；共同进化；生物多样性三个层次。b21.1.4：人类起源（森林古猿→直立行走→制造工具），表述克制。" },
                { type: "choice", stem: "达尔文自然选择学说的内容不包括？",
                  options: ["过度繁殖", "生存斗争", "用进废退", "适者生存"], answer: 2,
                  tip: "学说四点：过度繁殖/生存斗争/遗传变异/适者生存（b21.1.1 第 3 页）。" },
                { type: "choice", stem: "进化的基本单位是？",
                  options: ["个体", "种群", "基因库", "生态系统"], answer: 1,
                  tip: "进化是种群的事：基本单位是种群（b21.1.2 第 2 页）。" },
                { type: "choice", stem: "新物种形成的标志是？",
                  options: ["样子差别大", "地理隔离", "生殖隔离", "基因突变"], answer: 2,
                  tip: "生殖隔离是新物种形成的标志（b21.1.3 第 1 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b21.1.5-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "choice", stem: "使用抗生素后，细菌群体出现了抗药性。对这一现象的正确解释是？",
                  options: ["抗生素诱导细菌产生了抗药性变异", "抗性变异先存在，抗生素选择了抗性菌", "细菌为抵抗抗生素而努力进化", "抗药性变异是抗生素使用后才定向产生的"], answer: 1,
                  tip: "变异先存在，抗生素只是选择（b21.1.1 第 2 页）。" },
                { type: "choice", stem: "关于\"长颈鹿为吃高处的叶子而进化出长脖子\"的说法，正确的是？",
                  options: ["个体为适应环境而定向进化", "长脖子个体被选择留下，种群基因频率改变", "长颈鹿伸长脖子把性状传给后代", "环境直接诱导长颈鹿变异出长脖子"], answer: 1,
                  tip: "个体不进化！长脖子个体被选择留下，种群基因频率改变（b21.1.2 第 2 页；拉马克专治）。" },
                { type: "choice", stem: "为验证\"抗生素对细菌起选择作用\"，下列实验设计最合理的是？",
                  options: ["只用抗生素处理一组细菌，看细菌是否全部死亡", "同一菌液分两组：加抗生素/不加，处理前后统计抗性菌比例，重复多次", "用几种抗生素分别处理，只做一次就行", "先用抗生素诱导出抗性菌，再统计抗性菌比例"], answer: 1,
                  tip: "对照（加药/不加）→单一变量（只差抗生素）→重复（b21.1.1 第 2 页，三原则）。" },
                { type: "choice", stem: "\"细菌个体努力进化，终于产生了抗药性。\"这句话错在哪？",
                  options: ["细菌不会产生变异", "进化是种群的事，个体不进化", "抗生素不能杀死细菌", "抗药性与基因无关"], answer: 1,
                  tip: "进化是种群的事：个体不进化，变的是种群基因频率（b21.1.2 第 2 页）。" }
              ],
              point: "全章完。"
            }
          ]
        }
      ]
    }
  ]
};
