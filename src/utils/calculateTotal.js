// Calculate subtotal safely
export default function calculateTotal(items = []) {
  return items.reduce((sum, it) => {
    const price = Number(it.price ?? it.product?.price) || 0;
    const quantity = Number(it.qty ?? it.quantity ?? it.product?.quantity) || 0;
    return sum + price * quantity;
  }, 0);
};

// Calculate shipping
export function calculateShipping(country = "USA") {
  return country.toLowerCase() === "usa" ? 0 : 20;
}


