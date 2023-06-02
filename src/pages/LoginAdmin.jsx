import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div className="App">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="login-form text-black">
          <h2 className="text-center p-5">
            Selamat datang di Login Admin E-DUREN
          </h2>
          <label htmlFor="email" className="text-white">
            Email:
          </label>
          <input
            className="p-2 mb-2"
            // value={email}
            type="email"
            placeholder="Masukkan Email Anda"
            id="email"
            name="email"
          />
          <label htmlFor="password" className="text-white">
            Password:
          </label>
          <input
            className="p-2 mb-2"
            // value={pass}
            type="password"
            placeholder="****"
            id="password"
            name="password"
          />
          <button type="submit" className="btn btn-success submit mb-2">
            Login
          </button>
        </form>
        <button className="link-btn" onClick={() => navigate("/Register")}>
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
};
