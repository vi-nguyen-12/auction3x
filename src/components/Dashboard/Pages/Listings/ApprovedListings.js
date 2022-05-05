import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "../Auctions/SavedAuctionsCard";
import { CarCard } from "../../../Cards/CarCard";
import { JetCard } from "../../../Cards/JetCard";
import { YachtCard } from "../../../Cards/YachtCard";
import { CardComp } from "../../../Cards/RealEstateCard";
import { UpcomingRealEtateCard } from "../../../Cards/UpcomingRealEtateCard";
import { UpcomingCarCard } from "../../../Cards/UpcomingCarCard";
import { UpcomingJetCard } from "../../../Cards/UpcomingJetCard";
import { UpcomingYachtCard } from "../../../Cards/UpcomingYachtCard";
import authService from "../../../../services/authServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

const Carousel = styled(Slider)`
  height: 100%;
  overflow: hidden;

  & > button {
    opacity: 1;
    height: 100%;
    width: 15vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      top: -3vh;
      font-size: 20px;
      color: gray;
      left: -35px;
    }
  }

  li.slick-active button:before {
    color: #e9af84;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
    width: 12vw;
    height: 100%;
  }

  .slick-prev:before {
    color: #e9af84;
    font-size: 50px;
  }

  .slick-next {
    right: -75px;
    width: 12vw;
    height: 100%;
  }

  .slick-next:before {
    color: #e9af84;
    font-size: 50px;
  }
`;

const Wrap = styled.div`
border-radius: 4px;
cursor: pointer;
position: relative;


  &:hover {
    padding: 0;
    // border: 4px solid rgba(249, 249, 249, 0.8);
    transition-duration: 300ms;
  }
}
`;

function ApprovedListings({ auctions }) {
  const user = useSelector((state) => state.user);
  const [approvedLists, setApprovedLists] = useState([]);

  useEffect(() => {
    authService.sellerPropInAuctions(user._id).then((res) => {
      setApprovedLists(res.data);
    });
  }, []);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: approvedLists.length > 2 ? 2 : approvedLists.length,
  };

  return (
    <Container>
      {approvedLists.length > 0 && (
        <>
          <h1>Approved Listings</h1>
          <Row>
            <Carousel {...settings}>
              {approvedLists.map((property, index) => (
                <Wrap key={index}>
                  <Col>
                    <SavedAuctionsCard
                      url={property.images[0].url}
                      type={property.type}
                      data={property.details}
                      id={property.auctionDetails._id}
                      auctionStartDate={
                        property.auctionDetails.auctionStartDate
                      }
                      auctionEndDate={property.auctionDetails.auctionEndDate}
                      startRegister={property.auctionDetails.registerStartDate}
                      endRegister={property.auctionDetails.registerEndDate}
                      startingBid={property.auctionDetails.startingBid}
                    />
                  </Col>
                </Wrap>
              ))}
            </Carousel>
          </Row>
        </>
      )}
    </Container>
  );
}

export default ApprovedListings;
