import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Row, Col } from "react-bootstrap";
import "../../styles/realEstate.css";
import Cards from "../Cards/Cards";
import authService from "../../services/authServices";
import ErrorPage from "../Error/404page";
import Loading from "../Loading";

const Carousel = styled(Slider)`
  // height: 30vh;
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
    left: -75px;
    width: 12vw;
    height: 100%;
    background: url("./images/arrow_back.png") center center no-repeat !important;
    font-size: 50px;
  }

  .slick-prev:before {
    display: none;
  }

  .slick-next {
    right: -75px;
    width: 12vw;
    height: 100%;
    background: url("./images/arrow_next.png") center center no-repeat !important;
    font-size: 50px;
  }

  .slick-next:before {
    display: none;
  }
`;

const Wrap = styled.div`
border-radius: 4px;
cursor: pointer;
position: relative;


&:hover {
  padding: 0;
  // border: 4px solid rgba(249, 249, 249, 0.8);
  transition-duration: 300ms;
}
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
}) {
  const [auctions, setAuctions] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    toggleChange();
    let auctions = [];
    const getAuctions = async () => {
      const response1 = await authService.getOngoingAuctionsByType("jet");
      if (response1.error) {
        alert(response1.error);
      } else {
        auctions = [...response1.data];
      }
      const response2 = await authService.getUpcomingAuctionsByType("jet");
      if (response2.error) {
        alert(response2.error);
      } else {
        auctions = [...auctions, ...response2.data];
      }
      setAuctions(auctions);
      if (!filter) {
        setResultLength({ jet: auctions.length });
      }
      if (auctions.length > 0) {
        const imageUrl = auctions.map((image) => {
          for (let i = 0; i < image.property.images.length; i++) {
            return image.property.images[i].url;
          }
        });
        setImgJet(imageUrl);
      }
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
    };
    getAuctions();
  }, []);

  useEffect(() => {
    if (filter) {
      setLoader(true);
      authService.jetFilter(filter).then((res) => {
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
  }, [filter]);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize > 800 ? (auctions.length > 3 ? 3 : auctions.length) : 1,
  };

  return (
    <>
      {loader && <Loading />}
      {auctions.length > 0 ? (
        <Row className="mt-5 mb-5">
          {windowSize > 800 ? (
            auctions.map((auction, index) => {
              return (
                <Col key={index}>
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
              {auctions.map((item, index) => (
                <Wrap key={index}>
                  <Col style={{ marginBottom: "30px" }}>
                    <Cards
                      data={item}
                      toggleSignIn={toggleSignIn}
                      type={item.property.type}
                      windowSize={windowSize}
                    />
                  </Col>
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

export default JetPage;
