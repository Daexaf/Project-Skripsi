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
  const [errorMsg, setErrorMsg] = useState({ name: "", noTelp: "" });
  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!name) {
      setErrorMsg({ ...errorMsg, name: "Silahkan masukkan nama anda" });
      return;
    }
    if (!noTelp) {
      setErrorMsg({
        ...errorMsg,
        noTelp: "Silahkan masukkan nomor telepon anda",
      });
      return;
    }
    if (noTelp.length < 13) {
      setErrorMsg({
        ...errorMsg,
        noTelp: "Nomor telepon anda tidak mencapai batas minimum, coba lagi",
      });
      return;
    }
    const today = new Date();
    const converse2 = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

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
    });
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <form className="login-form" onSubmit={handleSubmitLogin}>
          <h2 className="text-center p-5">
            Selamat datang di Website Restoran Sop DUREN 97
          </h2>
          <label htmlFor="name" className="text-white">
            Nama:
          </label>
          <input
            className="p-2 mb-2 text-black"
            type="text"
            placeholder="Masukkan Nama Anda"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errorMsg.name && <p>{errorMsg.name}</p>}
          <label htmlFor="phone" className="text-white">
            Nomor Telepon:
          </label>
          <input
            className="p-2 mb-2 text-black"
            type="text"
            placeholder="Masukkan Nomor Telepon Anda"
            id="phone"
            name="phone"
            value={noTelp}
            onChange={(e) => {
              var reg = /^[0-9]*$/;
              if (!e.target.value.match(reg)) return;
              if (e.target.value.length === 14) return;
              setNoTelp(e.target.value);
            }}
            minLength="13"
            maxLength="14"
            pattern="^[0-9]*$"
          />
          {errorMsg.noTelp && <p>{errorMsg.noTelp}</p>}
          <button type="submit" className="btn btn-success submit mb-2">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};
