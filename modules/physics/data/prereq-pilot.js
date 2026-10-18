/* ============================================================
 * 学习工具箱 · 物理 · 前置关系层试点数据（S3，2026-10-18）
 *
 * 范围：p00–p02（试点）。字段口径借鉴 cn-math-taxonomy / os-taxonomy
 * 专场的 hard/soft + 一句话 reason 设计思想；**边数据全部人工逐条
 * 判定，未复制任何外部数据/文本**（对方 CC BY-NC 4.0 + 数据库特殊
 * 权利 + AI 未审核，三重墙，内容不碰）。
 *
 * schema: toolbox-prereq/1.0（见 tools/validate-toolbox.mjs 的断言清单）
 * 方向：from（前置）→ to（后学）。hard=学生认知上的拦路虎（没学前者
 * 后者核心概念立不住）；soft=有前者学得更顺、无亦可学。
 * 「hard 越少越可信」——hard 纯度经黄队拦路虎审查。
 *
 * 审定：物理专家队逐条审定（EXPERT-REVIEW.md）+ 黄队教学审定
 * （YELLOW-REVIEW.md）；两审合并裁决 r2 版（2026-10-18）：
 * 初稿 33 条 → 降级 4 条（E02/E03/E11/E12）/ 删除 17 条（E13+16 条
 * 章末小结汇总边）/ 改 from 1 条（E22→p02.1.2）/ 新增 1 条真 hard
 * （E13b: p01.1.3→p01.1.5）；reason 全部按黄队学生语言文案落字；
 * 章末小结节点（p00.1.0/p01.1.0/p02.2.0）无边后移出图谱（黄队 B4：
 * 小结页不设提示行）。
 * 审定记录：~/workspace/phy-audit/prereq-pilot/
 * 用 <script> 载入（file:// 红线，不走 fetch）。
 * ============================================================ */
window.PHY_PREREQ = {
  schema: "toolbox-prereq/1.0",
  module: "physics",
  scope: ["p00", "p01", "p02"],
  version: "2026-10-18-pilot-r2",
  nodes: [
    { id: "ext-xiaoxue-kexue", kind: "external", external: true, title: "小学科学",
      root_reason: "学段入口依赖：p00 为全书导论，默认学生具备小学科学的观察与分类直觉，属学段外前置，无学科内前置" },
    { id: "p00.1.1", kind: "lesson", title: "物理学研究什么" },
    { id: "p00.1.2", kind: "lesson", title: "科学探究七要素" },
    { id: "p00.1.3", kind: "lesson", title: "测量与单位" },
    { id: "p00.1.4", kind: "lesson", title: "数量级与估算" },
    { id: "p01.1.1", kind: "lesson", title: "声音的产生" },
    { id: "p01.1.2", kind: "lesson", title: "声音的传播" },
    { id: "p01.1.3", kind: "lesson", title: "声音的特性" },
    { id: "p01.1.4", kind: "lesson", title: "噪声的危害和控制" },
    { id: "p01.1.5", kind: "lesson", title: "超声波与次声波" },
    { id: "p02.1.1", kind: "lesson", title: "光源与光的直线传播" },
    { id: "p02.1.2", kind: "lesson", title: "光的反射定律" },
    { id: "p02.1.3", kind: "lesson", title: "平面镜成像" },
    { id: "p02.2.1", kind: "lesson", title: "光的折射" },
    { id: "p02.2.2", kind: "lesson", title: "透镜" },
    { id: "p02.2.3", kind: "lesson", title: "探究凸透镜成像规律" },
    { id: "p02.2.4", kind: "lesson", title: "眼睛、眼镜与光的色散" }
  ],
  edges: [
    { from: "ext-xiaoxue-kexue", to: "p00.1.1", strength: "soft",
      reason: "小学科学课练过观察和分类——有这个底子，导论读得更顺；没有也能跟上。" },
    { from: "p00.1.1", to: "p00.1.2", strength: "soft",
      reason: "七要素是跟着摆实验一步步走会的，不逛“五个筐”也能玩；先知道物理是给世界“分筐”的学问，更清楚这套方法将来装进哪个筐。" },
    { from: "p00.1.2", to: "p00.1.3", strength: "soft",
      reason: "测量课自己会讲“数字没单位是哑巴”；带着“探究需要数据”的意识来，更懂“为什么测”，但读数本身不卡壳。" },
    { from: "p00.1.3", to: "p00.1.4", strength: "hard",
      reason: "这节课开口就是“一张纸约 10⁻⁴ 米”——没学过“数字要带单位”，这些数全是天书。" },
    { from: "p00.1.1", to: "p01.1.1", strength: "soft",
      reason: "p00 把世界分成力、热、声、光、电五个筐——学“声”之前，知道它是五筐之一，心里先有张地图。" },
    { from: "p01.1.1", to: "p01.1.2", strength: "hard",
      reason: "传播课讲的是“振动怎么传出去”——连“谁在振动”都不知道，“介质”就没东西可传。" },
    { from: "p01.1.2", to: "p01.1.3", strength: "soft",
      reason: "特性课有自己的波形调参台，音调/响度/音色当场就能玩明白；先走过“振动传出去”这条路，更知道特性背后是振动在捣鬼。" },
    { from: "p01.1.3", to: "p01.1.4", strength: "soft",
      reason: "这节课“分贝是响度的单位”一句话要用上节课的概念；但“声源/传播/人耳三处减弱”的招数本身，靠生活经验就能懂。" },
    { from: "p01.1.3", to: "p01.1.5", strength: "hard",
      reason: "“超声波”的“超”，超的是频率上限——没学过“频率”，连“超”的是什么都猜不对。" },
    { from: "p00.1.2", to: "p02.1.1", strength: "soft",
      reason: "这节课一上来就是“小孔成像猜一猜”——带着“先猜后验、一次只改一个量”的意识来玩，更有感觉。" },
    { from: "p02.1.1", to: "p02.1.2", strength: "hard",
      reason: "反射定律画的是“光线”遇到镜面怎么转弯——没学过“光线”这个模型，连图都看不懂。" },
    { from: "p02.1.2", to: "p02.1.3", strength: "hard",
      reason: "课上用“反射光线反向延长线交于镜后”讲清像在哪——没学过反射定律，就只能死记“像与物对称”。" },
    { from: "p02.1.2", to: "p02.2.1", strength: "soft",
      reason: "折射角是“跟法线的夹角”，跟反射角一个量法——先学过反射定律，这个量角习惯直接复用。" },
    { from: "p02.2.1", to: "p02.2.2", strength: "hard",
      reason: "透镜让光会聚、发散，靠的全是折射——没学过折射，三条特殊光线只能死记硬背。" },
    { from: "p02.2.2", to: "p02.2.3", strength: "hard",
      reason: "探究课直接上手调透镜：物距、焦距满屏飞——没学过透镜，连滑块是干嘛的都不知道。" },
    { from: "p02.2.3", to: "p02.2.4", strength: "hard",
      reason: "眼睛就是一架天然凸透镜——没亲手推过成像规律，近视/远视“像成在哪”只能靠背。" },
    { from: "p00.1.2", to: "p02.2.3", strength: "soft",
      reason: "摆实验里练过“一次只改一个量”——凸透镜探究也是这个玩法，带着这招来，u 滑块推得更顺。" }
  ]
};
