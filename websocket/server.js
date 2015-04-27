var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: 8080});

wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		console.log(new Date());
		console.log('from client: ' + message);
		ws.send('from server');
	});
	ws.send('I am a message sent from a ws server.')
});