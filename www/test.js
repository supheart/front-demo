let Tip = require('../test/jstip');
let tool = require('../test/jsmethod');

let t = new Tip();
t.test();

console.log(`current time: ${tool.formatDate(new Date())}`);

t.maxTime('asdfssaaasasasasaa');
t.byteLength('aabb哈哈c');
t.removeRepeat([1,1,1,1,12,3,1,43,12,12,1]);

// var cc = [1,2,3,4];
// var dd = t.clone(cc);
// dd[2] = 4;
// console.log(`source obj: ${cc}`);
// console.log(`new obj: ${dd}`);

var aa = {a: '1',b: '2',c: '3', d: {aa: 1, bb: 2}};
var bb = t.clone(aa);
var objStr = JSON.stringify(aa);
var newObjStr = JSON.stringify(bb);
console.log(`source obj: ${objStr}`);
console.log(`new obj: ${newObjStr}`);
bb.a='a';
bb.d.aa = 2;

var objStr = JSON.stringify(aa);
var newObjStr = JSON.stringify(bb);
console.log(`source obj: ${objStr}`);
console.log(`new obj: ${newObjStr}`);

t.yearTimer();


