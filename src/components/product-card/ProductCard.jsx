import React from "react";
import "./productCard.css";

const ProductCard = (props) => {
  const { id_products, name, gambar, harga } = props.item;
  return (
    <div className="single__product" key={id_products}>
      <div className="product__img">
        <img src={gambar} alt="" className="w-100" />
      </div>
      <div className="product__content">
        <div className="rating text-center">
          <span>
            <i className="ri-star-s-fill"></i>
          </span>
          <span>
            <i className="ri-star-s-fill"></i>
          </span>
          <span>
            <i className="ri-star-s-fill"></i>
          </span>
          <span>
            <i className="ri-star-s-fill"></i>
          </span>
          <span>
            <i className="ri-star-s-fill"></i>
          </span>
        </div>
        <h6>{name}</h6>

        <div className="d-flex align-items-center justify-content-between text-center">
          <span className="price d-flex align-items-center text-center">
            Harga: Rp. {harga}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
