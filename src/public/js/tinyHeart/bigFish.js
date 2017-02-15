var bigFishObj = function(){
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    // 三张图片分别表示大鱼的眼睛、身体、尾巴
    this.bigEye = new Image();
    this.bigBody = new Image();
    this.bigTail = new Image();
}

bigFishObj.prototype.init = function(){
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.angle = 0;
    this.bigEye.src = "/images/tinyHeart/bigEye0.png";
    this.bigBody.src = "/images/tinyHeart/bigSwim0.png";
    this.bigTail.src = "/images/tinyHeart/bigTail0.png";
}

// 绘制果实方法
bigFishObj.prototype.draw = function(){
    // lerp x, y 取坐标点趋向指定坐标点，这里指大鱼坐标趋向鼠标坐标
    var lerpDistanceCount = 0.92;
    this.x = lerpDistance(mx, this.x, lerpDistanceCount);
    this.y = lerpDistance(my, this.y, lerpDistanceCount); 

    // delta angle --> Math.atan2(y, x) 计算大鱼坐标与鼠标的反tan值，获取趋向鼠标的角度
    var deltaX = mx - this.x;
    var deltaY = my - this.y;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    // lerp angle 计算大鱼的角度趋向鼠标
    var lerpAngleCount = 0.6;
    this.angle = lerpAngle(beta, this.angle, lerpAngleCount);

    // 绘制
    mainCtx.save();
    mainCtx.translate(this.x, this.y);
    mainCtx.rotate(this.angle);
    mainCtx.drawImage(this.bigTail, -this.bigTail.width / 2 + 28, -this.bigTail.height / 2);
    mainCtx.drawImage(this.bigBody, -this.bigBody.width / 2, -this.bigBody.height / 2);
    mainCtx.drawImage(this.bigEye, -this.bigEye.width / 2, -this.bigEye.height / 2);
    mainCtx.restore();
}

