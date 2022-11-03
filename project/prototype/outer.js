$( document ).ready(function() {
  $("#leftPanel").click(function(){
    console.log( "open left panel" );
     window.open("inner/left/paradise.html", "_self");
  });

  $("#rightPanel").click(function(){
    console.log( "open center panel" );
     window.open("inner/center/center.html", "_self");
  });

});
