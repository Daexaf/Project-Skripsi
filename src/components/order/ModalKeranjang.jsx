import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import numberWithCommas from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL2 } from "../../utils/constants";

const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  tambah,
  kurang,
  setKeranjangs,
}) => {
  // console.log(keranjangDetail, "detail");
  const [keterangan, setKeterangan] = useState("");

  const handleChangeKeterangan = (event) => {
    setKeterangan(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id_k = keranjangDetail.id_keranjangs;
    const id_table = keranjangDetail.id_tables;
    const id_prod = keranjangDetail.product[0].id_products;
    const data = {
      id_keranjangs: id_k,
      jumlah: jumlah,
      total_harga: keranjangDetail.product[0].harga * jumlah,
      product: id_prod,
      id_tables: id_table,
      keterangan: keterangan,
    };

    console.log(keranjangDetail.id_keranjangs, "id keranjang");
    console.log(keranjangDetail, "id table");

    await axios.put(API_URL2 + `keranjangs/${id_k}`, data);

    const updatedData = await axios.get(
      API_URL2 + `keranjangs?id_tables=${id_table}`
    );
    setKeranjangs(updatedData.data.data);
    console.log(updatedData, "trigger");
    handleClose();
  };

  const handleHapus = async (e) => {
    const id_k = keranjangDetail.id_keranjangs;
    const id_table = keranjangDetail.id_tables;

    await axios.delete(API_URL2 + `keranjangs/${id_k}`);

    const getData = await axios.get(
      API_URL2 + `keranjangs?id_tables=${id_table}`
    );
    setKeranjangs(getData.data.data);
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
                value={keterangan}
                onChange={handleChangeKeterangan}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            icons={faTrash}
            onClick={() => {
              handleHapus();
            }}
          >
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
