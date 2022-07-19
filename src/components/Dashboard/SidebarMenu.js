import React from "react";
import * as AI from "react-icons/ai";
import * as RI from "react-icons/ri";
import { RiAuctionFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

const path = window.location.pathname;
export const SidebarMenu = [
  {
    name: "Dashboard",
    path: "/Dashboard",
    icon: <AI.AiFillHome size={30} />,
  },
  {
    name: "Messaging",
    path: "/Dashboard/Messaging",
    icon: <AI.AiFillMessage size={30} />,
  },
  {
    name: "Auctions",
    path: { path },
    icon: <RiAuctionFill size={30} />,
    iconClosed: <RI.RiArrowDropDownLine color="#c4c4c4" className="arrow" />,
    iconOpened: <RI.RiArrowDropUpLine color="#c4c4c4" className="arrow" />,
    subNav: [
      {
        name: "Saved Auctions",
        path: "/Dashboard/Auctions/SavedAuctions",
      },
      {
        name: "Buyer Approval",
        path: "/Dashboard/Auctions/BuyerApproval",
      },
      {
        name: "Bid Auctions",
        path: "/Dashboard/Auctions/BidAuctions",
      },
      {
        name: "Won Auctions",
        path: "/Dashboard/Auctions/WinAuctions",
      },
    ],
  },
  {
    name: "Your Listings",
    path: { path },
    icon: <RiAuctionFill size={30} />,
    iconClosed: <RI.RiArrowDropDownLine color="#c4c4c4" className="arrow" />,
    iconOpened: <RI.RiArrowDropUpLine color="#c4c4c4" className="arrow " />,
    subNav: [
      {
        name: "Pending Approval",
        path: "/Dashboard/Listings/PendingApproval",
      },
      {
        name: "Auction Listings",
        path: "/Dashboard/Listings/AuctionListings",
      },
      {
        name: "Sold Listings",
        path: "/Dashboard/Listings/SoldListings",
      },
      {
        name: "Incomplete Listings",
        path: "/Dashboard/Listings/IncompleteListing",
      },
    ],
  },
  {
    name: "Profile",
    path: "/Dashboard/Profile",
    icon: <FaUserCircle size={30} />,
  },
];

export default SidebarMenu;
