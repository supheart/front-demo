var canvasWidth = canvasHeight = Math.min(window.screen.width - 20, 800);
var borderWidth = 3, strokeColor = "black";
var isMouseDown = false;
var lastLoc, lastTimetamp, lastLienWidth;
var canvas, ctx;

// 初始化
function init(){
    console.log("start canvas init...");
    canvas = document.getElementById("canvas");
    // canvasHeight = canvasWidth = Math.min(screen.width - 20, 800);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");
    lastLoc = {x: 0, y: 0};
    lastLienWidth = -1;

    addEvent();
}

// 重绘事件
function redraw(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBg();
}

// 绘制方格背景
function drawBg(){
    console.log("draw bg...");
    // 画外边框
    ctx.save();
    ctx.beginPath();
    // ctx.rect(borderWidth, borderWidth, canvasWidth - borderWidth*2, canvasHeight - borderWidth * 2);
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.closePath();
    ctx.lineWidth = borderWidth * 2;
    ctx.strokeStyle = "rgb(230, 11, 9)";
    ctx.stroke();

    // 画米字线
    ctx.moveTo(0, 0);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.moveTo(canvasWidth, 0);
    ctx.lineTo(0, canvasHeight);
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
}

// 开始绘制
function beginStroke(point){
    isMouseDown = true;
    lastLoc = windowToCanvas(point.x, point.y);
    lastTimetamp = new Date().getTime();
}

// 进行绘制
function moveStroke(point){
    console.log("onmousemove");
    var curLoc = windowToCanvas(point.x, point.y);
    var curTimetamp = new Date().getTime();
    var s = getDistance(lastLoc, curLoc);
    var t = curTimetamp - lastTimetamp;
    var curLineWidth = getLineWidth(s, t);

    // draw content
    ctx.beginPath();
    ctx.moveTo(lastLoc.x, lastLoc.y);
    ctx.lineTo(curLoc.x, curLoc.y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = curLineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    lastLoc = curLoc;
    lastTimetamp = curTimetamp;
    lastLienWidth = curLineWidth;
}
// 结束绘制
function endStroke(){
    isMouseDown = false;
}

// 将屏幕坐标转换为canvas坐标
function windowToCanvas(x, y){
    var bbox = canvas.getBoundingClientRect();
    return {x: Math.round(x - bbox.left), y: Math.round(y - bbox.top)}
}

// 计算两点距离
function getDistance(sp, tp){
    return Math.sqrt((sp.x - tp.x)*(sp.x - tp.x) + (sp.y - tp.y)*(sp.y - tp.y));
}

// 获取笔画宽度
var maxLineWidth = canvasWidth / 30;
var minLineWidth = canvasWidth > 300 ? 2 : 1;
var maxSpeed = canvasWidth / 100;
var minSpeed = 0.1;
function getLineWidth(distance, time){
    var speed = distance / time;
    var resultLineWidth;
    if(speed <= minSpeed)
        resultLineWidth = maxLineWidth;
    else if(speed >= maxSpeed)
        resultLineWidth = minLineWidth;
    else{
        resultLineWidth = maxLineWidth - (speed - minSpeed)/(maxSpeed - minSpeed)*(maxLineWidth - minLineWidth);
    }

    if(lastLienWidth == -1)
        return resultLineWidth;
    
    return resultLineWidth/3 + lastLienWidth*2/3;
}

// 鼠标事件
function addEvent(){
    // mx = e.clientX - canvas.getBoundingClientRect().left;
    // my = e.clientY - canvas.getBoundingClientRect().top;
    canvas.onmousedown = function(e){
        e.preventDefault();
        // console.log("onmousedown");
        // console.log(lastLoc.x, lastLoc.y);
        beginStroke({x: e.clientX, y: e.clientY});
    }
    canvas.onmouseup = function(e){
        e.preventDefault();
        // console.log("onmouseup");
        endStroke();
    }
    canvas.onmouseout = function(e){
        e.preventDefault();
        // console.log("onmouseout");
        endStroke();
    }
    canvas.onmousemove = function(e){
        e.preventDefault();
        if(isMouseDown){
            moveStroke({x: e.clientX, y: e.clientY});
        }
    }
    canvas.addEventListener("touchstart", function(e){
        e.preventDefault();
        beginStroke({x: e.touches[0].clientX, y: e.touches[0].clientY});
    });
    canvas.addEventListener("touchmove", function(e){
        if(isMouseDown){
            moveStroke({x: e.touches[0].clientX, y: e.touches[0].clientY})
        }
    });
    canvas.addEventListener("touchend", function(e){
        endStroke();
    });
}