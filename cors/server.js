var http = require('http'),
	fs = require('fs');
http.createServer(function(req, res) {
	for(var k in req) {
		console.log(k);
	}
	res.writeHead(200, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': req.headers.origin,
		'Access-Control-Allow-Methods': 'GET',
		'Access-Control-Max-Age': 60,
		'Access-Control-Allow-Credentials': true
	});
	try {
		fs.writeFile('a.txt', JSON.stringify(req.headers));
		var obj = {
			code: 0
		};
		res.write(JSON.stringify(obj));
	} catch(e) {
		res.write(JSON.stringify({
			code: 500,
			msg: e.message
		}));
	} finally {
		res.end();
	}
	
}).listen(1337, 'localhost');