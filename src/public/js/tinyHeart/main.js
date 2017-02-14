var mainCanvas, bgCanvas;
var mainCtx, bgCtx;
var canvasWidth, canvasHeight;

var lastTime, deltaTime;
var bgPic = new Image();
window.onload = function(){
    console.log("start tiny heart log...");
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameLoop();
}

function init(){
    mainCanvas =  document.getElementById("mainCanvas");
    mainCtx = mainCanvas.getContext("2d");
    bgCanvas = document.getElementById("bgCanvas");
    bgCtx = bgCanvas.getContext("2d");

    canvasWidth = mainCanvas.width;
    canvasHeight = mainCanvas.height;
    bgPic.src = "/images/tinyHeart/background.jpg";
}

function gameLoop(){
    window.requestAnimationFrame(gameLoop);

    drawBackground();
    // console.log("loop");

    // 测试帧率
    // var now = Date.now();
    // deltaTime = now - lastTime;
    // lastTime = now;
    // console.log(deltaTime);
}