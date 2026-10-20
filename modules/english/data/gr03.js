/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr03：形容词与副词
 *
 * 数据口径（M5）：window.ENG_CH["gr03"] = { id, title, units[] }，
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
window.ENG_CH["gr03"] = {
  id: "gr03",
  title: "形容词与副词",
  /* 例句索引：键 = D3 台账例句 id（正例）；文本与台账逐字一致。 */
  sentences: {
    "gr03.1.1-e1": { en: "It is an interesting book.", zh: "这是一本有趣的书。", reg: "通用",
      tagged: [ { w: "interesting", role: "attrib", label: "定语·形容词" }, { w: "book", role: "complem", label: "表语·名词" } ] },
    "gr03.1.1-e2": { en: "The book is interesting.", zh: "这本书很有趣。", reg: "通用",
      tagged: [ { w: "interesting", role: "complem", label: "表语·形容词" } ] },
    "gr03.1.1-e3": { en: "I have something important to tell you.", zh: "我有重要的事要告诉你。", reg: "通用",
      tagged: [ { w: "something", role: "object", label: "宾语·不定代词" }, { w: "important", role: "attrib", label: "定语·后置" } ] },
    "gr03.1.1-e4": { en: "She is a good student.", zh: "她是个好学生。", reg: "通用",
      tagged: [ { w: "good", role: "attrib", label: "定语·形容词" } ] },
    "gr03.1.1-e5": { en: "The tall building is new.", zh: "那栋高楼是新的。", reg: "通用",
      tagged: [ { w: "tall", role: "attrib", label: "定语·形容词" }, { w: "new", role: "complem", label: "表语·形容词" } ] },
    "gr03.1.2-e1": { en: "He speaks English well.", zh: "他英语说得好。", reg: "通用",
      tagged: [ { w: "speaks", role: "verb", label: "谓语" }, { w: "well", role: "adverb", label: "状语·副词" } ] },
    "gr03.1.2-e2": { en: "She runs quickly.", zh: "她跑得快。", reg: "通用",
      tagged: [ { w: "runs", role: "verb", label: "谓语" }, { w: "quickly", role: "adverb", label: "状语·副词" } ] },
    "gr03.1.2-e3": { en: "The train arrived late.", zh: "火车晚点了。", reg: "通用",
      tagged: [ { w: "late", role: "adverb", label: "状语·副词" } ] },
    "gr03.1.2-e4": { en: "He works hard.", zh: "他工作努力。", reg: "通用",
      tagged: [ { w: "hard", role: "adverb", label: "状语·副词" } ] },
    "gr03.1.2-e5": { en: "She is very happy.", zh: "她很开心。", reg: "通用",
      tagged: [ { w: "very", role: "adverb", label: "状语·副词" }, { w: "happy", role: "complem", label: "表语·形容词" } ] },
    "gr03.1.2-e6": { en: "He hardly knows her.", zh: "他几乎不认识她。", reg: "通用",
      tagged: [ { w: "hardly", role: "adverb", label: "状语·副词" } ] },
    "gr03.1.2-e7": { en: "The bus goes fast.", zh: "公交车开得快。", reg: "通用",
      tagged: [ { w: "fast", role: "adverb", label: "状语·副词" } ] },
    "gr03.1.3-e1": { en: "Tom is taller than Jim.", zh: "汤姆比吉姆高。", reg: "通用",
      tagged: [ { w: "taller", role: "complem", label: "表语·比较级" }, { w: "than Jim", role: "adverb", label: "状语·比较对象" } ] },
    "gr03.1.3-e2": { en: "She is the tallest in her class.", zh: "她是班里最高的。", reg: "通用",
      tagged: [ { w: "tallest", role: "complem", label: "表语·最高级" } ] },
    "gr03.1.3-e3": { en: "This book is more interesting than that one.", zh: "这本书比那本有意思。", reg: "通用",
      tagged: [ { w: "more interesting", role: "complem", label: "表语·比较级" } ] },
    "gr03.1.3-e4": { en: "He is the best student.", zh: "他是最好的学生。", reg: "通用",
      tagged: [ { w: "best", role: "attrib", label: "定语·最高级" } ] },
    "gr03.1.3-e5": { en: "My bag is bigger than yours.", zh: "我的包比你的大。", reg: "通用",
      tagged: [ { w: "bigger", role: "complem", label: "表语·比较级" } ] },
    "gr03.1.3-e6": { en: "It is the most beautiful park.", zh: "这是最美的公园。", reg: "通用",
      tagged: [ { w: "most beautiful", role: "attrib", label: "定语·最高级" } ] },
    "gr03.2.1-e1": { en: "She is as tall as her mother.", zh: "她和她妈妈一样高。", reg: "通用",
      tagged: [ { w: "as tall as", role: "adverb", label: "状语·同级比较" }, { w: "her mother", role: "object", label: "比较对象" } ] },
    "gr03.2.1-e2": { en: "This box is twice as big as that one.", zh: "这个盒子是那个的两倍大。", reg: "通用",
      tagged: [ { w: "twice as big as", role: "adverb", label: "状语·倍数比较" } ] },
    "gr03.2.1-e3": { en: "The more you read, the more you know.", zh: "你读得越多，知道得越多。", reg: "通用",
      tagged: [ { w: "The more", role: "adverb", label: "状语·比较级" }, { w: "the more", role: "adverb", label: "状语·比较级" } ] },
    "gr03.2.1-e4": { en: "He is not so tall as his brother.", zh: "他不如他哥哥高。", reg: "通用",
      tagged: [ { w: "not so tall as", role: "adverb", label: "状语·同级比较否定" } ] },
    "gr03.2.1-e5": { en: "Tom runs faster than Jim.", zh: "汤姆比吉姆跑得快。", reg: "通用",
      tagged: [ { w: "faster", role: "adverb", label: "状语·比较级" }, { w: "than Jim", role: "adverb", label: "状语·比较对象" } ] },
    "gr03.2.1-e6": { en: "This rope is three times as long as that one.", zh: "这根绳子是那根的三倍长。", reg: "通用",
      tagged: [ { w: "three times as long as", role: "adverb", label: "状语·倍数比较" } ] },
    "gr03.2.2-e1": { en: "He runs quickly.", zh: "他跑得快。", reg: "通用",
      tagged: [ { w: "quickly", role: "adverb", label: "状语·副词" } ] },
    "gr03.2.2-e2": { en: "She is a kind teacher.", zh: "她是一位和蔼的老师。", reg: "通用",
      tagged: [ { w: "kind", role: "attrib", label: "定语·形容词" } ] },
    "gr03.2.2-e3": { en: "This is the most interesting book.", zh: "这是最有意思的书。", reg: "通用",
      tagged: [ { w: "most interesting", role: "attrib", label: "定语·最高级" } ] },
    "gr03.2.2-e4": { en: "He is as tall as me.", zh: "他和我一样高。", reg: "通用",
      tagged: [ { w: "as tall as", role: "adverb", label: "状语·同级比较" } ] },
    "gr03.2.2-e5": { en: "They arrived early.", zh: "他们到得很早。", reg: "通用",
      tagged: [ { w: "early", role: "adverb", label: "状语·副词" } ] },
  },
  units: [
    {
      id: "gr03-u1",
      title: "形容词与副词的基本功",
      lessons: [
      {
        id: "gr03.1.1",
        title: "形容词的位置",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr03.1.1-p1",
              kind: "observe",
              title: "interesting 的三个站位",
              point: "形容词是'装修队'：装修名词站前面（定语），说明主语站系动词后（表语），装修不定代词站后面（后置定语）。",
              sentences: [
                {
                  id: "gr03.1.1-e1",
                  en: "It is an interesting book.",
                  zh: "这是一本有趣的书。",
                  reg: "通用",
                  tagged: [ { w: "interesting", role: "attrib", label: "定语·形容词" }, { w: "book", role: "complem", label: "表语·名词" } ]
                },
                {
                  id: "gr03.1.1-e2",
                  en: "The book is interesting.",
                  zh: "这本书很有趣。",
                  reg: "通用",
                  tagged: [ { w: "interesting", role: "complem", label: "表语·形容词" } ]
                },
                {
                  id: "gr03.1.1-e3",
                  en: "I have something important to tell you.",
                  zh: "我有重要的事要告诉你。",
                  reg: "通用",
                  tagged: [ { w: "something", role: "object", label: "宾语·不定代词" }, { w: "important", role: "attrib", label: "定语·后置" } ]
                }
              ],
              guess: {
                q: "interesting 在三句话里分别站在哪？都修饰谁？",
                options: [ "第一句站名词前，第二句站系动词后，第三句站不定代词后", "都在名词前", "都在动词后" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G3 句型积木 SVP（表语岗位） ---------- */
            {
              id: "gr03.1.1-p2",
              kind: "interact",
              title: "拼 S+V+P：形容词的第二个岗位",
              exploreTip: "拼出 The book is interesting.（S+V+P）。interesting 是表语，说明主语 The book 怎么样。",
              point: "形容词两大岗位：定语（名词前）+ 表语（系动词后）——都不碰动词。",
              widgets: [
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVP",
                    blocks: [
                      {
                        w: "The book",
                        role: "subject"
                      },
                      {
                        w: "is",
                        role: "verb"
                      },
                      {
                        w: "interesting",
                        role: "complem"
                      }
                    ],
                    hint: "interesting 放进表语槽：系动词 is 后面跟表语，说明主语怎么样。",
                    doneNote: "拼好了！interesting 作表语——形容词的第二个岗位。第一个岗位是定语（an interesting book）。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：形容词位置 + 条件卡 + 反例 + 词根呼应 ---------- */
            {
              id: "gr03.1.1-p3",
              kind: "explain",
              title: "形容词的位置：定语前置，表语跟系动词",
              lead: "还记得吗？上一页 interesting 站在 is 后面当表语——形容词的第二个岗位。",
              point: "这就是形容词的位置：定语前置、表语跟系动词；形容词不修饰动词。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr03.1.1-e1", "gr03.1.1-e2", "gr03.1.1-e3" ],
                  note: "先看现象：三个站位。"
                },
                {
                  type: "idcard",
                  rule: "形容词两个主岗：定语（修饰名词，多前置：an interesting book）、表语（系动词后：The book is interesting）。不定代词（something/anything）后的形容词后置：something wrong。",
                  condition: "形容词只装修名词（和代词），不装修动词——修饰动词用副词（He runs quickly）。very 修饰形容词/副词，不修饰动词。"
                },
                {
                  type: "bridge",
                  zh: "汉语'有趣的书''书很有趣'，'有趣'位置灵活，位置不是问题。",
                  en: "英语形容词有'岗位制'：装修名词站前面（an interesting book），说明主语站 is 后面（is interesting）——站错岗（He runs quick）就错了。",
                  unbridge: "这是英语的岗位规矩：形容词装修名词，不装修动词。"
                },
                {
                  type: "contrast",
                  wrong: "He runs quick.",
                  wrongZh: "（✗ 错句：形容词修饰动词）",
                  right: "He runs quickly.",
                  why: "quick 是形容词，装修错了地方——'跑得快'是装修'跑'（动词），要用副词 quickly。"
                },
                {
                  type: "contrast",
                  wrong: "She very likes apples.",
                  wrongZh: "（✗ 错句：very 修饰动词）",
                  right: "She likes apples very much.",
                  why: "very 不能修饰动词——表程度用 very much 放句尾。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr03.1.1-p4",
              kind: "quiz",
              title: "练一练：谁装修谁？",
              point: "自查：修饰名词用形容词，修饰动词用副词；very 不碰动词。",
              questions: [
                { type: "choice", stem: "“an interesting book”中 interesting 是什么成分？", options: ["定语（站在名词前）", "表语", "状语"], answer: 0, tip: "形容词装修名词站前面：an interesting book——定语前置。" },
                { type: "choice", stem: "“The book is interesting.”中 interesting 是什么成分？", options: ["定语", "表语（站在系动词后）", "宾语"], answer: 1, tip: "说明主语“怎么样”，站在 is 后面——表语跟系动词。" },
                { type: "choice", stem: "下面哪句对？", options: ["He runs quick.", "He runs quickly.", "He quick runs."], answer: 1, tip: "“跑得快”装修的是“跑”（动词）——形容词不装修动词，要用副词 quickly。" },
                { type: "choice", stem: "下面哪句对？", options: ["She very likes apples.", "She likes apples very much.", "Very she likes apples."], answer: 1, tip: "very 修饰形容词/副词，不修饰动词——“很喜欢”用 like…very much。" },
                { type: "fill", stemBefore: "something", stemAfter: "（“错的”；不定代词后的形容词）", answer: "wrong", accept: ["wrong"], tip: "特例单记：something/anything 后的形容词后置——something wrong。" }
              ]
            }
        ]
      },
      {
        id: "gr03.1.2",
        title: "副词的位置与 -ly",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr03.1.2-p1",
              kind: "observe",
              title: "well、hard、hardly：三个副词三种长相",
              point: "-ly 是副词的'常装'，但 hard/fast/late 天生就是副词不穿 -ly；hardly 是'卧底'（几乎不）。",
              sentences: [
                {
                  id: "gr03.1.2-e1",
                  en: "He speaks English well.",
                  zh: "他英语说得好。",
                  reg: "通用",
                  tagged: [ { w: "speaks", role: "verb", label: "谓语" }, { w: "well", role: "adverb", label: "状语·副词" } ]
                },
                {
                  id: "gr03.1.2-e4",
                  en: "He works hard.",
                  zh: "他工作努力。",
                  reg: "通用",
                  tagged: [ { w: "hard", role: "adverb", label: "状语·副词" } ]
                },
                {
                  id: "gr03.1.2-e6",
                  en: "He hardly knows her.",
                  zh: "他几乎不认识她。",
                  reg: "通用",
                  tagged: [ { w: "hardly", role: "adverb", label: "状语·副词" } ]
                }
              ],
              guess: {
                q: "well、hard、hardly——它们都是副词，但长得完全不一样，规律是什么？",
                options: [ "good→well 特例；hard 本来就是副词；hardly=几乎不，是陷阱", "都加了 -ly", "没有规律" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作副词修饰对象标注 ---------- */
            {
              id: "gr03.1.2-p2",
              kind: "interact",
              title: "well 装修的是谁？",
              exploreTip: "给词块贴标签。well 修饰 speaks（动词）——副词装修动词。注意：good 的副词是 well，没有 goodly！",
              point: "副词三岗：修饰动词（well）、修饰形容词（very happy）、修饰副词——先看它装修谁。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "He",
                        role: "subject",
                        label: "主语"
                      },
                      {
                        w: "speaks",
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        w: "English",
                        role: "object",
                        label: "宾语"
                      },
                      {
                        w: "well",
                        role: "adverb",
                        label: "副词"
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
                        role: "adverb",
                        label: "副词（修饰动词）"
                      }
                    ],
                    hint: "He speaks English well.——well 装修 speaks（动词），不是 English。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：副词 -ly + 条件卡 + 卧底表 ---------- */
            {
              id: "gr03.1.2-p3",
              kind: "explain",
              title: "副词：-ly 常装，特例与卧底单记",
              lead: "He works hard. 里 hard 无 -ly；hardly 却是'几乎不'——谁是卧底？",
              point: "这就是副词：-ly 常装，fast/hard/late 免穿，hardly 是卧底（几乎不）。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr03.1.2-e1", "gr03.1.2-e4", "gr03.1.2-e6" ],
                  note: "先看现象：-ly 常装、免 -ly 特例、hardly 卧底。"
                },
                {
                  type: "idcard",
                  rule: "副词三个岗位：修饰动词（runs quickly）、修饰形容词（very happy）、修饰副词（quite well）。-ly 构成：quick→quickly；y 变 i（happy→happily）。",
                  condition: "免 -ly 特例：fast/hard/late/long（本身就是副词）。hardly=几乎不（≠努力地）！good→well，无 goodly。friendly 是形容词（卧底）！"
                },
                {
                  type: "spell",
                  title: "-ly 穿衣规律 + 卧底表：",
                  items: [
                    "一般直接加 -ly：quick→quickly",
                    "以 y 结尾：去 y 变 i 加 -ly：happy→happily",
                    "以 -le 结尾：去 e 加 y：gentle→gently",
                    "免 -ly 特例：fast、hard、late、long（本身就是副词）",
                    "卧底警报：hardly=几乎不（不是'努力地'）；friendly 是形容词！"
                  ]
                },
                {
                  type: "bridge",
                  zh: "汉语'快''努力'作状语不用变形，'他跑得快'的'快'和'快车'的'快'一个样。",
                  en: "英语副词多穿 -ly 制服（quickly），但 fast/hard/late 拒绝穿制服——它们本身就是副词。hardly 更是卧底：看起来像'努力地'，其实是'几乎不'。",
                  unbridge: "这是英语的制服规矩：-ly 是常装，特例和卧底单记。"
                },
                {
                  type: "contrast",
                  wrong: "He works hardly.（想说'他工作努力'）",
                  wrongZh: "（✗ 错句：hardly=几乎不）",
                  right: "He works hard.",
                  why: "hardly=几乎不！想说'努力地'，用 hard——hard 本身就是副词，不穿 -ly。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr03.1.2-p4",
              kind: "quiz",
              title: "练一练：-ly 穿对了吗？",
              point: "自查：修饰动词/形容词用副词；hardly=几乎不；friendly 是形容词。",
              questions: [
                { type: "choice", stem: "“happy”的副词形式是？", options: ["happyly", "happily", "happys"], answer: 1, tip: "以 y 结尾：去 y 变 i 加 -ly——happily。" },
                { type: "choice", stem: "下面哪句对？", options: ["He runs fastly.", "He runs fast.", "He fast runs."], answer: 1, tip: "fast 本身就是副词，拒绝穿 -ly 制服——He runs fast。" },
                { type: "choice", stem: "“hardly”的意思是？", options: ["努力地", "几乎不", "非常"], answer: 1, tip: "hardly 是卧底：看起来像“努力地”，其实是“几乎不”。" },
                { type: "choice", stem: "“good”的副词形式是？", options: ["goodly", "well", "gooder"], answer: 1, tip: "特例单记：good → well，没有 goodly。" },
                { type: "choice", stem: "“friendly”是？", options: ["副词", "形容词", "动词"], answer: 1, tip: "卧底警报：friendly 长得像副词，其实是形容词（a friendly teacher）。" }
              ]
            }
        ]
      },
      {
        id: "gr03.1.3",
        title: "比较级与最高级",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr03.1.3-p1",
              kind: "observe",
              title: "'更'和'最'长什么样？",
              point: "比较级是'更'（-er/more），最高级是'最'（-est/most+the）——'更'只能有一个，'最'前面有 the。",
              sentences: [
                {
                  id: "gr03.1.3-e1",
                  en: "Tom is taller than Jim.",
                  zh: "汤姆比吉姆高。",
                  reg: "通用",
                  tagged: [ { w: "taller", role: "complem", label: "表语·比较级" }, { w: "than Jim", role: "adverb", label: "状语·比较对象" } ]
                },
                {
                  id: "gr03.1.3-e2",
                  en: "She is the tallest in her class.",
                  zh: "她是班里最高的。",
                  reg: "通用",
                  tagged: [ { w: "tallest", role: "complem", label: "表语·最高级" } ]
                },
                {
                  id: "gr03.1.3-e4",
                  en: "He is the best student.",
                  zh: "他是最好的学生。",
                  reg: "通用",
                  tagged: [ { w: "best", role: "attrib", label: "定语·最高级" } ]
                }
              ],
              guess: {
                q: "taller、tallest、best——比较级和最高级分别长什么样？",
                options: [ "比较级 -er/more，最高级 -est/most（+the）", "都加 -er", "没有规律" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作比较级成分标注 ---------- */
            {
              id: "gr03.1.3-p2",
              kind: "interact",
              title: "taller + than Jim：固定搭档",
              exploreTip: "给词块贴标签。taller 是比较级（更），than Jim 是比较对象——'比'字句的英语版。",
              point: "than 是'比'字：比较级+than，一个不能少。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "Tom",
                        role: "subject",
                        label: "主语"
                      },
                      {
                        w: "is",
                        role: "verb",
                        label: "系动词"
                      },
                      {
                        w: "taller",
                        role: "comp",
                        label: "比较级"
                      },
                      {
                        w: "than Jim",
                        role: "adverb",
                        label: "比较状语"
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
                        role: "comp",
                        label: "比较级（-er·更）"
                      },
                      {
                        role: "adverb",
                        label: "比较状语（than…）"
                      }
                    ],
                    hint: "Tom is taller than Jim.——比较级后面跟 than（比），是固定搭档。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：比较级/最高级变形 + 条件卡 + 反例 ---------- */
            {
              id: "gr03.1.3-p3",
              kind: "explain",
              title: "比较级与最高级：'更'一次，'最'加 the",
              lead: "先看一眼上一页的结论：比较级+than，一个不能少。这一页把它用在最高级上：-est/most 表'最'，前面加 the。",
              point: "这就是比较级与最高级：-er/more 表'更'，-est/most+the 表'最'；不规则单记。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr03.1.3-e1", "gr03.1.3-e2", "gr03.1.3-e4" ],
                  note: "先看现象：-er/-est、more/most、不规则三兄弟。"
                },
                {
                  type: "idcard",
                  rule: "比较级（更）：单音节/部分双音节加 -er（taller）；多音节用 more（more interesting）；不规则 good→better→best，bad→worse→worst。最高级（最）：-est/most，前面加 the。",
                  condition: "双重比较禁止：more taller ✗。最高级前多用 the（the tallest）。much/a little 修饰比较级（much taller 高得多）。"
                },
                {
                  type: "spell",
                  title: "比较级/最高级变形规律：",
                  items: [
                    "一般加 -er/-est：tall→taller→tallest",
                    "以 e 结尾：只加 -r/-st：nice→nicer→nicest",
                    "辅音+y：去 y 变 i：happy→happier→happiest",
                    "重读闭音节双写：big→bigger→biggest",
                    "多音节用 more/most：interesting→more interesting→most interesting",
                    "不规则单记：good→better→best；bad→worse→worst；many→more→most"
                  ]
                },
                {
                  type: "bridge",
                  zh: "汉语'更高''最高'靠'更''最'，形容词本身不变。",
                  en: "英语把'更''最'缝进单词里：tall→taller（更）→tallest（最）——'更'只能缝一次，more taller 就是'更更'，错了。",
                  unbridge: "这是英语的变形规矩：'更'一次，'最'加 the。"
                },
                {
                  type: "contrast",
                  wrong: "He is more taller than me.",
                  wrongZh: "（✗ 错句：双重比较）",
                  right: "He is taller than me.",
                  why: "more taller 是'更更'——比较级只能有一个'更'。"
                },
                {
                  type: "contrast",
                  wrong: "She is tallest in her class.",
                  wrongZh: "（✗ 错句：最高级漏 the）",
                  right: "She is the tallest in her class.",
                  why: "最高级前面加 the——'最'是特指（就是那个最高的）。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr03.1.3-p4",
              kind: "quiz",
              title: "练一练：'更'和'最'",
              point: "自查：than 配比较级；最高级配 the；more 和 -er 只留一个。",
              questions: [
                { type: "choice", stem: "“tall”的比较级是？", options: ["more tall", "taller", "tallest"], answer: 1, tip: "单音节加 -er：tall → taller（更）→ tallest（最）。" },
                { type: "choice", stem: "“interesting”的比较级是？", options: ["interestinger", "more interesting", "most interesting"], answer: 1, tip: "多音节用 more：more interesting（更有趣）。" },
                { type: "choice", stem: "“good”的最高级是？", options: ["goodest", "better", "best"], answer: 2, tip: "不规则单记：good → better → best。" },
                { type: "choice", stem: "下面哪句对？", options: ["more taller", "much taller", "most taller"], answer: 1, tip: "双重比较禁止：more taller 是两个“更”——用 much 修饰（高得多）。" },
                { type: "fill", stemBefore: "He is", stemAfter: "tallest in our class.（最高级前加）", answer: "the", accept: ["the"], tip: "最高级前面多用 the：the tallest（最高的）。" }
              ]
            }
        ]
      }
      ]
    },
    {
      id: "gr03-u2",
      title: "比较句型",
      lessons: [
      {
        id: "gr03.2.1",
        title: "比较句型全家福",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr03.2.1-p1",
              kind: "observe",
              title: "比较句型全家福：一样、更、越…越…、几倍",
              point: "比较句型全家福：as…as（一样）、比较级+than（更）、the…the…（越…越…）、倍数（几倍）。",
              sentences: [
                {
                  id: "gr03.2.1-e1",
                  en: "She is as tall as her mother.",
                  zh: "她和她妈妈一样高。",
                  reg: "通用",
                  tagged: [ { w: "as tall as", role: "adverb", label: "状语·同级比较" }, { w: "her mother", role: "object", label: "比较对象" } ]
                },
                {
                  id: "gr03.2.1-e3",
                  en: "The more you read, the more you know.",
                  zh: "你读得越多，知道得越多。",
                  reg: "通用",
                  tagged: [ { w: "The more", role: "adverb", label: "状语·比较级" }, { w: "the more", role: "adverb", label: "状语·比较级" } ]
                },
                {
                  id: "gr03.2.1-e2",
                  en: "This box is twice as big as that one.",
                  zh: "这个盒子是那个的两倍大。",
                  reg: "通用",
                  tagged: [ { w: "twice as big as", role: "adverb", label: "状语·倍数比较" } ]
                }
              ],
              guess: {
                q: "as…as、the…the…、twice as…as——它们都在比什么？",
                options: [ "as…as 比'一样'，the…the… 比'越…越…'，twice as…as 比倍数", "都在比'更'", "没有区别" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作 as…as 结构标注 ---------- */
            {
              id: "gr03.2.1-p2",
              kind: "interact",
              title: "as…as：中间用原级",
              exploreTip: "给词块贴标签。as tall as 是'一样高'——as…as 中间用原级 tall，不能用 taller。",
              point: "'一样'不用比较级：as…as 中间永远是原级。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "She",
                        role: "subject",
                        label: "主语"
                      },
                      {
                        w: "is",
                        role: "verb",
                        label: "系动词"
                      },
                      {
                        w: "as tall as",
                        role: "as",
                        label: "同级比较"
                      },
                      {
                        w: "her mother",
                        role: "object",
                        label: "比较对象"
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
                        role: "as",
                        label: "as…as（一样·原级）"
                      },
                      {
                        role: "object",
                        label: "比较对象"
                      }
                    ],
                    hint: "She is as tall as her mother.——as…as 中间是原级 tall（一样），不是比较级。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：比较句型四件套 + 条件卡 + 反例 ---------- */
            {
              id: "gr03.2.1-p3",
              kind: "explain",
              title: "比较句型全家福：一样、更、越…越…、倍数",
              lead: "比较句型全家福：as…as、比较级+than、the…the…、倍数。'一样'中间是原级。",
              point: "这就是比较句型全家福：as…as 一样，than 更，the…the… 越…越…，twice as…as 两倍。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr03.2.1-e1", "gr03.2.1-e3", "gr03.2.1-e2" ],
                  note: "先看现象：一样、越…越…、几倍大。"
                },
                {
                  type: "idcard",
                  rule: "比较句型四件套：as…as（一样…，中间原级）；比较级+than（比…更）；the+比较级…，the+比较级…（越…越…）；倍数 + as…as（twice as big as 两倍大）。",
                  condition: "as…as 否定：not as…as（书面）/ not so…as（口语）。倍数表达也可用'倍数+比较级+than'（three times bigger than），但 as…as 版更稳。"
                },
                {
                  type: "bridge",
                  zh: "汉语'和…一样高''越…越…''两倍大'，结构固定，母语者不觉得难。",
                  en: "英语每种比较一个句型：一样=as…as，越…越…=the…the…（The more you read, the more you know），两倍=twice as…as——句型即意思。",
                  unbridge: "这是英语的句型规矩：想表达哪种比，就用哪种句型。"
                },
                {
                  type: "contrast",
                  wrong: "He is taller his brother.",
                  wrongZh: "（✗ 错句：漏 than）",
                  right: "He is taller than his brother.",
                  why: "'比…更'不能漏 than——than 是'比'字，不能省。"
                },
                {
                  type: "contrast",
                  wrong: "She is as taller as her mother.",
                  wrongZh: "（✗ 错句：as…as 用比较级）",
                  right: "She is as tall as her mother.",
                  why: "as…as 中间用原级（一样），用比较级就乱了。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr03.2.1-p4",
              kind: "quiz",
              title: "练一练：哪种比？",
              point: "自查：一样→as…as；更→than；越…越…→the…the…；倍数→twice as…as。",
              questions: [
                { type: "choice", stem: "下面哪句对？", options: ["He is taller his brother.", "He is taller than his brother.", "He is as taller as his brother."], answer: 1, tip: "“比…更”不能漏 than——than 是“比”字，不能省；as…as 中间用原级。" },
                { type: "choice", stem: "“as…as（一样…）”中间用什么形式？", options: ["比较级", "原级", "最高级"], answer: 1, tip: "as tall as：中间是原级 tall——“一样”不用比较级。" },
                { type: "choice", stem: "“The more you read, the more you know.”是什么句型？", options: ["越…越…", "一样…", "两倍…"], answer: 0, tip: "the + 比较级…，the + 比较级… = 越…越…。" },
                { type: "fill", stemBefore: "This box is twice", stemAfter: "big as that one.（“两倍大”）", answer: "as", accept: ["as"], tip: "倍数 + as…as：twice as big as（两倍大）。" },
                { type: "choice", stem: "下面哪句对？", options: ["She is as taller as her mother.", "She is as tall as her mother.", "She is so tall than her mother."], answer: 1, tip: "as…as 中间原级：as tall as（和…一样高）。" }
              ]
            }
        ]
      },
      {
        id: "gr03.2.2",
        title: "本章小结与习题",
        pages: [
            /* ---------- p1 讲解页：本章小结（总表 + 自查三问） ---------- */
            {
              id: "gr03.2.2-p1",
              kind: "explain",
              title: "本章小结：谁装修谁？",
              lead: "两课学完了——形容词装修名词，副词装修动词/形容词，比较级管'比'。",
              point: "这就是本章：形容词装修名词，副词装修动词；比较级一个'更'，最高级加 the。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr03.2.2-e1", "gr03.2.2-e2", "gr03.2.2-e3" ],
                  note: "先看现象：谁装修谁。"
                },
                {
                  type: "idcard",
                  rule: "形容词：定语前置、表语跟系动词、不装修动词。副词：修饰动词/形容词/副词；-ly 常装，fast/hard/late 免穿，hardly=几乎不。比较：-er/more 更，-est/most+the 最；as…as 一样，than 更，the…the… 越…越…。",
                  condition: "自查三问：修饰的是名词还是动词？（定词性）比较级有几个'更'？（防双重）最高级加 the 了吗？"
                },
                {
                  type: "contrast",
                  wrong: "She sings beautiful.",
                  wrongZh: "（✗ 错句：形容词修饰动词）",
                  right: "She sings beautifully.",
                  why: "sings 是动词，修饰它用副词 beautifully——形容词 beautiful 装修错了地方。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p2 练习页：本章综合（含改错题） ---------- */
            {
              id: "gr03.2.2-p2",
              kind: "quiz",
              title: "本章综合练",
              point: "本章自查三问：谁装修谁？几个'更'？the 加了吗？",
              questions: [
                { type: "choice", stem: "下面哪句对？", options: ["She sings beautiful.", "She sings beautifully.", "She beautiful sings."], answer: 1, tip: "sings 是动词，修饰它用副词 beautifully——形容词装修错了地方。" },
                { type: "choice", stem: "最高级前面通常加？", options: ["a", "the", "不加"], answer: 1, tip: "the tallest：最高级前面多用 the。" },
                { type: "choice", stem: "“更”只能有几个？（防双重比较）", options: ["两个", "一个", "三个"], answer: 1, tip: "比较级一个“更”：more taller 是双重比较，错。" },
                { type: "fill", stemBefore: "He is", stemAfter: "tall as his father.（“一样高”）", answer: "as", accept: ["as"], tip: "as…as 中间原级：as tall as（一样高）。" },
                { type: "choice", stem: "修饰动词应该用？", options: ["形容词", "副词", "名词"], answer: 1, tip: "形容词装修名词，不装修动词——修饰动词用副词。" }
              ]
            }
        ]
      }
      ]
    }
  ]
};
