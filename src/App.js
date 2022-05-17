import "./App.css";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./slice/userSlice";
import MultiSellForm from "./components/SellRegister/MultiSellForm";
import Footer from "./components/Home/footer";
import { addProperty } from "./slice/propertySlice";
import { addAuction } from "./slice/auctionSlice";
import { addSavedProperty } from "./slice/savedPropertySlice";
import { addIncompProperty } from "./slice/incompleteProp";
import authService from "./services/authServices";
import Header from "./components/Home/Header";
import PropertyPages from "./components/Home/PropertyPages";
import EmailConfirm from "./components/Users/EmailConfirm";
import ScrollTop from "./components/ScrollTop";
import Docusign from "./components/Docusign";
import DisplayAuctions from "./components/Auctions/DisplayAuctions";
import Dashboard from "./components/Dashboard/Dashboard";
import { useHistory } from "react-router-dom";
import ButtontoTop from "./components/ButtontoTop";
import AboutUs from "./components/Company/AboutUs";
import ContactUs from "./components/Company/ContactUs";
import Privacy from "./components/Company/Privacy";
import TermsCondition from "./components/Company/TermsCondition";
import FAQ from "./components/Company/FAQ";
import Team from "./components/Company/Team";
import PartnerWithUs from "./components/Company/PartnerWithUs";
import Broker from "./components/Users/Broker";
import ReconfirmEmail from "./components/Users/ReconfirmEmail";
import SignUp from "./components/Users/SignUp";
import ForgotPass from "./components/Users/ForgotPass";
import ChangePass from "./components/Users/ChangePass";
import Login from "./components/Users/Login";
import Home from "./components/Home/Home";

// const FindInCountries = lazy(() => import("./components/Home/FindInCountries"));
// const ImgSlider = lazy(() => import("./components/Home/ImgSlider"));
// const Upcoming = lazy(() => import("./components/Auctions/Upcoming"));
// const Work = lazy(() => import("./components/Home/work"));
// const RealEstate = lazy(() => import("./components/Home/realEstate"));
// const MultiSellForm = lazy(() =>
//   import("./components/SellRegister/MultiSellForm")
// );
// const Footer = lazy(() => import("./components/Home/footer"));
// const Featured = lazy(() => import("./components/Home/Featured"));
// const Header = lazy(() => import("./components/Home/Header"));
// const PropertyPages = lazy(() => import("./components/Home/PropertyPages"));
// const About = lazy(() => import("./components/Home/About"));
// const ChangePass = lazy(() => import("./components/Users/ChangePass"));
// const EmailConfirm = lazy(() => import("./components/Users/EmailConfirm"));
// const ScrollTop = lazy(() => import("./components/ScrollTop"));
// const Docusign = lazy(() => import("./components/Docusign"));
// const DisplayAuctions = lazy(() =>
//   import("./components/Auctions/DisplayAuctions")
// );
// const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
// const ButtontoTop = lazy(() => import("./components/ButtontoTop"));

function App() {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      const getUser = async () => {
        const response = await authService.getUsers(authToken);
        if (response.data.message === "User Logged In") {
          dispatch(login(response.data.user));
        } else {
          history.push("/");
          window.location.reload();
        }
      };
      getUser();
    }
  }, [dispatch]);

  authService.getUpcomingAuctions().then((res) => {
    dispatch(addProperty(res.data));
  });

  authService.getOngoingAuctions().then((res) => {
    dispatch(addAuction(res.data));
  });

  if (user._id) {
    authService.getSavedProperties(user._id).then((res) => {
      dispatch(addSavedProperty(res.data));
    });
    authService.getIncompleteProperty(user._id).then((res) => {
      dispatch(addIncompProperty(res.data));
    });
  }

  const [color, setColor] = useState("");
  const [bodyColor, setBodyColor] = useState("");
  const [show, setShow] = useState(true);
  const [headerWidth, setHeaderWidth] = useState("");
  const [positionLeft, setPositionLeft] = useState("");
  const [padRight, setPadRight] = useState("");
  const toogleShow = (value) => {
    setShow(value);
  };

  const colorChange = (color) => {
    setColor(color);
  };

  const bodyColorChange = (color) => {
    setBodyColor(color);
  };

  const [change, setChange] = useState(false);
  const toogleChange = (change) => {
    setChange(change);
  };

  const [showSignIn, popSignIn] = useState(false);
  const [showSignUp, popUpSignUp] = useState(false);
  const [showConfirm, popupConfirm] = useState(false);
  const [showButton, popButton] = useState(false);
  const [forgotPass, popForgotPass] = useState(false);
  const [changePass, popChangePass] = useState(false);
  const toogleChangePass = () => popChangePass(!changePass);
  const toogleForgotPass = () => popForgotPass(!forgotPass);
  const toogleButton = () => popButton(!showButton);
  const toogleSignIn = () => popSignIn(!showSignIn);
  const toogleSignUp = () => popUpSignUp(!showSignUp);
  const toogleConfirmModal = () => popupConfirm(!showConfirm);

  return (
    <div className="App" style={{ background: bodyColor }}>
      {/* All Modals */}
      <Modal
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showConfirm}
        onHide={toogleConfirmModal}
        contentclassname="confirm"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#D58F5C" }}
          >
            Confirm Email
          </Modal.Title>
          <Modal.Title
            className="pt-4"
            style={{
              fontSize: "12px",
              color: "#D58F5C",
              position: "absolute",
              marginright: "10px",
              marginTop: "8px",
            }}
          ></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReconfirmEmail
            toogleConfirmModal={toogleConfirmModal}
            toogleSignIn={toogleSignIn}
          />
        </Modal.Body>
      </Modal>
      <Modal
        size="md"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={forgotPass}
        onHide={toogleForgotPass}
        contentclassname="forgotPass"
      >
        <Modal.Body contentclassname="forgotPass" className="forgot-modal">
          <ForgotPass
            toogleForgotPass={toogleForgotPass}
            toogleChangePass={toogleChangePass}
          />
        </Modal.Body>
      </Modal>
      <Modal
        size="md"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={forgotPass}
        onHide={toogleForgotPass}
        contentclassname="forgotPass"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{
              color: "#D58F5C",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Forgot Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ForgotPass
            toogleForgotPass={toogleForgotPass}
            toogleChangePass={toogleChangePass}
          />
        </Modal.Body>
      </Modal>
      <Modal
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={changePass}
        onHide={toogleChangePass}
        contentclassname="forgotPass"
      >
        <Modal.Body>
          <ChangePass toogleChangePass={toogleChangePass} />
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showSignIn}
        onHide={toogleSignIn}
        contentclassname="login"
      >
        <Modal.Body className="sign-In"></Modal.Body>
      </Modal>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showSignIn}
        onHide={toogleSignIn}
        contentclassname="login"
      >
        <Modal.Body>
          <Login
            toogleSignUp={toogleSignUp}
            toogleSignIn={toogleSignIn}
            toogleButton={toogleButton}
            toogleForgotPass={toogleForgotPass}
            toogleConfirmModal={toogleConfirmModal}
          />
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showSignUp}
        onHide={toogleSignUp}
        contentclassname="custom-modal-style"
      >
        <Modal.Body className="sign-Up"></Modal.Body>
      </Modal>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showSignUp}
        style={{ borderRadius: "30px" }}
        onHide={toogleSignUp}
        contentclassname="custom-modal-style"
      >
        <Modal.Body>
          <SignUp
            toogleSignUp={toogleSignUp}
            toogleConfirmModal={toogleConfirmModal}
            toogleSignIn={toogleSignIn}
          />
        </Modal.Body>
      </Modal>
      <ButtontoTop />{" "}
      <Router>
        <Header
          color={color}
          change={change}
          headerWidth={headerWidth}
          positionLeft={positionLeft}
          padRight={padRight}
          toogleSignIn={toogleSignIn}
          toogleSignUp={toogleSignUp}
        />
        <ScrollTop />

        <Switch>
          {user._id && (
            <Route exact path="/MultiSellForm">
              <div className="sell-register-container">
                <MultiSellForm
                  colorChange={colorChange}
                  toogleShow={toogleShow}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                />
              </div>
            </Route>
          )}

          <Route exact path="/MultiSellForm/:userId/:id/:step">
            <div className="sell-register-container">
              <MultiSellForm
                colorChange={colorChange}
                toogleShow={toogleShow}
                bodyColorChange={bodyColorChange}
                setHeaderWidth={setHeaderWidth}
                setPositionLeft={setPositionLeft}
                setPadRight={setPadRight}
              />
            </div>
          </Route>

          <Route path="/DisplayAuctions/:id">
            <DisplayAuctions
              colorChange={colorChange}
              toogleChange={toogleChange}
              setHeaderWidth={setHeaderWidth}
              setPositionLeft={setPositionLeft}
              setPadRight={setPadRight}
              toogleShow={toogleShow}
              toogleSignIn={toogleSignIn}
            />
          </Route>

          <Route exact path="/realEstates">
            <PropertyPages
              colorChange={colorChange}
              toogleChange={toogleChange}
              setHeaderWidth={setHeaderWidth}
              setPositionLeft={setPositionLeft}
              setPadRight={setPadRight}
              toogleShow={toogleShow}
              toogleSignIn={toogleSignIn}
            />
          </Route>
          <Route exact path="/Cars">
            <PropertyPages
              colorChange={colorChange}
              toogleChange={toogleChange}
              setHeaderWidth={setHeaderWidth}
              setPositionLeft={setPositionLeft}
              setPadRight={setPadRight}
              toogleShow={toogleShow}
              toogleSignIn={toogleSignIn}
            />
          </Route>
          <Route exact path="/Jets">
            <PropertyPages
              colorChange={colorChange}
              toogleChange={toogleChange}
              setHeaderWidth={setHeaderWidth}
              setPositionLeft={setPositionLeft}
              setPadRight={setPadRight}
              toogleShow={toogleShow}
              toogleSignIn={toogleSignIn}
            />
          </Route>
          <Route exact path="/Yachts">
            <PropertyPages
              colorChange={colorChange}
              toogleChange={toogleChange}
              setHeaderWidth={setHeaderWidth}
              setPositionLeft={setPositionLeft}
              setPadRight={setPadRight}
              toogleShow={toogleShow}
              toogleSignIn={toogleSignIn}
            />
          </Route>
          {user._id && (
            <Route path="/Dashboard">
              <Dashboard
                toogleShow={toogleShow}
                colorChange={colorChange}
                toogleChange={toogleChange}
                bodyColorChange={bodyColorChange}
                setHeaderWidth={setHeaderWidth}
                setPositionLeft={setPositionLeft}
                setPadRight={setPadRight}
              />
            </Route>
          )}

          <Route path="/contact">
            <ContactUs />
          </Route>

          <Route path="/AboutUs">
            <AboutUs />
          </Route>

          <Route path="/FAQ">
            <FAQ />
          </Route>

          <Route path="/Team">
            <Team />
          </Route>

          <Route path="/PrivacyPolicy">
            <Privacy />
          </Route>

          <Route path="/TermsOfUse">
            <TermsCondition />
          </Route>

          <Route path="/Partner">
            <PartnerWithUs />
          </Route>

          <Route path="/Broker">
            <Broker />
          </Route>

          <Route path="/reset_password">
            <ChangePass
              colorChange={colorChange}
              toogleShow={toogleShow}
              setHeaderWidth={setHeaderWidth}
            />
          </Route>
          <Route path="/confirm_email">
            <EmailConfirm
              colorChange={colorChange}
              setHeaderWidth={setHeaderWidth}
            />
          </Route>
          <Route path="/docusign/callback/:envelopeId">
            <Docusign
              colorChange={colorChange}
              setHeaderWidth={setHeaderWidth}
            />
          </Route>

          <Route exact path="/">
            <Home toogleSignIn={toogleSignIn} />
          </Route>
        </Switch>
      </Router>
      {show ? <Footer toogleSignIn={toogleSignIn} /> : null}
    </div>
  );
}

export default App;
