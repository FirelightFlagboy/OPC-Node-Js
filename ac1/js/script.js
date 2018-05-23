var todo = document.getElementById('todo');
var form = document.getElementById('new-todo');

var socket = io.connect('http://127.0.0.1:8080');

var id = [];

// function that create a new 'list element'
function newTodo(text) {
	let li = document.createElement('li');
	let a = document.createElement('a');
	let p = document.createElement('p');

	a.textContent = '❌';
	a.type = 'remove';
	p.classList.add('todolist-des');
	p.textContent = text;

	li.appendChild(a);
	li.appendChild(p);
	return (li);
}

form.addEventListener('submit', (e) => {
	e.preventDefault(); // prevent the form to reload the page

	// send the new todo to server
	socket.emit('add', form.todo.value);
	// create and append the new todo
	let li = newTodo(form.todo.value);
	todo.appendChild(li);
	// reset the field
	form.reset();
});

todo.addEventListener('click', (e) => {
	// get the click trough propagation
	if (e.target.type === 'remove') { // only the element 'a' of type 'remove'
		// get key > the content of the todo
		let key = e.target.parentNode.children[1].textContent;
		// send info to the server
		socket.emit('del', key);
		// remove the list
		todo.removeChild(e.target.parentNode);
	}
	e.stopPropagation();
});

// when the server send a new todolist
socket.on('current', (todolist) => {
		todolist = JSON.parse(todolist);
		// remove all child of to
		while (todo.firstChild)
			todo.removeChild(todo.firstChild);
		// for each element in todolist create a new element to add to 'ul'
		for (let i = 0; i < todolist.length; i++) {
			let li = newTodo(todolist[i]);
			todo.appendChild(li);
		}
	})
	// when other client add a todo
	.on('add', (element) => {
		let li = newTodo(element);
		todo.appendChild(li);
	});
