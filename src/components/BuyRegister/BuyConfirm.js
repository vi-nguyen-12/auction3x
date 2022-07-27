import React from "react";
import { Modal, Table, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { useState } from "react";
import NumberFormat from "react-number-format";

const BuyConfirm = ({ property }) => {
  console.log(property);
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
      <Modal.Header className="auction-modal-header" closeButton>
        <Modal.Title className="auction-modal-title">Enter Bid</Modal.Title>
      </Modal.Header>
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <>
          {/* <Table borderless>
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
          </Table> */}

          <Row style={{ padding: "0 20px" }}>
            <Col className="fw-bold">Leading Bid:</Col>
            <Col className="d-flex justify-content-end">
              {property.highestBid ? (
                <NumberFormat
                  style={{ marginLeft: "10px", fontWeight: "normal" }}
                  value={property.highestBid}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              ) : (
                <NumberFormat
                  style={{ marginLeft: "10px", fontWeight: "normal" }}
                  value={property.startingBid}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              )}
            </Col>
          </Row>
          <Row style={{ padding: "0 20px" }} className="mt-3">
            <Col className="fw-bold">Increment Amount:</Col>
            <Col className="d-flex justify-content-end">
              <NumberFormat
                value={property.incrementAmount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Col>
          </Row>
          <Row style={{ padding: "0 20px" }} className="mt-3">
            <Col className="fw-bold">Minimum Bid:</Col>
            <Col className="d-flex justify-content-end">
              <NumberFormat
                style={{
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
            </Col>
          </Row>

          <Row style={{ padding: "0 20px" }} className="mt-5">
            <Col md={12}>
              <NumberFormat
                thousandSeparator={true}
                className="form-control"
                value={bid}
                prefix={"$"}
                allowNegative={false}
                onValueChange={(values) => {
                  const { value } = values;
                  setBid(value);
                }}
                required
              />
            </Col>
            <Col md={12}>
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
            </Col>
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
          </Row>
        </>
      </form>
    </>
  );
};

export default BuyConfirm;
