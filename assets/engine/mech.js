/* 基础引擎层 · mech.js
 * 力学原语（ENG-17 ~ ENG-34）。
 *  - Planck 动力学：RigidBody（ENG-20 半宽半高换算）、Incline（ENG-24 自动配边长）、
 *    SpringMass（ENG-26/27）、Pendulum（ENG-28/29）。
 *  - 理想解析模型（假设已按 ENG-AX01 显性化）：Pulley（ENG-30/31）、Lever（ENG-32/33）、
 *    Collision1D（ENG-34；超出"一维完全弹性"按 ENG-NC01 标不可对账）。
 * 命名一律含单位（YP-30）：angleDeg / gravityMps2 / lengthM / massKg / timeSec ……
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng || !Eng.Driver) throw new Error('mech.js 必须在 core.js/driver.js 之后加载');

  function axOrDefault(opt, name, dflt) {
    opt = opt || {};
    return Eng.checkAx01(
      {
        assumptions: opt.assumptions || dflt.assumptions,
        approximations: opt.approximations || dflt.approximations,
        errorEstimate: opt.errorEstimate || dflt.errorEstimate
      },
      name
    );
  }

  /* 过零点测周期（单摆/弹簧共用；P1 校准写法）
   * valueFn: 每步读回的位移量（过零：由正转负）；返回 {t1,t2,periodSec} 或 null。
   * 注意：本函数会消耗 driver 步数；用后如需复位请调 driver.reset()。
   */
  Eng.measurePeriodSec = function (driver, valueFn, maxTimeSec, skipSec) {
    var dt = driver.dt;
    var n = Math.ceil(maxTimeSec / dt);
    var crossings = [];
    var prevV = valueFn(), prevT = 0;
    for (var i = 1; i <= n; i++) {
      driver.step(1);
      var t = i * dt, v = valueFn();
      if (t > skipSec && crossings.length < 2 && prevV > 0 && v <= 0) {
        crossings.push(prevT + ((t - prevT) * prevV) / (prevV - v)); // 线性插值
      }
      prevV = v; prevT = t;
    }
    if (crossings.length < 2) return null;
    return { t1: crossings[0], t2: crossings[1], periodSec: crossings[1] - crossings[0] };
  };

  /* ============ 4.1 刚体 ============ */

  Eng.RigidBody = function (driver, opt) {
    opt = opt || {};
    this.driver = driver;
    this.name = opt.name || 'rigidbody';
    var mat = opt.material || {};
    var def = {
      type: opt.staticBody ? 'static' : 'dynamic',
      position: planck.Vec2(
        opt.positionM ? opt.positionM.x : 0,
        opt.positionM ? opt.positionM.y : 0
      ),
      angle: opt.angleRad || 0
    };
    var body = driver.world.createBody(def);
    this.shapeKind = opt.shape || 'box';
    if (this.shapeKind === 'box') {
      // ENG-20：构造用全宽全高，内部按半宽半高换算（原型坑 2）
      this.sizeWM = opt.sizeWM !== undefined ? opt.sizeWM : 1;
      this.sizeHM = opt.sizeHM !== undefined ? opt.sizeHM : 1;
      body.createFixture(planck.Box(this.sizeWM / 2, this.sizeHM / 2), {
        friction: mat.friction !== undefined ? mat.friction : 0.3,
        restitution: mat.restitution || 0,
        density: opt.densityKgm3 || 1.0
      });
    } else if (this.shapeKind === 'circle') {
      this.radiusM = opt.radiusM !== undefined ? opt.radiusM : 0.1; // ENG-21
      body.createFixture(planck.Circle(this.radiusM), {
        friction: mat.friction !== undefined ? mat.friction : 0.3,
        restitution: mat.restitution || 0,
        density: opt.densityKgm3 || 1.0
      });
    } else {
      throw new Error('RigidBody: shape 仅支持 box/circle');
    }
    this.body = body;
    if (opt.velocityMps) {
      // 先设定初速再登记：registerBody 记录的初始摆位必须含初速（ENG-12 reset 还原）
      body.setLinearVelocity(planck.Vec2(opt.velocityMps.vxMps || 0, opt.velocityMps.vyMps || 0));
      body.setAngularVelocity(opt.velocityMps.omegaRadps || 0);
    }
    driver.registerBody(this.name, body);
    var ax = axOrDefault(opt, 'RigidBody', {
      assumptions: ['刚体（形状不变）', '均匀重力场 g=' + driver.gravityMps2 + ' m/s² 竖直向下'],
      approximations: ['半隐式欧拉积分（dt=' + driver.dt + ' s），匀加速相对误差 1/N'],
      errorEstimate: '自由落体类匀加速：1/N；N=240 时约 0.42%（ENG-13）'
    });
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };

  // ENG-18：初始摆位精确设定（位置 ≤1e-9 m，角度 ≤1e-9 rad，速度 ≤1e-9 m/s）
  Eng.RigidBody.prototype.setTransform = function (t) {
    this.body.setTransform(planck.Vec2(t.xM, t.yM), t.angleRad || 0);
    this.body.setAwake(true);
    return this.state();
  };
  Eng.RigidBody.prototype.setVelocity = function (v) {
    this.body.setLinearVelocity(planck.Vec2(v.vxMps || 0, v.vyMps || 0));
    this.body.setAngularVelocity(v.omegaRadps || 0);
    this.body.setAwake(true);
    return this.state();
  };

  // ENG-19：每步状态可读回（深拷贝）
  Eng.RigidBody.prototype.state = function () {
    var p = this.body.getPosition(), v = this.body.getLinearVelocity(); // 立刻拷贝（原型坑 1）
    return {
      name: this.name,
      positionM: { x: p.x, y: p.y },
      angleRad: this.body.getAngle(),
      velocityMps: { x: v.x, y: v.y },
      angularVelocityRadps: this.body.getAngularVelocity(),
      massKg: this.body.getMass(),
      simTimeSec: this.driver.simTimeSec(),
      stepCountN: this.driver.stepCountN()
    };
  };
  Eng.RigidBody.prototype.step = function (n) { this.driver.step(n); return this.state(); };
  Eng.RigidBody.prototype.reset = function () { this.driver.reset(); return this.state(); };
  Eng.RigidBody.prototype.snapshot = function () { return this.driver.snapshot(); };
  Eng.RigidBody.prototype.restore = function (s) { this.driver.restore(s); };
  Eng.RigidBody.prototype.simTimeSec = function () { return this.driver.simTimeSec(); };
  Eng.RigidBody.prototype.stepCountN = function () { return this.driver.stepCountN(); };

  // ENG-20 断言用：盒体顶点跨度（应等于构造全宽/全高 ±1e-9）
  Eng.RigidBody.prototype.vertexSpanM = function () {
    if (this.shapeKind !== 'box') throw new Error('vertexSpanM 仅用于 box');
    var shape = this.body.getFixtureList().getShape();
    var vs = shape.m_vertices;
    var minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    for (var i = 0; i < vs.length; i++) {
      minX = Math.min(minX, vs[i].x); maxX = Math.max(maxX, vs[i].x);
      minY = Math.min(minY, vs[i].y); maxY = Math.max(maxY, vs[i].y);
    }
    return { spanXM: maxX - minX, spanYM: maxY - minY };
  };

  /* ============ 4.2 斜面 ============ */

  Eng.Incline = function (driver, opt) {
    opt = opt || {};
    this.driver = driver;
    this.name = opt.name || 'incline';
    this.angleDeg = opt.angleDeg !== undefined ? opt.angleDeg : 30; // YP-31 课堂常见
    this.simTimeSecForSizing = opt.simTimeSec !== undefined ? opt.simTimeSec : 2.0;
    var g = driver.gravityMps2;
    var alpha = (this.angleDeg * Math.PI) / 180;
    this._ux = Math.cos(alpha); this._uy = Math.sin(alpha);
    this._nx = -Math.sin(alpha); this._ny = Math.cos(alpha); // 外法线（指向上方）
    // ENG-24：Lmin = 1/2*g*sinα*Tsim² + Lmargin（Lmargin ≥ 2 m；原型坑 5）
    var marginM = opt.marginM !== undefined ? opt.marginM : 2;
    if (marginM < 2) throw new Error('Incline: marginM 不得小于 2 m（ENG-24）');
    this.rampLengthM = 0.5 * g * Math.sin(alpha) * Math.pow(this.simTimeSecForSizing, 2) + marginM;
    var L = this.rampLengthM;
    var ramp = driver.world.createBody({ type: 'static' });
    ramp.createFixture(
      planck.Edge(
        planck.Vec2(-L * this._ux, -L * this._uy),
        planck.Vec2(L * this._ux, L * this._uy)
      ),
      { friction: 0 }
    );
    driver.registerBody(this.name + '.ramp', ramp);
    // 滑块：全宽全高（ENG-20），中心沿法线抬高半高，初位 d0 沿面上坡方向
    this.sliderWM = opt.sliderWM !== undefined ? opt.sliderWM : 1;
    this.sliderHM = opt.sliderHM !== undefined ? opt.sliderHM : 1;
    var d0 = opt.sliderStartM !== undefined ? opt.sliderStartM : 0.5;
    var cx = d0 * this._ux + this._nx * (this.sliderHM / 2);
    var cy = d0 * this._uy + this._ny * (this.sliderHM / 2);
    var slider = driver.world.createBody({
      type: 'dynamic', position: planck.Vec2(cx, cy), angle: alpha
    });
    slider.createFixture(planck.Box(this.sliderWM / 2, this.sliderHM / 2), {
      friction: 0, restitution: 0, density: 1.0
    });
    driver.registerBody(this.name + '.slider', slider);
    this.slider = slider;
    var p0 = slider.getPosition();
    this._p0x = p0.x; this._p0y = p0.y; // 初位（活引用已拷贝）
    var ax = axOrDefault(opt, 'Incline', {
      assumptions: ['无摩擦（接触面摩擦系数 = 0）', '刚体滑块、刚性斜面', '忽略空气阻力', '均匀重力场'],
      approximations: ['半隐式欧拉积分；斜面边长按 Tsim 自动配（ENG-24）'],
      errorEstimate: '沿面位移相对误差 1/N；α=30°、T=2s、dt=1/120（N=240）时约 0.42%（P4 锚点 0.417%）'
    });
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };

  Eng.Incline.prototype._pos = function () {
    var p = this.slider.getPosition();
    return { x: p.x, y: p.y };
  };
  // 沿面上坡方向位移（下滑为负），m
  Eng.Incline.prototype.sAlongM = function () {
    var p = this._pos();
    return (p.x - this._p0x) * this._ux + (p.y - this._p0y) * this._uy;
  };
  Eng.Incline.prototype.sAbsM = function () { return Math.abs(this.sAlongM()); };
  // 法向间隙：滑块中心到斜面线的法向距离 − 半高（≈0 为接触）
  Eng.Incline.prototype.normalGapM = function () {
    var p = this._pos();
    var along = p.x * this._ux + p.y * this._uy;
    var qx = along * this._ux, qy = along * this._uy; // 斜面线上最近点
    var dist = (p.x - qx) * this._nx + (p.y - qy) * this._ny;
    return dist - this.sliderHM / 2;
  };
  Eng.Incline.prototype.inContactNow = function () {
    var contacts = this.driver.touchingContacts();
    for (var i = 0; i < contacts.length; i++) {
      var c = contacts[i];
      if (c.getFixtureA().getBody() === this.slider || c.getFixtureB().getBody() === this.slider) return true;
    }
    return false;
  };
  // ENG-25：滑块转角偏离（°）
  Eng.Incline.prototype.angleDeviationDeg = function () {
    var dev = Math.abs(this.slider.getAngle() - (this.angleDeg * Math.PI) / 180);
    return (dev * 180) / Math.PI;
  };
  Eng.Incline.prototype.state = function () {
    var p = this._pos(), v = this.slider.getLinearVelocity();
    return {
      name: this.name,
      angleDeg: this.angleDeg,
      rampLengthM: this.rampLengthM,
      sliderPositionM: { x: p.x, y: p.y },
      sliderAngleRad: this.slider.getAngle(),
      angleDeviationDeg: this.angleDeviationDeg(),
      sAlongM: this.sAlongM(),
      sAbsM: this.sAbsM(),
      normalGapM: this.normalGapM(),
      inContact: this.inContactNow(),
      velocityMps: { x: v.x, y: v.y },
      simTimeSec: this.driver.simTimeSec(),
      stepCountN: this.driver.stepCountN()
    };
  };
  Eng.Incline.prototype.step = function (n) { this.driver.step(n); return this.state(); };
  Eng.Incline.prototype.reset = function () {
    this.driver.reset();
    var p0 = this.slider.getPosition();
    this._p0x = p0.x; this._p0y = p0.y;
    return this.state();
  };
  Eng.Incline.prototype.snapshot = function () { return this.driver.snapshot(); };
  Eng.Incline.prototype.restore = function (s) { this.driver.restore(s); };
  Eng.Incline.prototype.simTimeSec = function () { return this.driver.simTimeSec(); };
  Eng.Incline.prototype.stepCountN = function () { return this.driver.stepCountN(); };

  /* ============ 4.3 弹簧振子（水平无阻尼） ============ */

  Eng.SpringMass = function (driver, opt) {
    opt = opt || {};
    if (driver.gravityMps2 !== 0) {
      throw new Error('SpringMass: 须用 gravityMps2=0 的 Driver（水平无阻尼弹簧）');
    }
    this.driver = driver;
    this.name = opt.name || 'spring';
    this.springConstantNpm = opt.springConstantNpm !== undefined ? opt.springConstantNpm : 10; // k
    this.massKg = opt.massKg !== undefined ? opt.massKg : 1;
    this.equilibriumXM = opt.equilibriumXM !== undefined ? opt.equilibriumXM : 0;
    this.amplitudeM = opt.amplitudeM !== undefined ? opt.amplitudeM : 0.5;
    var sizeM = 0.2;
    var area = sizeM * sizeM;
    var body = driver.world.createBody({
      type: 'dynamic',
      position: planck.Vec2(this.equilibriumXM + this.amplitudeM, 0)
    });
    body.createFixture(planck.Box(sizeM / 2, sizeM / 2), {
      friction: 0, restitution: 0, density: this.massKg / area
    });
    driver.registerBody(this.name, body);
    this.body = body;
    var self = this;
    driver.onPreStep(function () {
      var x = self.body.getPosition().x; // 立刻取原始值
      var F = -self.springConstantNpm * (x - self.equilibriumXM); // 胡克定律
      self.body.applyForceToCenter(planck.Vec2(F, 0), true);
    });
    var ax = axOrDefault(opt, 'SpringMass', {
      assumptions: ['无阻尼', '轻弹簧（弹簧质量忽略）', '水平面无摩擦', '胡克定律线性区'],
      approximations: ['半隐式欧拉积分；施力按步首位置计算（显式力），读回弹力为读回位置的瞬时胡克力'],
      errorEstimate: '周期相对误差 ≈ (ω·dt)²/24（ω=√(k/m)）；k=10、m=1、dt=1/240 时 ≈ 7.3e-6，可忽略（ENG-27）'
    });
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };
  // ENG-26：读回位移 x 与弹力 F，|F + k(x−x0)| ≤ 1e-9（F 定义为读回位置的瞬时胡克力）
  Eng.SpringMass.prototype.state = function () {
    var p = this.body.getPosition(), v = this.body.getLinearVelocity();
    var x = p.x;
    return {
      name: this.name,
      displacementM: x - this.equilibriumXM,
      springForceN: -this.springConstantNpm * (x - this.equilibriumXM),
      springConstantNpm: this.springConstantNpm,
      massKg: this.body.getMass(),
      velocityMps: v.x,
      simTimeSec: this.driver.simTimeSec(),
      stepCountN: this.driver.stepCountN()
    };
  };
  Eng.SpringMass.prototype.step = function (n) { this.driver.step(n); return this.state(); };
  Eng.SpringMass.prototype.reset = function () { this.driver.reset(); return this.state(); };
  Eng.SpringMass.prototype.snapshot = function () { return this.driver.snapshot(); };
  Eng.SpringMass.prototype.restore = function (s) { this.driver.restore(s); };
  Eng.SpringMass.prototype.simTimeSec = function () { return this.driver.simTimeSec(); };
  Eng.SpringMass.prototype.stepCountN = function () { return this.driver.stepCountN(); };
  // ENG-27：过零点法实测周期
  Eng.SpringMass.prototype.measurePeriodSec = function (maxTimeSec) {
    var self = this;
    return Eng.measurePeriodSec(this.driver, function () {
      return self.body.getPosition().x - self.equilibriumXM;
    }, maxTimeSec || 10, 0.2);
  };

  /* ============ 4.4 单摆 ============ */

  Eng.Pendulum = function (driver, opt) {
    opt = opt || {};
    this.driver = driver;
    this.name = opt.name || 'pendulum';
    this.lengthM = opt.lengthM !== undefined ? opt.lengthM : 1.0; // YP-31 课堂常见摆长
    this.initialAngleRad = opt.initialAngleRad !== undefined ? opt.initialAngleRad : 0.08;
    this.pivotM = opt.pivotM || { x: 0, y: 0 };
    this.ballRadiusM = opt.ballRadiusM !== undefined ? opt.ballRadiusM : 0.05;
    // ENG-29：θ0 > 5° 必须显性化"超出小角度近似适用边界"
    this.beyondSmallAngle = this.initialAngleRad > (5 * Math.PI) / 180;
    var anchor = driver.world.createBody({
      type: 'static', position: planck.Vec2(this.pivotM.x, this.pivotM.y)
    });
    driver.registerBody(this.name + '.anchor', anchor);
    var th = this.initialAngleRad;
    var ball = driver.world.createBody({
      type: 'dynamic',
      position: planck.Vec2(
        this.pivotM.x + this.lengthM * Math.sin(th),
        this.pivotM.y - this.lengthM * Math.cos(th)
      )
    });
    ball.createFixture(planck.Circle(this.ballRadiusM), { friction: 0, restitution: 0, density: 1.0 });
    driver.registerBody(this.name + '.ball', ball);
    this.ball = ball;
    driver.world.createJoint(
      new planck.RevoluteJoint({}, anchor, ball, planck.Vec2(this.pivotM.x, this.pivotM.y))
    );
    var ax = axOrDefault(opt, 'Pendulum', {
      assumptions: ['小角度近似（θ0 ≤ 5° 时周期公式成立）', '轻绳、质点摆球', '无空气阻尼', '均匀重力场'],
      approximations: ['半隐式欧拉积分；周期公式 T=2π√(L/g) 本身为小角近似'],
      errorEstimate:
        '容差 = θ0²/16（小角近似自身偏差）+ 0.02%（dt=1/240 积分预算实测校准）+ 0.05%（ENG-28）；' +
        'θ0>5° 时周期公式为近似值（ENG-29，学生文案显性化）'
    });
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };
  // 摆角（rad）：atan2 读回，悬点为原点
  Eng.Pendulum.prototype.angleRad = function () {
    var p = this.ball.getPosition();
    return Math.atan2(p.x - this.pivotM.x, -(p.y - this.pivotM.y));
  };
  Eng.Pendulum.prototype.state = function () {
    var p = this.ball.getPosition(), v = this.ball.getLinearVelocity();
    return {
      name: this.name,
      lengthM: this.lengthM,
      angleRad: this.angleRad(),
      angleDeg: (this.angleRad() * 180) / Math.PI,
      ballPositionM: { x: p.x, y: p.y },
      ballVelocityMps: { x: v.x, y: v.y },
      beyondSmallAngle: this.beyondSmallAngle,
      simTimeSec: this.driver.simTimeSec(),
      stepCountN: this.driver.stepCountN()
    };
  };
  Eng.Pendulum.prototype.step = function (n) { this.driver.step(n); return this.state(); };
  Eng.Pendulum.prototype.reset = function () { this.driver.reset(); return this.state(); };
  Eng.Pendulum.prototype.snapshot = function () { return this.driver.snapshot(); };
  Eng.Pendulum.prototype.restore = function (s) { this.driver.restore(s); };
  Eng.Pendulum.prototype.simTimeSec = function () { return this.driver.simTimeSec(); };
  Eng.Pendulum.prototype.stepCountN = function () { return this.driver.stepCountN(); };
  // ENG-28：过零点法实测周期（P1 校准：L=2.0、θ0=0.08、dt=1/240 → 2.84002 s）
  Eng.Pendulum.prototype.measurePeriodSec = function (maxTimeSec) {
    var self = this;
    return Eng.measurePeriodSec(this.driver, function () {
      return self.ball.getPosition().x - self.pivotM.x;
    }, maxTimeSec || 12, 0.2);
  };

  /* ============ 4.5 滑轮组（理想解析模型） ============
   * 轻绳、轻滑轮、无摩擦（ENG-AX01 显性化）。几何约束精确成立，无积分误差。
   */
  Eng.Pulley = function (opt) {
    opt = opt || {};
    this.name = opt.name || 'pulley';
    this.ropeSegmentsN = opt.ropeSegmentsN !== undefined ? opt.ropeSegmentsN : 2;
    if (this.ropeSegmentsN !== Math.floor(this.ropeSegmentsN) || this.ropeSegmentsN < 1) {
      throw new Error('Pulley: ropeSegmentsN 必须为 ≥1 的整数');
    }
    this.loadWeightN = opt.loadWeightN !== undefined ? opt.loadWeightN : 20; // G（N）
    this._loadHeight0M = opt.initialLoadHeightM !== undefined ? opt.initialLoadHeightM : 1.0;
    this._loadHeightM = this._loadHeight0M;
    this._ropePulledM = 0;
    this.dt = opt.dt !== undefined ? opt.dt : 1 / 240;
    this._steps = 0;
    var ax = axOrDefault(opt, 'Pulley', {
      assumptions: ['轻绳（质量忽略）', '轻滑轮（质量忽略）', '无摩擦', '绳不可伸长'],
      approximations: ['理想静力学模型：不模拟拉动过程中的动力学加速度，只跟踪几何约束'],
      errorEstimate: '解析精确：F=G/n、s绳=n·s物 逐位成立（无积分误差）'
    });
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };
  // ENG-30：理想机械效益，自由端拉力 = G/n
  Eng.Pulley.prototype.tensionN = function () {
    return this.loadWeightN / this.ropeSegmentsN;
  };
  // 拉动自由端 dM（m）：负载上升 dM/n（ENG-31：s绳 = n·s物 逐位）
  Eng.Pulley.prototype.pullRopeM = function (dM) {
    if (!Eng.isFiniteNumber(dM)) throw new Error('Pulley.pullRopeM: dM 必须为有限数值');
    this._ropePulledM += dM;
    this._loadHeightM += dM / this.ropeSegmentsN;
    return this.state();
  };
  Eng.Pulley.prototype.state = function () {
    return {
      name: this.name,
      ropeSegmentsN: this.ropeSegmentsN,
      loadWeightN: this.loadWeightN,
      loadHeightM: this._loadHeightM,
      loadRiseM: this._loadHeightM - this._loadHeight0M,
      ropePulledM: this._ropePulledM,
      tensionN: this.tensionN(),
      mechanicalAdvantageN: this.ropeSegmentsN,
      simTimeSec: this._steps * this.dt,
      stepCountN: this._steps
    };
  };
  Eng.Pulley.prototype.step = function (n) {
    n = n === undefined ? 1 : n;
    this._steps += n;
    return this.state();
  };
  Eng.Pulley.prototype.reset = function () {
    this._loadHeightM = this._loadHeight0M;
    this._ropePulledM = 0;
    this._steps = 0;
    return this.state();
  };
  Eng.Pulley.prototype.snapshot = function () {
    return Eng.deepCopy({
      loadHeightM: this._loadHeightM, ropePulledM: this._ropePulledM,
      stepsN: this._steps, dt: this.dt
    });
  };
  Eng.Pulley.prototype.restore = function (s) {
    this._loadHeightM = s.loadHeightM;
    this._ropePulledM = s.ropePulledM;
    this._steps = s.stepsN;
  };
  Eng.Pulley.prototype.simTimeSec = function () { return this._steps * this.dt; };
  Eng.Pulley.prototype.stepCountN = function () { return this._steps; };

  /* ============ 4.6 杠杆（理想静态模型） ============
   * 轻质杠杆、理想支点无摩擦（ENG-AX01）。只做静力学：平衡判定、力矩读回、失衡方向。
   * 不模拟转动动力学过程（approximations 显性化）。
   */
  Eng.Lever = function (opt) {
    opt = opt || {};
    this.name = opt.name || 'lever';
    this.arm1M = opt.arm1M !== undefined ? opt.arm1M : 0.3; // 左臂（m）
    this.arm2M = opt.arm2M !== undefined ? opt.arm2M : 0.6; // 右臂（m）
    this.force1N = opt.force1N !== undefined ? opt.force1N : 20; // 左端竖直向下的力（N）
    this.force2N = opt.force2N !== undefined ? opt.force2N : 10; // 右端竖直向下的力（N）
    this.dt = opt.dt !== undefined ? opt.dt : 1 / 240;
    this._steps = 0;
    var ax = axOrDefault(opt, 'Lever', {
      assumptions: ['轻质杠杆（杠杆自重忽略）', '理想支点（无摩擦）', '力竖直向下、杠杆水平'],
      approximations: ['静态理想模型：只判定平衡/力矩/失衡方向，不积分转动动力学过程'],
      errorEstimate: '解析精确：平衡条件 F1·l1=F2·l2、力矩 τ=r×F 逐位成立'
    });
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };
  // ENG-33：各力对支点的力矩（N·m，逆时针为正）。
  // 左端受竖直向下的力 → 左侧下沉 = 逆时针，为正；右端向下的力 → 顺时针，为负。
  Eng.Lever.prototype.torque1Nm = function () { return this.force1N * this.arm1M; };
  Eng.Lever.prototype.torque2Nm = function () { return -this.force2N * this.arm2M; };
  Eng.Lever.prototype.netTorqueNm = function () {
    return this.torque1Nm() + this.torque2Nm();
  };
  Eng.Lever.prototype.isBalanced = function () {
    return Math.abs(this.netTorqueNm()) <= 1e-12;
  };
  // ENG-32 方向断言：失衡时向力矩大的一侧转动
  Eng.Lever.prototype.tipDirection = function () {
    var t = this.netTorqueNm();
    if (Math.abs(t) <= 1e-12) return 'balanced';
    return t > 0 ? 'counterclockwise' : 'clockwise';
  };
  Eng.Lever.prototype.angleDeg = function () { return 0; }; // 静态理想模型：平衡摆位转角恒为 0
  Eng.Lever.prototype.state = function () {
    return {
      name: this.name,
      arm1M: this.arm1M, arm2M: this.arm2M,
      force1N: this.force1N, force2N: this.force2N,
      torque1Nm: this.torque1Nm(), torque2Nm: this.torque2Nm(),
      netTorqueNm: this.netTorqueNm(),
      isBalanced: this.isBalanced(),
      tipDirection: this.tipDirection(),
      angleDeg: this.angleDeg(),
      simTimeSec: this._steps * this.dt,
      stepCountN: this._steps
    };
  };
  Eng.Lever.prototype.step = function (n) {
    n = n === undefined ? 1 : n;
    this._steps += n;
    return this.state();
  };
  Eng.Lever.prototype.reset = function () { this._steps = 0; return this.state(); };
  Eng.Lever.prototype.snapshot = function () {
    return Eng.deepCopy({ stepsN: this._steps, dt: this.dt });
  };
  Eng.Lever.prototype.restore = function (s) { this._steps = s.stepsN; };
  Eng.Lever.prototype.simTimeSec = function () { return this._steps * this.dt; };
  Eng.Lever.prototype.stepCountN = function () { return this._steps; };

  /* ============ 4.7 一维完全弹性碰撞（解析，ENG-34） ============
   * 质点近似、碰撞瞬时完成。超出"一维、完全弹性"范围的演示按 ENG-NC01 标不可对账。
   */
  Eng.Collision1D = function (opt) {
    opt = opt || {};
    this.name = opt.name || 'collision1d';
    this.mass1Kg = opt.mass1Kg !== undefined ? opt.mass1Kg : 1;
    this.mass2Kg = opt.mass2Kg !== undefined ? opt.mass2Kg : 2;
    this._v10 = opt.velocity1Mps !== undefined ? opt.velocity1Mps : 3;
    this._v20 = opt.velocity2Mps !== undefined ? opt.velocity2Mps : 0;
    this._v1 = this._v10;
    this._v2 = this._v20;
    this.radiusM = opt.radiusM !== undefined ? opt.radiusM : 0.1;
    this._x1 = 0;
    this._x2 = opt.initialGapM !== undefined ? opt.initialGapM : 2.0;
    this._x20 = this._x2;
    this.dt = opt.dt !== undefined ? opt.dt : 1 / 240;
    if (!(this._v1 > this._v2)) throw new Error('Collision1D: 须 velocity1Mps > velocity2Mps（1 追 2 才能碰撞）');
    var m1 = this.mass1Kg, m2 = this.mass2Kg;
    this._v1p = ((m1 - m2) * this._v1 + 2 * m2 * this._v2) / (m1 + m2); // 解析真值
    this._v2p = ((m2 - m1) * this._v2 + 2 * m1 * this._v1) / (m1 + m2);
    this._pBefore = m1 * this._v1 + m2 * this._v2;
    this._collided = false;
    this._t = 0;
    // 解析碰撞时刻
    this._tCollide = (this._x2 - this._x1 - 2 * this.radiusM) / (this._v1 - this._v2);
    var ax = axOrDefault(opt, 'Collision1D', {
      assumptions: ['一维对心碰撞', '完全弹性（动能守恒）', '质点近似（忽略转动与形变）', '碰撞瞬时完成'],
      approximations: ['解析模型：碰撞时刻按匀速运动解析求解，步内事件精确处理，无数值积分'],
      errorEstimate: '解析精确：动量守恒逐位（≤1e-6 含浮点余量）；二维斜碰/非弹性按 ENG-NC01 标不可对账'
    });
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };
  Eng.Collision1D.prototype._freeMove = function (dt) {
    this._x1 += this._v1 * dt;
    this._x2 += this._v2 * dt;
    this._t += dt;
  };
  Eng.Collision1D.prototype.step = function (n) {
    n = n === undefined ? 1 : n;
    for (var i = 0; i < n; i++) {
      var tNext = this._t + this.dt;
      if (!this._collided && this._t < this._tCollide && this._tCollide <= tNext) {
        var dt1 = this._tCollide - this._t;
        this._freeMove(dt1); // 精确走到接触点
        this._v1 = this._v1p; this._v2 = this._v2p; // 瞬时弹性碰撞（解析真值）
        this._collided = true;
        this._freeMove(tNext - this._tCollide);
      } else {
        this._freeMove(this.dt);
      }
    }
    return this.state();
  };
  Eng.Collision1D.prototype.momentumAfter = function () {
    return this.mass1Kg * this._v1 + this.mass2Kg * this._v2;
  };
  Eng.Collision1D.prototype.state = function () {
    return {
      name: this.name,
      position1M: this._x1, position2M: this._x2,
      velocity1Mps: this._v1, velocity2Mps: this._v2,
      hasCollided: this._collided,
      momentumBeforeKgmps: this._pBefore,
      momentumAfterKgmps: this.momentumAfter(),
      analyticV1pMps: this._v1p, analyticV2pMps: this._v2p,
      simTimeSec: this._t,
      stepCountN: Math.round(this._t / this.dt)
    };
  };
  Eng.Collision1D.prototype.reset = function () {
    this._x1 = 0;
    this._x2 = this._x20;
    this._v1 = this._v10;
    this._v2 = this._v20;
    this._collided = false;
    this._t = 0;
    return this.state();
  };
  Eng.Collision1D.prototype.snapshot = function () {
    return Eng.deepCopy({
      x1: this._x1, x2: this._x2, v1: this._v1, v2: this._v2,
      collided: this._collided, t: this._t, dt: this.dt
    });
  };
  Eng.Collision1D.prototype.restore = function (s) {
    this._x1 = s.x1; this._x2 = s.x2; this._v1 = s.v1; this._v2 = s.v2;
    this._collided = s.collided; this._t = s.t;
  };
  Eng.Collision1D.prototype.simTimeSec = function () { return this._t; };
  Eng.Collision1D.prototype.stepCountN = function () { return Math.round(this._t / this.dt); };
})();
