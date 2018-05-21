var fs = require('fs');
var express = require('express');

var app = express();

app.get('/', (req, res) => {
	fs.readFile('./index.html', 'utf-8', (error, content) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(content);
	});
})
.use(function(req, res, next){
	fs.readFile('./notfound.html', 'utf-8', (err, data) => {
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.end(data);
	})
});

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var ent = require('ent');
var encode = require('ent').encode;

io.sockets.on('connection', (socket) => {
	console.log('new client :');

	socket.on('pseudo', (msg) => {
		socket.pseudo = encode(msg, {special: {
			'<' : true,
			'>': true,
			'&': true
		}});
		socket.broadcast.emit('new_client', socket.pseudo);
		console.log(socket.pseudo);
	})
	.on('new_msg', (msg) => {
		msg = encode(msg, {special: {
			'<' : true,
			'>': true,
			'&': true
		}});
		socket.broadcast.emit('new_msg', socket.pseudo, msg);
		console.log(socket.pseudo + ' dit : ' + msg);
	})
});

server.listen(8080);
