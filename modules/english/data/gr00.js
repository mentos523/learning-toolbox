/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr00：导论——句子是什么
 *
 * 数据口径（M5）：window.ENG_CH["gr00"] = { id, title, units[] }，
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
window.ENG_CH["gr00"] = {
  id: "gr00",
  title: "导论——句子是什么",
  /* 例句索引：键 = D3 台账例句 id（正例）；文本与台账逐字一致。 */
  sentences: {
    "gr00.1.1-e1": { en: "I run.", zh: "我跑。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "run", role: "verb", label: "谓语" } ] },
    "gr00.1.1-e2": { en: "She runs.", zh: "她跑。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "runs", role: "verb", label: "谓语" } ] },
    "gr00.1.1-e3": { en: "She is happy.", zh: "她很开心。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "happy", role: "complem", label: "表语" } ] },
    "gr00.1.1-e4": { en: "My mother is beautiful.", zh: "我妈妈很漂亮。", reg: "通用",
      tagged: [ { w: "My mother", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "beautiful", role: "complem", label: "表语" } ] },
    "gr00.1.1-e5": { en: "I like apples.", zh: "我喜欢苹果。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "like", role: "verb", label: "谓语" }, { w: "apples", role: "object", label: "宾语" } ] },
    "gr00.1.1-e6": { en: "They are students.", zh: "他们是学生。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "谓语" }, { w: "students", role: "complem", label: "表语" } ] },
    "gr00.1.2-e1": { en: "I gave him a book yesterday.", zh: "我昨天给了他一本书。", reg: "通用",
      tagged: [
        {
          w: "I",
          role: "subject",
          label: "主语"
        },
        {
          w: "gave",
          role: "verb",
          label: "谓语"
        },
        {
          w: "him",
          role: "object",
          label: "间接宾语"
        },
        {
          w: "a book",
          role: "object",
          label: "直接宾语"
        },
        {
          w: "yesterday",
          role: "adverb",
          label: "状语"
        }
      ] },
    "gr00.1.2-e2": { en: "She is a teacher.", zh: "她是一名老师。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "a teacher", role: "complem", label: "表语" } ] },
    "gr00.1.2-e3": { en: "They made me happy.", zh: "他们让我很开心。", reg: "通用",
      tagged: [
        {
          w: "They",
          role: "subject",
          label: "主语"
        },
        {
          w: "made",
          role: "verb",
          label: "谓语"
        },
        {
          w: "me",
          role: "object",
          label: "宾语"
        },
        {
          w: "happy",
          role: "complem",
          label: "补语"
        }
      ] },
    "gr00.1.2-e4": { en: "The tall girl is my sister.", zh: "那个高个子女孩是我姐姐。", reg: "通用",
      tagged: [
        {
          w: "tall",
          role: "attrib",
          label: "定语"
        },
        {
          w: "girl",
          role: "subject",
          label: "主语"
        },
        {
          w: "is",
          role: "verb",
          label: "谓语"
        },
        {
          w: "my sister",
          role: "complem",
          label: "表语"
        }
      ] },
    "gr00.1.2-e5": { en: "I like the book on the desk.", zh: "我喜欢桌上那本书。", reg: "通用",
      tagged: [
        {
          w: "I",
          role: "subject",
          label: "主语"
        },
        {
          w: "like",
          role: "verb",
          label: "谓语"
        },
        {
          w: "the book",
          role: "object",
          label: "宾语"
        },
        {
          w: "on the desk",
          role: "attrib",
          label: "定语（后置）"
        }
      ] },
    "gr00.1.2-e6": { en: "He runs fast.", zh: "他跑得快。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "runs", role: "verb", label: "谓语" }, { w: "fast", role: "adverb", label: "状语" } ] },
    "gr00.1.3-e1": { en: "She runs.", zh: "她跑。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "runs", role: "verb", label: "谓语" } ] },
    "gr00.1.3-e2": { en: "He became a teacher.", zh: "他当了老师。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "became", role: "verb", label: "谓语" }, { w: "a teacher", role: "complem", label: "表语" } ] },
    "gr00.1.3-e3": { en: "She reads books.", zh: "她看书。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "reads", role: "verb", label: "谓语" }, { w: "books", role: "object", label: "宾语" } ] },
    "gr00.1.3-e4": { en: "I gave him a book.", zh: "我给了他一本书。", reg: "通用",
      tagged: [
        {
          w: "I",
          role: "subject",
          label: "主语"
        },
        {
          w: "gave",
          role: "verb",
          label: "谓语"
        },
        {
          w: "him",
          role: "object",
          label: "间接宾语"
        },
        {
          w: "a book",
          role: "object",
          label: "直接宾语"
        }
      ] },
    "gr00.1.3-e5": { en: "I find English interesting.", zh: "我觉得英语很有趣。", reg: "通用",
      tagged: [
        {
          w: "I",
          role: "subject",
          label: "主语"
        },
        {
          w: "find",
          role: "verb",
          label: "谓语"
        },
        {
          w: "English",
          role: "object",
          label: "宾语"
        },
        {
          w: "interesting",
          role: "complem",
          label: "补语"
        }
      ] },
    "gr00.1.3-e6": { en: "We call him David.", zh: "我们叫他大卫。", reg: "通用",
      tagged: [
        {
          w: "We",
          role: "subject",
          label: "主语"
        },
        {
          w: "call",
          role: "verb",
          label: "谓语"
        },
        {
          w: "him",
          role: "object",
          label: "宾语"
        },
        {
          w: "David",
          role: "complem",
          label: "补语"
        }
      ] },
    "gr00.1.4-e1": { en: "I read a book.", zh: "我读一本书。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "read", role: "verb", label: "谓语" }, { w: "book", role: "object", label: "宾语·名词" } ] },
    "gr00.1.4-e2": { en: "I book a ticket.", zh: "我订一张票。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "book", role: "verb", label: "谓语·动词" }, { w: "a ticket", role: "object", label: "宾语" } ] },
    "gr00.1.4-e3": { en: "She is a good student.", zh: "她是个好学生。", reg: "通用",
      tagged: [ { w: "good", role: "attrib", label: "定语·形容词" }, { w: "student", role: "complem", label: "表语·名词" } ] },
    "gr00.1.4-e4": { en: "He runs fast.", zh: "他跑得快。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "runs", role: "verb", label: "谓语" }, { w: "fast", role: "adverb", label: "状语·副词" } ] },
    "gr00.1.4-e5": { en: "The cat is on the box.", zh: "猫在盒子上。", reg: "通用",
      tagged: [ { w: "The cat", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "on the box", role: "adverb", label: "状语·介词短语" } ] },
    "gr00.1.4-e6": { en: "She and I are friends.", zh: "她和我是朋友。", reg: "通用",
      tagged: [ { w: "She and I", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "谓语" }, { w: "friends", role: "complem", label: "表语" } ] },
    "gr00.1.4-e7": { en: "They are playing basketball.", zh: "他们正在打篮球。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语·代词" }, { w: "are playing", role: "verb", label: "谓语" }, { w: "basketball", role: "object", label: "宾语" } ] },
  },
  units: [
    {
      id: "gr00-u1",
      title: "句子的骨架",
      lessons: [
      {
        id: "gr00.1.1",
        title: "句子必须有谓语动词",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr00.1.1-p1",
              kind: "observe",
              title: "先看三句话：每句都有哪两个部分？",
              point: "每句都有主语（谁）和谓语（做什么/怎么样）——这是英语句子的骨架。",
              sentences: [
                {
                  id: "gr00.1.1-e1",
                  en: "I run.",
                  zh: "我跑。",
                  reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "run", role: "verb", label: "谓语" } ]
                },
                {
                  id: "gr00.1.1-e2",
                  en: "She runs.",
                  zh: "她跑。",
                  reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "runs", role: "verb", label: "谓语" } ]
                },
                {
                  id: "gr00.1.1-e3",
                  en: "She is happy.",
                  zh: "她很开心。",
                  reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "happy", role: "complem", label: "表语" } ]
                }
              ],
              guess: {
                q: "三句话里，每句都有的两个基本部分是什么？",
                options: [ "主语（谁）和谓语（做什么/怎么样）", "主语和宾语", "谓语和宾语" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G3 句型积木（含双谓语干扰块 → 双谓语报警） ---------- */
            {
              id: "gr00.1.1-p2",
              kind: "interact",
              title: "拼一句完整的话：小心干扰块",
              exploreTip: "把积木放进对的槽，拼出 I like apples.。is 是干扰块——它想混进谓语槽，警报会响。",
              point: "拼句时警报响，就是因为谓语只能有一个——这就是本课的铁律。",
              widgets: [
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVO",
                    blocks: [
                      {
                        w: "I",
                        role: "subject"
                      },
                      {
                        w: "like",
                        role: "verb"
                      },
                      {
                        w: "apples",
                        role: "object"
                      },
                      {
                        w: "is",
                        role: "verb"
                      }
                    ],
                    hint: "is 是干扰块：like 已经是谓语，它再进来就是双谓语——试试看警报。",
                    doneNote: "拼好了！一个句子只能有一个谓语：like 占了谓语槽，is 就没地方站了。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：是什么 / 为什么 / 条件卡 / 反例 / 中式纠偏 ---------- */
            {
              id: "gr00.1.1-p3",
              kind: "explain",
              title: "谓语唯一：英语句子必须有且只有一个谓语",
              lead: "还记得吗？上一页 is 想混进谓语槽，警报响了——一个句子只能有一个'老大'（谓语）。",
              point: "这就是谓语唯一：英语句子必须有且只有一个谓语动词。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr00.1.1-e1", "gr00.1.1-e2", "gr00.1.1-e3" ],
                  note: "先看现象：每句话先圈动词。"
                },
                {
                  type: "idcard",
                  rule: "英语句子必须有谓语动词；一个句子只能有一个谓语。",
                  condition: "所有英语句子。谓语有三种：实义动词（run/like）、系动词（is/are）、助动词（do/does）。汉语'她很漂亮'没有动词也能成立，英语不行——必须加 is。"
                },
                {
                  type: "idcard",
                  rule: "谓语三兄弟，人话版：实义动词自己能扛事（run 跑、like 喜欢）；系动词 is/are/am 自己没意思，专门把主语和“怎么样”连起来（She is happy）；助动词 do/does/did 打杂的，帮实义动词变否定疑问（Does she like…？），从不抢谓语的位。",
                  condition: "全书通用：后面看到“系动词”“助动词”标签，就回想这三行——先直觉，后严格。"
                },
                {
                  type: "bridge",
                  zh: "汉语说'她很漂亮'，'漂亮'前面不用'是'，句子照样成立。",
                  en: "英语不行：She very beautiful 里没有动词，英语耳朵听着像话没说完——必须加 is：She is beautiful。",
                  unbridge: "这是英语的规矩：句子不能没有动词。不是汉语的翻译。"
                },
                {
                  type: "contrast",
                  wrong: "My mother very beautiful.",
                  wrongZh: "（✗ 错句：漏了谓语）",
                  right: "My mother is beautiful.",
                  why: "漏了谓语动词 is——英语句子不能没有动词，is 专门站在形容词前面。"
                },
                {
                  type: "contrast",
                  wrong: "I like him is kind.",
                  wrongZh: "（✗ 错句：两个谓语）",
                  right: "I think he is kind.",
                  why: "like 已经是谓语，is 再进来就是两个'老大'——想加'他很善良'，另起一句。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分（选择 + 填空） ---------- */
            {
              id: "gr00.1.1-p4",
              kind: "quiz",
              title: "练一练：谓语找对了吗？",
              point: "自查：每句话先圈动词——圈出零个或两个，都要改。",
              questions: [
                { type: "choice", stem: "下面哪句是完整的英语句子？", options: ["She beautiful.", "She is beautiful.", "Beautiful she is."], answer: 1, tip: "英语句子不能没有谓语动词：She beautiful 里没有动词，必须加 is。" },
                { type: "fill", stemBefore: "My mother", stemAfter: "beautiful.（是）", answer: "is", accept: ["is"], tip: "谓语不能缺——is 专门站在形容词前面（My mother is beautiful）。" },
                { type: "choice", stem: "下面哪句犯了“双谓语”的错？", options: ["I like him.", "I like him is kind.", "I think he is kind."], answer: 1, tip: "like 已经是谓语，is 再进来就是两个“老大”——想加“他很善良”，另起一句。" },
                { type: "choice", stem: "谓语有哪三种？", options: ["实义动词、系动词、助动词", "名词、动词、形容词", "主语、谓语、宾语"], answer: 0, tip: "谓语三兄弟：实义动词（run/like）、系动词（is/are）、助动词（do/does）。" },
                { type: "fill", stemBefore: "They", stemAfter: "students.（是）", answer: "are", accept: ["are"], tip: "主语 They 是复数，系动词用 are——They are students。" }
              ]
            }
        ]
      },
      {
        id: "gr00.1.2",
        title: "七大句子成分全景",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr00.1.2-p1",
              kind: "observe",
              title: "一句话，七个成分：先看全家福",
              point: "主语+谓语是骨架（缺一不可）；宾语/表语/补语补全意思；定语/状语是装修——但装修站错岗，意思就变了。",
              sentences: [
                {
                  id: "gr00.1.2-e1",
                  en: "I gave him a book yesterday.",
                  zh: "我昨天给了他一本书。",
                  reg: "通用",
                  tagged: [
                    {
                      w: "I",
                      role: "subject",
                      label: "主语"
                    },
                    {
                      w: "gave",
                      role: "verb",
                      label: "谓语"
                    },
                    {
                      w: "him",
                      role: "object",
                      label: "间接宾语"
                    },
                    {
                      w: "a book",
                      role: "object",
                      label: "直接宾语"
                    },
                    {
                      w: "yesterday",
                      role: "adverb",
                      label: "状语"
                    }
                  ]
                },
                {
                  id: "gr00.1.2-e2",
                  en: "She is a teacher.",
                  zh: "她是一名老师。",
                  reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "a teacher", role: "complem", label: "表语" } ]
                },
                {
                  id: "gr00.1.2-e4",
                  en: "The tall girl is my sister.",
                  zh: "那个高个子女孩是我姐姐。",
                  reg: "通用",
                  tagged: [
                    {
                      w: "tall",
                      role: "attrib",
                      label: "定语"
                    },
                    {
                      w: "girl",
                      role: "subject",
                      label: "主语"
                    },
                    {
                      w: "is",
                      role: "verb",
                      label: "谓语"
                    },
                    {
                      w: "my sister",
                      role: "complem",
                      label: "表语"
                    }
                  ]
                }
              ],
              guess: {
                q: "七个成分里，哪个是'骨架'，哪些是'装修'？",
                options: [ "主语谓语是骨架，其余是补全或装修", "七个成分都一样重要", "只有谓语是骨架" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：Y4 成分标注练习（限时 3 轮） ---------- */
            {
              id: "gr00.1.2-p2",
              kind: "interact",
              title: "限时标注：成分找座位",
              exploreTip: "限时给词块贴成分标签。记住口诀：先找谓语（朱红），再找主语，其余对号入座。",
              point: "标注完有什么感觉？谓语是全句的'老大'——先找到它，其余成分才有座位。",
              widgets: [
                {
                  type: "constituent-quiz",
                  params: {
                    items: [
                      {
                        id: "gr00.1.2-q1",
                        sentence: [
                          {
                            w: "She",
                            role: "subject"
                          },
                          {
                            w: "likes",
                            role: "verb"
                          },
                          {
                            w: "apples",
                            role: "object"
                          }
                        ]
                      },
                      {
                        id: "gr00.1.2-q2",
                        sentence: [
                          {
                            w: "He",
                            role: "subject"
                          },
                          {
                            w: "is",
                            role: "verb"
                          },
                          {
                            w: "happy",
                            role: "complem"
                          }
                        ]
                      },
                      {
                        id: "gr00.1.2-q3",
                        sentence: [
                          {
                            w: "I",
                            role: "subject"
                          },
                          {
                            w: "gave",
                            role: "verb"
                          },
                          {
                            w: "him",
                            role: "object"
                          },
                          {
                            w: "a book",
                            role: "object"
                          },
                          {
                            w: "yesterday",
                            role: "adverb"
                          }
                        ]
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
                        role: "complem",
                        label: "表语/补语"
                      },
                      {
                        role: "adverb",
                        label: "状语"
                      }
                    ],
                    rounds: 3,
                    timeLimitSec: 60,
                    hint: "先找谓语（朱红视觉锚点），再找主语——成分标注第一步永远是找动词。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：七大成分 + 条件卡 + 反例 ---------- */
            {
              id: "gr00.1.2-p3",
              kind: "explain",
              title: "七大成分：主谓是骨架，其余对号入座",
              lead: "还记得吗？上一页你限时标成分，找谓语是不是先找朱红？——全书通用：找成分第一步永远是先找谓语动词。",
              point: "这就是七大成分：先找谓语，再定主语，其余成分对号入座。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr00.1.2-e1", "gr00.1.2-e2", "gr00.1.2-e4" ],
                  note: "先看现象：找谓语，再定主语。"
                },
                {
                  type: "idcard",
                  rule: "英语句子有七大成分：主语、谓语、宾语、表语、定语、状语、补语。",
                  condition: "主语+谓语是骨架，每句必有；宾语/表语/补语看动词需不需要；定语修饰名词，状语修饰动词/全句。时间地点词是状语，绝不能当补语。"
                },
                {
                  type: "bridge",
                  zh: "汉语也讲主谓宾，但汉语靠语序和语感，成分界限模糊。",
                  en: "英语成分有'岗位制'：每个成分站自己的岗。yesterday（昨天）是时间状语，绝不能当补语；on the desk 是定语，修饰 book 就要后置。",
                  unbridge: "这是英语的岗位规矩，不是汉语的语感。"
                },
                {
                  type: "contrast",
                  wrong: "I like on the desk the book.",
                  wrongZh: "（✗ 错句：定语位置按汉语放错了）",
                  right: "I like the book on the desk.",
                  why: "on the desk 是定语，修饰 book——英语里介词短语作定语要后置，不能按汉语放前面。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr00.1.2-p4",
              kind: "quiz",
              title: "练一练：成分对号入座",
              point: "自查三问：谓语找到了吗？主语是谁？修饰语站对岗了吗？",
              questions: [
                { type: "choice", stem: "找句子成分，第一步永远是？", options: ["先找主语", "先找谓语动词", "先找时间词"], answer: 1, tip: "全书通用：先圈动词（谓语），再定主语，其余成分对号入座。" },
                { type: "choice", stem: "哪个成分组合是句子的“骨架”，每句必有？", options: ["定语", "主语 + 谓语", "补语"], answer: 1, tip: "主谓是骨架；宾语/表语/补语看动词需不需要——先立骨架。" },
                { type: "choice", stem: "“yesterday（昨天）”在句中是什么成分？", options: ["补语", "时间状语", "定语"], answer: 1, tip: "时间地点词是状语——昨天是“什么时候”，绝不能当补语。" },
                { type: "fill", stemBefore: "“She is happy.”中 happy 是", stemAfter: "。（系动词 is 后面说明主语怎么样）", answer: "表语", accept: ["表语"], tip: "系动词后面的成分叫表语：说明主语“怎么样/是什么”。" },
                { type: "choice", stem: "哪个成分负责“装修名词”？", options: ["定语", "状语", "谓语"], answer: 0, tip: "定语装修名词（an interesting book）；状语装修动词/全句（He runs quickly）。" }
              ]
            }
        ]
      },
      {
        id: "gr00.1.3",
        title: "五种基本句型",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr00.1.3-p1",
              kind: "observe",
              title: "五种句型：动词后面的'槽'不一样",
              point: "动词后面的'槽'不一样——这就是五种基本句型。",
              sentences: [
                {
                  id: "gr00.1.3-e1",
                  en: "She runs.",
                  zh: "她跑。",
                  reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "runs", role: "verb", label: "谓语" } ]
                },
                {
                  id: "gr00.1.3-e2",
                  en: "He became a teacher.",
                  zh: "他当了老师。",
                  reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "became", role: "verb", label: "谓语" }, { w: "a teacher", role: "complem", label: "表语" } ]
                },
                {
                  id: "gr00.1.3-e5",
                  en: "I find English interesting.",
                  zh: "我觉得英语很有趣。",
                  reg: "通用",
                  tagged: [
                    {
                      w: "I",
                      role: "subject",
                      label: "主语"
                    },
                    {
                      w: "find",
                      role: "verb",
                      label: "谓语"
                    },
                    {
                      w: "English",
                      role: "object",
                      label: "宾语"
                    },
                    {
                      w: "interesting",
                      role: "complem",
                      label: "补语"
                    }
                  ]
                }
              ],
              guess: {
                q: "三句话的'骨架'有什么不一样？",
                options: [ "动词后面的部分（槽）不一样", "主语不一样", "意思完全不一样" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G3 句型积木 SVOC（含双谓语干扰块） ---------- */
            {
              id: "gr00.1.3-p2",
              kind: "interact",
              title: "拼第五种句型：S+V+O+C",
              exploreTip: "拼出 I find English interesting.（S+V+O+C）。is 是干扰块——谓语槽已有 find，它再进来警报会响。",
              point: "第五种句型到手：find + 宾语 + 形容词作宾补——'觉得英语很有趣'。",
              widgets: [
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVOC",
                    blocks: [
                      {
                        w: "I",
                        role: "subject"
                      },
                      {
                        w: "find",
                        role: "verb"
                      },
                      {
                        w: "English",
                        role: "object"
                      },
                      {
                        w: "interesting",
                        role: "complem"
                      },
                      {
                        w: "is",
                        role: "verb"
                      }
                    ],
                    hint: "interesting 是补语（宾补）（说明宾语 English 怎么样），放进补语槽。",
                    doneNote: "拼好了！这是第五种句型 S+V+O+C：interesting 是补语（宾补）。全家福：S+V / S+V+P / S+V+O / S+V+IO+DO / S+V+O+C。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：五种句型 + 条件卡 + 反例 ---------- */
            {
              id: "gr00.1.3-p3",
              kind: "explain",
              title: "五种基本句型：动词定槽，槽定句型",
              lead: "还记得吗？上一页 is 想混进谓语槽，警报响了——一个句子只能有一个谓语，槽也是动词说了算。",
              point: "这就是五种基本句型：动词定槽，槽定句型。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr00.1.3-e1", "gr00.1.3-e2", "gr00.1.3-e5" ],
                  note: "先看现象：五个槽，五种句型。"
                },
                {
                  type: "idcard",
                  rule: "英语有五种基本句型：S+V（主谓）、S+V+P（主系表）、S+V+O（主谓宾）、S+V+IO+DO（主谓间宾直宾）、S+V+O+C（主谓宾宾补）。",
                  condition: "句型由动词决定：不及物动词（run）用 S+V；系动词（be/become）用 S+V+P；及物动词（like）用 S+V+O；双宾动词（give）用 S+V+IO+DO；宾补动词（find/call）用 S+V+O+C。查动词，定句型。"
                },
                {
                  type: "bridge",
                  zh: "汉语也分'他跑''他是老师''他给我书'，但汉语不讲'槽'，靠语感。",
                  en: "英语把动词后面的'槽'数得清清楚楚：give 后面有两个槽（给谁+给什么），find 后面是'宾语+补语'槽——槽不对，句子就散架。",
                  unbridge: "这是英语的句型规矩：先看动词，再数槽。"
                },
                {
                  type: "contrast",
                  wrong: "I like him is kind.",
                  wrongZh: "（✗ 错句：双谓语）",
                  right: "I think he is kind.",
                  why: "like 后面已经满了（S+V+O），is 再进来就是双谓语——想加'他很善良'，另起一句。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr00.1.3-p4",
              kind: "quiz",
              title: "练一练：这是什么句型？",
              point: "自查：先找动词，再看它带几个槽——槽数即句型。",
              questions: [
                { type: "choice", stem: "“She runs.”是哪种句型？", options: ["S + V（主谓）", "S + V + O（主谓宾）", "S + V + P（主系表）"], answer: 0, tip: "run 是不及物动词，后面不跟东西——S + V 就够了。" },
                { type: "choice", stem: "“He is a teacher.”是哪种句型？", options: ["S + V + O", "S + V + P（主系表）", "S + V + IO + DO"], answer: 1, tip: "is 是系动词，后面跟表语 a teacher——S + V + P。" },
                { type: "choice", stem: "“I gave him a book.”是哪种句型？", options: ["S + V + O", "S + V + IO + DO（主谓间宾直宾）", "S + V + O + C"], answer: 1, tip: "give 后面有两个槽：给谁（him）+ 给什么（a book）——双宾动词。" },
                { type: "choice", stem: "“I like him is kind.”错在哪？", options: ["like 拼错了", "like 后面槽已满（S+V+O），is 再进来是双谓语", "kind 拼错了"], answer: 1, tip: "句型由动词定槽：like 的槽（宾语 him）满了，is 没地方站。" },
                { type: "choice", stem: "句型由谁决定？", options: ["主语", "动词", "时间词"], answer: 1, tip: "动词定槽，槽定句型——查动词，就知道句型。" }
              ]
            }
        ]
      },
      {
        id: "gr00.1.4",
        title: "词类全景与查词姿势",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr00.1.4-p1",
              kind: "observe",
              title: "book：一个词，两种身份",
              point: "同一个拼形可以兼多种词类——查词先看词性，别只背一个中文义。",
              sentences: [
                {
                  id: "gr00.1.4-e1",
                  en: "I read a book.",
                  zh: "我读一本书。",
                  reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "read", role: "verb", label: "谓语" }, { w: "book", role: "object", label: "宾语·名词" } ]
                },
                {
                  id: "gr00.1.4-e2",
                  en: "I book a ticket.",
                  zh: "我订一张票。",
                  reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "book", role: "verb", label: "谓语·动词" }, { w: "a ticket", role: "object", label: "宾语" } ]
                },
                {
                  id: "gr00.1.4-e3",
                  en: "She is a good student.",
                  zh: "她是个好学生。",
                  reg: "通用",
                  tagged: [ { w: "good", role: "attrib", label: "定语·形容词" }, { w: "student", role: "complem", label: "表语·名词" } ]
                }
              ],
              guess: {
                q: "book 在第一句和第二句里，是同一个'词类'吗？",
                options: [ "都是名词", "第一句名词，第二句动词", "都是动词" ],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 成分标注改作词性标注（标签即词类） ---------- */
            {
              id: "gr00.1.4-p2",
              kind: "interact",
              title: "词性大标注：给每个词贴标签",
              exploreTip: "给每个词贴上它的词类标签。the 在这里是冠词，old 是形容词。",
              point: "标完发现：词类是词的'身份证'——先看词性，再看中文义。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "The",
                        role: "art",
                        label: "冠词"
                      },
                      {
                        w: "old",
                        role: "adj",
                        label: "形容词"
                      },
                      {
                        w: "book",
                        role: "noun",
                        label: "名词"
                      },
                      {
                        w: "is",
                        role: "verb",
                        label: "动词"
                      },
                      {
                        w: "on",
                        role: "prep",
                        label: "介词"
                      },
                      {
                        w: "the desk",
                        role: "noun",
                        label: "名词"
                      }
                    ],
                    slots: [
                      {
                        role: "noun",
                        label: "名词"
                      },
                      {
                        role: "verb",
                        label: "动词"
                      },
                      {
                        role: "adj",
                        label: "形容词"
                      },
                      {
                        role: "prep",
                        label: "介词"
                      },
                      {
                        role: "art",
                        label: "冠词"
                      }
                    ],
                    hint: "词性看'词在句中做什么'：book 在这里是'书'（名词），在 I book a ticket 里是'订票'（动词）。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：八大词类 + 查词姿势 ---------- */
            {
              id: "gr00.1.4-p3",
              kind: "explain",
              title: "八大词类与查词姿势：先看词性，再看中文义",
              lead: "还记得吗？上一页 book 是名词，old 是形容词——词类看'做什么'，不看'长什么样'。",
              point: "这就是查词姿势：一词多类，先看词性缩写，再选中文义。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr00.1.4-e1", "gr00.1.4-e2", "gr00.1.4-e3" ],
                  note: "先看现象：词形相同，词类可以不同。"
                },
                {
                  type: "idcard",
                  rule: "英语有八大词类：名词、动词、形容词、副词、代词、介词、连词、冠词（另有数词、感叹词）。",
                  condition: "词类看'词在句中做什么'，不看拼形：book 在 I read a book 里是名词，在 I book a ticket 里是动词。查词典先看缩写 n./v./adj./adv.，再选中文义。"
                },
                {
                  type: "bridge",
                  zh: "汉语词类界限模糊，习惯'一个词一个意思'地背。",
                  en: "英语词典每个词条都标词性：book n. 书；v. 订票——背单词要连词性一起背，否则 I book a ticket 就看不懂了。",
                  unbridge: "这是英语的查词规矩：先看词性，再看中文义。"
                },
                {
                  type: "contrast",
                  wrong: "I book a ticket → '我书一张票'（✗）",
                  wrongZh: "（✗ 错译：查词只看第一个中文义）",
                  right: "I book a ticket → '我订一张票'（✓ book v. 订票）",
                  why: "查词先看词性：book v. 才是'订票'，只看第一个中文义'书'就翻车了。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr00.1.4-p4",
              kind: "quiz",
              title: "练一练：词性看'做什么'",
              point: "自查：背单词连词性一起背；查词先看缩写。",
              questions: [
                { type: "choice", stem: "“book”在“I read a book.”里是什么词类？", options: ["动词", "名词", "形容词"], answer: 1, tip: "book 在这里是“被读的东西”——名词。" },
                { type: "choice", stem: "“book”在“I book a ticket.”里是什么意思？", options: ["名词“书”", "动词“订票”", "形容词“书的”"], answer: 1, tip: "book v. = 订票：I book a ticket = 我订一张票。" },
                { type: "choice", stem: "词类看什么？", options: ["看拼写长什么样", "看它在句中做什么", "看首字母"], answer: 1, tip: "词类看“做什么”不看“长什么样”：book 可名可动，看岗位。" },
                { type: "choice", stem: "查词典第一步是？", options: ["看第一个中文义", "先看词性缩写（n./v./adj.），再选中文义", "看发音"], answer: 1, tip: "一词多类：先看缩写定词性，再选中文义——只看第一个义会翻车。" },
                { type: "choice", stem: "英语八大词类不包括下面哪个？", options: ["介词", "量词", "冠词"], answer: 1, tip: "八大词类：名词、动词、形容词、副词、代词、介词、连词、冠词——没有“量词”。" }
              ]
            }
        ]
      }
      ]
    }
  ]
};
