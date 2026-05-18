import React, { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ShoppingBag, Users, TrendingUp, Package, LogOut, ChevronDown,
  ChevronUp, Search, RefreshCw, ShieldCheck, Star, BarChart2,
  Clock, CheckCircle, Truck, AlertCircle, X,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { useRatings } from "../context/RatingsContext";

// ── Status badge ─────────────────────────────────────────────────────────────
const STATUS_OPTIONS = ["Processing", "Confirmed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];
const STATUS_COLOR = {
  Processing:       { bg:"#fff3e0", color:"#e65100", icon:<Clock size={13}/> },
  Confirmed:        { bg:"#e3f2fd", color:"#1565c0", icon:<CheckCircle size={13}/> },
  Shipped:          { bg:"#f3e5f5", color:"#6a1b9a", icon:<Package size={13}/> },
  "Out for Delivery":{ bg:"#e8eaf6", color:"#283593", icon:<Truck size={13}/> },
  Delivered:        { bg:"#e8f5e9", color:"#2e7d32", icon:<CheckCircle size={13}/> },
  Cancelled:        { bg:"#ffebee", color:"#c62828", icon:<X size={13}/> },
};
const Badge = ({ status }) => {
  const s = STATUS_COLOR[status] || { bg:"#f0f0f0", color:"#555", icon:null };
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", padding:"4px 10px", borderRadius:"20px", fontSize:"12px", fontWeight:600, background:s.bg, color:s.color }}>
      {s.icon} {status}
    </span>
  );
};

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon, color }) => (
  <div style={{ background:"#fff", borderRadius:"14px", padding:"20px 22px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
    <div>
      <p style={{ margin:"0 0 4px", fontSize:"13px", color:"#888" }}>{label}</p>
      <p style={{ margin:"0 0 2px", fontSize:"26px", fontWeight:800, color:"#1a1a1a" }}>{value}</p>
      {sub && <p style={{ margin:0, fontSize:"12px", color:color||"#006f1b" }}>{sub}</p>}
    </div>
    <div style={{ width:"48px", height:"48px", borderRadius:"12px", background:`${color||"#006f1b"}18`, display:"flex", alignItems:"center", justifyContent:"center" }}>
      {React.cloneElement(icon, { color: color||"#006f1b" })}
    </div>
  </div>
);

// ── Order row ─────────────────────────────────────────────────────────────────
const OrderRow = ({ order, onStatusChange }) => {
  const [open, setOpen]         = useState(false);
  const [editing, setEditing]   = useState(false);
  const [newStatus, setNewStatus] = useState(order.status);

  const handleSave = () => {
    onStatusChange(order.customerId, order.id, newStatus);
    setEditing(false);
    order.status = newStatus; // local update for instant UI
  };

  return (
    <>
      <tr style={{ borderBottom:"1px solid #f0f0f0", cursor:"pointer" }} onClick={()=>setOpen(!open)}>
        <td style={td}>{order.id}</td>
        <td style={td}>
          <div style={{ fontWeight:600, fontSize:"13px" }}>{order.customerName}</div>
          <div style={{ fontSize:"11px", color:"#888" }}>{order.customerEmail}</div>
        </td>
        <td style={td}>{order.date}</td>
        <td style={td}><Badge status={order.status}/></td>
        <td style={{ ...td, fontWeight:700, color:"#006f1b" }}>{order.total}</td>
        <td style={td}>{order.items} item{order.items!==1?"s":""}</td>
        <td style={{ ...td, textAlign:"right" }}>{open ? <ChevronUp size={16} color="#aaa"/> : <ChevronDown size={16} color="#aaa"/>}</td>
      </tr>

      {open && (
        <tr>
          <td colSpan={7} style={{ background:"#fafafa", padding:"16px 20px", borderBottom:"1px solid #eee" }}>
            <div style={{ display:"flex", gap:"24px", flexWrap:"wrap" }}>
              {/* Products */}
              <div style={{ flex:1 }}>
                <p style={{ margin:"0 0 10px", fontWeight:700, fontSize:"13px", color:"#555" }}>Products Ordered</p>
                {(order.products||[]).map((p,i)=>(
                  <div key={i} style={{ display:"flex", gap:"10px", alignItems:"center", marginBottom:"8px" }}>
                    {p.image && <img src={p.image} alt={p.name} style={{ width:"36px", height:"36px", borderRadius:"6px", objectFit:"cover" }}/>}
                    <div>
                      <p style={{ margin:0, fontSize:"13px", fontWeight:600 }}>{p.name}</p>
                      <p style={{ margin:0, fontSize:"11px", color:"#888" }}>×{p.qty} · {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery address */}
              {order.address && (
                <div style={{ flex:1 }}>
                  <p style={{ margin:"0 0 10px", fontWeight:700, fontSize:"13px", color:"#555" }}>Delivery Address</p>
                  <p style={{ margin:0, fontSize:"13px", color:"#333", lineHeight:1.7 }}>
                    {order.address.name}<br/>
                    {order.address.phone}<br/>
                    {order.address.houseNo}, {order.address.street}<br/>
                    {order.address.city}, {order.address.state} - {order.address.pincode}
                  </p>
                </div>
              )}

              {/* Status update */}
              <div style={{ minWidth:"200px" }}>
                <p style={{ margin:"0 0 10px", fontWeight:700, fontSize:"13px", color:"#555" }}>Update Status</p>
                {editing ? (
                  <div>
                    <select value={newStatus} onChange={(e)=>setNewStatus(e.target.value)}
                      style={{ width:"100%", padding:"8px 10px", border:"1px solid #006f1b", borderRadius:"7px", fontSize:"13px", marginBottom:"8px", fontFamily:"'Poppins',sans-serif", outline:"none" }}>
                      {STATUS_OPTIONS.map((s)=><option key={s}>{s}</option>)}
                    </select>
                    <div style={{ display:"flex", gap:"8px" }}>
                      <button onClick={(e)=>{ e.stopPropagation(); handleSave(); }}
                        style={{ flex:1, padding:"7px", background:"#006f1b", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer", fontSize:"13px", fontWeight:600, fontFamily:"'Poppins',sans-serif" }}>
                        Save
                      </button>
                      <button onClick={(e)=>{ e.stopPropagation(); setEditing(false); }}
                        style={{ flex:1, padding:"7px", background:"#f0f0f0", color:"#555", border:"none", borderRadius:"6px", cursor:"pointer", fontSize:"13px", fontFamily:"'Poppins',sans-serif" }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={(e)=>{ e.stopPropagation(); setEditing(true); }}
                    style={{ width:"100%", padding:"8px", background:"#f0f7f0", color:"#006f1b", border:"1px solid #006f1b", borderRadius:"7px", cursor:"pointer", fontSize:"13px", fontWeight:600, fontFamily:"'Poppins',sans-serif" }}>
                    Change Status
                  </button>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
const td = { padding:"14px 16px", fontSize:"13px", color:"#333", verticalAlign:"middle" };

// ── Main Dashboard ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate                      = useNavigate();
  const { admin, adminLogout, getAllOrders, getAllUsers, updateOrderStatus } = useAdmin();
  const { getAllRatings }              = useRatings();

  const [tab,       setTab]     = useState("orders");  // orders | customers | ratings
  const [search,    setSearch]  = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [refreshKey,   setRefreshKey]   = useState(0);

  // Redirect if not logged in
  if (!admin) { navigate({ to:"/admin" }); return null; }

  // Fresh data on each refresh
  const allOrders  = useMemo(() => getAllOrders(),  [refreshKey]);
  const allUsers   = useMemo(() => getAllUsers(),   [refreshKey]);
  const allRatings = useMemo(() => getAllRatings(), [refreshKey]);

  // Stats
  const totalRevenue = allOrders.reduce((s, o) => s + parseFloat(o.total.replace("$","")||0), 0);
  const deliveredCount = allOrders.filter((o)=>o.status==="Delivered").length;

  const filteredOrders = allOrders.filter((o) => {
    const matchSearch = !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter==="All" || o.status===statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (custId, orderId, status) => {
    updateOrderStatus(custId, orderId, status);
    setRefreshKey((k)=>k+1);
  };

  const NavBtn = ({ id, label, icon }) => (
    <button onClick={()=>setTab(id)}
      style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 16px", background:tab===id?"#006f1b":"transparent", color:tab===id?"#fff":"#555", border:"none", borderRadius:"8px", cursor:"pointer", fontSize:"14px", fontWeight:tab===id?600:400, fontFamily:"'Poppins',sans-serif", width:"100%" }}>
      {icon} {label}
    </button>
  );

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Poppins',sans-serif", background:"#f5f6fa" }}>

      {/* ── Sidebar ── */}
      <div style={{ width:"230px", background:"#fff", borderRight:"1px solid #eee", display:"flex", flexDirection:"column", padding:"24px 16px", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"32px", padding:"0 4px" }}>
          <ShieldCheck size={22} color="#006f1b"/>
          <div>
            <p style={{ margin:0, fontWeight:800, fontSize:"14px", color:"#006f1b" }}>V-MART Admin</p>
            <p style={{ margin:0, fontSize:"11px", color:"#888" }}>{admin.role}</p>
          </div>
        </div>

        <nav style={{ flex:1, display:"flex", flexDirection:"column", gap:"4px" }}>
          <NavBtn id="overview"   label="Overview"   icon={<BarChart2 size={16}/>}/>
          <NavBtn id="orders"     label="Orders"     icon={<Package   size={16}/>}/>
          <NavBtn id="customers"  label="Customers"  icon={<Users     size={16}/>}/>
          <NavBtn id="ratings"    label="Ratings"    icon={<Star      size={16}/>}/>
        </nav>

        <div style={{ borderTop:"1px solid #eee", paddingTop:"16px" }}>
          <p style={{ margin:"0 0 8px", fontSize:"12px", color:"#888", padding:"0 4px" }}>Signed in as</p>
          <p style={{ margin:"0 0 12px", fontSize:"13px", fontWeight:600, color:"#333", padding:"0 4px" }}>{admin.name}</p>
          <button onClick={()=>{ adminLogout(); navigate({to:"/admin"}); }}
            style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 16px", background:"#fff0f0", color:"#c0392b", border:"none", borderRadius:"8px", cursor:"pointer", fontSize:"13px", fontWeight:600, fontFamily:"'Poppins',sans-serif", width:"100%" }}>
            <LogOut size={15}/> Sign Out
          </button>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex:1, padding:"28px 32px", overflowY:"auto" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"28px" }}>
          <div>
            <h1 style={{ margin:0, fontSize:"22px", fontWeight:800, color:"#1a1a1a" }}>
              {tab==="overview"?"Dashboard":tab==="orders"?"Orders":tab==="customers"?"Customers":"Product Ratings"}
            </h1>
            <p style={{ margin:"4px 0 0", color:"#888", fontSize:"13px" }}>
              {new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
            </p>
          </div>
          <button onClick={()=>setRefreshKey((k)=>k+1)}
            style={{ display:"flex", alignItems:"center", gap:"6px", padding:"8px 16px", background:"#fff", border:"1px solid #eee", borderRadius:"8px", cursor:"pointer", fontSize:"13px", color:"#555", fontFamily:"'Poppins',sans-serif" }}>
            <RefreshCw size={14}/> Refresh
          </button>
        </div>

        {/* ── OVERVIEW ── */}
        {tab==="overview" && (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"16px", marginBottom:"28px" }}>
              <StatCard label="Total Revenue"   value={`$${totalRevenue.toFixed(2)}`}  sub="All time"          icon={<TrendingUp size={22}/>} color="#006f1b"/>
              <StatCard label="Total Orders"    value={allOrders.length}                sub={`${deliveredCount} delivered`} icon={<ShoppingBag size={22}/>} color="#1565c0"/>
              <StatCard label="Customers"       value={allUsers.length}                sub="Registered users"  icon={<Users size={22}/>}      color="#6a1b9a"/>
              <StatCard label="Ratings"         value={allRatings.length}              sub="Product reviews"   icon={<Star size={22}/>}       color="#e65100"/>
            </div>

            {/* Status breakdown */}
            <div style={{ background:"#fff", borderRadius:"14px", padding:"20px 24px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", marginBottom:"24px" }}>
              <h3 style={{ margin:"0 0 16px", fontSize:"15px", fontWeight:700 }}>Orders by Status</h3>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
                {STATUS_OPTIONS.map((s)=>{
                  const count = allOrders.filter((o)=>o.status===s).length;
                  return (
                    <div key={s} style={{ padding:"10px 18px", background:"#f9f9f9", borderRadius:"10px", textAlign:"center", minWidth:"110px" }}>
                      <p style={{ margin:0, fontWeight:800, fontSize:"22px", color:"#1a1a1a" }}>{count}</p>
                      <p style={{ margin:"2px 0 0", fontSize:"12px", color:"#888" }}>{s}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent orders */}
            <div style={{ background:"#fff", borderRadius:"14px", padding:"20px 24px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
              <h3 style={{ margin:"0 0 16px", fontSize:"15px", fontWeight:700 }}>Recent Orders</h3>
              {allOrders.slice(0,5).map((o)=>(
                <div key={o.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid #f0f0f0" }}>
                  <div>
                    <p style={{ margin:0, fontWeight:600, fontSize:"13px" }}>{o.id} · {o.customerName}</p>
                    <p style={{ margin:"2px 0 0", fontSize:"12px", color:"#888" }}>{o.date}</p>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                    <Badge status={o.status}/>
                    <span style={{ fontWeight:700, color:"#006f1b", fontSize:"14px" }}>{o.total}</span>
                  </div>
                </div>
              ))}
              {allOrders.length===0 && <p style={{ color:"#aaa", textAlign:"center", padding:"20px 0" }}>No orders yet</p>}
            </div>
          </>
        )}

        {/* ── ORDERS ── */}
        {tab==="orders" && (
          <div style={{ background:"#fff", borderRadius:"14px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", overflow:"hidden" }}>
            {/* Filters */}
            <div style={{ padding:"16px 20px", borderBottom:"1px solid #eee", display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"center" }}>
              <div style={{ position:"relative", flex:1, minWidth:"200px" }}>
                <Search size={15} style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", color:"#aaa" }}/>
                <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search by order ID, name, email…"
                  style={{ width:"100%", padding:"9px 14px 9px 36px", border:"1px solid #e2e8f0", borderRadius:"8px", fontSize:"13px", outline:"none", fontFamily:"'Poppins',sans-serif", boxSizing:"border-box" }}/>
              </div>
              <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}
                style={{ padding:"9px 12px", border:"1px solid #e2e8f0", borderRadius:"8px", fontSize:"13px", outline:"none", fontFamily:"'Poppins',sans-serif" }}>
                <option value="All">All Status</option>
                {STATUS_OPTIONS.map((s)=><option key={s}>{s}</option>)}
              </select>
              <p style={{ margin:0, fontSize:"13px", color:"#888" }}>{filteredOrders.length} order{filteredOrders.length!==1?"s":""}</p>
            </div>

            {filteredOrders.length===0 ? (
              <p style={{ textAlign:"center", color:"#aaa", padding:"40px" }}>No orders found</p>
            ) : (
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ background:"#f9f9f9" }}>
                      {["Order ID","Customer","Date","Status","Total","Items",""].map((h)=>(
                        <th key={h} style={{ padding:"12px 16px", textAlign:"left", fontSize:"12px", color:"#888", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.5px" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((o)=>(
                      <OrderRow key={`${o.id}-${o.customerId}`} order={o} onStatusChange={handleStatusChange}/>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── CUSTOMERS ── */}
        {tab==="customers" && (
          <div style={{ background:"#fff", borderRadius:"14px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", overflow:"hidden" }}>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid #eee" }}>
              <p style={{ margin:0, fontSize:"13px", color:"#888" }}>{allUsers.length} registered customer{allUsers.length!==1?"s":""}</p>
            </div>
            {allUsers.length===0 ? (
              <p style={{ textAlign:"center", color:"#aaa", padding:"40px" }}>No registered customers yet</p>
            ) : (
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"#f9f9f9" }}>
                    {["Customer","Email","Phone","Joined","Orders","Spent"].map((h)=>(
                      <th key={h} style={{ padding:"12px 16px", textAlign:"left", fontSize:"12px", color:"#888", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.5px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((u)=>{
                    const userOrders = allOrders.filter((o)=>o.customerId===u.id);
                    const spent = userOrders.reduce((s,o)=>s+parseFloat(o.total.replace("$","")||0),0);
                    return (
                      <tr key={u.id} style={{ borderBottom:"1px solid #f0f0f0" }}>
                        <td style={td}>
                          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                            <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:"#006f1b", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:700, flexShrink:0 }}>
                              {u.name?.split(" ").map((w)=>w[0]).slice(0,2).join("").toUpperCase()||"?"}
                            </div>
                            <span style={{ fontWeight:600 }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={td}>{u.email}</td>
                        <td style={td}>{u.phone||"—"}</td>
                        <td style={td}>{u.joined||"—"}</td>
                        <td style={td}>{userOrders.length}</td>
                        <td style={{ ...td, fontWeight:700, color:"#006f1b" }}>${spent.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── RATINGS ── */}
        {tab==="ratings" && (
          <div style={{ background:"#fff", borderRadius:"14px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", padding:"20px 24px" }}>
            <p style={{ margin:"0 0 16px", fontSize:"13px", color:"#888" }}>{allRatings.length} review{allRatings.length!==1?"s":""}</p>
            {allRatings.length===0 ? (
              <p style={{ color:"#aaa", textAlign:"center", padding:"40px 0" }}>No ratings submitted yet</p>
            ) : (
              allRatings.map((r, i)=>(
                <div key={i} style={{ padding:"14px 0", borderBottom:"1px solid #f0f0f0" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                      <p style={{ margin:"0 0 4px", fontWeight:600, fontSize:"14px" }}>{r.userName}</p>
                      <p style={{ margin:"0 0 6px", fontSize:"12px", color:"#888" }}>Product #{r.productId} · {r.date}</p>
                      <div style={{ display:"flex", gap:"2px", marginBottom:"6px" }}>
                        {[1,2,3,4,5].map((s)=>(
                          <span key={s} style={{ color:s<=r.rating?"#f5a623":"#e0e0e0", fontSize:"16px" }}>★</span>
                        ))}
                      </div>
                      {r.review && <p style={{ margin:0, fontSize:"13px", color:"#555", fontStyle:"italic" }}>"{r.review}"</p>}
                    </div>
                    <span style={{ fontWeight:800, fontSize:"18px", color:"#f5a623" }}>{r.rating}/5</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;