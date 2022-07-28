import React, { useState, useEffect } from "react";
import "../../styles/realEstate.css";
import { useParams } from "react-router-dom";
import authService from "../../services/authServices";
import DisplayRealEstate from "../RealEstate/DisplayRealEstate";
import DisplayCar from "../Cars/DisplayCar";
import DisplayJet from "../Jets/DisplayJet";
import DisplayYacht from "../Yachts/DisplayYacht";
import Loading from "../../components/Loading";
import io from "socket.io-client";

function DisplayAuctions({
  toggleChange,
  setHeaderWidth,
  setPositionLeft,
  setPadRight,
  toggleShow,
  toggleSignIn,
  windowSize,
  setRefresh,
  refresh,
}) {
  const [socket, setSocket] = useState();
  const { id } = useParams();
  const [auction, setAuction] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    toggleShow(true);
    setHeaderWidth("100vw");
    setPositionLeft("20%");
    setPadRight("3rem");
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
        ? process.env.REACT_APP_PROD_API_URL
        : process.env.REACT_APP_NODE_ENV === "test"
        ? process.env.REACT_APP_TEST_API_URL
        : process.env.REACT_APP_DEV_API_URL;

    const newSocket = io(serverUrl, { withCredentials: true });
    setSocket(newSocket);
    newSocket.on("connect", () => {
      // console.log("connected socket with back-end");
    });
    return () => {
      newSocket.on("disconnect", () => {
        // console.log("disconnected socket with back-end");
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
      {loader ? <Loading /> : null}
      {auction && (
        <h5 className="realHeader">
          {auction.property.type === "car" ? (
            <p>CAR</p>
          ) : auction.property.type === "jet" ? (
            <p>JET</p>
          ) : auction.property.type === "yacht" ? (
            <p>YACHT</p>
          ) : (
            <p>REAL ESTATE</p>
          )}
        </h5>
      )}
      {auction ? (
        auction.property.type === "real-estate" ? (
          <DisplayRealEstate
            socket={socket}
            property={auction}
            toggleChange={toggleChange}
            toggleSignIn={toggleSignIn}
            windowSize={windowSize}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        ) : auction.property.type === "car" ? (
          <DisplayCar
            property={auction}
            toggleChange={toggleChange}
            toggleSignIn={toggleSignIn}
            windowSize={windowSize}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        ) : auction.property.type === "jet" ? (
          <DisplayJet
            property={auction}
            toggleChange={toggleChange}
            toggleSignIn={toggleSignIn}
            windowSize={windowSize}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        ) : auction.property.type === "yacht" ? (
          <DisplayYacht
            property={auction}
            toggleChange={toggleChange}
            toggleSignIn={toggleSignIn}
            windowSize={windowSize}
            setRefresh={setRefresh}
            refresh={refresh}
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
