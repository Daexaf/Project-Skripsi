import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");

    if (confirmLogout) {
      // Lakukan proses logout di sini
      // Contoh: Menghapus data admin dari localStorage
      localStorage.removeItem("id_admins");
      navigate("/login");
    }
  };
  return (
    <div
      className="bg-[#4E73DF] h-screen fixed z px-[25px] "
      style={{ zIndex: 1000 }}
    >
      <div className="px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#ededed]/[0.3]">
        <h1 className="text-white text-[15px] leading-[24px] font-extrabold cursor-pointer">
          Admin Panel
        </h1>
      </div>
      <Link to="dashboard">
        <div className="icons">
          <span className="flex items-center gap-[15] py-[10px] border-b-[1px] border-[#ededed]/[0.3] ml-2">
            <i className="ri-dashboard-line mb-3"></i>
            <p className="ml-2 text-[14px] leading-[20px] font-bold">
              Dashboard
            </p>
          </span>
        </div>
      </Link>

      <Link to="category">
        <div className="icons">
          <span className="flex items-center gap-[15] py-[10px] border-b-[1px] border-[#ededed]/[0.3] ml-2">
            <i className="ri-list-settings-line mb-3"></i>
            <p className="ml-2 text-[14px] leading-[20px] font-bold">
              Category
            </p>
          </span>
        </div>
      </Link>

      <Link to="product">
        <div className="icons">
          <span className="flex items-center gap-[15] py-[10px] border-b-[1px] border-[#ededed]/[0.3] ml-2">
            <i className="ri-menu-line mb-3"></i>
            <p className="ml-2 text-[14px] leading-[20px] font-bold">Product</p>
          </span>
        </div>
      </Link>

      <Link to="table">
        <div className="icons">
          <span className="flex items-center gap-[15] py-[10px] border-b-[1px] border-[#ededed]/[0.3] ml-2">
            <i className="ri-table-line mb-3"></i>
            <p className="ml-2 text-[14px] leading-[20px] font-bold">Table</p>
          </span>
        </div>
      </Link>

      <Link to="AdminAcc">
        <div className="icons">
          <span className="flex items-center gap-[15] py-[10px] border-b-[1px] border-[#ededed]/[0.3] ml-2">
            <i className="ri-table-line mb-3"></i>
            <p className="ml-2 text-[14px] leading-[20px] font-bold">Admin</p>
          </span>
        </div>
      </Link>

      <div className="icons cursor-pointer" onClick={handleLogout}>
        <span className="flex items-center gap-[15] py-[10px] border-b-[1px] border-[#ededed]/[0.3] ml-2">
          <i className="ri-table-line mb-3"></i>
          <p className="ml-2 text-[14px] leading-[20px] font-bold">Logout</p>
        </span>
      </div>
      {/* <div className="">
        <p>Kategori</p>
        <div className="">
          <i className="ri-settings-5-line"></i>
          <p>Components</p>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
