/* tools/engine-verify/verify-lib.js
 * 验证页共享脚手架（YP-35~39 落地）：
 *  - VLib.assert(id, name, engRefs, cond, expected, actual, diagnose)
 *  - VLib.conclude()：渲染一句话结论区（YP-36），失败输出人话诊断（YP-37），
 *    暴露 window.__VERIFY = {ready, pass, results} 供 run-verify.cjs 读取。
 * 每个验证页 HTML 必须包含：标题（YP-35）、结论区（YP-36）、学生引导文案示例（YP-39）、
 * 代码注释标注 YP 对应条目（YP-38）。
 */
(function () {
  'use strict';

  var VLib = (window.VLib = window.VLib || {});
  VLib.results = [];
  VLib.pageTitle = '';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // id: 用例编号；name: 人话名称；engRefs: ENG 编号数组；cond: 是否通过；
  // expected/actual: 期望与实际（人话）；diagnose: 失败时的人话诊断（测了什么/期望多少/实际多少/可能原因/下一步查哪里）
  VLib.assert = function (id, name, engRefs, cond, expected, actual, diagnose) {
    VLib.results.push({
      id: id, name: name, eng: engRefs,
      pass: !!cond, expected: String(expected), actual: String(actual),
      diagnose: diagnose || ''
    });
  };

  VLib.summarize = function () {
    var pass = 0, fail = 0;
    for (var i = 0; i < VLib.results.length; i++) {
      if (VLib.results[i].pass) pass++; else fail++;
    }
    return { total: VLib.results.length, pass: pass, fail: fail, allPass: fail === 0 };
  };

  VLib.conclude = function () {
    var s = VLib.summarize();
    var box = document.getElementById('verdict');
    var head = document.getElementById('verdict-head');
    if (head) {
      head.textContent =
        '结论：' + (s.allPass ? 'PASS' : 'FAIL') + '（' + s.pass + '/' + s.total + ' 通过）——' + VLib.pageTitle;
      head.className = s.allPass ? 'pass' : 'fail';
    }
    var tbl = document.getElementById('results-table');
    if (tbl) {
      var html = '<tr><th>用例</th><th>测什么</th><th>ENG</th><th>期望</th><th>实际</th><th>判定</th></tr>';
      for (var i = 0; i < VLib.results.length; i++) {
        var r = VLib.results[i];
        html += '<tr class="' + (r.pass ? 'pass' : 'fail') + '"><td>' + esc(r.id) + '</td><td>' + esc(r.name) +
          '</td><td>' + esc(r.eng.join(',')) + '</td><td>' + esc(r.expected) + '</td><td>' + esc(r.actual) +
          '</td><td>' + (r.pass ? 'PASS' : 'FAIL') + '</td></tr>';
        // YP-37：失败时输出人话诊断（测了什么/期望多少/实际多少/可能原因/下一步查哪里）
        if (!r.pass && r.diagnose) {
          html += '<tr class="diag"><td colspan="6">诊断：' + esc(r.diagnose) + '</td></tr>';
        }
      }
      tbl.innerHTML = html;
    }
    if (box) box.style.display = 'block';
    window.__VERIFY = {
      ready: true,
      title: VLib.pageTitle,
      pass: s.allPass,
      summary: s,
      results: VLib.results
    };
  };

  // 快捷：数值容差断言
  VLib.assertNear = function (id, name, engRefs, actual, expected, tol, unit, diagnose) {
    var dev = Math.abs(actual - expected);
    VLib.assert(id, name, engRefs, dev <= tol,
      expected + ' ±' + tol + (unit || ''), actual + '（偏差 ' + dev + '）', diagnose);
  };

  VLib.fmt = function (x, d) {
    return Number(x).toFixed(d === undefined ? 6 : d);
  };
})();
