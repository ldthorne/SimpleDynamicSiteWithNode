//Problem: Get a user's badgecount and points from a website
//Solution: Use node to look up profile serve template via HTTP

//1. Create web server
var router = require("./router.js");

var http = require('http');

http.createServer(function (request, response) {
	router.home(request, response);
	router.user(request, response);
}).listen(3000);

console.log('Server running at http://127.0.0.1:1337/');



