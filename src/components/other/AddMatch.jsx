import React, { useState } from 'react';
import axios from 'axios';

export default function AddMatch() {
    const [eventData, setEventData] = useState({
        eventName: "",
        matchDate: "",
        matchTime: "",
        matchVenue: "",
        matchHost: "",
        teamOne: "",
        teamTwo: "",
        oneTicketPrice: "",
        matchType: "",
        matchImagePath: "",
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
                const uploadResponse = await axios.post("http://localhost:8080/sport/uploadImage", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                imagePath = uploadResponse.data; // Get the returned image path
            }

            const response = await axios.post("http://localhost:8080/sport/addSport", {
                ...eventData,
                matchImagePath: imagePath,
            });

            setMessage("Sport added successfully..!", response.status);
        } catch (error) {
            console.error(error);
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
            <h5 class="card-header">Add Match and Sports Event Details</h5>
            {message && <div className='alert alert-success mx-2 d-flex justify-content-between'>{message} <i class="fas fa-check-circle pt-1"></i></div>}
            <hr class="my-0" />
            <div class="card-body">

            <form id="formAccountSettings" method="POST" onsubmit="return false">
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <label for="state" class="form-label">Match Name</label>
                        <input class="form-control" type="text" name="eventName" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="zipCode" class="form-label">Match Date</label>
                        <input class="form-control" type="date" name="matchDate" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="firstName" class="form-label">Match Time</label>
                        <input class="form-control" type="time" name="matchTime" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="lastName" class="form-label">Match Venue</label>
                        <input class="form-control" type="text" name="matchVenue" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="email" class="form-label">Match Organizer</label>
                        <input class="form-control" type="text" name="matchHost" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="organization" class="form-label">Team One</label>
                        <input class="form-control" name="teamOne" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="organization" class="form-label">Team Two</label>
                        <input class="form-control" name="teamTwo" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="address" class="form-label">Number of Tickets Available</label>
                        <input class="form-control" type="number" name="numOfTickets" onChange={handleInputChange} required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="address" class="form-label">Match Image</label>
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
