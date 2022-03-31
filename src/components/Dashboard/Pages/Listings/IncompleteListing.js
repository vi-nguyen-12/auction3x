import React, { useState, useEffect } from 'react'
import { Card, Table } from 'react-bootstrap'
import authService from '../../../../services/authServices'
import { useSelector } from 'react-redux'
import '../../../../styles/DashBoardStyle.css'
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { BsFillHouseFill } from "react-icons/bs";


function IncompleteListing() {
    const user = useSelector((state) => state.user);
    const [IncompleteListings, setIncompleteListings] = useState([]);
    useEffect(() => {
        const fetchIncompleteListings = async () => {
            await authService.getIncompleteProperty(user._id).then((res) => {
                setIncompleteListings(res.data);
                console.log(res.data);
            });
        };
        fetchIncompleteListings();
    }, []);
    return (
        <div>
            {IncompleteListings.length > 0 ? (
                <>
                    <h1>Incomplete Listing</h1>
                    {/* <Card className='incompleteCard'>

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
            </Card> */}
                    <Table borderless hover style={{ fontFamily: "Montserrat, sans-serif" }}>
                        <thead>
                            <tr>
                                <th>
                                    <p>Index</p>
                                </th>
                                <th>
                                    <p>Property ID</p>
                                </th>
                                <th>
                                    <p>Property Type</p>
                                </th>
                                <th>
                                    <p>Status Bar</p>
                                </th>
                                <th>
                                    <p>Actions</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {IncompleteListings.map((listing, index) => (
                                <tr key={index}>
                                    <td>
                                        <p>{index + 1}</p>
                                    </td>
                                    <td>
                                        <p>{listing._id}</p>
                                    </td>
                                    <td>
                                        <p>{listing.type}</p>
                                    </td>
                                    <td className='progress-1'>
                                        <p>
                                            <CircularProgressbar value={listing.step} text={`${(listing.step) / 5 * 100}%`} maxValue={5} strokeWidth={20} />
                                        </p>
                                    </td>
                                    <td>
                                        <button className='resume-btn'>Resume</button> <button className='del-btn'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            ) : (
                <h1>No Incomplete Listing</h1>
            )
            }
        </div>
    )
}

export default IncompleteListing