import React, { useState, useEffect } from "react";
import "./MenuPack.css";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../product-card/ProductCard";
import axios from "axios";
import { API_URL2 } from "../../utils/constants";

const MenuPack = () => {
  const [filter, setFilter] = useState("HOT-PLATE");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fungsi untuk mendapatkan data produk dari database menggunakan axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL2 + "product/"); // Ganti dengan URL endpoint yang sesuai
        const data = response.data.data;
        setProducts(data);
        console.log(data, "ini data");
      } catch (error) {
        console.log("Error:", error);
      }
    };

    axios.get(API_URL2 + "categories").then((res) => {
      console.log(res.data.data);
      const cate = res.data.data;
      setCategories(cate);
    });

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setFilter(category);
  };

  const filteredProducts = products.filter(
    (product) => product.category === filter
  );

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-4">
            <h3 className="menu__title">Our Menu Pack</h3>
          </Col>
          <Col lg="12" className="text-center mb-5">
            {categories.map((category) => (
              <button
                key={category.id_categories}
                className={`filter-btn ${
                  filter === category.name ? "active__btn" : ""
                }`}
                onClick={() => handleCategoryChange(category.name)}
              >
                {category.name}
              </button>
            ))}
          </Col>

          {filteredProducts.map((product) => (
            <div key={product.id_products}>{product.name}</div>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MenuPack;
