function updatePage(responsetext){
          var response = JSON.parse(responsetext);
          if(response.type === "Error")
          {
            alert("Error:" + response.msg);
          }
        }
        function search(searchstr){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET","/search?id=" + searchstr.toString(),true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            updatePage(this.responseText);
          }
        };
        }
$('#searchbutton').click(function()
{
  var value = $('#inputbox').val();
  search(value);
});