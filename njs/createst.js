exports.serve = function(req, res) {
	var static = require('node-static');
	var file = new static.Server();
	file.serveFile('html/createtest.html', 200, {}, req, res);
};
