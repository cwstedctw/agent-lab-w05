const fs=require('fs'),vm=require('vm'),assert=require('assert');
const path=require('path').join(__dirname,'../practice/02-campus-picker/output/index.html');
const html=fs.readFileSync(path,'utf8');
const data=JSON.parse(html.match(/type="application\/json">([\s\S]*?)<\/script>/)[1]);
assert.deepStrictEqual(data,JSON.parse(fs.readFileSync(require('path').join(__dirname,'../practice/02-campus-picker/activities.json'),'utf8')));
const nodes={};
for(const id of ['match-count','activities','location','time','energy','language','result','empty','history','pick','reset','clear'])nodes[id]={value:id==='time'?'30':'all',textContent:id==='activities'?JSON.stringify(data):'',innerHTML:'',listeners:{},setAttribute(){},addEventListener(n,f){this.listeners[n]=f;}};
const translated=[...html.matchAll(/data-text="([^"]+)"/g)].map(m=>({dataset:{text:m[1]},textContent:''}));
const doc={getElementById:id=>nodes[id],documentElement:{},querySelectorAll:()=>translated};
const ctx=vm.createContext({document:doc,Math});
const script=html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
vm.runInContext(script,ctx);
const run=s=>vm.runInContext(s,ctx),click=id=>nodes[id].listeners.click();
function filter(l,t,e){nodes.location.value=l;nodes.time.value=t;nodes.energy.value=e;}
filter('indoor','15','low');assert.equal(run('matchingActivities().map(a=>a.id).join(",")'),'A01,A02,A03,A04');for(let i=0;i<20;i++){click('pick');assert(['A01','A02','A03','A04'].includes(run('result.id')));}console.log('PASS 1: indoor/15/low, 20 picks');
const previous=run('JSON.stringify(history)');filter('outdoor','15','medium');click('pick');assert.equal(run('result'),null);assert(nodes.result.innerHTML.includes('沒有符合條件的活動'));assert.equal(run('JSON.stringify(history)'),previous);assert.equal(nodes.time.value,'15');console.log('PASS 2: no match, filters and history preserved');
filter('outdoor','30','medium');for(let i=0;i<10;i++){click('pick');assert.equal(run('result.id'),'A09');}console.log('PASS 3: outdoor/30/medium, 10 picks are A09');
click('clear');filter('all','60','all');const picks=[];for(let i=0;i<6;i++){click('pick');picks.unshift(run('result.id'));}assert.equal(run('history.map(a=>a.id).join(",")'),picks.slice(0,5).join(','));assert.equal((nodes.history.innerHTML.match(/<li>/g)||[]).length,5);console.log('PASS 4: latest 5 of 6 picks, newest first');
const saved=run('JSON.stringify(history)');click('reset');assert.deepStrictEqual([nodes.location.value,nodes.time.value,nodes.energy.value],['all','30','all']);assert.equal(run('JSON.stringify(history)'),saved);console.log('PASS 5: reset defaults, history preserved');
click('clear');click('language');assert.equal(run('history.length'),0);assert.equal(run('language'),'en');assert.equal(doc.documentElement.lang,'en');assert.equal(run('words[language].pick'),'Pick for me');assert(translated.every(e=>e.textContent&&!/[\u3400-\u9fff]/.test(e.textContent)));click('pick');assert(nodes.result.innerHTML.includes(run('result.name_en')));assert(!/[\u3400-\u9fff]/.test(nodes.result.innerHTML+nodes.history.innerHTML));console.log('PASS 6: clear history, English UI strings and activity');
assert(!/https?:|fetch\(|XMLHttpRequest|localStorage/.test(html));console.log('PASS: embedded original dataset; no network or persistent storage');

filter('outdoor','15','medium');nodes.location.listeners.change();assert.equal(nodes['match-count'].textContent,'Matching activities: 0');
filter('indoor','15','low');nodes.time.listeners.change();assert.equal(nodes['match-count'].textContent,'Matching activities: 4');
click('language');assert.equal(nodes['match-count'].textContent,'符合條件的活動：4');
const kept=run('JSON.stringify(history)');click('reset');assert.equal(nodes['match-count'].textContent,'符合條件的活動：9');assert.equal(run('JSON.stringify(history)'),kept);
console.log('PASS revision v2: count updates on filter, language and reset; history preserved');

