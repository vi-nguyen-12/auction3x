import React from "react";
import { Col } from "react-bootstrap";
import "react-circular-progressbar/dist/styles.css";
import SavedAuctionsCard from "../../Auctions/SavedAuctionsCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

const Carousel = styled(Slider)`
  // height: 30vh;
  // overflow: hidden;

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

function ApprovedAuctionsComp({ approvedAuctions }) {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: approvedAuctions.length > 3 ? 3 : approvedAuctions.length,
  };
  return (
    <>
      <Carousel {...settings}>
        {approvedAuctions.map((property, index) => (
          <Wrap key={index}>
            <Col md={12}>
              <SavedAuctionsCard
                url={property.property.images[0].url}
                urls={property.property.images}
                data={property.property.details}
                id={property._id}
                auctionStartDate={property.auctionStartDate}
                auctionEndDate={property.auctionEndDate}
                startingBid={
                  property.highestBid
                    ? property.highestBid
                    : property.startingBid
                }
                auctionId={property._id}
              />
            </Col>
          </Wrap>
        ))}
      </Carousel>
    </>
  );
}

export default ApprovedAuctionsComp;
