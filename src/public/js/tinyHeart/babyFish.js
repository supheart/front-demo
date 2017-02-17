// 小鱼对象
var babyFishObj = function(){
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    // 三组图片分别表示小鱼的眼睛、身体、尾巴
    this.babyEye = {
        images: [],
        timer: 0,
        imgIndex: 0,
        imgCount: 2,
        runTimer: 1000
    }
    this.babyBody = {
        images: [],
        timer: 0,
        imgIndex: 0,
        imgCount: 20,
        runTimer: 800
    }
    this.babyTail = {
        images: [],
        timer: 0,
        imgIndex: 0,
        imgCount: 8,
        runTimer: 68
    }
}

// 小鱼初始化
babyFishObj.prototype.init = function(){
    this.x = canvasWidth / 2 + Math.random()*50 + 50;
    this.y = canvasHeight / 2 + Math.random()*50 + 50;
    this.angle = 0;
    // this.babyEye.src = "/images/tinyHeart/babyEye0.png";
    // this.babyBody.src = "/images/tinyHeart/babyFade0.png";
    // this.babyTail.src = "/images/tinyHeart/babyTail0.png";
    for(var i = 0; i < this.babyTail.imgCount; i++){
        this.babyTail.images[i] = new Image();
        this.babyTail.images[i].src = "/images/tinyHeart/babyTail" + i + ".png";
    }
    for(var i = 0; i < this.babyBody.imgCount; i++){
        this.babyBody.images[i] = new Image();
        this.babyBody.images[i].src = "/images/tinyHeart/babyFade" + i + ".png";
    }
    for(var i = 0; i < this.babyEye.imgCount; i++){
        this.babyEye.images[i] = new Image();
        this.babyEye.images[i].src = "/images/tinyHeart/babyEye" + i + ".png";
    }
}

// 绘制小鱼方法
babyFishObj.prototype.draw = function(){
    // 如果游戏暂停，就不改变当前小鱼状态的变量
    if(data.isStop){
        mainCtx.save();
        mainCtx.translate(this.x, this.y);
        mainCtx.rotate(this.angle);
        mainCtx.drawImage(this.babyTail.images[this.babyTail.imgIndex], -this.babyTail.images[this.babyTail.imgIndex].width / 2 + 25, -this.babyTail.images[this.babyTail.imgIndex].height / 2);
        mainCtx.drawImage(this.babyBody.images[this.babyBody.imgIndex], -this.babyBody.images[this.babyBody.imgIndex].width / 2, -this.babyBody.images[this.babyBody.imgIndex].height / 2);
        mainCtx.drawImage(this.babyEye.images[this.babyEye.imgIndex], -this.babyEye.images[this.babyEye.imgIndex].width / 2, -this.babyEye.images[this.babyEye.imgIndex].height / 2);
        mainCtx.restore();
        return;
    }


    // lerp x, y 取坐标点趋向指定坐标点，这里指小鱼坐标趋向鼠标坐标
    var lerpDistanceCount = 0.99;
    this.x = lerpDistance(bigFish.x, this.x, lerpDistanceCount);
    this.y = lerpDistance(bigFish.y, this.y, lerpDistanceCount); 

    // delta angle --> Math.atan2(y, x) 计算小鱼坐标与鼠标的反tan值，获取趋向鼠标的角度
    var deltaX = bigFish.x - this.x;
    var deltaY = bigFish.y - this.y;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    // lerp angle 计算小鱼的角度趋向鼠标
    var lerpAngleCount = 0.8;
    this.angle = lerpAngle(beta, this.angle, lerpAngleCount);

    // 计算尾巴动画
    this.babyTail.timer += deltaTime;
    if(this.babyTail.timer > this.babyTail.runTimer){
        this.babyTail.timer %= this.babyTail.runTimer;
        this.babyTail.imgIndex = (this.babyTail.imgIndex + 1) % this.babyTail.imgCount;
    }
    
    // 计算眼睛动画
    this.babyEye.timer += deltaTime;
    if(this.babyEye.timer > this.babyEye.runTimer){
        this.babyEye.timer %= this.babyEye.runTimer;
        this.babyEye.imgIndex = (this.babyEye.imgIndex + 1) % this.babyEye.imgCount;
        this.babyEye.runTimer = this.babyEye.imgIndex == 0 ? Math.random()*1500 + 2000 : 200;
    }

    // 计算身体动画
    this.babyBody.timer += deltaTime;
    if(this.babyBody.timer > this.babyBody.runTimer){
        this.babyBody.timer %= this.babyBody.runTimer;
        // 判断小鱼是否到了要死亡的一刻
        if(this.babyBody.imgIndex + 1 >= this.babyBody.imgCount){
            this.babyBody.imgIndex = this.babyBody.imgCount - 1;
            gameOver();
            data.gameOver = true;
        }else{
            this.babyBody.imgIndex = this.babyBody.imgIndex + 1;
        }   
        // this.babyBody.imgIndex = this.babyBody.imgIndex + 1 >= this.babyBody.imgCount ? this.babyBody.imgCount - 1 : this.babyBody.imgIndex + 1;
    }

    // 绘制
    mainCtx.save();
    mainCtx.translate(this.x, this.y);
    mainCtx.rotate(this.angle);
    mainCtx.drawImage(this.babyTail.images[this.babyTail.imgIndex], -this.babyTail.images[this.babyTail.imgIndex].width / 2 + 25, -this.babyTail.images[this.babyTail.imgIndex].height / 2);
    mainCtx.drawImage(this.babyBody.images[this.babyBody.imgIndex], -this.babyBody.images[this.babyBody.imgIndex].width / 2, -this.babyBody.images[this.babyBody.imgIndex].height / 2);
    mainCtx.drawImage(this.babyEye.images[this.babyEye.imgIndex], -this.babyEye.images[this.babyEye.imgIndex].width / 2, -this.babyEye.images[this.babyEye.imgIndex].height / 2);
    mainCtx.restore();
}

// 小鱼喂食后的状态
babyFishObj.prototype.recover = function(score){
    // 根据当前大鱼收获的分数计算小鱼可以恢复的体力，可以恢复为大鱼体力的一半
    var scoreIndex = Math.ceil(score / 10 / 2);
    this.babyBody.imgIndex = this.babyBody.imgIndex - scoreIndex <= 0 ? 0 : this.babyBody.imgIndex - scoreIndex;
}

// 小鱼重新开始状态
babyFishObj.prototype.reset = function(){
    this.babyBody.imgIndex = 0;
    this.x = canvasWidth / 2 + Math.random()*50 + 50;
    this.y = canvasHeight / 2 + Math.random()*50 + 50;
    this.angle = 0;
}

