/* 基础引擎层 · input.js
 * 输入统一层（ENG-55 ~ ENG-58）：鼠标/触控同一语义（Konva pointer 事件统一），
 * 可点目标命中区 ≥44px 内置（ENG-56），拖拽落点 = 读回位置（ENG-57）。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng || !Eng.KonvaView) throw new Error('input.js 需要 core.js/konva-view.js');
  if (!window.Konva) throw new Error('input.js 需要 Konva');

  Eng.HIT_MIN_PX = 44; // ENG-56 / YP-07：命中区最小边 ≥44px

  Eng.Input = function (view) {
    if (!view || !view.stage) throw new Error('Input: 需要 Eng.KonvaView 实例');
    this.view = view;
    this._tapCount = 0;
    this._downPos = null;
    var self = this;
    // ENG-55：pointerdown/move/up 统一处理鼠标与触控（Konva 已归一化 pointer 事件）
    view.stage.on('pointerdown', function (e) {
      var p = view.stage.getPointerPosition();
      self._downPos = p ? { x: p.x, y: p.y } : null;
      if (self.onPointerDown) self.onPointerDown(p, e);
    });
    view.stage.on('pointerup', function (e) {
      var p = view.stage.getPointerPosition();
      if (self.onPointerUp) self.onPointerUp(p, e);
      // tap 语义：down/up 落点接近即视为一次 tap（鼠标 click 与触控 tap 同一回调）
      if (self._downPos && p) {
        var d = Math.hypot(p.x - self._downPos.x, p.y - self._downPos.y);
        if (d <= 10) {
          self._tapCount++;
          if (self.onTap) self.onTap(p, e);
        }
      }
      self._downPos = null;
    });
    var ax = Eng.checkAx01({ assumptions: ['Konva pointer 事件已统一鼠标/触控坐标'], approximations: ['无'], errorEstimate: '落点像素精度；逻辑换算按 ENG-03 限' }, 'Input');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };

  Eng.Input.prototype.tapCount = function () { return this._tapCount; };

  // ENG-56：为 node 配 ≥44px 命中区。返回 {hit, padX, padY}；
  // 若视觉已 ≥44px 返回 {hit:null}（无需扩展）。
  Eng.ensureHitArea = function (node, minPx) {
    minPx = minPx || Eng.HIT_MIN_PX;
    var box = node.getClientRect(); // 绝对坐标
    var padX = Math.max(0, (minPx - box.width) / 2);
    var padY = Math.max(0, (minPx - box.height) / 2);
    if (padX <= 0 && padY <= 0) return { hit: null, padX: 0, padY: 0 };
    var hit = new Konva.Rect({
      x: box.x - padX, y: box.y - padY,
      width: box.width + padX * 2, height: box.height + padY * 2,
      fill: 'rgba(0,0,0,0)', listening: true, name: 'eng-hitarea'
    });
    node.getParent().add(hit);
    hit.moveToBottom();
    return { hit: hit, padX: padX, padY: padY };
  };

  // 绑定拖拽：node（Konva 节点）可拖；onEnd(logical{x,y}, pixel{x,y})
  // ENG-57：拖拽落点 = 读回位置（读回经 mapper 换算，偏差 ≤ ENG-03 限）
  Eng.Input.prototype.bindDrag = function (node, opt) {
    opt = opt || {};
    var view = this.view;
    var area = opt.hitMinPx === 0 ? { hit: null } : Eng.ensureHitArea(node, opt.hitMinPx || Eng.HIT_MIN_PX);
    var handle = area.hit || node; // 命中区存在时由它做拖拽手柄
    var self = this;

    function nodeAbs() { return node.getAbsolutePosition(); }
    function fireEnd() {
      var p = nodeAbs();
      var logical = view.pixelToLogical(p.x, p.y);
      var px = { x: p.x, y: p.y };
      if (opt.onEnd) opt.onEnd(logical, px);
      if (self.onDragEnd) self.onDragEnd(logical, px);
    }

    if (area.hit) {
      var hit = area.hit, last = null;
      hit.draggable(true);
      hit.on('dragstart', function () { last = { x: hit.x(), y: hit.y() }; });
      hit.on('dragmove', function () {
        var cur = { x: hit.x(), y: hit.y() };
        var dx = cur.x - last.x, dy = cur.y - last.y;
        last = cur;
        node.x(node.x() + dx);
        node.y(node.y() + dy);
        var nb = node.getClientRect();
        hit.position({ x: nb.x - area.padX, y: nb.y - area.padY });
        view.layer.batchDraw();
      });
      hit.on('dragend', fireEnd);
      // 直接点中视觉节点本身也能拖（与手柄同一语义）
      node.draggable(true);
      node.on('dragmove', function () {
        var nb = node.getClientRect();
        hit.position({ x: nb.x - area.padX, y: nb.y - area.padY });
      });
      node.on('dragend', fireEnd);
    } else {
      node.draggable(true);
      node.on('dragend', fireEnd);
    }
    return { node: node, hit: area.hit || null };
  };

  // ENG-58：命中测试（Konva 自动命中；inTarget 与视觉一致）
  Eng.Input.prototype.hitTest = function (px, py) {
    var target = this.view.stage.getIntersection({ x: px, y: py });
    return target || null;
  };
})();
