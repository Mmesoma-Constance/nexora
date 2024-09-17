import { getOrder } from "../data/orders.js";
import { getProduct } from "../data/products-data.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

function loadPage() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const order = getOrder(orderId);
  const product = getProduct(productId);

  // Get the specific product details within the order
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  // Log the raw estimatedDeliveryTime value
  console.log(
    "Raw estimatedDeliveryTime:",
    productDetails.estimatedDeliveryTime
  );

  // Ensure the estimatedDeliveryTime is correctly parsed by dayjs
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  if (!deliveryTime.isValid()) {
    console.error(
      "Invalid delivery date format:",
      productDetails.estimatedDeliveryTime
    );
    return; // Stop further execution if the date format is wrong
  }

  // Define dates using dayjs
  const today = dayjs();
  const orderTime = dayjs(order.orderTime);

  // Calculate the total days between order and delivery
  const totalDays = deliveryTime.diff(orderTime, "day");

  // Calculate the days passed since the order was placed
  const elapsedDays = today.diff(orderTime, "day");

  // Calculate percentage progress (bounded between 0 and 100)
  let percentProgress = 0;
  if (totalDays > 0) {
    percentProgress = Math.min(
      Math.max((elapsedDays / totalDays) * 100, 0),
      100
    );
  }

  // Determine if the product has been delivered or is still arriving
  const deliveredMessage =
    today.isAfter(deliveryTime) || today.isSame(deliveryTime)
      ? "Delivered on"
      : "Arriving on";

  // Log data to help you debug
  console.log("Order Time:", orderTime.format("YYYY-MM-DD"));
  console.log("Delivery Time:", deliveryTime.format("YYYY-MM-DD"));
  console.log("Today:", today.format("YYYY-MM-DD"));
  console.log("Total Days:", totalDays);
  console.log("Elapsed Days:", elapsedDays);
  console.log("Percent Progress:", percentProgress);

  // Generate the HTML
  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
    <div class="delivery-date">
      ${deliveredMessage} ${deliveryTime.format("dddd, MMMM D")}
    </div>
    <div class="product-info">
      ${product.name}
    </div>
    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
      <div class="progress-label ${
        percentProgress < 50 ? "current-status" : ""
      }">
        Preparing
      </div>
      <div class="progress-label ${
        percentProgress >= 50 && percentProgress < 100 ? "current-status" : ""
      }">
        Shipped
      </div>
      <div class="progress-label ${
        percentProgress >= 100 ? "current-status" : ""
      }">
        Delivered
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `;
  console.log(percentProgress);
  document.querySelector(".js-order-tracking").innerHTML = trackingHTML;
}

loadPage();

///////////////////////////////////////////////

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
