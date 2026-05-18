import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Leaf, ShoppingBag, Star, Truck, Shield, ChevronRight } from "lucide-react";

const features = [
  { icon: "🌿", title: "100% Organic",    desc: "Certified fresh from trusted farms" },
  { icon: "🚚", title: "Free Delivery",   desc: "On all orders above ₹500" },
  { icon: "⭐", title: "4.9 Rated",       desc: "Loved by 40,000+ customers" },
  { icon: "🔒", title: "Secure Payment",  desc: "Safe & encrypted checkout" },
];

const testimonials = [
  { name: "Priya R.",   city: "Chennai",   text: "Freshest veggies I've ever had! Delivered right on time.", rating: 5 },
  { name: "Karthik S.", city: "Bangalore", text: "V-Mart changed how I shop for groceries. Amazing quality!", rating: 5 },
  { name: "Meena V.",   city: "Coimbatore",text: "Love the variety. Everything is so fresh and well packed.", rating: 5 },
];

const WelcomePage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 60px", boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ background: "#006f1b", color: "#fff", fontWeight: 900, fontSize: "22px", width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>V</div>
          <div>
            <span style={{ fontWeight: 800, fontSize: "16px", color: "#006f1b", letterSpacing: "1px" }}>V-MART</span>
            <p style={{ margin: 0, fontSize: "10px", color: "#888", letterSpacing: "2px" }}>ORGANIC FOOD</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => navigate({ to: "/login" })}
            style={{ padding: "9px 22px", background: "transparent", color: "#006f1b", border: "2px solid #006f1b", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "14px", fontFamily: "'Poppins',sans-serif" }}>
            Login
          </button>
          <button onClick={() => navigate({ to: "/register" })}
            style={{ padding: "9px 22px", background: "#006f1b", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "14px", fontFamily: "'Poppins',sans-serif" }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", background: "linear-gradient(135deg, #f0faf0 0%, #e8f5e9 40%, #fff 100%)",
        display: "flex", alignItems: "center",
        padding: "100px 60px 60px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background decorations */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(0,111,27,0.07)" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "40%", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(76,175,80,0.08)" }} />

        <div style={{ flex: 1, maxWidth: "600px", position: "relative" }}>
          <div style={{ ...fade(0), display: "inline-flex", alignItems: "center", gap: "8px", background: "#e8f5e9", color: "#006f1b", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, marginBottom: "24px" }}>
            <Leaf size={14} /> 100% Certified Organic
          </div>
          <h1 style={{ ...fade(0.1), fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 900, color: "#1a1a1a", lineHeight: 1.15, margin: "0 0 20px" }}>
            Fresh Organic<br />
            <span style={{ color: "#006f1b" }}>Delivered to</span><br />
            Your Door
          </h1>
          <p style={{ ...fade(0.2), fontSize: "17px", color: "#555", lineHeight: 1.7, margin: "0 0 36px", maxWidth: "480px" }}>
            Shop 400+ certified organic fruits & vegetables. From farm to your table — fresh, healthy, and delivered fast.
          </p>
          <div style={{ ...fade(0.3), display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <button onClick={() => navigate({ to: "/register" })}
              style={{
                padding: "15px 32px", background: "#006f1b", color: "#fff",
                border: "none", borderRadius: "10px", fontWeight: 700,
                fontSize: "16px", cursor: "pointer", fontFamily: "'Poppins',sans-serif",
                display: "flex", alignItems: "center", gap: "8px",
                boxShadow: "0 8px 24px rgba(0,111,27,0.3)",
              }}>
              <ShoppingBag size={18} /> Start Shopping
            </button>
            <button onClick={() => navigate({ to: "/login" })}
              style={{
                padding: "15px 28px", background: "#fff", color: "#333",
                border: "2px solid #eee", borderRadius: "10px", fontWeight: 600,
                fontSize: "16px", cursor: "pointer", fontFamily: "'Poppins',sans-serif",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
              Login <ChevronRight size={16} />
            </button>
          </div>

          {/* Stats row */}
          <div style={{ ...fade(0.4), display: "flex", gap: "32px", marginTop: "48px" }}>
            {[["40K+", "Customers"], ["400+", "Products"], ["4.9★", "Rating"]].map(([val, lbl]) => (
              <div key={lbl}>
                <p style={{ margin: 0, fontWeight: 800, fontSize: "22px", color: "#006f1b" }}>{val}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>{lbl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div style={{ ...fade(0.15), flex: 1, display: "flex", justifyContent: "center", maxWidth: "520px" }}>
          <img
            src="https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg"
            alt="Fresh Vegetables"
            style={{ width: "100%", maxWidth: "480px", borderRadius: "24px", boxShadow: "0 30px 80px rgba(0,0,0,0.15)", objectFit: "cover", aspectRatio: "4/3" }}
          />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "80px 60px", background: "#006f1b" }}>
        <h2 style={{ textAlign: "center", color: "#fff", fontSize: "32px", fontWeight: 800, margin: "0 0 48px" }}>
          Why Choose V-Mart?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", maxWidth: "1000px", margin: "0 auto" }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: "rgba(255,255,255,0.1)", borderRadius: "16px",
              padding: "28px 24px", textAlign: "center", backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>{f.icon}</div>
              <h3 style={{ margin: "0 0 8px", color: "#fff", fontSize: "17px", fontWeight: 700 }}>{f.title}</h3>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: "13px" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 60px", background: "#f9fdf9" }}>
        <h2 style={{ textAlign: "center", fontSize: "32px", fontWeight: 800, color: "#1a1a1a", margin: "0 0 12px" }}>
          Loved by Customers
        </h2>
        <p style={{ textAlign: "center", color: "#888", margin: "0 0 48px" }}>
          Real reviews from real shoppers
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", maxWidth: "900px", margin: "0 auto" }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{
              background: "#fff", borderRadius: "16px", padding: "28px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "14px" }}>
                {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={16} fill="#f5a623" color="#f5a623" />)}
              </div>
              <p style={{ margin: "0 0 16px", color: "#333", fontSize: "14px", lineHeight: 1.7 }}>"{t.text}"</p>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "14px", color: "#1a1a1a" }}>{t.name}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>{t.city}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "80px 60px", textAlign: "center",
        background: "linear-gradient(135deg, #005b16, #006f1b)",
      }}>
        <h2 style={{ color: "#fff", fontSize: "36px", fontWeight: 900, margin: "0 0 16px" }}>
          Ready to Eat Fresh? 🥗
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "17px", margin: "0 0 36px" }}>
          Create your free account and start your organic journey today.
        </p>
        <button onClick={() => navigate({ to: "/register" })}
          style={{
            padding: "16px 40px", background: "#fff", color: "#006f1b",
            border: "none", borderRadius: "12px", fontWeight: 800,
            fontSize: "17px", cursor: "pointer", fontFamily: "'Poppins',sans-serif",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          }}>
          Create Free Account →
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#111", color: "#888", textAlign: "center", padding: "24px", fontSize: "13px" }}>
        © 2026 V-Mart Organic Food · Built with ❤️ for healthy living
      </footer>
    </div>
  );
};

export default WelcomePage;