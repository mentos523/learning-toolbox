/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr10：非谓语动词（二）
 * 分词与独立主格
 *
 * 数据口径（M5）：window.ENG_CH["gr10"] = { id, title, sentences, units }，
 * 与数学 window.MATH_CH 同构；语法章节注册独立命名空间，
 * 与数学引擎、讲词根代码零交叉。
 *
 * 单元 gr10.1 分词（gr10.1.1–gr10.1.3）· 单元 gr10.2 独立主格与
 * 非谓语总表（gr10.2.1–gr10.2.3）。每课：观察页（例句先行 +
 * Y1 先猜后验）→ 交互页（tagging / sentence-builder）→ 讲解页
 * （examples → idcard → bridge → spell → contrast）→ 练习页
 * （Y3 判分：choice / fill）。
 * 例句全部来自 D3 三审台账（modules/english/data/_review/
 * ledger-gr10.json），id 一一对应，未终审例句不得入库。
 *
 * 内容分工：规则表述=英语专家队；讲解话术=黄队；
 * 例句=红队终审通过（见台账 first/final 记录）。
 * 撰写：语法生产C队（2026-10-14），状态 drafted，待三审。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr10"] = {
  id: "gr10",
  title: "非谓语动词（二）：分词与独立主格",
  /* 例句索引：键 = D3 台账例句 id；讲解页 blocks.type="examples" 按 id 引用。
   * 文本与台账 ledger-gr10.json 逐字一致。 */
  sentences: {
    /* ---------- gr10.1.1 现在分词作定语与状语 ---------- */
    "gr10.1.1-e1": { en: "The sleeping baby is my little brother.", zh: "正在睡觉的宝宝是我的弟弟。", reg: "通用",
      tagged: [ { w: "The baby", role: "subject", label: "主语" }, { w: "sleeping", role: "attribute", label: "定语（现在分词）" }, { w: "is", role: "verb", label: "谓语" }, { w: "my little brother", role: "complem", label: "表语" } ] },
    "gr10.1.1-e2": { en: "The girl talking to Tom is my classmate.", zh: "正在和汤姆说话的女孩是我的同学。", reg: "通用",
      tagged: [ { w: "The girl", role: "subject", label: "主语" }, { w: "talking to Tom", role: "attribute", label: "定语（现在分词短语）" }, { w: "is", role: "verb", label: "谓语" }, { w: "my classmate", role: "complem", label: "表语" } ] },
    "gr10.1.1-e3": { en: "Walking along the street, he met an old friend.", zh: "沿街走着，他遇到了一位老朋友。", reg: "通用",
      tagged: [ { w: "Walking along the street", role: "adverb", label: "状语（分词短语）" }, { w: "he", role: "subject", label: "主语" }, { w: "met", role: "verb", label: "谓语" }, { w: "an old friend", role: "object", label: "宾语" } ] },
    "gr10.1.1-e4": { en: "Hearing the news, she jumped up.", zh: "听到这个消息，她跳了起来。", reg: "通用",
      tagged: [ { w: "Hearing the news", role: "adverb", label: "状语（分词短语）" }, { w: "she", role: "subject", label: "主语" }, { w: "jumped up", role: "verb", label: "谓语" } ] },
    "gr10.1.1-e5": { en: "The man standing at the door is our teacher.", zh: "站在门口的那位男士是我们的老师。", reg: "通用",
      tagged: [ { w: "The man", role: "subject", label: "主语" }, { w: "standing at the door", role: "attribute", label: "定语（现在分词短语）" }, { w: "is", role: "verb", label: "谓语" }, { w: "our teacher", role: "complem", label: "表语" } ] },
    "gr10.1.1-e6": { en: "Walking along the street, a car hit me.", zh: "（✗ 错句）沿街走着，一辆车撞了我。", reg: "通用",
      tagged: [ { w: "Walking along the street", role: "adverb", label: "状语（分词短语）" }, { w: "a car", role: "subject", label: "主语" }, { w: "hit", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" } ] },
    "gr10.1.1-e7": { en: "The students playing soccer are from Class 3.", zh: "正在踢足球的学生来自三班。", reg: "通用",
      tagged: [ { w: "The students", role: "subject", label: "主语" }, { w: "playing soccer", role: "attribute", label: "定语（现在分词短语）" }, { w: "are", role: "verb", label: "谓语" }, { w: "from Class 3", role: "adverb", label: "状语" } ] },
    /* ---------- gr10.1.2 过去分词作定语与表语 ---------- */
    "gr10.1.2-e1": { en: "The broken bike is mine.", zh: "那辆坏了的自行车是我的。", reg: "通用",
      tagged: [ { w: "The bike", role: "subject", label: "主语" }, { w: "broken", role: "attribute", label: "定语（过去分词）" }, { w: "is", role: "verb", label: "谓语" }, { w: "mine", role: "complem", label: "表语" } ] },
    "gr10.1.2-e2": { en: "I'm interested in English.", zh: "我对英语感兴趣。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "'m", role: "verb", label: "谓语" }, { w: "interested", role: "complem", label: "表语（过去分词）" }, { w: "in English", role: "adverb", label: "状语" } ] },
    "gr10.1.2-e3": { en: "She was worried about the test.", zh: "她为考试担心。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "worried", role: "complem", label: "表语（过去分词）" }, { w: "about the test", role: "adverb", label: "状语" } ] },
    "gr10.1.2-e4": { en: "Fallen leaves covered the ground.", zh: "落叶铺满了地面。", reg: "通用",
      tagged: [ { w: "Fallen leaves", role: "subject", label: "主语（含过去分词定语）" }, { w: "covered", role: "verb", label: "谓语" }, { w: "the ground", role: "object", label: "宾语" } ] },
    "gr10.1.2-e5": { en: "He felt tired after the game.", zh: "比赛后他感到累。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "felt", role: "verb", label: "谓语" }, { w: "tired", role: "complem", label: "表语（过去分词）" }, { w: "after the game", role: "adverb", label: "状语" } ] },
    "gr10.1.2-e6": { en: "I'm bored.", zh: "我感到无聊。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "'m", role: "verb", label: "谓语" }, { w: "bored", role: "complem", label: "表语（过去分词）" } ] },
    "gr10.1.2-e7": { en: "I'm boring.", zh: "（✗ 错句）本想说“ 我感到无聊 ”。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "'m", role: "verb", label: "谓语" }, { w: "boring", role: "complem", label: "表语（现在分词）" } ] },
    /* ---------- gr10.1.3 分词的逻辑主语一致 ---------- */
    "gr10.1.3-e1": { en: "Seen from the hill, the town looks beautiful.", zh: "从山上看去，小镇很美。", reg: "通用",
      tagged: [ { w: "Seen from the hill", role: "adverb", label: "状语（分词短语）" }, { w: "the town", role: "subject", label: "主语（分词的逻辑主语）" }, { w: "looks", role: "verb", label: "谓语" }, { w: "beautiful", role: "complem", label: "表语" } ] },
    "gr10.1.3-e2": { en: "Walking in the park, I saw a bird.", zh: "在公园散步时，我看到一只鸟。", reg: "通用",
      tagged: [ { w: "Walking in the park", role: "adverb", label: "状语（分词短语）" }, { w: "I", role: "subject", label: "主语（分词的逻辑主语）" }, { w: "saw", role: "verb", label: "谓语" }, { w: "a bird", role: "object", label: "宾语" } ] },
    "gr10.1.3-e3": { en: "Written in easy English, the book is good for us.", zh: "这本书用浅显的英语写成，很适合我们。", reg: "通用",
      tagged: [ { w: "Written in easy English", role: "adverb", label: "状语（分词短语）" }, { w: "the book", role: "subject", label: "主语（分词的逻辑主语）" }, { w: "is", role: "verb", label: "谓语" }, { w: "good for us", role: "complem", label: "表语" } ] },
    "gr10.1.3-e4": { en: "Walking along the street, a car hit me.", zh: "（✗ 错句）沿街走着，一辆车撞了我。", reg: "通用",
      tagged: [ { w: "Walking along the street", role: "adverb", label: "状语（分词短语）" }, { w: "a car", role: "subject", label: "主语" }, { w: "hit", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" } ] },
    "gr10.1.3-e5": { en: "Being a rainy day, we stayed at home.", zh: "（✗ 错句）本想说“ 因为是雨天 ”。", reg: "通用",
      tagged: [ { w: "Being a rainy day", role: "adverb", label: "状语（分词短语）" }, { w: "we", role: "subject", label: "主语" }, { w: "stayed", role: "verb", label: "谓语" }, { w: "at home", role: "adverb", label: "状语" } ] },
    "gr10.1.3-e6": { en: "Seen from space, the earth looks blue.", zh: "从太空看去，地球是蓝色的。", reg: "通用",
      tagged: [ { w: "Seen from space", role: "adverb", label: "状语（分词短语）" }, { w: "the earth", role: "subject", label: "主语（分词的逻辑主语）" }, { w: "looks", role: "verb", label: "谓语" }, { w: "blue", role: "complem", label: "表语" } ] },
    "gr10.1.3-e7": { en: "Opening the box, he found a letter.", zh: "打开盒子，他发现一封信。", reg: "通用",
      tagged: [ { w: "Opening the box", role: "adverb", label: "状语（分词短语）" }, { w: "he", role: "subject", label: "主语（分词的逻辑主语）" }, { w: "found", role: "verb", label: "谓语" }, { w: "a letter", role: "object", label: "宾语" } ] },
    /* ---------- gr10.2.1 独立主格 ---------- */
    "gr10.2.1-e1": { en: "The work done, we went home.", zh: "工作做完，我们回家了。", reg: "通用",
      tagged: [ { w: "The work done", role: "adverb", label: "独立主格" }, { w: "we", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "home", role: "adverb", label: "状语" } ] },
    "gr10.2.1-e2": { en: "With the work done, we felt happy.", zh: "工作做完，我们很开心。", reg: "通用",
      tagged: [ { w: "With the work done", role: "adverb", label: "独立主格（with 复合结构）" }, { w: "we", role: "subject", label: "主语" }, { w: "felt", role: "verb", label: "谓语" }, { w: "happy", role: "complem", label: "表语" } ] },
    "gr10.2.1-e3": { en: "With Tom helping us, it was easy.", zh: "有汤姆帮忙，这事很简单。", reg: "通用",
      tagged: [ { w: "With Tom helping us", role: "adverb", label: "独立主格（with 复合结构）" }, { w: "it", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "easy", role: "complem", label: "表语" } ] },
    "gr10.2.1-e4": { en: "Her homework finished, she watched TV.", zh: "作业做完，她看了电视。", reg: "通用",
      tagged: [ { w: "Her homework finished", role: "adverb", label: "独立主格" }, { w: "she", role: "subject", label: "主语" }, { w: "watched", role: "verb", label: "谓语" }, { w: "TV", role: "object", label: "宾语" } ] },
    "gr10.2.1-e5": { en: "With winter coming, the days get short.", zh: "冬天来临，白天变短了。", reg: "通用",
      tagged: [ { w: "With winter coming", role: "adverb", label: "独立主格（with 复合结构）" }, { w: "the days", role: "subject", label: "主语" }, { w: "get", role: "verb", label: "谓语" }, { w: "short", role: "complem", label: "表语" } ] },
    "gr10.2.1-e6": { en: "Time permitting, I'll visit you.", zh: "时间允许的话，我会去看你。", reg: "通用",
      tagged: [ { w: "Time permitting", role: "adverb", label: "独立主格" }, { w: "I", role: "subject", label: "主语" }, { w: "'ll", role: "verb", label: "助动词" }, { w: "visit", role: "verb", label: "动词原形" }, { w: "you", role: "object", label: "宾语" } ] },
    "gr10.2.1-e7": { en: "With the work, we felt happy.", zh: "（✗ 错句）本想说“ 工作做完 ”。", reg: "通用",
      tagged: [ { w: "With the work", role: "adverb", label: "独立主格（残缺）" }, { w: "we", role: "subject", label: "主语" }, { w: "felt", role: "verb", label: "谓语" }, { w: "happy", role: "complem", label: "表语" } ] },
    /* ---------- gr10.2.2 非谓语总表与本章小结 ---------- */
    "gr10.2.2-e1": { en: "I want to buy a book.", zh: "我想买本书。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "want", role: "verb", label: "谓语" }, { w: "to buy a book", role: "object", label: "宾语（不定式）" } ] },
    "gr10.2.2-e2": { en: "I enjoy reading books.", zh: "我喜欢读书。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "enjoy", role: "verb", label: "谓语" }, { w: "reading books", role: "object", label: "宾语（动名词）" } ] },
    "gr10.2.2-e3": { en: "The broken cup is on the floor.", zh: "那个破了的杯子在地板上。", reg: "通用",
      tagged: [ { w: "The cup", role: "subject", label: "主语" }, { w: "broken", role: "attribute", label: "定语（过去分词）" }, { w: "is", role: "verb", label: "谓语" }, { w: "on the floor", role: "adverb", label: "状语" } ] },
    "gr10.2.2-e4": { en: "Swimming is good for health.", zh: "游泳有益健康。", reg: "通用",
      tagged: [ { w: "Swimming", role: "subject", label: "主语（动名词）" }, { w: "is", role: "verb", label: "谓语" }, { w: "good for health", role: "complem", label: "表语" } ] },
    "gr10.2.2-e5": { en: "The girl dancing is my sister.", zh: "正在跳舞的女孩是我姐姐。", reg: "通用",
      tagged: [ { w: "The girl", role: "subject", label: "主语" }, { w: "dancing", role: "attribute", label: "定语（现在分词）" }, { w: "is", role: "verb", label: "谓语" }, { w: "my sister", role: "complem", label: "表语" } ] },
    "gr10.2.2-e6": { en: "Seen from here, the lake is small.", zh: "从这儿看去，湖很小。", reg: "通用",
      tagged: [ { w: "Seen from here", role: "adverb", label: "状语（分词短语）" }, { w: "the lake", role: "subject", label: "主语（分词的逻辑主语）" }, { w: "is", role: "verb", label: "谓语" }, { w: "small", role: "complem", label: "表语" } ] },
    /* ---------- gr10.2.3 本章习题 ---------- */
    "gr10.2.3-e1": { en: "Falling leaves danced in the wind.", zh: "落叶在风中飞舞。", reg: "通用",
      tagged: [ { w: "Falling leaves", role: "subject", label: "主语（含现在分词定语）" }, { w: "danced", role: "verb", label: "谓语" }, { w: "in the wind", role: "adverb", label: "状语" } ] },
    "gr10.2.3-e2": { en: "The excited boy opened the gift.", zh: "兴奋的男孩打开了礼物。", reg: "通用",
      tagged: [ { w: "The boy", role: "subject", label: "主语" }, { w: "excited", role: "attribute", label: "定语（过去分词）" }, { w: "opened", role: "verb", label: "谓语" }, { w: "the gift", role: "object", label: "宾语" } ] },
    "gr10.2.3-e3": { en: "Crossing the road, she saw a cat.", zh: "过马路时，她看到一只猫。", reg: "通用",
      tagged: [ { w: "Crossing the road", role: "adverb", label: "状语（分词短语）" }, { w: "she", role: "subject", label: "主语（分词的逻辑主语）" }, { w: "saw", role: "verb", label: "谓语" }, { w: "a cat", role: "object", label: "宾语" } ] },
    "gr10.2.3-e4": { en: "I'm interested in history.", zh: "我对历史感兴趣。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "'m", role: "verb", label: "谓语" }, { w: "interested", role: "complem", label: "表语（过去分词）" }, { w: "in history", role: "adverb", label: "状语" } ] },
    "gr10.2.3-e5": { en: "With dinner ready, we sat down.", zh: "饭做好了，我们坐了下来。", reg: "通用",
      tagged: [ { w: "With dinner ready", role: "adverb", label: "独立主格（with 复合结构）" }, { w: "we", role: "subject", label: "主语" }, { w: "sat down", role: "verb", label: "谓语" } ] },
    "gr10.2.3-e6": { en: "Running down the street, his hat flew off.", zh: "（✗ 错句）本想说“ 沿街跑着 ”。", reg: "通用",
      tagged: [ { w: "Running down the street", role: "adverb", label: "状语（分词短语）" }, { w: "his hat", role: "subject", label: "主语" }, { w: "flew off", role: "verb", label: "谓语" } ] }
  },
  units: [
    {
      id: "gr10-u1",
      title: "分词",
      lessons: [
        /* ================= gr10.1.1 现在分词作定语与状语 ================= */
        {
          id: "gr10.1.1",
          title: "现在分词作定语与状语",
          pages: [
            {
              id: "gr10.1.1-p1",
              kind: "observe",
              title: "先看三句话：-ing 在修饰谁？",
              sentences: [
                { id: "gr10.1.1-e1", en: "The sleeping baby is my little brother.", zh: "正在睡觉的宝宝是我的弟弟。", reg: "通用",
                  tagged: [ { w: "The baby", role: "subject", label: "主语" }, { w: "sleeping", role: "attribute", label: "定语（现在分词）" }, { w: "is", role: "verb", label: "谓语" }, { w: "my little brother", role: "complem", label: "表语" } ] },
                { id: "gr10.1.1-e2", en: "The girl talking to Tom is my classmate.", zh: "正在和汤姆说话的女孩是我的同学。", reg: "通用",
                  tagged: [ { w: "The girl", role: "subject", label: "主语" }, { w: "talking to Tom", role: "attribute", label: "定语（现在分词短语）" }, { w: "is", role: "verb", label: "谓语" }, { w: "my classmate", role: "complem", label: "表语" } ] },
                { id: "gr10.1.1-e3", en: "Walking along the street, he met an old friend.", zh: "沿街走着，他遇到了一位老朋友。", reg: "通用",
                  tagged: [ { w: "Walking along the street", role: "adverb", label: "状语（分词短语）" }, { w: "he", role: "subject", label: "主语" }, { w: "met", role: "verb", label: "谓语" }, { w: "an old friend", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "三句话里，-ing 的意思都是“ 正在… ”吗？它在修饰名词还是修饰全句？",
                options: ["都是“ 正在… ”，修饰名词或全句", "意思各不相同", "都是修饰动词的"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "sleeping 修饰 baby（定语），Walking along the street 修饰全句（状语）——都是“ 主动、正在 ”的意思。"
            },
            {
              id: "gr10.1.1-p2",
              kind: "interact",
              title: "标出 -ing 块：定语还是状语？",
              exploreTip: "标出两句话的 -ing 块：它是站在名词后面（定语），还是站在句首（状语）？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The man", role: "subject", label: "主语" },
                      { w: "standing at the door", role: "attribute", label: "定语（现在分词短语）" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "our teacher", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "定语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "standing at the door 修饰哪个名词？标出它。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Walking along the street", role: "adverb", label: "状语（分词短语）" },
                      { w: "he", role: "subject", label: "主语" },
                      { w: "met", role: "verb", label: "谓语" },
                      { w: "an old friend", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "句首的 Walking along the street 修饰谁？标出它的成分。"
                  }
                }
              ],
              point: "站在名词后 = 定语；站在句首修饰全句 = 状语——位置不同，活儿不同。"
            },
            {
              id: "gr10.1.1-p3",
              kind: "explain",
              title: "现在分词：主动、正在",
              lead: "还记得吗？上一页 standing at the door 站在名词后，Walking along the street 站在句首。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr10.1.1-e1", "gr10.1.1-e2", "gr10.1.1-e3", "gr10.1.1-e4"],
                  note: "身份证已经亮出来了——看这四句话，-ing 和它修饰的词是什么关系？"
                },
                {
                  type: "idcard",
                  rule: "现在分词（doing）作定语表主动、进行；作状语表伴随、原因或时间。",
                  condition: "作定语时，被修饰的名词是分词动作的发出者（sleeping baby 在睡觉）；作状语时，分词的逻辑主语必须和主句主语一致；单个分词常前置（sleeping baby），分词短语后置（the girl talking to Tom）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 正在睡觉的宝宝 ”，“ 的 ”字结构永远前置；“ 沿街走着，他遇到了朋友 ”，前半句交代背景。",
                  en: "英语也一样：单个 doing 前置（sleeping baby），短语后置（the girl talking to Tom）；句首的 Walking along the street 就是“ 背景交代 ”。",
                  unbridge: "别把分词短语也前置（✗ the talking to Tom girl）——这是英语的规矩。"
                },
                {
                  type: "spell",
                  title: "现在分词三条：",
                  items: [
                    "一般直接加 -ing：go → going，sleep → sleeping",
                    "去 e 加 -ing：come → coming，write → writing",
                    "重读闭音节双写：run → running，swim → swimming"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "Walking along the street, a car hit me.",
                  wrongZh: "（✗ 错句）",
                  right: "Walking along the street, I was hit by a car.",
                  why: "分词要找自己的主语——走路的是“ 我 ”，不是“ 车 ”。"
                }
              ],
              point: "这就是现在分词：主动、正在；定语修饰名词，状语交代背景；分词先找主语。",
              pointScroll: true
            },
            {
              id: "gr10.1.1-p4",
              kind: "quiz",
              title: "练一练：-ing 放对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["The talking to Tom girl is my classmate.", "The girl talking to Tom is my classmate.", "The girl to talking Tom is my classmate."],
                  answer: 1,
                  tip: "分词短语作定语要后置：the girl talking to Tom。"
                },
                {
                  type: "fill",
                  stemBefore: "Look! The boy",
                  stemAfter: "is my brother.（swim）",
                  answer: "swimming",
                  accept: ["swimming"],
                  tip: "the boy 在游泳（主动、正在）→ 现在分词 swimming。"
                },
                {
                  type: "choice",
                  stem: "“ ___ along the street, he met an old friend.”横线填：",
                  options: ["Walk", "Walking", "Walked"],
                  answer: 1,
                  tip: "he 在走（主动）→ Walking；分词的逻辑主语是 he，和主句主语一致。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "the news, she jumped up.（hear）",
                  answer: "Hearing",
                  accept: ["Hearing"],
                  tip: "句首分词短语作状语：Hearing the news（听到这个消息）。"
                }
              ],
              point: "自查：-ing 表主动、正在；定语看位置（单个前、短语后）；状语先找主语。"
            }
          ]
        },
        /* ================= gr10.1.2 过去分词作定语与表语 ================= */
        {
          id: "gr10.1.2",
          title: "过去分词作定语与表语",
          pages: [
            {
              id: "gr10.1.2-p1",
              kind: "observe",
              title: "先看三句话：-ed 在讲“ 被 ”还是“ 感到 ”？",
              sentences: [
                { id: "gr10.1.2-e1", en: "The broken bike is mine.", zh: "那辆坏了的自行车是我的。", reg: "通用",
                  tagged: [ { w: "The bike", role: "subject", label: "主语" }, { w: "broken", role: "attribute", label: "定语（过去分词）" }, { w: "is", role: "verb", label: "谓语" }, { w: "mine", role: "complem", label: "表语" } ] },
                { id: "gr10.1.2-e2", en: "I'm interested in English.", zh: "我对英语感兴趣。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "'m", role: "verb", label: "谓语" }, { w: "interested", role: "complem", label: "表语（过去分词）" }, { w: "in English", role: "adverb", label: "状语" } ] },
                { id: "gr10.1.2-e4", en: "Fallen leaves covered the ground.", zh: "落叶铺满了地面。", reg: "通用",
                  tagged: [ { w: "Fallen leaves", role: "subject", label: "主语（含过去分词定语）" }, { w: "covered", role: "verb", label: "谓语" }, { w: "the ground", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "broken / interested / fallen 三个 -ed，意思一样吗？",
                options: ["都是“ 被… ”", "broken 是“ 被弄坏的 ”，interested 是“ 感到… ”，fallen 是“ 已落下的 ”", "都是“ 正在… ”"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "-ed 有三张脸：被动（broken）、感到（interested）、完成（fallen）。"
            },
            {
              id: "gr10.1.2-p2",
              kind: "interact",
              title: "标出 -ed 块：定语还是表语？",
              exploreTip: "标出两句话的 -ed 块：它是跟在名词后面（定语），还是跟在 be 后面（表语）？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The bike", role: "subject", label: "主语" },
                      { w: "broken", role: "attribute", label: "定语（过去分词）" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "mine", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "定语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "broken 修饰 bike——标出它的成分。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She", role: "subject", label: "主语" },
                      { w: "was", role: "verb", label: "谓语" },
                      { w: "worried", role: "complem", label: "表语（过去分词）" },
                      { w: "about the test", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "worried 跟在 was 后面——标出它的成分。"
                  }
                }
              ],
              point: "名词后 = 定语（broken bike）；be 后 = 表语（be interested）——位置决定活儿。"
            },
            {
              id: "gr10.1.2-p3",
              kind: "explain",
              title: "过去分词：被动、完成、感到",
              lead: "还记得吗？上一页 broken 站在名词后，worried 站在 was 后面。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr10.1.2-e1", "gr10.1.2-e4", "gr10.1.2-e2", "gr10.1.2-e5"],
                  note: "身份证已经亮出来了——看这四句话，-ed 和它修饰的词是什么关系？"
                },
                {
                  type: "idcard",
                  rule: "过去分词（done）作定语表被动或完成；be + done 作表语表状态（感到…）。",
                  condition: "作定语时，被修饰的名词是分词动作的承受者（bike 被弄坏）或动作已完成（leaves 已落下）；be interested / be worried 是形容词化用法，表“ 感到… ”的状态，不是被动语态。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 坏了的自行车 ”“ 我对英语感兴趣 ”——“ 的 ”字结构和“ 感到 ”分得很清。",
                  en: "英语用 -ed 一肩挑：broken bike（被弄坏的）、fallen leaves（已落下的）、I'm interested（我感到有兴趣）——看位置、看搭配，分三张脸。",
                  unbridge: "别把 be interested 当成被动语态（✗ “ 我被感兴趣 ”）——这是“ 感到 ”，不是“ 被 ”。"
                },
                {
                  type: "spell",
                  title: "过去分词两条：",
                  items: [
                    "规则动词：done = -ed 形（broken，finished，worried）",
                    "不规则单记：break-broke-broken，fall-fell-fallen，write-wrote-written"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "I'm boring.",
                  wrongZh: "（✗ 错句）本想说“ 我感到无聊 ”",
                  right: "I'm bored.",
                  why: "-ing 让别人…（boring 让人无聊），-ed 自己感到…（bored 感到无聊）。"
                }
              ],
              point: "这就是过去分词：被动、完成、感到；-ing 让别人…，-ed 自己感到…。",
              pointScroll: true
            },
            {
              id: "gr10.1.2-p4",
              kind: "quiz",
              title: "练一练：-ing 还是 -ed？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 我感到无聊。 ”英文是：",
                  options: ["I'm boring.", "I'm bored.", "I'm bore."],
                  answer: 1,
                  tip: "自己感到… 用 -ed：bored。"
                },
                {
                  type: "fill",
                  stemBefore: "The",
                  stemAfter: "bike is mine.（break）",
                  answer: "broken",
                  accept: ["broken"],
                  tip: "bike 是被弄坏的（被动）→ 过去分词 broken。"
                },
                {
                  type: "choice",
                  stem: "“ 这部电影很无聊（让人无聊）。 ”英文是：",
                  options: ["The film is bored.", "The film is boring.", "The film is bore."],
                  answer: 1,
                  tip: "让别人… 用 -ing：boring。"
                },
                {
                  type: "fill",
                  stemBefore: "He felt",
                  stemAfter: "after the game.（tire）",
                  answer: "tired",
                  accept: ["tired"],
                  tip: "felt 后面表“ 感到… ”→ tired。"
                }
              ],
              point: "自查：让别人… 用 -ing，自己感到… 用 -ed；被动 / 完成用 -ed。"
            }
          ]
        },
        /* ================= gr10.1.3 分词的逻辑主语一致 ================= */
        {
          id: "gr10.1.3",
          title: "分词的逻辑主语一致",
          pages: [
            {
              id: "gr10.1.3-p1",
              kind: "observe",
              title: "先看三句话：谁在“ 走 ”？谁在“ 看 ”？",
              sentences: [
                { id: "gr10.1.3-e2", en: "Walking in the park, I saw a bird.", zh: "在公园散步时，我看到一只鸟。", reg: "通用",
                  tagged: [ { w: "Walking in the park", role: "adverb", label: "状语（分词短语）" }, { w: "I", role: "subject", label: "主语（分词的逻辑主语）" }, { w: "saw", role: "verb", label: "谓语" }, { w: "a bird", role: "object", label: "宾语" } ] },
                { id: "gr10.1.3-e1", en: "Seen from the hill, the town looks beautiful.", zh: "从山上看去，小镇很美。", reg: "通用",
                  tagged: [ { w: "Seen from the hill", role: "adverb", label: "状语（分词短语）" }, { w: "the town", role: "subject", label: "主语（分词的逻辑主语）" }, { w: "looks", role: "verb", label: "谓语" }, { w: "beautiful", role: "complem", label: "表语" } ] },
                { id: "gr10.1.3-e4", en: "Walking along the street, a car hit me.", zh: "（✗ 错句）沿街走着，一辆车撞了我。", reg: "通用",
                  tagged: [ { w: "Walking along the street", role: "adverb", label: "状语（分词短语）" }, { w: "a car", role: "subject", label: "主语" }, { w: "hit", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "第三句错在哪？“ 走路 ”的人是谁，主句的主语又是谁？",
                options: ["走路的是 a car，和主语一致", "走路的应该是人，但主语是 a car——对不上", "没有错误"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "分词是“ 没主语的动作 ”，它的主人必须和主句主语是同一个人——这叫逻辑主语一致。"
            },
            {
              id: "gr10.1.3-p2",
              kind: "interact",
              title: "给分词找主人",
              exploreTip: "标出分词短语，再标出它的逻辑主语（主人）：是主句主语吗？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Seen from the hill", role: "adverb", label: "状语（分词短语）" },
                      { w: "the town", role: "subject", label: "主语（分词的逻辑主语）" },
                      { w: "looks", role: "verb", label: "谓语" },
                      { w: "beautiful", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "谁“ 被看 ”？the town 既是主语，也是 seen 的逻辑主语。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Opening the box", role: "adverb", label: "状语（分词短语）" },
                      { w: "he", role: "subject", label: "主语（分词的逻辑主语）" },
                      { w: "found", role: "verb", label: "谓语" },
                      { w: "a letter", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "谁“ 打开盒子 ”？标出 Opening 的逻辑主语。"
                  }
                }
              ],
              point: "自查口诀：分词找主语——分词的动作是谁干的，主句主语就得是谁。"
            },
            {
              id: "gr10.1.3-p3",
              kind: "explain",
              title: "悬垂分词专治",
              lead: "还记得吗？上一页 the town 既“ 被看 ”又当主语，he 既“ 打开 ”又当主语。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr10.1.3-e1", "gr10.1.3-e2", "gr10.1.3-e7"],
                  note: "身份证已经亮出来了——三句话里，分词的主人和主句主语都是同一个人。"
                },
                {
                  type: "idcard",
                  rule: "分词短语作状语时，它的逻辑主语必须和主句主语一致；不一致就是悬垂分词（dangling），必须改。",
                  condition: "Seen from the hill, the town…（看的主体泛指“ 人 ”，被看的是 the town，逻辑自洽）；改法二选一：换主句主语，或把分词改成从句（When I was walking…）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 走着走着，天黑了 ”，大家能听懂，没人较真“ 谁在走 ”。",
                  en: "英语较真：分词是没主语的动作，读者会自动把主句主语当它的主人——主人对不上，句子就“ 悬空 ”了。",
                  unbridge: "别拿汉语的“ 能听懂 ”套英语——英语里分词必须先找主语，这是硬规矩。"
                },
                {
                  type: "contrast",
                  wrong: "Walking along the street, a car hit me.",
                  wrongZh: "（✗ 错句）",
                  right: "Walking along the street, I was hit by a car.",
                  why: "走路的是“ 我 ”，不是“ 车 ”——分词找主语，主人对不上就悬空。"
                },
                {
                  type: "contrast",
                  wrong: "Being a rainy day, we stayed at home.",
                  wrongZh: "（✗ 错句）",
                  right: "It being a rainy day, we stayed at home.",
                  why: "“ 是雨天 ”的主人是 it（天），不是 we——主人不同就请独立主格（下节）。"
                }
              ],
              point: "这就是逻辑主语一致：分词找主语，主人必须和主句主语是同一个人。",
              pointScroll: true
            },
            {
              id: "gr10.1.3-p4",
              kind: "quiz",
              title: "练一练：分词的主人是谁？",
              questions: [
                {
                  type: "choice",
                  stem: "哪一句是悬垂分词（有错）？",
                  options: ["Walking in the park, I saw a bird.", "Walking along the street, a car hit me.", "Opening the box, he found a letter."],
                  answer: 1,
                  tip: "走路的应该是人，但主语是 a car——主人对不上。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "from the hill, the town looks beautiful.（see）",
                  answer: "Seen",
                  accept: ["Seen"],
                  tip: "the town 是被看的（被动）→ Seen；逻辑主语 the town 和主句主语一致。"
                },
                {
                  type: "choice",
                  stem: "“ Being a rainy day, we stayed at home.”应改为：",
                  options: ["Being a rainy day, it stayed at home.", "It being a rainy day, we stayed at home.", "Be a rainy day, we stayed at home."],
                  answer: 1,
                  tip: "主人是 it（天）不是 we——请独立主格：It being…。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "the box, he found a letter.（open）",
                  answer: "Opening",
                  accept: ["Opening"],
                  tip: "he 打开盒子（主动）→ Opening；逻辑主语 he 和主句主语一致。"
                }
              ],
              point: "自查三问：分词的动作是谁干的？主句主语是谁？是同一个人吗？"
            }
          ]
        }
      ]
    },
    {
      id: "gr10-u2",
      title: "独立主格与非谓语总表",
      lessons: [
        /* ================= gr10.2.1 独立主格 ================= */
        {
          id: "gr10.2.1",
          title: "独立主格",
          pages: [
            {
              id: "gr10.2.1-p1",
              kind: "observe",
              title: "先看三句话：谁“ 自带主语 ”？",
              sentences: [
                { id: "gr10.2.1-e1", en: "The work done, we went home.", zh: "工作做完，我们回家了。", reg: "通用",
                  tagged: [ { w: "The work done", role: "adverb", label: "独立主格" }, { w: "we", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "home", role: "adverb", label: "状语" } ] },
                { id: "gr10.2.1-e2", en: "With the work done, we felt happy.", zh: "工作做完，我们很开心。", reg: "通用",
                  tagged: [ { w: "With the work done", role: "adverb", label: "独立主格（with 复合结构）" }, { w: "we", role: "subject", label: "主语" }, { w: "felt", role: "verb", label: "谓语" }, { w: "happy", role: "complem", label: "表语" } ] },
                { id: "gr10.2.1-e4", en: "Her homework finished, she watched TV.", zh: "作业做完，她看了电视。", reg: "通用",
                  tagged: [ { w: "Her homework finished", role: "adverb", label: "独立主格" }, { w: "she", role: "subject", label: "主语" }, { w: "watched", role: "verb", label: "谓语" }, { w: "TV", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "三句话里，“ 工作 / 作业 ”是谁的动作对象？它和主句主语（we / she）是同一个人吗？",
                options: ["是同一个人", "不是——“ 工作 / 作业 ”自带主语，不跟主句抢", "没有主语"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "The work done 自带主语（the work），不借主句的 we——这就是“ 独立 ”。"
            },
            {
              id: "gr10.2.1-p2",
              kind: "interact",
              title: "标出独立小分队",
              exploreTip: "标出两句话的独立主格块：名词 + 分词，自带主语的小分队。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The work done", role: "adverb", label: "独立主格" },
                      { w: "we", role: "subject", label: "主语" },
                      { w: "went", role: "verb", label: "谓语" },
                      { w: "home", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" }
                    ],
                    hint: "The work done 里，the work 是谁？done 是什么？标出这个小分队。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "With Tom helping us", role: "adverb", label: "独立主格（with 复合结构）" },
                      { w: "it", role: "subject", label: "主语" },
                      { w: "was", role: "verb", label: "谓语" },
                      { w: "easy", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "With Tom helping us 里，Tom 是谁的主语？标出 with 小分队。"
                  }
                }
              ],
              point: "独立主格 = 名词 / 代词 + 分词，自带主语；with 是小分队的“ 队长 ”。"
            },
            {
              id: "gr10.2.1-p3",
              kind: "explain",
              title: "独立主格：自带主语的小分队",
              lead: "还记得吗？上一课 Being a rainy day 的主人是 it 不是 we——主人不同，就请独立主格。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr10.2.1-e1", "gr10.2.1-e2", "gr10.2.1-e3"],
                  note: "身份证已经亮出来了——看这三句话，小分队各带了谁当主语？"
                },
                {
                  type: "idcard",
                  rule: "独立主格 = 名词 / 代词 + 分词（doing / done），自带逻辑主语，作状语；with 复合结构 = with + 名词 + 分词 / 形容词 / 介词短语。",
                  condition: "独立主格的逻辑主语 ≠ 主句主语（相等就用普通分词短语，不用独立主格）；with 后成分必须完整（名词 + 分词 / 形容词 / 副词 / 介词短语）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 工作做完，我们回家了 ”——两个小句并列，各有各的主语。",
                  en: "英语把前半句压缩成“ 独立小分队 ”：The work done（工作 + 做完），自带主语 the work，不跟主句的 we 抢；with 是队长，带着小分队站在句首。",
                  unbridge: "别在主语相同时还用独立主格（✗ He coming, he smiled）——主人相同，直接用分词短语。"
                },
                {
                  type: "contrast",
                  wrong: "With the work, we felt happy.",
                  wrongZh: "（✗ 错句）",
                  right: "With the work done, we felt happy.",
                  why: "with 后面要跟完整小分队（名词 + 分词），done 不能丢——残缺的小分队站不住。"
                }
              ],
              point: "这就是独立主格：名词 / 代词自带分词，不跟主句抢主语；with 带队。",
              pointScroll: true
            },
            {
              id: "gr10.2.1-p4",
              kind: "quiz",
              title: "练一练：小分队完整吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["With the work, we felt happy.", "With the work done, we felt happy.", "With the work doing, we felt happy."],
                  answer: 1,
                  tip: "工作是被做完的（被动）→ done；with 后小分队要完整。"
                },
                {
                  type: "fill",
                  stemBefore: "With winter",
                  stemAfter: ", the days get short.（come）",
                  answer: "coming",
                  accept: ["coming"],
                  tip: "冬天来临（主动）→ coming；winter 是 coming 的逻辑主语。"
                },
                {
                  type: "choice",
                  stem: "“ Her homework ___, she watched TV.”横线填：",
                  options: ["finishing", "finished", "finish"],
                  answer: 1,
                  tip: "作业是被做完的（被动）→ finished；homework 自带主语，是独立主格。"
                },
                {
                  type: "fill",
                  stemBefore: "Time",
                  stemAfter: ", I'll visit you.（permit）",
                  answer: "permitting",
                  accept: ["permitting"],
                  tip: "时间允许（主动）→ permitting；Time permitting 是固定独立主格。"
                }
              ],
              point: "自查：小分队自带主语吗？with 后完整吗？主动 doing / 被动 done 选对了吗？"
            }
          ]
        },
        /* ================= gr10.2.2 非谓语总表与本章小结 ================= */
        {
          id: "gr10.2.2",
          title: "非谓语总表与本章小结",
          pages: [
            {
              id: "gr10.2.2-p1",
              kind: "observe",
              title: "先看三句话：to do / doing / done",
              sentences: [
                { id: "gr10.2.2-e1", en: "I want to buy a book.", zh: "我想买本书。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "want", role: "verb", label: "谓语" }, { w: "to buy a book", role: "object", label: "宾语（不定式）" } ] },
                { id: "gr10.2.2-e2", en: "I enjoy reading books.", zh: "我喜欢读书。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "enjoy", role: "verb", label: "谓语" }, { w: "reading books", role: "object", label: "宾语（动名词）" } ] },
                { id: "gr10.2.2-e3", en: "The broken cup is on the floor.", zh: "那个破了的杯子在地板上。", reg: "通用",
                  tagged: [ { w: "The cup", role: "subject", label: "主语" }, { w: "broken", role: "attribute", label: "定语（过去分词）" }, { w: "is", role: "verb", label: "谓语" }, { w: "on the floor", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "to buy / reading / broken——三个“ 非谓语 ”各长什么样？各在干什么活？",
                options: ["长得一样，活也一样", "to do / doing / done 三种长相，作宾语 / 宾语 / 定语", "都是谓语"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "非谓语三分法：to do / doing / done——一个句子只能有一个谓语，第二个动词必须“ 变形 ”。"
            },
            {
              id: "gr10.2.2-p2",
              kind: "explain",
              title: "非谓语三分法总表",
              lead: "本章三员大将集结：现在分词、过去分词、独立主格——加上 gr09 的不定式和动名词，就是全家福。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr10.2.2-e1", "gr10.2.2-e2", "gr10.2.2-e5", "gr10.2.2-e3"],
                  note: "四句话，四种变形——看看每个动词为什么选这种变形。"
                },
                {
                  type: "idcard",
                  rule: "非谓语三分法：to do（将来 / 目的）— doing（主动 / 进行）— done（被动 / 完成）；选哪种，看逻辑主语和语态。",
                  condition: "做题两问：① 逻辑主语是谁？和主句主语一致吗？② 主动还是被动？正在还是已完成？（高考非谓语全家福）"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 我想买书 ”，两个动词排排站，不用变形。",
                  en: "英语一个句子只能有一个“ 老大 ”（谓语），第二个动词必须“ 变形 ”进车间：to do、doing、done 三选一——选错出口就报警。",
                  unbridge: "别“ 背搭配 ”不看逻辑——非谓语选形，看的是逻辑主语和语态，不是死记。"
                },
                {
                  type: "contrast",
                  wrong: "Walking along the street, a car hit me.",
                  wrongZh: "（✗ 错句）",
                  right: "Walking along the street, I was hit by a car.",
                  why: "本章最大的坑：分词的逻辑主语和主句主语必须是同一个人。"
                },
                {
                  type: "contrast",
                  wrong: "I'm boring.",
                  wrongZh: "（✗ 错句）本想说“ 我感到无聊 ”",
                  right: "I'm bored.",
                  why: "本章第二大坑：-ing 让别人…，-ed 自己感到…。"
                }
              ],
              point: "非谓语 = 第二个动词的变形；选形两问：逻辑主语是谁？主动还是被动？",
              pointScroll: true
            },
            {
              id: "gr10.2.2-p3",
              kind: "quiz",
              title: "本章综合辨析",
              questions: [
                {
                  type: "choice",
                  stem: "“ ___ from here, the lake is small.”横线填：",
                  options: ["Seeing", "Seen", "To see"],
                  answer: 1,
                  tip: "lake 是被看的（被动）→ Seen；逻辑主语 the lake 和主句主语一致。"
                },
                {
                  type: "fill",
                  stemBefore: "The girl",
                  stemAfter: "is my sister.（dance）",
                  answer: "dancing",
                  accept: ["dancing"],
                  tip: "girl 在跳舞（主动、正在）→ dancing 作定语。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“ Running down the street, his hat flew off.”应改为：",
                  options: ["Running down the street, his hat flew off.", "Running down the street, he lost his hat.", "Run down the street, his hat flew off."],
                  answer: 1,
                  tip: "跑的是 he，不是 hat——分词找主语，主人对不上就悬空。"
                },
                {
                  type: "fill",
                  stemBefore: "With dinner",
                  stemAfter: ", we sat down.（ready）",
                  answer: "ready",
                  accept: ["ready"],
                  tip: "with 复合结构：with + 名词 + 形容词（ready）。"
                }
              ],
              point: "本章自查：-ing / -ed 选对了吗？分词找到主人了吗？独立主格完整吗？"
            }
          ]
        },
        /* ================= gr10.2.3 本章习题 ================= */
        {
          id: "gr10.2.3",
          title: "本章习题",
          pages: [
            {
              id: "gr10.2.3-p1",
              kind: "quiz",
              title: "分词专项练习",
              questions: [
                {
                  type: "choice",
                  stem: "“ ___ leaves danced in the wind.”横线填：",
                  options: ["Falling", "Fallen", "To fall"],
                  answer: 0,
                  tip: "叶子在落（主动、正在）→ Falling。"
                },
                {
                  type: "fill",
                  stemBefore: "The",
                  stemAfter: "boy opened the gift.（excite）",
                  answer: "excited",
                  accept: ["excited"],
                  tip: "男孩感到兴奋（感到…）→ excited。"
                },
                {
                  type: "choice",
                  stem: "哪一句没有悬垂分词？",
                  options: ["Crossing the road, she saw a cat.", "Running down the street, his hat flew off.", "Being a rainy day, we stayed at home."],
                  answer: 0,
                  tip: "she 过马路（主人一致）；后两句主人对不上。"
                },
                {
                  type: "fill",
                  stemBefore: "I'm",
                  stemAfter: "in history.（interest）",
                  answer: "interested",
                  accept: ["interested"],
                  tip: "be interested in（对…感兴趣）→ interested。"
                }
              ],
              point: "-ing 主动正在，-ed 被动感到；分词先找主人。"
            },
            {
              id: "gr10.2.3-p2",
              kind: "quiz",
              title: "高考综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "“ With ___ ready, we sat down.”横线填：",
                  options: ["dinner", "dinner is", "dinners"],
                  answer: 0,
                  tip: "with 后跟名词 + 形容词（With dinner ready），不加 is——加了 is 就成谓语了。"
                },
                {
                  type: "fill",
                  stemBefore: "Time",
                  stemAfter: ", I'll visit you.（permit）",
                  answer: "permitting",
                  accept: ["permitting"],
                  tip: "时间允许（主动）→ permitting；Time permitting 是固定独立主格。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“ Walking along the street, a car hit me.”应改为：",
                  options: ["Walking along the street, a car hit me.", "Walking along the street, I was hit by a car.", "Walk along the street, a car hit me."],
                  answer: 1,
                  tip: "走路的是 I，不是 car——分词找主语。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "from the hill, the town looks beautiful.（see）",
                  answer: "Seen",
                  accept: ["Seen"],
                  tip: "the town 被看（被动）→ Seen。"
                }
              ],
              point: "本章通关：逻辑主语一致是高考改错高频设错点。"
            }
          ]
        }
      ]
    }
  ]
};
