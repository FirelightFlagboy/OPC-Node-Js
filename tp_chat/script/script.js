// get pseudo name
var pseudo = prompt('Votre pseudo :');
while (pseudo.length <= 0 || pseudo.length > 16)
	pseudo = prompt('Votre pseudo :');

// get first form in html
var form = document.querySelector('form');
// get section id chat
var chat = document.getElementById('chat');
// connect to the server
var socket = io.connect('http://10.11.4.11:8080');

// create a new section for msg
function new_msg(author, content)
{
	let section = document.createElement('section');
	let h3 = document.createElement('h3');
	let p = document.createElement('p');

	h3.textContent = author;
	p.textContent = content;

	section.appendChild(h3);
	section.appendChild(p);
	chat.appendChild(section);
}

// scroll to the bottom of the page
function scroll_botom()
{
	chat.scrollTop = chat.scrollHeight - chat.clientHeight;
}

// send the pseudo to the server
socket.emit('pseudo', pseudo);

// display new msg from server
socket.on('new_msg', (author, content) => {
	new_msg(author, content);
	scroll_botom();
})
// display name of new client
.on('new_client', (client) => {
	let p = document.createElement('p');
	p.textContent = client + ' vient de se connecter !';
	chat.appendChild(p);
});

let p = document.createElement('p');
p.textContent = pseudo + ' vient de se connecter !';
chat.appendChild(p);

// send message to the server
form.addEventListener('submit', (e) => {
	socket.emit('new_msg', form.msg.value);
	new_msg(pseudo, form.msg.value);
	scroll_botom();
	form.reset();
	e.preventDefault();
});
