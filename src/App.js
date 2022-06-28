import React, { useState, useEffect, Suspense } from "react";
import "./App.css";
import { Modal, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./slice/userSlice";
import { addSavedProperty } from "./slice/savedPropertySlice";
import { addIncompProperty } from "./slice/incompleteProp";
import authService from "./services/authServices";
import Header from "./components/Home/Header";
import ScrollTop from "./components/ScrollTop";
import ButtontoTop from "./components/ButtontoTop";
import Footer from "./components/Home/footer";
import Loading from "./components/Loading";
import { IdleTimer } from "./services/idleTimer";
import NotFound from "./components/Error/NotFound";
import Messaging from "./components/Dashboard/Pages/Messaging";
import Profile from "./components/Dashboard/Pages/Profile";
import BidAuctions from "./components/Dashboard/Pages/Auctions/BidAuctions";
import SavedAuctions from "./components/Dashboard/Pages/Auctions/SavedAuctions";
import PendingAuctions from "./components/Dashboard/Pages/Auctions/PendingAuctions";
import WinAuctions from "./components/Dashboard/Pages/Auctions/WinAuctions";
import LiveListings from "./components/Dashboard/Pages/Listings/LiveListings";
import PendingListings from "./components/Dashboard/Pages/Listings/PendingListings";
import SoldListings from "./components/Dashboard/Pages/Listings/SoldListings";
import IncompleteListing from "./components/Dashboard/Pages/Listings/IncompleteListing";

const PropertyPages = React.lazy(() =>
  import("./components/Home/PropertyPages")
);
const EmailConfirm = React.lazy(() =>
  import("./components/Users/EmailConfirm")
);
const Auctions = React.lazy(() => import("./components/Home/Auctions"));
const Docusign = React.lazy(() => import("./components/Docusign"));
const DisplayAuctions = React.lazy(() =>
  import("./components/Auctions/DisplayAuctions")
);
const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
const AboutUs = React.lazy(() => import("./components/Company/AboutUs"));
const ContactUs = React.lazy(() => import("./components/Company/ContactUs"));
const Privacy = React.lazy(() => import("./components/Company/Privacy"));
const TermsCondition = React.lazy(() =>
  import("./components/Company/TermsCondition")
);
const FAQ = React.lazy(() => import("./components/Company/FAQ"));
const Team = React.lazy(() => import("./components/Company/Team"));
const PartnerWithUs = React.lazy(() =>
  import("./components/Company/PartnerWithUs")
);
const Broker = React.lazy(() => import("./components/Company/Broker"));
const ReconfirmEmail = React.lazy(() =>
  import("./components/Users/ReconfirmEmail")
);
const SignUp = React.lazy(() => import("./components/Users/SignUp"));
const ForgotPass = React.lazy(() => import("./components/Users/ForgotPass"));
const ChangePass = React.lazy(() => import("./components/Users/ChangePass"));
const Login = React.lazy(() => import("./components/Users/Login"));
const SessionExpired = React.lazy(() =>
  import("./components/Users/SessionExpired")
);
const Home = React.lazy(() => import("./components/Home/Home"));
const MultiSellForm = React.lazy(() =>
  import("./components/SellRegister/MultiSellForm")
);

function App() {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [color, setColor] = useState("");
  const [bodyColor, setBodyColor] = useState("");
  const [show, setShow] = useState(true);
  const [headerWidth, setHeaderWidth] = useState("");
  const [positionLeft, setPositionLeft] = useState("");
  const [padRight, setPadRight] = useState("");
  const [showSignIn, popSignIn] = useState(false);
  const [showSignUp, popUpSignUp] = useState(false);
  const [showConfirm, popupConfirm] = useState(false);
  const [showButton, popButton] = useState(false);
  const [forgotPass, popForgotPass] = useState(false);
  const [changePass, popChangePass] = useState(false);
  const [showSessionTimedOut, setShowSessionTimedOut] = useState(false);

  const toggleChangePass = () => popChangePass(!changePass);
  const toggleForgotPass = () => popForgotPass(!forgotPass);
  const toggleButton = () => popButton(!showButton);
  const toggleSignIn = () => popSignIn(!showSignIn);
  const toggleSignUp = () => popUpSignUp(!showSignUp);
  const toggleConfirmModal = () => popupConfirm(!showConfirm);
  const toggleSessionTimedOut = () => {
    setShowSessionTimedOut(!showSessionTimedOut);
  };

  const toggleShow = (value) => {
    setShow(value);
  };

  const colorChange = (color) => {
    setColor(color);
  };

  const bodyColorChange = (color) => {
    setBodyColor(color);
  };

  const [change, setChange] = useState(false);
  const toggleChange = (change) => {
    setChange(change);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      const getUser = async () => {
        try {
          const response = await authService.getUsers(authToken);
          if (response.data.message === "User Logged In") {
            dispatch(login(response.data.user));
          } else {
            localStorage.removeItem("token");
            history.push("/");
          }
        } catch (error) {
          localStorage.removeItem("token");
          history.push("/");
        }
      };
      getUser();
    }
  }, [dispatch]);

  if (user._id) {
    authService.getSavedProperties(user._id).then((res) => {
      dispatch(addSavedProperty(res.data));
    });
    authService.getIncompleteProperty(user._id).then((res) => {
      dispatch(addIncompProperty(res.data));
    });
  }

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const handleWindowResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      dispatch(logout());
      setShowSessionTimedOut(true);
    };
    let timer;
    if (user._id) {
      timer = new IdleTimer({ timeout: 200, handleLogout });
      timer.setTracker();
      timer.logoutTimer();
    }
    return () => {
      if (timer) {
        timer.clearTracker();
      }
    };
  }, [user]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="App" style={{ background: bodyColor }}>
        {/* All Modals */}
        <Modal
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showConfirm}
          onHide={toggleConfirmModal}
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
              toggleConfirmModal={toggleConfirmModal}
              toggleSignIn={toggleSignIn}
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
          onHide={toggleForgotPass}
          contentclassname="forgotPass"
        >
          <Modal.Body contentclassname="forgotPass" className="forgot-modal">
            <ForgotPass
              toggleForgotPass={toggleForgotPass}
              toggleChangePass={toggleChangePass}
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
          onHide={toggleForgotPass}
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
              toggleForgotPass={toggleForgotPass}
              toggleChangePass={toggleChangePass}
            />
          </Modal.Body>
        </Modal>
        <Modal
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={changePass}
          onHide={toggleChangePass}
          contentclassname="forgotPass"
        >
          <Modal.Body>
            <ChangePass toggleChangePass={toggleChangePass} />
          </Modal.Body>
        </Modal>
        <Modal
          size="xl"
          backdrop="static"
          keyboard={false}
          // aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showSignIn}
          onHide={toggleSignIn}
          // contentclassname="custom-modal-title"
        >
          <div className="sign-In"></div>
        </Modal>
        <Modal
          size="lg"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showSignIn}
          onHide={toggleSignIn}
          contentclassname="login"
          className="form-group mb-4 mt-3"
        >
          <Modal.Body>
            <Login
              toggleSignUp={toggleSignUp}
              toggleSignIn={toggleSignIn}
              toggleButton={toggleButton}
              toggleForgotPass={toggleForgotPass}
              toggleConfirmModal={toggleConfirmModal}
              windowSize={windowSize}
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
          onHide={toggleSignUp}
          contentclassname="sign-In"
        >
          <Modal.Body className="sign-Up"></Modal.Body>
        </Modal>
        <Modal
          size="lg"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showSessionTimedOut}
          style={{ borderRadius: "30px" }}
          onHide={toggleSessionTimedOut}
          contentclassname="custom-modal-style"
        >
          <Modal.Body>
            <SessionExpired
              toggleSessionTimedOut={toggleSessionTimedOut}
              toggleSignIn={toggleSignIn}
            />
          </Modal.Body>
        </Modal>
        <Modal
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showConfirm}
          onHide={toggleConfirmModal}
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
              toggleConfirmModal={toggleConfirmModal}
              toggleSignIn={toggleSignIn}
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
          onHide={toggleForgotPass}
          contentclassname="forgotPass"
        >
          <Modal.Body contentclassname="forgotPass" className="forgot-modal">
            {/* <ForgotPass
              toggleForgotPass={toggleForgotPass}
              toggleChangePass={toggleChangePass}
            /> */}
          </Modal.Body>
        </Modal>
        <Modal
          size="md"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={forgotPass}
          onHide={toggleForgotPass}
          contentclassname="forgotPass"
        >
          <Modal.Header closeButton>
            {windowSize > 330 ? (
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
            ) : (
              <Modal.Title
                id="contained-modal-title-vcenter"
                style={{
                  color: "#D58F5C",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Forgot Password
              </Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <ForgotPass
              toggleForgotPass={toggleForgotPass}
              toggleChangePass={toggleChangePass}
            />
          </Modal.Body>
        </Modal>
        <Modal
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={changePass}
          onHide={toggleChangePass}
          contentclassname="forgotPass"
        >
          <Modal.Body>
            <ChangePass toggleChangePass={toggleChangePass} />
          </Modal.Body>
        </Modal>
        <Modal
          size="xl"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showSignUp}
          onHide={toggleSignUp}
          contentclassname="custom-modal-style"
        >
          <div className="sign-Up"></div>
        </Modal>
        <Modal
          size="lg"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showSignUp}
          style={{ borderRadius: "30px" }}
          onHide={toggleSignUp}
          contentclassname="custom-modal-style"
        >
          <Modal.Body>
            <SignUp
              toggleSignUp={toggleSignUp}
              toggleConfirmModal={toggleConfirmModal}
              toggleSignIn={toggleSignIn}
              windowSize={windowSize}
            />
          </Modal.Body>
        </Modal>
        <Modal
          size="lg"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showSessionTimedOut}
          style={{ borderRadius: "30px" }}
          onHide={toggleSessionTimedOut}
          contentclassname="custom-modal-style"
        >
          <Modal.Body>
            <SessionExpired
              toggleSessionTimedOut={toggleSessionTimedOut}
              toggleSignIn={toggleSignIn}
            />
          </Modal.Body>
        </Modal>
        {/* End of Modal */}
        <ButtontoTop />{" "}
        <Router>
          <Header
            color={color}
            change={change}
            headerWidth={headerWidth}
            positionLeft={positionLeft}
            padRight={padRight}
            toggleSignIn={toggleSignIn}
            toggleSignUp={toggleSignUp}
            windowSize={windowSize}
          />
          <ScrollTop />

          <Switch>
            {user._id && (
              <Route exact path="/Dashboard">
                <Dashboard
                  toggleShow={toggleShow}
                  colorChange={colorChange}
                  toggleChange={toggleChange}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                />
              </Route>
            )}

            {user._id && (
              <Route exact path="/Dashboard/Messaging">
                <Dashboard
                  toggleShow={toggleShow}
                  colorChange={colorChange}
                  toggleChange={toggleChange}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                >
                  <Messaging />
                </Dashboard>
              </Route>
            )}

            {user._id && (
              <Route exact path="/Dashboard/Auctions/BidAuctions">
                <Dashboard
                  toggleShow={toggleShow}
                  colorChange={colorChange}
                  toggleChange={toggleChange}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                >
                  <BidAuctions />
                </Dashboard>
              </Route>
            )}

            {user._id && (
              <Route exact path="/Dashboard/Auctions/PendingAuctions">
                <Dashboard
                  toggleShow={toggleShow}
                  colorChange={colorChange}
                  toggleChange={toggleChange}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                >
                  <PendingAuctions />
                </Dashboard>
              </Route>
            )}

            {user._id && (
              <Route exact path="/Dashboard/Auctions/SavedAuctions">
                <Dashboard
                  toggleShow={toggleShow}
                  colorChange={colorChange}
                  toggleChange={toggleChange}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                >
                  <SavedAuctions windowSize={windowSize} />
                </Dashboard>
              </Route>
            )}

            {user._id && (
              <Route exact path="/Dashboard/Auctions/WinAuctions">
                <Dashboard
                  toggleShow={toggleShow}
                  colorChange={colorChange}
                  toggleChange={toggleChange}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                >
                  <WinAuctions />
                </Dashboard>
              </Route>
            )}

            {user._id && (
              <Route exact path="/Dashboard/Listings/AuctionListings">
                <Dashboard
                  toggleShow={toggleShow}
                  colorChange={colorChange}
                  toggleChange={toggleChange}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                >
                  <LiveListings windowSize={windowSize} />
                </Dashboard>
              </Route>
            )}

            {user._id && (
              <Route exact path="/Dashboard/Listings/PendingApproval">
                <Dashboard
                  toggleShow={toggleShow}
                  colorChange={colorChange}
                  toggleChange={toggleChange}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                >
                  <PendingListings />
                </Dashboard>
              </Route>
            )}

            {user._id && (
              <Route exact path="/Dashboard/Listings/SoldListings">
                <Dashboard
                  toggleShow={toggleShow}
                  colorChange={colorChange}
                  toggleChange={toggleChange}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                >
                  <SoldListings />
                </Dashboard>
              </Route>
            )}

            {user._id && (
              <Route exact path="/Dashboard/Listings/IncompleteListing">
                <Dashboard
                  toggleShow={toggleShow}
                  colorChange={colorChange}
                  toggleChange={toggleChange}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                >
                  <IncompleteListing />
                </Dashboard>
              </Route>
            )}

            {user._id && (
              <Route exact path="/Dashboard/Profile">
                <Dashboard
                  toggleShow={toggleShow}
                  colorChange={colorChange}
                  toggleChange={toggleChange}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                >
                  <Profile />
                </Dashboard>
              </Route>
            )}

            {user._id && (
              <Route path="/multiSellForm/:id">
                <MultiSellForm
                  colorChange={colorChange}
                  toggleShow={toggleShow}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                  toggleSignIn={toggleSignIn}
                  toggleSignUp={toggleSignUp}
                />
              </Route>
            )}
            {user._id && (
              <Route exact path="/multiSellForm">
                <MultiSellForm
                  colorChange={colorChange}
                  toggleShow={toggleShow}
                  bodyColorChange={bodyColorChange}
                  setHeaderWidth={setHeaderWidth}
                  setPositionLeft={setPositionLeft}
                  setPadRight={setPadRight}
                  windowSize={windowSize}
                  toggleSignIn={toggleSignIn}
                />
              </Route>
            )}

            <Route path="/DisplayAuctions/:id">
              <DisplayAuctions
                colorChange={colorChange}
                toggleChange={toggleChange}
                setHeaderWidth={setHeaderWidth}
                setPositionLeft={setPositionLeft}
                setPadRight={setPadRight}
                toggleShow={toggleShow}
                toggleSignIn={toggleSignIn}
                windowSize={windowSize}
              />
            </Route>

            <Route exact path="/realEstates">
              <PropertyPages
                colorChange={colorChange}
                toggleChange={toggleChange}
                setHeaderWidth={setHeaderWidth}
                setPositionLeft={setPositionLeft}
                setPadRight={setPadRight}
                toggleShow={toggleShow}
                toggleSignIn={toggleSignIn}
                windowSize={windowSize}
              />
            </Route>
            <Route exact path="/Cars">
              <PropertyPages
                colorChange={colorChange}
                toggleChange={toggleChange}
                setHeaderWidth={setHeaderWidth}
                setPositionLeft={setPositionLeft}
                setPadRight={setPadRight}
                toggleShow={toggleShow}
                toggleSignIn={toggleSignIn}
                windowSize={windowSize}
              />
            </Route>
            <Route exact path="/Jets">
              <PropertyPages
                colorChange={colorChange}
                toggleChange={toggleChange}
                setHeaderWidth={setHeaderWidth}
                setPositionLeft={setPositionLeft}
                setPadRight={setPadRight}
                toggleShow={toggleShow}
                toggleSignIn={toggleSignIn}
                windowSize={windowSize}
              />
            </Route>
            <Route exact path="/Yachts">
              <PropertyPages
                colorChange={colorChange}
                toggleChange={toggleChange}
                setHeaderWidth={setHeaderWidth}
                setPositionLeft={setPositionLeft}
                setPadRight={setPadRight}
                toggleShow={toggleShow}
                toggleSignIn={toggleSignIn}
                windowSize={windowSize}
              />
            </Route>

            <Route exact path="/Auctions">
              <PropertyPages
                colorChange={colorChange}
                toggleChange={toggleChange}
                setHeaderWidth={setHeaderWidth}
                setPositionLeft={setPositionLeft}
                setPadRight={setPadRight}
                toggleShow={toggleShow}
                toggleSignIn={toggleSignIn}
                windowSize={windowSize}
              />
            </Route>

            <Route exact path="/Auctions/:Country">
              <PropertyPages
                colorChange={colorChange}
                toggleChange={toggleChange}
                setHeaderWidth={setHeaderWidth}
                setPositionLeft={setPositionLeft}
                setPadRight={setPadRight}
                toggleShow={toggleShow}
                toggleSignIn={toggleSignIn}
                windowSize={windowSize}
              />
            </Route>

            <Route path="/contact">
              <ContactUs windowSize={windowSize} />
            </Route>

            <Route path="/AboutUs">
              <AboutUs windowSize={windowSize} />
            </Route>

            <Route path="/FAQ">
              <FAQ windowSize={windowSize} />
            </Route>

            <Route path="/Team">
              <Team windowSize={windowSize} />
            </Route>

            <Route path="/PrivacyPolicy">
              <Privacy windowSize={windowSize} />
            </Route>

            <Route path="/TermsOfUse">
              <TermsCondition windowSize={windowSize} />
            </Route>

            <Route path="/Partner">
              <PartnerWithUs windowSize={windowSize} />
            </Route>

            <Route path="/Broker">
              <Broker windowSize={windowSize} />
            </Route>

            <Route exact path="/reset_password">
              <ChangePass
                colorChange={colorChange}
                toggleShow={toggleShow}
                setHeaderWidth={setHeaderWidth}
              />
            </Route>
            <Route exact path="/confirm_email">
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
              <Home toggleSignIn={toggleSignIn} windowSize={windowSize} />
            </Route>

            <Route exact path="/:sectionId">
              <Home toggleSignIn={toggleSignIn} windowSize={windowSize} />
            </Route>

            <Route path="">
              <NotFound windowSize={windowSize} />
            </Route>
          </Switch>
        </Router>
        {show ? (
          <Footer toggleSignIn={toggleSignIn} windowSize={windowSize} />
        ) : null}
      </div>
    </Suspense>
  );
}

export default App;
