//////////////List Food////////////////////
var list = document.querySelector(".list");
var storage = document.querySelector(".storage");
var listCart = document.querySelector(".listCart");
var total = document.querySelector(".total-number");
var quantity = document.querySelector(".quantity");
var filters = document.querySelector(".filter");
var showMoreItem =document.querySelector(".showMoreItem");
var addToCart = document.querySelector(".add-to-cart");

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
              newButton.classList.add("add-to-cart"); 
              newButton.value=`${key}`  
              newButton.innerHTML = 'ADD TO CART';
              newButton.onclick = (function () {AddToCart(this)});
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


/**************************export index */




/********************ADD TO CART */

let listCarts = [];
function AddToCart(item){

  fetch(url)
    .then((response) => response.json())
    .catch(error => console.log(error))
    .then(data => {
      
      valueIndex = item.value;      
      array = data[valueIndex];
      array.quantity =1;
      listCarts.push(array);
          
      console.log(listCarts)      
      reloadCart()

      
    })
    
}

function reloadCart() {
  listCart.innerHTML = "";
  let count = 0;
  let totalItem = 0;
  listCarts.forEach((item, key) => {
    count = item.quantity + count;
    totalItem = item.price + totalItem;
    let newli = document.createElement("li");

    newli.innerHTML=`
      <img src="img/products/${item.image}" alt="${item.name}">
      <span>${item.name}</span>
      <div>
        <button onclick="changeQuantity(${key},${item.quantity} -1)">-</button>
        <span class="Qty">${item.quantity}</span>
        <button onclick="changeQuantity(${key},${item.quantity} + 1)">+</button>
      </div>
      <span>${item.price.toLocaleString()} đ</span>
      <button class="delete" onclick = "clearLi(${key})"><span><i class="fa fa-times" aria-hidden="true"></i></span></button>
    `
    
    listCart.appendChild(newli);
    quantity.innerHTML = count;
    total.innerHTML = totalItem.toLocaleString() + " đ";
  });
}






/**********************TOTAL PRICE IN CART */

function changeQuantity(key, quantity) {
  fetch(url)
    .then((response) => response.json())
    .catch(error => console.log(error))
    .then(data => {
      if (quantity == 0) {
        delete listCarts[key];
      } else {
        listCarts[key].quantity = quantity;
        listCarts[key].price = quantity * data[key].price;
      }
    })
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
  event.preventDefault();
  
  let valueType = document.getElementById("type").value;
  let valuePrice = document.getElementById("price").value;
  let valueSystem = document.getElementById("system").value;
  let valueStorage = document.getElementById("storage").value;
  
  let gtePrice = valuePrice.split(',')[0];
  let ltePrice = valuePrice.split(',')[1];

  if(valuePrice !=""){
    Price = `price_gte=${gtePrice}&price_lte=${ltePrice}`;
  }else{
    Price = "";
  }

  if(valueSystem !=""){
    System =`system=${valueSystem}`;
  }else{
    System = "";
  }

  if(valueStorage !=""){
    storage =`q=${valueStorage}`;
  }else{
    storage = "";
  }

  if (valueType !=""){
    type = `kind=${valueType}`;
  }else{
    type = "";
  }
  valueItem = Price +  '&' + System + '&' + storage + '&' + type;
  displayCard(valueItem);
});


/************************************Search */
function submitSearch(){
  var inputSearch = document.getElementById("inputSearch").value;
  if(inputSearch !=""){
    valueItem = `q=` + inputSearch;
  }else{
    valueItem="";
  }
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




/**********************************export index */

