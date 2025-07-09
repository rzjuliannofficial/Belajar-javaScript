import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

// juga bisa mengguanakna ini
//import * as Cart from './Cart.js';
//nanti manggilnya seperti ini : 
// Cart.addToCart(productId); && Cart.cart

let productsHTML ='';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}

          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option value=1>1</option>
              <option value=2>2</option>
              <option value=3>3</option>
              <option value=4>4</option>
              <option value=5>5</option>
              <option value=6>6</option>
              <option value=7>7</option>
              <option value=8>8</option>
              <option value=9>9</option>
              <option value=10>10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart" 
            data-product-id="${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button 
          button-primary js-add-to-cart"
          data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
    `;

    document.querySelector('.js-products-grid')
        .innerHTML = productsHTML;

    
    updateCartQuantity();

  //fungsi updateCartQuantity untuk memperbarui jumlah keranjang di header
    function updateCartQuantity() {
    // Update the cart quantity in the header
      let cartQuantity = 0;
      
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
        console.log(cartQuantity);
    }
    
    // Add event listener to the "Add to Cart" buttons
      document.querySelectorAll('.js-add-to-cart')
        .forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button.dataset.productId;
        
          addToCart(productId);
          updateCartQuantity();
        
        //mengubah opacity elemen "Added to Cart"
          const addedToCartElement = document.querySelector(`.added-to-cart[data-product-id="${productId}"]`);
          //dan menghilang setelah 5 detik
          addedToCartElement.style.opacity = "1"; // Ubah opacity menjadi 100%
          setTimeout(() => {
            addedToCartElement.style.opacity = "0"; // Ubah opacity menjadi 0%
          }, 5000);
          //console.log(quantitySelector);
          // console.log(quantity);

          //jika tidak menambhankan data-produk-id , bisa menggunakan cara ini
          // const productContainer = button.closest('.product-container'); // Cari container produk terkait
          // const addedToCartElement = productContainer.querySelector('.added-to-cart'); // Ambil elemen "Added to Cart" di dalam container
          // addedToCartElement.style.opacity = "1"; // Ubah opacity menjadi 100%
          // console.log(addedToCartElement.style);
          
          console.log(cart);
        });
      });
});