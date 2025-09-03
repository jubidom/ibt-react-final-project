// src/pages/WishlistPage/WishlistPage.jsx
import { useLoaderData } from "react-router-dom";
// import styles from "./WishlistPage.module.css";

export default function WishlistPage() {
  const wishlist = useLoaderData(); // 👈 comes from loader

  return (
    <div className={styles.wishlistPage}>
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li key={item.id} className={styles.wishlistItem}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
