import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { Row, Col, Modal, Image } from "react-bootstrap";
import "../../styles/realEstate.css";
import RealEstatePage from "../RealEstate/RealEstatePage";
import CarPage from "../Cars/CarPage";
import JetPage from "../Jets/JetPage";
import YachtPage from "../Yachts/YachtPage";
import CloseButton from "react-bootstrap/CloseButton";
import { GoogleMap, Marker } from "@react-google-maps/api";

const mapStyles = {
  height: "90%",
  width: "100%",
};
const PropertyPages = ({
  toogleChange,
  setHeaderWidth,
  setPositionLeft,
  setPadRight,
  toogleShow,
}) => {
  useEffect(() => {
    toogleShow(true);
    setHeaderWidth("100vw");
    setPositionLeft("20%");
    setPadRight("3rem");
  }, []);
  const path = window.location.pathname;
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState([]);
  const [showImg, setShowImg] = useState(false);
  const [showImgCar, setShowImgCar] = useState(false);
  const [showImgJet, setShowImgJet] = useState(false);
  const [showImgYacht, setShowImgYacht] = useState(false);
  const [img, setImg] = useState([]);
  const [imgCar, setImgCar] = useState([]);
  const [imgJet, setImgJet] = useState([]);
  const [imgYacht, setImgYacht] = useState([]);
  const toggleMap = () => setShowMap(!showMap);
  const toogleImage = () => setShowImg(!showImg);
  const toggleImgCar = () => setShowImgCar(!showImgCar);
  const toggleImgJet = () => setShowImgJet(!showImgJet);
  const toggleImgYacht = () => setShowImgYacht(!showImgYacht);
  console.log(imgCar);
  console.log(img);
  return (
    <>
      <h5 className="realHeader">
        {path === "/cars" ? (
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
        ) : path === "/jets" ? (
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
        ) : path === "/yachts" ? (
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
      {path === "/cars" ? (
        <Row className="realEstateFilter">
          <Col md={9} >
            <Row>
              <Col md={3} >
                <div className=" RealButton ">
                  <input type="text" placeholder="Enter your Location" className="searchBar" />
                </div>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Auction Type</option>
                  <option href="#">Ongoing</option>
                  <option href="#">Upcoming</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
              {/* <Col >
                <select className=" RealButton ">
                  <option>Bldg Siize</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col> */}
              <Col >
                <select className=" RealButton ">
                  <option>More Filter</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Sort</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col md={7} style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                About 151051 results
              </Col>
              <Col md={2}>
                <button className="mapButton" onClick={toggleMap} >Map</button>
              </Col>
              <Col md={2}>
                <button className="galleryButton" onClick={toggleImgCar}>Gallery</button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/jets" ? (
        <Row className="realEstateFilter">
          <Col md={9} >
            <Row>
              <Col md={3} >
                <div className=" RealButton ">
                  <input type="text" placeholder="Enter your Location" className="searchBar" />
                </div>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Auction Type</option>
                  <option href="#">Ongoing</option>
                  <option href="#">Upcoming</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Bldg Siize</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>More Filter</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Sort</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col md={7} style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                About 151051 results
              </Col>
              <Col md={2}>
                <button className="mapButton" onClick={toggleMap} >Map</button>
              </Col>
              <Col md={2}>
                <button className="galleryButton" onClick={toggleImgJet}>Gallery</button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/yachts" ? (
        <Row className="realEstateFilter">
          <Col md={9} >
            <Row>
              <Col md={3} >
                <div className=" RealButton ">
                  <input type="text" placeholder="Enter your Location" className="searchBar" />
                </div>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Auction Type</option>
                  <option href="#">Ongoing</option>
                  <option href="#">Upcoming</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Bldg Siize</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>More Filter</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
              <Col >
                <select className=" RealButton ">
                  <option>Sort</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col md={7} style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                About 151051 results
              </Col>
              <Col md={2}>
                <button className="mapButton" onClick={toggleMap} >Map</button>
              </Col>
              <Col md={2}>
                <button className="galleryButton" onClick={toggleImgYacht}>Gallery</button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : <Row className="realEstateFilter">
        <Col md={9} >
          <Row>
            <Col md={3} >
              <div className=" RealButton ">
                <input type="text" placeholder="Enter your Location" className="searchBar" />
              </div>
            </Col>
            <Col >
              <select className=" RealButton ">
                <option>Auction Type</option>
                <option href="#">Ongoing</option>
                <option href="#">Upcoming</option>
              </select>
            </Col>
            <Col >
              <select className=" RealButton ">
                <option>Property Type</option>
                <option href="#">Profile</option>
                <option href="#">My Ads</option>
              </select>
            </Col>
            <Col >
              <select className=" RealButton ">
                <option>Price</option>
                <option href="#">Profile</option>
                <option href="#">My Ads</option>
              </select>
            </Col>
            <Col >
              <select className=" RealButton ">
                <option>Bldg Siize</option>
                <option href="#">Profile</option>
                <option href="#">My Ads</option>
              </select>
            </Col>
            <Col >
              <select className=" RealButton ">
                <option>More Filter</option>
                <option href="#">Profile</option>
                <option href="#">My Ads</option>
              </select>
            </Col>
            <Col >
              <select className=" RealButton ">
                <option>Sort</option>
                <option href="#">Profile</option>
                <option href="#">My Ads</option>
              </select>
            </Col>
          </Row>
        </Col>
        <Col md={3} className="filterResult">
          <Row>
            <Col md={7} style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
              About 151051 results
            </Col>
            <Col md={2}>
              <button className="mapButton" onClick={toggleMap} >Map</button>
            </Col>
            <Col md={2}>
              <button className="galleryButton" onClick={toogleImage}>Gallery</button>
            </Col>
          </Row>
        </Col>
      </Row>
      }
      {path === "/realEstates" ? (
        <RealEstatePage toogleChange={toogleChange} toogleImage={toogleImage} setImg={setImg} />
      ) : path === "/cars" ? (
        <CarPage toogleChange={toogleChange} toggleImgCar={toggleImgCar} setImgCar={setImgCar} />
      ) : path === "/jets" ? (
        <JetPage toogleChange={toogleChange} setShowImgJet={setShowImgJet} setImgJet={setImgJet} />
      ) : path === "/yachts" ? (
        <YachtPage toogleChange={toogleChange} setShowImgYacht={setShowImgYacht} setImgYacht={setImgYacht} />
      ) : null}
      {/* Map Button */}
      <Modal
        backdrop="static"
        keyboard={false}
        size="xl"
        show={showMap}
        onHide={toggleMap}
        centered
      >
        <Modal.Body style={{ height: "700px" }}>
          <div>
            <CloseButton
              className="modal-close"
              onClick={toggleMap}
            />
          </div>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={18}
            center={location}
          >
            <Marker position={location} />
          </GoogleMap>
          <p>
            {/* {
              property.property.details.property_address
                .formatted_street_address
            } */}
          </p>
        </Modal.Body>
      </Modal>
      {/* Gallery Button */}
      {path === "/cars" ? (
        <Modal
          backdrop="static"
          keyboard={true}
          size="xl"
          show={showImgCar}
          onHide={toggleImgCar}
          centered
        >
          <Modal.Body >
            <div>
              <CloseButton
                className="modal-close"
                onClick={toggleImgCar}
              />
            </div>
            <Row >
              {imgCar.map((imgCar, index) => (
                <Col md={6} key={index} className="p-2" >
                  <Image
                    src={imgCar}
                    alt="gallery"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Col>
              ))}
            </Row>
          </Modal.Body>
        </Modal>
      ) : path === "/jets" ? (
        <Modal
          backdrop="static"
          keyboard={true}
          size="xl"
          show={showImgJet}
          onHide={toggleImgJet}
          centered
        >
          <Modal.Body >
            <div>
              <CloseButton
                className="modal-close"
                onClick={toggleImgJet}
              />
            </div>
            <Row >
              {imgJet.map((imgJet, index) => (
                <Col md={6} key={index} className="p-2" >
                  <Image
                    src={imgJet}
                    alt="gallery"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Col>
              ))}
            </Row>
          </Modal.Body>
        </Modal>
      ) : path === "/yachts" ? (
        <Modal
          backdrop="static"
          keyboard={true}
          size="xl"
          show={showImgYacht}
          onHide={toggleImgYacht}
          centered
        >
          <Modal.Body >
            <div>
              <CloseButton
                className="modal-close"
                onClick={toggleImgYacht}
              />
            </div>
            <Row >
              {imgYacht.map((imgYacht, index) => (
                <Col md={6} key={index} className="p-2" >
                  <Image
                    src={imgYacht}
                    alt="gallery"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Col>
              ))}
            </Row>
          </Modal.Body>
        </Modal>
      ) :
        <Modal
          backdrop="static"
          keyboard={true}
          size="xl"
          show={showImg}
          onHide={toogleImage}
          centered
        >
          <Modal.Body >
            <div>
              <CloseButton
                className="modal-close"
                onClick={toogleImage}
              />
            </div>
            <Row >
              {img.map((img, index) => (
                <Col md={6} key={index} className="p-2" >
                  <Image
                    src={img}
                    alt="gallery"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Col>
              ))}
            </Row>
          </Modal.Body>
        </Modal>
      }
    </>
  );
};

export default PropertyPages;
