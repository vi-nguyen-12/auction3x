import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../../styles/real-estate.css";

const RealEstate = (props) => {
  const history = useHistory();
  return (
    <section className="real-estate-wrap">
      <div className="real-estate">
        <div className="btn-group">
          <Button
            onClick={() => {
              history.push("/realEstates");
            }}
            className="btn-custom"
          >
            {" "}
            Real Estate
          </Button>
          <Button
            onClick={() => {
              history.push("/cars");
            }}
            className="btn-custom"
          >
            {" "}
            Car
          </Button>
          <Button
            onClick={() => {
              history.push("/jets");
            }}
            className="btn-custom"
          >
            {" "}
            Jet
          </Button>
          <Button
            onClick={() => {
              history.push("/yachts");
            }}
            className="btn-custom"
          >
            {" "}
            Yacht
          </Button>

          {/* <Button className='btn-custom'> Jewels</Button> */}
        </div>
        <div className="sell-real-estate">
          <div className="content">
            <h1 style={{ marginLeft: "60px", fontFamily: "Josefinslab" }}>
              Sell Real Estate <br /> on Auction 3
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
