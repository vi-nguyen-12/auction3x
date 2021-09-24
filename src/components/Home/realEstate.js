import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import '../../styles/real-estate.css'

const RealEstate = (props) => {
	return (
        <section className='real-estate-wrap'>
            <div className='real-estate'>
                <div className='btn-group'>
                    <Button className='btn-custom'> Real Estate</Button>
                    <Button className='btn-custom'> Cars</Button>
                    <Button className='btn-custom'> Yachts</Button>
                    <Button className='btn-custom'> Jets</Button>
                    <Button className='btn-custom'> Jewels</Button>
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
