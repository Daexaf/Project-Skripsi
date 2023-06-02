import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import "../src/App.css";
import { Login } from "./pages/LoginAdmin";
import { Register } from "./pages/RegisterAdmin";
import { LoginUser } from "./pages/LoginUser";
import DashboardAdmin from "./pages/DashboardAdmin";
import Order from "./pages/Order";
import Sukses from "./pages/Sukses";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Home/:id" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Table/:id" element={<LoginUser />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Admin" element={<DashboardAdmin />} />
        <Route path="/Order/:id" element={<Order />} />
        <Route path="/sukses/:id" element={<Sukses />} />
      </Routes>
    </Router>
  );
};

export default App;
