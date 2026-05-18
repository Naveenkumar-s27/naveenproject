import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const OrdersContext = createContext(null);

const key = (userId) => `vmart_orders_${userId}`;

const loadOrders = (userId) => {
  try { return JSON.parse(localStorage.getItem(key(userId))) || []; }
  catch { return []; }
};

export const OrdersProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  // Reload orders whenever user changes (login / logout)
  useEffect(() => {
    setOrders(currentUser ? loadOrders(currentUser.id) : []);
  }, [currentUser]);

  const placeOrder = ({ cartItems, total, address, paymentMethod }) => {
    if (!currentUser) return null;
    const newOrder = {
      id: "#ORD-" + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }),
      status: "Processing",
      total: `$${total}`,
      items: cartItems.reduce((s, i) => s + i.quantity, 0),
      products: cartItems.map((i) => ({ name: i.name, qty: i.quantity, price: i.price, image: i.image })),
      address,
      paymentMethod,
    };
    const updated = [newOrder, ...loadOrders(currentUser.id)];
    localStorage.setItem(key(currentUser.id), JSON.stringify(updated));
    setOrders(updated);
    return newOrder;
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be inside OrdersProvider");
  return ctx;
};