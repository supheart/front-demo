var bigFishObj = function(){
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    // 三组图片分别表示大鱼鱼的眼睛、身体、尾巴
    this.bigEye = {
        images: [],
        timer: 0,
        imgIndex: 0,
        imgCount: 2,
        runTimer: 1000
    }
    this.bigBody = {
        images: [],
        timer: 0,
        imgIndex: 0,
        imgCount: 8,
        runTimer: 1000
    }
    this.bigTail = {
        images: [],
        timer: 0,
        imgIndex: 0,
        imgCount: 8,
        runTimer: 68
    }
}

bigFishObj.prototype.init = function(){
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.angle = 0;
    // this.bigEye.src = "/images/tinyHeart/bigEye0.png";
    // this.bigBody.src = "/images/tinyHeart/bigSwim0.png";
    // this.bigTail.src = "/images/tinyHeart/bigTail0.png";
    for(var i = 0; i < this.bigTail.imgCount; i++){
        this.bigTail.images[i] = new Image();
        this.bigTail.images[i].src = "/images/tinyHeart/bigTail" + i + ".png";
    }
    for(var i = 0; i < this.bigBody.imgCount; i++){
        this.bigBody.images[i] = new Image();
        this.bigBody.images[i].src = "/images/tinyHeart/bigSwim" + i + ".png";
    }
    for(var i = 0; i < this.bigEye.imgCount; i++){
        this.bigEye.images[i] = new Image();
        this.bigEye.images[i].src = "/images/tinyHeart/bigEye" + i + ".png";
    }
}

// 绘制大鱼方法
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

    // 计算尾巴动画
    this.bigTail.timer += deltaTime;
    if(this.bigTail.timer > this.bigTail.runTimer){
        this.bigTail.timer %= this.bigTail.runTimer;
        this.bigTail.imgIndex = (this.bigTail.imgIndex + 1) % this.bigTail.imgCount;
    }
    
    // 计算眼睛动画
    this.bigEye.timer += deltaTime;
    if(this.bigEye.timer > this.bigEye.runTimer){
        this.bigEye.timer %= this.bigEye.runTimer;
        this.bigEye.imgIndex = (this.bigEye.imgIndex + 1) % this.bigEye.imgCount;
        this.bigEye.runTimer = this.bigEye.imgIndex == 0 ? Math.random()*1500 + 2000 : 200;
    }

    // 计算身体动画
    this.bigBody.timer += deltaTime;
    if(this.bigBody.timer > this.bigBody.runTimer){
        this.bigBody.timer %= this.bigBody.runTimer;
        // this.bigBody.imgIndex = (this.bigBody.imgIndex + 1) % this.bigBody.imgCount;
        this.bigBody.imgIndex = this.bigBody.imgIndex + 1 >= this.bigBody.imgCount ? this.bigBody.imgCount - 1 : this.bigBody.imgIndex + 1;
    }

    // 绘制
    mainCtx.save();
    mainCtx.translate(this.x, this.y);
    mainCtx.rotate(this.angle);
    mainCtx.drawImage(this.bigTail.images[this.bigTail.imgIndex], -this.bigTail.images[this.bigTail.imgIndex].width / 2 + 25, -this.bigTail.images[this.bigTail.imgIndex].height / 2);
    mainCtx.drawImage(this.bigBody.images[this.bigBody.imgIndex], -this.bigBody.images[this.bigBody.imgIndex].width / 2, -this.bigBody.images[this.bigBody.imgIndex].height / 2);
    mainCtx.drawImage(this.bigEye.images[this.bigEye.imgIndex], -this.bigEye.images[this.bigEye.imgIndex].width / 2, -this.bigEye.images[this.bigEye.imgIndex].height / 2);
    // mainCtx.drawImage(this.bigTail, -this.bigTail.width / 2 + 28, -this.bigTail.height / 2);
    // mainCtx.drawImage(this.bigBody, -this.bigBody.width / 2, -this.bigBody.height / 2);
    // mainCtx.drawImage(this.bigEye, -this.bigEye.width / 2, -this.bigEye.height / 2);
    mainCtx.restore();
}

// 大鱼喂食后的状态
bigFishObj.prototype.empty = function(){
    this.bigBody.imgIndex = 0;
}

