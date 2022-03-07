import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import Profile from "./Pages/Profile";
import Setting from "./Pages/Setting";
import BidAuctions from "./Pages/Auctions/BidAuctions";
import SavedAuctions from "./Pages/Auctions/SavedAuctions";
import PendingAuctions from "./Pages/Auctions/PendingAuctions";
import WinAuctions from "./Pages/Auctions/WinAuctions";
import LiveListings from "./Pages/Listings/LiveListings";
import PendingListings from "./Pages/Listings/PendingListings";
import SoldListings from "./Pages/Listings/SoldListings";
import Dash from "./Pages/Dash";
import Messaging from "./Pages/Messaging";
import DashHeader from "./DashHeader";

function Dashboard({ colorChange, toogleChange, toogleShow }) {
  useEffect(() => {
    colorChange("black");
    toogleChange();
    toogleShow();
  }, []);
  const location = useLocation();
  return (
    <div style={{ display: "flex" }}>
      <Router>
        <Sidebar />
        <div
          style={{
            display: "-moz-initial",
            margin: "0 auto",
            marginTop: "105px",
          }}
        >
          <DashHeader location={location.pathname.split("/")[1]} />
          <Switch>
            <Route exact path="/Dashboard" component={Dash} />
            <Route exact path="/Dashboard/Messaging" component={Messaging} />
            <Route exact path="/BidAuctions" component={BidAuctions} />
            <Route exact path="/PendingAuctions" component={PendingAuctions} />
            <Route exact path="/SavedAuctions" component={SavedAuctions} />
            <Route exact path="/WinAuctions" component={WinAuctions} />
            <Route exact path="/LiveListings" component={LiveListings} />
            <Route exact path="/PendingListings" component={PendingListings} />
            <Route exact path="/SoldListings" component={SoldListings} />
            <Route exact path="/Dashboard/Profile" component={Profile} />
            <Route exact path="/Dashboard/Setting" component={Setting} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default Dashboard;
