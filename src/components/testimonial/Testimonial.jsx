import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "./testimonial.css";
import testimonialImg from "../../assets/images/geprek.jpg";
import Slider from "react-slick";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Testimonials = () => {
  const navigate = useNavigate();
  let { id_tables } = useParams();
  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [rating, setRating] = useState();
  const [comment, setComment] = useState([]);
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const getReviewData = async () => {
      try {
        const response = await axios.get(API_URL2 + "review");
        setData(response.data.data); // Mengatur state comment dengan data review dari API
        console.log(response.data.data, "isi response");
      } catch (error) {
        console.error("Terjadi kesalahan dalam mengambil data review:", error);
      }
    };

    getReviewData();
  }, []);
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
                <Slider {...settings} className="mb-2">
                  {data &&
                    data.map((testimonial) => (
                      <div key={testimonial}>
                        <div className="single__testimonial">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, index) => (
                              <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                style={{ color: "#ffc107" }}
                                className="mb-1"
                              />
                            )
                          )}
                          <p className="review__content mb-3">
                            {testimonial.comment}
                          </p>
                          <div></div>
                          <h6 className="mb-1">{testimonial.name}</h6>
                          <p>Pelanggan</p>
                        </div>
                      </div>
                    ))}
                </Slider>
                <button
                  className="button-feedback"
                  onClick={() => {
                    navigate(`/feedback/${id_tables}`);
                  }}
                >
                  Berikan Masukkan anda!
                </button>
              </div>

              <div className="slider__img w-50">
                <img src={testimonialImg} alt="" className="w-100" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
