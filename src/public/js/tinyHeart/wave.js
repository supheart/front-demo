// 泡泡对象
var waveObj = function(){
    // 与果实碰撞产生的泡泡
    this.waveList = [];
    this.num = 15;
    this.firstRadius = 10;
    this.lastRadius = 50;

    // 与小鱼碰撞产生的泡泡
    this.fishWaveList = [];
    this.fishWaveNum = 5;
    this.firstFishRadius = 15;
    this.lastFishRadius = 120;

}

// 初始化泡泡对象
waveObj.prototype.init = function(){
    for(var i = 0; i < this.num; i++){
        this.waveList[i] = {
            x: 0,
            y: 0,
            radius: 0,
            alive: false
        }
    }

    for(var i = 0; i < this.fishWaveNum; i++){
        this.fishWaveList[i] = {
            x: 0,
            y: 0,
            radius: 0,
            alive: false
        }
    }
}

// 描绘泡泡
waveObj.prototype.draw = function(){
    // 大鱼与果实产生的泡泡
    for(var i in this.waveList){
        mainCtx.save();
        mainCtx.shadowColor = "white";
        mainCtx.shadowBlur = 8;
        if(this.waveList[i].alive){
            this.waveList[i].radius += deltaTime * 0.05;
            if(this.waveList[i].radius > this.lastRadius){
                this.waveList[i].alive = false;
            }
            mainCtx.beginPath();
            mainCtx.arc(this.waveList[i].x, this.waveList[i].y, this.waveList[i].radius, 0, 2*Math.PI);
            mainCtx.closePath();
            mainCtx.strokeStyle = "rgba(255, 255, 255, " + (1 - this.waveList[i].radius / this.lastRadius) + ")";
            mainCtx.lineWidth = 2 - this.waveList[i].radius / this.lastRadius / 2;
            mainCtx.shadowBlur = 8 - this.waveList[i].radius / this.lastRadius / 8;
            mainCtx.stroke();
        }
        mainCtx.restore();
    }

    // 大鱼与小鱼产生的泡泡
    for(var i in this.fishWaveList){
        mainCtx.save();
        mainCtx.shadowColor = "rgba(203, 91, 0, 1)";
        mainCtx.shadowBlur = 12;
        if(this.fishWaveList[i].alive){
            this.fishWaveList[i].radius += deltaTime * 0.08;
            if(this.fishWaveList[i].radius > this.lastFishRadius){
                this.fishWaveList[i].alive = false;
            }
            mainCtx.beginPath();
            mainCtx.arc(this.fishWaveList[i].x, this.fishWaveList[i].y, this.fishWaveList[i].radius, 0, 2*Math.PI);
            mainCtx.closePath();
            mainCtx.strokeStyle = "rgba(203, 91, 0, " + (1 - this.fishWaveList[i].radius / this.lastFishRadius) + ")";
            mainCtx.lineWidth = 5 - this.fishWaveList[i].radius / this.lastFishRadius / 5;
            mainCtx.shadowBlur = 12 - this.fishWaveList[i].radius / this.lastFishRadius / 12;
            mainCtx.stroke();
        }
        mainCtx.restore();
    }
}

// 找出新产生的泡泡
waveObj.prototype.born = function(x, y){
    for(var i in this.waveList){
        if(!this.waveList[i].alive){
            this.waveList[i].x = x;
            this.waveList[i].y = y;
            this.waveList[i].alive = true;
            this.waveList[i].radius = this.firstRadius;
            return;
        }
    }
}

// 找出新产生与小鱼的泡泡
waveObj.prototype.fishWaveBorn = function(x, y){
    for(var i in this.fishWaveList){
        if(!this.fishWaveList[i].alive){
            this.fishWaveList[i].x = x;
            this.fishWaveList[i].y = y;
            this.fishWaveList[i].alive = true;
            this.fishWaveList[i].radius = this.firstFishRadius;
            return;
        }
    }
}