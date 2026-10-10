/* ============================================================
 * 学习工具箱 · 数学模块 · MathML 环境检测
 *
 * 用户拍板（2026-10-10）：A 方案 = 浏览器原生 MathML（Chrome/Edge 109+）。
 * 本模块在页面加载时检测 MathML 支持情况，不支持时在页面顶部
 * 显示友好提示条，建议用户升级浏览器。
 *
 * 检测原理（两层，缺一不可）：
 *  1. 命名空间检查：document.createElementNS 能否创建 MathML 元素，
 *     且其 namespaceURI 为 MathML 命名空间（排除 HTMLUnknownElement）。
 *  2. 渲染检查：向 DOM 插入 <math><mspace height/width></math>，
 *     有原生支持的浏览器会按给定尺寸渲染 mspace；不支持的
 *     浏览器将其坍缩为 0×0。
 *
 * 对外接口：window.MathMLCheck = { supported, reason, check() }
 * ============================================================ */
(function () {
  "use strict";

  var MATHML_NS = "http://www.w3.org/1998/Math/MathML";

  function namespaceOK() {
    try {
      var el = document.createElementNS(MATHML_NS, "math");
      return el && el.namespaceURI === MATHML_NS;
    } catch (e) {
      return false;
    }
  }

  function renderOK() {
    var holder = null;
    try {
      holder = document.createElement("div");
      holder.setAttribute("aria-hidden", "true");
      holder.style.cssText =
        "position:absolute;left:-9999px;top:0;visibility:hidden;pointer-events:none;";
      // HTML 解析器会把 <math> 解析为 MathML 命名空间元素
      holder.innerHTML =
        "<math><mspace height=\"23px\" width=\"77px\"></mspace></math>";
      document.body.appendChild(holder);
      var mspace = holder.querySelector("mspace");
      if (!mspace) return false;
      var rect = mspace.getBoundingClientRect();
      // 原生支持：mspace 按给定尺寸渲染；不支持：坍缩为 0×0
      return rect.width > 10 && rect.height > 10;
    } catch (e) {
      return false;
    } finally {
      if (holder && holder.parentNode) holder.parentNode.removeChild(holder);
    }
  }

  function check() {
    if (!namespaceOK()) return { supported: false, reason: "namespace" };
    if (!renderOK()) return { supported: false, reason: "render" };
    return { supported: true, reason: "" };
  }

  /* 不支持时显示顶部提示条 */
  function showBanner() {
    if (document.getElementById("mathml-warn")) return;
    var bar = document.createElement("div");
    bar.id = "mathml-warn";
    bar.setAttribute("role", "alert");
    bar.innerHTML =
      '<span>⚠️ 当前浏览器不支持数学公式显示，公式将以文字形式展示。' +
      "建议使用 Chrome / Edge 109+ 版本以获得最佳体验。</span>" +
      '<button type="button" aria-label="关闭提示">✕</button>';
    bar.querySelector("button").addEventListener("click", function () {
      bar.parentNode.removeChild(bar);
    });
    // 插到 body 最前面，保证在所有内容之上
    if (document.body.firstChild) {
      document.body.insertBefore(bar, document.body.firstChild);
    } else {
      document.body.appendChild(bar);
    }
  }

  var result = null;
  function run() {
    result = check();
    window.MathMLCheck = {
      supported: result.supported,
      reason: result.reason,
      check: check
    };
    if (!result.supported) showBanner();
    return result.supported;
  }

  // DOM 就绪后执行；脚本若在 body 末尾加载则立即执行
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
