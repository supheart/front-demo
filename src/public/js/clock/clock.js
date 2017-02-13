var canvasWidth = 1024, canvasHeight = 768;
var radius = 8;
var marginTop = 60, marginLeft = 30;
const endTime = new Date("2017/2/10,14:20:30");
var currentLastSecond = 0;
var balls = [];
const colors = ["#33b5e5","#0099cc","#aa66cc","#9933cc","#99cc00","#669900","#ff8800","#ff4444","#cc0000","#ffbb33"];

window.onload = function(){
    console.log("start clock log...");

    // 设置自适应的长度
    canvasWidth = document.body.clientWidth;
    canvasHeight = document.body.clientHeight;

    marginLeft = Math.round(canvasWidth/10);
    radius = Math.round(canvasWidth*4/5/108) - 1;
    marginTop = Math.round(canvasHeight/5);

    var canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var context = canvas.getContext("2d");

    currentLastSecond = getCurrentLastSecond();

    setInterval(function(){
        render(context);
        update();
    }, 50);
}

// 更新剩余秒数
function update(){
    var nextLastSecond = getCurrentLastSecond();

    // 计算下一次时间更新的时分秒
    var nextHours = parseInt(nextLastSecond / 3600);
    var nextMinutes = parseInt((nextLastSecond - nextHours * 3600)/60);
    var nextSeconds = parseInt(nextLastSecond % 60);

    // 计算当前时间更新的时分秒
    var currentHours = parseInt(currentLastSecond / 3600);
    var currentMinutes = parseInt((currentLastSecond - currentHours * 3600)/60);
    var currentSeconds = parseInt(currentLastSecond % 60);

    if(nextLastSecond != currentLastSecond){
        // 计算每个数字的小球位置
        if(parseInt(nextHours/10) != parseInt(currentHours/10)){
            addBalls(marginLeft + 0, marginTop, parseInt(currentHours/10));
        }
        if(parseInt(nextHours%10) != parseInt(currentHours%10)){
            addBalls(marginLeft + 15*(radius + 1), marginTop, parseInt(currentHours%10));
        }
        if(parseInt(nextMinutes/10) != parseInt(currentMinutes/10)){
            addBalls(marginLeft + 39*(radius + 1), marginTop, parseInt(currentMinutes/10));
        }
        if(parseInt(nextMinutes%10) != parseInt(currentMinutes%10)){
            addBalls(marginLeft + 54*(radius + 1), marginTop, parseInt(currentMinutes%10));
        }
        if(parseInt(nextSeconds/10) != parseInt(currentSeconds/10)){
            addBalls(marginLeft + 78*(radius + 1), marginTop, parseInt(currentSeconds/10));
        }
        if(parseInt(nextSeconds%10) != parseInt(currentSeconds%10)){
            addBalls(marginLeft + 93*(radius + 1), marginTop, parseInt(currentSeconds%10));
        }

        currentLastSecond = nextLastSecond;
    }

    updateBalls();

    console.log(balls.length);
}

// 更新小球的状态
function updateBalls(){
    for(var i in balls){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        
        // 如果发生碰撞，则有摩擦系数较少速度
        if(balls[i].y >= canvasHeight - radius){
            balls[i].y = canvasHeight - radius;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }

    var cnt = 0;
    for(var i in balls){
        if(balls[i].x + radius > 0 && balls[i].x - radius < canvasWidth){
            balls[cnt++] = balls[i];
        }
    }

    while(balls.length > cnt){
        balls.pop();
    }
}

// 添加小球到数组中
function addBalls(x, y, num){
    // 遍历数组，如果点阵数字的值为1，则添加小球到数组
    for(var i in digit[num]){
        for(var j in digit[num][i]){
            if(digit[num][i][j] == 1){
                // 随机生成小球的各种特征
                var ball = {
                    x: x + j*2*(radius + 1) + radius + 1,
                    y: y + i*2*(radius + 1) + radius + 1,
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random()*1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random()*colors.length)]
                }

                // 添加小球
                balls.push(ball);
            }
        }
    }
    // console.log(balls[balls.length -1]);
}

// 获取剩余时间的秒数
function getCurrentLastSecond(){
    var currentTime = new Date();
    var ret = endTime.getTime() - currentTime.getTime();
    ret = Math.round(ret/1000);

    return ret >= 0 ? ret : 0; 
}

// 绘制时钟内容
function render(ctx){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    var hours = parseInt(currentLastSecond / 3600);
    var minutes = parseInt((currentLastSecond - hours * 3600)/60);
    var seconds = parseInt(currentLastSecond % 60);

    renderDigit(marginLeft, marginTop, parseInt(hours/10), ctx);
    renderDigit(marginLeft + 15 * (radius + 1), marginTop, parseInt(hours%10), ctx);
    renderDigit(marginLeft + 30 * (radius + 1), marginTop, 10, ctx);
    renderDigit(marginLeft + 39 * (radius + 1), marginTop, parseInt(minutes/10), ctx);
    renderDigit(marginLeft + 54 * (radius + 1), marginTop, parseInt(minutes%10), ctx);
    renderDigit(marginLeft + 69 * (radius + 1), marginTop, 10, ctx);
    renderDigit(marginLeft + 78 * (radius + 1), marginTop, parseInt(seconds/10), ctx);
    renderDigit(marginLeft + 93 * (radius + 1), marginTop, parseInt(seconds%10), ctx);

    // console.log(balls[balls.length -1]);
    // 绘制散落的小球
    for(var i in balls){
        ctx.fillStyle = balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

// 绘制数字内容
function renderDigit(x, y, num, ctx){
    ctx.fillStyle = "#005588";
    // 遍历数组，如果点阵数字的值为1，则填充小球
    for(var i in digit[num]){
        for(var j in digit[num][i]){
            if(digit[num][i][j] == 1){
                ctx.beginPath();
                ctx.arc(x + j*2*(radius + 1) + radius + 1, y + i*2*(radius + 1) + radius + 1, radius, 0, 2*Math.PI);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}