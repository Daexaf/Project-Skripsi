import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../../../utils/constants";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(API_URL2 + "admin", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        navigate("/admin/adminAcc");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="space-y-8 divide-y divide-gray-200 w-1/2 mt-5 border border-black">
      <form method="PUT" encType="multipart/form-data">
        <div className="sm:col-span-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <div className="mt-1 border">
            <input
              type="text"
              id="name"
              name="name"
              className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="text-sm text-red-400"></div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mt-1 border">
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="text-sm text-red-400"></div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1 border">
            <input
              type="text"
              id="password"
              name="password"
              className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="text-sm text-red-400"></div>
        </div>

        <div className="mt-6">
          <Link to="">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded text-white
                                "
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
