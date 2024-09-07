import { products } from "../data/products-data.js";
import { singleProductFn } from "../data/single-product.js";
import { formatCurrency } from "./utils/money.js";
import { addToCart } from "../data/cart.js";

let productsHTML = "";

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search); // Parse query parameters
  return params.get("productId"); // Get the 'productId' from the URL
}

const productId = getProductIdFromUrl(); // Get the productId from the URL

// Find the matching product in the products array using the productId
const matchingProduct = products.find((product) => product.id === productId);

// singleProduct.forEach((productItem) => {
//   const productId = productItem.productId;

//   let matchingProduct;

//   products.forEach((product) => {
//     if (product.id === productId) matchingProduct = product;
//   });

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
          class="absolute top-0 flex flex-col md:flex-row mt-20 w-[78%] mx-auto justify-center items-center gap-6"
        >
          <!-- image -->

          <div class="w-full md:w-[50%] flex justify-center items-center">
            <img src="${
              matchingProduct.image
            }" class="w-[230px] md:w-[420px]" />
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
            <p class="self-start text=sm font-bold">
             ${matchingProduct.tag}
            </p>


            <p class="self-start pt-3">
             ${matchingProduct.about}
            </p>

            <p class="text-3xl font-bold self-start pt-5">$${formatCurrency(
              matchingProduct.priceCents
            )}</p>

            <h2
              class="quantity hidden text-2xl font-bold gap-2 self-start mt-5 py-2 border px-10"
            >
              <span class="cursor-pointer decrement">-</span
              ><span class="quantity-value">1</span
              ><span class="cursor-pointer increment">+</span>
            </h2>

            <button
              onclick="showToast(successMsg)"
              class="bg-[#e95ea3] hover:bg-[#db2777] text-white font-bold text-[15px] p-2.5 px-5 md:px-8 rounded-lg self-start w-full mt-6 uppercase"
              id="js-add-to-cart" data-product-id="${matchingProduct.id}"
            >
              Add to cart
              <!-- &#8594; -->
            </button>
          </div>
        </div>

         <!--  -->
      <section class="my-20 mt-28 w-full">
        <div class="w-[78%] mx-auto operations">
          <ul class="flex gap-10 operations__tab-container">
            <li
              class="uppercase cursor-pointer opacity-80 hover:opacity-100 operations__tab operations__tab--1 operations__tab--active"
              data-tab="1"
            >
              Description
            </li>
            <li
              class="uppercase cursor-pointer opacity-80 hover:opacity-100 operations__tab operations__tab--2"
              data-tab="2"
            >
              Ingredients
            </li>
            <li
              class="uppercase cursor-pointer opacity-80 hover:opacity-100 operations__tab operations__tab--3"
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
            <ul class="w-[78%] mx-auto ">
              <li class="">
                <h1 class="text-[#db2777] font-bold text-xl">
                ${matchingProduct.name}
                </h1>

                <ul class="list-disc pt-4 px-4 flex flex-col space-y-2 pb-10">
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

      

      <section class="w-[78%] mb-20 flex items-center justify-center mx-auto">
        <div class="">
          <div class="text-center">
            <h1 class="font-bold text-[#db2777] text-xl uppercase">
              PEOPLE THAT BOUGHT ${matchingProduct.name} ALSO BOUGHT
            </h1>
            <!-- <p class="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p> -->
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-12 mt-12"
          >
             <div class="">
            <figure
                class="js-single-product-btn bg-[#FBB4D8] h-[320px] cursor-pointer p-6 flex flex-col justify-center items-center bg-opacity-50"  data-product-id="${
                  matchingProduct.similarProducts[0].id
                }"
              >
                <img src="${
                  matchingProduct.similarProducts[0].image
                }" class="" />
              </figure> 
              <div class="flex flex-col space-y-2 mt-3">
                <div class="flex justify-between">
                  <h3 class="text-xl font-bold text-[#db2777]">${
                    matchingProduct.similarProducts[0].name
                  }</h3>
                 
                </div>

                <div class="flex justify-between">
                  <div class="relative btn-container">
                    <button onclick="showToast(successMsg)" class="btn px-4 text-xs uppercase rounded-full p-2" id="js-add-to-cart" data-product-id="${
                      matchingProduct.similarProducts[0].id
                    }">
                      &#8594; Add to cart
                    </button>
                    <div
                      class="btn-bg absolute bg-[#FBB4D8] -z-10 w-10 rounded-full left-0 h-8 top-0"
                    ></div>
                  </div>

                  <span class="text-[17px]">$${formatCurrency(
                    matchingProduct.similarProducts[0].priceCents
                  )}</span>
                </div>
              </div>
            </div> 

             <div class="">
           <figure
                class="js-single-product-btn bg-[#FBB4D8] h-[320px] cursor-pointer p-6 flex flex-col justify-center items-center bg-opacity-50"  data-product-id="${
                  matchingProduct.similarProducts[1].id
                }"
              >
                <img src="${
                  matchingProduct.similarProducts[1].image
                }" class="" />
              </figure> 
              <div class="flex flex-col space-y-2 mt-3">
                <div class="flex justify-between">
                  <h3 class="text-xl font-bold text-[#db2777]">${
                    matchingProduct.similarProducts[1].name
                  }</h3>
                 
                </div>
                <div class="flex justify-between">
                  <div class="relative btn-container">
                    <button onclick="showToast(successMsg)" class="btn px-4 text-xs uppercase rounded-full p-2" id="js-add-to-cart" data-product-id="${
                      matchingProduct.similarProducts[1].id
                    }">
                      &#8594; Add to cart
                    </button>
                    <div
                      class="btn-bg absolute bg-[#FBB4D8] -z-10 w-10 rounded-full left-0 h-8 top-0"
                    ></div>
                  </div>

                  <span class="text-[17px]">$${formatCurrency(
                    matchingProduct.similarProducts[1].priceCents
                  )}</span>
                </div>
              </div>
            </div> 

             <div class="">
            <figure
                class="js-single-product-btn bg-[#FBB4D8] h-[320px] cursor-pointer p-6 flex flex-col justify-center items-center bg-opacity-50"  data-product-id="${
                  matchingProduct.similarProducts[2].id
                }"
              >
                <img src="${
                  matchingProduct.similarProducts[2].image
                }" class="" />
              </figure> 
              <div class="flex flex-col space-y-2 mt-3">
                <div class="flex justify-between">
                  <h3 class="text-xl font-bold text-[#db2777]">${
                    matchingProduct.similarProducts[2].name
                  }</h3>
                 
                </div>

                <div class="flex justify-between">
                  <div class="relative btn-container">
                    <button onclick="showToast(successMsg)" class="btn px-4 text-xs uppercase rounded-full p-2" id="js-add-to-cart" data-product-id="${
                      matchingProduct.similarProducts[2].id
                    }">
                      &#8594; Add to cart
                    </button>
                    <div
                      class="btn-bg absolute bg-[#FBB4D8] -z-10 w-10 rounded-full left-0 h-8 top-0"
                    ></div>
                  </div>

                  <span class="text-[17px]">$${formatCurrency(
                    matchingProduct.similarProducts[2].priceCents
                  )}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  `;

  document.querySelector(".product-container").innerHTML = productsHTML;

  // single product page
  document.querySelectorAll(".js-single-product-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      singleProductFn(productId);
    });
  });

  // add to cart
  document.querySelectorAll("#js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);

      updateCartQuantity();
    });
  });

  // document.getElementById("addedCart").addEventListener("click", () => {
  //   document.querySelector(".quantity").style.display = "flex";
  // });

  const increment = document.querySelector(".increment");
  const decrement = document.querySelector(".decrement");
  let quantityValue = document.querySelector(".quantity-value");

  let quantityIndex = 1;
  quantityValue.innerHTML = quantityIndex;

  increment.addEventListener("click", () => {
    if (quantityIndex >= 1) {
      quantityIndex++;
      quantityValue.innerHTML = quantityIndex;
    }
    console.log(quantityValue);
  });

  decrement.addEventListener("click", () => {
    if (quantityIndex > 1) {
      quantityIndex--;
      quantityValue.innerHTML = quantityIndex;
    }
  });

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
