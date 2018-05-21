let express = require('express');

let app = express();

app.get('/todo', (req, res) => { // list todo list

})
.post('/todo/add', (req, res) => { // add element to todo list

})
.get('todo/del/:id', (req, res) => { // remove element with key id from todo list

})
.use((req, res, next) => { // every else send error 404
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

app.listen(8080);
