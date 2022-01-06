import React from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";

const BuyConfirm = ({ toogleStep, step }) => {
  const { register, handleSubmit } = useForm();
  const [bid, setBid] = useState();
  const { id } = useParams();
  const history = useHistory();
  const properties = useSelector((state) => state.auction);
  const propId = properties.find((item) => item._id === id);

  const dateTime = new Date().getTime();
  const biddingTimes = new Date(dateTime).toISOString();

  const onSubmit = async (data) => {
    const Bid = { id: propId._id, biddingTimes, bidding: bid };
    await authService
      .auctionBid(Bid)
      .then((res) => {
        if (res.status === 200) {
          window.setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert(
            "Your bid is less than or equal to the current highest bid! Please bid higher!"
          );
        }
      });
  };
  return (
    <>
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentClassName="custom-modal-title"
        >
          Enter your Bid
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            facilisis, erat a euismod aliquam, nisi nunc pretium nunc, eget
          </p>
          <div className="auction-info">
            <tr>
              <td
                style={{
                  position: "relative",

                  padding: "15px",
                }}
              >
                Auction Ends import
              </td>
            </tr>
            <tr>
              <td
                style={{
                  position: "relative",
                  fontWeight: "bold",
                  padding: "15px",
                }}
              >
                Leading Bid:
                <NumberFormat
                  style={{ marginLeft: "10px", fontWeight: "normal" }}
                  value={propId.highestBid}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  position: "relative",
                  fontWeight: "bold",
                  padding: "15px",
                }}
              >
                Minimal Bid:
                <NumberFormat
                  style={{ marginLeft: "10px", fontWeight: "normal" }}
                  value={propId.highestBid + propId.incrementAmount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  position: "relative",
                  fontWeight: "bold",
                  padding: "15px",
                }}
              >
                Your Bid:
                <NumberFormat
                  style={{ marginLeft: "10px", fontWeight: "normal" }}
                  value={bid}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  onValueChange={(values) => {
                    const { value } = values;
                    setBid(value);
                  }}
                />
              </td>
            </tr>
          </div>

          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
              margin: "auto",
            }}
          >
            <input
              style={{ padding: "10px", width: "100%" }}
              type="text"
              placeholder="Your Bid"
              name="bid"
              onChange={(e) => setBid(e.target.value)}
              // {...register("bid", { required: true })}
            />
            <button
              style={{ padding: "10px", width: "100%" }}
              className="nxt-btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BuyConfirm;
