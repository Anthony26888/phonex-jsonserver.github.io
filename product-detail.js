var display = document.querySelector(".container");
var url ="http://localhost:3000/idProducts/14"

/*****************************DISPLAY PROUCT */
function displayProduct(){
  fetch(url)
      .then((response) => response.json())
      .catch(error => console.log(error))
      .then(data => { 
        display.innerHTML="";
        data.forEach((value, key) => {
          let newDiv = document.createElement("div");
          newDiv.classList.add("imageProduct");
          newDiv.innerHTML=`
            <div class="sliderProduct">
              <img src="img/detail/${value.type.imgDetail[0]}" alt="">
            </div>
            <div class="sliderProduct">
              <img src="img/detail/${value.type.imgDetail[1]}" alt="">
            </div>
            <div class="sliderProduct">
              <img src="img/detail/${value.type.imgDetail[2]}" alt="">
            </div>
            <a class="prevDetail" onclick="plusSlide(-1)">&#10094;</a>
            <a class="nextDetail" onclick="plusSlide(+1)">&#10095;</a>
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
              <button class="atcDetail">Add To Cart</button>
              <span>or</span>
              <button class="iPDetail">Installment Payment</button>
            `
            

          newDiv1.appendChild(newDiv3)
          newDiv1.appendChild(newDiv4)
          newDiv1.appendChild(newDiv5)
        display.appendChild(newDiv);
        display.appendChild(newDiv1);
        });
      })
        
}
displayProduct();


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
  let slides = document.querySelector(".sliderProduct");
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









  
  