/**********************************Product Detail */

var display = document.querySelector(".containerDetail");
var valueDetail = localStorage.getItem("numberDetail");
var quantity = document.querySelector(".quantity");
var listCart = document.querySelector(".listCart")


/*****************************DISPLAY PROUCT */

let listCarts = [];

console.log(listCarts)


function displayProduct() {
  var urlDetail = `http://localhost:3000/idProducts/${valueDetail}`;
  fetch(urlDetail)
    .then((response) => response.json())
    .catch((error) => console.log(error))
    .then((data) => {
      display.innerHTML = "";

      data.forEach((value, key) => {
        let newElement = document.createElement("div");
        newElement.classList.add("group1");

        let newDiv = document.createElement("div");

        newDiv.classList.add("imageProduct");
        newDiv.innerHTML = `
              <img class="mySlides checked" src="img/detail/${value.type.imgDetail[0]}" data-img="${value.image}" alt="" >
        
              <img class="mySlides" src="img/detail/${value.type.imgDetail[1]}" alt="" style="display:none">
              
              <img class="mySlides" src="img/detail/${value.type.imgDetail[2]}" alt="" style="display:none">
            
              
              <a class="prevDetail" onclick="plusDivs(-1)">&#10094;</a>
              <a class="nextDetail" onclick="plusDivs(+1)">&#10095;</a>
            `;

        let newDiv1 = document.createElement("form");
        newDiv1.classList.add("infoProduct");
        let newDiv2 = document.createElement("div");
        newDiv2.classList.add("name-price");
        newDiv2.innerHTML = `
                <h4 class="nameProduct">${value.name}</h4>
                <span class="priceProduct">${value.price.toLocaleString()} đ</span>
              `;
        newDiv1.appendChild(newDiv2);

        let newDiv3 = document.createElement("div");
        newDiv3.classList.add("storage");
        let newtitle = document.createElement("span");
        newtitle.classList.add("titleStorage");
        newtitle.innerHTML = "Select Storage:<br>";
        newDiv3.appendChild(newtitle);

        value.type.storage.forEach((item) => {
          let newInput = document.createElement("input");
          newInput.setAttribute("id", `radio${item}`);          
          newInput.setAttribute("type", "radio");
          newInput.setAttribute("name", "storage");
          newInput.value = item;

          let newLabel = document.createElement("label");
          newLabel.classList.add("radioStorage");
          newLabel.setAttribute("for", `radio${item}`);
          newLabel.innerHTML = `${item}`;

          newDiv3.appendChild(newInput);
          newDiv3.appendChild(newLabel);
        });

        let newDiv4 = document.createElement("div");
        newDiv4.classList.add("color");
        let newtitle1 = document.createElement("span");
        newtitle1.classList.add("titleStorage");
        newtitle1.innerHTML = "Select Color:<br>";
        newDiv4.appendChild(newtitle1);

        value.type.color.forEach((item) => {
          let newInput1 = document.createElement("input");
          newInput1.setAttribute("id", `radio${item}`);
          newInput1.setAttribute("type", "radio");         
          newInput1.setAttribute("name", "color");
          newInput1.value = item;

          let newLabel1 = document.createElement("label");
          newLabel1.classList.add("radioColor");
          newLabel1.setAttribute("for", `radio${item}`);
          newLabel1.innerHTML = `<img src="img/color/${item}.jpg" alt="">`;

          newDiv4.appendChild(newInput1);
          newDiv4.appendChild(newLabel1);
        });

        let newDiv5 = document.createElement("div");
        newDiv5.classList.add("groupButton");
        newDiv5.innerHTML = `
                <button class="atcDetail" onclick="AddToCart(event)"">Add To Cart</button>
                <span>or</span>
                <button class="iPDetail">Installment Payment</button>`;
        newDiv1.appendChild(newDiv3);
        newDiv1.appendChild(newDiv4);
        newDiv1.appendChild(newDiv5);
        newElement.appendChild(newDiv);
        newElement.appendChild(newDiv1);

        let newDiv6 = document.createElement("div");
        newDiv6.classList.add("group2");
        let storageDetail = JSON.parse(JSON.stringify(value.type.storage));
        newDiv6.innerHTML = `
              <div class="Tab">                
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
              </div> `;
        display.appendChild(newElement);
        display.appendChild(newDiv6);
      });
    });
}
displayProduct();

/***************************************SILDER SHOW */
let slideIndexs = 1;
showDivs(slideIndexs);

function plusDivs(n) {
  showDivs((slideIndexs += n));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndexs = 1;
  }
  if (n < 1) {
    slideIndexs = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndexs - 1].style.display = "block";
}

/******************************************TAB */


/***********************OPEN - CLOSE MODAL CART */
function closeCart() {
  document.querySelector(".modal-cart").style.display = "none";  
  
}
function OpenCart() {
  document.querySelector(".modal-cart").style.display = "block";  
}



/********************ADD TO CART */





function AddToCart(event){ 
  event.preventDefault();
  var valueImage = document.querySelector(".checked").getAttribute("data-img");
  var valueName = document.querySelector(".nameProduct").innerText;
  var valuePrice = document.querySelector(".priceProduct").innerText;
  var valueStorage = document.getElementsByName("storage");
  var valueColor = document.getElementsByName("color");
  var quantity = 1;
  for(i=0; i<valueStorage.length; i++){
    if (valueStorage[i].checked == true )
    var selectStorage = valueStorage[i].value;
  }
  for(i=0; i<valueColor.length; i++){
    if (valueColor[i].checked == true )
    var selectColor = valueColor[i].value;
  }
  var formData = {
    image: valueImage,
    name: valueName,
    price: valuePrice,
    storage : selectStorage,
    color : selectColor,
    quantity: quantity
  };
  listCarts.push(formData)
  localStorage.setItem("listCarts", JSON.stringify(listCarts));
  
  
  console.log(formData);
  reloadCart()
     
} 



function reloadCart() {
  listCart.innerHTML="";  
  let db = JSON.parse(localStorage.getItem("listCarts"))  
  quantity.innerHTML = db.length
  db.forEach((item, key) => {
    let newUl = document.querySelector(".listCart")
    let newli = document.createElement("li");

    newli.innerHTML=`
      <img src="img/products/${item.image}" alt="${item.name}">
      <div class="groupform">
      
        <span>${item.name} ${item.storage} ${item.color}</span>
        <span class="priceCart">${item.price.toLocaleString()}</span>
        <div class="qtyDelete">
          <div class= "groupQty">
          <button onclick="changeQuantity(${key},${item.quantity} -1)">-</button>
          <span class="Qty">${item.quantity}</span>
          <button onclick="changeQuantity(${key},${item.quantity} + 1)">+</button>
          <button class="delete" onclick = "clearLi()"><span><i class="fa fa-trash" aria-hidden="true"></i></span></button>
      </div>
      
      
        </div>
        
    </div>
      `
    
    newUl.appendChild(newli);

  });
}
reloadCart()








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
function clearLi() {
  localStorage.removeItem("listCarts")
}