var http = require("http"),
fs = require("fs"),
querystring = require("querystring");
var express = require('express');
var app = express.createServer();

express.createServer(function(req, res){
	var data = "";
	
	if(req.method == "GET"){
		getFile(__dirname + "/public/index.html", res);		
	}
	
	if(req.method == "POST"){
		req.on("data", function(chunk){
			data += chunk;
		});
		req.on("end", function(){
			var params = querystring.parse(data),
			userName = params.firstname + " " +params.lastname,
			data = "Hello " + userName;
			res.json(JSON.stringify(data));
		});
	}
}).listen(process.env.PORT || 3000); 

function getFile(localPath, res){
	fs.readFile(localPath, function(err,contents){
		if(!err){
			res.end(contents);
		}else{
			res.writeHead(500);
			res.end();
		}
	});
}