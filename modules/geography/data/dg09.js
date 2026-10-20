/* ============================================================
 * 学习工具箱 · 地理 · 第九章数据（dg09 中国的自然环境）
 *
 * 章 dg09 中国的自然环境：9 课 25 页（每课 p1 讲解 + p2 交互 +
 * p3 收官；2 页课 p2 交互兼收官）。
 * 单元：dg09.1 中国的地形（地形/地形与生产生活），
 *       dg09.2 中国的气候（季风/降水时空分布/气候与灾害），
 *       dg09.3 中国的河流（河流/长江/黄河/小结）。
 * prereq 链：dg08 小结 → 中国的地形 → 地形与生产生活 →
 *             季风 → 降水时空分布 → 气候与灾害 → 中国的河流 →
 *             长江 → 黄河 → 全章。
 *
 * 真值来源（优先级，见真值口径 §0.1）：
 *  ① params（本文件即 params：三级阶梯/山脉走向/阶梯界线/长江黄河
 *      数据逐字引人教版八上教材口径；climate-chart 武汉站温/降水数组
 *      逐字引蓝队 geo-climate-stations.js 冻结表，类型阈值逐字引
 *      geo-climate-types.js 冻结表与 GEO-R14）；
 *  ② 同页文案；③ curriculum 红线四辨析；④ pedagogy 第九章/T 系列；
 *  ⑤ 真值口径 GEO-R01–R57/GEO-AX01 + 书面裁决。
 *
 * 口诀逐字冻结：红线①「凸高为谷、凸低为脊」（GEO-R01；本章 dg09.3.2
 * 回填：河流发育在山谷，河流流向与等高线凸向相反，GEO-R03）；
 * 红线③「以温定带、以水定型」（>15℃ 热带、0–15℃ 亚热带、
 * 最冷月<0℃且最热月>10℃ 温带、最热月<10℃ 寒带；本章 dg09.2.1 回填）。
 *
 * GEO-R51 跨模块引用核查（本批）：
 *  dg09.2.1 课表"红线辨析③回填（dg03.2.4）"——dg03.2.4 批 2 已上线
 *  .12，真实存在（两步法判读立靶课），课内挂本学科回填；
 *  dg09.2.2 课表"等值线判读规范回填"——dg01.3.3 试点课真实存在，
 *  课内挂本学科回填；dg09.3.2 课表"红线辨析①回填（dg01.3.3）"——
 *  真实存在，课内挂本学科回填。本批零 mathlink/physicslink
 *  （写完后全仓 grep 核验：无 ch0/p0/#r= 残留）。
 *  dg09.3.1 课表"dg14.4.1 水循环回填"——dg14 尚未生产，按"回填目标课
 *  真实存在才写预告/回填"口径（仿 dg07 头注），本批不写，记诚实缺口
 *  待 dg14 上线后回填；课内只讲"内流河滋养绿洲农业"事实本身。
 *
 * 分场层口径（GEO-RULING-2026-10-17-03）：dg09.2.1-p2 武汉站判读断言
 * 分两类写——① 场层真值：GeoBatch2.judgeClimate 纯函数直算（与 UI
 * 无关）；② UI 可达：guided 两步 UI 路径实际可达的徽章/读数。课页文案
 * 中两类分段标注，不混写。
 *
 * needsRuling 核对（本批逐页）：本批 climate-chart 仅 dg09.2.1-p2 一处，
 * 用武汉站（冻结表无 needsRuling，非口诀例外）——逐字核对冻结表，
 * 未写 needsRuling 字段（写了才是错）。本批其余页无 climate-chart。
 *
 * 地图诚实（GEO-RULING-2026-10-17-08 国界审定书执行）：
 *  本批 5 个 geo-map 页按资产实际定级——
 *  B 级（terrain-3d / precip：主题要素图，底图带省界叠加，
 *    执行 B–E 全部条文）；
 *  C 级（disaster-path / river-profile / yellow-river：路径或剖面示意，
 *    C 级剪影底图，不画国界线/省界线，台湾岛不可缺，审定书 D 底线）。
 *  数据侧不再写 declare 字段（防角落小字重复渲染），冻结文案由
 *  widget 按资产 grade 自动渲染（A/B 级 E.2、C 级 E.3）。
 *  params.mapLevel 为本生产队给地图队的定级信号（契约外辅助字段），
 *  A/B 级页已删，仅 C 级剪影页保留。
 *  assetId 为本队定义的语义 ID，实际矢量资产路径由地图队映射落地。
 *
 * 首现术语当页定义（硬门禁⑧）：外流河/内流河、水文特征（dg09.3.1）、
 * 地上河（dg09.3.3）。季风 dg07.1.3 已定义，本章回填不重复定义。
 *
 * 记录键：geog_<类型>_<页id>（与批 1–4 同方案；运行时自动加 ltb-geo-
 * 前缀，老键由 migrateLegacyRecords 迁移，不另起前缀）。
 *
 * 数据口径：长江约 6300 千米（人教版口径，我国第一、世界第三，GEO-R56）；
 * 黄河 5464 千米（我国第二长河）；塔里木河约 2179 千米（我国最长内流河）；
 * 不确定的数写"约"（GEO-R54）。
 *
 * 待地图队清单：
 *  - 红线①"河流—等高线凸向关系"示意 mode：dg09.3.2 需一幅"等高线凸向
 *    高处（山谷）+ 河流落山谷、流向与凸向相反"的关系示意，当前 mode
 *    清单无此表达，本批用 p1 文字讲解 + p3 guess-verify 落地，待地图队
 *    评估是否新增 mode 或扩展 river-profile，由协调者裁决。
 * ============================================================ */
window.GEOGRAPHY_DATA = window.GEOGRAPHY_DATA || {};
window.GEOGRAPHY_DATA["dg09"] = {
  id: "dg09",
  units: [
    {
      id: "dg09.1",
      title: "中国的地形",
      lessons: [
        /* ============ dg09.1.1 中国的地形（3 页） ============ */
        {
          id: "dg09.1.1",
          title: "中国的地形",
          prereq: "dg08 小结",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg09.1.1-p1",
              kind: "explain",
              title: "地形：西高东低三级阶梯",
              exploreTip: "俯瞰中国地形：像三级台阶，西高东低。界线精确到山脉，山脉按走向记。",
              blocks: [
                { type: "lead", text: "中国地形的第一特征：西高东低，呈三级阶梯状分布。记住三级分别是什么、界线是哪几条山脉。" },
                { type: "text", html: "<strong>三级阶梯</strong>：<strong>第一级</strong>—青藏高原、柴达木盆地，平均海拔 4000 米以上；<strong>第二级</strong>—内蒙古高原、黄土高原、云贵高原，塔里木盆地、准噶尔盆地、四川盆地，海拔 1000–2000 米；<strong>第三级</strong>—东北平原、华北平原、长江中下游平原，丘陵，海拔 500 米以下。" },
                { type: "text", html: "<strong>阶梯界线精确到山脉</strong>：一、二阶梯界线—<strong>昆仑山—祁连山—横断山脉</strong>；二、三阶梯界线—<strong>大兴安岭—太行山—巫山—雪峰山</strong>。" },
                { type: "text", html: "<strong>主要山脉按走向记</strong>：东西走向—天山、阴山、昆仑山、秦岭、南岭；东北—西南走向—大兴安岭、太行山、巫山、雪峰山、长白山、武夷山、台湾山脉；南北走向—贺兰山、六盘山、横断山脉；西北—东南走向—阿尔泰山、祁连山；弧形—喜马拉雅山脉。" },
                { type: "text", html: "<strong>五种地形齐全</strong>：山地、高原、盆地、平原、丘陵。四大高原（青藏、内蒙古、黄土、云贵）、四大盆地（塔里木、准噶尔、柴达木、四川）、三大平原（东北、华北、长江中下游）。" },
                { type: "trap", text: "⚠️ 误区：“阶梯界线模糊”——不！界线精确到山脉：昆仑—祁连—横断是一二阶梯界线，大兴安岭—太行—巫山—雪峰是二三阶梯界线。背界线就是背山脉。" },
                { type: "slogan", text: "西高东低三台阶，界线山脉要记全。" }
              ],
              point: "地形：西高东低三级阶梯（4000m+/1000–2000m/500m 以下）；界线：昆仑—祁连—横断、大兴安岭—太行—巫山—雪峰；山脉按走向记；五种地形齐全（四大高原/四大盆地/三大平原）。"
            },
            /* ================= p2：交互页（三级阶梯剖面） ================= */
            {
              id: "dg09.1.1-p2",
              kind: "interact",
              title: "看一看：三级阶梯剖面",
              exploreTip: "沿一条东西向剖面切开中国：看三级台阶怎么一级级掉下来，山脉描画走一遍。",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-terrain",
                    mode: "terrain-3d",
                    steps: [
                      { level: "第一级阶梯", landforms: "青藏高原、柴达木盆地", altitude: "平均海拔 4000 米以上" },
                      { level: "第二级阶梯", landforms: "内蒙古高原、黄土高原、云贵高原；塔里木、准噶尔、四川盆地", altitude: "海拔 1000–2000 米" },
                      { level: "第三级阶梯", landforms: "东北平原、华北平原、长江中下游平原；丘陵", altitude: "海拔 500 米以下" }
                    ],
                    recordKey: "geog_geomap_dg09.1.1-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "剖面从西往东看：青藏高原（4000 米以上）→ 翻过昆仑—祁连—横断 → 掉到第二级（1000–2000 米）→ 翻过大兴安岭—太行—巫山—雪峰 → 掉到第三级（500 米以下）。点山脉，描一遍它的走向。" },
                { type: "text", html: "<strong>场层真值</strong>：三级阶梯组成与海拔分级（GeoBatch5.TERRAIN_STEPS 冻结常量，人教版口径）。<strong>UI 可达</strong>：剖面动画播放 + 山脉点选描画。本图为 B 级地形底图（含省界）+ 西—东剖面示意；剖面高程只看趋势不记数值。" },
                { type: "slogan", text: "一刀切开看台阶，山脉走向描出来。" }
              ],
              point: "三级阶梯剖面（geo-map terrain-3d，B 级）。场层真值见 GeoBatch5.TERRAIN_STEPS；UI 可达为剖面动画 + 山脉描画。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg09.1.1-p3",
              kind: "interact",
              title: "收官：地形三问",
              exploreTip: "3 道题——阶梯、界线、走向，一题一山脉。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "一、二阶梯的分界线是？",
                    options: ["秦岭—淮河一线", "昆仑山—祁连山—横断山脉", "大兴安岭—太行山—巫山—雪峰山"],
                    answer: 1,
                    recordKey: "geog_quiz_dg09.1.1-p3a",
                    explain: "一二阶梯：昆仑—祁连—横断；二三阶梯：大兴安岭—太行—巫山—雪峰。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "下列山脉中，呈东北—西南走向的是？",
                    options: ["太行山", "秦岭", "横断山脉"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.1.1-p3b",
                    explain: "太行山：东北—西南走向；秦岭：东西走向；横断山脉：南北走向。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "第三级阶梯的主要地形是？",
                    options: ["青藏高原", "平原和丘陵（海拔 500 米以下）", "高原和盆地"],
                    answer: 1,
                    recordKey: "geog_quiz_dg09.1.1-p3c",
                    explain: "第三级：东北/华北/长江中下游平原 + 丘陵，海拔 500 米以下。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验阶梯分级、界线山脉、走向分类记牢了没有。" },
                { type: "text", html: "下一课 dg09.1.2：地形不是摆设——它决定哪里种水稻、哪里放牦牛、哪里住窑洞。" },
                { type: "slogan", text: "带走一句话：界线即山脉，走向分类记。" }
              ],
              point: "dg09.1.1 完成。下一课：地形与生产生活。"
            }
          ]
        },
        /* ============ dg09.1.2 地形与生产生活（3 页） ============ */
        {
          id: "dg09.1.2",
          title: "地形与生产生活",
          prereq: "中国的地形",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg09.1.2-p1",
              kind: "explain",
              title: "地形决定生产生活",
              exploreTip: "同样的中国人，为什么青藏放牦牛、江南种水稻、黄土住窑洞？地形说了算。",
              blocks: [
                { type: "lead", text: "地形 → 生产 → 生活，一条因果链：地形决定了哪里能种什么、路好不好走、房子盖成什么样。" },
                { type: "text", html: "<strong>地形 → 农业</strong>：青藏高原（高寒）→ <strong>畜牧业</strong>（牦牛）；江南丘陵平原（水热充足）→ <strong>水田农业</strong>（水稻）；黄土高原（土质疏松、降水少）→ <strong>旱作农业</strong> + <strong>窑洞</strong>聚落。" },
                { type: "text", html: "<strong>地形 → 交通、聚落</strong>：山区交通不便、聚落分散；平原交通便利、聚落密集。自然 → 人文，因果方向不许颠倒（GEO-R40）。" },
                { type: "text", html: "<strong>山区开发一分为二</strong>：劣势—交通不便、耕地少；优势—<strong>旅游</strong>（名山大川）、<strong>矿产</strong>、<strong>水能</strong>（河流落差大）。" },
                { type: "trap", text: "⚠️ 误区：“山区只有劣势”——错！旅游、矿产、水能都是优势。一分为二看山区：劣势是交通和耕地，优势是资源和风景。" },
                { type: "slogan", text: "地形定生产，山区两面看。" }
              ],
              point: "地形→生产生活：青藏畜牧、江南水田、黄土窑洞；山区交通不便聚落分散；山区开发一分为二（劣势交通耕地/优势旅游矿产水能）。"
            },
            /* ================= p2：交互页（地形—生产配对） ================= */
            {
              id: "dg09.1.2-p2",
              kind: "interact",
              title: "配一配：地形与生产",
              exploreTip: "左因右果：点左侧地形，再点右侧对应的生产生活方式，配成三对。",
              widgets: [
                {
                  type: "cause-chain",
                  params: {
                    title: "地形—生产生活配对",
                    intro: "左侧三个地形区，右侧三种生产生活方式：点左侧选“因”，再点右侧配对的“果”，配成三对。",
                    mode: "match",
                    causeLabel: "地形区",
                    effectLabel: "生产生活",
                    causes: [
                      { id: "plateau", text: "青藏高原（高寒）" },
                      { id: "jiangnan", text: "江南丘陵平原（水热充足）" },
                      { id: "loess", text: "黄土高原（土质疏松）" }
                    ],
                    effects: [
                      { id: "paddy", text: "水田农业（水稻）" },
                      { id: "cave", text: "窑洞聚落 + 旱作农业" },
                      { id: "yak", text: "畜牧业（牦牛）" }
                    ],
                    pairs: [["plateau", "yak"], ["jiangnan", "paddy"], ["loess", "cave"]],
                    chainNote: "检查口诀：地形 → 生产 → 生活，自然→人文，方向冻结（GEO-R40）。",
                    recordKey: "geog_cause-chain_dg09.1.2-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "配对规则：先点左侧一个地形区，再点右侧对应的生产生活方式。配错可“解除”重配，配完点“提交验证”。" },
                { type: "text", html: "<strong>场层真值</strong>（GeoBatch4.chainScore 纯函数，与 UI 无关）：正确配对 = 青藏高原→畜牧业、江南→水田、黄土高原→窑洞。<strong>UI 可达</strong>：点选配对 → 提交 → 逐对 ✓/✗ 判分。答案不在学生可见文案中，真值只在 params。" },
                { type: "slogan", text: "因果不倒：地形→生产→生活。" }
              ],
              point: "地形—生产配对（cause-chain match）。场层真值：GeoBatch4.chainScore 纯函数直算（与 UI 无关）；UI 可达为点选配对判分。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg09.1.2-p3",
              kind: "interact",
              title: "收官：地形影响三问",
              exploreTip: "3 道题——农业、聚落、山区开发，一题一因果。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "青藏高原发展畜牧业的主导因素是？",
                    options: ["交通便利", "高寒的地形气候条件", "人口多"],
                    answer: 1,
                    recordKey: "geog_quiz_dg09.1.2-p3a",
                    explain: "自然→人文：高寒 → 不宜耕作 → 畜牧业，因果方向冻结。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于山区开发，正确的看法是？",
                    options: ["只有优势，没有任何劣势", "只有劣势，没有任何优势", "一分为二：劣势是交通不便、耕地少，优势是旅游、矿产、水能"],
                    answer: 2,
                    recordKey: "geog_quiz_dg09.1.2-p3b",
                    explain: "一分为二看山区：“只有劣势”是单面论。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "黄土高原的传统民居窑洞，反映的是？",
                    options: ["气候对服饰的影响", "地形（土质疏松）对聚落的影响", "河流对交通的影响"],
                    answer: 1,
                    recordKey: "geog_quiz_dg09.1.2-p3c",
                    explain: "黄土疏松易挖 → 窑洞：地形 → 聚落的典型例子。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验地形→生产→生活的因果链记牢了没有。" },
                { type: "text", html: "下一课 dg09.2.1：从地形到气候——季风是怎么来的，我国东部为什么雨热同期。" },
                { type: "slogan", text: "带走一句话：自然→人文，方向不许倒。" }
              ],
              point: "dg09.1.2 完成。下一课：中国的气候（季风）。"
            }
          ]
        }
      ]
    },
    {
      id: "dg09.2",
      title: "中国的气候",
      lessons: [
        /* ============ dg09.2.1 中国的气候（季风）（3 页） ============ */
        {
          id: "dg09.2.1",
          title: "中国的气候",
          prereq: "地形与生产生活",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg09.2.1-p1",
              kind: "explain",
              title: "季风气候：雨热同期",
              exploreTip: "为什么我国东部夏天又热又多雨、冬天又冷又干燥？季风说了算——冬夏两季，风向性质全反过来。",
              blocks: [
                { type: "lead", text: "季风（dg07.1.3 回填：随季节风向明显转变的风）是我国东部气候的主角。先懂成因，再记冬夏两季风，最后用两步法亲自判一座东部城市。" },
                { type: "text", html: "<strong>成因</strong>：<strong>海陆热力差异</strong>——陆地比热小，升温快降温也快；海洋反之。冬夏海陆温差方向反转，风向跟着反转，这就是季风。" },
                { type: "text", html: "<strong>冬季风</strong>：来自<strong>西北</strong>（西伯利亚、蒙古一带），<strong>寒冷干燥</strong>；<strong>夏季风</strong>：来自<strong>东南</strong>（太平洋），<strong>温暖湿润</strong>。雨热同期 = 夏季风带来的。" },
                { type: "text", html: "<strong>气候类型分布</strong>：东部季风区（热带、亚热带、温带季风气候）；西北内陆—<strong>温带大陆性气候</strong>；青藏高原—<strong>高原山地气候</strong>。季风气候不是全国都有！" },
                { type: "text", html: "<strong>红线辨析③回填</strong>（dg03.2.4）：用两步法判定我国东部季风气候——① 以温定带（读最冷月均温）；② 以水定型（读年降水总量 + 季节分配）。下一页拿武汉站走一遍。" },
                { type: "trap", text: "⚠️ 双坑：① “季风 = 夏季风”——错！冬夏两季都有季风，风向性质相反。② “季风气候全国都有”——错！只在东部；西北是温带大陆性，青藏是高原山地。" },
                { type: "slogan", text: "冬夏风向反，雨热同期来。" }
              ],
              point: "季风：成因海陆热力差异；冬季风西北寒冷干燥、夏季风东南温暖湿润；东部季风区/西北温带大陆性/青藏高原山地；两步法以温定带、以水定型（dg03.2.4 回填）。"
            },
            /* ================= p2：交互页（武汉站两步法判读） ================= */
            {
              id: "dg09.2.1-p2",
              kind: "interact",
              title: "判读武汉：东部季风两步法",
              exploreTip: "用两步法判武汉：先以温定带，再以水定型——红线③回填实战。",
              widgets: [
                {
                  type: "climate-chart",
                  params: {
                    stations: [
                      { name: "武汉", temp: [4, 6, 11, 17, 22, 26, 29, 28, 24, 18, 12, 6], precip: [45, 60, 90, 130, 170, 220, 190, 120, 80, 70, 50, 35], year: "2020", climateTypeId: "subtropical-monsoon",
                        dataKind: "示例年值（非多年平均）", source: "docs/geography-interactions.md G4 示例",
                        sourceNote: "原始气象出处待补；建议替换为中国气象局 1991–2020 气候值或指定年份实测。见 README 待补清单。" }
                    ],
                    mode: "guided",
                    stepOrder: "temp-first",
                    climateLib: "内置",
                    recordKey: "geog_climate-chart_dg09.2.1-p2",
                    axisNote: "横轴月份、纵轴 ℃/mm 双轴；图例：红=气温、蓝=降水（常驻）"
                  }
                }
              ],
              blocks: [
                { type: "lead", html: "两步法走一遍：① <strong>以温定带</strong>——点气温曲线最低点：1 月约 4℃，落在 0–15℃ → <strong>亚热带</strong>；② <strong>以水定型</strong>——年降水约 1260mm，降水集中在夏季（6–8 月约 530mm）→ 夏季多雨型 → <strong>亚热带季风气候</strong>（类型库冻结名）。" },
                { type: "text", html: "<strong>场层真值</strong>（GeoBatch2.judgeClimate 纯函数，与 UI 无关）：武汉 → 最冷月约 4℃ → 亚热带 → 年降水约 1260mm、夏季多雨 → 亚热带季风气候。<strong>UI 可达</strong>：guided 两步——点曲线最低点 → 温度带徽章；点降水柱 → 年降水读数 → 五选一 → 类型徽章。站点温/降水数组逐字引 geo-climate-stations.js 冻结表（武汉站）；本页无 needsRuling（非口诀例外，冻结表亦无该字段，逐页核对无漏写）。" },
                { type: "slogan", text: "以温定带，以水定型，两步走完。" }
              ],
              point: "武汉气候判读（climate-chart guided，红线③回填）。场层真值见 GeoBatch2.judgeClimate；UI 可达为 guided 两步判读。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg09.2.1-p3",
              kind: "interact",
              title: "收官：季风三问",
              exploreTip: "3 道题——成因、两季风、分布范围，一题一辨析。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "季风形成的主要原因是？",
                    options: ["人类活动", "地形起伏", "海陆热力差异"],
                    answer: 2,
                    recordKey: "geog_quiz_dg09.2.1-p3a",
                    explain: "陆地升温快降温快、海洋反之，冬夏温差方向反转 → 风向反转。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于冬夏两季风，表述正确的是？",
                    options: ["冬季风温暖湿润，夏季风寒冷干燥", "两季风都来自东南", "冬季风来自西北、寒冷干燥；夏季风来自东南、温暖湿润"],
                    answer: 2,
                    recordKey: "geog_quiz_dg09.2.1-p3b",
                    explain: "季风 ≠ 夏季风：冬夏两季都有，风向性质相反。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "我国西北内陆（如乌鲁木齐）的气候类型是？",
                    options: ["温带大陆性气候", "亚热带季风气候", "温带季风气候"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.2.1-p3c",
                    explain: "季风气候只在东部；西北深居内陆 → 温带大陆性气候（冻结表乌鲁木齐站）。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验季风成因、两季风性质、分布范围记牢了没有。" },
                { type: "text", html: "下一课 dg09.2.2：季风带来了降水——降水的时空分布有什么规律，800mm 线在哪里。" },
                { type: "slogan", text: "带走一句话：季风有两季，分布看东西。" }
              ],
              point: "dg09.2.1 完成。下一课：降水的时空分布。"
            }
          ]
        },
        /* ============ dg09.2.2 降水的时空分布（3 页） ============ */
        {
          id: "dg09.2.2",
          title: "降水的时空分布",
          prereq: "季风",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg09.2.2-p1",
              kind: "explain",
              title: "降水：东南多西北少",
              exploreTip: "我国降水一张图看懂：空间东南向西北递减，时间夏秋多冬春少，800mm 线是分界。",
              blocks: [
                { type: "lead", text: "我国年降水量：空间上东南多、西北少；时间上夏秋多、冬春少。两句话，记住两个规律。" },
                { type: "text", html: "<strong>空间规律</strong>：从东南沿海向西北内陆<strong>递减</strong>——主因是<strong>海陆位置</strong>：离海越远，夏季风越难到达。等降水量线大体与海岸线平行。" },
                { type: "text", html: "<strong>时间规律</strong>：夏秋多、冬春少——跟着夏季风的进退走。南方雨季长，北方雨季短。" },
                { type: "text", html: "<strong>800mm 线</strong>：年降水量 800mm 等降水量线大体沿<strong>秦岭—淮河</strong>一线；<strong>干湿地区</strong>：湿润区（>800mm）、半湿润区（400–800mm）、半干旱区（200–400mm）、干旱区（<200mm）。等值线判读规范回填（dg01.3.3：等值线判读）。" },
                { type: "trap", text: "⚠️ 误区：“降水空间分布随机”——错！东南向西北递减，海陆位置是主因。判读等降水量线时，用 dg01.3.3 的等值线规范：看数值变化方向，不看线条疏密猜。" },
                { type: "slogan", text: "东南向西北，降水渐递减。" }
              ],
              point: "降水：空间东南多西北少（海陆位置主因）；时间夏秋多冬春少；800mm 线≈秦岭—淮河；干湿四区（800/400/200mm 界线）。"
            },
            /* ================= p2：交互页（年降水量分布） ================= */
            {
              id: "dg09.2.2-p2",
              kind: "interact",
              title: "判读：年降水量分布图",
              exploreTip: "看等降水量线：从东南往西北数，数值怎么变？800mm 线穿过哪里？",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-precip",
                    mode: "precip",
                    isolines: ["1600mm", "800mm", "400mm", "200mm", "50mm"],
                    keyLine: "800mm 等降水量线大体沿秦岭—淮河一线",
                    recordKey: "geog_geomap_dg09.2.2-p2"
                  }
                },
                {
                  type: "monsoon-timeline",
                  params: { recordKey: "geog_monsoon-timeline_dg09.2.2-p2" }
                }
              ],
              blocks: [
                { type: "lead", text: "点等降水量线，看数值：从东南沿海的 1600mm 向西北，一路降到 50mm 以下。找到 800mm 线——它大体沿秦岭—淮河走，这就是湿润区和半湿润区的分界。" },
                { type: "text", html: "<strong>场层真值</strong>：等降水量线数值序列与 800mm 线走向（GeoBatch5.PRECIP_STATIONS 冻结常量 + widget 内等值线）。<strong>UI 可达</strong>：点等值线 → 数值读数；找 800mm 线 → 干湿分区判分。本图为 B 级降水分布底图（含省界），国界线/十段线按审定书绘制。" },
                { type: "text", html: "<strong>时间轴</strong>：降水不光看空间，还要看时间——拖月份滑块，看雨带怎么走：6 月中下旬–7 月上旬江淮准静止锋 → <strong>梅雨</strong>；7 月中下旬–8 月副高控制 → <strong>伏旱</strong>。记住：梅雨、伏旱都是季风“<strong>掉头</strong>”闹的（dg14.3.2 会细讲；预告台账 P7，批 8 补交互落点）。" },
                { type: "slogan", text: "数等值线，看递减，找八百；拖时间轴，看梅雨伏旱。" }
              ],
              point: "年降水量分布判读（geo-map precip，B 级）。场层真值见 GeoBatch5.PRECIP_STATIONS；UI 可达为点线读数 + 800mm 线判分。批 8 追加 monsoon-timeline（§33）：梅雨/伏旱时间轴（P7 交互落点）。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg09.2.2-p3",
              kind: "interact",
              title: "收官：降水分布三问",
              exploreTip: "3 道题——空间规律、时间规律、800mm 线，一题一规律。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "我国年降水量的空间分布规律是？",
                    options: ["西北多、东南少", "东南多、西北少（东南向西北递减）", "全国均匀"],
                    answer: 1,
                    recordKey: "geog_quiz_dg09.2.2-p3a",
                    explain: "主因海陆位置：离海越远，夏季风越难到达。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "800mm 年等降水量线大体沿哪一线分布？",
                    options: ["长江一线", "黄河一线", "秦岭—淮河一线"],
                    answer: 2,
                    recordKey: "geog_quiz_dg09.2.2-p3b",
                    explain: "800mm 线 ≈ 秦岭—淮河：湿润区与半湿润区的分界。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "我国降水时间分配的特点是？",
                    options: ["夏秋多、冬春少", "四季均匀", "冬春多、夏秋少"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.2.2-p3c",
                    explain: "跟着夏季风的进退走：南方雨季长，北方雨季短。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验降水时空分布两个规律和 800mm 线记牢了没有。" },
                { type: "text", html: "下一课 dg09.2.3：气候不总是温柔的——寒潮、台风、洪涝干旱，怎么防。" },
                { type: "slogan", text: "带走一句话：降水看海陆，时间看季风。" }
              ],
              point: "dg09.2.2 完成。下一课：气候与灾害。"
            }
          ]
        },
        /* ============ dg09.2.3 气候与灾害（2 页） ============ */
        {
          id: "dg09.2.3",
          title: "气候与灾害",
          prereq: "降水时空分布",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg09.2.3-p1",
              kind: "explain",
              title: "气象灾害：寒潮与台风",
              exploreTip: "冬天怕寒潮，夏秋怕台风：知道它们从哪来、往哪走，才能防。",
              blocks: [
                { type: "lead", text: "我国主要的气象灾害：寒潮、台风、洪涝、干旱。记住每种灾害的“时间 + 地点 + 路径”，防灾才有抓手。" },
                { type: "text", html: "<strong>寒潮</strong>：<strong>冬半年</strong>，强冷空气南下，带来剧烈降温、大风；北方首当其冲，南方也会受影响。" },
                { type: "text", html: "<strong>台风</strong>：<strong>夏秋季节</strong>，影响我国<strong>东南沿海</strong>；带来狂风暴雨，但也带来<strong>丰沛降水、缓解旱情</strong>——一分为二。" },
                { type: "text", html: "<strong>洪涝与干旱</strong>：降水时间分配不均 → 夏季多雨区易洪涝，冬春少雨区易干旱。<strong>防灾减灾</strong>：关注预警、熟悉应急避险。" },
                { type: "trap", text: "⚠️ 误区：“台风只有害”——错！台风带来丰沛降水，能缓解旱情。一分为二看灾害：害是狂风暴雨，利是降水补给。" },
                { type: "slogan", text: "寒潮冬半年，台风夏秋来。" }
              ],
              point: "灾害：寒潮（冬半年、冷空气南下）、台风（夏秋、东南沿海，利弊两面）、洪涝/干旱（降水不均所致）；防灾减灾看预警。"
            },
            /* ================= p2：交互页（灾害路径 + 收官） ================= */
            {
              id: "dg09.2.3-p2",
              kind: "interact",
              title: "看路径：台风与寒潮",
              exploreTip: "看两条路径：台风从东南海上登陆，寒潮从西北南下——路径即防线。",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-silhouette",
                    mode: "disaster-path",
                    mapLevel: "C",
                    paths: [
                      { id: "typhoon", name: "台风路径", season: "夏秋", from: "西北太平洋", to: "东南沿海登陆", note: "带来狂风暴雨，也带来丰沛降水" },
                      { id: "cold", name: "寒潮路径", season: "冬半年", from: "西伯利亚、蒙古", to: "自北向南", note: "强降温、大风" }
                    ],
                    recordKey: "geog_geomap_dg09.2.3-p2"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于台风，表述正确的是？",
                    options: ["夏秋影响东南沿海；有害也有利（带来降水、缓解旱情）", "台风冬半年影响西北内陆", "台风只有害，没有任何好处"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.2.3-p2a",
                    explain: "一分为二：害是狂风暴雨，利是丰沛降水。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "寒潮发生的主要时段和源地是？",
                    options: ["冬半年，冷空气从西伯利亚、蒙古南下", "春季，冷空气从青藏高原东移", "夏秋，暖空气从太平洋北上"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.2.3-p2b",
                    explain: "冬半年 + 西北源地：路径自北向南，北方首当其冲。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "播放两条路径：台风从西北太平洋生成、夏秋登陆东南沿海；寒潮冬半年从西伯利亚南下。看完路径，答两道收官题。" },
                { type: "text", html: "<strong>场层真值</strong>：两条灾害路径的时段与走向（GeoBatch5.DISASTERS 冻结常量）。<strong>UI 可达</strong>：播放路径动画 → 路径判读。本图为 C 级路径示意，不画国界线。" },
                { type: "slogan", text: "看清路径，防线在前。" }
              ],
              point: "灾害路径（geo-map disaster-path，C 级）+ 收官两问。本课完成，下一单元：中国的河流。"
            }
          ]
        }
      ]
    },
    {
      id: "dg09.3",
      title: "中国的河流",
      lessons: [
        /* ============ dg09.3.1 中国的河流（3 页） ============ */
        {
          id: "dg09.3.1",
          title: "中国的河流",
          prereq: "气候与灾害",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg09.3.1-p1",
              kind: "explain",
              title: "河流：外流河与内流河",
              exploreTip: "河水最后流到哪？流入海洋的是外流河，流不进海洋的是内流河——先分类，再看特征。",
              blocks: [
                { type: "lead", text: "按最终归宿，河流分两类：外流河与内流河。分类之后，看水文特征四要素。" },
                { type: "text", html: "<strong>外流河 / 内流河</strong>：最终流入海洋的叫<strong>外流河</strong>（长江、黄河、珠江）；未能流入海洋、中途消失或注入内陆湖泊的叫<strong>内流河</strong>（塔里木河）。外流区约占全国面积 2/3。<strong>分水岭</strong>：秦岭、南岭是重要的分水岭。" },
                { type: "text", html: "<strong>水文特征四要素</strong>：<strong>流量</strong>（水量大小）、<strong>汛期</strong>（水位上涨的季节）、<strong>含沙量</strong>（泥沙多少）、<strong>结冰期</strong>（冬季是否结冰）。" },
                { type: "text", html: "<strong>塔里木河</strong>：我国最长内流河（约 2179 千米），滋养着南疆的绿洲农业。" },
                { type: "trap", text: "⚠️ 误区：“内流河不入海所以无用”——错！内流河滋养绿洲农业：塔里木河养育了南疆大片绿洲。河流的价值不只看入不入海。" },
                { type: "slogan", text: "入海不入海，先分类；四要素，看水文。" }
              ],
              point: "河流：外流河（入海）/内流河（不入海）；分水岭秦岭/南岭；水文四要素流量/汛期/含沙量/结冰期；塔里木河最长内流河（约 2179 千米）。"
            },
            /* ================= p2：交互页（内外流判读） ================= */
            {
              id: "dg09.3.1-p2",
              kind: "interact",
              title: "判一判：内流还是外流",
              exploreTip: "5 条河流，逐条判：看它最后流到哪——入海还是不入海。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "长江（注入东海）是？",
                    options: ["外流河", "内流河"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.3.1-p2a",
                    explain: "注入东海 → 外流河。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "塔里木河（中途消失在沙漠、未入海）是？",
                    options: ["外流河", "内流河"],
                    answer: 1,
                    recordKey: "geog_quiz_dg09.3.1-p2b",
                    explain: "未入海 → 内流河；但它滋养绿洲农业，并非无用。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "额尔齐斯河（流出国境，最终注入北冰洋）是？",
                    options: ["外流河", "内流河"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.3.1-p2c",
                    explain: "注入北冰洋 → 外流河。注意：外流河不一定只注入太平洋。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "黄河（注入渤海）是？",
                    options: ["外流河", "内流河"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.3.1-p2d",
                    explain: "注入渤海 → 外流河。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "判读口诀：区分内外流河看什么？",
                    options: ["看最终是否流入海洋", "看流经省份多少", "看河流长短"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.3.1-p2e",
                    explain: "分类标准只有一个：最终归宿是否入海。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "5 道判读题：前 4 条逐条判，第 5 题总结口诀。额尔齐斯河那题是陷阱——外流河不一定只注入太平洋。" },
                { type: "text", html: "<strong>场层真值</strong>：5 条河流的内外流判定（答案见各题 params.answer）。<strong>UI 可达</strong>：逐题点选 → 即时判分 + 讲解。" },
                { type: "slogan", text: "看归宿，不看长短。" }
              ],
              point: "内外流河判读 5 题（guess-verify）。场层真值见各题 answer；UI 可达为逐题判分。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg09.3.1-p3",
              kind: "interact",
              title: "收官：河流三问",
              exploreTip: "3 道题——分类、水文特征、分水岭，一题一概念。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "水文特征不包括？",
                    options: ["含沙量", "流经省份数量", "流量"],
                    answer: 1,
                    recordKey: "geog_quiz_dg09.3.1-p3a",
                    explain: "水文四要素：流量、汛期、含沙量、结冰期。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "我国重要的分水岭是？",
                    options: ["天山、阴山", "秦岭、南岭", "喜马拉雅山脉"],
                    answer: 1,
                    recordKey: "geog_quiz_dg09.3.1-p3b",
                    explain: "秦岭、南岭是我国重要的分水岭（也是 800mm 线/一月 0℃ 线经过处，dg12 回填伏笔）。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于内流河，正确的认识是？",
                    options: ["虽不入海，但滋养绿洲农业", "都是季节性河流", "不入海所以毫无价值"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.3.1-p3c",
                    explain: "塔里木河滋养南疆绿洲：价值不只看入不入海。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验分类标准、水文四要素、分水岭记牢了没有。" },
                { type: "text", html: "下一课 dg09.3.2：长江——6300 千米的黄金水道，上游水能、中下游航运，一条剖面看懂。" },
                { type: "slogan", text: "带走一句话：分类看归宿，特征看四要素。" }
              ],
              point: "dg09.3.1 完成。下一课：长江。"
            }
          ]
        },
        /* ============ dg09.3.2 长江（3 页） ============ */
        {
          id: "dg09.3.2",
          title: "长江",
          prereq: "中国的河流",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg09.3.2-p1",
              kind: "explain",
              title: "长江：黄金水道",
              exploreTip: "6300 千米，我国第一长河：上游水能滚滚，中下游船来船往——为什么同一条河，上下游命运不同？",
              blocks: [
                { type: "lead", text: "长江约 6300 千米（人教版口径），我国第一、世界第三长河。发源于青藏高原唐古拉山脉格拉丹东峰（沱沱河），注入东海。" },
                { type: "text", html: "<strong>上中下游划分</strong>：<strong>宜昌</strong>以上为上游，宜昌—<strong>湖口</strong>为中游，湖口以下为下游。上游流经山区，落差大 → <strong>水能丰富</strong>；中下游流经平原，水流平缓 → <strong>航运便利</strong>，有“<strong>黄金水道</strong>”之称。" },
                { type: "text", html: "<strong>三峡</strong>：上游的著名峡谷，建有三峡水利枢纽（防洪 + 发电）。<strong>治理</strong>：长江治理的首要任务是<strong>防洪</strong>（中下游平原）。" },
                { type: "text", html: "<strong>红线辨析①回填</strong>（dg01.3.3）：河流发育在<strong>山谷</strong>里——等高线向<strong>高处</strong>凸的地方是山谷（“凸高为谷”，GEO-R01）；<strong>河流流向与等高线凸向相反</strong>（GEO-R03）。看长江上游穿行峡谷：水往低处流，等高线却向高处凸，方向正好相反。" },
                { type: "trap", text: "⚠️ 双坑：① “长江全程可通航”——错！上游险滩多，中下游才是黄金水道。② 河流画到山脊上——错！河流只发育在山谷（凸高为谷），流向与等高线凸向相反。" },
                { type: "slogan", text: "上游水能，中下游航运；凸高为谷，流向与凸向反。" }
              ],
              point: "长江：约 6300 千米（人教版口径，我国第一、世界第三）；源唐古拉山、注入东海；宜昌/湖口分上中下游；上游水能、中下游黄金水道；三峡；治理重防洪；红线①回填：河流在山谷，流向与等高线凸向相反。"
            },
            /* ================= p2：交互页（长江干流剖面） ================= */
            {
              id: "dg09.3.2-p2",
              kind: "interact",
              title: "看剖面：长江干流",
              exploreTip: "从源头到入海口，一条剖面走完 6300 千米：看落差怎么变，水能航运在哪分段。",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-silhouette",
                    mode: "river-profile",
                    mapLevel: "C",
                    segments: [
                      { name: "上游（源头—宜昌）", feature: "流经山区、高原，落差大", value: "水能丰富；三峡水利枢纽" },
                      { name: "中游（宜昌—湖口）", feature: "流经平原，水流平缓", value: "航运价值上升；治理重防洪" },
                      { name: "下游（湖口—入海口）", feature: "江阔水深", value: "黄金水道（中下游）" }
                    ],
                    recordKey: "geog_geomap_dg09.3.2-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "拖动剖面游标，从源头走到入海口：上游段看落差有多大（水能），中下游段看江面有多宽（航运）。上中下游分界点宜昌、湖口在剖面上有标记。" },
                { type: "text", html: "<strong>场层真值</strong>：上中下游分段与特征（GeoBatch5.YANGTZE 冻结常量）。<strong>UI 可达</strong>：拖游标 → 分段特征读数。本图为 C 级剖面示意，不涉政区轮廓。" },
                { type: "slogan", text: "一剖面，三段情：落差—水能，平缓—航运。" }
              ],
              point: "长江干流剖面（geo-map river-profile，C 级）。场层真值见 GeoBatch5.YANGTZE；UI 可达为拖游标看分段特征。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg09.3.2-p3",
              kind: "interact",
              title: "收官：长江三问",
              exploreTip: "3 道题——分段、黄金水道、红线①，一题一重点。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "长江上、中游的分界点是？",
                    options: ["重庆", "湖口", "宜昌"],
                    answer: 2,
                    recordKey: "geog_quiz_dg09.3.2-p3a",
                    explain: "宜昌以上上游，宜昌—湖口中游，湖口以下下游。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "“黄金水道”指的是长江的？",
                    options: ["中下游（水流平缓、航运便利）", "全程", "上游（落差大）"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.3.2-p3b",
                    explain: "上游险滩多；中下游江阔水深 → 航运便利 → 黄金水道。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "河流流向与等高线凸向的关系是？（红线①回填）",
                    options: ["没有关系", "相同：河流顺着等高线凸向流", "相反：河流发育在山谷，等高线向高处凸"],
                    answer: 2,
                    recordKey: "geog_quiz_dg09.3.2-p3c",
                    explain: "凸高为谷（GEO-R01）：河流在山谷里，流向与等高线凸向相反（GEO-R03）。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验分段锚点、黄金水道范围、红线①关系记牢了没有。" },
                { type: "text", html: "下一课 dg09.3.3：黄河——5464 千米的“几”字形，地上河是怎么长高的。" },
                { type: "slogan", text: "带走一句话：上游看水能，中下游看航运。" }
              ],
              point: "dg09.3.2 完成。下一课：黄河。"
            }
          ]
        },
        /* ============ dg09.3.3 黄河（3 页） ============ */
        {
          id: "dg09.3.3",
          title: "黄河",
          prereq: "长江",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg09.3.3-p1",
              kind: "explain",
              title: "黄河：地上河",
              exploreTip: "河床比地面还高，河水悬在头顶——地上河是怎么长高的？又该怎么治？",
              blocks: [
                { type: "lead", text: "黄河 5464 千米，我国第二长河，呈巨大的“几”字形。发源于青藏高原巴颜喀拉山，注入渤海。" },
                { type: "text", html: "<strong>水土流失</strong>：黄河泥沙主要来自<strong>黄土高原</strong>——土质疏松 + 植被破坏 + 暴雨集中，水土流失严重。黄河<strong>含沙量世界之最</strong>，但<strong>水量不大</strong>——水量和含沙量是两回事。" },
                { type: "text", html: "<strong>地上河</strong>（河床高出两岸地面的河）：下游流经华北平原，水流平缓，泥沙淤积 → 河床不断抬高 → 在开封一带形成“地上悬河”。" },
                { type: "text", html: "<strong>治理</strong>：黄土高原<strong>治沙</strong>（植树种草、打坝淤地）+ 干流<strong>治水</strong>（小浪底水利枢纽调水调沙）+ 下游<strong>加固大堤</strong>。" },
                { type: "trap", text: "⚠️ 误区：“黄河水量大”——错！黄河水量不大，含沙量才是世界之最。记住这对反差：水少沙多，这就是黄河的脾气。" },
                { type: "slogan", text: "水少沙多，“几”字地上河；治沙治水加固堤。" }
              ],
              point: "黄河：5464 千米（我国第二）；“几”字形；源巴颜喀拉山、注入渤海；水少沙多（含沙量世界之最）；地上河（开封）；治理：黄土高原治沙+小浪底治水+加固大堤。"
            },
            /* ================= p2：交互页（地上河剖面） ================= */
            {
              id: "dg09.3.3-p2",
              kind: "interact",
              title: "看动画：地上河怎么长高",
              exploreTip: "播放泥沙淤积动画：看河床一年年抬高，怎么长成悬在地面上的河。",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-silhouette",
                    mode: "yellow-river",
                    mapLevel: "C",
                    stages: [
                      { name: "黄土高原", process: "水土流失，泥沙入河" },
                      { name: "下游（开封）", process: "水流平缓，泥沙淤积，河床抬高" },
                      { name: "地上河形成", process: "河床高出两岸地面，成悬河" },
                      { name: "治理", process: "治沙（黄土高原）+ 治水（小浪底）+ 加固大堤" }
                    ],
                    recordKey: "geog_geomap_dg09.3.3-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "四步动画：黄土高原水土流失 → 泥沙入河 → 下游淤积、河床抬高 → 地上河形成 → 三招治理。拖进度条，一步步看河床怎么长高。" },
                { type: "text", html: "<strong>场层真值</strong>：地上河形成四阶段（本页文案四阶段；动画为 widget 硬编码示意，数据源 GeoBatch5.YELLOW_RIVER）。<strong>UI 可达</strong>：播放/拖进度 → 分阶段读数。本图为 C 级剖面示意，不涉政区轮廓。" },
                { type: "slogan", text: "泥沙淤积河床高，地上悬河开封段。" }
              ],
              point: "地上河剖面动画（geo-map yellow-river，C 级）。场层真值见 GeoBatch5.YELLOW_RIVER；UI 可达为播放/拖进度看四阶段。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg09.3.3-p3",
              kind: "interact",
              title: "收官：黄河三问",
              exploreTip: "3 道题——水沙特征、地上河、治理，一题一反差。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "关于黄河的水沙特征，正确的是？",
                    options: ["水量不大，含沙量世界之最", "水量和含沙量都大", "水量大，含沙量小"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.3.3-p3a",
                    explain: "水少沙多是黄河的脾气：水量和含沙量是两回事。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "地上河主要出现在黄河的？",
                    options: ["下游（开封一带，泥沙淤积、河床抬高）", "中游（峡谷段）", "上游（落差大）"],
                    answer: 0,
                    recordKey: "geog_quiz_dg09.3.3-p3b",
                    explain: "下游华北平原：水流平缓 → 泥沙淤积 → 河床高出地面。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "黄河治理的正确组合是？",
                    options: ["只治沙不治水", "只加固大堤", "黄土高原治沙 + 小浪底治水 + 下游加固大堤"],
                    answer: 2,
                    recordKey: "geog_quiz_dg09.3.3-p3c",
                    explain: "三招组合：治沙（源头减沙）+ 治水（调水调沙）+ 加固大堤（保下游）。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验水少沙多、地上河成因、治理三招记牢了没有。" },
                { type: "text", html: "下一课 dg09.3.4：本章小结——地形、气候、河流三条线，一次串完。" },
                { type: "slogan", text: "带走一句话：水少沙多，三招治黄。" }
              ],
              point: "dg09.3.3 完成。下一课：本章小结。"
            }
          ]
        },
        /* ============ dg09.3.4 本章小结与习题（2 页） ============ */
        {
          id: "dg09.3.4",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：小结页 ================= */
            {
              id: "dg09.3.4-p1",
              kind: "explain",
              title: "小结：地形—气候—河流三条线",
              exploreTip: "一章串成三条线：地形是舞台，气候是导演，河流是演员。",
              blocks: [
                { type: "lead", text: "本章三条线：① 地形——西高东低三级阶梯，界线精确到山脉，山脉按走向记；② 气候——季风（冬西北夏东南）、降水东南多西北少、寒潮台风；③ 河流——外流/内流、水文四要素、长江黄金水道、黄河地上河。" },
                { type: "text", html: "<strong>易错清单</strong>（本章 trap 回顾）：阶梯界线模糊 ×→ 精确到山脉；山区只有劣势 ×→ 一分为二；季风 = 夏季风 ×→ 冬夏两季；季风气候全国都有 ×→ 只在东部；降水随机 ×→ 东南向西北递减；台风只有害 ×→ 利弊两面；内流河无用 ×→ 滋养绿洲；长江全程通航 ×→ 中下游；黄河水量大 ×→ 水少沙多。" },
                { type: "text", html: "<strong>红线回填登记</strong>：红线①（凸高为谷、河流流向与凸向相反）本章 dg09.3.2 回填；红线③（以温定带、以水定型）本章 dg09.2.1 回填。两条红线在本章落地，dg01/dg03 的立靶得到回音。" },
                { type: "slogan", text: "三线串一章，红线有回音。" }
              ],
              point: "dg09 小结：地形/气候/河流三条线；易错九项；红线① dg09.3.2 回填、红线③ dg09.2.1 回填（预告回音登记）。"
            },
            /* ================= p2：综合习题页 ================= */
            {
              id: "dg09.3.4-p2",
              kind: "interact",
              title: "综合习题：自然环境",
              exploreTip: "4 道综合题，覆盖地形、气候、河流三条线。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "关于我国地形，表述正确的是？",
                    options: ["西高东低一级阶梯；无明显界线", "东高西低两级阶梯；界线模糊", "西高东低三级阶梯；一二阶梯界线昆仑—祁连—横断"],
                    answer: 2,
                    recordKey: "geog_quiz_dg09.3.4-p2a",
                    explain: "三级阶梯，界线精确到山脉。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "用两步法判武汉（最冷月约 4℃，年降水约 1260mm、夏季多雨），结论是？",
                    options: ["温带大陆性气候", "亚热带季风气候", "热带雨林气候"],
                    answer: 1,
                    recordKey: "geog_quiz_dg09.3.4-p2b",
                    explain: "以温定带：4℃ 在 0–15℃ → 亚热带；以水定型：1260mm 夏季多雨 → 亚热带季风气候。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于长江与黄河，表述正确的是？",
                    options: ["长江全程可通航；黄河水量大", "长江中下游是黄金水道；黄河水少沙多、有地上河", "长江是内流河；黄河注入东海"],
                    answer: 1,
                    recordKey: "geog_quiz_dg09.3.4-p2c",
                    explain: "长江约 6300 千米（我国第一）；黄河 5464 千米（我国第二），注入渤海。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "河流与等高线的关系是？（红线①）",
                    options: ["河流发育在山脊，流向与凸向相同", "河流与等高线无关", "河流发育在山谷，流向与等高线凸向相反"],
                    answer: 2,
                    recordKey: "geog_quiz_dg09.3.4-p2d",
                    explain: "凸高为谷（GEO-R01）：河流在山谷里，流向与凸向相反（GEO-R03）。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "4 道综合题，一题一条线，外加红线①压轴。" },
                { type: "text", html: "dg09 完成。下一章 dg10：中国的自然资源——可再生与非可再生，土地、水、海洋。" },
                { type: "slogan", text: "带走一句话：地形舞台，气候导演，河流演员。" }
              ],
              point: "dg09 完成。下一章：dg10 中国的自然资源。"
            }
          ]
        }
      ]
    }
  ]
};
