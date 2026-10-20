/* ============================================================
 * Eng.ContourField —— 等高线地形原语（地理 G3 contour-3d 真值层）
 * 版本：2026.10.17.1-dev（地理试点）
 *
 * 定位：等高线 ↔ 3D 示意地形联动的解析真值。等高线一律由高程场函数
 * 程序化生成（marching squares，固定网格，线性插值），渲染层只消费
 * 读回，不重算真值（GEO-R30「图由数据驱动」）。
 *
 * 真值口径：~/workspace/geo-audit/geography-truth-criteria.md
 *   GEO-R01 凸向判读 / GEO-R05 密陡稀缓 / GEO-R06 等高距一致 /
 *   GEO-R30 等高线由真实高程函数生成 / GEO-R32 标高点自洽 /
 *   GEO-R33 3D 联动一致 / GEO-R34 水位滑块单调性 / GEO-AX01 显性化。
 * 标准测试高程场：口径 §13.1（6 高斯叠加，逻辑坐标 0–100，y 向上，米）。
 *
 * 确定性：固定网格 marching squares，无随机数、无墙钟；同参数两次
 * 运行逐位一致；file:// 与 http 双环境逐位一致（ENG-09/11）。
 * 构造要求 AX01 三字段（缺一抛错，YP-25；Eng.checkAx01）。
 * 实现 Eng.PRIMITIVE_IFACE（静态场：无时间演化，step 为空操作，
 * simTimeSec/stepCountN 恒为 0，不给假数 ENG-69）。
 * ============================================================ */
(function () {
  var Eng = window.Eng = window.Eng || {};

  var VERSION = "2026.10.17.1-dev";

  /* ---------- §13.1 标准测试高程场（地理专家队口径 v1.0 逐字） ----------
   * z(x,y) = Σ amp·exp(-((x-cx)²/sx + (y-cy)²/sy))，逻辑坐标 0–100，y 向上。
   * sy=Infinity 表示该项与 y 无关（南北走向的脊/谷/崖）。
   * 注：口径 §13.1 正文"主峰约 560m"与公式计算值（380m）不一致；
   * 以公式为准（F1 期望"标高点 ≈380m"与公式一致），已上报地理专家队裁决。
   */
  var TEST_FIELD_TERMS = [
    { amp:  420, cx: 30, cy: 0,  sx: 10,  sy: Infinity }, // ① 南北走向山脊（脊线 x=30）
    { amp:  380, cx: 70, cy: 52, sx: 22,  sy: 22     },   // ② 主峰（峰顶 (70,52)，公式值 380m）
    { amp:  260, cx: 30, cy: 78, sx: 14,  sy: 14     },   // ③ 脊上北峰（峰顶 (30,78)，680m）
    { amp:  260, cx: 30, cy: 28, sx: 14,  sy: 14     },   // ④ 脊上南峰（峰顶 (30,28)，680m）
    { amp: -300, cx: 52, cy: 0,  sx: 7,   sy: Infinity }, // ⑤ 南北走向山谷（谷线 x=52）
    { amp:  420, cx: 90, cy: 0,  sx: 1.2, sy: Infinity }  // ⑥ 东缘陡崖（x≈90 近垂直壁）
  ];

  var AX_DEFAULTS = {
    assumptions: [
      "参数化教学示意地形（6 高斯叠加解析函数），非真实 DEM",
      "逻辑坐标 0–100，y 向上；高程单位米"
    ],
    approximations: [
      "等高线由 marching squares 在固定网格上生成，格边线性插值",
      "鞍部歧义格按格心均值消歧（确定性规则，文档化）",
      "3D 示意山体为 2.5D 斜投影，非真实三维测量"
    ],
    errorEstimate: "等高线点位误差 ≤ 0.5 逻辑单位（网格半格）；换一种算法重新计算，差别不超过 1 逻辑单位"
  };

  function deepCopy(o) { return JSON.parse(JSON.stringify(o)); }
  // terms 拷贝：JSON 会吞掉 Infinity（sy=Infinity 表"与 y 无关"），此处逐字段复制
  function copyTerms(ts) {
    return ts.map(function (t) {
      return { amp: t.amp, cx: t.cx, cy: t.cy, sx: t.sx, sy: t.sy };
    });
  }

  function ContourField(opt) {
    opt = opt || {};
    if (Eng.checkAx01) Eng.checkAx01(opt, "ContourField");
    this._terms = copyTerms(opt.terms || TEST_FIELD_TERMS);
    this._interval = opt.interval || 50;            // 等高距（米）
    this._gridN = opt.gridN || 200;                // 网格分辨率（逻辑 0–100 → 格宽 0.5）
    this._bounds = { xMin: 0, xMax: 100, yMin: 0, yMax: 100 };
    this._initView = {
      waterLevel: (opt.waterLevel != null ? opt.waterLevel : -250),
      azimuthDeg: (opt.azimuthDeg != null ? opt.azimuthDeg : -35),
      selectedLevel: null
    };
    this._ax = {
      assumptions: deepCopy(opt.assumptions || AX_DEFAULTS.assumptions),
      approximations: deepCopy(opt.approximations || AX_DEFAULTS.approximations),
      errorEstimate: opt.errorEstimate || AX_DEFAULTS.errorEstimate
    };
    this._buildGrid();
    this._levelCache = {};   // level -> paths
    this.reset();
  }

  /* ---------- 真值：高程与梯度（纯函数） ---------- */

  ContourField.prototype.elevationAt = function (x, y) {
    var z = 0;
    for (var k = 0; k < this._terms.length; k++) {
      var t = this._terms[k];
      var dx = (x - t.cx), dy = (y - t.cy);
      z += t.amp * Math.exp(-(dx * dx / t.sx + dy * dy / t.sy));
    }
    return z;
  };

  ContourField.prototype.gradientAt = function (x, y) {
    var h = 0.5;
    return {
      gx: (this.elevationAt(x + h, y) - this.elevationAt(x - h, y)) / (2 * h),
      gy: (this.elevationAt(x, y + h) - this.elevationAt(x, y - h)) / (2 * h)
    };
  };

  ContourField.prototype._buildGrid = function () {
    var n = this._gridN, gz = new Float64Array((n + 1) * (n + 1));
    var zMin = Infinity, zMax = -Infinity;
    for (var j = 0; j <= n; j++) {
      for (var i = 0; i <= n; i++) {
        var z = this.elevationAt(i / n * 100, j / n * 100);
        gz[j * (n + 1) + i] = z;
        if (z < zMin) zMin = z;
        if (z > zMax) zMax = z;
      }
    }
    this._grid = gz;
    this._zMin = zMin;
    this._zMax = zMax;
  };

  /* ---------- 等高线层级 ---------- */

  // 可绘制层级：严格大于谷底渐近值（-300m 为谷底渐近值，不成线，见文件头注）
  ContourField.prototype.levels = function () {
    var iv = this._interval, out = [];
    var lo = Math.floor(this._zMin / iv) + 1, hi = Math.floor(this._zMax / iv);
    for (var k = lo; k <= hi; k++) out.push(k * iv);
    return out;
  };

  ContourField.prototype.setInterval = function (iv) {
    if (!(iv > 0)) throw new Error("ContourField: interval 必须为正数");
    this._interval = iv;
    this._levelCache = {};
    if (this._selectedLevel != null &&
        this.levels().indexOf(this._selectedLevel) < 0) this._selectedLevel = null;
    return this;
  };

  /* ---------- marching squares（确定性） ---------- */

  // 边 id：底 "h:i,j"（(i,j)-(i+1,j)），右 "v:i+1,j"，顶 "h:i,j+1"，左 "v:i,j"
  ContourField.prototype._edgePoint = function (cache, id, ax, ay, bx, by, va, vb, L) {
    var p = cache[id];
    if (!p) {
      var t = (L - va) / (vb - va);
      p = { x: ax + (bx - ax) * t, y: ay + (by - ay) * t };
      cache[id] = p;
    }
    return p;
  };

  ContourField.prototype.contourPaths = function (level) {
    var key = String(level);
    if (this._levelCache[key]) return this._levelCache[key];
    var n = this._gridN, gz = this._grid, L = level, u = 100 / n;
    var ptCache = {};   // edgeId -> {x,y}
    var segs = [];      // {a,b,pa,pb}  a/b 为边 id
    function EP(id, ax, ay, bx, by, va, vb) {
      var p = ptCache[id];
      if (!p) { var t = (L - va) / (vb - va); p = { x: ax + (bx - ax) * t, y: ay + (by - ay) * t }; ptCache[id] = p; }
      return p;
    }
    for (var j = 0; j < n; j++) {
      for (var i = 0; i < n; i++) {
        var v00 = gz[j * (n + 1) + i],       v10 = gz[j * (n + 1) + i + 1];
        var v01 = gz[(j + 1) * (n + 1) + i], v11 = gz[(j + 1) * (n + 1) + i + 1];
        var idx = (v00 >= L ? 8 : 0) | (v10 >= L ? 4 : 0) | (v11 >= L ? 2 : 0) | (v01 >= L ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        var x0 = i * u, x1 = (i + 1) * u, y0 = j * u, y1 = (j + 1) * u;
        var eB = "h:" + i + "," + j, eR = "v:" + (i + 1) + "," + j;
        var eT = "h:" + i + "," + (j + 1), eL = "v:" + i + "," + j;
        var pB = function () { return EP(eB, x0, y0, x1, y0, v00, v10); };
        var pR = function () { return EP(eR, x1, y0, x1, y1, v10, v11); };
        var pT = function () { return EP(eT, x0, y1, x1, y1, v01, v11); };
        var pL = function () { return EP(eL, x0, y0, x0, y1, v00, v01); };
        var pairs;
        switch (idx) {
          case 1: case 14: pairs = [[eL, pL, eT, pT]]; break;
          case 2: case 13: pairs = [[eT, pT, eR, pR]]; break;
          case 3: case 12: pairs = [[eL, pL, eR, pR]]; break;
          case 4: case 11: pairs = [[eB, pB, eR, pR]]; break;
          case 6: case 9:  pairs = [[eB, pB, eT, pT]]; break;
          case 7: case 8:  pairs = [[eL, pL, eB, pB]]; break;
          case 5: {
            var c = (v00 + v10 + v01 + v11) / 4;
            pairs = (c >= L) ? [[eL, pL, eB, pB], [eR, pR, eT, pT]]
                            : [[eL, pL, eT, pT], [eB, pB, eR, pR]];
            break;
          }
          case 10: {
            var c2 = (v00 + v10 + v01 + v11) / 4;
            pairs = (c2 >= L) ? [[eB, pB, eR, pR], [eL, pL, eT, pT]]
                              : [[eL, pL, eB, pB], [eR, pR, eT, pT]];
            break;
          }
          default: pairs = [];
        }
        for (var s = 0; s < pairs.length; s++) {
          segs.push({ a: pairs[s][0], pa: pairs[s][1](), b: pairs[s][2], pb: pairs[s][3]() });
        }
      }
    }
    // 按共享边串成折线（确定性：按生成顺序 walk）
    var adj = {};
    segs.forEach(function (sg, si) {
      (adj[sg.a] = adj[sg.a] || []).push(si);
      (adj[sg.b] = adj[sg.b] || []).push(si);
    });
    var used = new Array(segs.length).fill(false), paths = [];
    function otherSeg(edgeId, exclude) {
      var lst = adj[edgeId] || [];
      for (var k = 0; k < lst.length; k++) if (lst[k] !== exclude && !used[lst[k]]) return lst[k];
      return -1;
    }
    for (var s0 = 0; s0 < segs.length; s0++) {
      if (used[s0]) continue;
      used[s0] = true;
      var pts = [segs[s0].pa, segs[s0].pb], closed = false;
      var headE = segs[s0].a, tailE = segs[s0].b;
      for (;;) {
        var nx = otherSeg(tailE, -1);
        if (nx < 0) break;
        used[nx] = true;
        var sg = segs[nx];
        if (sg.a === tailE) { pts.push(sg.pb); tailE = sg.b; }
        else { pts.push(sg.pa); tailE = sg.a; }
        if (tailE === headE) { closed = true; break; }
      }
      for (;;) {
        var px2 = otherSeg(headE, -1);
        if (px2 < 0) break;
        used[px2] = true;
        var sg2 = segs[px2];
        if (sg2.a === headE) { pts.unshift(sg2.pb); headE = sg2.b; }
        else { pts.unshift(sg2.pa); headE = sg2.a; }
        if (headE === tailE) { closed = true; break; }
      }
      paths.push({ closed: closed, pts: pts });
    }
    this._levelCache[key] = paths;
    return paths;
  };

  // 水位语义（GEO-R34）：水位 W 上升时，等高线按高程从低到高逐条显现
  ContourField.prototype.contoursForWater = function (waterLevel) {
    var self = this, out = [];
    this.levels().forEach(function (lv) {
      if (lv <= waterLevel + 1e-9) out.push({ level: lv, paths: self.contourPaths(lv) });
    });
    return out;
  };

  /* ---------- 3D 示意投影（2.5D 斜投影，纯函数） ----------
   * xr = (x-50)·cosA − (y-50)·sinA
   * yr = (x-50)·sinA + (y-50)·cosA      （旋转后的"南北"轴，指向屏幕上方）
   * sx = cx + xr·S
   * sy = cy − yr·S·cosT − (z−zBase)·Z    （T 倾角默认 60°；Z 垂直像素比例，示意）
   * 深度按 yr 排序（由远及近画）。
   */
  ContourField.prototype.project3D = function (x, y, z, view) {
    var a = (view.azimuthDeg || 0) * Math.PI / 180;
    var t = (view.tiltDeg == null ? 60 : view.tiltDeg) * Math.PI / 180;
    var xr = (x - 50) * Math.cos(a) - (y - 50) * Math.sin(a);
    var yr = (x - 50) * Math.sin(a) + (y - 50) * Math.cos(a);
    return {
      sx: view.cx + xr * view.scale,
      sy: view.cy - yr * view.scale * Math.cos(t) - (z - view.zBase) * view.zScale,
      depth: yr
    };
  };

  // 地形网格（课页渲染用；返回行列数组 rows[j][i] = {x,y,z}，j=0 为南缘 y=0）
  ContourField.prototype.meshGrid = function (n) {
    n = n || 56;
    var rows = [];
    for (var j = 0; j <= n; j++) {
      var row = [];
      for (var i = 0; i <= n; i++) {
        var x = i / n * 100, y = j / n * 100;
        row.push({ x: x, y: y, z: this.elevationAt(x, y) });
      }
      rows.push(row);
    }
    return rows;
  };

  /* ---------- 视图状态 ---------- */
  ContourField.prototype.setWaterLevel = function (w) { this._waterLevel = w; return this; };
  ContourField.prototype.setAzimuth = function (deg) { this._azimuthDeg = deg; return this; };
  ContourField.prototype.selectLevel = function (lv) { this._selectedLevel = lv; return this; };

  /* ---------- Eng.PRIMITIVE_IFACE（静态场：无时间演化） ---------- */
  ContourField.prototype.step = function (n) { return this; };           // 空操作：场不随时间变
  ContourField.prototype.simTimeSec = function () { return 0; };          // 恒 0，不给假数
  ContourField.prototype.stepCountN = function () { return 0; };          // 恒 0，不给假数
  ContourField.prototype.reset = function () {
    this._waterLevel = this._initView.waterLevel;
    this._azimuthDeg = this._initView.azimuthDeg;
    this._selectedLevel = null;
    return this;
  };
  ContourField.prototype.snapshot = function () {
    return deepCopy({
      interval: this._interval, waterLevel: this._waterLevel,
      azimuthDeg: this._azimuthDeg, selectedLevel: this._selectedLevel
    });
  };
  ContourField.prototype.restore = function (s) {
    if (s.interval !== this._interval) this.setInterval(s.interval);
    this._waterLevel = s.waterLevel;
    this._azimuthDeg = s.azimuthDeg;
    this._selectedLevel = s.selectedLevel;
    return this;
  };
  ContourField.prototype.state = function () {
    return deepCopy({
      model: "gaussian-sum-6", approxTag: "参数化教学示意地形",
      terms: this._terms.length, interval: this._interval,
      zMin: +this._zMin.toFixed(6), zMax: +this._zMax.toFixed(6),
      levels: this.levels(), waterLevel: this._waterLevel,
      azimuthDeg: this._azimuthDeg, selectedLevel: this._selectedLevel,
      stepCountN: 0, simTimeSec: 0,
      ax: this._ax
    });
  };

  ContourField.VERSION = VERSION;
  ContourField.TEST_FIELD_TERMS = function () { return copyTerms(TEST_FIELD_TERMS); };
  ContourField.AX_DEFAULTS = function () { return deepCopy(AX_DEFAULTS); };
  // 已知特征（口径 §13.2，供课页标注与白队抽查；坐标为逻辑坐标）
  ContourField.KNOWN_FEATURES = function () {
    return [
      { id: "peak",   kind: "peak",   x: 70, y: 52, label: "山顶", note: "标高点 ≈380m" },
      { id: "ridge",  kind: "ridge",  x: 30, y: 55, label: "山脊", note: "等高线向低处凸" },
      { id: "valley", kind: "valley", x: 52, y: 55, label: "山谷", note: "等高线向高处凸" },
      { id: "saddle", kind: "saddle", x: 30, y: 53, label: "鞍部", note: "两峰之间的马鞍形过渡带" },
      { id: "cliff",  kind: "cliff",  x: 90, y: 52, label: "陡崖", note: "等高线重合——楼层叠在一起" }
    ];
  };

  Eng.ContourField = ContourField;
})();
