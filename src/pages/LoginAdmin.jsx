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

  useEffect(() => {
    setContoh(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    axios.get(API_URL2 + "admin/").then((res) => {
      const data = res.data.data;
      const username = data.filter((e) => {
        return e.username === loginData.username;
      });
      const password = data.filter((e) => {
        return e.password === loginData.password;
      });
      if (username.length && password.length) {
        navigate("/admin/dashboard");
        localStorage.setItem("id_admins", username[0].id_admins);
      } else if (username.length && !password.length) {
        alert("lupa password kali");
      } else if (!username.length && password.length) {
        alert("lupa username lu");
      }
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
        </form>
        <button className="link-btn" onClick={() => navigate("/Register")}>
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
};
