import React from "react";
import { Card, Button } from "react-bootstrap";
import Display from "../RealEstate/Display";
import { Link } from "react-router-dom";
import authService from "../services/authServices";

const CardComp = ({ url, data, id }) => {
  return (
    <Card
      // onClick={async () => {const estateData = await authService.sendProperty(id); console.log(estateData)}}
      //move to next page
      className="text-left m-auto"
      style={{
        width: "18rem",
        background: "white",
        padding: "2.5px",
        width: "350px",
        borderRadius: "2px",
        border: "1px solid lightgrey",
      }}
    >
      <Link to={`/Display/${id}`}>
        <Card.Img
          variant="top"
          src={url}
          className="img-fluid"
          style={{ width: "350px", height: "250px" }}
        />
        <Card.Body style={{ paddingLeft: "13px" }}>
          <Card.Text>
            <div>
              <div>
                <span className="golden-text">
                  {data.address.formatted_street_address}, {data.address.state}
                </span>
                <h4 style={{ marginTop: "5px" }}>Luxury Avenue Los-Angeles</h4>
              </div>
              <div
                style={{
                  display: "inline-flex",
                }}
              >
                <div>
                  <tr>
                    <td>
                      <p style={{ fontSize: "15px", width: "100px" }}>
                        Online Auction
                      </p>{" "}
                    </td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      |{" "}
                    </td>
                    <td>
                      <p
                        style={{
                          fontSize: "15px",
                          width: "100px",
                          marginLeft: "-20px",
                        }}
                      >
                        Additional Info
                      </p>
                    </td>
                  </tr>

                  <td>
                    <p style={{ fontSize: "12px", width: "100px" }}>
                      Feb 09 - 23, 2021
                    </p>
                  </td>

                  <td>
                    <p
                      style={{
                        fontSize: "12px",
                        marginLeft: "100px",
                        width: "100%",
                      }}
                    >
                      {data.structure.beds_count}BD | {data.structure.baths}BA |{" "}
                      {data.structure.total_area_sq_ft} sq.ft
                    </p>
                  </td>
                </div>
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
      </Link>
    </Card>
  );
};

export { CardComp };
