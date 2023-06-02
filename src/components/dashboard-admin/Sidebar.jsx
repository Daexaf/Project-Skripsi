import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-[#4E73DF] h-screen px-[25px]">
      <div className="px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#ededed]/[0.3]">
        <h1 className="text-white text-[15px] leading-[24px] font-extrabold cursor-pointer">
          Admin Panel
        </h1>
      </div>
      <div className="icons">
        <span className="flex items-center gap-[15] py-[20px] border-b-[1px] border-[#ededed]/[0.3] ml-2">
          <i className="ri-dashboard-2-line mb-3"></i>
          <p className="ml-2 text-[14px] leading-[20px] font-bold">Dashboard</p>
        </span>
      </div>
      <div className="">
        <p>Interface</p>
        <div className="">
          <i class="ri-settings-5-line"></i>
          <p>Components</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
