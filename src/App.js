import Home from "./components/Home";
import ImgSlider from "./components/ImgSlider";
import { FindInCountries } from "./components/FindInCountries";
import { Upcoming } from "./components/Upcoming";
import Work from "./components/Home/work";
import RealEstate from "./components/Home/realEstate";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./slice/userSlice";
import MultiSellForm from "./SellRegister/MultiSellForm";
import Display from "./RealEstate/Display";
import AuctionDisplay from "./RealEstate/AuctionDisplay";
import Footer from "./components/Home/footer";
import { Featured } from "./components/Featured";
import { addProperty } from "./slice/propertySlice";
import { addAuction } from "./slice/auctionSlice";
import authService from "./services/authServices";
import Header from "./components/Header";
import RealEstates from "./RealEstate/RealEstates";
import AuctionCard from "./components/Auction/auctionCard";
import About from "./components/Home/About";
import { addRegistProp } from "./slice/registPropertySlice";
import ChangePass from "./components/ChangePass";
import EmailConfirm from "./components/EmailConfirm";
import DisplayAuctions from "./RealEstate/DisplayAuctions";
import DisplayUpcomings from "./RealEstate/DisplayUpcomings";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const authToken = document.cookie.split("=")[1];
    if (authToken) {
      const getUser = async () => {
        const response = await authService.getUsers(authToken);
        if (response.data.message === "User Logged In") {
          dispatch(login(response.data.user));
        }
      };
      getUser();
    }
  }, []);

  // authService.getProperties().then((res) => {
  //   dispatch(addProperty(res.data.data));
  // });

  // authService.getAuction().then((res) => {
  //   dispatch(addAuction(res.data));
  // });

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
  }

  const [color, setColor] = useState("");

  const colorChange = (color) => {
    setColor(color);
  };

  // useEffect(() => {
  //   colorChange();
  // }, []);

  return (
    <div className="App">
      <Header color={color} />
      <Router>
        <Switch>
          <Route exact path="/">
            <ImgSlider />
            <Featured />
            <FindInCountries />
            <Upcoming />
            <Work />
            <RealEstate />
            <About />
          </Route>
          <Route exact path="/MultiSellForm">
            <div className="sell-register-container">
              <MultiSellForm colorChange={colorChange} />
            </div>
          </Route>
          <Route path="/Display/:id">
            <Display colorChange={colorChange} />
            <Featured />
          </Route>
          <Route path="/AuctionDisplay/:id">
            <AuctionDisplay colorChange={colorChange} />
            <Featured />
          </Route>
          <Route exact path="/RealEstates">
            <RealEstates colorChange={colorChange} />
          </Route>
          <Route path="/reset_password">
            <ChangePass colorChange={colorChange} />
          </Route>
          <Route path="/confirm_email">
            <EmailConfirm colorChange={colorChange} />
          </Route>
          <Route path="/DisplayAuctions/:id">
            <DisplayAuctions colorChange={colorChange} />
            <Featured />
          </Route>
          <Route path="/DisplayUpcomings/:id">
            <DisplayUpcomings colorChange={colorChange} />
            <Featured />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
