// import { cart } from "../../data/cart.js";

// export function checkoutHeader() {
//   let cartQuantity = 0;

//   cart.forEach((cartItem) => {
//     cartQuantity += cartItem.quantity;
//   });

//   const checkoutHeaderHTML = `
//   <div class="checkout-header">
//       <div class="header-content">
//         <div class="checkout-header-left-section">
//           <a href="index.html">
//             <h1 class="text-[23px] font-bold uppercase text-[#e95ea3] relative">
//               <img
//                 src="images/name3.png"
//                 class="w-6 absolute z-10 -left-[17px] -top-1"
//               />
//               NEXORA
//             </h1>
//           </a>
//         </div>

//         <div class="checkout-header-middle-section">
//           Checkout (<a
//             class="return-to-home-link js-cart-quantity"
//             href="amazon.html"
//           ></a
//           >)
//         </div>

//         <div class="checkout-header-right-section">
//           <img src="images/icons/checkout-lock-icon.png" />
//         </div>
//       </div>
//     </div>
// `;
//   document.querySelector(".js-checkout-header").innerHTML = checkoutHeaderHTML;
// }
