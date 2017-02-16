// 大鱼与果实的碰撞检测
var collisionBigFishAndFruitLength = 30;
function collisionBigFishAndFruit(){
    if(data.gameOver) return;
    for(var i in fruit.fruitList){
        // 计算果实坐标与大鱼坐标距离的平方, 与相撞距离平方进行比较，如果再范围内，果实死亡
        var collisionLength = Math.pow(fruit.fruitList[i].x - bigFish.x, 2) + Math.pow(fruit.fruitList[i].y - bigFish.y, 2);
        if(collisionLength < Math.pow(collisionBigFishAndFruitLength, 2)){
            fruit.dead(i);
            bigFish.eat();
            data.fruitNum ++;
            if(fruit.fruitList[i].type == "blue") data.double = 2;
            wave.born(fruit.fruitList[i].x, fruit.fruitList[i].y);
        }
    }
}

// 大鱼与小鱼的碰撞检测
var collisionBigFishAndBabyFishLength = 30;
function collisionBigFishAndBabyFish(){
    if(data.gameOver || data.fruitNum <= 0) return;
    var collisionLength = Math.pow(babyFish.x - bigFish.x, 2) + Math.pow(babyFish.y - bigFish.y, 2);
    if(collisionLength < Math.pow(collisionBigFishAndBabyFishLength, 2)){
        // 如果发生碰撞，小鱼恢复能量
        var score = data.addScore();
        babyFish.recover(score);
        bigFish.empty();
        wave.fishWaveBorn(babyFish.x, babyFish.y);
    }
}