var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
	// get info form url
	var params = querystring.parse(url.parse(req.url).query);
	// write head
	res.writeHead(200, { "Content-Type": "text/plain" });
	// log param from url
	console.log(params);
	// write content
	if ('prenom' in params && 'nom' in params) {
		res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
	}
	else {
		res.write('Vous devez bien avoir un prénom et un nom, non ?');
	}
	res.end();
});
server.listen(8080);
