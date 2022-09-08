import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import NewCards from "../../Cards/NewCards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import "../../../styles/feature.css";

const Carousel = styled(Slider)`
  // height: 100vh;
  overflow: hidden;

  & > button {
    opacity: 1;
    height: 100%;
    width: 15vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      position: absolute;
      // top: -3vh;
      font-size: 20px;
      color: gray;
      left: -35px;
    }
  }

  li.slick-active button:before {
    color: #e9af84;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev:before {
    display: none;
    // font-size: 60px;
    // color: #e9af84;
  }

  .slick-next:before {
    display: none;
    // font-size: 60px;
    // color: #e9af84;
  }
`;

function Features({ toggleSignIn, featureAuctions, windowSize, loader }) {
  const slider = useRef();
  const [slideIndex, setSlideIndex] = useState(0);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize >= 1250
        ? featureAuctions.length >= 3
          ? 3
          : featureAuctions.length
        : 1,
    beforeChange: (current, next) => {
      setSlideIndex(next);
    },
  };

  const handleClick = (index) => () => {
    setSlideIndex(index);
  };

  useEffect(() => {
    if (slider.current) {
      slider.current.slickGoTo(slideIndex);
    }
  }, [slideIndex]);

  return (
    <Row
      id="feature"
      style={{ padding: windowSize < 800 ? "3rem 0.6rem" : "3rem" }}
    >
      <Row>
        <Col>
          <h1 className="section-title">Featured Listings</h1>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Button className="view-btn">View All</Button>
          <BsArrowRight size={28} color="#4F4F59" />
        </Col>
      </Row>
      <Row className="mt-5">
        {featureAuctions.length > 0 ? (
          windowSize > 800 ? (
            featureAuctions.slice(0, 3).map((item, index) => (
              <Col
                key={index}
                md={windowSize > 1400 ? 4 : 6}
                className="py-2 d-flex justify-content-center"
              >
                {/* <NewCards
                toggleSignIn={toggleSignIn}
                windowSize={windowSize}
                data={item}
                type={item.property.type}
              /> */}
                <NewCards
                  toggleSignIn={toggleSignIn}
                  windowSize={windowSize}
                  data={item}
                  type={item.property.type}
                />
              </Col>
            ))
          ) : (
            <Carousel {...settings} ref={slider}>
              {featureAuctions.map((property, index) => (
                <Col
                  key={index}
                  className="d-flex justify-content-center align-items-center align-content-center position-relative carousel-cards px-1"
                >
                  <NewCards
                    // toggleSignIn={toggleSignIn}
                    windowSize={windowSize}
                    data={property}
                    type={property.property.type}
                  />
                </Col>
              ))}
            </Carousel>
          )
        ) : !loader ? (
          <Col>
            <div className="no-feature-container">
              <span className="no-feature-text">
                No featured listing available at the moment.
              </span>
            </div>
          </Col>
        ) : (
          <Row style={{ height: "100vh" }}></Row>
        )}
      </Row>
      <Row className="d-flex justify-content-center align-items-center mt-2">
        {featureAuctions.length > 0 && windowSize < 800
          ? featureAuctions.map((property, index) => (
              <div
                onClick={handleClick(index)}
                key={index}
                style={{ backgroundColor: index === slideIndex && "#B77B50" }}
                className="slide-circle"
              ></div>
            ))
          : null}
      </Row>
    </Row>
  );
}

export default Features;
