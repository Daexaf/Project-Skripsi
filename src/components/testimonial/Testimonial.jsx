import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./testimonial.css";
import testimonialImg from "../../assets/images/geprek.jpg";
import Slider from "react-slick";
import { useNavigate, useParams } from "react-router-dom";

const Testimonials = () => {
  const navigate = useNavigate();
  let { id_tables } = useParams();
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <section id="review">
      <Container>
        <Row>
          <Col lg="8" sm="12" md="12" className="m-auto">
            <div className="slider__wrapper d-flex align-items-center gap-5  ">
              <div className="slider__content w-50">
                <h2 className="mb-4 ps-3 tulisan">
                  What our customers are saying
                </h2>
                <Slider {...settings}>
                  <div>
                    <div className="single__testimonial">
                      <p className="review__content">
                        "Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Perferendis aliquam numquam laudantium atque velit
                        accusamus ipsum molestias, maiores amet! Earum nobis
                        neque odit natus cumque a expedita, corrupti libero!
                        Praesentium!"
                      </p>

                      <h6>Jhon Doe</h6>
                      <p>Pelanggan</p>
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial">
                      <p className="review__content">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Perferendis aliquam numquam laudantium atque velit
                        accusamus ipsum molestias, maiores amet! Earum nobis
                        neque odit natus cumque a expedita, corrupti libero!
                        Praesentium!
                      </p>

                      <h6>Jhon Doe</h6>
                      <p>Pelanggan</p>
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial">
                      <p className="review__content">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Perferendis aliquam numquam laudantium atque velit
                        accusamus ipsum molestias, maiores amet! Earum nobis
                        neque odit natus cumque a expedita, corrupti libero!
                        Praesentium!
                      </p>

                      <h6>Jhon Doe</h6>
                      <p>Pelanggan</p>
                    </div>
                  </div>
                </Slider>
              </div>

              <div className="slider__img w-50">
                <img src={testimonialImg} alt="" className="w-100" />
              </div>
            </div>
          </Col>
          <button
            onClick={() => {
              navigate(`/feedback/${id_tables}`);
            }}
          >
            Berikan Masukkan anda!
          </button>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
