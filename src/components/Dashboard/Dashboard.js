import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import Profile from "./Pages/Profile";
import BidAuctions from "./Pages/Auctions/BidAuctions";
import SavedAuctions from "./Pages/Auctions/SavedAuctions";
import PendingAuctions from "./Pages/Auctions/PendingAuctions";
import WinAuctions from "./Pages/Auctions/WinAuctions";
import LiveListings from "./Pages/Listings/LiveListings";
import PendingListings from "./Pages/Listings/PendingListings";
import SoldListings from "./Pages/Listings/SoldListings";
import Dash from "./Pages/Dash";
import Messaging from "./Pages/Messaging";
import DashHeader from "./DashHeader";
import IncompleteListing from "./Pages/Listings/IncompleteListing";
import { FaBars } from "react-icons/fa";
import { Button, Modal, Row, Col, Table, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import Accordion from "react-bootstrap/Accordion";
import PropertyDetails from "./PropertyDetails";
import authService from "../../services/authServices";
import Loading from "../Loading";

function Dashboard({
  toggleChange,
  toggleShow,
  colorChange,
  bodyColorChange,
  setHeaderWidth,
  setPositionLeft,
  setPadRight,
  windowSize,
  setMessage,
}) {
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const toggleShowModal = () => setShow(!show);
  const [suggest, setSuggest] = useState();

  let keywords = [
    {
      key: ["message", "messaging", "chat", "email"],
      name: "Messaging",
      value: "/Dashboard/Messaging",
    },
    {
      key: ["profile", "account", "settings"],
      name: "Profile",
      value: "/Dashboard/Profile",
    },
    {
      key: [
        "saved",
        "saved auctions",
        "liked",
        "liked auctions",
        "like",
        "like auctions",
      ],
      name: "Save Auctions",
      value: "/Dashboard/Auctions/SavedAuctions",
    },
    {
      key: [
        "buyer",
        "edit buyer",
        "edit",
        "buyer approval",
        "proof of funds",
        "registered auctions",
        "register auction",
        "funds",
        "funds approval",
      ],
      name: "Buyer Approval",
      value: "/Dashboard/Auctions/BuyerApproval",
    },
    {
      key: [
        "bids",
        "bids auctions",
        "bid",
        "bid auctions",
        "my bids",
        "my bids auctions",
      ],
      name: "Bid Auctions",
      value: "/Dashboard/Auctions/BidAuctions",
    },
    {
      key: [
        "win",
        "win auctions",
        "won",
        "won auctions",
        "winning",
        "winning auctions",
      ],
      name: "Win Auctions",
      value: "/Dashboard/Auctions/WinAuctions",
    },
    {
      key: [
        "pending",
        "edit pending auction",
        "edit properties",
        "edit property auction",
        "edit property",
        "pending listings",
        "pending auctions",
        "pending my auctions",
        "pending my listings",
        "my pending auctions",
        "my pending listings",
      ],
      name: "Pending Listings",
      value: "/Dashboard/Listings/PendingApproval",
    },
    {
      key: [
        "live",
        "live listings",
        "live auctions",
        "live my auctions",
        "live my listings",
        "edit live auction",
        "edit live listing",
        "edit ongoing auction",
        "edit ongoing listing",
        "edit upcoming auction",
        "edit upcoming listing",
        "my live auctions",
        "my live listings",
        "my upcoming auctions",
        "my upcoming listings",
        "upcoming auctions",
        "upcoming listings",
        "listed auctions",
        "listed listings",
        "my listed auctions",
        "my listed listings",
      ],
      name: "Auctions Listings",
      value: "/Dashboard/Listings/AuctionListings",
    },
    {
      key: [
        "sold",
        "sold listings",
        "sold auctions",
        "sold my auctions",
        "sold my listings",
        "my sold auctions",
        "my sold listings",
      ],
      name: "Sold Listings",
      value: "/Dashboard/Listings/SoldListings",
    },
    {
      key: [
        "incomplete",
        "incomplete listings",
        "incomplete auctions",
        "incomplete my auctions",
        "incomplete my listings",
        "my incomplete auctions",
        "my incomplete listings",
        "incomplete registration",
        "incomplete seller registration",
        "incomplete selling",
      ],
      name: "Incomplete Process",
      value: "/Dashboard/Listings/IncompleteListing",
    },
  ];

  const [showDocu, setShowDocu] = useState(false);
  const toggleShowDocu = () => setShowDocu(!showDocu);

  const [doc, setDoc] = useState("");
  const [location, setLocation] = useState();
  const loca = useLocation();

  useEffect(() => {
    if (location || loca) {
      setMessage("");
    }
  }, [location, loca]);

  const [searchBy, setSearchBy] = useState("id");
  const [search, setSearch] = useState();

  const [property, setProperty] = useState();
  const [documents, setDocuments] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showProperty, setShowProperty] = useState(false);
  const toggleShowProperty = () => setShowProperty(!showProperty);

  const [refresh, setRefresh] = useState(false);

  const [edit, setEdit] = useState({
    docu: false,
    image: false,
    video: false,
  });

  const onChangeMedia = async (e) => {
    setLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("images", e.target.files[i]);
    }

    await authService.saveImages(formData).then((response) => {
      if (response.data.error) {
        setMessage("");
        setMessage(response.data.error);
      } else {
        setImages([...images, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  const onChangeVideos = async (e) => {
    setLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("videos", e.target.files[i]);
    }

    await authService.saveVideos(formData).then((response) => {
      if (response.data.error) {
        setMessage("");
        setMessage(response.data.error);
      } else {
        setVideos([...videos, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  const onChangeDocu = async (e) => {
    if (doc === "") {
      setMessage("");
      setTimeout(() => {
        setMessage("Please select a document type");
      }, 100);
    } else {
      setLoader(true);
      const formData = new FormData();

      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("documents", e.target.files[i]);
      }

      await authService.saveDocuments(formData).then((response) => {
        if (response.data.error) {
          setMessage("");
          setMessage(response.data.error);
        } else {
          const document = response.data.map((document) => {
            return { ...document, officialName: doc };
          });
          setDocuments([...documents, ...document]);
          setLoader(false);
        }
      });
      e.target.value = null;
    }
  };

  useEffect(() => {
    if (!(search === undefined || search === "")) {
      setSuggest(
        keywords.filter((keyword) => {
          return keyword.key.some((key) => {
            return key.toLowerCase().includes(search.toLowerCase());
          });
        })
      );
    } else {
      setSuggest([]);
    }
  }, [search]);

  const handleDeleteDocu = (id) => {
    setDocuments(documents.filter((docu) => docu._id !== id));
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image._id !== id));
  };

  const handleDeleteVideo = (id) => {
    setVideos(videos.filter((video) => video._id !== id));
  };

  const history = useHistory();
  useEffect(() => {
    setHeaderWidth("100vw");
    setPositionLeft("20%");
    setPadRight("3rem");
    colorChange("black");
    bodyColorChange("#F5F9FF");
    toggleChange();
    toggleShow();
  }, []);

  const path = window.location.pathname;

  const realEstateDocu = [
    {
      value: "title_report",
      label: "Title Report",
    },
    {
      value: "insurance_copy",
      label: "Insurance Copy",
    },
    {
      value: "financial_document",
      label: "Financial Document",
    },
    {
      value: "purchase_agreement",
      label: "Purchase Agreement",
    },
    {
      value: "third-party_report",
      label: "Third-Party Report",
    },
    {
      value: "market_and_valuations",
      label: "Market and Valuations",
    },
    {
      value: "demographics",
      label: "Demographics",
    },
    {
      value: "others",
      label: "Other",
    },
  ];

  const carDocu = [
    {
      value: "ownership_document",
      label: "Ownership Document",
    },
    {
      value: "registration_document",
      label: "Registration Document",
    },
    {
      value: "title_certificate",
      label: "Title Certificate",
    },
    {
      value: "loan_document",
      label: "Loan Document",
    },
    {
      value: "inspection_report",
      label: "Inspection Report",
    },
    {
      value: "engine_details",
      label: "Engine Details",
    },
    {
      value: "insurance_document",
      label: "Insurance Document",
    },
    {
      value: "valuation_report",
      label: "Valuation Report",
    },
    {
      value: "others",
      label: "Other",
    },
  ];

  const jetDocu = [
    {
      value: "ownership_document",
      label: "Ownership Document",
    },
    {
      value: "registration_document",
      label: "Registration Document",
    },
    {
      value: "title_certificate",
      label: "Title Certificate",
    },
    {
      value: "detail_specification",
      label: "Detail Specification",
    },
    {
      value: "insurance_document",
      label: "Insurance Document",
    },
    {
      value: "loan_document",
      label: "Loan Document",
    },
    {
      value: "jet_detail_history",
      label: "Jet Detail History",
    },
    {
      value: "fitness_report",
      label: "Fitness Report",
    },
    {
      value: "electric_work_details",
      label: "Electric Work Details",
    },
    {
      value: "engine_details",
      label: "Engine Details",
    },
    {
      value: "inspection_report",
      label: "Inspection Report",
    },
    {
      value: "valuation_report",
      label: "Valuation Report",
    },
    {
      value: "others",
      label: "Other",
    },
  ];

  const yachtDocu = [
    {
      value: "vessel_registration",
      label: "Vessel Registration",
    },
    {
      value: "vessel_maintenance_report",
      label: "Vessel Maintenance Report",
    },
    {
      value: "vessel_engine_type",
      label: "Vessel Engine Type",
    },
    {
      value: "vessel_performance_report",
      label: "Vessel Performance Report",
    },
    {
      value: "vessel_deck_details",
      label: "Vessel Deck Details",
    },
    {
      value: "vessel_insurance",
      label: "Vessel Insurance",
    },
    {
      value: "vessel_marine_surveyor_report",
      label: "Vessel Marine Surveyor Report",
    },
    {
      value: "vessel_valuation_report",
      label: "Vessel Valuation Report",
    },
    {
      value: "others",
      label: "Other",
    },
  ];

  const onSubmit = async (step) => {
    let submitedData;
    if (step === 3) {
      if (images.length > 0) {
        submitedData = {
          images,
          videos,
          step: 3,
        };
      }
    } else if (step === 4) {
      if (property.type === "real-estate") {
        if (documents.length >= 2) {
          submitedData = {
            documents,
            step: 4,
          };
        } else {
          setMessage("");
          setTimeout(() => {
            setMessage("Title and Purchase Agreement are required");
          }, 100);
        }
      } else if (property.type === "car") {
        if (documents.length >= 3) {
          submitedData = {
            documents,
            step: 4,
          };
        } else {
          setMessage("");
          setTimeout(() => {
            setMessage(
              "Title, Inspection, and Registration documents are required"
            );
          }, 100);
        }
      } else if (property.type === "jet") {
        if (documents.length >= 6) {
          submitedData = {
            documents,
            step: 4,
          };
        } else {
          setMessage("");
          setTimeout(() => {
            setMessage(
              "Title, Fitness report, Engine details, Jet detail history, Registration and Inspection report documents are required"
            );
          }, 100);
        }
      } else if (property.type === "yacht") {
        if (documents.length >= 2) {
          submitedData = {
            documents,
            step: 4,
          };
        } else {
          setMessage("");
          setTimeout(() => {
            setMessage(
              "Vessel Registration and Vessel Maintenance Report are required"
            );
          }, 100);
        }
      }
    }
    if (submitedData) {
      await authService.editProp(submitedData, property._id).then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setMessage("");
          setMessage("Property updated successfully");
          window.location.reload();
        }
      });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {loader ? <Loading /> : null}
      <Router>
        {windowSize > 1300 ? (
          <Sidebar path={path} setLocation={setLocation} />
        ) : (
          <div
            style={{
              position: "absolute",
              top: windowSize > 600 ? "10%" : "13%",
              left: "20px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              borderRadius: "10px",
            }}
          >
            <Button
              onClick={toggleShowModal}
              style={{ background: "transparent", border: "0", color: "black" }}
            >
              <FaBars size={30} />
            </Button>
          </div>
        )}
        <div
          style={{
            display: "-moz-initial",
            margin: "0 auto",
            marginTop: "8rem",
          }}
        >
          <DashHeader
            windowSize={windowSize}
            location={location ? location : loca.pathname}
            setSearch={setSearch}
            setSearchBy={setSearchBy}
            suggest={suggest}
            setSuggest={setSuggest}
          />
          <Switch>
            <Route exact path="/Dashboard">
              <Dash
                windowSize={windowSize}
                loader={loader}
                setMessage={setMessage}
              />
            </Route>
            <Route exact path="/Dashboard/Messaging">
              <Messaging windowSize={windowSize} setMessage={setMessage} />
            </Route>
            <Route exact path="/Dashboard/Auctions/BidAuctions">
              <BidAuctions
                windowSize={windowSize}
                searchBy={searchBy}
                search={search}
                setMessage={setMessage}
              />
            </Route>
            <Route exact path="/Dashboard/Auctions/BuyerApproval">
              <PendingAuctions
                windowSize={windowSize}
                searchBy={searchBy}
                search={search}
                setMessage={setMessage}
              />
            </Route>
            <Route exact path="/Dashboard/Auctions/SavedAuctions">
              <SavedAuctions
                windowSize={windowSize}
                searchBy={searchBy}
                search={search}
                setMessage={setMessage}
              />
            </Route>
            <Route exact path="/Dashboard/Auctions/WinAuctions">
              <WinAuctions
                windowSize={windowSize}
                searchBy={searchBy}
                search={search}
                setMessage={setMessage}
              />
            </Route>
            <Route exact path="/Dashboard/Listings/AuctionListings">
              <LiveListings
                windowSize={windowSize}
                toggleShowDocu={toggleShowDocu}
                toggleShowProperty={toggleShowProperty}
                setProperty={setProperty}
                setDocuments={setDocuments}
                setImages={setImages}
                setVideos={setVideos}
                searchBy={searchBy}
                search={search}
                setMessage={setMessage}
              />
            </Route>
            <Route exact path="/Dashboard/Listings/PendingApproval">
              <PendingListings
                windowSize={windowSize}
                toggleShowDocu={toggleShowDocu}
                toggleShowProperty={toggleShowProperty}
                setProperty={setProperty}
                setDocuments={setDocuments}
                setImages={setImages}
                setVideos={setVideos}
                setRefresh={setRefresh}
                refresh={refresh}
                searchBy={searchBy}
                search={search}
                setMessage={setMessage}
              />
            </Route>
            <Route exact path="/Dashboard/Listings/SoldListings">
              <SoldListings
                windowSize={windowSize}
                searchBy={searchBy}
                search={search}
                setMessage={setMessage}
              />
            </Route>
            <Route exact path="/Dashboard/Listings/IncompleteListing">
              <IncompleteListing
                windowSize={windowSize}
                searchBy={searchBy}
                search={search}
                setMessage={setMessage}
              />
            </Route>
            <Route exact path="/Dashboard/Profile">
              <Profile windowSize={windowSize} setMessage={setMessage} />
            </Route>
          </Switch>
        </div>
      </Router>

      <Modal
        className="headerModal"
        show={show}
        onHide={toggleShowModal}
        fullscreen
      >
        <Modal.Body
          style={{
            padding: "100px 50px",
            fontSize: "2rem",
            backgroundColor: "rgb(90, 90, 90)",
            color: "white",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: windowSize < 600 ? "0" : "25px",
              right: windowSize < 600 ? "0" : "25px",
              zIndex: "999",
            }}
          >
            <CloseButton
              className="modal-close"
              style={{ fontSize: "1.3rem" }}
              onClick={toggleShowModal}
            />
          </div>
          <Row>
            <Col
              onClick={() => {
                history.push("/Dashboard");
                window.location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              Dashboard
            </Col>
          </Row>
          <Row>
            <Col
              onClick={() => {
                history.push("/Dashboard/Messaging");
                window.location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              Messaging
            </Col>
          </Row>
          <Row>
            <Col>
              <Accordion className="dashAccor">
                <Accordion.Item eventKey="0">
                  <Accordion.Header
                    style={{ cursor: "pointer", boxShadow: "none" }}
                  >
                    Auctions
                  </Accordion.Header>
                  <Accordion.Body>
                    <p
                      onClick={() => {
                        history.push("/Dashboard/Auctions/BidAuctions");
                        window.location.reload();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Bid Auctions
                    </p>
                    <p
                      onClick={() => {
                        history.push("/Dashboard/Auctions/BuyerApproval");
                        window.location.reload();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Pending Auctions
                    </p>
                    <p
                      onClick={() => {
                        history.push("/Dashboard/Auctions/SavedAuctions");
                        window.location.reload();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Saved Auctions
                    </p>
                    <p
                      onClick={() => {
                        history.push("/Dashboard/Auctions/WinAuctions");
                        window.location.reload();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Won Auctions
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
          <Row>
            <Col>
              <Accordion className="dashAccor">
                <Accordion.Item eventKey="0">
                  <Accordion.Header style={{ cursor: "pointer" }}>
                    Your Listings
                  </Accordion.Header>
                  <Accordion.Body>
                    <p
                      onClick={() => {
                        history.push("/Dashboard/Listings/PendingApproval");
                        window.location.reload();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Pending Approval
                    </p>
                    <p
                      onClick={() => {
                        history.push("/Dashboard/Listings/AuctionListings");
                        window.location.reload();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Auction Listings
                    </p>
                    <p
                      onClick={() => {
                        history.push("/Dashboard/Listings/SoldListings");
                        window.location.reload();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Sold Listings
                    </p>
                    <p
                      onClick={() => {
                        history.push("/Dashboard/Listings/IncompleteListing");
                        window.location.reload();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Incomplete Listings
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
          <Row>
            <Col
              onClick={() => {
                history.push("/Dashboard/Profile");
                window.location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              Profile
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Modal size="xl" show={showDocu} onHide={toggleShowDocu} centered>
        <Modal.Header className="auction-modal-header">
          <Modal.Title className="auction-modal-title px-3">
            Documents
          </Modal.Title>
        </Modal.Header>
        <div
          style={{
            position: "absolute",
            top: windowSize < 600 ? "0" : "25px",
            right: windowSize < 600 ? "0" : "25px",
            zIndex: "999",
          }}
        >
          <CloseButton
            className="modal-close"
            style={{ backgroundColor: "white" }}
            onClick={() => {
              toggleShowDocu();
              // setEdit({ ...edit.image, image: !edit.image });
              // setEdit({ ...edit.docu, docu: !edit.docu });
              const edits = { image: false, docu: false, video: false };
              setEdit({ ...edit, ...edits });
            }}
          />
        </div>
        <Modal.Body style={{ paddingBottom: "8rem" }}>
          <>
            <Row className="mt-3">
              <Col
                style={{
                  color: "#376ebc",
                  fontSize: "20px",
                  borderBottom: "1px solid black",
                }}
              >
                Property images
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Table
                  borderless
                  striped
                  hover
                  style={{
                    overflow: windowSize < 800 ? "auto" : "hidden",
                    display: windowSize < 800 && "block",
                    tableLayout: windowSize < 800 && "auto",
                    padding: "0",
                  }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Document Name</th>
                      <th>View</th>
                      <th>Document Type</th>
                      <th>Status</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  {images?.length > 0 &&
                    images?.map((document, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{document.name}</td>
                          <td>
                            <div
                              style={{
                                width: "100%",
                                alignItems: "right",
                                cursor: "pointer",
                              }}
                            >
                              <img
                                width="100px"
                                height="50px"
                                src={document.url}
                                onClick={() => window.open(document.url)}
                              />
                            </div>
                          </td>
                          <td>
                            {document.officialName
                              ? document.officialName
                              : "Image/Video"}
                          </td>
                          {document.isVerified === "pending" ? (
                            <td>Pending</td>
                          ) : document.isVerified === "success" ? (
                            <td>Approved</td>
                          ) : document.isVerified === "fail" ? (
                            <td>Rejected</td>
                          ) : null}
                          <td>
                            <Button
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "red",
                                fontSize: "1.3rem",
                                textAlign: "center",
                              }}
                              onClick={() => handleDeleteImage(document._id)}
                              disabled={!edit.image}
                            >
                              X
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </Table>
              </Col>
              <Col md={12} className="d-flex justify-content-end">
                {edit.image ? (
                  <>
                    <input
                      type="file"
                      id="media"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={onChangeMedia}
                    />
                    <label htmlFor="media" className="btn btn-primary mx-3">
                      Upload
                    </label>
                  </>
                ) : null}
                {edit.image ? (
                  <Button
                    className="bg-success border-0 mx-2"
                    onClick={() => onSubmit(3)}
                  >
                    Save
                  </Button>
                ) : null}
                <Button
                  onClick={() => setEdit({ ...edit.image, image: !edit.image })}
                  disabled={
                    property?.auctionDetails?.auctionStartDate ||
                    property?.isApproved === "success"
                  }
                >
                  Edit
                </Button>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col
                style={{
                  color: "#376ebc",
                  fontSize: "20px",
                  borderBottom: "1px solid black",
                }}
              >
                Property Videos
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Table
                  borderless
                  striped
                  hover
                  style={{
                    overflow: windowSize < 800 ? "auto" : "hidden",
                    display: windowSize < 800 && "block",
                    tableLayout: windowSize < 800 && "auto",
                    padding: "0",
                  }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Document Name</th>
                      <th>Document Type</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  {videos?.length > 0 &&
                    videos?.map((document, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{document.name}</td>
                          <td>
                            {document.officialName
                              ? document.officialName
                              : "Image/Video"}
                          </td>
                          {document.isVerified === "pending" ? (
                            <td>Pending</td>
                          ) : document.isVerified === "success" ? (
                            <td>Approved</td>
                          ) : document.isVerified === "fail" ? (
                            <td>Rejected</td>
                          ) : null}
                          <td>
                            <Button
                              onClick={() => {
                                window.open(document.url, "_blank");
                              }}
                            >
                              View
                            </Button>
                          </td>
                          <td>
                            <Button
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "red",
                                fontSize: "1.3rem",
                                textAlign: "center",
                              }}
                              onClick={() => handleDeleteVideo(document._id)}
                              disabled={!edit.video}
                            >
                              X
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </Table>
              </Col>
              <Col md={12} className="d-flex justify-content-end">
                {edit.video ? (
                  <>
                    <input
                      type="file"
                      id="media"
                      accept="video/*"
                      multiple
                      hidden
                      onChange={onChangeVideos}
                    />
                    <label htmlFor="media" className="btn btn-primary mx-3">
                      Upload
                    </label>
                  </>
                ) : null}
                {edit.video ? (
                  <Button
                    className="bg-success border-0 mx-2"
                    onClick={() => onSubmit(3)}
                  >
                    Save
                  </Button>
                ) : null}
                <Button
                  onClick={() => setEdit({ ...edit.video, video: !edit.video })}
                  disabled={
                    property?.auctionDetails?.auctionStartDate ||
                    property?.isApproved === "success"
                  }
                >
                  Edit
                </Button>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col
                style={{
                  color: "#376ebc",
                  fontSize: "20px",
                  borderBottom: "1px solid black",
                }}
              >
                Property Documents
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Table
                  borderless
                  striped
                  hover
                  style={{
                    overflow: windowSize < 800 ? "auto" : "hidden",
                    display: windowSize < 800 && "block",
                    tableLayout: windowSize < 800 && "auto",
                    padding: "0",
                  }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Document Name</th>
                      <th>Document Type</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  {documents?.length > 0 &&
                    documents?.map((document, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{document.name}</td>
                          <td>
                            {document.officialName
                              ? document.officialName
                              : "Image/Video"}
                          </td>
                          {document.isVerified === "pending" ? (
                            <td>Pending</td>
                          ) : document.isVerified === "success" ? (
                            <td>Approved</td>
                          ) : document.isVerified === "fail" ? (
                            <td>Rejected</td>
                          ) : null}
                          <td>
                            <Button
                              onClick={() => {
                                window.open(document.url, "_blank");
                              }}
                            >
                              View
                            </Button>
                          </td>
                          <td>
                            <Button
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "red",
                                fontSize: "1.3rem",
                                textAlign: "center",
                              }}
                              onClick={() => handleDeleteDocu(document._id)}
                              disabled={!edit.docu}
                            >
                              X
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </Table>
              </Col>
              <Col md={12} className="d-flex justify-content-end">
                {edit.docu ? (
                  <Form.Select
                    className="form-control"
                    onChange={(e) => setDoc(e.target.value)}
                    required
                  >
                    <option value="">Select Document Type</option>
                    {property.type === "real-estate"
                      ? realEstateDocu.map((docu, index) => (
                          <option key={index} value={docu.value}>
                            {docu.label}
                          </option>
                        ))
                      : property.type === "car"
                      ? carDocu.map((docu, index) => (
                          <option key={index} value={docu.value}>
                            {docu.label}
                          </option>
                        ))
                      : property.type === "jet"
                      ? jetDocu.map((docu, index) => (
                          <option key={index} value={docu.value}>
                            {docu.label}
                          </option>
                        ))
                      : property.type === "yacht"
                      ? yachtDocu.map((docu, index) => (
                          <option key={index} value={docu.value}>
                            {docu.label}
                          </option>
                        ))
                      : null}
                  </Form.Select>
                ) : null}
                {edit.docu ? (
                  <>
                    <input
                      type="file"
                      id="docu"
                      multiple
                      hidden
                      onChange={onChangeDocu}
                    />
                    <label htmlFor="docu" className="btn btn-primary mx-3">
                      Upload
                    </label>
                  </>
                ) : null}
                {edit.docu ? (
                  <Button
                    className="bg-success border-0 mx-2"
                    onClick={() => onSubmit(4)}
                  >
                    Save
                  </Button>
                ) : null}
                <Button
                  onClick={() => setEdit({ ...edit.docu, docu: !edit.docu })}
                  disabled={
                    property?.auctionDetails?.auctionStartDate ||
                    property?.isApproved === "success"
                  }
                >
                  Edit
                </Button>
              </Col>
            </Row>
          </>
        </Modal.Body>
      </Modal>

      <Modal size="xl" show={showProperty} onHide={toggleShowProperty} centered>
        <Modal.Header className="auction-modal-header">
          <Modal.Title
            className="auction-modal-title px-3"
            style={{ fontSize: windowSize < 800 && "1.5rem" }}
          >
            Property Details
          </Modal.Title>
        </Modal.Header>
        <div
          style={{
            position: "absolute",
            top: windowSize < 600 ? "0" : "25px",
            right: windowSize < 600 ? "0" : "25px",
            zIndex: "999",
          }}
        >
          <CloseButton
            className="modal-close"
            style={{ backgroundColor: "white" }}
            onClick={() => {
              toggleShowProperty();
            }}
          />
        </div>
        <Modal.Body>
          <PropertyDetails
            property={property}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dashboard;
