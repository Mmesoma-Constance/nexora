import { getProduct } from "../data/products-data.js";
import { formatCurrency } from "./scripts/utils/money.js";
import { cart, addToCart, calculateCartQuantity } from "./data/cart.js";
import { singleProductFn } from "./data/single-product.js";

export const topSellingProducts = [
  {
    productId: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    name: "Casein Protein Tablets",
  },

  {
    productId: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    name: "Ginger Root Tablets",
  },

  {
    productId: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    name: "Gainers' Multivitamin",
  },

  {
    productId: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    name: "Flaxseed Oil Tablets",
  },
];

// export function getTopSellingProduct() {
//   let topSellersHTML = "";
//   topSellingProducts.forEach((product) => {
//     const productId = product.productId;
//     const matchingProducts = getProduct(productId);

//     topSellersHTML += `
//     <div class="product-container">

//                 <figure
//                   class="js-single-product-btn bg-[#FBB4D8] h-[320px] p-6 flex flex-col justify-center items-center bg-opacity-50 cursor-pointer" data-product-id="${
//                     matchingProducts.id
//                   }"
//                 >
//                   <img src="${matchingProducts.image}" class="" /></figure
//               >
//               <div class="flex flex-col space-y-2 mt-3">
//                 <div class="flex justify-between">
//                   <h3 class="text-xl font-bold text-[#db2777]">${
//                     matchingProducts.name
//                   }</h3>

//                 </div>

//                 <div class="flex justify-between">
//                   <div class="relative btn-container">
//                     <button
//                       onclick="showToast(successMsg)"
//                       class="btn px-4 text-xs uppercase rounded-full p-2"
//                       id="js-add-to-cart" data-product-id="${
//                         matchingProducts.id
//                       }"
//                     >
//                       &#8594; Add to cart
//                     </button>
//                     <div
//                       class="btn-bg absolute bg-[#FBB4D8] -z-10 w-10 rounded-full left-0 h-8 top-0"
//                     ></div>
//                   </div>

//                   <span class="text-[17px]">$${formatCurrency(
//                     matchingProducts.priceCents
//                   )}</span>
//                 </div>
//               </div>
//             </div>
//   `;
//   });
// }
