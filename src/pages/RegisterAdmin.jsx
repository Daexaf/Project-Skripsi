import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const [email] = useState("");
  // const [pass, setPass] = useState("");
  // const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h1 className="text-center p-5">Silahkan Daftar</h1>
          <label htmlFor="Fullname" className="text-white">
            Nama :
          </label>
          <input
            className="p-2 mb-2 text-black"
            // value={name}
            name="name"
            id="name"
            placeholder="Full Name"
          />
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            className="p-2 mb-2 text-black"
            // value={email}
            type="email"
            placeholder="Masukkan Email Anda"
            id="email"
            name="email"
          />
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            className="p-2 text-black mb-2"
            // value={pass}
            type="password"
            placeholder="****"
            id="password"
            name="password"
          />
          <button type="submit" className="btn btn-success submit mb-2">
            Daftar
          </button>
        </form>
        <button className="link-btn" onClick={() => navigate("/Login")}>
          Already have an account? Login here.
        </button>
      </div>
    </div>
  );
};
