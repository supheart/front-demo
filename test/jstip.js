let tool = require('./jsmethod');

function Tip() {
    this.test = function(){
        console.log('start test...');
    };

    // 计算字符串出现次数最多的字符
    this.maxTime = function(str) {
        let timeObj = {};
        // for(let i = 0; i < str.length; i++) {
            // let k = str.charAt(i);
        for (let i in str) {
            if(!timeObj[str[i]]) {
                timeObj[str[i]] = 1;
                continue;
            }
            timeObj[str[i]] ++;
        }
        let result = tool.max(timeObj); 
        console.log(result)
        return tool.max(result);
    };

    // 计算一个字符串的字节长度
    this.byteLength = function(str) {
        let rule = {
            normal: 1,
            chinese: 2
        }
        let len = 0;
        let reg = /[\u4e00-\u9fa5]/;
        for(let i = 0; i < str.length; i++) {
            if(reg.test(str.charAt(i))) {
                len += rule.chinese;
                continue;
            }
            len += rule.normal;
        }
        console.log(`${str} byte length is ${len}`)
        return len;
    };
    
    // 去掉一个数组的重复元素
    this.removeRepeat = function(arr) {
        let newArr = [];
        let timeObj = {};
        for(let i in arr) {
            if(!timeObj[arr[i]]) {
                timeObj[arr[i]] = true;
                newArr.push(arr[i]);
            }
        }
        console.log(newArr);
        return newArr;
    };

    // 深度对象克隆
    this.clone = function(obj) {
        let newObj = obj.constructor(obj.valueOf());
        if(typeof(obj) === 'object') {
            newObj = obj instanceof Array ? [] : {};
            for(let i in obj) {
                if(typeof(obj[i]) === 'object') {
                    newObj[i] = this.clone(obj[i]);
                }else {
                    newObj[i] = obj[i];
                }
            }
        }
        return newObj;
    };

    // 计算到年末的倒计时
    this.yearTimer = function() {
        let nowTime = new Date();
        let targetTime = new Date();
        console.log(nowTime.toLocaleString());
        targetTime.setFullYear(nowTime.getFullYear(), 11, 31);
        console.log(targetTime.toLocaleString());
        targetTime.setHours(23, 59, 59);
        console.log(targetTime.toLocaleString());
        let timestamp = (targetTime.getTime() - nowTime.getTime()) / 1000;
        let days = parseInt(timestamp / (24 * 3600));
        let dayTimes = timestamp % (24 * 3600);
        let hours = parseInt(dayTimes / 3600);
        let hoursTimes = dayTimes % 3600;
        let minutes = parseInt(hoursTimes / 60);
        let seconds = parseInt(hoursTimes % 60);
        console.log(`${nowTime.getFullYear()}年还剩${days}天${hours}时${minutes}分${seconds}秒`);
    };
}

module.exports = Tip;