import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { Container } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { endData } from "../../app/counterSlice";
import axios from "axios";
import { API_URL2 } from "../../utils/constants";

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
];

const Header = () => {
  const timeTaken = useSelector((state) => state.counter.timeTaken);
  const menuRef = useRef();
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  const navigate = useNavigate();
  const { id_tables } = useParams();
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(null);
  const [datac, setdatac] = useState(null);

  useEffect(() => {
    axios.get(API_URL2 + `table/${id_tables}`).then((res) => {
      console.log(res.data.data[0], "ini ga ada idnya");
      setdatac(res.data.data[0]);
    });
  }, [id_tables]);

  const handleOrder = () => {
    dispatch(endData(Date.now()));

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
    axios.put(API_URL2 + `table/${id_tables}`, data).then((res) => {
      // navigate(`/Home/${id}`);
      console.log(res);
    });

    navigate(`/Order/${id_tables}`);
  };
  console.log(timeTaken);

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
              E-Duren
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
