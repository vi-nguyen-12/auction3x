import React from "react";
import * as RI from "react-icons/ri";
import { RiAuctionFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";
import { RiMessage2Fill } from "react-icons/ri";
import { IoGrid } from "react-icons/io5";

const path = window.location.pathname;
export const SidebarMenu = [
  {
    name: "Dashboard",
    path: "/Dashboard",
    icon: <IoGrid size={30} />,
  },
  {
    name: "Messaging",
    path: "/Dashboard/Messaging",
    icon: <RiMessage2Fill size={30} />,
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
    icon: <IoMdListBox size={30} />,
    iconClosed: <RI.RiArrowDropDownLine color="#c4c4c4" className="arrow" />,
    iconOpened: <RI.RiArrowDropUpLine color="#c4c4c4" className="arrow " />,
    subNav: [
      {
        name: "Pending Approval",
        path: "/Dashboard/Listings/PendingApproval",
      },
      {
        name: "Your Listings",
        path: "/Dashboard/Listings/YourListings",
      },
      {
        name: "Sold Properties",
        path: "/Dashboard/Listings/SoldListings",
      },
      {
        name: "Incomplete Process",
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
