import { getOrder } from "../data/orders.js";
import { getProduct } from "../data/products-data.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

function loadPage() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const order = getOrder(orderId);
  const product = getProduct(productId);

  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  console.log("Product Details:", productDetails);

  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  if (!deliveryTime.isValid()) {
    console.error(
      "Invalid delivery date format:",
      productDetails.estimatedDeliveryTime
    );
    return;
  }

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);

  // Ensure that both dates are valid before calculating
  if (!orderTime.isValid() || !deliveryTime.isValid()) {
    console.error("Invalid date(s) detected.");
    return;
  }

  // Calculate total and elapsed days
  const totalDays = deliveryTime.diff(orderTime, "day");
  const elapsedDays = today.diff(orderTime, "day");

  let percentProgress = 0;
  if (totalDays > 0) {
    // Ensure proper progress calculation even when only 1 day remains
    percentProgress = Math.min(
      Math.max((elapsedDays / totalDays) * 100, 0),
      100
    );
    console.log("Progress before adjustment:", percentProgress);
  }

  // Adjust the progress to avoid 0% when today is the day before delivery
  if (today.isSame(deliveryTime.subtract(1, "day"))) {
    percentProgress = 95; // Close to delivery, 95% progress
  }

  // Fix the logic: Show 0% if today is the same as the order date
  if (today.isSame(orderTime, "day")) {
    percentProgress = 5; // Minimal progress on the same day
  }

  const roundedPercentProgress = Math.round(percentProgress);

  const deliveredMessage =
    today.isAfter(deliveryTime) || today.isSame(deliveryTime)
      ? "Delivered on"
      : "Arriving on";

  // Console logs for debugging
  console.log("Order Time:", orderTime.format("YYYY-MM-DD"));
  console.log("Delivery Time:", deliveryTime.format("YYYY-MM-DD"));
  console.log("Today:", today.format("YYYY-MM-DD"));
  console.log("Total Days:", totalDays);
  console.log("Elapsed Days:", elapsedDays);
  console.log(`Percent Progress: ${roundedPercentProgress}%`);

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>
    <div class="delivery-date">${deliveredMessage} ${deliveryTime.format(
    "dddd, MMMM D"
  )}</div>
    <div class="product-info">${product.name}</div>
    <div class="product-info">Quantity: ${productDetails.quantity}</div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
      <div class="progress-label ${
        roundedPercentProgress < 50 ? "current-status" : ""
      }">Preparing</div>
      <div class="progress-label ${
        roundedPercentProgress >= 50 && roundedPercentProgress < 100
          ? "current-status"
          : ""
      }">Shipped</div>
      <div class="progress-label ${
        roundedPercentProgress >= 100 ? "current-status" : ""
      }">Delivered</div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${roundedPercentProgress}%;"></div>
    </div>
  `;

  document.querySelector(".js-order-tracking").innerHTML = trackingHTML;

  let trackingMsg = roundedPercentProgress;
  if (trackingMsg < 100) {
    console.log("You have 2 pending orders.");
  } else {
    console.log("3 orders have been delivered successfully.");
  }
}
loadPage();
