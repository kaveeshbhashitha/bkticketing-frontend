import React, { useState } from 'react';
import axios from 'axios';

export default function TheaterAndMovieEventAdd() {
    const [eventData, setEventData] = useState({
        eventName: "",
        eventDate: "",
        eventTime: "",
        eventVenue: "",
        eventOrganizer: "",
        description: "",
        oneTicketPrice: "",
        eventType: "Theater", // Set default as Theater or Movie
        eventIsFor: "",
        eventImagePath: "",
        numOfTickets: "",
        genre: "",
        rating: ""
    });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Upload the file
            let imagePath = "";
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const uploadResponse = await axios.post("http://localhost:8080/theater/uploadImage","https://bkticketing-backend-production.up.railway.app/theater/uploadImage", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                imagePath = uploadResponse.data; // Get the returned image path
            }

            // Step 2: Submit event data, including the image path
            const response = await axios.post("http://localhost:8080/theater/addEvent","https://bkticketing-backend-production.up.railway.app/theater/addEvent", {
                ...eventData,
                eventImagePath: imagePath,
            });

            setMessage("Event added successfully..!", response.status);
        } catch (error) {
            setMessage("Error uploading event:", error);
        }
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card mb-4">
                    <h5 className="card-header">Add Theater/Movie Event Details</h5>
                    {message && <div className='alert alert-success mx-2 d-flex justify-content-between'>{message} <i className="fas fa-check-circle pt-1"></i></div>}
                    <hr className="my-0" />
                    <div className="card-body">
                        <form id="formAccountSettings" method="POST" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="state" className="form-label">Event Name</label>
                                    <input className="form-control" type="text" name="eventName" onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="zipCode" className="form-label">Event Date</label>
                                    <input className="form-control" type="date" name="eventDate" onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="firstName" className="form-label">Event Time</label>
                                    <input className="form-control" type="time" name="eventTime" onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="lastName" className="form-label">Event Venue</label>
                                    <input className="form-control" type="text" name="eventVenue" onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="email" className="form-label">Event Organizer</label>
                                    <input className="form-control" type="text" name="eventOrganizer" onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="organization" className="form-label">Description</label>
                                    <input className="form-control" name="description" onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label" htmlFor="ticketPrice">Ticket Price</label>
                                    <input className="form-control" type="number" name="oneTicketPrice" onChange={handleInputChange} required />
                                </div>

                                {/* Genre Dropdown */}
                                <div className="mb-3 col-md-6">
                                    <label className="form-label" htmlFor="genre">Genre</label>
                                    <select className="form-control" name="genre" onChange={handleInputChange} required>
                                        <option value="">Select Genre</option>
                                        <option value="Drama">Drama</option>
                                        <option value="Comedy">Comedy</option>
                                        <option value="Action">Action</option>
                                        <option value="Romantic">Romantic</option>
                                        <option value="Horror">Horror</option>
                                    </select>
                                </div>

                                {/* Event For Dropdown */}
                                <div className="mb-3 col-md-6">
                                    <label className="form-label" htmlFor="eventIsFor">Event For</label>
                                    <select className="form-control" name="eventIsFor" onChange={handleInputChange} required>
                                        <option value="">Select Audience</option>
                                        <option value="Children">Children</option>
                                        <option value="Adults">Adults</option>
                                        <option value="Teenagers">Teenagers</option>
                                        <option value="All">All</option>
                                    </select>
                                </div>

                                {/* Rating Field */}
                                <div className="mb-3 col-md-6">
                                    <label className="form-label" htmlFor="rating">Rating (e.g., PG-13)</label>
                                    <input className="form-control" type="text" name="rating" onChange={handleInputChange} required />
                                </div>

                                <div className="mb-3 col-md-6">
                                    <label htmlFor="numOfTickets" className="form-label">Number of Tickets Available</label>
                                    <input className="form-control" type="number" name="numOfTickets" onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="eventImage" className="form-label">Event Image</label>
                                    <input className="form-control" type="file" onChange={handleFileChange} required />
                                </div>
                            </div>
                            <div className="mt-2">
                                <button type="submit" className="btn btn-primary me-2">Save changes</button>
                                <button type="reset" className="btn btn-outline-secondary">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
