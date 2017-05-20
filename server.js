// Made for a SERT Hackathon, May 20, 2017

var http = require("http");
var fs = require("fs");
var bodyparser = require("body-parser");
var backend = require("./backend.js");

http.createServer(function(req, res){
  // Code for home page (should be signup)
  if((req.url == "/" || req.url == "/index.html") &&
    req.method.toUpperCase() == "GET"){
    fs.createReadStream("client/index.html").pipe(res);

  }
  else if(req.url == "/createpage" && req.method.toUpperCase() == "POST"){

  }
  else if(req.url.indexOf("..") == -1){
     fs.readFile("client" + req.url, function(err, data){
       if(err){
         res.end("404 error, file not found");
       }
       else{
         res.write(data);
       }
     });
  }
}).listen(8080);