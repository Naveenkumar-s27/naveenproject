import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const AdminLogin = () => {
  const navigate    = useNavigate();
  const { adminLogin } = useAdmin();
  const [form,     setForm]     = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const res = adminLogin(form);
    setLoading(false);
    if (res.ok) navigate({ to: "/admin/dashboard" });
    else setError(res.error);
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#0a2e0a,#005b16,#006f1b)", fontFamily:"'Poppins',sans-serif" }}>
      <div style={{ width:"420px", maxWidth:"95vw", background:"#fff", borderRadius:"20px", padding:"44px 40px", boxShadow:"0 30px 80px rgba(0,0,0,0.35)" }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <div style={{ width:"56px", height:"56px", background:"#006f1b", borderRadius:"14px", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", boxShadow:"0 8px 24px rgba(0,111,27,0.3)" }}>
            <ShieldCheck size={28} color="#fff"/>
          </div>
          <h1 style={{ margin:0, fontSize:"22px", fontWeight:800, color:"#1a1a1a" }}>Admin Portal</h1>
          <p style={{ margin:"6px 0 0", color:"#888", fontSize:"13px" }}>V-Mart Business Dashboard</p>
        </div>

        {error && (
          <div style={{ background:"#fff5f5", border:"1px solid #fed7d7", color:"#c53030", padding:"11px 14px", borderRadius:"8px", fontSize:"13px", marginBottom:"20px" }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom:"16px" }}>
            <label style={{ display:"block", fontSize:"13px", fontWeight:600, color:"#333", marginBottom:"6px" }}>Admin Email</label>
            <div style={{ position:"relative" }}>
              <Mail size={16} style={{ position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)", color:"#aaa" }}/>
              <input type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}
                placeholder="admin@vmart.com"
                style={{ width:"100%", padding:"12px 14px 12px 42px", border:"1.5px solid #e2e8f0", borderRadius:"10px", fontSize:"14px", outline:"none", fontFamily:"'Poppins',sans-serif", boxSizing:"border-box" }}/>
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom:"28px" }}>
            <label style={{ display:"block", fontSize:"13px", fontWeight:600, color:"#333", marginBottom:"6px" }}>Password</label>
            <div style={{ position:"relative" }}>
              <Lock size={16} style={{ position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)", color:"#aaa" }}/>
              <input type={showPass?"text":"password"} value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}
                placeholder="Admin password"
                style={{ width:"100%", padding:"12px 44px 12px 42px", border:"1.5px solid #e2e8f0", borderRadius:"10px", fontSize:"14px", outline:"none", fontFamily:"'Poppins',sans-serif", boxSizing:"border-box" }}/>
              <button type="button" onClick={()=>setShowPass(!showPass)}
                style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#aaa", padding:0 }}>
                {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
            <p style={{ margin:"6px 0 0", fontSize:"11px", color:"#aaa" }}>Default: admin@vmart.com / admin123</p>
          </div>

          <button type="submit" disabled={loading}
            style={{ width:"100%", padding:"14px", background:loading?"#4caf50":"#006f1b", color:"#fff", border:"none", borderRadius:"10px", fontWeight:700, fontSize:"15px", cursor:loading?"not-allowed":"pointer", fontFamily:"'Poppins',sans-serif" }}>
            {loading ? "Signing in…" : "Sign In as Admin →"}
          </button>
        </form>

        <p style={{ textAlign:"center", marginTop:"20px", fontSize:"12px", color:"#aaa" }}>
          <span onClick={()=>navigate({to:"/"})} style={{ color:"#006f1b", cursor:"pointer", fontWeight:600 }}>← Back to Store</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;