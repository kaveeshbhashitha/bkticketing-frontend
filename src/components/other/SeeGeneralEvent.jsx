import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SeeGeneralEvent() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch event data from backend
        axios.get("http://localhost:8080/generalEvent/getAllEvents")
          .then(response => {
            if (response.data && response.data.length > 0) {
              setEvents(response.data);
            } else {
              setError("No events found to display.");
            }
          })
          .catch(err => {
            setError("Error fetching event data.");
          });
      }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/generalEvent/deleteEvent/${id}`)
            .then(() => {
                setEvents(events.filter(event => event.eventId !== id));
            })
            .catch((error) => setError('Unable to delete the event.'));
    };

  return (
    <div>
    {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i class="fa-solid fa-circle-exclamation pt-1"></i></div>)}
    <div className="table-container">
        <h4>General Event Data</h4>
        {events.length > 0 ? (
            <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Venue</th>
                    <th>Organizer</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event) => (
                <tr key={event.eventId}>
                    <td>{event.eventName}</td>
                    <td>{event.eventDate}</td>
                    <td>{event.eventTime}</td>
                    <td>{event.eventVenue}</td>
                    <td>{event.eventOrganizer}</td>
                    <td>{event.description}</td>
                    <td>Rs.{event.oneTicketPrice}.00</td>
                    <td className='text-center'>
                    <a href={event.eventImagePath} target="_blank" rel="noopener noreferrer">
                        <i class="fa-regular fa-image"></i> 
                    </a>
                    </td>
                    <td>
                        <button className="text-warning btn" onClick={() => handleDelete(event.eventId)}>
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        ) : (
            <div className="alert alert-warning d-none" role="alert">
            No events to display.
            </div>
        )}
        </div>
    </div>
  )
}
