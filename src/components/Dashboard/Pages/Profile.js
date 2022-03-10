import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import "../../../styles/DashBoardStyle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

const Carousel = styled(Slider)`
  height: 100%;
  width: 100%;
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
  }

  .slick-prev:before {
    color: #e9af84;
    font-size: 50px;
  }

  .slick-next {
    right: -75px;
    width: 12vw;
    height: 100%;
  }

  .slick-next:before {
    color: #e9af84;
    font-size: 50px;
  }
`;

const Wrap = styled.div`
border-radius: 15px;
// cursor: pointer;
// position: relative;
width: 250px;
height: 150px;

  // &:hover {
  //   padding: 0;
  //   transform: scale(1.03);
  //   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  // }
}
`;

function Profile() {
  const savedProperty = useSelector((state) => state.savedProperty);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: savedProperty.length > 3 ? 3 : savedProperty.length,
  };
  return (
    <Container className="profileContainer">
      <Row>
        <Col sm={3} className="profilePicCol">
          <div className="profileOutline">
            <div className="profileInline"></div>
          </div>
        </Col>
        <Col sm={9}>
          <div className="descript">
            <h3>Description</h3>
            <p>
              Well, from my learning experience, I would state that the most
              productive way to master HTML and CSS is to opt for an effective
              resource that stands tall on the following parameters - the one
              that does not merely glide over the topics, the one that considers
              that students are new to the domain and are not well adept with
              the subject.
            </p>
            <p>
              But now, having mastered HTML and CSS after facing multiple
              challenges along the learning journey and thence having bagged a
              high-paying Front-End Web Development job fresh out of college at
              Airbnb(US $94,100), by showcasing to the recruiters my command
              over the various aspects of Web Development including HTML, CSS
              and JavaScript, by the means of my developed project, I believe I
              should put an answer to this question so as to make your learning
              less troublesome than mine.
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          sm={3}
          style={{
            display: "inline-grid",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <div className="name">
            <h3>Samuel Rodriguez</h3>
            <p>Owner</p>
          </div>
          <div className="address">
            <p>Midnight Corner St. Suite 600 San Francisco, CADGE 94107</p>
            <Button>
              <BsInstagram size={25} color="#216fed" />
            </Button>
            <Button>
              <BsFacebook size={29} color="#216fed" />
            </Button>
            <Button>
              <BsTwitter size={27} color="#216fed" />
            </Button>
          </div>
        </Col>
        <Col style={{ paddingLeft: "70px" }} sm={9}>
          <h3>Listed Property</h3>
          <Row>
            <Carousel {...settings}>
              {savedProperty.map((property, index) => (
                <Wrap key={index}>
                  <div className="listItem">
                    <img
                      src={property.property.images[0].url}
                      alt="property"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </Wrap>
              ))}
            </Carousel>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
