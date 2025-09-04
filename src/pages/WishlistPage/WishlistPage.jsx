import { useLoaderData } from "react-router-dom";

export default function WishlistPage() {
  const wishlist = useLoaderData();

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
