import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL2 } from "../../utils/constants";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [viewData, setViewData] = useState([]);
  // const [openModal, setOpenModal] = useState(false);
  // const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(API_URL2 + "receipt")
      .then((res) => {
        const showData = res.data.data;
        setViewData(showData);
        console.log(showData);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });
  }, []);

  const filteredData = viewData.filter((element) =>
    element.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="py-12 w-100">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* <div className="flex justify-start m-2 p-2">
            <Link
              to={"/admin/product/add/"}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white"
              style={{ textDecoration: "none" }}
            >
              pilih kategori
            </Link>
          </div> */}
          <div className="flex justify-start m-2 p-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama"
              className="mr-5"
              style={{
                border: "3px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
              }}
            />
            <button className="mr-5" onClick={() => setSearchQuery("")}>
              Hapus
            </button>
            {/* <Link
              to={"/admin/product/add/"}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white"
              style={{ textDecoration: "none" }}
            >
              Tambah Product Baru
            </Link> */}
          </div>
          <div className="overflow-x-auto relative h-screen">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Nama
                  </th>
                  <th scope="col" className="py-3 px-6">
                    No_Telp
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Total Bayar
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Waktu
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Status
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((element, index) => (
                  <>
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={element.id_receipts}
                    >
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.name}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.no_telp}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.total_bayar}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.time_start}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        <button
                          data-popover-target="popover-default"
                          type="button"
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          {element.status}
                        </button>
                        <div
                          data-popover
                          id="popover-default"
                          role="tooltip"
                          class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
                        >
                          <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                            <h3 class="font-semibold text-gray-900 dark:text-white">
                              Popover title
                            </h3>
                          </div>
                          <div class="px-3 py-2">
                            <p>
                              And here's some amazing content. It's very
                              engaging. Right?
                            </p>
                          </div>
                          <div data-popper-arrow></div>
                        </div>
                      </td>

                      {/* <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/product/edit/${element.id_products}`}
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
                                setSelectedId(element.id_products);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td> */}
                    </tr>
                    {/* {openModal && (
                      <ModalProdcut
                        setOpenModal={setOpenModal}
                        deleteData={deleteData}
                        id_products={selectedId}
                      />
                    )} */}
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

export default Dashboard;
