import React, { useState, useEffect } from "react";
import "../../styles/realEstate.css";
import { useParams } from "react-router-dom";
import authService from "../../services/authServices";
import DisplayRealEstate from "../RealEstate/DisplayRealEstate";
import DisplayCar from "../Cars/DisplayCar";
import DisplayJet from "../Jets/DisplayJet";
import DisplayYacht from "../Yachts/DisplayYacht";
import io from "socket.io-client";

function DisplayAuctions({ toogleChange }) {
  const [socket, setSocket] = useState();
  const { id } = useParams();
  const [auction, setAuction] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    authService.getAuction(id).then((res) => {
      if (res.data.error) {
        setLoader(false);
        alert(res.data.error);
      } else {
        setLoader(false);
        setAuction(res.data);
      }
    });
    // let serverUrl = process.env.REACT_APP_API_URL;
    let serverUrl =
      process.env.REACT_APP_NODE_ENV === "production"
        ? process.env.REACT_APP_API_URL
        : "http://localhost:5000";

    const newSocket = io(serverUrl, { withCredentials: true });
    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("connected socket with back-end");
    });
    return () => {
      newSocket.on("disconnect", () => {
        console.log("disconnected socket with back-end");
      });
    };
  }, []);
  useEffect(() => {
    if (socket) {
      socket
        .off("bid")
        .on(
          "bid",
          ({
            auctionId,
            highestBid,
            numberOfBids,
            highestBidders,
            isReservedMet,
          }) => {
            if (auction && auctionId === auction._id) {
              setAuction((prev) => {
                return {
                  ...prev,
                  highestBid,
                  numberOfBids,
                  highestBidders,
                  isReservedMet,
                };
              });
            }
          }
        );
    }
  }, [socket, auction]);

  return (
    <>
      {loader ? (
        <div className="loader">
          <div className="spinning" />
        </div>
      ) : null}
      {auction && (
        <h5 className="realHeader">
          {auction.property.type === "car" ? (
            <p
              style={{
                fontSize: "4rem",
                color: "#fcbe91",
                margin: "0",
                alignItems: "center",
              }}
            >
              CAR
            </p>
          ) : auction.property.type === "jet" ? (
            <p
              style={{
                fontSize: "4rem",
                color: "#fcbe91",
                margin: "0",
                alignItems: "center",
              }}
            >
              JET
            </p>
          ) : auction.property.type === "yacht" ? (
            <p
              style={{
                fontSize: "4rem",
                color: "#fcbe91",
                margin: "0",
                alignItems: "center",
              }}
            >
              YACHT
            </p>
          ) : (
            <p
              style={{
                fontSize: "4rem",
                color: "#fcbe91",
                margin: "0",
                alignItems: "center",
              }}
            >
              REAL ESTATE
            </p>
          )}
        </h5>
      )}
      {auction ? (
        auction.property.type === "real-estate" ? (
          <DisplayRealEstate
            socket={socket}
            property={auction}
            toogleChange={toogleChange}
          />
        ) : auction.property.type === "car" ? (
          <DisplayCar property={auction} toogleChange={toogleChange} />
        ) : auction.property.type === "jet" ? (
          <DisplayJet property={auction} toogleChange={toogleChange} />
        ) : auction.property.type === "yacht" ? (
          <DisplayYacht property={auction} toogleChange={toogleChange} />
        ) : null
      ) : (
        <div
          className="real-estate-wrap"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1>
            Auction not found! Auction has either ended or has not started yet,
            please try again later.
            <br />
            <br />
            Thank you for your patience.
          </h1>
        </div>
      )}
    </>
  );
}

export default DisplayAuctions;
