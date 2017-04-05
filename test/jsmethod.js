exports.formatDate = function(date, formatType){
        if(!date) {
        date = new Date();
    }
    if(!formatType) {
        formatType = 'yyyy-MM-dd hh:mm:ss';
    }

    // 判断年份的正则，特殊处理
    if(/(y+)/.test(formatType)) {
        let yearStr = RegExp.$1;
        let yearValue = (date.getFullYear() + '').substr(4 - yearStr.length);
        formatType = formatType.replace(yearStr, yearValue);
    }

    // 剩余都是两位数的格式
    let regexpParam = {
        'M+': date.getMonth() + 1,     // 月份从0开始
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };

    for(let i in regexpParam) {
        if(new RegExp('(' + i + ')').test(formatType)) {
            let paramStr = RegExp.$1;
            let paramValue = regexpParam[i] + '';
            // 计算当前格式对应的时间内容
            paramValue =  paramStr.length === 1 ? str : padLeftZero(paramValue);
            formatType = formatType.replace(RegExp.$1, paramValue);
        }
    }
    return formatType;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};