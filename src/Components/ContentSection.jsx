import React from "react";
import styles from "./ContentSection.module.css";
import { useNavigate } from "@tanstack/react-router";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.heroContainer}>
      <div className={styles.textSection}>
        <div className={styles.header}>
          <span className={styles.headerPill}>Fresh & Organic</span>
        </div>
        <div>
          <h1 className={styles.bold}>
            Welcome to <span>V-Mart</span>
          </h1>
          <p className={styles.des}>
            Your Trusted Partner for fresh, organic vegetables delivered right
            to your doorstep. Quality guaranteed, freshness assured.
          </p>
          <div className={styles.buttons}>
            {/* ✅ "Shop Now" navigates to /shop page */}
            <button
              className={styles.shop}
              onClick={() => navigate({ to: "/shop" })}
            >
              Shop Now
            </button>

            {/* ✅ "Learn More" scrolls to the About section */}
            <button
              className={styles.learn}
              onClick={() =>
                document
                  .getElementById("about-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className={styles.imageSection}>
        <img
          src="https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg"
          alt="Fresh Vegetables"
          className={styles.heroImage}
        />
        <div className={styles.ratingCard}>
          <span className={styles.star}>⭐</span>
          <strong>4.9/5</strong> &nbsp; (1000+ reviews)
        </div>
      </div>
    </div>
  );
};

export default HeroSection;