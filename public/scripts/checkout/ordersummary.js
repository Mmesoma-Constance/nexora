import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProduct, products } from "../../data/products-data.js";
import { formatCurrency } from ".././utils/money.js";
import { singleProductFn } from "../../data/single-product.js";
import {
  deliveryOptions,
  getDeliveryOptions,
  calculateDeliveryDate,
} from "../../data/delivery-options.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  renderPaymentSummary,
  updatePlaceOrderButtonState,
} from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  if (cart && cart.length > 0) {
    cart.forEach((cartItem) => {
      const productId = cartItem.productId;

      const matchingProduct = getProduct(productId);
      const deliveryOptionId = cartItem.deliveryOptionId;

      let deliveryOption = getDeliveryOptions(deliveryOptionId);

      const dateString = calculateDeliveryDate(deliveryOption);

      cartSummaryHTML += `
         <div class="cart-item-container js-cart-item-container-${
           matchingProduct.id
         }">
                <div class="delivery-date">Delivery date: ${dateString}</div>
    
                <div class="cart-item-details-grid">
                  <img class="js-single-product-btn product-image cursor-pointer" src="${
                    matchingProduct.image
                  }"  data-product-id="${matchingProduct.id}"   />
    
                  <div class="cart-item-details">
                    <div class="product-name" >
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">$${formatCurrency(
                      matchingProduct.priceCents
                    )}</div>
                    <div class="product-quantity">
                      <span> Quantity: <span class="quantity-label js-quantity-label-${
                        matchingProduct.id
                      }">${cartItem.quantity}</span> </span>
                      <span class="update-quantity-link link-primary js-update-link"
                data-product-id="${matchingProduct.id}">
                        Update
                      </span>
                       <input class="quantity-input js-quantity-input-${
                         matchingProduct.id
                       } border">  
               <span class="save-quantity-link link-primary js-save-link"
                data-product-id="${matchingProduct.id}">
                Save
              </span>
                      <span class="delete-quantity-link link-primary" data-product-id="${
                        matchingProduct.id
                      }">
                        Delete
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                  </div>
                </div>
              </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = "";
      deliveryOptions.forEach((deliveryOption) => {
        const dateString = calculateDeliveryDate(deliveryOption);

        const priceString =
          deliveryOption.priceCents === 0
            ? "FREE"
            : `$${formatCurrency(deliveryOption.priceCents)} - `;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
     
                    <div class="delivery-option js-delivery-option gap-2"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                      <input
                        type="radio"
                        ${isChecked ? "checked" : ""}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}"
                      />
                      <div>
                        <div class="delivery-option-date">${dateString}</div>
                        <div class="delivery-option-price">${priceString} Shipping</div>
                      </div>
                    </div>
               
  `;
      });

      return html;
    }

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  } else {
    document.querySelector(".js-order-summary").innerHTML =
      'Your cart is empty! <img src="images/open-box.png" class="w-20">';
  }

  // single product page
  document.querySelectorAll(".js-single-product-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      singleProductFn(productId);
    });
  });

  document.querySelectorAll(".delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      // const container = document.querySelector(
      //   `.js-cart-item-container-${productId}`
      // );
      // container.remove();

      // Check again if the cart is empty after removing an item
      if (cart.length === 0) {
        document.querySelector(".js-order-summary").innerHTML =
          'Your cart is empty! <img src="images/open-box.png" class="w-20">';
      }

      renderOrderSummary();
      renderPaymentSummary();
      updateCartQuantity();
      updatePlaceOrderButtonState();
    });
  });

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector(
      ".js-cart-quantity"
    ).innerHTML = `${cartQuantity} items`;
  }

  updateCartQuantity();

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
      document.querySelectorAll(".quantity-input").forEach((box) => {
        box.focus();
      });
      updatePlaceOrderButtonState();
    });
  });

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);

      if (newQuantity <= 0 || newQuantity >= 50) {
        alert("Quantity must be at least 1 or less than 50");
        document.querySelectorAll(".quantity-input").forEach((box) => {
          box.focus();
        });
        return;
      }
      updateQuantity(productId, newQuantity);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;
      updateCartQuantity();
      renderPaymentSummary();
      updatePlaceOrderButtonState();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
      updatePlaceOrderButtonState();
    });
  });
}

renderOrderSummary();
