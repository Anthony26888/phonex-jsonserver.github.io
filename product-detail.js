



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



/***************************************SILDER SHOW */
let slideIndex = 1;
showSlide(slideIndex);

function plusSlide(n) {
  showSlide((slideIndex += n));
}

function currentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  let i;
  let slides = document.getElementsByClassName("sliderProduct");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

  
  