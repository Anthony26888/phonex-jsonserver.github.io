



/**********************remove item cart */
function clearLi(key) {
    delete listCarts[key];
    if (key != null) {
      total.innerHTML = "0" + " đ";
    }
    reloadCart();
  }
  
  
/***********************OPEN - CLOSE MODAL CART */
function closeCart() {
    document.querySelector(".modal-cart").style.display = "none";  
    
}
function OpenCart() {
    document.querySelector(".modal-cart").style.display = "block";  
}


  /*****************************************FILTER CATEGORY */
function menu(item) {
    let buttonValue = item.getAttribute("data-value");
    valueItem = "kind=" + buttonValue;  
    displayCard(valueItem);
}



  
  