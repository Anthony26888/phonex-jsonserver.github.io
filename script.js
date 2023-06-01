//////////////List Food////////////////////
var list = document.querySelector(".list");
var storage = document.querySelector(".storage");
var listCart = document.querySelector(".listCart");
var total = document.querySelector(".total-number");
var quantity = document.querySelector(".quantity");
var filters = document.querySelector(".filter");
var showMoreItem =document.querySelector(".showMoreItem");
let valueItem ="";
var itemsToShow = 8; // Number of items to initially show
const itemsToLoad = 8;

/******************SHOW PRODUCT */

function displayCard(){  

  
  
  if (valueItem !=""){
    url = `http://localhost:3000/products?_page=1&_limit=${itemsToShow}&` + valueItem;
  
  }else{
    url = `http://localhost:3000/products?_page=1&_limit=${itemsToShow}`;
  }
 

  
  fetch(url)
      .then((response) => response.json())
      .catch(error => console.log(error))
      .then(data => {      
      
      let result = document.querySelector(".num-result")
      result.innerHTML = Math.max(0, data.length -itemsToShow);      
      list.innerHTML="";
      
      data.forEach((value,key) => {    
          let newDiv = document.createElement("div");    
          let newUl = document.createElement("ul");
          newDiv.classList.add("card");     
          
          let newImage = new Image();
          newImage.src = "img/products/" + value.image;
          newDiv.appendChild(newImage);

          /*display name */
          let newTitle = document.createElement("h4");
          newTitle.classList.add("title");
          newTitle.innerHTML = value.name;
          newDiv.appendChild(newTitle);

          /*display storage*/        
          value.type.storage.forEach(item =>{        
              let newStorage = document.createElement("li"); 
              newStorage.classList.add("storage");            
              newStorage.innerHTML = item;
              newUl.appendChild(newStorage);    
          });      
          newDiv.appendChild(newUl);

          /*display price */
          let newPrice = document.createElement("strong");
          newPrice.classList.add("price");
          newPrice.innerHTML = value.price.toLocaleString() + 'đ';
          newDiv.appendChild(newPrice);
          

          /*display add to cart*/
          let newButton = document.createElement("button");  
          newButton.onclick = function() {AddToCart(key)};   
          newButton.innerHTML = 'ADD TO CART';
          newDiv.appendChild(newButton);    
          list.appendChild(newDiv);
      });
    if(itemsToShow !== data.length){
      showMoreItem.style.display="none";
    }
  });

}   
displayCard();




/******************SHOW MORE */
function showMore() {  
  itemsToShow +=itemsToLoad;
  displayCard(itemsToShow)
  
}




/********************ADD TO CART */

let listCarts = [];

function AddToCart(key) {
  fetch(valueItem)
      .then((response) => response.json())
      .catch(error => console.log(error))
      .then(data => {
        if (listCart[key] == null) {
          listCarts[key] = JSON.parse(JSON.stringify(data[key]));
          listCarts[key].quantity = 1;
        }
      })
  reloadCart();
}

function reloadCart() {
  listCart.innerHTML = "";
  let count = 0;
  let totalItem = 0;
  listCarts.forEach((item, key) => {
    count = item.quantity + count;
    totalItem = item.price + totalItem;
    let newli = document.createElement("li");
    let newDiv = document.createElement("div");

      /**display image cart */
      let newImage = new Image();
      newImage.src = "img/products/" + item.image;
      newli.appendChild(newImage);

      /**display name cart */
      let newName = document.createElement("span");
      newName.innerHTML = item.name;
      newli.appendChild(newName);

      /**display button - cart */
      let newBtnDiv = document.createElement("button");
      newBtnDiv.onclick = function () {changeQuantity(key, item.quantity - 1);};
      newBtnDiv.innerHTML = "-";
      newDiv.appendChild(newBtnDiv);

      /**display quantity cart */
      let newQty = document.createElement("span");
      newQty.classList.add("Qty");
      newQty.innerHTML = item.quantity;
      newDiv.appendChild(newQty);

      /**display button + cart */
      let newBtnPlus = document.createElement("button");
      newBtnPlus.onclick = function () {
        changeQuantity(key, item.quantity + 1);
      };
      newBtnPlus.innerHTML = "+";
      newDiv.appendChild(newBtnPlus);

      newli.appendChild(newDiv);

      let newPrice = document.createElement("span");
      newPrice.innerHTML = item.price.toLocaleString() + "đ";
      newli.appendChild(newPrice);

      let newBtnDel = document.createElement("button");
      newBtnDel.classList.add("delete");
      newBtnDel.onclick = function () {clearLi(key);};
      newBtnDel.innerHTML ='<span><i class="fa fa-times" aria-hidden="true"></i></span>';
      newli.appendChild(newBtnDel);
    
    listCart.appendChild(newli);
    quantity.innerHTML = count;
    total.innerHTML = totalItem.toLocaleString() + " đ";
  });
}

/**********************TOTAL PRICE IN CART */

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCarts[key];
  } else {
    listCarts[key].quantity = quantity;
    listCarts[key].price = quantity * products[key].price;
  }
  reloadCart();
}




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




/******************************LOGO - BRAND */

function filter(item) {
  let buttonValue = item.getAttribute("data-value");  
  valueItem = "brand=" + buttonValue;
  displayCard(valueItem);
}




/*****************************************FILTER CATEGORY */
function menu(item) {
  let buttonValue = item.getAttribute("data-value");
  valueItem = "kind=" + buttonValue;  
  displayCard(valueItem);
}



/************************************FILTER PRODUCT */
filters.addEventListener("submit", function (event) {
  let rangePrice = document.getElementById("price").value;
  let system = document.getElementById("system").value;
  let storageFilter = document.getElementById("storage").value;

  const max = 0;
  const max0 = 5000000;
  const max1 = 10000000;
  const max2 = 20000000;
  const max3 = 30000000;

  event.preventDefault();
  if (rangePrice == max0){
    valueItem = `price_gte=${max}&price_lte=${max0}`;
  }
  if (rangePrice == max1){
    valueItem = `price_gte=${max0}&price_lte=${max1}`;
  }
  if (rangePrice == max2){
    valueItem = `price_gte=${max1}&price_lte=${max2}`;
  }
  if (rangePrice == max3){
    valueItem = `price_gte=${max2}&price_lte=${max3}`;
  }

  
  displayCard(valueItem);
});












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
  let slides = document.getElementsByClassName("slider");
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
