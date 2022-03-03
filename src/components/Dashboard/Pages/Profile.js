import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";

function Profile() {
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
        <Col style={{paddingLeft:"70px"}} sm={9}>
          <div className="list">
            <h3>Listed Property</h3>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
