import React, { Component } from "react";
import { ListGroup, Col, Row } from "react-bootstrap";
import numberWithCommas from "../../utils/utils";
import TotalBayar from "./TotalBayar";
// import { Col } from "reactstrap";
import "./order.css";
import ModalKeranjang from "./ModalKeranjang";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang, index) => (
              <ListGroup.Item
                key={`${menuKeranjang.product.name} ${index}`}
                onClick={() => this.handleShow(menuKeranjang)}
              >
                {console.log(menuKeranjang, "ini menu Keranjang")}
                <Row>
                  <Col xs={2}>
                    {/* <Badge pill bg="success">
                      {menuKeranjang.jumlah}
                    </Badge> */}
                    <h5 className="mb-3">{menuKeranjang.jumlah}</h5>
                  </Col>
                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    <p className="new">
                      Rp. {numberWithCommas(menuKeranjang.product.harga)}
                    </p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      Rp. {numberWithCommas(menuKeranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
                {menuKeranjang.product.name}
                {menuKeranjang.jumlah} <br />
                {menuKeranjang.total_harga}
              </ListGroup.Item>
            ))}
            <ModalKeranjang handleClose={this.handleClose} {...this.state} />
          </ListGroup>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
