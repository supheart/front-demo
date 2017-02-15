var dataObj = function(){
    this.fruitNum = 0;
    this.double = 1;
}

// dataObj.prototype.fruitNum = 0;
// dataObj.prototype.double = 1;
dataObj.prototype.reset = function(){
    this.fruitNum = 0;
    this.double = 1;
}

dataObj.prototype.draw = function(){
    var lineHeight = 20;
    mainCtx.save();
    mainCtx.font = "normal 16px Arial";
    mainCtx.fillStyle = "white";
    mainCtx.fillText("num: " + this.fruitNum, canvasWidth / 2, canvasHeight - lineHeight*2);
    mainCtx.fillText("double: " + this.double, canvasWidth / 2, canvasHeight - lineHeight);
    mainCtx.restore();
}