import React from 'react';
import * as AI from 'react-icons/ai';
import * as MD from 'react-icons/md';
import * as RI from 'react-icons/ri';
import { RiAuctionFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

const path = window.location.pathname;
export const SidebarMenu = [
    {
        name: 'Dashboard',
        path: '/Dashboard',
        icon: <AI.AiFillHome />,
    },
    {
        name: 'Messaging',
        path: '/Messaging',
        icon: <AI.AiFillMessage />,
    },
    {
        name: 'Auctions',
        path: { path },
        icon: <RiAuctionFill />,
        iconClosed: <RI.RiArrowDropDownLine className='arrow' />,
        iconOpened: <RI.RiArrowDropUpLine className='arrow' />,
        subNav: [
            {
                name: 'Saved Auctions',
                path: '/Auctions/SavedAuctions',

            },
            {
                name: 'Pending Auctions',
                path: '/Auctions/PendingAuctions',

            },
            {
                name: 'Bid Auctions',
                path: '/Auctions/BidAuctions',

            },
            {
                name: 'Win Auctions',
                path: '/Auctions/WinAuctions',

            },
        ]
    },
    {
        name: 'Your Listings',
        path: { path },
        icon: <RiAuctionFill />,
        iconClosed: <RI.RiArrowDropDownLine className='arrow' />,
        iconOpened: <RI.RiArrowDropUpLine className='arrow ' />,
        subNav: [
            {
                name: 'Pending Listings',
                path: '/Listings/PendingListings',

            },
            {
                name: 'Live Listings',
                path: '/Listings/LiveListings',

            },
            {
                name: 'Sold Listings',
                path: '/Listings/SoldListings',

            },
        ]
    },
    {
        name: 'Profile',
        path: '/Profile',
        icon: <CgProfile />,
    },
    {
        name: 'Settings',
        path: '/Settings',
        icon: <AI.AiFillSetting />,
    },
]

export default SidebarMenu;
