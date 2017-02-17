var clockObj = function(canvasId){
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.radius = this.width / 2;
    this.clockNum = [1,2,3,4,5,6,7,8,9,10,11,12];
}

clockObj.prototype.drawBackground = function(){
    this.ctx.save();
    this.ctx.translate(this.radius, this.radius);

    // 画外环
    this.ctx.beginPath();
    // 获取外环宽度
    var outerLength = this.radius / 10;
    //顺时针
    this.ctx.arc(0, 0, this.radius, 0, 2*Math.PI, false);       
    //逆时针
    this.ctx.arc(0, 0, this.radius - outerLength, 0, 2*Math.PI, true);      
    this.ctx.closePath();
    // 不同方向的线条闭合可以填充内容, 非零环绕填充规则
    this.ctx.fill();


    // 画环内点
    var innerRadius = (this.radius - outerLength) / 18 * 17;
    var dotRadius = this.radius / 75;
    for(var i = 0; i < 60; i++){
        this.ctx.beginPath();
        var dotRad = 2*Math.PI / 60 * (i + 1);
        var dotx = Math.cos(dotRad) * innerRadius;
        var doty = Math.sin(dotRad) * innerRadius;
        this.ctx.fillStyle = (i + 1) % 5 == 0 ? "#000" : "#ccc";
        this.ctx.arc(dotx, doty, dotRadius, 0, 2*Math.PI);
        this.ctx.closePath();
        this.ctx.fill(); 
    }

    // 画数字
    var textRadius = (this.radius - outerLength) / 6 * 5;
    var textFontSize = this.radius / 12;
    // this.ctx.fillStyle = "normal " + textFontSize + "px Verdana";
    this.ctx.font = "normal " + textFontSize + "px Verdana";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    for(var i in this.clockNum){
        var textRad = 2*Math.PI / 12 * (i - 2);
        var textx = Math.cos(textRad) * textRadius;
        var texty = Math.sin(textRad) * textRadius;
        this.ctx.fillText(this.clockNum[i], textx, texty);
    }
    this.ctx.restore();
}

clockObj.prototype.drawTime = function(hour, minute, second){
    // 画时针
    this.ctx.save();
    this.ctx.translate(this.radius, this.radius);
    var hourRad = 2*Math.PI / 12 * (hour - 3 + minute / 60);
    this.ctx.rotate(hourRad);
    var hourLength = this.radius / 5 * 3;
    var hourLeftLength = this.radius / 10;
    var hourLineWidth = this.radius / 20;
    this.ctx.beginPath();
    this.ctx.moveTo(-hourLeftLength, 0);
    this.ctx.lineTo(hourLength, 0);
    this.ctx.lineWidth = hourLineWidth;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();

    // 画分针
    this.ctx.save();
    this.ctx.translate(this.radius, this.radius);
    var minuteRad = 2*Math.PI / 60 * (minute - 15 + second / 60);
    this.ctx.rotate(minuteRad);
    var minuteLength = this.radius / 10 * 7;
    var minuteLeftLength = this.radius / 8;
    var minuteLineWidth = this.radius / 28;
    this.ctx.beginPath();
    this.ctx.moveTo(-minuteLeftLength, 0);
    this.ctx.lineTo(minuteLength, 0);
    this.ctx.lineWidth = minuteLineWidth;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();

    // 画秒针
    this.ctx.save();
    this.ctx.translate(this.radius, this.radius);
    var secondRad = 2*Math.PI / 60 * (second - 15);
    this.ctx.rotate(secondRad);
    var secondLength = this.radius / 5 * 4;
    var secondLeftLength = this.radius / 6;
    var secondLeftLineWidth = this.radius / 35;
    var secondRightLineWidth = this.radius / 55;
    this.ctx.beginPath();
    this.ctx.moveTo(-secondLeftLength, -secondLeftLineWidth / 2);
    this.ctx.lineTo(-secondLeftLength, secondLeftLineWidth / 2);
    this.ctx.lineTo(secondLength, secondRightLineWidth / 2);
    this.ctx.lineTo(secondLength, -secondRightLineWidth / 2);
    this.ctx.lineTo(-secondLeftLength, -secondLeftLineWidth / 2);
    this.ctx.closePath();
    this.ctx.lineJoin = "round";
    this.ctx.fillStyle = "#f00";
    this.ctx.fill();
    this.ctx.restore();

    // 画秒针
    this.ctx.save();
    this.ctx.translate(this.radius, this.radius);
    this.ctx.beginPath();
    var dotRadius = this.radius / 40;
    this.ctx.fillStyle = "#eee";
    this.ctx.arc(0, 0, dotRadius, 0, 2*Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
}

clockObj.prototype.draw = function(){
    var date = new Date();
    this.drawTime(date.getHours(), date.getMinutes(), date.getSeconds());
    // setInterval(this.draw, 50);
}