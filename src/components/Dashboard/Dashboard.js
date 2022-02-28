import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

function Dashboard() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route exact path="/Dash" component={Dash} />
        <Route exact path="/Messaging" component={Messaging} />
        <Route exact path="/BidAuctions" exact component={BidAuctions} />
        <Route exact path="/PendingAuctions" component={PendingAuctions} />
        <Route exact path="/SavedAuctions" component={SavedAuctions} />
        <Route exact path="/WinAuctions" component={WinAuctions} />
        <Route exact path="/LiveListings" component={LiveListings} />
        <Route exact path="/PendingListings" component={PendingListings} />
        <Route exact path="/SoldListings" component={SoldListings} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/Setting" component={Setting} />
      </Switch>
    </Router>
  );
}

export default Dashboard;
