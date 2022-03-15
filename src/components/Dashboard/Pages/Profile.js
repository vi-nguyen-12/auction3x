import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import { FiEdit } from 'react-icons/fi'
import "../../../styles/DashBoardStyle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import authService from '../../../services/authServices';
import { AiFillPlusCircle } from 'react-icons/ai'
import { Modal } from "react-bootstrap";
import { FcPlus } from 'react-icons/fc'

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

function Profile({ id }) {
  const savedProperty = useSelector((state) => state.savedProperty);
  const user = useSelector((state) => state.user);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: savedProperty.length > 3 ? 3 : savedProperty.length,
  };
  const [saveLink, setSaveLink] = useState();
  const [saveLink_1, setSaveLink_1] = useState();
  const [saveLink_2, setSaveLink_2] = useState();
  const [showInsta, setShowInsta] = useState(false);
  const toggleInsta = () => setShowInsta(!showInsta);
  const [showFacebook, setShowFacebook] = useState(false);
  const toggleFacebook = () => setShowFacebook(!showFacebook);
  const [showTwit, setShowTwit] = useState(false);
  const toggleTwit = () => setShowTwit(!showTwit);
  const [isDisabled, setIsDisabled] = useState(true);
  const [colors, setColors] = useState("#7b7f82");
  const toogleDisable = () => {
    setIsDisabled(!isDisabled);
    setColors("black");
  };


  return (
    <Container className="profileContainer">
      <Row>
        <Col sm={3} className="profilePicCol">
          <div className="profileOutline">
            <div className="profileInline">
              <Button onClick={() => toogleDisable()}>
                <FiEdit size={25} />
              </Button>
              {isDisabled === true ? (
                <img src="https://i.ibb.co/qxXxXxq/profile-pic.png" alt="" />
              ) : (
                <>
                  <input
                    style={{
                      fontSize: "24px",
                      border: "0",
                      backgroundColor: "white",
                      borderRadius: "0",
                      fontWeight: "bold",
                      display: "inline-block",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    id="example-text-input"
                    hidden
                  />
                  <label htmlFor="example-text-input">
                    <FcPlus size={50} />
                  </label>
                </>
              )}
            </div>
          </div>
        </Col>
        <Col sm={9}>
          <div className="descript">
            <h3>Description</h3>
            {isDisabled === true ? (
              <p>
                <textarea
                  style={{
                    width: "100%",
                    fontSize: "20px",
                    border: "0",
                    backgroundColor: "white",
                    borderRadius: "0",
                    display: "inline-block",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  type="text"
                  id="example-text-input"
                  defaultValue="  Well, from my learning experience, I would state that the most
                  productive way to master HTML and CSS is to opt for an effective
                  resource that stands tall on the following parameters - the one
                  that does not merely glide over the topics, the one that considers
                  that students are new to the domain and are not well adept with
                  the subject.
                  But now, having mastered HTML and CSS after facing multiple
                  challenges along the learning journey and thence having bagged a
                  high-paying Front-End Web Development job fresh out of college at
                  Airbnb(US $94,100), by showcasing to the recruiters my command
                  over the various aspects of Web Development including HTML, CSS
                  and JavaScript, by the means of my developed project, I believe I
                  should put an answer to this question so as to make your learning
                  less troublesome than mine."
                  disabled
                />
              </p>
            ) : (
              <p>
                <textarea
                  style={{
                    width: "100%",
                    fontSize: "20px",
                    backgroundColor: "white",
                    borderRadius: "0",
                    display: "inline-block",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  type="text"
                  id="example-text-input"
                  defaultValue={user.city + ", " + user.country}

                />
              </p>
            )}
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
            {isDisabled === true ? (
              <input
                style={{
                  fontSize: "24px",
                  border: "0",
                  backgroundColor: "white",
                  borderRadius: "0",
                  fontWeight: "bold",
                  display: "inline-block",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                type="text"
                id="example-text-input"
                defaultValue={user.firstName + " " + user.lastName}
                disabled
              />
            ) : (
              <input
                style={{
                  fontSize: "24px",
                  backgroundColor: "white",
                  borderRadius: "0",
                  fontWeight: "bold",
                  display: "inline-block",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                type="text"
                id="example-text-input"
                defaultValue={user.firstName + " " + user.lastName}
              />
            )}
          </div>

          <div className="address">
            {/* <p>Midnight Corner St. Suite 600 San Francisco, CADGE 94107</p> */}
            {isDisabled === true ? (
              <input
                style={{
                  width: "100%",
                  fontSize: "14px",
                  border: "0",
                  backgroundColor: "white",
                  borderRadius: "0",
                  display: "inline-block",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                type="text"
                id="example-text-input"
                defaultValue={user.city + ", " + user.country}
                disabled
              />
            ) : (
              <input
                style={{
                  width: "100%",
                  fontSize: "14px",
                  backgroundColor: "white",
                  borderRadius: "0",
                  display: "inline-block",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                type="text"
                id="example-text-input"
                defaultValue={user.city + ", " + user.country}
              />
            )}
          </div>
          <div className="social">
            {isDisabled === true ? (
              <>

                <a href={saveLink} target="_blank">
                  <Button>
                    <BsInstagram size={25} color="#216fed" />
                  </Button>
                </a>
                <a href={saveLink_1} target="_blank">
                  <Button>
                    <BsFacebook size={29} color="#216fed" />
                  </Button>
                </a>
                <a href={saveLink_2} target="_blank">
                  <Button>
                    <BsTwitter size={27} color="#216fed" />
                  </Button>
                </a>
              </>
            ) : (
              <>
                <Button id="instagram" onClick={toggleInsta}>
                  <AiFillPlusCircle size={25} color="#216fed" />
                </Button>
                <Modal size="lg"
                  style={{ height: "100%" }}
                  show={showInsta}
                  onHide={toggleInsta}
                  centered>
                  <Modal.Header>
                    <Modal.Title>
                      <h3>Add Instagram</h3>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Your Instagram Link (start with http://)</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter here" onChange={(e) => setSaveLink(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button type="submit"  >
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button id="facebook" onClick={toggleFacebook} >
                  <AiFillPlusCircle size={29} color="#216fed" />
                </Button>
                <Modal size="lg"
                  style={{ height: "100%" }}
                  show={showFacebook}
                  onHide={toggleFacebook}
                  centered>
                  <Modal.Header>
                    <Modal.Title>
                      <h3>Add facebook</h3>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Your Facebook Link</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter here" onChange={(e) => setSaveLink_1(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button type="submit"  >
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button id="Twitter" onClick={toggleTwit}>
                  <AiFillPlusCircle size={27} color="#216fed" />
                </Button>
                <Modal size="lg"
                  style={{ height: "100%" }}
                  show={showTwit}
                  onHide={toggleTwit}
                  centered>
                  <Modal.Header>
                    <Modal.Title>
                      <h3>Add Twitter</h3>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Your Twitter Link</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter here" onChange={(e) => setSaveLink_2(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button type="submit"  >
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
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
