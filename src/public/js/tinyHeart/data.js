// 计数对象
var dataObj = function(){
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.isStart = false;
    this.isStop = false;
    this.gameOver = true;
    this.alpha = 0;
}

// dataObj.prototype.fruitNum = 0;
// dataObj.prototype.double = 1;
// 重置果实
dataObj.prototype.reset = function(){
    this.fruitNum = 0;
    this.double = 1;
}

// 重置分数
dataObj.prototype.resetScore = function(){
    this.score = 0;
}

// 绘制字体
dataObj.prototype.draw = function(){
    var lineHeight = 20;
    mainCtx.save();
    // mainCtx.font = "normal 16px Arial";
    mainCtx.font = "normal 24px Verdana";
    mainCtx.textAlign = "center";
    mainCtx.fillStyle = "white";
    mainCtx.shadowColor = "white";
    mainCtx.shadowBlur = 10;
    // 绘制分数
    // mainCtx.fillText("num: " + this.fruitNum, canvasWidth / 2, canvasHeight - lineHeight*2);
    // mainCtx.fillText("double: " + this.double, canvasWidth / 2, canvasHeight - lineHeight*3);
    mainCtx.fillText("Score: " + this.score, canvasWidth / 2, canvasHeight - lineHeight);

    // 绘制 gmeover
    if(this.gameOver && this.isStart){
        mainCtx.font = "bold 32px Verdana";
        this.alpha = this.alpha >= 1 ? 1 : this.alpha + deltaTime * 0.0003;
        mainCtx.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
        mainCtx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2);
    }
    mainCtx.restore();
}

// 计算加分
dataObj.prototype.addScore = function(){
    var newScore = this.fruitNum * 10 * this.double;
    this.score += newScore;
    this.reset(); 
    // 返回当前加分数
    return newScore;
}