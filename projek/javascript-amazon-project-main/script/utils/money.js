export function formatCurrency(priceCents) {
    return `$${(priceCents / 100).toFixed(2)}`;
}

//default export
export default formatCurrency;

// //manggilnya nanti 
// import formatCurrency from './formatCurrency.js';

//lebih cleaner, dan per file hanya bisa 1 default export