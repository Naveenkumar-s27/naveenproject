import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

// ✅ Helper: MongoDB _id or fallback to id
const getId = (product) => product._id || product.id;

// ✅ Helper: price is Number from backend (50) or String ("$50") from localStorage
const getPrice = (price) => {
  if (typeof price === "number") return price;
  if (typeof price === "string") return parseFloat(price.replace("$", "").replace("₹", "")) || 0;
  return 0;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    const pid = getId(product);
    setCartItems((prev) => {
      const existing = prev.find((item) => getId(item) === pid);
      if (existing) {
        return prev.map((item) =>
          getId(item) === pid
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => getId(item) !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          getId(item) === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ getPrice handles both Number and String prices
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + getPrice(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        getId,
        getPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};