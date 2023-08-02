import React, { useState } from "react";
import { API_URL2 } from "../../../utils/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const PopHover = ({ element }) => {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  // const [isAlertOpen, setAlertOpen] = useState(false);
  //   const { id_receipts } = useParams();

  const handleAlert = async () => {
    // setAlertOpen(true);
    const string = "Apakah anda yakin?";

    if (window.confirm(string)) {
      await axios.put(API_URL2 + `receipt/${element.id_receipts}`, {
        id_receipts: element.id_receipts,
        name: element.name,
        no_telp: element.no_telp,
        total_bayar: element.total_bayar,
        time_start: element.time_start,
        kode: element.kode,
        status: element.status.toLowerCase() === "true" ? false : true,
      });
    } else {
    }
  };

  //   const confirmAction = () => {
  //     const response = confirm("Are you sure you want to do that?");

  //     if (response) {
  //         alert("Ok was pressed");
  //     } else {
  //         alert("Cancel was pressed");
  //     }
  // }

  return (
    <>
      <div className="relative">
        <button
          data-popover-target="popover-default"
          type="button"
          className={`text-white ${
            element.status.toLowerCase() === "true"
              ? "bg-green-700"
              : "bg-red-700"
          } hover:opacity-70 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800`}
          onMouseEnter={() => {
            setIsPopOverOpen(true);
          }}
          onMouseLeave={() => {
            setIsPopOverOpen(false);
          }}
          onClick={() => {
            handleAlert();
          }}
        >
          {element.status}
        </button>
        {isPopOverOpen && (
          <div
            id="tooltip-default"
            role="tooltip"
            className="absolute top-[-35px] left-[-45px] z-10 inline-block px-3 py-2 text-sm font-medium text-white duration-300 bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700"
          >
            Klik untuk mengubah status
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        )}
      </div>
    </>
  );
};

export default PopHover;
