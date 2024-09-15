const order = [
  {
    id: "0e3713e6-209f-4bef-a3e2-ca267ad830ea",
    orderTime: "2024-02-27T20:57:02.235Z",
    totalCostCents: 5800,
    products: [
      {
        productId: "c53638ce-6aa0-4b85-b27f-e1d07eb618c3",
        quantity: 2,
        estimatedDeliveryTime: "2024-03-01T20:57:02.235Z",
      },
      {
        productId: "04701903-bc79-49c6-bc11-1af7e3651358",
        quantity: 1,
        estimatedDeliveryTime: "2024-03-01T20:57:02.235Z",
      },
    ],
  },
];

export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}
