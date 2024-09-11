import { cart } from "../../data/cart.js";
import { getDeliveryOptions } from "../../data/delivery-options.js";
import { getProduct } from "../../data/products-data.js";
import { formatCurrency } from "../utils/money.js";
import { calculateCartQuantity } from "../../data/cart.js";
import { addOrder } from "../../data/orders.js";
formatCurrency;
let totalCents;

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCent = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
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
            <div>Shipping &amp; handling:</div>
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

export function updatePlaceOrderButtonState() {
  const cartQuantity = calculateCartQuantity(); // Get the current cart quantity
  const placeOrderBtn = document.getElementById("submit-btn");
  if (cartQuantity === 0) {
    placeOrderBtn.classList.add("disabled");
    placeOrderBtn.disabled = true;
  } else {
    placeOrderBtn.classList.remove("disabled");
    placeOrderBtn.disabled = false;
  }

  const isLoggedIn = localStorage.getItem("isLoggedIn"); // Retrieve login state from local storage

  if (!isLoggedIn) {
    placeOrderBtn.addEventListener("click", () => {
      location.href = "form.html?source=cart";
    });
  }

  if (isLoggedIn) {
    placeOrderBtn.addEventListener("click", () => {
      try {
        addOrder(cart);
      } catch (error) {
        alert("Unexpected error. Try again later");
      }

      location.href = "payment.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updatePlaceOrderButtonState();
});
