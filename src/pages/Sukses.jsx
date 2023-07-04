import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, ListGroup, Badge, Button, Card } from "react-bootstrap";
import axios from "axios";
import "./sukses.css";
import { API_URL2 } from "../utils/constants";
import { useParams } from "react-router-dom";

const Sukses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let [hasil, setHasil] = useState();
  const [tableDetail, setTableDetail] = useState();
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
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(API_URL + `keranjangs?id_tables=${id}`)
  //     .then((res) => {
  //       setHasil(res.data);
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [id]);
  // console.log(hasil);

  // const handleSubmit = () => {
  //   axios
  //     .delete(API_URL + `keranjangs?id_tables=${id}`)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div className=" items-center flex justify-center h-screen">
      <Card border="primary" style={{ width: "30rem" }} className="mt-10 mb-10">
        <Card.Body>
          <Card.Header className="text-center">
            Restoran Sop Duren 97
          </Card.Header>
          <Card.Title className="mt-2">
            Nama Pemesan {tableDetail?.name}
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
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                  <Badge bg="primary">7</Badge>
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                </div>
                <Badge bg="secondary">9</Badge>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                </div>
                <Badge bg="primary" pill>
                  14
                </Badge>
              </ListGroup.Item>
              <Card.Title className="mt-2 ml-3">
                Total Harga: {tableDetail?.table_name}
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
          <Button variant="primary">Bayar</Button>{" "}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sukses;
