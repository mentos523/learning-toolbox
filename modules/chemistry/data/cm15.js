/* ============================================================
 * 学习工具箱 · 化学 · 第十五章数据（蓝队 2026-10-15，批3 cm12–cm16）
 * 硫·氮：SO₂/H₂SO₄；NO₂/HNO₃；NH₃/铵盐
 *
 * Schema 冻结版 v1.0（见 data/cm05.js 头注释，全批复用）。
 * 组件口径见 docs/chemistry-interactions.md v1.1。
 * Y11 compare-table：浓/稀硫酸、浓/稀硝酸对照（property/similar/different）；
 *   recordKey 冻结格式 chm_cmp_<课号>。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm15"] = {
  id: "cm15",
  units: [
    {
      id: "cm15.1",
      title: "硫及其化合物",
      lessons: [
        {
          id: "cm15.1.1",
          title: "二氧化硫",
          prereq: "cm14.3.3 本章小结与习题",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm15.1.1-p1",
              kind: "interact",
              title: "品红褪色又恢复",
              exploreTip: "先看褪色，再加热：颜色回来了——漂白和褪色有什么区别？",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "SO₂ + 有色物质 ⇌ 无色物质（加热恢复）" },
                    particles: [
                      { id: "so2", kind: "molecule", label: "SO₂", charge: null, role: "reactant", count: 4 },
                      { id: "dye", kind: "molecule", label: "品红", charge: null, role: "reactant", count: 2 }
                    ],
                    keyframes: [
                      { caption: "SO₂ 通入品红溶液：红色褪去——SO₂ 有漂白性。" },
                      { caption: "加热褪色后的溶液：红色恢复！SO₂ 的漂白是'化合'，不稳定。" },
                      { caption: "对比：氯水的漂白（HClO 氧化）加热不恢复——漂白分两种，机理不同。" }
                    ],
                    counter: false,
                    spectatorFade: false,
                    slowmo: true,
                    scaleNote: "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。",
                    safety: "⚠ SO₂ 有毒：虚拟实验可重复试错；现实中须在通风橱中进行，尾气用 NaOH 溶液吸收。"
                  }
                }
              ],
              point: "SO₂ 漂白品红：加热恢复——'化合'漂白不稳定；HClO 漂白是氧化，不可恢复。"
            },
            {
              id: "cm15.1.1-p2",
              kind: "explain",
              title: "SO₂：三性",
              blocks: [
                { type: "lead", text: "SO₂ 无色、有刺激性气味、有毒。它的性质记住'三性'：酸性氧化物、漂白性、还原性。" },
                { type: "text", html: "① 酸性氧化物：SO₂ + H₂O ⇌ H₂SO₃；SO₂ + 2NaOH ＝ Na₂SO₃ + H₂O。② 漂白性：使品红褪色，加热恢复（化合型，不稳定）。③ 还原性：SO₂ + Cl₂ + 2H₂O ＝ 2HCl + H₂SO₄（S 从 +4 升到 +6）。" },
                { type: "text", html: "酸雨：SO₂ 溶于水，pH < 5.6。工业制法：4FeS₂ + 11O₂ ＝高温＝ 2Fe₂O₃ + 8SO₂。" },
                { type: "trap", text: "⚠ 别搞混：SO₂ 漂白 = 永久褪色？加热恢复！'SO₂ 使品红褪色'和'使石蕊变红'一回事？前者漂白，后者酸性！" }
              ],
              point: "SO₂ 三性：酸性氧化物、漂白性（可恢复）、还原性——酸雨 pH < 5.6。"
            },
            {
              id: "cm15.1.1-p3",
              kind: "quiz",
              title: "自测：SO₂",
              questions: [
                {
                  type: "choice",
                  stem: "SO₂ 使品红褪色后加热，现象是（  ）",
                  options: ["红色不再恢复", "红色恢复", "变成蓝色", "产生沉淀"],
                  answer: 1,
                  tip: "SO₂ 的漂白是化合型，加热恢复——与 HClO 的氧化漂白不同。"
                },
                {
                  type: "choice",
                  stem: "SO₂ + Cl₂ + 2H₂O ＝ 2HCl + H₂SO₄ 中，SO₂ 表现（  ）",
                  options: ["氧化性", "还原性", "漂白性", "酸性"],
                  answer: 1,
                  tip: "S 从 +4 升到 +6，失电子 → SO₂ 做还原剂，表现还原性。"
                },
                {
                  type: "fill",
                  stemBefore: "酸雨的 pH",
                  stemAfter: "5.6。（填 </>/=）",
                  answer: "<",
                  accept: ["＜"],
                  hint: "正常雨水 pH 约 5.6",
                  tip: "酸雨：pH < 5.6。SO₂、NO₂ 溶于水是元凶。"
                }
              ],
              point: "漂白看机理（化合 vs 氧化），价态看升降（升失氧、降得还）。"
            }
          ]
        },
        {
          id: "cm15.1.2",
          title: "硫酸",
          prereq: "cm15.1.1 二氧化硫",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm15.1.2-p1",
              kind: "interact",
              title: "浓硫酸 vs 稀硫酸",
              exploreTip: "左右对照：同样的试剂，浓和稀干的事完全不一样。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "浓硫酸 vs 稀硫酸：同样的试剂，浓和稀干的事完全不一样",
                    columns: ["浓硫酸", "稀硫酸"],
                    rows: [
                      { dim: "与 Cu 反应", a: "Cu + 2H₂SO₄(浓) ＝△＝ CuSO₄ + SO₂↑ + 2H₂O（强氧化性）", b: "不反应（稀硫酸氧化性体现在 H⁺）" },
                      { dim: "与 C 反应", a: "C + 2H₂SO₄(浓) ＝△＝ CO₂↑ + 2SO₂↑ + 2H₂O（强氧化性）", b: "不反应" },
                      { dim: "使蔗糖变黑", a: "变黑（脱水性：按水的组成比脱去 H、O）", b: "无此现象" },
                      { dim: "稀释", a: "放出大量热（吸水性）", b: "—" },
                      { dim: "酸的通性", a: "有", b: "有（与金属、碱、盐反应）" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "浓硫酸三特性：强氧化性、脱水性、吸水性——稀硫酸只有酸的通性。"
            },
            {
              id: "cm15.1.2-p2",
              kind: "explain",
              title: "浓稀迥异",
              blocks: [
                { type: "lead", text: "浓硫酸和稀硫酸，名字只差一个字，性质天差地别：浓的有'三特性'，稀的只有酸的通性。" },
                { type: "text", html: "浓硫酸三特性：① 强氧化性：Cu + 2H₂SO₄(浓) ＝△＝ CuSO₄ + SO₂↑ + 2H₂O（S 从 +6 降到 +4）；② 脱水性：使蔗糖、纸张炭化（按 H₂O 的组成比脱去 H、O）；③ 吸水性：吸收水蒸气，稀释时放出大量热。" },
                { type: "oldfriend", text: "（还记得 cm10.1.2 的认旧友吗？稀释浓硫酸：酸入水、沿器壁、慢慢倒、不断搅——顺序错了会沸腾飞溅。）" },
                { type: "trap", text: "⚠ 别搞混：'浓硫酸使 Cu 溶解'是酸的通性？是强氧化性！稀释时把水倒入酸？酸入水！顺序反了沸腾飞溅！" }
              ],
              point: "浓硫酸 = 强氧化性 + 脱水性 + 吸水性；稀释口诀：酸入水、沿器壁、慢慢倒、不断搅。"
            },
            {
              id: "cm15.1.2-p3",
              kind: "quiz",
              title: "自测：硫酸",
              questions: [
                {
                  type: "choice",
                  stem: "浓硫酸使蔗糖变黑，表现的是（  ）",
                  options: ["强氧化性", "脱水性", "吸水性", "酸性"],
                  answer: 1,
                  tip: "变黑（炭化）→ 脱水性：按水的组成比脱去 H、O。"
                },
                {
                  type: "choice",
                  stem: "稀释浓硫酸的正确操作是（  ）",
                  options: ["水倒入酸", "酸入水、沿器壁、慢慢倒、不断搅", "一次性混合", "加热混合"],
                  answer: 1,
                  tip: "酸入水、沿器壁、慢慢倒、不断搅——顺序错了沸腾飞溅！"
                },
                {
                  type: "fill",
                  stemBefore: "Cu + 2H₂SO₄(浓) ＝△＝ CuSO₄ + SO₂↑ + 2H₂O 中，S 的化合价从 +6 降到",
                  stemAfter: "。",
                  answer: "+4",
                  accept: ["4", "＋4"],
                  hint: "SO₂ 中 S 的价态",
                  tip: "SO₂ 中 S 是 +4 价：+6 → +4，降低、得电子，浓硫酸做氧化剂。"
                }
              ],
              point: "'浓'和'稀'是两种试剂——见浓硫酸先问三特性，见稀释先背口诀。"
            }
          ]
        }
      ]
    },
    {
      id: "cm15.2",
      title: "氮及其化合物",
      lessons: [
        {
          id: "cm15.2.1",
          title: "氮氧化物",
          prereq: "cm15.1.2 硫酸",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm15.2.1-p1",
              kind: "interact",
              title: "NO₂ 溶于水",
              exploreTip: "看红棕色气体溶于水：颜色变浅，还产生了什么？",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "3NO₂ + H₂O ＝ 2HNO₃ + NO" },
                    particles: [
                      { id: "no2", kind: "molecule", label: "NO₂", charge: null, role: "reactant", count: 3 },
                      { id: "h2o", kind: "molecule", label: "H₂O", charge: null, role: "reactant", count: 1 },
                      { id: "hno3", kind: "molecule", label: "HNO₃", charge: null, role: "product", count: 2 },
                      { id: "no", kind: "molecule", label: "NO", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "红棕色 NO₂ 通入水中，颜色变浅。" },
                      { caption: "3NO₂ + H₂O ＝ 2HNO₃ + NO：NO₂ 既做氧化剂又做还原剂（歧化）。" },
                      { caption: "NO 无色，遇空气变红棕色：2NO + O₂ ＝ 2NO₂。" }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true,
                    scaleNote: "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。",
                    safety: "⚠ NO₂ 有毒：虚拟实验可重复试错；现实中须在通风橱中进行，尾气用 NaOH 溶液吸收。"
                  }
                }
              ],
              point: "3NO₂ + H₂O ＝ 2HNO₃ + NO——NO₂ 歧化：既升（+4→+5）又降（+4→+2）。"
            },
            {
              id: "cm15.2.1-p2",
              kind: "explain",
              title: "氮氧化物",
              blocks: [
                { type: "lead", text: "NO 无色，NO₂ 红棕色，都有毒。NO 遇空气变红棕色，是检验 NO 的特征现象。" },
                { type: "text", html: "NO：无色，有毒；2NO + O₂ ＝ 2NO₂（无色变红棕色）。NO₂：红棕色，有毒；3NO₂ + H₂O ＝ 2HNO₃ + NO（歧化反应：N 从 +4 升到 +5，又降到 +2）。" },
                { type: "text", html: "NOₓ 是酸雨、光化学烟雾的元凶之一。汽车尾气、硝酸工厂是主要来源。NO₂ 溶于水生成 HNO₃，也是酸雨 pH < 5.6 的原因之一。" },
                { type: "trap", text: "⚠ 别搞混：NO₂ 溶于水只生成 HNO₃？还生成 NO！'NO 有色'？NO 无色，NO₂ 红棕色！" }
              ],
              point: "NO 无色遇空气变红棕色；NO₂ 歧化生成 HNO₃ + NO——都是酸雨的元凶。"
            },
            {
              id: "cm15.2.1-p3",
              kind: "quiz",
              title: "自测：氮氧化物",
              questions: [
                {
                  type: "choice",
                  stem: "检验 NO 的特征现象是（  ）",
                  options: ["通入水中变红", "遇空气变红棕色", "使品红褪色", "产生白色沉淀"],
                  answer: 1,
                  tip: "2NO + O₂ ＝ 2NO₂：无色变红棕色——检验 NO 的特征现象。"
                },
                {
                  type: "choice",
                  stem: "3NO₂ + H₂O ＝ 2HNO₃ + NO 中，NO₂（  ）",
                  options: ["只做氧化剂", "只做还原剂", "既做氧化剂又做还原剂", "既不做氧化剂也不做还原剂"],
                  answer: 2,
                  tip: "N 从 +4 升到 +5（失电子）又降到 +2（得电子）——歧化反应。"
                },
                {
                  type: "fill",
                  stemBefore: "NO₂ 的颜色是",
                  stemAfter: "色。",
                  answer: "红棕",
                  accept: ["红棕色", "棕红"],
                  hint: "与无色的 NO 对比",
                  tip: "NO₂ 红棕色，NO 无色——颜色是区分它们的第一特征。"
                }
              ],
              point: "NO 无色、NO₂ 红棕色；歧化 = 同一元素既升又降。"
            }
          ]
        },
        {
          id: "cm15.2.2",
          title: "硝酸",
          prereq: "cm15.2.1 氮氧化物",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm15.2.2-p1",
              kind: "interact",
              title: "浓硝酸 vs 稀硝酸",
              exploreTip: "左右对照：和 Cu 反应，浓和稀的产物不一样——还原产物不同。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "浓硝酸 vs 稀硝酸：和 Cu 反应，还原产物不一样",
                    columns: ["浓硝酸", "稀硝酸"],
                    rows: [
                      { dim: "与 Cu 反应", a: "Cu + 4HNO₃(浓) ＝ Cu(NO₃)₂ + 2NO₂↑ + 2H₂O", b: "3Cu + 8HNO₃(稀) ＝ 3Cu(NO₃)₂ + 2NO↑ + 4H₂O" },
                      { dim: "还原产物", a: "NO₂（N：+5 → +4）", b: "NO（N：+5 → +2）" },
                      { dim: "氧化性", a: "强", b: "较弱" },
                      { dim: "保存", a: "棕色瓶、避光（见光分解）", b: "—" },
                      { dim: "与 Cu 是否生成 H₂", a: "不生成（氧化性酸）", b: "不生成（氧化性酸）" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "硝酸强氧化性：浓 → NO₂，稀 → NO——还原产物不同，记住'浓稀定产物'。"
            },
            {
              id: "cm15.2.2-p2",
              kind: "explain",
              title: "硝酸的强氧化性",
              blocks: [
                { type: "lead", text: "硝酸是强氧化性酸：浓、稀都和 Cu 反应，但还原产物不一样——'浓稀定产物'。" },
                { type: "text", html: "Cu + 4HNO₃(浓) ＝ Cu(NO₃)₂ + 2NO₂↑ + 2H₂O；3Cu + 8HNO₃(稀) ＝ 3Cu(NO₃)₂ + 2NO↑ + 4H₂O。N 从 +5 降到 +4（浓）或 +2（稀），得电子，做氧化剂。" },
                { type: "text", html: "硝酸见光分解：4HNO₃ ＝光照＝ 4NO₂↑ + O₂↑ + 2H₂O——用棕色瓶、避光保存。常温下浓硝酸使 Fe、Al 钝化（表面形成致密氧化膜）。" },
                { type: "trap", text: "⚠ 别搞混：'稀硝酸与 Cu 生成 H₂'？硝酸是氧化性酸，不生成 H₂！浓硝酸敞口久置浓度不变？见光分解，浓度降低！" }
              ],
              point: "硝酸：强氧化性（不生成 H₂）、见光分解（棕色瓶）、浓稀定产物（NO₂/NO）。"
            },
            {
              id: "cm15.2.2-p3",
              kind: "quiz",
              title: "自测：硝酸",
              questions: [
                {
                  type: "choice",
                  stem: "Cu 与浓硝酸反应的还原产物是（  ）",
                  options: ["NO", "NO₂", "H₂", "N₂"],
                  answer: 1,
                  tip: "浓 → NO₂，稀 → NO。'浓稀定产物'。"
                },
                {
                  type: "choice",
                  stem: "硝酸用棕色瓶保存的原因是（  ）",
                  options: ["防止挥发", "见光分解", "防止吸水", "防止氧化"],
                  answer: 1,
                  tip: "4HNO₃ ＝光照＝ 4NO₂↑ + O₂↑ + 2H₂O——见光分解，棕色瓶避光。"
                },
                {
                  type: "fill",
                  stemBefore: "Cu 与稀硝酸反应，N 从 +5 降到",
                  stemAfter: "。（填化合价）",
                  answer: "+2",
                  accept: ["2", "＋2"],
                  hint: "还原产物是 NO",
                  tip: "稀 → NO：N 从 +5 降到 +2，得电子，硝酸做氧化剂。"
                }
              ],
              point: "浓稀定产物、见光分解、不生成 H₂——硝酸三句话。"
            }
          ]
        },
        {
          id: "cm15.2.3",
          title: "氨与铵盐",
          prereq: "cm15.2.2 硝酸",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm15.2.3-p1",
              kind: "interact",
              title: "喷泉实验",
              exploreTip: "看水喷上来：NH₃ 极易溶于水，烧瓶里压强骤降——大气压把水'压'上去。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻" },
                    particles: [
                      { id: "nh3", kind: "molecule", label: "NH₃", charge: null, role: "reactant", count: 6 },
                      { id: "h2o", kind: "molecule", label: "H₂O", charge: null, role: "reactant", count: 6 },
                      { id: "nh4", kind: "molecule", label: "NH₄⁺", charge: null, role: "product", count: 3 },
                      { id: "oh", kind: "molecule", label: "OH⁻", charge: null, role: "product", count: 3 }
                    ],
                    keyframes: [
                      { caption: "烧瓶中充满 NH₃，胶头滴管挤入少量水。" },
                      { caption: "NH₃ 极易溶于水（1∶700），烧瓶内压强骤降。" },
                      { caption: "大气压把烧杯里的水压入烧瓶，形成喷泉。NH₃ + H₂O ⇌ NH₄⁺ + OH⁻（氨水显碱性）。" }
                    ],
                    counter: false,
                    spectatorFade: false,
                    slowmo: true,
                    scaleNote: "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。",
                    safety: "⚠ 虚拟实验可重复试错；现实中做喷泉实验须防倒吸——导管口塞棉花或用防倒吸装置。"
                  }
                }
              ],
              point: "喷泉实验 = 极易溶于水 + 压强差——NH₃ 1 体积水溶 700 体积。"
            },
            {
              id: "cm15.2.3-p2",
              kind: "explain",
              title: "氨与铵盐",
              blocks: [
                { type: "lead", text: "NH₃ 无色、有刺激性气味、极易溶于水。氨水是混合物，铵盐受热分解——氮的化合物的'两头'。" },
                { type: "text", html: "NH₃ 的性质：与水（NH₃ + H₂O ⇌ NH₄⁺ + OH⁻，氨水显碱性）、与酸（NH₃ + HCl ＝ NH₄Cl，白烟）、还原性（4NH₃ + 5O₂ ＝催化剂△＝ 4NO + 6H₂O）。" },
                { type: "text", html: "铵盐（如 NH₄Cl）受热分解：NH₄Cl ＝△＝ NH₃↑ + HCl↑；与碱反应放 NH₃：NH₄⁺ + OH⁻ ＝△＝ NH₃↑ + H₂O——这就是 NH₄⁺ 的检验方法。" },
                { type: "trap", text: "⚠ 别搞混：氨水 = 纯净物？混合物！NH₄⁺ 的检验不用碱？加碱加热，湿润红色石蕊试纸变蓝。" }
              ],
              point: "氨水是混合物，铵盐'见碱放氨、受热分解'——NH₄⁺ 检验：加碱加热。"
            },
            {
              id: "cm15.2.3-p3",
              kind: "quiz",
              title: "自测：氨",
              questions: [
                {
                  type: "choice",
                  stem: "检验 NH₄⁺ 的方法是（  ）",
                  options: ["加酸加热", "加碱加热，闻气味并用湿润红色石蕊试纸", "加 KSCN", "焰色试验"],
                  answer: 1,
                  tip: "NH₄⁺ + OH⁻ ＝△＝ NH₃↑ + H₂O：加碱加热，NH₃ 使湿润红色石蕊试纸变蓝。"
                },
                {
                  type: "choice",
                  stem: "氨水是（  ）",
                  options: ["纯净物", "混合物", "单质", "氧化物"],
                  answer: 1,
                  tip: "氨水是混合物：NH₃、H₂O、NH₄⁺、OH⁻、H⁺——'氨水'不是一种物质。"
                },
                {
                  type: "fill",
                  stemBefore: "NH₄Cl ＝△＝ NH₃↑ +",
                  stemAfter: "↑。",
                  answer: "HCl",
                  accept: [],
                  hint: "另一种气体",
                  tip: "NH₄Cl ＝△＝ NH₃↑ + HCl↑——铵盐受热分解。"
                }
              ],
              point: "NH₄⁺ 检验三件套：碱、加热、湿润红色石蕊试纸变蓝。"
            }
          ]
        },
        {
          id: "cm15.2.4",
          title: "本章小结与习题",
          prereq: "cm15.2.3 氨与铵盐",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm15.2.4-p1",
              kind: "quiz",
              title: "小结：硫 · 氮",
              questions: [
                {
                  type: "review",
                  html: "本章小结：① SO₂：酸性氧化物、漂白性（加热恢复）、还原性；酸雨 pH < 5.6。② 浓硫酸三特性：强氧化性、脱水性、吸水性；稀释口诀酸入水。③ NO 无色、NO₂ 红棕色；3NO₂+H₂O＝2HNO₃+NO（歧化）。④ 硝酸：强氧化性（不生成 H₂）、见光分解（棕色瓶）、浓稀定产物（NO₂/NO）。⑤ NH₃ 极易溶于水（1∶700），氨水是混合物；铵盐见碱放氨、受热分解。"
                },
                {
                  type: "choice",
                  stem: "下列能使品红褪色、加热又恢复的是（  ）",
                  options: ["Cl₂", "SO₂", "HClO", "活性炭"],
                  answer: 1,
                  tip: "SO₂ 漂白是化合型，加热恢复。HClO 氧化漂白不恢复；活性炭吸附不恢复。"
                },
                {
                  type: "choice",
                  stem: "Cu 与稀硝酸反应的还原产物是（  ）",
                  options: ["NO₂", "NO", "H₂", "N₂O"],
                  answer: 1,
                  tip: "浓 → NO₂，稀 → NO。'浓稀定产物'。"
                },
                {
                  type: "fill",
                  stemBefore: "3NO₂ + H₂O ＝ 2HNO₃ + NO 中，被氧化的 N 占参加反应的 NO₂ 的",
                  stemAfter: "。（填分数）",
                  answer: "2/3",
                  accept: ["三分之二"],
                  hint: "歧化：升与降",
                  tip: "3 个 NO₂：2 个 N 从 +4 升到 +5（被氧化），1 个降到 +2 → 被氧化的占 2/3。"
                }
              ],
              point: "硫看三性、氮看价态——化合价升降是氧化还原的'通用语言'。"
            },
            {
              id: "cm15.2.4-p2",
              kind: "quiz",
              title: "综合：生活 + 定量",
              questions: [
                {
                  type: "choice",
                  stem: "下列关于酸雨的说法正确的是（  ）",
                  options: ["pH > 5.6 的雨", "SO₂、NO₂ 是主要元凶", "只有工业区才有", "对建筑无腐蚀"],
                  answer: 1,
                  tip: "生活中的化学：酸雨 pH < 5.6，SO₂、NO₂ 溶于水是元凶，腐蚀建筑、酸化土壤。"
                },
                {
                  type: "choice",
                  stem: "汽车尾气中的 NOₓ 主要来源于（  ）",
                  options: ["汽油不完全燃烧", "空气中 N₂ 与 O₂ 高温反应", "润滑油挥发", "轮胎磨损"],
                  answer: 1,
                  tip: "高温下 N₂ + O₂ ＝放电/高温＝ 2NO——发动机高温是 NOₓ 的来源之一。"
                },
                {
                  type: "fill",
                  stemBefore: "6.4g Cu 与足量浓硫酸（加热）完全反应，生成 SO₂ 在标准状况下的体积是",
                  stemAfter: " L。",
                  answer: "2.24L",
                  accept: ["2.24 L", "2.24"],
                  hint: "Cu + 2H₂SO₄(浓) ＝△＝ CuSO₄ + SO₂↑ + 2H₂O",
                  tip: "n(Cu) ＝ 6.4/64 ＝ 0.1 mol；系数比 Cu∶SO₂ ＝ 1∶1 → n(SO₂) ＝ 0.1 mol → V ＝ 0.1×22.4 ＝ 2.24L。"
                }
              ],
              point: "定量题自查：方程式配平了吗？代入的是纯净物质量吗？单位写对了吗？（浓/稀写对了吗？标准状况声明了吗？）"
            }
          ]
        }
      ]
    }
  ]
};
