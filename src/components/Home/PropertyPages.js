import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Row, Col, Modal, Image } from "react-bootstrap";
import "../../styles/realEstate.css";
import RealEstatePage from "../RealEstate/RealEstatePage";
import CarPage from "../Cars/CarPage";
import JetPage from "../Jets/JetPage";
import YachtPage from "../Yachts/YachtPage";
import Auctions from "./Auctions";
import CloseButton from "react-bootstrap/CloseButton";
import { GoogleMap, Marker } from "@react-google-maps/api";
import PropertyPageHeader from "./PropertyPageHeader";

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
  windowSize,
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
  const [filter, setFilter] = useState();
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
          <p>CAR</p>
        ) : path === "/jets" ? (
          <p>JET</p>
        ) : path === "/yachts" ? (
          <p>YACHT</p>
        ) : path === "/Auctions" ? (
          <p>Auctions</p>
        ) : path === "/Auctions/Austin" ? (
          <p>Auctions</p>
        ) : path === "/Auctions/Dallas" ? (
          <p>Auctions</p>
        ) : path === "/Auctions/Houston" ? (
          <p>Auctions</p>
        ) : path === "/Auctions/SanAntonio" ? (
          <p>Auctions</p>
        ) : (
          <p>REAL ESTATE</p>
        )}
      </h5>
      <PropertyPageHeader
        path={path}
        windowSize={windowSize}
        setFilter={setFilter}
        toggleImage={toggleImage}
        toggleImgCar={toggleImgCar}
        toggleImgJet={toggleImgJet}
        toggleImgYacht={toggleImgYacht}
        toggleMap={toggleMap}
      />
      {path === "/realEstates" ? (
        <RealEstatePage
          toggleChange={toggleChange}
          toggleImage={toggleImage}
          setImg={setImg}
          toggleSignIn={toggleSignIn}
          windowSize={windowSize}
          filter={filter}
        />
      ) : path === "/cars" ? (
        <CarPage
          toggleChange={toggleChange}
          toggleImgCar={toggleImgCar}
          setImgCar={setImgCar}
          toggleSignIn={toggleSignIn}
          windowSize={windowSize}
          filter={filter}
        />
      ) : path === "/jets" ? (
        <JetPage
          toggleChange={toggleChange}
          setShowImgJet={setShowImgJet}
          setImgJet={setImgJet}
          toggleSignIn={toggleSignIn}
          windowSize={windowSize}
          filter={filter}
        />
      ) : path === "/yachts" ? (
        <YachtPage
          toggleChange={toggleChange}
          setShowImgYacht={setShowImgYacht}
          setImgYacht={setImgYacht}
          toggleSignIn={toggleSignIn}
          windowSize={windowSize}
          filter={filter}
        />
      ) : path === "/Auctions" || "/Auctions/:Country" ? (
        <Auctions
          toggleChange={toggleChange}
          toggleSignIn={toggleSignIn}
          windowSize={windowSize}
          filter={filter}
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
          <div
            style={{
              position: "absolute",
              top: "25px",
              right: "25px",
              zIndex: "999",
            }}
          >
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
            <div
              style={{
                position: "absolute",
                top: "25px",
                right: "25px",
                zIndex: "999",
              }}
            >
              <CloseButton className="modal-close" onClick={toggleImgCar} />
            </div>
            {imgCar.length > 0 ? (
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
            ) : (
              <Row style={{ height: "50vh" }}>
                <Col className="d-flex justify-content-center align-items-center">
                  <h1>No Images!</h1>
                </Col>
              </Row>
            )}
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
            <div
              style={{
                position: "absolute",
                top: "25px",
                right: "25px",
                zIndex: "999",
              }}
            >
              <CloseButton className="modal-close" onClick={toggleImgJet} />
            </div>
            {imgJet.length > 0 ? (
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
            ) : (
              <Row style={{ height: "50vh" }}>
                <Col className="d-flex justify-content-center align-items-center">
                  <h1>No Images!</h1>
                </Col>
              </Row>
            )}
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
            <div
              style={{
                position: "absolute",
                top: "25px",
                right: "25px",
                zIndex: "999",
              }}
            >
              <CloseButton className="modal-close" onClick={toggleImgYacht} />
            </div>
            {imgYacht.length > 0 ? (
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
            ) : (
              <Row style={{ height: "50vh" }}>
                <Col className="d-flex justify-content-center align-items-center">
                  <h1>No Images!</h1>
                </Col>
              </Row>
            )}
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
            <div
              style={{
                position: "absolute",
                top: "25px",
                right: "25px",
                zIndex: "999",
              }}
            >
              <CloseButton className="modal-close" onClick={toggleImage} />
            </div>
            {img.length > 0 ? (
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
            ) : (
              <Row style={{ height: "50vh" }}>
                <Col className="d-flex justify-content-center align-items-center">
                  <h1>No Images!</h1>
                </Col>
              </Row>
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default PropertyPages;
