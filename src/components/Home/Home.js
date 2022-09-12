import React, { useState, useEffect, useRef } from "react";
import { Featured } from "./Featured";
import Features from "./NewHome/Features";
import FindInCountries from "./FindInCountries";
import PrimeCate from "./NewHome/PrimeCate";
import ImgSlider from "./ImgSlider";
import PremiumProp from "./NewHome/PremiumProp";
import Work from "./work";
import How from "./NewHome/How";
import Info from "./NewHome/Info";
import RealEstate from "./realEstate";
import authService from "../../services/authServices.js";
import { useParams } from "react-router-dom";
import { Upcoming } from "../Auctions/Upcoming";
import UpcomingAuctions from "./NewHome/UpcomingAuctions";
import Loading from "../Loading";
import About from "./About";

const Home = ({ toggleSignIn, windowSize }) => {
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const [featureAuctions, setFeatureAuctions] = useState([]);
  const [onGoingAuctions, setOnGoingAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [auctions, setAuctions] = useState([]);

  useEffect(async () => {
    setLoader(true);
    await authService.getFeaturedAuctions().then((res) => {
      setFeatureAuctions(
        res.data.filter(
          (auction) => auction.auctionEndDate > new Date().toISOString()
        )
      );
    });
    await authService.getUpcomingAuctions().then((res) => {
      setUpcomingAuctions(res.data);
      setLoader(false);
    });
    await authService.getOngoingAuctions().then((res) => {
      setOnGoingAuctions(res.data);
    });
  }, []);

  useEffect(() => {
    if (onGoingAuctions && upcomingAuctions) {
      setAuctions([...onGoingAuctions, ...upcomingAuctions]);
    }
  }, [onGoingAuctions, upcomingAuctions]);

  useEffect(() => {
    if (params.sectionId === "feature") {
      window.scrollTo(0, 800);
    } else if (params.sectionId === "upcoming") {
      window.scrollTo(0, windowSize > 800 ? 2800 : 3500);
    }
  }, []);

  return (
    <>
      {loader ? <Loading /> : null}
      <PremiumProp
        featureAuctions={featureAuctions}
        onGoingAuctions={onGoingAuctions}
        upcomingAuctions={upcomingAuctions}
        windowSize={windowSize}
      />
      <Features
        toggleSignIn={toggleSignIn}
        featureAuctions={featureAuctions}
        windowSize={windowSize}
        loader={loader}
      />
      <PrimeCate windowSize={windowSize} auctions={auctions} />
      <How windowSize={windowSize} />
      <UpcomingAuctions
        toggleSignIn={toggleSignIn}
        upcomingAuctions={upcomingAuctions}
        windowSize={windowSize}
        loader={loader}
      />
      {/* <RealEstate /> */}
      <Info toggleSignIn={toggleSignIn} windowSize={windowSize} />
    </>
  );
};

export default Home;
