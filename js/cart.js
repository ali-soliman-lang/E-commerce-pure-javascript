let cartPage = document.querySelector('.all-toys .row .col-lg-8.col-md-12 .row');
let noProducts = document.querySelector('.noProducts');


function addProductsInCartPage(allData = []) {

    if (JSON.parse(localStorage.getItem('productInCart')).length === 0) {
        noProducts.innerHTML = 'there is no products !!';
    }
    let Data = JSON.parse(localStorage.getItem('productInCart')) || allData;



    let output = Data.map( item => {
        return `
            <div class="col-md-12">
                <div class="box">
                    <div class="row">
                        <div class="col-md-6">
                        <div class="images">
                            <img src="${item.image}" alt="toy">
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="info">
                            <h5 class="name">${item.title}</h5>
                            <p class="descrbtion">${item.description}</p>
                            <div>
                                <p class="price">Price : $${item.price * item.rating.count}</p>
                                <span class="decrease-btn" onclick="decrease(${item.id})"><i class="fas fa-minus"></i></span> 
                                <p class="quantity">
                                ${item.rating.count}
                                </p> 
                                <span class="increase-btn" onclick="increase(${item.id})"><i class="fas fa-plus"></i></span> 
                                <br />
                                
                            </div>
                            <button class="add-cart" onclick="removeFromCart(${item.id})">remove to cart</button>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
        `
    });
    cartPage.innerHTML = output;
    
    totalCost(Data);
}
addProductsInCartPage();



function decrease(id) {
    let productComeInCart = JSON.parse(localStorage.getItem('productInCart'));

    let minusQuantity = productComeInCart.map( item => { 

        if (item.id === id && item.rating.count > 1) {

            item.rating.count -= 1;

            return item;

        } 

        return item;
    });

    localStorage.setItem('productInCart' , JSON.stringify(minusQuantity));
    
    addProductsInCartPage();
}

function increase(id) {
    let productComeInCart = JSON.parse(localStorage.getItem('productInCart'));
    let plusQuantity = productComeInCart.map( item => { 
        if (item.id === id) {
            item.rating.count += 1;
            return item;
        }
        return item;
    });

    localStorage.setItem('productInCart' , JSON.stringify(plusQuantity));
    addProductsInCartPage();
}



function removeFromCart(id) {
    let productComeInCart = localStorage.getItem('productInCart');
    if (productComeInCart) {
        let items = JSON.parse(productComeInCart);

        let productYouNeedRemoved = items.filter( item => item.id !== id);

        localStorage.setItem('productInCart' , JSON.stringify(productYouNeedRemoved));

        addProductsInCartPage(productYouNeedRemoved);
    }
    counterProduct();
}


function totalCost(data) {
    let totalPrice = 0;
    let ShippingCost = 10;

    // calc total price
    data.map(item => {
        totalPrice += item.price * item.rating.count;
    })
    document.querySelector('.total-number').innerHTML = '$' + parseFloat(totalPrice.toFixed(2));


    // if total Price equal zero don't add Shipping Cost
    if (totalPrice > 0 ) {
        let addShippinCost = totalPrice += ShippingCost;
        document.querySelector('.total-price-number').innerHTML = '$' + parseFloat(addShippinCost.toFixed(2));
    } else {
        document.querySelector('.total-price-number').innerHTML = '$0';
    }

    // if total Price equal zero don't 
    if (totalPrice === 0) {
        document.querySelector('.checkout-link').addEventListener('click' , (e) => {
            e.preventDefault();
        })
    }

    // send total Price to checkout page
    localStorage.setItem('totalPrice' , JSON.stringify(totalPrice));

}

function counterProduct() {
    const productCart = JSON.parse(localStorage.getItem("productInCart"));
    counter.textContent = productCart.length;
};

