import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../../../utils/constants";

const EditCategory = () => {
  const [filderData, setFilterData] = useState([]);
  const { id_categories } = useParams();
  const [inputName, setInputName] = useState();
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL2 + `categories/${id_categories}`)
      .then((res) => {
        const showData = res.data.data;
        setFilterData(showData);
        setLoading(false);
        setInputName(showData[0].name);
        console.log(showData);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error ya ", error);
      });
  }, [id_categories]);

  const handleSubmitData = (e) => {
    e.preventDefault();
    console.log(id_categories, "ini idnya");
    const updatedData = {
      id_categories: id_categories,
      name: inputName,
    };
    axios
      .put(API_URL2 + `categories/${id_categories}`, updatedData)
      .then((res) => {
        console.log(res);
      });
    navigate("/Admin/category");
  };

  return (
    <div className="py-12 bg-blue-500 ">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-blue-500">
        <div className="flex m-2 p-2 bg-blue-500">
          <Link
            to="/Admin/category"
            className="px-4 py-2 bg-green-500 hover:bg-indigo-700 rounded-lg text-white text-decoration-none"
          >
            Daftar Kategori
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {filderData.map((index) => (
              <div
                className="m-2 p-2 bg-slate-100 rounded border border-black"
                key={index}
              >
                <div className="space-y-8 divide-y divide-gray-200 w-1/2 mt-5 border border-black">
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
                          className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          value={inputName}
                          onChange={(e) => {
                            setInputName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="text-sm text-red-400"></div>
                    </div>

                    <div className="mt-6">
                      <Link to="/Admin/category">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded text-white
                                "
                          onClick={(e) => handleSubmitData(e)}
                        >
                          Submit
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default EditCategory;
