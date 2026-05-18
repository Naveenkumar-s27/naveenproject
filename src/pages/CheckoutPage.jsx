import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { useNavigate } from "@tanstack/react-router";
import Nav from "../Components/Nav";
import Fotter from "../Components/Fotter";
import { CheckCircle, MapPin, CreditCard, ChevronRight, ArrowLeft } from "lucide-react";

const steps = ["Delivery Address", "Payment", "Order Confirmed"];

const CheckoutPage = () => {
  const { cartItems, totalPrice, setIsCartOpen } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [step,     setStep]     = useState(0);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [address, setAddress]   = useState({ name:"", phone:"", email:"", houseNo:"", street:"", city:"", state:"", pincode:"", type:"Home" });
  const [payment, setPayment]   = useState("cod");
  const [errors,  setErrors]    = useState({});

  const tax         = +(totalPrice * 0.08).toFixed(2);
  const deliveryFee = totalPrice > 50 ? 0 : 5;
  const total       = +(totalPrice + tax + deliveryFee).toFixed(2);

  const validate = () => {
    const e = {};
    if (!address.name.trim())                               e.name    = "Name is required";
    if (!address.phone.trim() || address.phone.length < 10) e.phone   = "Valid phone required";
    if (!address.email.trim() || !address.email.includes("@")) e.email = "Valid email required";
    if (!address.houseNo.trim())  e.houseNo = "House No. required";
    if (!address.street.trim())   e.street  = "Street required";
    if (!address.city.trim())     e.city    = "City required";
    if (!address.state.trim())    e.state   = "State required";
    if (!address.pincode.trim() || address.pincode.length < 5) e.pincode = "Valid pincode required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleNext = () => {
    if (step === 0 && !validate()) return;
    if (step === 1) {
      // ✅ Place order — save to OrdersContext → localStorage
      const order = placeOrder({ cartItems, total, address, paymentMethod: payment });
      setPlacedOrder(order);
    }
    if (step < 2) setStep((s) => s + 1);
  };

  const inp = (field, label, type = "text", ph = "") => (
    <div style={{ marginBottom:"16px" }}>
      <label style={{ display:"block",fontSize:"13px",color:"#555",marginBottom:"5px",fontWeight:500 }}>
        {label} <span style={{ color:"red" }}>*</span>
      </label>
      <input
        type={type} value={address[field]}
        onChange={(e) => { setAddress({ ...address, [field]: e.target.value }); setErrors({ ...errors, [field]:"" }); }}
        placeholder={ph || label}
        style={{ width:"100%",padding:"11px 14px",border:errors[field]?"1px solid red":"1px solid #ddd",borderRadius:"7px",fontSize:"14px",outline:"none",boxSizing:"border-box",fontFamily:"'Poppins',sans-serif",background:errors[field]?"#fff5f5":"#fff" }}
      />
      {errors[field] && <p style={{ color:"red",fontSize:"11px",margin:"3px 0 0" }}>{errors[field]}</p>}
    </div>
  );

  return (
    <>
      <Nav />
      <div style={{ minHeight:"80vh",background:"#f5f6fa",fontFamily:"'Poppins',sans-serif" }}>
        <div style={{ maxWidth:"1100px",margin:"0 auto",padding:"30px 20px" }}>

          {/* Back */}
          <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"24px" }}>
            {step < 2 && (
              <button onClick={() => step===0 ? navigate({ to:"/shop" }) : setStep((s)=>s-1)}
                style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"5px",color:"#006f1b",fontWeight:600,fontFamily:"'Poppins',sans-serif" }}>
                <ArrowLeft size={18}/> Back
              </button>
            )}
            <h1 style={{ margin:0,fontSize:"22px",fontWeight:700 }}>Checkout</h1>
          </div>

          {/* Step bar */}
          <div style={{ display:"flex",alignItems:"center",marginBottom:"32px" }}>
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ display:"flex",alignItems:"center",gap:"6px" }}>
                  <div style={{ width:"28px",height:"28px",borderRadius:"50%",background:i<=step?"#006f1b":"#ddd",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:700 }}>
                    {i < step ? "✓" : i+1}
                  </div>
                  <span style={{ fontSize:"13px",fontWeight:i===step?700:400,color:i<=step?"#006f1b":"#aaa" }}>{s}</span>
                </div>
                {i < steps.length-1 && <div style={{ flex:1,height:"2px",background:i<step?"#006f1b":"#ddd",margin:"0 10px" }}/>}
              </React.Fragment>
            ))}
          </div>

          <div style={{ display:"flex",gap:"24px",alignItems:"flex-start",flexWrap:"wrap" }}>

            {/* LEFT */}
            <div style={{ flex:"1 1 500px" }}>

              {/* STEP 0: Address */}
              {step===0 && (
                <div style={{ background:"#fff",borderRadius:"12px",padding:"24px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
                  <h2 style={{ margin:"0 0 20px",fontSize:"17px",display:"flex",alignItems:"center",gap:"8px" }}>
                    <MapPin size={18} color="#006f1b"/> Delivery Address
                  </h2>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px" }}>
                    <div style={{ gridColumn:"1 / -1" }}>{inp("name","Full Name","text","Enter full name")}</div>
                    {inp("phone","Phone","tel","10-digit number")}
                    {inp("email","Email","email","your@email.com")}
                    {inp("houseNo","House / Flat No.","text","e.g. 12B")}
                    <div style={{ gridColumn:"1 / -1" }}>{inp("street","Street / Area","text","Street name")}</div>
                    {inp("city","City","text","e.g. Chennai")}
                    {inp("state","State","text","e.g. Tamil Nadu")}
                    {inp("pincode","Pincode","text","e.g. 600040")}
                  </div>
                  <div>
                    <label style={{ fontSize:"13px",color:"#555",fontWeight:500 }}>Address Type</label>
                    <div style={{ display:"flex",gap:"10px",marginTop:"8px" }}>
                      {["Home","Work","Other"].map((t)=>(
                        <button key={t} onClick={()=>setAddress({...address,type:t})}
                          style={{ padding:"6px 16px",borderRadius:"20px",border:address.type===t?"2px solid #006f1b":"2px solid #ddd",background:address.type===t?"#e8f5e9":"#fff",color:address.type===t?"#006f1b":"#555",cursor:"pointer",fontSize:"13px",fontWeight:600,fontFamily:"'Poppins',sans-serif" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: Payment */}
              {step===1 && (
                <div style={{ background:"#fff",borderRadius:"12px",padding:"24px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
                  <h2 style={{ margin:"0 0 20px",fontSize:"17px",display:"flex",alignItems:"center",gap:"8px" }}>
                    <CreditCard size={18} color="#006f1b"/> Payment Method
                  </h2>
                  <div style={{ background:"#f0f7f0",borderRadius:"8px",padding:"12px 16px",marginBottom:"20px",fontSize:"13px" }}>
                    <p style={{ margin:"0 0 4px",fontWeight:600 }}>Delivering to: {address.name}</p>
                    <p style={{ margin:0,color:"#666" }}>{address.houseNo}, {address.street}, {address.city}, {address.state} - {address.pincode}</p>
                  </div>
                  {[
                    { id:"cod", label:"Cash on Delivery",      sub:"Pay when order arrives",     emoji:"💵" },
                    { id:"upi", label:"UPI / PhonePe / GPay",  sub:"Instant payment via UPI",    emoji:"📱" },
                    { id:"card",label:"Credit / Debit Card",   sub:"Visa, Mastercard, RuPay",    emoji:"💳" },
                  ].map((opt)=>(
                    <div key={opt.id} onClick={()=>setPayment(opt.id)}
                      style={{ display:"flex",alignItems:"center",gap:"14px",padding:"16px",borderRadius:"10px",marginBottom:"12px",border:payment===opt.id?"2px solid #006f1b":"2px solid #eee",background:payment===opt.id?"#f0f7f0":"#fff",cursor:"pointer" }}>
                      <span style={{ fontSize:"24px" }}>{opt.emoji}</span>
                      <div style={{ flex:1 }}>
                        <p style={{ margin:0,fontWeight:600,fontSize:"14px" }}>{opt.label}</p>
                        <p style={{ margin:0,color:"#888",fontSize:"12px" }}>{opt.sub}</p>
                      </div>
                      <div style={{ width:"18px",height:"18px",borderRadius:"50%",border:payment===opt.id?"5px solid #006f1b":"2px solid #ccc",flexShrink:0 }}/>
                    </div>
                  ))}
                  {payment==="card" && (
                    <div style={{ padding:"16px",background:"#f9f9f9",borderRadius:"8px" }}>
                      <input placeholder="Card Number" style={{ width:"100%",padding:"10px",border:"1px solid #ddd",borderRadius:"6px",marginBottom:"10px",boxSizing:"border-box",fontFamily:"'Poppins',sans-serif" }}/>
                      <div style={{ display:"flex",gap:"10px" }}>
                        <input placeholder="MM / YY" style={{ flex:1,padding:"10px",border:"1px solid #ddd",borderRadius:"6px",fontFamily:"'Poppins',sans-serif" }}/>
                        <input placeholder="CVV" style={{ flex:1,padding:"10px",border:"1px solid #ddd",borderRadius:"6px",fontFamily:"'Poppins',sans-serif" }}/>
                      </div>
                    </div>
                  )}
                  {payment==="upi" && (
                    <div style={{ padding:"16px",background:"#f9f9f9",borderRadius:"8px" }}>
                      <input placeholder="Enter UPI ID (e.g. name@upi)" style={{ width:"100%",padding:"10px",border:"1px solid #ddd",borderRadius:"6px",boxSizing:"border-box",fontFamily:"'Poppins',sans-serif" }}/>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Confirmed */}
              {step===2 && (
                <div style={{ background:"#fff",borderRadius:"12px",padding:"40px 24px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)",textAlign:"center" }}>
                  <CheckCircle size={64} color="#006f1b" style={{ marginBottom:"16px" }}/>
                  <h2 style={{ margin:"0 0 8px",fontSize:"22px",color:"#006f1b" }}>Order Placed! 🎉</h2>
                  <p style={{ color:"#888",margin:"0 0 6px" }}>Your order has been confirmed</p>
                  <p style={{ fontWeight:700,fontSize:"18px",color:"#333",margin:"0 0 24px" }}>{placedOrder?.id}</p>
                  <div style={{ background:"#f0f7f0",borderRadius:"10px",padding:"16px",marginBottom:"20px",textAlign:"left" }}>
                    <p style={{ margin:"0 0 6px",fontWeight:600 }}>Delivering to:</p>
                    <p style={{ margin:0,color:"#555",fontSize:"14px" }}>
                      {address.name} · {address.phone}<br/>
                      {address.houseNo}, {address.street},<br/>
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                  </div>
                  <p style={{ color:"#888",fontSize:"13px",margin:"0 0 24px" }}>
                    Expected delivery: <strong style={{ color:"#006f1b" }}>3–5 business days</strong>
                  </p>
                  {/* ✅ Navigate to /home — NOT "/" — so user stays logged in */}
                  <button onClick={() => navigate({ to:"/home" })}
                    style={{ padding:"14px 32px",background:"#006f1b",color:"white",border:"none",borderRadius:"8px",fontWeight:700,fontSize:"15px",cursor:"pointer",fontFamily:"'Poppins',sans-serif" }}>
                    Continue Shopping →
                  </button>
                </div>
              )}

              {step < 2 && (
                <button onClick={handleNext}
                  style={{ width:"100%",padding:"15px",marginTop:"16px",background:"#006f1b",color:"white",border:"none",borderRadius:"10px",fontWeight:700,fontSize:"16px",cursor:"pointer",fontFamily:"'Poppins',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px" }}>
                  {step===0 ? "Continue to Payment" : `Place Order · $${total}`}
                  <ChevronRight size={18}/>
                </button>
              )}
            </div>

            {/* RIGHT — summary */}
            {step < 2 && (
              <div style={{ width:"320px",flexShrink:0 }}>
                <div style={{ background:"#fff",borderRadius:"12px",padding:"20px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)",position:"sticky",top:"20px" }}>
                  <h3 style={{ margin:"0 0 16px",fontSize:"16px" }}>Order Summary</h3>
                  <div style={{ maxHeight:"260px",overflowY:"auto",marginBottom:"16px" }}>
                    {cartItems.map((item)=>(
                      <div key={item.id} style={{ display:"flex",gap:"10px",marginBottom:"12px",alignItems:"center" }}>
                        <img src={item.image} alt={item.name} style={{ width:"48px",height:"48px",objectFit:"cover",borderRadius:"6px" }}/>
                        <div style={{ flex:1 }}>
                          <p style={{ margin:0,fontSize:"13px",fontWeight:600 }}>{item.name}</p>
                          <p style={{ margin:0,fontSize:"12px",color:"#888" }}>×{item.quantity}</p>
                        </div>
                        <span style={{ fontSize:"13px",fontWeight:600,color:"#006f1b" }}>
                          ${(parseFloat(item.price.replace("$",""))*item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop:"1px solid #eee",paddingTop:"12px" }}>
                    {[["Subtotal",`$${totalPrice.toFixed(2)}`],["Tax (8%)",`$${tax.toFixed(2)}`],["Delivery",deliveryFee===0?"FREE 🎉":`$${deliveryFee.toFixed(2)}`]].map(([l,v])=>(
                      <div key={l} style={{ display:"flex",justifyContent:"space-between",fontSize:"13px",marginBottom:"8px",color:"#555" }}>
                        <span>{l}</span><span style={{ color:l==="Delivery"&&deliveryFee===0?"#006f1b":"#333",fontWeight:l==="Delivery"&&deliveryFee===0?600:400 }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:"16px",paddingTop:"10px",borderTop:"1px solid #eee" }}>
                      <span>Total</span><span style={{ color:"#006f1b" }}>${total}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Fotter/>
    </>
  );
};

export default CheckoutPage;