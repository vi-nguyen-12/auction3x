import React from "react";
import { Card } from "react-bootstrap";
import * as FA from "react-icons/fa";
import "../../styles/team.css";

const Founder = ({
  firstName,
  lastName,
  title,
  img,
  linkedln,
  location,
  id,
}) => {
  return (
    <Card className="team-card" id={id} size="sm">
      <Card.Img
        variant="top"
        src={img}
        className="img-fluid"
        style={{ borderRadius: "50%", border: "2px solid #769ccd" }}
      />
      <Card.Body className="d-grid justify-content-center align-items-center p-0">
        <Card.Text>
          <span className="team-card-name">
            {firstName} {lastName}
          </span>
          {/* <span style={{ fontSize: "12px"}} className="mb-2">
            {location.city}, {location.state}, {location.country}
          </span> */}
          <a
            href={linkedln}
            target="_blank"
            rel="noreferrer"
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
