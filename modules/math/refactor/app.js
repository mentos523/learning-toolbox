// 学习工具箱 · 数学重构试点 · Vue 应用壳
//
// 职责只三件：① hash 路由（#/ 课总览、#/p/<pageId> 卡片页）；
// ② 卡片导航（上一页/下一页、页指示器、键盘左右键、触摸滑动）；
// ③ 把 bundle 页数据挂到分支渲染器上（见 README §接入缝）。
//
// 不做：不改 bundle 数据、不改分支渲染器文件、不渲染教学内容之外的东西。
// 页内可见结构与旧站渲染器 renderPageInner 的可见契约一致：
// 标题 / 公式（MathML 查表，缺失降级 translation）/ 主交互 / 辅交互 /
// 点拨（首条加 💡）。examples 与旧渲染器一致：仅习题页（concept ===
// “本章习题”）才渲染可见区，本课 4 页均非习题页，故字段只留在 bundle
// 供保真对照，不在卡片上重复显示。
//
// 导航顺序 = bundle 页序 = 转换器按 prev/next 链排出的顺序。
// p2b 的 next 指向课外章习题页（ch00-ux-l1-p1），不在试点 bundle 内，
// 故卡片上“下一页”在末页禁用，并以文字注明下一站是课外页——
// 不擅自把课外页拉进试点，也不改写 p2b.next 字段。

(function () {
  'use strict';

  var BUNDLE = window.PILOT_BUNDLE || null;
  var PAGES = (BUNDLE && BUNDLE.pages) || [];
  var LESSON_TITLE = '从猜数字到天平'; // 壳 chrome 文案，非页字段；课名来自远端 ch00.js lesson 对象
  var LESSON_ID = (BUNDLE && BUNDLE.lessonId) || 'ch00-u1-l1';

  function pageById(id) {
    for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === id) return PAGES[i];
    return null;
  }
  function indexOf(id) {
    for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === id) return i;
    return -1;
  }
  function routeFromHash() {
    var m = (location.hash || '').match(/^#\/p\/([\w-]+)$/);
    if (m && pageById(m[1])) return m[1];
    return null; // '#/'、空 hash、未知页 id 一律回总览
  }

  // 公式：与旧渲染器 formulaHtml 同一查表契约——
  // window.MATH_MML[pageId#fId] 且 MathML 可用时用 MathML，否则 translation 纯文本。
  // 挂载时序修复（2026-10-25，直载 fallback 钉死）：
  // MathMLCheck 是 DOMContentLoaded 后才定义的外部对象，不在 Vue 响应式内；
  // 若模板调用时不触碰任何响应式字段，检查完成后 Vue 无重渲染触发，
  // 首次挂载算出的 fallback 就会钉死。故此处先读 this.mathmlTick，
  // 把公式渲染挂到响应式字段上，tick 翻转即触发重算（不改检查逻辑、
  // 不硬编码 supported，supported 仍以 window.MathMLCheck 为准）。
  function formulaHtmlList(page) {
    var mml = window.MATH_MML || {};
    var tick = (this && typeof this.mathmlTick === 'number') ? this.mathmlTick : 0;
    void tick; // 仅建立响应式依赖，值本身不参与查表
    var ok = !!(window.MathMLCheck && window.MathMLCheck.supported);
    return (page.formulas || []).map(function (f) {
      var hit = mml[page.id + '#' + f.id];
      if (hit && ok) return { html: hit, fallback: null };
      return { html: null, fallback: f.translation || f.latex || '' };
    });
  }

  // 交互挂载：调用分支渲染器经注册表捕获的原函数（非复制实现）。
  // 失败时按旧站 N-2 口径：console.error + 可见降级提示，不整页白屏。
  function mountInteraction(box, spec, page, label) {
    if (!box) return;
    box.innerHTML = '';
    if (!spec || !spec.type) {
      box.innerHTML = '<div class="ix-stub">本页无交互</div>';
      return;
    }
    var fn = (window.PILOT_IX || {})[spec.type];
    if (!fn) {
      box.innerHTML = '<div class="ix-stub">交互占位：' + spec.type +
        '<br>（渲染器未注册，不影响浏览）</div>';
      return;
    }
    try {
      fn(box, spec.params || {}, page);
    } catch (e) {
      try { console.error('[pilot-render] ' + label + ' ' + spec.type + ' 失败 page=' + page.id + ' :: ' + (e && e.stack ? e.stack : String(e))); } catch (ignore) {}
      box.innerHTML = '<div class="ix-stub ix-render-error" style="border-left:4px solid #b3261e;color:#b3261e;">交互渲染出错：' +
        (e && e.message ? e.message : String(e)) + '<br>（已记录到控制台）</div>';
    }
  }

  var app = Vue.createApp({
    data: function () {
      return {
        pages: PAGES,
        lessonTitle: LESSON_TITLE,
        lessonId: LESSON_ID,
        currentId: routeFromHash(),
        // MathML 就绪信号的响应式载体：见 formulaHtmlList 注释。
        // 初始 0；挂载时 MathMLCheck 已定义则立即翻转，已定义与否都
        // 不改变查表本身（查表仍读 window.MathMLCheck.supported）。
        mathmlTick: 0,
        bundleMissing: !BUNDLE,
        touchX: null,
        touchY: null
      };
    },
    computed: {
      currentPage: function () {
        return this.currentId ? pageById(this.currentId) : null;
      },
      currentIndex: function () {
        return this.currentId ? indexOf(this.currentId) : -1;
      },
      prevPage: function () {
        return this.currentIndex > 0 ? this.pages[this.currentIndex - 1] : null;
      },
      nextPage: function () {
        if (this.currentIndex < 0 || this.currentIndex >= this.pages.length - 1) return null;
        return this.pages[this.currentIndex + 1];
      },
      // 末页时 page.next 指向课外页：卡片内不提供跳转，只作文字注明。
      nextOutside: function () {
        var p = this.currentPage;
        if (!p || this.nextPage) return null;
        return p.next || null;
      },
      indicator: function () {
        if (this.currentIndex < 0) return '';
        return (this.currentIndex + 1) + ' / ' + this.pages.length + ' · ' + this.lessonTitle;
      }
    },
    methods: {
      formulaHtmlList: formulaHtmlList,
      goOverview: function () {
        if (location.hash !== '#/') location.hash = '#/';
        else this.currentId = null;
      },
      goPage: function (id) {
        if (!pageById(id)) return;
        if (location.hash !== '#/p/' + id) location.hash = '#/p/' + id;
        else this.currentId = id;
      },
      goStep: function (d) {
        var ni = this.currentIndex + d;
        if (ni < 0 || ni >= this.pages.length) return;
        this.goPage(this.pages[ni].id);
      },
      // 卡片渲染：Vue 模板只负责标题/公式/点拨/导航等 chrome；
      // 交互区 DOM 由分支渲染器原函数写入，页切换时先清空再重挂
      // （Vue 不接管交互区子节点，避免模板重渲染后残留旧交互）。
      renderCard: function () {
        var page = this.currentPage;
        if (!page) return;
        var ixBox = document.getElementById('pilot-interaction');
        if (!ixBox) return;
        ixBox.innerHTML = '';
        ixBox.classList.remove('has-aux');
        ixBox.classList.remove('overflows');
        mountInteraction(ixBox, page.interaction, page, '主交互');
        if (page.auxInteraction && page.auxInteraction.type) {
          var auxBox = document.createElement('div');
          auxBox.className = 'm-aux-interaction';
          ixBox.appendChild(auxBox);
          ixBox.classList.add('has-aux');
          mountInteraction(auxBox, page.auxInteraction, page, '辅交互');
        }
        this.fitInteraction();
      },
      // 旧站 fitInteraction 同款溢出兜底：交互区超高时区内滚动，不静默裁剪。
      fitInteraction: function () {
        var ixBox = document.getElementById('pilot-interaction');
        if (!ixBox) return;
        ixBox.classList.remove('overflows');
        if (ixBox.scrollHeight > ixBox.clientHeight + 1) ixBox.classList.add('overflows');
      },
      onKey: function (e) {
        if (!this.currentPage) return;
        // 焦点在表单控件（滑块/输入框）时不劫持方向键：交互自身的键盘操作优先。
        var t = e.target;
        if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')) return;
        if (e.key === 'ArrowLeft') this.goStep(-1);
        if (e.key === 'ArrowRight') this.goStep(1);
      },
      onTouchStart: function (e) {
        var t = e.changedTouches && e.changedTouches[0];
        if (!t) return;
        this.touchX = t.clientX;
        this.touchY = t.clientY;
      },
      onTouchEnd: function (e) {
        if (this.touchX === null) return;
        var t = e.changedTouches && e.changedTouches[0];
        if (!t) return;
        var dx = t.clientX - this.touchX;
        var dy = t.clientY - this.touchY;
        this.touchX = null;
        this.touchY = null;
        // 横向主导、位移 ≥60px 才翻页，避免与天平拖拽/滑块竖向手势冲突。
        if (Math.abs(dx) >= 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          this.goStep(dx < 0 ? 1 : -1);
        }
      }
    },
    watch: {
      currentId: function () {
        var self = this;
        this.$nextTick(function () { self.renderCard(); });
      }
    },
    mounted: function () {
      var self = this;
      window.addEventListener('hashchange', function () {
        self.currentId = routeFromHash();
      });
      document.addEventListener('keydown', function (e) { self.onKey(e); });
      var rsT = null;
      window.addEventListener('resize', function () {
        if (rsT) clearTimeout(rsT);
        rsT = setTimeout(function () { self.fitInteraction(); }, 150);
      });
      document.addEventListener('toggle', function (e) {
        if (e.target && e.target.classList && e.target.classList.contains('m-answers')) {
          self.fitInteraction();
        }
      }, true);
      // 兜底（挂载后才就绪时触发重渲染，不得让 fallback 钉死）：
      // 正常路径下挂载已被推迟到 DOMContentLoaded 之后，此处 MathMLCheck
      // 已定义，翻转一次 tick 只是无害的重算；若因任何时序边角导致挂载
      // 仍早于检查，则等 DOMContentLoaded 再翻转一次，公式区随即重算。
      var syncMathML = function () { self.mathmlTick++; };
      if (window.MathMLCheck) syncMathML();
      else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncMathML, { once: true });
      else syncMathML(); // 防御分支：readyState 已过 loading 但对象仍未定义时不悬空
      this.$nextTick(function () { self.renderCard(); });
    },
    template: `
    <div class="pilot-shell">
      <div v-if="bundleMissing" class="pilot-error">
        试点 bundle 未载入（bundle/content.bundle.js 缺失或加载失败），请按 README 重跑转换器。
      </div>
      <div v-else>
        <header class="pilot-head">
          <button class="pilot-head-btn" @click="goOverview" aria-label="回课总览">☰ 总览</button>
          <h1>数学 · 代数 · {{ lessonTitle }} <span class="pilot-badge">重构试点</span></h1>
          <span class="m-page-ind" v-if="currentPage">{{ indicator }}</span>
        </header>

        <section v-if="!currentPage" class="pilot-overview" aria-label="课总览">
          <h2>{{ lessonTitle }}</h2>
          <p class="pilot-overview-sub">代数第零章 · 代数是什么 · 试点 4 页（页级卡）。点一页进入卡片学习。</p>
          <ol class="pilot-card-list">
            <li v-for="(p, i) in pages" :key="p.id">
              <a :href="'#/p/' + p.id" @click.prevent="goPage(p.id)" class="pilot-card-link">
                <span class="pilot-card-no">{{ i + 1 }}</span>
                <span class="pilot-card-title">{{ p.title }}</span>
                <span class="pilot-card-concept">{{ p.concept }}</span>
              </a>
            </li>
          </ol>
          <p class="pilot-note">试点范围说明：本课第 4 页（p2b）之后是章习题页，不在试点内；卡片末页“下一页”禁用即表示课内到此为止。</p>
        </section>

        <section v-else class="m-page pilot-card"
          @touchstart="onTouchStart" @touchend="onTouchEnd" aria-label="卡片页">
          <div class="m-title">{{ currentPage.title }}</div>
          <div class="m-formulas" aria-label="公式">
            <!-- key 用下标而非 'mml'/fallback 文本：原 key 下多条 MathML 公式
                 全为 'mml'（key 重复），fallback→MathML 重渲染时节点复用不可靠；
                 下标 key 保证每条公式位独立更新，与兜底重渲染配套。 -->
            <template v-for="(f, fi) in formulaHtmlList(currentPage)" :key="fi">
              <span v-if="f.html" v-html="f.html"></span>
              <span v-else class="formula-fallback">{{ f.fallback }}</span>
            </template>
          </div>
          <div class="m-interaction" id="pilot-interaction" aria-label="交互区"></div>
          <div class="m-hints" aria-label="点拨">
            <p v-for="(h, i) in currentPage.hints" :key="i"><span v-if="i === 0" class="point">💡</span> {{ h }}</p>
          </div>
          <nav class="m-nav" aria-label="翻页">
            <button :disabled="!prevPage" @click="goStep(-1)">← 上一页</button>
            <button :disabled="!nextPage" @click="goStep(1)">下一页 →</button>
          </nav>
          <p v-if="nextOutside" class="pilot-note">本课到此为止。旧数据中下一页是课外章习题页（{{ nextOutside }}），不在本试点内。</p>
        </section>
      </div>
    </div>`
  });

  // 挂载时序修复（主落点）：Vue 挂载排在 MathMLCheck 就绪之后。
  // mathml-check.js 在文档解析期先注册了 DOMContentLoaded 检查，
  // 本文件后注册，故 DOMContentLoaded 回调按注册顺序先跑检查、后跑
  // 挂载，挂载时 MathMLCheck 已定义，首渲染即走 MathML。
  // 不硬编码 supported，不改检查逻辑，不用导航手段掩盖直载。
  if (window.MathMLCheck) {
    app.mount('#pilot-app');
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { app.mount('#pilot-app'); }, { once: true });
  } else {
    app.mount('#pilot-app'); // 防御分支：readyState 已过 loading 时不悬空
  }
})();
