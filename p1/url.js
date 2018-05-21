let http = require('http');
let url = require('url');

let server = http.createServer(function (req, res) {
	// get info from url
	let page = url.parse(req.url).pathname;
	// log info
	console.log(page);
	// send correct head content
	res.writeHead(200, { "Content-Type": "text/plain" });
	if (page == '/') {
		res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
	}
	else if (page == '/sous-sol') {
		res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
	}
	else if (page == '/etage/1/chambre') {
		res.write('Hé ho, c\'est privé ici !');
	}
	res.end();
});
server.listen(8080);
