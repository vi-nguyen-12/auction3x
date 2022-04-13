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
    path: "/dashboard",
    icon: <AI.AiFillHome size={30} />,
  },
  {
    name: "Messaging",
    path: "/dashboard/Messaging",
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
        path: "/dashboard/Auctions/SavedAuctions",
      },
      {
        name: "Pending Auctions",
        path: "/dashboard/Auctions/PendingAuctions",
      },
      {
        name: "Bid Auctions",
        path: "/dashboard/Auctions/BidAuctions",
      },
      {
        name: "Win Auctions",
        path: "/dashboard/Auctions/WinAuctions",
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
        path: "/dashboard/Listings/PendingApproval",
      },
      {
        name: "Auction Listings",
        path: "/dashboard/Listings/AuctionListings",
      },
      {
        name: "Sold Listings",
        path: "/dashboard/Listings/SoldListings",
      },
      {
        name: "Incomplete Listing",
        path: "/dashboard/Listings/IncompleteListing",
      },
    ],
  },
  {
    name: "Profile",
    path: "/dashboard/Profile",
    icon: <CgProfile size={30} />,
  },
];

export default SidebarMenu;
