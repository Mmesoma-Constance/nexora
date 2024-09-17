// import * as toast from toast.js
import { cart, addToCart, calculateCartQuantity } from "./data/cart.js";
import { products } from "./data/products-data.js";
import { singleProductFn } from "./data/single-product.js";
import { formatCurrency } from "./scripts/utils/money.js";
// import { topSellingProducts } from "./scripts/top-selling-products.js";
import { getProduct } from "./data/products-data.js";

document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // Retrieve login state from local storage

  const signInButton = document.querySelectorAll("#signin-btn"); // Update the selector to match your HTML

  if (!isLoggedIn) {
    signInButton.forEach((btn) => {
      btn.addEventListener("click", () => {
        location.href = "form.html?source=home";
      });
    });
  }

  if (isLoggedIn) {
    signInButton.forEach((btn) => {
      btn.style.display = "none"; // Change button text
    });

    const profilePic = document.getElementById("profile-picture");
    profilePic.style.display = "flex";
    profilePic.addEventListener("click", () => {
      location.href = "form.html";
    });
  }
});

document.getElementById("cart-btn").addEventListener("click", () => {
  try {
    location.href = "cart-page.html";
  } catch (error) {
    alert("NO INTERNET CONNECTION", error);
  }
});

let productHTML = "";

products.forEach((product) => {
  productHTML += `
    <div class="product-container">
              
                <figure
                  class="js-single-product-btn bg-[#FBB4D8] h-[320px] p-6 flex flex-col justify-center items-center bg-opacity-50 cursor-pointer" data-product-id="${
                    product.id
                  }"
                >
                  <img src="${product.image}" class="w-[250px]" /></figure
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

document.querySelector(".js-products-grid").innerHTML = productHTML;

// // Filter products based on top-selling product IDs
// const topSellingProductIds = topSellingProducts.map((item) => item.productId);
// const filteredTopSellingProducts = products.filter((product) =>
//   topSellingProductIds.includes(product.id)
// );

// // Generate HTML for top-selling products
// let topSellersHTML = "";

// filteredTopSellingProducts.forEach((product) => {
//   topSellersHTML += `
//     <div class="top-selling-product-container">
//       <figure
//         class="js-single-product-btn bg-[#FBB4D8] h-[320px] p-6 flex flex-col justify-center items-center bg-opacity-50 cursor-pointer"
//         data-product-id="${product.id}"
//       >
//         <img src="${product.image}" class="" alt="${product.name}" />
//       </figure>
//       <div class="flex flex-col space-y-2 mt-3">
//         <div class="flex justify-between">
//           <h3 class="text-xl font-bold text-[#db2777]">${product.name}</h3>
//         </div>
//         <div class="flex justify-between">
//           <div class="relative btn-container">
//             <button
//               class="btn px-4 text-xs uppercase rounded-full p-2"
//               id="js-add-to-cart"
//               data-product-id="${product.id}"
//             >
//               &#8594; Add to cart
//             </button>
//             <div
//               class="btn-bg absolute bg-[#FBB4D8] -z-10 w-10 rounded-full left-0 h-8 top-0"
//             ></div>
//           </div>
//           <span class="text-[17px]">$${formatCurrency(
//             product.priceCents
//           )}</span>
//         </div>
//       </div>
//     </div>
//   `;
// });

// // Add the top-selling products HTML to the DOM
// document.querySelector(".recommended-product-container").innerHTML =
//   topSellersHTML;

let quantity = Number(1);

function updateCartQuantity() {
  let cartQuanitity = calculateCartQuantity();

  document.getElementById("js-cart-quantity").innerHTML = cartQuanitity;
}
updateCartQuantity();

document.querySelectorAll("#js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId, quantity);

    updateCartQuantity();
  });
});

document.querySelectorAll(".js-single-product-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = btn.dataset.productId;
    singleProductFn(productId);
  });
});

///////////////////////////////////////////////////////

// sticky navbar
export function stickyNav() {
  const nav = document.querySelector(".nav");
  const section1 = document.querySelector("#section--0");
  const initalCoords = section1.getBoundingClientRect();
  console.log(initalCoords);

  window.addEventListener("scroll", function () {
    // console.log(window.scrollY);

    if (window.scrollY > initalCoords.top) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  });

  // sticky navbar : interactive observer API

  const obsCallback = function (entries, observer) {
    entries.forEach((entry) => {
      console.log(entry);
    });
  };
  const obsOptions = {
    root: null,
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(obsCallback, obsOptions);
  observer.observe(section1);
}

stickyNav();

// const head = document.querySelector(".header");
// const nav = document.querySelector(".nav");
// const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

// const stickyNav = function (entries) {
//   const [entry] = entries;
//   console.log(entry);

//   if (!entry.isIntersecting) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });

// headerObserver.observe(head);

// smooth scroll navigation bar
document.querySelector(".nav-links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

/////////////////////////////////////////////////

// reveal on scroll
// const allSection = document.querySelectorAll(".section");

// const revealSection = function (entries, observer) {
//   const [entry] = entries;
//   // console.log(entry);
//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove("section--hidden");
//   observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSection.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add("section--hidden");
// });
