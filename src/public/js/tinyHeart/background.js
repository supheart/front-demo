var aneNum = 66;
var aneList = [];

// 画背景图片
function drawBackground(){
    bgCtx.drawImage(bgPic, 0, 0, canvasWidth, canvasHeight);
}

// 初始化海葵对象
function initAne(){
    for(var i = 0; i < aneNum; i++){
        var ane = {
            x: i*18 + Math.random()*20,             // 计算海葵横坐标位置
            width: 18 + Math.random()*5,            // 计算海葵的宽度
            length: 220 + Math.random()*50,         // 计算海葵长度
        }
        aneList[i] = ane;
    }
}

// 画海葵
function drawAne(){
    // save restore, context设置的样式只在当前范围内有效
    bgCtx.save();
    bgCtx.globalAlpha = 0.6;
    bgCtx.lineCap = "round";
    bgCtx.strokeStyle = "#3b154e";
    for(var i = 0; i < aneNum; i++){
        bgCtx.beginPath();
        bgCtx.moveTo(aneList[i].x, canvasHeight);
        bgCtx.lineTo(aneList[i].x, canvasHeight - aneList[i].length);
        bgCtx.lineWidth = aneList[i].width;
        bgCtx.stroke();
    }
    bgCtx.restore();
}