var desc;

window.onload = function(){
    
}


// Loop through the different descriptions
function getDescAtCounter() {
  var counterclone = counter;
  var toandfrom = ["Compare robots", "Record data", "Vote on other robots", 
  "Explore teams"];
  var whereBool;
  var lpos = 0;

  for(x in toandfrom) {
    counterclone -= toandfrom[x].length * 3;
    if(counterclone < 0) {
      whereBool = false;
      break;
    }
    counterclone -= 1;
    if(counterclone < 0) {
      whereBool = true;
      break;
    }
    lpos ++;
  }

  if(counterclone >= 0) {
    counter = 0;
    console.log("done");
    return "";
  }

  console.log(counterclone);
  if(whereBool) {
    return "";
  }
  else {
    console.log(counterclone);
    if(toandfrom[lpos].length * 2 < -counterclone) {
      return toandfrom[lpos].substring(0, toandfrom[lpos].length * 3 + counterclone);
    }
    else if(toandfrom[lpos].length > -counterclone - 1) {
      return toandfrom[lpos].substring(0, -counterclone);
    }
    else{
      return toandfrom[lpos];
    }
  }
}

var counter = 0;