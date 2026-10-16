/* 基础引擎层 · driver.js
 * 确定性驱动器（ENG-06 ~ ENG-12）：封装 Planck world.step(dt)。
 *  - 只接受固定 dt 步进（ENG-06），默认 dt = 1/240 s；变 dt 禁止。
 *  - play()/pause()/step(n)/reset()（ENG-07）；simTime = N*dt 精确读回（ENG-08）。
 *  - snapshot() 防御性深拷贝（ENG-10）；同一场景两次运行逐位一致（ENG-09）。
 *  - 物理路径不许出现 Date.now()/Math.random()（ENG-11）；reset() 语义（ENG-12）。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng) throw new Error('driver.js 必须在 core.js 之后加载');
  if (!window.planck) throw new Error('driver.js 需要先加载 assets/vendor/planck.min.js');

  Eng.Driver = function (opt) {
    opt = opt || {};
    this.dt = opt.dt !== undefined ? opt.dt : 1 / 240; // ENG-06 默认 ≥240Hz
    if (!(this.dt > 0)) throw new Error('Driver: dt 必须为正数（ENG-06 固定步进）');
    this.gravityMps2 = opt.gravityMps2 !== undefined ? opt.gravityMps2 : 9.8; // YP-30 命名含单位
    this.world = new planck.World({ gravity: planck.Vec2(0, -this.gravityMps2) });
    this._steps = 0;
    this._playing = false;
    this._timer = null;
    this._speed = 1; // ENG-63：只改变单位 wall-time 推进步数，不改变 dt
    this._bodies = []; // {name, body, initial:{x,y,angleRad,vx,vy,omega}}
    this._preStep = []; // 每步 world.step(dt) 之前执行的回调（如弹簧施力）
    var ax = Eng.checkAx01(opt, 'Driver');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };

  // 注册刚体：记录初始摆位供 reset() 精确恢复（ENG-12）
  Eng.Driver.prototype.registerBody = function (name, body) {
    var p = body.getPosition(); // 立刻取原始值（原型坑 1：活引用）
    var v = body.getLinearVelocity();
    this._bodies.push({
      name: name,
      body: body,
      initial: {
        x: p.x, y: p.y, angleRad: body.getAngle(),
        vx: v.x, vy: v.y, omega: body.getAngularVelocity()
      }
    });
    return body;
  };

  Eng.Driver.prototype.onPreStep = function (fn) {
    this._preStep.push(fn);
  };

  // ENG-07：step(n) 必须恰好推进 n 个固定步进
  Eng.Driver.prototype.step = function (n) {
    n = n === undefined ? 1 : n;
    if (n !== Math.floor(n) || n < 0) throw new Error('Driver.step: n 必须为非负整数');
    for (var i = 0; i < n; i++) {
      for (var k = 0; k < this._preStep.length; k++) this._preStep[k](this._steps, this.dt);
      this.world.step(this.dt);
      this._steps++;
    }
    return this._steps;
  };

  Eng.Driver.prototype.play = function () {
    if (this._playing) return;
    this._playing = true;
    var self = this;
    // 每帧按 speed 推进固定步进；wall-time 只决定步数，不改变 dt（ENG-06/63）
    this._timer = setInterval(function () {
      var perFrame = Math.max(1, Math.round((self._speed * 1) / 60 / self.dt));
      self.step(perFrame);
      if (self.onTick) self.onTick();
    }, 1000 / 60);
  };

  Eng.Driver.prototype.pause = function () {
    this._playing = false;
    if (this._timer) { clearInterval(this._timer); this._timer = null; }
  };

  Eng.Driver.prototype.isPlaying = function () { return this._playing; };

  // ENG-63：慢放只改变单位 wall-time 内步数
  Eng.Driver.prototype.setSpeed = function (r) {
    if (!(r > 0 && r <= 1)) throw new Error('Driver.setSpeed: r 必须在 (0,1] 内');
    this._speed = r;
  };
  Eng.Driver.prototype.speed = function () { return this._speed; };

  // ENG-08：simTime = N*dt（读回时按步数计算，精确到浮点表示）
  Eng.Driver.prototype.stepCountN = function () { return this._steps; };
  Eng.Driver.prototype.simTimeSec = function () { return this._steps * this.dt; };

  // ENG-12：reset 后 simTime=0、步数=0、刚体回到初始摆位
  Eng.Driver.prototype.reset = function () {
    this.pause();
    for (var i = 0; i < this._bodies.length; i++) {
      var r = this._bodies[i], b0 = r.initial;
      r.body.setTransform(planck.Vec2(b0.x, b0.y), b0.angleRad);
      r.body.setLinearVelocity(planck.Vec2(b0.vx, b0.vy));
      r.body.setAngularVelocity(b0.omega);
      // 清零残余力/冲量缓存：唤醒并令其静止一小步？Planck 无显式清零 API，
      // setTransform/setVelocity 已覆盖全部积分状态（位置/角度/速度），满足 ENG-12。
      r.body.setAwake(true);
    }
    this._steps = 0;
    if (this.onReset) this.onReset();
  };

  function bodyState(rec) {
    var p = rec.body.getPosition(); // 立刻拷贝（原型坑 1）
    var v = rec.body.getLinearVelocity();
    return {
      name: rec.name,
      positionM: { x: p.x, y: p.y },
      angleRad: rec.body.getAngle(),
      velocityMps: { x: v.x, y: v.y },
      angularVelocityRadps: rec.body.getAngularVelocity()
    };
  }

  // ENG-10：快照必须为深拷贝；ENG-09：同场景同序列两次运行逐位一致
  Eng.Driver.prototype.snapshot = function () {
    var bodies = [];
    for (var i = 0; i < this._bodies.length; i++) bodies.push(bodyState(this._bodies[i]));
    return {
      stepCountN: this._steps,
      simTimeSec: this.simTimeSec(),
      dt: this.dt,
      bodies: bodies
    }; // bodyState 已逐字段拷贝为原始值，无活引用
  };

  Eng.Driver.prototype.restore = function (snap) {
    if (!snap || snap.dt !== this.dt) throw new Error('Driver.restore: 快照 dt 不匹配');
    this.pause();
    for (var i = 0; i < this._bodies.length && i < snap.bodies.length; i++) {
      var s = snap.bodies[i], rec = this._bodies[i];
      rec.body.setTransform(planck.Vec2(s.positionM.x, s.positionM.y), s.angleRad);
      rec.body.setLinearVelocity(planck.Vec2(s.velocityMps.x, s.velocityMps.y));
      rec.body.setAngularVelocity(s.angularVelocityRadps);
      rec.body.setAwake(true);
    }
    this._steps = snap.stepCountN;
  };

  Eng.Driver.prototype.state = function () {
    return this.snapshot();
  };

  // 接触查询（供斜面 ENG-24 法向约束不断言）
  Eng.Driver.prototype.touchingContacts = function () {
    var out = [];
    for (var c = this.world.getContactList(); c; c = c.getNext()) {
      if (c.isTouching()) out.push(c);
    }
    return out;
  };
})();
