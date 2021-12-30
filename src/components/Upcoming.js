import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { CardComp } from './Card'
import { useSelector } from "react-redux";

const Upcoming = (props) => {
    const property = useSelector((state) => state.property);
    return (
        <div className="mt-5">
            <Row>
                <Col md={10} className="m-auto pt-5">
                    <img
                        src='/images/Upcoming Auctions.png'
                        alt=''
                        style={{ marginBottom: '20px', maxWidth: '250px', maxHeight: '150px' }}
                    />
                </Col>
            </Row>
            <Col md={12} className="m-auto pt-2">
                <Row>
                    {property.slice(0, 9).map((item) => (
                        <Col key={item._id} md={4} style={{marginBottom:"30px"}}>
                        <CardComp url={item.images[0].url} data={item.details} id = {item._id}/>
                      </Col>
                    ))}
                </Row>
            </Col>
        </div>
    )
}

export { Upcoming }
