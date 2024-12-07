import React, { useState } from 'react';
import axios from 'axios';

export default function GeneralEvent() {
    const [eventData, setEventData] = useState({
        eventName: "",
        eventDate: "",
        eventTime: "",
        eventVenue: "",
        eventOrganizer: "",
        description: "",
        oneTicketPrice: "",
        eventType: "",
        eventIsFor: "",
        eventImagePath: "",
        numOfTickets: "",
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
                const uploadResponse = await axios.post("http://localhost:8080/generalEvent/uploadImage", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                imagePath = uploadResponse.data; // Get the returned image path
            }

            // Step 2: Submit event data, including the image path
            const response = await axios.post("http://localhost:8080/generalEvent/addEvent", {
                ...eventData,
                eventImagePath: imagePath,
            });

            setMessage("Event added successfully..!", response.status);
        } catch (error) {
            setMessage("Error uploading event:", error);
        }
    };
  return (
    <div class="row">
        <div class="col-md-12">
        <div class="card mb-4">
            <h5 class="card-header">Add General Event Details</h5>
            {message && <div className='alert alert-success mx-2 d-flex justify-content-between'>{message} <i class="fas fa-check-circle pt-1"></i></div>}
            <hr class="my-0" />
            <div class="card-body">

            <form id="formAccountSettings" method="POST" onsubmit="return false">
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <label for="state" class="form-label">Event Name</label>
                        <input class="form-control" type="text" name="eventName" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="zipCode" class="form-label">Event Date</label>
                        <input class="form-control" type="date" name="eventDate" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="firstName" class="form-label">Event Time</label>
                        <input class="form-control" type="time" name="eventTime" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="lastName" class="form-label">Event Venue</label>
                        <input class="form-control" type="text" name="eventVenue" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="email" class="form-label">Event Organizer</label>
                        <input class="form-control" type="text" name="eventOrganizer" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="organization" class="form-label">Description</label>
                        <input class="form-control" name="description" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label class="form-label" for="phoneNumber">Ticket Price</label>
                        <input class="form-control" type="number" name="oneTicketPrice" onChange={handleInputChange} required />
                    </div>

                    <div class="mb-3 col-md-6">
                        <label class="form-label" for="phoneNumber">Event Type</label>
                        <select className="form-control" name="eventType" onChange={handleInputChange} required>
                                    <option value="">Select Event Type</option> 
                                    <option value="All">All</option>
                                    <option value="Other">Other</option>
                                    <option value="Deals">Deals</option>
                        </select>
                    </div>

                    <div class="mb-3 col-md-6">
                        <label class="form-label" for="phoneNumber">Event For</label>
                        <select className="form-control" name="eventIsFor" onChange={handleInputChange} required>
                                    <option value="">Select Event For</option> 
                                    <option value="Children">Children</option>
                                    <option value="Adults">Adults</option>
                                    <option value="teenagers">teenagers</option>
                                    <option value="undergraduates">undergraduates</option>
                                    <option value="others">others</option>
                        </select>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="address" class="form-label">Number of Tickets Available</label>
                        <input class="form-control" type="number" name="numOfTickets" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="address" class="form-label">Event Image</label>
                        <input class="form-control" type="file" onChange={handleFileChange} required />
                    </div>
                </div>
                <div class="mt-2">
                    <button type="submit" onClick={handleSubmit} class="btn btn-primary me-2">Save changes</button>
                    <button type="reset" class="btn btn-outline-secondary">Cancel</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
  )
}