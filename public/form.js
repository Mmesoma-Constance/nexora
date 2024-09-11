const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordReEnter = document.getElementById("password-re-enter");
const submitBtn = document.getElementById("submit-btn");

// Load saved data from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedNameValue = localStorage.getItem("nameValue");
  const savedEmailValue = localStorage.getItem("emailValue");
  const savedPasswordValue = localStorage.getItem("passwordValue");
  const savedPasswordReEnterValue = localStorage.getItem(
    "passwordReEnterValue"
  );

  if (savedNameValue) {
    name.value = savedNameValue;
  }

  if (savedEmailValue) {
    email.value = savedEmailValue;
  }

  if (savedPasswordValue) {
    password.value = savedPasswordValue;
  }

  if (savedPasswordReEnterValue) {
    passwordReEnter.value = savedPasswordReEnterValue;
  }

  validateForm(); // Validate on page load
});

let inputBoxes = document.querySelectorAll(".input-box");

inputBoxes.forEach((inputBox) => {
  let eyeicon = inputBox.querySelector("img");
  let passwordInput = inputBox.querySelector(".password");

  eyeicon.addEventListener("click", function (e) {
    e.preventDefault();

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeicon.src = "images/eye-open.png";
    } else {
      passwordInput.type = "password";
      eyeicon.src = "images/eye-close.png";
    }
  });
});

// form validation

name.addEventListener("input", () => {
  let nameValue = name.value;
  name.style.borderColor = "";
  if (!nameValue.match(/^[A-Za-z]*\s{1}[A-Za-z]*/)) {
    name.style.borderColor = "red";
  }
  localStorage.setItem("nameValue", nameValue);
  validateForm();
});

email.addEventListener("input", () => {
  let emailValue = email.value;
  email.style.borderColor = "";
  if (!emailValue.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    email.style.borderColor = "red";
  }
  localStorage.setItem("emailValue", emailValue);
  validateForm();
});

let passwordValue;
password.addEventListener("input", () => {
  passwordValue = password.value;
  password.style.borderColor = "";
  if (passwordValue.length < 8) {
    password.style.borderColor = "red";
  }
  localStorage.setItem("passwordValue", passwordValue);
  validateForm();
});

passwordReEnter.addEventListener("input", () => {
  let passwordReEnterValue = passwordReEnter.value;
  passwordReEnter.style.borderColor = "";
  if (passwordReEnterValue !== passwordValue) {
    passwordReEnter.style.borderColor = "red";
  }
  localStorage.setItem("passwordReEnterValue", passwordReEnterValue);
  validateForm();
});

// Enable or disable submit button based on validation

function validateForm() {
  const nameValue = name.value;
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordReEnterValue = passwordReEnter.value.trim();

  const isValidateName = nameValue.match(/^[A-Za-z]*\s{1}[A-Za-z]*/);
  const isValidateEmail = emailValue.match(
    /^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
  );
  const isValidatePassword = passwordValue.length >= 8;
  const isValidatePasswordReEnter = passwordReEnterValue === passwordValue;

  if (
    isValidateName &&
    isValidateEmail &&
    isValidatePassword &&
    isValidatePasswordReEnter
  ) {
    submitBtn.classList.remove("disabled");
    submitBtn.disabled = false;
  } else {
    submitBtn.classList.add("disabled");
    submitBtn.disabled = true;
  }
}

// Handle the form submission
submitBtn.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default form submission
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get("source");
  if (!submitBtn.disabled) {
    localStorage.setItem("isLoggedIn", "true"); // Store login state in local storage

    if (source === "cart") {
      // If the user came from the cart page, redirect to the payment page
      location.href = "payment.html";
    } else {
      // Default redirection to home page if source is home or not specified
      location.href = "index.html";
    }
  }
});

//pop-up

let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}
///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

document.getElementById("clearStorage").addEventListener("click", () => {
  localStorage.clear();
  location.href = "index.html";
});
