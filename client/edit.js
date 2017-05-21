//edit.js
if(window.localStorage.getItem("login")!=="true")
{
    alert("You are logged out. Please log in.");
    window.location.href = "https://roboview-jacksoncoder.c9users.io/"
}
var user = window.localStorage.getItem("user");
console.log(user);

function updateDesc()
{
    /*
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","/update?id="+window.localStorage.getItem("login")+"&",true);
        xhttp.send();
        */
}
/*
$("#nameupdate").click(
function(){
    var xhttp = new XMLHttpRequest();
        xhttp.open("GET","/change" + searchstr.toString(),true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            updatePage(this.responseText);
          }
        };
});
*/