import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import '../../styles/work.css'

const Work = (props) => {
    return (
        <section className='work-wrapper'>
            <Row className='row-custom'>
                <div className='heading'>How it Works?</div>
                <div className='content-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br />
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </Row>
            <div className='card-content'>
                <Row className='row-custom'>
                    {
                        [1, 2, 3].map((key) => {
                            return (<Col key={key}>
                                <Card style={{ width: '22rem' }} className='card-work'>
                                    <div className='card-number'>
                                        <h2>{key}</h2>
                                    </div>

                                    <Card.Body>
                                        <Card.Title>Lorem Ipsum</Card.Title>
                                        <Card.Text>
                                            Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>)
                        })
                    }

                </Row>
            </div>

        </section>
    )
}

export default Work 
