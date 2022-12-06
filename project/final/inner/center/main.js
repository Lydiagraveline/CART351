function handleShoppingCart(){
    let value = localStorage.cart;
    let items="<p>test</p>";
    if (value <=1){
        $("#cart").text(value+" item");
    } else {
        $("#cart").text(value+" items");
    }
}//handleShoppingCart

function emptyCart(){
    localStorage.setItem("cart", -1);
    addToCart();
 }

     //Clear local storage and refresh page when user pressed shift + a 
     $(document).bind('keypress', function(event) {
        if( event.which === 65 && event.shiftKey ) {
            console.log('you pressed SHIFT+A');
            console.log('local storage cleared');
            localStorage.clear();
            location.reload();
        }
    });