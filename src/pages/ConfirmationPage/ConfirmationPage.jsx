import { useLocation } from "react-router-dom";
import calculateOrderTotals from "../../utils/calculateOrderTotals";
import formatPrice from "../../utils/formatPrice";
import styles from "./ConfirmationPage.module.css";

export default function ConfirmationPage() {
  const location = useLocation();
  const { formData, cartItems } = location.state || { formData: {}, cartItems: [] };

  const { subtotal, shipping, total } = calculateOrderTotals(cartItems, formData.country);

  return (
    <div className={styles.confirmationPage}>
      <h1>Thank you for your order!</h1>

      <div className={styles.detailsContainer}>
        {/* Shipping Info */}
        <div className={styles.shippingInfo}>
          <h2>Domestic Orders/Shipping Info</h2>
          <p>{formData.fullName}</p>
          <p>{formData.email}</p>
          <p>{formData.address}</p>
          <p>{formData.city}</p>
          <p>{formData.zip}</p>
          <p>{formData.phone}</p>
          <p>{formData.country}</p>
        </div>

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
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
          <hr />
          <div className={styles.totals}>
            <p>Subtotal: {formatPrice(subtotal)}</p>
            <p>Shipping: {formatPrice(shipping)}</p>
            <p className={styles.total}>Total: {formatPrice(total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

