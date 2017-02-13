module.exports = {
	host: {
		//设置是否启动https的服务，注意修改对应的端口号，这里端口号不会自动改为对应的默认ip
		isHttps: false,
		homePage: '/',
		port: 8012,
	},
  	db: {
		client: 'mysql',
		connection: {
			host     : '127.0.0.1',
			user     : 'root',
			password : 'root',
			database : 'test'
		}
	},
  	session: {
		secret: 'milo-pro-secret',
		name: 'milo-pro_',
		cookie: { maxAge: 1000 * 60 * 60 * 3 },
		resave: false,
		saveUninitialized: true
	},
  	redis: {
		port: 6379,
		host: '127.0.0.1',
		family: 4,
		password: 'auth',
		db: 1,
		keyPrefix: 'milo-pro_'
	},
  	log: {
		appenders: [
			{type: 'console'},
			{
				type: 'dateFile',
				filename: __dirname + '/../../logs/',
				alwaysIncludePattern: true,
				pattern: 'yyyy-MM-dd.log',
				category: 'normal'
			},
		],
		replaceConsole: true,
		dirname: __dirname + '/../../logs',
		logformat: 'remote-addr(:remote-addr),method(:method),url(:url),http(HTTP/:http-version),state(:status),contentLength(:res[Content-Length]),responseTime(:response-time),referer(:referrer)',
	},
};