import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];
    });
  };

  const isLiked = (id) => wishlistItems.some((p) => p.id === id);

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