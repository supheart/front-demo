var ctrlIndex = require('../core/controller/index');
var routerTest = require('./test');
var rp = require('../model/views/response');

module.exports = function(router){
	routerTest(router);
	
  	var data = ctrlIndex.getIndex();

	router.get('/vue', function(req, res){
		res.render("vue");
	});

	router.get('/bscroll', function(req, res){
		res.render("bscroll");
	});

	// canvas测试页面
	router.get('/canvas/:type', function(req, res){
		res.render("canvas/canvas-" + req.params.type, data);
	})

	// css测试页面
	router.get('/css/:type', function(req, res){
		if(req.params.type == "page"){
			res.render("css-page");
			return;
		}
		if(req.params.type == "book"){
			res.render("css-book");
			return;
		}
		res.render("css", data);
	});

	// 计算文件md5
	router.get('/md5File', function(req, res){
		res.render('upload');
	});

	router.post('/md5File', upload.single('uploadFile'), function(req, res){
		var uploadFile = req.file;
		console.log(uploadFile);
		res.json(rp.getRes(0));
	});

	// 地图例子
	router.get("/maptest", function(req, res){
		var path = [[116.368904, 39.913423],[116.382122, 39.901176],[116.387271, 39.912501],[116.398258, 39.904600],[116.400258, 39.914600]];
		pathStr = '';
		for(var i in path){
			pathStr += path[i][0] + ',' + path[i][1] + ';';
		}
		// var mapSrc = "http://restapi.amap.com/v3/staticmap?zoom=15&size=500*500&paths=10,0x0000ff,1,,:116.31604,39.96491;116.320816,39.966606;116.321785,39.966827;116.32361,39.966957;116.32361,39.976957&key=ee95e52bf08006f63fd29bcfbcf21df0";
		var mapSrc = "http://restapi.amap.com/v3/staticmap";
		var params = {
			zoom: 13,
			size: "800*400",
			paths: "6,0xc2c2c2,1,,:" + pathStr.substring(0, pathStr.length - 1),
			key: 'ee95e52bf08006f63fd29bcfbcf21df0'
		}
		urlStr = '';
		for(var key in params){
			urlStr += key + '=' + params[key] + '&';
		}
		mapSrc = mapSrc + '?' + urlStr;
		var data = {src: mapSrc};
		res.render('maptest', data);
	});

	//swiper route
	router.get('/swiper', function(req, res){
		res.render('swiper', data);
	});
  
	//socket 连接路由
	router.all('/socket', function(req, res){
		res.render('socket', data);
	});

	//首页路由
	router.all('/index', function(req, res){
		res.render('index', data);
	});

	//根目录路由
	router.all('/', function(req, res){
		res.render('index', data);
	});

	//错误页
	router.all('/error', function (req, res) {
		res.status(403).json((rp.getRes(1)));
	});

	//其他的页面
	router.all('*', function(req, res){
		res.render('index', data);
	});
};