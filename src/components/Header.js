import React from 'react';
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import { FaAlignJustify, FaGlobeAmericas } from 'react-icons/fa';

const Header = ({ handleSubmit, setSearch, search }) => {
  const location = useLocation();

  const HeaderComp = () => {

    return (
      <nav className="customNav navbar navbar-expand-lg p-0">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand mt-2" href="#">
          <Logo href="/">
            <div>
              <img src="/images/logo.png" />
            </div>
            <div style={{ marginTop: 5, marginLeft: 15 }}>
              <img src="/images/name.png" />
            </div>
          </Logo>
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav m-auto">
            <li className="nav-item navactive mt-2 p-2 mb-auto">
              <a className="nav-link" href="#" style={{ color: '#D58F5C' }}><b>Real Estate</b></a>
            </li>
            <li className="nav-item mt-2 px-4 py-2">
              <a className="nav-link" href="#" style={{ color: 'white' }}><b>Cars</b></a>
            </li>
            <li className="nav-item mt-2 px-4 py-2">
              <a className="nav-link" href="#" style={{ color: 'white' }}><b>Jets</b></a>
            </li>
            <li className="nav-item mt-2 px-4 py-2">
              <a className="nav-link" href="#" style={{ color: 'white' }}><b>Yachts</b></a>
            </li>
            <li className="nav-item mt-2 px-4 py-2">
              <a className="nav-link" href="#" style={{ color: 'white' }}><b>Others</b></a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav">
              <li className="nav-item mt-3 px-4 py-2">
                <a className="nav-link" href="#" style={{ color: 'white' }}><b>Sell</b></a>
              </li>
            </ul>
            <button className="bg-light customButton mt-2" type="submit">Sign In | Sign Up</button>
            <button className="bg-light customIcon mt-2 ml-2 iconsCubstom" type="submit">
              <div>
                <FaAlignJustify />
              </div>
            </button>
            <button className="bg-light customIcon mt-2 ml-2 iconsCubstom" type="submit">
              <div>
                <FaGlobeAmericas />
              </div>
            </button>
          </form>
        </div>
      </nav>
    )

  }

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Nav>
      <HeaderComp />
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.5);
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  padding: 0px 46px;
  z-index: 3;
  // flex-wrap: wrap;
`;

const Logo = styled.a`
  cursor: pointer;
  flex:1;
  display: flex;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-left: auto;
  margin-right: 25px;
  cursor: pointer;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
`;

const SearchContainer = styled.div`
display:flex;
  input {
    background: transparent;
    outline: none;
    border-top: none;
    border-left: none;
    border-right: none;
    flex:1;
    color: white;
  }

  img {
    width: 8%;
  }
`;


export default Header;
