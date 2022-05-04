import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { Row, Col, Modal } from "react-bootstrap";
import "../../styles/realEstate.css";
import RealEstatePage from "../RealEstate/RealEstatePage";
import CarPage from "../Cars/CarPage";
import JetPage from "../Jets/JetPage";
import YachtPage from "../Yachts/YachtPage";

const PropertyPages = ({ toogleChange }) => {
  const path = window.location.pathname;
  return (
    <>
      <h5 className="realHeader">
        {path === "/cars" ? (
          <p
            style={{
              fontSize: "4rem",
              color: "#fcbe91",
              margin: "0",
              alignItems: "center",
            }}
          >
            CAR
          </p>
        ) : path === "/jets" ? (
          <p
            style={{
              fontSize: "4rem",
              color: "#fcbe91",
              margin: "0",
              alignItems: "center",
            }}
          >
            JET
          </p>
        ) : path === "/yachts" ? (
          <p
            style={{
              fontSize: "4rem",
              color: "#fcbe91",
              margin: "0",
              alignItems: "center",
            }}
          >
            YACHT
          </p>
        ) : (
          <p
            style={{
              fontSize: "4rem",
              color: "#fcbe91",
              margin: "0",
              alignItems: "center",
            }}
          >
            REAL ESTATE
          </p>
        )}
      </h5>
      {path === "/realEstates" ? (
        <RealEstatePage toogleChange={toogleChange} />
      ) : path === "/cars" ? (
        <CarPage toogleChange={toogleChange} />
      ) : path === "/jets" ? (
        <JetPage toogleChange={toogleChange} />
      ) : path === "/yachts" ? (
        <YachtPage toogleChange={toogleChange} />
      ) : null}
    </>
  );
};

export default PropertyPages;
