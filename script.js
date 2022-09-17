
// Script for checkbox
// Will Bontrager Software, LLC
// https://www.willmaster.com
// December 20, 2014
function ChangeLabel(ckbx)
{
   let d = ckbx.id;
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

// Display secret "fun" tab in the navigation when the checkbox is checked
function updateNav(ckbx){
  if(ckbx.checked){
    document.getElementById("fun").style.display = "inline";
  } else {
    document.getElementById("fun").style.display = "none";
  }
}

// Display an image when the checkbox is checked
function updateImage(ckbx){
  let image = document.getElementById("img");

  if(ckbx.checked ){
    image.style.display = "inline";
  }
  else {
    image.style.display = "none";
  }
}
