import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { Container } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
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
    url: "#about",
  },
  {
    display: "Popular",
    url: "#popular",
  },
  {
    display: "Review",
    url: "#review",
  },
];

const Header = () => {
  // const timeTaken = useSelector((state) => state.counter.timeTaken);
  const menuRef = useRef();
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  const navigate = useNavigate();
  const { id_tables } = useParams();
  const dispatch = useDispatch();
  const [datac, setdatac] = useState([]);
  // const [popup, setPopup] = useState(false);

  useEffect(() => {
    axios.get(API_URL2 + `table/${id_tables}`).then((res) => {
      setdatac(res.data.data[0]);
    });
  }, [id_tables]);

  useEffect(() => {
    // Fungsi untuk mencegah pengguna menekan tombol "Back"
    const preventBackNavigation = (event) => {
      event.preventDefault();
      window.history.forward();
      window.history.replaceState(null, null, window.location.href);
    };

    // Menerapkan event listener ketika komponen dipasang
    window.addEventListener("popstate", preventBackNavigation);

    // Membersihkan event listener ketika komponen akan dilepas
    return () => {
      window.removeEventListener("popstate", preventBackNavigation);
    };
  }, []);
  const nameT = datac.table_name;

  const handleLogout = async () => {
    const today = new Date();
    const converse2 = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    let dataPushtable = {
      id_tables: datac.id_tables,
      name: datac.name,
      no_telp: datac.no_telp,
      table_name: datac.table_name,
      time_start: datac.time_start,
      time_end: datac.time_end,
      time_logout: converse2,
    };

    await axios.put(API_URL2 + `table/${datac.id_tables}`, dataPushtable);
    window.alert("Terima Kasih telah mengunjungi Sop Duren 87");
    navigate(`/table/${nameT}`);
  };
  const handleOrder = () => {
    dispatch(endData(Date.now()));

    navigate(`/Order/${id_tables}`);
  };

  return (
    <header className="header">
      <Container>
        <div className="navigation">
          <div
            className="logo"
            onClick={() => {
              navigate(`/home/${id_tables}`);
            }}
          >
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
            </div>
          </div>
          <>
            <div className="btn-group">
              <button
                className="btn btn-danger mb-4 mt-4 ml-10"
                onClick={handleLogout}
              >
                Logout
              </button>

              <div>
                <button
                  className="btn btn-success mb-4 mt-4 mr-10"
                  onClick={handleOrder}
                >
                  Order
                </button>
              </div>
            </div>
          </>

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
