import React, { useState, useEffect, Suspense } from "react";
import "./App.css";
import { Modal, Row, Col } from "react-bootstrap";
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
import NavBar from "./components/Home/NewHome/NavBar";
import ScrollTop from "./components/ScrollTop";
import ButtontoTop from "./components/ButtontoTop";
// import Footer from "./components/Home/footer";
import Footer from "./components/Home/NewHome/Footer";
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
import ViewProfile from "./components/Users/ViewProfile";
import CloseButton from "react-bootstrap/CloseButton";
import cookies from "./images/cookies.png";
import parse from "html-react-parser";
import ToastMessage from "./components/Toast";
import { createBrowserHistory } from "history";

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

  const [expendedMenuId, setExpendedMenuId] = useState();
  const [message, setMessage] = useState("");
  const [maintenance, setMaintenance] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [cookiesPolicy, setCookiesPolicy] = useState("");
  const [showCookiesPolicy, setShowCookiesPolicy] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false);
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
  const [bodyPadding, setBodyPadding] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [wallet, setWallet] = useState({
    RealEstate: 0,
    Car: 0,
    Jet: 0,
    Yacht: 0,
  });
  const [subWallet, setSubWallet] = useState({
    RealEstate: [],
    Car: [],
    Jet: [],
    Yacht: [],
  });

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
    authService.getMaintenanceStatus().then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        setMaintenance(res.data.siteMaintenance[0].siteMaintenance);
      }
    });
  }, []);

  useEffect(() => {
    if (!maintenance) {
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
    }
  }, [dispatch, maintenance]);

  useEffect(() => {
    if (!maintenance) {
      if (user._id) {
        authService.getSavedProperties(user._id).then((res) => {
          if (res.data.error) {
            setMessage("");
            setMessage(res.data.error);
          } else {
            dispatch(addSavedProperty(res.data));
          }
        });
        authService.getIncompleteProperty(user._id).then((res) => {
          if (res.data.error) {
            setMessage("");
            setMessage(res.data.error);
          } else {
            dispatch(addIncompProperty(res.data));
          }
        });
        authService.getWallet(user._id).then((res) => {
          const newWallet = { RealEstate: 0, Car: 0, Jet: 0, Yacht: 0 };
          const newSubWallet = { RealEstate: [], Car: [], Jet: [], Yacht: [] };
          res.data.map((w) => {
            if (w.property.type === "real-estate") {
              newWallet.RealEstate = newWallet.RealEstate + w.availableFund;
              newSubWallet.RealEstate = [...newSubWallet.RealEstate, w];
            } else if (w.property.type === "car") {
              newWallet.Car = newWallet.Car + w.availableFund;
              newSubWallet.Car = [...newSubWallet.Car, w];
            } else if (w.property.type === "jet") {
              newWallet.Jet = newWallet.Jet + w.availableFund;
              newSubWallet.Jet = [...newSubWallet.Jet, w];
            } else if (w.property.type === "yacht") {
              newWallet.Yacht = newWallet.Yacht + w.availableFund;
              newSubWallet.Yacht = [...newSubWallet.Yacht, w];
            }
          });
          setWallet(newWallet);
          setSubWallet(newSubWallet);
        });
      }
    }
  }, [dispatch, user._id, refresh, maintenance]);

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
    if (!maintenance) {
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
    }
  }, [user, maintenance]);

  //get Cookies Policy
  useEffect(() => {
    if (!maintenance) {
      if (!localStorage.getItem("acceptCookies")) {
        let params = new URLSearchParams();
        params.append("name", "US_cookie_policy");
        authService
          .getPageContents(params)
          .then((res) => {
            if (res.data.error) {
              setMessage("");
              setMessage(res.data.error);
            } else {
              for (let item of res.data) {
                if (item.name === "US_cookie_policy") {
                  setCookiesPolicy(item.htmlText);
                }
              }
            }
          })
          .catch((error) => {
            setMessage("");
            setMessage(error.message);
          });
      }
    }
  }, [maintenance]);

  // url change
  let urlChange = createBrowserHistory();
  urlChange.listen((location, action) => {
    if (location?.action === "POP") {
      window.location.reload();
      setMessage("");
    }
  });

  const acceptCookies = () => {
    localStorage.setItem("acceptCookies", true);
    window.location.reload();
  };

  useEffect(() => {
    if (!maintenance) {
      const acceptCookies = localStorage.getItem("acceptCookies");
      if (acceptCookies) {
        setAcceptedCookies(true);
      }
    }
  }, [maintenance]);

  return (
    <>
      {!maintenance ? (
        <Suspense fallback={<Loading />}>
          <div className="expendMenu-container" id={expendedMenuId}>
            <div className="expendMenu">
              <div className="expendMenu-items d-flex justify-content-between">
                <span>Welcome!</span>
                <button onClick={() => setExpendedMenuId()}>X</button>
              </div>
              <div className="expendMenu-items">
                <a href="/realEstates">Real Estate</a>
                <a href="/cars">Car</a>
                <a href="/jets">Jet</a>
                <a href="/yachts">Yacht</a>
              </div>
              <div className="expendMenu-items">
                <a href="/multiSellForm">Sell</a>
                <a href="/Auctions">Buy</a>
                <a href="/Partner">Broker</a>
                <a href="/Partner">Invest</a>
              </div>
              <div className="expendMenu-items">
                <a href="/team">Team</a>
                <a href="/AboutUs">About Us</a>
                <a href="/FAQ">Help & FAQ</a>
                <a href="/TermsOfUse">Terms & Conditions</a>
                <a href="/PrivacyPolicy">Privacy Policy</a>
                <a href="/contact">Contact Us</a>
              </div>
            </div>
          </div>
          {!acceptedCookies && (
            <div className="cookies-container position-fixed">
              <div className="cookies-info">
                <div className="cookies">
                  <img src={cookies} alt="cookie" />
                </div>
                <div>
                  <span>
                    We use third-party cookies to personalize your site
                    experience and analyze the site traffic.
                  </span>
                  <p onClick={() => setShowCookiesPolicy(!showCookiesPolicy)}>
                    Learn More
                  </p>
                </div>
                <div>
                  <button onClick={acceptCookies}>Accept</button>
                </div>
              </div>
            </div>
          )}

          {message && <ToastMessage message={message} />}

          <div
            className="App"
            style={{
              background: bodyColor,
              paddingTop: bodyPadding,
            }}
          >
            {/* All Modals */}
            <Modal
              size="xl"
              show={showCookiesPolicy}
              onHide={() => setShowCookiesPolicy(!showCookiesPolicy)}
              centered
            >
              <Modal.Header className="login-modal-header">
                <Modal.Title className="auction-modal-title px-3">
                  Cookies Policy
                </Modal.Title>
              </Modal.Header>
              <div
                style={{
                  position: "absolute",
                  top: windowSize < 600 ? "0" : "25px",
                  right: windowSize < 600 ? "0" : "25px",
                  zIndex: "999",
                }}
              >
                <CloseButton
                  className="modal-close"
                  style={{ backgroundColor: "white" }}
                  onClick={() => {
                    setShowCookiesPolicy(!showCookiesPolicy);
                  }}
                />
              </div>
              <Modal.Body unselectable="on" className="unselectable">
                {parse(cookiesPolicy)}
              </Modal.Body>
            </Modal>

            <Modal
              backdrop="static"
              size="md"
              keyboard={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={showConfirm}
              onHide={toggleConfirmModal}
              contentclassname="confirm"
            >
              <Modal.Header className="auction-modal-header">
                <Modal.Title className="auction-modal-title px-3">
                  Re-Send Verification Email
                </Modal.Title>
              </Modal.Header>
              <div
                style={{
                  position: "absolute",
                  top: windowSize < 600 ? "0" : "25px",
                  right: windowSize < 600 ? "0" : "25px",
                  zIndex: "999",
                }}
              >
                <CloseButton
                  className="modal-close"
                  style={{ backgroundColor: "white" }}
                  onClick={() => {
                    toggleConfirmModal();
                  }}
                />
              </div>
              <Modal.Body>
                <ReconfirmEmail
                  toggleConfirmModal={toggleConfirmModal}
                  toggleSignIn={toggleSignIn}
                  setMessage={setMessage}
                />
              </Modal.Body>
            </Modal>
            {/* <Modal
          size="md"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={forgotPass}
          onHide={toggleForgotPass}
          contentclassname="forgotPass"
        >
          <Modal.Body
            contentclassname="forgotPass"
            className="forgot-modal"
          ></Modal.Body>
        </Modal> */}
            {/* <Modal
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
        </Modal> */}
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
                <ChangePass
                  toggleChangePass={toggleChangePass}
                  setMessage={setMessage}
                />
              </Modal.Body>
            </Modal>
            {/* <Modal
          backdrop="static"
          keyboard={false}
          // aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showSignIn}
          onHide={toggleSignIn}
          // contentclassname="custom-modal-title"
        >
          <div className="sign-In"></div>
        </Modal> */}
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
              <Modal.Header className="login-modal-header">
                <Modal.Title className="auction-modal-title px-3">
                  Log In
                </Modal.Title>
              </Modal.Header>
              <div
                style={{
                  position: "absolute",
                  top: windowSize < 600 ? "0" : "25px",
                  right: windowSize < 600 ? "0" : "25px",
                  zIndex: "999",
                }}
              >
                <CloseButton
                  className="modal-close"
                  style={{ backgroundColor: "white" }}
                  onClick={() => {
                    toggleSignIn();
                  }}
                />
              </div>
              <Modal.Body>
                <Login
                  toggleSignUp={toggleSignUp}
                  toggleSignIn={toggleSignIn}
                  toggleButton={toggleButton}
                  toggleForgotPass={toggleForgotPass}
                  toggleConfirmModal={toggleConfirmModal}
                  setMessage={setMessage}
                  windowSize={windowSize}
                />
              </Modal.Body>
            </Modal>
            {/* <Modal
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
        </Modal> */}
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
                  setMessage={setMessage}
                />
              </Modal.Body>
            </Modal>
            {/* <Modal
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
        </Modal> */}
            <Modal
              size="lg"
              backdrop="static"
              keyboard={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={forgotPass}
              onHide={toggleForgotPass}
              contentclassname="forgotPass"
            >
              <Modal.Header className="login-modal-header">
                <Modal.Title
                  className="auction-modal-title px-3"
                  style={{ fontSize: windowSize < 600 && "30px" }}
                >
                  Forgot Password
                </Modal.Title>
              </Modal.Header>
              <div
                style={{
                  position: "absolute",
                  top: windowSize < 600 ? "0" : "25px",
                  right: windowSize < 600 ? "0" : "25px",
                  zIndex: "999",
                }}
              >
                <CloseButton
                  className="modal-close"
                  style={{ backgroundColor: "white" }}
                  onClick={() => {
                    toggleForgotPass();
                  }}
                />
              </div>
              <Modal.Body>
                <ForgotPass
                  toggleForgotPass={toggleForgotPass}
                  toggleChangePass={toggleChangePass}
                  setMessage={setMessage}
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
                <ChangePass
                  toggleChangePass={toggleChangePass}
                  setMessage={setMessage}
                />
              </Modal.Body>
            </Modal>
            {/* <Modal
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showSignUp}
          onHide={toggleSignUp}
          contentclassname="custom-modal-style"
        >
          <div className="sign-Up"></div>
        </Modal> */}
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
              <Modal.Header className="login-modal-header">
                <Modal.Title className="auction-modal-title px-3">
                  Sign Up
                </Modal.Title>
              </Modal.Header>
              <div
                style={{
                  position: "absolute",
                  top: windowSize < 600 ? "0" : "25px",
                  right: windowSize < 600 ? "0" : "25px",
                  zIndex: "999",
                }}
              >
                <CloseButton
                  className="modal-close"
                  style={{ backgroundColor: "white" }}
                  onClick={() => {
                    toggleSignUp();
                  }}
                />
              </div>
              <Modal.Body>
                <SignUp
                  toggleSignUp={toggleSignUp}
                  toggleConfirmModal={toggleConfirmModal}
                  toggleSignIn={toggleSignIn}
                  windowSize={windowSize}
                  setMessage={setMessage}
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
                  setMessage={setMessage}
                />
              </Modal.Body>
            </Modal>
            {/* End of Modal */}
            {/* <ButtontoTop />{" "} */}
            <Router>
              <NavBar
                color={color}
                change={change}
                headerWidth={headerWidth}
                positionLeft={positionLeft}
                padRight={padRight}
                toggleSignIn={toggleSignIn}
                toggleSignUp={toggleSignUp}
                windowSize={windowSize}
                wallet={wallet}
                subWallet={subWallet}
                bodyColorChange={bodyColorChange}
                setExpendedMenuId={setExpendedMenuId}
                setMessage={setMessage}
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
                      setMessage={setMessage}
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
                      setMessage={setMessage}
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
                      setMessage={setMessage}
                      windowSize={windowSize}
                    >
                      <BidAuctions />
                    </Dashboard>
                  </Route>
                )}

                {user._id && (
                  <Route exact path="/Dashboard/Auctions/BuyerApproval">
                    <Dashboard
                      toggleShow={toggleShow}
                      colorChange={colorChange}
                      toggleChange={toggleChange}
                      bodyColorChange={bodyColorChange}
                      setHeaderWidth={setHeaderWidth}
                      setPositionLeft={setPositionLeft}
                      setPadRight={setPadRight}
                      setMessage={setMessage}
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
                      setMessage={setMessage}
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
                      setMessage={setMessage}
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
                      setMessage={setMessage}
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
                      setMessage={setMessage}
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
                      setMessage={setMessage}
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
                      setMessage={setMessage}
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
                      setMessage={setMessage}
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
                      setMessage={setMessage}
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
                      setMessage={setMessage}
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
                    setRefresh={setRefresh}
                    setMessage={setMessage}
                    refresh={refresh}
                  />
                </Route>

                <Route path="/Profile/:id">
                  <ViewProfile
                    windowSize={windowSize}
                    bodyColorChange={bodyColorChange}
                    setBodyPadding={setBodyPadding}
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
                    setMessage={setMessage}
                    windowSize={windowSize}
                  />
                </Route>
                <Route exact path="/cars">
                  <PropertyPages
                    colorChange={colorChange}
                    toggleChange={toggleChange}
                    setHeaderWidth={setHeaderWidth}
                    setPositionLeft={setPositionLeft}
                    setPadRight={setPadRight}
                    toggleShow={toggleShow}
                    toggleSignIn={toggleSignIn}
                    setMessage={setMessage}
                    windowSize={windowSize}
                  />
                </Route>
                <Route exact path="/jets">
                  <PropertyPages
                    colorChange={colorChange}
                    toggleChange={toggleChange}
                    setHeaderWidth={setHeaderWidth}
                    setPositionLeft={setPositionLeft}
                    setPadRight={setPadRight}
                    toggleShow={toggleShow}
                    toggleSignIn={toggleSignIn}
                    setMessage={setMessage}
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
                    setMessage={setMessage}
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
                    setMessage={setMessage}
                    windowSize={windowSize}
                  />
                </Route>

                <Route exact path="/Auctions/:parameter">
                  <PropertyPages
                    colorChange={colorChange}
                    toggleChange={toggleChange}
                    setHeaderWidth={setHeaderWidth}
                    setPositionLeft={setPositionLeft}
                    setPadRight={setPadRight}
                    toggleShow={toggleShow}
                    toggleSignIn={toggleSignIn}
                    setMessage={setMessage}
                    windowSize={windowSize}
                  />
                </Route>

                <Route path="/contact">
                  <ContactUs windowSize={windowSize} setMessage={setMessage} />
                </Route>

                <Route path="/AboutUs">
                  <AboutUs windowSize={windowSize} setMessage={setMessage} />
                </Route>

                <Route path="/FAQ">
                  <FAQ windowSize={windowSize} setMessage={setMessage} />
                </Route>

                <Route path="/Team">
                  <Team windowSize={windowSize} setMessage={setMessage} />
                </Route>

                <Route path="/PrivacyPolicy">
                  <Privacy windowSize={windowSize} setMessage={setMessage} />
                </Route>

                <Route path="/TermsOfUse">
                  <TermsCondition
                    windowSize={windowSize}
                    setMessage={setMessage}
                  />
                </Route>

                <Route path="/Partner">
                  <PartnerWithUs
                    windowSize={windowSize}
                    setMessage={setMessage}
                  />
                </Route>

                <Route path="/Broker">
                  <Broker windowSize={windowSize} />
                </Route>

                <Route exact path="/reset_password">
                  <ChangePass
                    colorChange={colorChange}
                    toggleShow={toggleShow}
                    setHeaderWidth={setHeaderWidth}
                    setMessage={setMessage}
                  />
                </Route>
                <Route exact path="/confirm_email">
                  <EmailConfirm
                    colorChange={colorChange}
                    setHeaderWidth={setHeaderWidth}
                    setMessage={setMessage}
                  />
                </Route>
                <Route path="/docusign/callback/:envelopeId">
                  <Docusign
                    colorChange={colorChange}
                    setHeaderWidth={setHeaderWidth}
                    setMessage={setMessage}
                  />
                </Route>

                <Route exact path="/">
                  <Home
                    toggleSignIn={toggleSignIn}
                    windowSize={windowSize}
                    setMessage={setMessage}
                  />
                </Route>

                <Route exact path="/:sectionId">
                  <Home
                    toggleSignIn={toggleSignIn}
                    windowSize={windowSize}
                    setMessage={setMessage}
                  />
                </Route>

                <Route path="">
                  <NotFound windowSize={windowSize} />
                </Route>
              </Switch>
            </Router>
            {show ? (
              <Footer
                toggleSignIn={toggleSignIn}
                windowSize={windowSize}
                setMessage={setMessage}
              />
            ) : null}
          </div>
        </Suspense>
      ) : (
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col className="d-flex justify-content-center align-items-center">
            <h1>Website Under Maintenance</h1>
          </Col>
        </Row>
      )}
    </>
  );
}

export default App;
