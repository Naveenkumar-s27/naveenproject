import React from "react";
import { Minus, Plus, Trash2, X, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "@tanstack/react-router";

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    getId,
    getPrice,
  } = useCart();

  const navigate = useNavigate();

  const tax = +(totalPrice * 0.08).toFixed(2);
  const total = +(totalPrice + tax).toFixed(2);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate({ to: "/checkout" });
  };

  const displayPrice = (price) => {
    const num = getPrice(price);
    return "₹" + num.toFixed(2);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 999,
        }}
      />

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "360px",
          maxWidth: "95vw",
          background: "#fff",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: "1px solid #eee",
            background: "#006f1b",
            color: "white",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <ShoppingCart size={20} />
            My Cart
            {cartItems.length > 0 && (
              <span
                style={{
                  background: "#ff4444",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                {cartItems.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </h2>
          <X
            size={22}
            style={{ cursor: "pointer" }}
            onClick={() => setIsCartOpen(false)}
          />
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          {cartItems.length === 0 ? (
            <div
              style={{ textAlign: "center", color: "#888", marginTop: "60px" }}
            >
              <ShoppingCart
                size={48}
                style={{ opacity: 0.3, marginBottom: "12px" }}
              />
              <p>Your cart is empty</p>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  marginTop: "16px",
                  padding: "10px 20px",
                  background: "#006f1b",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={getId(item)}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "16px",
                  padding: "12px",
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: "14px" }}>
                    {item.name}
                  </p>
                  <p
                    style={{
                      margin: "2px 0 8px",
                      color: "#006f1b",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    {displayPrice(item.price)}
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <button
                      onClick={() => updateQuantity(getId(item), -1)}
                      style={{
                        width: "26px",
                        height: "26px",
                        background: "#f0f0f0",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span
                      style={{
                        fontWeight: 600,
                        minWidth: "20px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(getId(item), 1)}
                      style={{
                        width: "26px",
                        height: "26px",
                        background: "#f0f0f0",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <Trash2
                  size={18}
                  onClick={() => removeFromCart(getId(item))}
                  style={{ cursor: "pointer", color: "#ccc", flexShrink: 0 }}
                />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid #eee" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                marginBottom: "6px",
              }}
            >
              <span>Subtotal:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                marginBottom: "12px",
              }}
            >
              <span>Tax (8%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 700,
                fontSize: "16px",
                marginBottom: "16px",
              }}
            >
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              style={{
                width: "100%",
                padding: "14px",
                background: "#006f1b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "15px",
                cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Checkout →
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                width: "100%",
                padding: "10px",
                background: "transparent",
                color: "#555",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "14px",
                cursor: "pointer",
                marginTop: "8px",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;