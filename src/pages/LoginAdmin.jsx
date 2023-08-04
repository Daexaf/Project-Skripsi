import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL2 } from "../utils/constants";
import axios from "axios";
import "./sukses.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [contoh, setContoh] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setContoh(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    axios
      .get(API_URL2 + "admin/")
      .then((res) => {
        const data = res.data.data;
        const matchedAdmin = data.find(
          (admin) =>
            admin.username === loginData.username &&
            admin.password === loginData.password
        );

        if (matchedAdmin) {
          navigate("/admin/dashboard");
          localStorage.setItem("id_admins", matchedAdmin.id_admins);
        } else {
          setErrorMsg("Username atau password salah");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMsg("Terjadi kesalahan saat proses login");
      });
  };
  return (
    <div className="App tulisan">
      <div className="auth-form-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="text-center p-5 tulisan">
            Selamat datang di Login Admin E-DUREN
          </h2>
          <label htmlFor="username" className="text-white">
            Username:
          </label>
          <input
            className="p-2 mb-2 text-black"
            // value={email}
            type="text"
            placeholder="Masukkan Email Anda"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="password" className="text-white">
            Password:
          </label>
          <input
            className="p-2 mb-2 text-black"
            // value={pass}
            type="password"
            placeholder="****"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-success submit mb-2">
            Login
          </button>
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        </form>
        <button className="link-btn" onClick={() => navigate("/Register")}>
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
};
