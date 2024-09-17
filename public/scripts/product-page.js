import { products } from "../data/products-data.js";
import { singleProductFn } from "../data/single-product.js";
import { formatCurrency } from "./utils/money.js";
import { addToCart, calculateCartQuantity } from "../data/cart.js";

let productsHTML = "";

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search); // Parse query parameters
  return params.get("productId"); // Get the 'productId' from the URL
}

const productId = getProductIdFromUrl(); // Get the productId from the URL

// Find the matching product in the products array using the productId
const matchingProduct = products.find((product) => product.id === productId);

if (matchingProduct) {
  // Generating the list of ingredients
  const ingredientsList = matchingProduct.ingredients
    .map((ingredient) => `<li>${ingredient}</li>`)
    .join(""); // Converts the array to a single string of list items

  // Generating the list of usage instructions
  const usageList = matchingProduct.usage
    .map((instruction) => `<li>${instruction}</li>`)
    .join(""); // Converts the array to a single string of list items

  productsHTML += `
   <div
        class="product-container flex flex-col justify-center items-center mx-auto"
      >
        <div
          class="absolute top-0 flex flex-col md:flex-row mt-28 w-[85%] md:w-[78%] mx-auto justify-center items-center gap-6"
        >
          <!-- image -->

          <div class="w-full md:w-[50%] flex justify-center items-center">
            <img
              src="${matchingProduct.image}"
              class="w-[230px] md:w-[420px]"
            />
          </div>

          <div
            class="flex flex-col justify-center pl-5 lg:pl-28 px-4 md:px-0 w-full md:w-[50%] items-center"
          >
            <span class="self-start"
              >⭐⭐⭐⭐⭐
              <span class="underline self-center opacity-70">
                ${matchingProduct.rating.count} reviews</span
              ></span
            >
            <h1
              class="textSize text-3xl self-start font-bold text-left text-[#e95ea3] pb-7"
            >
              ${matchingProduct.name}
            </h1>
            <p class="self-start text=sm font-bold">${matchingProduct.tag}</p>

            <p class="self-start pt-3">${matchingProduct.about}</p>

            <p class="text-3xl font-bold self-start pt-5">
              $${formatCurrency(matchingProduct.priceCents)}
            </p>

            <p
              class="quantity-container text-2xl font-bold flex gap-4 self-start mt-6"
            >
              <span
                class="cursor-pointer decrement bg-[#e95ea3] px-4 h-fit text-center text-white"
                >-</span
              ><span class="quantity-value-${
                matchingProduct.id
              } px-4 h-fit text-center">2</span
              ><span
                class="cursor-pointer increment bg-[#e95ea3] px-4 h-fit text-center text-white"
                >+</span
              >
            </p>

            <button
              onclick="showToast(successMsg)"
              class="bg-[#e95ea3] hover:bg-[#db2777] text-white font-bold text-[15px] p-2.5 px-5 md:px-8 rounded-lg self-start w-full mt-6 uppercase"
              id="js-add-to-cart"
              data-product-id="${matchingProduct.id}"
            >
              Add to cart
              <!-- &#8594; -->
            </button>
          </div>
        </div>

        <!--  -->
        <section class="my-20 mt-28 w-full">
          <div class="w-[85%] sm:w-[78%] mx-auto operations">
            <ul class="flex md:gap-10 operations__tab-container">
              <li
                class="text-xs md:text-base uppercase cursor-pointer opacity-80 hover:opacity-100 operations__tab operations__tab--1 operations__tab--active"
                data-tab="1"
              >
                Description
              </li>
              <li
                class="text-xs md:text-base uppercase cursor-pointer opacity-80 hover:opacity-100 operations__tab operations__tab--2"
                data-tab="2"
              >
                Ingredients
              </li>
              <li
                class="text-xs md:text-base uppercase cursor-pointer opacity-80 hover:opacity-100 operations__tab operations__tab--3"
                data-tab="3"
              >
                How to use
              </li>
            </ul>
          </div>

          <div class="bg-[#FBB4D8] bg-opacity-20 w-full py-10">
            <div
              class="operations__content operations__content--1 operations__content--active"
            >
              <ul class="w-[78%] mx-auto">
                <li class="">
                  <h1 class="text-[#db2777] font-bold text-xl">
                    ${matchingProduct.name}
                  </h1>

                  <ul class="list-disc pt-4 px-4 flex flex-col space-y-2 py-10">
                    <li class="">
                      <span class="font-semibold">Description</span>: ${
                        matchingProduct.keywords.description
                      }
                    </li>
                    <li class="">
                      <span class="font-semibold">Benefits</span>: ${
                        matchingProduct.keywords.benefits
                      }
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="operations__content operations__content--2">
              <ul class="w-[78%] mx-auto">
                <li class="">
                  <h1 class="text-[#db2777] font-bold text-xl">
                    ${matchingProduct.name} Ingredients
                  </h1>
                  <ol class="list-decimal pt-4 px-4">
                    ${ingredientsList}
                  </ol>
                </li>
              </ul>
            </div>

            <div class="operations__content operations__content--3">
              <ul class="w-[78%] mx-auto">
                <li class="">
                  <h1 class="text-[#db2777] font-bold text-xl">
                    How to use ${matchingProduct.name}
                  </h1>
                  <ul class="list-disc pt-4 px-4 flex flex-col space-y-2">
                    ${usageList}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- featured -->

        <div class="text-center">
          <h1 class="font-bold text-[#db2777] md:text-xl uppercase px-10 pb-5">
            PEOPLE THAT BOUGHT ${matchingProduct.name} ALSO BOUGHT
          </h1>
        </div>
        <section class="w-[85%] md:w-[78%] mx-auto">
          <div class="">
            <div class="horizontal_slider">
              <div class="slider_container grid grid-cols-3 items-center">
                <div class="item">
                  <div class="w-[320px]">
                    <figure
                      class="js-single-product-btn bg-[#FBB4D8] h-[320px] cursor-pointer p-6 flex flex-col justify-center items-center bg-opacity-50"
                      data-product-id="${matchingProduct.similarProducts[0].id}"
                    >
                      <img
                        src="${matchingProduct.similarProducts[0].image}"
                        class="w-[250px]"
                      />
                    </figure>
                    <div class="flex flex-col space-y-2 mt-3">
                      <div class="flex justify-between">
                        <h3 class="text-xl font-bold text-[#db2777]">
                          ${matchingProduct.similarProducts[0].name}
                        </h3>
                      </div>

                      <div class="flex justify-between">
                        <div class="relative btn-container">
                          <button
                            onclick="showToast(successMsg)"
                            class="btn px-4 text-xs uppercase rounded-full p-2"
                            id="js-add-to-cart"
                            data-product-id="${
                              matchingProduct.similarProducts[0].id
                            }"
                          >
                            &#8594; Add to cart
                          </button>
                          <div
                            class="btn-bg absolute bg-[#FBB4D8] -z-10 w-10 rounded-full left-0 h-8 top-0"
                          ></div>
                        </div>

                        <span class="text-[17px]"
                          >$${formatCurrency(
                            matchingProduct.similarProducts[0].priceCents
                          )}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="item">
                  <div class="w-[320px]">
                    <figure
                      class="js-single-product-btn bg-[#FBB4D8] h-[320px] cursor-pointer p-6 flex flex-col justify-center items-center bg-opacity-50"
                      data-product-id="${matchingProduct.similarProducts[1].id}"
                    >
                      <img
                        src="${matchingProduct.similarProducts[1].image}"
                        class="w-[250px]"
                      />
                    </figure>
                    <div class="flex flex-col space-y-2 mt-3">
                      <div class="flex justify-between">
                        <h3 class="text-xl font-bold text-[#db2777]">
                          ${matchingProduct.similarProducts[1].name}
                        </h3>
                      </div>
                      <div class="flex justify-between">
                        <div class="relative btn-container">
                          <button
                            onclick="showToast(successMsg)"
                            class="btn px-4 text-xs uppercase rounded-full p-2"
                            id="js-add-to-cart"
                            data-product-id="${
                              matchingProduct.similarProducts[1].id
                            }"
                          >
                            &#8594; Add to cart
                          </button>
                          <div
                            class="btn-bg absolute bg-[#FBB4D8] -z-10 w-10 rounded-full left-0 h-8 top-0"
                          ></div>
                        </div>

                        <span class="text-[17px]"
                          >$${formatCurrency(
                            matchingProduct.similarProducts[1].priceCents
                          )}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="item">
                  <div class="w-[320px]">
                    <figure
                      class="js-single-product-btn bg-[#FBB4D8] h-[320px] cursor-pointer p-6 flex flex-col justify-center items-center bg-opacity-50"
                      data-product-id="${matchingProduct.similarProducts[2].id}"
                    >
                      <img
                        src="${matchingProduct.similarProducts[2].image}"
                        class="w-[250px]"
                      />
                    </figure>
                    <div class="flex flex-col space-y-2 mt-3">
                      <div class="flex justify-between">
                        <h3 class="text-xl font-bold text-[#db2777]">
                          ${matchingProduct.similarProducts[2].name}
                        </h3>
                      </div>

                      <div class="flex justify-between">
                        <div class="relative btn-container">
                          <button
                            onclick="showToast(successMsg)"
                            class="btn px-4 text-xs uppercase rounded-full p-2"
                            id="js-add-to-cart"
                            data-product-id="${
                              matchingProduct.similarProducts[2].id
                            }"
                          >
                            &#8594; Add to cart
                          </button>
                          <div
                            class="btn-bg absolute bg-[#FBB4D8] -z-10 w-10 rounded-full left-0 h-8 top-0"
                          ></div>
                        </div>

                        <span class="text-[17px]"
                          >$${formatCurrency(
                            matchingProduct.similarProducts[2].priceCents
                          )}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

  `;

  document.querySelector(".product-container").innerHTML = productsHTML;

  // single product page
  document.querySelectorAll(".js-single-product-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      singleProductFn(productId);
    });
  });

  const increment = document.querySelector(".increment");
  const decrement = document.querySelector(".decrement");

  const quantitySelector = document.querySelector(
    `.quantity-value-${matchingProduct.id}`
  );

  let quantity = 1;
  quantitySelector.innerHTML = quantity;
  // increment and decrement

  increment.addEventListener("click", () => {
    if (quantity >= 0 && quantity < 5) {
      quantity++;
      quantitySelector.innerHTML = Number(quantity);
    }
  });

  decrement.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantitySelector.innerHTML = Number(quantity);
    }
  });

  function updateCartQuantity() {
    let cartQuanitity = calculateCartQuantity();

    document.getElementById("js-cart-quantity").innerHTML = cartQuanitity;

    cartQuanitity = quantity;
    quantitySelector.innerHTML = quantity;
  }
  updateCartQuantity();

  // add to cart
  document.querySelectorAll("#js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      if (quantity < 20) {
        addToCart(productId, quantity);
        console.log(quantity);
      } else {
        alert("Too much items!");
      }

      updateCartQuantity(matchingProduct, quantity);
      // document.querySelector(".quantity-container").style.display = "flex";
    });
  });

  // document.getElementById("addedCart").addEventListener("click", () => {
  //   document.querySelector(".quantity").style.display = "flex";
  // });

  // tab components

  const tabs = document.querySelectorAll(".operations__tab");
  const tabContainer = document.querySelector(".operations__tab-container");
  const tabContent = document.querySelectorAll(".operations__content");

  // tabs.forEach((t) =>
  //   t.addEventListener("click", () => {
  //     console.log("clicked");
  //   })
  // );

  tabContainer.addEventListener("click", function (e) {
    // const clicked = e.target.parentElement;
    const clicked = e.target.closest(".operations__tab");
    // console.log(clicked);

    // guard clause
    if (!clicked) return;

    // active tab
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));

    tabContent.forEach((c) =>
      c.classList.remove("operations__content--active")
    );

    // activate tab
    clicked.classList.add("operations__tab--active");

    //activate content area
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  });
}
