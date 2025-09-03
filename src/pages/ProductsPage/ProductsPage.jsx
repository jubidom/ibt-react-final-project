// // ======================= ProductsPage.jsx =======================
// import { useLoaderData, useSearchParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useMemo } from "react";
// import { addToCart } from "../../store/cartSlice";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import styles from "./ProductsPage.module.css";

// export default function ProductsPage() {
//   const products = useLoaderData(); // from fetchProducts() in main.jsx
//   const dispatch = useDispatch();
//   const [searchParams] = useSearchParams();

//   const searchRaw = searchParams.get("search") || "";

//   // Normalize text: lowercase, strip accents, remove punctuation, collapse spaces
//   const normalize = (str) =>
//     (str || "")
//       .toString()
//       .toLowerCase()
//       .normalize("NFD") // split accents
//       .replace(/[\u0300-\u036f]/g, "") // remove accents
//       .replace(/[^a-z0-9\s]/g, " ") // remove punctuation/apostrophes
//       .replace(/\s+/g, " ")
//       .trim();

//   const tokens = useMemo(
//     () => normalize(searchRaw).split(" ").filter(Boolean),
//     [searchRaw]
//   );

//   const filtered = useMemo(() => {
//     if (!tokens.length) return products;

//     return products.filter((p) => {
//       const fields = [
//         normalize(p.title),
//         normalize(p.description),
//         normalize(p.category),
//       ];

//       // also include no-space versions to help substring matches
//       const extras = fields.map((f) => f.replace(/\s+/g, ""));
//       const haystack = [...fields, ...extras].join(" ");

//       // require every token to appear somewhere (AND search across fields)
//       return tokens.every((t) => haystack.includes(t));
//     });
//   }, [products, tokens]);

//   const handleAddToCart = (product) => dispatch(addToCart(product));

//   return (
//     <section className={styles.productsPage}>
//       <h1>Our Products</h1>
//       {searchRaw ? (
//         <p className={styles.searchNote}>
//           Showing results for <em>“{searchRaw}”</em> — {filtered.length} found
//         </p>
//       ) : null}

//       {filtered.length ? (
//         <div className={styles.grid}>
//           {filtered.map((p) => (
//             <ProductCard
//               key={p.id}
//               product={p}
//               onAddToCart={() => handleAddToCart(p)}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className={styles.emptyState}>
//           No matches for “{searchRaw}”. Try a shorter keyword (e.g., “elec”, “men”, “wom”).
//         </p>
//       )}
//     </section>
//   );
// }

// JUST NOW
// import { useState, useMemo, useEffect } from "react";
// import { useLoaderData, useSearchParams } from "react-router-dom";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import FilterProducts from "../../components/FilterProducts/FilterProducts";
// import styles from "./ProductsPage.module.css";

// export default function ProductsPage({products: propProducts}) {
//    // If products were passed via props, use them; otherwise fallback to loader
//   const loaderProducts = useLoaderData?.() || [];
//   const products = propProducts || loaderProducts;

//   const [searchParams, setSearchParams] = useSearchParams();

//   // ✅ Read initial values from URL query params (or fallback to empty strings)
//   const initialSearch = searchParams.get("search") || "";
//   const initialCategory = searchParams.get("category") || "";

//   // Local state for search + category
//   const [searchTerm, setSearchTerm] = useState(initialSearch);
//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);

//   //  Keep the URL query string in sync with search/category state
//   useEffect(() => {
//     const params = {};
//     if (searchTerm) params.search = searchTerm;
//     if (selectedCategory) params.category = selectedCategory;
//     setSearchParams(params);
//   }, [searchTerm, selectedCategory, setSearchParams]);

//   //  Memoized filter so it recalculates only when dependencies change
//   const filtered = useMemo(() => {
//     // normalize inputs
//     const term = searchTerm.toLowerCase();
//     const category = selectedCategory.toLowerCase();

//     return products.filter((p) => {
//       // normalize product fields
//       const title = p.title?.toLowerCase() || "";
//       const desc = p.description?.toLowerCase() || "";
//       const cat = p.category?.toLowerCase() || "";

//       // matches search text?
//       const matchesSearch =
//         !term || title.includes(term) || desc.includes(term) || cat.includes(term);

//       // matches category?
//       const matchesCategory = !category || cat === category;

//       return matchesSearch && matchesCategory;
//     });
//   }, [products, searchTerm, selectedCategory]);

//   return (
//     <div className={styles.productsPage}>
//       {/* ✅ Top filter bar component (search + category select) */}
//       <FilterProducts
//         onSearch={setSearchTerm}
//         onCategoryChange={setSelectedCategory}
//       />

//       {/* ✅ Product cards grid */}
//       <div className={styles.grid}>
//         {filtered.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           filtered.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }



// import { useState, useMemo, useEffect } from "react";
// import { useLoaderData, useSearchParams } from "react-router-dom";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import FilterProducts from "../../components/FilterProducts/FilterProducts";
// import styles from "./ProductsPage.module.css";

// export default function ProductsPage() {
//   const products = useLoaderData(); // fetched in your loader
//   const [searchParams, setSearchParams] = useSearchParams();

//   // Read initial values from URL query params
//   const initialSearch = searchParams.get("search") || "";
//   const initialCategory = searchParams.get("category") || "";

//   const [searchTerm, setSearchTerm] = useState(initialSearch);
//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);

//   // Keep URL in sync when state changes
//   useEffect(() => {
//     const params = {};
//     if (searchTerm) params.search = searchTerm;
//     if (selectedCategory) params.category = selectedCategory;
//     setSearchParams(params);
//   }, [searchTerm, selectedCategory, setSearchParams]);

//   // Derived filtered products
//   const filtered = useMemo(() => {
//     const term = searchTerm.toLowerCase();

//     return products.filter((p) => {
//       const matchesSearch =
//         !searchTerm.trim() ||
//         p.title.toLowerCase().includes(term) ||
//         p.description.toLowerCase().includes(term) ||
//         p.category.toLowerCase().includes(term); // ✅ added category here

//       const matchesCategory =
//         !selectedCategory || p.category === selectedCategory;

//       return matchesSearch && matchesCategory;
//     });
//   }, [products, searchTerm, selectedCategory]);

//   return (
//     <div className={styles.productsPage}>
//       {/* Filter bar */}
//       <FilterProducts
//         onSearch={setSearchTerm}
//         onCategoryChange={setSelectedCategory}
//       />

//       {/* Products grid */}
//       <div className={styles.grid}>
//         {filtered.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           filtered.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState, useMemo, useEffect } from "react";
// import { useLoaderData, useSearchParams } from "react-router-dom";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import FilterProducts from "../../components/FilterProducts/FilterProducts";
// import styles from "./ProductsPage.module.css";

// export default function ProductsPage() {
//   const products = useLoaderData(); // fetched in your loader
//   const [searchParams, setSearchParams] = useSearchParams();

//   // Read initial values from URL query params
//   const initialSearch = searchParams.get("search") || "";
//   const initialCategory = searchParams.get("category") || "";

//   const [searchTerm, setSearchTerm] = useState(initialSearch);
//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);

//   // Keep URL in sync when state changes
//   useEffect(() => {
//     const params = {};
//     if (searchTerm) params.search = searchTerm;
//     if (selectedCategory) params.category = selectedCategory;
//     setSearchParams(params);
//   }, [searchTerm, selectedCategory, setSearchParams]);

//   // Derived filtered products
//   const filtered = useMemo(() => {
//     return products.filter((p) => {
//       const matchesSearch =
//         !searchTerm.trim() ||
//         p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         p.description.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesCategory =
//         !selectedCategory || p.category === selectedCategory;

//       return matchesSearch && matchesCategory;
//     });
//   }, [products, searchTerm, selectedCategory]);

//   return (
//     <div className={styles.productsPage}>
//       {/* Filter bar */}
//       <FilterProducts
//         onSearch={setSearchTerm}
//         onCategoryChange={setSelectedCategory}
//       />

//       {/* Products grid */}
//       <div className={styles.grid}>
//         {filtered.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           filtered.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState, useMemo } from "react";
// import { useLoaderData } from "react-router-dom";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import FilterProducts from "../../components/FilterProducts/FilterProducts";
// import styles from "./ProductsPage.module.css";

// export default function ProductsPage() {
//   const products = useLoaderData(); // fetched in your loader

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   // Derived filtered products with useMemo
//   const filtered = useMemo(() => {
//     return products.filter((p) => {
//       const matchesSearch =
//         !searchTerm.trim() ||
//         p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         p.description.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesCategory =
//         !selectedCategory || p.category === selectedCategory;

//       return matchesSearch && matchesCategory;
//     });
//   }, [products, searchTerm, selectedCategory]);

//   return (
//     <div className={styles.productsPage}>
//       {/* Filter bar */}
//       <FilterProducts
//         onSearch={setSearchTerm}
//         onCategoryChange={setSelectedCategory}
//       />

//       {/* Products grid */}
//       <div className={styles.grid}>
//         {filtered.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           filtered.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// ProductsPage → keeps only the filtering logic.

// FilterProducts → just updates searchTerm and selectedCategory.

// ProductCard → handles rendering.

// Nothing redundant, and you’re avoiding unnecessary state re-renders.


// import { useState, useEffect } from "react";
// import { useLoaderData } from "react-router-dom";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import FilterProducts from "../../components/FilterProducts/FilterProducts";
// import styles from "./ProductsPage.module.css";

// export default function ProductsPage() {
//   const products = useLoaderData(); // fetched in your loader
//   const [filtered, setFiltered] = useState(products);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   // Handle filtering
//   useEffect(() => {
//     let result = products;

//     // Search filter
//     if (searchTerm.trim()) {
//       result = result.filter(
//         (p) =>
//           p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           p.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Category filter
//     if (selectedCategory) {
//       result = result.filter((p) => p.category === selectedCategory);
//     }

//     setFiltered(result);
//   }, [products, searchTerm, selectedCategory]);

//   return (
//     <div className={styles.productsPage}>
//       {/* Filter bar */}
//       <FilterProducts
//         onSearch={setSearchTerm}
//         onCategoryChange={setSelectedCategory}
//       />

//       {/* Products grid */}
//       <div className={styles.grid}>
//         {filtered.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }
// 

// THIS IS GOOD TOO

// import { useState, useMemo, useEffect } from "react";
// import { useLoaderData, useSearchParams } from "react-router-dom";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import FilterProducts from "../../components/FilterProducts/FilterProducts";
// import styles from "./ProductsPage.module.css";

// export default function ProductsPage({ products: propProducts }) {
//   // ✅ If products were passed via props, use them; otherwise fallback to loader
//   let loaderProducts = [];
//   try {
//     loaderProducts = useLoaderData() || [];
//   } catch {
//     loaderProducts = [];
//   }
//   const products = propProducts || loaderProducts;

//   const [searchParams, setSearchParams] = useSearchParams();

//   // ✅ Read initial values from URL query params (or fallback to empty strings)
//   const initialSearch = searchParams.get("search") || "";
//   const initialCategory = searchParams.get("category") || "";

//   // Local state for search + category
//   const [searchTerm, setSearchTerm] = useState(initialSearch);
//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);

//   // ✅ Keep the URL query string in sync with search/category state
//   useEffect(() => {
//     const params = {};
//     if (searchTerm) params.search = searchTerm;
//     if (selectedCategory) params.category = selectedCategory;
//     setSearchParams(params);
//   }, [searchTerm, selectedCategory, setSearchParams]);

//   // ✅ Memoized filter so it recalculates only when dependencies change
//   const filtered = useMemo(() => {
//     const term = searchTerm.toLowerCase();
//     const category = selectedCategory.toLowerCase();

//     return products.filter((p) => {
//       const title = p.title?.toLowerCase() || "";
//       const desc = p.description?.toLowerCase() || "";
//       const cat = p.category?.toLowerCase() || "";

//       const matchesSearch =
//         !term || title.includes(term) || desc.includes(term) || cat.includes(term);

//       const matchesCategory = !category || cat === category;

//       return matchesSearch && matchesCategory;
//     });
//   }, [products, searchTerm, selectedCategory]);

//   return (
//     <div className={styles.productsPage}>
//       {/* ✅ Top filter bar (search + category select) */}
//       <FilterProducts
//         onSearch={setSearchTerm}
//         onCategoryChange={setSelectedCategory}
//       />

//       {/* ✅ Product cards grid */}
//       <div className={styles.grid}>
//         {filtered.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           filtered.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useMemo, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchProducts } from "../../store/productsSlice"; 
// import ProductCard from "../../components/ProductCard/ProductCard";
// import FilterProducts from "../../components/FilterProducts/FilterProducts";
// import styles from "./ProductsPage.module.css";

// export default function ProductsPage() {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   useEffect(() => {
//     if (products.length === 0) {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, products.length]);

//   const filtered = useMemo(() => {
//     const term = searchTerm.toLowerCase();
//     const category = selectedCategory.toLowerCase();

//     return products.filter((p) => {
//       const title = p.title?.toLowerCase() || "";
//       const desc = p.description?.toLowerCase() || "";
//       const cat = p.category?.toLowerCase() || "";

//       const matchesSearch =
//         !term || title.includes(term) || desc.includes(term) || cat.includes(term);

//       const matchesCategory = !category || cat === category;

//       return matchesSearch && matchesCategory;
//     });
//   }, [products, searchTerm, selectedCategory]);

//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p>Failed to load products: {error}</p>;

//   return (
//     <div className={styles.productsPage}>
//       <FilterProducts
//         onSearch={setSearchTerm}
//         onCategoryChange={setSelectedCategory}
//       />
//       <div className={styles.grid}>
//         {filtered.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           filtered.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// // ======================= ProductsPage.jsx =======================
// import { useSelector, useDispatch } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { useMemo, useEffect } from "react";
// import { fetchProducts } from "../../store/productsSlice"; 
// import { addToCart } from "../../store/cartSlice";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import styles from "./ProductsPage.module.css";

// export default function ProductsPage() {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     if (products.length === 0) {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, products.length]);

//   const searchRaw = searchParams.get("search") || "";

//   // Normalize text
//   const normalize = (str) =>
//     (str || "")
//       .toString()
//       .toLowerCase()
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "")
//       .replace(/[^a-z0-9\s]/g, " ")
//       .replace(/\s+/g, " ")
//       .trim();

//   const tokens = useMemo(
//     () => normalize(searchRaw).split(" ").filter(Boolean),
//     [searchRaw]
//   );

//   const filtered = useMemo(() => {
//     if (!tokens.length) return products;

//     return products.filter((p) => {
//       const fields = [
//         normalize(p.title),
//         normalize(p.description),
//         normalize(p.category),
//       ];
//       const extras = fields.map((f) => f.replace(/\s+/g, ""));
//       const haystack = [...fields, ...extras].join(" ");

//       return tokens.every((t) => haystack.includes(t));
//     });
//   }, [products, tokens]);

//   const handleAddToCart = (product) => dispatch(addToCart(product));

//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p>Failed to load products: {error}</p>;

//   return (
//     <section className={styles.productsPage}>
//       <h1>Our Products</h1>
//       {searchRaw ? (
//         <p className={styles.searchNote}>
//           Showing results for <em>“{searchRaw}”</em> — {filtered.length} found
//         </p>
//       ) : null}

//       {filtered.length ? (
//         <div className={styles.grid}>
//           {filtered.map((p) => (
//             <ProductCard
//               key={p.id}
//               product={p}
//               onAddToCart={() => handleAddToCart(p)}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className={styles.emptyState}>
//           No matches for “{searchRaw}”. Try a shorter keyword (e.g., “elec”, “men”, “wom”).
//         </p>
//       )}
//     </section>
//   );
// }



// import { useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import styles from "./ProductsPage.module.css";
// import {
//   selectAllProducts,
//   selectProductsStatus,
// } from "../../store/productsSlice";

// export default function ProductsPage() {
//   const products = useSelector(selectAllProducts);
//   const status = useSelector(selectProductsStatus);
//   const [searchParams] = useSearchParams();

//   // ✅ Handle loading + error
//   if (status === "loading") {
//     return <p className={styles.loading}>Loading products...</p>;
//   }

//   if (status === "failed") {
//     return <p className={styles.error}>Failed to load products.</p>;
//   }

//   // ✅ Filtering
//   const category = searchParams.get("category");
//   const search = searchParams.get("search");

//   let filtered = [...products];

//   if (category) {
//     filtered = filtered.filter((p) => p.category === category);
//   }

//   if (search) {
//     filtered = filtered.filter((p) =>
//       p.title.toLowerCase().includes(search.toLowerCase())
//     );
//   }

//   return (
//     <section className={styles.productsPage}>
//       <h1>Our Products</h1>

//       {filtered.length === 0 ? (
//         <p>No product found</p>
//       ) : (
//         <div className={styles.grid}>
//           {filtered.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   selectAllProducts,
//   selectProductsStatus,
//   selectProductsError,
//   fetchProductsThunk,
// } from "../../store/productsSlice";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import styles from "./ProductsPage.module.css";

// export default function ProductsPage() {
//   const dispatch = useDispatch();
//   const products = useSelector(selectAllProducts);
//   const status = useSelector(selectProductsStatus);
//   const error = useSelector(selectProductsError);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchProductsThunk());
//     }
//   }, [status, dispatch]);

//   if (status === "loading") return <p>Loading products...</p>;
//   if (status === "failed") return <p>Error: {error}</p>;

//   return (
//     <section className={styles.productsPage}>
//       <h1>Our Products</h1>

//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div className={styles.grid}>
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }





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

export default function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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
    <section className={styles.productsPage}>
      <h1>Our Products</h1>

      {/* ✅ Your filter bar */}
      <FilterProducts
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
