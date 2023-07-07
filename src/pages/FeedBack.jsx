import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL2 } from "../utils/constants";
import { ListGroup, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [datac, setDatac] = useState(null);

  useEffect(() => {
    axios.get(API_URL2 + `table/${id}`).then((res) => {
      console.log(res.data.data[0], "ini ga ada idnya");
      setDatac(res.data.data[0]);
    });
  }, [id]);

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
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
        rating,
        comment,
      };

      const response = await axios.post(`${API_URL2}/feedback`, feedbackData);
      console.log(response.data); // Tampilkan respon dari server jika diperlukan

      // Reset nilai dan komentar setelah pengiriman berhasil
      setRating(0);
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
            <Card.Title className="mt-2">Nama Pemesan:</Card.Title>
            <Card.Title className="mt-2">pesanan meja #</Card.Title>
            <Card.Subtitle className=" text-muted">jam</Card.Subtitle>
            <Card.Text className="text-center text-black">
              Customer Feedback
            </Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup as="ol" numbered>
                <h3>Feedback</h3>
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
                navigate(`/sukses/${id}`);
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
