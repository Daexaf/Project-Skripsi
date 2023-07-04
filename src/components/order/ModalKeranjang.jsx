import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import numberWithCommas from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL2 } from "../../utils/constants";
import { useParams } from "react-router-dom";

const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
}) => {
  // console.log(keranjangDetail, "detail");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      jumlah: jumlah,
      keterangan: keterangan,
      total_harga: keranjangDetail.product[0].harga * jumlah,
      product: keranjangDetail.product[0],
    };

    console.log(keranjangDetail.id_keranjangs, "id keranjang");
    const id_t = keranjangDetail.id_tables;
    axios
      .put(API_URL2 + `keranjangs?id_tables=${id_t}`, data)
      .then((res) => {
        console.log("data berhasil disimpan", res);
      })
      .catch((error) => {
        console.log(error, "simpan error");
      });
    handleClose();
  };

  if (keranjangDetail) {
    const { product, total_harga, jumlah } = keranjangDetail;
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {product[0].name}{" "}
            <strong>(Rp. {numberWithCommas(product[0].harga)})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga: </Form.Label>
              <p className="text-black">
                <strong>Rp. {numberWithCommas(total_harga)}</strong>
              </p>
            </Form.Group>

            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah :</Form.Label>
              <Button
                variant="primary"
                size="sm"
                className="ml-2 mb-8 mr-2"
                onClick={() => {
                  kurang();
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <strong>{jumlah}</strong>
              <Button
                variant="primary"
                size="sm"
                className="ml-2 mb-8"
                onClick={() => {
                  tambah();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>

            <Form.Group className="" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="contoh: pedas, ga pake nasi"
                name="keterangan"
                defaultValue={keterangan}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" icons={faTrash} onClick={handleClose}>
            Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  // });
};

export default ModalKeranjang;
