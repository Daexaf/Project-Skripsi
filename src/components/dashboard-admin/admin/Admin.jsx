import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../../../utils/constants";
import ModalAdmin from "./ModalAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AdminAcc = () => {
  const [viewData, setViewData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [togglePass, setTogglePass] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL2 + "admin")
      .then((res) => {
        const showData = res.data.data;
        setViewData(showData);
        console.log(showData);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });
  }, []);

  const deleteData = (id_admins) => {
    console.log(id_admins);
    axios.delete(API_URL2 + `admin/${id_admins}`).then((res) => {
      const newValue = viewData.filter((e) => {
        return e.id_admins !== id_admins;
      });
      setViewData(newValue);
      setOpenModal(false);
    });
  };

  return (
    <div className="" style={{ position: "relative" }}>
      <div className="py-12 w-100 h-screen">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-screen">
          <div className="flex justify-end m-2 p-2">
            <Link
              to={`/admin/adminAcc/add/`}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white"
              style={{ textDecoration: "none" }}
            >
              Tambah Admin Baru
            </Link>
          </div>
          <div className="overflow-x-auto relative h-screen">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Username
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Password
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Aksi
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
                        {element.username}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.email}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {togglePass ? (
                          <>{element.password}</>
                        ) : (
                          <>
                            {element.password.split("").map(() => {
                              return "*";
                            })}
                          </>
                        )}
                        {togglePass ? (
                          <>
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              className="ml-3"
                              onClick={() => {
                                setTogglePass(false);
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon
                              icon={faEye}
                              className="ml-3"
                              onClick={() => {
                                setTogglePass(true);
                              }}
                            />
                          </>
                        )}
                      </td>

                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/adminAcc/edit/${element.id_admins}`}
                            className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded-lg text-white"
                            style={{ textDecoration: "none" }}
                          >
                            Edit
                          </Link>
                          <div className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-lg text-white">
                            <button
                              type="submit"
                              onClick={(e) => {
                                setOpenModal(true);
                                setSelectedId(element.id_admins);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {openModal && (
                      <ModalAdmin
                        setOpenModal={setOpenModal}
                        deleteData={deleteData}
                        id_admins={selectedId}
                      />
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAcc;
