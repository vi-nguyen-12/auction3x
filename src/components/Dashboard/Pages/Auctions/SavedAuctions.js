import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ErrorPage from "../../../Error/404page";
import Loading from "../../../Loading";
import SavedAuctionsCard from "./SavedAuctionsCard";
import authService from "../../../../services/authServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

const Carousel_3 = styled(Slider)`
  height: 100vh;
  overflow-x: hidden;

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
    height: 150px;
    z-index: 1;
    background: url("./images/back-icon.png") center center no-repeat;
    margin: -50px;
  }

  .slick-prev:before {
    display: none;
  }

  .slick-next {
    height: 150px;
    z-index: 1;
    background: url("./images/next-icon.png") center center no-repeat;
    margin: -50px;
  }

  .slick-next:before {
    display: none;
  }
`;

const Wrap = styled.div`
border-radius: 4px;
cursor: pointer;
position: relative;
display: flex;
justify-content: center;
align-items: center;
align-content: center;
// margin-top: auto;  // Just for display

  &:hover {
    padding: 0;
    // border: 4px solid rgba(249, 249, 249, 0.8);
    transition-duration: 300ms;
  }
}
`;

function SavedAuctions({ windowSize, searchBy, search }) {
  const user = useSelector((state) => state.user);
  const [SavedAuctions, setSavedAuctions] = useState([]);
  const [newSavedAuctions, setNewSavedAuctions] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchSavedAuctions = async () => {
      await authService.getSavedProperties(user._id).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setSavedAuctions(res.data);
          setNewSavedAuctions(res.data);
          setLoader(false);
        }
      });
    };
    fetchSavedAuctions();
  }, [user._id]);

  useEffect(() => {
    if (search !== undefined || search !== "") {
      if (searchBy === "id") {
        setNewSavedAuctions(
          SavedAuctions.filter((listing) =>
            listing._id?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "propType") {
        setNewSavedAuctions(
          SavedAuctions.filter((listing) =>
            listing.property.type?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "address") {
        setNewSavedAuctions(
          SavedAuctions.filter((listing) =>
            listing.property.details?.property_address?.formatted_street_address
              ?.toLowerCase()
              .includes(search.toLowerCase())
          )
        );
      }
    } else {
      setNewSavedAuctions(SavedAuctions);
    }
  }, [search]);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize > 800
        ? newSavedAuctions.length > 2
          ? 2
          : newSavedAuctions.length
        : 1,
  };

  return (
    <Container style={{ width: "100vw", height: "100vh", marginTop: "50px" }}>
      {loader && <Loading />}
      <Row>
        {newSavedAuctions.length > 0 ? (
          <Carousel_3 {...settings}>
            {newSavedAuctions.map((auction, index) => (
              <Wrap key={index}>
                <SavedAuctionsCard
                  url={auction.property.images[0].url}
                  urls={auction.property.images}
                  data={auction.property.details}
                  id={auction._id}
                  auctionStartDate={auction.auctionStartDate}
                  auctionEndDate={auction.auctionEndDate}
                  startingBid={auction.startingBid}
                  auctionId={auction._id}
                  type={auction.property.type}
                  windowSize={windowSize}
                />
              </Wrap>
            ))}
          </Carousel_3>
        ) : !loader ? (
          <ErrorPage />
        ) : null}
      </Row>
    </Container>
  );
}

export default SavedAuctions;
