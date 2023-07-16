import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL2 } from "../utils/constants";
import { ListGroup, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStarIcon } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStarIcon } from "@fortawesome/free-regular-svg-icons";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [datac, setDatac] = useState(null);
  const [menu, setMenus] = useState();
  const [bintang, setBintang] = useState(0);

  useEffect(() => {
    axios.get(API_URL2 + `table/${id}`).then((res) => {
      console.log(res.data.data[0], "ini ga ada idnya");
      setDatac(res.data.data[0]);
    });
    axios
      .get(API_URL2 + `keranjangs?id_tables=${id}`)
      .then((res) => {
        console.log(res.data.data, "ini res keranjang");
        setMenus(res.data.data);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }, [id]);

  const handleRatingChange = (event) => {
    const value = Number(event.target.value);
    setRating(value);
    setBintang(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const today = new Date();
    const converse2 = today.toLocaleString();
    let data = {
      id_tables: datac.id_tables,
      name: datac.name,
      no_telp: datac.no_telp,
      table_name: datac.table_name,
      time_start: datac.time_start,
      time_end: converse2,
    };

    console.log(datac, "data");

    // dispatch(timeData(Date.now()));
    axios.put(API_URL2 + `table/${id}`, data).then((res) => {
      // navigate(`/Home/${id}`);
      console.log(res);
    });
    try {
      const feedbackData = {
        rating_pelayanan: rating,
        rating_makanan: bintang,
        comment,
      };

      const response = await axios.post(`${API_URL2}/feedback`, feedbackData);
      console.log(response.data);

      setRating(0);
      setBintang(0);
      setComment("");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <div className=" items-center flex justify-center h-full">
        <Card
          border="primary"
          style={{ width: "30rem" }}
          className="mt-10 mb-10"
        >
          <Card.Body>
            <Card.Header className="text-center">
              Restoran Sop Duren 97
            </Card.Header>
            <Card.Text className="text-center text-black">
              Customer Feedback
            </Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup as="ol" numbered>
                <div className="form-group">
                  <label>Rating pelayanan:</label>
                  <select
                    value={rating}
                    onChange={handleRatingChange}
                    className="form-control"
                  >
                    <option value={0}>Select rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
                <div className="form-group mt-2">
                  <label>Comment:</label>
                  <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    className="form-control"
                    rows={5}
                  />
                </div>

                {/* <ListGroup>
                  {/* <label>Rating makanan:</label> 
                  {menu &&
                    menu.map((item) => (
                      <ListGroup.Item
                        key={item.id_keranjangs}
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto text-center">
                          <div className="fw-bold">{item.product[0].name}</div>
                          {/* <div className="form-group">
                            <div className="rating-stars">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={
                                    index + 1 <= bintang
                                      ? solidStarIcon
                                      : regularStarIcon
                                  }
                                  onClick={() => setBintang(index + 1)}
                                />
                              ))}
                            </div>
                          </div> 
                        </div>
                      </ListGroup.Item>
                    ))}
                </ListGroup> */}

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </ListGroup>
            </ListGroup>
          </Card.Body>

          <Card.Body className="text-center">
            <Button
              variant="primary"
              className="mr-5"
              onClick={() => {
                navigate(`/home/${id}`);
              }}
            >
              Tutup
            </Button>{" "}
          </Card.Body>
        </Card>
      </div>
    </form>
  );
};

export default FeedbackForm;
