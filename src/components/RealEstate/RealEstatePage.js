import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Row, Col } from "react-bootstrap";
import NewCards from "../Cards/NewCards";
import authService from "../../services/authServices";
import ErrorPage from "../Error/404page";
import Loading from "../Loading";
import { useHistory } from "react-router-dom";
import "../../styles/headers.css";

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

function RealEstatePage({
  toggleChange,
  setImg,
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

  useEffect(() => {
    toggleChange();
    async function fetchData() {
      if (!history.location.search) {
        let auctions = [];
        setLoader(true);
        await authService
          .getOngoingAuctionsByType("real-estate")
          .then((res) => {
            if (res.data.error) {
              setMessage("");
              setMessage(res.data.error);
            } else {
              auctions = [...res.data];
            }
          });
        await authService
          .getUpcomingAuctionsByType("real-estate")
          .then((res) => {
            if (res.data.error) {
              setMessage("");
              setMessage(res.data.error);
            } else {
              auctions = [...auctions, ...res.data];
            }
          });
        setAuctions(auctions);
        setResultLength({ realEstate: auctions.length });
        setLoader(false);
      } else if (history.location.search && filters) {
        setLoader(true);
        await authService.realEstateFilter(filters).then((res) => {
          if (res.data.length > 0) {
            const realEstate = res.data.filter(
              (item) => item.property.type === "real-estate"
            );
            setResultLength({ realEstate: realEstate.length });
            if (filters.auctionType !== "completed") {
              setAuctions(
                realEstate.filter(
                  (item) => item.auctionEndDate > new Date().toISOString()
                )
              );
            } else {
              setAuctions(realEstate);
            }
            setLoader(false);
          } else {
            setResultLength({ realEstate: 0 });
            setAuctions([]);
            setLoader(false);
          }
        });
      }
    }
    fetchData();
  }, [history.location.search, setResultLength, setMessage]);

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
      setImg(imageUrl);
    }
  }, [auctions]);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      auctions.length >= 3 && windowSize > 1300
        ? 3
        : windowSize < 1300 && windowSize > 920
        ? 2
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
    <>
      {loader && <Loading />}
      {auctions.length > 0 ? (
        <>
          {windowSize > 950 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(24.8rem, 2fr))",
                gridGap: "3.5rem",
                placeItems: "center",
                margin: "2rem",
              }}
            >
              {auctions.map((auction, index) => {
                return (
                  <NewCards
                    data={auction}
                    toggleSignIn={toggleSignIn}
                    type={auction.property.type}
                    windowSize={windowSize}
                    key={index}
                  />
                );
              })}
            </div>
          ) : (
            <Row
              className="mt-4"
              style={{ padding: windowSize > 800 ? "1.5rem" : "0" }}
            >
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
            </Row>
          )}
          <Row className="d-flex justify-content-center align-items-center mt-2 mx-5">
            {auctions.length > 0 && windowSize < 800
              ? auctions.map((property, index) => (
                  <div
                    onClick={handleClick(index)}
                    key={index}
                    style={{
                      backgroundColor: index === slideIndex && "#B77B50",
                    }}
                    className="slide-circle my-1"
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

export default RealEstatePage;
