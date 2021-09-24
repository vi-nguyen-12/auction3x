import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import '../../styles/real-estate.css'

const RealEstate = (props) => {
	return (
        <section className='real-estate-wrap'>
            <div className='real-estate'>
                <div className='btn-group'>
                    <Button> Real Estate</Button>
                    <Button> Cars</Button>
                    <Button> Yachts</Button>
                    <Button> Jets</Button>
                    <Button> Jewels</Button>
                </div>
                <div className='sell-real-estate'>
                    <div className='content'>
                        <h1>Sell Real Estate <br/> on Auction 10X</h1>
                        <p className='paragraph'>Attract quality leads within the highest concentration of international luxury buyers</p>
                    </div>
                </div>
            </div>
        </section>
	)
}

export default RealEstate 
