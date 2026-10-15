/* ============================================================
 * 学习工具箱 · 首页在线更新（蓝队 2026-10-13）
 *
 * 纯静态零依赖：用 fetch 拉官方 Pages 上的 version.json 比对。
 * - 页面加载自动静默检查一次；失败（断网/file://）不打扰。
 * - 手动点"检查更新"：明确回显"已是最新"或"发现新版本"。
 * - "更新到最新"：Pages 域名下清缓存硬重载；本地部署给 zip 下载入口
 *   （浏览器安全限制：网页不能直接改本地文件）。
 * ============================================================ */
(function () {
  "use strict";

  var OFFICIAL_VERSION_URL = "https://mentos523.github.io/learning-toolbox/version.json";
  var REPO_ZIP_URL = "https://github.com/mentos523/learning-toolbox/archive/refs/heads/main.zip";
  var REPO_URL = "https://github.com/mentos523/learning-toolbox";
  var pendingRemote = null;   // 最近一次检查到的远端版本号

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // "2026.10.13.1" 逐段数值比对；>0 表示 a 更新
  function cmpVer(a, b) {
    var pa = String(a || "0").split("."), pb = String(b || "0").split(".");
    var n = Math.max(pa.length, pb.length);
    for (var i = 0; i < n; i++) {
      var d = (parseInt(pa[i], 10) || 0) - (parseInt(pb[i], 10) || 0);
      if (d) return d;
    }
    return 0;
  }

  function localVersion() { return window.TOOLBOX_VERSION || "0"; }
  function isFileProto() { return location.protocol === "file:"; }
  function isPagesHost() { return /(^|\.)github\.io$/.test(location.hostname); }

  function fetchRemoteVersion() {
    return fetch(OFFICIAL_VERSION_URL, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("http " + r.status);
        return r.json();
      })
      .then(function (j) {
        if (!j || !j.version) throw new Error("bad version.json");
        return String(j.version);
      });
  }

  function showBanner(html) {
    var b = $("update-banner");
    b.innerHTML = html;
    b.hidden = false;
  }
  function hideBanner() { $("update-banner").hidden = true; }
  function setDot(on) { $("update-dot").hidden = !on; }

  function bannerHasUpdate(remote) {
    showBanner(
      '<span>🎉 发现新版本 <b>v' + esc(remote) + "</b>（当前 v" + esc(localVersion()) + "）" +
      "，更新会强制重新加载全部文件（含各学科模块），学习进度不受影响。</span> " +
      '<button id="do-update-btn" class="update-btn update-btn-primary">更新到最新</button>'
    );
    setDot(true);
    var btn = $("do-update-btn");
    if (btn) btn.addEventListener("click", doUpdate);
  }

  function doUpdate() {
    if (isFileProto()) {
      showBanner("<span>📦 当前是本地文件模式：请从 <a href=\"" + REPO_URL +
        "\">GitHub 仓库</a>下载最新版覆盖本地文件。</span>");
      return;
    }
    if (isPagesHost()) {
      // Pages 域名下：清 Cache Storage → 带 cache-bust 参数硬重载。
      // 各模块 css/js 引用自带 ?v=<版本号> 指纹（见模块 index.html），新版 HTML
      // 必然拉取新版模块文件；localStorage（ltb-* 学习进度）全程不碰。
      showBanner("<span>⏳ 正在拉取最新版本…</span>");
      var clear = (window.caches && caches.keys)
        ? caches.keys().then(function (ks) {
            return Promise.all(ks.map(function (k) { return caches.delete(k); }));
          }).catch(function () {})
        : Promise.resolve();
      clear.then(function () {
        var url = location.pathname + (location.search ? location.search + "&" : "?") +
          "v=" + Date.now() + location.hash;
        location.href = url;
      });
      return;
    }
    // 本地/其他部署：网页改不了本地文件，给下载入口并如实说明
    showBanner(
      "<span>📦 当前为本地/自建部署，网页不能直接修改本地文件。" +
      '请<a href="' + REPO_ZIP_URL + '">下载最新版 zip</a>（v' + esc(pendingRemote || "") +
      "）解压覆盖即可。</span>"
    );
  }

  // silent=true 时失败不打扰（自动检查 / file://）
  function check(silent) {
    if (isFileProto()) {
      if (!silent) showBanner("<span>📴 离线模式无法在线检查更新。</span>");
      return;
    }
    fetchRemoteVersion().then(function (remote) {
      pendingRemote = remote;
      if (cmpVer(remote, localVersion()) > 0) {
        bannerHasUpdate(remote);
      } else {
        setDot(false);
        if (!silent) showBanner("<span>✅ 已是最新版本（v" + esc(localVersion()) + "）。</span>");
      }
    }).catch(function () {
      // 断网等：自动检查静默；手动给温和提示
      if (!silent) showBanner("<span>📡 检查失败（可能是断网），稍后再试。</span>");
    });
  }

  function init() {
    var label = $("version-label");
    if (label) label.textContent = "v" + localVersion();
    var btn = $("check-update-btn");
    if (btn) btn.addEventListener("click", function () { check(false); });
    // 页面加载自动静默检查一次
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { check(true); });
    } else {
      check(true);
    }
  }

  init();
})();
