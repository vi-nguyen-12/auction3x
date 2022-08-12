import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../../styles/real-estate.css";

const RealEstate = (props) => {
  const [id, setId] = useState();
  const [show, setShow] = useState("real-estate");

  const history = useHistory();
  return (
    <section className="real-estate-wrap">
      <div className="real-estate">
        <div className="btn-group">
          <Button
            onClick={() => {
              // history.push("/realEstates");
              setShow("real-estate");
              setId("slide");
            }}
            className="btn-custom"
          >
            {" "}
            Real Estate
          </Button>
          <Button
            onClick={() => {
              // history.push("/cars");
              setShow("car");
              setId("slide");
            }}
            className="btn-custom"
          >
            {" "}
            Car
          </Button>
          <Button
            onClick={() => {
              // history.push("/jets");
              setShow("jet");
              setId("slide");
            }}
            className="btn-custom"
          >
            {" "}
            Jet
          </Button>
          <Button
            onClick={() => {
              // history.push("/yachts");
              setShow("yacht");
              setId("slide");
            }}
            className="btn-custom"
          >
            {" "}
            Yacht
          </Button>

          {/* <Button className='btn-custom'> Jewels</Button> */}
        </div>
        <div className="sell-real-estate">
          <div
            id={show === "real-estate" ? id : ""}
            style={{ display: show === "real-estate" ? "block" : "none" }}
            className="content"
          >
            <h1 style={{ marginLeft: "60px" }}>
              Buy Real Estate <br /> on Auction3
            </h1>
            <p className="paragraph">
              Attract quality leads within the highest concentration of
              international luxury buyers
            </p>
          </div>

          <div
            id={show === "car" ? id : ""}
            style={{ display: show === "car" ? "block" : "none" }}
            className="content"
          >
            <h1 style={{ marginLeft: "60px" }}>
              Buy Car <br /> on Auction3
            </h1>
            <p className="paragraph">
              Attract quality leads within the highest concentration of
              international luxury buyers
            </p>
          </div>

          <div
            id={show === "jet" ? id : ""}
            style={{ display: show === "jet" ? "block" : "none" }}
            className="content"
          >
            <h1 style={{ marginLeft: "60px" }}>
              Buy Jet <br /> on Auction3
            </h1>
            <p className="paragraph">
              Attract quality leads within the highest concentration of
              international luxury buyers
            </p>
          </div>

          <div
            id={show === "yacht" ? id : ""}
            style={{ display: show === "yacht" ? "block" : "none" }}
            className="content"
          >
            <h1 style={{ marginLeft: "60px" }}>
              Buy Yacht <br /> on Auction3
            </h1>
            <p className="paragraph">
              Attract quality leads within the highest concentration of
              international luxury buyers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealEstate;
