import ImgSlider from "./components/Home/ImgSlider";
import { FindInCountries } from "./components/Home/FindInCountries";
import { Upcoming } from "./components/Auctions/Upcoming";
import Work from "./components/Home/work";
import RealEstate from "./components/Home/realEstate";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./slice/userSlice";
import MultiSellForm from "./components/SellRegister/MultiSellForm";
import Footer from "./components/Home/footer";
import { Featured } from "./components/Home/Featured";
import { addProperty } from "./slice/propertySlice";
import { addAuction } from "./slice/auctionSlice";
import { addSavedProperty } from "./slice/savedPropertySlice";
import { addIncompProperty } from "./slice/incompleteProp";
import authService from "./services/authServices";
import Header from "./components/Home/Header";
import PropertyPages from "./components/Home/PropertyPages";
import About from "./components/Home/About";
import { addRegistProp } from "./slice/registPropertySlice";
import ChangePass from "./components/Users/ChangePass";
import EmailConfirm from "./components/Users/EmailConfirm";
import ScrollTop from "./components/ScrollTop";
import Docusign from "./components/Docusign";
import DisplayAuctions from "./components/Auctions/DisplayAuctions";
import Dashboard from "./components/Dashboard/Dashboard";
import { useHistory } from "react-router-dom";
import ButtontoTop from "./components/ButtontoTop";

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
    authService.getRegistStatus().then((res) => {
      dispatch(addRegistProp(res.data));
    });
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

  // useEffect(() => {
  //   colorChange();
  // }, []);

  return (
    <div className="App" style={{ background: bodyColor }}>
      <ButtontoTop />
      <Router>
        <Header color={color} change={change} />
        <ScrollTop />
        <Switch>
          {user._id && (
            <Route exact path="/MultiSellForm">
              <div className="sell-register-container">
                <MultiSellForm
                  colorChange={colorChange}
                  toogleShow={toogleShow}
                  bodyColorChange={bodyColorChange}
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
              />
            </div>
          </Route>

          <Route path="/DisplayAuctions/:id">
            <DisplayAuctions
              colorChange={colorChange}
              toogleChange={toogleChange}
            />
          </Route>
          {/* 
          <Route exact path="/dashboard/Auctions/SavedAuctions">
            <SavedAuctions colorChange={colorChange} />
          </Route> */}
          <Route exact path="/realEstates">
            <PropertyPages
              colorChange={colorChange}
              toogleChange={toogleChange}
            />
          </Route>
          <Route exact path="/Cars">
            <PropertyPages
              colorChange={colorChange}
              toogleChange={toogleChange}
            />
          </Route>
          <Route exact path="/Jets">
            <PropertyPages
              colorChange={colorChange}
              toogleChange={toogleChange}
            />
          </Route>
          <Route exact path="/Yachts">
            <PropertyPages
              colorChange={colorChange}
              toogleChange={toogleChange}
            />
          </Route>
          {user._id && (
            <Route path="/dashboard">
              <Dashboard
                toogleShow={toogleShow}
                colorChange={colorChange}
                toogleChange={toogleChange}
                bodyColorChange={bodyColorChange}
              />
            </Route>
          )}
          <Route path="/reset_password">
            <ChangePass colorChange={colorChange} toogleShow={toogleShow} />
          </Route>
          <Route path="/confirm_email">
            <EmailConfirm colorChange={colorChange} />
          </Route>
          <Route path="/docusign/callback/:envelopeId">
            <Docusign colorChange={colorChange} />
          </Route>

          <Route exact path="/">
            <ImgSlider />
            <Featured />
            <FindInCountries />
            <Upcoming />
            <Work />
            <RealEstate />
            <About />
          </Route>
        </Switch>
      </Router>
      {show ? <Footer /> : null}
    </div>
  );
}

export default App;
