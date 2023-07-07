import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../../../utils/constants";
import ModalProdcut from "./ModalProduct";

const Product = () => {
  const [viewData, setViewData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(API_URL2 + "product")
      .then((res) => {
        const showData = res.data.data;
        setViewData(showData);
        console.log(showData);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });
  }, []);

  const deleteData = (id_products) => {
    console.log(id_products);
    axios.delete(API_URL2 + `product/${id_products}`).then((res) => {
      const newValue = viewData.filter((e) => {
        return e.id_products !== id_products;
      });
      setViewData(newValue);
      setOpenModal(false);
    });
  };

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
            <Link
              to={"/admin/product/add/"}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white"
              style={{ textDecoration: "none" }}
            >
              Tambah Product Baru
            </Link>
          </div>
          <div className="overflow-x-auto relative h-screen">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    kode
                  </th>
                  <th scope="col" className="py-3 px-6">
                    nama
                  </th>
                  <th scope="col" className="py-3 px-6">
                    harga
                  </th>
                  <th scope="col" className="py-3 px-6">
                    ready
                  </th>
                  <th scope="col" className="py-3 px-6">
                    gambar
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Aksi
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((element, index) => (
                  <>
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={element.id_products}
                    >
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.kode}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.name}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {element.harga}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {String(element.is_ready)}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        {/* <img src="{require(element.image)}" alt="" /> */}{" "}
                        {/* {element.gambar} */}
                        <img
                          src={element.gambar}
                          alt={element.id}
                          width={100}
                        />
                      </td>

                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
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
                      </td>
                    </tr>
                    {openModal && (
                      <ModalProdcut
                        setOpenModal={setOpenModal}
                        deleteData={deleteData}
                        id_products={selectedId}
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

export default Product;
