//backend.js
// Contains backend functions

var jsonf = require("jsonfile");

var searchObj = {};

var userObj = {};

module.exports.setRobot = function(name,teamid,picturelink,description,password,callback)
{
    //get connection to json database
    //should return a Note (with either success or failure)
    jsonf.readFile("json/robots.json", function(err, obj) {
        if(obj != undefined)
        {
            if(obj.robots.hasOwnProperty(teamid)){
                console.log("Someone tried to overwrite a current team.");
                callback(true);
                return;
            }
            searchObj = obj;
            searchObj.robots[teamid] = {
                "name" : name,
                "picturelink":picturelink,
                "desc" : description,
                "password" : password
            };
            jsonf.writeFile("json/robots.json", searchObj,function(err){
                if(err) throw err; 
            });
                callback(false);
        }
        else {
            throw err;
        }
    });
};

module.exports.checkUser = function(teamid,password,callback)
{
    jsonf.readFile("json/robots.json",function(err,obj)
    {
       if(obj != undefined)
       {
           if(obj.robots.hasOwnProperty(teamid))
           {
               if(obj.robots[teamid].password === password)
               {
                   console.log(obj.robots[teamid].password,password);
                   callback(true);
               }
               else callback(false);
           }
           else {
               console.log(teamid);
               callback(false);
           }
       }
       else {
           throw err;
       }
    });
}

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
               callback({type:"Error",msg:"This robot does not exist yet. Log "});
           }
       }
       else {
           throw err;
       }
    });
}

module.exports.addRecording = function(name,teamid,note)
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
            callback({ type:"Notification", msg:"Thank you for registering your team."});
            }
        }
        else {
            throw err;
        }
    });
}

module.exports.changePassword = function(teamid,password,callback)
{
    jsonf.readFile("json/users.json", function(err, obj) {
        if(obj != undefined)
        {
            userObj = obj;
            if(userObj.hasOwnProperty(teamid))
            {
                userObj[teamid] = {
                    "pass": password
                }
                jsonf.writeFile("json/users.json", userObj,function(err){
                if(err) throw err; 
            });
            callback({ type:"Notification", msg:"Your password has been updated"});
            }
        }
        else {
            throw err;
        }
    });
}

module.exports.update = function(teamid,value,isauthenticated)
{
    if(!isauthenticated) return;
    jsonf.readFile("json/robots.json", function(err, obj) {
        if(obj != undefined)
        {
            if(obj.robots.hasOwnProperty(teamid))
            {
                obj.robots[teamid] = {
                    "name" : obj.robots[teamid].name,
                    "picturelink": obj.robots[teamid].picturelink,
                    "desc" : value,
                    "password" : obj.robots[teamid].password
                };
            /*
            if(thing === "name")
            {
                obj.robots[teamid] = {
                    "name" : name,
                    "picturelink": picturelink,
                    "desc" : description,
                    "password" : password
                }
            }
            if(thing === "name")
            {
                obj.robots[teamid] = {
                    "name" : name,
                    "picturelink": picturelink,
                    "desc" : description,
                    "password" : password
                }
            }
            */
            }
        }
        else {
            throw err;
        }
    });
}