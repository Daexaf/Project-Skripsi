import React, { Component } from "react";
import { ListGroup, Col, Row, Card } from "react-bootstrap";
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

  tambah = () => {
    const { keranjangDetail, jumlah } = this.state;

    this.setState({
      jumlah: jumlah + 1,
    });

    const totalHarga = keranjangDetail.product[0].harga * (jumlah + 1);
    this.setState({
      keranjangDetail: {
        ...keranjangDetail,
        jumlah: jumlah + 1,
        total_harga: totalHarga,
      },
    });
  };

  kurang = () => {
    const { keranjangDetail, jumlah } = this.state;

    if (jumlah !== 1) {
      this.setState({
        jumlah: jumlah - 1,
      });

      const totalHarga = keranjangDetail.product[0].harga * (jumlah - 1);
      this.setState({
        keranjangDetail: {
          ...keranjangDetail,
          jumlah: jumlah - 1,
          total_harga: totalHarga,
        },
      });
    }
  };

  render() {
    const { keranjangs, setKeranjangs } = this.props;
    return (
      <Col md={6} lg={4} xl={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        <Card className="overflow-auto hasil">
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang, index) => (
              <ListGroup.Item
                key={`${menuKeranjang.product.name} ${index}`}
                onClick={() => this.handleShow(menuKeranjang)}
              >
                <Row>
                  <Col xs={3} sm={2}>
                    <h5 className="mb-3">{menuKeranjang.jumlah}</h5>
                  </Col>
                  <Col xs={9} sm={7}>
                    <h5>{menuKeranjang.product[0].name}</h5>
                    <p className="new">{menuKeranjang.keterangan}</p>
                  </Col>
                  <Col sm={3}>
                    <strong className="float-right">
                      Rp. {numberWithCommas(menuKeranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalKeranjang
              handleClose={this.handleClose}
              {...this.state}
              tambah={this.tambah}
              kurang={this.kurang}
              setKeranjangs={setKeranjangs}
            />
          </ListGroup>
        </Card>
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
