import Home from "./components/Home";
import ImgSlider from "./components/ImgSlider";
import { FindInCountries } from "./components/FindInCountries";
import { Upcoming } from "./components/Upcoming";
import Work from "./components/Home/work";
import RealEstate from "./components/Home/realEstate";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./slice/userSlice";
import MultiSellForm from "./SellRegister/MultiSellForm";
import Display from "./RealEstate/Display";
import DisplayAuction from "./components/Auction/displayAuction";
import DisplayTab from "./RealEstate/DisplayTab";
import Footer from "./components/Home/footer";
import { Featured } from "./components/Featured";
import { addProperty } from "./slice/propertySlice";
import { addAuction } from "./slice/auctionSlice";
import authService from "./services/authServices";
import Header from "./components/Header";
import RealEstates from "./RealEstate/RealEstates";
import AuctionCard from "./components/Auction/auctionCard";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const authToken = Cookies.get("auth-token");
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

  authService.getProperties().then((res) => {
    dispatch(addProperty(res.data.data));
  });

  authService.getAuction().then((res) => {
    dispatch(addAuction(res.data));
  });

  const [color, setColor] = useState("");

  const colorChange = (color) => {
    setColor(color);
  };

  return (
    <div className="App">
      <Header color={color} />
      <Router>
        <Switch>
          <Route exact path="/">
            <ImgSlider />
            <Featured />
            <FindInCountries />
            <AuctionCard />
            <Upcoming />
            <Work />
            <RealEstate />
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
          <Route path="/DisplayAuction/:id">
            <DisplayAuction colorChange={colorChange} />
            <Featured />
          </Route>
          <Route exact path="/RealEstates">
            <RealEstates colorChange={colorChange} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
