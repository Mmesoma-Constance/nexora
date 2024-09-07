// toast

let toastBox = document.getElementById("toastBox");
let successMsg =
  '<img src="images/404-tick.png" class="img-tick"> Added to cart';

function showToast(msg) {
  //   location.href = "index.html";
  let toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = msg;
  toastBox.appendChild(toast);

  if (msg.includes("error")) {
    toast.classList.add("error");
  }

  if (msg.includes("Invalid")) {
    toast.classList.add("invalid");
  }

  setTimeout(function () {
    toast.remove();
  }, 5200);
}

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   e.preventDefault();
//   if (e.target.classList.contains("nav__link")) {
//     const id = e.target.getAttribute("href");
//     document.querySelector(id).scrollIntoView({
//       behavior: "smooth",
//     });
//   }
// });

// const handleHover = function (e) {
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");

//     siblings.forEach((el) => {
//       if (el !== link) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };

// const head = document.querySelector(".header");
// const navHeight = nav.getBoundingClientRect().height;
// //  console.log(navHeight);

// const stickyNav = function (entries) {
//   const [entry] = entries;
//   // console.log(entry);

//   if (!entry.isIntersecting) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });

// headerObserver.observe(head);
