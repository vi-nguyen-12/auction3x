import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import authService from '../../../../services/authServices'
import { useSelector } from 'react-redux'
import '../../../../styles/DashBoardStyle.css'
import { BsFillHouseFill } from "react-icons/bs";


function IncompleteListing() {
    const user = useSelector((state) => state.user);
    const [IncompleteListings, setIncompleteListings] = useState([]);
    useEffect(() => {
        const fetchIncompleteListings = async () => {
            await authService.getIncompleteProperty(user._id).then((res) => {
                setIncompleteListings(res.data);
            });
        };
        fetchIncompleteListings();
    }, []);
    return (
        <>
            <h1>Incomplete Listing</h1>
            <Card className='incompleteCard'>

                <Card.Img variant="top" src="holder.js/100px180" />


                <div className='img-placeholder'>
                    <BsFillHouseFill size={150} style={{ margin: "20px", color: "grey" }} />
                </div>

                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    <button className='resume-btn'>Resume</button> <button className='del-btn'>Delete</button>

                </Card.Body>
            </Card>
        </>
    )
}

export default IncompleteListing