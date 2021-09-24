import styled from "styled-components";
import { Featured } from "./Featured";
import { FindInCountries } from "./FindInCountries";
import Header from "./Header";
import ImgSlider from "./ImgSlider";
import { Upcoming } from "./Upcoming";

const Home = (props) => {

  return (
    <>
      <Header />
      <Container>
        <ImgSlider />
      </Container>
      <Featured />
      <FindInCountries />
      <Upcoming />
    </>
  );
};

const Container = styled.main`
  position: relative;
  overflow-x: hidden;
  display: block;
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
