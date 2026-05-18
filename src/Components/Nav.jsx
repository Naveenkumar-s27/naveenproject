import React from "react";
import { Phone } from "lucide-react";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={styles["top-bar"]}>
      <div className={styles["left-info"]}>
        <Phone className={styles["phone-icon"]} />
        <span>+1 (555) 123-4567</span>
        <span className={styles["delivery-text"]}>
          Free delivery on orders over $50
        </span>
      </div>
      <div className={styles["right-info"]}>
        <span>Mon-Sat: 8AM-8PM | Sun: 9AM-6PM</span>
      </div>
    </div>
  );
};

export default Nav;
