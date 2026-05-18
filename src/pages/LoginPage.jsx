import React, { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Mail, Lock, Eye, EyeOff, Leaf, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm]       = useState({ email: "", password: "" });
  const [errors, setErrors]   = useState({});
  const [apiErr, setApiErr]   = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const change = (f, v) => { setForm((p) => ({ ...p, [f]: v })); setErrors((p) => ({ ...p, [f]: "" })); setApiErr(""); };

  const validate = () => {
    const e = {};
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required";
    if (!form.password || form.password.length < 6)       e.password = "Minimum 6 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate network
    const res = login(form);
    setLoading(false);
    if (res.ok) navigate({ to: "/home" });
    else setApiErr(res.error);
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "12px 14px 12px 44px",
    border: errors[field] ? "1.5px solid #e53e3e" : "1.5px solid #e2e8f0",
    borderRadius: "10px", fontSize: "14px", outline: "none",
    fontFamily: "'Poppins', sans-serif", boxSizing: "border-box",
    background: errors[field] ? "#fff5f5" : "#fff",
    transition: "border 0.2s",
  });

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      background: "linear-gradient(135deg, #f0faf0 0%, #e8f5e9 60%, #fff 100%)",
      fontFamily: "'Poppins', sans-serif",
    }}>
      {/* Left panel */}
      <div style={{
        flex: 1, background: "#006f1b",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px", color: "#fff", position: "relative", overflow: "hidden",
      }} className="hide-mobile">
        {/* Decoration circles */}
        <div style={{ position:"absolute",top:"-60px",left:"-60px",width:"250px",height:"250px",borderRadius:"50%",background:"rgba(255,255,255,0.06)" }}/>
        <div style={{ position:"absolute",bottom:"-80px",right:"-40px",width:"300px",height:"300px",borderRadius:"50%",background:"rgba(255,255,255,0.05)" }}/>

        <div style={{ position:"relative" }}>
          <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"48px" }}>
            <div style={{ background:"#fff",color:"#006f1b",fontWeight:900,fontSize:"20px",width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center" }}>V</div>
            <span style={{ fontWeight:800,fontSize:"18px",letterSpacing:"1px" }}>V-MART ORGANIC</span>
          </div>
          <h1 style={{ fontSize:"38px",fontWeight:900,lineHeight:1.2,margin:"0 0 16px" }}>
            Welcome<br />Back! 👋
          </h1>
          <p style={{ opacity:.8,fontSize:"16px",lineHeight:1.7,maxWidth:"340px",margin:"0 0 40px" }}>
            Log back in to continue shopping the freshest organic produce delivered to your door.
          </p>
          {["40,000+ happy customers","400+ organic products","Free delivery on ₹500+","4.9★ rated service"].map((t) => (
            <div key={t} style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px" }}>
              <Leaf size={16} style={{ flexShrink:0 }}/> <span style={{ fontSize:"14px",opacity:.9 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"40px",maxWidth:"520px",margin:"0 auto",width:"100%" }}>
        <button onClick={() => navigate({ to: "/" })}
          style={{ display:"flex",alignItems:"center",gap:"6px",background:"none",border:"none",color:"#006f1b",cursor:"pointer",fontWeight:600,fontSize:"14px",marginBottom:"40px",fontFamily:"'Poppins',sans-serif" }}>
          <ArrowLeft size={16}/> Back to Home
        </button>

        <h2 style={{ fontSize:"28px",fontWeight:800,color:"#1a1a1a",margin:"0 0 6px" }}>Sign in</h2>
        <p style={{ color:"#888",margin:"0 0 32px",fontSize:"14px" }}>
          Don't have an account?&nbsp;
          <span onClick={() => navigate({ to:"/register" })} style={{ color:"#006f1b",fontWeight:700,cursor:"pointer" }}>Register free</span>
        </p>

        {/* API error banner */}
        {apiErr && (
          <div style={{ background:"#fff5f5",border:"1px solid #fed7d7",color:"#c53030",padding:"12px 16px",borderRadius:"8px",fontSize:"13px",marginBottom:"20px" }}>
            ⚠️ {apiErr}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom:"18px" }}>
            <label style={{ display:"block",fontSize:"13px",fontWeight:600,color:"#333",marginBottom:"6px" }}>Email Address</label>
            <div style={{ position:"relative" }}>
              <Mail size={16} style={{ position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)",color:"#aaa" }}/>
              <input type="email" value={form.email} onChange={(e) => change("email", e.target.value)}
                placeholder="you@email.com" style={inputStyle("email")} />
            </div>
            {errors.email && <p style={{ color:"#e53e3e",fontSize:"11px",margin:"4px 0 0" }}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div style={{ marginBottom:"10px" }}>
            <label style={{ display:"block",fontSize:"13px",fontWeight:600,color:"#333",marginBottom:"6px" }}>Password</label>
            <div style={{ position:"relative" }}>
              <Lock size={16} style={{ position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)",color:"#aaa" }}/>
              <input type={showPass ? "text":"password"} value={form.password} onChange={(e) => change("password", e.target.value)}
                placeholder="Your password" style={{ ...inputStyle("password"), paddingRight:"44px" }} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#aaa",padding:0 }}>
                {showPass ? <EyeOff size={17}/> : <Eye size={17}/>}
              </button>
            </div>
            {errors.password && <p style={{ color:"#e53e3e",fontSize:"11px",margin:"4px 0 0" }}>{errors.password}</p>}
          </div>

          <p style={{ textAlign:"right",margin:"0 0 28px" }}>
            <span style={{ fontSize:"13px",color:"#006f1b",fontWeight:600,cursor:"pointer" }}>Forgot password?</span>
          </p>

          <button type="submit" disabled={loading}
            style={{
              width:"100%",padding:"14px",background: loading?"#4caf50":"#006f1b",
              color:"#fff",border:"none",borderRadius:"10px",
              fontWeight:700,fontSize:"16px",cursor: loading?"not-allowed":"pointer",
              fontFamily:"'Poppins',sans-serif",transition:"background 0.2s",
            }}>
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        <p style={{ textAlign:"center",color:"#aaa",fontSize:"12px",marginTop:"32px" }}>
          By signing in you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginPage;