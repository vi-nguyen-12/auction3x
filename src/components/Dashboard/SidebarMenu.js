import React from "react";
import * as AI from "react-icons/ai";
import * as MD from "react-icons/md";
import * as RI from "react-icons/ri";
import { RiAuctionFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const path = window.location.pathname;
export const SidebarMenu = [
  {
    name: "Dashboard",
    path: "/Dashboard",
    icon: <AI.AiFillHome color="#96a0af" size={30} />,
  },
  {
    name: "Messaging",
    path: "/Dashboard/Messaging",
    icon: <AI.AiFillMessage color="#96a0af" size={30} />,
  },
  {
    name: "Auctions",
    path: { path },
    icon: <RiAuctionFill color="#96a0af" size={30} />,
    iconClosed: <RI.RiArrowDropDownLine color="#c4c4c4" className="arrow" />,
    iconOpened: <RI.RiArrowDropUpLine color="#c4c4c4" className="arrow" />,
    subNav: [
      {
        name: "Saved Auctions",
        path: "/Dashboard/Auctions/SavedAuctions",
      },
      {
        name: "Pending Auctions",
        path: "/Dashboard/Auctions/PendingAuctions",
      },
      {
        name: "Bid Auctions",
        path: "/Dashboard/Auctions/BidAuctions",
      },
      {
        name: "Win Auctions",
        path: "/Dashboard/Auctions/WinAuctions",
      },
    ],
  },
  {
    name: "Your Listings",
    path: { path },
    icon: <RiAuctionFill color="#96a0af" size={30} />,
    iconClosed: <RI.RiArrowDropDownLine color="#c4c4c4" className="arrow" />,
    iconOpened: <RI.RiArrowDropUpLine color="#c4c4c4" className="arrow " />,
    subNav: [
      {
        name: "Pending Listings",
        path: "/Dashboard/Listings/PendingListings",
      },
      {
        name: "Auction Listings",
        path: "/Dashboard/Listings/LiveListings",
      },
      {
        name: "Sold Listings",
        path: "/Dashboard/Listings/SoldListings",
      },
    ],
  },
  {
    name: "Profile",
    path: "/Dashboard/Profile",
    icon: <CgProfile color="#96a0af" size={30} />,
  },
  {
    name: "Settings",
    path: "/Dashboard/Setting",
    icon: <AI.AiFillSetting color="#96a0af" size={30} />,
  },
];

export default SidebarMenu;
