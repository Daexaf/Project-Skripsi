import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../utils/constants";
import { useDispatch } from "react-redux";
import { table_name, timeData } from "../app/counterSlice";
import "./sukses.css";

export const LoginUser = () => {
  const [name, setName] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const today = new Date();
    const converse2 = today.toLocaleString();

    // setCurrentTime(converse2);
    console.log(converse2, "waktu");

    let data = {
      table_name: id,
      name,
      no_telp: noTelp,
      time_start: converse2,
    };

    dispatch(timeData(Date.now()));
    axios.post(API_URL2 + `table/`, data).then((res) => {
      const alamat = res.data.data[0].id_tables;
      dispatch(table_name(id));
      navigate(`/Home/${alamat}`);
      console.log(res);
    });
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <form className="login-form">
          <h2 className="text-center p-5">
            Selamat datang di Website Restoran Sop DUREN 97
          </h2>
          <label htmlFor="name" className="text-white">
            Nama:
          </label>
          <input
            className="p-2 mb-2  text-black"
            type="text"
            placeholder="Masukkan Nama Anda"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="phone" className="text-white">
            Nomor Telepon:
          </label>
          <input
            className="p-2  text-black"
            type="number"
            placeholder="Masukkan Nomor Telepon anda"
            id="phone"
            name="phone"
            value={noTelp}
            onChange={(e) => setNoTelp(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-success submit mb-2"
            value="submit"
            onClick={(e) => handleSubmitLogin(e)}
          >
            Masuk
          </button>
        </form>
        {/* <button className="link-btn" onClick={() => navigate("/Register")}>
          Don't have an account? Register here.
        </button> */}
      </div>
    </div>
  );
};
