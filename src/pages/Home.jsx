import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/header/Header";
import HeroSlider from "../components/hero-slider/HeroSlider";
import PopularMenu from "../components/popular-menu/PopularMenu";
import ChooseUs from "../components/choose-us/ChooseUs";
// import MenuPack from "../components/menu-pack/MenuPack";
import Testimonial from "../components/testimonial/Testimonial";
import Footer from "../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../utils/constants";

const Home = () => {
  const navigate = useNavigate();
  let { id_tables } = useParams();
  const [tableN, setTableN] = useState("");
  // console.log(id_tables, "ini id home");

  useEffect(() => {
    // console.log(tableN, "table data");
    setTimeout(() => {
      navigate(`/table/${tableN}`);
    }, 1800000);
  }, [tableN]);

  useEffect(() => {
    async function getData() {
      const data = await axios.get(API_URL2 + `table/${id_tables}`);
      setTableN(data.data.data[0].table_name);
    }
    getData();
  }, []);

  return (
    <Fragment>
      <Header />
      <HeroSlider />
      <PopularMenu />
      <ChooseUs />
      <Testimonial />
      <Footer />
    </Fragment>
  );
};

export default Home;
