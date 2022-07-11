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

function RealEstatePage({
  toggleChange,
  setImg,
  toggleSignIn,
  windowSize,
  filter,
  setResultLength,
  setCenters,
}) {
  console.log(filter);
  const [auctions, setAuctions] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(async () => {
    toggleChange();
    let auctions = [];
    const getAuctions = async () => {
      const response1 = await authService.getOngoingAuctionsByType(
        "real-estate"
      );
      if (response1.error) {
        alert(response1.error);
      } else {
        auctions = [...response1.data];
      }
      const response2 = await authService.getUpcomingAuctionsByType(
        "real-estate"
      );
      if (response2.error) {
        alert(response2.error);
      } else {
        auctions = [...auctions, ...response2.data];
      }
      setAuctions(auctions);
      if (auctions.length > 0) {
        const imageUrl = auctions.map((image) => {
          for (let i = 0; i < image.property.images.length; i++) {
            return image.property.images[i].url;
          }
        });
        setImg(imageUrl);
      }
      setCenters(
        auctions.map((item) => {
          return {
            address: item.property.details.address,
            lat: item.property.details.property_address.lat,
            lng: item.property.details.property_address.lng,
          };
        })
      );
    };
    getAuctions();
  }, []);

  useEffect(() => {
    if (filter) {
      setLoader(true);
      authService.realEstateFilter(filter).then((res) => {
        if (res.data.length > 0) {
          const realEstate = res.data.filter(
            (item) => item.property.type === "real-estate"
          );
          setResultLength({ realEstate: realEstate.length });
          setAuctions(realEstate);
          setLoader(false);
        } else {
          setAuctions([]);
          setLoader(false);
        }
      });
    } else {
      setResultLength({ realEstate: auctions.length });
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

export default RealEstatePage;
