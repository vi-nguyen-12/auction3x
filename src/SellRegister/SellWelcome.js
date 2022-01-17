import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Table } from "react-bootstrap";
import "../styles/SellRegister.css";
// create step bar

const Sell = ({ toogleStep, step }) => {
  const {
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    toogleStep(step + 1);
  };

  // const btn = document.getElementById("next");

  // console.log(btn);

  // btn.disabled = true;
  // setTimeout(() => {
  //   btn.disabled = false;
  // }, 8000);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="box-content">
      <div className="sell-top">
        <div class="circle-1">
          <p class="text">01</p>
          <span className="spnn">Select Catagory</span>
        </div>{" "}
        <div class="line"></div>
        <div class="circle">
          <p class="text">02</p>
          <span className="spnn">Listing Details</span>
        </div>{" "}
        <div class="line"></div>
        <div class="circle">
          <p class="text">03</p>
          <span className="spnn">Upload Documents</span>
        </div>{" "}
        <div class="line"></div>
        <div class="circle">
          <p class="text">04</p>
          <span className="spnn">Listing Fees</span>
        </div>{" "}
        <div class="line"></div>
        <div class="circle">
          <p class="text">05</p>
          <span className="spnn">Agreement</span>
        </div>{" "}
      </div>
      <div className="sell-bottom">
        <Table borderless responsive>
          <thead>
            <th colSpan={3} >
              <h3 style={{ color: "#6d6d6d", fontWeight: "bold" }}>
                SELECT WHAT YOU WANT TO SELL
              </h3>
              {/* <p style={{ color: "#6d6d6d" }}>sdfshdfh auihdasd auhdha auhda</p> */}
            </th>
          </thead>

          <tbody>
            <tr className="sell-1">
              <td>
                <input type="radio" name="sell" value="1" />
                <label className="choice">Real Estate</label>
              </td>

              <td>
                <input type="radio" name="sell" value="1" />
                <label className="choice">Cars</label>
              </td>

              <td>
                <input type="radio" name="sell" value="1" />
                <label className="choice">Collectible</label>
              </td>
            </tr>

            <tr className="sell-2">
              <td>
                <input type="radio" name="sell" value="1" />
                <label className="choice">Yachts</label>
              </td>
              <td>
                <input type="radio" name="sell" value="1" />
                <label className="choice">Jets</label>
              </td>
              <td>
                <input type="radio" name="sell" value="1" />
                <label className="choice">Helicopters</label>
              </td>
            </tr>

            <tr className="sell-3">
              <td>
                <input type="radio" name="sell" value="1" />
                <label className="choice">Jewels</label>
              </td>
              <td>

                <input type="radio" name="sell" value="1" />
                <label className="choice">Motorcycle</label>
              </td>
              <td>
                <input type="radio" name="sell" value="1" />
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
