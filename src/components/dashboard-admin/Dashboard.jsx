import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL2 } from "../../utils/constants";
// import { Link } from "react-router-dom";
import PopHover from "./category/PopHover";
import { Fragment } from "react";

const Dashboard = () => {
  const [viewData, setViewData] = useState([]);
  // const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  // const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(API_URL2 + "receipt")
      .then((res) => {
        const showData = res.data.data;
        setViewData(showData);
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
                  <th scope="col" className="py-3 px-6 text-center">
                    Pesanan
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
                {filteredData.map((element, index) => {
                  const dateObject = new Date(element.time_end);
                  const formattedDate = dateObject
                    .toLocaleString("id-ID", {
                      timeZone: "Asia/Jakarta",
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                    .replaceAll(".", ":");
                  return (
                    <Fragment key={`${element.id_receipt} ${index}`}>
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={element.id_receipt}
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
                        <td className="py-4 px-6 font-medium whitespace-nowrap dark:text-black tulisan">
                          {JSON.parse(element.kode)?.map((e) => (
                            <div
                              className="flex gap-[10px] text-black"
                              key={e?.kode}
                            >
                              <p className="p-aja">{e?.kode}</p>
                              <p className="p-aja">{e?.jumlah}</p>
                              {/* Tampilkan keterangan hanya jika keterangannya tidak benar-benar undefined */}
                              {e?.keterangan !== undefined &&
                                e?.keterangan !== "undefined" && (
                                  <p className="p-aja">{e?.keterangan}</p>
                                )}
                            </div>
                          ))}
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                          {formattedDate}
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                          <PopHover element={element} />
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
