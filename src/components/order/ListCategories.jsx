import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL2 } from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
  faIceCream,
  faBowlFood,
} from "@fortawesome/free-solid-svg-icons";
import "./order.css";

const Icon = ({ name }) => {
  if (name === "Popular")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (name === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="mr-1" />;
  if (name === "Topping")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
  if (name === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
  if (name === "Menu Ice Cream")
    return <FontAwesomeIcon icon={faIceCream} className="mr-2" />;
  if (name === "Sop Durian Topping")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
  if (name === "Menu Rice Bowl")
    return <FontAwesomeIcon icon={faBowlFood} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL2 + "categories")
      .then((res) => {
        const categories = res.data.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoryChoose } = this.props;

    return (
      <Col md={2} mt="2">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />

        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id_categories}
                onClick={() => changeCategory(category.name)}
                className={categoryChoose === category.name && "active"}
                style={{ cursor: "pointer" }}
              >
                <h5>
                  <Icon name={category.name} /> {category.name}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
