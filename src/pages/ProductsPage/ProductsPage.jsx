import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  selectProductsStatus,
  selectProductsError,
  fetchProductsThunk,
} from "../../store/productsSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterProducts from "../../components/FilterProducts/FilterProducts";
import styles from "./ProductsPage.module.css";

export default function ProductsPage({ isDark: isDarkProp }) {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [isDark, setIsDark] = useState(Boolean(isDarkProp));

  useEffect(() => {
    if (typeof isDarkProp !== "undefined") {
      setIsDark(Boolean(isDarkProp));
      return;
    }
    // initial from document
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");

    // observe global data-theme changes (optional)
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, [isDarkProp]);

  // Fetch products once
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsThunk());
    }
  }, [status, dispatch]);

  // Apply filters whenever products, search, or category changes
  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    setFiltered(result);
  }, [products, searchTerm, selectedCategory]);

  if (status === "loading") return <p>Loading products...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <section
      className={styles.productsPage}
      data-theme={isDark ? "dark" : "light"} // <- local scoping
    >
      <h1>Our Products</h1>

      <FilterProducts
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((product) => (
        
            <ProductCard key={product.id} product={product} isDark={isDark} />
          ))}
        </div>
      )}
    </section>
  );
}

