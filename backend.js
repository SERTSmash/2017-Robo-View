//backend.js
// Contains backend functions

var jsonf = require("jsonfile");

var searchObj = {};

var userObj = {};

module.exports.setRobot = function(name,teamid,specs,callback)
{
    //get connection to json database
    //should return a Note (with either success or failure)
    jsonf.readFile("json/robots.json", function(err, obj) {
        if(obj != undefined)
        {
            searchObj = obj;
            searchObj.robots[teamid] = {
                "name" : name,
                "specs" : specs
            };
            jsonf.writeFile("json/robots.json", searchObj,function(err){
                if(err) throw err; 
            });
                callback({ type:"Notification", msg:"Your changes were updated sucessfully. Refresh the page to see changes."});
        }
        else {
            throw err;
        }
    });
};

module.exports.getRobot = function(teamid,callback)
{
    jsonf.readFile("json/robots.json",function(err,obj)
    {
       if(obj != undefined)
       {
           if(obj.robots.hasOwnProperty(teamid))
           {
               callback({type:"Information",data:obj.robots[teamid] });
           }
           else {
               console.log("Robot does not exist");
               callback({type:"Error",msg:"The robot requested does not exist."});
           }
       }
       else {
           throw err;
       }
    });
}

module.exports.addNote = function(name,teamid,note)
{
    //connects to json database, adds note
    //returns nothing
};

module.exports.addUser = function(teamid,password,callback)
{
    jsonf.readFile("json/users.json", function(err, obj) {
        if(obj != undefined)
        {
            userObj = obj;
            if(!userObj.hasOwnProperty(teamid))
            {
                userObj[teamid] = {
                    "pass": password
                }
                jsonf.writeFile("json/users.json", userObj,function(err){
                if(err) throw err; 
            });
            callback({ type:"Notification", msg:"You are sucessfully logged in. You will be redirected to the home page."});
            }
        }
        else {
            throw err;
        }
    });
}