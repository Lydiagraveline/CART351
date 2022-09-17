
// Script for checkbox
// Will Bontrager Software, LLC
// https://www.willmaster.com
// December 20, 2014
function ChangeLabel(ckbx)
{
   var d = ckbx.id;
   if( ckbx.checked )
   {
      document.getElementById(d+"-checked").style.display = "inline";
      document.getElementById(d+"-unchecked").style.display = "none";
   }
   else
   {
      document.getElementById(d+"-checked").style.display = "none";
      document.getElementById(d+"-unchecked").style.display = "inline";
   }
}

function updateImage(ckbx){
  let d = ckbx.id;
  let image = document.getElementById("img")

  if( ckbx.checked ){
    image.style.display = "inline";
  }
  else {
    image.style.display = "none";
  }
}
