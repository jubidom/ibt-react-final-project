import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingBag, FaPhone, FaInfoCircle, FaPen, FaUser, FaMoon, FaSun } from "react-icons/fa";
import styles from "./SideBar.module.css";

export default function SideBar({ isOpen, onClose, onToggleTheme, onLogin, theme }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={`${styles.overlay} ${styles.show}`} onClick={onClose}></div>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${styles.open}`}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose}>✖</button>

        {/* Navigation links with icons */}
        <nav className={styles.navLinks}>
          <NavLink to="/" onClick={onClose} className={styles.navItem}>
            <FaHome className={styles.icon} /> Home
          </NavLink>
          <NavLink to="/products" onClick={onClose} className={styles.navItem}>
            <FaShoppingBag className={styles.icon} /> Products
          </NavLink>
          <NavLink to="/contact" onClick={onClose} className={styles.navItem}>
            <FaPhone className={styles.icon} /> Contact Us
          </NavLink>
          <NavLink to="/about" onClick={onClose} className={styles.navItem}>
            <FaInfoCircle className={styles.icon} /> About Us
          </NavLink>
          <NavLink to="/blog" onClick={onClose} className={styles.navItem}>
            <FaPen className={styles.icon} /> Blog
          </NavLink>
        </nav>

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Bottom actions (always visible) */}
        <div className={styles.bottomSection}>
          <button onClick={onLogin} className={`${styles.account} ${styles.navItem}`}>
            <FaUser className={styles.icon} /> Login
          </button>
          <button onClick={onToggleTheme} className={`${styles.themeToggle} ${styles.navItem}`}>
            {theme === "dark" ? <><FaMoon className={styles.icon} /> Dark</> 
                               : <><FaSun className={styles.icon} /> Light</>}
          </button>
        </div>
      </div>
    </>
  );
}

