import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import AuctionTimer from "../../RealEstate/AuctionTimer";

const BuyConfirm = ({ tooglePlaceBid }) => {
  const { register, handleSubmit } = useForm();
  const [bid, setBid] = useState();
  const { id } = useParams();
  const history = useHistory();
  const [onGoingAuctionEnd, setOnGoingAuctionEnd] = useState();
  const properties = useSelector((state) => state.auction);
  const propId = properties.find((item) => item._id === id);

  const dateTime = new Date().getTime();
  const biddingTimes = new Date(dateTime).toISOString();

  useEffect(() => {
    setOnGoingAuctionEnd(propId.auctionEndDate);
  }, [propId]);

  const onSubmit = async (data) => {
    if (bid === undefined) {
      alert("Please enter a bid amount");
    } else {
      const Bid = { id: propId._id, biddingTimes, bidding: bid };
      await authService.auctionBid(Bid).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert("Bid Successful!");
          // tooglePlaceBid();
          window.location.reload();
        }
      });
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{
            color: "#D58F5C",
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
          contentclassname="custom-modal-title"
        >
          Enter your Bid
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {onGoingAuctionEnd && (
            <div style={{marginLeft:"15%", marginTop:"20px"}}>
              <AuctionTimer auctionEndDate={onGoingAuctionEnd} />
            </div>
          )}
          <div className="auction-info">
            <tr>
              {propId.highestBid ? (
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
              ) : (
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
                    value={propId.startingBid}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </td>
              )}
            </tr>
            <tr>
              {propId.highestBid ? (
                <td
                  style={{
                    position: "relative",
                    fontWeight: "bold",
                    padding: "15px",
                  }}
                >
                  Minimal Bid(highest bid + increment):
                  <NumberFormat
                    style={{ marginLeft: "10px", fontWeight: "normal" }}
                    value={propId.highestBid + propId.incrementAmount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#D58F5C",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      setBid(propId.highestBid + propId.incrementAmount);
                    }}
                  >
                    Bid
                  </button>
                </td>
              ) : (
                <td
                  style={{
                    position: "relative",
                    fontWeight: "bold",
                    padding: "15px",
                  }}
                >
                  Minimal Bid(starting bid + increment):
                  <NumberFormat
                    style={{ marginLeft: "10px", fontWeight: "normal" }}
                    value={propId.startingBid + propId.incrementAmount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button
                    style={{
                      fontWeight: "normal",
                      backgroundColor: "transparent",
                      color: "black",
                      padding: "0",
                      margin: "10px",
                    }}
                    onClick={() => {
                      setBid(propId.highestBid + propId.incrementAmount);
                    }}
                  >
                    Bid
                  </button>
                </td>
              )}
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
              defaultValue={bid}
              onChange={(e) => setBid(e.target.value)}
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
