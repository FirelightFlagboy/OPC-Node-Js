let express = require('express');
let session = require('cookie-session');
let body = require('body-parser');
// let url = require('url');
let urlencodedParser = body.urlencoded({ extended: false });

let app = express();

/* gestion des cookies */

app.use(session({
	secret: 'unsecret',
	name: 'session',
	maxAge: 60 * 60 * 1000
}));

/* gestion des path */

app.use((req, res, next) => {
	if (typeof (req.session.list) == 'undefined')
		req.session.list = [];
	next();
})
	.get('/todo', (req, res) => { // list todo list
		res.render('page.ejs', {todolist: req.session.list});
	})
	.post('/todo/add', urlencodedParser, (req, res) => { // add element to todo list
		if (req.body.todo != '');
			req.session.list.push(req.body.todo);
		res.redirect('/todo');
	})
	.get('/todo/del/:id', (req, res) => { // remove element with key id from todo list
		let id = Number(req.params.id);
		if (id != NaN && req.session.list)
			req.session.list.splice(id, 1);
		res.redirect('/todo');
	})
	.use((req, res, next) => { // every else send error 404
		res.setHeader('Content-Type', 'text/plain');
		res.status(404).send('Page introuvable !');
	});

app.listen(8080);
