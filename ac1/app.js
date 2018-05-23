var fs = require('fs');
var express = require('express');
var ent = require('ent');

var app = express();

app.get('/', (req, res) => {
	// envoie le ficher index.html au client
	fs.readFile('./html/index.html', 'utf-8', (err, data) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(data);
	});
})
.get('/css/style.css', (req, res) => {
	// envoie le css au html
	fs.readFile('./css/style.css', 'utf-8', (err, data) => {
		res.writeHead(200, {'Content-Type': 'text/css'});
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
	// envoie la page 404 quand la page n'est pas trouvé
	fs.readFile('./html/notfound.html', 'utf-8', (err, data) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(data);
	});
});

var todolist = ['test', 'test1'];
var id = 0;
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// quand un client ce connecte
io.sockets.on('connection', (socket) => {

	socket.name = id;
	id++;
	console.log('new client : ' + socket.name);
	// send the current todolist to the client
	socket.emit('current', JSON.stringify(todolist));

	// when a client want to remove a todo element
	socket.on('del', (key) => {
		// chaque element est identifie par une key : son contenue
		index = todolist.indexOf(key);
		if (index != -1)
		{
			console.log('client ' + socket.name + ' remove : ' + key);
			// remove the element
			todolist.splice(index, 1);
			// send new list to all other client
			socket.broadcast.emit('current', JSON.stringify(todolist));
		}
	})
	// when a client want to add a element
	.on('add', (element) => {
		element = ent.encode(element); // protect form script injection

		console.log('client ' + socket.name + ' add ' + element);
		// add the new element
		todolist.push(element);
		// send notif to all other client
		socket.broadcast.emit('add', element);
	});
});
server.listen(8080);
