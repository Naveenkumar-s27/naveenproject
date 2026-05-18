import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// ✅ CRITICAL FIX: Field is defined OUTSIDE RegisterPage.
// If Field is defined inside RegisterPage, React treats it as a brand-new
// component on every render → unmounts + remounts the <input> → focus lost.
// Defined outside = same component reference every render = no focus loss.

const Field = ({ icon, label, field, type, placeholder, required, value, error, touched, onChange, onBlur }) => {
  const isValid = touched && !error && value;
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "6px" }}>
        {label}
        {required ? <span style={{ color: "#e53e3e" }}> *</span> : <span style={{ color: "#aaa", fontWeight: 400 }}> (optional)</span>}
      </label>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: error ? "#e53e3e" : "#aaa", pointerEvents: "none" }}>
          {icon}
        </div>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(field, e.target.value)}
          onBlur={() => onBlur(field)}
          autoComplete={
            field === "name" ? "name" :
            field === "email" ? "email" :
            field === "phone" ? "tel" :
            "off"
          }
          inputMode={field === "phone" ? "numeric" : undefined}
          maxLength={field === "phone" ? 10 : undefined}
          style={{
            width: "100%",
            padding: "12px 14px 12px 44px",
            border: error
              ? "1.5px solid #e53e3e"
              : isValid
              ? "1.5px solid #38a169"
              : "1.5px solid #e2e8f0",
            borderRadius: "10px",
            fontSize: "15px",
            outline: "none",
            fontFamily: "'Poppins', sans-serif",
            boxSizing: "border-box",
            background: error ? "#fff5f5" : "#fff",
            transition: "border 0.2s",
          }}
        />
      </div>
      {error && <p style={{ color: "#e53e3e", fontSize: "11px", margin: "4px 0 0" }}>{error}</p>}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const RegisterPage = () => {
  const navigate     = useNavigate();
  const { register } = useAuth();

  const [form,     setForm]     = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [touched,  setTouched]  = useState({});
  const [apiErr,   setApiErr]   = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);

  // Validate on blur only
  const getError = (field) => {
    if (!touched[field]) return "";
    if (field === "name"     && form.name.trim().length < 2)                         return "Enter your full name";
    if (field === "email"    && (!form.email.trim() || !form.email.includes("@")))   return "Valid email required";
    if (field === "phone"    && form.phone && form.phone.replace(/\D/g, "").length < 10) return "Enter valid 10-digit number";
    if (field === "password" && form.password.length < 6)                            return "Minimum 6 characters";
    if (field === "confirm"  && form.confirm !== form.password)                      return "Passwords do not match";
    return "";
  };

  const handleChange = (field, val) => {
    if (field === "phone") val = val.replace(/\D/g, "").slice(0, 10);
    setForm((p) => ({ ...p, [field]: val }));
    setApiErr("");
  };

  const handleBlur = (field) => setTouched((p) => ({ ...p, [field]: true }));

  // Password strength
  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6)              s++;
    if (p.length >= 10)             s++;
    if (/[A-Z]/.test(p))           s++;
    if (/[0-9]/.test(p))           s++;
    if (/[^A-Za-z0-9]/.test(p))   s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"][strength] || "";
  const strengthColor = ["", "#e53e3e", "#f5a623", "#ecc94b", "#38a169", "#006f1b"][strength] || "#ccc";

  const isValid = () =>
    form.name.trim().length >= 2 &&
    form.email.includes("@") &&
    form.password.length >= 6 &&
    form.confirm === form.password &&
    (!form.phone || form.phone.length === 10);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setTouched({ name: true, email: true, phone: true, password: true, confirm: true });
    if (!isValid()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const res = register({ name: form.name.trim(), email: form.email.trim(), password: form.password, phone: form.phone });
    setLoading(false);
    if (res.ok) navigate({ to: "/home" });
    else setApiErr(res.error);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "linear-gradient(135deg,#f0faf0 0%,#e8f5e9 60%,#fff 100%)", fontFamily: "'Poppins', sans-serif" }}>

      {/* Left green panel */}
      <div style={{ flex: 1, background: "#005b16", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-40px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "48px" }}>
            <div style={{ background: "#fff", color: "#006f1b", fontWeight: 900, fontSize: "20px", width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>V</div>
            <span style={{ fontWeight: 800, fontSize: "18px", letterSpacing: "1px" }}>V-MART ORGANIC</span>
          </div>
          <h1 style={{ fontSize: "38px", fontWeight: 900, lineHeight: 1.2, margin: "0 0 16px" }}>Join the<br />V-Mart<br />Family! 🌿</h1>
          <p style={{ opacity: .8, fontSize: "15px", lineHeight: 1.7, maxWidth: "320px", margin: "0 0 36px" }}>
            Create your free account and enjoy fresh organic produce delivered to your doorstep.
          </p>
          {["Free account, no hidden fees", "Exclusive member discounts", "Track orders in real-time", "Early access to new products"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <CheckCircle size={16} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "14px", opacity: .9 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px", maxWidth: "520px", margin: "0 auto", width: "100%", overflowY: "auto" }}>
        <button onClick={() => navigate({ to: "/" })}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#006f1b", cursor: "pointer", fontWeight: 600, fontSize: "14px", marginBottom: "32px", fontFamily: "'Poppins', sans-serif" }}>
          <ArrowLeft size={16} /> Back
        </button>

        <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#1a1a1a", margin: "0 0 6px" }}>Create Account</h2>
        <p style={{ color: "#888", margin: "0 0 28px", fontSize: "14px" }}>
          Already have an account?&nbsp;
          <span onClick={() => navigate({ to: "/login" })} style={{ color: "#006f1b", fontWeight: 700, cursor: "pointer" }}>Sign in</span>
        </p>

        {apiErr && (
          <div style={{ background: "#fff5f5", border: "1px solid #fed7d7", color: "#c53030", padding: "12px 16px", borderRadius: "8px", fontSize: "13px", marginBottom: "20px" }}>
            ⚠️ {apiErr}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          {/* These use the outer Field component — no focus loss */}
          <Field icon={<User  size={16} />} label="Full Name"    field="name"  type="text" placeholder="Your full name"   required value={form.name}  error={getError("name")}  touched={touched.name}  onChange={handleChange} onBlur={handleBlur} />
          <Field icon={<Mail  size={16} />} label="Email"        field="email" type="email" placeholder="you@email.com"  required value={form.email} error={getError("email")} touched={touched.email} onChange={handleChange} onBlur={handleBlur} />
          <Field icon={<Phone size={16} />} label="Phone Number" field="phone" type="tel"  placeholder="10-digit number" required={false} value={form.phone} error={getError("phone")} touched={touched.phone} onChange={handleChange} onBlur={handleBlur} />

          {/* Password (custom — needs show/hide button) */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "6px" }}>
              Password <span style={{ color: "#e53e3e" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: getError("password") ? "#e53e3e" : "#aaa" }} />
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                placeholder="Min. 6 characters"
                autoComplete="new-password"
                style={{
                  width: "100%", padding: "12px 44px",
                  border: getError("password") ? "1.5px solid #e53e3e" : touched.password && form.password.length >= 6 ? "1.5px solid #38a169" : "1.5px solid #e2e8f0",
                  borderRadius: "10px", fontSize: "15px", outline: "none",
                  fontFamily: "'Poppins', sans-serif", boxSizing: "border-box",
                  background: getError("password") ? "#fff5f5" : "#fff", transition: "border 0.2s",
                }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 0 }}>
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {/* Strength bar */}
            {form.password && (
              <div style={{ marginTop: "8px" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} style={{ flex: 1, height: "4px", borderRadius: "2px", background: i <= strength ? strengthColor : "#eee", transition: "background 0.3s" }} />
                  ))}
                </div>
                <p style={{ margin: "4px 0 0", fontSize: "11px", color: strengthColor, fontWeight: 600 }}>{strengthLabel}</p>
              </div>
            )}
            {getError("password") && <p style={{ color: "#e53e3e", fontSize: "11px", margin: "4px 0 0" }}>{getError("password")}</p>}
          </div>

          {/* Confirm password */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "6px" }}>
              Confirm Password <span style={{ color: "#e53e3e" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: getError("confirm") ? "#e53e3e" : "#aaa" }} />
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => handleChange("confirm", e.target.value)}
                onBlur={() => handleBlur("confirm")}
                placeholder="Re-enter password"
                autoComplete="new-password"
                style={{
                  width: "100%", padding: "12px 44px",
                  border: getError("confirm") ? "1.5px solid #e53e3e" : touched.confirm && form.confirm && form.confirm === form.password ? "1.5px solid #38a169" : "1.5px solid #e2e8f0",
                  borderRadius: "10px", fontSize: "15px", outline: "none",
                  fontFamily: "'Poppins', sans-serif", boxSizing: "border-box", transition: "border 0.2s",
                }}
              />
              {touched.confirm && form.confirm && form.confirm === form.password && (
                <CheckCircle size={16} color="#38a169" style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }} />
              )}
            </div>
            {getError("confirm") && <p style={{ color: "#e53e3e", fontSize: "11px", margin: "4px 0 0" }}>{getError("confirm")}</p>}
          </div>

          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "14px", background: loading ? "#4caf50" : "#006f1b", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "16px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Poppins', sans-serif", transition: "background 0.2s" }}>
            {loading ? "Creating account…" : "Create Account →"}
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#aaa", fontSize: "12px", marginTop: "24px" }}>
          By registering you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;