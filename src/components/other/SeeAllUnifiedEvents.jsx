import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SeeAllUnifiedEvents() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch event data from backend
        axios.get("http://localhost:8080/unifiedEvent/getAllUnifiedEvents","https://bkticketing-backend-production.up.railway.app/unifiedEvent/getAllUnifiedEvents")
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
  return (
    <div>
    {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i class="fa-solid fa-circle-exclamation pt-1"></i></div>)}
    <div className="table-container">
        <h4>General Event Data</h4>
        {events.length > 0 ? (
            <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Unique ID</th>
                    <th>Event Type</th>
                    <th>Event Name</th>
                    <th>Event Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event) => (
                <tr key={event.eventId}>
                    <td>{event.eventId}</td>
                    <td>{event.eventType}</td>
                    <td>{event.eventName}</td>
                    <td>{event.eventDate}</td>
                    <td className='text-center'>
                        <a href={event.eventImagePath} target="_blank" rel="noopener noreferrer">
                            <i class="fa-regular fa-image"></i> 
                        </a>
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
