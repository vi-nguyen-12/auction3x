import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Row, Col } from "react-bootstrap";
import { CardComp } from "../components/Card";
import "../styles/realEstate.css";

const RealEstates = ({ colorChange }) => {
  colorChange("black");
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const property = useSelector((state) => state.property);

  return (
    <>
      <tr className="realHeader">
        <h2 style={{ color: "rgb(233,175,132)" }}>REAL ESTATE</h2>
      </tr>

      <div className="realEstateFilter">
        <div className="searchBar">
          <SearchBar />
        </div>
        <div className="dropdown">
          <select className=" RealButton ">
            <option>Auction Type</option>
            <option href="#">Profile</option>
            <option href="#">My Ads</option>
          </select>
        </div>
        <div className="dropdown">
          <select className=" RealButton ">
            <option>Property Type</option>
            <option href="#">Profile</option>
            <option href="#">My Ads</option>
          </select>
        </div>
        <div className="dropdown">
          <select className=" RealButton ">
            <option>Price</option>
            <option href="#">Profile</option>
            <option href="#">My Ads</option>
          </select>
        </div>
        <div className="dropdown">
          <select className=" RealButton ">
            <option>Bldg Siize</option>
            <option href="#">Profile</option>
            <option href="#">My Ads</option>
          </select>
        </div>
        <div className="dropdown">
          <select className=" RealButton ">
            <option>More Filter</option>
            <option href="#">Profile</option>
            <option href="#">My Ads</option>
          </select>
        </div>
        <div className="dropdown">
          <select className=" RealButton ">
            <option>Sort</option>
            <option href="#">Profile</option>
            <option href="#">My Ads</option>
          </select>
        </div>
        <div className="filterResult">
          <div>About 9,620 results</div>
          <button className="mapButton">Map</button>
          <button className="galleryButton">Gallery</button>
        </div>
      </div>
      <div className="mt-5">
        <Row>
          <Col
            md={10}
            className="m-auto pt-2"
            style={{ fontSize: "30px", fontWeight: "bolder", color: "black" }}
          >
            Properties
          </Col>
        </Row>
        <Col md={10} className="m-auto pt-2">
          <Row>
            {property.map((item) => (
              <Col key={item._id} md={4} style={{ marginBottom: "30px" }}>
                <CardComp
                  url={item.images[0].url}
                  data={item.details}
                  id={item._id}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </div>
    </>
  );
};

const Carousel = styled(Slider)`
  height: 99vh;
  overflow: hidden;

  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      top: -22vh;
      font-size: 10px;
      color: white;
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
    width: 19vw;
    height: 100%;
  }

  .slick-next {
    right: -75px;
    width: 19vw;
    height: 100vh;
  }
`;

const Wrap = styled.div`
  //border-radius: 4px;
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 0;

    img {
      width: 100%;
      height: 100vh;
    }

    // &:hover {
    //   padding: 0;
    //   // border: 4px solid rgba(249, 249, 249, 0.8);
    //   transition-duration: 300ms;
    // }
  }
`;

const HomeBottom = styled.div`
  position: absolute;
  bottom: 20vh;
  z-index: 1;
  left: 5vw;
  a {
    color: white !important;
    font-size: 24px;
    font-weight: bolder;
    box-shadow: none !important;
  }
  span {
    color: white;
    font-size: 14px;
    font-weight: bolder;
  }
`;

const FilterMenu = styled.div`
  position: absolute;
  bottom: 10vh;
  z-index: 1;
  left: 5vw;
  width: 90vw;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Flex1 = styled.div`
  flex: 1;
  padding-right: 30px;
`;

const Flex2 = styled.div`
  flex: 5;
  padding-right: 30px;
`;

export default RealEstates;
