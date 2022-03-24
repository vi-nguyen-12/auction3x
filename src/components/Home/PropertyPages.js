import React, { useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import "../../styles/realEstate.css";
import RealEstatePage from "../RealEstate/RealEstatePage";
import CarPage from "../Cars/CarPage";
import JetPage from "../Jets/JetPage";
import YachtPage from "../Yachts/YachtPage";

const Carousel = styled(Slider)`
  height: 30vh;
  // overflow: hidden;

  & > button {
    opacity: 1;
    height: 100%;
    width: 15vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      top: -3vh;
      font-size: 20px;
      color: gray;
      left: -35px;
    }
  }

  li.slick-active button:before {
    color: #e9af84;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
    width: 12vw;
    height: 100%;
    padding-left: 4%;
  }

  .slick-prev:before {
    color: #e9af84;
    font-size: 50px;
  }

  .slick-next {
    right: -75px;
    width: 12vw;
    height: 100%;
    padding-right: 4%;
  }

  .slick-next:before {
    color: #e9af84;
    font-size: 50px;
  }
`;

const Wrap = styled.div`
border-radius: 4px;
cursor: pointer;
position: relative;


  &:hover {
    padding: 0;
    // border: 4px solid rgba(249, 249, 249, 0.8);
    transition-duration: 300ms;
  }
}
`;

const PropertyPages = ({ colorChange, toogleChange }) => {
  const path = window.location.pathname;
  console.log(path);
  return (
    <>
      <h5 className="realHeader">
        {path === "/cars" ? (
          <p style={{ fontSize: "4rem", color: "#fcbe91" }}>CARS</p>
        ) : path === "/jets" ? (
          <p style={{ fontSize: "4rem", color: "#fcbe91" }}>JETS</p>
        ) : path === "/yachts" ? (
          <p style={{ fontSize: "4rem", color: "#fcbe91" }}>YACHTS</p>
        ) : (
          <p style={{ fontSize: "4rem", color: "#fcbe91" }}>REAL ESTATES</p>
        )}
      </h5>
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
      {path === "/realEstates" ? (
        <RealEstatePage colorChange={colorChange} toogleChange={toogleChange} />
      ) : path === "/cars" ? (
        <CarPage colorChange={colorChange} toogleChange={toogleChange} />
      ) : path === "/jets" ? (
        <JetPage colorChange={colorChange} toogleChange={toogleChange} />
      ) : path === "/yachts" ? (
        <YachtPage colorChange={colorChange} toogleChange={toogleChange} />
      ) : null}
    </>
  );
};

export default PropertyPages;
