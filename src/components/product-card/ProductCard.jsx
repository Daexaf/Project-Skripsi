import React from "react";
import "./productCard.css";

const ProductCard = (props) => {
  const { title, imgurl, price } = props.item;
  return (
    <div className="single__product">
      <div className="product__img">
        <img src={imgurl} alt="" className="w-100" />
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
        <h6>{title}</h6>

        <div className="d-flex align-items-center justify-content-between">
          <span className="price d-flex align-items-center">
            Price: $ <span>{price}</span>
          </span>
          <span className="shopping__icon">
            <i className="ri-shopping-cart-line"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
