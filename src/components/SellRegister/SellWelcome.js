import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Table, Row, Col } from "react-bootstrap";
import { BsFillHouseFill } from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { IoAirplaneSharp } from "react-icons/io5";
import { IoIosBoat } from "react-icons/io";
import SellHeader from "./SellHeader";
import "../../styles/sell-register.css";
// create step bar

const Sell = ({ toogleStep, step, tooglePropertyType }) => {
  const { handleSubmit } = useForm();

  const [propertyType, setPropertyType] = useState();

  const onSubmit = () => {
    if (propertyType === undefined) {
      alert("Please select property to sell");
    } else {
      tooglePropertyType(propertyType);
      toogleStep(step + 1);
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
      className="box-content"
    >
      <SellHeader />
      <div className="sell-bottom">
        <Table borderless responsive="lg" style={{ display: "grid" }}>
          <thead>
            <tr>
              <th>
                <h3 style={{ color: "#6d6d6d", fontWeight: "bold" }}>
                  PLEASE SELECT PROPERTY TO SELL
                </h3>
              </th>
            </tr>
          </thead>
          <tbody style={{ marginTop: "30px" }}>
            <tr className="sell-1">
              <td>
                {/* <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("real-estate")}
                />
                <label className="choice">Real Estate</label> */}
                <Button
                  className="btn-sell"
                  onClick={() => setPropertyType("real-estate")}
                >
                  <BsFillHouseFill size={40} />
                  <label>Real Estate</label>
                </Button>
              </td>

              <td>
                {/* <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("cars")}
                />
                <label className="choice">Cars</label> */}
                <Button
                  onClick={() => setPropertyType("car")}
                  className="btn-sell1"
                >
                  <IoCarSportSharp size={40} />
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Cars
                  </label>
                </Button>
              </td>

              <td>
                {/* <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("jet")}
                />
                <label className="choice">Jets</label> */}
                <Button
                  onClick={() => setPropertyType("jet")}
                  className="btn-sell1"
                >
                  <IoAirplaneSharp size={40} />
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Jet
                  </label>
                </Button>
              </td>
              <td>
                {/* <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("yacht")}
                />
                <label className="choice">Yachts</label> */}
                <Button
                  onClick={() => setPropertyType("yacht")}
                  className="btn-sell"
                >
                  <IoIosBoat size={40} />
                  <label>Yachts</label>
                </Button>
              </td>
            </tr>
            {/* 
            <tr className="sell-2">
              <td>
                <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("yachts")}
                />
                <label className="choice">Yachts</label>
              </td>
              <td>
                <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("jets")}
                />
                <label className="choice">Jets</label>
              </td>
              <td>
                <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("helicopters")}
                />
                <label className="choice">Helicopters</label>
              </td>
            </tr> */}
            {/* 
            <tr className="sell-3">
              <td>
                <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("jewels")}
                />
                <label className="choice">Jewels</label>
              </td>
              <td>
                <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("motorcycles")}
                />
                <label className="choice">Motorcycle</label>
              </td>
              <td>
                <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("watches")}
                />
                <label className="choice">Watches</label>
              </td>
            </tr> */}
          </tbody>
        </Table>

        <div className="bottom-btn">
          <button className="pre-btn" style={{ opacity: "0.6" }} disabled>
            Previous
          </button>
          <span> </span>
          <button type="submit" className="nxt-btn" id="next">
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Sell;
