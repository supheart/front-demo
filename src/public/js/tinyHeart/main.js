var mainCanvas, bgCanvas;
var mainCtx, bgCtx;
var canvasWidth = 1200, canvasHeight = 800;

var lastTime, deltaTime;
var bgPic = new Image();
var fruit, bigFish, babyFish, wave, dust, data;
var mx, my;
window.onload = function(){
    console.log("start tiny heart log...");
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameLoop();
    // 监听空格键用于暂停游戏
    document.getElementsByTagName("html")[0].onkeyup = function(e){
        // console.log(e);
        if(e.code == "Space" || e.keyCode == 32){
            stopGame();
        }
    }
}

function init(){
    // 设置分数
    document.getElementById("score").innerHTML = window.localStorage.maxScore || 0;
    mainCanvas =  document.getElementById("mainCanvas");
    mainCtx = mainCanvas.getContext("2d");
    bgCanvas = document.getElementById("bgCanvas");
    bgCtx = bgCanvas.getContext("2d");

    mainCanvas.width = bgCanvas.width = canvasWidth;
    mainCanvas.height = bgCanvas.height = canvasHeight;

    mx = canvasWidth / 2, my = canvasHeight / 2;
    mainCanvas.addEventListener("mousemove", onMouseMove, false);
    mainCanvas.addEventListener("touchmove", onTouchMove, false);

    bgPic.src = "/images/tinyHeart/background.jpg";

    initAne();
    fruit = new fruitObj();
    fruit.init();
    bigFish = new bigFishObj();
    bigFish.init();
    babyFish = new babyFishObj();
    babyFish.init();
    wave = new waveObj();
    wave.init();
    dust = new dustObj();
    dust.init();
    data = new dataObj();
}

function gameLoop(){
    window.requestAnimationFrame(gameLoop);

    // bgCanvas draw
    drawBackground();
    drawAne();
    fruit.draw();
    fruit.monitor();

    // mainCanvas draw
    mainCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    babyFish.draw();
    bigFish.draw();
    data.draw();
    if(!data.isStop){
        collisionBigFishAndFruit();
        collisionBigFishAndBabyFish();
    }
    
    wave.draw();
    dust.draw();
    // console.log("loop");

    // 测试帧率
    var now = Date.now();
    deltaTime = now - lastTime > 40 ? 40 : now - lastTime;
    lastTime = now;
    // console.log(deltaTime);
}

// 鼠标移动
function onMouseMove(e){
    // 获取canvas中鼠标坐标的方法，这里去第一种
    // 1
    // var mx = e.clientX - mainCanvas.getBoundingClientRect().left;
    // var my = e.clientY - mainCanvas.getBoundingClientRect().top;

    // 2
    // if(e.offsetX || e.layerx){
    //     nmx = e.offsetX == undefined ? e.layerX : e.offsetX;
    //     nmy = e.offsetY == undefined ? e.layerY : e.offsetY;
    // }

    // console.log(e.offsetX + ":" + e.offsetY + ';' + mx + ":" + my + ';' + nmx + ":" + nmy);

    if(data.gameOver) return;
    mx = e.clientX - mainCanvas.getBoundingClientRect().left;
    my = e.clientY - mainCanvas.getBoundingClientRect().top;
}

// 移动端手机移动
function onTouchMove(e){
    if(data.gameOver) return;
    mx = e.touches[0].clientX - mainCanvas.getBoundingClientRect().left;
    my = e.touches[0].clientY - mainCanvas.getBoundingClientRect().top;
};