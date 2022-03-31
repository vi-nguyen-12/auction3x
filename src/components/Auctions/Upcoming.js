import React from "react";
import { Row, Col } from "react-bootstrap";
import { UpcomingCard } from "./UpcomingCard";
import { UpcomingCarCard } from "../Cards/UpcomingCarCard";
import { UpcomingJetCard } from "../Cards/UpcomingJetCard";
import { UpcomingYachtCard } from "../Cards/UpcomingYachtCard";
import { useSelector } from "react-redux";

const Upcoming = (props) => {
  const property = useSelector((state) => state.property);
  return (
    <div className="mt-5">
      <Row>
        <Col md={10} className="m-auto pt-5">
          <img
            src="/images/Upcoming Auctions.png"
            alt=""
            style={{
              marginBottom: "20px",
              maxWidth: "250px",
              maxHeight: "150px",
            }}
          />
        </Col>
      </Row>
      <Col md={12} className="m-auto pt-2">
        <Row>
          {property.length > 0 ? (
            property.slice(0, 6).map((item) => (
              <Col key={item._id} md={4} style={{ marginBottom: "30px" }}>
                {item.property.type === "real-estate" ? (
                  <UpcomingCard
                    url={item.property.images[0].url}
                    data={item.property.details}
                    id={item._id}
                    startRegister={item.registerStartDate}
                    endRegister={item.registerEndDate}
                    startingBid={item.startingBid}
                  />
                ) : item.property.type === "car" ? (
                  <UpcomingCarCard
                    url={item.property.images[0].url}
                    data={item.property.details}
                    id={item._id}
                    startRegister={item.registerStartDate}
                    endRegister={item.registerEndDate}
                    startingBid={item.startingBid}
                  />
                ) : item.property.type === "jet" ? (
                  <UpcomingJetCard
                    url={item.property.images[0].url}
                    data={item.property.details}
                    id={item._id}
                    startRegister={item.registerStartDate}
                    endRegister={item.registerEndDate}
                    startingBid={item.startingBid}
                  />
                ) : item.property.type === "yacht" ? (
                  <UpcomingYachtCard
                    url={item.property.images[0].url}
                    data={item.property.details}
                    id={item._id}
                    startRegister={item.registerStartDate}
                    endRegister={item.registerEndDate}
                    startingBid={item.startingBid}
                  />
                ) : null}
              </Col>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "30px",
                backgroundColor: "#e8e8e8",
                boxShadow: "0px 0px 10px #00000029",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <h1 style={{ margin: "0" }}>
                No Upcoming Auctions at the moment, please check again later for
                upcoming auctions.
              </h1>
            </div>
          )}
        </Row>
      </Col>
    </div>
  );
};

export { Upcoming };
