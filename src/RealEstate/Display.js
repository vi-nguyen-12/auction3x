import React, { useEffect, useState } from "react";
import "../styles/realEstate.css";
import authService from "../services/authServices";
import { Modal, Carousel } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import env from "../env";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MultiBuyForm from "../components/BuyRegister/MultiBuyForm";
import ProcessBar from "../components/BuyRegister/ProcessBar";
import userSlice from "../slice/userSlice";
import { useSelector } from "react-redux";
import BuyConfirm from "../components/BuyRegister/BuyConfirm";

const Display = ({ colorChange }) => {
  colorChange("black");
  const { id } = useParams();
  const [property, setProperty] = useState();
  const [location, setLocation] = useState({});
  const [favorite, setFavorite] = useState(false);
  const [showPics, setShowPics] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [bid, setBid] = useState(false);
  const [bid1, setBid1] = useState(false);
  const toogleBid1 = () => setBid1(!bid1);
  const toggleMap = () => setShowMap(!showMap);
  const toggleVids = () => setShowVideos(!showVideos);
  const togglePics = () => setShowPics(!showPics);
  const toggleImage = () => setFavorite(!favorite);
  const toogleBid = () => setBid(!bid);
  const user = useSelector((state) => state.user);

  useEffect(async () => {
    const property = await authService.sendProperty(id);
    console.log(property);
    setProperty(property.data);
    setLocation({
      name: "Property Location",
      lat: property.data.details.address.latitude,
      lng: property.data.details.address.longitude,
    });
  }, []);

  const mapStyles = {
    height: "50vh",
    width: "100%",
  };

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const Carousel = styled(Slider)`
    height: 30vh;
    overflow: hidden;

    & > button {
      opacity: 0;
      height: 100%;
      width: 5vw;
      z-index: 1;

      &:hover {
        opacity: 1;
        transition: opacity 0.2s ease 0s;
      }
    }

    ul li button {
      &:before {
        top: -5vh;
        font-size: 20px;
        color: white;
        left: -35px;
      }
    }

    li.slick-active button:before {
      color: white;
    }

    .slick-list {
      overflow: initial;
    }

    .slick-prev {
      left: -75px;
      width: 12vw;
      height: 100%;
    }

    .slick-next {
      right: -75px;
      width: 12vw;
      height: 100%;
    }
  `;

  const Wrap = styled.div`
    border-radius: 4px;
    cursor: pointer;
    position: relative;

    a {
      border-radius: 4px;
      box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
      cursor: pointer;
      display: block;
      position: relative;
      padding: 0;

      img {
        width: 100%;
        height: 30vh;
      }

      // &:hover {
      //   padding: 0;
      //   // border: 4px solid rgba(249, 249, 249, 0.8);
      //   transition-duration: 300ms;
      // }
    }
  `;

  const HomeBottom = styled.div`
    position: absolute;
    bottom: 20vh;
    z-index: 1;
    left: 5vw;
    a {
      color: white !important;
      font-size: 24px;
      font-weight: bolder;
      box-shadow: none !important;
    }
    span {
      color: white;
      font-size: 14px;
      font-weight: bolder;
    }
  `;

  return (
    <>
      {!property ? (
        <div>Loading...</div>
      ) : (
        <div className="styl">
          <tr className="realHeader">
            <h2 style={{ color: "rgb(233,175,132)" }}>REAL ESTATE</h2>
          </tr>
          <img
            src={property.images[0].url}
            alt="Snow"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              padding: "35px",
              width: "100%",
              borderRadius: "15px",
              position: "relative",
            }}
          />
          <div
            style={{
              display: "inline-block",
              position: "absolute",
              top: "70%",
              padding: "35px",
              marginRight: "100%",
              left: "90%",
            }}
          >
            <button
              syle={{
                backgroundColor: "white",
                border: "none",
              }}
            >
              <button
                onClick={toggleImage}
                // icon={favorite ? "/images/star-before.png" : "/images/star.png"}
                style={{
                  border: "none",
                  position: "relative",
                  top: "10px",
                  background: "none",
                }}
              >
                {favorite ? (
                  <img src="/images/star.png" />
                ) : (
                  <img src="/images/star-before.png" />
                )}
              </button>

              <img src="/images/line.png" />
              <div>
                <button
                  style={{ border: "none", background: "none" }}
                  onClick={togglePics}
                >
                  <img src="/images/picture.png" />
                </button>
                <Modal show={showPics} onHide={togglePics} centered>
                  <Modal.Header
                    contentClassName="modal-head-signup"
                    closeButton
                  >
                    <Modal.Title>
                      <h2>Property Pictures</h2>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Carousel {...settings}>
                      {property.images.map((item) => (
                        <Wrap>
                          <a>
                            <img src={item.url} alt="" />
                          </a>
                        </Wrap>
                      ))}
                    </Carousel>
                  </Modal.Body>
                </Modal>
              </div>
              <img src="/images/line.png" />
              <div>
                <button
                  onClick={toggleVids}
                  style={{ border: "none", background: "none" }}
                >
                  <img src="/images/video.png" />
                </button>

                <Modal show={showVideos} onHide={toggleVids} centered>
                  <Modal.Header
                    contentClassName="modal-head-signup"
                    closeButton
                  >
                    <Modal.Title>
                      <h2>Property Videos</h2>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Carousel {...settings}>
                      {property.videos.map((item) => (
                        <Wrap>
                          <a>
                            <video width="100%" height="100%" controls>
                              <source src={item.url} type="video/webm" />
                            </video>
                          </a>
                        </Wrap>
                      ))}
                    </Carousel>
                  </Modal.Body>
                </Modal>
                <img src="/images/line.png" />
                <button style={{ border: "none", background: "none" }}>
                  <Link to="/">
                    <img src="/images/360.png" />
                  </Link>
                </button>
                <img src="/images/line.png" />
                <button
                  onClick={toggleMap}
                  style={{
                    border: "none",
                    position: "relative",
                    bottom: "10px",
                    background: "none",
                  }}
                >
                  <img src="/images/location.png" />
                </button>
                <Modal size="lg" show={showMap} onHide={toggleMap} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <h2>Property Location</h2>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <LoadScript {...env.API_Key}>
                      <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={18}
                        center={location}
                      >
                        <Marker key={location.name} position={location} />
                      </GoogleMap>
                    </LoadScript>
                    <p>{property.details.address.formatted_street_address}</p>
                  </Modal.Body>
                </Modal>
              </div>
            </button>
          </div>
          <div
            className="list-info-1"
            style={{ display: "inline-block", padding: "35px" }}
          >
            <tr>
              <td>
                <h2 style={{ color: "#B77B50" }}>
                  Luxury Villa in Los Angeles
                </h2>
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
                  {user ? (
                    <div>
                      <button
                        className="customButton"
                        style={{ width: "200px", fontSize: "20px" }}
                        onclick={toogleBid1}
                      >
                        Place To Bid
                      </button>
                      <Modal size="lg" show={bid1} onHide={toogleBid1} centered>
                        <BuyConfirm />
                      </Modal>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="customButton"
                        style={{ width: "200px", fontSize: "20px" }}
                        onClick={toogleBid}
                      >
                        Register to Bid
                      </button>
                    </div>
                  )}

                  <Modal size="lg" show={bid} onHide={toogleBid} centered>
                    <Modal.Body>
                      <MultiBuyForm />
                    </Modal.Body>
                  </Modal>

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
              <h4>12,3456</h4>
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
                  Percent Leased:{" "}
                  <span style={{ fontWeight: "bold" }}>N/A</span>
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
                  Opportunity Zone:{" "}
                  <span style={{ fontWeight: "bold" }}>N/A</span>
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
                  Ten-X, is pleased to offer for sale this West Milwaukee
                  Medical Office. The property is being offered in a Fee Simple
                  interest, unencumbered by a management contract. Built by
                  masonry stone in 1957 and located in West Milwaukee,
                  Wisconsin, this property is a single-story, ‡4,856-SF office
                  most recently used as a medical office. It features small,
                  private rooms/offices that can be converted to something a new
                  investor has a vision for. It is zoned NS2, which is
                  commercial and neighborhood shopping. The structure itself
                  totals about six offices, a fully functional basement, and six
                  surface parking spaces on a 18-acre lot. The property is a
                  great value-add opportunity that has been well maintained but
                  would absolutely benefit from a renovation and strategic
                  marketing/lease-up plan. Today, Milwaukee is one of the most
                  ethnically and culturally diverse cities in the United States.
                  German immigrants heavily influenced its history in the 19th
                  century, and it became well known for its brewing industry.
                </td>
                <td>
                  In recent years, Milwaukee has been undergoing its largest
                  construction boom since the 1960s. Major new additions to the
                  city in the past two decades include the Milwaukee Riverwalk,
                  the Wisconsin Center, American Family Field, The Hop
                  (streetcar system), an expansion to the Milwaukee Art Museum,
                  Milwaukee Repertory Theater, the Bradley Symphony Center, and
                  Discovery World, as well as major renovations to the
                  UW-Milwaukee Panther Arena. Fiserv Forum opened in late 2018
                  and hosts sporting events and concerts. Since 1968, Milwaukee
                  has been home to Summerfest, one of the largest music
                  festivals in the world. With regard to education, Milwaukee is
                  home to UW-Milwaukee, Marquette University, MSOE, and several
                  other universities and colleges. The city is home to two major
                  professional sports teams, the Bucks and Brewers. It is home
                  to several Fortune 500 companies, including Northwestern
                  Mutual, WE Energy Group, Rockwell Automation, and
                  Harley-Davidson. Property tours are available by appointment
                  only. Please contact Alexander Reid to schedule at
                  847-791-2420 or alexander@reidgroup.house.
                </td>
              </tr>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Display;
