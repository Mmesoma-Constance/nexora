import { products } from "./products-data.js";

export function singleProductFn(productId) {
  let matchingItem;

  products.forEach((productItem) => {
    if (productId === productItem.id) {
      matchingItem = productItem;
      if (matchingItem) {
        location.href = `product-page.html?productId=${productId}`;
      }
    }
  });
}
