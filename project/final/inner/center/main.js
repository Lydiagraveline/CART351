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