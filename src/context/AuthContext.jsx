import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY   = "vmart_users";
const SESSION_KEY = "vmart_session";

const getUsers   = () => { try { return JSON.parse(localStorage.getItem(USERS_KEY))   || []; } catch { return []; } };
const getSession = () => { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; } };

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getSession);

  const register = ({ name, email, password, phone = "" }) => {
    const users = getUsers();
    if (users.find((u) => u.email === email))
      return { ok: false, error: "Email already registered. Please login." };

    const newUser = {
      id: Date.now(), name, email, password, phone,
      address: "", avatar: "",
      joined: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

    const session = { id: newUser.id, name, email, phone, address: "", avatar: "", joined: newUser.joined };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setCurrentUser(session);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const user = getUsers().find((u) => u.email === email && u.password === password);
    if (!user) return { ok: false, error: "Invalid email or password." };
    const session = { id: user.id, name: user.name, email: user.email, phone: user.phone, address: user.address, avatar: user.avatar, joined: user.joined };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setCurrentUser(session);
    return { ok: true };
  };

  const logout = () => { localStorage.removeItem(SESSION_KEY); setCurrentUser(null); };

  const updateProfile = (data) => {
    const updated = { ...currentUser, ...data };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    setCurrentUser(updated);
    const users = getUsers().map((u) => u.id === currentUser.id ? { ...u, ...data } : u);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};