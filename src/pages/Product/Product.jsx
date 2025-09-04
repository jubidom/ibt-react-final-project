import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import formatPrice from "../../utils/formatPrice";
import styles from "./Product.module.css";

// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product() {
  const { product, totalProducts } = useLoaderData(); // loader now returns product + total count
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(productId);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));

    toast.success(`${product.title} added to cart! 🛒`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });
  };

  const goBack = () => navigate(-1);

  //  wrap-around logic
  const goPrev = () => {
    if (id === 1) {
      navigate(`/products/${totalProducts}`); // first → last
    } else {
      navigate(`/products/${id - 1}`);
    }
  };

  const goNext = () => {
    if (id === totalProducts) {
      navigate(`/products/1`); // last → first
    } else {
      navigate(`/products/${id + 1}`);
    }
  };

  return (
    <div className={styles.productPage}>
      {/* Left side image */}
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />

      {/* Right side details */}
      <div className={styles.details}>
        <h1>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.category}>
          <strong>Category:</strong> {product.category}
        </p>

        {/* Price + Add to Cart */}
        <div className={styles.priceRow}>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <button onClick={handleAddToCart} className={styles.addBtn}>
            Add to Cart
          </button>
        </div>

        {/* Navigation buttons */}
        <div className={styles.navButtons}>
          <button className={styles.navBtn} onClick={goBack}>
            ← Back to Products
          </button>
          <button className={styles.navBtn} onClick={goPrev}>
            ⬅ Prev
          </button>
          <button className={styles.navBtn} onClick={goNext}>
            Next ➡
          </button>
        </div>

        {/* Optional: show index out of total */}
        <p className={styles.counter}>
          {id} / {totalProducts}
        </p>
      </div>
    </div>
  );
}

