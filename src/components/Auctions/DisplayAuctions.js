import React, { useState, useEffect } from "react";
import "../../styles/property-display.css";
import { useParams } from "react-router-dom";
import authService from "../../services/authServices";
import DisplayRealEstate from "../RealEstate/DisplayRealEstate";
import DisplayCar from "../Cars/DisplayCar";
import DisplayJet from "../Jets/DisplayJet";
import DisplayYacht from "../Yachts/DisplayYacht";
import Loading from "../../components/Loading";
import io from "socket.io-client";
import { Row } from "react-bootstrap";
import RealEstatePageBg from "../../images/RealEstatePageBg.png";
import CarPageBg from "../../images/CarPageBg.png";
import JetPageBg from "../../images/JetPageBg.png";
import YachtPageBg from "../../images/YachtPageBg.png";

function DisplayAuctions({
  toggleChange,
  toggleShow,
  toggleSignIn,
  windowSize,
  setRefresh,
  refresh,
  setMessage,
  toggleDocu,
  setDocuUrl,
  showDocu,
  colorChange,
}) {
  const [socket, setSocket] = useState();
  const { id } = useParams();
  const [auction, setAuction] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    colorChange("black");
    toggleShow(true);
    setLoader(true);
    authService.getAuction(id).then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
        setLoader(false);
      } else {
        setAuction(res.data);
        setLoader(false);
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
  }, [id, setMessage]);

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
      {/* {auction &&
        (auction.property.type === "car" ? (
          <Row
            className="realHeader"
            style={{ background: `url(${CarPageBg})` }}
          >
            <title>CAR</title>
          </Row>
        ) : auction.property.type === "jet" ? (
          <Row
            className="realHeader"
            style={{ background: `url(${JetPageBg})` }}
          >
            <title>JET</title>
          </Row>
        ) : auction.property.type === "yacht" ? (
          <Row
            className="realHeader"
            style={{ background: `url(${YachtPageBg})` }}
          >
            <title>YACHT</title>
          </Row>
        ) : (
          <Row
            className="realHeader"
            style={{ background: `url(${RealEstatePageBg})` }}
          >
            <title>REAL ESTATE</title>
          </Row>
        ))} */}
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
            setMessage={setMessage}
            toggleDocu={toggleDocu}
            setDocuUrl={setDocuUrl}
          />
        ) : auction.property.type === "car" ? (
          <DisplayCar
            property={auction}
            toggleChange={toggleChange}
            toggleSignIn={toggleSignIn}
            windowSize={windowSize}
            setRefresh={setRefresh}
            refresh={refresh}
            setMessage={setMessage}
            toggleDocu={toggleDocu}
            setDocuUrl={setDocuUrl}
          />
        ) : auction.property.type === "jet" ? (
          <DisplayJet
            property={auction}
            toggleChange={toggleChange}
            toggleSignIn={toggleSignIn}
            windowSize={windowSize}
            setRefresh={setRefresh}
            refresh={refresh}
            setMessage={setMessage}
            toggleDocu={toggleDocu}
            setDocuUrl={setDocuUrl}
            showDocu={showDocu}
          />
        ) : auction.property.type === "yacht" ? (
          <DisplayYacht
            property={auction}
            toggleChange={toggleChange}
            toggleSignIn={toggleSignIn}
            windowSize={windowSize}
            setRefresh={setRefresh}
            refresh={refresh}
            setMessage={setMessage}
            toggleDocu={toggleDocu}
            setDocuUrl={setDocuUrl}
            showDocu={showDocu}
          />
        ) : null
      ) : (
        <div
          className="vh-100"
          // className="real-estate-wrap m-5"
          // style={{
          //   display: "flex",
          //   justifyContent: "center",
          //   textAlign: "center",
          // }}
        >
          {/* <h1>
            Auction not found! Auction has either ended or has not started yet,
            please try again later.
            <br />
            <br />
            Thank you for your patience.
          </h1> */}
        </div>
      )}
    </>
  );
}

export default DisplayAuctions;
