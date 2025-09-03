import styles from "./AboutUs.module.css";
export default function AboutUs() {
  return (
    <section>
      {/* CEO Section */}
      <div className={styles.ceoSection}>
        <img src="assets/ceo.jpg" alt="CEO" className={styles.ceoPhoto} />
        <div className={styles.ceoBio}>
          <h3>Israel Oluwagbenro Akanni - CEO</h3>
          <p>
            Israel Akanni brings 15 years of experience in luxury hospitality,
            leading with passion and innovation. He navigates a complex global
            landscape, balancing diverse cultural expectations, economic
            fluctuations, and the ever-evolving demands of the modern traveler
            to ensure our brand&apos;s success and growth.
          </p>
        </div>
      </div>

      {/* Executives Section */}
      <div className={styles.executivesSection}>
        <h3>Meet Our Top Executives</h3>
        <div className={styles.executivesGrid}>
          <div className={styles.executiveCard}>
            <img src="assets/ceo-2.jpeg" alt="Executive 1" />
            <h4>Mrs Oyindamola Akanni</h4>
            <p>GM, Operations</p>
          </div>

          <div className={styles.executiveCard}>
            <img src="assets/hospitalityHead-1.jpeg" alt="Executive 2" />
            <h4>Jubilee Akanni</h4>
            <p>Head of Hospitality</p>
          </div>

          <div className={styles.executiveCard}>
            <img src="assets/headOfChef-1.jpeg" alt="Executive 3" />
            <h4>Dominion Akanni</h4>
            <p>Executive Chef</p>
          </div>
        </div>
      </div>

      {/* Workers Section */}
      <div className={styles.workersSection}>
        <h2>Vibrant Members of Staff</h2>
        <div className={styles.executivesGrid}>
          <div className={styles.executiveCard}>
            <img src="assets/chiefOfStaffCabinet.jpg" alt="Executive 1" />
            <h4>Mr Joe & Cabinet</h4>
            <p>Chief of Staff</p>
          </div>

          <div className={styles.executiveCard}>
            <img src="assets/waiters-1.jpg" alt="Executive 2" />
            <h4>John and Jane</h4>
            <p>Waiters on Duty</p>
          </div>

          <div className={styles.executiveCard}>
            <img src="assets/waitersOutfit.jpeg" alt="Executive 3" />
            <h4>Chefs</h4>
            <p>Chefs Briefing</p>
          </div>
        </div>
      </div>
    </section>
  );
}

