import axios from "axios";
import Home from "./components/Home";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";import { useEffect } from "react";
import {useDispatch} from "react-redux";
import {login} from "./slice/userSlice";
import MultiSellForm from "./SellRegister/MultiSellForm";

function App() {
 
  const dispatch=useDispatch();
  useEffect(()=>{
    const authToken = Cookies.get('auth-token');
    if(authToken) {
      const getUser=async()=>{
          const response = await axios.post('http://localhost:5000/api/user/checkJWT', {
            authToken 
          }, {withCredentials: true}); 
          console.log(response);
          if(response.data.message==="User Logged In"){ 
      
                dispatch(login(response.data.user));
          }
    }
    getUser()
  }
  },[])
 
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/MultiSellForm">
            <MultiSellForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
