import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../../../utils/constants";

const AddCategory = () => {
  const navigate = useNavigate();
  const [addData, setAddData] = useState("");

  const handleDataChange = (e) => {
    setAddData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_URL2 + "categories", { name: addData })
      .then((response) => {
        navigate("/admin/category");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="space-y-8 divide-y divide-gray-200 w-1/2 mt-5 ml-10">
      <form method="PUT" encType="multipart/form-data">
        <div className="sm:col-span-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Kategori
          </label>
          <div className="mt-1 border">
            <input
              type="text"
              id="name"
              name="name"
              className="block w-full transition duration-150 ease-in-out appearance-none border border-black rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={addData}
              onChange={handleDataChange}
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

export default AddCategory;
