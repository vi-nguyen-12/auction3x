import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import "../../styles/realEstate.css";
import NumberFormat from "react-number-format";
import Dropdown from "react-bootstrap/Dropdown";
import { MdOutlineMyLocation } from "react-icons/md";

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
  const [price, setPrice] = useState(false);
  return (
    <>
      {path === "/cars" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Condition</option>
                  <option>New</option>
                  <option>Used</option>
                  {/* <option href="#">Mercedes-Benz</option>
                  <option href="#">Porsche</option>
                  <option href="#">Chevrolet</option>
                  <option href="#">Ford</option>
                  <option href="#">Ferrari</option>
                  <option href="#">Rolls-Royce</option>
                  <option href="#">Land Rover</option>
                  <option href="#">Bentley</option> */}
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Starting Price</option>
                  <option href="#">$0 - $100,000</option>
                  <option href="#"> $100,000 - $150,000</option>
                  <option href="#">$150,000 - $250,000</option>
                  <option href="#">$250,000 - $300,000</option>
                  <option href="#">$300,000 - $400,000</option>
                  <option href="#">$400,000 - $500,000</option>
                  <option href="#">$500,000 - $1,500,000</option>
                </Form.Select>
                {/* <Button
                  style={{ color: "black" }}
                  onClick={() => setPrice(!price)}
                  className=" RealButtonPrice "
                >
                  Starting Price
                </Button>
                {price && (
                  <div className="priceDrop">
                    <div className="d-flex">
                      <input
                        placeholder="Min Price"
                        type="number"
                        min="0"
                        className="form-control"
                      />
                      <span className="d-flex justify-content-center align-items-center px-2">
                        -
                      </span>
                      <input
                        placeholder="Max Price"
                        type="number"
                        min="0"
                        className="form-control"
                      />
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <Button>Done</Button>
                    </div>
                  </div>
                )} */}
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Mileage</option>
                  <option href="#">0 mi - 1000 mi</option>
                  <option href="#">10000 mi - 20000 mi</option>
                  <option href="#">20000 mi - 40000 mi</option>
                  <option href="#">40000 mi - 60000 mi</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex justify-content-center filterResult" md={3}>
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                9000+ results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
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
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Years</option>
                  <option href="#">2015-2022</option>
                  <option href="#">2010-2014</option>
                  <option href="#">2000-2009</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Starting Price</option>
                  <option href="#">$0 - $100,000</option>
                  <option href="#"> $100,000 - $150,000</option>
                  <option href="#">$150,000 - $250,000</option>
                  <option href="#">$250,000 - $300,000</option>
                  <option href="#">$300,000 - $400,000</option>
                  <option href="#">$400,000 - $500,000</option>
                  <option href="#">$500,000 - $1,500,000</option>
                </Form.Select>
                {/* <Button
                  style={{ color: "black" }}
                  onClick={() => setPrice(!price)}
                  className=" RealButtonPrice "
                >
                  Starting Price
                </Button>
                {price && (
                  <div className="priceDrop">
                    <div className="d-flex">
                      <input
                        placeholder="Min Price"
                        type="number"
                        min="0"
                        className="form-control"
                      />
                      <span className="d-flex justify-content-center align-items-center px-2">
                        -
                      </span>
                      <input
                        placeholder="Max Price"
                        type="number"
                        min="0"
                        className="form-control"
                      />
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <Button>Done</Button>
                    </div>
                  </div>
                )} */}
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>TTAF</option>
                  <option href="#">0 h - 500 h</option>
                  <option href="#">500 h - 1000 h</option>
                  <option href="#">1000 h - 2000 h</option>
                  <option href="#">2000 h - 3000 h</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                9000+ results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
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
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Starting Price</option>
                  <option href="#">$0 - $100,000</option>
                  <option href="#"> $100,000 - $150,000</option>
                  <option href="#">$150,000 - $250,000</option>
                  <option href="#">$250,000 - $300,000</option>
                  <option href="#">$300,000 - $400,000</option>
                  <option href="#">$400,000 - $500,000</option>
                  <option href="#">$500,000 - $1,500,000</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Length</option>
                  <option href="#">0 ft - 30 ft</option>
                  <option href="#">30 ft - 50 ft</option>
                  <option href="#">50 ft - 60 ft</option>
                  <option href="#">65 ft - 100 ft</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                9000+ results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImgYacht}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/Auctions" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Real Estate</option>
                  <option href="#">Car</option>
                  <option href="#">Jet</option>
                  <option href="#">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Starting Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </Form.Select>
              </Col>
              {/* <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>More Filter</option>
                  <option href="#">Bedrooms</option>
                  <option href="#">Bathrooms</option>
                  <option href="#">Area</option>
                  <option href="#">Year Built</option>
                  <option href="#">Garage</option>
                </Form.Select>
              </Col> */}
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
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
                9,000+ results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/Auctions/Austin" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Real Estate</option>
                  <option href="#">Car</option>
                  <option href="#">Jet</option>
                  <option href="#">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Starting Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </Form.Select>
              </Col>
              {/* <Col className="d-flex justify-content-center">
              <Form.Select className=" RealButton ">
                <option>More Filter</option>
                <option href="#">Bedrooms</option>
                <option href="#">Bathrooms</option>
                <option href="#">Area</option>
                <option href="#">Year Built</option>
                <option href="#">Garage</option>
              </Form.Select>
            </Col> */}
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
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
                9,000+ results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/Auctions/Houston" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Real Estate</option>
                  <option href="#">Car</option>
                  <option href="#">Jet</option>
                  <option href="#">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Starting Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </Form.Select>
              </Col>
              {/* <Col className="d-flex justify-content-center">
              <Form.Select className=" RealButton ">
                <option>More Filter</option>
                <option href="#">Bedrooms</option>
                <option href="#">Bathrooms</option>
                <option href="#">Area</option>
                <option href="#">Year Built</option>
                <option href="#">Garage</option>
              </Form.Select>
            </Col> */}
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
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
                9,000+ results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/Auctions/Dallas" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Real Estate</option>
                  <option href="#">Car</option>
                  <option href="#">Jet</option>
                  <option href="#">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Starting Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </Form.Select>
              </Col>
              {/* <Col className="d-flex justify-content-center">
              <Form.Select className=" RealButton ">
                <option>More Filter</option>
                <option href="#">Bedrooms</option>
                <option href="#">Bathrooms</option>
                <option href="#">Area</option>
                <option href="#">Year Built</option>
                <option href="#">Garage</option>
              </Form.Select>
            </Col> */}
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
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
                9,000+ results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/Auctions/SanAntonio" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Real Estate</option>
                  <option href="#">Car</option>
                  <option href="#">Jet</option>
                  <option href="#">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Starting Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </Form.Select>
              </Col>
              {/* <Col className="d-flex justify-content-center">
              <Form.Select className=" RealButton ">
                <option>More Filter</option>
                <option href="#">Bedrooms</option>
                <option href="#">Bathrooms</option>
                <option href="#">Area</option>
                <option href="#">Year Built</option>
                <option href="#">Garage</option>
              </Form.Select>
            </Col> */}
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
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
                9,000+ results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/realEstates" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Villa</option>
                  <option href="#">Penthouse</option>
                  <option href="#">Apartment</option>
                  <option href="#">House</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Starting Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>More Filter</option>
                  <option href="#">Bedrooms</option>
                  <option href="#">Bathrooms</option>
                  <option href="#">Area</option>
                  <option href="#">Year Built</option>
                  <option href="#">Garage</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
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
                9,000+ results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : null}
    </>
  );
}

export default PropertyPageHeader;
