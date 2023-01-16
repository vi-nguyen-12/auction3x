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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "color",
  "background",
];

const MultiSellForm = ({
  toggleShow,
  colorChange,
  bodyColorChange,
  setHeaderWidth,
  setPositionLeft,
  setPadRight,
  windowSize,
  toggleSignIn,
  setMessage,
  toggleDocu,
  setDocuUrl,
}) => {
  const [step, setStep] = useState(0);
  const toggleStep = (step) => {
    setStep(step);
  };

  const params = useParams();
  const history = useHistory();

  const [propertyTest, setPropertyTest] = useState({});

  const [summary, setSummary] = useState(
    params.id ? propertyTest.details?.description?.summary : ""
  );
  const [invest, setInvest] = useState(
    params.id ? propertyTest.details?.description?.investment : ""
  );
  const [locationInfo, setLocationInfo] = useState(
    params.id ? propertyTest.details?.description?.location : ""
  );
  const [marketInfo, setMarketInfo] = useState(
    params.id ? propertyTest.details?.description?.market : ""
  );

  const [openSummary, setOpenSummary] = useState(false);
  const [openInvest, setOpenInvest] = useState(false);
  const [openLocationInfo, setOpenLocationInfo] = useState(false);
  const [openMarketInfo, setOpenMarketInfo] = useState(false);

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
    colorChange("black");
    bodyColorChange("#ffefe3");
    toggleShow();
    if (params.id) {
      authService
        .getProperty(params.id)
        .then((response) => {
          setPropertyTest(response.data);
          setSummary(response.data.details?.description?.summary);
          setLocationInfo(response.data.details?.description?.location);
          setInvest(response.data.details?.description?.investment);
          setMarketInfo(response.data.details?.description?.market);
          setStep(response.data.step);
        })
        .catch((error) => {
          if (error.message === "jwt expired") {
            history.push("/");
          }
        });
    }

    return () => {
      toggleShow();
      colorChange("");
      bodyColorChange("");
    };
  }, []);

  return (
    <>
      <div
        className="vh-100 sell-container"
        style={{ padding: windowSize < 1400 && "0" }}
      >
        <h1 className="fw-bold text-black">Sell On Auction Tree</h1>
        <p
          style={{ fontSize: "1.2em", fontWeight: "bold" }}
          className="d-flex justify-content-center"
        >
          {propertyTest?.type === "real-estate"
            ? "Real Estate"
            : propertyTest?.type === "car"
            ? "Car"
            : propertyTest?.type === "jet"
            ? "Jet"
            : propertyTest?.type === "yacht"
            ? "Yacht"
            : ""}
        </p>
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
            setMessage={setMessage}
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
            setMessage={setMessage}
            windowSize={windowSize}
          />
        ) : step === 2 ? (
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
            setMessage={setMessage}
          />
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
            setMessage={setMessage}
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
            setMessage={setMessage}
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
            windowSize={windowSize}
            sellStep={sellStep}
            propId={propId}
            propertyType={propertyType}
            toggleSignIn={toggleSignIn}
            propertyTest={propertyTest}
            setPropertyTest={setPropertyTest}
            setMessage={setMessage}
            toggleDocu={toggleDocu}
            setDocuUrl={setDocuUrl}
          />
        ) : null}
      </div>

      {/* summary */}
      <Modal
        show={openSummary}
        onHide={() => setOpenSummary(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="auction-modal-header p-4" closeButton>
          <Modal.Title className="auction-modal-title">
            Property Summary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto" }}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={summary}
            onChange={(e) => setSummary(e)}
          ></ReactQuill>
          {/* <textarea
            onChange={(e) => setSummary(e.target.value)}
            value={summary}
            placeholder="Please Enter Property Summary Here"
            className="form-control h-100"
          ></textarea> */}
        </Modal.Body>
        <div className="d-flex justify-content-end m-2 mb-3 p-2">
          <Button onClick={() => setOpenSummary(false)} className="rounded-0">
            Done
          </Button>
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
        <Modal.Header className="auction-modal-header p-4" closeButton>
          <Modal.Title className="auction-modal-title">
            Investment Opportunity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto" }}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={invest}
            onChange={(e) => setInvest(e)}
          ></ReactQuill>
          {/* <textarea
            onChange={(e) => setInvest(e.target.value)}
            defaultValue={invest}
            placeholder="Please Enter Investment Opportunity Here"
            className="form-control h-100"
          ></textarea> */}
        </Modal.Body>
        <div className="d-flex justify-content-end m-2 mb-3 p-2">
          <Button onClick={() => setOpenInvest(false)} className="rounded-0">
            Done
          </Button>
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
        <Modal.Header className="auction-modal-header p-4" closeButton>
          <Modal.Title className="auction-modal-title">
            Location Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto" }}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={locationInfo}
            onChange={(e) => setLocationInfo(e)}
          ></ReactQuill>
          {/* <textarea
            onChange={(e) => setLocationInfo(e.target.value)}
            value={locationInfo}
            placeholder="Please Enter Location Information Here"
            className="form-control h-100"
          ></textarea> */}
        </Modal.Body>
        <div className="d-flex justify-content-end m-2 mb-3 p-2">
          <Button
            onClick={() => setOpenLocationInfo(false)}
            className="rounded-0"
          >
            Done
          </Button>
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
        <Modal.Header className="auction-modal-header p-4" closeButton>
          <Modal.Title className="auction-modal-title">
            Market Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto" }}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={marketInfo}
            onChange={(e) => setMarketInfo(e)}
          ></ReactQuill>
          {/* <textarea
            onChange={(e) => setMarketInfo(e.target.value)}
            value={marketInfo}
            placeholder="Please Enter Market Information Here"
            className="form-control h-100"
          ></textarea> */}
        </Modal.Body>
        <div className="d-flex justify-content-end m-2 mb-3 p-2">
          <Button
            onClick={() => setOpenMarketInfo(false)}
            className="rounded-0"
          >
            Done
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default MultiSellForm;
