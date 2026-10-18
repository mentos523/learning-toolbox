/* ============================================================
 * 学习工具箱 · 物理 · 学习路径提示组件（S3 试点，2026-10-18）
 *
 * 用户裁决 C2（cn-math-taxonomy 专场）：不做完整诊断形态，只做轻量
 * 「学习路径提示」并入课页。本组件在每课页眉下方渲染一行提示。
 *
 * 黄队 B1/B2 必改（2026-10-18 YELLOW-REVIEW.md）：
 *  ① 头文案去指令化：「🗺️ 路径提示：这节课用到了」（"要不要看"的
 *     判断还给每条边的标注，不用"建议先看"发指令）；
 *  ② hard/soft 对称显式标注：「（先看）」/「（选看）」（含糊比明确
 *     更制造焦虑，hard 才值得"先看"二字）；
 *  ③ 分隔符不用"→"（会被读成顺序），用"、"（前置课之间是并列关系）；
 *  ④ reason 触屏可见化：hard 的 reason 小字灰字直接跟在链接后；
 *     soft 的 reason 做"为什么？"可展开（默认收起，触屏可点）。
 * 黄队 B4 建议：入边 >3 条时折叠（推广到全书防长串），试点 cap=3。
 *
 * 数据源：data/prereq-pilot.js（window.PHY_PREREQ），file:// 下用
 * <script> 载入，不走 fetch。无数据/课不在试点范围 → 返回 null，
 * 渲染层无感（physics.js 侧有 window 存在性守卫）。
 * 课标题取自 window.PHY_CH（data/pNN.js 已载入）。
 * ============================================================ */
(function () {
  "use strict";
  var CAP = 3; // 入边超过此数则折叠（黄队 B4）

  function lessonTitle(id) {
    try {
      var chs = (window.PHY_CH) || {};
      for (var k in chs) {
        var ch = chs[k];
        var units = ch.units || [];
        for (var i = 0; i < units.length; i++) {
          var lessons = units[i].lessons || [];
          for (var j = 0; j < lessons.length; j++) {
            if (lessons[j].id === id) return lessons[j].title || id;
          }
        }
      }
    } catch (e) {}
    return id;
  }

  function prereqTitle(id) {
    var g = window.PHY_PREREQ;
    if (g && g.nodes) {
      for (var i = 0; i < g.nodes.length; i++) {
        if (g.nodes[i].id === id) return g.nodes[i].title || id;
      }
    }
    return lessonTitle(id);
  }

  /* 返回某课的入边（前置课），按 hard 优先、课号排序 */
  function incoming(lessonId) {
    var g = window.PHY_PREREQ;
    if (!g || !g.edges) return [];
    var list = [];
    for (var i = 0; i < g.edges.length; i++) {
      var e = g.edges[i];
      if (e.to === lessonId) list.push(e);
    }
    list.sort(function (a, b) {
      if (a.strength !== b.strength) return a.strength === "hard" ? -1 : 1;
      return a.from < b.from ? -1 : 1;
    });
    return list;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* 一条前置：链接/文本 + （先看）/（选看）标注 + reason 可见化 */
  function renderItem(e) {
    var wrap = el("span", "phy-prereq-hint-item");
    var isExt = e.from.indexOf("ext-") === 0;
    var isHard = e.strength === "hard";
    var label = prereqTitle(e.from) + (isHard ? "（先看）" : "（选看）");
    var node;
    if (isExt) {
      node = el("span", "phy-prereq-hint-ext", label);
      node.title = "学段外前置（小学科学），仅作提示";
    } else {
      node = el("a", "phy-prereq-hint-link", label);
      node.href = "#" + e.from;
    }
    wrap.appendChild(node);
    if (isHard) {
      /* hard：reason 小字灰字直接可见（真拦路虎值得一行小字解释） */
      if (e.reason) wrap.appendChild(el("span", "phy-prereq-hint-why", "——" + e.reason));
    } else if (e.reason && !isExt) {
      /* soft：reason 做"为什么？"可展开，默认收起 */
      var btn = el("button", "phy-prereq-hint-toggle", "为什么？");
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");
      var detail = el("span", "phy-prereq-hint-why soft hidden", e.reason);
      btn.addEventListener("click", function () {
        var open = detail.classList.toggle("hidden");
        btn.setAttribute("aria-expanded", open ? "false" : "true");
      });
      wrap.appendChild(btn);
      wrap.appendChild(detail);
    }
    return wrap;
  }

  function render(lessonId) {
    var pre = incoming(lessonId);
    if (pre.length === 0) return null;
    var box = el("div", "phy-prereq-hint");
    box.setAttribute("role", "note");
    box.setAttribute("aria-label", "学习路径提示");
    box.appendChild(el("span", "phy-prereq-hint-head", "🗺️ 路径提示：这节课用到了"));
    var shown = pre.slice(0, CAP);
    var rest = pre.slice(CAP);
    shown.forEach(function (e, idx) {
      if (idx > 0) box.appendChild(el("span", "phy-prereq-hint-sep", "、"));
      box.appendChild(renderItem(e));
    });
    if (rest.length > 0) {
      var moreBtn = el("button", "phy-prereq-hint-more", "展开全部（共 " + pre.length + " 条）");
      moreBtn.type = "button";
      moreBtn.setAttribute("aria-expanded", "false");
      var moreWrap = el("span", "phy-prereq-hint-morewrap hidden");
      rest.forEach(function (e) {
        moreWrap.appendChild(el("span", "phy-prereq-hint-sep", "、"));
        moreWrap.appendChild(renderItem(e));
      });
      moreBtn.addEventListener("click", function () {
        var hidden = moreWrap.classList.toggle("hidden");
        moreBtn.setAttribute("aria-expanded", hidden ? "false" : "true");
        moreBtn.textContent = hidden ? "展开全部（共 " + pre.length + " 条）" : "收起";
      });
      box.appendChild(moreBtn);
      box.appendChild(moreWrap);
    }
    return box;
  }

  window.PHY_PREREQ_HINT = { render: render, incoming: incoming };
})();
