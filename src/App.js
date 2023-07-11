import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./pages/Home";
import "./App.css";
import { Login } from "./pages/LoginAdmin";
import { Register } from "./pages/RegisterAdmin";
import { LoginUser } from "./pages/LoginUser";
import DashboardAdmin from "./pages/DashboardAdmin";
import Order from "./pages/Order";
import Sukses from "./pages/Sukses";
import axios from "axios";
import { API_URL2 } from "./utils/constants";
import Category from "./components/dashboard-admin/category/Category";
import EditCategory from "./components/dashboard-admin/category/EditCategory";
import Product from "./components/dashboard-admin/product/Product";
import Table from "./components/dashboard-admin/table/Table";
import AdminAcc from "./components/dashboard-admin/admin/Admin";
import EditTable from "./components/dashboard-admin/table/EditTable";
import EditProduct from "./components/dashboard-admin/product/EditProduct";
import EditAdmin from "./components/dashboard-admin/admin/EditAdmin";
import AddCategory from "./components/dashboard-admin/category/AddCategory";
import AddProduct from "./components/dashboard-admin/product/AddProduct";
import AddAdmin from "./components/dashboard-admin/admin/AddAdmin";
import PrivateComponent from "./components/auth/PrivateComponents";
import FeedbackForm from "./pages/FeedBack";
import PaymentForm from "./pages/Payment";
import Dashboard from "./components/dashboard-admin/Dashboard";

const App = () => {
  useEffect(() => {
    axios.get(API_URL2 + "product").then((res) => {});
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/home/:id_tables" element={<Home />} />

        <Route element={<PrivateComponent />}>
          <Route path="/admin/" element={<DashboardAdmin />}>
            <Route path="dashboard" element={<Dashboard />} />

            {/* ini untuk admin kategori */}
            <Route path="category" element={<Category />} />
            <Route
              path="category/edit/:id_categories"
              element={<EditCategory />}
            />
            <Route path="category/add/" element={<AddCategory />} />

            {/* ini untuk admin product  */}
            <Route path="product" element={<Product />} />
            <Route path="product/edit/:id_products" element={<EditProduct />} />
            <Route path="product/add/" element={<AddProduct />} />

            {/* ini untuk admin table */}
            <Route path="table" element={<Table />} />
            <Route path="table/edit/:id_tables" element={<EditTable />} />

            <Route path="pesanan" element={<p>pesanan</p>} />

            {/* ini untuk admin */}
            <Route path="AdminAcc" element={<AdminAcc />} />
            <Route path="adminAcc/edit/:id_admins" element={<EditAdmin />} />
            <Route path="adminAcc/add/" element={<AddAdmin />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/table/:id" element={<LoginUser />} />
        <Route path="/register" element={<Register />} />

        {/* ini untuk halaman */}
        <Route path="/order/:id_tables" element={<Order />} />
        <Route path="/sukses/:id" element={<Sukses />} />
        <Route path="/feedback/:id" element={<FeedbackForm />} />
        <Route path="/payment/:id" element={<PaymentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
