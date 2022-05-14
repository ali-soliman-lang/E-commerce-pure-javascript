let productPage = document.querySelector('.popular-products.all .row');
let allProducts = localStorage.getItem('allProducts');


if (allProducts) {
    let items = JSON.parse(allProducts);
    products(items);
}

function products(items) {
    let result = '';
    items.map( item => {
        result += `
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
                        <button class="add-cart" onclick='addToCart(${item.id})'>add to cart</button>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    productPage.innerHTML = result;
}