// Server.js
// Made for a SERT Hackathon, May 20, 2017

var http = require("http");
var fs = require("fs");
var backend = require("./backend.js");
var url = require("url");
var qs = require("querystring");

http.createServer(function(req, res){
  // Code for home page (should be signup)
  if((req.url == "/" || req.url == "/index.html") &&
    req.method.toUpperCase() == "GET"){
    fs.readFile("client/index.html", function(err, data){
      if(err) throw err;
      res.end(data);
    });
  }
  else if(req.url.substring(0, 11) === "/createteam" && req.method.toUpperCase() === "POST"){
    var body = "";
    req.on('data', function (data) {
      body += data;

      if (body.length > 1e6)
          req.connection.destroy();
      });
      req.on('end', function () {
        var post = qs.parse(body);
        console.log("Submitted");
        backend.setRobot(post.name, post.team,post.picture,post.desc,post.password,true,function(data)
        {
          res.end("<html><head><meta http-equiv=\"refresh\" content=\"0; URL='/bot/" +
          post.team +"/' \"/>" +
            "</head></html>");
        });
      });
  }
  else if(req.url.substring(0, 6) === "/login" && req.method.toUpperCase() === "GET")
  {
    var post = url.parse(req.url,true).query;
    backend.checkUser(post.number,post.password,function(success){
      if(success)
      res.end("You are now logged in.");
      else
      res.end("Invalid Credentials.")
    });
  }
  
  // Searching
else if(req.url.substring(0, 7) == "/search" && req.method.toUpperCase() == "GET"){
    console.log(url.parse(req.url, true).query);
    backend.getRobot(url.parse(req.url, true).query.id,function(data){
      console.log(JSON.stringify(data));
      res.end(JSON.stringify(data));
    });
  }
  // Link to a robots page
  else if(req.url.substring(0, 5) == "/bot/" && req.method.toUpperCase() == "GET"){
    var parts = req.url.split("/");
    console.log(parts);
    if(parts[3] == "" || parts[3] == "index.html" || parts.lenth == 2){
      fs.createReadStream("client/view.html").pipe(res);
    }  
    else if(parts[3] == "bot.js" || parts[3] == undefined){
      var botjs = "var arr = [\"";
      backend.getRobot(parts[2], function(data){
        if(data.data == undefined){
          console.log("err with data");
        }
        else{
          botjs += data.data.name + "\",\"";
          botjs += parts[2] + "\",\"";
          botjs += data.data.picturelink + "\",\"";
          botjs += data.data.desc + "\"];";
          console.log(botjs);
          res.end(botjs);
        }
       
      });
    }
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
