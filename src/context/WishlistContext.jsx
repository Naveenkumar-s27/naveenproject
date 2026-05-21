import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);

// ✅ Fix: Use _id (MongoDB) or id (localStorage)
const getId = (product) => product._id || product.id;

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const toggleWishlist = (product) => {
    const pid = getId(product);
    setWishlistItems((prev) => {
      const exists = prev.find((p) => getId(p) === pid);
      return exists
        ? prev.filter((p) => getId(p) !== pid)
        : [...prev, product];
    });
  };

  // ✅ Fix: Check using _id or id
  const isLiked = (id) => wishlistItems.some((p) => getId(p) === id);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, isWishlistOpen, setIsWishlistOpen, toggleWishlist, isLiked }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be inside WishlistProvider");
  return ctx;
};