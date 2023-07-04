import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import axios from "axios";
// import { API_URL2 } from "../../utils/constants";

const PrivateComponent = () => {
  const [idAdmin] = useState(localStorage.getItem("id_admins"));

  return <>{idAdmin ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateComponent;
