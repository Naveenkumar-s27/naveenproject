import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext(null);
const ADMIN_SESSION = "vmart_admin_session";

// Hardcoded admin credentials — change these before going live!
const ADMINS = [
  { id: "admin1", name: "Store Owner", email: "admin@vmart.com", password: "admin123", role: "Super Admin" },
];

const getAdminSession = () => {
  try { return JSON.parse(localStorage.getItem(ADMIN_SESSION)); }
  catch { return null; }
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(getAdminSession);

  const adminLogin = ({ email, password }) => {
    const found = ADMINS.find((a) => a.email === email && a.password === password);
    if (!found) return { ok: false, error: "Invalid admin credentials." };
    const session = { id: found.id, name: found.name, email: found.email, role: found.role };
    localStorage.setItem(ADMIN_SESSION, JSON.stringify(session));
    setAdmin(session);
    return { ok: true };
  };

  const adminLogout = () => {
    localStorage.removeItem(ADMIN_SESSION);
    setAdmin(null);
  };

  // ── Data helpers (read from regular user localStorage) ──
  const getAllOrders = () => {
    const users = getAllUsers();
    return users.flatMap((u) => {
      try {
        const orders = JSON.parse(localStorage.getItem(`vmart_orders_${u.id}`)) || [];
        return orders.map((o) => ({ ...o, customerName: u.name, customerEmail: u.email, customerId: u.id }));
      } catch { return []; }
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getAllUsers = () => {
    try { return JSON.parse(localStorage.getItem("vmart_users")) || []; }
    catch { return []; }
  };

  const updateOrderStatus = (customerId, orderId, newStatus) => {
    const key = `vmart_orders_${customerId}`;
    try {
      const orders = JSON.parse(localStorage.getItem(key)) || [];
      const updated = orders.map((o) => o.id === orderId ? { ...o, status: newStatus } : o);
      localStorage.setItem(key, JSON.stringify(updated));
    } catch { /* ignore */ }
  };

  return (
    <AdminContext.Provider value={{ admin, adminLogin, adminLogout, getAllOrders, getAllUsers, updateOrderStatus }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be inside AdminProvider");
  return ctx;
};