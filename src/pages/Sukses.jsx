import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ListGroup, Badge, Button, Card } from "react-bootstrap";
import axios from "axios";
import "./sukses.css";
import { API_URL2, API_URL4 } from "../utils/constants";
import numberWithCommas from "../utils/utils";
import { Helmet } from "react-helmet";

const Sukses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tableDetail, setTableDetail] = useState();
  const [menu, setMenus] = useState();
  const [totalBayar, setTotalBayar] = useState(0);
  const [status, setStatus] = useState(false);

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
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });

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
  }, [id, menu]);

  // useEffect(() => {
  //   const calculateTotalBayar = () => {
  //     if (menu) {
  //       const total = menu.reduce(
  //         (result, item) => result + item.total_harga,
  //         0
  //       );
  //       setTotalBayar(total);
  //     }
  //   };

  //   calculateTotalBayar();
  // }, [menu]);

  const handlePayButton = async (e) => {
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
      status: status,
    };
    try {
      const token = await axios.post(API_URL2 + "table/checkout", data);
      const tokenApp = token.data;
      window.snap.pay(tokenApp, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          alert("payment success!");
          console.log(result);
          setStatus(true);
          navigate(`/feedback/${id}`);
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
      await axios.post(API_URL2 + "receipt", dataPush);
    } catch (err) {
      console.log("hmmmmmmmmm", err);
    }
  };

  return (
    <>
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
                *Jika memilih bayar dikasir, tunjukkan halaman untuk melakukan
                pembayaran
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
    </>
  );
};

export default Sukses;
