import React, { Fragment } from "react";
import Header from "../components/header/Header";
import HeroSlider from "../components/hero-slider/HeroSlider";
import PopularMenu from "../components/popular-menu/PopularMenu";
import ChooseUs from "../components/choose-us/ChooseUs";
import MenuPack from "../components/menu-pack/MenuPack";
import Testimonial from "../components/testimonial/Testimonial";
import Footer from "../components/footer/Footer";
import { useParams } from "react-router-dom";

const Home = () => {
  let id = useParams();
  console.log(id, "ini id home");
  return (
    <Fragment>
      <Header />
      <HeroSlider />
      <PopularMenu />
      <ChooseUs />
      <MenuPack />
      <Testimonial />
      <Footer />
    </Fragment>
  );
};

export default Home;
