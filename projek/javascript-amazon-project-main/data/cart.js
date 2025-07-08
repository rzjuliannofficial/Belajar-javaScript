export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
},{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
}];


//fungsi addToCart untuk menambahkan produk ke keranjang belanja
export function addToCart(productId) {
    
    // Ambil elemen dropdown berdasarkan productId
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const keranjang = parseInt(quantitySelector.value, 10); // Ambil nilai yang dipilih dari dropdown
  
  //add drop-down quantity to cart
    // const container = button.parentElement;
    // const select = container.querySelector('.product-quantity-container select');
    // const keranjang = parseInt(select.value);
  //

    let matchingItem ;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    // Check if the product is already in the cart
    if (matchingItem) {
      matchingItem.quantity += keranjang;
    }else {
      cart.push({
        productId : productId,
        quantity : keranjang
      });
    }
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}