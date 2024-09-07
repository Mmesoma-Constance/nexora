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

  tabContent.forEach((c) => c.classList.remove("operations__content--active"));

  // activate tab
  clicked.classList.add("operations__tab--active");

  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
