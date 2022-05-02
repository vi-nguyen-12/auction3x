import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { UpcomingRealEstateCard } from "../Cards/UpcomingRealEtateCard";
import { UpcomingCarCard } from "../Cards/UpcomingCarCard";
import { UpcomingJetCard } from "../Cards/UpcomingJetCard";
import { UpcomingYachtCard } from "../Cards/UpcomingYachtCard";
import { useSelector } from "react-redux";

const Upcoming = ({ query }) => {
  const property = useSelector((state) => state.property);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    if (query) {
      // look for any property that matches the query
      const search = property.filter((prop) => Object.values(prop).includes(query));
      console.log(search);
      setUpcoming(search);
    } else {
      setUpcoming(property);
    }
  }, [property]);

  console.log(upcoming);

  return (
    <>
      {upcoming ? (
        <>
          <div className="mt-5">
            <Row style={{ padding: "0 50px" }}>
              <Col md={10} className="pt-5">
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
            <Row style={{ padding: "0 50px" }}>
              {upcoming.length > 0 ? (
                upcoming.slice(0, 6).map((item) => (
                  <Col
                    key={item._id}
                    md={4}
                    style={{ marginBottom: "30px", marginTop: "20px" }}
                  >
                    {item.property.type === "real-estate" ? (
                      <UpcomingRealEstateCard
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
                    Auctions not found!
                  </h1>
                </div>
              )}
            </Row>
          </div>
        </>
      ) : null}
    </>
  );
};

export { Upcoming };
