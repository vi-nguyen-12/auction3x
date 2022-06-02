import React from "react";
import { Card } from "react-bootstrap";
import * as FA from "react-icons/fa";

const Founder = ({ name, title, img, linkedln, location }) => {
    return (
        <Card
            className="Card-info"
            size="sm"
            style={{ width: "150px", margin: "10px", border: "none" }}
        >
            <Card.Img
                variant="top"
                src={img}
                className="img-fluid"
                style={{ borderRadius: "50%" }}
            />
            <Card.Body
                style={{ display: "grid", justifyContent: "center", alignItems: "center" }}
            >
                <Card.Text>
                    <h2 style={{ display: "flex", justifyContent: "center", fontSize: "16px" }}>{name}</h2>
                    <p style={{ fontSize: "11px" }}>{location}</p>
                    <a href={linkedln} target="_blank" style={{ display: "flex", justifyContent: "center" }}>
                        <FA.FaLinkedin size={30} style={{ color: "blue" }} />
                    </a>
                </Card.Text>
            </Card.Body>
        </Card >
    );
};

export default Founder;
