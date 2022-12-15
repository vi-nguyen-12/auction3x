import React from "react";
import { Row, Col } from "react-bootstrap";
import authService from "../../services/authServices";

function PropDocDisclaimer({ propertyId, userId, setMessage }) {
  const agreeDisclaimer = () => {
    const data = {
      propertyId: propertyId,
      userId: userId,
    };
    authService.disclaimerAgreement(data).then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        setMessage("");
        setMessage(res.data.message);
        window.location.reload();
      }
    });
  };

  return (
    <Row>
      <Col md={12}>
        <ul>
          <li>
            The information provided in this website is for general information
            purposes only. The information is provided by Property Auctions and
            while we endeavour to keep the information up to date and correct,
            we make no representations or warranties of any kind, express or
            implied, about the completeness, accuracy, reliability, suitability
            or availability with respect to the website or the information,
            products, services, or related graphics contained on the website for
            any purpose. Any reliance you place on such information is therefore
            strictly at your own risk.
          </li>
          <li>
            In no event will we be liable for any loss or damage including
            without limitation, indirect or consequential loss or damage, or any
            loss or damage whatsoever arising from loss of data or profits
            arising out of, or in connection with, the use of this website.
          </li>
          <li>
            Through this website you are able to link to other websites which
            are not under the control of Property Auctions. We have no control
            over the nature, content and availability of those sites. The
            inclusion of any links does not necessarily imply a recommendation
            or endorse the views expressed within them.
          </li>
        </ul>
      </Col>
      <Col md={12} className="d-flex justify-content-end">
        <button className="general_btn px-4 py-2" onClick={agreeDisclaimer}>
          Agree
        </button>
      </Col>
    </Row>
  );
}

export default PropDocDisclaimer;
