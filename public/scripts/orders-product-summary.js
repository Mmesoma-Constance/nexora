import { getProduct } from "../data/products-data.js";
import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { congratulatoryMsg } from "./checkout/paymentSummary.js";
congratulatoryMsg();
// import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  addToCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";

// function generateShortUuid() {
//   return uuidv4().substring(0, 28); // trim to 28 characters
// }

document.addEventListener("DOMContentLoaded", function () {
  loadPage();
});

function loadPage() {
  let ordersHTML = "";

  orders.forEach((order) => {
    // Debugging: Log the order object
    // console.log("Order:", order);
    if (!order.products) {
      console.error("No products property on order:", order);
      return;
    }

    const orderTimeString = dayjs(order.orderTime).format("MMMM D");

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `;
  });

  function productsListHTML(order) {
    let productsListHTML = "";

    if (!order.products || !Array.isArray(order.products)) {
      console.error(
        "Products is not an array or is undefined:",
        order.products
      );
      return productsListHTML;
    }

    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);
      // const dateString = calculateDeliveryDate(product);
      // console.log(dateString);

      productsListHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format(
              "MMMM D"
            )}
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${
            product.id
          }" data-quantity="${productDetails.quantity}">
          
            <img class="buy-again-icon" src="images/buy-again.png"> 
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
      // console.log(
      //   "Estimated Delivery Time:",
      //   productDetails.estimatedDeliveryTime
      // );
      // console.log("Product Quantity:", productDetails.quantity);
    });

    return productsListHTML;
  }

  document.querySelector(".js-orders-grid").innerHTML = ordersHTML;
  // Calculate and update the cart quantity
  updateCartQuantity();

  document.querySelectorAll(".js-buy-again").forEach((button) => {
    button.addEventListener("click", () => {
      const quantity = parseInt(button.dataset.quantity, 10); // Get the correct quantity
      console.log("Parsed Quantity:", quantity); // Debugging
      addToCart(button.dataset.productId, quantity); // Add to cart with correct quantity
      updateCartQuantity(); // Update the cart quantity

      button.innerHTML = "Added";
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    });
  });
}

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity(); // Get the actual cart quantity
  const cartQuantityElement = document.getElementById("js-cart-quantity");

  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  } else {
    console.error("Cart quantity element not found");
  }
}
