/* 基础引擎层 · circuit.js
 * 电路原语 Eng.Circuit（ENG-68：显式拓扑 + 串并联公式直算求解器）与配套 Konva 交互层 Eng.CircuitUI。
 * 对应设计：~/workspace/circuit-build/design/CIRCUIT-DESIGN.md v1.0；
 * 真值口径：~/workspace/circuit-build/design/circuit-truth-criteria.md（CIR-01~48）。
 *
 *  - 求解器是纯函数 Eng.Circuit.solve(elements, topology, contract) → result，
 *    9 步算法（归一化→合法性→导通图→短路/烧表判据→串并联归约→回溯分流分压→仪表读数→深拷贝快照），
 *    每步 reductionLog 记录中间态。
 *  - 构造器 Eng.Circuit(opt) 工厂/构造函数两种调用均可；读回 API 与 ENGINE.md §6.2 ENG-68 同名：
 *    nodeVoltageV / branchCurrentA / ammeterReadA / voltmeterReadV（走 ENG-38 Eng.estimateReading）。
 *  - 不可串并联归约的拓扑（电桥/Δ形，NC-1）与多电源（NC-2）诚实返回 unsupported，不给假数（ENG-69）。
 *  - 渲染层 Eng.CircuitUI 与求解核心解耦：UI 只消费 ckt.snapshot()，求解不依赖 DOM/Konva；
 *    纯函数可独立测试（Node/无 DOM 环境只需 core.js + meters.js）。
 * 代码风格：经典 script、无构建、file:// 可跑、'use strict'、防御性拷贝、防卫式抛错（ENG-66）。
 *
 * 与设计文档的偏离注记（实现中发现的必要细化，详见各处行内注释）：
 *  D1. Step 4（烧表）先于 Step 3（短路）执行：否则单回路"电流表并联在灯泡两端"会被
 *      Step 3 字面规则判 short，与 CIR-03/CIR-45（明确要求 burned）冲突。步骤编号保留设计原序。
 *  D2. Step 4 字面规则（"去表后两端点经含电源/用电器路径连通即烧表"）在新节点模型下会
 *      对串联表误判（CIR-01 三处串联表恒触发；旧代码靠 hasBranch 分支守卫规避），细化为
 *      三子规则：(1)串联排除 (2)Rth 零阻检验 (3)Vth 零压检验（Thevenin 等效思想）。
 *  D3. Step 1"开关端点度为 0"按"除自身边之外的他边度"计：构造期每个元件恰好一条 connection，
 *      原始度永不为 0；"悬空"的精确语义是端点未真实连入电路其余部分。
 *  D4. Step 5.5 剪枝（设计未明示）：source 连通分支之外的死边 + 叶节点悬空边先剪除，
 *      否则 CIR-43 类"回路外元件"会让归约停滞而误判 unsupported。
 *  D5. 开路零阻电势继承 / 电压表桥接检查的 BFS 排除电源边自身：r=0 时源边零阻，
 *      不排除会导致 n−/n+ 连通、电势冲突与桥接误判。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng || !Eng.checkAx01) throw new Error('circuit.js 需要先加载 core.js（Eng.checkAx01）');
  if (!Eng.estimateReading) throw new Error('circuit.js 需要先加载 meters.js（Eng.estimateReading，ENG-38）');

  /* ================= 0. 常量与默认数据契约 ================= */

  /* V8 字号阶梯（2026-10-17 物理收尾修复批）：与课页层 phyV8Snap 同口径
   *（阶梯 {12.48,13.6,15.2,16,16.8,20,24}，容差 0.5px；渲染字号已在容差内
   * 则原值返回，否则吸附到最近一档）。circuit.js 为引擎层文件，课页层的
   * phyV8Snap 在物理 IIFE 内不可见，故此处自备同口径 helper，不跨层引用。 */
  var V8_LADDER = [12.48, 13.6, 15.2, 16, 16.8, 20, 24];
  function cirV8Snap(px) {
    var best = V8_LADDER[0], bd = Math.abs(px - best), i, d;
    for (i = 1; i < V8_LADDER.length; i++) {
      d = Math.abs(px - V8_LADDER[i]);
      if (d < bd) { bd = d; best = V8_LADDER[i]; }
    }
    return bd <= 0.5 ? px : best;
  }

  // §7 默认文本：构造必填（调用方传入；可增补、不可删除）。UI 层默认传入本对象。
  var AX_DEFAULTS = {
    assumptions: [
      '导线电阻视为 0（理想导线）',
      '电流表内阻视为 0（初中教学约定）',
      '电压表内阻视为无穷大（理想电压表）',
      '电源电动势恒定，不随负载变化（理想电源近似）',
      '灯泡、电阻的阻值视为常量，不随温度变化'
    ],
    approximations: [
      '集总参数模型：忽略导线的分布参数与电磁辐射',
      '直流稳态：忽略开关闭合瞬间的暂态过程'
    ],
    errorEstimate: '纯解析公式直算，无数值积分误差；读数误差仅来自 ENG-38 估读（末位 ±1 个估读单位）'
  };

  var ELEMENT_TYPES = ['source', 'resistor', 'bulb', 'switch', 'wire', 'ammeter', 'voltmeter', 'rheostat'];

  // 教学文案（§8.8 红线：沿用旧版措辞，不放宽）
  var TXT_SHORT = '短路！电流过大';
  var TXT_SHORT_WHY = '短路电流很大，会烧坏电源';
  var TXT_BURNED = '⚠ 烧表警告：电流表内阻极小，并联会近乎短路，大电流烧表——电流表只能串联，绝不并联';
  var TXT_VOLT_BLOCK = '电压表内阻极大，理想时看作断路——只能并联在用电器两端，串进回路等于把路断开';
  var TXT_OVER_RANGE = '超出量程（试触应选大量程）';
  var TXT_UNSUPPORTED = '该接法超出本工具计算范围（竞赛级拓扑），换一种串/并联接法试试';
  var TXT_SWITCH_OPEN = '开关没闭合';

  function fail(msg) { throw new Error('Eng.Circuit: ' + msg); }
  function isNum(v) { return typeof v === 'number' && isFinite(v); }

  /* ================= 1. 元件归一化（§2.1 schema + §5 别名） ================= */

  // 单个元件校验与归一化（防御性拷贝输入；非法即抛错，ENG-66）
  function normOneElement(raw, autoId) {
    if (!raw || typeof raw !== 'object') fail('元件非法（须为对象）');
    var type = raw.type;
    if (ELEMENT_TYPES.indexOf(type) < 0) fail('未知元件类型 "' + type + '"');
    var id = raw.id != null ? String(raw.id) : autoId;
    if (!id) fail('元件 id 非法');
    var n = { id: id, type: type };
    if (type === 'source') {
      var hasEmf = raw.emfV != null, hasVolt = raw.voltageV != null;
      if (hasEmf && hasVolt && raw.emfV !== raw.voltageV)
        fail('source "' + id + '" emfV 与 voltageV 不一致（不许静默二选一，§5）');
      var emf = hasEmf ? raw.emfV : raw.voltageV;
      if (!(emf > 0)) fail('source "' + id + '" emfV 必须 >0（voltageV 别名亦可）');
      n.emfV = emf;
      n.internalROhm = raw.internalROhm != null ? raw.internalROhm : 0;
      if (!(n.internalROhm >= 0)) fail('source "' + id + '" internalROhm 必须 ≥0');
    } else if (type === 'resistor') {
      if (!(raw.resistanceOhm > 0)) fail('resistor "' + id + '" resistanceOhm 必填且 >0');
      n.resistanceOhm = raw.resistanceOhm;
    } else if (type === 'bulb') {
      n.resistanceOhm = raw.resistanceOhm != null ? raw.resistanceOhm : 12;
      if (!(n.resistanceOhm > 0)) fail('bulb "' + id + '" resistanceOhm 必须 >0');
    } else if (type === 'switch') {
      n.closed = raw.closed === true; // 默认断开（保持现有课行为，§2.1）
    } else if (type === 'wire') {
      if ((raw.from != null) !== (raw.to != null)) fail('wire "' + id + '" from/to 须成对出现');
      if (raw.from != null) { n.from = String(raw.from); n.to = String(raw.to); }
    } else if (type === 'ammeter') {
      n.rangeMaxA = raw.rangeMaxA != null ? raw.rangeMaxA : 3;
      if (n.rangeMaxA !== 0.6 && n.rangeMaxA !== 3)
        fail('ammeter "' + id + '" rangeMaxA 须为 0.6 或 3');
      // ENG-38 表：0.6A→division 0.02；3A→division 0.1
      n.divisionA = raw.divisionA != null ? raw.divisionA : (n.rangeMaxA === 0.6 ? 0.02 : 0.1);
      if (!(n.divisionA > 0)) fail('ammeter "' + id + '" divisionA 必须为正');
    } else if (type === 'voltmeter') {
      n.rangeMaxV = raw.rangeMaxV != null ? raw.rangeMaxV : 15;
      if (n.rangeMaxV !== 3 && n.rangeMaxV !== 15)
        fail('voltmeter "' + id + '" rangeMaxV 须为 3 或 15');
      // ENG-38 表：3V→division 0.1；15V→division 0.5
      n.divisionV = raw.divisionV != null ? raw.divisionV : (n.rangeMaxV === 3 ? 0.1 : 0.5);
      if (!(n.divisionV > 0)) fail('voltmeter "' + id + '" divisionV 必须为正');
      if (raw.probeNodes != null) {
        if (!Array.isArray(raw.probeNodes) || raw.probeNodes.length !== 2)
          fail('voltmeter "' + id + '" probeNodes 须为 [nodeA, nodeB]');
        n.probeNodes = [String(raw.probeNodes[0]), String(raw.probeNodes[1])];
      } else {
        n.probeNodes = null;
      }
    } else if (type === 'rheostat') {
      n.minOhm = raw.minOhm != null ? raw.minOhm : 0;
      n.maxOhm = raw.maxOhm != null ? raw.maxOhm : 50;
      n.fraction = raw.fraction != null ? raw.fraction : 1;
      if (!(n.minOhm >= 0)) fail('rheostat "' + id + '" minOhm 必须 ≥0');
      if (!(n.maxOhm > n.minOhm)) fail('rheostat "' + id + '" maxOhm 必须 > minOhm');
      if (!(n.fraction >= 0 && n.fraction <= 1)) fail('rheostat "' + id + '" fraction 必须在 [0,1]');
    }
    return n;
  }

  function normElements(elements) {
    if (!Array.isArray(elements)) fail('elements 必须为数组');
    var seen = {}, typeCount = {};
    return elements.map(function (raw, i) {
      var autoId = null;
      if (!raw || raw.id == null) {
        var t = raw && raw.type;
        typeCount[t] = (typeCount[t] || 0) + 1;
        autoId = t + typeCount[t];
      }
      var n = normOneElement(raw, autoId);
      if (seen[n.id]) fail('元件 id 重复 "' + n.id + '"');
      seen[n.id] = true;
      return n;
    });
  }

  /* ================= 2. 拓扑归一化（§3 显式 nodes/connections） ================= */

  // strict=true（构造期）：每个非电压表元件恰好一条 connection，电压表不许进 connections。
  // strict=false（变异方法）：允许元件暂无 connection（求解时视为不导通，CIR-12）；
  //   重复/非法引用仍抛错。
  function normTopology(elements, topology, strict) {
    topology = topology || {};
    var elById = {};
    elements.forEach(function (e) { elById[e.id] = e; });
    var conns = [];
    var byEl = {}; // elementId -> connection（查重）
    function addConn(elementId, from, to) {
      if (byEl[elementId]) fail('元件 "' + elementId + '" 的 connection 重复（每个元件至多一条）');
      if (from === to) fail('connection 不许自环（元件 "' + elementId + '"）');
      var c = { elementId: elementId, from: from, to: to };
      byEl[elementId] = c;
      conns.push(c);
    }
    // wire 元素级 from/to（ENG-68 示例写法）→ connection
    elements.forEach(function (e) {
      if (e.type === 'wire' && e.from != null) addConn(e.id, e.from, e.to);
    });
    var declared = topology.connections || [];
    if (!Array.isArray(declared)) fail('topology.connections 必须为数组');
    declared.forEach(function (c, i) {
      if (!c || c.elementId == null) fail('topology.connections[' + i + '] 缺 elementId');
      var eid = String(c.elementId);
      var el = elById[eid];
      if (!el) fail('connection 引用未知元件 "' + eid + '"');
      if (el.type === 'voltmeter')
        fail('voltmeter "' + eid + '" 不许出现在 connections 中（用 probeNodes 声明被测节点对，§3）');
      if (c.from == null || c.to == null) fail('connection（元件 "' + eid + '"）缺 from/to');
      var from = String(c.from), to = String(c.to);
      var prev = byEl[eid];
      if (prev) {
        // wire 元素级写法与 topology 声明并存：一致则合并，不一致抛错（§3-1）
        if (prev.from !== from || prev.to !== to)
          fail('wire "' + eid + '" 元素级 from/to 与 topology.connections 不一致（不许静默二选一）');
      } else {
        addConn(eid, from, to);
      }
    });
    // nodes
    var nodeSet = {};
    var nodes;
    if (topology.nodes != null) {
      if (!Array.isArray(topology.nodes)) fail('topology.nodes 必须为数组');
      nodes = topology.nodes.map(function (x) { return String(x); });
      nodes.forEach(function (x) { nodeSet[x] = true; });
      conns.forEach(function (c) {
        if (!nodeSet[c.from]) fail('connection 引用未知节点 "' + c.from + '"');
        if (!nodeSet[c.to]) fail('connection 引用未知节点 "' + c.to + '"');
      });
    } else {
      conns.forEach(function (c) { nodeSet[c.from] = true; nodeSet[c.to] = true; });
      nodes = Object.keys(nodeSet).sort();
    }
    elements.forEach(function (e) {
      if (e.type === 'voltmeter' && e.probeNodes) {
        e.probeNodes.forEach(function (x) {
          if (topology.nodes != null && !nodeSet[x])
            fail('voltmeter "' + e.id + '" probeNodes 引用未知节点 "' + x + '"');
          nodeSet[x] = true;
        });
        if (topology.nodes == null) nodes = Object.keys(nodeSet).sort();
      }
    });
    if (strict) {
      elements.forEach(function (e) {
        if (e.type === 'voltmeter') return;
        if (!byEl[e.id]) fail('元件 "' + e.id + '"（' + e.type + '）没有对应的 connection（§3：非电压表元件恰好一条）');
      });
    }
    // 确定性：connections 按 elementId 排序
    conns.sort(function (a, b) { return a.elementId < b.elementId ? -1 : a.elementId > b.elementId ? 1 : 0; });
    return { nodes: nodes, connections: conns };
  }

  /* ================= 3. 求解器（§4：9 步算法，纯函数） ================= */

  // BFS 可达节点集（无向）。excludeEdgeId：排除某条边；passFn(edge)→bool：边过滤。
  function bfsReach(edges, start, excludeEdgeId, passFn) {
    var adj = {};
    edges.forEach(function (e) {
      if (e.id === excludeEdgeId) return;
      if (passFn && !passFn(e)) return;
      (adj[e.a] = adj[e.a] || []).push(e.b);
      (adj[e.b] = adj[e.b] || []).push(e.a);
    });
    var seen = {}, stack = [start];
    seen[start] = true;
    while (stack.length) {
      var n = stack.pop();
      var nb = adj[n] || [];
      for (var i = 0; i < nb.length; i++) {
        if (!seen[nb[i]]) { seen[nb[i]] = true; stack.push(nb[i]); }
      }
    }
    return seen;
  }

  function sameUnordered(a1, b1, a2, b2) {
    return (a1 === a2 && b1 === b2) || (a1 === b2 && b1 === a2);
  }

  // 空结果骨架（各状态共享字段；数值默认 NaN）
  function baseResult(state) {
    return {
      state: state,
      totalCurrentA: NaN, totalResistanceOhm: NaN, terminalVoltageV: NaN,
      nodeVoltages: {}, branchCurrents: {}, meterReadings: {},
      warnings: [], notes: [],
      reductionLog: [], prunedEdges: [],
      assumptions: [], approximations: [], errorEstimate: ''
    };
  }

  // 求解器纯函数：(elements, topology, contract) → result（深拷贝快照）
  // elements：已归一化元件数组；topology：已归一化 {nodes, connections}；
  // contract：{assumptions, approximations, errorEstimate}（checkAx01 后的深拷贝）。
  function solveCore(elements, topology, contract) {
    var elById = {};
    elements.forEach(function (e) { elById[e.id] = e; });
    var connByEl = {};
    topology.connections.forEach(function (c) { connByEl[c.elementId] = c; });
    var res = baseResult('closed');
    res.assumptions = Eng.deepCopy(contract.assumptions);
    res.approximations = Eng.deepCopy(contract.approximations);
    res.errorEstimate = contract.errorEstimate;
    var allNodes = topology.nodes.slice();

    function finish(state, extra) {
      res.state = state;
      allNodes.forEach(function (n) { if (!(n in res.nodeVoltages)) res.nodeVoltages[n] = NaN; });
      elements.forEach(function (e) {
        // §6：open/closed 时非导通边电流记 0（开路无电流是真值）；
        // short/burned/unsupported/no-source → NaN（不给假数）
        if (!(e.id in res.branchCurrents)) res.branchCurrents[e.id] = (state === 'open' || state === 'closed') ? 0 : NaN;
      });
      // 非 closed：表计一律 unreadable（§6）
      if (state !== 'closed') {
        elements.forEach(function (e) {
          if (e.type === 'ammeter' || e.type === 'voltmeter') {
            res.meterReadings[e.id] = unreadableMeter(e, '电路处于' + stateLabel(state) + '状态，无有效读数');
          }
        });
      }
      if (extra) extra();
      return res;
    }

    /* ---- Step 1：合法性检查 ---- */
    var sources = elements.filter(function (e) { return e.type === 'source'; });
    if (sources.length === 0) {
      return finish('no-source', function () {
        res.notes.push('断路（还没有电源）');
      });
    }
    if (sources.length >= 2) {
      return finish('unsupported', function () {
        res.notes.push('多电源超出本期求解器范围（NC-2）：本求解器仅支持单电源');
        res.notes.push(TXT_UNSUPPORTED);
      });
    }
    var src = sources[0];
    var srcConn = connByEl[src.id];
    if (!srcConn) {
      return finish('no-source', function () {
        res.notes.push('电源 "' + src.id + '" 尚未接入电路');
      });
    }
    var nMinus = srcConn.from, nPlus = srcConn.to; // 约定：from=负极，to=正极（§3-5）

    // 开关接线检查：全 connection 图中，除自身边外，某端点度为 0 即悬空。
    // （注：构造期"每个元件恰好一条 connection"，原始度永不为 0；此处计"他边度"，
    //  即端点是否真实连入了电路其余部分——F-09② 的精确语义。）
    var degree = {};
    topology.connections.forEach(function (c) {
      degree[c.from] = (degree[c.from] || 0) + 1;
      degree[c.to] = (degree[c.to] || 0) + 1;
    });
    var dangling = null;
    elements.forEach(function (e) {
      if (e.type !== 'switch' || dangling) return;
      var c = connByEl[e.id];
      if (!c || (degree[c.from] || 0) - 1 <= 0 || (degree[c.to] || 0) - 1 <= 0) dangling = e;
    });
    if (dangling) {
      return finish('open', function () {
        res.warnings.push('开关 "' + dangling.id + '" 还没连进电路');
      });
    }

    /* ---- Step 2：构建导通图（剔除断开开关；电压表本就不在 connections 中） ---- */
    var edges = [];
    topology.connections.forEach(function (c) {
      var e = elById[c.elementId];
      if (e.type === 'switch' && !e.closed) return; // 断开的开关：边移除
      var R;
      if (e.type === 'wire' || e.type === 'ammeter' || e.type === 'switch') R = 0;
      else if (e.type === 'resistor' || e.type === 'bulb') R = e.resistanceOhm;
      else if (e.type === 'rheostat') R = e.minOhm + e.fraction * (e.maxOhm - e.minOhm);
      else if (e.type === 'source') R = e.internalROhm;
      else return;
      edges.push({ id: e.id, a: c.from, b: c.to, R: R, kind: e.type,
                   emf: e.type === 'source' ? e.emfV : 0 });
    });
    // 开关"已接线但不在主回路"：仅 warning，求解继续（CIR-43）
    var compSrc = bfsReach(edges, nMinus, null, null);
    elements.forEach(function (e) {
      if (e.type !== 'switch') return;
      var c = connByEl[e.id];
      if (!c) return;
      if (!(compSrc[c.from] && compSrc[c.to])) {
        res.warnings.push('开关 "' + e.id + '" 不在主回路中，不起控制作用');
      }
    });

    /* ---- Step 4：烧表判据（电流表并联）——先于 Step 3 执行 ----
     * 设计 §4.1 的字面规则（"去表后两端点经含电源/用电器路径连通即烧表"）在新节点模型下
     * 会对串联表误判（CIR-01 三处串联表、CIR-03 前半都会被判 burned），旧代码靠 hasBranch
     * （有分支点才检查）规避；此处细化为三子规则（Thevenin 等效思想，确定性）：
     *  (1) 串联排除：去掉该表后（电源边亦不计），n−、n+ 外部不连通 → 该表在串联主干上 → 永不烧；
     *  (2) Rth 检验：去表、电源按内阻 r 计（r=0 即短接），a、b 零电阻不连通 → Rth>0 → 正常分流；
     *  (3) Vth 检验：去表、电源边不计，a、b 零电阻仍连通 → Vth=0（如并在纯导线段上）→ 不烧；
     *  余下：表并联在有压降的通路上 → 大电流烧表。
     * 执行顺序注记：Step 4 先于 Step 3，否则单回路"表并联在灯泡两端"会被 Step 3 字面规则
     * 判 short，与 CIR-03/CIR-45（明确要求 burned）冲突。步骤编号保留设计原序。
     */
    var burnedId = null;
    var ammeters = edges.filter(function (e) { return e.kind === 'ammeter'; });
    ammeters.sort(function (p, q) { return p.id < q.id ? -1 : p.id > q.id ? 1 : 0; });
    function zeroReachFrom(start, excludeId, sourceAsZeroR) {
      return bfsReach(edges, start, excludeId, function (e) {
        if (e.kind === 'source') return sourceAsZeroR && src.internalROhm === 0;
        return e.R === 0;
      });
    }
    for (var ai = 0; ai < ammeters.length && !burnedId; ai++) {
      var am = ammeters[ai];
      // (1) 串联排除
      var extNoAm = bfsReach(edges, nMinus, am.id, function (e) { return e.kind !== 'source'; });
      if (!extNoAm[nPlus]) continue;
      // (2) Rth 检验
      var z1 = zeroReachFrom(am.a, am.id, true);
      if (!z1[am.b]) continue;
      // (3) Vth 检验
      var z2 = zeroReachFrom(am.a, am.id, false);
      if (z2[am.b]) continue;
      burnedId = am.id;
    }
    if (burnedId) {
      return finish('burned', function () {
        res.warnings.push(TXT_BURNED);
      });
    }

    /* ---- Step 3：短路判据（电源两极间存在全零电阻导通路径，排除 source 边自身） ---- */
    var zeroReach = bfsReach(edges, nMinus, src.id, function (e) { return e.R === 0; });
    if (zeroReach[nPlus]) {
      return finish('short', function () {
        res.warnings.push(TXT_SHORT);
        res.warnings.push(TXT_SHORT_WHY);
      });
    }

    /* ---- Step 5：导通检查 + 电压表桥接（≈断路教学点） ---- */
    var extReach = bfsReach(edges, nMinus, src.id, null); // 经外部电路 n−⇝n+
    if (!extReach[nPlus]) {
      // 电压表是否桥接了断口两侧（a 通 n+ 侧、b 通 n− 侧，或反之；BFS 排除电源边自身）
      var plusSide = bfsReach(edges, nPlus, src.id, null);
      var minusSide = bfsReach(edges, nMinus, src.id, null);
      var bridged = null;
      elements.forEach(function (e) {
        if (bridged || e.type !== 'voltmeter' || !e.probeNodes) return;
        var pa = e.probeNodes[0], pb = e.probeNodes[1];
        if ((plusSide[pa] && minusSide[pb]) || (plusSide[pb] && minusSide[pa])) bridged = e;
      });
      if (bridged) {
        return finish('open', function () {
          res.notes.push(TXT_VOLT_BLOCK);
          inheritOpenVoltages(res, edges, nMinus, nPlus, src.emfV, src.id);
        });
      }
      var hasOpenSwitch = elements.some(function (e) { return e.type === 'switch' && !e.closed; });
      return finish('open', function () {
        res.notes.push(hasOpenSwitch ? TXT_SWITCH_OPEN : '电路未形成闭合回路');
        inheritOpenVoltages(res, edges, nMinus, nPlus, src.emfV, src.id);
      });
    }

    /* ---- Step 5.5：剪枝（设计未明示的必要前置，见文件头注记 P1） ----
     *  - source 连通分支之外的边：死边（电流恒为 0），不进归约；
     *  - 叶节点（度 1 且非 n±）的边：无电流通路，迭代剪除。
     *  否则悬空分支会让归约停滞而误判 unsupported（CIR-43"求解继续"的反例）。
     */
    var comp = bfsReach(edges, nMinus, null, null);
    var pruned = [];
    var alive = edges.filter(function (e) {
      if (comp[e.a] && comp[e.b]) return true;
      pruned.push(e.id);
      return false;
    });
    var changed = true;
    while (changed) {
      changed = false;
      var deg = {};
      alive.forEach(function (e) {
        deg[e.a] = (deg[e.a] || 0) + 1;
        deg[e.b] = (deg[e.b] || 0) + 1;
      });
      var ns = Object.keys(deg).sort();
      for (var li = 0; li < ns.length; li++) {
        var x = ns[li];
        if (x === nMinus || x === nPlus || deg[x] !== 1) continue;
        for (var lj = 0; lj < alive.length; lj++) {
          var le = alive[lj];
          if (le.kind !== 'source' && (le.a === x || le.b === x)) {
            pruned.push(le.id);
            alive.splice(lj, 1);
            changed = true;
            break;
          }
        }
        if (changed) break;
      }
    }
    res.prunedEdges = pruned.slice();
    pruned.forEach(function (id) { res.branchCurrents[id] = 0; });

  /* ================= 3b. 求解器续：Step 6 归约 → Step 7 回溯 → Step 8 仪表 ================= */

  function stateLabel(state) {
    return { closed: '通路', open: '断路', short: '短路', burned: '烧表',
             unsupported: '超出计算范围', 'no-source': '无电源' }[state] || state;
  }

  // 开路时：与电源某极经零阻路径直连的节点取该极电势（§6）。
  // 注：电源边自身不计入（否则 r=0 时 n−/n+ 零阻连通，电势冲突）。
  function inheritOpenVoltages(res, edges, nMinus, nPlus, emfV, srcId) {
    var zp = bfsReach(edges, nPlus, srcId, function (e) { return e.R === 0; });
    var zn = bfsReach(edges, nMinus, srcId, function (e) { return e.R === 0; });
    Object.keys(zp).forEach(function (n) { res.nodeVoltages[n] = emfV; });
    Object.keys(zn).forEach(function (n) { res.nodeVoltages[n] = 0; });
  }

  // 表计不可读对象（§6）：state 非 closed 时 text '—'，value NaN
  function unreadableMeter(el, note) {
    var isV = el.type === 'voltmeter';
    var o = {
      state: 'unreadable', value: NaN, text: '—',
      decimals: Eng.estimateDecimals(isV ? el.divisionV : el.divisionA, false),
      estimated: true, unit: isV ? 'V' : 'A',
      dataSource: { kind: '仿真读回', ref: el.id },
      note: note || ''
    };
    if (isV) { o.rangeMaxV = el.rangeMaxV; o.divisionV = el.divisionV; }
    else { o.rangeMaxA = el.rangeMaxA; o.divisionA = el.divisionA; }
    return o;
  }

  // Step 6–9（接上：alive/pruned 已就绪；res/elById/connByEl/nMinus/nPlus/src 在闭包中）
  function reduceAndBacktrack(ctx) {
    var res = ctx.res, alive = ctx.alive, src = ctx.src;
    var nMinus = ctx.nMinus, nPlus = ctx.nPlus;
    var elById = ctx.elById;
    var log = res.reductionLog;
    var edgeById = {};
    var redCount = 0;

    function sortWork(w) {
      w.sort(function (a, b) { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0; });
    }
    alive.forEach(function (e) {
      edgeById[e.id] = { id: e.id, a: e.a, b: e.b, R: e.R, kind: e.kind, leaf: true };
    });
    var work = alive.map(function (e) { return edgeById[e.id]; });
    sortWork(work);

    /* ---- Step 6：串并联归约（多重图；每轮按 id 排序扫描；合并记 log） ---- */
    var changed = true;
    while (changed) {
      changed = false;
      // 6a 串联：节点 x 度恰为 2，两条边都不为 source 边，且另一端点不同（排除并联对）
      var deg = {};
      work.forEach(function (w) {
        deg[w.a] = (deg[w.a] || 0) + 1;
        deg[w.b] = (deg[w.b] || 0) + 1;
      });
      var nodes = Object.keys(deg).sort();
      for (var ni = 0; ni < nodes.length && !changed; ni++) {
        var x = nodes[ni];
        if (deg[x] !== 2) continue;
        var inc = work.filter(function (w) { return w.a === x || w.b === x; });
        if (inc.length !== 2) continue;
        var e1 = inc[0], e2 = inc[1];
        if (e1.kind === 'source' || e2.kind === 'source') continue;
        var p = e1.a === x ? e1.b : e1.a;
        var q = e2.a === x ? e2.b : e2.a;
        if (p === q) continue; // 实为并联对，交给并联规则
        redCount++;
        var nid = 'red' + redCount;
        var ne = { id: nid, a: p, b: q, R: e1.R + e2.R, kind: 'equiv', op: 'series',
                   c1: e1.id, c2: e2.id, mid: x, r1: e1.R, r2: e2.R };
        edgeById[nid] = ne;
        log.push({ step: log.length + 1, op: 'series', inputs: [e1.id, e2.id],
                   output: nid, from: p, to: q, R: ne.R, r1: e1.R, r2: e2.R });
        work = work.filter(function (w) { return w.id !== e1.id && w.id !== e2.id; });
        work.push(ne);
        sortWork(work);
        changed = true;
      }
      if (changed) continue;
      // 6b 并联：无序端点对相同的两条边（都不为 source 边）
      var groups = {};
      work.forEach(function (w) {
        var key = w.a < w.b ? w.a + '|' + w.b : w.b + '|' + w.a;
        (groups[key] = groups[key] || []).push(w);
      });
      var keys = Object.keys(groups).sort();
      for (var ki = 0; ki < keys.length && !changed; ki++) {
        var g = groups[keys[ki]].filter(function (w) { return w.kind !== 'source'; });
        if (g.length < 2) continue;
        var q1 = g[0], q2 = g[1]; // work 已按 id 排序 → 确定性
        var R = (q1.R + q2.R === 0) ? 0 : (q1.R * q2.R) / (q1.R + q2.R);
        redCount++;
        var nid2 = 'red' + redCount;
        var ne2 = { id: nid2, a: q1.a, b: q1.b, R: R, kind: 'equiv', op: 'parallel',
                    c1: q1.id, c2: q2.id, r1: q1.R, r2: q2.R };
        edgeById[nid2] = ne2;
        log.push({ step: log.length + 1, op: 'parallel', inputs: [q1.id, q2.id],
                   output: nid2, from: q1.a, to: q1.b, R: R, r1: q1.R, r2: q2.R });
        work = work.filter(function (w) { return w.id !== q1.id && w.id !== q2.id; });
        work.push(ne2);
        sortWork(work);
        changed = true;
      }
    }

    // 6c 终态判定
    var srcEdges = work.filter(function (w) { return w.kind === 'source'; });
    var equiv = work.filter(function (w) { return w.kind !== 'source'; })[0];
    if (work.length === 2 && srcEdges.length === 1 && equiv &&
        sameUnordered(srcEdges[0].a, srcEdges[0].b, equiv.a, equiv.b)) {
      return finishClosed();
    }
    if (work.length === 1 && srcEdges.length === 1) {
      // 防御：理论上 Step 3 已拦截全零阻外环
      return ctx.finishShort();
    }
    // 诚实拒绝：不可串并联归约（如电桥），不给假数（NC-1，ENG-69）
    ctx.res.notes.push('拓扑含不可串并联归约的结构（如电桥），本求解器不覆盖（NC-1）');
    ctx.res.notes.push(TXT_UNSUPPORTED);
    return null;

    /* ---- Step 7：回溯分流分压（逆序 replay reductionLog） ---- */
    function finishClosed() {
      var R_eq = equiv.R;
      var I_total = src.emfV / (R_eq + src.internalROhm);
      res.totalCurrentA = I_total;
      res.totalResistanceOhm = R_eq;
      var Vplus = src.emfV - I_total * src.internalROhm; // 路端电压（§5）
      res.terminalVoltageV = Vplus;
      var V = {};
      V[nMinus] = 0;
      V[nPlus] = Vplus;
      var Isigned = {}; // edgeId -> 有符号电流（以该边记录的 a→b 为正）
      // 等效边电流：外部 n+→n−
      Isigned[equiv.id] = (equiv.a === nPlus) ? I_total : -I_total;
      // 电源边电流：from→to 为正 = 内部 −→+ 方向，放电时为 +I（§3-5）
      Isigned[srcEdges[0].id] = I_total;
      for (var li = log.length - 1; li >= 0; li--) {
        var L = log[li];
        var I = Isigned[L.output];
        var k1 = edgeById[L.inputs[0]], k2 = edgeById[L.inputs[1]];
        if (L.op === 'series') {
          // e'=(p,q) 电流 I（p→q 为正）；e1=(p,x)、e2=(x,q)
          var x = edgeById[L.output].mid;
          var p = L.from, q = L.to;
          Isigned[k1.id] = (k1.a === p) ? I : -I;
          Isigned[k2.id] = (k2.a === x) ? I : -I;
          V[x] = V[p] - I * L.r1;
        } else {
          // 并联：已知 V(a)、V(b)；R>0 分支按电压差分流，零阻分支平分（§4.1）
          var a = L.from, b = L.to;
          var kids = [k1, k2];
          var nz = kids.filter(function (k) { return k.R === 0; }).length;
          kids.forEach(function (k) {
            if (k.R > 0) {
              Isigned[k.id] = (V[k.a] - V[k.b]) / k.R;
            } else if (nz > 0) {
              Isigned[k.id] = (k.a === a ? 1 : -1) * (I / nz);
            } else {
              Isigned[k.id] = 0;
            }
          });
        }
      }
      // 落盘：原始导通边电流（from→to 为正）；节点电压
      Object.keys(Isigned).forEach(function (id) {
        var e = edgeById[id];
        if (e.leaf) res.branchCurrents[id] = Isigned[id];
      });
      Object.keys(V).forEach(function (n) { res.nodeVoltages[n] = V[n]; });
      elementsDone();
      return true;
    }

    function elementsDone() {
      // 未导通元件（断开开关所在边、剪除死边、无 connection 元件）：电流记 0（§4.1/§6）
      ctx.elements.forEach(function (e) {
        if (!(e.id in res.branchCurrents)) res.branchCurrents[e.id] = 0;
      });
      /* ---- Step 8：仪表读数（ENG-38） ---- */
      ctx.elements.forEach(function (e) {
        if (e.type === 'ammeter') {
          var I = Math.abs(res.branchCurrents[e.id] || 0);
          var r = Eng.estimateReading(I, e.divisionA, {});
          res.meterReadings[e.id] = {
            state: 'ok', value: r.value, text: r.text, decimals: r.decimals,
            estimated: r.estimated, unit: 'A',
            rangeMaxA: e.rangeMaxA, divisionA: e.divisionA,
            dataSource: { kind: '仿真读回', ref: e.id }
          };
          if (I > e.rangeMaxA) res.warnings.push('电流表 "' + e.id + '" ' + TXT_OVER_RANGE);
        } else if (e.type === 'voltmeter') {
          if (!e.probeNodes) {
            res.meterReadings[e.id] = unreadableMeter(e, '电压表 "' + e.id + '" 未声明被测节点对（probeNodes），无法读数');
          } else {
            var va = res.nodeVoltages[e.probeNodes[0]], vb = res.nodeVoltages[e.probeNodes[1]];
            if (!isNum(va) || !isNum(vb)) {
              res.meterReadings[e.id] = unreadableMeter(e, '电压表 "' + e.id + '" 跨接了浮空节点，无法读数');
            } else {
              var U = Math.abs(va - vb);
              var rv = Eng.estimateReading(U, e.divisionV, {});
              res.meterReadings[e.id] = {
                state: 'ok', value: rv.value, text: rv.text, decimals: rv.decimals,
                estimated: rv.estimated, unit: 'V',
                rangeMaxV: e.rangeMaxV, divisionV: e.divisionV,
                dataSource: { kind: '仿真读回', ref: e.id }
              };
              if (U > e.rangeMaxV) res.warnings.push('电压表 "' + e.id + '" ' + TXT_OVER_RANGE);
            }
          }
        }
      });
    }
  }

    /* ---- Step 6–9：归约 → 回溯 → 仪表（reduceAndBacktrack） ---- */
    var ctx = {
      res: res, alive: alive, src: src, nMinus: nMinus, nPlus: nPlus,
      elById: elById, elements: elements,
      finishShort: function () {
        return finish('short', function () {
          res.warnings.push(TXT_SHORT);
          res.warnings.push(TXT_SHORT_WHY);
        });
      }
    };
    var closedOk = reduceAndBacktrack(ctx);
    if (closedOk === null) return finish('unsupported'); // NC-1 诚实拒绝
    return finish('closed');
  }

  /* ================= 4. Eng.Circuit 构造器与读回 API（§6 / ENG-68） ================= */

  Eng.Circuit = function (opt) {
    if (!(this instanceof Eng.Circuit)) return new Eng.Circuit(opt); // 工厂/构造两种调用
    opt = opt || {};
    // §7：assumptions / approximations / errorEstimate 构造必填，缺一即抛错（CIR-32）
    var ax = Eng.checkAx01(opt, 'Circuit');
    this._ax = {
      assumptions: Eng.deepCopy(ax.assumptions),
      approximations: Eng.deepCopy(ax.approximations),
      errorEstimate: ax.errorEstimate
    };
    this._elements = normElements(opt.elements || []);
    this._topo = normTopology(this._elements, opt.topology || {}, true);
    this._nodeSet = {};
    this._topo.nodes.forEach(function (n) { this._nodeSet[n] = true; }, this);
    this._elById = {};
    this._elements.forEach(function (e) { this._elById[e.id] = e; }, this);
    this._solve();
  };

  Eng.Circuit.VERSION = '1.0.0';
  Eng.Circuit.AX_DEFAULTS = AX_DEFAULTS; // §7 默认文本：调用方可直接传入（可增补、不可删除）
  Eng.Circuit.ELEMENT_TYPES = ELEMENT_TYPES.slice();

  // 纯函数入口（与构造器同一求解核心；contract 缺 AX01 字段即抛错）
  Eng.Circuit.solve = function (elements, topology, contract) {
    var ckt = new Eng.Circuit({ elements: elements, topology: topology,
      assumptions: contract && contract.assumptions,
      approximations: contract && contract.approximations,
      errorEstimate: contract && contract.errorEstimate });
    return ckt.snapshot();
  };

  Eng.Circuit.prototype._solve = function () {
    this._result = solveCore(this._elements, this._topo, this._ax);
  };

  Eng.Circuit.prototype._needEl = function (id, expectType) {
    var e = this._elById[String(id)];
    if (!e) fail('未知元件 "' + id + '"');
    if (expectType && e.type !== expectType) fail('元件 "' + id + '" 不是 ' + expectType);
    return e;
  };

  // §6 读回 API（返回值均为深拷贝，ENG-10）
  Eng.Circuit.prototype.nodeVoltageV = function (nodeId) {
    var n = String(nodeId);
    if (!this._nodeSet[n]) fail('未知节点 "' + nodeId + '"');
    return this._result.nodeVoltages[n];
  };

  Eng.Circuit.prototype.branchCurrentA = function (branchId) {
    this._needEl(branchId);
    return this._result.branchCurrents[String(branchId)];
  };

  Eng.Circuit.prototype.ammeterReadA = function (meterId) {
    this._needEl(meterId, 'ammeter');
    return Eng.deepCopy(this._result.meterReadings[String(meterId)]);
  };

  Eng.Circuit.prototype.voltmeterReadV = function (meterId) {
    this._needEl(meterId, 'voltmeter');
    return Eng.deepCopy(this._result.meterReadings[String(meterId)]);
  };

  Eng.Circuit.prototype.status = function () {
    var r = this._result;
    return Eng.deepCopy({ state: r.state, totalCurrentA: r.totalCurrentA,
      totalResistanceOhm: r.totalResistanceOhm, terminalVoltageV: r.terminalVoltageV,
      warnings: r.warnings, notes: r.notes });
  };

  Eng.Circuit.prototype.reductionLog = function () {
    return Eng.deepCopy(this._result.reductionLog);
  };

  Eng.Circuit.prototype.snapshot = function () {
    return Eng.deepCopy(this._result);
  };

  // §2.1 参数可读可改：改后即时重算
  Eng.Circuit.prototype.getElementParam = function (id) {
    var e = this._needEl(id);
    return Eng.deepCopy(e);
  };

  Eng.Circuit.prototype.setElementParam = function (id, patch) {
    var e = this._needEl(id);
    patch = patch || {};
    var cand = {};
    Object.keys(e).forEach(function (k) { cand[k] = e[k]; });
    Object.keys(patch).forEach(function (k) { cand[k] = patch[k]; });
    if (cand.type === 'wire' && (patch.from != null || patch.to != null))
      fail('wire 的 from/to 请走 setConnection 修改');
    var nu = normOneElement(cand, e.id);
    // 归一化后写回（保留 id）
    var idx = -1;
    for (var i = 0; i < this._elements.length; i++) {
      if (this._elements[i].id === e.id) { idx = i; break; }
    }
    this._elements[idx] = nu;
    this._elById[e.id] = nu;
    this._solve();
    return this.status();
  };

  // §6/UI §8.4：连线操作的唯一入口（宽松模式：允许元件暂无 connection）
  Eng.Circuit.prototype.setConnection = function (spec) {
    spec = spec || {};
    var eid = String(spec.elementId);
    var e = this._needEl(eid);
    if (e.type === 'voltmeter') fail('voltmeter 不许出现在 connections 中（用 probeNodes）');
    var from = String(spec.from), to = String(spec.to);
    var kept = this._topo.connections.filter(function (c) { return c.elementId !== eid; });
    kept.push({ elementId: eid, from: from, to: to });
    this._topo = normTopology(this._elements, { nodes: this._topo.nodes, connections: kept }, false);
    this._solve();
    return this.status();
  };

  Eng.Circuit.prototype.removeConnection = function (elementId) {
    var eid = String(elementId);
    this._needEl(eid);
    var kept = this._topo.connections.filter(function (c) { return c.elementId !== eid; });
    if (kept.length === this._topo.connections.length) fail('元件 "' + eid + '" 本就没有 connection');
    this._topo = normTopology(this._elements, { nodes: this._topo.nodes, connections: kept }, false);
    this._solve();
    return this.status();
  };

  // 灯泡亮度档（§9.3 表现层规则，非求解器）：I<0.15A 暗、0.15–0.5A 亮、≥0.5A 很亮
  Eng.Circuit.bulbLevel = function (currentA) {
    if (!(currentA > 0)) return '灭';
    if (currentA < 0.15) return '暗';
    if (currentA < 0.5) return '亮';
    return '很亮';
  };

  /* ================= 5. GB/T 4728 符号（托盘图标与画布符号同源，§2.2） =================
   * draw(ctx, type, s, opts)：ctx 为原生 2d context；以 (0,0) 为中心、边长 s 的槽内绘制。
   * 托盘 <canvas> 图标与 Konva.Shape.sceneFunc 调用同一函数（仅平移/缩放不同）——F-02 根治。
   */
  Eng.CircuitSymbols = {
    NAMES: { source: '电源', resistor: '电阻', bulb: '灯泡', switch: '开关',
             wire: '导线', ammeter: '电流表', voltmeter: '电压表', rheostat: '滑动变阻器' },
    GROUPS: [
      { name: '电源', types: ['source'] },
      { name: '用电器', types: ['bulb', 'resistor', 'rheostat'] },
      { name: '控制/连接', types: ['switch', 'wire'] },
      { name: '测量', types: ['ammeter', 'voltmeter'] }
    ],
    PURPOSES: {
      source: '提供电能', bulb: '把电能变成光和热', resistor: '阻值固定的电阻',
      rheostat: '滑动改变接入电阻', switch: '控制电路通断', wire: '连接各个元件',
      ammeter: '测电流（要串联）', voltmeter: '测电压（要并联）'
    },
    draw: function (ctx, type, s, o) {
      o = o || {};
      var col = o.color || '#1a1a1a';
      ctx.save();
      ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = Math.max(9, Math.round(s * 0.2)) + 'px ' + Eng.FONT_STACK;
      function line(x1, y1, x2, y2, w) {
        ctx.lineWidth = w || 1.6;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }
      if (type === 'source') {
        line(s * 0.14, -s * 0.28, s * 0.14, s * 0.28, 1.6); // 长板＝正极
        line(-s * 0.14, -s * 0.18, -s * 0.14, s * 0.18, 3);  // 短板＝负极
        ctx.fillText('+', s * 0.32, 0);
        ctx.fillText('−', -s * 0.32, 0);
      } else if (type === 'bulb') {
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(0, 0, s * 0.30, 0, Math.PI * 2); ctx.stroke();
        line(-s * 0.18, -s * 0.18, s * 0.18, s * 0.18, 1);
        line(-s * 0.18, s * 0.18, s * 0.18, -s * 0.18, 1);
      } else if (type === 'switch') {
        ctx.beginPath(); ctx.arc(-s * 0.25, 0, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.25, 0, 2.5, 0, Math.PI * 2); ctx.fill();
        if (o.closed) line(-s * 0.25, 0, s * 0.25, 0, 2);
        else line(-s * 0.25, 0, s * 0.16, -s * 0.24, 2);
      } else if (type === 'ammeter' || type === 'voltmeter') {
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(0, 0, s * 0.30, 0, Math.PI * 2); ctx.stroke();
        ctx.fillText(type === 'ammeter' ? 'A' : 'V', 0, s * 0.01);
      } else if (type === 'resistor') {
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-s * 0.30, -s * 0.13, s * 0.60, s * 0.26);
      } else if (type === 'rheostat') {
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-s * 0.30, -s * 0.13, s * 0.60, s * 0.26);
        line(-s * 0.28, s * 0.22, s * 0.28, -s * 0.22, 1.4); // 斜箭头杆
        line(s * 0.28, -s * 0.22, s * 0.16, -s * 0.20, 1.4); // 箭头头
        line(s * 0.28, -s * 0.22, s * 0.24, -s * 0.12, 1.4);
        var fx = (o.fraction == null) ? 1 : o.fraction;
        var hx = -s * 0.30 + fx * s * 0.60;
        ctx.beginPath(); ctx.arc(hx, -s * 0.13, 2.4, 0, Math.PI * 2); ctx.fill(); // 滑片手柄 r=2.4（§2.2）
      } else { // wire：连接线本身即表达
        line(-s * 0.32, 0, s * 0.32, 0, 2.5);
      }
      ctx.restore();
    }
  };

  /* ================= 6. Eng.CircuitUI（Konva 交互层，§8/§9） =================
   * 与求解核心解耦：内部持有 elements/topology 草稿，每次改动后调用
   * Eng.Circuit.solve（纯函数）即时重算；画布 = render(snapshot())。
   * 需要 Konva + Eng.KonvaView（konva-view.js）。无 Konva 时构造抛错，
   * 但 circuit.js 本体（求解器）不受影响。
   */
  var UI_CSS_DONE = false;
  function uiCss() {
    if (UI_CSS_DONE) return;
    UI_CSS_DONE = true;
    var st = document.createElement('style');
    st.textContent = [
      '.cir-root{font-family:' + Eng.FONT_STACK + ';color:#1a1a1a;max-width:1240px;margin:0 auto;padding:4px 12px;box-sizing:border-box;}',
      /* 窄屏：column-flex 下 margin:auto 使 root 按 max-content 定宽（390 下 392>370，
       * 22px 非视觉溢出）；窄屏时把 max-width 收到 100%，桌面端原规则不变。 */
      '@media (max-width:700px){.cir-root{max-width:100%;}}',
      '.cir-head h2{font-size:16px;margin:0 0 2px;}',
      '.cir-goal{font-size:13px;color:#555;margin-bottom:4px;}',
      '.cir-panel{border:1px solid #d8d8d8;border-radius:8px;padding:6px 10px;background:#fafafa;}',
      '.cir-panel h3{font-size:13px;margin:0 0 4px;color:#333;}',
      '.cir-groups{display:flex;gap:14px;flex-wrap:wrap;}',
      '.cir-group{min-width:120px;}',
      '.cir-group h4{font-size:12px;margin:0 0 4px;color:#666;}',
      '.cir-entry{display:flex;align-items:center;gap:8px;min-height:44px;padding:4px 8px;margin:2px 0;',
      ' border:1px solid #ccc;border-radius:6px;background:#fff;cursor:grab;font-size:13px;}',
      '.cir-entry canvas{width:40px;height:40px;}',
      '.cir-entry .t small{display:block;color:#777;font-size:11px;}',
      '.cir-stage-wrap{margin:4px 0;border:1px solid #d8d8d8;border-radius:8px;overflow:hidden;}',
      '.cir-toolbar{margin:2px 0;min-height:44px;}',
      '.cir-toolbar button{min-height:44px;min-width:44px;padding:8px 16px;font-size:14px;margin-right:8px;}',
      '.cir-feedback{min-height:26px;font-size:13px;color:#0a5c36;padding:2px 4px;}',
      '.cir-status{min-height:36px;font-size:15px;padding:4px 8px;border-radius:6px;background:#f0f4ff;margin:2px 0;}',
      '.cir-status.bad{background:#fff0f0;}',
      '.cir-params{font-size:13px;padding:4px 8px;border:1px dashed #bbb;border-radius:6px;margin:2px 0;min-height:44px;}',
      '.cir-params label{margin-right:12px;}',
      '.cir-params input[type=number]{width:70px;}',
      '.cir-params input[type=range]{width:220px;vertical-align:middle;}',
      '.cir-params input[type=range].warnzone{accent-color:#d00;}',
      '.cir-warnline{color:#c00;font-size:13px;margin-top:4px;}',
      '.cir-ax{font-size:12px;color:#555;margin-top:6px;}',
      '.cir-chip{position:absolute;min-width:44px;min-height:44px;padding:10px 14px;font-size:14px;',
      ' background:#fff;border:2px solid #c00;border-radius:8px;cursor:pointer;z-index:10;}',
      '@keyframes cir-pulse{0%{opacity:.35}50%{opacity:1}100%{opacity:.35}}',
      '.cir-bubble{position:absolute;background:#fffbe6;border:1px solid #d8b400;border-radius:8px;',
      ' padding:8px 12px;font-size:13px;z-index:10;animation:cir-pulse 1.6s infinite;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  Eng.CircuitUI = function (opt) {
    opt = opt || {};
    if (!window.Konva) throw new Error('CircuitUI 需要 Konva（assets/vendor/konva.min.js）');
    if (!Eng.KonvaView) throw new Error('CircuitUI 需要先加载 konva-view.js（Eng.KonvaView）');
    if (!opt.containerId) throw new Error('CircuitUI: 必须传入 containerId');
    uiCss();
    this.cols = opt.cols || 6;
    this.rows = opt.rows || 4;
    this.cell = opt.cellPx || 100;
    this.maxElements = 12; // §8.2-3：上限 8→12（UI 约束）
    this.allowInternalR = !!opt.allowInternalR;
    // 波 B 课页迁移：示范电路/托盘新增电源的电动势取课页电压（默认 6V）
    this.sourceVoltageV = (opt.sourceVoltageV > 0) ? opt.sourceVoltageV : 6;
    this.trayTypes = opt.trayTypes || ['source', 'bulb', 'resistor', 'rheostat', 'switch', 'wire', 'ammeter', 'voltmeter'];
    this._uidSeq = 0;
    this._placed = [];   // {uid, type, col, row|null, params:{}}
    this._wireArm = null;
    this._selected = null;
    this._probeArm = false;
    this._trayArm = null;  // 托盘备战 {type, x0, y0}
    this._floatUid = null; // 托盘拖出的浮动元件
    this._contract = {
      assumptions: Eng.deepCopy(AX_DEFAULTS.assumptions),
      approximations: Eng.deepCopy(AX_DEFAULTS.approximations),
      errorEstimate: AX_DEFAULTS.errorEstimate
    };
    this._buildDom(opt);
    var W = this.cols * this.cell, H = this.rows * this.cell;
    this.view = new Eng.KonvaView({
      containerId: this._ids.stage, viewportWPx: W, viewportHPx: H,
      assumptions: ['Konva 画布渲染电路'], approximations: ['无'], errorEstimate: '像素级'
    });
    this.stage = this.view.stage;
    this.gridLayer = new Konva.Layer();
    this.wireLayer = new Konva.Layer({ listening: false }); // §8.2-1：连线层不吃 pointer 事件（F-05）
    this.elemLayer = new Konva.Layer();
    this.topLayer = new Konva.Layer();
    this.stage.add(this.gridLayer);
    this.stage.add(this.wireLayer);
    this.stage.add(this.elemLayer);
    this.stage.add(this.topLayer);
    this._drawGrid();
    this._rebuild();
    this._bindTray();
    var self = this;
    function onKey(ev) {
      // 页面已切走（本实例 DOM 不在文档中）时自失效，避免跨页泄漏（波 B 迁移补）
      if (!document.getElementById(self._ids.stage)) return;
      if ((ev.key === 'Delete' || ev.key === 'Backspace') && self._selected && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) {
        ev.preventDefault();
        self._deleteElement(self._selected);
      }
    }
    document.addEventListener('keydown', onKey);
  };

  Eng.CircuitUI.prototype._buildDom = function (opt) {
    var root = document.getElementById(opt.containerId);
    if (!root) throw new Error('CircuitUI: 找不到容器 #' + opt.containerId);
    root.className = 'cir-root';
    var p = opt.containerId + '-';
    this._ids = { panel: p + 'panel', stage: p + 'stage', toolbar: p + 'toolbar',
                  feedback: p + 'feedback', status: p + 'status', params: p + 'params' };
    var html = '' +
      '<div class="cir-head"><h2>' + escapeHtml(opt.title || '搭电路') + '</h2>' +
      '<div class="cir-goal">' + escapeHtml(opt.goalText || '用导线把元件连成闭合回路，观察电流表读数。') + '</div></div>' +
      '<div class="cir-panel" id="' + this._ids.panel + '"><h3>元件面板（拖到画布使用）</h3><div class="cir-groups"></div></div>' +
      '<div class="cir-stage-wrap" style="position:relative;width:' + (this.cols * this.cell) + 'px">' +
      '<div id="' + this._ids.stage + '"></div></div>' +
      '<div class="cir-toolbar" id="' + this._ids.toolbar + '">' +
      '<button type="button" data-act="delete" style="display:none">删除选中元件</button>' +
      '<button type="button" data-act="demo">一键连好示范电路</button></div>' +
      '<div class="cir-feedback" id="' + this._ids.feedback + '" aria-live="polite"></div>' +
      '<div class="cir-status" id="' + this._ids.status + '"></div>' +
      '<div class="cir-params" id="' + this._ids.params + '">点选画布上的元件查看/修改参数。</div>' +
      '<details class="cir-ax"><summary>模型假设（点击展开）</summary><div class="cir-axbody"></div></details>';
    root.innerHTML = html;
    var self = this;
    root.querySelector('[data-act="delete"]').addEventListener('click', function () {
      if (self._selected) self._deleteElement(self._selected);
    });
    root.querySelector('[data-act="demo"]').addEventListener('click', function () { self._demo(); });
    // 模型假设当页显性化（§7）
    var axb = root.querySelector('.cir-axbody');
    axb.innerHTML = '<ul>' + this._contract.assumptions.map(function (s) { return '<li>' + escapeHtml(s) + '</li>'; }).join('') + '</ul>';
  };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- 托盘 ---------- */
  Eng.CircuitUI.prototype._bindTray = function () {
    var self = this;
    var groupsBox = document.querySelector('#' + this._ids.panel + ' .cir-groups');
    Eng.CircuitSymbols.GROUPS.forEach(function (g) {
      var types = g.types.filter(function (t) { return self.trayTypes.indexOf(t) >= 0; });
      if (!types.length) return;
      var gd = document.createElement('div');
      gd.className = 'cir-group';
      var h = document.createElement('h4');
      h.textContent = g.name;
      gd.appendChild(h);
      types.forEach(function (t) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'cir-entry';
        b.setAttribute('data-type', t);
        b.setAttribute('aria-label', '添加' + Eng.CircuitSymbols.NAMES[t] + '：' + Eng.CircuitSymbols.PURPOSES[t]);
        var cv = document.createElement('canvas');
        cv.width = 80; cv.height = 80;
        var ctx = cv.getContext('2d');
        ctx.translate(40, 40);
        Eng.CircuitSymbols.draw(ctx, t, 64, t === 'rheostat' ? { fraction: 1 } : null);
        var tx = document.createElement('span');
        tx.className = 't';
        tx.innerHTML = escapeHtml(Eng.CircuitSymbols.NAMES[t]) + '<small>' + escapeHtml(Eng.CircuitSymbols.PURPOSES[t]) + '</small>';
        b.appendChild(cv); b.appendChild(tx);
        // §8.2-2：备战-阈值创建（pointerdown 只备战，拖动 >8px 才创建；纯单击零残留）
        b.addEventListener('pointerdown', function (ev) {
          self._trayArm = { type: t, x0: ev.clientX, y0: ev.clientY };
          ev.preventDefault();
        });
        gd.appendChild(b);
      });
      groupsBox.appendChild(gd);
    });
    document.addEventListener('pointermove', function (ev) { self._onDocMove(ev); });
    document.addEventListener('pointerup', function (ev) { self._onDocUp(ev); });
  };

  Eng.CircuitUI.prototype._onDocMove = function (ev) {
    if (!document.getElementById(this._ids.stage)) return; // 页面已切走：自失效（波 B 迁移补）
    var arm = this._trayArm;
    if (!arm) return;
    if (this._floatUid) {
      this._floatXY = this._stagePoint(ev.clientX, ev.clientY);
      this._render();
      return;
    }
    var d = Math.hypot(ev.clientX - arm.x0, ev.clientY - arm.y0);
    if (d > 8) {
      if (this._placed.length >= this.maxElements) {
        this._say('元件已到 12 个上限');
        this._trayArm = null;
        return;
      }
      var uid = this._newUid(arm.type);
      this._placed.push({ uid: uid, type: arm.type, col: -1, row: -1, params: this._defaultParams(arm.type) });
      this._floatUid = uid;
      this._floatXY = this._stagePoint(ev.clientX, ev.clientY);
      this._rebuild();
    }
  };

  Eng.CircuitUI.prototype._onDocUp = function (ev) {
    var self = this;
    if (!document.getElementById(this._ids.stage)) { this._trayArm = null; this._floatUid = null; return; }
    if (this._floatUid) {
      var uid = this._floatUid;
      this._floatUid = null;
      var el = this._byUid(uid);
      var pt = this._stagePoint(ev.clientX, ev.clientY);
      if (!pt) { // 画布外松开：取消创建，零残留
        this._placed = this._placed.filter(function (p) { return p.uid !== uid; });
        this._rebuild();
      } else {
        var cell = this._clampCell(Math.floor(pt.x / this.cell), Math.floor(pt.y / this.cell));
        var clamped = (cell.c !== Math.floor(pt.x / this.cell) || cell.r !== Math.floor(pt.y / this.cell));
        var occ = this._atCell(cell.c, cell.r);
        if (occ && occ.uid !== uid) { // 换位（F-06）
          var o = this._byUid(occ.uid);
          var tc = el.col, tr = el.row;
          o.col = tc; o.row = tr;
          this._say('两个元件换了位置。');
        }
        el.col = cell.c; el.row = cell.r;
        if (clamped) this._say('已放到边缘格（拖出画布会自动收回）'); // §8.2-4 越界反馈（F-07）
        this._rebuild();
      }
    }
    this._trayArm = null;
  };

  Eng.CircuitUI.prototype._stagePoint = function (clientX, clientY) {
    var r = this.stage.container().getBoundingClientRect();
    var x = clientX - r.left, y = clientY - r.top;
    if (x < 0 || y < 0 || x >= r.width || y >= r.height) return null;
    return { x: x, y: y };
  };

  Eng.CircuitUI.prototype._clampCell = function (c, r) {
    return { c: Math.max(0, Math.min(this.cols - 1, c)), r: Math.max(0, Math.min(this.rows - 1, r)) };
  };

  /* ---------- 数据模型 ---------- */
  Eng.CircuitUI.prototype._newUid = function (type) {
    this._uidSeq++;
    return type.charAt(0) + this._uidSeq;
  };

  Eng.CircuitUI.prototype._byUid = function (uid) {
    for (var i = 0; i < this._placed.length; i++) if (this._placed[i].uid === uid) return this._placed[i];
    return null;
  };

  Eng.CircuitUI.prototype._atCell = function (c, r) {
    for (var i = 0; i < this._placed.length; i++) {
      var p = this._placed[i];
      if (p.col === c && p.row === r) return p;
    }
    return null;
  };

  Eng.CircuitUI.prototype._defaultParams = function (type) {
    if (type === 'source') return { emfV: this.sourceVoltageV, internalROhm: 0 };
    if (type === 'resistor') return { resistanceOhm: 20 };
    if (type === 'bulb') return { resistanceOhm: 12 };
    if (type === 'switch') return { closed: false };
    if (type === 'ammeter') return { rangeMaxA: 3 };
    if (type === 'voltmeter') return { rangeMaxV: 15, probeNodes: null };
    if (type === 'rheostat') return { minOhm: 0, maxOhm: 50, fraction: 1 };
    return {};
  };

  Eng.CircuitUI.prototype._nodeOf = function (uid, term) { return uid + ':' + term; };

  /* 公开 API（波 B 课页迁移）：按课页数据预设摆位。
   * type 为元件类型；col/row 为网格格位（越界钳制）；params 合并默认参数。
   * 返回新元件 uid。非法类型/格子被占/超上限时抛错（ENG-66）。 */
  Eng.CircuitUI.prototype.placeElement = function (type, col, row, params) {
    if (!Eng.CircuitSymbols.NAMES[type]) throw new Error('CircuitUI.placeElement: 未知元件类型 "' + type + '"');
    col = Math.max(0, Math.min(this.cols - 1, col | 0));
    row = Math.max(0, Math.min(this.rows - 1, row | 0));
    if (this._atCell(col, row)) throw new Error('CircuitUI.placeElement: 格子 (' + col + ',' + row + ') 已被占');
    if (this._placed.length >= this.maxElements) throw new Error('CircuitUI.placeElement: 元件已到 12 个上限');
    var uid = this._newUid(type);
    var merged = this._defaultParams(type);
    if (params) for (var k in params) merged[k] = params[k];
    this._placed.push({ uid: uid, type: type, col: col, row: row, params: merged });
    this._rebuild();
    return uid;
  };

  /* 公开 API（波 B 课页迁移）：在两个已摆位元件的接线柱之间创建一条导线连接。
   * 返回 wire 元件 uid；超上限时反馈并返回 null。 */
  Eng.CircuitUI.prototype.addWire = function (fromUid, fromTerm, toUid, toTerm) {
    if (this._placed.length >= this.maxElements) {
      this._say('元件已到 12 个上限');
      return null;
    }
    var wuid = this._newUid('wire');
    this._placed.push({ uid: wuid, type: 'wire', col: -2, row: -2, params: {} }); // col=-2：不占格
    this._extraConns = this._extraConns || [];
    this._extraConns.push({
      elementId: wuid,
      from: this._nodeOf(fromUid, fromTerm),
      to: this._nodeOf(toUid, toTerm)
    });
    this._rebuild();
    return wuid;
  };

  // 求解快照 = render(snapshot()) 的数据源（ENG-64）。
  // 拓扑语义：每个画布元件本身就是其两端点之间的一条边（connection 的 elementId=元件 uid）；
  // 显式连线再产生额外的 wire 边。voltmeter 不进 connections（用 probeNodes）。
  Eng.CircuitUI.prototype._rebuild = function () {
    var elements = [], conns = [], nodeSet = {};
    var self = this;
    this._placed.forEach(function (p) {
      if (p.col === -1) return; // 托盘拖出浮动中：不进求解；col=-2 为自动连线，不占格但参与求解
      var e = { id: p.uid, type: p.type };
      Object.keys(p.params).forEach(function (k) { e[k] = p.params[k]; });
      elements.push(e);
      var nL = self._nodeOf(p.uid, 'L'), nR = self._nodeOf(p.uid, 'R');
      nodeSet[nL] = true;
      nodeSet[nR] = true;
      if (p.col >= 0 && p.type !== 'voltmeter') {
        // 格上元件自身即一条边（两端点之间）；col=-2 的自动导线只走 extraConns，避免重复
        conns.push({ elementId: p.uid, from: nL, to: nR });
      }
    });
    (this._extraConns || []).forEach(function (c) { conns.push(c); });
    var nodes = Object.keys(nodeSet).sort();
    try {
      this._snap = Eng.Circuit.solve(elements, { nodes: nodes, connections: conns }, this._contract);
      this._solveErr = null;
    } catch (err) {
      this._solveErr = String(err && err.message || err);
      this._snap = null;
    }
    this._render();
  };

  Eng.CircuitUI.prototype._say = function (text) {
    // 操作反馈独立通道：solve 重渲染不碰它（F-06 根治）
    document.getElementById(this._ids.feedback).textContent = text;
  };

  /* ---------- 渲染（图由数据驱动：render(snapshot())，ENG-64） ---------- */
  Eng.CircuitUI.prototype._drawGrid = function () {
    var self = this;
    for (var c = 0; c <= this.cols; c++) {
      this.gridLayer.add(new Konva.Line({
        points: [c * this.cell, 0, c * this.cell, this.rows * this.cell],
        stroke: '#e3e3e3', strokeWidth: 1, listening: false
      }));
    }
    for (var r = 0; r <= this.rows; r++) {
      this.gridLayer.add(new Konva.Line({
        points: [0, r * this.cell, this.cols * this.cell, r * this.cell],
        stroke: '#e3e3e3', strokeWidth: 1, listening: false
      }));
    }
    this.gridLayer.draw();
  };

  Eng.CircuitUI.prototype._cellXY = function (col, row) {
    return { x: (col + 0.5) * this.cell, y: (row + 0.5) * this.cell };
  };

  Eng.CircuitUI.prototype._termXY = function (uid, term) {
    var p = this._byUid(uid);
    var c = this._cellXY(p.col, p.row);
    return { x: c.x + (term === 'L' ? -1 : 1) * this.cell * 0.42, y: c.y };
  };

  Eng.CircuitUI.prototype._render = function () {
    var self = this;
    this.elemLayer.destroyChildren();
    this.wireLayer.destroyChildren();
    this.topLayer.destroyChildren();
    var snap = this._snap;
    // 导线（含端点连线）：曼哈顿折线，wireLayer listening=false（F-05）
    (this._extraConns || []).forEach(function (c) {
      self._drawWireConn(c);
    });
    this._placed.forEach(function (p) {
      if (p.col === -2) return; // 自动连线：只画连接线，不画元件符号
      if (p.col === -1) { self._drawFloating(p); return; } // 托盘拖出浮动中
      self._drawElement(p, snap);
    });
    this.elemLayer.draw();
    this.wireLayer.draw();
    this.topLayer.draw();
    this._applyDemoPulse(); // 示范开关呼吸脉冲：重渲染后重挂（_demo 流程）
    this._renderStatus();
    this._renderParams();
  };

  Eng.CircuitUI.prototype._manhattan = function (p1, p2) {
    return [p1.x, p1.y, p2.x, p1.y, p2.x, p2.y];
  };

  // 托盘拖出浮动中的元件（半透明跟随指针）
  Eng.CircuitUI.prototype._drawFloating = function (p) {
    if (!this._floatXY) return;
    var g = new Konva.Group({ x: this._floatXY.x, y: this._floatXY.y, opacity: 0.65, listening: false });
    var s = this.cell * 0.72;
    var sym = new Konva.Shape({
      sceneFunc: function (ctx) {
        Eng.CircuitSymbols.draw(ctx._context, p.type, s, { color: '#1a1a1a' });
      },
      listening: false
    });
    g.add(sym);
    this.elemLayer.add(g);
  };

  Eng.CircuitUI.prototype._drawWireConn = function (c) {
    var self = this;
    function uidTerm(node) {
      var i = node.lastIndexOf(':');
      return { uid: node.slice(0, i), term: node.slice(i + 1) };
    }
    var a = uidTerm(c.from), b = uidTerm(c.to);
    var pa = this._byUid(a.uid), pb = this._byUid(b.uid);
    if (!pa || !pb || pa.col < 0 || pb.col < 0) return;
    var p1 = this._termXY(a.uid, a.term), p2 = this._termXY(b.uid, b.term);
    var line = new Konva.Line({
      points: this._manhattan(p1, p2), stroke: '#b06a00', strokeWidth: 3,
      listening: false, lineCap: 'round', lineJoin: 'round'
    });
    this.wireLayer.add(line);
    // 中点"断开"手柄（小圆点；命中区 ≥44px；连线本身不吃事件）
    var mid = { x: p2.x, y: (p1.y + p2.y) / 2 };
    var dot = new Konva.Circle({
      x: mid.x, y: mid.y, radius: 7, fill: '#fff', stroke: '#b06a00', strokeWidth: 2,
      name: 'wire-handle', listening: true
    });
    dot.setAttr('wireId', c.elementId);
    this.topLayer.add(dot);
    Eng.ensureHitArea(dot, 44); // 须在 add 之后（getParent 不为 null）
    dot.on('click', function () { self._showChip(c.elementId, mid.x, mid.y); });
    dot.on('tap', function () { self._showChip(c.elementId, mid.x, mid.y); });
    this.topLayer.add(dot);
    // 电流方向箭头（§9.4）：电流为 0 的分支不画
    if (this._snap && this._snap.state === 'closed') {
      var I = this._snap.branchCurrents[c.elementId];
      if (isNum(I) && Math.abs(I) > 1e-12) {
        var dir = I > 0 ? 1 : -1; // connection from→to 为正
        var ax = mid.x, ay = mid.y - dir * 0; // 竖直段中点，方向沿竖直段
        var s = dir > 0 ? 1 : -1;
        this.wireLayer.add(new Konva.Line({
          points: [ax - 6, ay - s * 8, ax, ay, ax + 6, ay - s * 8],
          stroke: '#c00', strokeWidth: 2, listening: false, lineCap: 'round'
        }));
      }
    }
  };

  Eng.CircuitUI.prototype._drawElement = function (p, snap) {
    var self = this;
    var c = this._cellXY(p.col, p.row);
    var g = new Konva.Group({ x: c.x, y: c.y, draggable: true, name: 'elem' });
    g.setAttr('uid', p.uid);
    var s = this.cell * 0.72;
    var sym = new Konva.Shape({
      sceneFunc: function (ctx) {
        var raw = ctx._context;
        var o = { color: '#1a1a1a' };
        if (p.type === 'switch') o.closed = !!p.params.closed;
        if (p.type === 'rheostat') o.fraction = p.params.fraction;
        Eng.CircuitSymbols.draw(raw, p.type, s, o);
      },
      listening: false
    });
    g.add(sym);
    // 灯泡亮度（§9.3 表现层规则）
    if (p.type === 'bulb' && snap && snap.state === 'closed') {
      var lv = Eng.Circuit.bulbLevel(Math.abs(snap.branchCurrents[p.uid] || 0));
      if (lv === '亮' || lv === '很亮') {
        g.add(new Konva.Circle({
          x: 0, y: 0, radius: s * (lv === '很亮' ? 0.42 : 0.36),
          fill: 'rgba(255,210,60,' + (lv === '很亮' ? 0.55 : 0.35) + ')', listening: false
        }));
      }
    }
    // 开关文字标签（§2.2：断开/闭合＋点我开/合）
    if (p.type === 'switch') {
      var t = Eng.konvaText({
        x: -40, y: s * 0.34, width: 80, align: 'center',
        text: (p.params.closed ? '闭合' : '断开') + '（点我开/合）', fontSize: cirV8Snap(11), fill: '#555', listening: false
      });
      g.add(t);
    }
    // 接线柱（端点）：常显小圆点，点击进入连线流程（§8.4）
    // 命中区 ≥44px（ENG-56）：用局部坐标系 hitFunc（Eng.ensureHitArea 的绝对坐标不适用于平移后的 group 子节点）
    ['L', 'R'].forEach(function (term) {
      var tx = (term === 'L' ? -1 : 1) * self.cell * 0.42;
      var armed = self._wireArm && self._wireArm.uid === p.uid && self._wireArm.term === term;
      var dot = new Konva.Circle({
        x: tx, y: 0, radius: armed ? 9 : 5,
        fill: armed ? '#d00' : '#fff', stroke: '#333', strokeWidth: 2, name: 'term'
      });
      dot.setAttr('uid', p.uid); dot.setAttr('term', term);
      dot.hitFunc(function (ctx) {
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.fillStrokeShape(dot);
      });
      function onTermClick(ev) { ev.cancelBubble = true; self._onTerminalResolved(p.uid, term); }
      dot.on('click', onTermClick);
      dot.on('tap', onTermClick);
      g.add(dot);
    });
    // 选中高亮
    if (this._selected === p.uid) {
      g.add(new Konva.Rect({
        x: -self.cell / 2 + 4, y: -self.cell / 2 + 4,
        width: self.cell - 8, height: self.cell - 8,
        stroke: '#06c', strokeWidth: 2, dash: [6, 4], listening: false
      }));
    }
    // §8.2-1：符号整体为命中区（≥44px，ENG-56）。
    // 注：Eng.ensureHitArea 用绝对坐标，不适用于平移后的 group 子节点；
    // 此处直接加透明子矩形（随 group 一起拖拽），等效满足 ENG-56。
    var hitS = Math.max(44, s + 16);
    var hitRect = new Konva.Rect({
      x: -hitS / 2, y: -hitS / 2, width: hitS, height: hitS,
      fill: 'rgba(0,0,0,0)', listening: true, name: 'eng-hitarea'
    });
    g.add(hitRect);
    hitRect.moveToBottom();
    // 拖拽（Konva draggable）+ 点击选中/开关切换
    var moved = false;
    g.on('dragstart', function () { moved = true; });
    g.on('dragend', function () {
      moved = true;
      var pos = g.position();
      var cc = Math.floor(pos.x / self.cell), rr = Math.floor(pos.y / self.cell);
      var cell = self._clampCell(cc, rr);
      var clamped = (cell.c !== cc || cell.r !== rr);
      var occ = self._atCell(cell.c, cell.r);
      if (occ && occ.uid !== p.uid) {
        occ.col = p.col; occ.row = p.row;
        self._say('两个元件换了位置。');
      }
      p.col = cell.c; p.row = cell.r;
      if (clamped) self._say('已放到边缘格（拖出画布会自动收回）');
      // 拖回托盘＝删除（§8.3 旧习惯保留）
      var ptr = self.stage.getPointerPosition();
      if (ptr) {
        var panel = document.getElementById(self._ids.panel).getBoundingClientRect();
        if (ptr.y < 0 || (self.stage.container().getBoundingClientRect().top + ptr.y) < panel.bottom) {
          self._deleteElement(p.uid);
          return;
        }
      }
      self._rebuild();
      setTimeout(function () { moved = false; }, 0);
    });
    g.on('click', function () {
      if (moved) return;
      if (self._probeArm && p.type !== 'voltmeter') { self._setProbe(p.uid); return; }
      self._selected = p.uid;
      if (p.type === 'switch') {
        p.params.closed = !p.params.closed; // 开关点按切换开/合（D1）
        if (p.params.closed) self._hideDemoBubble(); // 黄队 P3 改法 2：闭合后撤掉"差一步"气泡与脉冲
        self._rebuild();
      } else {
        self._render();
      }
      self._renderToolbar();
      self._renderParams();
    });
    this.elemLayer.add(g);
    // 电压表笔虚线（§2.2 双编码）
    if (p.type === 'voltmeter' && p.params.probeNodes) {
      var self2 = this;
      p.params.probeNodes.forEach(function (node, i) {
        var k = node.lastIndexOf(':');
        var tuid = node.slice(0, k), term = node.slice(k + 1);
        var tp = self2._byUid(tuid);
        if (!tp || tp.col < 0) return;
        var txy = self2._termXY(tuid, term);
        self2.wireLayer.add(new Konva.Line({
          points: [c.x, c.y, txy.x, txy.y], stroke: '#888', strokeWidth: 1.5,
          dash: [5, 4], listening: false
        }));
        var lbl = Eng.konvaText({
          x: (c.x + txy.x) / 2 - 30, y: (c.y + txy.y) / 2 - 18 + i * 14,
          width: 60, align: 'center', text: '测' + (i + 1), fontSize: cirV8Snap(11), fill: '#888', listening: false
        });
        self2.wireLayer.add(lbl);
      });
    }
  };

  /* ---------- 交互：连线 / 断开 / 删除 / 参数 ---------- */
  /* 端子点击消歧（波 B 迁移补）：相邻格元件的面对端子仅相距 16px，
   * 而 44px 命中区（ENG-56）相互重叠；以点击点为圆心 24px 内取最近的
   * 端子中心，避免"点 A 进 B"。无指针位置时回退为被击中的端子。 */
  Eng.CircuitUI.prototype._onTerminalResolved = function (uid, term) {
    var ptr = null;
    try { ptr = this.stage.getPointerPosition(); } catch (e) {}
    var best = { uid: uid, term: term, d: 1e9 };
    if (ptr) {
      for (var i = 0; i < this._placed.length; i++) {
        var q = this._placed[i];
        if (q.col < 0) continue;
        var terms = ['L', 'R'];
        for (var k = 0; k < 2; k++) {
          var tp = this._termXY(q.uid, terms[k]);
          var d = Math.hypot(ptr.x - tp.x, ptr.y - tp.y);
          if (d < 24 && d < best.d) best = { uid: q.uid, term: terms[k], d: d };
        }
      }
    }
    this._onTerminal(best.uid, best.term);
  };

  Eng.CircuitUI.prototype._onTerminal = function (uid, term) {
    var arm = this._wireArm;
    if (!arm) {
      this._wireArm = { uid: uid, term: term };
      this._say('已选中一个接线柱，再点另一个元件的接线柱完成连线。');
      this._render();
      return;
    }
    if (arm.uid === uid && arm.term === term) {
      this._wireArm = null;
      this._render();
      return;
    }
    if (arm.uid === uid) {
      this._say('不能把同一元件的两个接线柱连起来。');
      this._wireArm = null;
      this._render();
      return;
    }
    // 生成一条导线连接（§8.4）：新建 wire 元件 + connection
    var wuid = this.addWire(arm.uid, arm.term, uid, term);
    this._wireArm = null;
    if (wuid) this._say('已连线。');
    this._render();
  };

  Eng.CircuitUI.prototype._showChip = function (wireId, x, y) {
    var self = this;
    this._hideChip();
    var wrap = this.stage.container().parentElement;
    var chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'cir-chip';
    chip.textContent = '断开';
    chip.style.left = (x + 12) + 'px';
    chip.style.top = (y - 22) + 'px';
    chip.addEventListener('click', function () {
      self._disconnectWire(wireId);
      self._hideChip();
    });
    wrap.appendChild(chip);
    this._chip = chip;
  };

  Eng.CircuitUI.prototype._hideChip = function () {
    if (this._chip && this._chip.parentElement) this._chip.parentElement.removeChild(this._chip);
    this._chip = null;
  };

  Eng.CircuitUI.prototype._disconnectWire = function (wireId) {
    this._extraConns = (this._extraConns || []).filter(function (c) { return c.elementId !== wireId; });
    this._placed = this._placed.filter(function (p) { return p.uid !== wireId; });
    this._say('已断开，即时重算。');
    this._rebuild(); // 纯函数即时重算（CIR-12）
  };

  Eng.CircuitUI.prototype._deleteElement = function (uid) {
    var self = this;
    var deadNodes = [this._nodeOf(uid, 'L'), this._nodeOf(uid, 'R')];
    // 级联删除其 connections（§8.3）+ 挂接到它端点上的导线
    var deadWires = [];
    (this._extraConns || []).forEach(function (c) {
      if (c.elementId === uid || deadNodes.indexOf(c.from) >= 0 || deadNodes.indexOf(c.to) >= 0) {
        deadWires.push(c.elementId);
      }
    });
    this._extraConns = (this._extraConns || []).filter(function (c) { return deadWires.indexOf(c.elementId) < 0; });
    this._placed = this._placed.filter(function (p) { return p.uid !== uid && deadWires.indexOf(p.uid) < 0; });
    if (this._selected === uid) this._selected = null;
    this._say('已删除元件。');
    this._hideDemoBubble(); // 示范电路被改动："差一步"引导不再适用，撤掉
    this._rebuild();
    this._renderToolbar();
  };

  Eng.CircuitUI.prototype._setProbe = function (targetUid) {
    var v = this._byUid(this._selected);
    if (!v || v.type !== 'voltmeter') { this._probeArm = false; return; }
    v.params.probeNodes = [this._nodeOf(targetUid, 'L'), this._nodeOf(targetUid, 'R')];
    this._probeArm = false;
    this._say('电压表已跨接到该元件两端（并联测量）。');
    this._rebuild();
  };

  // 一键连好示范电路（§8.4-4）：2×2 回路＋显式 connections，开关断开；
  // 黄队 P3 改法 2 保留：开关持续呼吸脉冲 ＋ "差一步"气泡（文案沿用旧版逐字），
  // 8 秒无操作 exploreTip 高亮闪烁一次；开关闭合后撤掉气泡与脉冲。
  Eng.CircuitUI.prototype._demo = function () {
    var self = this;
    this._hideDemoBubble();
    this._placed = [];
    this._extraConns = [];
    this._uidSeq = 0;
    function add(type, col, row, params) {
      var uid = self._newUid(type);
      var p = { uid: uid, type: type, col: col, row: row, params: params || self._defaultParams(type) };
      self._placed.push(p);
      return uid;
    }
    var bat = add('source', 1, 1); // 电动势取课页电压（_defaultParams ← sourceVoltageV）
    var bulb = add('bulb', 4, 1);
    var sw = add('switch', 4, 2, { closed: false });
    function wire(fu, ft, tu, tt) {
      var wuid = self._newUid('wire');
      self._placed.push({ uid: wuid, type: 'wire', col: -2, row: -2, params: {} });
      self._extraConns.push({ elementId: wuid, from: self._nodeOf(fu, ft), to: self._nodeOf(tu, tt) });
    }
    wire(bat, 'R', bulb, 'L');
    wire(bulb, 'R', sw, 'L');
    wire(sw, 'R', bat, 'L');
    this._say('💡 差一步：把开关闭合，灯才会亮！');
    this._rebuild();
    this._showDemoBubble(sw);
    this._startDemoPulse(sw);
    this._armDemoTipFlash();
  };

  // "差一步"气泡：定位在开关格附近，点击气泡/开关闭合/重跑示范时撤掉
  Eng.CircuitUI.prototype._showDemoBubble = function (swUid) {
    this._hideDemoBubble();
    var p = this._byUid(swUid);
    if (!p || p.col < 0) return;
    var c = this._cellXY(p.col, p.row);
    var wrap = this.stage.container().parentElement; // .cir-stage-wrap（position:relative）
    var b = document.createElement('div');
    b.className = 'cir-bubble';
    b.textContent = '💡 差一步：把开关闭合，灯才会亮！';
    b.style.left = Math.max(4, c.x - 120) + 'px';
    b.style.top = Math.max(4, c.y - 88) + 'px';
    var self = this;
    b.addEventListener('click', function () { self._hideDemoBubble(); });
    wrap.appendChild(b);
    this._demoBubble = b;
  };

  Eng.CircuitUI.prototype._hideDemoBubble = function () {
    if (this._demoBubble && this._demoBubble.parentElement)
      this._demoBubble.parentElement.removeChild(this._demoBubble);
    this._demoBubble = null;
    this._stopDemoPulse();
    if (this._demoTipT) { clearTimeout(this._demoTipT); this._demoTipT = 0; }
  };

  // 开关呼吸脉冲（Konva.Tween 往复缩放；每次 _render 后重挂，保证重渲染不丢失）
  Eng.CircuitUI.prototype._startDemoPulse = function (swUid) {
    this._stopDemoPulse();
    this._demoPulseUid = swUid;
    this._applyDemoPulse();
  };
  Eng.CircuitUI.prototype._stopDemoPulse = function () {
    var self = this;
    if (this._demoPulseTween) {
      try { this._demoPulseTween.destroy(); } catch (e) {}
      this._demoPulseTween = null;
    }
    if (this._demoPulseUid) {
      var node = this.elemLayer.findOne(function (n) { return n.getAttr('uid') === self._demoPulseUid; });
      if (node) { node.scaleX(1); node.scaleY(1); }
    }
    this._demoPulseUid = null;
  };
  Eng.CircuitUI.prototype._applyDemoPulse = function () {
    var self = this;
    if (!this._demoPulseUid || !window.Konva) return;
    var node = this.elemLayer.findOne(function (n) { return n.getAttr('uid') === self._demoPulseUid; });
    if (!node) return;
    if (this._demoPulseTween) return; // 已在脉冲
    function beat(up) {
      var tw = new Konva.Tween({
        node: node, duration: 0.8, easing: Konva.Easings.EaseInOut,
        scaleX: up ? 1.14 : 1, scaleY: up ? 1.14 : 1,
        onFinish: function () { self._demoPulseTween = null; if (self._demoPulseUid) beat(!up); }
      });
      self._demoPulseTween = tw;
      tw.play();
    }
    beat(true);
  };

  // 8 秒无操作：若开关仍断开，课页 exploreTip 高亮闪烁一次（旧 widget 行为保留）
  Eng.CircuitUI.prototype._armDemoTipFlash = function () {
    var self = this;
    if (this._demoTipT) clearTimeout(this._demoTipT);
    this._demoTipT = setTimeout(function () {
      self._demoTipT = 0;
      var stillOpen = false;
      for (var i = 0; i < self._placed.length; i++) {
        var p = self._placed[i];
        if (p.type === 'switch' && p.params && !p.params.closed && self._demoPulseUid) { stillOpen = true; break; }
      }
      if (!stillOpen) return;
      try {
        var root = document.getElementById(self._ids.stage);
        var zone = root && root.closest ? root.closest('.phy-zone') : null;
        var tip = zone ? zone.querySelector('.phy-tip') : document.querySelector('.phy-tip');
        if (tip) {
          tip.classList.add('phy-tip-flash');
          setTimeout(function () { tip.classList.remove('phy-tip-flash'); }, 1100);
        }
      } catch (e) {}
    }, 8000);
  };

  /* ---------- 状态行 / 参数面板 / 工具条 ---------- */
  Eng.CircuitUI.prototype._renderToolbar = function () {
    var btn = document.querySelector('#' + this._ids.toolbar + ' [data-act="delete"]');
    btn.style.display = this._selected ? '' : 'none';
  };

  Eng.CircuitUI.prototype._renderStatus = function () {
    var box = document.getElementById(this._ids.status);
    if (this._solveErr) {
      box.className = 'cir-status bad';
      box.textContent = '数据错误：' + this._solveErr;
      return;
    }
    var s = this._snap;
    var parts = [];
    if (s.state === 'closed') {
      box.className = 'cir-status';
      parts.push('通路 · 总电流 ' + fmtPlain(s.totalCurrentA, 3) + ' A');
      var self = this;
      Object.keys(s.meterReadings).forEach(function (id) {
        var m = s.meterReadings[id];
        if (m.state === 'ok') parts.push(Eng.CircuitSymbols.NAMES[self._byUid(id).type] + '读数 ' + m.text + ' ' + m.unit);
      });
    } else if (s.state === 'open') {
      box.className = 'cir-status';
      parts.push('断路 · ' + (s.notes[0] || s.warnings[0] || ''));
    } else if (s.state === 'short') {
      box.className = 'cir-status bad';
      parts.push('短路！电流过大 · 短路电流很大，会烧坏电源');
    } else if (s.state === 'burned') {
      box.className = 'cir-status bad';
      parts.push(s.warnings[0] || '烧表');
    } else if (s.state === 'unsupported') {
      box.className = 'cir-status bad';
      parts.push('该接法超出本工具计算范围（竞赛级拓扑），换一种串/并联接法试试');
    } else {
      box.className = 'cir-status';
      parts.push('断路（还没有电源）');
    }
    box.textContent = parts.join('；');
  };

  Eng.CircuitUI.prototype._renderParams = function () {
    var box = document.getElementById(this._ids.params);
    var p = this._selected && this._byUid(this._selected);
    var self = this;
    if (!p) {
      box.innerHTML = '点选画布上的元件查看/修改参数。';
      return;
    }
    var h = '<b>' + escapeHtml(Eng.CircuitSymbols.NAMES[p.type]) + '</b>　';
    function num(id, label, val, step) {
      return '<label>' + escapeHtml(label) + ' <input type="number" data-p="' + id + '" value="' + val +
        '" step="' + (step || 'any') + '" style="width:70px"></label>';
    }
    if (p.type === 'source') {
      h += num('emfV', '电动势(V)', p.params.emfV, '0.1');
      if (this.allowInternalR) h += num('internalROhm', '内阻(Ω)', p.params.internalROhm, '0.1');
    } else if (p.type === 'resistor' || p.type === 'bulb') {
      h += num('resistanceOhm', '电阻(Ω)', p.params.resistanceOhm, '0.1');
    } else if (p.type === 'switch') {
      h += '<label><input type="checkbox" data-p="closed"' + (p.params.closed ? ' checked' : '') + '> 闭合</label>';
    } else if (p.type === 'ammeter') {
      h += '<label>量程 <select data-p="rangeMaxA"><option value="0.6"' +
        (p.params.rangeMaxA === 0.6 ? ' selected' : '') + '>0.6A</option><option value="3"' +
        (p.params.rangeMaxA === 3 ? ' selected' : '') + '>3A</option></select></label>';
    } else if (p.type === 'voltmeter') {
      h += '<label>量程 <select data-p="rangeMaxV"><option value="3"' +
        (p.params.rangeMaxV === 3 ? ' selected' : '') + '>3V</option><option value="15"' +
        (p.params.rangeMaxV === 15 ? ' selected' : '') + '>15V</option></select></label>';
      h += ' <button type="button" data-p="probe">表笔：点选被测元件</button>';
      if (p.params.probeNodes) h += ' <span>已跨接</span>';
    } else if (p.type === 'rheostat') {
      var f = p.params.fraction;
      var warn = f < 0.1 * 1; // 预警区：R < 0.1×maxOhm（§8.7）；此处按 fraction<0.1（minOhm=0 时等价）
      var R = p.params.minOhm + f * (p.params.maxOhm - p.params.minOhm);
      var warn2 = R < 0.1 * p.params.maxOhm;
      h += '<label>滑片 <input type="range" data-p="fraction" min="0" max="100" value="' +
        Math.round(f * 100) + '" class="' + (warn2 ? 'warnzone' : '') + '"></label>';
      h += '<span>接入 ' + fmtPlain(R, 1) + ' Ω</span>';
      if (warn2) h += '<div class="cir-warnline">⚠ 阻值过小，接近短路：再往左，电流会非常大</div>';
    }
    box.innerHTML = h;
    box.querySelectorAll('[data-p]').forEach(function (inp) {
      var key = inp.getAttribute('data-p');
      if (key === 'probe') {
        inp.addEventListener('click', function () {
          self._probeArm = true;
          self._say('点选一个被测元件，电压表将跨接到它两端。');
        });
        return;
      }
      inp.addEventListener('change', function () {
        var v;
        if (inp.type === 'checkbox') v = inp.checked;
        else if (inp.type === 'range') v = parseFloat(inp.value) / 100;
        else if (key === 'rangeMaxA' || key === 'rangeMaxV') v = parseFloat(inp.value);
        else v = parseFloat(inp.value);
        p.params[key] = v;
        // 量程切换联动 division（§6 表）
        if (key === 'rangeMaxA') p.params.divisionA = (v === 0.6 ? 0.02 : 0.1);
        if (key === 'rangeMaxV') p.params.divisionV = (v === 3 ? 0.1 : 0.5);
        if (key === 'closed' && v) self._hideDemoBubble(); // 参数面板闭合开关同样撤掉示范气泡
        self._rebuild();
      });
      if (inp.type === 'range') {
        inp.addEventListener('input', function () {
          p.params.fraction = parseFloat(inp.value) / 100;
          self._rebuild();
        });
      }
    });
  };

  // 状态行数字显示：不用 toFixed 手写小数位（CIR-22），用纯舍入转字符串
  function fmtPlain(v, dec) {
    var m = Math.pow(10, dec);
    return String(Math.round(v * m) / m);
  }
  Eng.CircuitUI.prototype._t = function () {
    var self = this;
    return {
      placed: function () { return self._placed.map(function (p) { return { uid: p.uid, type: p.type, col: p.col, row: p.row }; }); },
      extraConns: function () { return Eng.deepCopy(self._extraConns || []); },
      snapshot: function () { return self._snap ? Eng.deepCopy(self._snap) : null; },
      solveError: function () { return self._solveErr; },
      feedback: function () { return document.getElementById(self._ids.feedback).textContent; },
      statusText: function () { return document.getElementById(self._ids.status).textContent; },
      wireLayerListening: function () { return self.wireLayer.listening(); },
      hitMinEdge: function (uid) {
        var node = self.elemLayer.findOne(function (n) { return n.getAttr('uid') === uid; });
        if (!node) return -1;
        var r = node.getClientRect();
        return Math.min(r.width, r.height);
      },
      termPos: function (uid, term) { return self._termXY(uid, term); },
      wireHandlePos: function (wireId) {
        var dot = self.topLayer.findOne(function (n) { return n.getAttr('wireId') === wireId; });
        if (!dot) return null;
        return { x: dot.x(), y: dot.y() };
      },
      select: function (uid) { self._selected = uid; self._render(); self._renderToolbar(); self._renderParams(); },
      deleteSelected: function () { if (self._selected) self._deleteElement(self._selected); },
      setParam: function (uid, key, val) {
        var p = self._byUid(uid);
        p.params[key] = val;
        self._rebuild();
      },
      cellOf: function (uid) { var p = self._byUid(uid); return p ? { col: p.col, row: p.row } : null; },
      stageBox: function () { return self.stage.container().getBoundingClientRect(); }
    };
  };

})();
