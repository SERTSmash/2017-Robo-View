// Server.js
// Made for a SERT Hackathon, May 20, 2017

var http = require("http");
var fs = require("fs");
var bodyparser = require("body-parser");
var backend = require("./backend.js");
var url = require("url");

http.createServer(function(req, res){
  // Code for home page (should be signup)
  if((req.url == "/" || req.url == "/index.html") &&
    req.method.toUpperCase() == "GET"){
    fs.readFile("client/index.html", function(err, data){
      if(err) throw err;
      res.end(data);
    });
    console.log("Resed");
  }
  // Searching
else if(req.url.substring(0, 7) == "/search" && req.method.toUpperCase() == "GET"){
    console.log(url.parse(req.url, true).query);
    backend.getRobot(url.parse(req.url, true).query.id,function(data){
      console.log(JSON.stringify(data));
      res.end(JSON.stringify(data));
    });
  }
  else if(req.url.indexOf("..") == -1){
     fs.readFile("client" + req.url, function(err, data){
       if(err){
         res.end("404 error, file not found");
       }
       else{
         fs.createReadStream("client" + req.url).pipe(res);
       }
     });
   }
}).listen(8080);
