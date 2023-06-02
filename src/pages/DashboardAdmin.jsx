import React from "react";
import Sidebar from "../components/dashboard-admin/Sidebar";

const DashboardAdmin = () => {
  return (
    <div className="flex">
      <div className="basis-[12%] h-[100vh]">
        <Sidebar />
      </div>
      <div className="basis-[88%] border">D</div>
    </div>
  );
};

export default DashboardAdmin;
