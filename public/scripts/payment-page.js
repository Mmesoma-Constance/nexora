let btn = document.getElementById("btn");
let password = document.querySelector(".password");
let eyeicon = document.getElementById("eyeicon");

btn.addEventListener("click", function () {
  if (password.type == "password") {
    password.type = "text";
    eyeicon.src = "images/eye-open.png";
  } else {
    password.type = "password";
    eyeicon.src = "images/eye-close.png";
  }
  // alert("im working");
});

let cardBox = document.querySelector(".card");

const cardTypeSelect = document.getElementById("card-type-select");
const cardTypeDisplay = document.getElementById("card-type");

const cardNumberInput = document.getElementById("card-number");
const cardHolderInput = document.getElementById("card-holder");
const bankNameInput = document.getElementById("bank-name");
const expiryDateInput = document.getElementById("expiry-date");
const cvvInput = document.getElementById("cvv");

const cardNumberDisplay = document.getElementById("card-number-display");
const cardHolderDisplay = document.getElementById("card-holder-display");
const expiryDateDisplay = document.getElementById("expires-display");
const cvvDisplay = document.getElementById("cvv-display");
const bankNameDisplay = document.getElementById("bank-name-display");

const submitBtn = document.querySelector(".submit-btn");

// Load saved data from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedCardType = localStorage.getItem("cardType");
  const savedCardNumber = localStorage.getItem("cardNumber");
  const savedCardHolder = localStorage.getItem("cardHolder");
  const savedBankName = localStorage.getItem("bankName");
  const savedExpiryDate = localStorage.getItem("expiryDate");
  const savedCvv = localStorage.getItem("cvv");

  // Log each retrieved value to check if they exist
  console.log("Saved Card Type:", savedCardType);
  console.log("Saved Card Number:", savedCardNumber);
  console.log("Saved Card Holder:", savedCardHolder);
  console.log("Saved Bank Name:", savedBankName);
  console.log("Saved Expiry Date:", savedExpiryDate);
  console.log("Saved CVV:", savedCvv);

  // Check and save the default card type if it's not in localStorage
  if (!savedCardType) {
    const defaultCardType = cardTypeSelect.value;
    console.log("Saving default card type:", defaultCardType); // Log the default card type
    localStorage.setItem("cardType", defaultCardType);
    cardTypeDisplay.textContent = defaultCardType.toUpperCase();
  } else {
    cardTypeSelect.value = savedCardType;
    cardTypeDisplay.textContent = savedCardType.toUpperCase();
  }

  if (savedCardNumber) {
    cardNumberInput.value = savedCardNumber;
    cardNumberDisplay.textContent = savedCardNumber;
  }

  if (savedCardHolder) {
    cardHolderInput.value = savedCardHolder;
    cardHolderDisplay.textContent = savedCardHolder;
  }

  if (savedBankName) {
    bankNameInput.value = savedBankName;
    bankNameDisplay.textContent = savedBankName;
  }

  if (savedExpiryDate) {
    expiryDateInput.value = savedExpiryDate;
    expiryDateDisplay.textContent = `Expires ${savedExpiryDate}`;
  }

  if (savedCvv) {
    cvvInput.value = savedCvv;
    cvvDisplay.textContent = "CVV: ***"; // Display asterisks instead of the actual CVV
  }

  validateForm();

  // Now we check for all required values before redirecting
  redirectToOrderPage(
    savedCardNumber,
    savedCardHolder,
    savedBankName,
    savedExpiryDate,
    savedCvv
  );
});

function redirectToOrderPage(
  cardType,
  cardNumber,
  cardHolder,
  bankName,
  expiryDate,
  cvv
) {
  if (cardType && cardNumber && cardHolder && bankName && expiryDate && cvv) {
    console.log("All payment details are saved. Redirecting...");

    setTimeout(() => {
      location.href = "orders.html";
    }, 1000);
  } else {
    console.log("Payment details are incomplete. No redirect.");
  }
}

// Save data to localStorage on input change
cardTypeSelect.addEventListener("change", function () {
  const cardType = cardTypeSelect.value;
  cardTypeDisplay.textContent = cardType.toUpperCase();
  console.log("Saving card type:", cardType);

  localStorage.setItem("cardType", cardType);

  function changeCardImg(imageUrl) {
    cardBox.style.backgroundImage = `url(${imageUrl})`;
    localStorage.setItem("cardImage", imageUrl);
  }

  if (cardType === "VISA") {
    changeCardImg("images/card-image7.jpg");
  } else if (cardType === "MasterCard") {
    changeCardImg("images/card-image2.jpg");
  } else if (cardType === "Amex") {
    changeCardImg("images/card-image1.jpg");
  }

  validateForm();
});

cardNumberInput.addEventListener("input", function (e) {
  let input = e.target.value.replace(/\s+/g, ""); // Remove existing spaces
  input = input.replace(/[^0-9]/g, ""); // Remove any non-digit characters
  let formattedInput = input.match(/.{1,4}/g)?.join(" ") || input; // Add space every 4 digits
  cardNumberDisplay.textContent = formattedInput || "0000 0000 0000 0000";
  localStorage.setItem("cardNumber", formattedInput);
  validateForm();
});

cardHolderInput.addEventListener("input", function () {
  const cardHolder = cardHolderInput.value;
  cardHolderDisplay.textContent = cardHolder || "Card Holder";
  localStorage.setItem("cardHolder", cardHolder);
  validateForm();
});

bankNameInput.addEventListener("input", function () {
  const bankName = bankNameInput.value;
  bankNameDisplay.textContent = bankName || "Bank Name";
  localStorage.setItem("bankName", bankName);
  validateForm();
});

expiryDateInput.addEventListener("input", function (e) {
  // const expiryDate = expiryDateInput.value;

  let expiryDate = e.target.value.replace(/[^0-9/]/g, ""); // Allow only numbers and "/"
  if (expiryDate.length === 2 && !expiryDate.includes("/")) {
    expiryDate += "/"; // Automatically add a slash after the month
  }
  expiryDateDisplay.textContent = `Expires: ${expiryDate}` || "Expires 00/00";
  e.target.value = expiryDate;
  expiryDateDisplay.textContent = `Expires ${expiryDate}` || "Expires 00/00";
  localStorage.setItem("expiryDate", expiryDate);
  validateForm();
});

cvvInput.addEventListener("input", function () {
  let cvv = cvvInput.value.replace(/[^0-9]/g, ""); // Remove any non-digit characters
  console.log(cvv); // Allow only numbers
  cvvDisplay.textContent = "CVV: " + "*".repeat(cvv.length); // Display asterisks for CVV
  localStorage.setItem("cvv", cvv); // Save CVV to localStorage
  validateForm();
});

function validateForm() {
  const cardNumber = cardNumberInput.value.replace(/\s+/g, ""); // Remove spaces for validation
  const cardHolder = cardHolderInput.value.trim();
  const bankName = bankNameInput.value.trim();
  const expiryDate = expiryDateInput.value.trim();
  const cvv = cvvInput.value.trim();

  // Validate card number
  const isValidCardNumber =
    cardNumber.length === 16 && /^[0-9]{16}$/.test(cardNumber);
  // Validate card holder name
  const isValidCardHolder = cardHolder.length > 0;
  // Validate bank name
  const isValidBankName = bankName.length > 0;
  // Validate expiry date
  const expiryParts = expiryDate.split("/");
  const isValidExpiryDate =
    expiryParts.length === 2 &&
    Number(expiryParts[0]) >= 1 &&
    Number(expiryParts[0]) <= 12 &&
    Number(expiryParts[1]) >= new Date().getFullYear() % 100 &&
    Number(expiryParts[1]) <= 99;
  // Validate CVV
  const isValidCvv = cvv.length === 3 && /^[0-9]{3}$/.test(cvv);

  console.log("Card Number:", cardNumber);
  console.log("Card Number Valid:", isValidCardNumber);
  console.log("Card Holder Valid:", isValidCardHolder);
  console.log("Bank Name Valid:", isValidBankName);
  console.log("Expiry Date Valid:", isValidExpiryDate);
  console.log("CVV Valid:", isValidCvv);

  if (
    isValidCardNumber &&
    isValidCardHolder &&
    isValidBankName &&
    isValidExpiryDate &&
    isValidCvv
  ) {
    submitBtn.classList.remove("disabled");
    submitBtn.disabled = false;
    submitBtn.addEventListener("click", () => {
      location.href = "orders.html";
    });
  } else {
    submitBtn.classList.add("disabled");
    submitBtn.disabled = true;
  }
}

// function validateForm() {
//   const cardNumber = cardNumberInput.value.replace(/\s+/g, ""); // Remove spaces for validation
//   const cardHolder = cardHolderInput.value.trim();
//   const bankName = bankNameInput.value.trim();
//   const expiryDate = expiryDateInput.value.trim();
//   const cvv = cvvInput.value.trim();

//   // Validate card number length
//   const isValidCardNumber = cardNumber.length === 16 && Number(cardNumber);

//   // Validate card holder name is not empty
//   const isValidCardHolder = cardHolder.length > 0;

//   // Validate bank name is not empty
//   const isValidBankName = bankName.length > 0;

//   // Validate expiry date format and logic (MM/YY)
//   const expiryParts = expiryDate.split("/");
//   const isValidExpiryDate =
//     expiryParts.length === 2 &&
//     Number(expiryParts[0]) >= 1 &&
//     Number(expiryParts[0]) <= 12 && // Month must be between 1 and 12
//     Number(expiryParts[1]) >= 22 && // Year must be in the future (adjust as needed)
//     Number(expiryParts[1]) <= 99; // Year within a reasonable range

//   // Validate CVV length
//   const isValidCvv = cvv.length === 3 && Number(cvv);

//   // Enable or disable submit button based on validation
//   if (
//     isValidCardNumber &&
//     isValidCardHolder &&
//     isValidBankName &&
//     isValidExpiryDate &&
//     isValidCvv
//   ) {
//     submitBtn.classList.remove("disabled");
//     submitBtn.disabled = false;
//     submitBtn.addEventListener("click", () => {
//       location.href = "orders.html";
//     });
//   } else {
//     submitBtn.classList.add("disabled");
//     submitBtn.disabled = true;
//   }
// }

// dsshfueriehbf
// function validateForm() {
//   const cardNumber = cardNumberInput.value.replace(/\s+/g, ""); // Remove spaces for validation
//   const cardHolder = cardHolderInput.value.trim();
//   const bankName = bankNameInput.value.trim();
//   const expiryDate = expiryDateInput.value.trim();
//   const cvv = cvvInput.value.trim();

//   const isValidCardNumber = cardNumber.length === 16 && Number(cardNumber); // Example validation for card number length
//   const isValidCardHolder = cardHolder.length > 0;
//   const isValidBankName = bankName.length > 0;
//   const isValidExpiryDate = /^(\d{2}\/\d{2})$/.test(expiryDate);
//   const isValidCvv = cvv.length === 3 && Number(cvv); // Example validation for CVV length

//   // Enable or disable submit button based on validation
//   if (
//     isValidCardNumber &&
//     isValidCardHolder &&
//     isValidBankName &&
//     isValidExpiryDate &&
//     isValidCvv
//   ) {
//     submitBtn.classList.remove("disabled");
//     submitBtn.disabled = false;
//     submitBtn.addEventListener("click", () => {
//       location.href = "orders.html";
//     });
//   } else {
//     submitBtn.classList.add("disabled");
//     submitBtn.disabled = true;
//   }
// }
