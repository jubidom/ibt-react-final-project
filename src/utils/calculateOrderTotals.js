import calculateTotal, { calculateShipping } from "./calculateTotal";

export default function calculateOrderTotals(cartItems = [], country = "USA") {
  const subtotal = calculateTotal(cartItems);
  const shipping = calculateShipping(country);
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
}

