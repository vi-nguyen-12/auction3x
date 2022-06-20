import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

function PropertyPageHeader({
  path,
  windowSize,
  setFilter,
  toggleImage,
  toggleImgCar,
  toggleImgJet,
  toggleImgYacht,
  toggleMap,
}) {
  return (
    <>
      {path === "/cars" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col>
                <div className=" RealButton ">
                  <input
                    type="text"
                    placeholder="Enter your Location"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Brand</option>
                  <option href="#">Mercedes-Benz</option>
                  <option href="#">Porsche</option>
                  <option href="#">Chevrolet</option>
                  <option href="#">Ford</option>
                  <option href="#">Ferrari</option>
                  <option href="#">Rolls-Royce</option>
                  <option href="#">Land Rover</option>
                  <option href="#">Bentley</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Years</option>
                  <option href="#">2015-2022</option>
                  <option href="#">2010-2014</option>
                  <option href="#">2000-2009</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Countries</option>
                  <option href="#">United States</option>
                  <option href="#">Canada</option>
                  <option href="#">Australia</option>
                  <option href="#">United Kingdom</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Cabriolet</option>
                  <option href="#">SUV</option>
                  <option href="#">Coupe</option>
                  <option href="#">Other</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $10,000</option>
                  <option href="#">$10,000 - $21,000</option>
                  <option href="#">$21,000 - $31,000</option>
                  <option href="#">$31,000 - $51,000</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Mileage</option>
                  <option href="#">0 mi - 1000 mi</option>
                  <option href="#">10000 mi - 20000 mi</option>
                  <option href="#">20000 mi - 40000 mi</option>
                  <option href="#">40000 mi - 60000 mi</option>
                </Form.Select>
              </Col>
              <Col>
                <button className="galleryButton">Search</button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col className="resultText">
                <p className="filterText">About 151051 results</p>
              </Col>
              <Col>
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col>
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
              <Col>
                <div className=" RealButton ">
                  <input
                    type="text"
                    placeholder="Enter your Location"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Brand</option>
                  <option href="#">Bombardier</option>
                  <option href="#">Cessna</option>
                  <option href="#">Gulfstream</option>
                  <option href="#">Dassault</option>
                  <option href="#">Embraer</option>
                  <option href="#">Beechcraft</option>
                  <option href="#">Pilatus</option>
                  <option href="#">Piper</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Years</option>
                  <option href="#">2015-2022</option>
                  <option href="#">2010-2014</option>
                  <option href="#">2000-2009</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Countries</option>
                  <option href="#">United States</option>
                  <option href="#">Canada</option>
                  <option href="#">Australia</option>
                  <option href="#">United Kingdom</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Heavy Jet</option>
                  <option href="#">Light Jet</option>
                  <option href="#">Super Midsize Jet</option>
                  <option href="#">Large Cabin</option>
                  <option href="#">Turbo Prop</option>
                  <option href="#">Midsize Jet</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$15,000,000 - $30,000,000</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>TTAF</option>
                  <option href="#">0 h - 500 h</option>
                  <option href="#">500 h - 1000 h</option>
                  <option href="#">1000 h - 2000 h</option>
                  <option href="#">2000 h - 3000 h</option>
                </Form.Select>
              </Col>
              <Col>
                <button className="galleryButton">Search</button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col className="resultText">
                <p className="filterText">About 151051 results</p>
              </Col>
              <Col>
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col>
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
              <Col>
                <div className=" RealButton ">
                  <input
                    type="text"
                    placeholder="Enter your Location"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Brand</option>
                  <option href="#">Mercedes-Benz</option>
                  <option href="#">Porsche</option>
                  <option href="#">Chevrolet</option>
                  <option href="#">Ford</option>
                  <option href="#">Ferrari</option>
                  <option href="#">Rolls-Royce</option>
                  <option href="#">Land Rover</option>
                  <option href="#">Bentley</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Years</option>
                  <option href="#">2015-2022</option>
                  <option href="#">2010-2014</option>
                  <option href="#">2000-2009</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Countries</option>
                  <option href="#">United States</option>
                  <option href="#">Canada</option>
                  <option href="#">Australia</option>
                  <option href="#">United Kingdom</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
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
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $100,000</option>
                  <option href="#"> $100,000 - $150,000</option>
                  <option href="#">$ $150,000 - $250,000</option>
                  <option href="#">$250,000 - $300,000</option>
                  <option href="#">$300,000 - $400,000</option>
                  <option href="#">$400,000 - $500,000</option>
                  <option href="#">$500,000 - $1,500,000</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Length</option>
                  <option href="#">0 ft - 30 ft</option>
                  <option href="#">30 ft - 50 ft</option>
                  <option href="#">50 ft - 60 ft</option>
                  <option href="#">65 ft - 100 ft</option>
                </Form.Select>
              </Col>
              <Col>
                <button className="galleryButton">Search</button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col className="resultText">
                <p className="filterText">About 151051 results</p>
              </Col>
              <Col>
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col>
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
              <Col>
                <div className=" RealButton ">
                  <input
                    type="text"
                    placeholder="Enter your Location"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col>
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Villa</option>
                  <option href="#">Penthouse</option>
                  <option href="#">Apartment</option>
                  <option href="#">House</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className=" RealButton ">
                  <option>More Filter</option>
                  <option href="#">Bedrooms</option>
                  <option href="#">Bathrooms</option>
                  <option href="#">Area</option>
                  <option href="#">Year Built</option>
                  <option href="#">Garage</option>
                </Form.Select>
              </Col>
              <Col>
                <button style={{ width: "50%" }} className="galleryButton">
                  Search
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row style={{ display: "flex", alignContent: "center" }}>
              <Col
              md={5}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                About 9,000+ results
              </Col>
              <Col>
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col>
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default PropertyPageHeader;
