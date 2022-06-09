import React, { useState, useEffect } from "react";
import authService from "../../services/authServices";
import "../../styles/realEstate.css";
import { Row, Col } from "react-bootstrap";
import Cards from "../Cards/Cards";
import { useParams } from "react-router-dom";

function Auctions({ toggleSignIn, windowSize }) {
  const params = useParams();
  const [onGoingAuctions, setOnGoingAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [allAuctions, setAllAuctions] = useState([]);

  useEffect(() => {
    authService.getUpcomingAuctions().then((res) => {
      setUpcomingAuctions(res.data);
    });
    authService.getOngoingAuctions().then((res) => {
      setOnGoingAuctions(res.data);
    });
  }, []);

  useEffect(() => {
    if (onGoingAuctions && upcomingAuctions) {
      setAllAuctions([...onGoingAuctions, ...upcomingAuctions]);
    }
  }, [onGoingAuctions, upcomingAuctions]);

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
      <h5 className="realHeader">
        <p>Auctions</p>
      </h5>
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
    </>
  );
}

export default Auctions;
