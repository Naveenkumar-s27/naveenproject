import React from "react";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";

import style from "./Hero.module.css"; // Assuming you have a CSS module for styling

const Header = () => {
  return (
    <div className={style.header}>
      {/* Logo Section */}
      <div className={style.logo}>
        <div className={style["logo-icon"]}>V</div>
        <div>
          <h2>V-Mart</h2>
          <span>Fresh Vegetables</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className={style["search-bar"]}>
        <Search className={style["search-icon"]} />
        <input type="text" placeholder="Search vegetables..." />
      </div>

      {/* Cart */}
      <div className={style.cart}>
        <ShoppingCart className={style["cart-icon"]} />
        <span>Cart (0)</span>
      </div>
    </div>
  );
};

export default Header;
