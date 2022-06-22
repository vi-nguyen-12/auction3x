import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Row, Col } from "react-bootstrap";
import { BsFillHouseFill } from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { IoAirplaneSharp } from "react-icons/io5";
import { IoIosBoat } from "react-icons/io";
import SellHeader from "./SellHeader";
import "../../styles/sell-register.css";
// create step bar

const Sell = ({
  // toggleStep,
  step,
  setStep,
  // togglePropertyType,
  windowSize,
  propertyTest,
  setPropertyTest,
}) => {
  const [type, setType] = useState(propertyTest.type); //should check if type has value, then that box is blue
  const { handleSubmit } = useForm();

  // const [propertyType, setPropertyType] = useState();

  const onSubmit = () => {
    if (type === undefined) {
      alert("Please select property to sell");
    } else {
      setPropertyTest({ ...propertyTest, type });
      setStep(step + 1);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      className="wrapper"
    >
      <SellHeader />
      <div className="sell-bottom">
        <h3>PLEASE SELECT PROPERTY TO SELL</h3>
        <Row className="justify-content-center">
          <Col md={3} xs={5} className="d-flex justify-content-center">
            <Button
              style={{ padding: windowSize < 800 && "10px" }}
              className="category-btn"
              // onClick={() => setPropertyType("real-estate")}
              onClick={() => setType("real-estate")}
            >
              <BsFillHouseFill size={windowSize > 800 ? 40 : 25} />
              <label>Real Estate</label>
            </Button>
          </Col>
          <Col md={3} xs={5} className="d-flex justify-content-center">
            <Button
              style={{ padding: windowSize < 800 && "10px" }}
              onClick={() => setType("car")}
              className="category-btn"
            >
              <IoCarSportSharp size={windowSize > 800 ? 40 : 25} />
              <label>Cars</label>
            </Button>
          </Col>
          <Col md={3} xs={5} className="d-flex justify-content-center">
            <Button
              style={{ padding: windowSize < 800 && "10px" }}
              onClick={() => setType("jet")}
              className="category-btn"
            >
              <IoAirplaneSharp size={windowSize > 800 ? 40 : 25} />
              <label>Jet</label>
            </Button>
          </Col>
          <Col md={3} xs={5} className="d-flex justify-content-center">
            <Button
              style={{ padding: windowSize < 800 && "10px" }}
              onClick={() => setType("yacht")}
              className="category-btn"
            >
              <IoIosBoat size={windowSize > 800 ? 40 : 25} />
              <label>Yachts</label>
            </Button>
          </Col>
        </Row>

        <Row className="mt-5">
          <Button className="pre-btn" style={{ opacity: "0.4" }} disabled>
            Previous
          </Button>
          <Button type="submit" className="nxt-btn" id="next">
            Next
          </Button>
        </Row>
      </div>
    </form>
  );
};

export default Sell;
