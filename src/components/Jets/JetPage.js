import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NewCards from "../Cards/NewCards";
import authService from "../../services/authServices";
import ErrorPage from "../Error/404page";
import Loading from "../Loading";
import "../../styles/realEstate.css";

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

function JetPage({
  toggleChange,
  setImgJet,
  toggleSignIn,
  windowSize,
  filter,
  setResultLength,
  setCenters,
  setMessage,
}) {
  const [auctions, setAuctions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const history = useHistory();
  const slider = useRef();

  const urlSearchParams = new URLSearchParams(history.location.search);
  const filters = Object.fromEntries(urlSearchParams.entries());

  useEffect(async () => {
    toggleChange();
    if (!history.location.search) {
      let auctions = [];
      setLoader(true);
      const response1 = await authService.getOngoingAuctionsByType("jet");
      if (response1.data.error) {
        setMessage("");
        setMessage(response1.data.error);
      } else {
        auctions = [...response1.data];
      }
      const response2 = await authService.getUpcomingAuctionsByType("jet");
      if (response2.data.error) {
        setMessage("");
        setMessage(response2.data.error);
      } else {
        auctions = [...auctions, ...response2.data];
      }
      setAuctions(auctions);
      setResultLength({ jet: auctions.length });
      setLoader(false);
    } else if (history.location.search && filters) {
      setLoader(true);
      authService.jetFilter(filters).then((res) => {
        if (res.data.length > 0) {
          const jet = res.data.filter((item) => item.property.type === "jet");
          setResultLength({ jet: jet.length });
          setAuctions(jet);
          setLoader(false);
        } else {
          setResultLength({ jet: 0 });
          setAuctions([]);
          setLoader(false);
        }
      });
    }
  }, [history.location.search]);

  useEffect(() => {
    if (auctions) {
      setCenters(
        auctions.map((item) => {
          return {
            address: item.property.details.address,
            lat: item.property.details.property_address.lat,
            lng: item.property.details.property_address.lng,
            id: item._id,
          };
        })
      );
      const imageUrl = auctions.map((image) => {
        for (let i = 0; i < image.property.images.length; i++) {
          return { url: image.property.images[i].url, id: image._id };
        }
      });
      setImgJet(imageUrl);
    }
  }, [auctions]);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize > 800 ? (auctions.length > 3 ? 3 : auctions.length) : 1,
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
    <>
      {loader && <Loading />}
      {auctions.length > 0 ? (
        <>
          <Row
            className="mt-4"
            style={{ padding: windowSize > 800 ? "1.5rem" : "0" }}
          >
            {windowSize > 800 ? (
              auctions.map((auction, index) => {
                return (
                  <Col
                    lg={windowSize < 1650 ? 4 : 3}
                    md={windowSize > 1400 ? 4 : 6}
                    className="mb-5 py-2 d-flex justify-content-center"
                    key={index}
                  >
                    <NewCards
                      data={auction}
                      toggleSignIn={toggleSignIn}
                      type={auction.property.type}
                      windowSize={windowSize}
                    />
                  </Col>
                );
              })
            ) : (
              <Carousel {...settings} ref={slider}>
                {auctions.map((item, index) => (
                  <Col
                    key={index}
                    className="d-flex justify-content-center align-items-center align-content-center position-relative carousel-cards px-1"
                  >
                    <NewCards
                      data={item}
                      toggleSignIn={toggleSignIn}
                      type={item.property.type}
                      windowSize={windowSize}
                    />
                  </Col>
                ))}
              </Carousel>
            )}
          </Row>
          <Row className="d-flex justify-content-center align-items-center mt-2">
            {auctions.length > 0 && windowSize < 800
              ? auctions.map((property, index) => (
                  <div
                    onClick={handleClick(index)}
                    key={index}
                    style={{
                      backgroundColor: index === slideIndex && "#B77B50",
                    }}
                    className="slide-circle"
                  ></div>
                ))
              : null}
          </Row>
        </>
      ) : !loader ? (
        <ErrorPage windowSize={windowSize} />
      ) : (
        <Row style={{ height: "100vh" }}></Row>
      )}
    </>
  );
}

export default JetPage;
