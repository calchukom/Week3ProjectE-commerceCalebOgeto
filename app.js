const itemsEl = document.querySelector(".left-items");
const cartItemsEl = document.querySelector(".myCartContent");
const subtotalEl = document.querySelector(".cart-footer-amount");
const totalItemsInCartEl = document.querySelector("#myCounter");


let myCart = [];

function renderProducts() {
    itemsEl.innerHTML = '';

    items.forEach((item) => {
        itemsEl.innerHTML += `
            <div class="left-items-item" data-item-id="${item.itemId}">
                <div class="item-img">
                    <img src="${item.imageUrl}" alt="${item.description} picture" class="item-img-image">
                    <button class="item-btncart">
                        <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart icon" class="cartimg">
                        <p class="carttext">Add to Cart</p>
                        <section class="big-myincdec">
                            <img src="assets/images/icon-increment-quantity.svg" alt="Increment the quantity" class="myincdec" onclick="addToCart(${item.itemId})"  width="20px"><br>
                            <img src="assets/images/icon-decrement-quantity.svg" alt="Decrement the quantity" class="myincdec" onclick="changeCounterNumber('minus', ${item.itemId})"   width="20px" >
                        </section>
                    </button>
                </div>
                <div class="item-description">
                    <p class="item-description-title" style="font-weight: bold; font-size: 40px; ">${item.itemName}</p> <br>
                    <p class="item-description-content" style="font-size: 25px;" >${item.description}</p>
                    <p class="item-description-amount" style="font-size: 30px; color: rgb(197, 77, 13); " >$${item.ItemPrice.toFixed(2)}</p>
                </div>
            </div>
        `;
    });
}

function addToCart(id) {
    const existingItem = myCart.find(item => item.itemId === id);

    if (existingItem !== undefined) {
        changeCounterNumber("plus", id);
    } else {
        const itemToAdd = items.find(item => item.itemId === id);
        if (itemToAdd !== undefined) {
            myCart.push({ ...itemToAdd,
                 counterNumber: 1 
                });
        }
        updateMyCart();
    }
}

function updateMyCart() {
    renderCartItems();
    renderSubTotal();
}

function renderSubTotal() {
    let totalPrice = 0,
    totalItems = 0;

    myCart.forEach(item => {
        totalPrice += item.ItemPrice * item.counterNumber;
        totalItems += item.counterNumber;
    });

    subtotalEl.innerHTML = `<h1><b>$${totalPrice.toFixed(2)}</b></h1>`;
    totalItemsInCartEl.innerHTML = totalItems;

}

function renderCartItems() {
    cartItemsEl.innerHTML = "";

    myCart.forEach(item => {
        cartItemsEl.innerHTML += `
            <h3 class="cart-item-title">${item.itemName}</h3>
            <div class="cart-item-content">
                <p style="color: rgb(211, 111, 10);" class="cart-item-count">${item.counterNumber}X</p>
                <p class="cart-item-values"> @$${item.ItemPrice.toFixed(2)} &nbsp;&nbsp;<b>$${(item.ItemPrice * item.counterNumber).toFixed(2)}</b></p>
                <img src="assets/images/icon-remove-item.svg" alt="Remove item from cart icon" class="cart-item-delImg" width="20px" onclick="removeCartItems(${item.itemId})">
            </div>
        `;
    });
}

//remove my cart items

function removeCartItems(id) {
    myCart = myCart.filter((item) => item.itemId != id);
   updateMyCart();
}

function changeCounterNumber(action, id) {
    myCart = myCart.map(item => {
        if (item.itemId === id) {
            if (action === "plus") {
                return { ...item,
                     counterNumber: item.counterNumber + 1
                     };
            } else if (action === "minus" && item.counterNumber > 1) {
                return { ...item, 
                    counterNumber: item.counterNumber - 1
                 };
            }
        }
        return item;
    });

    updateMyCart();
}

// Initial render
renderProducts();




