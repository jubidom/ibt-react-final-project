import styles from "./Cart.module.css";

export default function Cart({ items, onIncrement, onDecrement, onRemove }) {
  return (
    <div className={styles.cart}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}




