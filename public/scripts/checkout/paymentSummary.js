import { cart, removeFromCart } from "../../data/cart.js";
import { getDeliveryOptions } from "../../data/delivery-options.js";
import { getProduct } from "../../data/products-data.js";
import { formatCurrency } from "../utils/money.js";
import { calculateCartQuantity } from "../../data/cart.js";
import { addOrder } from "../../data/orders.js";
import { calculateDeliveryDate } from "../../data/delivery-options.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
// For generating unique order IDs
formatCurrency();

function generateShortUuid() {
  return uuidv4().substring(0, 28); // trim to 28 characters
}

let totalCents;

// Function to render the payment summary
export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCent = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);

    const deliveryDate = calculateDeliveryDate(deliveryOption);
    console.log(deliveryDate);
    shippingPriceCent += deliveryOption.priceCents;
  });

  const totalBeforePriceCents = productPriceCents + shippingPriceCent;
  const taxCents = totalBeforePriceCents * 0.1;
  totalCents = totalBeforePriceCents + taxCents;

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const paymentSummaryHTML = `
   <div class="payment-summary-title text-[#db2777]">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping & handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPriceCent
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforePriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalCents
            )}</div>
          </div>

          <button
            class="bg-[#e95ea3] hover:bg-[#db2777] text-white place-order-button button-primary cursor-pointer"
            id="submit-btn"
          >
            Place your order
          </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}

// Function to update the "Place your order" button state and handle placing orders
export function updatePlaceOrderButtonState() {
  const cartQuantity = calculateCartQuantity(); // Get the current cart quantity
  const placeOrderBtn = document.getElementById("submit-btn");

  // Disable the button if the cart is empty
  if (cartQuantity === 0) {
    placeOrderBtn.classList.add("disabled");
    placeOrderBtn.disabled = true;
  } else {
    placeOrderBtn.classList.remove("disabled");
    placeOrderBtn.disabled = false;
  }

  const isLoggedIn = localStorage.getItem("isLoggedIn"); // Retrieve login state from local storage

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    placeOrderBtn.addEventListener("click", () => {
      location.href = "form.html?source=cart";
    });
  }

  // Handle placing an order if logged in
  if (isLoggedIn) {
    placeOrderBtn.addEventListener("click", () => {
      try {
        // Create the order from the cart
        const order = {
          id: generateShortUuid(), // Generate a unique order ID
          orderTime: new Date().toISOString(), // Current time
          totalCostCents: calculateTotalCartCost(), // Total cost of the order
          products: cart.map((cartItem) => {
            const deliveryOption = getDeliveryOptions(
              cartItem.deliveryOptionId
            );
            const estimatedDeliveryTime = calculateDeliveryDate(deliveryOption);

            return {
              productId: cartItem.productId,
              quantity: cartItem.quantity,
              estimatedDeliveryTime: estimatedDeliveryTime,
            };
          }),
        };

        // Add the order to localStorage
        addOrder(order);

        // Clear the cart after placing the order
        cart.length = 0;
        localStorage.setItem("cart", JSON.stringify(cart));

        // Redirect to the orders page
        location.href = "orders.html";
      } catch (error) {
        console.error("Error while placing order:", error);
        alert("Unexpected error. Try again later.");
      }
    });
  }
}

export function congratulatoryMsg() {
  alert(
    "Your order is confirmed, and we're already preparing it for you. Thanks for shopping with us!"
  );
}

// Helper function to calculate the total cost of the cart
function calculateTotalCartCost() {
  let totalCost = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);

    totalCost +=
      product.priceCents * cartItem.quantity + deliveryOption.priceCents;
  });
  // Add 10% tax on the total cost
  const taxCents = totalCost * 0.1;

  return totalCost + taxCents;
}

// Ensure the page initializes the button state on load
document.addEventListener("DOMContentLoaded", function () {
  updatePlaceOrderButtonState();
});

// import { cart } from "../../data/cart.js";
// import { getDeliveryOptions } from "../../data/delivery-options.js";
// import { getProduct } from "../../data/products-data.js";
// import { formatCurrency } from "../utils/money.js";
// import { calculateCartQuantity } from "../../data/cart.js";
// import { addOrder } from "../../data/orders.js";
// formatCurrency;
// let totalCents;

// export function renderPaymentSummary() {
//   let productPriceCents = 0;
//   let shippingPriceCent = 0;
//   cart.forEach((cartItem) => {
//     const product = getProduct(cartItem.productId);
//     productPriceCents += product.priceCents * cartItem.quantity;

//     const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
//     shippingPriceCent += deliveryOption.priceCents;
//   });

//   const totalBeforePriceCents = productPriceCents + shippingPriceCent;
//   const taxCents = totalBeforePriceCents * 0.1;
//   totalCents = totalBeforePriceCents + taxCents;

//   let cartQuantity = 0;

//   cart.forEach((cartItem) => {
//     cartQuantity += cartItem.quantity;
//   });

//   const paymentSummaryHTML = `
//    <div class="payment-summary-title text-[#db2777]">Order Summary</div>

//           <div class="payment-summary-row">
//             <div>Items (${cartQuantity}):</div>
//             <div class="payment-summary-money">$${formatCurrency(
//               productPriceCents
//             )}</div>
//           </div>

//           <div class="payment-summary-row">
//             <div>Shipping &amp; handling:</div>
//             <div class="payment-summary-money">$${formatCurrency(
//               shippingPriceCent
//             )}</div>
//           </div>

//           <div class="payment-summary-row subtotal-row">
//             <div>Total before tax:</div>
//             <div class="payment-summary-money">$${formatCurrency(
//               totalBeforePriceCents
//             )}</div>
//           </div>

//           <div class="payment-summary-row">
//             <div>Estimated tax (10%):</div>
//             <div class="payment-summary-money">$${formatCurrency(
//               taxCents
//             )}</div>
//           </div>

//           <div class="payment-summary-row total-row">
//             <div>Order total:</div>
//             <div class="payment-summary-money">$${formatCurrency(
//               totalCents
//             )}</div>
//           </div>

//           <button
//             class="bg-[#e95ea3] hover:bg-[#db2777] text-white place-order-button button-primary cursor-pointer"
//             id="submit-btn"
//           >
//             Place your order
//           </button>
//   `;
//   document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
// }

// export function updatePlaceOrderButtonState() {
//   const cartQuantity = calculateCartQuantity(); // Get the current cart quantity
//   const placeOrderBtn = document.getElementById("submit-btn");
//   if (cartQuantity === 0) {
//     placeOrderBtn.classList.add("disabled");
//     placeOrderBtn.disabled = true;
//   } else {
//     placeOrderBtn.classList.remove("disabled");
//     placeOrderBtn.disabled = false;
//   }

//   const isLoggedIn = localStorage.getItem("isLoggedIn"); // Retrieve login state from local storage

//   if (!isLoggedIn) {
//     placeOrderBtn.addEventListener("click", () => {
//       location.href = "form.html?source=cart";
//     });
//   }

//   if (isLoggedIn) {
//     placeOrderBtn.addEventListener("click", () => {
//       try {
//         addOrder(cart);
//       } catch (error) {
//         alert("Unexpected error. Try again later");
//       }

//       location.href = "orders.html";
//     });
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   updatePlaceOrderButtonState();
// });
