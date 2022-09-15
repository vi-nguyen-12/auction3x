import React, { useState, useEffect, useRef } from "react";
import authService from "../../services/authServices";
import "../../styles/realEstate.css";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NewCards from "../Cards/NewCards";
import { useParams } from "react-router-dom";
import ErrorPage from "../../components/Error/404page";
import Loading from "../Loading";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

function Auctions({
  toggleSignIn,
  windowSize,
  toggleChange,
  filter,
  setResultLength,
  setCenters,
  setImg,
}) {
  const params = useParams();
  const history = useHistory();
  const slider = useRef();
  const [slideIndex, setSlideIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [allAuctions, setAllAuctions] = useState([]);

  const urlSearchParams = new URLSearchParams(history.location.search);
  const filters = Object.fromEntries(urlSearchParams.entries());

  useEffect(() => {
    toggleChange();
  }, []);

  useEffect(async () => {
    if (!history.location.search) {
      let auctions = [];
      if (params.parameter === "Featured") {
        await authService.getFeaturedAuctions().then((res) => {
          auctions = res.data.filter(
            (auction) => auction.auctionEndDate > new Date().toISOString()
          );
        });
      } else if (params.parameter === "Upcoming") {
        await authService.getUpcomingAuctions().then((res) => {
          auctions = [...res.data];
        });
      } else {
        await authService.getUpcomingAuctions().then((res) => {
          auctions = [...res.data];
        });
        await authService.getOngoingAuctions().then((res) => {
          auctions = [...auctions, ...res.data];
        });
      }
      setAllAuctions(auctions);
      setResultLength({ auctions: auctions.length });
    } else if (
      history.location.search &&
      params.parameter === "Featured" &&
      filters
    ) {
      setLoader(true);
      authService.featureFilter(filters).then((res) => {
        if (res.data.length > 0) {
          setAllAuctions(res.data);
          setResultLength({ auctions: res.data.length });
          setLoader(false);
        } else {
          setAllAuctions([]);
          setResultLength({ auctions: 0 });
          setLoader(false);
        }
      });
    } else if (
      history.location.search &&
      params.parameter === "Upcoming" &&
      filters
    ) {
      setLoader(true);
      authService.upcomingFilter(filters).then((res) => {
        if (res.data.length > 0) {
          setAllAuctions(res.data);
          setResultLength({ auctions: res.data.length });
          setLoader(false);
        } else {
          setAllAuctions([]);
          setResultLength({ auctions: 0 });
          setLoader(false);
        }
      });
    } else if (history.location.search && filters) {
      setLoader(true);
      authService.propFilter(filters).then((res) => {
        if (res.data.length > 0) {
          setAllAuctions(res.data);
          setResultLength({ auctions: res.data.length });
          setLoader(false);
        } else {
          setAllAuctions([]);
          setResultLength({ auctions: 0 });
          setLoader(false);
        }
      });
    }
  }, [params.parameter, history.location.search]);

  useEffect(() => {
    if (allAuctions) {
      setCenters(
        allAuctions.map((item) => {
          return {
            address: item.property.details.address,
            lat: item.property.details.property_address.lat,
            lng: item.property.details.property_address.lng,
            id: item._id,
          };
        })
      );
      const imageUrl = allAuctions.map((image) => {
        for (let i = 0; i < image.property.images.length; i++) {
          return { url: image.property.images[i].url, id: image._id };
        }
      });
      setImg(imageUrl);
    }
  }, [allAuctions]);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize > 800 ? (allAuctions.length > 3 ? 3 : allAuctions.length) : 1,
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
      {allAuctions.length > 0 ? (
        <>
          <Row
            className="mt-4"
            style={{ padding: windowSize > 800 ? "1.5rem" : "0" }}
          >
            {windowSize > 800 ? (
              allAuctions.map((item, index) => {
                return (
                  <Col
                    lg={windowSize < 1650 ? 4 : 3}
                    md={windowSize > 1400 ? 4 : 6}
                    className="mb-5 py-2 d-flex justify-content-center"
                    key={index}
                  >
                    <NewCards
                      toggleSignIn={toggleSignIn}
                      windowSize={windowSize}
                      data={item}
                      type={item.property.type}
                    />
                  </Col>
                );
              })
            ) : (
              <Carousel {...settings} ref={slider}>
                {allAuctions.map((item, index) => (
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
            {allAuctions.length > 0 && windowSize < 800
              ? allAuctions.map((property, index) => (
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

export default Auctions;
