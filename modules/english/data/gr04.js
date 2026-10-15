/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr04：介词
 *
 * 数据口径（M5）：window.ENG_CH["gr04"] = { id, title, units[] }，
 * 与数学 window.MATH_CH 同构；语法章节注册独立命名空间，
 * 与数学引擎、讲词根代码零交叉。
 *
 * 内容分工：规则表述=英语专家队；讲解话术=黄队；
 * 例句=语法生产A队撰写（D3 台账状态 drafted，
 * 待英语专家队初审 -> 红队终审 -> final_passed 后入库）。
 * 讲解页 blocks.type="examples" 按台账 id 引用正例；
 * 反例只进台账（rule 注 counter），页面 contrast 块内联引用。
 * 交互部件：tagging / signal-light（试点）+ sentence-builder（G3）/
 * clause-slots（G5）/ morph-dressup（G6）/ constituent-quiz（Y4）
 *（蓝队 commit 4e22ba2 补齐；G2/G4 保持降级不做）。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr04"] = {
  id: "gr04",
  title: "介词",
  /* 例句索引：键 = D3 台账例句 id（正例）；文本与台账逐字一致。 */
  sentences: {
    "gr04.1.1-e1": { en: "I was born in 2010.", zh: "我出生于 2010 年。", reg: "通用",
      tagged: [ { w: "in 2010", role: "adverb", label: "状语·in（大时段）" } ] },
    "gr04.1.1-e2": { en: "We have a meeting on Monday.", zh: "我们周一开会。", reg: "通用",
      tagged: [ { w: "on Monday", role: "adverb", label: "状语·on（具体日）" } ] },
    "gr04.1.1-e3": { en: "The class starts at 8:00.", zh: "课程八点开始。", reg: "通用",
      tagged: [ { w: "at 8:00", role: "adverb", label: "状语·at（时刻）" } ] },
    "gr04.1.1-e4": { en: "She likes swimming in summer.", zh: "她喜欢夏天游泳。", reg: "通用",
      tagged: [ { w: "in summer", role: "adverb", label: "状语·in（大时段）" } ] },
    "gr04.1.1-e5": { en: "My birthday is on May 1st.", zh: "我的生日是五月一日。", reg: "通用",
      tagged: [ { w: "on May 1st", role: "adverb", label: "状语·on（具体日）" } ] },
    "gr04.1.1-e6": { en: "We have a party at night.", zh: "我们晚上开派对。", reg: "通用",
      tagged: [ { w: "at night", role: "adverb", label: "状语·at（特例）" } ] },
    "gr04.1.2-e1": { en: "He is in the classroom.", zh: "他在教室里。", reg: "通用",
      tagged: [ { w: "in the classroom", role: "adverb", label: "状语·in（里面）" } ] },
    "gr04.1.2-e2": { en: "The book is on the desk.", zh: "书在桌子上。", reg: "通用",
      tagged: [ { w: "on the desk", role: "adverb", label: "状语·on（表面）" } ] },
    "gr04.1.2-e3": { en: "She is at school now.", zh: "她现在在学校。", reg: "通用",
      tagged: [ { w: "at school", role: "adverb", label: "状语·at（小点）" } ] },
    "gr04.1.2-e4": { en: "They are on the bus.", zh: "他们在公交车上。", reg: "通用",
      tagged: [ { w: "on the bus", role: "adverb", label: "状语·on（交通工具）" } ] },
    "gr04.1.2-e5": { en: "The cat is under the chair.", zh: "猫在椅子下面。", reg: "通用",
      tagged: [ { w: "under the chair", role: "adverb", label: "状语·under" } ] },
    "gr04.1.2-e6": { en: "He sits between Tom and Jim.", zh: "他坐在汤姆和吉姆之间。", reg: "通用",
      tagged: [ { w: "between Tom and Jim", role: "adverb", label: "状语·between" } ] },
    "gr04.1.3-e1": { en: "I look forward to seeing you.", zh: "我期待见到你。", reg: "通用",
      tagged: [ { w: "look forward to", role: "verb", label: "谓语·动词+介词" }, { w: "seeing", role: "object", label: "宾语·动名词" } ] },
    "gr04.1.3-e2": { en: "She is good at English.", zh: "她英语很好。", reg: "通用",
      tagged: [ { w: "good at", role: "complem", label: "表语·固定搭配" } ] },
    "gr04.1.3-e3": { en: "He is looking for his key.", zh: "他在找钥匙。", reg: "通用",
      tagged: [ { w: "look for", role: "verb", label: "谓语·动词+介词" } ] },
    "gr04.1.3-e4": { en: "The bank is in front of the school.", zh: "银行在学校前面。", reg: "通用",
      tagged: [ { w: "in front of the school", role: "adverb", label: "状语·介词短语" } ] },
    "gr04.1.3-e5": { en: "She takes after her mother.", zh: "她像她妈妈。", reg: "通用",
      tagged: [ { w: "takes after", role: "verb", label: "谓语·动词+介词" } ] },
    "gr04.1.3-e6": { en: "We arrived in Beijing yesterday.", zh: "我们昨天到了北京。", reg: "通用",
      tagged: [ { w: "in Beijing", role: "adverb", label: "状语" } ] },
    "gr04.1.4-e1": { en: "We have lunch at noon.", zh: "我们中午吃午饭。", reg: "通用",
      tagged: [ { w: "at noon", role: "adverb", label: "状语·at" } ] },
    "gr04.1.4-e2": { en: "The cat is on the chair.", zh: "猫在椅子上。", reg: "通用",
      tagged: [ { w: "on the chair", role: "adverb", label: "状语·on" } ] },
    "gr04.1.4-e3": { en: "She is interested in music.", zh: "她对音乐感兴趣。", reg: "通用",
      tagged: [ { w: "interested in", role: "complem", label: "表语·固定搭配" } ] },
    "gr04.1.4-e4": { en: "He was born in winter.", zh: "他出生在冬天。", reg: "通用",
      tagged: [ { w: "in winter", role: "adverb", label: "状语·in" } ] },
    "gr04.1.4-e5": { en: "They live in Shanghai.", zh: "他们住在上海。", reg: "通用",
      tagged: [ { w: "in Shanghai", role: "adverb", label: "状语·in" } ] },
  },
  units: [
    {
      id: "gr04-u1",
      title: "介词",
      lessons: [
      {
        id: "gr04.1.1",
        title: "时间介词 in/on/at",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr04.1.1-p1",
              kind: "observe",
              title: "in/on/at：时间的三种尺寸",
              point: "时间三维：in 管大（年/月/季）、on 管中（具体某天）、at 管小（时刻）——从大到小，in→on→at。",
              sentences: [
                {
                  id: "gr04.1.1-e1",
                  en: "I was born in 2010.",
                  zh: "我出生于 2010 年。",
                  reg: "通用",
                  tagged: [ { w: "in 2010", role: "adverb", label: "状语·in（大时段）" } ]
                },
                {
                  id: "gr04.1.1-e2",
                  en: "We have a meeting on Monday.",
                  zh: "我们周一开会。",
                  reg: "通用",
                  tagged: [ { w: "on Monday", role: "adverb", label: "状语·on（具体日）" } ]
                },
                {
                  id: "gr04.1.1-e3",
                  en: "The class starts at 8:00.",
                  zh: "课程八点开始。",
                  reg: "通用",
                  tagged: [ { w: "at 8:00", role: "adverb", label: "状语·at（时刻）" } ]
                }
              ],
              guess: {
                q: "in/on/at 都表示'在'，分工有什么规律？",
                options: [ "in 大（年月季节）、on 中（具体日）、at 小（时刻）", "随便用", "in 小、at 大" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作时间介词三维标注 ---------- */
            {
              id: "gr04.1.1-p2",
              kind: "interact",
              title: "三维口诀：大 in、中 on、小 at",
              exploreTip: "给词块贴标签。Monday 是具体的一天→on；8:00 是时刻→at。三维口诀：大 in、中 on、小 at。",
              point: "先看时间词是'段''天'还是'点'，再选 in/on/at。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "We",
                        role: "subject",
                        label: "主语"
                      },
                      {
                        w: "have",
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        w: "a meeting",
                        role: "object",
                        label: "宾语"
                      },
                      {
                        w: "on Monday",
                        role: "on",
                        label: "on（具体日）"
                      },
                      {
                        w: "at 8:00",
                        role: "at",
                        label: "at（时刻）"
                      }
                    ],
                    slots: [
                      {
                        role: "subject",
                        label: "主语"
                      },
                      {
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        role: "object",
                        label: "宾语"
                      },
                      {
                        role: "on",
                        label: "on（具体日）"
                      },
                      {
                        role: "at",
                        label: "at（时刻）"
                      }
                    ],
                    hint: "We have a meeting on Monday at 8:00.——Monday 是'天'穿 on，8:00 是'点'穿 at。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：时间介词三维 + 条件卡 + 反例 ---------- */
            {
              id: "gr04.1.1-p3",
              kind: "explain",
              title: "时间介词：大 in、中 on、小 at",
              lead: "还记得吗？上一页 Monday 用 on，8:00 用 at——大中小，in→on→at。",
              point: "这就是时间介词：大 in、中 on、小 at；night 用 at 特例单记。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr04.1.1-e1", "gr04.1.1-e2", "gr04.1.1-e3" ],
                  note: "先看现象：2026/Monday/8:00，三个介词三个尺寸。"
                },
                {
                  type: "idcard",
                  rule: "时间介词三维：in + 年/月/季节/大时段（in 2026, in summer）；on + 具体日（on Monday, on May 1st）；at + 时刻/节日（at 8:00, at night）。",
                  condition: "特例单记：at night（夜里）、in the morning（上午）！morning/afternoon/evening 用 in，night 用 at。"
                },
                {
                  type: "bridge",
                  zh: "汉语'在'一个字：'在周一''在八点'都用'在'，不用换。",
                  en: "英语'在'有三个尺寸：in 是大盒子（年月季），on 是日子（具体某天），at 是小点（时刻）——Monday 是'天'，穿 on；8:00 是'点'，穿 at。",
                  unbridge: "这是英语的尺寸规矩：先看时间词是'段''天'还是'点'。"
                },
                {
                  type: "contrast",
                  wrong: "We have a meeting in Monday.",
                  wrongZh: "（✗ 错句：星期用 in）",
                  right: "We have a meeting on Monday.",
                  why: "Monday 是具体的一天，用 on——in 管大时段，不管日子。"
                },
                {
                  type: "contrast",
                  wrong: "The class starts on 8:00.",
                  wrongZh: "（✗ 错句：时刻用 on）",
                  right: "The class starts at 8:00.",
                  why: "8:00 是时刻（小点），用 at——on 管日子，不管时刻。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr04.1.1-p4",
              kind: "quiz",
              title: "练一练：时间的尺寸",
              point: "自查：先看时间词——年/月/季→in，具体日→on，时刻→at。",
              questions: [
                { type: "choice", stem: "“___ Monday”选哪个介词？", options: ["in", "on", "at"], answer: 1, tip: "Monday 是具体的一天：大 in、中 on、小 at——日子用 on。" },
                { type: "choice", stem: "“___ 8:00”选哪个介词？", options: ["in", "on", "at"], answer: 2, tip: "8:00 是时刻（小点）：用 at。" },
                { type: "choice", stem: "“___ 2026”选哪个介词？", options: ["in", "on", "at"], answer: 0, tip: "年份是“大盒子”：in 2026。" },
                { type: "choice", stem: "“夜里”用哪个？", options: ["in night", "at night", "on night"], answer: 1, tip: "特例单记：at night（夜里）——night 用 at。" },
                { type: "fill", stemBefore: "We have classes", stemAfter: "the morning.（“上午”）", answer: "in", accept: ["in"], tip: "morning/afternoon/evening 用 in：in the morning。" }
              ]
            }
        ]
      },
      {
        id: "gr04.1.2",
        title: "地点介词 in/on/at",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr04.1.2-p1",
              kind: "observe",
              title: "in/on/at：地点的三种尺寸",
              point: "地点三维：in=在里面（大范围）、on=在上面（表面）、at=在点上（小地方）——和时间一样，从大到小。",
              sentences: [
                {
                  id: "gr04.1.2-e1",
                  en: "He is in the classroom.",
                  zh: "他在教室里。",
                  reg: "通用",
                  tagged: [ { w: "in the classroom", role: "adverb", label: "状语·in（里面）" } ]
                },
                {
                  id: "gr04.1.2-e2",
                  en: "The book is on the desk.",
                  zh: "书在桌子上。",
                  reg: "通用",
                  tagged: [ { w: "on the desk", role: "adverb", label: "状语·on（表面）" } ]
                },
                {
                  id: "gr04.1.2-e3",
                  en: "She is at school now.",
                  zh: "她现在在学校。",
                  reg: "通用",
                  tagged: [ { w: "at school", role: "adverb", label: "状语·at（小点）" } ]
                }
              ],
              guess: {
                q: "in/on/at 表地点时，分工和时间像不像？",
                options: [ "像：in 大（里面）、on 中（表面）、at 小（点）", "完全不像", "地点只能用 in" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作地点介词标注（表面 vs 里面） ---------- */
            {
              id: "gr04.1.2-p2",
              kind: "interact",
              title: "表面 vs 里面：on/in 的分界线",
              exploreTip: "给词块贴标签。书在桌'上面'→on。如果书在抽屉'里面'，就用 in——表面 vs 里面，是 on/in 的分界线。",
              point: "in/on 混淆王：on the desk（桌上）vs in the desk（抽屉里）——一字之差，意思全变。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "The book",
                        role: "subject",
                        label: "主语"
                      },
                      {
                        w: "is",
                        role: "verb",
                        label: "系动词"
                      },
                      {
                        w: "on the desk",
                        role: "on",
                        label: "on（表面）"
                      }
                    ],
                    slots: [
                      {
                        role: "subject",
                        label: "主语"
                      },
                      {
                        role: "verb",
                        label: "系动词"
                      },
                      {
                        role: "on",
                        label: "on=在上面"
                      }
                    ],
                    hint: "The book is on the desk.——'上面'是 on 的地盘，'里面'才是 in 的。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：地点介词三维 + 条件卡 + 反例 ---------- */
            {
              id: "gr04.1.2-p3",
              kind: "explain",
              title: "地点介词：in 里面、on 上面、at 点上",
              lead: "还记得吗？上一页书在桌'上面'用 on——表面是 on 的地盘。",
              point: "这就是地点介词：in 里面、on 上面、at 点上；交通工具 on 特例单记。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr04.1.2-e1", "gr04.1.2-e2", "gr04.1.2-e4" ],
                  note: "先看现象：里面、上面、点上。"
                },
                {
                  type: "idcard",
                  rule: "地点介词三维：in + 大范围/里面（in the classroom, in China）；on + 表面/线路（on the desk, on the bus）；at + 小点（at school, at home）。under（下）、behind（后）、between（两者之间）、among（三者以上）。",
                  condition: "on the bus/on the train（交通工具用 on）；in the car（小汽车用 in，特例）！at + 小地点，in + 大地点（at school vs in China）。"
                },
                {
                  type: "bridge",
                  zh: "汉语'在'一个字：'在桌子上''在桌子里'都用'在'，靠'上''里'区分。",
                  en: "英语把'上/里'装进介词：on the desk（在上面），in the desk（在里面，抽屉里）——in the desk 不是'在桌子上'，是'在桌肚里'！",
                  unbridge: "这是英语的空间规矩：先看'上/里/点'，再选介词。"
                },
                {
                  type: "contrast",
                  wrong: "The book is in the desk.（想说'在桌子上'）",
                  wrongZh: "（✗ 错句：in/on 混淆）",
                  right: "The book is on the desk.",
                  why: "'在桌子上'是表面，用 on——in the desk 是'在抽屉里面'，意思全变了（in/on 混淆王）。"
                },
                {
                  type: "contrast",
                  wrong: "She is on the classroom.",
                  wrongZh: "（✗ 错句：大范围用 on）",
                  right: "She is in the classroom.",
                  why: "教室是大范围（里面），用 in——on 管表面。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr04.1.2-p4",
              kind: "quiz",
              title: "练一练：上/里/点",
              point: "自查：上/里/点→on/in/at；bus/train 用 on。",
              questions: [
                { type: "choice", stem: "“The book is ___ the desk.”（在桌子上）", options: ["in", "on", "at"], answer: 1, tip: "在表面用 on：on the desk（在桌子上）。" },
                { type: "choice", stem: "“The keys are ___ the drawer.”（在抽屉里面）", options: ["in", "on", "at"], answer: 0, tip: "在里面用 in：in the drawer（在抽屉里面）——in/on 混淆王。" },
                { type: "choice", stem: "交通工具“___ the bus”选哪个？", options: ["in", "on", "at"], answer: 1, tip: "on the bus / on the train（交通工具用 on）；小汽车特例用 in：in the car。" },
                { type: "choice", stem: "下面哪句对？", options: ["at home", "on home", "in home"], answer: 0, tip: "at home 是固定搭配——home 前面用 at。" },
                { type: "choice", stem: "“在两者之间”用哪个？", options: ["among", "between", "behind"], answer: 1, tip: "between = 两者之间；among = 三者以上。" }
              ]
            }
        ]
      },
      {
        id: "gr04.1.3",
        title: "介词短语与固定搭配",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr04.1.3-p1",
              kind: "observe",
              title: "to 是'卧底'：look forward to + doing",
              point: "look forward to 的 to 是'卧底'——它长得像不定式的 to，其实是介词，后面跟 doing！",
              sentences: [
                {
                  id: "gr04.1.3-e1",
                  en: "I look forward to seeing you.",
                  zh: "我期待见到你。",
                  reg: "通用",
                  tagged: [ { w: "look forward to", role: "verb", label: "谓语·动词+介词" }, { w: "seeing", role: "object", label: "宾语·动名词" } ]
                },
                {
                  id: "gr04.1.3-e2",
                  en: "She is good at English.",
                  zh: "她英语很好。",
                  reg: "通用",
                  tagged: [ { w: "good at", role: "complem", label: "表语·固定搭配" } ]
                },
                {
                  id: "gr04.1.3-e3",
                  en: "He is looking for his key.",
                  zh: "他在找钥匙。",
                  reg: "通用",
                  tagged: [ { w: "look for", role: "verb", label: "谓语·动词+介词" } ]
                }
              ],
              guess: {
                q: "look forward to 后面跟 seeing（doing），to 在这里是什么词性？",
                options: [ "介词（所以后面跟 doing）", "动词不定式的 to（后面跟原形）", "连词" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作介词宾语标注（to 卧底） ---------- */
            {
              id: "gr04.1.3-p2",
              kind: "interact",
              title: "卧底 to：后面跟 doing",
              exploreTip: "给词块贴标签。to 是介词卧底——介词后面跟 doing（seeing），不跟原形 see。",
              point: "介词后面不跟动词原形：to 是介词还是不定式，先看它前面是谁。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "I",
                        role: "subject",
                        label: "主语"
                      },
                      {
                        w: "look forward to",
                        role: "verb-prep",
                        label: "动词+介词"
                      },
                      {
                        w: "seeing",
                        role: "gerund",
                        label: "动名词"
                      },
                      {
                        w: "you",
                        role: "object",
                        label: "宾语"
                      }
                    ],
                    slots: [
                      {
                        role: "subject",
                        label: "主语"
                      },
                      {
                        role: "verb-prep",
                        label: "look forward to（整体）"
                      },
                      {
                        role: "gerund",
                        label: "doing（介词宾语）"
                      },
                      {
                        role: "object",
                        label: "宾语"
                      }
                    ],
                    hint: "I look forward to seeing you.——to 是介词，介词后面跟 doing，不跟原形。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：介词搭配 + 条件卡 + 反例 + 词根呼应 ---------- */
            {
              id: "gr04.1.3-p3",
              kind: "explain",
              title: "介词搭配：动词+介词是固定搭档",
              lead: "还记得吗？上一页 to 是卧底介词，后面跟了 seeing——介词后面不跟动词原形。",
              point: "这就是介词搭配：动词+介词是固定搭档；to 是介词还是不定式，看前面。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr04.1.3-e1", "gr04.1.3-e3", "gr04.1.3-e4" ],
                  note: "先看现象：动词+介词固定搭档。"
                },
                {
                  type: "idcard",
                  rule: "动词+介词固定搭配：look at（看）、look for（找）、look after（照顾）、be good at（擅长）。look forward to + doing（to 是介词！）。介词短语：in front of（在…前面）、in the end（最后）。",
                  condition: "介词后面跟名词/代词/动名词，不跟动词原形。be good at 的 at 不可省（She is good at English）。arrive in + 大地点 / arrive at + 小地点。"
                },
                {
                  type: "bridge",
                  zh: "汉语'期待见到你'，'到'后面直接跟'见'，不用变形。",
                  en: "英语 look forward to 的 to 是介词，介词后面不能跟动词原形——seeing 是动名词（名词化的动词），才能当介词宾语。",
                  unbridge: "这是英语的搭配规矩：to 是介词还是不定式，先看它前面是谁。"
                },
                {
                  type: "contrast",
                  wrong: "I look forward to see you.",
                  wrongZh: "（✗ 错句：to 后用原形）",
                  right: "I look forward to seeing you.",
                  why: "to 在这里是介词（卧底），后面跟 doing——不是不定式，不能跟 see。"
                },
                {
                  type: "contrast",
                  wrong: "She is good English.",
                  wrongZh: "（✗ 错句：漏 at）",
                  right: "She is good at English.",
                  why: "be good at 是固定搭配，at 不可省——省了 at，good 没着落。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr04.1.3-p4",
              kind: "quiz",
              title: "练一练：固定搭档",
              point: "自查：to 前面是 look forward？那它是介词+doing；be good 后面跟 at。",
              questions: [
                { type: "choice", stem: "下面哪句对？", options: ["I look forward to see you.", "I look forward to seeing you.", "I look forward see you."], answer: 1, tip: "to 在这里是介词（卧底），后面跟 doing——不是不定式。" },
                { type: "choice", stem: "“She is ___ English.”（擅长英语）", options: ["good", "good at", "good for"], answer: 1, tip: "be good at 是固定搭配：at 不可省——She is good at English。" },
                { type: "choice", stem: "“look after”的意思是？", options: ["看", "找", "照顾"], answer: 2, tip: "look 三兄弟：look at（看）、look for（找）、look after（照顾）——单记。" },
                { type: "fill", stemBefore: "They look", stemAfter: "the lost key.（“寻找”）", answer: "for", accept: ["for"], tip: "look for = 寻找：动词 + 介词是固定搭档。" },
                { type: "choice", stem: "介词后面不能直接跟？", options: ["名词", "动名词", "动词原形"], answer: 2, tip: "介词后面跟名词/代词/动名词，不跟动词原形。" }
              ]
            }
        ]
      },
      {
        id: "gr04.1.4",
        title: "本章小结与习题",
        pages: [
            /* ---------- p1 讲解页：本章小结（三维 + 搭配 + 自查三问） ---------- */
            {
              id: "gr04.1.4-p1",
              kind: "explain",
              title: "本章小结：时空三维 + 固定搭档",
              lead: "三课学完了——in/on/at 是时空三维，搭配是固定搭档。",
              point: "这就是本章：时空三维 in/on/at，搭配固定，to 看前面。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr04.1.4-e1", "gr04.1.4-e2", "gr04.1.4-e3" ],
                  note: "先看现象：三维 + 搭配。"
                },
                {
                  type: "idcard",
                  rule: "时间三维：in 大（年月季）/on 中（具体日）/at 小（时刻）；地点三维：in 里面/on 上面/at 点上。固定搭配：动词+介词（look for/at/after）、be good at、look forward to+doing、介词短语（in front of）。",
                  condition: "自查三问：时间词是段/天/点？（定 in/on/at）地点是里/上/点？（定 in/on/at）to 前面是谁？（定介词还是不定式）"
                },
                {
                  type: "contrast",
                  wrong: "She is on home.",
                  wrongZh: "（✗ 错句：home 用 on）",
                  right: "She is at home.",
                  why: "at home 是固定搭配——home 前面用 at，不用 on。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p2 练习页：本章综合（含改错题） ---------- */
            {
              id: "gr04.1.4-p2",
              kind: "quiz",
              title: "本章综合练",
              point: "本章自查三问：段/天/点？里/上/点？to 前面是谁？",
              questions: [
                { type: "choice", stem: "“We have a meeting ___ Monday.”", options: ["in", "on", "at"], answer: 1, tip: "星期用 on：on Monday（中 on）。" },
                { type: "choice", stem: "“The class starts ___ 8:00.”", options: ["in", "on", "at"], answer: 2, tip: "时刻用 at：at 8:00（小 at）。" },
                { type: "choice", stem: "下面哪句对？", options: ["She is on home.", "She is at home.", "She is in home."], answer: 1, tip: "at home 固定搭配——home 前用 at。" },
                { type: "choice", stem: "下面哪句对？", options: ["I look forward to see you.", "I look forward to seeing you.", "She is good English."], answer: 1, tip: "to 是介词（卧底）→ 跟 doing；be good at 的 at 不可省。" },
                { type: "fill", stemBefore: "The book is", stemAfter: "the desk.（“在桌子上”）", answer: "on", accept: ["on"], tip: "在表面用 on：on the desk。" }
              ]
            }
        ]
      }
      ]
    }
  ]
};
