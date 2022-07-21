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
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import Accordion from "react-bootstrap/Accordion";

function Dashboard({
  toggleChange,
  toggleShow,
  colorChange,
  bodyColorChange,
  setHeaderWidth,
  setPositionLeft,
  setPadRight,
  windowSize,
}) {
  const [show, setShow] = useState(false);
  const toggleShowModal = () => setShow(!show);
  const history = useHistory();
  useEffect(() => {
    setHeaderWidth("100vw");
    setPositionLeft("20%");
    setPadRight("3rem");
    colorChange("black");
    bodyColorChange("#ffefe3");
    toggleChange();
    toggleShow();
  }, []);
  const location = useLocation();
  const path = window.location.pathname;
  return (
    <div style={{ display: "flex" }}>
      <Router>
        {windowSize > 1300 ? (
          <Sidebar path={path} />
        ) : (
          <div
            style={{
              position: "absolute",
              top: "80px",
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
            marginTop: "105px",
          }}
        >
          <DashHeader
            location={location.pathname.split("/")[1]}
            windowSize={windowSize}
          />
          <Switch>
            <Route exact path="/Dashboard">
              <Dash windowSize={windowSize} />
            </Route>
            <Route exact path="/Dashboard/Messaging">
              <Messaging windowSize={windowSize} />
            </Route>
            <Route exact path="/Dashboard/Auctions/BidAuctions">
              <BidAuctions windowSize={windowSize} />
            </Route>
            <Route exact path="/Dashboard/Auctions/BuyerApproval">
              <PendingAuctions windowSize={windowSize} />
            </Route>
            <Route exact path="/Dashboard/Auctions/SavedAuctions">
              <SavedAuctions windowSize={windowSize} />
            </Route>
            <Route exact path="/Dashboard/Auctions/WinAuctions">
              <WinAuctions windowSize={windowSize} />'
            </Route>
            <Route exact path="/Dashboard/Listings/AuctionListings">
              <LiveListings windowSize={windowSize} />
            </Route>
            <Route exact path="/Dashboard/Listings/PendingApproval">
              <PendingListings windowSize={windowSize} />
            </Route>
            <Route exact path="/Dashboard/Listings/SoldListings">
              <SoldListings windowSize={windowSize} />
            </Route>
            <Route exact path="/Dashboard/Listings/IncompleteListing">
              <IncompleteListing windowSize={windowSize} />
            </Route>
            <Route exact path="/Dashboard/Profile">
              <Profile windowSize={windowSize} />
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
    </div>
  );
}

export default Dashboard;
