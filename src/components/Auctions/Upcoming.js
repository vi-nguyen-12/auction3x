import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Cards from "../Cards/Cards";
import Error from "../Error/404page";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import Next from "../../images/Next.png";
import Prev from "../../images/Previous.png";

const Carousel = styled(Slider)`
  // height: 100%;
  overflow-x: hidden;

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
  //   height: 150px;
  //   left: 2vw;
  //   z-index: 1;
  //   background: url("./images/arrow_back.png") center center no-repeat !important;
  //   margin: -50px;
  // }

  // .slick-prev:before {
  //   display: none;
  // }

  // .slick-next {
  //   height: 150px;
  //   right: 2vw;
  //   z-index: 1;
  //   background: url("./images/arrow_next.png") center center no-repeat !important;
  //   margin: -50px;
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
display: flex;
justify-content: center;
align-items: center;
align-content: center;
// margin-top: auto;  // Just for display

  &:hover {
    padding: 0;
    transition-duration: 300ms;
  }
}
`;

const Upcoming = ({ toggleSignIn, upcomingAuctions, windowSize }) => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: upcomingAuctions.length > 2 ? 2 : upcomingAuctions.length,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <>
      {windowSize > 900 ? (
        <>
          {upcomingAuctions ? (
            <>
              <div id="upcoming" className="mt-5">
                <Row style={{ padding: "0 50px" }}>
                  <Col style={{ padding: "0" }} className="pt-5">
                    <h2
                      style={{
                        color: "#282828",
                        fontSize: "44px",
                        marginBottom: "50px",
                        fontWeight: "600",
                        fontFamily: "Josefin Slab",
                        fontStyle: "normal",
                      }}
                    >
                      Upcoming Auctions
                    </h2>
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {upcomingAuctions.length > 0 ? (
                    upcomingAuctions.slice(0, 6).map((item) => (
                      <Col
                        key={item._id}
                        style={{ padding: "0", margin: "30px 0" }}
                      >
                        <Cards
                          data={item}
                          windowSize={windowSize}
                          toggleSignIn={toggleSignIn}
                          type={item.property.type}
                        />
                      </Col>
                    ))
                  ) : (
                    <Error />
                  )}
                </Row>
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          <Row style={{ padding: "0 50px" }}>
            <Col style={{ padding: "0" }} className="pt-5">
              <h2
                style={{
                  color: "#282828",
                  fontSize: "24px",
                  marginBottom: "50px",
                  fontWeight: "600",
                  fontFamily: "Josefin Slab",
                  fontStyle: "normal",
                }}
              >
                Upcoming Auctions
              </h2>
            </Col>
          </Row>
          <Row style={{ height: "700px" }}>
            <Carousel {...settings}>
              {upcomingAuctions.length > 0 ? (
                upcomingAuctions.map((item, index) => (
                  <Wrap key={index}>
                    <Cards
                      toggleSignIn={toggleSignIn}
                      windowSize={windowSize}
                      data={item}
                      type={item.property.type}
                    />
                  </Wrap>
                ))
              ) : (
                <Error />
              )}
            </Carousel>
          </Row>
        </>
      )}
    </>
  );
};

export { Upcoming };
