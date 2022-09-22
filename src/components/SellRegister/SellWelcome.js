import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Row, Col } from "react-bootstrap";
import { BsFillHouseFill } from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { IoAirplaneSharp } from "react-icons/io5";
import { IoIosBoat } from "react-icons/io";
import SellHeader from "./SellHeader";
import "../../styles/sell-register.css";

const Sell = ({
  step,
  setStep,
  windowSize,
  propertyTest,
  setPropertyTest,
  setMessage,
}) => {
  const [type, setType] = useState(propertyTest.type);
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    if (type === undefined) {
      setMessage("");
      setMessage("Please select property to sell");
    } else {
      setPropertyTest({ ...propertyTest, type });
      setStep(step + 1);
    }
  };

  const properties = [
    {
      icon: <BsFillHouseFill size={windowSize > 800 ? 40 : 25} />,
      name: "Real Estate",
      propType: "real-estate",
    },
    {
      icon: <IoCarSportSharp size={windowSize > 800 ? 40 : 25} />,
      name: "Car",
      propType: "car",
    },
    {
      icon: <IoAirplaneSharp size={windowSize > 800 ? 40 : 25} />,
      name: "Jet",
      propType: "jet",
    },
    {
      icon: <IoIosBoat size={windowSize > 800 ? 40 : 25} />,
      name: "Yacht",
      propType: "yacht",
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="wrapper">
      <SellHeader />
      <div className="sell-bottom" style={{ paddingBottom: "100px" }}>
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
                type="submit"
                style={{
                  padding: windowSize < 800 && "15px 40px",
                  background:
                    type === `${property.propType}` ? "rgb(233 184 135)" : "",
                }}
                className="category-btn"
                onClick={(e) => {
                  setType(property.propType);
                }}
              >
                {property.icon}
                {property.name}
              </Button>
            </Col>
          ))}
        </Row>

        {/* <Row className="mt-5">
          <Button className="pre-btn" style={{ opacity: "0.4" }} disabled>
            Previous
          </Button>
          <Button type="submit" className="nxt-btn" id="next">
            Next
          </Button>
        </Row> */}
      </div>
    </form>
  );
};

export default Sell;
