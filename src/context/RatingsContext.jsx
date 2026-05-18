import React, { createContext, useContext, useState } from "react";

const RatingsContext = createContext(null);
const KEY = "vmart_ratings";

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
};

export const RatingsProvider = ({ children }) => {
  const [ratings, setRatings] = useState(load);

  // ratings = { [productId]: [{ userId, rating, review, date, userName }] }

  const submitRating = ({ productId, userId, userName, rating, review }) => {
    const updated = { ...ratings };
    if (!updated[productId]) updated[productId] = [];
    const existing = updated[productId].findIndex((r) => r.userId === userId);
    const entry = { userId, userName, rating, review, date: new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }) };
    if (existing >= 0) updated[productId][existing] = entry;
    else updated[productId].push(entry);
    localStorage.setItem(KEY, JSON.stringify(updated));
    setRatings(updated);
  };

  const getProductRatings = (productId) => ratings[productId] || [];

  const getAvgRating = (productId) => {
    const list = ratings[productId];
    if (!list || !list.length) return null;
    return (list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1);
  };

  const getUserRating = (productId, userId) =>
    (ratings[productId] || []).find((r) => r.userId === userId) || null;

  // For admin — all ratings flattened
  const getAllRatings = () =>
    Object.entries(ratings).flatMap(([pid, list]) =>
      list.map((r) => ({ ...r, productId: pid }))
    );

  return (
    <RatingsContext.Provider value={{ submitRating, getProductRatings, getAvgRating, getUserRating, getAllRatings }}>
      {children}
    </RatingsContext.Provider>
  );
};

export const useRatings = () => {
  const ctx = useContext(RatingsContext);
  if (!ctx) throw new Error("useRatings must be inside RatingsProvider");
  return ctx;
};