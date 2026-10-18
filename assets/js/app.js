/* 学习工具箱 · 首页渲染逻辑：读取 registry.js，把学科画成卡片 */
(function () {
  "use strict";

  // 内联 SVG 图标：零依赖，不请求任何外部资源
  var ICONS = {
    abc: '<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">' +
         '<rect x="4" y="8" width="40" height="32" rx="6" fill="COLOR" opacity="0.15"/>' +
         '<text x="24" y="33" text-anchor="middle" font-size="20" font-weight="bold" fill="COLOR" font-family="sans-serif">Aa</text></svg>',
    pi: '<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">' +
        '<rect x="4" y="8" width="40" height="32" rx="6" fill="COLOR" opacity="0.15"/>' +
        '<text x="24" y="34" text-anchor="middle" font-size="24" font-weight="bold" fill="COLOR" font-family="serif">π</text></svg>',
    box: '<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">' +
         '<rect x="4" y="8" width="40" height="32" rx="6" fill="COLOR" opacity="0.15"/>' +
         '<text x="24" y="33" text-anchor="middle" font-size="20" font-weight="bold" fill="COLOR" font-family="sans-serif">+</text></svg>',
    atom: '<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">' +
         '<rect x="4" y="8" width="40" height="32" rx="6" fill="COLOR" opacity="0.15"/>' +
         '<g fill="none" stroke="COLOR" stroke-width="2">' +
         '<ellipse cx="24" cy="24" rx="14" ry="6"/>' +
         '<ellipse cx="24" cy="24" rx="14" ry="6" transform="rotate(60 24 24)"/>' +
         '<ellipse cx="24" cy="24" rx="14" ry="6" transform="rotate(120 24 24)"/>' +
         '</g><circle cx="24" cy="24" r="3" fill="COLOR"/></svg>',
    flask: '<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">' +
         '<rect x="4" y="8" width="40" height="32" rx="6" fill="COLOR" opacity="0.15"/>' +
         '<path d="M20 10 h8 v7 l9 19 a3 3 0 0 1 -2.7 4 H13.7 a3 3 0 0 1 -2.7 -4 l9 -19 z" fill="none" stroke="COLOR" stroke-width="2"/>' +
         '<path d="M15 29 h18 l2.2 4.6 a2.5 2.5 0 0 1 -2.2 3.4 H15 a2.5 2.5 0 0 1 -2.2 -3.4 z" fill="COLOR" opacity="0.45"/></svg>'
  };

  function icon(name, color) {
    var svg = ICONS[name] || ICONS.box;
    return svg.split("COLOR").join(color);
  }

  function cardHTML(m) {
    var ready = m.status === "ready";
    var badge = ready
      ? '<span class="badge badge-ready">可用</span>'
      : '<span class="badge badge-soon">筹备中</span>';
    var action = ready
      ? '<span class="tb-btn-primary">进入学习 →</span>'
      : '<span class="card-btn card-btn-disabled">敬请期待</span>';

    var inner =
      '<div class="card-icon">' + icon(m.icon, m.color) + "</div>" +
      '<div class="card-text">' +
        "<h2>" + m.name + " <small>· " + m.tagline + "</small></h2>" +
        "<p>" + m.description + "</p>" +
      "</div>" +
      badge + action;

    if (ready) {
      return '<a class="card tb-card" style="--card-color:' + m.color + '" href="' + m.path + '">' + inner + "</a>";
    }
    return '<div class="card card-soon tb-card" style="--card-color:' + m.color + '">' + inner + "</div>";
  }

  function render() {
    var grid = document.getElementById("module-grid");
    if (!grid) return;
    var modules = window.TOOLBOX_MODULES || [];
    if (!modules.length) {
      grid.innerHTML = '<p class="hint">还没有任何学科，快去 registry.js 里注册第一个吧。</p>';
      return;
    }
    grid.innerHTML = modules.map(cardHTML).join("");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
