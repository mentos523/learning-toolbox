// 学习工具箱 · 数学重构 · Vue 应用壳（多课壳，Batch 0 泛化）
//
// 职责只三件：① hash 路由（#/ 数学总览、#/l/<课> 课总览、#/p/<页> 卡片页）；
// ② 卡片导航（上一页/下一页、页指示器、键盘左右键、触摸滑动）；
// ③ 把 bundle 页数据挂到分支渲染器上（见 README §接入缝）。
//
// 不做：不改 bundle 数据、不改分支渲染器文件、不渲染教学内容之外的东西。
// 页内可见结构与旧站渲染器 renderPageInner 的可见契约一致：
// 标题 / 公式（MathML 查表，缺失降级 translation）/ 主交互 / 辅交互 /
// 点拨（首条加 💡）。examples 仅习题页（concept === “本章习题”）渲染
// 可见区：与旧渲染器 renderPageInner 一致——hints 区加 exercise 类，
// 每条 example 一个 <details class="m-answers">（summary 取 figure 字段）；
// 非习题页字段只留在 bundle 供保真对照。
//
// 数据来源：window.MATH_MANIFEST（转换器产出的 manifest.bundle.js，
// 章→单元→课→页）；课 bundle 按需以 <script> 注入加载（file:// 安全，
// 不用 fetch）。课由 manifest 反查：页 id → 所属课。
// 导航顺序 = 课内 bundle 页序（转换器按 prev/next 链排出）。
// 卡片内上一页/下一页走页字段 prev/next：课内相邻页优先；
// 课界处若 prev/next 指向已迁移的课内/跨课页则跳该页，
// 若指向未迁移课的页则禁用并文字注明——绝不链向不存在的页。

(function () {
  'use strict';

  var MANIFEST = window.MATH_MANIFEST || null;
  var BUNDLES = window.MATH_BUNDLES || {};

  // 页 id → 所属课（manifest 反查表）
  var PAGE_TO_LESSON = {};
  var LESSON_BY_ID = {};
  if (MANIFEST) {
    (MANIFEST.lessons || []).forEach(function (l) {
      LESSON_BY_ID[l.id] = l;
      (l.pages || []).forEach(function (p) { PAGE_TO_LESSON[p.id] = l.id; });
    });
  }

  function lessonBundle(id) {
    return (window.MATH_BUNDLES || {})[id] || null;
  }
  function lessonPages(id) {
    var b = lessonBundle(id);
    return (b && b.pages) || [];
  }
  function pageByIdInLesson(lessonId, pageId) {
    var pages = lessonPages(lessonId);
    for (var i = 0; i < pages.length; i++) if (pages[i].id === pageId) return pages[i];
    return null;
  }
  function indexOfInLesson(lessonId, pageId) {
    var pages = lessonPages(lessonId);
    for (var i = 0; i < pages.length; i++) if (pages[i].id === pageId) return i;
    return -1;
  }
  // 路由解析：返回 {view:'overview'} | {view:'lesson', lessonId} |
  // {view:'page', lessonId, pageId} | 总览（未知路由回总览）。
  function routeFromHash() {
    var h = location.hash || '';
    var m;
    if (h === '#/' || h === '' || h === '#') return { view: 'overview' };
    m = h.match(/^#\/l\/([\w-]+)$/);
    if (m && LESSON_BY_ID[m[1]]) return { view: 'lesson', lessonId: m[1] };
    m = h.match(/^#\/p\/([\w-]+)$/);
    if (m && PAGE_TO_LESSON[m[1]]) {
      return { view: 'page', lessonId: PAGE_TO_LESSON[m[1]], pageId: m[1] };
    }
    return { view: 'overview' };
  }

  // 公式：与旧渲染器 formulaHtml 同一查表契约——
  // window.MATH_MML[pageId#fId] 且 MathML 可用时用 MathML，否则 translation 纯文本。
  // 挂载时序修复（2026-10-25，直载 fallback 钉死，试点修复 2 沿用）：
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

  // 按需注入课 bundle（file:// 下 <script> 可读本地文件；不用 fetch）。
  // 已注入或正在注入的课不重复建标签；失败时回调 err。
  var pendingLoads = {};
  function ensureBundle(lessonId, cb) {
    if (lessonBundle(lessonId)) { cb(null); return; }
    if (pendingLoads[lessonId]) { pendingLoads[lessonId].push(cb); return; }
    pendingLoads[lessonId] = [cb];
    var meta = LESSON_BY_ID[lessonId];
    var file = (meta && meta.bundle) || (lessonId + '.bundle.js');
    var s = document.createElement('script');
    s.src = 'bundle/' + file;
    s.onload = function () {
      var cbs = pendingLoads[lessonId]; delete pendingLoads[lessonId];
      cbs.forEach(function (c) { c(lessonBundle(lessonId) ? null : new Error('bundle 未注册：' + lessonId)); });
    };
    s.onerror = function () {
      var cbs = pendingLoads[lessonId]; delete pendingLoads[lessonId];
      cbs.forEach(function (c) { c(new Error('bundle 加载失败：' + file)); });
    };
    document.head.appendChild(s);
  }

  var app = Vue.createApp({
    data: function () {
      var r = routeFromHash();
      return {
        manifest: MANIFEST,
        manifestMissing: !MANIFEST,
        view: r.view,
        lessonId: r.lessonId || null,
        currentId: r.view === 'page' ? r.pageId : null,
        currentLessonId: r.view === 'page' ? r.lessonId : null,
        // MathML 就绪信号的响应式载体：见 formulaHtmlList 注释。
        mathmlTick: 0,
        // bundle 注入信号：window.MATH_BUNDLES 不是 Vue 响应式源，
        // 异步注入后须靠此计数翻转使 currentPage 等计算属性失效重算，
        // 否则加载完成仍缓存为 null（多课壳异步加载的关键修复点）。
        bundleTick: 0,
        bundleLoading: false,
        bundleError: null,
        touchX: null,
        touchY: null
      };
    },
    computed: {
      chapters: function () {
        return (this.manifest && this.manifest.chapters) || [];
      },
      lessonMeta: function () {
        return this.lessonId ? LESSON_BY_ID[this.lessonId] : null;
      },
      // 课总览页列表：优先 bundle 页序（已加载时），否则 manifest 页序。
      lessonPages: function () {
        void this.bundleTick; // 依赖注入信号，见 data bundleTick 注释
        if (!this.lessonId) return [];
        var bp = lessonPages(this.lessonId);
        if (bp.length) return bp;
        var m = LESSON_BY_ID[this.lessonId];
        return (m && m.pages) || [];
      },
      currentPage: function () {
        void this.bundleTick; // 依赖注入信号，见 data bundleTick 注释
        if (!this.currentId || !this.currentLessonId) return null;
        return pageByIdInLesson(this.currentLessonId, this.currentId);
      },
      currentIndex: function () {
        void this.bundleTick; // 依赖注入信号，见 data bundleTick 注释
        if (!this.currentId || !this.currentLessonId) return -1;
        return indexOfInLesson(this.currentLessonId, this.currentId);
      },
      currentLessonMeta: function () {
        return this.currentLessonId ? LESSON_BY_ID[this.currentLessonId] : null;
      },
      // 卡片内上一页：课内相邻页优先；课首页时 prev 若指向已迁移页则跨课跳。
      prevTarget: function () {
        var p = this.currentPage;
        if (!p) return null;
        if (this.currentIndex > 0) {
          var pages = lessonPages(this.currentLessonId);
          return pages[this.currentIndex - 1].id;
        }
        if (p.prev && PAGE_TO_LESSON[p.prev]) return p.prev;
        return null;
      },
      // 卡片内下一页：课内相邻页优先；课末页时 next 若指向已迁移页则跨课跳。
      nextTarget: function () {
        var p = this.currentPage;
        if (!p) return null;
        var pages = lessonPages(this.currentLessonId);
        if (this.currentIndex >= 0 && this.currentIndex < pages.length - 1) {
          return pages[this.currentIndex + 1].id;
        }
        if (p.next && PAGE_TO_LESSON[p.next]) return p.next;
        return null;
      },
      // 课界处指向未迁移课的 prev/next：禁用并文字注明，不链向不存在的页。
      prevOutside: function () {
        var p = this.currentPage;
        if (!p || this.prevTarget || this.currentIndex !== 0) return null;
        return p.prev || null;
      },
      nextOutside: function () {
        var p = this.currentPage;
        if (!p || this.nextTarget) return null;
        var pages = lessonPages(this.currentLessonId);
        if (this.currentIndex !== pages.length - 1) return null;
        return p.next || null;
      },
      indicator: function () {
        if (this.currentIndex < 0 || !this.currentLessonMeta) return '';
        var pages = lessonPages(this.currentLessonId);
        return (this.currentIndex + 1) + ' / ' + pages.length + ' · ' + this.currentLessonMeta.title;
      }
    },
    methods: {
      formulaHtmlList: formulaHtmlList,
      goOverview: function () {
        if (location.hash !== '#/') location.hash = '#/';
        else { this.view = 'overview'; this.currentId = null; this.currentLessonId = null; }
      },
      goLesson: function (id) {
        if (!LESSON_BY_ID[id]) return;
        if (location.hash !== '#/l/' + id) location.hash = '#/l/' + id;
        else { this.view = 'lesson'; this.lessonId = id; this.currentId = null; }
      },
      goPage: function (id) {
        var lid = PAGE_TO_LESSON[id];
        if (!lid) return;
        if (location.hash !== '#/p/' + id) location.hash = '#/p/' + id;
        else this.enterPage(lid, id);
      },
      goStep: function (d) {
        if (d < 0 && this.prevTarget) this.goPage(this.prevTarget);
        else if (d > 0 && this.nextTarget) this.goPage(this.nextTarget);
      },
      // 进入卡片页：bundle 未加载时先注入，加载完成后再渲染；
      // 失败时留可见错误，不白屏、不静默回总览。
      enterPage: function (lessonId, pageId) {
        var self = this;
        this.view = 'page';
        this.currentLessonId = lessonId;
        this.currentId = pageId;
        this.bundleError = null;
        if (lessonBundle(lessonId)) {
          this.$nextTick(function () { self.renderCard(); });
          return;
        }
        this.bundleLoading = true;
        ensureBundle(lessonId, function (err) {
          self.bundleLoading = false;
          if (err) { self.bundleError = err.message; return; }
          self.bundleTick++;
          self.$nextTick(function () { self.renderCard(); });
        });
      },
      applyRoute: function () {
        var r = routeFromHash();
        this.view = r.view;
        if (r.view === 'lesson') {
          this.lessonId = r.lessonId;
          this.currentId = null;
          this.currentLessonId = null;
        } else if (r.view === 'page') {
          this.lessonId = null;
          this.enterPage(r.lessonId, r.pageId);
        } else {
          this.lessonId = null;
          this.currentId = null;
          this.currentLessonId = null;
        }
      },
      // 卡片渲染：Vue 模板只负责标题/公式/点拨/导航等 chrome；
      // 交互区 DOM 由分支渲染器原函数写入，页切换时先清空再重挂
      // （Vue 不接管交互区子节点，避免模板重渲染后残留旧交互）。
      renderCard: function () {
        var page = this.currentPage;
        if (!page) return;
        // RV-FAIL-1 配套（2026-10-25）：页→页导航复用同一个 section.m-page
        // 元素，卡片区滚动位置会继承到新页。实测不重置时：p1b 滚到底切到 p2
        // 再返回 p1b，scrollTop 停在 208（非新页最大值 243），按钮底边 813px
        // 再次落入 390 视口页脚命中区（顶边 784px），CSS 滚动修复被继承位置
        // 抵消。故每次渲染卡片先回顶，新页一律从顶开始，用户再滚到底翻页。
        var card = document.querySelector('.pilot-card');
        if (card) card.scrollTop = 0;
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
        self.applyRoute();
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
      // 直载卡片页时 bundle 可能尚未注入：mounted 时若已是卡片路由且
      // bundle 缺失，补一次注入（hashchange 路径已由 applyRoute 覆盖）。
      if (this.view === 'page' && this.currentLessonId && this.currentId && !lessonBundle(this.currentLessonId)) {
        this.enterPage(this.currentLessonId, this.currentId);
      } else {
        this.$nextTick(function () { self.renderCard(); });
      }
    },
    template: `
    <div class="pilot-shell">
      <div v-if="manifestMissing" class="pilot-error">
        数学总览未载入（bundle/manifest.bundle.js 缺失或加载失败），请按 README 重跑转换器。
      </div>
      <div v-else>
        <header class="pilot-head">
          <button class="pilot-head-btn" @click="goOverview" aria-label="回数学总览">☰ 总览</button>
          <h1>数学 · 重构 <span class="pilot-badge">重构</span></h1>
          <span class="m-page-ind" v-if="currentPage">{{ indicator }}</span>
        </header>

        <section v-if="view === 'overview'" class="pilot-overview" aria-label="数学总览">
          <h2>数学 · 重构</h2>
          <p class="pilot-overview-sub">已迁移的章与课（点一课进入课总览，再点一页进入卡片学习）。</p>
          <div v-for="ch in chapters" :key="ch.id" class="pilot-chapter">
            <h3 class="pilot-chapter-title">{{ ch.title }}</h3>
            <div v-for="u in ch.units" :key="u.id" class="pilot-unit">
              <h4 class="pilot-unit-title">{{ u.title }}</h4>
              <ol class="pilot-card-list">
                <li v-for="l in u.lessons" :key="l.id">
                  <a :href="'#/l/' + l.id" @click.prevent="goLesson(l.id)" class="pilot-card-link pilot-lesson-link">
                    <span class="pilot-card-title">{{ l.title }}</span>
                    <span class="pilot-card-concept">{{ l.pages.length }} 页</span>
                  </a>
                </li>
              </ol>
            </div>
          </div>
          <p class="pilot-note">重构范围说明：目前仅迁移已列出的课；未列出的课不在本壳内，卡片末页“下一页”指向未迁移页时禁用并注明。</p>
        </section>

        <section v-else-if="view === 'lesson' && lessonMeta" class="pilot-overview" aria-label="课总览">
          <h2>{{ lessonMeta.title }}</h2>
          <p class="pilot-overview-sub">{{ lessonMeta.chapterTitle }} · {{ lessonMeta.unitTitle }} · {{ lessonPages.length }} 页（页级卡）。点一页进入卡片学习。</p>
          <ol class="pilot-card-list">
            <li v-for="(p, i) in lessonPages" :key="p.id">
              <a :href="'#/p/' + p.id" @click.prevent="goPage(p.id)" class="pilot-card-link">
                <span class="pilot-card-no">{{ i + 1 }}</span>
                <span class="pilot-card-title">{{ p.title }}</span>
                <span class="pilot-card-concept" v-if="p.concept">{{ p.concept }}</span>
              </a>
            </li>
          </ol>
          <p><button class="pilot-head-btn" @click="goOverview">← 回数学总览</button></p>
        </section>

        <section v-else-if="view === 'page'" class="m-page pilot-card"
          @touchstart="onTouchStart" @touchend="onTouchEnd" aria-label="卡片页">
          <div v-if="bundleLoading" class="pilot-note">正在载入本课内容……</div>
          <div v-else-if="bundleError" class="pilot-error">{{ bundleError }}</div>
          <div v-else-if="!currentPage" class="pilot-error">本页不在已加载的课 bundle 内，请回总览重进。</div>
          <div v-else>
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
            <div :class="'m-hints' + (currentPage.concept === '本章习题' ? ' exercise' : '')" aria-label="点拨">
              <p v-for="(h, i) in currentPage.hints" :key="i"><span v-if="i === 0" class="point">💡</span> {{ h }}</p>
              <template v-if="currentPage.concept === '本章习题'">
                <details v-for="(e, ei) in currentPage.examples" :key="ei" class="m-answers" aria-label="核对答案">
                  <summary>📝 {{ e.figure || '核对答案' }}（点开展开）</summary>
                  <p>{{ e.text }}</p>
                </details>
              </template>
            </div>
            <nav class="m-nav" aria-label="翻页">
              <button :disabled="!prevTarget" @click="goStep(-1)">← 上一页</button>
              <button :disabled="!nextTarget" @click="goStep(1)">下一页 →</button>
            </nav>
            <p v-if="prevOutside" class="pilot-note">上一页是课外页（{{ prevOutside }}），尚未迁移进本壳。</p>
            <p v-if="nextOutside" class="pilot-note">本课到此为止。旧数据中下一页是课外页（{{ nextOutside }}），尚未迁移进本壳。</p>
            <p v-if="currentPage.next === null && !nextOutside" class="pilot-note">本页是旧数据链尾（无下一页）。</p>
          </div>
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
