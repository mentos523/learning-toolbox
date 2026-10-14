/* 手动 3-dir 弧修复：逐条指定新 a1/a2（已人工核定意图）。
 * 用法: node tools/geom-apply-manual.mjs [--dry-run]
 */
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dryRun = process.argv.includes("--dry-run");

// [ch, pageId, vx, vy, oldA1, oldA2, newA1, newA2, 备注]
const FIXES = [
  // g01-u2-l2-p1 step2: ∠2 在 0° 与虚线 60.6° 之间
  ["g01","g01-u2-l2-p1",50,50,0,100,0,60.6,"∠2"],
  // g01-u2-l2-p2 step1: ∠1=(90,132.6), ∠2=(47.4,90)
  ["g01","g01-u2-l2-p2",50,30,240,270,90,132.6,"∠1"],
  ["g01","g01-u2-l2-p2",50,30,270,300,47.4,90,"∠2"],
  // g01-u2-l2-p3 step1: 角平分线（ray 另修）
  ["g01","g01-u2-l2-p3",50,32,245,270,90,128.7,"∠1"],
  ["g01","g01-u2-l2-p3",50,32,270,295,51.3,90,"∠2"],
  // g01-u2-l3-p3/p4: 59.7° 斜边
  ["g01","g01-u2-l3-p3",50,55,0,70,0,59.7,"∠1"],
  ["g01","g01-u2-l3-p3",50,55,70,180,59.7,180,"∠2"],
  ["g01","g01-u2-l3-p4",50,55,0,70,0,59.7,"step1 ∠1"],
  ["g01","g01-u2-l3-p4",50,55,70,180,59.7,180,"step1 ∠2"],
  // g01-u2-l3-p4 step2: seg 修正后 ∠1=(0,59.7), ∠3=(59.7,180)
  // 注意：页内有两个 (70,180)，需按 step 区分——此处用 oldA1/oldA2 区分不了，
  // step2 的是 group1 的 (70,180) 与 group3 的 (110,180)
  ["g01","g01-u2-l3-p4@step2",50,55,70,180,0,59.7,"step2 ∠1"],
  ["g01","g01-u2-l3-p4@step2",50,55,110,180,59.7,180,"step2 ∠3"],
  // g03-u1-l4-p1 step3: ∠ABD=(180,304.8)（EXT 修正后）
  ["g03","g03-u1-l4-p1",80,32,322,360,180,304.8,"∠ABD"],
  // g03-u1-l4-p2
  ["g03","g03-u1-l4-p2",80,30,301,360,180,304.8,"step1 ∠ABD"],
  ["g03","g03-u1-l4-p2@step2",80,30,119,180,124.8,180,"step2 ∠ABC"],
  ["g03","g03-u1-l4-p2@step2",80,30,301,360,180,304.8,"step2 ∠ABD"],
  // g04-u1-l5-p3 / g04-u1-l6-p1: 顶角平分线
  ["g04","g04-u1-l5-p3",50,74,235,262,237,270,"∠BAD"],
  ["g04","g04-u1-l5-p3",50,74,278,305,270,303,"∠CAD"],
  ["g04","g04-u1-l6-p1",50,74,235,262,237,270,"∠BAD"],
  ["g04","g04-u1-l6-p1",50,74,278,305,270,303,"∠CAD"],
  // g04-u1-l7-p3 step4: ∠AOP=(5.6,26.6), ∠BOP=(338.2,5.6)
  ["g04","g04-u1-l7-p3",30,60,8,20,5.6,26.6,"∠AOP"],
  ["g04","g04-u1-l7-p3",30,60,20,32,338.2,5.6,"∠BOP"],
  // g07-u1-l4-p3: P 点圆周角
  ["g07","g07-u1-l4-p3@step2",50,22,90,120,90,105,"∠APQ"],
  ["g07","g07-u1-l4-p3@step3",50,22,60,90,75,90,"∠BPQ"],
  ["g07","g07-u1-l4-p3@step4",50,22,60,120,75,105,"∠APB"],
  // g08-u1-l3-p4 step3: ∠APO=(149.8,176.1), ∠OPB=(123.5,149.8)
  ["g08","g08-u1-l3-p4",88,30,148,180,149.8,176.1,"∠APO"],
  ["g08","g08-u1-l3-p4",88,30,180,212,123.5,149.8,"∠OPB"],
];

let total=0; const unmatched=[];
const byCh={};
for(const f of FIXES){ const ch=f[0]; (byCh[ch]=byCh[ch]||[]).push(f); }
for(const [ch,list] of Object.entries(byCh)){
  const fp=path.join(ROOT,"modules/math/data",ch+".js");
  let text=readFileSync(fp,"utf8");
  // 页标记
  const pageMarks=[]; const idRe=/id:\s*"(g\d\d-u\d+-l\d+-p\d+)"/g; let im;
  while((im=idRe.exec(text))) pageMarks.push({id:im[1],idx:im.index});
  // step 标记（用于 @step2 限定）：找 "caption: \"第 N 步" 或 card
  for(const f of list){
    const [_,pidRaw,vx,vy,oa1,oa2,na1,na2,note]=f;
    const at=pidRaw.indexOf("@"); const pid=at<0?pidRaw:pidRaw.slice(0,at);
    const stepTag=at<0?null:pidRaw.slice(at+1); // step2
    const pm=pageMarks.find(p=>p.id===pid);
    if(!pm){ unmatched.push(pidRaw+" 页未找到"); continue; }
    // 页范围：到下一个页标记
    const pmi=pageMarks.indexOf(pm);
    const pageEnd=pmi+1<pageMarks.length?pageMarks[pmi+1].idx:text.length;
    const pageText=text.slice(pm.idx,pageEnd);
    // 若限定 step，找 step 起始
    let searchStart=0, searchEnd=pageText.length;
    if(stepTag){
      const stepN=stepTag.replace("step","");
      // 找第 N 个 "caption: \"第 N 步" 或 proof-replay 的第 N 个 card
      // 简化：找所有的 "step" 块比较难；用 "第 N 步" 文本定位
      const re=new RegExp("(caption:\\s*\"第\\s*"+stepN+"\\s*步|card:\\s*\"[^\"-]*-—[^\"-]*\")","g");
      // 更稳：直接数 steps 数组元素。简化处理：对 proof-replay/step-play，按 '"第 N 步' 或 'card:' 出现次数切
      const markers=[...pageText.matchAll(/caption:\s*"第\s*\d+\s*步|card:\s*"/g)].map(m=>m.index);
      // step-play 用 caption 第N步；proof-replay 用 card 顺序。统一按出现顺序取第 N 个 marker 之后到第 N+1 个之前
      if(markers.length>=+stepN){
        searchStart=markers[+stepN-1];
        searchEnd=markers.length>+stepN?markers[+stepN]:pageText.length;
      }
    }
    const seg=pageText.slice(searchStart,searchEnd);
    const arcRe=/\{\s*t:\s*"arc",\s*v:\s*\[(-?[\d.]+),(-?[\d.]+)\]((?:[^{}]|\{[^{}]*\})*?)\}/g;
    let found=null,am;
    while((am=arcRe.exec(seg))){
      const ax=+am[1],ay=+am[2],rest=am[3];
      const a1m=rest.match(/a1:\s*(-?[\d.]+)/),a2m=rest.match(/a2:\s*(-?[\d.]+)/);
      if(!a1m||!a2m) continue;
      if(Math.abs(ax-vx)<1e-9&&Math.abs(ay-vy)<1e-9&&+a1m[1]===oa1&&+a2m[1]===oa2){ found={am,a1m,a2m}; break; }
    }
    if(!found){ unmatched.push(`${pidRaw} v=[${vx},${vy}] (${oa1},${oa2}) 未找到 [${note}]`); continue; }
    const absPos=pm.idx+searchStart+found.am.index;
    let s=found.am[0];
    s=s.replace(/a1:\s*(-?[\d.]+)/,"a1: "+na1).replace(/a2:\s*(-?[\d.]+)/,"a2: "+na2);
    text=text.slice(0,absPos)+s+text.slice(absPos+found.am[0].length);
    total++;
    if(dryRun) console.log(`  ${pidRaw} [${note}] (${oa1},${oa2})->(${na1},${na2})`);
    // 页标记位置已变，重算（简化：重新扫描）
    pageMarks.length=0; const idRe2=/id:\s*"(g\d\d-u\d+-l\d+-p\d+)"/g; let im2;
    while((im2=idRe2.exec(text))) pageMarks.push({id:im2[1],idx:im2.index});
  }
  if(!dryRun) writeFileSync(fp,text,"utf8");
  console.log(ch+".js 处理完成");
}
console.log("总计: "+total);
if(unmatched.length){ console.log("未匹配:"); for(const u of unmatched) console.log("  "+u); }
