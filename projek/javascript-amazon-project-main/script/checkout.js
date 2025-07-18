import {cart, removeFromCart, updateFromCart, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {deliveryOptions} from '../data/deliveryOption.js';

//external library and javascript moduls(ESM)
//jadi kegunaan ini agar bisa dipanggil di file lain
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

//external library
// console.log(dayjs());
// const today = dayjs();
// const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate.format('dddd, MMMM D'));
// console.log(deliveryDate);


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    
    const productId = cartItem.productId;

    let matchingProduct;
    
    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });
    // console.log(matchingProduct.priceCents);
    // console.log(matchingProduct);

    updatecheckOutQuantity();

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
            console.log(deliveryOption);
        }
    });

    
    const today = dayjs();
    const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
    );
    const dateString = deliveryDate.format(
        'dddd, MMMM D'  
    );

    cartSummaryHTML += `
    <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label" >${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary 
                js-update-link"
                data-product-id="${matchingProduct.id}">
                Update
                </span>
                <span class="delete-quantity-link link-primary 
                js-delete-link" 
                data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            
        </div>
    </div>
    `
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption)=> {
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format(
          'dddd, MMMM D'  
        );

        const priceString = 
        deliveryOption.priceCents === 0 ? 'FREE': `${formatCurrency(deliveryOption.priceCents)} -`;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            ${isChecked ? 'checked' : ''}  
            class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
            </div>
        </div>
        `
    });

    return html;
}

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

addEventListener();

function addEventListener() {
    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const selectProductId = link.dataset.productId;
            removeFromCart(selectProductId);

        const container = document.querySelector(`.js-cart-item-container-${selectProductId}`);
        container.remove();
        updatecheckOutQuantity();
        });
    });


    document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const selectProductId = link.dataset.productId;
            updateFromCart(selectProductId, link);
            console.log(selectProductId);
            updatecheckOutQuantity()
        });
    });   
}

  //fungsi updatecheckOutQuantity untuk memperbarui jumlah keranjang di header
function updatecheckOutQuantity() {
    // Update the cart quantity in the header
      let checkOutQuantity = 0;
      
      cart.forEach((cartItem) => {
        checkOutQuantity += cartItem.quantity;
      });

      document.querySelector('.js-checkOut-Quantity')
        .innerHTML = checkOutQuantity + ' items';

        console.log(checkOutQuantity);
}

document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
        element.addEventListener('click', () => {
            // const productId = element.dataset.productId;
            // const deliveryOptionId = element.dataset.deliveryOptionId;
            //shortcut
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId , deliveryOptionId);
        });
    });