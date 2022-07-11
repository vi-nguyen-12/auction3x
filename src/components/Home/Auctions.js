import React, { useState, useEffect } from "react";
import authService from "../../services/authServices";
import "../../styles/realEstate.css";
import { Row, Col } from "react-bootstrap";
import Cards from "../Cards/Cards";
import { useParams } from "react-router-dom";
import ErrorPage from "../../components/Error/404page";
import PropertyPageHeader from "./PropertyPageHeader";
import Loading from "../Loading";

function Auctions({
  toggleSignIn,
  windowSize,
  toggleChange,
  filter,
  setResultLength,
  setCenters,
}) {
  console.log(filter);
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const [onGoingAuctions, setOnGoingAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [allAuctions, setAllAuctions] = useState([]);

  useEffect(() => {
    toggleChange();
  }, []);

  useEffect(() => {
    authService.getUpcomingAuctions().then((res) => {
      setUpcomingAuctions(res.data);
    });
    authService.getOngoingAuctions().then((res) => {
      setOnGoingAuctions(res.data);
    });
  }, []);

  useEffect(() => {
    if (params.Country === "Austin") {
      setLoader(true);
      const datas = {
        city: "Austin",
        auctionType: "",
        type: "",
        min_price: "",
        max_price: "",
      };
      authService.propFilter(datas).then((res) => {
        setAllAuctions(res.data);
        setLoader(false);
      });
    } else if (params.Country === "Houston") {
      setLoader(true);
      const datas = {
        city: "Houston",
        auctionType: "",
        type: "",
        min_price: "",
        max_price: "",
      };
      authService.propFilter(datas).then((res) => {
        setAllAuctions(res.data);
        setLoader(false);
      });
    } else if (params.Country === "Dallas") {
      setLoader(true);
      const datas = {
        city: "Dallas",
        auctionType: "",
        type: "",
        min_price: "",
        max_price: "",
      };
      authService.propFilter(datas).then((res) => {
        setAllAuctions(res.data);
        setLoader(false);
      });
    } else if (params.Country === "SanAntonio") {
      setLoader(true);
      const datas = {
        city: "San Antonio",
        auctionType: "",
        type: "",
        min_price: "",
        max_price: "",
      };
      authService.propFilter(datas).then((res) => {
        setAllAuctions(res.data);
        setLoader(false);
      });
    } else {
      if (onGoingAuctions && upcomingAuctions) {
        setAllAuctions([...onGoingAuctions, ...upcomingAuctions]);
      }
    }
  }, [onGoingAuctions, upcomingAuctions]);

  useEffect(() => {
    if (filter) {
      setLoader(true);
      authService.propFilter(filter).then((res) => {
        if (res.data.length > 0) {
          setResultLength({ auctions: res.data.length });
          setAllAuctions(res.data);
          setLoader(false);
        } else {
          setAllAuctions([]);
          setLoader(false);
        }
      });
    } else {
      setResultLength({ auctions: allAuctions.length });
    }
  }, [filter]);

  useEffect(() => {
    if (allAuctions) {
      setCenters(
        allAuctions.map((item) => {
          return {
            address: item.property.details.address,
            lat: item.property.details.property_address.lat,
            lng: item.property.details.property_address.lng,
          };
        })
      );
    }
  }, [allAuctions]);

  return (
    <>
      {loader && <Loading />}
      {allAuctions.length > 0 ? (
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "100px 20px",
          }}
        >
          {allAuctions.map((auction, index) => (
            <Col style={{ marginBottom: "40px" }} key={index}>
              <Cards
                toggleSignIn={toggleSignIn}
                windowSize={windowSize}
                data={auction}
                type={auction.property.type}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default Auctions;
