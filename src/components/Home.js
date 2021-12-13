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
      <Header />
      <Container>
        <ImgSlider/>
      </Container>
      <Featured />
      <FindInCountries />
      <Upcoming />
      <Work/>
      <RealEstate/>
    </>
  );
};

const Container = styled.main`
  position: relative;
  // overflow-x: hidden;
  // display: block;
  top: 0;

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
