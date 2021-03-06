// d 控制点的横坐标
function fillMoon(ctx, d, x, y, R, rot, fillColor){
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot * Math.PI / 180);
    ctx.scale(R, R);
    pathMoon(ctx, d);
    ctx.fillStyle = fillColor || "#fb5";
    ctx.fill();
    ctx.restore();
}

// 绘制月亮弧线状态
function pathMoon(ctx, d){
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0.5*Math.PI, 1.5*Math.PI, true);
    ctx.moveTo(0, -1);
    // ctx.arcTo(d, 0, 0, 1, dis(0, -1, d, 0) / d);
    ctx.quadraticCurveTo(1.2, 0, 0, 1);
    ctx.closePath();
}

// 计算两点间距离的公式
function dis(x1, y1, x2, y2){
    return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
}