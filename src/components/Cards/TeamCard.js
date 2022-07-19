import React from "react";
import { Card } from "react-bootstrap";
import * as FA from "react-icons/fa";

const Founder = ({ firstName, lastName, title, img, linkedln, location }) => {
  return (
    <Card
      className="Card-info"
      size="sm"
      style={{
        width: "150px",
        margin: "10px",
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      <Card.Img
        variant="top"
        src={img}
        className="img-fluid"
        style={{ borderRadius: "50%", border: "2px solid #769ccd" }}
      />
      <Card.Body
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          padding: "0",
        }}
      >
        <Card.Text>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#181c35",
            }}
          >
            {firstName} {lastName}
          </span>
          {/* <span style={{ fontSize: "12px"}} className="mb-2">
            {location.city}, {location.state}, {location.country}
          </span> */}
          <a
            href={linkedln}
            target="_blank"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <FA.FaLinkedin size={30} color={linkedln ? "#0a66c2" : "gray"} />
          </a>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Founder;
