import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { CardComp } from './Card'

const Upcoming = (props) => {
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
            <Col md={10} className="m-auto pt-2">
                <Row>
                    {[1, 2, 3, 4, 5, 6].map((card) => (
                        <Col key={card} md={4} className="mt-5">
                            <CardComp />
                        </Col>
                    ))}
                </Row>
            </Col>
        </div>
    )
}

export { Upcoming }
