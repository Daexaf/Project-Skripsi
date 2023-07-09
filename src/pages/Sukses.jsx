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
  // const table_name = useSelector((state) => state.counter.table_name);
  // console.log(table_name, "nama table");

  useEffect(() => {
    axios
      .get(API_URL2 + `table/${id}`)
      .then((res) => {
        console.log(res.data.data[0]);
        setTableDetail(res.data.data[0]);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });

    axios
      .get(API_URL2 + `keranjangs?id_tables=${id}`)
      .then((res) => {
        console.log(res.data.data, "ini resnya");
        setMenus(res.data.data);
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
  }, [menu]);

  console.log(menu, "ini data menu");

  const handlePayButton = (e) => {
    window.snap.pay("ffa66f4d-937b-472d-a1d2-77aac7dd6452", {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        alert("payment success!");
        console.log(result);
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
                        {item.keterangan}
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
              onClick={() => {
                handlePayButton();
              }}
            >
              Bayar
            </Button>{" "}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Sukses;
