var http=require('http');

// var count = 0;
http.createServer(function(req, res) {
	// console.log(++count);
	// console.log(req.headers);
	for(var k in req) {
		console.log(k);
	}
	res.writeHead(200, {
		'Content-Type': 'text/html'});
	res.end('Hello World!<input ng-model="name" >');
}).listen('1337', 'localhost');