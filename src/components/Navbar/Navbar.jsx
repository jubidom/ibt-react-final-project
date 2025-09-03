import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./Navbar.module.css";
import SweethoursLogo from "../SweethoursLogo/SweethoursLogo";
import SideBar from "../SideBar/SideBar";

export default function Navbar() {
  const { toggleAuthMode, openAuth, theme, toggleTheme } = useAppContext();

  // Redux cart
  const cartItems = useSelector((state) => state.cart?.items || []);
  const totalCount = cartItems.reduce((sum, item) => sum + (item.qty || 0), 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * (item.qty || 0), 0)
    .toFixed(2);

  // Sidebar & search
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchInput)}`);
      setSearchInput("");
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <nav className={`${styles.navbar} ${styles[theme]}`}>
        <div className={styles.container}>
          {/* LEFT */}
          <div className={styles.left}>
            <Link to="/" className={styles.logoLink}>
              <SweethoursLogo
                variant="wordmark"
                size={28}
                accent={theme === "dark" ? "#00FFFF" : "#008B8B"}
              />
            </Link>
            <div className={styles.navLinks}>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Contact Us
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                About Us
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Blog
              </NavLink>
            </div>
          </div>


          {/* MIDDLE: SEARCH (desktop only) */}
<div className={`${styles.middle} ${styles.desktopOnly}`}>
  <div className={styles.searchBox}>
    <input
      type="text"
      placeholder="Search products..."
      className={styles.searchInput}
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      aria-label="Search products"
    />
    <button
      type="button"
      className={styles.searchBtn}
      onClick={handleSearch}
      aria-label="Search"
    >
      <img
        src="/search-icon.png"
        alt="Search"
        className={styles.searchIcon}
      />
    </button>
  </div>
</div>

          {/* MIDDLE: SEARCH
          

          {/* RIGHT */}
          <div className={styles.right}>
            {/* CART */}
            <div className={styles.cart}>
              <NavLink to="/cart" aria-label="View Cart" className={styles.cartLink}>
                <span className={styles.cartIcon}>🛒</span>
                {totalCount > 0 && (
                  <>
                    <span
                      key={totalCount}
                      className={`${styles.badge} ${styles.badgeAnimate}`}
                    >
                      {totalCount}
                    </span>
                    <span className={styles.totalPrice}>${totalPrice}</span>
                  </>
                )}
              </NavLink>
            </div>

            {/* AUTH (desktop only) */}
            <button
              className={`${styles.authBtn} ${styles.desktopOnly}`}
              onClick={() => {
                toggleAuthMode("login");
                openAuth();
              }}
            >
              Login
            </button>

            {/* THEME TOGGLE (desktop only) */}
            <button
              onClick={toggleTheme}
              className={`${styles.themeToggle} ${styles.desktopOnly}`}
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>

            {/* HAMBURGER (mobile only) */}
            <button
              onClick={toggleSidebar}
              className={`${styles.hamburger} ${styles.mobileOnly}`}
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* SIDEBAR (outside <nav>) */}
      <SideBar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onToggleTheme={toggleTheme}
        onLogin={() => {
          toggleAuthMode("login");
          openAuth();
        }}
        theme={theme}
      />
    </>
  );
}
