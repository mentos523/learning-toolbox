/* ============================================================
 * 学习工具箱 · 生物 · 第二十二章数据（生物 P13 生产队 2026-10-19）
 *
 * 课：b22.1.1 神经调节的结构基础与分级调节（4 页）
 *     b22.1.2 兴奋的产生与传递（5 页）
 *     b22.2.1 激素的分级反馈调节（3 页）
 *     b22.2.2 血糖、水盐与体温调节（4 页）
 *     b22.3.1 特异性免疫（4 页）
 *     b22.3.2 免疫失调与疫苗应用（3 页）
 *     b22.3.3 本章小结与习题（2 页）。共 25 页。
 *     本章讲"机制"，b07（初中）讲"现象"：各课开头"回填一页"复习。
 * 交互：B12 immuno-flow 本批首立（落点 b22.3.1-p4；spec 见
 * docs/biology-interactions.md §B12 + B-F12；渲染器见
 * js/biology-engine.js renderImmunoFlow）；其余交互页用内联 SVG +
 * 原生按钮（tb-btn-secondary ≥44px），零新引擎组件。
 * 习题新题型：judge（判断）/match（配对）/order（排序）渲染器见
 * js/biology.js renderQuestion（本批新增）；题型梯度：
 * judge→choice→match→order→生活题。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 * 新题型 schema：
 *   {type:"judge", stem, answer:true/false, tip}
 *   {type:"match", stem, pairs:[[左,右]...], options:[打乱的右项], tip}
 *   {type:"order", stem, items:[正确顺序], scrambled:[初始展示], tip}
 * B12 params 扩展（向后兼容）：cellularCards（细胞线角色卡）；
 * roleCards[].why（放错时的因果提示）；卡片展示按正确序的逆序
 * 打乱（确定性，无随机）。
 *
 * 本批冻结引用（逐字）：
 * - 模式图声明：「模式图：非等比、非实物」（BIO-R32）
 * - 示意曲线声明：「示意曲线（非实测数据）」（BIO-R70）
 * - BIO-R05：「神经是神经纤维的集合，神经元是单个细胞」
 * - BIO-R07：严格页一律用"结合"；完整句「结合后由吞噬细胞清除」
 * - BIO-R54：「一次测量不能诊断」；参考范围 3.9–6.1 mmol/L
 * - T11：「抱住」仅限直觉页口语；严格页一律「结合」
 * - T13 跷跷板边界句：「只讲胰岛素/胰高血糖素这对主角；
 *   完整调节还有神经等参与」
 * - B-F12：默认 "humoral"；「抗体结合（不杀死）」纠错点必配；
 *   疫苗回填链接（b08.1.3）默认开；两线切换清空需二次确认
 * - 分层边界：直觉页角标「直觉版」+「严格表述见下一页」；
 *   严格页开头「认旧友」+角标「严格版」
 *
 * 门禁⑧：新术语首现即定义——条件反射/非条件反射（b22.1.1-p4）/
 * 静息电位/动作电位（b22.1.2-p2）/突触/神经递质（b22.1.2-p3）/
 * 促甲状腺激素释放激素/促甲状腺激素（b22.2.1-p2）/
 * 抗利尿激素（b22.2.2-p2）/抗原/抗体/记忆细胞（b22.3.1-p2）/
 * 靶细胞/效应T细胞/淋巴因子（b22.3.1-p3）/过敏原（b22.3.2-p1）。
 * 注：神经元/反射弧/激素在 b07 已定义，本章为回填非首现。
 * 门禁⑨：深链只挂已生产课号（b07.1.1/b07.1.2/b07.1.4/
 * b06.2.2/b08.1.3 及本批 b22 内部）；b10/b11/b12/b23/b24/b25
 * 未生产，只纯文本。代数 6.1 预告走 oldfriend 纯文本 drafted，
 * 不挂 mathlink（任务书明确：不挂死链）。
 * 门禁⑩：本章无上游 drafted 需兑现；新登记 drafted 1 条：
 * b22.2.2-a1（学完代数 6.1 后回填血糖曲线严格读图）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b22"] = {
  id: "b22",
  units: [
    {
      id: "b22.1",
      title: "神经调节",
      lessons: [
        {
          id: "b22.1.1",
          title: "神经调节的结构基础与分级调节",
          prereq: "b21 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：回填一页（b07 现象→机制） ============ */
            {
              id: "b22.1.1-p1",
              kind: "explain",
              title: "回填：神经元与反射弧",
              blocks: [
                { type: "lead", text: "还记得 b07 吗？神经系统像一套\"电报系统\"——今天我们把当年的现象，升级成机制。" },
                { type: "oldfriend", text: "认旧友（b07.1.1 / b07.1.2）：神经元是神经系统的\"元件\"（神经≠神经元：神经是神经纤维的集合）；反射是神经调节的基本方式，反射弧五部分：感受器→传入神经→神经中枢→传出神经→效应器。" },
                { type: "text", html: "当年我们只记住了\"五部分接力\"这个现象；今天回答：每一棒到底在干什么、谁指挥谁——这就是从现象到机制的一条线。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 96\" width=\"100%\" role=\"img\" aria-label=\"反射弧五部分接力示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"12.8\" text-anchor=\"middle\">" +
                  "<text x=\"34\" y=\"30\" style=\"fill:var(--bio-substrate)\">感受器</text><text x=\"34\" y=\"48\" style=\"fill:var(--bio-ink-soft)\">↓</text>" +
                  "<text x=\"102\" y=\"30\" style=\"fill:var(--bio-product)\">传入神经</text><text x=\"102\" y=\"48\" style=\"fill:var(--bio-ink-soft)\">↓</text>" +
                  "<text x=\"170\" y=\"30\" style=\"fill:var(--bio-gene)\">神经中枢</text><text x=\"170\" y=\"48\" style=\"fill:var(--bio-ink-soft)\">↓</text>" +
                  "<text x=\"238\" y=\"30\" style=\"fill:var(--bio-product)\">传出神经</text><text x=\"238\" y=\"48\" style=\"fill:var(--bio-ink-soft)\">↓</text>" +
                  "<text x=\"306\" y=\"30\" style=\"fill:var(--bio-substrate)\">效应器</text>" +
                  "<text x=\"170\" y=\"80\" style=\"fill:var(--bio-ink-soft)\">b07 的现象：五部分接力</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"94\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" }
              ],
              point: "回填：神经≠神经元；反射弧五部分说得出。"
            },
            /* ============ p2：神经中枢分级 ============ */
            {
              id: "b22.1.1-p2",
              kind: "explain",
              title: "神经中枢分级",
              blocks: [
                { type: "lead", text: "膝跳反射快得来不及想，憋尿能\"忍住\"——为何同系统有的听使唤、有的不听？" },
                { type: "text", html: "中枢分级：大脑皮层最高级，往下是下丘脑、小脑、脑干，最低脊髓；低级中枢管\"本能活\"（如排尿反射）。" },
                { type: "text", html: "低级中枢受高级调控——憋尿是大脑调控脊髓；专注能抑制膝跳反射。" },
                { type: "text", html: "结构—功能对问：大脑皮层神经元最多、联系最复杂——宜最高级决策；脊髓离效应器近——宜快速本能应答。形配其用。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 128\" width=\"100%\" role=\"img\" aria-label=\"神经中枢分级阶梯示意\" style=\"max-width:380px;display:block;margin:6px auto\">" + "<g font-size=\"13.6\" text-anchor=\"middle\">" + "<rect x=\"90\" y=\"6\" width=\"160\" height=\"30\" rx=\"8\" style=\"fill:none;stroke:var(--bio-gene)\" stroke-width=\"2\"/>" + "<text x=\"170\" y=\"26\" style=\"fill:var(--bio-gene)\">大脑皮层（最高级）</text>" + "<rect x=\"90\" y=\"44\" width=\"160\" height=\"30\" rx=\"8\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2\"/>" + "<text x=\"170\" y=\"64\" style=\"fill:var(--bio-product)\">下丘脑/小脑/脑干</text>" + "<rect x=\"90\" y=\"82\" width=\"160\" height=\"30\" rx=\"8\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"2\"/>" + "<text x=\"170\" y=\"102\" style=\"fill:var(--bio-substrate)\">脊髓（低级）</text>" + "<text x=\"285\" y=\"64\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">上管下</text>" + "</g>" + "<text x=\"170\" y=\"126\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" + "</svg>" },
                { type: "trap", text: "⚠️ 别搞混：反射弧完整≠想反射就反射——低级中枢受大脑调控，意识可以抑制膝跳反射。" },
                { type: "note", text: "分级（示意，非严格等级）：大脑皮层 ＞ 下丘脑/小脑/脑干 ＞ 脊髓。" }
              ],
              point: "中枢分级：低级管本能，高级可调控。"
            },
            /* ============ p3：分级调节演示（交互） ============ */
            {
              id: "b22.1.1-p3",
              kind: "interact",
              title: "分级调节演示",
              exploreTip: "点两个按钮，对比\"膝跳反射\"和\"意识抑制\"两种状态，看大脑那条线亮不亮。",
              blocks: [
                { type: "text", html: "<div style=\"text-align:center;margin:2px 0 4px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 6px\" onclick=\"document.getElementById('b2213-brain').style.opacity='0.25';document.getElementById('b2213-state').textContent='状态：膝跳反射——脊髓直接指挥肌肉，大脑没插手';\">① 膝跳反射</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 6px\" onclick=\"document.getElementById('b2213-brain').style.opacity='1';document.getElementById('b2213-state').textContent='状态：意识抑制——大脑发出抑制信号，压住了脊髓的反射';\">② 意识抑制它</button>" +
                  "</div>" +
                  "<svg viewBox=\"0 0 340 170\" width=\"100%\" role=\"img\" aria-label=\"大脑调控脊髓的分级示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<rect x=\"120\" y=\"8\" width=\"100\" height=\"34\" rx=\"8\" style=\"fill:none;stroke:var(--bio-gene)\" stroke-width=\"2\"/>" +
                  "<text x=\"170\" y=\"30\" style=\"fill:var(--bio-gene)\">大脑皮层</text>" +
                  "<g id=\"b2213-brain\" style=\"opacity:0.25\">" +
                  "<line x1=\"170\" y1=\"44\" x2=\"170\" y2=\"86\" style=\"stroke:var(--bio-gene)\" stroke-width=\"2.5\" stroke-dasharray=\"6 4\"/>" +
                  "<text x=\"196\" y=\"68\" font-size=\"12\" style=\"fill:var(--bio-gene)\">抑制</text></g>" +
                  "<rect x=\"120\" y=\"88\" width=\"100\" height=\"34\" rx=\"8\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2\"/>" +
                  "<text x=\"170\" y=\"110\" style=\"fill:var(--bio-product)\">脊髓（低级中枢）</text>" +
                  "<line x1=\"170\" y1=\"124\" x2=\"170\" y2=\"146\" style=\"stroke:var(--bio-product)\" stroke-width=\"2.5\"/>" +
                  "<text x=\"170\" y=\"164\" style=\"fill:var(--bio-substrate)\">腿部肌肉</text>" +
                  "</g>" +
                  "</svg>" +
                  "<div id=\"b2213-state\" style=\"text-align:center;font-size:0.9rem;min-height:2.2em\">状态：点按钮看两种情形</div>" +
                  "<div style=\"text-align:center;font-size:12px;color:var(--bio-ink-soft)\">模式图：非等比、非实物</div>" },
                { type: "text", html: "看明白了吗：① 里大脑那条虚线是暗的——反射只走脊髓；② 里虚线亮了——大脑出手，压住了脊髓。这就是\"低级中枢受高级调控\"。" }
              ],
              point: "演示结论：高级中枢能调控低级中枢。"
            },
            /* ============ p4：条件反射的建立 ============ */
            {
              id: "b22.1.1-p4",
              kind: "explain",
              title: "条件反射的建立",
              blocks: [
                { type: "lead", text: "听到上课铃就回座位——这可不是生来就会的。" },
                { type: "text", html: "先认词——非条件反射：生来就有的反射（如膝跳反射、吮吸反射），不学就会；条件反射：后天学习建立的反射（如听到铃声分泌唾液），需要大脑皮层参与。" },
                { type: "text", html: "条件反射\"学得会，也忘得掉\"：铃声总不跟着食物出现，唾液分泌就慢慢消失了——这叫消退。所以条件反射是更灵活、但也更\"娇气\"的调节方式。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 84\" width=\"100%\" role=\"img\" aria-label=\"条件反射建立与消退示意\" style=\"max-width:400px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<text x=\"70\" y=\"24\" style=\"fill:var(--bio-substrate)\">铃声</text><text x=\"70\" y=\"44\" style=\"fill:var(--bio-ink-soft)\">+</text><text x=\"70\" y=\"64\" style=\"fill:var(--bio-substrate)\">食物</text>" +
                  "<text x=\"170\" y=\"44\" style=\"fill:var(--bio-ink-soft)\">→ 多次结合 →</text>" +
                  "<text x=\"272\" y=\"24\" style=\"fill:var(--bio-gene)\">铃声</text><text x=\"272\" y=\"44\" style=\"fill:var(--bio-ink-soft)\">→</text><text x=\"272\" y=\"64\" style=\"fill:var(--bio-gene)\">分泌唾液</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"82\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" }
              ],
              point: "条件反射=后天学得，需大脑皮层，可消退。"
            }
          ]
        },
        {
          id: "b22.1.2",
          title: "兴奋的产生与传递",
          prereq: "结构基础",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：直觉页（电位涨落类比） ============ */
            {
              id: "b22.1.2-p1",
              kind: "explain",
              title: "直觉版：波动传过去",
              blocks: [
                { type: "lead", text: "神经纤维像一根绷紧的长绳——在一头拨一下，波动\"唰\"地传到另一头。" },
                { type: "text", html: "拨之前，绳子是\"安静\"的；拨的一瞬间，拨动点先鼓起来，这个鼓包一路向前跑，一个接一个——兴奋就是这样\"跑\"过去的。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 90\" width=\"100%\" role=\"img\" aria-label=\"波动传递类比示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<line x1=\"20\" y1=\"50\" x2=\"320\" y2=\"50\" style=\"stroke:var(--bio-membrane)\" stroke-width=\"3\"/>" +
                  "<path d=\"M120 50 Q140 18 160 50 Q180 82 200 50\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"3\"/>" +
                  "<text x=\"160\" y=\"24\" style=\"fill:var(--bio-product)\">鼓包在跑→</text>" +
                  "<text x=\"60\" y=\"76\" style=\"fill:var(--bio-ink-soft)\">安静段</text><text x=\"280\" y=\"76\" style=\"fill:var(--bio-ink-soft)\">还没传到</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"88\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">类比示意，非真实比例</text>" +
                  "</svg>" },
                { type: "note", text: "📌 本页是直觉版：只讲\"波动传过去\"的样子，不讲离子。严格表述见下一页。" }
              ],
              point: "直觉：兴奋像波动一样传过去。"
            },
            /* ============ p2：严格页（静息/动作电位） ============ */
            {
              id: "b22.1.2-p2",
              kind: "explain",
              title: "严格版：电位怎么变",
              blocks: [
                { type: "lead", text: "认旧友：还记得上一页你\"拨\"的那根绳吗？现在我们把它说严格。" },
                { type: "text", html: "先认词——静息电位：没受刺激时，神经纤维膜内为负、膜外为正的电位状态（K⁺外流维持）；动作电位：受刺激后 Na⁺ 通道打开、Na⁺ 内流，膜内转正的一过性电位变化。" },
                { type: "text", html: "兴奋就是\"动作电位一路向前\"：前一段的电位变化，刺激下一段产生同样的变化——像多米诺骨牌，一张推倒下一张。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 110\" width=\"100%\" role=\"img\" aria-label=\"静息电位与动作电位示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<text x=\"85\" y=\"20\" style=\"fill:var(--bio-ink-soft)\">静息：膜内负 / 膜外正</text>" +
                  "<text x=\"60\" y=\"52\" style=\"fill:var(--bio-product)\">−</text><text x=\"110\" y=\"52\" style=\"fill:var(--bio-substrate)\">+</text>" +
                  "<text x=\"85\" y=\"76\" style=\"fill:var(--bio-ink-soft)\">K⁺外流维持</text>" +
                  "<text x=\"255\" y=\"20\" style=\"fill:var(--bio-ink-soft)\">兴奋：Na⁺内流</text>" +
                  "<text x=\"230\" y=\"52\" style=\"fill:var(--bio-substrate)\">+</text><text x=\"280\" y=\"52\" style=\"fill:var(--bio-product)\">−</text>" +
                  "<text x=\"255\" y=\"76\" style=\"fill:var(--bio-ink-soft)\">膜内转正（动作电位）</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"104\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "note", text: "📌 本页是严格版。\"拨绳\"只讲了\"波动传过去\"的样子，没讲离子进出——离子机制才是严格表述。" }
              ],
              point: "严格：Na⁺内流产生动作电位，逐段向前。"
            },
            /* ============ p3：突触结构 ============ */
            {
              id: "b22.1.2-p3",
              kind: "explain",
              title: "突触：神经元之间的桥",
              blocks: [
                { type: "lead", text: "兴奋跑到神经纤维的尽头，前面没路了——怎么\"跳\"到下一个神经元？" },
                { type: "text", html: "先认词——突触：神经元之间联系的结构，包括突触前膜（轴突末端小体的膜）、突触间隙、突触后膜（下一个神经元的膜）；神经递质：由突触前膜释放、作用于后膜的化学信号（如乙酰胆碱）。" },
                { type: "text", html: "三步过桥：①电信号到达轴突末端 → ②突触前膜释放神经递质到间隙 → ③递质与后膜受体结合，下一个神经元兴奋或抑制。电→化学→电。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 120\" width=\"100%\" role=\"img\" aria-label=\"突触三部分结构示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<rect x=\"16\" y=\"30\" width=\"88\" height=\"60\" rx=\"8\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2\"/>" +
                  "<text x=\"60\" y=\"56\" style=\"fill:var(--bio-product)\">突触</text><text x=\"60\" y=\"76\" style=\"fill:var(--bio-product)\">前膜</text>" +
                  "<text x=\"130\" y=\"64\" style=\"fill:var(--bio-ink-soft)\">间隙</text>" +
                  "<circle cx=\"150\" cy=\"64\" r=\"5\" style=\"fill:var(--bio-substrate)\"/><circle cx=\"164\" cy=\"64\" r=\"5\" style=\"fill:var(--bio-substrate)\"/>" +
                  "<text x=\"157\" y=\"90\" font-size=\"12\" style=\"fill:var(--bio-substrate)\">递质</text>" +
                  "<rect x=\"196\" y=\"30\" width=\"88\" height=\"60\" rx=\"8\" style=\"fill:none;stroke:var(--bio-gene)\" stroke-width=\"2\"/>" +
                  "<text x=\"240\" y=\"56\" style=\"fill:var(--bio-gene)\">突触</text><text x=\"240\" y=\"76\" style=\"fill:var(--bio-gene)\">后膜</text>" +
                  "<text x=\"300\" y=\"64\" style=\"fill:var(--bio-ink-soft)\">→</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"114\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "trap", text: "⚠️ 别搞混：递质只由突触前膜释放——兴奋在神经元之间只能单向传递！" }
              ],
              point: "突触三部分；递质是化学信使；单向。"
            },
            /* ============ p4：接力动画（交互） ============ */
            {
              id: "b22.1.2-p4",
              kind: "interact",
              title: "接力动画：传导与传递",
              exploreTip: "按 ①→②→③ 步进，看兴奋从神经纤维\"跑\"进突触、再\"跳\"到下一个神经元。",
              blocks: [
                { type: "text", html: "<div style=\"text-align:center;margin:2px 0 4px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 4px\" onclick=\"document.getElementById('b2214-s1').style.display='';document.getElementById('b2214-s2').style.display='none';document.getElementById('b2214-s3').style.display='none';document.getElementById('b2214-cap').textContent='① 神经纤维上：动作电位逐段向前（电信号）';\">① 纤维上传导</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 4px\" onclick=\"document.getElementById('b2214-s1').style.display='none';document.getElementById('b2214-s2').style.display='';document.getElementById('b2214-s3').style.display='none';document.getElementById('b2214-cap').textContent='② 突触处：前膜释放神经递质（电→化学）';\">② 突触释放递质</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 4px\" onclick=\"document.getElementById('b2214-s1').style.display='none';document.getElementById('b2214-s2').style.display='none';document.getElementById('b2214-s3').style.display='';document.getElementById('b2214-cap').textContent='③ 下一个神经元：递质结合后膜，产生新的动作电位（化学→电）';\">③ 后膜再兴奋</button>" +
                  "</div>" +
                  "<svg viewBox=\"0 0 340 120\" width=\"100%\" role=\"img\" aria-label=\"兴奋传导接力三阶段示意\" style=\"max-width:430px;display:block;margin:6px auto\">" +
                  "<g id=\"b2214-s1\" font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<line x1=\"20\" y1=\"60\" x2=\"180\" y2=\"60\" style=\"stroke:var(--bio-membrane)\" stroke-width=\"4\"/>" +
                  "<path d=\"M60 60 Q75 34 90 60 Q105 86 120 60\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"3\"/>" +
                  "<text x=\"100\" y=\"100\" style=\"fill:var(--bio-product)\">动作电位向前→</text></g>" +
                  "<g id=\"b2214-s2\" style=\"display:none\" font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<rect x=\"180\" y=\"30\" width=\"70\" height=\"60\" rx=\"8\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2\"/>" +
                  "<text x=\"215\" y=\"56\" style=\"fill:var(--bio-product)\">前膜</text>" +
                  "<circle cx=\"262\" cy=\"60\" r=\"6\" style=\"fill:var(--bio-substrate)\"/><circle cx=\"278\" cy=\"60\" r=\"6\" style=\"fill:var(--bio-substrate)\"/>" +
                  "<text x=\"270\" y=\"92\" font-size=\"12\" style=\"fill:var(--bio-substrate)\">递质释放</text></g>" +
                  "<g id=\"b2214-s3\" style=\"display:none\" font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<rect x=\"250\" y=\"30\" width=\"70\" height=\"60\" rx=\"8\" style=\"fill:none;stroke:var(--bio-gene)\" stroke-width=\"2\"/>" +
                  "<text x=\"285\" y=\"56\" style=\"fill:var(--bio-gene)\">后膜</text>" +
                  "<text x=\"285\" y=\"78\" font-size=\"12\" style=\"fill:var(--bio-gene)\">新动作电位</text>" +
                  "<text x=\"120\" y=\"100\" style=\"fill:var(--bio-ink-soft)\">只能从前向后：单向！</text></g>" +
                  "</svg>" +
                  "<div id=\"b2214-cap\" style=\"text-align:center;font-size:0.9rem;min-height:2.2em\">① 神经纤维上：动作电位逐段向前（电信号）</div>" +
                  "<div style=\"text-align:center;font-size:12px;color:var(--bio-ink-soft)\">模式图：非等比、非实物；示意，非真实速度/比例</div>" },
                { type: "text", html: "单向专治：递质只由突触前膜释放，所以兴奋只能从前一个神经元传向后一个——这是一条\"单行道\"。" }
              ],
              point: "接力：纤维上电传导，突触间化学递。"
            },
            /* ============ p5：传导 vs 传递对比 ============ */
            {
              id: "b22.1.2-p5",
              kind: "explain",
              title: "传导 vs 传递：对比",
              blocks: [
                { type: "lead", text: "\"传导\"和\"传递\"一字之差，考的就是你分不分得清。" },
                { type: "text", html: "神经纤维上的叫传导：信号形式是电（动作电位），一节一节向前；神经元之间的叫传递：要过突触这座桥，信号变成化学（神经递质），而且只能单向。" },
                { type: "text", html: "一句话区分：没过桥的是传导（电），过了桥的是传递（化学+单向）。做题先看问的是\"纤维上\"还是\"神经元之间\"。记住这句，传导传递题就错不了。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 96\" width=\"100%\" role=\"img\" aria-label=\"传导与传递对比示意\" style=\"max-width:420px;display:block;margin:6px auto\">" + "<g font-size=\"13.6\" text-anchor=\"middle\">" + "<rect x=\"16\" y=\"14\" width=\"140\" height=\"56\" rx=\"8\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2\"/>" + "<text x=\"86\" y=\"38\" style=\"fill:var(--bio-product)\">传导</text>" + "<text x=\"86\" y=\"60\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">电信号（纤维上）</text>" + "<rect x=\"184\" y=\"14\" width=\"140\" height=\"56\" rx=\"8\" style=\"fill:none;stroke:var(--bio-gene)\" stroke-width=\"2\"/>" + "<text x=\"254\" y=\"38\" style=\"fill:var(--bio-gene)\">传递</text>" + "<text x=\"254\" y=\"60\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">化学+单向（过突触）</text>" + "</g>" + "<text x=\"170\" y=\"92\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" + "</svg>" },
                { type: "trap", text: "⚠️ 高频错：\"兴奋在神经元之间双向传递\"——错！递质只由前膜释放，单向是铁律。" }
              ],
              point: "传导是电、传递是化学；神经元之间单向。"
            }
          ]
        }
      ]
    },
    {
      id: "b22.2",
      title: "体液调节与稳态",
      lessons: [
        {
          id: "b22.2.1",
          title: "激素的分级反馈调节",
          prereq: "兴奋传递",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：回填一页（b07 激素现象→机制） ============ */
            {
              id: "b22.2.1-p1",
              kind: "explain",
              title: "回填：激素现象",
              blocks: [
                { type: "lead", text: "甲状腺激素多了，人会心慌手抖；少了，会怕冷没精神——谁在给它\"定量\"？" },
                { type: "oldfriend", text: "认旧友（b07.1.4）：激素是内分泌腺分泌的化学信使，经体液运输到全身，只作用于靶器官——当年我们记住了生长激素、甲状腺激素、胰岛素三个例子。" },
                { type: "text", html: "当年只讲了\"现象\"（缺了会怎样、多了会怎样）；今天讲\"机制\"：激素从哪一级管到哪一级，多了又怎么\"刹车\"——这条指挥链叫分级调节。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 80\" width=\"100%\" role=\"img\" aria-label=\"激素经体液运输示意\" style=\"max-width:400px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<circle cx=\"60\" cy=\"40\" r=\"22\" style=\"fill:none;stroke:var(--bio-gene)\" stroke-width=\"2\"/><text x=\"60\" y=\"45\" style=\"fill:var(--bio-gene)\">腺体</text>" +
                  "<text x=\"130\" y=\"45\" style=\"fill:var(--bio-ink-soft)\">→体液→</text>" +
                  "<circle cx=\"220\" cy=\"40\" r=\"22\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2\"/><text x=\"220\" y=\"45\" style=\"fill:var(--bio-product)\">靶器官</text>" +
                  "<text x=\"300\" y=\"45\" style=\"fill:var(--bio-ink-soft)\">✓起效</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"78\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" }
              ],
              point: "回填：激素经体液运输，只作用靶器官。"
            },
            /* ============ p2：甲状腺激素分级调节动画（交互） ============ */
            {
              id: "b22.2.1-p2",
              kind: "interact",
              title: "分级调节动画",
              exploreTip: "按 ①②③④ 步进，看下丘脑→垂体→甲状腺的三级指挥链，以及最后的\"刹车\"。",
              blocks: [
                { type: "text", html: "先认词——促甲状腺激素释放激素（下丘脑分泌）、促甲状腺激素（垂体分泌）。" },
                { type: "text", html: "<div style=\"text-align:center;margin:2px 0 4px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 3px\" onclick=\"document.getElementById('b2212-fb').style.display='none';document.getElementById('b2212-cap').textContent='① 下丘脑分泌促甲状腺激素释放激素';\">①下丘脑</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 3px\" onclick=\"document.getElementById('b2212-fb').style.display='none';document.getElementById('b2212-cap').textContent='② 垂体分泌促甲状腺激素';\">②垂体</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 3px\" onclick=\"document.getElementById('b2212-fb').style.display='none';document.getElementById('b2212-cap').textContent='③ 甲状腺分泌甲状腺激素';\">③甲状腺</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 3px\" onclick=\"document.getElementById('b2212-fb').style.display='';document.getElementById('b2212-cap').textContent='④ 激素过多：反馈抑制下丘脑和垂体——刹车！';\">④反馈刹车</button>" +
                  "</div>" +
                  "<svg viewBox=\"0 0 340 190\" width=\"100%\" role=\"img\" aria-label=\"甲状腺激素分级调节与反馈示意\" style=\"max-width:430px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<rect x=\"110\" y=\"6\" width=\"120\" height=\"34\" rx=\"8\" style=\"fill:none;stroke:var(--bio-gene)\" stroke-width=\"2\"/>" +
                  "<text x=\"170\" y=\"28\" style=\"fill:var(--bio-gene)\">下丘脑（总枢纽）</text>" +
                  "<line x1=\"170\" y1=\"42\" x2=\"170\" y2=\"62\" style=\"stroke:var(--bio-membrane)\" stroke-width=\"2\"/>" +
                  "<rect x=\"110\" y=\"64\" width=\"120\" height=\"34\" rx=\"8\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2\"/>" +
                  "<text x=\"170\" y=\"86\" style=\"fill:var(--bio-product)\">垂体（中转站）</text>" +
                  "<line x1=\"170\" y1=\"100\" x2=\"170\" y2=\"120\" style=\"stroke:var(--bio-membrane)\" stroke-width=\"2\"/>" +
                  "<rect x=\"110\" y=\"122\" width=\"120\" height=\"34\" rx=\"8\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"2\"/>" +
                  "<text x=\"170\" y=\"144\" style=\"fill:var(--bio-substrate)\">甲状腺</text>" +
                  "<g id=\"b2212-fb\" style=\"display:none\">" +
                  "<path d=\"M250 140 Q300 100 250 60 Q230 45 232 30\" style=\"fill:none;stroke:var(--bio-target)\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>" +
                  "<text x=\"292\" y=\"100\" font-size=\"12.8\" style=\"fill:var(--bio-target)\">反馈抑制</text></g>" +
                  "</g>" +
                  "<text x=\"170\" y=\"184\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" +
                  "<div id=\"b2212-cap\" style=\"text-align:center;font-size:0.9rem;min-height:2.2em\">① 下丘脑分泌促甲状腺激素释放激素</div>" },
                { type: "trap", text: "⚠️ 别搞混：垂体不是总司令——下丘脑才是总枢纽，垂体是中转站；而且是\"分级\"指挥，不是一竿子到底。" }
              ],
              point: "分级：下丘脑→垂体→腺体；过多反馈刹车。"
            },
            /* ============ p3：神经调节 vs 体液调节 ============ */
            {
              id: "b22.2.1-p3",
              kind: "explain",
              title: "神经调节 vs 体液调节",
              blocks: [
                { type: "lead", text: "手碰到烫东西瞬间缩回，靠的是神经；血糖慢慢降下来，靠的是激素——快慢不一样。" },
                { type: "text", html: "对比四看：作用途径（神经走反射弧、体液走体液运输）、反应速度（神经迅速、体液较缓慢）、作用范围（神经准确局限、体液较广泛）、作用时间（神经短暂、体液较长）。" },
                { type: "text", html: "两者不是各干各的：血糖调节里既有胰岛素（体液），也有神经参与——神经—体液常常协同，编一张网。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 110\" width=\"100%\" role=\"img\" aria-label=\"神经调节与体液调节对比示意\" style=\"max-width:420px;display:block;margin:6px auto\">" + "<g font-size=\"13.6\" text-anchor=\"middle\">" + "<text x=\"85\" y=\"24\" style=\"fill:var(--bio-product)\">神经调节</text>" + "<text x=\"85\" y=\"46\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">迅速、准确、短暂</text>" + "<text x=\"85\" y=\"66\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">走反射弧</text>" + "<text x=\"255\" y=\"24\" style=\"fill:var(--bio-gene)\">体液调节</text>" + "<text x=\"255\" y=\"46\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">缓慢、广泛、较长</text>" + "<text x=\"255\" y=\"66\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">走体液运输</text>" + "<text x=\"170\" y=\"92\" style=\"fill:var(--bio-substrate)\">常协同，编一张网</text>" + "</g>" + "<text x=\"170\" y=\"108\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" + "</svg>" },
                { type: "note", text: "做题口诀：问\"迅速准确\"找神经，问\"缓慢广泛\"找体液；问\"都参与\"想协同。" }
              ],
              point: "神经快而准，体液慢而广；常协同。"
            }
          ]
        },
        {
          id: "b22.2.2",
          title: "血糖、水盐与体温调节",
          prereq: "激素分级",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：血糖动态平衡演示（交互） ============ */
            {
              id: "b22.2.2-p1",
              kind: "interact",
              title: "血糖动态平衡演示",
              exploreTip: "切换\"进食后\"/\"运动后\"两个场景，看血糖怎么被拉回正常。",
              blocks: [
                { type: "text", html: "<div style=\"text-align:center;margin:2px 0 4px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 6px\" onclick=\"document.getElementById('b2221-eat').style.display='';document.getElementById('b2221-run').style.display='none';document.getElementById('b2221-cap').textContent='进食后：血糖升高 → 胰岛B细胞分泌胰岛素 → 血糖下降';\">🍚 进食后</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:0 6px\" onclick=\"document.getElementById('b2221-eat').style.display='none';document.getElementById('b2221-run').style.display='';document.getElementById('b2221-cap').textContent='运动后：血糖下降 → 胰岛A细胞分泌胰高血糖素 → 血糖上升';\">🏃 运动后</button>" +
                  "</div>" +
                  "<svg viewBox=\"0 0 340 120\" width=\"100%\" role=\"img\" aria-label=\"血糖升降两场景示意\" style=\"max-width:430px;display:block;margin:6px auto\">" +
                  "<g id=\"b2221-eat\" font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<path d=\"M30 90 Q100 88 140 40 Q180 88 250 86\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"3\"/>" +
                  "<text x=\"140\" y=\"30\" style=\"fill:var(--bio-substrate)\">血糖升↑</text>" +
                  "<text x=\"220\" y=\"112\" style=\"fill:var(--bio-product)\">胰岛素：往下压</text></g>" +
                  "<g id=\"b2221-run\" style=\"display:none\" font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<path d=\"M30 40 Q100 42 140 88 Q180 42 250 44\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"3\"/>" +
                  "<text x=\"140\" y=\"102\" style=\"fill:var(--bio-product)\">血糖降↓</text>" +
                  "<text x=\"220\" y=\"24\" style=\"fill:var(--bio-substrate)\">胰高血糖素：往上抬</text></g>" +
                  "</svg>" +
                  "<div id=\"b2221-cap\" style=\"text-align:center;font-size:0.9rem;min-height:2.2em\">进食后：血糖升高 → 胰岛B细胞分泌胰岛素 → 血糖下降</div>" +
                  "<div style=\"text-align:center;font-size:12px;color:var(--bio-ink-soft)\">示意曲线（非实测数据）</div>" },
                { type: "text", html: "像跷跷板的两头：胰岛素专管\"往下压\"，胰高血糖素专管\"往上抬\"。" },
                { type: "note", text: "边界句：本页只讲胰岛素/胰高血糖素这对主角；完整调节还有神经等参与。" }
              ],
              point: "跷跷板：胰岛素降糖，胰高血糖素升糖。"
            },
            /* ============ p2：水盐与体温调节 ============ */
            {
              id: "b22.2.2-p2",
              kind: "explain",
              title: "水盐与体温调节",
              blocks: [
                { type: "lead", text: "咸菜吃多了会口渴，冷了会打哆嗦——身体在\"找平衡\"。" },
                { type: "text", html: "水盐：饮水不足或吃太咸→细胞外液渗透压升高→下丘脑合成、垂体释放抗利尿激素→肾小管、集合管重吸收水增加→尿量减少。先认词——抗利尿激素：促进肾小管、集合管重吸收水的激素。" },
                { type: "text", html: "体温：下丘脑有体温调节中枢。冷了→战栗产热、血管收缩减少散热；热了→出汗、血管舒张增加散热。产热=散热，体温就稳住了。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 90\" width=\"100%\" role=\"img\" aria-label=\"水盐与体温两条调节线示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<text x=\"85\" y=\"24\" style=\"fill:var(--bio-product)\">渗透压↑</text><text x=\"85\" y=\"46\" style=\"fill:var(--bio-ink-soft)\">→</text><text x=\"85\" y=\"68\" style=\"fill:var(--bio-product)\">抗利尿激素→保水</text>" +
                  "<text x=\"255\" y=\"24\" style=\"fill:var(--bio-substrate)\">冷/热</text><text x=\"255\" y=\"46\" style=\"fill:var(--bio-ink-soft)\">→</text><text x=\"255\" y=\"68\" style=\"fill:var(--bio-substrate)\">产热=散热</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"88\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" }
              ],
              point: "水盐靠抗利尿激素保水；体温靠产热散热平衡。"
            },
            /* ============ p3：体检指标回填 ============ */
            {
              id: "b22.2.2-p3",
              kind: "explain",
              title: "回填：体检指标",
              blocks: [
                { type: "lead", text: "体检单上的数字，到底在说什么？" },
                { type: "oldfriend", text: "认旧友（b06.2.2）：当年我们见过体检单上的血压、心率——今天认一个新指标：血糖。" },
                { type: "text", html: "空腹血糖参考范围 3.9–6.1 mmol/L（读数徽章）。\"参考范围\"≠\"判决书\"：一次测量偏高不能诊断糖尿病——确诊要听医生的规范检查。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 100\" width=\"100%\" role=\"img\" aria-label=\"体检单参考范围示意\" style=\"max-width:400px;display:block;margin:6px auto\">" + "<g font-size=\"13.6\" text-anchor=\"middle\">" + "<rect x=\"60\" y=\"10\" width=\"220\" height=\"56\" rx=\"8\" style=\"fill:none;stroke:var(--bio-membrane)\" stroke-width=\"1.5\"/>" + "<text x=\"170\" y=\"32\" style=\"fill:var(--bio-ink-soft)\">空腹血糖 5.2 mmol/L</text>" + "<text x=\"170\" y=\"54\" font-size=\"12.8\" style=\"fill:var(--bio-product)\">参考范围 3.9–6.1</text>" + "<text x=\"170\" y=\"84\" font-size=\"12.8\" style=\"fill:var(--bio-target)\">一次测量 ≠ 诊断</text>" + "</g>" + "<text x=\"170\" y=\"98\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">示意，非真实体检单</text>" + "</svg>" },
                { type: "trap", text: "⚠️ 红线：血糖高≠确诊糖尿病！一次测量不能诊断，本课只讲调节机制。" },
                { type: "note", text: "参考范围因人而异、因方法而异；看体检单先看\"参考范围\"那一栏，再问医生。" }
              ],
              point: "参考范围是仪表盘，不是判决书。"
            },
            /* ============ p4：血糖曲线读图直观版 + 预告 ============ */
            {
              id: "b22.2.2-p4",
              kind: "explain",
              title: "读图直观版：血糖曲线",
              blocks: [
                { type: "lead", text: "看图说话：一顿饭之后，血糖曲线长什么样？先别管坐标刻度，只看它升了还是降了。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 130\" width=\"100%\" role=\"img\" aria-label=\"餐后血糖变化示意曲线\" style=\"max-width:430px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<line x1=\"30\" y1=\"110\" x2=\"320\" y2=\"110\" style=\"stroke:var(--bio-membrane)\" stroke-width=\"1.5\"/>" +
                  "<line x1=\"30\" y1=\"110\" x2=\"30\" y2=\"20\" style=\"stroke:var(--bio-membrane)\" stroke-width=\"1.5\"/>" +
                  "<path d=\"M30 100 Q110 96 150 45 Q200 96 300 98\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"3\"/>" +
                  "<text x=\"150\" y=\"34\" style=\"fill:var(--bio-substrate)\">最高点：餐后</text>" +
                  "<text x=\"250\" y=\"126\" style=\"fill:var(--bio-product)\">胰岛素把它拉回来</text>" +
                  "<text x=\"36\" y=\"24\" font-size=\"12\" style=\"fill:var(--bio-ink-soft)\">相对值</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"128\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">示意曲线（非实测数据）</text>" +
                  "</svg>" },
                { type: "text", html: "读图三问：最高点在哪（餐后）？什么时候回落？谁把它拉回来的（胰岛素）？——先会看升降，就是直观版读图。这条曲线的三个信息：吃→升（食物消化），升→降（胰岛素工作），降→稳（回到起点附近）。记住：只看升降趋势，不读具体数值——那是代数 6.1 之后的事。" },
                { type: "oldfriend", text: "预告：学完代数 6.1（函数图像）后，我们再回来用严格读图法重读这条曲线——已登记，届时回填。" }
              ],
              point: "先会看升降，再学严格读图。"
            }
          ]
        }
      ]
    },
    {
      id: "b22.3",
      title: "免疫调节",
      lessons: [
        {
          id: "b22.3.1",
          title: "特异性免疫",
          prereq: "血糖水盐体温",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：直觉页（免疫作战故事） ============ */
            {
              id: "b22.3.1-p1",
              kind: "explain",
              title: "直觉版：身体的边防军",
              blocks: [
                { type: "lead", text: "身体里驻扎着一支\"边防军\"——24 小时巡逻，专抓混进来的\"坏分子\"。" },
                { type: "text", html: "坏分子一露面，哨兵先把它\"认\"出来，大部队随后赶到：有的造\"锁链\"把坏分子抱住，有的直接\"处决\"被坏分子占了的细胞。打完仗，还会留下\"老兵\"记仇——下次来得更快。故事讲完了，严格版在下一页等你。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 90\" width=\"100%\" role=\"img\" aria-label=\"免疫作战故事示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<circle cx=\"60\" cy=\"45\" r=\"16\" style=\"fill:var(--bio-substrate)\"/><text x=\"60\" y=\"49\" style=\"fill:#fff\">坏</text>" +
                  "<text x=\"110\" y=\"49\" style=\"fill:var(--bio-ink-soft)\">→认出→</text>" +
                  "<circle cx=\"170\" cy=\"45\" r=\"16\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2\"/><text x=\"170\" y=\"49\" style=\"fill:var(--bio-product)\">抱住</text>" +
                  "<text x=\"220\" y=\"49\" style=\"fill:var(--bio-ink-soft)\">→清除→</text>" +
                  "<circle cx=\"275\" cy=\"45\" r=\"16\" style=\"fill:none;stroke:var(--bio-gene)\" stroke-width=\"2\"/><text x=\"275\" y=\"49\" style=\"fill:var(--bio-gene)\">记住</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"86\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">故事示意，非真实比例</text>" +
                  "</svg>" },
                { type: "note", text: "📌 本页是直觉版：\"抱住\"\"边防军\"是讲故事的说法。严格表述见下一页。" }
              ],
              point: "直觉：免疫=认出敌人→清除→记住。"
            },
            /* ============ p2：严格页（体液免疫） ============ */
            {
              id: "b22.3.1-p2",
              kind: "explain",
              title: "严格版：体液免疫",
              blocks: [
                { type: "lead", text: "认旧友：记得上一页的\"边防军\"故事吗？现在说严格——先看体液免疫。" },
                { type: "text", html: "先认词——抗原：能引起免疫反应的物质；抗体：浆细胞产生的、能与相应抗原特异性结合的蛋白质；记忆细胞：记住抗原、再次应答更快更强的细胞。" },
                { type: "text", html: "流程：抗原→吞噬细胞呈递→T 细胞→B 细胞→浆细胞产生抗体→抗体结合抗原形成沉淀→吞噬细胞清除；记忆细胞留下。" },
                { type: "text", html: "表述精确：抗体是\"结合\"抗原，不是\"杀死\"——结合后由吞噬细胞清除。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 100\" width=\"100%\" role=\"img\" aria-label=\"体液免疫流程示意\" style=\"max-width:430px;display:block;margin:6px auto\">" +
                  "<g font-size=\"12.4\" text-anchor=\"middle\">" +
                  "<text x=\"40\" y=\"30\" style=\"fill:var(--bio-substrate)\">抗原</text><text x=\"40\" y=\"50\" style=\"fill:var(--bio-ink-soft)\">↓</text>" +
                  "<text x=\"110\" y=\"30\" style=\"fill:var(--bio-product)\">吞噬/T/B</text><text x=\"110\" y=\"50\" style=\"fill:var(--bio-ink-soft)\">↓</text>" +
                  "<text x=\"185\" y=\"30\" style=\"fill:var(--bio-product)\">抗体</text><text x=\"185\" y=\"50\" style=\"fill:var(--bio-ink-soft)\">结合↓</text>" +
                  "<text x=\"258\" y=\"30\" style=\"fill:var(--bio-ink-soft)\">沉淀→吞噬清除</text>" +
                  "<text x=\"170\" y=\"78\" style=\"fill:var(--bio-gene)\">记忆细胞留下（下次更快）</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"96\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "note", text: "📌 严格版：\"抱住\"是直觉页口语；严格页一律用\"结合\"，配完整句\"结合后由吞噬细胞清除\"。" }
              ],
              point: "体液免疫：抗体结合抗原，吞噬细胞清除。"
            },
            /* ============ p3：严格页（细胞免疫） ============ */
            {
              id: "b22.3.1-p3",
              kind: "explain",
              title: "严格版：细胞免疫",
              blocks: [
                { type: "lead", text: "有的敌人很狡猾——直接藏进人体细胞里，抗体在\"液体里\"够不着。怎么办？" },
                { type: "text", html: "先认词——靶细胞：被抗原入侵的宿主细胞；效应 T 细胞：能裂解靶细胞的 T 细胞；淋巴因子：T 细胞分泌的、促进免疫的活性物质。" },
                { type: "text", html: "流程：抗原→吞噬细胞→T 细胞增殖分化为效应 T 细胞→效应 T 细胞接触靶细胞、使其裂解→暴露出的抗原再由体液免疫清除。记忆细胞留下。" },
                { type: "text", html: "两线对比：体液免疫管\"液体里\"的敌人（靠抗体结合），细胞免疫管\"藏进细胞\"的敌人（靠效应 T 细胞裂解靶细胞）。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 110\" width=\"100%\" role=\"img\" aria-label=\"体液与细胞免疫分工示意\" style=\"max-width:420px;display:block;margin:6px auto\">" + "<g font-size=\"13.6\" text-anchor=\"middle\">" + "<text x=\"85\" y=\"28\" style=\"fill:var(--bio-product)\">体液免疫</text>" + "<text x=\"85\" y=\"50\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">管液体里的敌人</text>" + "<text x=\"85\" y=\"70\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">靠抗体结合</text>" + "<text x=\"255\" y=\"28\" style=\"fill:var(--bio-gene)\">细胞免疫</text>" + "<text x=\"255\" y=\"50\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">管藏进细胞的敌人</text>" + "<text x=\"255\" y=\"70\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">靠效应T裂解靶细胞</text>" + "</g>" + "<text x=\"170\" y=\"106\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" + "</svg>" },
                { type: "note", text: "简化声明：本课只讲两条主线，真实过程配角更多。" }
              ],
              point: "细胞免疫：效应T细胞裂解靶细胞。"
            },
            /* ============ p4：B12 免疫流程推演（交互，本批首立） ============ */
            {
              id: "b22.3.1-p4",
              kind: "interact",
              title: "免疫流程推演",
              exploreTip: "选一条免疫线：点角色卡、再点槽位，把流程按正确顺序排好。",
              widgets: [
                {
                  type: "immuno-flow",
                  params: {
                    branch: "humoral",
                    roleCards: [
                      { id: "h1", label: "吞噬细胞", desc: "吞噬抗原，暴露抗原信息", why: "它是\"哨兵\"，最先发现并处理抗原" },
                      { id: "h2", label: "B 细胞", desc: "增殖分化为浆细胞", why: "只有它能变身成产抗体的浆细胞" },
                      { id: "h3", label: "抗体", desc: "与抗原结合形成沉淀", why: "它在 B 细胞之后登场——先有细胞，后有它造的\"锁链\"" },
                      { id: "h4", label: "记忆细胞", desc: "记住抗原，下次更快", why: "它是\"老兵\"，战斗结束才留下" }
                    ],
                    cellularCards: [
                      { id: "c1", label: "吞噬细胞", desc: "吞噬抗原，暴露抗原信息", why: "同样是\"哨兵\"先行" },
                      { id: "c2", label: "T 细胞", desc: "识别抗原，增殖分化", why: "细胞线的主角是它，不是 B 细胞" },
                      { id: "c3", label: "效应 T 细胞", desc: "接触靶细胞，使其裂解", why: "它要贴身\"处决\"藏了敌人的靶细胞" },
                      { id: "c4", label: "记忆细胞", desc: "记住抗原，下次更快", why: "战斗结束，留下\"老兵\"" }
                    ],
                    orderQuiz: true, bindNote: true, vaccineLink: true,
                    diagramNote: "模式图：非等比、非实物"
                  }
                }
              ],
              blocks: [
                { type: "text", html: "排完想一想：体液线和细胞线，分别对付哪种敌人？（答案：液体里的 / 藏进细胞的）" }
              ],
              point: "推演结论：两线分工，抗体只结合不杀死。"
            }
          ]
        },
        {
          id: "b22.3.2",
          title: "免疫失调与疫苗应用",
          prereq: "特异性免疫",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：过敏（过强！表述克制） ============ */
            {
              id: "b22.3.2-p1",
              kind: "explain",
              title: "过敏：过强不是低下",
              blocks: [
                { type: "lead", text: "有人一到春天就打喷嚏流鼻涕——是免疫力太差了吗？恰恰相反。" },
                { type: "text", html: "先认词——过敏原：引起过敏反应的抗原（如花粉、尘螨）。过敏是免疫功能过强：把无害的东西当成了敌人。特点：发作迅速、反应强烈、消退较快，一般不损伤组织。" },
                { type: "text", html: "表述克制：过敏大多可防可控——避开已知的过敏原、遵医嘱处理即可，不必焦虑。记住方向：它是\"过强\"不是\"低下\"，这决定了应对思路完全不同。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 96\" width=\"100%\" role=\"img\" aria-label=\"过敏是免疫过强示意\" style=\"max-width:420px;display:block;margin:6px auto\">" + "<g font-size=\"13.6\" text-anchor=\"middle\">" + "<text x=\"70\" y=\"40\" style=\"fill:var(--bio-substrate)\">过敏原（无害）</text>" + "<text x=\"170\" y=\"40\" style=\"fill:var(--bio-ink-soft)\">→</text>" + "<text x=\"270\" y=\"40\" style=\"fill:var(--bio-target)\">小题大做！</text>" + "<text x=\"170\" y=\"66\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">免疫功能过强，不是低下</text>" + "</g>" + "<text x=\"170\" y=\"92\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" + "</svg>" },
                { type: "trap", text: "⚠️ 方向别反：过敏是免疫功能过强，不是低下！" }
              ],
              point: "过敏=过强；可防可控不焦虑。"
            },
            /* ============ p2：免疫缺陷与移植排斥（点到为止） ============ */
            {
              id: "b22.3.2-p2",
              kind: "explain",
              title: "免疫缺陷与移植排斥",
              blocks: [
                { type: "lead", text: "免疫这支\"边防军\"，也会缺编，也会\"认生\"。" },
                { type: "text", html: "免疫缺陷病：免疫功能先天或后天缺损（如 HIV 攻击 T 细胞，导致免疫力下降）——只讲生物学事实。缺了 T 细胞，体液和细胞两条线都运转不灵——牵一发而动全身。" },
                { type: "text", html: "器官移植排斥：免疫系统\"认生\"，把移植来的器官当\"非己\"攻击——点到为止。自身免疫病：免疫系统误伤自身组织——点到为止。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 96\" width=\"100%\" role=\"img\" aria-label=\"免疫过强与缺损对比示意\" style=\"max-width:420px;display:block;margin:6px auto\">" + "<g font-size=\"13.6\" text-anchor=\"middle\">" + "<text x=\"85\" y=\"40\" style=\"fill:var(--bio-target)\">过强 → 误伤自己</text>" + "<text x=\"255\" y=\"40\" style=\"fill:var(--bio-product)\">缺损 → 守不住门</text>" + "<text x=\"170\" y=\"66\" font-size=\"12.8\" style=\"fill:var(--bio-ink-soft)\">平衡才是健康</text>" + "</g>" + "<text x=\"170\" y=\"92\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" + "</svg>" },
                { type: "note", text: "本页只讲生物学事实，不展开疾病细节、不做诊疗暗示。" }
              ],
              point: "过强会误伤，缺损会失守。"
            },
            /* ============ p3：疫苗原理回填（b08.1.3） ============ */
            {
              id: "b22.3.2-p3",
              kind: "explain",
              title: "回填：疫苗原理",
              blocks: [
                { type: "lead", text: "不打仗，怎么让\"边防军\"提前认识敌人？" },
                { type: "oldfriend", text: "认旧友（b08.1.3）：当年我们学过疫苗——减毒/灭活的病原体。今天补上机制：疫苗就是一次\"演习\"，让身体产生抗体并留下记忆细胞，真敌人来了反应又快又强。" },
                { type: "text", html: "只讲教材与官方指南口径：疫苗降低重症风险，不是 100% 不得病；具体接种听医生和疾控安排——不推荐药品、不给剂量。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 84\" width=\"100%\" role=\"img\" aria-label=\"疫苗演习示意\" style=\"max-width:400px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<text x=\"70\" y=\"30\" style=\"fill:var(--bio-substrate)\">疫苗（演习）</text><text x=\"70\" y=\"52\" style=\"fill:var(--bio-ink-soft)\">↓</text>" +
                  "<text x=\"170\" y=\"30\" style=\"fill:var(--bio-product)\">抗体+记忆细胞</text><text x=\"170\" y=\"52\" style=\"fill:var(--bio-ink-soft)\">↓</text>" +
                  "<text x=\"275\" y=\"30\" style=\"fill:var(--bio-gene)\">真敌人→快而强</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"80\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" }
              ],
              point: "疫苗=演习：抗体+记忆细胞。"
            }
          ]
        },
        {
          id: "b22.3.3",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一）：judge 拉开梯度 ============ */
            {
              id: "b22.3.3-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b22.1.1：神经元≠神经；反射弧五部分；中枢分级（低级受高级调控）；条件反射（后天、大脑皮层、可消退）。b22.1.2：静息/动作电位（Na⁺内流）；突触三部分；神经递质；单向传递。b22.2.1：下丘脑→垂体→腺体分级；反馈调节；下丘脑是总枢纽。b22.2.2：胰岛素/胰高血糖素跷跷板；抗利尿激素；体温产热散热平衡；参考范围≠诊断。b22.3.1：抗原/抗体/记忆细胞；体液（结合）/细胞（裂解）两线。b22.3.2：过敏是过强；疫苗=演习（b08.1.3认旧友）。" },
                { type: "choice", stem: "下列关于神经调节的说法，正确的是？",
                  options: ["膝跳反射不受大脑调控", "兴奋在神经元之间双向传递", "垂体是激素调节的总枢纽", "条件反射需要大脑皮层参与"], answer: 3,
                  tip: "低级中枢受大脑调控；传递单向；下丘脑是总枢纽。" },
                { type: "choice", stem: "进食后，血糖升高的直接\"刹车\"是？",
                  options: ["胰高血糖素", "胰岛素", "抗利尿激素", "甲状腺激素"], answer: 1,
                  tip: "进食后血糖升→胰岛素降血糖（b22.2.2 第 1 页）。" },
                { type: "judge", stem: "抗体与抗原结合后，直接把抗原杀死了。",
                  answer: false, tip: "抗体只\"结合\"，清理由吞噬细胞来（b22.3.1 第 2 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二）：match + order + 生活题 + 实验设计题 ============ */
            {
              id: "b22.3.3-p2",
              kind: "quiz",
              title: "习题（二）",
              questions: [
                { type: "judge", stem: "过敏是免疫功能低下导致的。",
                  answer: false, tip: "过敏是免疫功能过强——方向别反（b22.3.2 第 1 页）。" },
                { type: "match", stem: "把激素和它的\"老家\"配对：",
                  pairs: [["甲状腺激素", "甲状腺"], ["胰岛素", "胰岛B细胞"], ["胰高血糖素", "胰岛A细胞"], ["抗利尿激素", "下丘脑（合成）"]],
                  options: ["胰岛A细胞", "甲状腺", "下丘脑（合成）", "胰岛B细胞"],
                  tip: "甲状腺激素←甲状腺；胰岛素←B 细胞；胰高血糖素←A 细胞。" },
                { type: "order", stem: "把反射弧的五部分按兴奋经过的顺序排好：",
                  items: ["感受器", "传入神经", "神经中枢", "传出神经", "效应器"],
                  scrambled: ["效应器", "神经中枢", "感受器", "传出神经", "传入神经"],
                  tip: "感受器→传入→中枢→传出→效应器（b22.1.1 第 1 页）。" },
                { type: "choice", stem: "要验证\"胰岛素能降低血糖\"，最合理的实验设计是？",
                  options: ["只给一组小鼠注射胰岛素，看血糖是否下降", "两组小鼠：注射胰岛素/注射等量生理盐水，定时测血糖并重复多次", "给小鼠注射一次胰岛素，测一次血糖就行", "先饿小鼠三天，再注射胰岛素看效果"], answer: 1,
                  tip: "对照（胰岛素/盐水）→单一变量→重复，三原则。" },
                { type: "choice", stem: "体检单上空腹血糖 6.8 mmol/L（参考范围 3.9–6.1），下列做法最恰当的是？",
                  options: ["一次偏高就是糖尿病，赶紧吃药", "参考范围仅供参考，找医生规范复查", "血糖仪肯定不准，不用管", "从此不敢吃主食"], answer: 1,
                  tip: "一次测量不能诊断；参考范围不是判决书（b22.2.2 第 3 页）。" }
              ],
              point: "全章完：神经—体液—免疫，一张调节网。"
            }
          ]
        }
      ]
    }
  ]
};
