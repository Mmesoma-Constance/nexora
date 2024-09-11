// import * as toast from toast.js
import { cart, addToCart, calculateCartQuantity } from "./data/cart.js";
import { products } from "./data/products-data.js";
import { singleProductFn } from "./data/single-product.js";
import { formatCurrency } from "./scripts/utils/money.js";

document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // Retrieve login state from local storage

  const signInButton = document.querySelector("#signin-btn"); // Update the selector to match your HTML

  if (!isLoggedIn) {
    signInButton.addEventListener("click", () => {
      location.href = "form.html";
    });
  }

  if (isLoggedIn) {
    signInButton.textContent = "Buy Now"; // Change button text
    const profilePic = document.getElementById("profile-picture");
    profilePic.style.display = "flex";
    profilePic.addEventListener("click", () => {
      location.href = "form.html";
    });
  }
});

let productHTML = "";

products.forEach((product) => {
  productHTML += `
    <div class="recommended-product-content">
              
                <figure
                  class="js-single-product-btn bg-[#FBB4D8] h-[320px] p-6 flex flex-col justify-center items-center bg-opacity-50 cursor-pointer" data-product-id="${
                    product.id
                  }"
                >
                  <img src="${product.image}" class="" /></figure
              >
              <div class="flex flex-col space-y-2 mt-3">
                <div class="flex justify-between">
                  <h3 class="text-xl font-bold text-[#db2777]">${
                    product.name
                  }</h3>
                 
                </div>

                <div class="flex justify-between">
                  <div class="relative btn-container">
                    <button
                      onclick="showToast(successMsg)"
                      class="btn px-4 text-xs uppercase rounded-full p-2"
                      id="js-add-to-cart" data-product-id="${product.id}"
                    >
                      &#8594; Add to cart
                    </button>
                    <div
                      class="btn-bg absolute bg-[#FBB4D8] -z-10 w-10 rounded-full left-0 h-8 top-0"
                    ></div>
                  </div>

                  <span class="text-[17px]">$${formatCurrency(
                    product.priceCents
                  )}</span>
                </div>
              </div>
            </div>
  `;
});

document.querySelector(".recommended-product-container").innerHTML =
  productHTML;

function updateCartQuantity() {
  let cartQuanitity = calculateCartQuantity();

  document.getElementById("js-cart-quantity").innerHTML = cartQuanitity;
}
updateCartQuantity();

document.querySelectorAll("#js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);

    updateCartQuantity();
  });
});

document.querySelectorAll(".js-single-product-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = btn.dataset.productId;
    singleProductFn(productId);
  });
});
