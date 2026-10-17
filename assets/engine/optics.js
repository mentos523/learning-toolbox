/* 基础引擎层 · optics.js
 * 光路原语 Eng.Optics（ENG-67 落地实现，2026-10-17 · 物理推广批2）。
 * 选型裁决见 docs/optics-selection-decision.md：不吸收 Ray Optics Simulation 内核，
 * 自研纯几何实现——薄透镜/平面镜/折射/小孔成像均为闭式解析，天然精确、可逐位断言。
 * 真值口径：~/workspace/phy-audit/optics-truth-criteria.md（OPT-L/M/R/P）。
 *
 * 设计要点：
 *  - 纯函数，无 DOM/Konva 依赖；Node（无 DOM）下只需 core.js 即可被
 *    tools/qa-optics-truth.mjs 独立断言（ENG-64 数据驱动：图=render(数据)）。
 *  - 坐标系：调用方逻辑坐标（课页为 SVG 逻辑单位，y 向下）；角度一律自法线起算。
 *  - 非法输入抛错（ENG-66），不支持的物理情形诚实返回（ENG-69：全反射 tir:true 不给假数）。
 *  - 确定性：同输入逐位一致（ENG-70）。
 *  - AX01：构造器必填 assumptions/approximations/errorEstimate（Eng.checkAx01）；
 *    AX_DEFAULTS 提供可直接引用的原文（YP-27），课页文案学生语言版见 p02 各页。
 * 代码风格：经典 script、无构建、file:// 可跑、'use strict'、防御性拷贝。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng || !Eng.checkAx01) throw new Error('optics.js 需要先加载 core.js（Eng.checkAx01）');

  var VERSION = '2026.10.17.3';

  /* ================= AX01 默认文本（YP-27：课页可直接引用原文） ================= */
  var AX_DEFAULTS = {
    assumptions: [
      '薄透镜近似：透镜厚度忽略不计，只按"一个平面"算折射',
      '近轴光线：三条特殊光线作图法只在光线与主光轴夹角很小时成立',
      '光线是模型：忽略光的波动性（见 p02.1.1-p2"光线是个模型"模型三问）',
      '平面镜为理想平面；折射界面为理想平面、介质均匀',
      '折射率取示意值：n空气=1，n水=1.33'
    ],
    approximations: [
      '小孔成像按几何直线传播，未计衍射（孔过小反而模糊）',
      '小孔孔径→光线粗细（亮度）为示意映射，不是光度学计算',
      'u=f 判定带 ±0.5（逻辑单位）：防拖拽边界抖动，带内一律按"不成像"处理'
    ],
    errorEstimate: '纯解析闭式计算，无数值积分误差；读数误差仅来自 ENG-38 估读（末位 ±1 个估读单位）；SVG 绘制坐标保留 1 位小数，角度断言容差 ≤1°'
  };

  function isNum(v) { return typeof v === 'number' && isFinite(v); }
  function reqNum(o, k, what) {
    if (!o || !isNum(o[k])) throw new Error('Eng.Optics: ' + what + '."' + k + '" 非法（须为有限数）');
    return o[k];
  }
  function reqArr(o, k, what) {
    if (!o || !Array.isArray(o[k]) || o[k].length === 0)
      throw new Error('Eng.Optics: ' + what + '."' + k + '" 非法（须为非空数组）');
    return o[k];
  }
  function seg(x1, y1, x2, y2) { return { x1: x1, y1: y1, x2: x2, y2: y2 }; }
  function pt(x, y) { return { x: x, y: y }; }
  var D2R = Math.PI / 180, R2D = 180 / Math.PI;

  /* ================= 透镜（凸透镜，三条特殊光线） =================
   * o: { lensX, f>0, objX(<lensX), objTopY, axisY, rays:['parallel','center','focus'], xEnd }
   * 返回 { u, v(Infinity 表不成像), kind:'real'|'virtual'|'none', m, imageNature,
   *        imageTip|null, focusPts(只读), rays:[{name, segments[], degenerate}],
   *        badgeText, humanText }
   */
  function solveLens(o) {
    var lensX = reqNum(o, 'lensX', 'solveLens'), f = reqNum(o, 'f', 'solveLens');
    var objX = reqNum(o, 'objX', 'solveLens'), objTopY = reqNum(o, 'objTopY', 'solveLens');
    var axisY = reqNum(o, 'axisY', 'solveLens');
    if (!(f > 0)) throw new Error('Eng.Optics.solveLens: f 须 > 0（本原语只做凸透镜）');
    if (!(objX < lensX)) throw new Error('Eng.Optics.solveLens: 物须在透镜左侧（objX < lensX）');
    var rays = o.rays || ['parallel', 'center', 'focus'];
    var xEnd = isNum(o.xEnd) ? o.xEnd : 96;

    var u = lensX - objX;
    var v, kind;
    if (Math.abs(u - f) < 0.5) { v = Infinity; kind = 'none'; }   /* OPT-L04：u=f 不成像 */
    else { v = 1 / (1 / f - 1 / u); kind = v > 0 ? 'real' : 'virtual'; }
    var m = isFinite(v) ? -v / u : 0;
    var am = Math.abs(m);
    /* OPT-L01~L05 / 裁决 A 三态边界 */
    var imageNature = kind === 'none' ? '不成像（u=f）'
      : kind === 'virtual' ? '正立放大虚像'
      : am < 0.95 ? '倒立缩小实像' : am <= 1.05 ? '倒立等大实像' : '倒立放大实像';
    /* OPT-L06：像顶 = 主光轴 + (物顶−主光轴)×m（实像 m<0 → 异侧倒立；虚像 m>0 → 同侧正立） */
    var imageTip = kind === 'none' ? null : pt(lensX + v, axisY + (objTopY - axisY) * m);

    var out = [];
    var i, name;
    for (i = 0; i < rays.length; i++) {
      name = rays[i];
      if (name === 'parallel') {
        /* 平行主光轴 → 过远侧焦点 */
        var slopeP = (axisY - objTopY) / f;
        out.push({ name: 'parallel', degenerate: false, segments: [
          seg(objX, objTopY, lensX, objTopY),
          seg(lensX, objTopY, xEnd, objTopY + slopeP * (xEnd - lensX))
        ]});
      } else if (name === 'center') {
        /* 过光心直进 */
        var slopeC = (axisY - objTopY) / (lensX - objX);
        out.push({ name: 'center', degenerate: false, segments: [
          seg(objX, objTopY, xEnd, objTopY + slopeC * (xEnd - objX))
        ]});
      } else if (name === 'focus') {
        /* 过近侧焦点 → 平行射出；OPT-L08：u=f 时物顶恰在近侧焦点正上方，
         * 光线与镜面平行永不相交，标退化、不画脏线（旧实现 Infinity 脏线 bug） */
        if (kind === 'none') {
          out.push({ name: 'focus', degenerate: true, segments: [] });
        } else {
          var yAtLens = objTopY + (axisY - objTopY) / ((lensX - f) - objX) * (lensX - objX);
          out.push({ name: 'focus', degenerate: false, segments: [
            seg(objX, objTopY, lensX, yAtLens),
            seg(lensX, yAtLens, xEnd, yAtLens)
          ]});
        }
      } else {
        throw new Error('Eng.Optics.solveLens: 未知光线 "' + name + '"（只认 parallel/center/focus）');
      }
    }

    var humanText = kind === 'none' ? '物正好在焦点上：折射光线平行，交不到一起'
      : kind === 'virtual' ? '像跑到物体这边来了——这就是放大镜的秘密'
      : am < 0.95 ? '像比物体小、倒过来了'
      : am <= 1.05 ? '像和物体一样大、倒过来了' : '像比物体大、倒过来了';
    return {
      u: u, v: v, kind: kind, m: m, imageNature: imageNature, imageTip: imageTip,
      focusPts: [pt(lensX - f, axisY), pt(lensX + f, axisY)], /* OPT-L07：只读标记数据 */
      rays: out,
      badgeText: imageNature + (kind === 'virtual' ? '（虚像用虚线画，因为光线没真交于那）' : ''),
      humanText: humanText
    };
  }

  /* ================= 平面镜 =================
   * o: { mirrorX, fromX(<mirrorX), fromY, hitX(=mirrorX), hitY }
   * 镜面竖直：反射 = 水平分量反向、竖直分量不变（F14–F15 口径）。
   * 返回 { iDeg, rDeg, incident{from,to}, reflected{from,to}, virtualExt{from,to},
   *        imageX, imageDist, imageNature }
   */
  function solveMirror(o) {
    var mirrorX = reqNum(o, 'mirrorX', 'solveMirror');
    var fromX = reqNum(o, 'fromX', 'solveMirror'), fromY = reqNum(o, 'fromY', 'solveMirror');
    var hitX = reqNum(o, 'hitX', 'solveMirror'), hitY = reqNum(o, 'hitY', 'solveMirror');
    if (!(fromX < mirrorX)) throw new Error('Eng.Optics.solveMirror: 物须在镜面左侧（fromX < mirrorX）');
    if (Math.abs(hitX - mirrorX) > 1e-9)
      throw new Error('Eng.Optics.solveMirror: 击中点须在镜面上（hitX = mirrorX）');
    var dx = hitX - fromX, dy = hitY - fromY;
    if (dx <= 0) throw new Error('Eng.Optics.solveMirror: 入射光线须射向镜面（dx > 0）');
    /* OPT-M01：入射角/反射角自法线（水平）起算，构造保证 i = r */
    var iDeg = Math.atan2(Math.abs(dy), dx) * R2D;
    var rDeg = iDeg;
    var imageX = 2 * mirrorX - fromX;
    return {
      iDeg: iDeg, rDeg: rDeg,
      incident: { from: pt(fromX, fromY), to: pt(hitX, hitY) },
      reflected: { from: pt(hitX, hitY), to: pt(hitX - dx, hitY + dy) },
      virtualExt: { from: pt(hitX, hitY), to: pt(imageX, fromY) },
      imageX: imageX, imageDist: Math.abs(mirrorX - fromX),
      imageNature: '正立等大虚像'   /* OPT-M02 */
    };
  }

  /* ================= 折射（斯涅尔定律） =================
   * o: { iDeg(0–90), n1>0, n2>0, label1, label2 }
   * 返回 { iDeg, rDeg(null 表全反射), tir, incidentUnit, refractedUnit,
   *        stateText, bentTowardNormal }
   * 单位向量按 SVG 逻辑坐标（y 向下）：入射段自击中点指回空气，折射段自击中点指入介质。
   */
  function solveRefraction(o) {
    var iDeg = reqNum(o, 'iDeg', 'solveRefraction');
    var n1 = reqNum(o, 'n1', 'solveRefraction'), n2 = reqNum(o, 'n2', 'solveRefraction');
    if (!(iDeg >= 0 && iDeg <= 90)) throw new Error('Eng.Optics.solveRefraction: iDeg 须在 0–90° 内');
    if (!(n1 > 0 && n2 > 0)) throw new Error('Eng.Optics.solveRefraction: n1/n2 须 > 0');
    var label1 = o.label1 || '空气', label2 = o.label2 || '水';
    var i = iDeg * D2R;
    var sArg = n1 * Math.sin(i) / n2;
    if (sArg > 1) {
      /* OPT-R06：全反射，诚实返回，不给假数（ENG-69） */
      return { iDeg: iDeg, rDeg: null, tir: true, incidentUnit: pt(-Math.sin(i), -Math.cos(i)),
               refractedUnit: null, bentTowardNormal: false,
               stateText: '发生全反射：光被"关"在' + label1 + '里了', badge: null };
    }
    var r = Math.asin(Math.min(1, sArg)), rDeg = r * R2D;
    var stateText = iDeg === 0 ? '垂直入射：不偏折（i = r = 0）'   /* OPT-R03 */
      : '光从' + label1 + '斜射入' + label2 + '：' +
        (rDeg < iDeg ? '向法线偏折（r < i）' : '偏离法线（r > i）');   /* OPT-R05 */
    return {
      iDeg: iDeg, rDeg: rDeg, tir: false,
      incidentUnit: pt(-Math.sin(i), -Math.cos(i)),
      refractedUnit: pt(Math.sin(r), Math.cos(r)),
      bentTowardNormal: rDeg < iDeg,
      stateText: stateText
    };
  }

  /* ================= 小孔成像 =================
   * o: { objX, objTopY, objBaseY, holeX, holeY, scrX, aperture }
   * 过孔心两条光线（物顶→像底、物底→像顶）；m = 像距/物距。
   * 返回 { u, v, m, zoomWord, blur, stateText, imgTopY, imgBottomY,
   *        rays:[{name, segments[]}] }
   */
  function solvePinhole(o) {
    var objX = reqNum(o, 'objX', 'solvePinhole');
    var objTopY = reqNum(o, 'objTopY', 'solvePinhole'), objBaseY = reqNum(o, 'objBaseY', 'solvePinhole');
    var holeX = reqNum(o, 'holeX', 'solvePinhole'), holeY = reqNum(o, 'holeY', 'solvePinhole');
    var scrX = reqNum(o, 'scrX', 'solvePinhole'), aperture = reqNum(o, 'aperture', 'solvePinhole');
    if (!(objX < holeX && holeX < scrX))
      throw new Error('Eng.Optics.solvePinhole: 须 objX < holeX < scrX（物—孔—屏从左到右）');
    if (!(objTopY < objBaseY)) throw new Error('Eng.Optics.solvePinhole: 须 objTopY < objBaseY');
    var u = holeX - objX, v = scrX - holeX, m = v / u;
    var imgH = (objBaseY - objTopY) * m;
    var imgTopY = holeY - imgH / 2, imgBottomY = holeY + imgH / 2;
    var blur = aperture > 3.5;   /* OPT-P06：> 3.5 模糊，= 3.5 不警告 */
    var zoomWord = m < 1 ? '缩小' : m > 1 ? '放大' : '等大';   /* OPT-P07 */
    return {
      u: u, v: v, m: m, zoomWord: zoomWord, blur: blur,
      stateText: '倒立的实像' + (blur ? '（孔太大：变亮但变模糊）' : '（孔小：暗但清晰）'),
      imgTopY: imgTopY, imgBottomY: imgBottomY,
      rays: [
        { name: 'top', segments: [seg(objX, objTopY, scrX, imgBottomY)] },    /* 物顶→像底 */
        { name: 'base', segments: [seg(objX, objBaseY, scrX, imgTopY)] }      /* 物底→像顶 */
      ]
    };
  }

  /* ================= 对外 API ================= */
  function ax() { return Eng.checkAx01(AX_DEFAULTS, 'Optics'); }

  Eng.Optics = {
    VERSION: VERSION,
    solveLens: solveLens,
    solveMirror: solveMirror,
    solveRefraction: solveRefraction,
    solvePinhole: solvePinhole,
    ax: ax,
    AX_DEFAULTS: AX_DEFAULTS
  };
})();
