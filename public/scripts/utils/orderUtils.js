import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { cart } from "../../data/cart.js";
import { getDeliveryOptions } from "../../data/delivery-options.js";
import { getProduct } from "../../data/products-data.js";
import { addOrder } from "../../data/orders.js";
import { formatCurrency } from "./money.js";
import { calculateDeliveryDate } from "../../data/delivery-options.js";

// Generate a short unique ID
export function generateShortUuid() {
  return uuidv4().substring(0, 28); // Trim to 28 characters
}

// Calculate the total cost of the cart
export function calculateTotalCartCost() {
  let totalCost = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);

    totalCost +=
      product.priceCents * cartItem.quantity + deliveryOption.priceCents;
  });

  const taxCents = totalCost * 0.1;
  return totalCost + taxCents;
}

// Create an order object from the cart
export function createOrder() {
  return {
    id: generateShortUuid(),
    orderTime: new Date().toISOString(),
    totalCostCents: calculateTotalCartCost(),
    products: cart.map((cartItem) => {
      const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
      const estimatedDeliveryTime = calculateDeliveryDate(deliveryOption);

      return {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        estimatedDeliveryTime: estimatedDeliveryTime,
      };
    }),
  };
}

// Add an order to local storage and clear the cart
export function placeOrder() {
  try {
    const order = createOrder();
    addOrder(order);
    cart.length = 0;
    localStorage.setItem("cart", JSON.stringify(cart));
    return true;
  } catch (error) {
    alert("Error while placing order:", error);
    return false;
  }
}
