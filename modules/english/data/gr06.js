/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr06：动词的时与体（二）
 *
 * 数据口径（M5）：window.ENG_CH["gr06"] = { id, title, units[] }，
 * 与 gr05.js 同构；例句 id 规则见 docs/english-grammar-review-ledger.md。
 *
 * 单元 gr06-u1：进行时（gr06.1.1–gr06.1.4）
 * 单元 gr06-u2：完成时（gr06.2.1–gr06.2.4）
 *
 * 撰写：语法生产B队（2026-10-14）；例句状态 drafted，待 D3 三审。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr06"] = {
  id: "gr06",
  title: "动词的时与体（二）：进行/完成",
  sentences: {
    /* ---------- gr06.1.1 现在进行时 ---------- */
    "gr06.1.1-e1": { en: "Look! She is running.", zh: "看！她在跑步。", reg: "口语",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "助动词" }, { w: "running", role: "verb", label: "谓语" } ] },
    "gr06.1.1-e2": { en: "They are having lunch now.", zh: "他们正在吃午饭。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "助动词" }, { w: "having", role: "verb", label: "谓语" }, { w: "lunch", role: "object", label: "宾语" }, { w: "now", role: "adverb", label: "状语" } ] },
    "gr06.1.1-e3": { en: "I am leaving tomorrow.", zh: "我明天要走了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "am", role: "verb", label: "助动词" }, { w: "leaving", role: "verb", label: "谓语" }, { w: "tomorrow", role: "adverb", label: "状语" } ] },
    "gr06.1.1-e4": { en: "We are watching TV.", zh: "我们正在看电视。", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "助动词" }, { w: "watching", role: "verb", label: "谓语" }, { w: "TV", role: "object", label: "宾语" } ] },
    "gr06.1.1-e5": { en: "He is doing his homework.", zh: "他正在做作业。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "助动词" }, { w: "doing", role: "verb", label: "谓语" }, { w: "his homework", role: "object", label: "宾语" } ] },
    "gr06.1.1-e6": { en: "She is coming next week.", zh: "她下周要来。（表将来安排）", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "助动词" }, { w: "coming", role: "verb", label: "谓语" }, { w: "next week", role: "adverb", label: "状语" } ] },
    "gr06.1.1-e7": { en: "They are leaving soon.", zh: "他们很快要走了。（表将来安排）", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "助动词" }, { w: "leaving", role: "verb", label: "谓语" }, { w: "soon", role: "adverb", label: "状语" } ] },
    "gr06.1.1-e8": { en: "He running now.", zh: "（错句）他现在在跑步。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "running", role: "verb", label: "谓语" }, { w: "now", role: "adverb", label: "状语" } ] },
    "gr06.1.1-e9": { en: "I am knowing the answer.", zh: "（错句）我知道答案。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "am", role: "verb", label: "助动词" }, { w: "knowing", role: "verb", label: "谓语" }, { w: "the answer", role: "object", label: "宾语" } ] },
    /* ---------- gr06.1.2 过去进行时 ---------- */
    "gr06.1.2-e1": { en: "I was sleeping at ten last night.", zh: "我昨晚十点钟在睡觉。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "sleeping", role: "verb", label: "谓语" }, { w: "at ten last night", role: "adverb", label: "状语" } ] },
    "gr06.1.2-e2": { en: "They were playing chess then.", zh: "那时他们在下棋。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "were", role: "verb", label: "助动词" }, { w: "playing", role: "verb", label: "谓语" }, { w: "chess", role: "object", label: "宾语" }, { w: "then", role: "adverb", label: "状语" } ] },
    "gr06.1.2-e3": { en: "She was cooking when I arrived.", zh: "我到的时候她正在做饭。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "cooking", role: "verb", label: "谓语" }, { w: "when I arrived", role: "adverb", label: "状语" } ] },
    "gr06.1.2-e4": { en: "He was reading then.", zh: "那时他在看书。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "reading", role: "verb", label: "谓语" }, { w: "then", role: "adverb", label: "状语" } ] },
    "gr06.1.2-e5": { en: "We were having dinner at seven.", zh: "我们七点钟在吃晚饭。", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "were", role: "verb", label: "助动词" }, { w: "having", role: "verb", label: "谓语" }, { w: "dinner", role: "object", label: "宾语" }, { w: "at seven", role: "adverb", label: "状语" } ] },
    "gr06.1.2-e6": { en: "I was sleep at ten.", zh: "（错句）我十点钟在睡觉。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "sleep", role: "verb", label: "动词原形" }, { w: "at ten", role: "adverb", label: "状语" } ] },
    "gr06.1.2-e7": { en: "They was playing chess.", zh: "（错句）他们在下棋。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "playing", role: "verb", label: "谓语" }, { w: "chess", role: "object", label: "宾语" } ] },
    /* ---------- gr06.1.3 将来进行时（高中） ---------- */
    "gr06.1.3-e1": { en: "I will be waiting for you at eight.", zh: "八点钟我会一直在等你。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "waiting", role: "verb", label: "谓语" }, { w: "for you", role: "adverb", label: "状语" }, { w: "at eight", role: "adverb", label: "状语" } ] },
    "gr06.1.3-e2": { en: "Will you be using the computer tonight?", zh: "你今晚会用电脑吗？", reg: "口语",
      tagged: [ { w: "Will", role: "verb", label: "情态动词" }, { w: "you", role: "subject", label: "主语" }, { w: "be", role: "verb", label: "助动词" }, { w: "using", role: "verb", label: "谓语" }, { w: "the computer", role: "object", label: "宾语" }, { w: "tonight", role: "adverb", label: "状语" } ] },
    "gr06.1.3-e3": { en: "She will be sleeping at midnight.", zh: "半夜她会在睡觉。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "sleeping", role: "verb", label: "谓语" }, { w: "at midnight", role: "adverb", label: "状语" } ] },
    "gr06.1.3-e4": { en: "They will be traveling next week.", zh: "他们下周会在旅行。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "traveling", role: "verb", label: "谓语" }, { w: "next week", role: "adverb", label: "状语" } ] },
    "gr06.1.3-e5": { en: "Will you be coming with us?", zh: "你要和我们一起去吗？（礼貌询问）", reg: "口语",
      tagged: [ { w: "Will", role: "verb", label: "情态动词" }, { w: "you", role: "subject", label: "主语" }, { w: "be", role: "verb", label: "助动词" }, { w: "coming", role: "verb", label: "谓语" }, { w: "with us", role: "adverb", label: "状语" } ] },
    "gr06.1.3-e6": { en: "I will waiting for you.", zh: "（错句）我会一直等你。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "waiting", role: "verb", label: "谓语" }, { w: "for you", role: "adverb", label: "状语" } ] },
    /* ---------- gr06.1.4 进行时的时间轴 ---------- */
    "gr06.1.4-e1": { en: "I am reading now.", zh: "我现在在看书。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "am", role: "verb", label: "助动词" }, { w: "reading", role: "verb", label: "谓语" }, { w: "now", role: "adverb", label: "状语" } ] },
    "gr06.1.4-e2": { en: "I was reading at nine.", zh: "九点钟我在看书。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "reading", role: "verb", label: "谓语" }, { w: "at nine", role: "adverb", label: "状语" } ] },
    "gr06.1.4-e3": { en: "I will be reading at ten tonight.", zh: "今晚十点我会在看书。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "reading", role: "verb", label: "谓语" }, { w: "at ten tonight", role: "adverb", label: "状语" } ] },
    "gr06.1.4-e4": { en: "She is cooking now.", zh: "她现在在做饭。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "助动词" }, { w: "cooking", role: "verb", label: "谓语" }, { w: "now", role: "adverb", label: "状语" } ] },
    "gr06.1.4-e5": { en: "They were swimming then.", zh: "那时他们在游泳。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "were", role: "verb", label: "助动词" }, { w: "swimming", role: "verb", label: "谓语" }, { w: "then", role: "adverb", label: "状语" } ] },
    "gr06.1.4-e6": { en: "I am knowing the answer.", zh: "（错句）我知道答案。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "am", role: "verb", label: "助动词" }, { w: "knowing", role: "verb", label: "谓语" }, { w: "the answer", role: "object", label: "宾语" } ] },
    /* ---------- gr06.2.1 现在完成时 ---------- */
    "gr06.2.1-e1": { en: "I have lost my key.", zh: "我把钥匙弄丢了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词" }, { w: "lost", role: "verb", label: "过去分词" }, { w: "my key", role: "object", label: "宾语" } ] },
    "gr06.2.1-e2": { en: "She has been to Beijing.", zh: "她去过北京。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "助动词" }, { w: "been", role: "verb", label: "过去分词" }, { w: "to Beijing", role: "adverb", label: "状语" } ] },
    "gr06.2.1-e3": { en: "He has finished his homework.", zh: "他做完作业了。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" }, { w: "his homework", role: "object", label: "宾语" } ] },
    "gr06.2.1-e4": { en: "We have seen the film.", zh: "我们看过这部电影了。", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词" }, { w: "seen", role: "verb", label: "过去分词" }, { w: "the film", role: "object", label: "宾语" } ] },
    "gr06.2.1-e5": { en: "He has just arrived.", zh: "他刚刚到。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "助动词" }, { w: "just", role: "adverb", label: "状语" }, { w: "arrived", role: "verb", label: "过去分词" } ] },
    "gr06.2.1-e6": { en: "I have lose my key.", zh: "（错句）我把钥匙弄丢了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词" }, { w: "lose", role: "verb", label: "动词原形" }, { w: "my key", role: "object", label: "宾语" } ] },
    "gr06.2.1-e7": { en: "I have lost my key yesterday.", zh: "（错句）我昨天把钥匙弄丢了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词" }, { w: "lost", role: "verb", label: "过去分词" }, { w: "my key", role: "object", label: "宾语" }, { w: "yesterday", role: "adverb", label: "状语" } ] },
    /* ---------- gr06.2.2 完成时的时间状语 ---------- */
    "gr06.2.2-e1": { en: "I have lived here since 2019.", zh: "我从 2019 年起就住这儿。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词" }, { w: "lived", role: "verb", label: "过去分词" }, { w: "here", role: "adverb", label: "状语" }, { w: "since 2019", role: "adverb", label: "状语" } ] },
    "gr06.2.2-e2": { en: "She has worked here for three years.", zh: "她在这儿工作三年了。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "助动词" }, { w: "worked", role: "verb", label: "过去分词" }, { w: "here", role: "adverb", label: "状语" }, { w: "for three years", role: "adverb", label: "状语" } ] },
    "gr06.2.2-e3": { en: "Have you finished yet?", zh: "你做完了吗？", reg: "口语",
      tagged: [ { w: "Have", role: "verb", label: "助动词" }, { w: "you", role: "subject", label: "主语" }, { w: "finished", role: "verb", label: "过去分词" }, { w: "yet", role: "adverb", label: "状语" } ] },
    "gr06.2.2-e4": { en: "He has stayed here for a week.", zh: "他在这儿待了一周了。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "助动词" }, { w: "stayed", role: "verb", label: "过去分词" }, { w: "here", role: "adverb", label: "状语" }, { w: "for a week", role: "adverb", label: "状语" } ] },
    "gr06.2.2-e5": { en: "I have just had lunch.", zh: "我刚吃过午饭。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词" }, { w: "just", role: "adverb", label: "状语" }, { w: "had", role: "verb", label: "过去分词" }, { w: "lunch", role: "object", label: "宾语" } ] },
    "gr06.2.2-e6": { en: "Have you ever been abroad?", zh: "你曾经出过国吗？", reg: "通用",
      tagged: [ { w: "Have", role: "verb", label: "助动词" }, { w: "you", role: "subject", label: "主语" }, { w: "ever", role: "adverb", label: "状语" }, { w: "been", role: "verb", label: "过去分词" }, { w: "abroad", role: "adverb", label: "状语" } ] },
    "gr06.2.2-e7": { en: "I have lived here since three years.", zh: "（错句）我在这儿住了三年了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词" }, { w: "lived", role: "verb", label: "过去分词" }, { w: "here", role: "adverb", label: "状语" }, { w: "since three years", role: "adverb", label: "状语" } ] },
    "gr06.2.2-e8": { en: "I have finished it yet.", zh: "（错句）我已经做完了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" }, { w: "it", role: "object", label: "宾语" }, { w: "yet", role: "adverb", label: "状语" } ] },
    /* ---------- gr06.2.3 过去完成时 ---------- */
    "gr06.2.3-e1": { en: "When I arrived, the train had left.", zh: "我到的时候，火车已经开走了。", reg: "通用",
      tagged: [ { w: "When I arrived", role: "adverb", label: "状语" }, { w: "the train", role: "subject", label: "主语" }, { w: "had", role: "verb", label: "助动词" }, { w: "left", role: "verb", label: "过去分词" } ] },
    "gr06.2.3-e2": { en: "She had finished dinner before he came.", zh: "他来之前，她已经吃完晚饭了。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "had", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" }, { w: "dinner", role: "object", label: "宾语" }, { w: "before he came", role: "adverb", label: "状语" } ] },
    "gr06.2.3-e3": { en: "They had never seen snow before.", zh: "他们以前从没见过雪。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "had", role: "verb", label: "助动词" }, { w: "never", role: "adverb", label: "状语" }, { w: "seen", role: "verb", label: "过去分词" }, { w: "snow", role: "object", label: "宾语" } ] },
    "gr06.2.3-e4": { en: "By the time I got there, it had stopped.", zh: "到我赶到那儿时，雨已经停了。", reg: "通用",
      tagged: [ { w: "By the time I got there", role: "adverb", label: "状语" }, { w: "it", role: "subject", label: "主语" }, { w: "had", role: "verb", label: "助动词" }, { w: "stopped", role: "verb", label: "过去分词" } ] },
    "gr06.2.3-e5": { en: "He had left before I called.", zh: "我打电话之前，他已经走了。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "had", role: "verb", label: "助动词" }, { w: "left", role: "verb", label: "过去分词" }, { w: "before I called", role: "adverb", label: "状语" } ] },
    "gr06.2.3-e6": { en: "When I arrived, the train had leave.", zh: "（错句）我到的时候，火车已经开走了。", reg: "通用",
      tagged: [ { w: "When I arrived", role: "adverb", label: "状语" }, { w: "the train", role: "subject", label: "主语" }, { w: "had", role: "verb", label: "助动词" }, { w: "leave", role: "verb", label: "动词原形" } ] },
    "gr06.2.3-e7": { en: "When I had arrived, the train left.", zh: "（错句）我到的时候，火车开走了。", reg: "通用",
      tagged: [ { w: "When I had arrived", role: "adverb", label: "状语" }, { w: "the train", role: "subject", label: "主语" }, { w: "left", role: "verb", label: "谓语" } ] },
    /* ---------- gr06.2.4 时态总表与本章小结 ---------- */
    "gr06.2.4-e1": { en: "She goes to school.", zh: "她去上学。（总复习）", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "goes", role: "verb", label: "谓语" }, { w: "to school", role: "adverb", label: "状语" } ] },
    "gr06.2.4-e2": { en: "He is running now.", zh: "他现在在跑步。（总复习）", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "助动词" }, { w: "running", role: "verb", label: "谓语" }, { w: "now", role: "adverb", label: "状语" } ] },
    "gr06.2.4-e3": { en: "We have finished lunch.", zh: "我们吃完午饭了。（总复习）", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" }, { w: "lunch", role: "object", label: "宾语" } ] },
    "gr06.2.4-e4": { en: "They were dancing then.", zh: "那时他们在跳舞。（总复习）", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "were", role: "verb", label: "助动词" }, { w: "dancing", role: "verb", label: "谓语" }, { w: "then", role: "adverb", label: "状语" } ] },
    "gr06.2.4-e5": { en: "He running now.", zh: "（错句）他现在在跑步。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "running", role: "verb", label: "谓语" }, { w: "now", role: "adverb", label: "状语" } ] },
    "gr06.2.4-e6": { en: "I have lose my key.", zh: "（错句）我把钥匙弄丢了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词" }, { w: "lose", role: "verb", label: "动词原形" }, { w: "my key", role: "object", label: "宾语" } ] }
  },
  units: [
    {
      id: "gr06-u1",
      title: "进行时",
      lessons: [
        /* ================= gr06.1.1 现在进行时 ================= */
        {
          id: "gr06.1.1",
          title: "现在进行时",
          pages: [
            {
              id: "gr06.1.1-p1",
              kind: "observe",
              title: "先看三句话：哪个部分告诉你“正在”？",
              sentences: [
                { id: "gr06.1.1-e1", en: "Look! She is running.", zh: "看！她在跑步。", reg: "口语",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "助动词" }, { w: "running", role: "verb", label: "谓语" } ] },
                { id: "gr06.1.1-e2", en: "They are having lunch now.", zh: "他们正在吃午饭。", reg: "通用",
                  tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "助动词" }, { w: "having", role: "verb", label: "谓语" }, { w: "lunch", role: "object", label: "宾语" }, { w: "now", role: "adverb", label: "状语" } ] },
                { id: "gr06.1.1-e3", en: "I am leaving tomorrow.", zh: "我明天要走了。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "am", role: "verb", label: "助动词" }, { w: "leaving", role: "verb", label: "谓语" }, { w: "tomorrow", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "三句话里，哪个部分告诉你“正在进行”？",
                options: ["主语", "be + doing 两个一起", "只有 doing"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "进行时 = be + doing：be 是门票，doing 是主角，两个都要。"
            },
            {
              id: "gr06.1.1-p2",
              kind: "interact",
              title: "标出 be 和 doing",
              exploreTip: "标出 be 和 doing：进行时的两个零件各站在哪？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She", role: "subject", label: "主语" },
                      { w: "is", role: "verb", label: "助动词" },
                      { w: "running", role: "verb", label: "谓语" },
                      { w: "now", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "be 和 doing 哪个都不能少，标出来。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "am", role: "verb", label: "助动词" },
                      { w: "leaving", role: "verb", label: "谓语" },
                      { w: "tomorrow", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "这句讲的是现在还是将来？（go / come / leave 的进行时可表将来）"
                  }
                }
              ],
              point: "be + doing 缺一不可；go / come / leave 的进行时还能表将来。"
            },
            {
              id: "gr06.1.1-p3",
              kind: "explain",
              title: "现在进行时：be + doing",
              lead: "先看一眼上一页的结论：be + doing 缺一不可。这一页把它用在位移动词上：进行时还能表将来的安排。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr06.1.1-e1", "gr06.1.1-e2", "gr06.1.1-e3"],
                  note: "身份证已经亮出来了——看这三句话，be 和 doing 是怎么分工的？"
                },
                {
                  type: "idcard",
                  rule: "现在进行时 = be（am / is / are）+ 动词 -ing，表“此刻正在做”；go / come / leave 等表“位移”的动词，进行时可表将来的安排。",
                  condition: "be 随主语变（I am / he is / they are）；doing 是现在分词（run → running，双写 n）；表将来只限少数动词（go / come / leave / start…），别乱用。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“在跑”“正在吃”，“在 / 正在”一加就行，动词不变。",
                  en: "英语把“正在”拆成两个零件：be 管“是”，doing 管“正在做”——be 是门票，没它不许进。",
                  unbridge: "别把 now 逐字对应“正在”——“正在”是 be + doing 干的活，不是 now 的。"
                },
                {
                  type: "spell",
                  title: "-ing 构成 + be 随主语变：",
                  items: [
                    "-ing 三条：直接加（go → going）；e 结尾去 e（come → coming）；重读闭音节双写（run → running，swim → swimming）",
                    "be 随主语变：I am，he / she / it is，you / we / they are"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "He running now.",
                  wrongZh: "（✗ 错句）",
                  right: "He is running now.",
                  why: "漏了门票 be——进行时 = be + doing，两个都要。"
                },
                {
                  type: "contrast",
                  wrong: "I am knowing the answer.",
                  wrongZh: "（✗ 错句）",
                  right: "I know the answer.",
                  why: "know 是状态动词，不用进行时（gr06.1.4 黑名单）。"
                }
              ],
              point: "这就是现在进行时：be + doing；be 是门票，doing 是主角。",
              pointScroll: true
            },
            {
              id: "gr06.1.1-p4",
              kind: "quiz",
              title: "练一练：be + doing 配对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["He running now.", "He is running now.", "He is run now."],
                  answer: 1,
                  tip: "进行时 = be + doing，两个都要。"
                },
                {
                  type: "fill",
                  stemBefore: "They are",
                  stemAfter: "lunch now.（吃）",
                  answer: "having",
                  accept: ["having"],
                  tip: "have → having（去 e 加 ing）。"
                },
                {
                  type: "choice",
                  stem: "“我明天要走了”：",
                  options: ["I leave tomorrow.", "I am leaving tomorrow.", "I am leave tomorrow."],
                  answer: 1,
                  tip: "leave 的进行时可表将来的安排。"
                },
                {
                  type: "fill",
                  stemBefore: "She",
                  stemAfter: "reading a book.（正在）",
                  answer: "is",
                  accept: ["is"],
                  tip: "主语 she → be 用 is。"
                }
              ],
              point: "自查：be 在吗？doing 对吗？状态动词别用进行时。"
            }
          ]
        },
        /* ================= gr06.1.2 过去进行时 ================= */
        {
          id: "gr06.1.2",
          title: "过去进行时",
          pages: [
            {
              id: "gr06.1.2-p1",
              kind: "observe",
              title: "先看三句话：was / were 把“正在”搬到了哪？",
              sentences: [
                { id: "gr06.1.2-e1", en: "I was sleeping at ten last night.", zh: "我昨晚十点钟在睡觉。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "sleeping", role: "verb", label: "谓语" }, { w: "at ten last night", role: "adverb", label: "状语" } ] },
                { id: "gr06.1.2-e2", en: "They were playing chess then.", zh: "那时他们在下棋。", reg: "通用",
                  tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "were", role: "verb", label: "助动词" }, { w: "playing", role: "verb", label: "谓语" }, { w: "chess", role: "object", label: "宾语" }, { w: "then", role: "adverb", label: "状语" } ] },
                { id: "gr06.1.2-e3", en: "She was cooking when I arrived.", zh: "我到的时候她正在做饭。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "cooking", role: "verb", label: "谓语" }, { w: "when I arrived", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "was / were 和 is / are 的区别在哪？",
                options: ["没区别", "was / were 把“正在”搬到了过去", "was / were 表将来"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "was / were + doing = 过去的“正在”：把现在进行时整体搬到过去。"
            },
            {
              id: "gr06.1.2-p2",
              kind: "interact",
              title: "标出 was / were 和 doing",
              exploreTip: "标出 was / were 和 doing：过去的“正在”长什么样？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "was", role: "verb", label: "助动词" },
                      { w: "sleeping", role: "verb", label: "谓语" },
                      { w: "at ten last night", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "was 把“正在”定在了几点？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "They", role: "subject", label: "主语" },
                      { w: "were", role: "verb", label: "助动词" },
                      { w: "playing", role: "verb", label: "谓语" },
                      { w: "chess", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "主语 they，be 用 was 还是 were？"
                  }
                }
              ],
              point: "was / were + doing：过去某时正在做的事；was / were 随主语变。"
            },
            {
              id: "gr06.1.2-p3",
              kind: "explain",
              title: "过去进行时：was / were + doing",
              lead: "was sleeping 在昨晚十点——过去的'正在'，be 为何是 was？",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr06.1.2-e1", "gr06.1.2-e2", "gr06.1.2-e3"],
                  note: "身份证已经亮出来了——看这三句话，“正在”发生在什么时候？"
                },
                {
                  type: "idcard",
                  rule: "过去进行时 = was / were + doing，表“过去某时正在做”。",
                  condition: "只在讲过去的“正在”时成立；was（I / he / she / it）/ were（you / we / they）；常与 when / while / then / at…（过去时间）连用。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“昨晚十点我在睡觉”，“在睡觉”不变，时间靠“昨晚十点”。",
                  en: "英语时间也要动词管：is → was，把整个“正在”搬到过去。",
                  unbridge: "别用现在进行时讲过去的事——时态要和时间词对上（双保险）。"
                },
                {
                  type: "spell",
                  title: "was / were 分工：",
                  items: [
                    "was / were 随主语变：I / he / she / it was；you / we / they were",
                    "-ing 构成同现在进行时（run → running）"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "I was sleep at ten.",
                  wrongZh: "（✗ 错句）",
                  right: "I was sleeping at ten.",
                  why: "was 后面跟的是 doing，不是动词原形。"
                },
                {
                  type: "contrast",
                  wrong: "They was playing chess.",
                  wrongZh: "（✗ 错句）",
                  right: "They were playing chess.",
                  why: "主语 they，be 用 were，不用 was。"
                }
              ],
              point: "这就是过去进行时：was / were + doing，过去的“正在”。",
              pointScroll: true
            },
            {
              id: "gr06.1.2-p4",
              kind: "quiz",
              title: "练一练：过去的“正在”",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["I was sleep at ten.", "I was sleeping at ten.", "I am sleeping at ten last night."],
                  answer: 1,
                  tip: "过去的“正在”：was + doing。"
                },
                {
                  type: "fill",
                  stemBefore: "They",
                  stemAfter: "playing chess then.",
                  answer: "were",
                  accept: ["were"],
                  tip: "主语 they → were。"
                },
                {
                  type: "choice",
                  stem: "“昨晚八点我在洗澡”：",
                  options: ["I am taking a shower at eight last night.", "I was taking a shower at eight last night.", "I take a shower at eight last night."],
                  answer: 1,
                  tip: "过去某时正在做 → was + doing。"
                },
                {
                  type: "fill",
                  stemBefore: "She",
                  stemAfter: "cooking when I arrived.",
                  answer: "was",
                  accept: ["was"],
                  tip: "主语 she → was。"
                }
              ],
              point: "自查：was / were 对上主语了吗？doing 在吗？"
            }
          ]
        },
        /* ================= gr06.1.3 将来进行时（高中） ================= */
        {
          id: "gr06.1.3",
          title: "将来进行时（高中）",
          pages: [
            {
              id: "gr06.1.3-p1",
              kind: "observe",
              title: "先看三句话：will be doing 把“正在”搬到了哪？",
              sentences: [
                { id: "gr06.1.3-e1", en: "I will be waiting for you at eight.", zh: "八点钟我会一直在等你。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "waiting", role: "verb", label: "谓语" }, { w: "for you", role: "adverb", label: "状语" }, { w: "at eight", role: "adverb", label: "状语" } ] },
                { id: "gr06.1.3-e2", en: "Will you be using the computer tonight?", zh: "你今晚会用电脑吗？", reg: "口语",
                  tagged: [ { w: "Will", role: "verb", label: "情态动词" }, { w: "you", role: "subject", label: "主语" }, { w: "be", role: "verb", label: "助动词" }, { w: "using", role: "verb", label: "谓语" }, { w: "the computer", role: "object", label: "宾语" }, { w: "tonight", role: "adverb", label: "状语" } ] },
                { id: "gr06.1.3-e3", en: "She will be sleeping at midnight.", zh: "半夜她会在睡觉。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "sleeping", role: "verb", label: "谓语" }, { w: "at midnight", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "will be doing 把“正在”搬到了哪？",
                options: ["过去", "将来", "现在"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "will be doing = 将来的“正在”：将来某时正在做的事。"
            },
            {
              id: "gr06.1.3-p2",
              kind: "interact",
              title: "标出 will be doing 三个零件",
              exploreTip: "标出三个零件：will、be、doing 各站哪？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "will", role: "modal", label: "情态动词 will" },
                      { w: "be", role: "aux", label: "助动词 be" },
                      { w: "waiting", role: "pred", label: "谓语 doing" },
                      { w: "for you", role: "adverb", label: "状语" },
                      { w: "at eight", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "modal", label: "情态动词 will" },
                      { role: "aux", label: "助动词 be" },
                      { role: "pred", label: "谓语 doing" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "will be + doing：三个零件缺一不可——will（将来）+ be + doing（正在）。"
                  }
                }
              ],
              point: "这就是将来进行时：will be + doing；be 不随主语变，doing 不变。"
            },
            {
              id: "gr06.1.3-p3",
              kind: "explain",
              title: "将来进行时：will be + doing（高中拓展）",
              lead: "还记得吗？上一页 will、be、doing 三个零件各就各位——三个缺一不可。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr06.1.3-e1", "gr06.1.3-e2", "gr06.1.3-e3"],
                  note: "身份证已经亮出来了——看这三句话，“正在”各发生在将来什么时候？"
                },
                {
                  type: "idcard",
                  rule: "将来进行时 = will be + doing，表“将来某时正在做”；也可礼貌询问对方安排。",
                  condition: "高中拓展，高考低频，认识即可；be 固定不变（不随主语变）；礼貌询问 Will you be doing…? 比 Will you do…? 更委婉。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“八点我在等你”，“在等”不变。",
                  en: "英语把进行时再搬一次：will（将来）+ be doing（正在）= 将来的正在。",
                  unbridge: "别和一般将来时混——“I will wait”只讲“会等”，“I will be waiting”强调“那会儿正在等”。"
                },
                {
                  type: "contrast",
                  wrong: "I will waiting for you.",
                  wrongZh: "（✗ 错句）",
                  right: "I will be waiting for you.",
                  why: "will 后面漏了 be——将来进行时 = will be + doing，三个零件。"
                }
              ],
              point: "这就是将来进行时：will be + doing；高考低频，认识即可。自查：be 在吗？doing 在吗？",
              pointScroll: true
            },
            {
              id: "gr06.1.3-p4",
              kind: "quiz",
              title: "练一练：will be + doing 配对了吗？",
              questions: [
                { type: "choice", stem: "将来进行时的构成是？", options: ["will + doing", "will be + doing", "will + be"], answer: 1, tip: "will be + doing：三个零件 will / be / doing。" },
                { type: "fill", stemBefore: "I", stemAfter: "waiting for you at eight.（将来进行）", answer: "will be", accept: ["will be"], tip: "将来进行 = will be + doing——“八点那会儿正在等”。" },
                { type: "choice", stem: "“Will you be using the computer tonight?”的语气是？", options: ["命令", "礼貌询问对方安排", "否定"], answer: 1, tip: "Will you be doing…? 比 Will you do…? 更委婉。" },
                { type: "choice", stem: "下面哪句对？", options: ["I will waiting for you.", "I will be waiting for you.", "I will be wait for you."], answer: 1, tip: "will 后面漏了 be 不行；doing 不能写成原形。" }
              ],
              point: "自查：be 在吗？doing 在吗？（高中拓展，认识即可）"
            }
          ]
        },
        /* ================= gr06.1.4 进行时的时间轴 ================= */
        {
          id: "gr06.1.4",
          title: "进行时的时间轴",
          pages: [
            {
              id: "gr06.1.4-p1",
              kind: "observe",
              title: "先看三句话：同一个“正在”，时间一样吗？",
              sentences: [
                { id: "gr06.1.4-e1", en: "I am reading now.", zh: "我现在在看书。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "am", role: "verb", label: "助动词" }, { w: "reading", role: "verb", label: "谓语" }, { w: "now", role: "adverb", label: "状语" } ] },
                { id: "gr06.1.4-e2", en: "I was reading at nine.", zh: "九点钟我在看书。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "reading", role: "verb", label: "谓语" }, { w: "at nine", role: "adverb", label: "状语" } ] },
                { id: "gr06.1.4-e3", en: "I will be reading at ten tonight.", zh: "今晚十点我会在看书。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "reading", role: "verb", label: "谓语" }, { w: "at ten tonight", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "三句话的“正在看书”，分别发生在什么时候？",
                options: ["都是现在", "现在 / 过去 / 将来", "都是过去"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "同一个“正在”，am / is、was / were、will be 把它放在了三个时间。"
            },
            {
              id: "gr06.1.4-p2",
              kind: "interact",
              title: "标出“报时”的 be",
              exploreTip: "标一标：be 报告的是哪个时间？doing 变了吗？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "was", role: "aux", label: "助动词 be（报时：过去）" },
                      { w: "reading", role: "pred", label: "谓语 doing（不变）" },
                      { w: "at nine", role: "adverb", label: "时间状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "aux", label: "助动词 be（报时）" },
                      { role: "pred", label: "谓语 doing（不变）" },
                      { role: "adverb", label: "时间状语" }
                    ],
                    hint: "变的是 be（am → was），没变的是 doing——be 报时，doing 不变。"
                  }
                }
              ],
              point: "这就是进行时时间轴：be 报时（am / was / will be），doing 恒定。"
            },
            {
              id: "gr06.1.4-p3",
              kind: "explain",
              title: "进行时时间轴：be 报时，doing 不变",
              lead: "am reading、was reading、will be reading——reading 没变，变的是谁？",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr06.1.4-e1", "gr06.1.4-e2", "gr06.1.4-e3"],
                  note: "身份证已经亮出来了——看这三句话，什么变了，什么没变？"
                },
                {
                  type: "idcard",
                  rule: "三进行时：am / is / are doing（现在）/ was / were doing（过去）/ will be doing（将来）。",
                  condition: "状态动词（know / like / love / hate / believe…）表状态不用进行时；麦当劳 “I'm lovin' it” 是广告破格，考试别学。"
                },
                {
                  type: "bridge",
                  zh: "汉语“在看书”三个时间都一样，靠时间词区分。",
                  en: "英语“正在”也要报时：be 变形（am / was / will be）+ doing 不变——变的是 be，没变的是 doing。",
                  unbridge: "别给状态动词硬加进行时——“知道”“喜欢”是状态，不是动作。"
                },
                {
                  type: "contrast",
                  wrong: "I am knowing the answer.",
                  wrongZh: "（✗ 错句）",
                  right: "I know the answer.",
                  why: "know 是状态动词，没有“正在知道”——直接用一般现在时。"
                }
              ],
              point: "这就是进行时时间轴：be 报时，doing 不变；状态动词不进进行时。自查：be 的时间对吗？状态动词混进来了吗？",
              pointScroll: true
            },
            {
              id: "gr06.1.4-p4",
              kind: "quiz",
              title: "练一练：be 报的时间对吗？",
              questions: [
                { type: "choice", stem: "三进行时里负责“报时”的是？", options: ["doing", "be（am / was / will be）", "时间词"], answer: 1, tip: "be 报时，doing 不变：am doing（现在）/ was doing（过去）。" },
                { type: "choice", stem: "下面哪句对？", options: ["I am knowing the answer.", "I know the answer.", "I am know the answer."], answer: 1, tip: "know 是状态动词，没有“正在知道”——直接用一般现在时。" },
                { type: "fill", stemBefore: "I", stemAfter: "reading at nine.（过去进行：“九点那会儿正在看”）", answer: "was", accept: ["was"], tip: "过去的“正在”：was / were + doing。" },
                { type: "choice", stem: "“I will be reading at ten tonight.”讲的是？", options: ["现在正在", "过去正在", "将来某时正在"], answer: 2, tip: "will be + doing：把“正在”搬到将来。" }
              ],
              point: "自查：be 的时间对吗？状态动词混进来了吗？"
            }
          ]
        }
      ]
    },
    /* ================= 单元 gr06-u2：完成时 ================= */
    {
      id: "gr06-u2",
      title: "完成时",
      lessons: [
        /* ================= gr06.2.1 现在完成时 ================= */
        {
          id: "gr06.2.1",
          title: "现在完成时",
          pages: [
            {
              id: "gr06.2.1-p1",
              kind: "observe",
              title: "先看三句话：过去的动作给“现在”留下了什么？",
              sentences: [
                { id: "gr06.2.1-e1", en: "I have lost my key.", zh: "我把钥匙弄丢了。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词" }, { w: "lost", role: "verb", label: "过去分词" }, { w: "my key", role: "object", label: "宾语" } ] },
                { id: "gr06.2.1-e2", en: "She has been to Beijing.", zh: "她去过北京。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "助动词" }, { w: "been", role: "verb", label: "过去分词" }, { w: "to Beijing", role: "adverb", label: "状语" } ] },
                { id: "gr06.2.1-e3", en: "He has finished his homework.", zh: "他做完作业了。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" }, { w: "his homework", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "I have lost my key 和 I lost my key，意思完全一样吗？",
                options: ["完全一样", "不一样：前者还说了“现在没钥匙”", "不一样：前者是将来"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "have lost = 过去丢了 + 现在没钥匙——完成时是“过去连着现在”。"
            },
            {
              id: "gr06.2.1-p2",
              kind: "interact",
              title: "标出 have / has 和过去分词",
              exploreTip: "标出 have / has 和过去分词：完成时的两个零件各站在哪？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "have", role: "verb", label: "助动词" },
                      { w: "lost", role: "verb", label: "过去分词" },
                      { w: "my key", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "过去分词" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "have 和 lost 哪个都不能少，标出来。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She", role: "subject", label: "主语" },
                      { w: "has", role: "verb", label: "助动词" },
                      { w: "been", role: "verb", label: "过去分词" },
                      { w: "to Beijing", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "过去分词" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "has 还是 have？主语 she 说了算。"
                  }
                }
              ],
              point: "have / has + 过去分词：过去的动作，把结果留在了现在。"
            },
            {
              id: "gr06.2.1-p3",
              kind: "explain",
              title: "现在完成时：have / has + 过去分词",
              lead: "先看一眼上一页的结论：过去动作把结果留在现在。这一页把它用在 have + 过去分词上。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr06.2.1-e1", "gr06.2.1-e2", "gr06.2.1-e3"],
                  note: "看三句话：过去的动作给“现在”留下了什么？"
                },
                {
                  type: "idcard",
                  rule: "现在完成时 = have / has + 过去分词，表“过去动作对现在的影响”，或“到现在的经验”。",
                  condition: "have 随主语变（I have / she has）；不规则过去分词单记（lose-lost-lost）；不与 yesterday 等“过去时间词”连用。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“我把钥匙弄丢了”，“了”字一加，过去现在一肩挑。",
                  en: "英语把“了”拆开：lost 管“丢”（过去），have 管“到现在”（现在没钥匙）——完成时是“过去连着现在”。",
                  unbridge: "别拿一般过去时凑合——“I lost my key”没说现在有没有钥匙，意思不一样。"
                },
                {
                  type: "spell",
                  title: "have 分工 + 过去分词单记：",
                  items: [
                    "have 随主语变：I / you / we / they have；he / she / it has",
                    "不规则单记：lose-lost-lost，eat-ate-eaten，go-went-gone",
                    "规则加 -ed：finish-finished，watch-watched"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "I have lose my key.",
                  wrongZh: "（✗ 错句）",
                  right: "I have lost my key.",
                  why: "have 后面漏了过去分词——have + done，done 不能是原形。"
                },
                {
                  type: "contrast",
                  wrong: "I have lost my key yesterday.",
                  wrongZh: "（✗ 错句）",
                  right: "I lost my key yesterday.",
                  why: "yesterday 是“过去时间词”，和完成时八字不合——有 yesterday 就用一般过去时。"
                }
              ],
              point: "这就是现在完成时：have / has + 过去分词；过去连着现在。",
              pointScroll: true
            },
            {
              id: "gr06.2.1-p4",
              kind: "quiz",
              title: "练一练：have + done 配对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["I have lose my key.", "I have lost my key.", "I has lost my key."],
                  answer: 1,
                  tip: "have + 过去分词 lost；主语 I → have。"
                },
                {
                  type: "fill",
                  stemBefore: "She",
                  stemAfter: "been to Beijing.",
                  answer: "has",
                  accept: ["has"],
                  tip: "主语 she → has。"
                },
                {
                  type: "choice",
                  stem: "“他做完作业了”（现在不用做了）：",
                  options: ["He finished his homework.", "He has finished his homework.", "He finishes his homework yesterday."],
                  answer: 1,
                  tip: "强调对现在的影响（不用做了）→ 现在完成时。"
                },
                {
                  type: "fill",
                  stemBefore: "They have",
                  stemAfter: "the game.（赢）",
                  answer: "won",
                  accept: ["won"],
                  tip: "win 的过去分词是 won：win-won-won。"
                }
              ],
              point: "自查：have 对上主语了吗？过去分词对吗？有 yesterday 就别用完成时。"
            }
          ]
        },
        /* ================= gr06.2.2 完成时的时间状语 ================= */
        {
          id: "gr06.2.2",
          title: "完成时的时间状语",
          pages: [
            {
              id: "gr06.2.2-p1",
              kind: "observe",
              title: "先看三句话：since 和 for 管什么？",
              sentences: [
                { id: "gr06.2.2-e1", en: "I have lived here since 2019.", zh: "我从 2019 年起就住这儿。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词" }, { w: "lived", role: "verb", label: "过去分词" }, { w: "here", role: "adverb", label: "状语" }, { w: "since 2019", role: "adverb", label: "状语" } ] },
                { id: "gr06.2.2-e2", en: "She has worked here for three years.", zh: "她在这儿工作三年了。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "助动词" }, { w: "worked", role: "verb", label: "过去分词" }, { w: "here", role: "adverb", label: "状语" }, { w: "for three years", role: "adverb", label: "状语" } ] },
                { id: "gr06.2.2-e3", en: "Have you finished yet?", zh: "你做完了吗？", reg: "口语",
                  tagged: [ { w: "Have", role: "verb", label: "助动词" }, { w: "you", role: "subject", label: "主语" }, { w: "finished", role: "verb", label: "过去分词" }, { w: "yet", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "since 和 for 后面跟的东西一样吗？",
                options: ["一样", "since + 时间点，for + 时间段", "since + 时间段，for + 时间点"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "since 管“点”（2019 年），for 管“段”（三年）——点和段别认错。"
            },
            {
              id: "gr06.2.2-p2",
              kind: "interact",
              title: "标出 since 和 for",
              exploreTip: "标出 since 和 for 短语：一个管时间点，一个管时间段。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "have", role: "verb", label: "助动词" },
                      { w: "lived", role: "verb", label: "过去分词" },
                      { w: "here", role: "adverb", label: "状语" },
                      { w: "since 2019", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "过去分词" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "since 后面是“点”还是“段”？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She", role: "subject", label: "主语" },
                      { w: "has", role: "verb", label: "助动词" },
                      { w: "worked", role: "verb", label: "过去分词" },
                      { w: "here", role: "adverb", label: "状语" },
                      { w: "for three years", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "过去分词" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "for 后面是“点”还是“段”？"
                  }
                }
              ],
              point: "since + 时间点，for + 时间段；yet 只站在否定句和疑问句里。"
            },
            {
              id: "gr06.2.2-p3",
              kind: "explain",
              title: "完成时的时间状语：since / for / yet",
              lead: "since 2019 是'点'，for three years 是'段'——点段为何分家？",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr06.2.2-e1", "gr06.2.2-e2", "gr06.2.2-e3"],
                  note: "身份证已经亮出来了——看这三句话，since / for / yet 各自站在哪种句子里？"
                },
                {
                  type: "idcard",
                  rule: "since + 时间点（since 2019）；for + 时间段（for three years）；already（肯定句）/ yet（否定疑问句）/ just（刚刚）/ ever（曾经，疑问）/ never（从不）。",
                  condition: "since / for 只与完成时连用；yet 只用于否定句和疑问句（肯定句用 already）；ever 多用于疑问句（Have you ever…?）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“从 2019 年起”“三年了”，“从 / 了”字搞定。",
                  en: "英语点和段分家：since 管起点（点），for 管长度（段）——“从…起”和“…之久”是两码事。",
                  unbridge: "别把 since 和 for 混用——“点”和“段”在英语里是两个词。"
                },
                {
                  type: "spell",
                  title: "since / for 家族 + 小词位置：",
                  items: [
                    "since 家族：since 2019 / since Monday / since I was ten（时间点）",
                    "for 家族：for three years / for a week / for a long time（时间段）",
                    "already / yet / just / ever / never 位置：have already done / haven't done yet"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "I have lived here since three years.",
                  wrongZh: "（✗ 错句）",
                  right: "I have lived here for three years.",
                  why: "three years 是“段”，用 for；since 后面只跟“点”。"
                },
                {
                  type: "contrast",
                  wrong: "I have finished it yet.",
                  wrongZh: "（✗ 错句）",
                  right: "I haven't finished it yet.",
                  why: "yet 只站在否定句和疑问句里；肯定句用 already。"
                }
              ],
              point: "这就是完成时的时间状语：since 点，for 段；yet 否定疑问见。",
              pointScroll: true
            },
            {
              id: "gr06.2.2-p4",
              kind: "quiz",
              title: "练一练：点还是段？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["I have lived here since three years.", "I have lived here for three years.", "I live here since three years."],
                  answer: 1,
                  tip: "“三年”是时间段，用 for；完成时 have lived。"
                },
                {
                  type: "fill",
                  stemBefore: "She has been here",
                  stemAfter: "2020.",
                  answer: "since",
                  accept: ["since"],
                  tip: "2020 年是时间点，用 since。"
                },
                {
                  type: "choice",
                  stem: "“你做完了吗？”：",
                  options: ["Have you finished already?", "Have you finished yet?", "Did you finished yet?"],
                  answer: 1,
                  tip: "疑问句 + yet。"
                },
                {
                  type: "fill",
                  stemBefore: "I have",
                  stemAfter: "seen that film.（曾经）",
                  answer: "ever",
                  accept: ["ever"],
                  tip: "“曾经”用 ever，常在疑问句：Have you ever…?"
                }
              ],
              point: "自查：点 → since，段 → for；yet 只进否定疑问句。"
            }
          ]
        },
        /* ================= gr06.2.3 过去完成时 ================= */
        {
          id: "gr06.2.3",
          title: "过去完成时",
          pages: [
            {
              id: "gr06.2.3-p1",
              kind: "observe",
              title: "先看三句话：哪个动作先发生？",
              sentences: [
                { id: "gr06.2.3-e1", en: "When I arrived, the train had left.", zh: "我到的时候，火车已经开走了。", reg: "通用",
                  tagged: [ { w: "When I arrived", role: "adverb", label: "状语" }, { w: "the train", role: "subject", label: "主语" }, { w: "had", role: "verb", label: "助动词" }, { w: "left", role: "verb", label: "过去分词" } ] },
                { id: "gr06.2.3-e2", en: "She had finished dinner before he came.", zh: "他来之前，她已经吃完晚饭了。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "had", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" }, { w: "dinner", role: "object", label: "宾语" }, { w: "before he came", role: "adverb", label: "状语" } ] },
                { id: "gr06.2.3-e3", en: "They had never seen snow before.", zh: "他们以前从没见过雪。", reg: "通用",
                  tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "had", role: "verb", label: "助动词" }, { w: "never", role: "adverb", label: "状语" }, { w: "seen", role: "verb", label: "过去分词" }, { w: "snow", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "arrived 和 had left，哪个动作先发生？",
                options: ["同时", "had left 先（火车先开走）", "arrived 先"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "had left = 过去的过去：两个过去比，had done 是更早的那个。"
            },
            {
              id: "gr06.2.3-p2",
              kind: "interact",
              title: "标出 had done：谁更早？",
              exploreTip: "标出 had done：两个过去动作里，它永远是先发生的那个。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "When I arrived", role: "adverb", label: "状语" },
                      { w: "the train", role: "subject", label: "主语" },
                      { w: "had", role: "verb", label: "助动词" },
                      { w: "left", role: "verb", label: "过去分词" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "过去分词" }
                    ],
                    hint: "两个过去动作，哪个用了 had？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She", role: "subject", label: "主语" },
                      { w: "had", role: "verb", label: "助动词" },
                      { w: "finished", role: "verb", label: "过去分词" },
                      { w: "dinner", role: "object", label: "宾语" },
                      { w: "before he came", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "过去分词" },
                      { role: "object", label: "宾语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "finished 和 came，哪个更早？"
                  }
                }
              ],
              point: "had + done = 过去的过去；had 不随主语变，永远是 had。"
            },
            {
              id: "gr06.2.3-p3",
              kind: "explain",
              title: "过去完成时：had + done",
              lead: "还记得吗？上一页火车“先开走”，用的就是 had left。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr06.2.3-e1", "gr06.2.3-e2", "gr06.2.3-e3"],
                  note: "身份证已经亮出来了——看这三句话，had done 都比谁早？"
                },
                {
                  type: "idcard",
                  rule: "过去完成时 = had + 过去分词，表“过去的过去”（站在过去看更早的过去）。",
                  condition: "had 不随主语变（永远是 had）；常与 before / when / by the time（过去语境）连用；by the time 后跟过去时。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“我到的时候火车已经开走了”，“已经”一加，早晚自明。",
                  en: "英语用 had 标记“更早”：arrived（过去）和 had left（过去的过去）一对比，早晚分明。",
                  unbridge: "别主从句时态颠倒——更早的那个才配 had。"
                },
                {
                  type: "spell",
                  title: "had 恒定 + by the time：",
                  items: [
                    "had 恒定：I had / she had / they had（不随主语变）",
                    "by the time 句型：By the time I got there, it had stopped.（= 到…时已经…）"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "When I arrived, the train had leave.",
                  wrongZh: "（✗ 错句）",
                  right: "When I arrived, the train had left.",
                  why: "had 后面是过去分词 left，不是原形 leave。"
                },
                {
                  type: "contrast",
                  wrong: "When I had arrived, the train left.",
                  wrongZh: "（✗ 错句）",
                  right: "When I arrived, the train had left.",
                  why: "时态颠倒了——先开走的是火车，had 给“更早”的那个。"
                }
              ],
              point: "这就是过去完成时：had + done；过去的过去，更早的那个。",
              pointScroll: true
            },
            {
              id: "gr06.2.3-p4",
              kind: "quiz",
              title: "练一练：谁更早？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["When I arrived, the train had leave.", "When I arrived, the train had left.", "When I arrive, the train had left."],
                  answer: 1,
                  tip: "had + 过去分词 left。"
                },
                {
                  type: "fill",
                  stemBefore: "She",
                  stemAfter: "finished dinner before he came.",
                  answer: "had",
                  accept: ["had"],
                  tip: "更早的动作 → had + done。"
                },
                {
                  type: "choice",
                  stem: "“到我赶到时，电影已经开演了”：",
                  options: ["By the time I arrived, the film had started.", "By the time I had arrived, the film started.", "By the time I arrive, the film will start."],
                  answer: 0,
                  tip: "by the time 后跟过去时，主句用 had started（更早）。"
                },
                {
                  type: "fill",
                  stemBefore: "They",
                  stemAfter: "never seen snow before.",
                  answer: "had",
                  accept: ["had"],
                  tip: "had 不随主语变：they → had。"
                }
              ],
              point: "自查：两个过去比早晚；had 恒定不变；by the time 后过去时。"
            }
          ]
        },
        /* ================= gr06.2.4 时态总表与本章小结 ================= */
        {
          id: "gr06.2.4",
          title: "时态总表与本章小结",
          pages: [
            {
              id: "gr06.2.4-p1",
              kind: "explain",
              title: "8 大时态总表",
              lead: "两章学完，8 大时态集结完毕：一般 × 进行 × 完成，一张表看全。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr06.1.1-e1", "gr06.1.2-e1", "gr06.2.1-e1"],
                  note: "三句话，三个时态——看看谓语各穿什么衣服。"
                },
                {
                  type: "idcard",
                  rule: "8 时态总表：一般现在 / 过去 / 将来 × 进行现在 / 过去 × 完成现在 / 过去 × 过去将来。",
                  condition: "做题三问：时间词？（now / yesterday / tomorrow）影响现在吗？（→ 完成时）正在做吗？（→ 进行时）"
                },
                {
                  type: "bridge",
                  zh: "汉语时间词一摆了事。",
                  en: "英语三问定乾坤：何时？（一般）正在？（进行）连着现在？（完成）",
                  unbridge: "别背公式不看时间轴——时态是时间的位置，不是公式。"
                },
                {
                  type: "contrast",
                  wrong: "I have lost my key yesterday.",
                  wrongZh: "（✗ 错句）",
                  right: "I lost my key yesterday.",
                  why: "yesterday 和完成时八字不合——时间词和时态要对上。"
                }
              ],
              point: "8 时态 = 3 一般 + 2 进行 + 2 完成 + 过去将来；三问定位，百发百中。",
              pointScroll: true
            },
            {
              id: "gr06.2.4-p2",
              kind: "interact",
              title: "8 时态成分标注大复习",
              exploreTip: "限时标注 8 时态例句的成分：找朱红色的谓语！",
              widgets: [
                {
                  type: "constituent-quiz",
                  params: {
                    items: [
                      { id: "gr06.2.4-q1", sentence: [ { w: "She", role: "subject" }, { w: "likes", role: "verb" }, { w: "apples", role: "object" } ] },
                      { id: "gr06.2.4-q2", sentence: [ { w: "She", role: "subject" }, { w: "went", role: "verb" }, { w: "to Beijing", role: "adverb" } ] },
                      { id: "gr06.2.4-q3", sentence: [ { w: "I", role: "subject" }, { w: "will", role: "verb" }, { w: "help", role: "verb" }, { w: "you", role: "object" } ] },
                      { id: "gr06.2.4-q4", sentence: [ { w: "She", role: "subject" }, { w: "is", role: "verb" }, { w: "running", role: "verb" }, { w: "now", role: "adverb" } ] },
                      { id: "gr06.2.4-q5", sentence: [ { w: "I", role: "subject" }, { w: "was", role: "verb" }, { w: "sleeping", role: "verb" }, { w: "at ten", role: "adverb" } ] },
                      { id: "gr06.2.4-q6", sentence: [ { w: "I", role: "subject" }, { w: "have", role: "verb" }, { w: "lost", role: "verb" }, { w: "my key", role: "object" } ] },
                      { id: "gr06.2.4-q7", sentence: [ { w: "The train", role: "subject" }, { w: "had", role: "verb" }, { w: "left", role: "verb" } ] },
                      { id: "gr06.2.4-q8", sentence: [ { w: "He", role: "subject" }, { w: "said", role: "verb" }, { w: "he", role: "subject" }, { w: "would", role: "verb" }, { w: "come", role: "verb" } ] }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" },
                      { role: "adverb", label: "状语" }
                    ],
                    rounds: 4,
                    timeLimitSec: 60,
                    hint: "8 时态大复习：标出每句的成分，重点看谓语怎么变。"
                  }
                }
              ],
              point: "谓语是时态的“晴雨表”——看它穿什么衣服，就知道是什么时态。"
            },
            {
              id: "gr06.2.4-p3",
              kind: "quiz",
              title: "本章综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["She is go to school.", "She goes to school.", "She going to school."],
                  answer: 1,
                  tip: "一般现在时 + 三单 → goes。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“He running now.”应改为：",
                  options: ["He is running now.", "He runs now.", "He run now."],
                  answer: 0,
                  tip: "进行时漏了 be。"
                },
                {
                  type: "fill",
                  stemBefore: "I have",
                  stemAfter: "my key.（丢）",
                  answer: "lost",
                  accept: ["lost"],
                  tip: "完成时：have + 过去分词 lost。"
                },
                {
                  type: "choice",
                  stem: "“昨晚十点我在洗澡”：",
                  options: ["I am taking a shower at ten last night.", "I was taking a shower at ten last night.", "I take a shower at ten last night."],
                  answer: 1,
                  tip: "过去某时正在 → was + doing。"
                }
              ],
              point: "8 时态自查：时间词 × 谓语形态，双保险对上了吗？"
            }
          ]
        }
      ]
    }
  ]
};
