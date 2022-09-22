import React, { useState, useEffect } from "react";
import Features from "./NewHome/Features";
import PrimeCate from "./NewHome/PrimeCate";
import PremiumProp from "./NewHome/PremiumProp";
import How from "./NewHome/How";
import Info from "./NewHome/Info";
import authService from "../../services/authServices.js";
import { useParams } from "react-router-dom";
import UpcomingAuctions from "./NewHome/UpcomingAuctions";
import Loading from "../Loading";

const Home = ({ toggleSignIn, windowSize, setMessage }) => {
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const [featureAuctions, setFeatureAuctions] = useState([]);
  const [onGoingAuctions, setOnGoingAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    async function getAuctions() {
      setLoader(true);
      await authService.getFeaturedAuctions().then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setFeatureAuctions(
            res.data.filter(
              (auction) => auction.auctionEndDate > new Date().toISOString()
            )
          );
          setLoader(false);
        }
      });
      await authService.getUpcomingAuctions().then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setUpcomingAuctions(res.data);
          setLoader(false);
        }
      });
      await authService.getOngoingAuctions().then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setOnGoingAuctions(res.data);
          setLoader(false);
        }
      });
    }
    getAuctions();
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
      <Info toggleSignIn={toggleSignIn} windowSize={windowSize} />
    </>
  );
};

export default Home;
