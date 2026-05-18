import React, { useState, useEffect } from "react";
import {
  UserRound, Package, Settings, LogOut, ChevronRight, X, MapPin, Phone, Mail,
  Edit2, Check, Camera, Lock, Bell, Tag, Truck, ChevronDown, ChevronUp,
  ShoppingCart, Star, Clock, CheckCircle, AlertCircle,
} from "lucide-react";
import { useAuth }    from "../../context/AuthContext";
import { useOrders }  from "../../context/OrdersContext";
import { useRatings } from "../../context/RatingsContext";
import { useNavigate } from "@tanstack/react-router";

// ── Order tracking steps ──────────────────────────────────────────────────────
const TRACK_STEPS = ["Processing","Confirmed","Shipped","Out for Delivery","Delivered"];
const TRACK_ICONS = [<Clock size={15}/>,<CheckCircle size={15}/>,<Package size={15}/>,<Truck size={15}/>,<CheckCircle size={15}/>];

const TrackingBar = ({ status }) => {
  const idx = TRACK_STEPS.indexOf(status);
  const cancelled = status === "Cancelled";
  return (
    <div style={{ padding:"14px 0 8px" }}>
      {cancelled ? (
        <div style={{ display:"flex", alignItems:"center", gap:"8px", color:"#c62828", fontWeight:600, fontSize:"13px" }}>
          <AlertCircle size={16}/> Order Cancelled
        </div>
      ) : (
        <>
          <div style={{ display:"flex", alignItems:"flex-start", gap:0 }}>
            {TRACK_STEPS.map((step, i) => (
              <React.Fragment key={step}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex: i < TRACK_STEPS.length-1 ? "none" : "none", minWidth:"20px" }}>
                  <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:i<=idx?"#006f1b":"#e0e0e0", color:"white", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background 0.3s" }}>
                    {React.cloneElement(TRACK_ICONS[i], { size:13 })}
                  </div>
                  <p style={{ margin:"4px 0 0", fontSize:"9px", color:i<=idx?"#006f1b":"#aaa", textAlign:"center", fontWeight:i<=idx?700:400, maxWidth:"52px", lineHeight:1.3 }}>{step}</p>
                </div>
                {i < TRACK_STEPS.length-1 && (
                  <div style={{ flex:1, height:"3px", marginTop:"12px", background:i<idx?"#006f1b":"#e0e0e0", transition:"background 0.3s" }}/>
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ── Star rating input ─────────────────────────────────────────────────────────
const StarInput = ({ value, onChange }) => (
  <div style={{ display:"flex", gap:"4px" }}>
    {[1,2,3,4,5].map((s)=>(
      <span key={s} onClick={()=>onChange(s)} style={{ cursor:"pointer", fontSize:"24px", color:s<=value?"#f5a623":"#e0e0e0", transition:"color 0.15s" }}>★</span>
    ))}
  </div>
);

// ── Order card with tracking + rating ────────────────────────────────────────
const OrderCard = ({ order, currentUser, submitRating, getUserRating }) => {
  const [open,    setOpen]    = useState(false);
  const [rating,  setRating]  = useState(0);
  const [review,  setReview]  = useState("");
  const [submitted, setSubmitted] = useState(false);

  const existingRating = order.products?.[0]
    ? getUserRating(order.products[0].id || order.id, currentUser.id)
    : null;

  const STATUS_STYLE = {
    Delivered:         { bg:"#e8f5e9", color:"#2e7d32" },
    Processing:        { bg:"#fff3e0", color:"#e65100" },
    Shipped:           { bg:"#f3e5f5", color:"#6a1b9a" },
    Confirmed:         { bg:"#e3f2fd", color:"#1565c0" },
    "Out for Delivery":{ bg:"#e8eaf6", color:"#283593" },
    Cancelled:         { bg:"#ffebee", color:"#c62828" },
  };
  const sc = STATUS_STYLE[order.status] || { bg:"#f0f0f0", color:"#333" };

  const handleRatingSubmit = () => {
    if (!rating) return;
    submitRating({
      productId: order.id,           // use orderId as key
      userId:    currentUser.id,
      userName:  currentUser.name,
      rating,
      review,
    });
    setSubmitted(true);
  };

  return (
    <div style={{ border:"1px solid #eee", borderRadius:"12px", marginBottom:"12px", overflow:"hidden" }}>
      {/* Header row */}
      <div style={{ padding:"14px 16px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }} onClick={()=>setOpen(!open)}>
        <div>
          <p style={{ margin:0, fontWeight:700, fontSize:"14px" }}>{order.id}</p>
          <p style={{ margin:"3px 0 0", fontSize:"12px", color:"#888" }}>{order.date} · {order.items} item{order.items!==1?"s":""}</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ padding:"4px 10px", borderRadius:"20px", fontSize:"12px", fontWeight:600, background:sc.bg, color:sc.color }}>
            {order.status}
          </span>
          <span style={{ fontWeight:700, color:"#006f1b", fontSize:"14px" }}>{order.total}</span>
          {open ? <ChevronUp size={15} color="#aaa"/> : <ChevronDown size={15} color="#aaa"/>}
        </div>
      </div>

      {open && (
        <div style={{ borderTop:"1px solid #eee", padding:"16px", background:"#fafafa" }}>
          {/* Tracking bar */}
          <p style={{ margin:"0 0 6px", fontWeight:700, fontSize:"13px", color:"#555" }}>📍 Order Tracking</p>
          <TrackingBar status={order.status}/>

          {/* Products */}
          {order.products?.length > 0 && (
            <div style={{ marginTop:"16px" }}>
              <p style={{ margin:"0 0 8px", fontWeight:700, fontSize:"13px", color:"#555" }}>Items</p>
              {order.products.map((p,i)=>(
                <div key={i} style={{ display:"flex", gap:"10px", alignItems:"center", marginBottom:"8px" }}>
                  {p.image && <img src={p.image} alt={p.name} style={{ width:"40px", height:"40px", borderRadius:"6px", objectFit:"cover" }}/>}
                  <div>
                    <p style={{ margin:0, fontSize:"13px", fontWeight:600 }}>{p.name}</p>
                    <p style={{ margin:0, fontSize:"11px", color:"#888" }}>×{p.qty} · {p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Delivery address */}
          {order.address && (
            <div style={{ marginTop:"12px", padding:"10px 12px", background:"#f0f7f0", borderRadius:"8px", fontSize:"12px", color:"#555" }}>
              <MapPin size={12} style={{ marginRight:"4px", verticalAlign:"middle" }}/>
              {order.address.houseNo}, {order.address.street}, {order.address.city} - {order.address.pincode}
            </div>
          )}

          {/* Rating section — show only for delivered orders */}
          {order.status==="Delivered" && (
            <div style={{ marginTop:"16px", padding:"14px", background:"#fff", borderRadius:"8px", border:"1px solid #eee" }}>
              <p style={{ margin:"0 0 10px", fontWeight:700, fontSize:"13px", color:"#555" }}>⭐ Rate this Order</p>
              {submitted || existingRating ? (
                <div>
                  <div style={{ display:"flex", gap:"2px", marginBottom:"6px" }}>
                    {[1,2,3,4,5].map((s)=>(
                      <span key={s} style={{ color:s<=(submitted?rating:existingRating?.rating||0)?"#f5a623":"#e0e0e0", fontSize:"20px" }}>★</span>
                    ))}
                  </div>
                  <p style={{ margin:0, fontSize:"12px", color:"#006f1b", fontWeight:600 }}>✅ Thank you for your review!</p>
                </div>
              ) : (
                <div>
                  <StarInput value={rating} onChange={setRating}/>
                  <textarea
                    value={review}
                    onChange={(e)=>setReview(e.target.value)}
                    placeholder="Share your experience (optional)…"
                    rows={2}
                    style={{ width:"100%", marginTop:"10px", padding:"9px", border:"1px solid #ddd", borderRadius:"7px", fontSize:"13px", outline:"none", resize:"none", fontFamily:"'Poppins',sans-serif", boxSizing:"border-box" }}
                  />
                  <button onClick={handleRatingSubmit} disabled={!rating}
                    style={{ marginTop:"8px", padding:"8px 18px", background:rating?"#006f1b":"#ccc", color:"#fff", border:"none", borderRadius:"7px", cursor:rating?"pointer":"not-allowed", fontSize:"13px", fontWeight:600, fontFamily:"'Poppins',sans-serif" }}>
                    Submit Rating
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── Settings panel ────────────────────────────────────────────────────────────
const SettingsPanel = ({ user, onLogout }) => {
  const { updateProfile } = useAuth();
  const [section, setSection] = useState(null);
  const [pwForm,  setPwForm]  = useState({ current:"", newPw:"", confirm:"" });
  const [pwErr,   setPwErr]   = useState(""); const [pwOk, setPwOk] = useState(false);
  const [notifs,  setNotifs]  = useState(()=>{ try{ return JSON.parse(localStorage.getItem("vmart_notifs"))||{orders:true,offers:true,delivery:true}; }catch{ return {orders:true,offers:true,delivery:true}; } });

  const saveNotifs = (u) => { setNotifs(u); localStorage.setItem("vmart_notifs",JSON.stringify(u)); };

  const handlePwSubmit = () => {
    setPwErr("");
    const users = JSON.parse(localStorage.getItem("vmart_users")||"[]");
    const me    = users.find((u)=>u.id===user.id);
    if (!me || me.password!==pwForm.current) { setPwErr("Current password is incorrect"); return; }
    if (pwForm.newPw.length < 6)             { setPwErr("Min. 6 characters"); return; }
    if (pwForm.newPw!==pwForm.confirm)       { setPwErr("Passwords do not match"); return; }
    localStorage.setItem("vmart_users", JSON.stringify(users.map((u)=>u.id===user.id?{...u,password:pwForm.newPw}:u)));
    setPwOk(true); setPwForm({current:"",newPw:"",confirm:""}); setTimeout(()=>{setPwOk(false);setSection(null);},2000);
  };

  const Toggle = ({ label, icon, field }) => (
    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #f0f0f0" }}>
      <div style={{ display:"flex",alignItems:"center",gap:"10px" }}><div style={{ color:"#006f1b" }}>{icon}</div><span style={{ fontSize:"14px" }}>{label}</span></div>
      <div onClick={()=>saveNotifs({...notifs,[field]:!notifs[field]})} style={{ width:"42px",height:"24px",borderRadius:"12px",background:notifs[field]?"#006f1b":"#ddd",cursor:"pointer",position:"relative",transition:"background 0.2s" }}>
        <div style={{ position:"absolute",top:"3px",left:notifs[field]?"21px":"3px",width:"18px",height:"18px",borderRadius:"50%",background:"white",transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }}/>
      </div>
    </div>
  );

  const items = [{key:"password",label:"Change Password",icon:<Lock size={16}/>},{key:"notifications",label:"Notification Preferences",icon:<Bell size={16}/>}];
  return (
    <div>
      <h3 style={{ margin:"0 0 16px",fontSize:"14px",color:"#888",textTransform:"uppercase",letterSpacing:"0.5px" }}>Account Settings</h3>
      {items.map((item)=>(
        <div key={item.key}>
          <button onClick={()=>setSection(section===item.key?null:item.key)}
            style={{ width:"100%",padding:"14px 16px",background:section===item.key?"#f0f7f0":"#f9f9f9",border:"1px solid #eee",borderRadius:"8px",marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",fontSize:"14px",color:section===item.key?"#006f1b":"#333",fontFamily:"'Poppins',sans-serif",fontWeight:section===item.key?600:400 }}>
            <span style={{ display:"flex",alignItems:"center",gap:"10px" }}>{item.icon}{item.label}</span>
            {section===item.key?<ChevronUp size={16}/>:<ChevronDown size={16}/>}
          </button>
          {section==="password"&&item.key==="password"&&(
            <div style={{ background:"#f9f9f9",border:"1px solid #eee",borderRadius:"8px",padding:"16px",marginBottom:"8px" }}>
              {pwOk&&<p style={{ color:"#006f1b",fontWeight:600,marginBottom:"12px",fontSize:"13px" }}>✅ Password updated!</p>}
              {pwErr&&<p style={{ color:"#e53e3e",fontSize:"13px",marginBottom:"12px" }}>⚠️ {pwErr}</p>}
              {[{k:"current",ph:"Current password"},{k:"newPw",ph:"New password (min. 6)"},{k:"confirm",ph:"Confirm new password"}].map((f)=>(
                <input key={f.k} type="password" value={pwForm[f.k]} onChange={(e)=>setPwForm((p)=>({...p,[f.k]:e.target.value}))} placeholder={f.ph}
                  style={{ width:"100%",padding:"9px 12px",border:"1px solid #ddd",borderRadius:"6px",fontSize:"13px",outline:"none",boxSizing:"border-box",fontFamily:"'Poppins',sans-serif",marginBottom:"8px" }}/>
              ))}
              <button onClick={handlePwSubmit} style={{ padding:"8px 16px",background:"#006f1b",color:"white",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"13px",fontWeight:600,fontFamily:"'Poppins',sans-serif" }}>Update Password</button>
            </div>
          )}
          {section==="notifications"&&item.key==="notifications"&&(
            <div style={{ background:"#f9f9f9",border:"1px solid #eee",borderRadius:"8px",padding:"12px 16px",marginBottom:"8px" }}>
              <Toggle label="Order Updates"  icon={<Package size={16}/>} field="orders"/>
              <Toggle label="Offers & Deals" icon={<Tag     size={16}/>} field="offers"/>
              <Toggle label="Delivery Alerts"icon={<Truck   size={16}/>} field="delivery"/>
            </div>
          )}
        </div>
      ))}
      <button onClick={onLogout} style={{ width:"100%",padding:"12px",marginTop:"16px",background:"#fff0f0",color:"#c0392b",border:"1px solid #f5c6cb",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",fontFamily:"'Poppins',sans-serif" }}>
        <LogOut size={16}/> Sign Out
      </button>
    </div>
  );
};

const initials = (name="") => name.trim().split(" ").map((w)=>w[0]).slice(0,2).join("").toUpperCase()||"?";

// ── Main ──────────────────────────────────────────────────────────────────────
const ProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, logout, updateProfile } = useAuth();
  const { orders }                             = useOrders();
  const { submitRating, getUserRating }        = useRatings();
  const navigate                               = useNavigate();

  const [tab,     setTab]     = useState("profile");
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState({});
  const [saved,   setSaved]   = useState(false);

  useEffect(()=>{ if(isOpen&&currentUser) setDraft(currentUser); },[isOpen,currentUser]);
  if(!isOpen||!currentUser) return null;

  const handleSave   = ()=>{ updateProfile(draft); setEditing(false); setSaved(true); setTimeout(()=>setSaved(false),2000); };
  const handleLogout = ()=>{ logout(); onClose(); navigate({to:"/login"}); };
  const handleAvatar = (e)=>{ const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=(ev)=>setDraft((d)=>({...d,avatar:ev.target.result})); r.readAsDataURL(f); };

  const Field = ({ icon, label, field, type="text" }) => (
    <div style={{ display:"flex",gap:"12px",padding:"14px 0",borderBottom:"1px solid #f0f0f0",alignItems:"flex-start" }}>
      <div style={{ color:"#006f1b",marginTop:"2px",flexShrink:0 }}>{icon}</div>
      <div style={{ flex:1 }}>
        <p style={{ margin:0,fontSize:"11px",color:"#aaa",textTransform:"uppercase",letterSpacing:"0.5px" }}>{label}</p>
        {editing
          ? <input type={type} value={draft[field]||""} onChange={(e)=>setDraft((d)=>({...d,[field]:e.target.value}))} placeholder={`Enter ${label.toLowerCase()}`}
              style={{ marginTop:"4px",width:"100%",padding:"7px 10px",border:"1px solid #006f1b",borderRadius:"6px",fontSize:"14px",outline:"none",boxSizing:"border-box",fontFamily:"'Poppins',sans-serif" }}/>
          : <p style={{ margin:"2px 0 0",fontSize:"14px",color:draft[field]?"#333":"#bbb" }}>{draft[field]||`Add ${label.toLowerCase()}`}</p>
        }
      </div>
    </div>
  );

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:999 }}/>
      <div style={{ position:"fixed",top:0,right:0,bottom:0,width:"420px",maxWidth:"95vw",background:"#fff",boxShadow:"-4px 0 20px rgba(0,0,0,0.15)",zIndex:1000,display:"flex",flexDirection:"column",fontFamily:"'Poppins',sans-serif" }}>

        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#005b16,#006f1b)",padding:"24px 20px 20px",color:"white",position:"relative",flexShrink:0 }}>
          <X size={22} style={{ position:"absolute",top:"16px",right:"16px",cursor:"pointer" }} onClick={onClose}/>
          <div style={{ position:"relative",width:"68px",marginBottom:"12px" }}>
            <div style={{ width:"68px",height:"68px",borderRadius:"50%",background:"#4caf50",border:"3px solid rgba(255,255,255,0.35)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",fontWeight:700,overflow:"hidden" }}>
              {draft.avatar?<img src={draft.avatar} alt="av" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>:initials(currentUser.name)}
            </div>
            <label style={{ position:"absolute",bottom:0,right:0,background:"#fff",borderRadius:"50%",width:"22px",height:"22px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,0.3)" }}>
              <Camera size={13} color="#006f1b"/>
              <input type="file" accept="image/*" style={{ display:"none" }} onChange={handleAvatar}/>
            </label>
          </div>
          <h2 style={{ margin:"0 0 2px",fontSize:"18px" }}>{currentUser.name}</h2>
          <p style={{ margin:0,opacity:.75,fontSize:"13px" }}>{currentUser.email}</p>
          <p style={{ margin:"5px 0 0",opacity:.6,fontSize:"12px" }}>{orders.length} order{orders.length!==1?"s":""}</p>
          {saved&&<div style={{ position:"absolute",bottom:"10px",right:"16px",background:"rgba(255,255,255,0.2)",borderRadius:"20px",padding:"4px 12px",fontSize:"12px",display:"flex",alignItems:"center",gap:"5px" }}><Check size={13}/> Saved!</div>}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex",borderBottom:"1px solid #eee",background:"#f9f9f9",flexShrink:0 }}>
          {[
            { key:"profile",  label:"Profile",  icon:<UserRound size={14}/> },
            { key:"orders",   label:`Orders${orders.length?` (${orders.length})`:""}`, icon:<Package size={14}/> },
            { key:"settings", label:"Settings", icon:<Settings size={14}/> },
          ].map((t)=>(
            <button key={t.key} onClick={()=>setTab(t.key)}
              style={{ flex:1,padding:"12px 4px",background:"none",border:"none",borderBottom:tab===t.key?"2px solid #006f1b":"2px solid transparent",color:tab===t.key?"#006f1b":"#888",fontWeight:tab===t.key?600:400,cursor:"pointer",fontSize:"12px",display:"flex",alignItems:"center",justifyContent:"center",gap:"4px",fontFamily:"'Poppins',sans-serif" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex:1,padding:"20px",overflowY:"auto" }}>
          {tab==="profile"&&(
            <>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px" }}>
                <h3 style={{ margin:0,fontSize:"14px",color:"#888",textTransform:"uppercase",letterSpacing:"0.5px" }}>Personal Information</h3>
                {!editing
                  ?<button onClick={()=>setEditing(true)} style={{ display:"flex",alignItems:"center",gap:"5px",padding:"6px 12px",background:"#f0f7f0",color:"#006f1b",border:"1px solid #006f1b",borderRadius:"20px",cursor:"pointer",fontSize:"12px",fontWeight:600,fontFamily:"'Poppins',sans-serif" }}><Edit2 size={13}/> Edit</button>
                  :<div style={{ display:"flex",gap:"8px" }}>
                    <button onClick={()=>{setDraft(currentUser);setEditing(false);}} style={{ padding:"6px 12px",background:"#f5f5f5",color:"#555",border:"1px solid #ddd",borderRadius:"20px",cursor:"pointer",fontSize:"12px",fontFamily:"'Poppins',sans-serif" }}>Cancel</button>
                    <button onClick={handleSave} style={{ padding:"6px 12px",background:"#006f1b",color:"white",border:"none",borderRadius:"20px",cursor:"pointer",fontSize:"12px",fontWeight:600,fontFamily:"'Poppins',sans-serif",display:"flex",alignItems:"center",gap:"4px" }}><Check size={13}/> Save</button>
                  </div>
                }
              </div>
              <Field icon={<UserRound size={16}/>} label="Full Name" field="name"/>
              <Field icon={<Mail size={16}/>}      label="Email"     field="email" type="email"/>
              <Field icon={<Phone size={16}/>}     label="Phone"     field="phone" type="tel"/>
              <Field icon={<MapPin size={16}/>}    label="Address"   field="address"/>
            </>
          )}

          {tab==="orders"&&(
            <>
              <h3 style={{ margin:"0 0 16px",fontSize:"14px",color:"#888",textTransform:"uppercase",letterSpacing:"0.5px" }}>Order History & Tracking</h3>
              {orders.length===0
                ?<div style={{ textAlign:"center",padding:"40px 0",color:"#888" }}>
                  <ShoppingCart size={40} style={{ opacity:.2,marginBottom:"12px" }}/>
                  <p>No orders yet</p>
                </div>
                :orders.map((o)=>(
                  <OrderCard key={o.id} order={o} currentUser={currentUser} submitRating={submitRating} getUserRating={getUserRating}/>
                ))
              }
            </>
          )}

          {tab==="settings"&&(
            <SettingsPanel user={currentUser} onLogout={handleLogout}/>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileModal;