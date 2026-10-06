const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.join(__dirname,'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8').replace(/^\uFEFF/,''));
const manifest=read('practice/01-club-files/output/manifest.json');
assert.equal(manifest.length,12);
for(const entry of manifest)assert(fs.readFileSync(path.join(root,'practice/01-club-files/input',entry.source)).equals(fs.readFileSync(path.join(root,'practice/01-club-files/output',entry.destination))));
console.log('PASS A: all 12 manifest entries have byte-identical output copies');
const inputPath=path.join(root,'practice/03-equipment/equipment.json');
const before=fs.readFileSync(inputPath);
const raw=read('practice/03-equipment/equipment.json');
const empty=v=>v==null||(typeof v==='string'&&v.trim()==='');
const normalized=raw.filter(row=>!Object.values(row).every(empty)).map(row=>{
 const copy={...row};for(const [key,value] of Object.entries(copy))if(key!=='qty'&&typeof value==='string')copy[key]=value.trim();
 const status=copy.status;copy.status=['available','可借','可出借'].includes(status)?'available':['borrowed','借出'].includes(status)?'borrowed':'unknown';
 return copy;
});
const out=path.join(root,'practice/03-equipment/output');fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'normalized.json'),JSON.stringify(normalized,null,2)+'\n');
const report=`# 器材清理問題報告\n\n教學模擬記錄；不推論哪個人弄錯。\n\n- 原始列數：10。\n- 保留有效列數：9（指非空列，仍可能含有資料問題）。\n- 移除列數：1；第 6 筆為空物件，沒有 source_row。\n- 文字欄位去除前後空白；qty 原樣保留；source_row 保留。\n- available／可借／可出借 → available；borrowed／借出 → borrowed；其他 → unknown。\n\n## 相同 ID 全部保留\n\n| item_id | source_row | 相同欄位（清理後） | 衝突欄位 |\n|---|---|---|---|\n| EQ01 | 1、4 | name、qty=4、status=available | 無；source_row 不同，兩筆都保留 |\n| EQ02 | 2、5 | name、status=borrowed | qty：來源列 2 為 2，來源列 5 為 3；不猜哪筆正確 |\n\n## 未確認值\n\n- source_row 7、EQ04：qty 為空字串，原樣保留，不補 0。\n- source_row 8、EQ05：qty 為 -1，原樣保留，不取絕對值。\n- source_row 9、EQ06：原狀態「待盤點」無法對應，標為 unknown，待確認。\n- source_row 10、EQ07：qty=0 是合法非負整數，保留。\n\n未合併或刪除任何相同 item_id；不依品名推定同一件器材。原始 equipment.json 未修改。\n`;
fs.writeFileSync(path.join(out,'issues.md'),report);
assert.equal(normalized.length,9);assert.deepStrictEqual(normalized.map(r=>r.source_row),[1,2,3,4,5,7,8,9,10]);
for(const row of normalized){const source=raw.find(r=>r.source_row===row.source_row);assert.strictEqual(row.qty,source.qty);}
assert.equal(normalized.filter(r=>r.item_id==='EQ01').length,2);assert.equal(normalized.filter(r=>r.item_id==='EQ02').length,2);
assert.equal(normalized.find(r=>r.source_row===9).status,'unknown');assert.equal(normalized.find(r=>r.source_row===10).qty,0);
assert(before.equals(fs.readFileSync(inputPath)));
console.log('PASS C: 10 input, 9 retained, 1 empty removed; duplicate IDs retained; qty and source bytes unchanged; unknown status reported');
