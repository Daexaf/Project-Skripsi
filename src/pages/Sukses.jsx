import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, ListGroup, Badge, Button } from "react-bootstrap";
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

  useEffect(() => {
    axios
      .get(API_URL + `keranjangs?id_tables=${id}`)
      .then((res) => {
        setHasil(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  console.log(hasil);

  const handleSubmit = () => {
    axios
      .delete(API_URL + `keranjangs?id_tables=${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-4 text-center">
      {/* <img src="assets/images/sukses.png" width={500} alt="" />
      <Image
        src={`${process.env.PUBLIC_URL}/assets/images/sukses.png`}
        width={500}
        className="center"
      />
      <h2>Pemesanan Berhasil</h2>
      <p>Terima kasih</p>
      <button
        className="btn btn-success mb-5"
        onClick={() => navigate(`/Order/${id}`)}
      >
        Kembali
      </button> */}
      <ListGroup as="ol" numbered>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              {hasil?.map((e, i) => (
                <div className="d-flex center" key={i}>
                  <h1>{e.product.nama}</h1>
                  <p>{e.jumlah}</p>
                </div>
              ))}
            </div>
            Cras justo odio
          </div>
          <Badge bg="primary" pill>
            14
          </Badge>
        </ListGroup.Item>
      </ListGroup>

      <Button className="btn btn-primary" onClick={handleSubmit}>
        Selesai
      </Button>
    </div>
  );
};

export default Sukses;
