let Tip = require('../test/jstip');
let tool = require('../test/jsmethod');

let t = new Tip();
t.test();

console.log(`current time: ${tool.formatDate(new Date())}`);


