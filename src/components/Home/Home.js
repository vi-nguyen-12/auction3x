import React, { useState, useEffect } from "react";
import { Featured } from "./Featured";
import FindInCountries from "./FindInCountries";
import ImgSlider from "./ImgSlider";
import Work from "./work";
import RealEstate from "./realEstate";
import authService from "../../services/authServices.js";

import { Upcoming } from "../Auctions/Upcoming";

import About from "./About";

const Home = ({ toogleSignIn }) => {
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
      <Featured toogleSignIn={toogleSignIn} featureAuctions={featureAuctions} />
      <FindInCountries />
      <Upcoming
        toogleSignIn={toogleSignIn}
        upcomingAuctions={upcomingAuctions}
      />
      <Work />
      <RealEstate />
      <About />
    </>
  );
};

export default Home;
