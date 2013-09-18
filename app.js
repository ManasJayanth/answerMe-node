var http = require('http');
var static = require('node-static');
var file = new static.Server();
var url = require('url');
var index = require('./njs/index.js');
var login = require('./njs/login.js');
var ajax = require('./njs/ajax.js');
var eval = require('./njs/eval.js');
var getquestion = require('./njs/getquestion.js');
var initserv = require('./njs/initserv.js');
var serverspecific = require('./njs/serverspecific.js');
var taketest = require('./njs/taketest.js');
var usernameajax = require('./njs/usernameajax.js');
var createtest = require('./njs/createtest.js');
var tmp = require('./tmp.js');

http.createServer(function (req, res) {
	if (url.parse(req.url).pathname == '/index/') {
		index.serve(req, res);
	}
	else if (url.parse(req.url).pathname == '/') {
		index.serve(req, res);
	} 
	else if (url.parse(req.url).pathname == '/njs/login/') {
		login.serve(req, res);
	} 
	else if (url.parse(req.url).pathname == '/njs/ajax/') {
		ajax.serve(req, res);
	} 
	else if (url.parse(req.url).pathname == '/njs/eval/') {
		eval.serve(req, res);
	}
	else if (url.parse(req.url).pathname == '/njs/getquestion/') {
		getquestion.serve(req, res);
	} 
	else if (url.parse(req.url).pathname == '/njs/initserv/') {
		initserv.serve(req, res);
	}
	else if (url.parse(req.url).pathname == '/njs/serverspecific/') {
		serverspecific.serve(req, res);
	}
	else if (url.parse(req.url).pathname == '/njs/taketest/') {
		taketest.serve(req, res);
	}
	else if (url.parse(req.url).pathname == '/njs/usernameajax/') {
		usernameajax.serve(req, res);
	}
	else if (url.parse(req.url).pathname == '/createtest/') {
		createtest.serve(req, res);
	}
	else if (url.parse(req.url).pathname == '/tmp/') {
		tmp.serve(req, res);
	}
	else if (url.parse(req.url).pathname.indexOf('js') != -1 || url.parse(req.url).pathname.indexOf('css') != -1) {
		file.serve(req,res);
	}
	else {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write('Not a valid url!');
		res.end('\nCould be /njs' + url.parse(req.url).pathname);
	}
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
