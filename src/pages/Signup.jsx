import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const password = watch("password");

  const onSubmit = (data) => {
    setSubmitted(true);
    console.log(data);
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              backgroundColor: "#60b246",
              width: "60px",
              height: "60px",
              borderRadius: "10px",
              color: "white",
              fontSize: "32px",
              fontWeight: "bold",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            V
          </div>
          <h2 style={{ margin: "10px 0 0", fontWeight: "600" }}>Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            style={inputStyle}
          />
          {errors.name && (
            <p style={errorStyle}>Name is required</p>
          )}

          <input
            type="text"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
            style={inputStyle}
          />
          {errors.email && (
            <p style={errorStyle}>Invalid email address</p>
          )}

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 8,
                validate: {
                  hasUpper: (value) =>
                    /[A-Z]/.test(value) || "Must include an uppercase letter",
                  hasLower: (value) =>
                    /[a-z]/.test(value) || "Must include a lowercase letter",
                },
              })}
              style={inputStyle}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              style={eyeIconStyle}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          {errors.password && (
            <p style={errorStyle}>{errors.password.message || "Invalid password"}</p>
          )}

          <div style={{ position: "relative" }}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              style={inputStyle}
            />
            <div
              onClick={() => setShowConfirm(!showConfirm)}
              style={eyeIconStyle}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          {errors.confirmPassword && (
            <p style={errorStyle}>{errors.confirmPassword.message}</p>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: " #45a049",
              color: "white",
              fontWeight: "600",
              border: "none",
              padding: "14px",
              width: "100%",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "15px",
              fontSize: "16px",
            }}
          >
            Sign Up
          </button>

          {submitted && (
            <p style={{ color: "black", marginTop: "15px", textAlign: "center" }}>
              You have successfully signed in
            </p>
          )}
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account?{" "}
          <span style={{ color: "#60b246", cursor: "pointer" }}>Login</span>
        </p>
      </div>
    </div>
  );
};

// Inline Styles
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  border: "1.5px solid #888",
  borderRadius: "6px",
  fontSize: "14px",
};

const eyeIconStyle = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
  fontSize: "13px",
  marginTop: "4px",
};

export default Signup;


