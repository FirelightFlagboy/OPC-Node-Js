var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
	fs.readFile('./index.html', 'utf-8', (error, content) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(content);
	});
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
	console.log('new client');
	socket.broadcast.emit('message', 'Un autre client vient de se connecter !');
	socket.emit('message', 'You are Welcome');

	socket.on('message', (msg) => {
		console.log('le clien ' + socket.pseudo + ' dit : ' + msg);
	})
	.on('pseudo', (msg) => {
		socket.pseudo = msg;
	})
});

server.listen(8080);
