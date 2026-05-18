import React from "react";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const Wishlist = () => {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product); // remove from wishlist after adding to cart
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 999 }}
      />

      {/* Sidebar */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "360px", maxWidth: "95vw",
        background: "#fff", boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
        zIndex: 1000, display: "flex", flexDirection: "column",
        fontFamily: "'Poppins', sans-serif",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 20px", borderBottom: "1px solid #eee",
          background: "#c0392b", color: "white",
        }}>
          <h2 style={{ margin: 0, fontSize: "18px", display: "flex", gap: "8px", alignItems: "center" }}>
            <Heart size={20} fill="white" /> Wishlist
            {wishlistItems.length > 0 && (
              <span style={{
                background: "rgba(255,255,255,0.3)", borderRadius: "50%",
                width: "22px", height: "22px", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: 700,
              }}>
                {wishlistItems.length}
              </span>
            )}
          </h2>
          <X size={22} style={{ cursor: "pointer" }} onClick={() => setIsWishlistOpen(false)} />
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          {wishlistItems.length === 0 ? (
            <div style={{ textAlign: "center", color: "#888", marginTop: "60px" }}>
              <Heart size={48} style={{ opacity: 0.2, marginBottom: "12px" }} />
              <p>No items in your wishlist yet</p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                style={{
                  marginTop: "16px", padding: "10px 20px",
                  background: "#c0392b", color: "white",
                  border: "none", borderRadius: "6px", cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif", fontWeight: 600,
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div key={item.id} style={{
                display: "flex", gap: "12px", marginBottom: "16px",
                padding: "12px", border: "1px solid #eee",
                borderRadius: "8px", alignItems: "center",
              }}>
                <img src={item.image} alt={item.name} style={{
                  width: "70px", height: "70px", objectFit: "cover",
                  borderRadius: "8px", flexShrink: 0,
                }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: "14px" }}>{item.name}</p>
                  <p style={{ margin: "2px 0", color: "#888", fontSize: "12px" }}>{item.description}</p>
                  <p style={{ margin: "4px 0 8px", color: "#006f1b", fontWeight: 700, fontSize: "15px" }}>
                    {item.price}
                  </p>
                  {/* Move to Cart button */}
                  <button
                    onClick={() => handleMoveToCart(item)}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "6px 12px", background: "#006f1b",
                      color: "white", border: "none", borderRadius: "5px",
                      cursor: "pointer", fontSize: "12px", fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <ShoppingCart size={14} /> Add to Cart
                  </button>
                </div>
                {/* Remove from wishlist */}
                <Trash2
                  size={18}
                  onClick={() => toggleWishlist(item)}
                  style={{ cursor: "pointer", color: "#ccc", flexShrink: 0 }}
                />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid #eee" }}>
            <button
              onClick={() => {
                wishlistItems.forEach((item) => addToCart(item));
                wishlistItems.forEach((item) => toggleWishlist(item));
                setIsWishlistOpen(false);
              }}
              style={{
                width: "100%", padding: "14px",
                background: "#006f1b", color: "white",
                border: "none", borderRadius: "8px",
                fontWeight: 700, fontSize: "15px", cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Add All to Cart →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;