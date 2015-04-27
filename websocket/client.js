var WebScoket = require('ws'),
	ws = new WebScoket('ws://localhost:8080'),
	time = 0,
	host = Math.random();

ws.on('open', function(req) {
	console.log(req);
	ws.send('I am an Open Event from ws client');
});

ws.on('message', function(message) {
	console.log(new Date());
	console.log(message);
	setTimeout(function() {
		ws.send(host + '');
	}, 1000);
});