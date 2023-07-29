import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ListGroup, Badge, Button, Card } from "react-bootstrap";
import axios from "axios";
import "./sukses.css";
import { API_URL2 } from "../utils/constants";
import numberWithCommas from "../utils/utils";
import { Helmet } from "react-helmet";

const Sukses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tableDetail, setTableDetail] = useState();
  const [menu, setMenus] = useState();
  const [totalBayar, setTotalBayar] = useState(0);
  const [kode, setKode] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL2 + `table/${id}`)
      .then((res) => {
        setTableDetail(res.data.data[0]);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });

    axios
      .get(API_URL2 + `keranjangs?id_tables=${id}`)
      .then((res) => {
        setMenus(res.data.data);

        // Clear previous data when menus are updated
        setKode([]);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }, [id]);

  useEffect(() => {
    const calculateTotalBayar = () => {
      if (menu) {
        const total = menu.reduce(
          (result, item) => result + item.total_harga,
          0
        );
        setTotalBayar(total);
      }
    };

    calculateTotalBayar();

    menu?.forEach((element) => {
      console.log(element, "ini harusnya cuma 2, karena datanya cuma 2");
      setKode((prev) => {
        return [
          ...prev,
          {
            kode: element.product[0].kode,
            jumlah: element.jumlah,
            keterangan: element.keterangan,
          },
        ];
      });
    });
  }, [menu]);

  const handlePayButton = async (e) => {
    const today = new Date();
    const converse2 = today.toLocaleString();

    let data = {
      id_tables: id,
      total_bayar: totalBayar,
      name: tableDetail.name,
      no_telp: tableDetail.no_telp,
    };
    let dataPush = {
      total_bayar: totalBayar,
      name: tableDetail.name,
      no_telp: tableDetail.no_telp,
      time_start: tableDetail.time_start,
      kode,
      status: false,
    };
    let dataPushtable = {
      id_tables: tableDetail.id_tables,
      name: tableDetail.name,
      no_telp: tableDetail.no_telp,
      table_name: tableDetail.table_name,
      time_start: tableDetail.time_start,
      time_end: converse2,
    };
    try {
      const token = await axios.post(API_URL2 + "table/checkout", data);
      const tokenApp = token.data;
      window.snap.pay(tokenApp, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          alert("Pembayaran Berhasil, Terima kasih");
          console.log(result);
          dataPush.status = true;
          axios.post(API_URL2 + "receipt", dataPush);
          axios.put(API_URL2 + `table/${id}`, dataPushtable);
          axios.delete(API_URL2 + `keranjangs?id_tables=${id}`);
          navigate(`/home/${id}`);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert("wating your payment!");
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert("payment failed!");
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleDisini = async (e) => {
    setModalOpen(true);
    const today = new Date();
    const converse2 = today.toLocaleString();

    menu?.forEach((element) => {
      console.log(element, "ini harusnya cuma 2, karena datanya cuma 2");
      setKode((prev) => {
        return [
          ...prev,
          {
            kode: element.product[0].kode,
            jumlah: element.jumlah,
            keterangan: element.keterangan,
          },
        ];
      });
    });

    let dataPush = {
      total_bayar: totalBayar,
      name: tableDetail.name,
      no_telp: tableDetail.no_telp,
      time_start: tableDetail.time_start,
      status: false,
      kode: kode,
    };

    let dataPushtable = {
      id_tables: tableDetail.id_tables,
      name: tableDetail.name,
      no_telp: tableDetail.no_telp,
      table_name: tableDetail.table_name,
      time_start: tableDetail.time_start,
      time_end: converse2,
    };

    await axios.post(API_URL2 + "receipt", dataPush);

    await axios.put(API_URL2 + `table/${id}`, dataPushtable);

    await axios.delete(API_URL2 + `keranjangs?id_tables=${id}`);
  };

  return (
    <div className="relative w-full h-full">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!-- @TODO: replace SET_YOUR_CLIENT_KEY_HERE with your client key --> */}
        <script
          type="text/javascript"
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="SB-Mid-client-3x1AxTOk89GduFm7"
        ></script>
        {/* <!-- Note: replace with src="https://app.midtrans.com/snap/snap.js" for Production environment --> */}
      </Helmet>
      <div className=" items-center flex justify-center h-full">
        <Card
          border="primary"
          style={{ width: "30rem" }}
          className="mt-10 mb-10"
        >
          <Card.Body>
            <Card.Header className="text-center">
              Restoran Sop Duren 97
            </Card.Header>
            <Card.Title className="mt-2">
              Nama Pemesan: {tableDetail?.name}
            </Card.Title>
            <Card.Title className="mt-2">
              pesanan meja #{tableDetail?.table_name}
            </Card.Title>
            <Card.Subtitle className=" text-muted">
              {tableDetail?.time_start}
            </Card.Subtitle>
            <Card.Text className="text-center text-black">
              Menu yang dipesan
            </Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup as="ol" numbered>
                {menu &&
                  menu.map((item) => (
                    <ListGroup.Item
                      key={item.id_keranjangs}
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.product[0].name}</div>
                        {item.keterangan !== "undefined" ? (
                          <p className="new">{item.keterangan}</p>
                        ) : (
                          <></>
                        )}
                        <Badge
                          bg="primary"
                          className="mt-3 mr-3 text-center"
                          style={{ width: "20px", height: "20px" }}
                        >
                          {item.jumlah}
                        </Badge>
                        <p className="text-black">
                          Rp. {numberWithCommas(item.total_harga)}
                        </p>
                      </div>
                    </ListGroup.Item>
                  ))}
                <Card.Title className="mt-2 ml-3">
                  Total Harga: Rp. {numberWithCommas(totalBayar)}
                </Card.Title>
                <span className="flex gap-[3px]">
                  *Jika memilih bayar dikasir, Klik{" "}
                  <span
                    className="cursor-pointer text-blue underline"
                    onClick={() => {
                      handleDisini();
                    }}
                  >
                    {" "}
                    di sini{" "}
                  </span>{" "}
                  untuk membayar
                </span>
              </ListGroup>
            </ListGroup>
          </Card.Body>

          <Card.Body className="text-center">
            <Button
              variant="primary"
              className="mr-5"
              onClick={() => {
                navigate(`/Order/${id}`);
              }}
            >
              Kembali
            </Button>{" "}
            <Button
              variant="primary"
              className="mr-5"
              onClick={() => {
                handlePayButton();
              }}
            >
              Bayar Langsung
            </Button>{" "}
          </Card.Body>
        </Card>
      </div>

      {modalOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="absolute z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          style={{
            top: "50%",
            left: "54%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <div className="w-full flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-[80px] h-[80px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 mt-3 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Data telah diterima, silahkan bayar ke kasir dan sebutkan nama
                  serta nomor telepon
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={() => {
                    navigate(`/home/${id}`);
                  }}
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sukses;
