import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import '../../styles/work.css'

const Work = (props) => {
	return (
        <section className='work-wrapper'>
            <Row>
                <div className='heading'>How it Works?</div>
                <div className='content-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/>
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </Row>
            <div className='card-content'>
                <Row>
                {
                        [1,2,3].map((key,val)=>
                        {
                           return( <Col>
                            <Card style={{ width: '22rem' }}>
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
