$("#loginbutton").click(function(){
  var name = $("#name").val();
  var password = $("#pass").val();
  var xhttp = new XMLHttpRequest();
        xhttp.open("GET","/login?number="+name+"&password="+password,true);
        var params = "number="+name+"&password="+password;
        xhttp.send(params);
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            if(this.responseText === "You are now logged in.")
            {
              window.localStorage.setItem("login","true");
              window.localStorage.setItem("user",name);
              alert("You are now logged in.");
            }
          }
        };
});
$("#searchbutton").click(function(){
  var value = $("#inputbox").val();
  var xhttp = new XMLHttpRequest();
        xhttp.open("GET","/search?id="+value,true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            if(this.responseText.indexOf("Error") !== -1)
            {
              alert("This team does not exist")
            }
            else {
                window.location.href = "https://roboview-jacksoncoder.c9users.io/bot/" + value.toString() + "/";
            }
          }
        };
})