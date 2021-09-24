import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <Carousel {...settings}>
        <Wrap>
          <a>
            <img src="/images/Masterfully-Conceptual-Design-of-Emirates-Hills-Luxury-Mansion-in-Dubai-1 1.png" alt="" />
          </a>
          <HomeBottom>
            <a>
              $254,562,143
            </a>
            <span>
              HOUSE IN OAKTON, VIRGINIA, UNITED STATES
            </span>
          </HomeBottom>
        </Wrap>

        <Wrap>
          <a>
            <img src="/images/Masterfully-Conceptual-Design-of-Emirates-Hills-Luxury-Mansion-in-Dubai-1 1.png" alt="" />
          </a>
          <HomeBottom>
            <a>
              $254,562,143
            </a>
            <span>
              HOUSE IN OAKTON, VIRGINIA, UNITED STATES
            </span>
          </HomeBottom>
        </Wrap>

        <Wrap>
          <a>
            <img src="/images/Masterfully-Conceptual-Design-of-Emirates-Hills-Luxury-Mansion-in-Dubai-1 1.png" alt="" />
          </a>
          <HomeBottom>
            <a>
              $254,562,143
            </a>
            <span>
              HOUSE IN OAKTON, VIRGINIA, UNITED STATES
            </span>
          </HomeBottom>
        </Wrap>

        <Wrap>
          <a>
            <img src="/images/Masterfully-Conceptual-Design-of-Emirates-Hills-Luxury-Mansion-in-Dubai-1 1.png" alt="" />
          </a>
          <HomeBottom>
            <a>
              $254,562,143
            </a>
            <span>
              HOUSE IN OAKTON, VIRGINIA, UNITED STATES
            </span>
          </HomeBottom>
        </Wrap>
      </Carousel>
      <div className="col-12 filterContainer px-lg-5 d-none d-lg-block">
        <div className="row px-lg-5">
          <div className="col-12 col-sm-6 col-md-2 mt-3">
            <div class="dropdown w-100">
              <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="pr-5">
                  All Property
                </span>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-2 mt-3">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="pr-5">
                  All Categories
                </span>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-2 mt-3">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="pr-5">
                  All Countries
                </span>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mt-3">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="State, City, Zip, Title, Property ID, etc" />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-1 mt-3">
          <button class="bg-light customButton w-100" type="submit">Search</button>
          </div>
        </div>
      </div>
    </>
  );
};

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
  }

  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;

    img {
      width: 100%;
      height: 100vh;
    }

    &:hover {
      padding: 0;
      // border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
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

const FilterMenu = styled.div`
position: absolute;
bottom: 10vh;
z-index: 1;
left: 5vw;
width: 90vw;
`;

const FilterContainer = styled.div`
display: flex;
width: 100%;
`;

const Flex1 = styled.div`
flex:1;
padding-right: 30px;
`;

const Flex2 = styled.div`
flex:5;
padding-right: 30px;
`;

export default ImgSlider;
