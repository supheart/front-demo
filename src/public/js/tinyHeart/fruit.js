// 果实对象
var fruitObj = function(){
    // 初始化果实数组
    this.fruitList = [];
    // orange、blue分别是橙色果实和蓝色果实的图片
    this.orange = new Image();
    this.blue = new Image();
}

fruitObj.prototype.num = 30;
fruitObj.prototype.aliveNum = 15;
fruitObj.prototype.init = function(){
    for(var i = 0; i < this.num; i++){
        // 随机获取一株海葵生成果实
        // var aneId = Math.floor(Math.random()*aneNum);

        // 初始化每个果实的属性
        this.fruitList[i] = {
            alive: false,                                    // 果实存活状态    
            // x: aneList[aneId].x,                            
            // y: canvasHeight - aneList[aneId].length,
            x: 0,
            y: 0,
            type: '',                                       //果实类型
            vborn: 0.005 + Math.random()*0.008,             // 生长速度
            vrun: 0.025 + Math.random()*0.035,              // 上升速度
            size: 0                                         // 大小
        }
    }
    // 初始化果实图片路径
    this.orange.src = "/images/tinyHeart/fruit.png";
    this.blue.src = "/images/tinyHeart/blue.png";
}

// 绘制果实方法
fruitObj.prototype.draw = function(){
    for(var i = 0; i < this.num; i++){
        // 如果果实的状态是存活，就绘制
        if(this.fruitList[i].alive){
            // 判断果实大小，确定果实处于生长状态还是上升状态
            var picType = this.fruitList[i].type == "orange" ? this.orange : this.blue;
            if(this.fruitList[i].size <= picType.width){
                // 生长
                this.fruitList[i].x = aneList[this.fruitList[i].aneId].head;
                this.fruitList[i].size += this.fruitList[i].vborn*deltaTime;
            }else{
                // 上升
                this.fruitList[i].y -= this.fruitList[i].vrun*deltaTime;
            }
            // 绘制
            bgCtx.drawImage(picType, this.fruitList[i].x - this.fruitList[i].size / 2, this.fruitList[i].y - this.fruitList[i].size / 2, this.fruitList[i].size, this.fruitList[i].size);
            // 如果果实上升出了界面，则果实变成不存活状态
            // console.log(this.fruitList[i].y + ':' + -this.orange.width);
            if(this.fruitList[i].y < -picType.width){
                this.fruitList[i].alive = false;
            }
        }
    }
}

// 果实出生方法
fruitObj.prototype.born = function(index){
    // 随机获取一株海葵生成果实
    var aneId = Math.floor(Math.random()*aneNum);
    this.fruitList[index].x = aneList[aneId].x;
    this.fruitList[index].y = canvasHeight - aneList[aneId].length;
    this.fruitList[index].aneId = aneId;
    this.fruitList[index].size = 0;
    this.fruitList[index].alive = true;
    this.fruitList[index].type = Math.random()*10 > 7.8 ? "blue" : "orange";
}

// 果实死亡方法
fruitObj.prototype.dead = function(i){
    this.fruitList[i].alive = false;
}

// 监听屏幕的果实总数量
fruitObj.prototype.monitor = function(){
    var currentNum = 0;
    // 遍历当前存活果实数量
    for(var i = 0; i < this.num; i ++){
        if(this.fruitList[i].alive) currentNum ++;
    }
    if(currentNum < this.aliveNum){
        // 如果小于可存活果实数量，就激活一个新的果实
        this.sendFruit();
        return;
    }
}

// 重新生成一个存活的果实
fruitObj.prototype.sendFruit = function(){
    for(var i in this.fruitList){
        if(!this.fruitList[i].alive){
            this.born(i);
            return;
        }
    }
}

