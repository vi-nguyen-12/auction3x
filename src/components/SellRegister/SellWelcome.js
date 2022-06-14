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

const Sell = ({ toggleStep, step, togglePropertyType, windowSize }) => {
  const { handleSubmit } = useForm();

  const [propertyType, setPropertyType] = useState();

  const onSubmit = () => {
    if (propertyType === undefined) {
      alert("Please select property to sell");
    } else {
      togglePropertyType(propertyType);
      toggleStep(step + 1);
    }
  };

  const properties = [
    {
      icon: <BsFillHouseFill size={windowSize > 800 ? 40 : 25} />,
      name: "Real Estate",
      propType: "real-estate",
      selected: false,
    },
    {
      icon: <IoCarSportSharp size={windowSize > 800 ? 40 : 25} />,
      name: "Car",
      propType: "car",
      selected: false,
    },
    {
      icon: <IoIosBoat size={windowSize > 800 ? 40 : 25} />,
      name: "Yacht",
      propType: "yacht",
      selected: false,
    },
    {
      icon: <IoAirplaneSharp size={windowSize > 800 ? 40 : 25} />,
      name: "Jet",
      propType: "jet",
      selected: false,
    },
  ];

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
          {properties.map((property, index) => (
            <Col
              key={index}
              md={3}
              xs={5}
              className="d-flex justify-content-center"
            >
              <Button
                style={{
                  padding: windowSize < 800 && "10px",
                  // backgroundColor: property.selected === true ? "black" : "",
                }}
                className="category-btn"
                onClick={() => {
                  setPropertyType(property.propType);
                  property.selected = true;
                }}
                id={property.selected === true ? "selected" : ""}
              >
                {property.icon}
                <label>{property.name}</label>
              </Button>
            </Col>
          ))}
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
