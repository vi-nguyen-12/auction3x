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

function Dashboard({ toogleChange, toogleShow, colorChange }) {
  useEffect(() => {
    colorChange("#282828");
    toogleChange();
    toogleShow();
  }, []);
  const location = useLocation();
  const path = window.location.pathname;
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
            <Route exact path="/Dashboard" component={Dash} />
            <Route exact path="/Dashboard/Messaging" component={Messaging} />
            <Route
              exact
              path="/Dashboard/Auctions/BidAuctions"
              component={BidAuctions}
            />
            <Route
              exact
              path="/Dashboard/Auctions/PendingAuctions"
              component={PendingAuctions}
            />
            <Route
              exact
              path="/Dashboard/Auctions/SavedAuctions"
              component={SavedAuctions}
            />
            <Route
              exact
              path="/Dashboard/Auctions/WinAuctions"
              component={WinAuctions}
            />
            <Route
              exact
              path="/Dashboard/Listings/AuctionListings"
              component={LiveListings}
            />
            <Route
              exact
              path="/Dashboard/Listings/PendingApproval"
              component={PendingListings}
            />
            <Route
              exact
              path="/Dashboard/Listings/SoldListings"
              component={SoldListings}
            />
            <Route
              exact
              path="/Dashboard/Listings/IncompleteListing"
              component={IncompleteListing}
            />
            <Route exact path="/Dashboard/Profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default Dashboard;
