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
  // const user = useSelector((state) => state.user);
  const { id } = useParams();

  // const registProperty = useSelector((state) => state.registProperty);
  // let checkProperty = [];
  // for (let i = 0; i < registProperty.length; i++) {
  //   checkProperty = [...checkProperty, registProperty[i]];
  // }
  // const registeredProperty = checkProperty.find((item) => item._id === id);
  // const [setRegistered, setRegisteredProperty] = useState(false);
  // const [registerEnded, setRegisterEnded] = useState();
  // const [approvedToBid, setApprovedToBid] = useState(false);

  const auctions = useSelector((state) => state.auction);
  const properties = useSelector((state) => state.property);

  // const [auction, setAuction] = useState([]);
  // const [auctionProp, setAuctionProp] = useState();
  // const [topBid, setTopBid] = useState();

  // const [onGoingAuctionEnd, setOnGoingAuctionEnd] = useState();

  // const [location, setLocation] = useState([]);
  // const [favorite, setFavorite] = useState(false);
  // const [showPics, setShowPics] = useState(false);
  // const [showVideos, setShowVideos] = useState(false);
  // const [showMap, setShowMap] = useState(false);
  // const [showLives, setShowLives] = useState(false);
  // const toggleLive = () => setShowLives(!showLives);
  // const toggleMap = () => setShowMap(!showMap);
  // const toggleVids = () => setShowVideos(!showVideos);
  // const togglePics = () => setShowPics(!showPics);
  // const toggleImage = () => setFavorite(!favorite);

  // const [bid, setBid] = useState(false);
  // const [placeBid, setPlaceBid] = useState(false);
  // const [showRegister, setShowRegister] = useState(false);
  // const toogleRegister = () => setShowRegister(!showRegister);
  // const tooglePlaceBid = () => setPlaceBid(!placeBid);

  // const toogleBid = () => setBid(!bid);
  // const [showSignIn, popSignIn] = useState(false);
  // const [showSignUp, popUpSignUp] = useState(false);
  // const [showConfirm, popupConfirm] = useState(false);
  // const [showButton, popButton] = useState(false);
  // const [forgotPass, popForgotPass] = useState(false);
  // const [changePass, popChangePass] = useState(false);
  // const [startAuction, setStartAuction] = useState();
  // const toogleChangePass = () => popChangePass(!changePass);
  // const toogleForgotPass = () => popForgotPass(!forgotPass);
  // const toogleButton = () => popButton(!showButton);
  // const toogleSignIn = () => popSignIn(!showSignIn);
  // const toogleSignUp = () => popUpSignUp(!showSignUp);
  // const toogleConfirmModal = () => popupConfirm(!showConfirm);
  // const [realTab, setRealTab] = useState("Investment Opportunity");

  // //if auction id is found, then set property as already registered
  // const myRef = useRef(null);
  // const executeScroll = () => myRef.current.scrollIntoView(); // run this function from an event handler or pass it to useEffect to execute scroll

  // const handleKYC = () => {
  //   if (!user.KYC) {
  //     return alert("Please Complete your KYC first to bid");
  //   }
  // };

  // useEffect(() => {
  //   colorChange("black");
  //   toogleChange();
  //   //for ongoing auction
  //   const auctionData = auctions.find((item) => item._id === id);
  //   const propertyData = properties.find((item) => item._id === id);
  //   setAuction(auctionData ? auctionData : propertyData);
  //   setAuctionProp(auctionData ? auctionData.property : propertyData.property);

  //   //set registration end
  //   setRegisterEnded(
  //     auctionData ? auctionData.registerEndDate : propertyData.registerEndDate
  //   );

  //   //set dates for ongoing auction end date
  //   setOnGoingAuctionEnd(
  //     auctionData ? auctionData.auctionEndDate : propertyData.auctionEndDate
  //   );
  //   setStartAuction(
  //     auctionData ? auctionData.auctionStartDate : propertyData.auctionStartDate
  //   );

  //   //set location for map
  //   setLocation({
  //     name: "Property Location",
  //     lat: auctionData
  //       ? auctionData.property.details.property_address.latitude
  //       : propertyData.property.details.property_address.latitude,
  //     lng: auctionData
  //       ? auctionData.property.details.property_address.longitude
  //       : propertyData.property.details.property_address.longitude,
  //   });

  //   if (user._id && user.KYC) {
  //     if (registeredProperty !== undefined) {
  //       setRegisteredProperty(true);
  //     }

  //     if (registeredProperty) {
  //       if (registeredProperty.isApproved === "success") {
  //         setApprovedToBid(true);
  //       }
  //     }
  //   }

  //   let topBidders = [];
  //   if (auctionData) {
  //     for (let i = 0; i < auctionData.highestBidders.length; i++) {
  //       topBidders = [...topBidders, auctionData.highestBidders[i]];
  //     }
  //     setTopBid(topBidders.reverse());
  //   } else if (propertyData) {
  //     if (propertyData.highestBidders) {
  //       for (let i = 0; i < propertyData.highestBidders.length; i++) {
  //         topBidders = [...topBidders, propertyData.highestBidders[i]];
  //       }
  //       setTopBid(topBidders.reverse());
  //     } else {
  //       setTopBid([]);
  //     }
  //   }
  // }, [auctions, registProperty]);
  // const [propAuction, setPropAuction] = useState();

  const upcoming = properties.filter((item) => item._id === id);
  const auction = auctions.filter((item) => item._id === id);

  const propAuction = upcoming ? upcoming[0] : auction[0];
  console.log(propAuction);

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
      ) : null}
    </>
  );
}

export default DisplayAuctions;
