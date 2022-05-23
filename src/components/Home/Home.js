import React, { useState, useEffect } from "react";
import { Featured } from "./Featured";
import FindInCountries from "./FindInCountries";
import ImgSlider from "./ImgSlider";
import Work from "./work";
import RealEstate from "./realEstate";
import authService from "../../services/authServices.js";

import { Upcoming } from "../Auctions/Upcoming";

import About from "./About";

const Home = ({ toggleSignIn }) => {
  const [featureAuctions, setFeatureAuctions] = useState([]);
  const [onGoingAuctions, setOnGoingAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);

  useEffect(() => {
    authService.getFeaturedAuctions().then((res) => {
      setFeatureAuctions(res.data);
    });
    authService.getUpcomingAuctions().then((res) => {
      setUpcomingAuctions(res.data);
    });
    authService.getOngoingAuctions().then((res) => {
      setOnGoingAuctions(res.data);
    });
  }, []);

  return (
    <>
      <ImgSlider
        featureAuctions={featureAuctions}
        onGoingAuctions={onGoingAuctions}
        upcomingAuctions={upcomingAuctions}
      />
      <Featured toggleSignIn={toggleSignIn} featureAuctions={featureAuctions} />
      <FindInCountries />
      <Upcoming
        toggleSignIn={toggleSignIn}
        upcomingAuctions={upcomingAuctions}
      />
      <Work />
      <RealEstate />
      <About />
    </>
  );
};

export default Home;
