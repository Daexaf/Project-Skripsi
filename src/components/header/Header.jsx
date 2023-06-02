import React, { useRef } from "react";
import "./header.css";
import { Container } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

const navLinks = [
  {
    display: "Home",
    url: "#",
  },
  {
    display: "About",
    url: "#",
  },
  {
    display: "Menu",
    url: "#",
  },
  {
    display: "Contact",
    url: "#",
  },
  // {
  //   display: "Home",
  //   url: "#",
  // },
];

const Header = () => {
  const menuRef = useRef();
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  const navigate = useNavigate();
  const { id } = useParams();
  const handleOrder = () => {
    navigate(`/Order/${id}`);
  };

  return (
    <header className="header">
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className="d-flex align-items-center gap-1">
              <span>
                <i className="ri-restaurant-2-line"></i>
              </span>
              {""}
              Chef Food
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef}>
            <div className="nav__list__wrapper d-flex align-items-center gap-5">
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <a href={item.url} onClick={menuToggle}>
                      {item.display}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="menu__right">
                <div className="custom__search">
                  <input type="text" placeholder="Search items" />
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* <span className="cart__icon">
              <i className="ri-shopping-basket-fill"></i>

              <span className="badge">2</span>
            </span> */}
            <button className="btn btn-danger mb-4 mt-1" onClick={handleOrder}>
              Order
            </button>
          </div>

          <div className="mobile__menu">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
