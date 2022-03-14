import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BrowserRouter as Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { ImSearch } from "react-icons/im";
import ImgSlider from "../Home/ImgSlider.js";
import { Featured } from "../Home/Featured.js";
import { FindInCountries } from "../Home/FindInCountries";
// import { Upcoming } from "..Home/Upcoming";
import Work from "../Home/work";
// import { RealEstate } from "../Home/RealEstate";
import About from "../Home/About.js";
import "../../styles/Search.css";

const CarPage = ({ colorChange, toogleChange }) => {
    return (
        <>
            <ImgSlider />
            <Featured />
            <FindInCountries />
            {/* <Upcoming /> */}
            <Work />
            {/* <RealEstate /> */}
            <About />
        </>
    )
}

export default CarPage;