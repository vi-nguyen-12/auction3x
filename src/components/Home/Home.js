import React, { useState, useEffect, useRef } from "react";
import { Featured } from "./Featured";
import FindInCountries from "./FindInCountries";
import ImgSlider from "./ImgSlider";
import Work from "./work";
import RealEstate from "./realEstate";
import authService from "../../services/authServices.js";
import { useParams } from "react-router-dom";
import { Upcoming } from "../Auctions/Upcoming";

import About from "./About";

const Home = ({ toggleSignIn, windowSize }) => {
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

  const params = useParams();

  useEffect(() => {
    if (params.sectionId === "feature") {
      window.scrollTo(0, 800);
    } else if (params.sectionId === "upcoming") {
      window.scrollTo(0, windowSize > 800 ? 2800 : 3500);
    }
  }, []);

  return (
    <>
      <ImgSlider
        featureAuctions={featureAuctions}
        onGoingAuctions={onGoingAuctions}
        upcomingAuctions={upcomingAuctions}
      />
      <Featured
        toggleSignIn={toggleSignIn}
        featureAuctions={featureAuctions}
        windowSize={windowSize}
      />
      <FindInCountries />
      <Upcoming
        toggleSignIn={toggleSignIn}
        upcomingAuctions={upcomingAuctions}
        windowSize={windowSize}
      />
      <Work />
      <RealEstate />
      <About />
    </>
  );
};

export default Home;
