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
  title: "动词的时与体（一）：一般现在/过去/将来",
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
      tagged: [ { w: "Does", role: "verb", label: "助动词" }, { w: "he", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "动词原形" }, { w: "a pen", role: "object", label: "宾语" } ] },
    /* ---------- gr05.1.2 现在时的时间状语 ---------- */
    "gr05.1.2-e1": { en: "He often plays basketball after school.", zh: "他放学后经常打篮球。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "often", role: "adverb", label: "状语" }, { w: "plays", role: "verb", label: "谓语" }, { w: "basketball", role: "object", label: "宾语" }, { w: "after school", role: "adverb", label: "状语" } ] },
    "gr05.1.2-e2": { en: "She is always late for school.", zh: "她上学总是迟到。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "always", role: "adverb", label: "状语" }, { w: "late", role: "complem", label: "表语" }, { w: "for school", role: "adverb", label: "状语" } ] },
    "gr05.1.2-e3": { en: "They play soccer every day.", zh: "他们每天都踢足球。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "play", role: "verb", label: "谓语" }, { w: "soccer", role: "object", label: "宾语" }, { w: "every day", role: "adverb", label: "状语" } ] },
    "gr05.1.2-e4": { en: "She is never late for school.", zh: "她上学从不迟到。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "never", role: "adverb", label: "状语" }, { w: "late", role: "complem", label: "表语" }, { w: "for school", role: "adverb", label: "状语" } ] },
    "gr05.1.2-e5": { en: "I usually get up at six.", zh: "我通常六点起床。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "usually", role: "adverb", label: "状语" }, { w: "get up", role: "verb", label: "谓语" }, { w: "at six", role: "adverb", label: "状语" } ] },
    "gr05.1.2-e6": { en: "My father sometimes watches the news on TV.", zh: "我爸爸有时在电视上看新闻。（news 前面要加 the）", reg: "通用",
      tagged: [ { w: "My father", role: "subject", label: "主语" }, { w: "sometimes", role: "adverb", label: "状语" }, { w: "watches", role: "verb", label: "谓语" }, { w: "the news", role: "object", label: "宾语" }, { w: "on TV", role: "adverb", label: "状语" } ] },
    "gr05.1.2-e7": { en: "He often is late.", zh: "（错句）他经常迟到。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "often", role: "adverb", label: "状语" }, { w: "is", role: "verb", label: "谓语" }, { w: "late", role: "complem", label: "表语" } ] },
    "gr05.1.2-e8": { en: "I do sports everyday.", zh: "（错句）我每天运动。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "do", role: "verb", label: "谓语" }, { w: "sports", role: "object", label: "宾语" }, { w: "everyday", role: "adverb", label: "状语" } ] },
    /* ---------- gr05.1.3 一般过去时 ---------- */
    "gr05.1.3-e1": { en: "I watched a film yesterday.", zh: "我昨天看了一部电影。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "watched", role: "verb", label: "谓语" }, { w: "a film", role: "object", label: "宾语" }, { w: "yesterday", role: "adverb", label: "状语" } ] },
    "gr05.1.3-e2": { en: "She went to Beijing last year.", zh: "她去年去了北京。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "to Beijing", role: "adverb", label: "状语" }, { w: "last year", role: "adverb", label: "状语" } ] },
    "gr05.1.3-e3": { en: "They played soccer after class.", zh: "他们下课后踢了足球。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "played", role: "verb", label: "谓语" }, { w: "soccer", role: "object", label: "宾语" }, { w: "after class", role: "adverb", label: "状语" } ] },
    "gr05.1.3-e4": { en: "Did she clean the room?", zh: "她打扫房间了吗？", reg: "通用",
      tagged: [ { w: "Did", role: "verb", label: "助动词" }, { w: "she", role: "subject", label: "主语" }, { w: "clean", role: "verb", label: "动词原形" }, { w: "the room", role: "object", label: "宾语" } ] },
    "gr05.1.3-e5": { en: "He didn't go out last night.", zh: "他昨晚没出门。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "didn't", role: "verb", label: "助动词" }, { w: "go", role: "verb", label: "动词原形" }, { w: "out", role: "adverb", label: "状语" }, { w: "last night", role: "adverb", label: "状语" } ] },
    "gr05.1.3-e6": { en: "We ate noodles for lunch.", zh: "我们午饭吃了面条。", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "ate", role: "verb", label: "谓语" }, { w: "noodles", role: "object", label: "宾语" }, { w: "for lunch", role: "adverb", label: "状语" } ] },
    "gr05.1.3-e7": { en: "Did they win the game?", zh: "他们赢了比赛吗？", reg: "通用",
      tagged: [ { w: "Did", role: "verb", label: "助动词" }, { w: "they", role: "subject", label: "主语" }, { w: "win", role: "verb", label: "动词原形" }, { w: "the game", role: "object", label: "宾语" } ] },
    "gr05.1.3-e8": { en: "I go there yesterday.", zh: "（错句）我昨天去那儿了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "go", role: "verb", label: "谓语" }, { w: "there", role: "adverb", label: "状语" }, { w: "yesterday", role: "adverb", label: "状语" } ] },
    "gr05.1.3-e9": { en: "Did you went there?", zh: "（错句）你去那儿了吗？", reg: "通用",
      tagged: [ { w: "Did", role: "verb", label: "助动词" }, { w: "you", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "there", role: "adverb", label: "状语" } ] },
    /* ---------- gr05.1.4 过去时的时间状语与 used to ---------- */
    "gr05.1.4-e1": { en: "I got up late this morning.", zh: "我今天早上起晚了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "got up", role: "verb", label: "谓语" }, { w: "late", role: "adverb", label: "状语" }, { w: "this morning", role: "adverb", label: "状语" } ] },
    "gr05.1.4-e2": { en: "He moved here two years ago.", zh: "他两年前搬到这儿。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "moved", role: "verb", label: "谓语" }, { w: "here", role: "adverb", label: "状语" }, { w: "two years ago", role: "adverb", label: "状语" } ] },
    "gr05.1.4-e3": { en: "I used to get up late.", zh: "我过去常常起得很晚。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "used to", role: "verb", label: "助动词" }, { w: "get up", role: "verb", label: "动词原形" }, { w: "late", role: "adverb", label: "状语" } ] },
    "gr05.1.4-e4": { en: "She left an hour ago.", zh: "她一小时前离开了。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "left", role: "verb", label: "谓语" }, { w: "an hour ago", role: "adverb", label: "状语" } ] },
    "gr05.1.4-e5": { en: "They used to live in Shanghai.", zh: "他们过去常住在上海。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "used to", role: "verb", label: "助动词" }, { w: "live", role: "verb", label: "动词原形" }, { w: "in Shanghai", role: "adverb", label: "状语" } ] },
    "gr05.1.4-e6": { en: "My grandpa used to tell stories.", zh: "我爷爷过去常讲故事。", reg: "通用",
      tagged: [ { w: "My grandpa", role: "subject", label: "主语" }, { w: "used to", role: "verb", label: "助动词" }, { w: "tell", role: "verb", label: "动词原形" }, { w: "stories", role: "object", label: "宾语" } ] },
    "gr05.1.4-e7": { en: "I used to getting up late.", zh: "（错句）我过去常常起得很晚。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "used to", role: "verb", label: "助动词" }, { w: "getting up", role: "verb", label: "动词-ing" }, { w: "late", role: "adverb", label: "状语" } ] },
    "gr05.1.4-e8": { en: "He came here two years before.", zh: "（错句）他两年前来到这儿。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "came", role: "verb", label: "谓语" }, { w: "here", role: "adverb", label: "状语" }, { w: "two years before", role: "adverb", label: "状语" } ] },
    /* ---------- gr05.2.1 一般将来时 ---------- */
    "gr05.2.1-e1": { en: "I will help you.", zh: "我来帮你。", reg: "口语",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "help", role: "verb", label: "动词原形" }, { w: "you", role: "object", label: "宾语" } ] },
    "gr05.2.1-e2": { en: "It is going to rain.", zh: "天要下雨了。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "is going to", role: "verb", label: "助动词" }, { w: "rain", role: "verb", label: "动词原形" } ] },
    "gr05.2.1-e3": { en: "They will visit the museum tomorrow.", zh: "他们明天要参观博物馆。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "visit", role: "verb", label: "动词原形" }, { w: "the museum", role: "object", label: "宾语" }, { w: "tomorrow", role: "adverb", label: "状语" } ] },
    "gr05.2.1-e4": { en: "She will call you tonight.", zh: "她今晚会给你打电话。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "call", role: "verb", label: "动词原形" }, { w: "you", role: "object", label: "宾语" }, { w: "tonight", role: "adverb", label: "状语" } ] },
    "gr05.2.1-e5": { en: "We are going to have a test.", zh: "我们要进行一次考试。", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "are going to", role: "verb", label: "助动词" }, { w: "have", role: "verb", label: "动词原形" }, { w: "a test", role: "object", label: "宾语" } ] },
    "gr05.2.1-e6": { en: "Look! It is going to snow.", zh: "看！天要下雪了。", reg: "口语",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "is going to", role: "verb", label: "助动词" }, { w: "snow", role: "verb", label: "动词原形" } ] },
    "gr05.2.1-e7": { en: "I will to go there.", zh: "（错句）我要去那儿。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "to go", role: "verb", label: "动词不定式" }, { w: "there", role: "adverb", label: "状语" } ] },
    "gr05.2.1-e8": { en: "I go tomorrow.", zh: "（错句）我明天去。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "go", role: "verb", label: "谓语" }, { w: "tomorrow", role: "adverb", label: "状语" } ] },
    /* ---------- gr05.2.2 will vs be going to ---------- */
    "gr05.2.2-e1": { en: "I will get it!", zh: "我去接！", reg: "口语",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "get", role: "verb", label: "动词原形" }, { w: "it", role: "object", label: "宾语" } ] },
    "gr05.2.2-e2": { en: "Look! It is going to rain.", zh: "看！天要下雨了。", reg: "口语",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "is going to", role: "verb", label: "助动词" }, { w: "rain", role: "verb", label: "动词原形" } ] },
    "gr05.2.2-e3": { en: "We are going to visit Beijing next month.", zh: "我们下个月要去北京玩。", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "are going to", role: "verb", label: "助动词" }, { w: "visit", role: "verb", label: "动词原形" }, { w: "Beijing", role: "object", label: "宾语" }, { w: "next month", role: "adverb", label: "状语" } ] },
    "gr05.2.2-e4": { en: "I will carry it for you.", zh: "我来帮你拿。（主动提出）", reg: "口语",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "carry", role: "verb", label: "动词原形" }, { w: "it", role: "object", label: "宾语" }, { w: "for you", role: "adverb", label: "状语" } ] },
    "gr05.2.2-e5": { en: "She is going to be a doctor.", zh: "她打算当医生。（人生计划）", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is going to", role: "verb", label: "助动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "a doctor", role: "complem", label: "表语" } ] },
    "gr05.2.2-e6": { en: "I will call him back.", zh: "我会给他回电话。（当场决定）", reg: "口语",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "call", role: "verb", label: "动词原形" }, { w: "him", role: "object", label: "宾语" }, { w: "back", role: "adverb", label: "状语" } ] },
    "gr05.2.2-e7": { en: "I'm will get it!", zh: "（✗ 错句）“我是 will 去接！”——will 和 be going to 杂糅了，will 后面只能跟动词原形。", reg: "口语",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "I'm will", role: "verb", label: "助动词（杂糅）" }, { w: "get", role: "verb", label: "动词原形" }, { w: "it", role: "object", label: "宾语" } ] },
    "gr05.2.2-e8": { en: "Look! It will rain.", zh: "（错句，乌云场景）看！天要下雨了。", reg: "口语",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "rain", role: "verb", label: "动词原形" } ] },
    /* ---------- gr05.2.3 过去将来初识 ---------- */
    "gr05.2.3-e1": { en: "He said he would come.", zh: "他说他会来。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "said", role: "verb", label: "谓语" }, { w: "he", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "情态动词" }, { w: "come", role: "verb", label: "动词原形" } ] },
    "gr05.2.3-e2": { en: "I knew it would rain.", zh: "我知道天会下雨。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "knew", role: "verb", label: "谓语" }, { w: "it", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "情态动词" }, { w: "rain", role: "verb", label: "动词原形" } ] },
    "gr05.2.3-e3": { en: "She told me she would help.", zh: "她告诉我她会帮忙。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "told", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" }, { w: "she", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "情态动词" }, { w: "help", role: "verb", label: "动词原形" } ] },
    "gr05.2.3-e4": { en: "They thought it would be easy.", zh: "他们以为那会很容易。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "thought", role: "verb", label: "谓语" }, { w: "it", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "easy", role: "complem", label: "表语" } ] },
    "gr05.2.3-e5": { en: "I didn't know you would be here.", zh: "我不知道你会在这儿。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "didn't", role: "verb", label: "助动词" }, { w: "know", role: "verb", label: "谓语" }, { w: "you", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "here", role: "adverb", label: "状语" } ] },
    "gr05.2.3-e6": { en: "He said he will come.", zh: "（错句）他说他会来。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "said", role: "verb", label: "谓语" }, { w: "he", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "come", role: "verb", label: "动词原形" } ] },
    /* ---------- gr05.2.4 本章小结与习题 ---------- */
    "gr05.2.4-e1": { en: "He goes to school every day.", zh: "他每天去上学。（三单现复习）", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "goes", role: "verb", label: "谓语" }, { w: "to school", role: "adverb", label: "状语" }, { w: "every day", role: "adverb", label: "状语" } ] },
    "gr05.2.4-e2": { en: "We played chess yesterday.", zh: "我们昨天下了棋。（过去时复习）", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "played", role: "verb", label: "谓语" }, { w: "chess", role: "object", label: "宾语" }, { w: "yesterday", role: "adverb", label: "状语" } ] },
    "gr05.2.4-e3": { en: "They will come soon.", zh: "他们很快会来。（将来时复习）", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "come", role: "verb", label: "动词原形" }, { w: "soon", role: "adverb", label: "状语" } ] },
    "gr05.2.4-e4": { en: "Did you enjoy the film?", zh: "你喜欢那部电影吗？（did 复习）", reg: "通用",
      tagged: [ { w: "Did", role: "verb", label: "助动词" }, { w: "you", role: "subject", label: "主语" }, { w: "enjoy", role: "verb", label: "动词原形" }, { w: "the film", role: "object", label: "宾语" } ] },
    "gr05.2.4-e5": { en: "I go there yesterday.", zh: "（错句）我昨天去那儿了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "go", role: "verb", label: "谓语" }, { w: "there", role: "adverb", label: "状语" }, { w: "yesterday", role: "adverb", label: "状语" } ] },
    "gr05.2.4-e6": { en: "She will helps us.", zh: "（错句）她会帮我们。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "helps", role: "verb", label: "谓语" } ] }
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
                  note: "身份证亮出来了——看三句话，找 -s 藏在哪。"
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
        },
        /* ================= gr05.1.2 现在时的时间状语 ================= */
        {
          id: "gr05.1.2",
          title: "现在时的时间状语",
          pages: [
            {
              id: "gr05.1.2-p1",
              kind: "observe",
              title: "先看三句话：often 和 always 站哪？",
              sentences: [
                { id: "gr05.1.2-e1", en: "He often plays basketball after school.", zh: "他放学后经常打篮球。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "often", role: "adverb", label: "状语" }, { w: "plays", role: "verb", label: "谓语" }, { w: "basketball", role: "object", label: "宾语" }, { w: "after school", role: "adverb", label: "状语" } ] },
                { id: "gr05.1.2-e2", en: "She is always late for school.", zh: "她上学总是迟到。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "always", role: "adverb", label: "状语" }, { w: "late", role: "complem", label: "表语" }, { w: "for school", role: "adverb", label: "状语" } ] },
                { id: "gr05.1.2-e3", en: "They play soccer every day.", zh: "他们每天都踢足球。", reg: "通用",
                  tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "play", role: "verb", label: "谓语" }, { w: "soccer", role: "object", label: "宾语" }, { w: "every day", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "often 和 always 站的位置一样吗？它们都站在谁的前面 / 后面？",
                options: ["都站在动词前面", "often 在实义动词前，always 在 be 后面", "随便站哪都行"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "频率副词爱“插队”：实义动词前面站，be 动词后面站。"
            },
            {
              id: "gr05.1.2-p2",
              kind: "interact",
              title: "标出 often 和 always 的座位",
              exploreTip: "标出两句话的 often 和 always，看它们各站在谁旁边。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "often", role: "adverb", label: "状语" },
                      { w: "plays", role: "verb", label: "谓语" },
                      { w: "basketball", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "adverb", label: "状语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "点一个标签，再点一个词块：often 到底站在谁前面？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She", role: "subject", label: "主语" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "always", role: "adverb", label: "状语" },
                      { w: "late", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "这一句里，always 站在 is 的前面还是后面？"
                  }
                }
              ],
              point: "实义动词前（often plays），be 动词后（is always）——位置错了，句子就别扭。"
            },
            {
              id: "gr05.1.2-p3",
              kind: "explain",
              title: "频率副词的位置：实义动词前，be 动词后",
              lead: "还记得吗？上一页 often 站 plays 前，always 却站 is 后。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr05.1.2-e1", "gr05.1.2-e2", "gr05.1.2-e3"],
                  note: "看三句话：频率副词都站在哪？"
                },
                {
                  type: "idcard",
                  rule: "频率副词站在实义动词前、be 动词后。",
                  condition: "只在一般现在时讲习惯时成立；never 表否定，不再加 not。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“他经常打篮球”，“经常”站在动词前——汉语副词基本都在动词前。",
                  en: "英语也差不多，但多了一条：be 动词是“有礼貌的动词”，频率副词要站在它后面（is always），不能插到它前面。",
                  unbridge: "位置不同是英语的规矩，汉语习惯不能硬套。"
                },
                {
                  type: "spell",
                  title: "频率一条链 + every day：",
                  items: [
                    "频率一条链：always（总是）> usually（通常）> often（经常）> sometimes（有时）> never（从不）",
                    "never = 一次也不，句子不再加 not：He never smokes.",
                    "every day（每天，两词）vs everyday（日常的，形容词）"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "He often is late.",
                  wrongZh: "（✗ 错句）",
                  right: "He is often late.",
                  why: "often 插到了 be 前面——be 动词后面才是它的座位。"
                },
                {
                  type: "contrast",
                  wrong: "I do sports everyday.",
                  wrongZh: "（✗ 错句）",
                  right: "I do sports every day.",
                  why: "“每天”是两词 every day；一词的 everyday 是形容词。"
                }
              ],
              point: "这就是频率副词的位置：实义动词前，be 动词后；every day 永远两词。",
              pointScroll: true
            },
            {
              id: "gr05.1.2-p4",
              kind: "quiz",
              title: "练一练：副词站对位了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["He often is late.", "He is often late.", "He is late often always."],
                  answer: 1,
                  tip: "be 动词后：is often。"
                },
                {
                  type: "fill",
                  stemBefore: "She is",
                  stemAfter: "late for school.（always）",
                  answer: "always",
                  accept: ["always"],
                  tip: "be 动词后：is always late。"
                },
                {
                  type: "choice",
                  stem: "“每天我跑步”英文是：",
                  options: ["I run everyday.", "I run every day.", "I everyday run."],
                  answer: 1,
                  tip: "表“每天”用两个词 every day。"
                },
                {
                  type: "fill",
                  stemBefore: "He",
                  stemAfter: "basketball after school.（often）",
                  answer: "often plays",
                  accept: ["often plays"],
                  tip: "实义动词前：often plays。"
                }
              ],
              point: "自查：副词站对位了吗？实义动词前、be 动词后；every day 永远两词。"
            }
          ]
        },
        /* ================= gr05.1.3 一般过去时 ================= */
        {
          id: "gr05.1.3",
          title: "一般过去时",
          pages: [
            {
              id: "gr05.1.3-p1",
              kind: "observe",
              title: "先看三句话：动词有什么共同变化？",
              sentences: [
                { id: "gr05.1.3-e1", en: "I watched a film yesterday.", zh: "我昨天看了一部电影。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "watched", role: "verb", label: "谓语" }, { w: "a film", role: "object", label: "宾语" }, { w: "yesterday", role: "adverb", label: "状语" } ] },
                { id: "gr05.1.3-e2", en: "She went to Beijing last year.", zh: "她去年去了北京。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "to Beijing", role: "adverb", label: "状语" }, { w: "last year", role: "adverb", label: "状语" } ] },
                { id: "gr05.1.3-e3", en: "They played soccer after class.", zh: "他们下课后踢了足球。", reg: "通用",
                  tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "played", role: "verb", label: "谓语" }, { w: "soccer", role: "object", label: "宾语" }, { w: "after class", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "三句话的动词有什么共同变化？",
                options: ["都加了 -s", "都变成了过去的样子（-ed / went）", "都没变"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "过去的时间，动词就要穿“过去装”：-ed，或者直接换词（go → went）。"
            },
            {
              id: "gr05.1.3-p2",
              kind: "interact",
              title: "标出动词的“过去装”",
              exploreTip: "标出两句话的动词：过去式长什么样？Did 后面跟什么？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She", role: "subject", label: "主语" },
                      { w: "went", role: "verb", label: "谓语" },
                      { w: "to Beijing", role: "adverb", label: "状语" },
                      { w: "last year", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "went 是哪个词变的？标出它。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Did", role: "verb", label: "助动词" },
                      { w: "you", role: "subject", label: "主语" },
                      { w: "watch", role: "verb", label: "动词原形" },
                      { w: "the game", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "verb", label: "助动词" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "动词原形" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "Did 出场后，watch 变回了什么？"
                  }
                }
              ],
              point: "一般过去时 = 动词过去式；Did 出场，动词还原原形。"
            },
            {
              id: "gr05.1.3-p3",
              kind: "explain",
              title: "一般过去时：动词穿“过去装”",
              lead: "还记得吗？went 是 go 的过去样子，Did 后 watch 变回了原形。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr05.1.3-e1", "gr05.1.3-e2", "gr05.1.3-e3"],
                  note: "看三句话：动词的“过去装”有几种穿法？"
                },
                {
                  type: "idcard",
                  rule: "说过去的事，动词用过去式：规则加 -ed，不规则的换词（go → went）。",
                  condition: "只在一般过去时成立；有 did（didn't / Did…?）时动词用原形，不再变过去式（一句话只标记一次）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“我昨天看电影”，“看”字不变，时间靠“昨天”交代。",
                  en: "英语不一样：时间词（yesterday）+ 动词变形（watched）双保险——动词也要“报时”。",
                  unbridge: "只加时间词、不变动词，是汉语的办法，英语里动词必须换装。"
                },
                {
                  type: "spell",
                  title: "过去式三条 + 不规则单记：",
                  items: [
                    "规则三条：加 -ed（watched）；e 结尾加 -d（lived）；辅音 + y 变 ied（studied）",
                    "重读闭音节双写：stop → stopped，plan → planned",
                    "不规则单记（中考 30 个）：go-went-gone，eat-ate-eaten，do-did-done"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "I go there yesterday.",
                  wrongZh: "（✗ 错句）",
                  right: "I went there yesterday.",
                  why: "有 yesterday，动词却没换过去装——时间词和动词要“双保险”。"
                },
                {
                  type: "contrast",
                  wrong: "Did you went there?",
                  wrongZh: "（✗ 错句）",
                  right: "Did you go there?",
                  why: "did 已经标记了过去，went 不能再标记一次——Did 出场，动词还原。"
                }
              ],
              point: "这就是一般过去时：动词过去式；did 出场，动词还原原形。",
              pointScroll: true
            },
            {
              id: "gr05.1.3-p4",
              kind: "quiz",
              title: "练一练：过去装穿对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["She go to Beijing last year.", "She went to Beijing last year.", "She goes to Beijing last year."],
                  answer: 1,
                  tip: "last year 是过去，go 换成 went。"
                },
                {
                  type: "fill",
                  stemBefore: "They",
                  stemAfter: "soccer after class.（play）",
                  answer: "played",
                  accept: ["played"],
                  tip: "过去的时间，规则动词加 -ed。"
                },
                {
                  type: "choice",
                  stem: "“Did she ___ TV last night?”横线填：",
                  options: ["watched", "watch", "watches"],
                  answer: 1,
                  tip: "Did 出场，动词用原形 watch。"
                },
                {
                  type: "fill",
                  stemBefore: "I",
                  stemAfter: "an apple yesterday.（eat）",
                  answer: "ate",
                  accept: ["ate"],
                  tip: "eat 是不规则的：eat-ate。"
                }
              ],
              point: "自查：过去时间词 → 动词过去式；看到 did，动词还原。"
            }
          ]
        },
        /* ================= gr05.1.4 过去时的时间状语与 used to ================= */
        {
          id: "gr05.1.4",
          title: "过去时的时间状语与 used to",
          pages: [
            {
              id: "gr05.1.4-p1",
              kind: "observe",
              title: "先看三句话：ago 和 used to 在讲什么？",
              sentences: [
                { id: "gr05.1.4-e1", en: "I got up late this morning.", zh: "我今天早上起晚了。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "got up", role: "verb", label: "谓语" }, { w: "late", role: "adverb", label: "状语" }, { w: "this morning", role: "adverb", label: "状语" } ] },
                { id: "gr05.1.4-e2", en: "He moved here two years ago.", zh: "他两年前搬到这儿。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "moved", role: "verb", label: "谓语" }, { w: "here", role: "adverb", label: "状语" }, { w: "two years ago", role: "adverb", label: "状语" } ] },
                { id: "gr05.1.4-e3", en: "I used to get up late.", zh: "我过去常常起得很晚。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "used to", role: "verb", label: "助动词" }, { w: "get up", role: "verb", label: "动词原形" }, { w: "late", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "第三句的 used to 在讲现在还是过去？",
                options: ["讲现在", "讲过去常常", "讲将来"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "ago 往前数（two years ago），used to 讲“过去常常”。"
            },
            {
              id: "gr05.1.4-p2",
              kind: "interact",
              title: "标出 ago 和 used to",
              exploreTip: "标出 ago 短语和 used to：一个管“多久以前”，一个管“过去常常”。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "moved", role: "verb", label: "谓语" },
                      { w: "here", role: "adverb", label: "状语" },
                      { w: "two years ago", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "two years ago 是往前数还是往后数？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She", role: "subject", label: "主语" },
                      { w: "used to", role: "verb", label: "助动词" },
                      { w: "walk", role: "verb", label: "动词原形" },
                      { w: "to school", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "动词原形" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "used to 后面跟什么形式的动词？"
                  }
                }
              ],
              point: "ago = 以前（two years ago）；used to do = 过去常常做（现在不了）。"
            },
            {
              id: "gr05.1.4-p3",
              kind: "explain",
              title: "ago（…以前）与 used to do（过去常常）",
              lead: "还记得吗？two years ago 往前数，used to 后跟动词原形。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr05.1.4-e1", "gr05.1.4-e2", "gr05.1.4-e3"],
                  note: "看三句话：哪个讲“多久以前”，哪个讲“过去常常”？"
                },
                {
                  type: "idcard",
                  rule: "ago 与数字连用表“…以前”（two years ago）；used to do 表“过去常常做（现在不做了）”。",
                  condition: "ago 只配过去时；used to 只讲过去习惯，to 后跟动词原形；used to 不随主语变。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“两年前”“过去常常”，时间词一摆就行，动词不用变。",
                  en: "英语里 ago 短语配过去式动词（moved），used to 这个固定搭配自带“过去”意思，后面动词用原形。",
                  unbridge: "别把“以前”直译成 before 乱放——ago 固定站在时间段后面。"
                },
                {
                  type: "spell",
                  title: "ago 站位 + used to 结构：",
                  items: [
                    "ago 站位：数字 + 年 / 月 / 日 + ago（three days ago），不说 ago three days",
                    "used to 结构：used to + 动词原形（I used to swim.）",
                    "否定疑问：didn't use to（d 脱落！）/ Did you use to…?"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "I used to getting up late.",
                  wrongZh: "（✗ 错句）",
                  right: "I used to get up late.",
                  why: "used to 后面是动词原形，不是 doing——别和 be used to doing 认错兄弟（gr09 回填）。"
                },
                {
                  type: "contrast",
                  wrong: "He came here two years before.",
                  wrongZh: "（✗ 错句）",
                  right: "He came here two years ago.",
                  why: "“两年前”用 ago，不用 before；ago 固定站在时间段后面。"
                }
              ],
              point: "这就是 ago（…以前）与 used to do（过去常常）；used to 的 to 后只跟原形。",
              pointScroll: true
            },
            {
              id: "gr05.1.4-p4",
              kind: "quiz",
              title: "练一练：ago 和 used to",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["I used to getting up late.", "I used to get up late.", "I use to get up late."],
                  answer: 1,
                  tip: "used to + 动词原形。"
                },
                {
                  type: "fill",
                  stemBefore: "He came back three days",
                  stemAfter: ".（…以前）",
                  answer: "ago",
                  accept: ["ago"],
                  tip: "“…以前”用 ago，站在时间段后面。"
                },
                {
                  type: "choice",
                  stem: "“他过去常常步行上学”：",
                  options: ["He used to walk to school.", "He used to walking to school.", "He is used to walk to school."],
                  answer: 0,
                  tip: "used to do = 过去常常。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "you use to play chess?（过去常常…吗）",
                  answer: "Did",
                  accept: ["Did", "did"],
                  tip: "疑问句：Did you use to…? 注意 use 的 d 脱落了。"
                }
              ],
              point: "自查：ago 站时间段后；used to do 讲过去常常，to 后原形。"
            }
          ]
        }
      ]
    },
    /* ================= 单元 gr05-u2：一般将来时 ================= */
    {
      id: "gr05-u2",
      title: "一般将来时",
      lessons: [
        /* ================= gr05.2.1 一般将来时 ================= */
        {
          id: "gr05.2.1",
          title: "一般将来时",
          pages: [
            {
              id: "gr05.2.1-p1",
              kind: "observe",
              title: "先看三句话：will 后面跟什么？",
              sentences: [
                { id: "gr05.2.1-e1", en: "I will help you.", zh: "我来帮你。", reg: "口语",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "help", role: "verb", label: "动词原形" }, { w: "you", role: "object", label: "宾语" } ] },
                { id: "gr05.2.1-e2", en: "It is going to rain.", zh: "天要下雨了。", reg: "通用",
                  tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "is going to", role: "verb", label: "助动词" }, { w: "rain", role: "verb", label: "动词原形" } ] },
                { id: "gr05.2.1-e3", en: "They will visit the museum tomorrow.", zh: "他们明天要参观博物馆。", reg: "通用",
                  tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "visit", role: "verb", label: "动词原形" }, { w: "the museum", role: "object", label: "宾语" }, { w: "tomorrow", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "will 和 be going to 后面，动词长什么样？",
                options: ["都加 -s", "都用原形", "都用 -ing"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "will / be going to 后面，动词永远用原形——“裸奔”，不加 to、不加 -s。"
            },
            {
              id: "gr05.2.1-p2",
              kind: "interact",
              title: "标出 will 和 be going to",
              exploreTip: "标出 will 和 be going to：它们后面跟的动词是什么样子？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "will", role: "verb", label: "情态动词" },
                      { w: "help", role: "verb", label: "动词原形" },
                      { w: "you", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "动词原形" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "will 和 help，哪个是助动词，哪个是动词原形？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "It", role: "subject", label: "主语" },
                      { w: "is going to", role: "verb", label: "助动词" },
                      { w: "rain", role: "verb", label: "动词原形" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "动词原形" }
                    ],
                    hint: "be going to 是一个整体，别拆开标。"
                  }
                }
              ],
              point: "will / be going to 都是“助动词”，后面只跟动词原形。"
            },
            {
              id: "gr05.2.1-p3",
              kind: "explain",
              title: "一般将来时：will / be going to + 动词原形",
              lead: "还记得吗？上一页 will 和 be going to 后面，动词都是光溜溜的原形。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr05.2.1-e1", "gr05.2.1-e2", "gr05.2.1-e3"],
                  note: "身份证已经亮出来了——看这三句话，will 和 be going to 各自站在哪？"
                },
                {
                  type: "idcard",
                  rule: "表将来：will + 动词原形；be going to + 动词原形。",
                  condition: "will / be going to 后只跟动词原形，不加 to、不加 -s；be going to 中的 be 随主语变（am / is / are）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“我明天帮你”，“帮”字不变，将来靠“明天”交代。",
                  en: "英语双保险：时间词（tomorrow）+ 助动词（will）一起标记将来，动词用原形。",
                  unbridge: "别只写时间词不加 will——“I go tomorrow”漏了将来标记，英语里不算完。"
                },
                {
                  type: "spell",
                  title: "缩写 + 否定：",
                  items: [
                    "will 缩写：I'll / he'll / it'll（口语常用）",
                    "be going to 缩写：I'm gonna（口语，非正式，考试别写）",
                    "否定：will not = won't；is not going to"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "I will to go there.",
                  wrongZh: "（✗ 错句）",
                  right: "I will go there.",
                  why: "will 后面多穿了一件 to——will 是“裸奔”的助动词，后面直接跟原形。"
                },
                {
                  type: "contrast",
                  wrong: "I go tomorrow.",
                  wrongZh: "（✗ 错句）",
                  right: "I will go tomorrow.",
                  why: "有 tomorrow 却没将来标记——英语表将来，will / be going to 不能省。"
                }
              ],
              point: "这就是一般将来时：will / be going to + 动词原形；be 随主语变。",
              pointScroll: true
            },
            {
              id: "gr05.2.1-p4",
              kind: "quiz",
              title: "练一练：将来时穿对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["I will to help you.", "I will help you.", "I will helps you."],
                  answer: 1,
                  tip: "will 后直接跟动词原形，不加 to、不加 -s。"
                },
                {
                  type: "fill",
                  stemBefore: "They",
                  stemAfter: "visit the museum tomorrow.（将要）",
                  answer: "will",
                  accept: ["will"],
                  tip: "表将来：will + 动词原形。"
                },
                {
                  type: "choice",
                  stem: "“天要下雨了”：",
                  options: ["It is going to rain.", "It going to rain.", "It is going to rains."],
                  answer: 0,
                  tip: "be going to 是一个整体，be 不能丢；rain 用原形。"
                },
                {
                  type: "fill",
                  stemBefore: "I",
                  stemAfter: "going to be late.（将要）",
                  answer: "am",
                  accept: ["am"],
                  tip: "be going to 的 be 随主语变：I → am。"
                }
              ],
              point: "自查：will / be going to + 原形；be 别漏，to 别多。"
            }
          ]
        },
        /* ================= gr05.2.2 will vs be going to ================= */
        {
          id: "gr05.2.2",
          title: "will vs be going to",
          pages: [
            {
              id: "gr05.2.2-p1",
              kind: "observe",
              title: "先看三句话：哪个是临时决定？",
              sentences: [
                { id: "gr05.2.2-e1", en: "I will get it!", zh: "我去接！", reg: "口语",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "get", role: "verb", label: "动词原形" }, { w: "it", role: "object", label: "宾语" } ] },
                { id: "gr05.2.2-e2", en: "Look! It is going to rain.", zh: "看！天要下雨了。", reg: "口语",
                  tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "is going to", role: "verb", label: "助动词" }, { w: "rain", role: "verb", label: "动词原形" } ] },
                { id: "gr05.2.2-e3", en: "We are going to visit Beijing next month.", zh: "我们下个月要去北京玩。", reg: "通用",
                  tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "are going to", role: "verb", label: "助动词" }, { w: "visit", role: "verb", label: "动词原形" }, { w: "Beijing", role: "object", label: "宾语" }, { w: "next month", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "哪句是“临时决定”，哪句是“早有计划”？",
                options: ["I will get it 是临时决定", "都是临时决定", "都是早有计划"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "will 管“当场决定”，be going to 管“早有计划”和“有迹象”。"
            },
            {
              id: "gr05.2.2-p2",
              kind: "interact",
              title: "对拍：临时决定 vs 提前计划",
              exploreTip: "标出两句话：哪句是“话赶话”决定的，哪句是“提前计划”的？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "will", role: "verb", label: "情态动词" },
                      { w: "get", role: "verb", label: "动词原形" },
                      { w: "it", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "动词原形" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "电话突然响了——这是计划好的吗？（临时决定 → will）"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "We", role: "subject", label: "主语" },
                      { w: "are going to", role: "verb", label: "助动词" },
                      { w: "visit", role: "verb", label: "动词原形" },
                      { w: "Beijing", role: "object", label: "宾语" },
                      { w: "next month", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "动词原形" },
                      { role: "object", label: "宾语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "下个月的行程——这是临时起意吗？（提前计划 → be going to）"
                  }
                }
              ],
              point: "will = 话赶话的决定；be going to = 提前的计划，或眼前的迹象。"
            },
            {
              id: "gr05.2.2-p3",
              kind: "explain",
              title: "will vs be going to：临时决定 vs 计划迹象",
              lead: "还记得吗？电话一响，I will get it! 脱口而出；去北京却是提前计划好的。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr05.2.2-e1", "gr05.2.2-e2", "gr05.2.2-e3"],
                  note: "看三句话：will 和 be going to 分工有什么不同？"
                },
                {
                  type: "idcard",
                  rule: "will 表临时决定、意愿；be going to 表事先计划，或有迹象表明将发生。",
                  condition: "只在表将来时成立；“话赶话”用 will，“提前商量好”/“乌云”迹象用 be going to。电话响了说 be going to 也不算错，本课主练 will 的临场决定。"
                },
                {
                  type: "bridge",
                  zh: "汉语都说“要”，不分临时还是计划。",
                  en: "英语把“要”拆成两个：will 是“一拍脑袋”的要，be going to 是“心里有数”的要。",
                  unbridge: "别随便换——“电话响了”说 I'm going to get it，像早就打算去接；临时起意还是 will 最地道。"
                },
                {
                  type: "contrast",
                  wrong: "— The phone is ringing! — I'll getting it.",
                  wrongZh: "（✗ 错句）will 后面要跟动词原形，不能跟 getting。",
                  right: "— The phone is ringing! — I'll get it!",
                  why: "will 后面只能跟动词原形；getting 的 -ing 尾巴，will 管不了。"
                },
                {
                  type: "contrast",
                  wrong: "Look! It will rain.",
                  wrongZh: "（✗ 错句）",
                  right: "Look! It's going to rain.",
                  why: "乌云是迹象，用 be going to；will 听着像“我决定让天下雨”。"
                }
              ],
              point: "这就是 will vs be going to：临时决定用 will，计划和迹象用 be going to。",
              pointScroll: true
            },
            {
              id: "gr05.2.2-p4",
              kind: "quiz",
              title: "练一练：will 还是 be going to？",
              questions: [
                {
                  type: "choice",
                  stem: "电话响了，你说：",
                  options: ["I'm going to get it.", "I'll get it.", "I get it."],
                  answer: 1,
                  tip: "话赶话的临时决定，用 will。"
                },
                {
                  type: "choice",
                  stem: "看着满天乌云，你说：",
                  options: ["It will rain.", "It's going to rain.", "It rains."],
                  answer: 1,
                  tip: "眼前的迹象，用 be going to。"
                },
                {
                  type: "fill",
                  stemBefore: "We",
                  stemAfter: "going to have a party next week.（提前计划）",
                  answer: "are",
                  accept: ["are"],
                  tip: "提前计划好的事，用 be going to；be 随主语变。"
                },
                {
                  type: "choice",
                  stem: "“我帮你拿吧”（主动提出帮忙）：",
                  options: ["I help you.", "I'll help you.", "I'm going to help you."],
                  answer: 1,
                  tip: "主动提出的意愿，用 will。"
                }
              ],
              point: "自查：话赶话 → will；有计划 / 有迹象 → be going to。"
            }
          ]
        },
        /* ================= gr05.2.3 过去将来初识 ================= */
        {
          id: "gr05.2.3",
          title: "过去将来初识",
          pages: [
            {
              id: "gr05.2.3-p1",
              kind: "observe",
              title: "先看三句话：would 是谁的“过去版”？",
              sentences: [
                { id: "gr05.2.3-e1", en: "He said he would come.", zh: "他说他会来。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "said", role: "verb", label: "谓语" }, { w: "he", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "情态动词" }, { w: "come", role: "verb", label: "动词原形" } ] },
                { id: "gr05.2.3-e2", en: "I knew it would rain.", zh: "我知道天会下雨。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "knew", role: "verb", label: "谓语" }, { w: "it", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "情态动词" }, { w: "rain", role: "verb", label: "动词原形" } ] },
                { id: "gr05.2.3-e3", en: "She told me she would help.", zh: "她告诉我她会帮忙。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "told", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" }, { w: "she", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "情态动词" }, { w: "help", role: "verb", label: "动词原形" } ] }
              ],
              guess: {
                q: "would 长得像谁的“过去版”？",
                options: ["will 的过去版", "can 的过去版", "do 的过去版"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "would = will 的过去版：站在过去的时间里，讲“那时的将来”。"
            },
            {
              id: "gr05.2.3-p2",
              kind: "explain",
              title: "过去将来：would = 过去的 will",
              lead: "还记得吗？上一页三句话都在转述“过去那会儿的将来”。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr05.2.3-e1", "gr05.2.3-e2", "gr05.2.3-e3"],
                  note: "身份证已经亮出来了——看这三句话，would 前面都站着什么时态的动词？"
                },
                {
                  type: "idcard",
                  rule: "would + 动词原形，表“过去的将来”（站在过去看将来）。",
                  condition: "只在过去语境中成立：主句动词是过去式（said / knew / told）时，从句的 will 退成 would；不用于直接讲现在 / 将来的事。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“他说他会来”，两个“会”长得一样，不管是现在转述还是过去转述。",
                  en: "英语转述过去的话，will 要“退一格”变成 would——站在过去的时间点上讲将来。",
                  unbridge: "别在主句是过去式时还用 will——时态要“呼应”，这是英语的规矩。"
                },
                {
                  type: "contrast",
                  wrong: "He said he will come.",
                  wrongZh: "（✗ 错句）",
                  right: "He said he would come.",
                  why: "said 是过去式，从句的 will 要跟着退成 would（主过从过，gr13 回填）。"
                }
              ],
              point: "这就是过去将来：would = 过去的 will；主句过去式，从句 will 退 would。自查：主句是过去式吗？will 退成 would 了吗？",
              pointScroll: true
            }
          ]
        },
        /* ================= gr05.2.4 本章小结与习题 ================= */
        {
          id: "gr05.2.4",
          title: "本章小结与习题",
          pages: [
            {
              id: "gr05.2.4-p1",
              kind: "explain",
              title: "三时态时间轴总表",
              lead: "本章三员大将集结：一般现在时、一般过去时、一般将来时。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr05.1.1-e1", "gr05.1.3-e2", "gr05.2.1-e1"],
                  note: "三句话，三个时间——看看动词各穿什么衣服。"
                },
                {
                  type: "idcard",
                  rule: "三时态总表：现在（do / does）— 过去（did / 过去式）— 将来（will / be going to）。",
                  condition: "做题三问：时间词是哪个？主语是谁？有 did / will 吗？"
                },
                {
                  type: "bridge",
                  zh: "汉语靠时间词，英语靠动词变形 + 助动词。",
                  en: "三时态就是三套“报时”办法：现在 -s，过去 -ed / went，将来 will。",
                  unbridge: "别只看时间词不看动词——英语要“双保险”。"
                },
                {
                  type: "contrast",
                  wrong: "I go there yesterday.",
                  wrongZh: "（✗ 错句）",
                  right: "I went there yesterday.",
                  why: "时间词和动词要对上——这是本章最大的坑。"
                }
              ],
              point: "三时态 = 三套报时法；时间词 × 动词形态，双保险。",
              pointScroll: true
            },
            {
              id: "gr05.2.4-p2",
              kind: "quiz",
              title: "本章综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["He go to school every day.", "He goes to school every day.", "He going to school every day."],
                  answer: 1,
                  tip: "every day + 主语 he → 三单现 goes。"
                },
                {
                  type: "fill",
                  stemBefore: "She",
                  stemAfter: "to Beijing last year.（go）",
                  answer: "went",
                  accept: ["went"],
                  tip: "last year → 过去式 went。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“I will to help you.”应改为：",
                  options: ["I will help you.", "I will helps you.", "I help you tomorrow."],
                  answer: 0,
                  tip: "will 后直接跟原形，不加 to。"
                },
                {
                  type: "fill",
                  stemBefore: "They",
                  stemAfter: "going to win.（将要）",
                  answer: "are",
                  accept: ["are"],
                  tip: "be going to 的 be 随主语变：they → are。"
                }
              ],
              point: "本章自查三问：时间词？主语？助动词后还原了吗？"
            }
          ]
        }
      ]
    }
  ]
};
