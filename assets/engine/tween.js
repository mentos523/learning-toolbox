/* 基础引擎层 · tween.js
 * Eng.Tween —— 通用补间原语（B 期 promotion：从 modules/math/js/geom-process.js §B 提升）。
 * 保留 onUpdate(u)；新增 deterministic 选项（u→状态纯函数，供断言）；
 * prefersReducedMotion 内置降级（首末两态）；start 前先 cancel 旧循环（可中断）。
 * 口径：ENG-70（确定性）/ ENG-71（可中断）/ ENG-72（reduced-motion 降级）。
 * 不 promotion 的（探针反写映射 / petal-strip / complete-square-lab）留数学侧，
 * 见 ~/workspace/math-rectify/waveA-design.md §6.2。
 */
(function () {
  'use strict';

  var Eng = (window.Eng = window.Eng || {});

  function clamp01(x) { x = +x; return x < 0 ? 0 : x > 1 ? 1 : x; }

  /* 默认缓动：复刻 geom-process.js §B 的 easeInOutCubic（net-fold easeIO 口径）。 */
  function easeInOutCubic(t) {
    t = clamp01(t);
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  Eng.Tween = function (opts) {
    opts = opts || {};
    var durationMs = Math.max(50, +opts.durationMs || 1200);
    var onUpdate = typeof opts.onUpdate === 'function' ? opts.onUpdate : function () {};
    var onDone = typeof opts.onDone === 'function' ? opts.onDone : function () {};
    var ease = typeof opts.ease === 'function' ? opts.ease : easeInOutCubic;
    /* ENG-70：deterministic=true 时 u→状态为纯函数，不走 wall-clock/rAF，
     * 断言可用 sample(u) 逐位复现任意中间态。 */
    var deterministic = !!opts.deterministic;
    var rafId = 0, startT = 0, curU = 0, fromU = 0, toU = 1, done = false;

    /* ENG-72：reduced-motion 降级为首末两态。允许 opts.reducedMotion 注入（断言用）。 */
    var reduced = opts.reducedMotion != null ? !!opts.reducedMotion :
      (typeof Eng.prefersReducedMotion === 'function' ? Eng.prefersReducedMotion() : false);

    /* 状态纯函数：给定 u → 触发 onUpdate(curU) 并返回 curU（ENG-70 断言入口）。 */
    function sample(u) {
      curU = clamp01(u);
      onUpdate(curU);
      return curU;
    }
    function paint(u) {
      return sample(clamp01(fromU + (toU - fromU) * ease(clamp01(u))));
    }
    function tick(now) {
      if (!startT) startT = now;
      var t = clamp01((now - startT) / durationMs);
      paint(t);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0; done = true; onDone();
      }
    }

    var api = {
      start: function () {
        api.cancel(); /* ENG-71：先取消旧循环，不许残留双 rAF */
        done = false;
        if (deterministic || reduced) {
          /* ENG-70 纯函数路径 / ENG-72 降级：只呈现末态（seek(0)/seek(1) 得首末两态） */
          sample(1);
          done = true;
          onDone();
          return api;
        }
        fromU = curU; toU = 1; startT = 0;
        rafId = requestAnimationFrame(tick);
        return api;
      },
      cancel: function () {
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
        startT = 0;
        return api;
      },
      seek: function (u) { api.cancel(); sample(u); done = (clamp01(u) >= 1); return api; },
      replay: function () { api.cancel(); sample(0); return api.start(); },
      u: function () { return curU; },
      isDone: function () { return done; },
      isReduced: function () { return reduced; },
      sample: sample,
      setDuration: function (ms) { durationMs = Math.max(50, +ms || 1200); return api; }
    };
    return api;
  };
  Eng.Tween.easeInOutCubic = easeInOutCubic;
})();
