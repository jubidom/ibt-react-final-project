import { useSelector } from "react-redux";
import formatPrice from "../../utils/formatPrice";
import { selectCartItems } from "../../store/cartSlice";
import styles from "./OrderSummary.module.css";

export default function OrderSummary({ subtotal, shipping, total }) {
  const cartItems = useSelector(selectCartItems);

  console.log("Cart items:", cartItems);

  return (
    <div className={styles.orderSummary}>
      <h2>Order Summary</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className={styles.items}>
          {cartItems.map((item, index) => {
            const product = item.product ?? item;
            const name = product.title ?? product.name ?? "Item";
            const price = Number(product.price) || 0;
            const quantity = Number(item.qty ?? 0);

            return (
              <div key={item.id ?? index} className={styles.item}>
                <span>{name} x {quantity}</span>
                <span>{formatPrice(price * quantity)}</span>
              </div>
            );
          })}
        </div>
      )}

      <hr />

      <div className={styles.totals}>
        <p>Subtotal: {formatPrice(subtotal)}</p>
        <p>Shipping: {formatPrice(shipping)}</p>
        <p className={styles.total}>Total: {formatPrice(total)}</p>
      </div>
    </div>
  );
}
