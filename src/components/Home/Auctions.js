import React, { useState, useEffect } from "react";
import authService from "../../services/authServices";
import "../../styles/realEstate.css";
import { Row, Col } from "react-bootstrap";
import Cards from "../Cards/Cards";
import { useParams } from "react-router-dom";
import ErrorPage from "../../components/Error/404page";
import PropertyPageHeader from "./PropertyPageHeader";
import Loading from "../Loading";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = styled(Slider)`
  // height: 100%;
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
      top: -3vh;
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

  .slick-prev {
    height: 150px;
    // left: 2vw;
    z-index: 1;
    margin: -50px;
  }

  .slick-prev:before {
    display: none;
  }

  .slick-next {
    height: 150px;
    // right: 2vw;
    z-index: 1;
    content: ">";
    margin: -50px;
  }

  .slick-next:before {
    display: none;
  }
`;

const Wrap = styled.div`
border-radius: 4px;
cursor: pointer;
position: relative;
display: flex;
justify-content: center;
align-items: center;
align-content: center;
// margin-top: auto;  // Just for display

  &:hover {
    padding: 0;
    // border: 4px solid rgba(249, 249, 249, 0.8);
    transition-duration: 300ms;
  }
}
`;

function Auctions({
  toggleSignIn,
  windowSize,
  toggleChange,
  filter,
  setResultLength,
  setCenters,
}) {
  console.log(filter);
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const [onGoingAuctions, setOnGoingAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [allAuctions, setAllAuctions] = useState([]);

  useEffect(() => {
    toggleChange();
  }, []);

  useEffect(() => {
    authService.getUpcomingAuctions().then((res) => {
      setUpcomingAuctions(res.data);
    });
    authService.getOngoingAuctions().then((res) => {
      setOnGoingAuctions(res.data);
    });
  }, []);

  useEffect(() => {
    if (params.Country === "Austin") {
      setLoader(true);
      const datas = {
        city: "Austin",
        auctionType: "",
        type: "",
        min_price: "",
        max_price: "",
      };
      authService.propFilter(datas).then((res) => {
        setAllAuctions(res.data);
        setLoader(false);
      });
    } else if (params.Country === "Houston") {
      setLoader(true);
      const datas = {
        city: "Houston",
        auctionType: "",
        type: "",
        min_price: "",
        max_price: "",
      };
      authService.propFilter(datas).then((res) => {
        setAllAuctions(res.data);
        setLoader(false);
      });
    } else if (params.Country === "Dallas") {
      setLoader(true);
      const datas = {
        city: "Dallas",
        auctionType: "",
        type: "",
        min_price: "",
        max_price: "",
      };
      authService.propFilter(datas).then((res) => {
        setAllAuctions(res.data);
        setLoader(false);
      });
    } else if (params.Country === "SanAntonio") {
      setLoader(true);
      const datas = {
        city: "San Antonio",
        auctionType: "",
        type: "",
        min_price: "",
        max_price: "",
      };
      authService.propFilter(datas).then((res) => {
        setAllAuctions(res.data);
        setLoader(false);
      });
    } else {
      if (onGoingAuctions && upcomingAuctions) {
        setAllAuctions([...onGoingAuctions, ...upcomingAuctions]);
      }
    }
  }, [onGoingAuctions, upcomingAuctions]);

  useEffect(() => {
    if (filter) {
      setLoader(true);
      authService.propFilter(filter).then((res) => {
        if (res.data.length > 0) {
          setResultLength({ auctions: res.data.length });
          setAllAuctions(res.data);
          setLoader(false);
        } else {
          setAllAuctions([]);
          setLoader(false);
        }
      });
    } else {
      setResultLength({ auctions: allAuctions.length });
    }
  }, [filter]);

  useEffect(() => {
    if (allAuctions) {
      setCenters(
        allAuctions.map((item) => {
          return {
            address: item.property.details.address,
            lat: item.property.details.property_address.lat,
            lng: item.property.details.property_address.lng,
          };
        })
      );
    }
  }, [allAuctions]);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize > 800 ? (allAuctions.length > 3 ? 3 : allAuctions.length) : 1,
  };

  return (
    <>
      {loader && <Loading />}
      {allAuctions.length > 0 ? (
        <Row className="mt-5 mb-5">
          {windowSize > 800 ? (
            allAuctions.map((auction, index) => {
              return (
                <Col className="mb-5" key={index}>
                  <Wrap>
                    <Cards
                      data={auction}
                      toggleSignIn={toggleSignIn}
                      type={auction.property.type}
                      windowSize={windowSize}
                    />
                  </Wrap>
                </Col>
              );
            })
          ) : (
            <Carousel {...settings}>
              {allAuctions.map((item, index) => (
                <Wrap key={index}>
                  <Cards
                    data={item}
                    toggleSignIn={toggleSignIn}
                    type={item.property.type}
                    windowSize={windowSize}
                  />
                </Wrap>
              ))}
            </Carousel>
          )}
        </Row>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default Auctions;
