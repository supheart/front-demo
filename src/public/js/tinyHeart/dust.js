var dustObj = function(){
    this.images = [];
    this.num = 30;
    this.dustList = [];
}

// 对象初始化
dustObj.prototype.init = function(){
    // 初始化图片资源
    for(var i = 0; i < 7; i++){
        var imageObj = new Image();
        imageObj.src = "/images/tinyHeart/dust" + i + ".png";
        this.images[i] = imageObj;
    }

    // 初始化漂浮物对象属性
    for(var i = 0; i < this.num; i++){
        var dust = {
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
            amp: 20 + Math.random() * 15,
            alpha: 0,
            imageIndex: Math.floor(Math.random()*7)
        }
        this.dustList[i] = dust;
    }
}

// 绘制漂浮物方法
dustObj.prototype.draw = function(){
    for(var i = 0; i < this.num; i++){
        this.dustList[i].alpha += deltaTime * 0.001;
        var range = Math.sin(this.dustList[i].alpha) * this.dustList[i].amp;
        bgCtx.drawImage(this.images[this.dustList[i].imageIndex], this.dustList[i].x + range, this.dustList[i].y);
    }
}