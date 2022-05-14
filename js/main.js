
// we need to add quantity in api that make code run



// add class active in navbar when scroll

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll' , () => {
    window.scrollY > 100 ? navbar.classList.add('active') : navbar.classList.remove('active');
});
window.scrollY > 100 ? navbar.classList.add('active') : navbar.classList.remove('active');



// get Products

let homePage = document.querySelector('.popular-products.some .row');

let allData;

let counter = document.querySelector('.navbar .counter');

fetch('https://fakestoreapi.com/products').then((response) =>  {
    return response.json();
}).then((response) => {

    allData = response;
    // send api data to localstorege 
    localStorage.setItem('allProducts' , JSON.stringify(allData));
    products(allData);
});



function products(data) {
    let output = '';
    let someData = data.slice(0,4);
    someData.map( item => {
        output += `
       <div class="col-lg-3 col-md-6">
            <div class="box">
                <div class="images">
                <img src="${item.image}" alt="toy" />
                </div>
                <div class="info">
                    <h5 class="name">${item.title}</h5>
                    <p class="descrbtion">${item.description}</p>
                    <div>
                        <span class="price">$${item.price}</span>
                        <button class="add-cart" onclick="addToCart(${item.id})">add to cart</button>
                    </div>
                </div>
            </div>
        </div> 
        `
    });

    if (homePage) {
        homePage.innerHTML = output;
    }
}


const requsetToGetProduct = JSON.parse(localStorage.getItem("productInCart")) || [];

let productNeedToBuy = [...requsetToGetProduct]; 



let allQuantityProducts = [];
function addToCart(id) {

    let addedItem = allData.find( item =>  item.id === id);
    let quantityitem = allQuantityProducts.find( i => i.id === addedItem.id);

    if (quantityitem) {
        addedItem.rating.count += 1;
    } else {
        allQuantityProducts.push(addedItem);
    }

    productNeedToBuy =[...productNeedToBuy , addedItem]; 
    let uniqueProduct = getUniqueArr(productNeedToBuy , "id");
    counter.innerHTML = productNeedToBuy.length;
    localStorage.setItem('productInCart' , JSON.stringify(uniqueProduct));
    counterProduct();
}



function getUniqueArr(arr, filterType) {
    let unique = arr
    .map(item => item[filterType])
    .map((item , i , final) => final.indexOf(item) === i && i)
    .filter(item => arr[item])
    .map(item => arr[item]);
    return unique;
}

function counterProduct() {
    const productCart = JSON.parse(localStorage.getItem("productInCart")) || [];
    counter.textContent = productCart.length;
};
counterProduct();




// form validation
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {

        form.addEventListener('submit', function (event) {

          if (!form.checkValidity()) {

            event.preventDefault()

            event.stopPropagation()

          } else  {
              let contactUsSubmit = document.querySelector('.contact-us-submit');
              let buyProductsSubmit = document.querySelector('.checkout-submit');
              if (contactUsSubmit) {
                  alert('You sent your message');
              }  else if (buyProductsSubmit) {
                alert('Your purchase completed successfully');
                removeAllProductInCart();
              }
          } 
  
          form.classList.add('was-validated')
          
        }, false)
      })
  })()
  

// remove all products in cart

function removeAllProductInCart() {
    let productInCart = JSON.parse(localStorage.getItem('productInCart'));
    productInCart.length = [];
    localStorage.setItem('productInCart' , JSON.stringify(productInCart));

    // to set price when productInCart is empty
    localStorage.setItem('totalPrice' , JSON.stringify(0));
}




// get total Price to add in checkout page

function sendTotalPriceToCheckout() {
    let totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    let checkoutInput = document.querySelector('.checkout-input');

    // if condtion to find html element without erorr
    if (checkoutInput) {
        checkoutInput.innerHTML = totalPrice;
    }

}

sendTotalPriceToCheckout();