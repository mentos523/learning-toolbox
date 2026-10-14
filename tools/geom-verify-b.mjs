/* 自检(b)：独立用真实原语验证弧端点对齐。
 * vm 加载 geom-primitives.js，用 G.polar 按渲染器同款调用算弧端点，
 * 用 atan2(dy,dx)（逻辑 y-up，无取反）算边方向，
 * 统计"端点偏离边方向 >3°"的弧数。
 */
import { readFileSync } from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const norm360 = (d) => { d %= 360; return d < 0 ? d + 360 : d; };
const deg = (r) => (r * 180) / Math.PI;
const dist = (ax, ay, bx, by) => Math.hypot(bx - ax, by - ay);
const angDiff = (a, b) => Math.abs(norm360(a - b + 180) - 180);

// DOM 桩
function makeEl(tag) {
  const e = { tag, attrs: {}, children: [],
    setAttribute(k,v){this.attrs[k]=String(v);}, getAttribute(k){return this.attrs[k];},
    appendChild(c){this.children.push(c);return c;} };
  return e;
}
const primBox = { window: {}, document: { createElementNS(ns,tag){return makeEl(tag);} }, navigator: {}, console };
vm.createContext(primBox);
vm.runInContext(readFileSync(path.join(ROOT,"modules/math/js/geom-primitives.js"),"utf8"), primBox);
const G = primBox.window.GEOM;

// 加载数据
const dataBox = { window: {}, console };
vm.createContext(dataBox);
for (let n=0;n<=13;n++){ const id="g"+String(n).padStart(2,"0");
  vm.runInContext(readFileSync(path.join(ROOT,"modules/math/data",id+".js"),"utf8"), dataBox); }
const CH = dataBox.window.MATH_CH;

// 帧抽取（静态）
function framesOf(page){
  const out=[]; const jobs=[];
  if(page.interaction) jobs.push(page.interaction);
  if(page.auxInteraction) jobs.push(page.auxInteraction);
  for(const ix of jobs){ const t=ix.type,p=ix.params||{};
    if(t==="step-play") (p.steps||[]).forEach((s,i)=>out.push({label:"step"+(i+1),shapes:s.shapes}));
    else if(t==="compare-toggle") (p.views||[]).forEach((v,i)=>out.push({label:"view"+i,shapes:v.shapes}));
    else if(t==="proof-replay") (p.steps||[]).forEach((s,i)=>out.push({label:"step"+(i+1),shapes:s.shapes}));
    else if(t==="construction-step") (p.steps||[]).forEach((s,i)=>out.push({label:"step"+(i+1),shapes:s.shapes}));
    else if(t==="tap-highlight") out.push({label:"tap",shapes:(p.base||[]).concat((p.items||[]).map(it=>it.shape||it))});
  }
  return out;
}
function sidesOf(shapes){
  const out=[]; const push=(x1,y1,x2,y2)=>out.push({x1,y1,x2,y2,len:dist(x1,y1,x2,y2)});
  for(const sh of shapes){ if(!sh||!sh.t) continue;
    if(sh.t==="seg"&&sh.a&&sh.b) push(sh.a[0],sh.a[1],sh.b[0],sh.b[1]);
    else if(sh.t==="poly"&&Array.isArray(sh.pts)){ const pts=sh.pts,n=pts.length,m=sh.close!==false?n:Math.max(0,n-1);
      for(let i=0;i<m;i++){ const p1=pts[i],p2=pts[(i+1)%n]; if(p1&&p2) push(p1[0],p1[1],p2[0],p2[1]); } }
    else if(sh.t==="ray"&&sh.p){ const L=+sh.len||30,a=(+sh.ang||0)*Math.PI/180;
      push(sh.p[0],sh.p[1],sh.p[0]+L*Math.cos(a),sh.p[1]+L*Math.sin(a)); } }
  return out;
}
function geoVerts(shapes){
  const out=[];
  for(const sh of shapes){ if(!sh||!sh.t) continue;
    if(sh.t==="seg"){ if(sh.a)out.push(sh.a); if(sh.b)out.push(sh.b); }
    else if(sh.t==="poly") (sh.pts||[]).forEach(p=>out.push(p));
    else if(sh.t==="ray"||sh.t==="pt"){ if(sh.p)out.push(sh.p); } }
  return out.filter(p=>Array.isArray(p));
}

let totalArcs=0, badArcs=0;
const badList=[];
// 定向白名单（2026-10-14 裁决）：g10-u1-l6-p1 step4 旋转示意弧无边可依，数据不许动，此处豁免；
// 不开全局口子：仅匹配"页 id + 弧特征（v/a1/a2/r）"。
const ARC_EXEMPT=[{page:"g10-u1-l6-p1",v:[50,52],a1:160,a2:20,r:18}];
function isExemptArc(pageId,sh){
  return ARC_EXEMPT.some((e)=>e.page===pageId&&
    Math.abs(e.v[0]-sh.v[0])<1e-9&&Math.abs(e.v[1]-sh.v[1])<1e-9&&
    e.a1===sh.a1&&e.a2===sh.a2&&+e.r===+sh.r);
}
for(const chId of Object.keys(CH)){
  for(const u of (CH[chId].units||[])) for(const l of (u.lessons||[])) for(const page of (l.pages||[])){
    if(!page||!page.id) continue;
    for(const fr of framesOf(page)){
      const shapes=fr.shapes||[];
      const sides=sidesOf(shapes), verts=geoVerts(shapes);
      for(const sh of shapes){
        if(!sh||sh.t!=="arc"||!sh.v) continue;
        // 圆弧高亮：弧心=圆心且半径≈圆半径 → 跳过（审计同款）
        const circles=shapes.filter(c=>c&&c.t==="circle"&&c.c);
        const isHL=circles.some(c=>dist(sh.v[0],sh.v[1],c.c[0],c.c[1])<=0.75 && Math.abs((+c.r||10)-(+sh.r||12))<=8);
        if(isHL) continue;
        // 弧心须在顶点上（否则装饰弧，跳过）
        let bd=1e9; for(const q of verts){ const d=dist(sh.v[0],sh.v[1],q[0],q[1]); if(d<bd)bd=d; }
        if(bd>0.75) continue;
        totalArcs++;
        if(isExemptArc(page.id,sh)) continue; // 2026-10-14 裁决豁免：旋转示意弧无边可依
        // 渲染器同款：a1 缺省→0，a2 缺省→90
        const a1e=sh.a1==null?0:+sh.a1, a2e=sh.a2==null?90:+sh.a2;
        const s1=norm360(a1e), s2=norm360(a2e);
        // 用 G.polar 算端点方向（SVG 像素系，y 向下）
        // 为避开 geoFrame 缩放，直接在逻辑坐标系用"像素等价"：顶点置原点，polar 给出方向向量
        // polar(vx,vy,r,a) = [vx+r*cos a, vy-r*sin a]，方向为 (cos a, -sin a)
        // 边方向（逻辑 y-up）：atan2(dy,dx)。按定论，弧正确 ⟺ a = atan2(dy,dx)。
        // 此处用 G.polar 实际计算端点，再反推角度，验证与 atan2 一致（端到端）。
        const r=+(sh.r||12);
        const [ex1,ey1]=G.polar(0,0,r,s1), [ex2,ey2]=G.polar(0,0,r,s2);
        // 从端点反推数学角：在 SVG 系，方向 (cos a, -sin a)，故 a = atan2(-(ey), ex)
        const back1=norm360(deg(Math.atan2(-ey1,ex1))), back2=norm360(deg(Math.atan2(-ey2,ex2)));
        // 边方向（逻辑 y-up atan2，无取反）
        const eman=[];
        for(const s of sides){
          if(s.len<1e-9) continue;
          // 点到线段距离
          const dx=s.x2-s.x1, dy=s.y2-s.y1, L2=dx*dx+dy*dy;
          let t=L2>0?((sh.v[0]-s.x1)*dx+(sh.v[1]-s.y1)*dy)/L2:0; t=Math.max(0,Math.min(1,t));
          const pd=dist(sh.v[0],sh.v[1],s.x1+dx*t,s.y1+dy*t);
          if(pd>0.75) continue;
          const d1=dist(sh.v[0],sh.v[1],s.x1,s.y1), d2=dist(sh.v[0],sh.v[1],s.x2,s.y2);
          if(d1>0.75) eman.push(norm360(deg(Math.atan2(s.y1-sh.v[1],s.x1-sh.v[0]))));
          if(d2>0.75) eman.push(norm360(deg(Math.atan2(s.y2-sh.v[1],s.x2-sh.v[0]))));
        }
        const ded=[]; for(const d of eman){ if(!ded.some(x=>angDiff(x,d)<1.0)) ded.push(d); }
        // 检查：back1/back2 是否各落在一条边方向 ±3°
        const ok1=ded.some(d=>angDiff(d,back1)<=3), ok2=ded.some(d=>angDiff(d,back2)<=3);
        if(!(ok1&&ok2)){
          badArcs++;
          if(badList.length<20) badList.push(`${page.id} ${fr.label} v=[${sh.v}] a1=${sh.a1} a2=${sh.a2} back=(${back1.toFixed(1)},${back2.toFixed(1)}) edges=[${ded.map(d=>d.toFixed(1)).join(",")}]`);
        }
      }
    }
  }
}
console.log(`检查弧数: ${totalArcs}, 端点偏离>3°: ${badArcs}`);
for(const b of badList) console.log("  "+b);
