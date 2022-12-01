import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import authServices from "../../services/authServices";

function Confirm({ setMessage, toggleShow, windowSize }) {
  const token = useLocation().search.split("=")[1];
  const history = useHistory();

  // useEffect(() => {
  //   toggleShow();
  // }, []);

  useEffect(() => {
    authServices
      .confirmEmail(token)
      .then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setMessage("");
          setMessage(res.data.message);
          history.push("/");
        }
      })
      .catch((err) => {
        setMessage("");
        setMessage(err.message);
      });
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ padding: windowSize > 600 && "0 15%" }}
    >
      <div className="shadow-lg py-4">
        <Row className="h-100 w-100">
          <Col
            xs={12}
            className="d-flex justify-content-center align-items-center my-4"
          >
            <BsCheckCircle size={100} color="green" />
          </Col>
          <Col
            xs={12}
            className="d-grid justify-content-center align-items-center"
          >
            <h2 className="text-center mt-4">Email Address Confirmed!</h2>
            <span className="text-center px-3 mt-3">
              You have successfully confirm your email address, you can now
              click on the button below to browse our amazing inventory.
            </span>
          </Col>
          <Col
            xs={12}
            className="d-grid justify-content-center align-items-end my-5"
          >
            <button
              className="general_btn px-4 py-3"
              onClick={() => history.push("/")}
            >
              Browse Inventory
            </button>
          </Col>
        </Row>
      </div>
    </div>

    // <Row className="d-flex justify-content-center align-items-center vh-100 mt-5">
    //   <Col className="d-flex justify-content-center align-items-center gutter p-0 m-0">
    //     <div
    //       style={{ height: "100%", width: "100%" }}
    //       className="shadow-lg p-5"
    //     >
    //       <div className="d-flex justify-content-center align-items-center">
    //         <BsCheckCircle size={100} color="green" />
    //       </div>
    //       <div className="d-grid justify-content-center align-items-center mt-3">
    //         <h2 className="text-center">Email Address Confirmed!</h2>
    //         <span className="text-center px-3 mt-3">
    //           You have successfully confirm your email address, you can now
    //           click on the button below to browse our amazing inventory.
    //         </span>
    //       </div>
    //       <div className="d-flex justify-content-center align-items-end mt-5">
    //         <button
    //           className="general_btn px-4 py-3"
    //           onClick={() => history.push("/")}
    //         >
    //           Browse Inventory
    //         </button>
    //       </div>
    //     </div>
    //   </Col>
    // </Row>
  );
}

export default Confirm;
