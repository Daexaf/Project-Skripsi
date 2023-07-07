import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./choose-us.css";
import dimsum from "../../assets/images/Fix/cemilan/dimsum.jpeg";

const ChooseUs = () => {
  return (
    <section id="about">
      <Container>
        <Row>
          <Col lg="6">
            <img src={dimsum} alt="" />
          </Col>
          <Col lg="6" md="6">
            <div className="choose__content">
              <h4>Who we are?</h4>
              <h2>Take a look at the benefits we offer you</h2>
              <p>
                Selamat datang di Restoran Sop Duren 97, tempat di mana sensasi
                kuliner bertemu dengan kelezatan tak tertandingi. Sejak tahun
                1997, kami telah menjadi destinasi yang terkenal dalam dunia
                kuliner, menyajikan hidangan sop duren dengan cita rasa yang
                autentik dan kualitas yang terjamin.
              </p>
            </div>
            <div className="features mt-4">
              <div className="feature1 d-flex align-items-center gap-5">
                <div className="single__feature">
                  <span>
                    <i className="ri-timer-flash-line"></i>
                  </span>
                  <h6>Fast Time Response</h6>
                  <p>pelayanan yang cepat dan baik</p>
                </div>

                <div className="single__feature">
                  <span className="feature__icon-2">
                    <i className="ri-money-dollar-circle-line"></i>
                  </span>
                  <h6>Street Price of five star Quality</h6>
                  <p>Kenikmatan bintang lima dengan harga kaki lima.</p>
                </div>
              </div>

              <div className="feature1 mt-3 d-flex align-items-center gap-5">
                <div className="single__feature">
                  <span className="feature__icon-3">
                    <i className="ri-secure-payment-line"></i>
                  </span>
                  <h6>Secure Payment</h6>
                  <p>Pembayaran aman, terpercaya</p>
                </div>

                <div className="single__feature">
                  <span className="feature__icon-4">
                    <i className="ri-service-line"></i>
                  </span>
                  <h6>Professional Service</h6>
                  <p> pelayanan profesional dan ramah kepada pelanggan</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ChooseUs;
