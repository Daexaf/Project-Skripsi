import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { API_URL2 } from "../utils/constants";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim data ke backend untuk membuat akun admin baru
      const response = await axios.post(API_URL2 + "admin", formData);
      console.log(response.data); // Respons dari backend (opsional, bisa dihandle sesuai kebutuhan)
      alert("Akun admin baru berhasil dibuat!");
      navigate("/Login");
      // Setelah berhasil membuat akun, Anda bisa menavigasi ke halaman lain, misalnya halaman login.
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal membuat akun admin baru. Silahkan coba lagi.");
    }
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h1 className="text-center p-5">Buat Akun Admin Baru</h1>
          <label htmlFor="username" className="text-white">
            Username:
          </label>
          <input
            className="p-2 mb-2 text-black"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <label htmlFor="email" className="text-white">
            Email:
          </label>
          <input
            className="p-2 mb-2 text-black"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <label htmlFor="password" className="text-white">
            Password:
          </label>
          <input
            className="p-2 text-black mb-2"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit" className="btn btn-success submit mb-2">
            Buat Akun
          </button>
        </form>
        <button className="link-btn" onClick={() => navigate("/Login")}>
          Already have an account? Login here.
        </button>
      </div>
    </div>
  );
};
