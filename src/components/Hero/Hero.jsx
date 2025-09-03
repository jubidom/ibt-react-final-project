import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";
import {
  selectAllProducts,
  selectProductsStatus,
  fetchProductsThunk,
} from "../../store/productsSlice";
import formatPrice from "../../utils/formatPrice";
import styles from "./Hero.module.css";
import { useEffect, useState } from "react";

export default function Hero() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const [featured, setFeatured] = useState([]);

  //  Ensure products are fetched once
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsThunk());
    }
  }, [status, dispatch]);

  //  Pick featured items once products are available
  useEffect(() => {
    if (products.length > 0) {
      const womens = products.find((p) => p.category === "women's clothing");
      const mens = products.find((p) => p.category === "men's clothing");
      const selected = [womens, mens].filter(Boolean);
      setFeatured(selected);
    }
  }, [products]);

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <section className={styles.hero} id="hero">
      {/* LEFT: Featured Products */}
      <div className={styles.featured}>
        <h2 className={styles.featuredTitle}>🔥 Featured Picks</h2>

        {status === "loading" && <p>Loading featured...</p>}
        {status === "failed" && <p>Could not load featured products.</p>}

        <div className={styles.featuredGrid}>
          {featured.map((product) => (
            <div key={product.id} className={styles.card}>
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.image}
                />
                <h3 className={styles.productTitle}>{product.title}</h3>
              </Link>
              <div className={styles.actions}>
                <p className={styles.price}>{formatPrice(product.price)}</p>
                <button
                  onClick={() => handleAdd(product)}
                  className={styles.addBtn}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Hero Content */}
      <div className={styles.content}>
        <h1 className={styles.headline}>Welcome to Sweethours Store</h1>
        <p className={styles.subtext}>
          Discover amazing products, hand-picked just for you. Shop smart, shop stylish.
        </p>
        <img
          src="https://plus.unsplash.com/premium_photo-1670002352164-4a2cbae69346?q=80&w=870&auto=format&fit=crop"
          alt="Happy shopping"
          className={styles.heroImage}
        />
      </div>
    </section>
  );
}

