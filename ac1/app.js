var fs = require('fs');
var express = require('express');

var app = express();

app.get('/', (req, res) => {
	// envoie le ficher index.html au client
	fs.readFile('./html/index.html', 'utf-8', (err, data) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(data);
	});
})
.get('/css/styles.css', (req, res) => {
	// envoie le css au html
	fs.readFile('./css/style.css', 'utf-8', (err, data) => {
		res.writeHead(200, {'Content-Type': 'test/css'});
		res.end(data);
	});
})
.get('/js/script.js', (req, res) => {
	// envoie le script au html
	fs.readFile('./js/script.js', 'utf-8', (err, data) => {
		res.writeHead(200, {'Content-Type': 'application/javascript'});
		res.end(data);
	})
})
.use((req, res, next) => {
	fs.readFile('./html/notfound.html', 'utf-8', (err, data) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(data);
	});
});

var server = require('http').createServer(app);

server.listen(8080);
