import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, ListGroup, Badge, Button, Card } from "react-bootstrap";
import axios from "axios";
import "./sukses.css";
import { API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";

const Sukses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let [hasil, setHasil] = useState();

  // useEffect(() => {
  //   axios
  //     .get(API_URL + "keranjangs")
  //     .then((res) => {
  //       const keranjangs = res.data;
  //       keranjangs.map(function (item) {
  //         return axios
  //           .delete(API_URL + "keranjangs/" + item.id)
  //           .then((res) => console.log(res))
  //           .catch((error) => console.log(error));
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("Error yaa ", error);
  //     });
  // }, []);

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
          <Card.Title className="mt-2">pesanan meja #3</Card.Title>
          <Card.Subtitle className=" text-muted">waktu</Card.Subtitle>
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
            </ListGroup>
          </ListGroup>
        </Card.Body>

        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sukses;
