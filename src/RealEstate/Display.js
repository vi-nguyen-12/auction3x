import React, { useEffect, useState } from "react";
import "../styles/realEstate.css";
import { useSelector } from "react-redux";
import authService from "../services/authServices";
import { useDispatch } from "react-redux";
import { addProperty } from "../slice/propertySlice";
import Header from "../components/Header";
import DisplayTab from "../RealEstate/DisplayTab";
import { Modal } from "react-bootstrap";
import { Route, Link } from "react-router-dom";

const Display = () => {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.property);

  //check if property is empty
  if (property === 0) {
    authService.getRealEstate().then((res) => {
      dispatch(addProperty(res.data.data[0]));
    });
  }

  return (
    <div className="styl">
      <tr className="realHeader">
        <h2 style={{ color: "rgb(233,175,132)" }}>REAL ESTATE</h2>
      </tr>
      <img
        src={property.images[2].url}
        alt="Snow"
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          padding: "35px",
          width: "100%",
        }}
      />
      <div
        className="list-info-1"
        style={{ display: "inline-block", padding: "35px" }}
      >
        <tr>
          <td>
            <h2 style={{ color: "#B77B50" }}>Luxury Villa in Los Angeles</h2>
            <div>
              <p>{property.details.address.formatted_street_address}</p>
            </div>
          </td>
          <td
            style={{
              position: "absolute",
              right: "100px",
              width: "240px",
              fontSize: "17px",
            }}
          >
            {" "}
            <div
              style={{
                display: "inline-block",
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
                marginLeft: "35px",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <button className="customButton" style={{ width: "200px" }}>
                Register to Bid
              </button>{" "}
              <Link to="/DisplayTab">
                <b
                  style={{
                    borderBottom: "1px solid #6D6D6D",
                    color: "#6D6D6D",
                  }}
                >
                  View Document
                </b>
              </Link>
            </div>
          </td>
        </tr>
      </div>
      <div className="list-info-2">
        <div
          style={{
            display: "inline-block",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#E8E8E8",
            width: "15%",
            marginLeft: "35px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h4> Online Auction</h4>
          <p> July 19-23, 2021</p>
        </div>
        <div
          style={{
            display: "inline-block",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#E8E8E8",
            width: "15%",
            marginLeft: "35px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h4> $256,5200,000</h4>
          <p> Starting Bid</p>
        </div>
        <div
          style={{
            display: "inline-block",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#E8E8E8",
            width: "15%",
            marginLeft: "35px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h4>23,000</h4>
          <p> Views</p>
        </div>
        <div style={{ padding: "35px" }}>
          <h2>
            <span style={{ color: "#B77B50" }}>|</span>Property Information
          </h2>

          <tr>
            <td
              style={{
                width: "240px",
                position: "relative",
                left: "105px",
                padding: "15px",
              }}
            >
              Sale Type
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                fontSize: "17px",
                padding: "15px",
              }}
            >
              Tenancy
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "240px",
                padding: "15px",
                position: "relative",
                left: "105px",
              }}
            >
              Sale Condition
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                fontSize: "17px",
                padding: "15px",
                padding: "15px",
              }}
            >
              Building Height:{" "}
              <span style={{ fontWeight: "bold" }}>
                {property.details.structure.stories} Stories
              </span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "240px",
                position: "relative",
                padding: "15px",
                left: "105px",
              }}
            >
              Property Type:{" "}
              <span style={{ fontWeight: "bold" }}>
                {property.details.parcel.county_land_use_description}
              </span>
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                fontSize: "17px",
                padding: "15px",
              }}
            >
              Building FAR
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "240px",
                padding: "15px",
                position: "relative",
                left: "105px",
              }}
            >
              Building Size:{" "}
              <span style={{ fontWeight: "bold" }}>
                {property.details.structure.total_area_sq_ft} sq.ft
              </span>
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                padding: "15px",
                fontSize: "17px",
              }}
            >
              Zoning:{" "}
              <span style={{ fontWeight: "bold" }}>
                {property.details.parcel.zoning}
              </span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "240px",
                padding: "15px",
                position: "relative",
                left: "105px",
              }}
            >
              Building Class:{" "}
              <span style={{ fontWeight: "bold" }}>
                {property.details.structure.quality}
              </span>
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                padding: "15px",
                fontSize: "17px",
              }}
            >
              Parking:{" "}
              <span style={{ fontWeight: "bold" }}>
                {property.details.structure.parking_type}
              </span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "240px",
                padding: "15px",
                position: "relative",
                left: "105px",
              }}
            >
              Year Built/ Renovated:{" "}
              <span style={{ fontWeight: "bold" }}>
                {property.details.structure.year_built}
              </span>
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                padding: "15px",
                fontSize: "17px",
              }}
            >
              Frontage:{" "}
              <span style={{ fontWeight: "bold" }}>
                {property.details.parcel.frontage_ft}
              </span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "240px",
                padding: "15px",
                position: "relative",
                left: "105px",
              }}
            >
              Percent Leased: <span style={{ fontWeight: "bold" }}>N/A</span>
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                padding: "15px",
                width: "240px",
                fontSize: "17px",
              }}
            >
              Opportunity Zone: <span style={{ fontWeight: "bold" }}>N/A</span>
            </td>
          </tr>
        </div>

        <div style={{ padding: "35px" }}>
          <tr>
            {" "}
            <h2>
              <span style={{ color: "#B77B50" }}>|</span>Executive Summary
            </h2>
          </tr>
          <tr>
            <td>
              The Reid Group & Keller Williams Realty, in partnership with
              Ten-X, is pleased to offer for sale this West Milwaukee Medical
              Office. The property is being offered in a Fee Simple interest,
              unencumbered by a management contract. Built by masonry stone in
              1957 and located in West Milwaukee, Wisconsin, this property is a
              single-story, ‡4,856-SF office most recently used as a medical
              office. It features small, private rooms/offices that can be
              converted to something a new investor has a vision for. It is
              zoned NS2, which is commercial and neighborhood shopping. The
              structure itself totals about six offices, a fully functional
              basement, and six surface parking spaces on a 18-acre lot. The
              property is a great value-add opportunity that has been well
              maintained but would absolutely benefit from a renovation and
              strategic marketing/lease-up plan. Today, Milwaukee is one of the
              most ethnically and culturally diverse cities in the United
              States. German immigrants heavily influenced its history in the
              19th century, and it became well known for its brewing industry.
            </td>
            <td>
              In recent years, Milwaukee has been undergoing its largest
              construction boom since the 1960s. Major new additions to the city
              in the past two decades include the Milwaukee Riverwalk, the
              Wisconsin Center, American Family Field, The Hop (streetcar
              system), an expansion to the Milwaukee Art Museum, Milwaukee
              Repertory Theater, the Bradley Symphony Center, and Discovery
              World, as well as major renovations to the UW-Milwaukee Panther
              Arena. Fiserv Forum opened in late 2018 and hosts sporting events
              and concerts. Since 1968, Milwaukee has been home to Summerfest,
              one of the largest music festivals in the world. With regard to
              education, Milwaukee is home to UW-Milwaukee, Marquette
              University, MSOE, and several other universities and colleges. The
              city is home to two major professional sports teams, the Bucks and
              Brewers. It is home to several Fortune 500 companies, including
              Northwestern Mutual, WE Energy Group, Rockwell Automation, and
              Harley-Davidson. Property tours are available by appointment only.
              Please contact Alexander Reid to schedule at 847-791-2420 or
              alexander@reidgroup.house.
            </td>
          </tr>
        </div>
      </div>
    </div>
  );
};

export default Display;
