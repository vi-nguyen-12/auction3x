import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { currencyText } from "../../App";
import { convertedCurrencyText } from "../Auctions/DisplayAuctions";
import AuctionBidTimer from "../Auctions/AuctionBidTimer";
import axios from "axios";

const BuyConfirm = ({ property, setMessage, windowSize }) => {
  const user = useSelector((state) => state.user);
  const currency = useContext(currencyText);
  const convertedCurrency = useContext(convertedCurrencyText);
  const { handleSubmit } = useForm();
  const [bid, setBid] = useState(
    property.highestBid + property.incrementAmount
  );
  const [convertedIncrement, setConvertedIncrement] = useState(0);
  const [convertedMinimum, setConvertedMinimum] = useState(0);
  const [convertedBid, setConvertedBid] = useState(0);

  const dateTime = new Date().getTime();
  const biddingTimes = new Date(dateTime).toISOString();

  useEffect(() => {
    if (currency !== "USD") {
      axios
        .get(
          `https://api.exchangerate.host/convert?from=USD&to=${currency}&amount=${property?.incrementAmount}`
        )
        .then((res) => {
          setConvertedIncrement(res.data.result?.toFixed(0));
        });

      axios
        .get(
          `https://api.exchangerate.host/convert?from=USD&to=${currency}&amount=${
            parseInt(property?.highestBid) + parseInt(property?.incrementAmount)
          }`
        )
        .then((res) => {
          setConvertedMinimum(res.data.result?.toFixed(0));
        });
    }
  }, [currency, property]);

  useEffect(() => {
    if (currency !== "USD") {
      axios
        .get(
          `https://api.exchangerate.host/convert?from=USD&to=${currency}&amount=${bid}`
        )
        .then((res) => {
          setConvertedBid(res.data.result?.toFixed(0));
        });
    }
  }, [currency, property, bid]);

  const onSubmit = async (data) => {
    if (bid === undefined) {
      setMessage("");
      setTimeout(() => {
        setMessage("Please enter a bid amount");
      }, 100);
    } else {
      const Bid = { id: property._id, biddingTimes, bidding: parseInt(bid) };
      await authService.auctionBid(Bid).then((res) => {
        if (res.data.error) {
          if (res.data.error === "Invalid Token") {
            window.location.reload();
          } else {
            setMessage("");
            setMessage(res.data.error);
          }
        } else {
          setBid(res.data.highestBid + property.incrementAmount);
          setMessage("");
          setTimeout(() => {
            setMessage("Bid Successful!");
          }, 100);
        }
      });
    }
  };

  const highestBidder =
    property.highestBidders.length > 0
      ? property.highestBidders[property.highestBidders.length - 1]
      : "";

  return (
    <>
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <>
          <Row style={{ padding: "0 20px" }}>
            <Col className="fw-bold">Auction Ends In: </Col>
            <Col className="d-flex justify-content-end">
              <AuctionBidTimer
                time={property.auctionEndDate}
                windowSize={windowSize}
              />
            </Col>
          </Row>
          <Row style={{ padding: "0 20px" }} className="mt-3">
            <Col className="fw-bold">Leading Bid:</Col>
            <Col className="d-flex justify-content-end">
              {property.highestBid ? (
                <NumberFormat
                  style={{
                    color: highestBidder.userId === user._id ? "green" : "",
                    fontWeight: "bold",
                  }}
                  value={property.highestBid}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              ) : (
                <NumberFormat
                  value={property.startingBid}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              )}
            </Col>
            {currency !== "USD" && (
              <span className="d-flex justify-content-end">
                {currency === "INR" ? (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "black",
                      fontFamily: "Interstate",
                      fontWeight: "500",
                    }}
                  >
                    Approx.{" "}
                    {parseInt(convertedCurrency).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                    })}
                  </span>
                ) : (
                  <NumberFormat
                    style={{
                      fontSize: "12px",
                      fontFamily: "Interstate",
                      fontWeight: "500",
                    }}
                    value={convertedCurrency}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Approx. "}
                    suffix={" " + currency}
                  />
                )}
              </span>
            )}
          </Row>
          <Row style={{ padding: "0 20px" }} className="mt-3">
            <Col className="fw-bold">Increment Amount:</Col>
            <Col className="d-flex justify-content-end">
              <NumberFormat
                className="fw-bold"
                value={property.incrementAmount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Col>
            {currency !== "USD" && (
              <span className="d-flex justify-content-end">
                {currency === "INR" ? (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "black",
                      fontFamily: "Interstate",
                      fontWeight: "500",
                    }}
                  >
                    Approx.{" "}
                    {parseInt(convertedIncrement).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                    })}
                  </span>
                ) : (
                  <NumberFormat
                    style={{
                      fontSize: "12px",
                      fontFamily: "Interstate",
                      fontWeight: "500",
                    }}
                    value={convertedIncrement}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Approx. "}
                    suffix={" " + currency}
                  />
                )}
              </span>
            )}
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
            {currency !== "USD" && (
              <span className="d-flex justify-content-end">
                {currency === "INR" ? (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "black",
                      fontFamily: "Interstate",
                      fontWeight: "500",
                    }}
                  >
                    Approx.{" "}
                    {parseInt(convertedMinimum).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                    })}
                  </span>
                ) : (
                  <NumberFormat
                    style={{
                      fontSize: "12px",
                      fontFamily: "Interstate",
                      fontWeight: "500",
                    }}
                    value={convertedMinimum}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Approx. "}
                    suffix={" " + currency}
                  />
                )}
              </span>
            )}
          </Row>

          <Row style={{ padding: "0 20px" }} className="mt-5">
            {currency !== "USD" && (
              <span className="d-flex justify-content-start">
                {currency === "INR" ? (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "black",
                      fontFamily: "Interstate",
                      fontWeight: "500",
                    }}
                  >
                    Approx.{" "}
                    {parseInt(convertedBid).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                    })}
                  </span>
                ) : (
                  <NumberFormat
                    style={{
                      fontSize: "12px",
                      fontFamily: "Interstate",
                      fontWeight: "500",
                    }}
                    value={convertedBid}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Approx. "}
                    suffix={" " + currency}
                  />
                )}
              </span>
            )}
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
                  borderRadius: "0",
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
