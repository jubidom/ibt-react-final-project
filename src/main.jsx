// main.jsx
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

// Root App & Pages
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import Product from "./pages/Product/Product";
import CartPage from "./pages/CartPage/CartPage";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage/ConfirmationPage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AboutUsPage from "./pages/AboutUs/AboutUs";
import AccountSettingsPage from "./pages/AccountSettings/AccountSettings";
import { BlogProvider } from "./context/BlogContext"; // 👈 add this

// API helpers
import { fetchProducts, fetchProductById } from "./utils/api";
// LocalStorage utils
import { getCart, getWishlist } from "./utils/storage";

// Global CSS only (component CSS is inside module.css)
import "./index.css";

// ------------------- ROUTER SETUP ------------------- //
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App contains Navbar, Footer, Outlet
    children: [
      // Home page
      { index: true, element: <HomePage /> },

      // Products listing page with preloaded data
      {
        path: "products",
        element: <ProductsPage />,
        loader: async () => fetchProducts(),
      },

      // Single product page with preloaded data
      {
  path: "products/:productId",
  element: <Product />,
  loader: async ({ params }) => {
    const product = await fetchProductById(params.productId);
    const products = await fetchProducts(); 
    return { product, totalProducts: products.length };
  },
},

      // Cart page (preload from localStorage)
      {
        path: "cart",
        element: <CartPage />,
        loader: async () => getCart(),
      },

      // Wishlist page (preload from localStorage)
      {
        path: "wishlist",
        element: <WishlistPage />,
        loader: async () => getWishlist(),
      },

      // Checkout + Confirmation
      { path: "checkout", element: <CheckoutPage /> },
      { path: "confirmation", element: <ConfirmationPage /> },

      // Misc pages
      { path: "contact", element: <ContactUsPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "admin", element: <AdminPanel /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "account", element: <AccountSettingsPage /> },
    ],
  },
]);

// ------------------- RENDER APP ------------------- //
ReactDOM.createRoot(document.getElementById("root")).render(
<StrictMode>
  <Provider store={store}>
    <BlogProvider>
      <RouterProvider router={router} />
    </BlogProvider>
  </Provider>
</StrictMode>
);


