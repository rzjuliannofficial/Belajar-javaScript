export let cart = JSON.parse(localStorage.getItem('cart'));
//mengambil cart dari localStorage dan mengembalikan ke json

if (!cart) {
  cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
  },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
  }];
}



function saveToStorage() {
    // Simpan cart ke localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

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
        quantity : keranjang,
        deliveryOptionId: '1'
      });
    }

    saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];

  //agar tidak diremove semua
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateFromCart(productId, link){
  
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {    
      
      const quantityLabel = link.closest('.product-quantity').querySelector('.js-quantity-label');

      if (link.innerHTML.trim() === 'Update') {
        link.innerHTML = 'Save';
        quantityLabel.innerHTML = `<input class="edit-quantity js-edit-quantity" value="${cartItem.quantity}" min="1">`;
        // document.querySelector('js-quantity-label')
        //   .outerHTML = `<input class="edit-quantity js-edit-quantity" type="number" value="${cartItem.quantity}" min="1">`
        console.log(productId);
      }else {
        link.innerHTML = 'Update';
        const editQuantityInput = link.closest('.product-quantity').querySelector('.js-edit-quantity');
        const newQuantity = parseInt(editQuantityInput.value, 10);

         // Perbarui quantity di keranjang
         cartItem.quantity = newQuantity;

         // Ganti input kembali menjadi teks Quantity
         editQuantityInput.outerHTML = `<span class="quantity-label js-quantity-label">${newQuantity}</span>`;

         saveToStorage();
      }
    }
  });
  //trim() menghapus spasi tambahan di awal dan akhir teks, 
  // sehingga kondisi if dievaluasi dengan benar.
};

export function updateDeliveryOption(productId , deliveryOptionId) {
  let matchingItem ;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  
  matchingItem.deliveryOptionId = deliveryOptionId;
  console.log(matchingItem);
  console.log(deliveryOptionId);
  
  saveToStorage();
}