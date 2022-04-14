import React from "react";
import { Modal, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import AuctionTimer from "../Auctions/AuctionTimer";

const BuyConfirm = ({ tooglePlaceBid, property }) => {
  const { id } = useParams();
  const properties = useSelector((state) => state.auction);
  const [leadingBid, setLeadingBid] = useState();
  const [increment, setIncrement] = useState();
  const propId = properties.find((item) => item._id === id);
  const { register, handleSubmit } = useForm();
  const [bid, setBid] = useState();
  const history = useHistory();
  const [onGoingAuctionEnd, setOnGoingAuctionEnd] = useState();
  const dateTime = new Date().getTime();
  const biddingTimes = new Date(dateTime).toISOString();
  const [auctionEnded, setAuctionEnded] = useState(false);
  const toogleAuction = () => setAuctionEnded(!auctionEnded);

  useEffect(() => {
    setOnGoingAuctionEnd(propId.auctionEndDate);
    setBid(property.highestBid + property.incrementAmount);
  }, [property]);

  const onSubmit = async (data) => {
    if (bid === undefined) {
      alert("Please enter a bid amount");
    } else {
      const Bid = { id: propId._id, biddingTimes, bidding: parseInt(bid) };
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
      {/* <div style={{display:"flex", margin:"0", padding:"0"}}>
        <Button style={{position:"absolute", right:"10px"}} onClick={tooglePlaceBid}>
          x
        </Button>
        <h1
          style={{
            color: "#D58F5C",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Enter your Bid
        </h1>
      </div> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <>
          {onGoingAuctionEnd && (
            <div style={{ marginLeft: "15%", marginTop: "20px" }}>
              <AuctionTimer auctionEndDate={onGoingAuctionEnd} toogleAuction={toogleAuction} />
            </div>
          )}
          <Table borderless>
            <tbody className="auction-info">
              <tr>
                {property.highestBid ? (
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
                      value={property.highestBid}
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
                      value={property.startingBid}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
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
                  Increment Amount:
                  <NumberFormat
                    style={{ marginLeft: "10px", fontWeight: "normal" }}
                    value={property.incrementAmount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </td>
              </tr>

              {/* <tr>
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
              </tr> */}
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
                    style={{
                      marginLeft: "10px",
                      fontWeight: "normal",
                      color: "#b77b50",
                      fontWeight: "bold",
                    }}
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
            </tbody>
          </Table>

          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
              margin: "auto",
              padding: "15px",
            }}
          >
            <input
              style={{
                padding: "10px",
                paddingLeft: "20px",
                width: "100%",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#f2f6fc",
              }}
              type="text"
              placeholder="Enter Amount"
              name="bid"
              defaultValue={bid}
              onChange={(e) => setBid(e.target.value)}
            />
            <button
              style={{
                padding: "10px",
                width: "100%",
                marginTop: "10px",
                borderRadius: "8px",
              }}
              className="nxt-btn"
              type="submit"
            >
              Submit
            </button>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
                fontSize: "13px",
              }}
            >
              <span>View Bid History</span>
            </div>
          </div>
        </>
      </form>
    </>
  );
};

export default BuyConfirm;
