// components/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom"; // ✅ use Link for internal navigation
import styles from "./Footer.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand */}
        <div className={styles.brand}>
          <h2 className={styles.logo}>Sweethours Store</h2>
          <p>Your one-stop shop for quality products at the best prices.</p>
        </div>

        {/* Quick Links */}
        <div className={styles.links}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.contact}>
          <h4>Contact Us</h4>
          <p>Email: akannigbenro@gmail.com</p>
          <p>Phone: +234 548 855 01</p>
          <p>Address: Lagos, Nigeria</p>
        </div>

        {/* Social Media */}
        <div className={styles.social}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a
              href="https://web.whatsapp.com/"
              target="_blank"
              rel="noreferrer"
              className={`${styles.icon} ${styles.whatsapp}`}
              data-tooltip="WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              href="http://facebook.com/"
              target="_blank"
              rel="noreferrer"
              className={`${styles.icon} ${styles.facebook}`}
              data-tooltip="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://x.com/home"
              target="_blank"
              rel="noreferrer"
              className={`${styles.icon} ${styles.twitter}`}
              data-tooltip="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              className={`${styles.icon} ${styles.youtube}`}
              data-tooltip="YouTube"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href="http://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className={`${styles.icon} ${styles.linkedin}`}
              data-tooltip="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://www.tiktok.com/en/"
              target="_blank"
              rel="noreferrer"
              className={`${styles.icon} ${styles.tiktok}`}
              data-tooltip="TikTok"
            >
              <i className="fab fa-tiktok"></i>
            </a>
            <a
              href="https://telegram.org/"
              target="_blank"
              rel="noreferrer"
              className={`${styles.icon} ${styles.telegram}`}
              data-tooltip="Telegram"
            >
              <i className="fab fa-telegram-plane"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} Sweethours Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;


// Internal links (Products, Cart, Contact) use React Router’s <Link> and won’t reload the page.

// External links (WhatsApp, Facebook, etc.) still use <a> because they must open external sites.