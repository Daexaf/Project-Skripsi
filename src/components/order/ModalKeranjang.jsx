import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import numberWithCommas from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL2 } from "../../utils/constants";
import { useParams } from "react-router-dom";

const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
}) => {
  // const [id_products] = useParams();
  // axios.get(API_URL2 + "product/" + id_products).then((resProducts) => {
  //   console.log(resProducts.data.data[0].name, "resProducts");
  //   console.log(resProducts.data.data[0].harga, "ini harga");
  //   const name = resProducts.data.data[0].name;
  //   const harga = resProducts.data.data[0].harga;
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.name}{" "}
            <strong>(Rp. {numberWithCommas(keranjangDetail.harga)})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga: </Form.Label>
              <p>
                <strong>
                  Rp. {numberWithCommas(keranjangDetail.keranjang.total_harga)}
                </strong>
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah :</Form.Label>
              <br />
              <Button variant="primary" size="sm" className="ml-4">
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              <strong>{jumlah}</strong>
              <Button variant="primary" size="sm" className="mr-4">
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Enter email" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
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
