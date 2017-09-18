var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
// var webConfig = require('./config');
var routes = require('./routes');
var ejs = require('ejs');
var virtualPath = process.env.virtualPath || "";


var multer = require('multer');

var app = express();
var server = require('http').Server(app);

	app.set('views',__dirname + '/views');
	app.engine('.html', ejs.__express);
	app.set('view engine', 'html');
	app.use(virtualPath,express.static(__dirname + '/public'));
	app.use(virtualPath,express.static(__dirname + '/uploads'));


	// 路径解析
	app.get(virtualPath+'/', routes.index);
	app.get(virtualPath+'/download', routes.download);
	app.get(virtualPath+'/qrcode_demo', routes.qrcode_demo);
	app.get(virtualPath+'/upload', routes.qrcode_demo);
	//app.post('/login', routes.userLogin);


var upload = multer({ dest: 'uploads/' })  ;
var testController=require('./testController');
app.post(virtualPath+'/',testController.dataInput);

var port = process.env.PORT || 80;
	server.listen(port);