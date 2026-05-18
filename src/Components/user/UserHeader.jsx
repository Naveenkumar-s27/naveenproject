import React, { useState } from "react";
import styles from "./UserHeader.module.css";
import { Search, Heart, UserRound, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useNavigate } from "@tanstack/react-router";
import ProfileModal from "./ProfileModal";

const UserHeader = ({ onSearch }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistItems, setIsWishlistOpen } = useWishlist();
  const [searchValue, setSearchValue] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    if (onSearch) onSearch(val);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: searchValue } });
  };

  return (
    <>
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      <div className={styles["header-container"]}>
        <div className={styles["welcome-text"]}>Welcome to V-Mart Organic Shop</div>

        <header className={styles.header}>
          <div className={styles["header__logo"]} onClick={() => navigate({ to: "/" })}>
            <span className={styles["logo-icon"]}>V</span>
            <span className={styles["logo-text"]}>ORGANIC <p>FOOD</p></span>
          </div>

          <form className={styles["header__search"]} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={handleSearchChange}
            />
            <button type="submit" className={styles["search-button"]}>
              <Search className={styles.searchicon} size={20} />
            </button>
          </form>

          <div className={styles["header__icons"]}>
            {/* ❤️ Wishlist icon with badge */}
            <div className={styles["cart-icon-wrapper"]} onClick={() => setIsWishlistOpen(true)} title="Wishlist">
              <Heart className={styles.icon} size={28} />
              {wishlistItems.length > 0 && (
                <span className={styles["cart-badge"]}>{wishlistItems.length}</span>
              )}
            </div>

            {/* 👤 Profile icon */}
            <UserRound className={styles.icon} size={28} title="My Account" onClick={() => setProfileOpen(true)} />

            {/* 🛍️ Cart icon with badge */}
            <div className={styles["cart-icon-wrapper"]} onClick={() => setIsCartOpen(true)} title="Cart">
              <ShoppingBag className={styles.icon} size={28} />
              {totalItems > 0 && (
                <span className={styles["cart-badge"]}>{totalItems}</span>
              )}
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default UserHeader;