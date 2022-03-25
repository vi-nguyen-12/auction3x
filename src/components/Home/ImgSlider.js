import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchBar from "./SearchBar.js";
import { BrowserRouter as Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { ImSearch } from "react-icons/im";
import "../../styles/Search.css";

const Carousel = styled(Slider)`
  height: 99vh;
  overflow: hidden;

  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      top: -22vh;
      font-size: 10px;
      color: white;
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
    width: 19vw;
    height: 100%;
  }

  .slick-next {
    right: -75px;
    width: 19vw;
    height: 100vh;
  }
`;

const Wrap = styled.div`
  //border-radius: 4px;
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 0;

    img {
      width: 100%;
      height: 100vh;
    }

    // &:hover {
    //   padding: 0;
    //   // border: 4px solid rgba(249, 249, 249, 0.8);
    //   transition-duration: 300ms;
    // }
  }
`;

const HomeBottom = styled.div`
  position: absolute;
  bottom: 20vh;
  z-index: 1;
  left: 5vw;
  a {
    color: white !important;
    font-size: 24px;
    font-weight: bolder;
    box-shadow: none !important;
  }
  span {
    color: white;
    font-size: 14px;
    font-weight: bolder;
  }
`;

const ImgSlider = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const property = useSelector((state) => state.property);
  const auction = useSelector((state) => state.auction);

  return (
    <div>
      {property.length > 0 ? (
        <>
          <Carousel {...settings}>
            {property.slice(0, 5).map((item, index) => (
              // <Link to={`/Display/${item._id}`} key={item._id}>
              <Wrap key={index}>
                <a href={`/DisplayAuctions/${item._id}`}>
                  <img src={item.property.images[0].url} alt="" />
                </a>
                <HomeBottom>
                  <h2>
                    <NumberFormat
                      style={{ fontSize: "50px", color: "white" }}
                      value={item.startingBid}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </h2>
                  <span style={{ color: "white", fontSize: "20px" }}>
                    HOUSE IN {item.property.details.property_address.city},
                    {item.property.details.property_address.state} UNITED STATES
                  </span>
                </HomeBottom>
              </Wrap>
              // </Link>
            ))}
          </Carousel>
          <div className="col-12 filterContainer px-lg-5 d-none d-lg-block">
            <div className="row px-lg-5">
              {/* <div className="col-12 col-sm-6 col-md-2 mt-3">
                <div className="dropdown w-100">
                  <button
                    className="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="pr-5">All Property</span>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-12 col-sm-6 col-md-2 mt-3">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="pr-5">All Categories</span>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-12 col-sm-6 col-md-2 mt-3">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="pr-5">All Countries</span>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div>
              </div> */}
              <div className="search-box col-12 col-sm-6 col-md-4 mt-3">
                <div className="form-group">
                  <SearchBar />
                </div>
                <button type="submit">
                  <ImSearch />
                </button>
              </div>
              {/* <div className="col-12 col-sm-6 col-md-1 mt-3">

              </div> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <Carousel {...settings}>
            {auction.slice(0, 5).map((item, index) => (
              // <Link to={`/Display/${item._id}`} key={item._id}>
              <Wrap key={index}>
                <a href={`/DisplayAuctions/${item._id}`}>
                  <img src={item.property.images[0].url} alt="" />
                </a>
                <HomeBottom>
                  <h2>
                    <NumberFormat
                      style={{ fontSize: "50px", color: "white" }}
                      value={item.startingBid}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </h2>
                  <span style={{ color: "white", fontSize: "20px" }}>
                    HOUSE IN {item.property.details.property_address.city},
                    {item.property.details.property_address.state} UNITED STATES
                  </span>
                </HomeBottom>
              </Wrap>
              // </Link>
            ))}
          </Carousel>
          <div className="col-12 filterContainer px-lg-5 d-none d-lg-block">
            <div className="row px-lg-5">
              {/* <div className="col-12 col-sm-6 col-md-2 mt-3">
                <div className="dropdown w-100">
                  <button
                    className="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="pr-5">All Property</span>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-12 col-sm-6 col-md-2 mt-3">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="pr-5">All Categories</span>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-12 col-sm-6 col-md-2 mt-3">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="pr-5">All Countries</span>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div>
              </div> */}
              <div className="search-box col-12 col-sm-6 col-md-4 mt-3">
                <div className="form-group">
                  <SearchBar />
                </div>
                <button type="submit">
                  <ImSearch />
                </button>
              </div>
              {/* <div className="col-12 col-sm-6 col-md-1 mt-3">

              </div> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImgSlider;
