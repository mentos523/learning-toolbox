/* 基础引擎层 · motion.js
 * Eng.MoleculeMotion —— 粒子系 + 参数化速度场（波 C，2026.10.16.9）。
 *  - 由 Eng.Driver 固定步进驱动（默认 dt=1/60；ENG-06/16 显式可配且文档化）。
 *  - 确定性：教学随机一律走 Eng.SeededRNG；同 seed 同序列两次运行逐位一致（ENG-09）。
 *  - 读回一律防御性拷贝（ENG-10）；AX01 三字段必填（YP-25）。
 *  - 实现 Eng.PRIMITIVE_IFACE（step/reset/snapshot/restore/simTimeSec/stepCountN/state），
 *    可直接被 Eng.StepPlayer 包装（手动步进场景）。
 * 速度场（field）：
 *  - 'brownian'    随机游走/扩散：恒定速率 + 每步按概率转向，边界弹性反射。
 *  - 'thermal'     热运动：brownian + 速率 ∝ √temperatureK（示意）。
 *  - 'drift'       电场定向漂移：热运动 + 按 kind 叠加恒定漂移速度 driftVxMps
 *                  （无规则运动一直都在，只叠加定向分量）。
 *  - 'lattice'     晶格振动：粒子锁定格点做简谐振动（位置为 simTime 的纯函数）。
 *  - 'dissolve'    溶解：solvent 做 brownian；solute 初始为晶格态，每步按概率
 *                  detachProbPerStep 脱离为自由态（脱离后 brownian + 水合标志）。
 *  - 'fractionate' 分馏：粒子带 boilC；所处高度温度 tempCAt(y) > boilC 时转气相
 *                  上升；升至 tempCAt(y) == boilC 的冷凝高度时转 condensed。
 * 口径：CHEMC-01~CHEMC-19（§一）、§六 6.1 读回字段约定；
 * 快照字段严格按 §六：{stepN, simTimeSec,
 *   particles:[{id,type,pos:{x,y},vel:{x,y},state}],
 *   field:{on,anodeDir}, groups:[{name,boilRank}]}；
 * 逻辑单位 0–100、y 向上（§0 0.4）。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng || !Eng.Driver || !Eng.SeededRNG || !Eng.checkAx01 || !Eng.deepCopy)
    throw new Error('motion.js 需要先加载 core.js/driver.js');

  var FIELDS = ['brownian', 'thermal', 'drift', 'lattice', 'dissolve', 'fractionate'];

  function isNum(v) { return typeof v === 'number' && isFinite(v); }

  Eng.MoleculeMotion = function (opt) {
    opt = opt || {};
    var ax = Eng.checkAx01(opt, 'MoleculeMotion');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;

    this.field = opt.field || 'brownian';
    if (FIELDS.indexOf(this.field) < 0)
      throw new Error('MoleculeMotion: 未知 field "' + this.field + '"（可选 ' + FIELDS.join('/') + '）');

    var b = opt.bounds || {};
    /* §0 0.4：逻辑单位 0–100、y 向上 */
    this.bounds = {
      xMin: isNum(b.xMin) ? b.xMin : 0,
      xMax: isNum(b.xMax) ? b.xMax : 100,
      yMin: isNum(b.yMin) ? b.yMin : 0,
      yMax: isNum(b.yMax) ? b.yMax : 100
    };
    if (!(this.bounds.xMax > this.bounds.xMin && this.bounds.yMax > this.bounds.yMin))
      throw new Error('MoleculeMotion: bounds 非法');

    this.seed = opt.seed === undefined ? 1 : (opt.seed >>> 0);
    this.rng = new Eng.SeededRNG(this.seed);
    this.dt = opt.dt !== undefined ? opt.dt : 1 / 60;
    if (!(this.dt > 0)) throw new Error('MoleculeMotion: dt 必须为正数（ENG-06）');

    /* 速度场参数（YP-30 命名含单位；默认值=课堂常见配置 YP-31） */
    this.speedMps = isNum(opt.speedMps) ? opt.speedMps : 9;          // 特征速率（逻辑单位/s）
    this.turnProbPerStep = opt.turnProbPerStep !== undefined ? opt.turnProbPerStep : 0.08;
    if (!(this.turnProbPerStep >= 0 && this.turnProbPerStep <= 1))
      throw new Error('MoleculeMotion: turnProbPerStep 必须在 [0,1] 内');
    this.temperatureK = isNum(opt.temperatureK) ? opt.temperatureK : 293;
    this.kinds = Eng.deepCopy(opt.kinds || [{ kind: 'p', count: 120 }]);
    this.kinds.forEach(function (k, i) {
      if (!k.kind) throw new Error('MoleculeMotion: kinds[' + i + '] 缺少 kind 名');
      k.count = k.count === undefined ? 60 : k.count;
      if (!(k.count >= 0 && k.count === Math.floor(k.count)))
        throw new Error('MoleculeMotion: kinds[' + i + '].count 必须为非负整数');
    });

    /* lattice / dissolve */
    var lat = opt.lattice || {};
    this.lattice = {
      cols: lat.cols || 8, rows: lat.rows || 5,
      x0: isNum(lat.x0) ? lat.x0 : this.bounds.xMin + 18,
      y0: isNum(lat.y0) ? lat.y0 : this.bounds.yMin + 30,
      dx: isNum(lat.dx) ? lat.dx : 8, dy: isNum(lat.dy) ? lat.dy : 8,
      /* CHEMC-11：振幅 < 10% 晶格间距；默认 dx=8 → vibAmp=0.7 */
      vibAmp: isNum(lat.vibAmp) ? lat.vibAmp : 0.7,
      vibOmega: isNum(lat.vibOmega) ? lat.vibOmega : 6
    };
    this.soluteKind = opt.soluteKind || null;   // dissolve：溶质 kind 名
    this.detachProbPerStep = opt.detachProbPerStep !== undefined ? opt.detachProbPerStep : 0.02;
    if (!(this.detachProbPerStep >= 0 && this.detachProbPerStep <= 1))
      throw new Error('MoleculeMotion: detachProbPerStep 必须在 [0,1] 内');

    /* 初始集中分布（CHEMC-18：扩散页品红初始集中，滴入点 2σ 内 ≥80%）。
     * opt.cluster = {kind:'magenta', cx, cy, sigma}：该 kind 粒子按高斯分布
     * （Box-Muller，经 SeededRNG，确定性）集中在 (cx,cy) 附近。 */
    this.cluster = opt.cluster || null;

    /* §六 6.1：field:{on,anodeDir}（电场开关 + 阳极方向）；groups:[{name,boilRank}] */
    this.fieldState = {
      on: this.field === 'drift' && !!opt.fieldOn,
      anodeDir: opt.anodeDir || { x: 1, y: 0 }
    };
    this.groups = Eng.deepCopy(opt.groups || []);
    /* fractionate：渐进加热（CHEMC-13 气化顺序=沸点升序）。
     * 塔底温度随时间升高：tempBottomAt(t) = min(tempStartC + rampCps·t, tempMaxC)；
     * 冷凝高度按稳态场（tempMaxC）固定计算（塔板位置固定）。 */
    var tw = opt.tower || {};
    this.tower = {
      tempStartC: isNum(tw.tempStartC) ? tw.tempStartC : 20,
      rampCps: isNum(tw.rampCps) ? tw.rampCps : 30,
      tempMaxC: isNum(tw.tempMaxC) ? tw.tempMaxC : 380,
      tempTopC: isNum(tw.tempTopC) ? tw.tempTopC : 20,
      yBottom: isNum(tw.yBottom) ? tw.yBottom : this.bounds.yMin,
      yTop: isNum(tw.yTop) ? tw.yTop : this.bounds.yMax,
      riseSpeedMps: isNum(tw.riseSpeedMps) ? tw.riseSpeedMps : 14
    };

    /* 驱动器：空 planck 世界（重力 0），粒子推进走 onPreStep */
    var self = this;
    this.driver = new Eng.Driver({
      dt: this.dt, gravityMps2: 0,
      assumptions: ['粒子运动由固定步进驱动器推进，与刚体物理引擎解耦（空世界）'],
      approximations: ['二维示意；粒子为质点，无体积碰撞'],
      errorEstimate: '随机游走为教学示意模型，无解析对账；确定性由播种 RNG 保证'
    });
    this.driver.onPreStep(function () { self._advance(); });
    this.driver.onReset = function () { self._initParticles(); };
    /* 渲染钩子（课页侧赋值）：每 tick 调用一次 */
    this.onTick = null;
    var userTick = null;
    Object.defineProperty(this, '_userTick', {
      get: function () { return userTick; }, set: function (fn) { userTick = fn; },
      configurable: true
    });
    this.driver.onTick = function () { if (self.onTick) self.onTick(); };

    this._particles = [];
    this._initParticles();
  };

  /* 塔底温度（渐进加热） */
  Eng.MoleculeMotion.prototype.tempBottomAt = function (tSec) {
    var t = this.tower;
    return Math.min(t.tempStartC + t.rampCps * tSec, t.tempMaxC);
  };
  /* 温度场（fractionate）：线性梯度，y↑ 温度递减；底部温度取当前加热值 */
  Eng.MoleculeMotion.prototype.tempCAt = function (y, tSec) {
    var t = this.tower, span = t.yTop - t.yBottom;
    var tBot = (tSec === undefined ? t.tempMaxC : this.tempBottomAt(tSec));
    if (!(span > 0)) return tBot;
    var u = (y - t.yBottom) / span;
    u = Math.max(0, Math.min(1, u));
    return tBot + (t.tempTopC - tBot) * u;
  };
  /* 某沸点馏分的冷凝高度：按稳态场（tempMaxC）固定计算 */
  Eng.MoleculeMotion.prototype.condenseYFor = function (boilC) {
    var t = this.tower, span = t.yTop - t.yBottom;
    if (!(span > 0)) return t.yTop;
    var u = (t.tempMaxC - boilC) / (t.tempMaxC - t.tempTopC);
    u = Math.max(0, Math.min(1, u));
    return t.yBottom + u * span;
  };

  function randDir(rng, speed) {
    var a = rng.next() * Math.PI * 2;
    return { vx: Math.cos(a) * speed, vy: Math.sin(a) * speed };
  }

  /* Box-Muller 高斯采样（经 SeededRNG，确定性；CHEMC-18 初始集中用） */
  Eng.MoleculeMotion.prototype._gauss = function () {
    var u1 = Math.max(1e-9, this.rng.next()), u2 = this.rng.next();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };

  Eng.MoleculeMotion.prototype._mkParticle = function (kindDef, i) {
    var b = this.bounds, rng = this.rng;
    var sp = this._speedFor(kindDef);
    var v = randDir(rng, sp);
    var x = b.xMin + 4 + rng.next() * (b.xMax - b.xMin - 8);
    var y = b.yMin + 4 + rng.next() * (b.yMax - b.yMin - 8);
    /* CHEMC-18：cluster 指定的 kind 按高斯集中在 (cx,cy) 附近 */
    var cl = this.cluster;
    if (cl && cl.kind === kindDef.kind) {
      var sig = isNum(cl.sigma) && cl.sigma > 0 ? cl.sigma : 8;
      x = (isNum(cl.cx) ? cl.cx : 50) + this._gauss() * sig;
      y = (isNum(cl.cy) ? cl.cy : 80) + this._gauss() * sig;
      x = Math.max(b.xMin + 2, Math.min(b.xMax - 2, x));
      y = Math.max(b.yMin + 2, Math.min(b.yMax - 2, y));
    }
    return {
      id: 'P' + i, type: kindDef.kind,
      x: x, y: y, vx: v.vx, vy: v.vy, state: 'free',
      gx: 0, gy: 0, ph: rng.next() * Math.PI * 2,
      hydrated: false, boilC: kindDef.boilC, idx: i
    };
  };

  Eng.MoleculeMotion.prototype._speedFor = function (kindDef) {
    var s = isNum(kindDef.speedMps) ? kindDef.speedMps : this.speedMps;
    if (this.field === 'thermal') s *= Math.sqrt(this.temperatureK / 293);
    return s;
  };

  Eng.MoleculeMotion.prototype._initParticles = function () {
    this.rng.reset();
    var ps = [], self = this, b = this.bounds;
    if (this.field === 'lattice') {
      var L = this.lattice, n = 0;
      var k0 = this.kinds[0] || { kind: 'ion' };
      for (var r = 0; r < L.rows; r++) {
        for (var c = 0; c < L.cols; c++) {
          var p = {
            id: 'P' + ps.length, type: k0.kind,
            x: 0, y: 0, vx: 0, vy: 0, state: 'lattice',
            gx: L.x0 + c * L.dx, gy: L.y0 + r * L.dy,
            ph: this.rng.next() * Math.PI * 2, hydrated: false, idx: n++
          };
          p.x = p.gx; p.y = p.gy;
          ps.push(p);
        }
      }
    } else if (this.field === 'dissolve') {
      /* 溶剂：brownian 背景；溶质：晶格态 */
      this.kinds.forEach(function (kd) {
        if (kd.kind === self.soluteKind) return;
        for (var i = 0; i < kd.count; i++) ps.push(self._mkParticle(kd, ps.length));
      });
      var skd = null;
      this.kinds.forEach(function (kd) { if (kd.kind === self.soluteKind) skd = kd; });
      skd = skd || { kind: this.soluteKind };
      var L2 = this.lattice;
      for (var j = 0; j < (skd.count || 12); j++) {
        var c2 = j % L2.cols, r2 = Math.floor(j / L2.cols);
        ps.push({
          id: 'P' + ps.length, type: skd.kind,
          x: L2.x0 + c2 * L2.dx, y: L2.y0 + r2 * L2.dy,
          vx: 0, vy: 0, state: 'crystal',
          gx: L2.x0 + c2 * L2.dx, gy: L2.y0 + r2 * L2.dy,
          ph: self.rng.next() * Math.PI * 2, hydrated: false, idx: ps.length
        });
      }
    } else if (this.field === 'fractionate') {
      /* 各馏分初始为液态，聚集在塔底 */
      this.kinds.forEach(function (kd) {
        for (var i = 0; i < kd.count; i++) {
          var p = self._mkParticle(kd, ps.length);
          p.y = b.yMin + 3 + self.rng.next() * (b.yMax - b.yMin) * 0.25;
          p.state = 'liquid';
          ps.push(p);
        }
      });
    } else {
      /* brownian / thermal / drift */
      this.kinds.forEach(function (kd) {
        for (var i = 0; i < kd.count; i++) ps.push(self._mkParticle(kd, ps.length));
      });
    }
    this._particles = ps;
  };

  Eng.MoleculeMotion.prototype._bounce = function (p) {
    var b = this.bounds, m = 2;
    if (p.x < b.xMin + m) { p.x = b.xMin + m; p.vx = Math.abs(p.vx); }
    if (p.x > b.xMax - m) { p.x = b.xMax - m; p.vx = -Math.abs(p.vx); }
    if (p.y < b.yMin + m) { p.y = b.yMin + m; p.vy = Math.abs(p.vy); }
    if (p.y > b.yMax - m) { p.y = b.yMax - m; p.vy = -Math.abs(p.vy); }
  };

  Eng.MoleculeMotion.prototype._brownianStep = function (p, kindDef) {
    var rng = this.rng, dt = this.dt;
    if (rng.next() < this.turnProbPerStep) {
      var v = randDir(rng, this._speedFor(kindDef));
      p.vx = v.vx; p.vy = v.vy;
    }
    var dx = p.vx * dt, dy = p.vy * dt;
    if (this.field === 'drift' && kindDef) {
      var dvx = isNum(kindDef.driftVxMps) ? kindDef.driftVxMps : 0;
      dx += dvx * dt; /* 定向漂移叠加在热运动之上（YC-B3） */
    }
    p.x += dx; p.y += dy;
    this._bounce(p);
  };

  Eng.MoleculeMotion.prototype._advance = function () {
    var self = this, dt = this.dt, rng = this.rng;
    var t = this.driver.simTimeSec();
    var kindOf = {};
    this.kinds.forEach(function (kd) { kindOf[kd.kind] = kd; });
    /* CHEMC-05：每步至多 1 个脱离事件（ΔcrystalCount ∈ {0,−1}） */
    var detachedThisStep = false;
    for (var i = 0; i < this._particles.length; i++) {
      var p = this._particles[i], kd = kindOf[p.type] || {};
      if (this.field === 'lattice') {
        var L = this.lattice;
        p.x = p.gx + L.vibAmp * Math.sin(L.vibOmega * t + p.ph);
        p.y = p.gy + L.vibAmp * Math.cos(L.vibOmega * 0.83 * t + p.ph);
      } else if (this.field === 'dissolve') {
        if (p.state === 'crystal') {
          /* 晶格振动 + 按概率脱离（单步单事件） */
          var L2 = this.lattice;
          p.x = p.gx + L2.vibAmp * 0.6 * Math.sin(L2.vibOmega * t + p.ph);
          p.y = p.gy + L2.vibAmp * 0.6 * Math.cos(L2.vibOmega * t + p.ph);
          if (!detachedThisStep && rng.next() < this.detachProbPerStep) {
            detachedThisStep = true;
            p.state = 'free'; p.hydrated = true;
            var v = randDir(rng, this._speedFor(kd));
            p.vx = v.vx; p.vy = v.vy;
          }
        } else {
          this._brownianStep(p, kd);
        }
      } else if (this.field === 'fractionate') {
        var boilC = isNum(p.boilC) ? p.boilC : (isNum(kd.boilC) ? kd.boilC : 200);
        if (p.state === 'liquid') {
          this._brownianStep(p, kd);
          p.y = Math.min(p.y, this.bounds.yMin + (this.bounds.yMax - this.bounds.yMin) * 0.3);
          /* 气化条件用当前加热温度（CHEMC-13：渐进加热→沸点低先气化） */
          if (this.tempCAt(p.y, t) > boilC) {
            p.state = 'gas';
            p.vy = this.tower.riseSpeedMps * (0.7 + 0.6 * rng.next());
            p.vx = (rng.next() - 0.5) * 4;
          }
        } else if (p.state === 'gas') {
          p.y += p.vy * dt;
          p.x += p.vx * dt + (rng.next() - 0.5) * 2 * dt;
          this._bounce(p);
          if (p.y >= this.condenseYFor(boilC)) {
            p.state = 'condensed'; p.vx = 0; p.vy = 0;
          }
        }
        /* condensed：静置（渲染层可将其引向收集口） */
      } else {
        /* brownian / thermal / drift */
        this._brownianStep(p, kd);
      }
    }
  };

  /* ---------- 驱动器语义（Eng.PRIMITIVE_IFACE） ---------- */
  Eng.MoleculeMotion.prototype.step = function (n) {
    this.driver.step(n === undefined ? 1 : n);
    return this.driver.stepCountN();
  };
  Eng.MoleculeMotion.prototype.reset = function () { this.driver.reset(); };
  Eng.MoleculeMotion.prototype.play = function () { this.driver.play(); };
  Eng.MoleculeMotion.prototype.pause = function () { this.driver.pause(); };
  Eng.MoleculeMotion.prototype.isPlaying = function () { return this.driver.isPlaying(); };
  Eng.MoleculeMotion.prototype.setSpeed = function (r) { this.driver.setSpeed(r); };
  Eng.MoleculeMotion.prototype.simTimeSec = function () { return this.driver.simTimeSec(); };
  Eng.MoleculeMotion.prototype.stepCountN = function () { return this.driver.stepCountN(); };

  /* ---------- 读回（ENG-10 防御性拷贝；字段按 §六 6.1） ---------- */
  function copyParticle(p) {
    return {
      id: p.id, type: p.type,
      pos: { x: p.x, y: p.y }, vel: { x: p.vx, y: p.vy },
      state: p.state,
      gx: p.gx, gy: p.gy, ph: p.ph, hydrated: p.hydrated,
      boilC: p.boilC === undefined ? null : p.boilC, idx: p.idx
    };
  }
  function restoreParticle(s) {
    return {
      id: s.id, type: s.type,
      x: s.pos.x, y: s.pos.y, vx: s.vel.x, vy: s.vel.y, state: s.state,
      gx: s.gx, gy: s.gy, ph: s.ph, hydrated: !!s.hydrated,
      boilC: s.boilC, idx: s.idx
    };
  }
  Eng.MoleculeMotion.prototype.state = function () {
    var ps = [];
    for (var i = 0; i < this._particles.length; i++) ps.push(copyParticle(this._particles[i]));
    return {
      field: this.field, seed: this.seed, dt: this.dt,
      stepN: this.stepCountN(), simTimeSec: this.simTimeSec(),
      particles: ps,
      fieldState: Eng.deepCopy(this.fieldState),
      groups: Eng.deepCopy(this.groups)
    };
  };
  /* 轻量位置读回（过程证据采样用） */
  Eng.MoleculeMotion.prototype.positions = function () {
    var out = [];
    for (var i = 0; i < this._particles.length; i++) {
      var p = this._particles[i];
      out.push({ id: p.id, type: p.type, x: p.x, y: p.y, state: p.state });
    }
    return out;
  };
  Eng.MoleculeMotion.prototype.snapshot = function () {
    var ps = [];
    for (var i = 0; i < this._particles.length; i++) ps.push(copyParticle(this._particles[i]));
    return {
      stepN: this.stepCountN(), simTimeSec: this.simTimeSec(),
      particles: ps,
      field: { on: this.fieldState.on, anodeDir: Eng.deepCopy(this.fieldState.anodeDir) },
      groups: Eng.deepCopy(this.groups),
      rngState: this.rng._s >>> 0
    };
  };
  Eng.MoleculeMotion.prototype.restore = function (snap) {
    if (!snap || !Array.isArray(snap.particles))
      throw new Error('MoleculeMotion.restore: 快照非法');
    this.pause();
    this.driver._steps = snap.stepN >>> 0;
    this.rng._s = snap.rngState >>> 0;
    var ps = [];
    for (var i = 0; i < snap.particles.length; i++) ps.push(restoreParticle(snap.particles[i]));
    this._particles = ps;
  };

  /* 浓度分布采样（供断言：扩散终态均匀性 / 粒子守恒） */
  Eng.MoleculeMotion.prototype.sampleConcentration = function (binsX, binsY) {
    binsX = binsX || 5; binsY = binsY || 3;
    var b = this.bounds, counts = [], totalN = 0, i, j;
    for (i = 0; i < binsY; i++) { counts.push([]); for (j = 0; j < binsX; j++) counts[i].push(0); }
    for (var k = 0; k < this._particles.length; k++) {
      var p = this._particles[k];
      var ix = Math.max(0, Math.min(binsX - 1,
        Math.floor((p.x - b.xMin) / (b.xMax - b.xMin) * binsX)));
      var iy = Math.max(0, Math.min(binsY - 1,
        Math.floor((p.y - b.yMin) / (b.yMax - b.yMin) * binsY)));
      counts[iy][ix]++; totalN++;
    }
    return { binsX: binsX, binsY: binsY, counts: counts, totalN: totalN };
  };
  Eng.MoleculeMotion.prototype.countByState = function () {
    var out = {};
    for (var i = 0; i < this._particles.length; i++) {
      var s = this._particles[i].state;
      out[s] = (out[s] || 0) + 1;
    }
    return out;
  };
  Eng.MoleculeMotion.prototype.countByKind = function () {
    var out = {};
    for (var i = 0; i < this._particles.length; i++) {
      var k = this._particles[i].type;
      out[k] = (out[k] || 0) + 1;
    }
    return out;
  };
  Eng.MoleculeMotion.prototype.particleCountN = function () { return this._particles.length; };
})();
