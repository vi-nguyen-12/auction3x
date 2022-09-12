import React, { useState, useEffect } from "react";
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
  setImg,
}) {
  const params = useParams();
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [onGoingAuctions, setOnGoingAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [allAuctions, setAllAuctions] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(history.location.search);
    const filters = Object.fromEntries(urlSearchParams.entries());
    setFiltered(filters);
  }, [history.location.search]);

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

  useEffect(async () => {
    let auctions = [];
    if (!history.location.search) {
      if (params.parameter === "Featured") {
        await authService.getFeaturedAuctions().then((res) => {
          auctions = res.data.filter(
            (auction) => auction.auctionEndDate > new Date().toISOString()
          );
        });
      } else if (params.parameter === "Upcoming") {
        auctions = [...upcomingAuctions];
      } else {
        if (onGoingAuctions && upcomingAuctions) {
          auctions = [...onGoingAuctions, ...upcomingAuctions];
        }
      }
    } else {
      setLoader(true);
      authService.propFilter(filtered).then((res) => {
        if (res.data.length > 0) {
          auctions = [...res.data];
          setLoader(false);
        } else {
          auctions = [];
          setLoader(false);
        }
      });
    }
    setAllAuctions(auctions);
    setResultLength({ auctions: auctions.length });
  }, [onGoingAuctions, upcomingAuctions]);

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
          return image.property.images[i].url;
        }
      });
      setImg(imageUrl);
    }
  }, [allAuctions]);

  useEffect(() => {
    if (filtered) {
      setLoader(true);
      authService.propFilter(filtered).then((res) => {
        if (res.data.length > 0) {
          setResultLength({ auctions: res.data.length });
          setAllAuctions(res.data);
          setLoader(false);
        } else {
          setResultLength({ auctions: 0 });
          setAllAuctions([]);
          setLoader(false);
        }
      });
    }
  }, [filtered]);

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
            allAuctions.map((item, index) => {
              return (
                <Col className="mb-5" key={index}>
                  <Wrap>
                    <NewCards
                      toggleSignIn={toggleSignIn}
                      windowSize={windowSize}
                      data={item}
                      type={item.property.type}
                    />
                  </Wrap>
                </Col>
              );
            })
          ) : (
            <Carousel {...settings}>
              {allAuctions.map((item, index) => (
                <Wrap key={index}>
                  <NewCards
                    toggleSignIn={toggleSignIn}
                    windowSize={windowSize}
                    data={item}
                    type={item.property.type}
                  />
                </Wrap>
              ))}
            </Carousel>
          )}
        </Row>
      ) : (
        <ErrorPage windowSize={windowSize} />
      )}
    </>
  );
}

export default Auctions;
