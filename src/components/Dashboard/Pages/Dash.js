import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import { RiFilter2Fill } from "react-icons/ri";
import {MdOutlineRefresh} from 'react-icons/md'
import "react-circular-progressbar/dist/styles.css";

function Dash() {
  return (
    // <div className="DashContainer">
    //   <div className="DashBody">
    <Container className="container2">
      <Row lg={3}>
        <Col>
          <div className="liveAuc">
            <div className="names">
              <span>Live Auctions</span>
              <h3>684</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={70} strokeWidth={20} stroke="red" />
            </div>
          </div>
        </Col>
        <Col>
          <div className="liveAuc">
            <div className="names">
              <span>Upcoming Auctions</span>
              <h3>546</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={20} strokeWidth={20} stroke="red" />
            </div>
          </div>
        </Col>
        {/* <Col>
          <div className="liveAuc">
            <div className="names">
              <span>Your Wishlist</span>
              <h3>3,672</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={60} strokeWidth={20} stroke="red" />
            </div>
          </div>
        </Col> */}
        <Col>
          <div className="liveAuc">
            <div className="names">
              <span>Your Purchased</span>
              <h3>75</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={35} strokeWidth={20} stroke="red" />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="tab">
            <Button className="tabs">
              <span>Saved Auction</span>
            </Button>
            <Button className="tabs">
              <span>Bid Auction</span>
            </Button>
            <Button className="tabs">
              <span>Approved</span>
            </Button>
          </div>
        </Col>

        <Col>
          <div className="filter">
            <div className="filterIcon">
              <RiFilter2Fill color="white" size={25} />
              <button className="filterBtn">
                <span>Filter</span>
              </button>
            </div>
            <div className="refresh">
              <MdOutlineRefresh color="white" size={28} />
              <button className="resetBtn">
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dash;
