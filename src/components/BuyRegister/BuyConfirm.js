import React from "react";
import { Modal, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { useState } from "react";
import NumberFormat from "react-number-format";

const BuyConfirm = ({ property }) => {
  const { register, handleSubmit } = useForm();
  const [bid, setBid] = useState(
    property.highestBid + property.incrementAmount
  );

  const dateTime = new Date().getTime();
  const biddingTimes = new Date(dateTime).toISOString();
  const [auctionEnded, setAuctionEnded] = useState(false);
  const toggleAuction = () => setAuctionEnded(!auctionEnded);

  const onSubmit = async (data) => {
    if (bid === undefined) {
      alert("Please enter a bid amount");
    } else {
      const Bid = { id: property._id, biddingTimes, bidding: parseInt(bid) };
      await authService.auctionBid(Bid).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setBid(res.data.highestBid + property.incrementAmount);
          alert("Bid Successful!");
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
        <>
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
              <tr>
                <td
                  style={{
                    position: "relative",
                    fontWeight: "bold",
                    padding: "15px",
                  }}
                >
                  Minimum Bid:
                  <NumberFormat
                    style={{
                      marginLeft: "10px",
                      fontWeight: "normal",
                      color: "#b77b50",
                      fontWeight: "bold",
                    }}
                    value={property.highestBid + property.incrementAmount}
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
            <span className="prefix">$</span>
            {/* <input
              className="has-prefix"
              type="number"
              min="0"
              placeholder="Enter Amount"
              name="bid"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
            /> */}
            <NumberFormat
              thousandSeparator={true}
              value={bid}
              allowNegative={false}
              className="has-prefix"
              onValueChange={(values) => {
                const { value } = values;
                setBid(value);
              }}
              required
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
            {/* <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
                fontSize: "13px",
              }}
            >
              <span>View Bid History</span>
            </div> */}
          </div>
        </>
      </form>
    </>
  );
};

export default BuyConfirm;
