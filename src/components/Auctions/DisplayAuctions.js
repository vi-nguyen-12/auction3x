import React, { useEffect, useState, useRef } from "react";
import "../../styles/realEstate.css";
import { Modal, Table, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Confirm from "../Users/EmailConfirm";
import ForgotPass from "../Users/ForgotPass";
import ChangePass from "../Users/ChangePass";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BuyConfirm from "../BuyRegister/BuyConfirm";
import MultiBuyForm from "../BuyRegister/MultiBuyForm";
import { useSelector } from "react-redux";
import Login from "../Users/Login";
import SignUp from "../Users/SignUp";
import { Tab, Tabs } from "react-bootstrap";
import NumberFormat from "react-number-format";
import AuctionTimer from "./AuctionTimer";
import { BsStar, BsStarFill } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { RiVideoLine } from "react-icons/ri";
import { Md360 } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import DisplayRealEstate from "../RealEstate/DisplayRealEstate";
import DisplayCar from "../Cars/DisplayCar";
import DisplayJet from "../Jets/DisplayJet";
import DisplayYacht from "../Yachts/DisplayYacht";

function DisplayAuctions({ colorChange, toogleChange }) {
  const { id } = useParams();
  const auctions = useSelector((state) => state.auction);
  const properties = useSelector((state) => state.property);

  const upcoming = properties.filter((item) => item._id === id);
  const auction = auctions.filter((item) => item._id === id);

  const propAuction =
    auction.length > 0 ? auction[0] : upcoming.length > 0 ? upcoming[0] : null;

  return (
    <>
      {propAuction.property.type === "real-estate" ? (
        <DisplayRealEstate
          property={propAuction}
          colorChange={colorChange}
          toogleChange={toogleChange}
        />
      ) : propAuction.property.type === "car" ? (
        <DisplayCar
          property={propAuction}
          colorChange={colorChange}
          toogleChange={toogleChange}
        />
      ) : propAuction.property.type === "jet" ? (
        <DisplayJet
          property={propAuction}
          colorChange={colorChange}
          toogleChange={toogleChange}
        />
      ) : propAuction.property.type === "yacht" ? (
        <DisplayYacht
          property={propAuction}
          colorChange={colorChange}
          toogleChange={toogleChange}
        />
      ) : (
        <h1>Property not found, please check the url and try again.</h1>
      )}
    </>
  );
}

export default DisplayAuctions;
