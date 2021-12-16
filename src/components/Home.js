import styled from "styled-components";
import { Featured } from "./Featured";
import { FindInCountries } from "./FindInCountries";
import Header from "./Header";
import ImgSlider from "./ImgSlider";
import Work from "./Home/work";
import RealEstate from "./Home/realEstate";
import Footer from "./Home/footer";
import { Upcoming } from "./Upcoming";
import Toast from "./Toast"
import { useState } from "react";
import { useSelector } from "react-redux";

const Home = (props) => {
  // const property = useSelector(state => state.property);

  return (
    <>
      <ImgSlider/>
      <Featured />
      <FindInCountries />
      <Upcoming />
      <Work/>
      <RealEstate/>
    </>
  );
};

export default Home;
