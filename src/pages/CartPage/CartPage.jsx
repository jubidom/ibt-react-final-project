import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  incrementQty,
  decrementQty,
  removeItem,
  selectCartCount,
} from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartCount);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className={styles.cartPage}>
      <h1>Your Cart</h1>
      <div className={styles.cartContainer}>
        
        {/* Left - Cart Details */}
        <div className={styles.cartDetails}>
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.title} />
                
                <div className={styles.info}>
                  <h3>{item.title}</h3>
                  
                  {/* Actions row → Price + Qty + Remove */}
                  <div className={styles.itemActions}>
                    <p className={styles.price}>${item.price.toFixed(2)}</p>

                    <div className={styles.qtyControls}>
                      <button onClick={() => dispatch(decrementQty(item.id))}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => dispatch(incrementQty(item.id))}>+</button>
                    </div>

                    <button
                      className={styles.removeBtn}
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right - Checkout Summary */}
        <div className={styles.summary}>
          <h2>Summary</h2>
          <p><strong>Total Items:</strong> {totalItems}</p>
          <p><strong>Total Price: </strong>${totalPrice.toFixed(2)}</p>
          <button
            className={styles.checkoutBtn}
            onClick={() => navigate("/checkout")}
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}





