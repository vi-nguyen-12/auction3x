import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  toggleChange,
  setHeaderWidth,
  setPositionLeft,
  setPadRight,
  toggleShow,
  toggleSignIn,
}) => {
  useEffect(() => {
    toggleShow(true);
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
  const toggleImage = () => setShowImg(!showImg);
  const toggleImgCar = () => setShowImgCar(!showImgCar);
  const toggleImgJet = () => setShowImgJet(!showImgJet);
  const toggleImgYacht = () => setShowImgYacht(!showImgYacht);
  return (
    <>
      <h5 className="realHeader">
        {path === "/cars" ? (
          <p>
            CAR
          </p>
        ) : path === "/jets" ? (
          <p>
            JET
          </p>
        ) : path === "/yachts" ? (
          <p>
            YACHT
          </p>
        ) : (
          <p>
            REAL ESTATE
          </p>
        )}
      </h5>
      {path === "/cars" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={3}>
                <div className=" RealButton ">
                  <input
                    type="text"
                    placeholder="Enter your Location"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Brand</option>
                  <option href="#">Mercedes-Benz</option>
                  <option href="#">Porsche</option>
                  <option href="#">Chevrolet</option>
                  <option href="#">Ford</option>
                  <option href="#">Ferrari</option>
                  <option href="#">Rolls-Royce</option>
                  <option href="#">Land Rover</option>
                  <option href="#">Bentley</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Years</option>
                  <option href="#">2015-2022</option>
                  <option href="#">2010-2014</option>
                  <option href="#">2000-2009</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Countries</option>
                  <option href="#">United States</option>
                  <option href="#">Canada</option>
                  <option href="#">Australia</option>
                  <option href="#">United Kingdom</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Auction Type</option>
                  <option href="#">Ongoing</option>
                  <option href="#">Upcoming</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Cabriolet</option>
                  <option href="#">SUV</option>
                  <option href="#">Coupe</option>
                  <option href="#">Other</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $10,000</option>
                  <option href="#">$10,000 - $21,000</option>
                  <option href="#">$21,000 - $31,000</option>
                  <option href="#">$31,000 - $51,000</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Mileage</option>
                  <option href="#">0 mi - 1000 mi</option>
                  <option href="#">10000 mi - 20000 mi</option>
                  <option href="#">20000 mi - 40000 mi</option>
                  <option href="#">40000 mi - 60000 mi</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Sort by:</option>
                  <option href="#">Premium</option>
                  <option href="#">Popular</option>
                  <option href="#">Price Lowest First</option>
                  <option href="#">Price Highest First</option>
                </select>
              </Col>
              <Col>
                <button className="galleryButton">Search</button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col
                md={7}
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                About 151051 results
              </Col>
              <Col md={2}>
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col md={2}>
                <button className="galleryButton" onClick={toggleImgCar}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/jets" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={3}>
                <div className=" RealButton ">
                  <input
                    type="text"
                    placeholder="Enter your Location"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Brand</option>
                  <option href="#">Bombardier</option>
                  <option href="#">Cessna</option>
                  <option href="#">Gulfstream</option>
                  <option href="#">Dassault</option>
                  <option href="#">Embraer</option>
                  <option href="#">Beechcraft</option>
                  <option href="#">Pilatus</option>
                  <option href="#">Piper</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Years</option>
                  <option href="#">2015-2022</option>
                  <option href="#">2010-2014</option>
                  <option href="#">2000-2009</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Countries</option>
                  <option href="#">United States</option>
                  <option href="#">Canada</option>
                  <option href="#">Australia</option>
                  <option href="#">United Kingdom</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Auction Type</option>
                  <option href="#">Ongoing</option>
                  <option href="#">Upcoming</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Heavy Jet</option>
                  <option href="#">Light Jet</option>
                  <option href="#">Super Midsize Jet</option>
                  <option href="#">Large Cabin</option>
                  <option href="#">Turbo Prop</option>
                  <option href="#">Midsize Jet</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$15,000,000 - $30,000,000</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>TTAF</option>
                  <option href="#">0 h - 500 h</option>
                  <option href="#">500 h - 1000 h</option>
                  <option href="#">1000 h - 2000 h</option>
                  <option href="#">2000 h - 3000 h</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Sort by:</option>
                  <option href="#">Premium</option>
                  <option href="#">Popular</option>
                  <option href="#">Price Lowest First</option>
                  <option href="#">Price Highest First</option>
                </select>
              </Col>
              <Col>
                <button className="galleryButton">Search</button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col
                md={7}
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                About 151051 results
              </Col>
              <Col md={2}>
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col md={2}>
                <button className="galleryButton" onClick={toggleImgJet}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/yachts" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={3}>
                <div className=" RealButton ">
                  <input
                    type="text"
                    placeholder="Enter your Location"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Brand</option>
                  <option href="#">Mercedes-Benz</option>
                  <option href="#">Porsche</option>
                  <option href="#">Chevrolet</option>
                  <option href="#">Ford</option>
                  <option href="#">Ferrari</option>
                  <option href="#">Rolls-Royce</option>
                  <option href="#">Land Rover</option>
                  <option href="#">Bentley</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Years</option>
                  <option href="#">2015-2022</option>
                  <option href="#">2010-2014</option>
                  <option href="#">2000-2009</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Countries</option>
                  <option href="#">United States</option>
                  <option href="#">Canada</option>
                  <option href="#">Australia</option>
                  <option href="#">United Kingdom</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Auction Type</option>
                  <option href="#">Ongoing</option>
                  <option href="#">Upcoming</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Motor Yacht</option>
                  <option href="#">Cruiser</option>
                  <option href="#">Sport Fisherman</option>
                  <option href="#">Classic</option>
                  <option href="#">Flybridge</option>
                  <option href="#">Cantamaran</option>
                  <option href="#">Yacht</option>
                  <option href="#">Mega Yacht</option>
                  <option href="#">Other</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $100,000</option>
                  <option href="#"> $100,000 - $150,000</option>
                  <option href="#">$ $150,000 - $250,000</option>
                  <option href="#">$250,000 - $300,000</option>
                  <option href="#">$300,000 - $400,000</option>
                  <option href="#">$400,000 - $500,000</option>
                  <option href="#">$500,000 - $1,500,000</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Length</option>
                  <option href="#">0 ft - 30 ft</option>
                  <option href="#">30 ft - 50 ft</option>
                  <option href="#">50 ft - 60 ft</option>
                  <option href="#">65 ft - 100 ft</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Sort by:</option>
                  <option href="#">Premium</option>
                  <option href="#">Popular</option>
                  <option href="#">Price Lowest First</option>
                  <option href="#">Price Highest First</option>
                </select>
              </Col>
              <Col>
                <button className="galleryButton">Search</button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col
                md={7}
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                About 151051 results
              </Col>
              <Col md={2}>
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col md={2}>
                <button className="galleryButton" onClick={toggleImgYacht}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={3}>
                <div className=" RealButton ">
                  <input
                    type="text"
                    placeholder="Enter your Location"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Auction Type</option>
                  <option href="#">Ongoing</option>
                  <option href="#">Upcoming</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Villa</option>
                  <option href="#">Penthouse</option>
                  <option href="#">Apartment</option>
                  <option href="#">House</option>
                  <option href="#">Studio</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Bldg Size</option>
                  <option href="#">5,000 sqft - 2,000,000 sqft</option>
                  <option href="#">2,000,000 sqft - 5,000,000 sqft</option>
                  <option href="#">5,000,000 sqft - 10,000,000 sqft</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>More Filter</option>
                  <option href="#">Profile</option>
                  <option href="#">My Ads</option>
                </select>
              </Col>
              <Col>
                <select className=" RealButton ">
                  <option>Sort</option>
                  <option href="#">Premium</option>
                  <option href="#">Popular</option>
                  <option href="#">Price Lowest First</option>
                  <option href="#">Price Highest First</option>
                </select>
              </Col>
              <Col>
                <button className="galleryButton">Search</button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col
                md={7}
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                About 151051 results
              </Col>
              <Col md={2}>
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col md={2}>
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {path === "/realEstates" ? (
        <RealEstatePage
          toggleChange={toggleChange}
          toggleImage={toggleImage}
          setImg={setImg}
          toggleSignIn={toggleSignIn}
        />
      ) : path === "/cars" ? (
        <CarPage
          toggleChange={toggleChange}
          toggleImgCar={toggleImgCar}
          setImgCar={setImgCar}
          toggleSignIn={toggleSignIn}
        />
      ) : path === "/jets" ? (
        <JetPage
          toggleChange={toggleChange}
          setShowImgJet={setShowImgJet}
          setImgJet={setImgJet}
          toggleSignIn={toggleSignIn}
        />
      ) : path === "/yachts" ? (
        <YachtPage
          toggleChange={toggleChange}
          setShowImgYacht={setShowImgYacht}
          setImgYacht={setImgYacht}
          toggleSignIn={toggleSignIn}
        />
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
            <CloseButton className="modal-close" onClick={toggleMap} />
          </div>
          <GoogleMap mapContainerStyle={mapStyles} zoom={18} center={location}>
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
          <Modal.Body>
            <div>
              <CloseButton className="modal-close" onClick={toggleImgCar} />
            </div>
            <Row>
              {imgCar.map((imgCars, index) => (
                <Col
                  md={imgCar.length <= 1 ? "fit-content" : 6}
                  key={index}
                  className="p-2"
                >
                  <Image
                    src={imgCars}
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
          <Modal.Body>
            <div>
              <CloseButton className="modal-close" onClick={toggleImgJet} />
            </div>
            <Row>
              {imgJet.map((imgJets, index) => (
                <Col
                  md={imgJet.length <= 1 ? "fit-content" : 6}
                  key={index}
                  className="p-2"
                >
                  <Image
                    src={imgJets}
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
          <Modal.Body>
            <div>
              <CloseButton className="modal-close" onClick={toggleImgYacht} />
            </div>
            <Row>
              {imgYacht.map((imgYacht, index) => (
                <Col
                  md={img.length <= 1 ? "fit-content" : 6}
                  key={index}
                  className="p-2"
                >
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
      ) : (
        <Modal
          backdrop="static"
          keyboard={true}
          size="xl"
          show={showImg}
          onHide={toggleImage}
          centered
        >
          <Modal.Body>
            <div>
              <CloseButton className="modal-close" onClick={toggleImage} />
            </div>
            <Row>
              {img.map((imgs, index) => (
                <Col
                  md={img.length <= 1 ? "fit-content" : 6}
                  key={index}
                  className="p-2"
                >
                  <Image
                    src={imgs}
                    alt="gallery"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Col>
              ))}
            </Row>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default PropertyPages;
