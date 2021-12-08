import React from "react";
import "../styles/realEstate.css";
import { useSelector } from "react-redux";
import authService from "../services/authServices";
import { useDispatch } from "react-redux";
import { addProperty } from "../slice/propertySlice";


const Display = () => {
  const dispatch = useDispatch();
  const property = useSelector((state) =>state.property);

  //check if property is empty
  if (property === 0) {
    authService.getRealEstate().then((res) => {
      dispatch(addProperty(res.data.data[0]));
    });
  }

  return (
    <div>
      <tr className="realHeader">
        <h2 style={{ color: "rgb(233,175,132)" }}>REAL ESTATE</h2>
      </tr>
      <img
        src="/images/feature.png"
        alt="Snow"
        style={{
          display: "flex",
          justifyContent: "center",
          width: "95%",
          height: "95%",
          margin: "auto",
        }}
      />
      <div
        className="list-info-1"
        style={{ display: "inline-block", padding: "25px" }}
      >
        <h2 style={{ color: "#B77B50" }}>Luxury Villa in Los Angeles</h2>
        <div>
          <p>{property.details.address.formatted_street_address}</p>
        </div>
      </div>
      <div className="list-info-2">
        <tr>
          <td style={{ width: "240px", position: "relative", left: "105px" }}>
            {" "}
            Online Auction
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
            Addition info{" "}
          </td>
        </tr>
        <tr>
          <td
            style={{
              position: "relative",
              left: "100px",
              fontSize: "17px",
              bottom: "5px",
            }}
          >
            {" "}
            July 19-23, 2021
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
            4bd | 2 ba | 1.422sq.ft
          </td>
        </tr>
        <div className="bidding-session">
          <tr>
            <td
              style={{
                display: "inline-block",
                fontSize: "25px",
                padding: "25px",
              }}
            >
              {" "}
              Starting Bid: <div> $256,5200,000</div>
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
              <button className="customButton" style={{ width: "200px" }}>
                Register to Bid
              </button>{" "}
            </td>
          </tr>
        </div>

        <div style={{ padding: "25px" }}>
          <tr>
            {" "}
            <h2>Property Information</h2>{" "}
          </tr>

          <tr>
            <td style={{ width: "240px", position: "relative", left: "105px" }}>
              Sale Type
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                fontSize: "17px",
              }}
            >
              Tenancy
            </td>
          </tr>
          <tr>
            <td style={{ width: "240px", position: "relative", left: "105px" }}>
              Sale Condition
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                fontSize: "17px",
              }}
            >
              Building Height
            </td>
          </tr>
          <tr>
            <td style={{ width: "240px", position: "relative", left: "105px" }}>
              Property Type
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                fontSize: "17px",
              }}
            >
              Building FAR
            </td>
          </tr>
          <tr>
            <td style={{ width: "240px", position: "relative", left: "105px" }}>
              Building Size
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                fontSize: "17px",
              }}
            >
              Zoning
            </td>
          </tr>
          <tr>
            <td style={{ width: "240px", position: "relative", left: "105px" }}>
              Building Class
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                fontSize: "17px",
              }}
            >
              Parking
            </td>
          </tr>
          <tr>
            <td style={{ width: "240px", position: "relative", left: "105px" }}>
              Year Built/ Renovated
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                fontSize: "17px",
              }}
            >
              Frontage
            </td>
          </tr>
          <tr>
            <td style={{ width: "240px", position: "relative", left: "105px" }}>
              Percent Leased
            </td>
            <td
              style={{
                position: "absolute",
                right: "500px",
                width: "240px",
                fontSize: "17px",
              }}
            >
              Opportunity Zone
            </td>
          </tr>
        </div>

        <div style={{ padding: "25px" }}>
          <tr>
            {" "}
            <h2>Executive Summary</h2>
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
