import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "../../styles/footer.css";

const Footer = (props) => {
  return (
    <footer>
      <div className="footer-wrap">
        <Card className="card-footer">
          <Row className="row-1">
            <Col>
              <div className="img-flex">
                {/* <img src="/Vector.png" alt="" /> */}
                <img src="/images/newName.png" className="auction-img" alt="" />
              </div>
              <p className="auction-content">
                AUCTION 3 is an innovative online bidding platform that
                specialized in the expediting sale of real estate through
                auction and brings the exciting real estate opportunities to
                both buyers and sellers with true value for money.
              </p>
            </Col>
            <Col>
              <h5 className="footer-title">Quick Links</h5>
              <ul>
                <li className="list-unstyled">
                  <a href="#!">Buy</a>
                </li>
                <li className="list-unstyled">
                  <a href="/MultiSellForm">Sell</a>
                </li>
                <li className="list-unstyled">
                  <a href="/AboutUs">About Us</a>
                </li>
                <li className="list-unstyled">
                  <a href="/AboutUs">Team</a>
                </li>
                <li className="list-unstyled">
                  <a href="/FAQ">FAQ</a>
                </li>
                <li className="list-unstyled">
                  <a href="/ContantUs">Contact Us</a>
                </li>
              </ul>
            </Col>

            <Col>
              <h5 className="footer-title">Categories</h5>
              <ul>
                <li className="list-unstyled">
                  <a href="/realEstates">Real Estate</a>
                </li>
                <li className="list-unstyled">
                  <a href="/cars">Cars</a>
                </li>
                <li className="list-unstyled">
                  <a href="/yachts">Yachts</a>
                </li>
                <li className="list-unstyled">
                  <a href="/jets">Jets</a>
                </li>
                {/* <li className="list-unstyled">
                            <a href="#!">Jewels</a>
                        </li> */}
              </ul>
            </Col>
            <Col>
              <h5 className="footer-title">Others</h5>
              <ul>
                <li className="list-unstyled">
                  {/* <a href="#!">List with us</a> */}
                </li>
                <li className="list-unstyled">
                  <a href="/Broker">Broker</a>
                </li>
                <li className="list-unstyled">
                  <a href="/Partner">Partner</a>
                </li>
                <li className="list-unstyled">
                  <a href="/PrivacyPolicy">Privacy Policy</a>
                </li>
                <li className="list-unstyled">
                  <a href="/TermsOfUse">Terms &amp; Conditions</a>
                </li>
              </ul>
            </Col>
          </Row>
          <div className="auction-reserved">
            © 2022 AUCTION3. All Rights Reserved
          </div>
        </Card>
      </div>
    </footer>
  );
};

export default Footer;
