import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import logo from "../../assets/login.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@hospital.com" && password === "admin123") {
      navigate("/admin");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <img src="/login.png" alt="Logo" className="logo" />

      <h2 className="welcome-text">Good to see you again</h2>

      <form onSubmit={handleLogin} className="login-form">
        <label>Your email</label>
        <div className="input-group">
          <span className="input-icon">👤</span>
          <input
            type="email"
            placeholder="e.g. admin@hospital.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <label>Your password</label>
        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            placeholder="e.g. admin123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Sign in
        </button>

        <div className="form-links">
          <a href="#">Don't have an account?</a>
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;