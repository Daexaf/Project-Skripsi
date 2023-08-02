import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../../../utils/constants";

const EditTable = () => {
  const [data, setData] = useState([]);
  const { id_tables } = useParams();

  useEffect(() => {
    axios
      .get(API_URL2 + `table/${id_tables}`)
      .then((res) => {
        const showData = res.data.data;
        setData(showData);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });
  }, [id_tables]);

  return (
    <div className="py-12 bg-blue-500 ">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-blue-500">
        <div className="flex m-2 p-2 bg-blue-500">
          <Link
            to="/Admin/table"
            className="px-4 py-2 bg-green-500 hover:bg-indigo-700 rounded-lg text-white text-decoration-none"
          >
            Daftar Table
          </Link>
        </div>
        {data.map((element, index) => (
          <div
            className="m-2 p-2 bg-slate-100 rounded border border-black"
            key={index}
          >
            <div className="space-y-8 divide-y divide-gray-200 w-1/2 mt-5 border border-black">
              <form
                method="POST"
                // action="{{ route('admin.categories.store')}}"
                encType="multipart/form-data"
              >
                <div className="sm:col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama
                  </label>
                  <div className="mt-1 border">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      defaultValue={element.name}
                    />
                  </div>
                  <div className="text-sm text-red-400"></div>
                </div>
                {/* <div className="sm:col-span-6 mt-2 ">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-1">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="block w-full transition duration-150 ease-in-out appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5 @error('name') border-red-400 @enderror"
                  />
                </div>
                <div className="text-sm text-red-400"></div>
              </div> */}
                <div className="sm:col-span-6 pt-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nomor Telepon
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      rows="3"
                      name="description"
                      className="shadow-sm focus:ring-indigo-500 appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md @error('name') border-red-400 @enderror"
                      defaultValue={element.no_telp}
                    ></textarea>
                  </div>
                  <div className="text-sm text-red-400"></div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded text-white
                            "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditTable;
