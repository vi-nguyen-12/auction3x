import React, { useState, useEffect } from "react";
import authService from "../../services/authServices";
import "../../styles/realEstate.css";
import { Row, Col } from "react-bootstrap";
import Cards from "../Cards/Cards";
import { useParams } from "react-router-dom";
import ErrorPage from "../../components/Error/404page";
import PropertyPageHeader from "./PropertyPageHeader";

function Auctions({
  toggleSignIn,
  windowSize,
  toggleChange,
  filter,
  setResultLength,
  setCenters
}) {
  console.log(filter);
  const params = useParams();
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
      const datas = {
        city: "Austin",
        auctionType: "",
        type: "",
        min_price: "",
        max_price: "",
      };
      authService.propFilter(datas).then((res) => {
        setAllAuctions(res.data);
      });
    } else if (params.Country === "Houston") {
      const datas = {
        city: "Houston",
        auctionType: "",
        type: "",
        min_price: "",
        max_price: "",
      };
      authService.propFilter(datas).then((res) => {
        setAllAuctions(res.data);
      });
    } else if (params.Country === "Dallas") {
      const datas = {
        city: "Dallas",
        auctionType: "",
        type: "",
        min_price: "",
        max_price: "",
      };
      authService.propFilter(datas).then((res) => {
        setAllAuctions(res.data);
      });
    } else if (params.Country === "SanAntonio") {
      const datas = {
        city: "San Antonio",
        auctionType: "",
        type: "",
        min_price: "",
        max_price: "",
      };
      authService.propFilter(datas).then((res) => {
        setAllAuctions(res.data);
      });
    } else {
      if (onGoingAuctions && upcomingAuctions) {
        setAllAuctions([...onGoingAuctions, ...upcomingAuctions]);
      }
    }
  }, [onGoingAuctions, upcomingAuctions]);

  useEffect(() => {
    if (filter) {
      authService.propFilter(filter).then((res) => {
        if (res.data.length > 0) {
          setResultLength({ auctions: res.data.length });
          setAllAuctions(res.data);
        } else {
          setAllAuctions([]);
        }
      });
    } else {
      setResultLength({ auctions: allAuctions.length });
    }
  }, [filter]);

  useEffect(() => {
    if (allAuctions) {
      setCenters(allAuctions.map(item => {
        return {
          address: item.property.details.address,
          lat: item.property.details.property_address.lat,
          lng: item.property.details.property_address.lng,
          id: item._id
        }
      }))
    }
  }, [allAuctions])


  //   useEffect(() => {
  //     if (params.filter === "USA") {
  //         console.log(allAuctions);
  //       console.log(allAuctions.filter((auction) => auction.property.details.property_address.country === "USA"));
  //     }
  //     if (params.filter === "England") {
  //       setAllAuctions(
  //         allAuctions.filter(
  //           (auction) =>
  //             auction.property.details.property_address.country === "England"
  //         )
  //       );
  //     }
  //     if (params.filter === "Canada") {
  //       setAllAuctions(
  //         allAuctions.filter(
  //           (auction) =>
  //             auction.property.details.property_address.country === "Canada"
  //         )
  //       );
  //     }
  //   }, [params.filter]);

  return (
    <>
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
