import React from "react";
import Sidebar from "../components/dashboard-admin/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardAdmin = () => {
  return (
    <div className="flex" style={{ backgroundColor: "white", height: "100%" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: "200px",
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        {/* <h1 style={{ height: "100%" }}>
          Selamat datang Di halaman Admin Sop Duren 97
        </h1> */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardAdmin;
