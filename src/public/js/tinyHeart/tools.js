// 获取不同浏览器兼容的计算帧动画函数
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

// 计算两点间距离趋向的函数 aim: 目标距离, cur: 当前距离, ratio: 趋向系数，表现为趋速度
function lerpDistance(aim, cur, ratio) {
	var delta = cur - aim;
	return aim + delta * ratio;
}

// 计算两点间角度趋向的函数 a:目标趋向角度的反正切Math.atan2(deltaY-deltaX), b: 原始趋向角度, t: 趋向系统，表现为转弯的快慢
function lerpAngle(a, b, t) {
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}