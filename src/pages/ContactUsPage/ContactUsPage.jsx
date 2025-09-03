import styles from "./ContactUsPage.module.css";
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactUsPage() {
  return (
    <section className={styles.newsletterSection} id="news">
      <div className={styles.newsletterContent}>
        {/* Topic + Intro */}
        <h2>✨ Stay Updated with Our Store News</h2>
        <p>
          Be the first to know about exclusive offers, seasonal deals, and insider
          tips from our luxury team — straight to your inbox.
        </p>

        {/* Newsletter Form */}
        <form className={styles.newsletterForm}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>

        {/* Get in Touch Section */}
        <div className={styles.extraInfo}>
          <h3>📌 Get in Touch</h3>
          <p className={styles.contactText}>
            Our team is always here to assist you — whether it's bookings,
            special events, or general inquiries.
          </p>

          <div className={styles.contactDetails}>
            <p><FaMapMarkerAlt /> 123 Paradise Avenue, Lekki, Lagos.</p>
            <p><FaPhoneAlt /> +234 905 488 5501</p>
            <p><FaEnvelope /> akannigbenro@gmail.com</p>
          </div>

          <div className={styles.socialLinks}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook size={20} /> Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram size={20} /> Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter size={20} /> Twitter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

