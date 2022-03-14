import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Table } from "react-bootstrap";
import "../../styles/SellRegister.css";
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
      <div className="sell-top">
        <div className="circle-1">
          <p className="text">01</p>
          <span className="spnn">Select Catagory</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">02</p>
          <span className="spnn">Listing Details</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">03</p>
          <span className="spnn">Upload Documents</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">04</p>
          <span className="spnn">Upload Documents</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">05</p>
          <span className="spnn">Agreement</span>
        </div>
      </div>
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
            {/* <p style={{ color: "#6d6d6d" }}>sdfshdfh auihdasd auhdha auhda</p> */}
          </thead>
          <tbody style={{ marginTop: "30px" }}>
            <tr className="sell-1">
              <td>
                <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("realEstate")}
                />
                <label className="choice">Real Estate</label>
              </td>

              <td>
                <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("cars")}
                />
                <label className="choice">Cars</label>
              </td>

              <td>
                <input
                  type="radio"
                  name="sell"
                  value="1"
                  onChange={() => setPropertyType("collectible")}
                />
                <label className="choice">Collectible</label>
              </td>
            </tr>

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
            </tr>

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
            </tr>
          </tbody>
        </Table>

        <div className="bottom-btn">
          <button className="pre-btn">Previous</button>
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
