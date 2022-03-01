import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Dash() {
  return (
    <div className="DashContainer">
      <div className="DashBody">
        <Row sm={4}>
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
          <Col>
            <div className="liveAuc">
              <div className="names">
                <span>Your Wishlist</span>
                <h3>3,672</h3>
              </div>
              <div className="progress">
                <CircularProgressbar value={60} strokeWidth={20} stroke="red" />
              </div>
            </div>
          </Col>
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
              <Button className="filterBtn">
                <span>Filter</span>
              </Button>
              <Button className="resetBtn">
                <span>Refresh</span>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Dash;
