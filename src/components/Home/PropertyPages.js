import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";
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
import RealEstatePageBg from "../../images/RealEstatePageBg.png";
import CarPageBg from "../../images/CarPageBg.png";
import JetPageBg from "../../images/JetPageBg.png";
import YachtPageBg from "../../images/YachtPageBg.png";
import allProperty from "../../images/allProperty.png";
// import Auction from "../../../../auction10x-backend/model/Auction";

const mapStyles = {
  height: "60vh",
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
  const [centers, setCenters] = useState([]);
  const [location, setLocation] = useState([]);
  const [showImg, setShowImg] = useState(false);
  const [showImgCar, setShowImgCar] = useState(false);
  const [showImgJet, setShowImgJet] = useState(false);
  const [showImgYacht, setShowImgYacht] = useState(false);
  const [filter, setFilter] = useState();
  const [resultLength, setResultLength] = useState({});
  const [img, setImg] = useState([]);
  const [imgCar, setImgCar] = useState([]);
  const [imgJet, setImgJet] = useState([]);
  const [imgYacht, setImgYacht] = useState([]);
  const toggleMap = () => setShowMap(!showMap);
  const toggleImage = () => setShowImg(!showImg);
  const toggleImgCar = () => setShowImgCar(!showImgCar);
  const toggleImgJet = () => setShowImgJet(!showImgJet);
  const toggleImgYacht = () => setShowImgYacht(!showImgYacht);
  const history = useHistory();

  const onMarkerClick = (id) => (e) => {
    history.push(`/DisplayAuctions/${id}`);
  };

  return (
    <>
      {path === "/cars" ? (
        <Row className="realHeader" style={{ background: `url(${CarPageBg})` }}>
          <title>CAR</title>
        </Row>
      ) : path === "/jets" ? (
        <Row className="realHeader" style={{ background: `url(${JetPageBg})` }}>
          <title>JET</title>
        </Row>
      ) : path === "/yachts" ? (
        <Row
          className="realHeader"
          style={{ background: `url(${YachtPageBg})` }}
        >
          <title>YACHT</title>
        </Row>
      ) : path === "/Auctions" ? (
        <Row
          className="realHeader"
          style={{ background: `url(${allProperty})` }}
        >
          <title>Auctions</title>
        </Row>
      ) : path === "/Auctions/Featured" ? (
        <Row
          className="realHeader"
          style={{ background: `url(${allProperty})` }}
        >
          <title>Auctions</title>
        </Row>
      ) : path === "/Auctions/Upcoming" ? (
        <Row
          className="realHeader"
          style={{ background: `url(${allProperty})` }}
        >
          <title>Auctions</title>
        </Row>
      ) : (
        <Row
          className="realHeader"
          style={{ background: `url(${RealEstatePageBg})` }}
        >
          <title>REAL ESTATE</title>
        </Row>
      )}

      <PropertyPageHeader
        path={path}
        windowSize={windowSize}
        setFilter={setFilter}
        toggleImage={toggleImage}
        toggleImgCar={toggleImgCar}
        toggleImgJet={toggleImgJet}
        toggleImgYacht={toggleImgYacht}
        setLocation={setLocation}
        toggleMap={toggleMap}
        resultLength={resultLength}
      />

      {path === "/realEstates" ? (
        <RealEstatePage
          setCenters={setCenters}
          toggleChange={toggleChange}
          toggleImage={toggleImage}
          setImg={setImg}
          toggleSignIn={toggleSignIn}
          windowSize={windowSize}
          filter={filter}
          setResultLength={setResultLength}
        />
      ) : path === "/cars" ? (
        <CarPage
          setCenters={setCenters}
          toggleChange={toggleChange}
          toggleImgCar={toggleImgCar}
          setImgCar={setImgCar}
          toggleSignIn={toggleSignIn}
          windowSize={windowSize}
          filter={filter}
          setResultLength={setResultLength}
        />
      ) : path === "/jets" ? (
        <JetPage
          setCenters={setCenters}
          toggleChange={toggleChange}
          setShowImgJet={setShowImgJet}
          setImgJet={setImgJet}
          toggleSignIn={toggleSignIn}
          windowSize={windowSize}
          filter={filter}
          setResultLength={setResultLength}
        />
      ) : path === "/yachts" ? (
        <YachtPage
          setCenters={setCenters}
          toggleChange={toggleChange}
          setShowImgYacht={setShowImgYacht}
          setImgYacht={setImgYacht}
          toggleSignIn={toggleSignIn}
          windowSize={windowSize}
          filter={filter}
          setResultLength={setResultLength}
        />
      ) : path === "/Auctions" || "/Auctions/:parameter" ? (
        <Auctions
          toggleChange={toggleChange}
          toggleSignIn={toggleSignIn}
          windowSize={windowSize}
          setCenters={setCenters}
          filter={filter}
          setResultLength={setResultLength}
          setImg={setImg}
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
        <Modal.Body>
          <div
            style={{
              position: "absolute",
              top: windowSize < 600 ? "0" : "10px",
              right: windowSize < 600 ? "0" : "10px",
              marginTop: windowSize < 600 && "-15px",
              marginRight: windowSize < 600 && "-15px",
              zIndex: "999",
            }}
          >
            <CloseButton className="modal-close" onClick={toggleMap} />
          </div>
          {centers.length > 0 ? (
            <>
              <GoogleMap
                mapContainerStyle={mapStyles}
                style={{ height: "800px" }}
                center={centers[0]}
                zoom={4}
              >
                {centers.map((marker, index) => {
                  return (
                    <Marker
                      key={index}
                      position={{ lat: marker.lat, lng: marker.lng }}
                      onClick={onMarkerClick(marker.id)}
                    />
                  );
                })}
              </GoogleMap>
              {/* {centers.map((marker, index) => {
            return (
              <span>
                <h2>{marker.address}</h2>
              </span>
            )
          })} */}
            </>
          ) : (
            <Row style={{ height: "50vh" }}>
              <Col className="d-flex justify-content-center align-items-center">
                <h1>No Auctions!</h1>
              </Col>
            </Row>
          )}
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
                top: windowSize < 600 ? "0" : "25px",
                right: windowSize < 600 ? "0" : "25px",
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
                      src={imgCars.url}
                      alt="gallery"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        history.push(`/DisplayAuctions/${imgCars.id}`)
                      }
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
                top: windowSize < 600 ? "0" : "25px",
                right: windowSize < 600 ? "0" : "25px",
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
                      src={imgJets.url}
                      alt="gallery"
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        objectFit: "cover",
                      }}
                      onClick={() =>
                        history.push(`/DisplayAuctions/${imgJets.id}`)
                      }
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
                top: windowSize < 600 ? "0" : "25px",
                right: windowSize < 600 ? "0" : "25px",
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
                      src={imgYacht.url}
                      alt="gallery"
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        objectFit: "cover",
                      }}
                      onClick={() =>
                        history.push(`/DisplayAuctions/${imgYacht.id}`)
                      }
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
                top: windowSize < 600 ? "0" : "25px",
                right: windowSize < 600 ? "0" : "25px",
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
                      src={imgs.url}
                      alt="gallery"
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        objectFit: "cover",
                      }}
                      onClick={() =>
                        history.push(`/DisplayAuctions/${imgs.id}`)
                      }
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
