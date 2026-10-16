/* 基础引擎层 · steps.js
 * 分步播放器（ENG-59 ~ ENG-63）：WeduLab"作图时间轴回放"的落地。
 *  - next()/prev()/replay()；prev() 回到精确快照（环形快照缓冲 + 确定性重放兜底）
 *  - frameIndex/totalFrames 读回；frameIndex = stepCount/stepsPerFrame（ENG-61）
 *  - 每步 stepSummary 一句话结论位（YP-22）
 *  - setSpeed(r)：只改变 wall-time 步数，不改变 dt（ENG-63）
 *  - 教学语义：步前预测钩子（YP-19）、后退/重播不清空学生数据（YP-20/21）、
 *    默认步进（YP-23）、键盘可达（YP-11）、与驱动器同一套语义（YP-24）
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng) throw new Error('steps.js 需要 core.js');

  Eng.StepPlayer = function (opt) {
    opt = opt || {};
    if (!opt.primitive) throw new Error('StepPlayer: 必须传入 primitive（实现 step/reset/snapshot/restore/simTimeSec/stepCountN）');
    this.primitive = opt.primitive;
    this.stepsPerFrame = opt.stepsPerFrame !== undefined ? opt.stepsPerFrame : 1; // YP-23 默认点一下走一步
    if (this.stepsPerFrame !== Math.floor(this.stepsPerFrame) || this.stepsPerFrame < 1) {
      throw new Error('StepPlayer: stepsPerFrame 必须为 ≥1 的整数');
    }
    this.totalFrames = opt.totalFrames !== undefined ? opt.totalFrames : 60;
    // YP-22：每步一句话结论位（独立成句、可复述）
    this.summaries = opt.stepSummaries || [];
    for (var i = 0; i < this.totalFrames; i++) {
      if (typeof this.summaries[i] !== 'string' || this.summaries[i].trim().length === 0) {
        throw new Error('StepPlayer: 第 ' + i + ' 步缺少 stepSummary 一句话结论（YP-22）');
      }
    }
    this._frame = 0;
    this._maxFrame = 0;
    this._buffer = [Eng.deepCopy(this.primitive.snapshot())]; // 第 0 帧快照
    this._speed = 1;
    this.onBeforeNext = opt.onBeforeNext || null; // YP-19：步前预测钩子（课页配"先想一想"）
    this.onFrame = opt.onFrame || null;
    var ax = Eng.checkAx01(opt, 'StepPlayer');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };

  Eng.StepPlayer.prototype.frameIndex = function () { return this._frame; };
  Eng.StepPlayer.prototype.totalFramesCount = function () { return this.totalFrames; };
  Eng.StepPlayer.prototype.stepSummary = function (i) {
    if (i === undefined) i = this._frame;
    return this.summaries[i];
  };

  // ENG-59：next() 前进一步 = 驱动器 step(stepsPerFrame)
  Eng.StepPlayer.prototype.next = function () {
    if (this._frame >= this.totalFrames) return this._frame; // 到末帧停住
    if (this.onBeforeNext) this.onBeforeNext(this._frame); // YP-19 预测位
    this._frame++;
    if (this._frame > this._maxFrame) {
      this.primitive.step(this.stepsPerFrame);
      this._buffer[this._frame] = Eng.deepCopy(this.primitive.snapshot());
      this._maxFrame = this._frame;
    } else {
      this.primitive.restore(this._buffer[this._frame]); // 确定性重放兜底
    }
    if (this.onFrame) this.onFrame(this._frame);
    return this._frame;
  };

  // ENG-59：prev() 必须回到上一帧的精确快照
  Eng.StepPlayer.prototype.prev = function () {
    if (this._frame <= 0) return this._frame;
    this._frame--;
    this.primitive.restore(this._buffer[this._frame]);
    if (this.onFrame) this.onFrame(this._frame);
    return this._frame;
  };

  Eng.StepPlayer.prototype.gotoFrame = function (i) {
    i = Math.max(0, Math.min(this.totalFrames, Math.floor(i)));
    while (this._frame < i) this.next();
    while (this._frame > i) this.prev();
    return this._frame;
  };

  // ENG-60：replay() = reset() + 按记录步数 step 到末帧；末帧快照逐位一致
  Eng.StepPlayer.prototype.replay = function () {
    var target = this._maxFrame;
    this.primitive.reset();
    this._frame = 0;
    this._maxFrame = 0;
    this._buffer = [Eng.deepCopy(this.primitive.snapshot())];
    this.gotoFrame(target); // YP-21：数据坞不动（player 不碰 dock）
    return this._frame;
  };

  Eng.StepPlayer.prototype.resetAll = function () {
    this.primitive.reset();
    this._frame = 0;
    this._maxFrame = 0;
    this._buffer = [Eng.deepCopy(this.primitive.snapshot())];
  };

  // ENG-63：慢放只改变单位 wall-time 步数
  Eng.StepPlayer.prototype.setSpeed = function (r) {
    if (!(r > 0 && r <= 1)) throw new Error('StepPlayer.setSpeed: r 必须在 (0,1] 内');
    this._speed = r;
    if (this.primitive.setSpeed) this.primitive.setSpeed(r);
  };
  Eng.StepPlayer.prototype.speed = function () { return this._speed; };

  // YP-11：键盘可达（←→ 步进，空格 播放/暂停，R 重播），焦点可见由课页样式负责
  Eng.StepPlayer.prototype.bindKeys = function (element) {
    var el = element || document;
    var self = this;
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { self.next(); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { self.prev(); e.preventDefault(); }
      else if (e.key === ' ' || e.key === 'Spacebar') {
        if (self.primitive.isPlaying && self.primitive.isPlaying()) self.primitive.pause();
        else if (self.primitive.play) self.primitive.play();
        e.preventDefault();
      }
      else if (e.key === 'r' || e.key === 'R') { self.replay(); }
    });
  };

  // ENG-61 整除断言用
  Eng.StepPlayer.prototype.frameStepRelationOk = function () {
    return this._frame * this.stepsPerFrame === this.primitive.stepCountN();
  };

  // ENG-62：播放器帧快照 = 驱动器同一步数快照（调用方对比）
  Eng.StepPlayer.prototype.frameSnapshot = function (i) {
    if (i === undefined) i = this._frame;
    return Eng.deepCopy(this._buffer[i]);
  };
})();
