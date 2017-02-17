// 控制器方法
// 操作开始游戏
function startGame(){
    console.log("start game...");
    data.isStart = true;
    data.gameOver = false;
    fruit.init();
    document.getElementById('controller').style.display = 'none';
    document.getElementById('play').style.display = 'block';
}

// 重新开始游戏
function resetGame(){
    console.log("reset game...");
    data.gameOver = false;
    fruit.init();
    data.reset();
    data.resetScore();
    bigFish.reset();
    babyFish.reset();
    document.getElementById('controller').style.display = 'none';
    document.getElementById('play').style.display = 'block';
}

// 游戏结束的操作
function gameOver(){
    console.log("game over...");
    if(data.gameOver) return;
    if(window.localStorage.maxScore){
        window.localStorage.maxScore = window.localStorage.maxScore > data.score ? window.localStorage.maxScore : data.score;
    }else{
        window.localStorage.maxScore = data.score;
    }
    document.getElementById("score").innerHTML = window.localStorage.maxScore;
    var ctrlBtn = document.getElementById('ctrlBtn');
    ctrlBtn.innerHTML = "restart";
    ctrlBtn.onclick = resetGame;
    document.getElementById('controller').style.display = 'block';
    document.getElementById('play').style.display = 'none';
}

// 暂停游戏的操作
function stopGame(){
    console.log("stop game...");
    if(data.gameOver) return;
    var ctrlBtn = document.getElementById('playBtn');
    if(data.isStop){
        data.isStop = false;
        // ctrlBtn.innerHTML = "stop";
        ctrlBtn.style.backgroundImage = "url('/images/tinyHeart/controller/stop.png')";
    }else{
        data.isStop = true;
        // ctrlBtn.innerHTML = "play";
        ctrlBtn.style.backgroundImage = "url('/images/tinyHeart/controller/play.png')";
    }
    ctrlBtn.blur();
}
