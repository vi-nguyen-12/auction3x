import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import Profile from "./Pages/Profile";
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
import IncompleteListing from "./Pages/Listings/IncompleteListing";

function Dashboard({ toogleChange, toogleShow }) {
  useEffect(() => {
    toogleChange();
    toogleShow();
  }, []);
  const location = useLocation();
  const path = window.location.pathname;
  const [isAuthenticated, setisAuthenticated] = useState(false);
  useEffect(() => {
    let auth_token = document.cookie.split("=")[1];
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <Router>
        <Sidebar path={path} />
        <div
          style={{
            display: "-moz-initial",
            margin: "0 auto",
            marginTop: "105px",
          }}
        >
          <DashHeader location={location.pathname.split("/")[1]} />
          <Switch>
            <Route exact path="/dashboard" component={Dash} />
            <Route exact path="/dashboard/Messaging" component={Messaging} />
            <Route
              exact
              path="/dashboard/Auctions/BidAuctions"
              component={BidAuctions}
            />
            <Route
              exact
              path="/dashboard/Auctions/PendingAuctions"
              component={PendingAuctions}
            />
            <Route
              exact
              path="/dashboard/Auctions/SavedAuctions"
              component={SavedAuctions}
            />
            <Route
              exact
              path="/dashboard/Auctions/WinAuctions"
              component={WinAuctions}
            />
            <Route
              exact
              path="/dashboard/Listings/AuctionListings"
              component={LiveListings}
            />
            <Route
              exact
              path="/dashboard/Listings/PendingApproval"
              component={PendingListings}
            />
            <Route
              exact
              path="/dashboard/Listings/SoldListings"
              component={SoldListings}
            />
            <Route
              exact
              path="/dashboard/Listings/IncompleteListing"
              component={IncompleteListing}
            />
            <Route exact path="/dashboard/Profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default Dashboard;
