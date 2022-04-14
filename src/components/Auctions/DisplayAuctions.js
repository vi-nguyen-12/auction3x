import React, { useState, useEffect } from "react";
import "../../styles/realEstate.css";
import { useParams } from "react-router-dom";
import authService from "../../services/authServices";
import DisplayRealEstate from "../RealEstate/DisplayRealEstate";
import DisplayCar from "../Cars/DisplayCar";
import DisplayJet from "../Jets/DisplayJet";
import DisplayYacht from "../Yachts/DisplayYacht";
import io from "socket.io-client";

function DisplayAuctions({ colorChange, toogleChange }) {
  const [socket, setSocket] = useState();
  const { id } = useParams();
  const [auction, setAuction] = useState();

  useEffect(() => {
    authService.getAuction(id).then((res) => {
      setAuction(res.data);
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
      {auction ? (
        auction.property.type === "real-estate" ? (
          <DisplayRealEstate
            socket={socket}
            property={auction}
            colorChange={colorChange}
            toogleChange={toogleChange}
          />
        ) : auction.property.type === "car" ? (
          <DisplayCar
            property={auction}
            colorChange={colorChange}
            toogleChange={toogleChange}
          />
        ) : auction.property.type === "jet" ? (
          <DisplayJet
            property={auction}
            colorChange={colorChange}
            toogleChange={toogleChange}
          />
        ) : auction.property.type === "yacht" ? (
          <DisplayYacht
            property={auction}
            colorChange={colorChange}
            toogleChange={toogleChange}
          />
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
