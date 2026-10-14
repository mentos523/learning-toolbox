/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr05：动词的时与体（一）
 *
 * 数据口径（M5）：window.ENG_CH["gr05"] = { id, title, units[] }，
 * 与数学 window.MATH_CH 同构；语法章节注册独立命名空间，
 * 与数学引擎、讲词根代码零交叉。
 *
 * 本文件仅含试点课 gr05.1.1（一般现在时：三单现）的 4 页：
 *   p1 观察页（例句先行 + 分块标注 + Y1 先猜后验）
 *   p2 交互页（G1 成分拖拽标注 + 跃升 2 信号灯）
 *   p3 讲解页（是什么 / 为什么 / 条件卡 / 反例 / 中式纠偏）
 *   p4 练习页（Y3 判分：选择 + 填空）
 * 例句全部来自 D3 三审台账（modules/english/data/_review/
 * ledger-gr05.json），id 一一对应，未终审例句不得入库。
 *
 * 内容分工：规则表述=英语专家队；讲解话术=黄队；
 * 例句=红队终审通过（见台账 first/final 记录）。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr05"] = {
  id: "gr05",
  title: "动词的时与体（一）：一般现在 / 过去 / 将来",
  /* 例句索引：键 = D3 台账例句 id；讲解页 blocks.type="examples" 按 id 引用。
   * 文本与台账 ledger-gr05.json 逐字一致（终审通过版）。 */
  sentences: {
    "gr05.1.1-e1": { en: "She likes apples.", zh: "她喜欢苹果。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "likes", role: "verb", label: "谓语" }, { w: "apples", role: "object", label: "宾语" } ] },
    "gr05.1.1-e2": { en: "He goes to school by bike.", zh: "他骑自行车去上学。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "goes", role: "verb", label: "谓语" }, { w: "to school", role: "adverb", label: "状语" }, { w: "by bike", role: "adverb", label: "状语" } ] },
    "gr05.1.1-e3": { en: "My mother gets up at six every morning.", zh: "我妈妈每天早上六点起床。", reg: "通用",
      tagged: [ { w: "My mother", role: "subject", label: "主语" }, { w: "gets up", role: "verb", label: "谓语" }, { w: "at six every morning", role: "adverb", label: "状语" } ] },
    "gr05.1.1-e4": { en: "He does his homework after dinner.", zh: "晚饭后他做作业。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "does", role: "verb", label: "谓语" }, { w: "his homework", role: "object", label: "宾语" }, { w: "after dinner", role: "adverb", label: "状语" } ] },
    "gr05.1.1-e5": { en: "Does she like music?", zh: "她喜欢音乐吗？", reg: "通用",
      tagged: [ { w: "Does", role: "verb", label: "助动词" }, { w: "she", role: "subject", label: "主语" }, { w: "like", role: "verb", label: "动词原形" }, { w: "music", role: "object", label: "宾语" } ] },
    "gr05.1.1-e6": { en: "She doesn't watch TV at night.", zh: "她晚上不看电视。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "doesn't", role: "verb", label: "助动词" }, { w: "watch", role: "verb", label: "动词原形" }, { w: "TV", role: "object", label: "宾语" }, { w: "at night", role: "adverb", label: "状语" } ] },
    "gr05.1.1-e7": { en: "He has a new bike.", zh: "他有一辆新自行车。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "谓语" }, { w: "a new bike", role: "object", label: "宾语" } ] },
    "gr05.1.1-e8": { en: "She has lunch at noon.", zh: "她中午吃午饭。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "谓语" }, { w: "lunch", role: "object", label: "宾语" }, { w: "at noon", role: "adverb", label: "状语" } ] },
    "gr05.1.1-e9": { en: "Does he have a pen?", zh: "他有钢笔吗？", reg: "通用",
      tagged: [ { w: "Does", role: "verb", label: "助动词" }, { w: "he", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "动词原形" }, { w: "a pen", role: "object", label: "宾语" } ] }
  },
  units: [
    {
      id: "gr05-u1",
      title: "一般现在时与一般过去时",
      lessons: [
        {
          id: "gr05.1.1",
          title: "一般现在时：三单现",
          pages: [
            /* ---------- p1 观察页：例句先行（第九条铁律） ---------- */
            {
              id: "gr05.1.1-p1",
              kind: "observe",
              title: "先看三句话：动词有什么不一样？",
              sentences: [
                {
                  id: "gr05.1.1-e1",
                  en: "She likes apples.",
                  zh: "她喜欢苹果。",
                  reg: "通用",
                  tagged: [
                    { w: "She", role: "subject", label: "主语" },
                    { w: "likes", role: "verb", label: "谓语" },
                    { w: "apples", role: "object", label: "宾语" }
                  ]
                },
                {
                  id: "gr05.1.1-e2",
                  en: "He goes to school by bike.",
                  zh: "他骑自行车去上学。",
                  reg: "通用",
                  tagged: [
                    { w: "He", role: "subject", label: "主语" },
                    { w: "goes", role: "verb", label: "谓语" },
                    { w: "to school", role: "adverb", label: "状语" },
                    { w: "by bike", role: "adverb", label: "状语" }
                  ]
                },
                {
                  id: "gr05.1.1-e3",
                  en: "My mother gets up at six every morning.",
                  zh: "我妈妈每天早上六点起床。",
                  reg: "通用",
                  tagged: [
                    { w: "My mother", role: "subject", label: "主语" },
                    { w: "gets up", role: "verb", label: "谓语" },
                    { w: "at six every morning", role: "adverb", label: "状语" }
                  ]
                }
              ],
              guess: {
                q: "你发现了什么？三句话里，哪个部分一直在变？",
                options: ["主语一直在变", "动词多了个 -s", "句子的意思全变了"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "三句话的主语都是“他 / 她 / 妈妈”，动词都穿上了 -s——这就是三单现。"
            },
            /* ---------- p2 交互页：信号灯 + 成分拖拽标注 ---------- */
            {
              id: "gr05.1.1-p2",
              kind: "interact",
              title: "拨动主语，看 -s 灯",
              exploreTip: "拨动主语，看 -s 灯；再把“主语 / 谓语 / 状语”标签放到对的词块上。",
              widgets: [
                {
                  type: "signal-light",
                  params: {
                    subjects: [
                      { s: "I", verb: "go", third: false },
                      { s: "you", verb: "go", third: false },
                      { s: "he", verb: "goes", third: true },
                      { s: "she", verb: "goes", third: true },
                      { s: "it", verb: "goes", third: true },
                      { s: "we", verb: "go", third: false },
                      { s: "they", verb: "go", third: false }
                    ],
                    lampOn: "-s 灯亮：动词要加 -s",
                    lampOff: "-s 灯灭：动词用原形"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "goes", role: "verb", label: "谓语" },
                      { w: "to school", role: "adverb", label: "状语" },
                      { w: "by bike", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "点一个标签，再点一个词块；也可以直接把标签拖到词块上。"
                  }
                }
              ],
              point: "主语换成 he / she / it，动词立刻穿上 -s——这就是三单现的信号灯。"
            },
            /* ---------- p3 讲解页：讲透（是什么 / 为什么 / 条件 / 反例） ---------- */
            {
              id: "gr05.1.1-p3",
              kind: "explain",
              title: "三单现：主语是“他 / 她 / 它”，动词加 -s",
              lead: "还记得吗？上一页 he 一出现，-s 灯就亮了。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr05.1.1-e1", "gr05.1.1-e2", "gr05.1.1-e4"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "主语是第三人称单数，动词加 -s / -es。",
                  condition: "只在一般现在时成立；主语是 he / she / it，或单数名词、不可数名词。I / you / we / they 作主语时，动词不加 -s。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“他跑”，“跑”字不用变——人称、时间都不用动词管。",
                  en: "英语不一样：动词要“报时”。主语是“他 / 她 / 它”，动词就穿上 -s 制服，向全世界宣告——这件事是“他”干的。",
                  unbridge: "这是英语的规矩，不是汉语的翻译。"
                },
                {
                  type: "spell",
                  title: "-s 怎么穿（三条 + 两个特殊）：",
                  items: [
                    "一般直接加 -s：like → likes",
                    "以 s / x / ch / sh / o 结尾加 -es：go → goes，watch → watches",
                    "辅音字母 + y 结尾：去 y 变 ies：study → studies",
                    "两个特殊必须单记：do → does，have → has"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "He go to school.",
                  wrongZh: "（✗ 错句）",
                  right: "He goes to school.",
                  why: "主语是 he，动词漏了 -s——-s 是“他”的信号灯。"
                },
                {
                  type: "contrast",
                  wrong: "Does he likes music?",
                  wrongZh: "（✗ 错句）",
                  right: "Does he like music?",
                  why: "does 已经把 -s 穿走了（一句话只穿一次），后面的 like 要还原成原形。"
                }
              ],
              point: "这就是三单现：主语是“他 / 她 / 它”，动词加 -s；does 出场，动词还原。",
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr05.1.1-p4",
              kind: "quiz",
              title: "练一练：-s 穿对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["He go to school.", "He goes to school.", "He going to school."],
                  answer: 1,
                  tip: "主语是 he（第三人称单数），动词要加 -s。"
                },
                {
                  type: "fill",
                  stemBefore: "She",
                  stemAfter: "apples.（like）",
                  answer: "likes",
                  accept: ["likes"],
                  tip: "主语是 she，like 直接加 -s。"
                },
                {
                  type: "choice",
                  stem: "“Does he likes music?”错在哪里？",
                  options: ["likes 应该还原为 like", "Does 应该改为 Do", "music 前面缺 the"],
                  answer: 0,
                  tip: "does 已经承担了三单标记，likes 不能再穿一次 -s。"
                },
                {
                  type: "fill",
                  stemBefore: "They",
                  stemAfter: "to school by bike.（go）",
                  answer: "go",
                  accept: ["go"],
                  tip: "主语是 they，不是第三人称单数——动词用原形，不加 -s。"
                }
              ],
              point: "自查：主语是 he / she / it 就加 -s；看到 does，动词还原。"
            }
          ]
        }
      ]
    }
  ]
};
