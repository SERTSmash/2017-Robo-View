/* global arr */

var nameSpot, numberSpot, Desc, Pict;

window.onload = function(){
    nameSpot = document.getElementById("namep");
    numberSpot = document.getElementById("numberp");
    Desc = document.getElementById("descp");
    
    numberSpot.innerHTML = "#" + arr[1];
    nameSpot.innerHTML = arr[0];
    Desc.innerHTML = arr[3];
    document.getElementById("picturep").src = arr[2];
    
};
function edit()
{
    if(window.localStorage.getItem("user") === arr[1])
    {
        window.location.href = "https://roboview-jacksoncoder.c9users.io/edit.html"
    }
    else{
        alert("You can only edit your own robot!")
    }
}



