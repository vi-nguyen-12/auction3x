import React from "react";
import "../../styles/realEstate.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DisplayRealEstate from "../RealEstate/DisplayRealEstate";
import DisplayCar from "../Cars/DisplayCar";
import DisplayJet from "../Jets/DisplayJet";
import DisplayYacht from "../Yachts/DisplayYacht";

function DisplayAuctions({ colorChange, toogleChange }) {
  const { id } = useParams();
  const auctions = useSelector((state) => state.auction);
  const properties = useSelector((state) => state.property);

  const upcoming =
    properties.length > 0 ? properties.filter((item) => item._id === id) : [];
  const auction =
    auctions.length > 0 ? auctions.filter((item) => item._id === id) : [];

  const propAuction =
    auction.length > 0 ? auction[0] : upcoming.length > 0 ? upcoming[0] : null;

  return (
    <>
      {propAuction ? (
        propAuction.property.type === "real-estate" ? (
          <DisplayRealEstate
            property={propAuction}
            colorChange={colorChange}
            toogleChange={toogleChange}
          />
        ) : propAuction.property.type === "car" ? (
          <DisplayCar
            property={propAuction}
            colorChange={colorChange}
            toogleChange={toogleChange}
          />
        ) : propAuction.property.type === "jet" ? (
          <DisplayJet
            property={propAuction}
            colorChange={colorChange}
            toogleChange={toogleChange}
          />
        ) : propAuction.property.type === "yacht" ? (
          <DisplayYacht
            property={propAuction}
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
