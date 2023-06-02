import React, { useState, useEffect } from "react";
import "./MenuPack.css";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../product-card/ProductCard";
import {
  cemilan,
  hotplate,
  menu_ayam,
  topping,
} from "../../assets/data/products";

const MenuPack = () => {
  const [filter, setFilter] = useState("HOT-PLATE");
  const [products, setProducts] = useState(hotplate);

  useEffect(() => {
    if (filter === "HOT-PLATE") {
      setProducts(hotplate);
    }
    if (filter === "MENU-AYAM") {
      setProducts(menu_ayam);
    }
    if (filter === "TOPPING") {
      setProducts(topping);
    }
    if (filter === "CEMILAN") {
      setProducts(cemilan);
    }
  }, [filter]);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-4">
            <h3 className="menu__title">Our Menu Pack</h3>
          </Col>
          <Col lg="12" className="text-center mb-5">
            <button
              className={`filter-btn ${
                filter === "CEMILAN" ? "active__btn" : ""
              }`}
              onClick={() => setFilter("CEMILAN")}
            >
              Cemilan
            </button>
            <button
              className={`filter-btn ${
                filter === "HOT-PLATE" ? "active__btn" : ""
              }`}
              onClick={() => setFilter("HOT-PLATE")}
            >
              Hot plate
            </button>
            <button
              className={`filter-btn ${
                filter === "MENU-AYAM" ? "active__btn" : ""
              }`}
              onClick={() => setFilter("MENU-AYAM")}
            >
              Menu Ayam
            </button>
            <button
              className={`filter-btn ${
                filter === "TOPPING" ? "active__btn" : ""
              }`}
              onClick={() => setFilter("TOPPING")}
            >
              Topping
            </button>
          </Col>

          {products.map((item) => (
            <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
              <ProductCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MenuPack;
