// var express = require('express');
// var app = express();// 创建express实例
var koa = require('koa');
var path = require('path');
var logger = require('koa-logger');
var fs = require('fs');
var render = require('koa-swig');
var bodyParser = require('koa-bodyparser');
var mongoose = require('mongoose');
var session = require('koa-session');
var webpack = require('webpack');
var webpackConfig = require('./build/webpack.base.conf');
var db = 'mongodb://localhost:27017/vuex';
var app = koa();
var serve = require('koa-static');
var compiler = webpack(webpackConfig);// 调用webpack并把配置传递过去

mongoose.Promise = global.Promise;
mongoose.connect(db);
mongoose.connection.on('error', function (err) {
	console.log(err);
})

var modelsPath = path.join(__dirname, '/models');
console.log(modelsPath)
fs.readdirSync(modelsPath).forEach(function (file) {
	if (~file.indexOf('js')) {
		require(modelsPath + '/' + file);
	}
	// console.log(file);
})

// 使用 webpack-dev-middleware 中间件
// var devMiddleware = require('webpack-dev-middleware')(compiler, { 
//    publicPath: '/', 
//    stats: {   
//      colors: true,    
//     chunks: false  
//   }});
// app.use(devMiddleware);
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(function* (next) {
  yield webpackHotMiddleware(compiler).bind(null, this.req, this.res)
  yield next
})

app.keys = ['vuex'];

app.use(logger());
app.use(bodyParser());
app.use(serve(__dirname + '/public'));
app.use(session(app));
app.context.render = render({
	root: path.join(__dirname),
	ext: 'html',
	varControls: ['<#', '#>'],
	cache: false
})

require('./routes/index')(app);

app.listen(3006)
console.log('listening on port 3006, http://127.0.0.1:3006')
// module.exports = app;