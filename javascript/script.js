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
let valueDetail = "";



/******************Product Index */

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
            let newDiv = document.createElement("a");    
            let newUl = document.createElement("ul");
            newDiv.classList.add("card"); 
            newDiv.onclick = (function () {openDetail(this)});
            newDiv.setAttribute("data-key", `${value.id}`)
            
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
                newStorage.classList.add("Storage");            
                newStorage.innerHTML = item;
                newUl.appendChild(newStorage);    
              });      
              newDiv.appendChild(newUl);

              /*display price */
              let newPrice = document.createElement("strong");
              newPrice.classList.add("price");
              newPrice.innerHTML = value.price.toLocaleString() + 'đ';
              newDiv.appendChild(newPrice);
              
                         
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


/*********************************open Detail */

function openDetail(item){
  let index = document.querySelector(".main1");
  let detail = document.querySelector(".main2")
  index.style.display="none";
  detail.style.display="block";
  let valueProduct = item.getAttribute("data-key");
  console.log(valueProduct)

  displayProduct(valueProduct);
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

  setTimeout(showSlide, 2000);
}
































/**********************************Product Detail */



var display = document.querySelector(".main2");


/*****************************DISPLAY PROUCT */      
function displayProduct(valueDetail){
  var urlDetail =`http://localhost:3000/idProducts/${valueDetail}`
  fetch(urlDetail)
      .then((response) => response.json())
      .catch(error => console.log(error))
      .then(data => { 
        
        display.innerHTML="";
  
        data.forEach((value, key) => {
          let newElement = document.createElement("div")
          newElement.classList.add("group1");
          
            let newDiv = document.createElement("div");
            
            newDiv.classList.add("imageProduct");
            newDiv.innerHTML=`
              <img class="mySlides checked" src="img/detail/${value.type.imgDetail[0]}" alt="" >
        
              <img class="mySlides" src="img/detail/${value.type.imgDetail[1]}" alt="" style="display:none">
              
              <img class="mySlides" src="img/detail/${value.type.imgDetail[2]}" alt="" style="display:none">
            
              
              <a class="prevDetail" onclick="plusDivs(-1)">&#10094;</a>
              <a class="nextDetail" onclick="plusDivs(+1)">&#10095;</a>
            `
            
            let newDiv1 = document.createElement("form")
            newDiv1.classList.add("infoProduct");
              let newDiv2 = document.createElement("div");
              newDiv2.classList.add("name-price");
              newDiv2.innerHTML=`
                <span class="nameProduct">${value.name}</span><br>
                <span class="priceProduct">${value.price.toLocaleString()} đ</span>
              `
              newDiv1.appendChild(newDiv2);

              let newDiv3 = document.createElement("div"); 
              newDiv3.classList.add("storage");
                let newtitle = document.createElement("span");
                newtitle.classList.add("titleStorage")
                newtitle.innerHTML="Select Storage:<br>";
                newDiv3.appendChild(newtitle);

                
                value.type.storage.forEach(item =>{  
                  let newInput = document.createElement("input");
                  newInput.setAttribute("id", `radio${item}`);  
                  newInput.setAttribute('type', 'radio');  
                  newInput.setAttribute('name', 'storage'); 
                  newInput.value = item; 

                  let newLabel = document.createElement("label");
                  newLabel.classList.add("radioStorage");
                  newLabel.setAttribute("for", `radio${item}`);
                  newLabel.innerHTML=`${item}`;

                  
                  newDiv3.appendChild(newInput);
                  newDiv3.appendChild(newLabel);
                });   



              let newDiv4 = document.createElement("div"); 
              newDiv4.classList.add("color");
                let newtitle1 = document.createElement("span");
                newtitle1.classList.add("titleStorage")
                newtitle1.innerHTML="Select Color:<br>";
                newDiv4.appendChild(newtitle1);
    
                  
                value.type.color.forEach(item =>{                 
                  let newInput1 = document.createElement("input");
                  newInput1.setAttribute("id", `radio${item}`);  
                  newInput1.setAttribute('type', 'radio');  
                  newInput1.setAttribute('name', 'color'); 
                  newInput1.value = item; 
    
                  let newLabel1 = document.createElement("label");
                  newLabel1.classList.add("radioColor");
                  newLabel1.setAttribute("for", `radio${item}`);
                  newLabel1.innerHTML=`<img src="img/color/${item}.jpg" alt="">`;
    
                    
                  newDiv4.appendChild(newInput1);
                  newDiv4.appendChild(newLabel1);
                });  
                
              
              let newDiv5 = document.createElement("div"); 
              newDiv5.classList.add("groupButton");
              newDiv5.innerHTML=`
                <button class="atcDetail" onclick="AddToCart(event)" data-value="${valueDetail}">Add To Cart</button>
                <span>or</span>
                <button class="iPDetail">Installment Payment</button>`
              newDiv1.appendChild(newDiv3);
              newDiv1.appendChild(newDiv4);
              newDiv1.appendChild(newDiv5);
            newElement.appendChild(newDiv)
            newElement.appendChild(newDiv1)


            let newDiv6 =document.createElement("div");
            newDiv6.classList.add("group2");
            let storageDetail = JSON.parse(JSON.stringify(value.type.storage))
            newDiv6.innerHTML = `
              <div class="Tab">
                <a class="itemTab des" onclick="tab1()">Description</a>
                <a class="itemTab spec" onclick="tab2()">Specifications</a>
              </div>
              <div class="content one"></div>
              <div class="content two">
                <ul class="parameter">
                  <li>
                    <span class="titlePara">Screen:</span>
                    <span>${value.type.screen}</span>
                  </li>
                  <li>
                    <span class="titlePara">System:</span>
                    <span>${value.type.os}</span>
                  </li>
                  <li>
                    <span class="titlePara">Front Camera:</span>
                    <span>${value.type.frontCamera}</span>
                  </li>
                  <li>
                    <span class="titlePara">Back Camera:</span>
                    <span>${value.type.backCamera}</span>
                  </li>
                  <li>
                    <span class="titlePara">Chip:</span>
                    <span>${value.type.chip}</span>
                  </li>
                  <li>
                    <span class="titlePara">Ram:</span>
                    <span>${value.type.ram}</span>
                  </li>
                  <li>
                    <span class="titlePara">Storage:</span>
                    <span>${storageDetail} </span>
                    
                  </li>
                  <li>
                    <span class="titlePara">Battery:</span>
                    <span>${value.type.battery}</span>
                  </li>
                  <li>
                    <span class="titlePara">Material:</span>
                    <span>${value.type.material}</span>
                  </li>
                  <li>
                    <span class="titlePara">Dimensions, Weight:</span>
                    <span>${value.type.demension}</span>
                  </li>
                  <li>
                    <span class="titlePara">Sim:</span>
                    <span>${value.type.sim}</span>
                  </li>
                </ul>
              </div> `
          display.appendChild(newElement);          
          display.appendChild(newDiv6);
        });
      })

}
displayProduct();













/***************************************SILDER SHOW */
let slideIndexs = 1;
showDivs(slideIndexs);

function plusDivs(n) {
  showDivs(slideIndexs += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndexs = 1}
  if (n < 1) {slideIndexs = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndexs-1].style.display = "block";
}

/******************************************TAB */
function tab1(){
  let tab1 = document.querySelector(".one")
  let tab2 = document.querySelector(".two")
  tab1.style.display="block"
  tab2.style.display="none"
  tab1.classList.add("itemTab")
}

function tab2(){
  let tab1 = document.querySelector(".one")
  let tab2 = document.querySelector(".two")
  tab1.style.display="none"
  tab2.style.display="block"
}









/********************ADD TO CART */

let listCarts = [];
function AddToCart(event){
  event.preventDefault();
  let valueCart = document.querySelector(".actDetail").getAttribute("data-value");
  console.log(valueCart)
  
    
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













