import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../../../utils/constants";
import ModalTable from "./ModalTable";

const Table = () => {
  const [viewData, setViewData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL2 + "table")
      .then((res) => {
        const showData = res.data.data;
        setViewData(showData);
        console.log(showData);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });
  }, []);

  const deleteData = (id_tables) => {
    console.log(id_tables);
    axios.delete(API_URL2 + `table/${id_tables}`).then((res) => {
      const newValue = viewData.filter((e) => {
        return e.id_tables !== id_tables;
      });
      setViewData(newValue);
      setOpenModal(false);
    });
  };

  return (
    <>
      <div className="py-12 w-100">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-end m-2 p-2">
            <Link
              to={`/admin/table/add/`}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white"
              style={{ textDecoration: "none" }}
            >
              Tambah Table Baru
            </Link>
          </div>
          <div className="overflow-x-auto relative h-screen">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Nama Table
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nama User
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nomor Telepon
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Waktu Masuk
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Waktu Keluar
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {viewData.map((element, index) => (
                  <>
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={index}
                    >
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.table_name}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.name}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.no_telp}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.time_start}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.time_end}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        <div className="flex space-x-2">
                          {/* <Link
                            to={`/admin/category/edit/${element.id_categories}`}
                            className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded-lg text-white"
                            style={{ textDecoration: "none" }}
                          >
                            Edit
                          </Link> */}
                          <div className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-lg text-white">
                            <button
                              type="submit"
                              onClick={(e) => {
                                setOpenModal(true);
                                setSelectedId(element.id_tables);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {openModal && (
                      <ModalTable
                        setOpenModal={setOpenModal}
                        deleteData={deleteData}
                        id_tables={selectedId}
                      />
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
