export const cart = [];


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

    //mengubah opacity elemen "Added to Cart"
    const addedToCartElement = document.querySelector(`.added-to-cart[data-product-id="${productId}"]`);
    //dan menghilang setelah 5 detik
    addedToCartElement.style.opacity = "1"; // Ubah opacity menjadi 100%
    setTimeout(() => {
      addedToCartElement.style.opacity = "0"; // Ubah opacity menjadi 0%
    }, 5000);

  //jika tidak menambhankan data-produk-id , bisa menggunakan cara ini
    // const productContainer = button.closest('.product-container'); // Cari container produk terkait
    // const addedToCartElement = productContainer.querySelector('.added-to-cart'); // Ambil elemen "Added to Cart" di dalam container
    // addedToCartElement.style.opacity = "1"; // Ubah opacity menjadi 100%
    // console.log(addedToCartElement.style);
    
    console.log(cart);
}