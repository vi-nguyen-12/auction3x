import Home from "./components/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./slice/userSlice";
import MultiSellForm from "./SellRegister/MultiSellForm";
import Display from "./RealEstate/Display";
import DisplayHeader from "./RealEstate/DisplayHeader";
import DisplayTab from "./RealEstate/DisplayTab";
import Footer from "./components/Home/footer";
import { Featured } from "./components/Featured";
import SellRegisterHeader from "./SellRegister/SellRegisterHeader";
import { addProperty } from "./slice/propertySlice";
import authService from "./services/authServices";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const authToken = Cookies.get("auth-token");
    if (authToken) {
      const getUser = async () => {
        const response = await authService.getUsers(authToken);
        console.log(response);
        if (response.data.message === "User Logged In") {
          dispatch(login(response.data.user));
        }
      };
      getUser();
    }

    authService.getProperties().then((res) => {
      dispatch(addProperty(res.data.data[0]));
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/MultiSellForm">
            <div className="sell-register-container">
              <SellRegisterHeader />
              <MultiSellForm />
            </div>
          </Route>
          <Route exact path="/Display">
            <DisplayHeader />
            <Display />
            <DisplayTab />
            <Featured />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
