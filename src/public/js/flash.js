var flashObj = function(canvas){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.img = new Image();
    this.star = new starObj();
    this.canvas.isSwitch = false;

    this.lastTime = Date.now();
    this.deltaTime = 0;

    this.init();
}

flashObj.prototype.init = function(){
    this.img.src = "/images/girl.jpg";
    this.canvas.addEventListener("mousemove", this.mousemove, false);
}

flashObj.prototype.updateDeltaTime = function(){
    var now = Date.now();
    this.deltaTime = now - this.lastTime;
    this.lastTime = now;
    if(this.deltaTime > 50){
        this.deltaTime = 50;
    }
    // console.log("deltaTime: ", this.deltaTime);
}

flashObj.prototype.draw = function(){
    // console.log('loop run');
    // 画背景
    this.context.fillStyle = "#393550";
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    // 画图片
    this.context.drawImage(this.img, 100, 100, this.img.width / 2, this.img.height / 2);
    // 画星星
    this.star.draw(this.context, this.deltaTime);
    // 更新时间间隔
    this.updateDeltaTime();
    
    // console.log(this.canvas.isSwitch);
}

flashObj.prototype.mousemove = function(e){
    e.preventDefault();

    mx = e.clientX - this.getBoundingClientRect().left;
    my = e.clientY - this.getBoundingClientRect().top;
    if(isInContent(mx, my)){
        this.isSwitch = true;
    }else{
        this.isSwitch = false;
    }
    // console.log(mx, my, this.canvas.isSwitch);
}

var starObj = function(){
    this.num = 60;
    this.img = new Image();
    this.stars = [];
    this.life = 0.5;

    this.init();
}

starObj.prototype.init = function(){
    this.img.src = '/images/star.png';
    for(var i = 0; i < this.num; i ++){
        var s = {
            x: 100 + Math.random()*(600 - this.img.width / 7),
            y: 100 + Math.random()*(300 - this.img.height),
            picIndex: Math.floor(Math.random()*7),
            xs: 1 * Math.pow(-1, Math.round(Math.random()*100)),
            ys: 1 * Math.pow(-1, Math.round(Math.random()*100)),
            timer: 0,
            maxTimer: 50 + Math.random(0, 10)
        }
        this.stars.push(s);
    }
}

starObj.prototype.draw = function(ctx, deltaTime){
    for(var i in this.stars){
        // ctx.drawImage(this.img, this.stars[i].x, this.stars[i].y, this.img.width, this.img.height);
        ctx.save();

        if(ctx.canvas.isSwitch){
            this.life = this.life + deltaTime * 0.000005;
            this.life = this.life >= 1 ? 1 : this.life;
        }else{
            this.life = this.life - deltaTime * 0.000005;
            this.life = this.life <= 0 ? 0 : this.life;
        }
        ctx.globalAlpha = this.life;
        // console.log(this.life);
        ctx.drawImage(this.img, this.stars[i].picIndex * 7, 0, this.img.width / 7, this.img.height, this.stars[i].x, this.stars[i].y, 7, 7);
        ctx.restore();

        // 更新闪烁频率
        this.stars[i].timer += deltaTime;
        if(this.stars[i].timer > this.stars[i].maxTimer) {
            this.stars[i].picIndex += 1;
            this.stars[i].picIndex %= 7;
            this.stars[i].timer = 0;
        }

        // 更新位移
        this.stars[i].x += this.stars[i].xs * deltaTime * 0.01;
        this.stars[i].y += this.stars[i].ys * deltaTime * 0.01;

        // 判断是否移出框外
        if(!isInContent(this.stars[i].x, this.stars[i].y)){
            this.stars[i].x = 100 + Math.random()*(600 - this.img.width / 7);
            this.stars[i].y = 100 + Math.random()*(300 - this.img.height);
        }
    }
}



function isInContent(x, y){
    if(x > 100 && x < 600 && y > 100 && y < 400){
        return true;
    }
    return false;
}