// 词根数据（按词频排序：词根按旗下最高频词，单词按词频降序）
window.ROOTS_DATA = [
{ r:"us", v:["us","ut"], d:"us- / ut-", m:["用"], w:[
  ["use","v.","使用",0],
  ["useful","adj.","有用的",0],
  ["useless","adj.","无用的",0]
]},
{ r:"st", v:["st"], d:"st-", m:["站；立"], w:[
  ["state","n.","状态；国家",0],
  ["stand","v.","站",0],
  ["stage","n.","舞台",0],
  ["station","n.","车站",0],
  ["stable","adj.","稳定的",0]
]},
{ r:"part", v:["part"], d:"part-", m:["分"], w:[
  ["part","n.","部分",0],
  ["apart","adv.","相隔；分开",0],
  ["participate","v.","参加",0],
  ["partial","adj.","部分的",0]
]},
{ r:"numer", v:["numer"], d:"numer-", m:["数"], w:[
  ["number","n.","数字",0],
  ["numerous","adj.","众多的",0]
]},
{ r:"popul", v:["popul","publ"], d:"popul-", m:["人民"], w:[
  ["public","adj.","公共的",0],
  ["popular","adj.","流行的",0],
  ["population","n.","人口",0],
  ["publish","v.","出版",0]
]},
{ r:"port", v:["port"], d:"port-", m:["拿；运送"], w:[
  ["support","v.","支持",0],
  ["report","n./v.","报告",0],
  ["transport","v.","运输",0],
  ["export","v.","出口",0],
  ["import","v.","进口",0],
  ["passport","n.","护照",0],
  ["portable","adj.","便携的",0]
]},
{ r:"nat", v:["nat"], d:"nat-", m:["出生"], w:[
  ["national","adj.","国家的",0],
  ["nature","n.","自然",0],
  ["nation","n.","国家",0],
  ["native","adj.","本地的",0]
]},
{ r:"serv", v:["serv"], d:"serv-", m:["服务"], w:[
  ["service","n.","服务",0],
  ["serve","v.","服务；招待",0]
]},
{ r:"gen", v:["gen"], d:"gen-", m:["生","种"], w:[
  ["general","adj.","一般的",1],
  ["generous","adj.","慷慨的",1]
]},
{ r:"cur", v:["cur","curs"], d:"cur- / curs-", m:["跑"], w:[
  ["course","n.","课程",0],
  ["occur","v.","发生",0]
]},
{ r:"vis", v:["vis","vid"], d:"vis- / vid-", m:["看"], w:[
  ["video","n.","视频",0],
  ["provide","v.","提供",0],
  ["evidence","n.","证据",0],
  ["visit","v.","参观",0],
  ["vision","n.","视力；视野",0],
  ["visible","adj.","看得见的",0],
  ["invisible","adj.","看不见的",0]
]},
{ r:"loc", v:["loc"], d:"loc-", m:["地方"], w:[
  ["local","adj.","本地的",0],
  ["allocate","v.","分配",0]
]},
{ r:"soci", v:["soci"], d:"soci-", m:["社会"], w:[
  ["social","adj.","社会的",0],
  ["society","n.","社会",0]
]},
{ r:"mem", v:["mem"], d:"mem-", m:["记忆"], w:[
  ["remember","v.","记住",0],
  ["memory","n.","记忆",0],
  ["memorize","v.","记住",0]
]},
{ r:"inter", v:["inter"], d:"inter-", m:["在…之间"], w:[
  ["international","adj.","国际的",0],
  ["internet","n.","互联网",0],
  ["interview","n./v.","采访",0]
]},
{ r:"quer", v:["quer","quis","quest"], d:"quer- / quest-", m:["问"], w:[
  ["question","n.","问题",0],
  ["request","n./v.","要求",0]
]},
{ r:"hum", v:["hum"], d:"hum-", m:["地（低）","人"], w:[
  ["human","n.","人类",1],
  ["humanity","n.","人性",1],
  ["humble","adj.","谦逊的",0]
]},
{ r:"form", v:["form"], d:"form-", m:["形"], w:[
  ["form","n.","形式",0],
  ["format","n.","格式",0],
  ["formal","adj.","正式的",0],
  ["inform","v.","通知",0]
]},
{ r:"phon", v:["phon"], d:"phon-", m:["声"], w:[
  ["phone","n.","电话",0],
  ["headphones","n.","耳机",0],
  ["microphone","n.","麦克风",0]
]},
{ r:"act", v:["ag","act"], d:"ag- / act-", m:["做；行动"], w:[
  ["act","v.","行动",0],
  ["action","n.","行动",0],
  ["active","adj.","积极的",0],
  ["activity","n.","活动",0],
  ["actual","adj.","实际的",0],
  ["actor","n.","演员",0],
  ["exact","adj.","确切的",0],
  ["react","v.","反应",0]
]},
{ r:"typ", v:["typ"], d:"typ-", m:["型"], w:[
  ["type","n.","类型",0],
  ["typical","adj.","典型的",0]
]},
{ r:"ced", v:["ced","ceed","cess"], d:"ced- / ceed- / cess-", m:["走"], w:[
  ["process","n.","过程",0],
  ["success","n.","成功",0],
  ["access","n.","通道；使用权",0],
  ["succeed","v.","成功",0],
  ["proceed","v.","继续",0],
  ["exceed","v.","超过",0]
]},
{ r:"pro", v:["pro"], d:"pro-", m:["向前；先"], w:[
  ["project","n.","项目；工程",0],
  ["protect","v.","保护",0],
  ["progress","n./v.","进步；进展",0],
  ["promise","v./n.","承诺；许诺",0]
]},
{ r:"ject", v:["ject"], d:"ject-", m:["投掷"], w:[
  ["project","n.","项目；工程",0],
  ["subject","n.","学科",0],
  ["object","n.","物体",0],
  ["reject","v.","拒绝",0]
]},
{ r:"pos", v:["pos","pon"], d:"pos- / pon-", m:["放"], w:[
  ["position","n.","位置",0],
  ["positive","adj.","积极的",0],
  ["propose","v.","提议",0],
  ["expose","v.","暴露",0],
  ["oppose","v.","反对",0],
  ["compose","v.","组成",0]
]},
{ r:"clud", v:["clud","clus"], d:"clud- / clus-", m:["关"], w:[
  ["include","v.","包括",0],
  ["exclude","v.","排除",0]
]},
{ r:"cord", v:["cord","cour"], d:"cord- / cour-", m:["心"], w:[
  ["record","v.","记录",0],
  ["encourage","v.","鼓励",0],
  ["courage","n.","勇气",0],
  ["discourage","v.","使气馁",0]
]},
{ r:"fac", v:["fac","fect","fic"], d:"fac- / fect- / fic-", m:["做"], w:[
  ["perfect","adj.","完美的",0],
  ["effect","n.","效果",0],
  ["affect","v.","影响",0],
  ["factory","n.","工厂",0],
  ["efficient","adj.","高效的",0],
  ["defect","n.","缺点",0]
]},
{ r:"sens", v:["sens","sent"], d:"sens- / sent-", m:["感觉"], w:[
  ["sense","n.","感觉",0],
  ["sensitive","adj.","敏感的",0],
  ["nonsense","n.","胡说",0]
]},
{ r:"centr", v:["centr"], d:"centr-", m:["中"], w:[
  ["center","n.","中心",0],
  ["central","adj.","中央的",0]
]},
{ r:"re", v:["re"], d:"re-", m:["再；重新","回；向后"], w:[
  ["return","v.","返回",1],
  ["review","v.","复习",0],
  ["rebuild","v.","重建",0],
  ["rewrite","v.","重写",0]
]},
{ r:"ven", v:["ven","vent"], d:"ven- / vent-", m:["来"], w:[
  ["event","n.","事件",0],
  ["prevent","v.","预防；阻止",0],
  ["adventure","n.","冒险",0],
  ["convenient","adj.","方便的",0],
  ["invention","n.","发明",0],
  ["inventor","n.","发明家",0],
  ["invent","v.","发明",0]
]},
{ r:"sign", v:["sign"], d:"sign-", m:["记号"], w:[
  ["design","v.","设计",0],
  ["sign","n.","标记",0],
  ["signal","n.","信号",0],
  ["assign","v.","指派",0]
]},
{ r:"med", v:["med"], d:"med-", m:["医"], w:[
  ["medical","adj.","医疗的",0],
  ["medicine","n.","药",0]
]},
{ r:"val", v:["val"], d:"val-", m:["价值"], w:[
  ["value","n.","价值",0],
  ["valuable","adj.","贵重的",0],
  ["evaluate","v.","评估",0]
]},
{ r:"pict", v:["pict"], d:"pict-", m:["画"], w:[
  ["picture","n.","图画",0]
]},
{ r:"mod", v:["mod"], d:"mod-", m:["模式","适度"], w:[
  ["model","n.","模型",0],
  ["modern","adj.","现代的",0],
  ["modest","adj.","谦虚的",1]
]},
{ r:"sci", v:["sci"], d:"sci-", m:["知道"], w:[
  ["science","n.","科学",0],
  ["scientific","adj.","科学的",0]
]},
{ r:"tend", v:["tend","tens","tent"], d:"tend- / tens-", m:["伸"], w:[
  ["attention","n.","注意力",0],
  ["attend","v.","出席",0],
  ["intention","n.","意图",0],
  ["pretend","v.","假装",0],
  ["intend","v.","打算",0],
  ["tent","n.","帐篷",0],
  ["tense","adj.","紧张的",0]
]},
{ r:"uni", v:["uni"], d:"uni-", m:["一"], w:[
  ["union","n.","联盟",0],
  ["unit","n.","单位",0],
  ["unique","adj.","独特的",0],
  ["uniform","n.","制服",0]
]},
{ r:"vers", v:["vers","vert"], d:"vers- / vert-", m:["转"], w:[
  ["version","n.","版本",0],
  ["universe","n.","宇宙",0],
  ["reverse","adj.","颠倒的",0],
  ["convert","v.","转变",0]
]},
{ r:"voc", v:["voc"], d:"voc-", m:["声音；叫"], w:[
  ["voice","n.","声音",0],
  ["vocabulary","n.","词汇",0]
]},
{ r:"fer", v:["fer"], d:"fer-", m:["拿；带"], w:[
  ["offer","v.","提供",0],
  ["conference","n.","会议",0],
  ["transfer","v.","转移",0],
  ["prefer","v.","更喜欢",0],
  ["refer","v.","提到",0],
  ["differ","v.","相异；有区别",0],
  ["infer","v.","推断",0]
]},
{ r:"pass", v:["pass"], d:"pass-", m:["通过"], w:[
  ["pass","v.","通过；及格",0],
  ["passenger","n.","乘客",0],
  ["passage","n.","段落；通道",0]
]},
{ r:"not", v:["not"], d:"not-", m:["记；知道"], w:[
  ["note","n.","笔记",0],
  ["notice","v.","注意",0]
]},
{ r:"per", v:["per"], d:"per-", m:["每一"], w:[
  ["percent","n.","百分之",0],
  ["percentage","n.","百分比",0]
]},
{ r:"spect", v:["spect"], d:"spect-", m:["看"], w:[
  ["respect","v.","尊敬",0],
  ["expect","v.","期待；预料",0],
  ["suspect","v.","怀疑",0],
  ["aspect","n.","方面",0],
  ["prospect","n.","前景",0],
  ["inspect","v.","检查",0],
  ["spectacle","n.","奇观；壮观的场面",0],
  ["spectator","n.","观众",0]
]},
{ r:"spond", v:["spond","spons"], d:"spond-", m:["应答"], w:[
  ["response","n.","回应",0],
  ["respond","v.","回答",0]
]},
{ r:"cept", v:["cept"], d:"cept-", m:["取；拿"], w:[
  ["except","prep.","除了",0],
  ["accept","v.","接受",0],
  ["concept","n.","概念",0]
]},
{ r:"creat", v:["creat"], d:"creat-", m:["创造"], w:[
  ["create","v.","创造",0],
  ["creative","adj.","有创造力的",0],
  ["creature","n.","生物",0]
]},
{ r:"cent", v:["cent"], d:"cent-", m:["百"], w:[
  ["century","n.","世纪",0],
  ["centimeter","n.","厘米",0]
]},
{ r:"pac", v:["pac"], d:"pac-", m:["和平"], w:[
  ["peace","n.","和平",0],
  ["peaceful","adj.","和平的",0]
]},
{ r:"press", v:["press"], d:"press-", m:["压"], w:[
  ["pressure","n.","压力",0],
  ["express","v.","表达",0],
  ["impress","v.","打动",0]
]},
{ r:"cap", v:["cap"], d:"cap-", m:["头","拿取"], w:[
  ["capital","n.","首都",0],
  ["captain","n.","船长",0],
  ["capable","adj.","有能力的",1]
]},
{ r:"norm", v:["norm"], d:"norm-", m:["规范"], w:[
  ["normal","adj.","正常的",0],
  ["abnormal","adj.","反常的",0]
]},
{ r:"cred", v:["cred"], d:"cred-", m:["相信"], w:[
  ["credit","n.","信用",0],
  ["incredible","adj.","难以置信的",0]
]},
{ r:"tain", v:["tain"], d:"tain-", m:["持；握"], w:[
  ["content","n.","内容",0],
  ["maintain","v.","维持",0],
  ["contain","v.","包含",0],
  ["obtain","v.","获得",0]
]},
{ r:"min", v:["min"], d:"min-", m:["小"], w:[
  ["minute","adj.","微小的（≠分钟）",0],
  ["minimum","n.","最小值",0],
  ["minor","adj.","较小的",0]
]},
{ r:"duc", v:["duc","dukt"], d:"duc- / dukt-", m:["引导"], w:[
  ["product","n.","产品",0],
  ["produce","v.","生产",0],
  ["reduce","v.","减少",0],
  ["introduce","v.","介绍",0],
  ["educate","v.","教育",0]
]},
{ r:"tract", v:["tract"], d:"tract-", m:["拉"], w:[
  ["contract","n.","合同",0],
  ["attract","v.","吸引",0],
  ["extract","v.","提取",0],
  ["distract","v.","使分心",0],
  ["subtract","v.","减去",0]
]},
{ r:"ann", v:["ann","enn"], d:"ann-", m:["年"], w:[
  ["annual","adj.","每年的",0],
  ["anniversary","n.","周年纪念",0]
]},
{ r:"pend", v:["pend"], d:"pend-", m:["悬挂"], w:[
  ["independent","adj.","独立的",0],
  ["depend","v.","依靠",0]
]},
{ r:"multi", v:["multi"], d:"multi-", m:["多"], w:[
  ["multiple","adj.","多个的",0],
  ["multiply","v.","乘",0]
]},
{ r:"oper", v:["oper"], d:"oper-", m:["工作"], w:[
  ["operation","n.","操作；手术",0],
  ["operate","v.","操作；动手术",0],
  ["operator","n.","操作员",0]
]},
{ r:"fort", v:["fort"], d:"fort-", m:["强"], w:[
  ["effort","n.","努力",0],
  ["comfortable","adj.","舒适的",0],
  ["comfort","n.","安慰",0]
]},
{ r:"prim", v:["prim"], d:"prim-", m:["第一"], w:[
  ["primary","adj.","主要的",0],
  ["prime","adj.","首要的",0]
]},
{ r:"mit", v:["mit","miss"], d:"mit- / miss-", m:["送"], w:[
  ["mission","n.","使命",0],
  ["promise","v./n.","承诺；许诺",0],
  ["admit","v.","承认",0],
  ["submit","v.","提交",0],
  ["permit","v.","允许",0],
  ["dismiss","v.","解散",0]
]},
{ r:"divid", v:["divid","divis"], d:"divid- / divis-", m:["分开"], w:[
  ["division","n.","除法",0],
  ["divide","v.","分开",0]
]},
{ r:"libr", v:["libr"], d:"libr-", m:["书"], w:[
  ["library","n.","图书馆",0]
]},
{ r:"struct", v:["struct"], d:"struct-", m:["建造"], w:[
  ["structure","n.","结构",0],
  ["destroy","v.","破坏",0],
  ["construct","v.","建造",0],
  ["instruct","v.","指导",0]
]},
{ r:"fam", v:["fam"], d:"fam-", m:["名声"], w:[
  ["famous","adj.","著名的",0]
]},
{ r:"solv", v:["solv","solu"], d:"solv- / solu-", m:["松","解决"], w:[
  ["solution","n.","解决办法",1],
  ["resolution","n.","决议",1],
  ["absolute","adj.","绝对的",0],
  ["solve","v.","解决",1],
  ["resolve","v.","解决",1]
]},
{ r:"sur", v:["sur","super"], d:"sur-", m:["上；在…之上"], w:[
  ["surface","n.","表面",0]
]},
{ r:"bene", v:["bene","ben"], d:"bene-", m:["好"], w:[
  ["benefit","n.","利益",0],
  ["beneficial","adj.","有益的",0]
]},
{ r:"anim", v:["anim"], d:"anim-", m:["生命","精神"], w:[
  ["animal","n.","动物",0]
]},
{ r:"grad", v:["grad","gres","gress"], d:"grad- / gress-", m:["走"], w:[
  ["grade","n.","年级；成绩",0],
  ["progress","n./v.","进步；进展",0],
  ["graduate","v.","毕业",0],
  ["gradual","adj.","逐渐的",0]
]},
{ r:"tele", v:["tele"], d:"tele-", m:["远"], w:[
  ["television","n.","电视",0],
  ["telephone","n.","电话",0]
]},
{ r:"spir", v:["spir"], d:"spir-", m:["呼吸"], w:[
  ["spirit","n.","精神",0],
  ["inspire","v.","激发",0]
]},
{ r:"flu", v:["flu"], d:"flu-", m:["流"], w:[
  ["influence","n.","影响",0],
  ["fluid","n.","流体",0],
  ["fluent","adj.","流利的",0]
]},
{ r:"in", v:["in","im","il","ir"], d:"in- / im- / il- / ir-", m:["不；非"], w:[
  ["impossible","adj.","不可能的",0],
  ["illegal","adj.","不合法的",0],
  ["incorrect","adj.","不正确的",0],
  ["incomplete","adj.","不完整的",0],
  ["irregular","adj.","不规则的",0],
  ["impatient","adj.","不耐烦的",0]
]},
{ r:"labor", v:["labor"], d:"labor-", m:["劳"], w:[
  ["labor","n.","劳动",0],
  ["laboratory","n.","实验室",0]
]},
{ r:"veh", v:["veh"], d:"veh-", m:["运"], w:[
  ["vehicle","n.","车辆",0]
]},
{ r:"scrib", v:["scrib","script"], d:"scrib- / script-", m:["写"], w:[
  ["description","n.","描述",0],
  ["describe","v.","描述",0],
  ["script","n.","剧本",0],
  ["subscribe","v.","订阅",0],
  ["manuscript","n.","手稿",0],
  ["prescribe","v.","开处方",0]
]},
{ r:"sist", v:["sist"], d:"sist-", m:["站"], w:[
  ["exist","v.","存在",0],
  ["assistant","n.","助手",0],
  ["assist","v.","帮助",0],
  ["resist","v.","抵抗",0],
  ["insist","v.","坚持",0],
  ["consist","v.","由…组成",0],
  ["persist","v.","坚持不懈",0]
]},
{ r:"aud", v:["aud"], d:"aud-", m:["听"], w:[
  ["audience","n.","听众；观众",0],
  ["audio","n.","音频",0]
]},
{ r:"vinc", v:["vinc","vict"], d:"vinc- / vict-", m:["胜"], w:[
  ["victory","n.","胜利",0],
  ["convince","v.","说服",0]
]},
{ r:"terr", v:["terr"], d:"terr-", m:["怕"], w:[
  ["terrible","adj.","可怕的",0],
  ["terror","n.","恐怖",0],
  ["terrify","v.","使害怕",0]
]},
{ r:"mis", v:["mis"], d:"mis-", m:["错"], w:[
  ["mistake","n.","错误",0],
  ["misunderstand","v.","误解",0]
]},
{ r:"nov", v:["nov"], d:"nov-", m:["新"], w:[
  ["novel","n.","小说",0],
  ["innovation","n.","创新",0]
]},
{ r:"un", v:["un"], d:"un-", m:["不"], w:[
  ["unable","adj.","不能的",0],
  ["unfair","adj.","不公平的",0],
  ["unhappy","adj.","不开心的",0]
]},
{ r:"medi", v:["medi"], d:"medi-", m:["中间"], w:[
  ["medium","adj.","中等的",0],
  ["immediate","adj.","立即的",0]
]},
{ r:"cycl", v:["cycl"], d:"cycl-", m:["圆"], w:[
  ["cycle","n.","循环",0],
  ["recycle","v.","回收",0]
]},
{ r:"mot", v:["mot"], d:"mot-", m:["移动"], w:[
  ["motion","n.","运动",0],
  ["promote","v.","促进",0],
  ["motor","n.","马达",0],
  ["remote","adj.","遥远的",0],
  ["emotion","n.","情绪",0]
]},
{ r:"par", v:["par"], d:"par-", m:["生；产"], w:[
  ["parent","n.","父母",0]
]},
{ r:"pre", v:["pre"], d:"pre-", m:["前"], w:[
  ["prepare","v.","准备",0],
  ["predict","v.","预测；预言",0],
  ["preview","v.","预习",0]
]},
{ r:"err", v:["err"], d:"err-", m:["错"], w:[
  ["error","n.","错误",0]
]},
{ r:"man", v:["man","manu"], d:"man- / manu-", m:["手","管理"], w:[
  ["manage","v.","管理",1],
  ["manual","adj.","手工的",0],
  ["manufacture","v.","制造",0]
]},
{ r:"vit", v:["vit","viv"], d:"vit- / viv-", m:["生命"], w:[
  ["survive","v.","幸存",0],
  ["vital","adj.","至关重要的",0],
  ["vitamin","n.","维生素",0],
  ["vivid","adj.","生动的",0],
  ["revive","v.","苏醒",0]
]},
{ r:"vac", v:["vac"], d:"vac-", m:["空"], w:[
  ["vacation","n.","假期",0],
  ["vacant","adj.","空的",0]
]},
{ r:"dis", v:["dis","dif"], d:"dis-", m:["不；无","分开；离"], w:[
  ["discover","v.","发现",1],
  ["disappear","v.","消失",1],
  ["dislike","v.","不喜欢",0],
  ["dishonest","adj.","不诚实的",0]
]},
{ r:"fus", v:["fus"], d:"fus-", m:["倾注"], w:[
  ["refuse","v.","拒绝",0],
  ["confuse","v.","使混乱",0]
]},
{ r:"log", v:["log"], d:"log-", m:["说；话"], w:[
  ["logic","n.","逻辑",0],
  ["dialogue","n.","对话",0],
  ["apology","n.","道歉",0],
  ["catalog","n.","目录",0]
]},
{ r:"auto", v:["auto"], d:"auto-", m:["自己","自动"], w:[
  ["automatic","adj.","自动的",1],
  ["autobiography","n.","自传",0]
]},
{ r:"ex", v:["ex","e","ef"], d:"ex-", m:["出；向外"], w:[
  ["exit","n.","出口",0],
  ["expand","v.","扩大",0]
]},
{ r:"sym", v:["sym","syn"], d:"sym- / syn-", m:["共同"], w:[
  ["symbol","n.","象征",0],
  ["sympathy","n.","同情",0],
  ["symphony","n.","交响乐",0]
]},
{ r:"grav", v:["grav"], d:"grav-", m:["重"], w:[
  ["grave","adj.","严重的",0],
  ["gravity","n.","重力",0]
]},
{ r:"nunci", v:["nunci","nounc"], d:"nunci-", m:["宣布"], w:[
  ["announcement","n.","公告",0],
  ["announce","v.","宣布",0],
  ["pronounce","v.","发音",0],
  ["pronunciation","n.","发音",0]
]},
{ r:"volv", v:["volv"], d:"volv-", m:["卷"], w:[
  ["involve","v.","涉及",0],
  ["revolve","v.","旋转",0]
]},
{ r:"scop", v:["scop"], d:"scop-", m:["看"], w:[
  ["scope","n.","范围",0],
  ["telescope","n.","望远镜",0],
  ["microscope","n.","显微镜",0]
]},
{ r:"graph", v:["graph"], d:"graph-", m:["写；画"], w:[
  ["photograph","n.","照片",0],
  ["paragraph","n.","段落",0],
  ["geography","n.","地理",0],
  ["autograph","n.","亲笔签名",0]
]},
{ r:"bio", v:["bio"], d:"bio-", m:["生命"], w:[
  ["biology","n.","生物学",0],
  ["biography","n.","传记",0],
  ["antibiotic","n.","抗生素",0]
]},
{ r:"de", v:["de"], d:"de-", m:["向下","除去"], w:[
  ["decrease","v.","减少",0],
  ["depart","v.","离开",1]
]},
{ r:"rupt", v:["rupt"], d:"rupt-", m:["断"], w:[
  ["corrupt","adj.","腐败的",0],
  ["interrupt","v.","打断",0],
  ["abrupt","adj.","突然的",0],
  ["erupt","v.","爆发",0]
]},
{ r:"magn", v:["magn"], d:"magn-", m:["大"], w:[
  ["magnificent","adj.","壮丽的",0],
  ["magnify","v.","放大",0]
]},
{ r:"dict", v:["dict"], d:"dict-", m:["说"], w:[
  ["dictionary","n.","词典",0],
  ["dictate","v.","口授；命令",0],
  ["contradict","v.","反驳",0]
]},
{ r:"bi", v:["bi"], d:"bi-", m:["二"], w:[
  ["bicycle","n.","自行车",0]
]},
{ r:"tri", v:["tri"], d:"tri-", m:["三"], w:[
  ["triangle","n.","三角形",0]
]},
{ r:"co", v:["co","col","com","con"], d:"co- / col- / com- / con-", m:["共同"], w:[
  ["cooperate","v.","合作",0],
  ["coworker","n.","同事",0]
]},
{ r:"lumin", v:["lumin"], d:"lumin-", m:["光"], w:[
  ["illuminate","v.","照亮",0],
  ["luminous","adj.","发光的",0]
]},
{ r:"kilo", v:["kilo"], d:"kilo-", m:["千"], w:[
  ["kilometer","n.","千米",0],
  ["kilogram","n.","千克",0]
]},
];
