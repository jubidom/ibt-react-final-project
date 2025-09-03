import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice"; //  correct import
import formatPrice from "../../utils/formatPrice";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(product)); //match reducer
    toast.success(`${product.title} added to cart! 🛒`, {
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <article className={styles.card}>
  {/* Clickable image + title */}
  <Link to={`/products/${product.id}`} className={styles.link}>
    <div className={styles.imageWrapper}>
      <img
        className={styles.image}
        src={product.image}
        alt={product.title}
      />
    </div>
    <h3 className={styles.title}>{product.title}</h3>
  </Link>

  <p className={styles.category}>Category: {product.category}</p>

  {/* Price + button in one row */}
  <div className={styles.bottomRow}>
    <p className={styles.price}>{formatPrice(product.price)}</p>
    <button className={styles.addBtn} onClick={handleAdd}>
      Add to Cart
    </button>
  </div>
</article>

  );
}




// import { useDispatch } from "react-redux";
// import { addItem } from "../../store/cartSlice";
// import formatPrice from "../../utils/formatPrice";
// import styles from "./ProductCard.module.css";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function ProductCard({ product }) {
//   const dispatch = useDispatch();

//   const handleAdd = () => {
//     dispatch(addItem(product));
//     toast.success(`${product.title} added to cart! 🛒`, {
//       autoClose: 2500,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "colored",
//     });
//   };

//   return (
//     <article className={styles.card}>
//       <Link to={`/products/${product.id}`} className={styles.link}>
//         <img
//           className={styles.image}
//           src={product.image}
//           alt={product.title}
//           loading="lazy" //  lazy loading
//         />
//         <h3 className={styles.title}>{product.title}</h3>
//       </Link>

//       <p className={styles.category}>Category: {product.category}</p>

//       <div className={styles.bottomRow}>
//         <p className={styles.price}>{formatPrice(product.price)}</p>
//         <button
//           className={styles.addBtn}
//           onClick={handleAdd}
//           aria-label={`Add ${product.title} to cart`} // ✅ accessibility
//         >
//           Add to Cart
//         </button>
//       </div>
//     </article>
//   );
// }




// import { useDispatch } from "react-redux";
// import { addItem } from "../../store/cartSlice";
// import formatPrice from "../../utils/formatPrice";
// import styles from "./ProductCard.module.css";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify"; // ✅ import toast

// export default function ProductCard({ product }) {
//   const dispatch = useDispatch();

//   const handleAdd = () => {
//     dispatch(addItem(product)); // update Redux cart
//     toast.success(`${product.title} added to cart! 🛒`, {
//       // position: "top-right",
//       autoClose: 2500, // 2.5s
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "colored", // modern look
//     });
//   };

//   return (
//     <article className={styles.card}>
//       {/* Clickable image + title */}
//       <Link to={`/products/${product.id}`} className={styles.link}>
//         <img
//           className={styles.image}
//           src={product.image}
//           alt={product.title}
//         />
//         <h3 className={styles.title}>{product.title}</h3>
//       </Link>

//       <p className={styles.category}>Category: {product.category}</p>

//       {/* Price + button in one row */}
//       <div className={styles.bottomRow}>
//         <p className={styles.price}>{formatPrice(product.price)}</p>
//         <button className={styles.addBtn} onClick={handleAdd}>
//           Add to Cart
//         </button>
//       </div>
//     </article>
//   );
// }




