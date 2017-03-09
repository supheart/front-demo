var canvas, context, gap, chessBorad, num, me,over;
var winCtrl;
window.onload = function(){
    console.log('start five log');
    init();
}

function init(){
    num = 15;
    over = false;
    canvas = document.querySelector('#canvas');
    canvas.width = Math.min(window.innerHeight, window.innerWidth, 540);
    canvas.height = Math.min(window.innerHeight, canvas.width);

    // 设置提示板
    var canvasWrapper = document.querySelector('.canvas-wrapper');
    var controlWrapper = document.querySelector('.control-wrapper');
    var tip = document.querySelector('.tip');
    var title = document.querySelector('.title');
    var reset = document.querySelector('.reset');

    gap = canvas.width / num;
    canvasWrapper.style.width = canvas.width + 'px';
    tip.style.marginTop = (canvas.height - tip.clientHeight - reset.clientHeight) / 2 + 'px';
    canvasWrapper.style.marginTop = (Math.abs(window.innerHeight - canvas.height) / 2 - title.clientHeight) + 'px';
    // controlWrapper.style.top = (canvas.height - controlWrapper.clientHeight) / 2 + 'px';
    // controlWrapper.style.left = (canvas.width - controlWrapper.clientWidth) / 2 + 'px';
    winCtrl = function(me, show){
        if(me){
            tip.innerHTML = "You win!";
        }else{
            tip.innerHTML = "Computer win!";
        }
        if(!show){
            controlWrapper.classList.add('show');
            controlWrapper.classList.remove('hide');
        }else{
            controlWrapper.classList.add('hide');
            controlWrapper.classList.remove('show');
        }
    }

    context = canvas.getContext('2d');
    aiInit();

    drawBg();
    me = true;
    chessBorad = [];
    for(var i = 0; i < num; i++){
        chessBorad[i] = [];
        for(var j = 0; j < num; j++){
            chessBorad[i][j] = 0;
        }
    }
    canvas.addEventListener('touchstart', function(e){
        e.preventDefault();
        if(over || !me){
            return;
        }
        x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
        y = e.touches[0].clientY - canvas.getBoundingClientRect().top;
        var i = Math.floor(x / gap);
        var j = Math.floor(y / gap);
        // 判断该区域是否落子
        if(chessBorad[i][j] === 0){
            drawChess(i, j, me);
            // 黑棋为1，白旗为2
            // if(me){
            //     chessBorad[i][j] = 1;
            // }else{
            //     chessBorad[i][j] = 2;
            // }
            chessBorad[i][j] = 1;
            // 遍历所有赢法，如果在一种赢法上累加到5，说明赢了
            for(var k = 0; k < count; k++){
                if(wins[i][j][k]){
                    myWins[k]++;
                    computerWins[k] = 6;
                    if(myWins[k] == 5){
                        // window.alert("你赢了");
                        over = true;
                        winCtrl(true);
                    }
                }
            }
            if(!over){
                me = !me;
                computerAI();
            }
        }
    });
    canvas.onclick = function(e){
        e.preventDefault();
        if(over || !me){
            return;
        }
        x = e.clientX - canvas.getBoundingClientRect().left;
        y = e.clientY - canvas.getBoundingClientRect().top;
        var i = Math.floor(x / gap);
        var j = Math.floor(y / gap);
        // 判断该区域是否落子
        if(chessBorad[i][j] === 0){
            drawChess(i, j, me);
            // 黑棋为1，白旗为2
            // if(me){
            //     chessBorad[i][j] = 1;
            // }else{
            //     chessBorad[i][j] = 2;
            // }
            chessBorad[i][j] = 1;
            // 遍历所有赢法，如果在一种赢法上累加到5，说明赢了
            for(var k = 0; k < count; k++){
                if(wins[i][j][k]){
                    myWins[k]++;
                    computerWins[k] = 6;
                    if(myWins[k] == 5){
                        // window.alert("你赢了");
                        over = true;
                        winCtrl(true);
                    }
                }
            }
            if(!over){
                me = !me;
                computerAI();
            }
        }
    }
    reset.onclick = function(e){
        init();
        winCtrl(false, true)
    }
}

function drawBg(){
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1;
    context.strokeStyle = '#bfbfbf';
    for(var i = 0; i < num; i++){
        context.moveTo(gap/2 + i*gap, gap/2);
        context.lineTo(gap/2 + i*gap, canvas.width - gap/2);
        context.moveTo(gap/2, gap/2 + i*gap);
        context.lineTo(canvas.width - gap/2, gap/2 + i*gap);
        context.stroke();
    }
    context.restore();
}

function drawChess(i, j, me){
    context.save();
    var gradient = context.createRadialGradient(gap/2 + i*gap, gap/2 + j*gap, gap * 0.5, gap/2 + i*gap, gap/2 + j*gap, 0);
    if(me) {
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#636766');
    }else {
        gradient.addColorStop(0, '#d1d1d1');
        gradient.addColorStop(1, '#f9f9f9');
    }
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(gap/2 + i*gap, gap/2 + j*gap, gap * 0.42, 0, Math.PI*2);
    context.fill();
    context.closePath();
    context.restore();
}

// 赢法数组, 赢法种类
var wins, count;
var myWins, computerWins;
function aiInit(){
    // 初始化所有赢法种类的数组
    wins = [];
    count = 0;
    for(var i = 0; i < num; i++){
        wins[i] = [];
        for(var j = 0; j < num; j++){
            wins[i][j] = [];
        }
    }

    // 遍历所有的赢法
    // 这里是所有竖线的赢法
    for(var i = 0; i < num; i++){
        for(var j = 0; j < num - 4; j++){
            // 第一种赢法
            // wins[0][0][0] = true         [1,0,0,0,0,0]
            // wins[0][1][0] = true         [1,0,0,0,0,0]
            // wins[0][2][0] = true         [1,0,0,0,0,0]
            // wins[0][3][0] = true         [1,0,0,0,0,0]
            // wins[0][4][0] = true         [1,0,0,0,0,0]
            //                              [0,0,0,0,0,0]
            
            // 第二种赢法
            // wins[0][1][1] = true         [0,0,0,0,0,0]      
            // wins[0][2][1] = true         [1,0,0,0,0,0]
            // wins[0][3][1] = true         [1,0,0,0,0,0]
            // wins[0][4][1] = true         [1,0,0,0,0,0]
            // wins[0][5][1] = true         [1,0,0,0,0,0]
            //                              [1,0,0,0,0,0]
            for(var k = 0; k < 5; k++){
                wins[i][j+k][count] = true;
            }
            count ++;
        }
    }
    
    // 这里是所有横线的赢法
    for(var i = 0; i < num - 4; i++){
        for(var j = 0; j < num; j++){
            // 第一种横线赢法
            // wins[0][0][0 + count] = true     [1,1,1,1,1,0]
            // wins[1][0][0 + count] = true     [0,0,0,0,0,0]
            // wins[2][0][0 + count] = true     [0,0,0,0,0,0]
            // wins[3][0][0 + count] = true     [0,0,0,0,0,0]
            // wins[4][0][0 + count] = true     [0,0,0,0,0,0]
            //                                  [0,0,0,0,0,0]
            // 第二种横线赢法
            // wins[1][0][1 + count] = true     [0,1,1,1,1,1]
            // wins[2][0][1 + count] = true     [0,0,0,0,0,0]
            // wins[3][0][1 + count] = true     [0,0,0,0,0,0]
            // wins[4][0][1 + count] = true     [0,0,0,0,0,0]
            // wins[5][0][1 + count] = true     [0,0,0,0,0,0]
            //                                  [0,0,0,0,0,0]
            for(var k = 0; k < 5; k++){
                wins[i+k][j][count] = true;
            }
            count ++;
        }
    }

    // 这里是所有斜线的赢法
    for(var i = 0; i < num - 4; i++){
        for(var j = 0; j < num - 4; j++){
            // 第一种斜线赢法
            // wins[0][0][0 + count] = true     [1,0,0,0,0,0]
            // wins[1][1][0 + count] = true     [0,1,0,0,0,0]
            // wins[2][2][0 + count] = true     [0,0,1,0,0,0]
            // wins[3][3][0 + count] = true     [0,0,0,1,0,0]
            // wins[4][4][0 + count] = true     [0,0,0,0,1,0]
            //                                  [0,0,0,0,0,0]
            
            // 第二种斜线赢法
            // wins[0][1][1 + count] = true     [0,0,0,0,0,0]
            // wins[1][2][1 + count] = true     [1,0,0,0,0,0]
            // wins[2][3][1 + count] = true     [0,1,0,0,0,0]
            // wins[3][4][1 + count] = true     [0,0,1,0,0,0]
            // wins[4][5][1 + count] = true     [0,0,0,1,0,0]
            //                                  [0,0,0,0,1,0]
            for(var k = 0; k < 5; k++){
                wins[i+k][j+k][count] = true;
            }
            count ++;
        }
    }

    // 这里是所有反斜线的赢法
    for(var i = 0; i < num - 4; i++){
        for(var j = num - 1; j >= 4; j--){
            // 第一种反斜线赢法
            // wins[0][14][0 + count] = true        [0,0,0,0,0,0]
            // wins[1][13][0 + count] = true        [0,0,0,0,1,0]
            // wins[2][12][0 + count] = true        [0,0,0,1,0,0]
            // wins[3][11][0 + count] = true        [0,0,1,0,0,0]
            // wins[4][10][0 + count] = true        [0,1,0,0,0,0]
            //                                      [1,0,0,0,0,0]

            // 第二种反斜线赢法
            // wins[0][13][1 + count] = true        [0,0,0,0,1,0]
            // wins[1][12][1 + count] = true        [0,0,0,1,0,0]
            // wins[2][11][1 + count] = true        [0,0,1,0,0,0]
            // wins[3][10][1 + count] = true        [0,1,0,0,0,0]
            // wins[4][9][1 + count] = true         [1,0,0,0,0,0]
            //                                      [0,0,0,0,0,0]

            for(var k = 0; k < 5; k++){
                wins[i+k][j-k][count] = true;
            }
            count ++;
        }
    }

    console.log(count);
    myWins = [];
    computerWins = [];
    for(var i = 0; i < count; i++){
        myWins[i] = 0;
        computerWins[i] = 0;
    }
}

function computerAI(){
    var myScore = [];
    var computerScore = [];
    var max = 0;
    var u = 0, v = 0;
    // 初始化分数数组
    for(var i = 0; i < num; i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j = 0; j < num; j++){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    // 遍历赢法，计分选择落子
    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 15; j++){
            if(chessBorad[i][j] == 0){
                for(var k = 0; k < count; k++){
                    if(wins[i][j][k]) {
                        // 如果在k中赢法有落子，可进行拦截，按比例加分比
                        if(myWins[k] == 1){
                            myScore[i][j] += 200;
                        }else if(myWins[k] == 2){
                            myScore[i][j] += 400;
                        }else if(myWins[k] == 3){
                            myScore[i][j] += 2000;
                        }else if(myWins[k] == 4){
                            myScore[i][j] += 10000;
                        }
                        // 计算机赢法的统计加分比例
                        if(computerWins[k] == 1){
                            computerScore[i][j] += 220;
                        }else if(computerWins[k] == 2){
                            computerScore[i][j] += 420;
                        }else if(computerWins[k] == 3){
                            computerScore[i][j] += 2100;
                        }else if(computerWins[k] == 4){
                            computerScore[i][j] += 20000;
                        }
                    }
                }
                // 根据遍历结果统计落子左边
                if(myScore[i][j] > max){
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j] == max){
                    if(computerScore[i][j] > computerScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
                if(computerScore[i][j] > max){
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j] == max){
                    if(myScore[i][j] > myScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    drawChess(u, v, false);
    chessBorad[u][v] = 2;
    for(var k = 0; k < count; k++){
        if(wins[u][v][k]){
            computerWins[k]++;
            myWins[k] = 6;
            if(computerWins[k] == 5){
                // window.alert("电脑赢了");
                over = true;
                winCtrl(false);
            }
        }
    }
    if(!over){
        me = !me;
    }
}

// var aaaa = false;
// function aaa(){
//     var controlWrapper = document.querySelector('.control-wrapper');
//     if(aaaa){
//         controlWrapper.classList.add('show');
//         controlWrapper.classList.remove('hide');
//         // controlWrapper.style.display = 'block';
//     }else{
//         controlWrapper.classList.add('hide');
//         controlWrapper.classList.remove('show');
//         // controlWrapper.style.display = 'none';
//     }
//     aaaa = !aaaa;
// }