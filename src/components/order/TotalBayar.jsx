import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import numberWithCommas from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { API_URL2 } from "../../utils/constants";
import { Link } from "react-router-dom";
import "./order.css";

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {};
  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} xs={12} className="px-4 bayar">
            <h4 className="hidden md:block">
              Total Harga: Rp.{" "}
              <strong className="float-right mr-2">
                {numberWithCommas(totalBayar)}
              </strong>
            </h4>
            <Button
              variant="primary"
              className="w-100 mb-2 mt-4 mr-2"
              size="lg"
              onClick={() => this.submitTotalBayar(totalBayar)}
              as={Link}
              to={`/sukses/${this.props.idTable}`}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              <strong>Pesan</strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
