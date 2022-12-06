
    $(document).ready(function () {



    });

    //Clear local storage and refresh page when user pressed shift + a 
    $(document).bind('keypress', function(event) {
        if( event.which === 65 && event.shiftKey ) {
            console.log('you pressed SHIFT+A');
            console.log('local storage cleared');
            localStorage.clear();
            location.reload();
        }
    });

    function displayAd(ad){
        $(ad+' >li:gt(0)').hide();
        setInterval(function() {
          $(ad+' > li:first')
          .fadeOut(1)
          .next()
          .fadeIn(1)
          .end()
          .appendTo(ad);
         }, 2000);
      }; //displayAd