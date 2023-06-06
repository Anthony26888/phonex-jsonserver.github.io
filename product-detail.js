var display = document.querySelector(".container");
var url ="http://localhost:3000/idProducts/1"

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
              newtitle.innerHTML="Select Storage:";
              newDiv3.appendChild(newtitle);

              value.type.storage.forEach(item =>{
                let newStorage = document.createElement("input");
                newStorage.type=""
              })

            newDiv2.appendChild(newDiv3)
            

            

          
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









  
  