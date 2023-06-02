import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const LoginUser = () => {
  const [name, setName] = useState("");
  const [noTelp, setNoTelp] = useState("");
  // const [pass, setPass] = useState("");
  const navigate = useNavigate();
  let { id } = useParams();

  const handleSubmitLogin = () => {
    let data = {
      id,
      name,
      no_telp: noTelp,
    };
    navigate(`/Home/${id}`);

    // axios
    //   .get(API_URL + "products?category.nama=" + this.state.categoryChoose)
    //   .then((res) => {
    //     const menus = res.data;
    //     this.setState({ menus });
    //   })
    //   .catch((error) => {
    //     console.log("Error ya ", error);
    //   });

    axios.put(API_URL + `tables/${id}`, data).then((res) => {
      // this.props.history.push("/Home");
      navigate(`/Home/${id}`);
      console.log(res);
    });
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(email);
  //   };
  return (
    <div className="App">
      <div className="auth-form-container">
        <form className="login-form text-black">
          <h2 className="text-center p-5">
            Selamat datang di Website Restoran Sop DUREN 97
          </h2>
          <label htmlFor="name" className="text-white">
            Nama:
          </label>
          <input
            className="p-2 mb-2"
            // value={email}
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
            className="p-2"
            // value={pass}
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
            onClick={() => handleSubmitLogin()}
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
