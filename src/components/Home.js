import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Featured } from "./Featured";
import { FindInCountries } from "./FindInCountries";
import Header from "./Header";
import ImgSlider from "./ImgSlider";
import Work from "./Home/work";
import RealEstate from "./Home/realEstate";
import Footer from "./Home/footer";
import { Upcoming } from "./Upcoming";
import MultiSellForm from "../SellRegister/MultiSellForm";
import RealEstates from "../RealEstate/RealEstates";
import About from "../components/Home/About";
import ChangePass from "../components/ChangePass";
import EmailConfirm from "../components/EmailConfirm";
import { useState } from "react";
import { useSelector } from "react-redux";

const Home = (props) => {
  // const property = useSelector(state => state.property);
  const [color, setColor] = useState("");

  const colorChange = (color) => {
    setColor(color);
  };

  return (
    <>
      <Router>
        <Switch>
          <Header color={color} />
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

          <Route exact path="/RealEstates">
            <RealEstates colorChange={colorChange} />
          </Route>
          <Route path="/reset_password">
            <ChangePass colorChange={colorChange} />
          </Route>
          <Route path="/confirm_email">
            <EmailConfirm colorChange={colorChange} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </>
  );
};

export default Home;
