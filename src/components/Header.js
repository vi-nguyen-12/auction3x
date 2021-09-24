import React from 'react'
import styled from 'styled-components'
import { FaAlignJustify, FaGlobeAmericas } from 'react-icons/fa'

const Header = () => {
	const HeaderComp = () => {
		return (
			<nav className='customNav navbar navbar-expand-lg p-0'>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarTogglerDemo03'
					aria-controls='navbarTogglerDemo03'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<a className='navbar-brand mt-2' href='#'>
					<Logo href='/'>
						<div>
							<img src='/images/logo.png' />
						</div>
						<div style={{ marginTop: 5, marginLeft: 15 }}>
							<img src='/images/name.png' />
						</div>
					</Logo>
				</a>

				<div className='collapse navbar-collapse' id='navbarTogglerDemo03'>
					<ul className='navbar-nav m-auto'>
						<li className='nav-item navactive mt-2 p-2 mb-auto'>
							<a className='nav-link' href='#' style={{ color: '#D58F5C' }}>
								<b>Real Estate</b>
							</a>
						</li>
						<li className='nav-item mt-2 px-4 py-2'>
							<a className='nav-link' href='#' style={{ color: 'white' }}>
								<b>Cars</b>
							</a>
						</li>
						<li className='nav-item mt-2 px-4 py-2'>
							<a className='nav-link' href='#' style={{ color: 'white' }}>
								<b>Jets</b>
							</a>
						</li>
						<li className='nav-item mt-2 px-4 py-2'>
							<a className='nav-link' href='#' style={{ color: 'white' }}>
								<b>Yachts</b>
							</a>
						</li>
						<li className='nav-item mt-2 px-4 py-2'>
							<a className='nav-link' href='#' style={{ color: 'white' }}>
								<b>Others</b>
							</a>
						</li>
					</ul>
					<form
						className='form-inline my-2 my-lg-0'
						style={{ display: 'flex', paddingTop: 5 }}
					>
						<a
							className='nav-link'
							href='#'
							style={{ color: 'white', marginTop: 5 }}
						>
							<b>Sell</b>
						</a>
						<button
							className='bg-light customButton mt-2'
							type='submit'
							style={{ marginLeft: 10 }}
						>
							Sign In | Sign Up
						</button>
						<button
							className='bg-light customIcon mt-2 ml-2 iconsCubstom'
							type='submit'
							style={{ marginLeft: 10 }}
						>
							<div>
								<FaAlignJustify />
							</div>
						</button>
						<button
							className='bg-light customIcon mt-2 ml-2 iconsCubstom'
							type='submit'
							style={{ marginLeft: 10 }}
						>
							<div>
								<FaGlobeAmericas />
							</div>
						</button>
					</form>
				</div>
			</nav>
		)
	}

	return (
		<Nav>
			<HeaderComp />
		</Nav>
	)
}

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
`

const Logo = styled.a`
	cursor: pointer;
	flex: 1;
	display: flex;

	@media (max-width: 768px) {
		text-align: center;
	}
`

export default Header
