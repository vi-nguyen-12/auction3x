import React, { useEffect, useState } from "react";
import AgreementForm from "./AgreementForm";
import SellWelcome from "./SellWelcome";
import UploadForm from "./UploadForm";
import "../../styles/sell-register.css";
import PropertyDetails from "./PropertyDetails";

import Ownership from "./Ownership";
import authService from "../../services/authServices";
import { useParams, useHistory } from "react-router-dom";
import { Container, Modal, Button } from "react-bootstrap";
import DocumentsUpload from "./DocumentsUpload";
import RealEstateForm from "../RealEstate/RealEstateForm";

const MultiSellForm = ({
  toggleShow,
  colorChange,
  bodyColorChange,
  setHeaderWidth,
  setPositionLeft,
  setPadRight,
  windowSize,
  toggleSignIn,
}) => {
  const [step, setStep] = useState(0);
  const toggleStep = (step) => {
    setStep(step);
  };

  const params = useParams();
  const history = useHistory();

  const [summary, setSummary] = useState();
  const [invest, setInvest] = useState();
  const [locationInfo, setLocationInfo] = useState();
  const [marketInfo, setMarketInfo] = useState();

  const [openSummary, setOpenSummary] = useState(false);
  const [openInvest, setOpenInvest] = useState(false);
  const [openLocationInfo, setOpenLocationInfo] = useState(false);
  const [openMarketInfo, setOpenMarketInfo] = useState(false);

  const [propertyTest, setPropertyTest] = useState({});
  const [property, setProperty] = useState({});
  const [propertyData, setPropertyData] = useState({});
  const togglePropertyData = (propertyData) => {
    setPropertyData(propertyData);
  };
  const properties = (property) => {
    setProperty(property);
  };

  const [documents, setDocuments] = useState([]);
  const toggleDocuments = (documents) => {
    setDocuments(documents);
  };

  const [images, setImages] = useState([]);
  const toggleImages = (images) => {
    setImages(images);
  };

  const [videos, setVideos] = useState([]);
  const toggleVideos = (videos) => {
    setVideos(videos);
  };

  const [propertyType, setPropertyType] = useState();
  const togglePropertyType = (prop) => {
    setPropertyType(prop);
  };

  const [ownership, setOwnership] = useState();
  const getOwnerShip = (ownership) => {
    setOwnership(ownership);
  };

  const [propId, setPropId] = useState();
  const getPropId = (propId) => {
    setPropId(propId);
  };

  const [sellStep, setSellStep] = useState(0);
  const toggleSellStep = (sellStep) => setSellStep(sellStep);
  useEffect(() => {
    setHeaderWidth("100vw");
    setPositionLeft("20%");
    setPadRight("3rem");
    colorChange("black");
    bodyColorChange("#ffefe3");
    toggleShow();
    if (params.id) {
      authService
        .getProperty(params.id)
        .then((response) => {
          setPropertyTest(response.data);
          setStep(response.data.step);
        })
        .catch((error) => {
          if (error.message === "jwt expired") {
            history.push("/");
          }
        });
    }
  }, []);

  useEffect(() => {
    if (propertyTest && params.id) {
      setSummary(propertyTest.details?.description?.summary || "");
      setLocationInfo(propertyTest.details?.description?.location || "");
      setInvest(propertyTest.details?.description?.investment || "");
      setMarketInfo(propertyTest.details?.description?.market || "");
    }
  }, [setPropertyTest]);

  return (
    <>
      <Container className="vh-100">
        <h1 className="fs-1">Sell On Auction3</h1>
        {step === 0 ? (
          <SellWelcome
            togglePropertyType={togglePropertyType}
            toggleStep={toggleStep}
            windowSize={windowSize}
            step={step}
            setStep={setStep}
            propertyTest={propertyTest}
            setPropertyTest={setPropertyTest}
            toggleSignIn={toggleSignIn}
          />
        ) : step === 1 ? (
          <Ownership
            toggleStep={toggleStep}
            step={step}
            setStep={setStep}
            getOwnerShip={getOwnerShip}
            propertyType={propertyType}
            getPropId={getPropId}
            toggleSellStep={toggleSellStep}
            ownership={ownership}
            propId={propId}
            propertyTest={propertyTest}
            setPropertyTest={setPropertyTest}
            toggleSignIn={toggleSignIn}
          />
        ) : step === 2 ? (
          propertyTest.type === "real-estate" ? (
            <RealEstateForm
              properties={properties}
              toggleStep={(data) => toggleStep(data)}
              step={step}
              setStep={setStep}
              propertyType={propertyType}
              property={property}
              windowSize={windowSize}
              propertyTest={propertyTest}
              setPropertyTest={setPropertyTest}
              toggleSignIn={toggleSignIn}
              setOpenSummary={setOpenSummary}
              setOpenInvest={setOpenInvest}
              setOpenLocationInfo={setOpenLocationInfo}
              setOpenMarketInfo={setOpenMarketInfo}
              summary={summary}
              invest={invest}
              locationInfo={locationInfo}
              marketInfo={marketInfo}
            />
          ) : (
            <PropertyDetails
              togglePropertyData={togglePropertyData}
              property={property}
              toggleStep={(data) => toggleStep(data)}
              step={step}
              setStep={setStep}
              propertyType={propertyType}
              propId={propId}
              ownership={ownership}
              getPropId={getPropId}
              toggleSellStep={toggleSellStep}
              propertyData={propertyData}
              propertyTest={propertyTest}
              setPropertyTest={setPropertyTest}
              toggleSignIn={toggleSignIn}
              setOpenSummary={setOpenSummary}
              setOpenInvest={setOpenInvest}
              setOpenLocationInfo={setOpenLocationInfo}
              setOpenMarketInfo={setOpenMarketInfo}
              summary={summary}
              invest={invest}
              locationInfo={locationInfo}
              marketInfo={marketInfo}
            />
          )
        ) : step === 3 ? (
          <UploadForm
            toggleImages={toggleImages}
            toggleVideos={toggleVideos}
            toggleStep={(data) => toggleStep(data)}
            step={step}
            setStep={setStep}
            toggleSellStep={toggleSellStep}
            sellStep={sellStep}
            propertyData={propertyData}
            propId={propId}
            ownership={ownership}
            getPropId={getPropId}
            propertyType={propertyType}
            image={images}
            video={videos}
            toggleSignIn={toggleSignIn}
            propertyTest={propertyTest}
            setPropertyTest={setPropertyTest}
          />
        ) : step === 4 ? (
          <DocumentsUpload
            toggleStep={(data) => toggleStep(data)}
            step={step}
            setStep={setStep}
            propertyType={propertyType}
            toggleDocuments={toggleDocuments}
            ownership={ownership}
            propId={propId}
            images={images}
            videos={videos}
            propertyData={propertyData}
            toggleSellStep={toggleSellStep}
            sellStep={sellStep}
            getPropId={getPropId}
            document={documents}
            toggleSignIn={toggleSignIn}
            propertyTest={propertyTest}
            setPropertyTest={setPropertyTest}
          />
        ) : step === 5 ? (
          <AgreementForm
            propertyData={propertyData}
            toggleStep={(data) => toggleStep(data)}
            step={step}
            setStep={setStep}
            images={images}
            videos={videos}
            documents={documents}
            ownership={ownership}
            sellStep={sellStep}
            propId={propId}
            propertyType={propertyType}
            toggleSignIn={toggleSignIn}
            propertyTest={propertyTest}
            setPropertyTest={setPropertyTest}
          />
        ) : null}
      </Container>

      {/* summary */}
      <Modal
        show={openSummary}
        onHide={() => setOpenSummary(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>Property Summary</Modal.Header>
        <Modal.Body style={{ height: "40vh" }}>
          <textarea
            onChange={(e) => {
              if (propertyTest.type === "real-estate") {
                setSummary({ realEstate: e.target.value });
              } else if (propertyTest.type === "car") {
                setSummary({ car: e.target.value });
              } else if (propertyTest.type === "jet") {
                setSummary({ jet: e.target.value });
              } else if (propertyTest.type === "yacht") {
                setSummary({ yacht: e.target.value });
              }
            }}
            value={
              params.id
                ? propertyTest.details?.description?.summary
                : propertyTest.type === "real-estate"
                ? summary?.realEstate
                : propertyTest.type === "car"
                ? summary?.car
                : propertyTest.type === "jet"
                ? summary?.jet
                : propertyTest.type === "yacht"
                ? summary?.yacht
                : ""
            }
            placeholder="Please Enter Propety Summary Here"
            className="form-control h-100"
          ></textarea>
        </Modal.Body>
        <div className="d-flex justify-content-end m-2 mb-3 p-2">
          <Button onClick={() => setOpenSummary(false)}>Done</Button>
        </div>
      </Modal>

      {/* Investment */}
      <Modal
        show={openInvest}
        onHide={() => setOpenInvest(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>Investment Opportunity</Modal.Header>
        <Modal.Body style={{ height: "40vh" }}>
          <textarea
            onChange={(e) => {
              if (propertyTest.type === "real-estate") {
                setInvest({ realEstate: e.target.value });
              } else if (propertyTest.type === "car") {
                setInvest({ car: e.target.value });
              } else if (propertyTest.type === "jet") {
                setInvest({ jet: e.target.value });
              } else if (propertyTest.type === "yacht") {
                setInvest({ yacht: e.target.value });
              }
            }}
            value={
              params.id
                ? propertyTest.details?.description?.investment
                : propertyTest.type === "real-estate"
                ? invest?.realEstate
                : propertyTest.type === "car"
                ? invest?.car
                : propertyTest.type === "jet"
                ? invest?.jet
                : propertyTest.type === "yacht"
                ? invest?.yacht
                : ""
            }
            placeholder="Please Enter Investment Opportunity Here"
            className="form-control h-100"
          ></textarea>
        </Modal.Body>
        <div className="d-flex justify-content-end m-2 mb-3 p-2">
          <Button onClick={() => setOpenInvest(false)}>Done</Button>
        </div>
      </Modal>

      {/* Location Info */}
      <Modal
        show={openLocationInfo}
        onHide={() => setOpenLocationInfo(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>Location Information</Modal.Header>
        <Modal.Body style={{ height: "40vh" }}>
          <textarea
            onChange={(e) => {
              if (propertyTest.type === "real-estate") {
                setLocationInfo({ realEstate: e.target.value });
              } else if (propertyTest.type === "car") {
                setLocationInfo({ car: e.target.value });
              } else if (propertyTest.type === "jet") {
                setLocationInfo({ jet: e.target.value });
              } else if (propertyTest.type === "yacht") {
                setLocationInfo({ yacht: e.target.value });
              }
            }}
            value={
              params.id
                ? propertyTest.details?.description?.location
                : propertyTest.type === "real-estate"
                ? locationInfo?.realEstate
                : propertyTest.type === "car"
                ? locationInfo?.car
                : propertyTest.type === "jet"
                ? locationInfo?.jet
                : propertyTest.type === "yacht"
                ? locationInfo?.yacht
                : ""
            }
            placeholder="Please Enter Location Information Here"
            className="form-control h-100"
          ></textarea>
        </Modal.Body>
        <div className="d-flex justify-content-end m-2 mb-3 p-2">
          <Button onClick={() => setOpenLocationInfo(false)}>Done</Button>
        </div>
      </Modal>

      {/* Market Information */}
      <Modal
        show={openMarketInfo}
        onHide={() => setOpenMarketInfo(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>Market Information</Modal.Header>
        <Modal.Body style={{ height: "40vh" }}>
          <textarea
            onChange={(e) => {
              if (propertyTest.type === "real-estate") {
                setMarketInfo({ realEstate: e.target.value });
              } else if (propertyTest.type === "car") {
                setMarketInfo({ car: e.target.value });
              } else if (propertyTest.type === "jet") {
                setMarketInfo({ jet: e.target.value });
              } else if (propertyTest.type === "yacht") {
                setMarketInfo({ yacht: e.target.value });
              }
            }}
            value={
              params.id
                ? propertyTest.details?.description?.market
                : propertyTest.type === "real-estate"
                ? marketInfo?.realEstate
                : propertyTest.type === "car"
                ? marketInfo?.car
                : propertyTest.type === "jet"
                ? marketInfo?.jet
                : propertyTest.type === "yacht"
                ? marketInfo?.yacht
                : ""
            }
            placeholder="Please Enter Market Information Here"
            className="form-control h-100"
          ></textarea>
        </Modal.Body>
        <div className="d-flex justify-content-end m-2 mb-3 p-2">
          <Button onClick={() => setOpenMarketInfo(false)}>Done</Button>
        </div>
      </Modal>
    </>
  );
};

export default MultiSellForm;
