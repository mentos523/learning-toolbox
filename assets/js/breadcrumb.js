/* ============================================================
 * 学习工具箱 · 面包屑导航共享组件（全局导航批 2026-10-19）
 *
 * 用法：
 *   1. 6 个模块壳（modules/<slug>/index.html）在 </body> 前引用本脚本；
 *      DOM 就绪后自动渲染基础两段：学习工具箱 → 学科名（当前页）。
 *   2. 各模块主 JS 在路由切换时调用 window.TB_crumb.update(items)
 *      更新深层 trail；items = [{label, href}, ...]，
 *      href 为空表示纯文本段；最后一项恒为当前页（不可点，
 *      标 aria-current="page"）。
 *
 * 学科名取自壳内 .tb-brand-subject 原文（ui-spec 规范名），不另建映射表。
 * 零依赖、零网络请求、全相对路径；file:// 与子目录部署均可用。
 * 全部 DOM 操作走 textContent，不拼接 HTML（防注入）。
 * ============================================================ */
(function () {
  "use strict";

  var HOME_HREF = "../../index.html"; /* 站点首页：6 个壳深度恒为 2 */
  var MODULE_HREF = "index.html";     /* 学科板块页：自身去 hash 即回选择视图 */

  function navEl() { return document.querySelector("nav.tb-crumb"); }

  function appendSeg(ol, label, href, isCurrent) {
    var li = document.createElement("li");
    if (isCurrent || !href || (/^\s*javascript:/i).test(href)) {
      /* 当前页 / 纯文本段 / 非法伪协议：一律降级为不可点文本 */
      var sp = document.createElement("span");
      sp.textContent = label;
      if (isCurrent) sp.setAttribute("aria-current", "page");
      else sp.className = "tb-crumb-text";
      li.appendChild(sp);
    } else {
      var a = document.createElement("a");
      a.textContent = label;
      a.setAttribute("href", href);
      li.appendChild(a);
    }
    ol.appendChild(li);
  }

  function baseItems() {
    var items = [{ label: "学习工具箱", href: HOME_HREF }];
    var subj = document.querySelector(".tb-brand-head .tb-brand-subject");
    var name = subj ? subj.textContent.replace(/\s+/g, " ").trim() : "";
    if (name) items.push({ label: name, href: null });
    return items;
  }

  function render(items) {
    var old = navEl();
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var list = (items && items.length) ? items : baseItems();
    var nav = document.createElement("nav");
    nav.className = "tb-crumb";
    nav.setAttribute("aria-label", "面包屑导航");
    var ol = document.createElement("ol");
    for (var i = 0; i < list.length; i++) {
      appendSeg(ol, list[i].label, list[i].href, i === list.length - 1);
    }
    nav.appendChild(ol);
    /* 落点：品牌头之后；无品牌头时退化为 body 首部 */
    var anchor = document.querySelector(".tb-brand-head");
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(nav, anchor.nextSibling);
    } else if (document.body) {
      document.body.insertBefore(nav, document.body.firstChild);
    }
    return nav;
  }

  function init() {
    if (navEl()) return;
    /* 根首页不引用本脚本；无 .tb-brand-subject 时不自动挂载 */
    if (!document.querySelector(".tb-brand-head .tb-brand-subject")) return;
    render(baseItems());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.TB_crumb = {
    render: render,
    update: function (items) { render(items); },
    HOME_HREF: HOME_HREF,
    MODULE_HREF: MODULE_HREF
  };
})();
