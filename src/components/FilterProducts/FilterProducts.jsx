import { useState, useEffect } from "react";
import styles from "./FilterProducts.module.css";

export default function FilterProducts({ onSearch, onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(data); // ["electronics", "jewelery", "men's clothing", "women's clothing"]
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={styles.filterBar}>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        className={styles.searchInput}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Category Dropdown */}
      <select
        className={styles.categorySelect}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Choose Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

