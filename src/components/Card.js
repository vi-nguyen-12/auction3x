import React from "react";
import { Card, Button } from "react-bootstrap";
import Display from "../RealEstate/Display";
import { Link } from "react-router-dom";

const CardComp = (props) => {
  return (
    <Link to="/Display">
      {" "}
      <Card
        //move to next page

        className="text-left m-auto"
        style={{
          width: "18rem",
          background: "white",
          padding: "2.5px",
          minWidth: "350px",
          borderRadius: "2px",
          border: "1px solid lightgrey",
        }}
      >
        <Card.Img
          variant="top"
          src="/images/feature.png"
          className="img-fluid"
          style={{ maxWidth: "350px", maxHeight: "400px" }}
        />
        <Card.Body style={{ paddingLeft: "13px" }}>
          <Card.Text>
            <span className="golden-text">64 1st Avenue, High Street, NZ</span>
            <h4 style={{ marginTop: "5px" }}>Luxury Avenue Los-Angeles</h4>

            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div>
                <p className="grey-small">Online Auction</p>
                <p className="black-medium">Feb 09 - 23, 2021</p>
              </div>
              <div style={{ marginLeft: "15px" }}>
                <p className="grey-small">Additional Info</p>
                <p className="black-medium">4BD | 2BA | 1,422 sq.ft</p>
              </div>
            </div>
          </Card.Text>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <p className="grey-small">Starting Bid</p>
              <p className="black-bold">$256, 000, 000</p>
            </div>
            <div
              style={{
                alignItems: "flex-end",
                display: "flex",
                marginRight: "6px",
              }}
            >
              <Button className="black-button text-white" variant="dark">
                Place Bid
              </Button>
            </div>
          </div>
        </Card.Body>
        <Card.Body></Card.Body>
      </Card>
    </Link>
  );
};

export { CardComp };
