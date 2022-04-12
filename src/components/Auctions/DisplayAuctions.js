import React, { useState, useEffect } from "react";
import "../../styles/realEstate.css";
import { useParams } from "react-router-dom";
import authService from "../../services/authServices";
import DisplayRealEstate from "../RealEstate/DisplayRealEstate";
import DisplayCar from "../Cars/DisplayCar";
import DisplayJet from "../Jets/DisplayJet";
import DisplayYacht from "../Yachts/DisplayYacht";

function DisplayAuctions({ colorChange, toogleChange }) {
  const { id } = useParams();
  const [auction, setAuction] = useState();

  useEffect(() => {
    authService.getAuction(id).then((res) => {
      setAuction(res.data);
    });
  }, []);
  return (
    <>
      {auction ? (
        auction.property.type === "real-estate" ? (
          <DisplayRealEstate
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
