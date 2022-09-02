import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Row, Col } from "react-bootstrap";
import { UpcomingYachtCard } from "../Cards/UpcomingYachtCard";
import "../../styles/realEstate.css";
import { YachtCard } from "../Cards/YachtCard";
import authService from "../../services/authServices";
import Cards from "../Cards/Cards";
import NewCards from "../Cards/NewCards";
import ErrorPage from "../Error/404page";
import Loading from "../Loading";
import Next from "../../images/Next.png";
import Prev from "../../images/Previous.png";

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

  // .slick-prev {
  //   left: -75px;
  //   width: 12vw;
  //   height: 100%;
  //   background: url("./images/arrow_back.png") center center no-repeat !important;
  //   font-size: 50px;
  // }

  // .slick-prev:before {
  //   display: none;
  // }

  // .slick-next {
  //   right: -75px;
  //   width: 12vw;
  //   height: 100%;
  //   background: url("./images/arrow_next.png") center center no-repeat !important;
  //   font-size: 50px;
  // }

  // .slick-next:before {
  //   display: none;
  // }

  .slick-prev {
    width: 60px;
    height: 60px;
    left: 8vw;
    z-index: 1;
    background: url(${Prev});
    background-size: 15px;
    background-repeat: no-repeat;
    background-position: 45% 50%;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.75);
    margin: -50px;
  }

  .slick-prev:before {
    display: none;
    // font-size: 60px;
    // color: #e9af84;
  }

  .slick-next {
    width: 60px;
    height: 60px;
    right: 8vw;
    z-index: 1;
    background: url(${Next});
    background-size: 15px;
    background-repeat: no-repeat;
    background-position: 53% 50%;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.75);
    margin: -50px;
  }

  .slick-next:before {
    display: none;
    // font-size: 60px;
    // color: #e9af84;
  }

  @media (max-width: 600px) {
    .slick-prev {
      width: 50px;
      height: 50px;
      left: 15vw;
      margin-top: -75px;
    }
    .slick-next {
      width: 50px;
      height: 50px;
      right: 15vw;
      margin-top: -75px;
    }
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

function YachtPage({
  toggleChange,
  setImgYacht,
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
    setLoader(true);
    let auctions = [];
    const getAuctions = async () => {
      const response1 = await authService.getOngoingAuctionsByType("yacht");
      if (response1.error) {
        alert(response1.error);
      } else {
        auctions = [...response1.data];
      }
      const response2 = await authService.getUpcomingAuctionsByType("yacht");
      if (response2.error) {
        alert(response2.error);
      } else {
        auctions = [...auctions, ...response2.data];
      }
      setAuctions(auctions);
      setLoader(false);
      if (!filter) {
        setResultLength({ yacht: auctions.length });
      }
      if (auctions.length > 0) {
        const imageUrl = auctions.map((image) => {
          for (let i = 0; i < image.property.images.length; i++) {
            return image.property.images[i].url;
          }
        });
        setImgYacht(imageUrl);
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
      authService.yachtFilter(filter).then((res) => {
        if (res.data.length > 0) {
          const yacht = res.data.filter(
            (item) => item.property.type === "yacht"
          );
          setResultLength({ yacht: yacht.length });
          setAuctions(yacht);
          setLoader(false);
        } else {
          setResultLength({ yacht: 0 });
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
        <Row className="p-4 mt-3">
          {/* {windowSize > 800 ? ( */}
          {auctions.map((auction, index) => {
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
          })}
          {/* ) : (
            <Carousel {...settings}>
              {auctions.map((item, index) => (
                <Wrap key={index}>
                  <NewCards
                    data={item}
                    toggleSignIn={toggleSignIn}
                    type={item.property.type}
                    windowSize={windowSize}
                  />
                </Wrap>
              ))}
            </Carousel>
          )} */}
        </Row>
      ) : !loader ? (
        <ErrorPage />
      ) : (
        <Row style={{ height: "100vh" }}></Row>
      )}
    </>
  );
}

export default YachtPage;
