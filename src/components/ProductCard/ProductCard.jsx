import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import formatPrice from "../../utils/formatPrice";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");

  // detect global theme from <body data-theme="...">
  useEffect(() => {
    const currentTheme = document.body.getAttribute("data-theme") || "light";
    setTheme(currentTheme);

    const observer = new MutationObserver(() => {
      const newTheme = document.body.getAttribute("data-theme") || "light";
      setTheme(newTheme);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleAdd = () => {
    dispatch(addToCart(product));
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
    <article
      className={styles.card}
      data-theme={theme} // local scoped theme
      aria-label={product.title}
    >
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



