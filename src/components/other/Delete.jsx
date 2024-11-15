import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/home.css';
import '../../styles/adminEvents.css';

export default function Delete() {
    const [generalEvents, setGeneralEvents] = useState([]);
    const [Sports, setSportsEvents] = useState([]);
    const [Theater, setTheaterEvents] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const generalEventUrls = ["http://localhost:8080/generalEvent/getAllEvents"];
        const sportEventUrls = ["http://localhost:8080/sport/getAllSport"];
        const theaterEventUrls = ["http://localhost:8080/theater/getAllTheater"];
        
        const fetchData = async (urls, setData) => {
            for (let i = 0; i < urls.length; i++) {
                try {
                    const response = await axios.get(urls[i]);
                    if (response.data && response.data.length > 0) {
                        setData(response.data);
                        setError("");
                        return;
                    } else {
                        setError("No events found to display.");
                    }
                } catch (err) {
                    console.error(`Failed to fetch from ${urls[i]}, trying next if available...`);
                }
            }
            setError("Error fetching event data.");
        };

        fetchData(generalEventUrls, setGeneralEvents);
        fetchData(sportEventUrls, setSportsEvents);
        fetchData(theaterEventUrls, setTheaterEvents);
    }, []);

    // Function to delete an event
    const deleteEvent = async (id, type) => {
        const urlMap = {
            general: `http://localhost:8080/generalEvent/deleteEvent/${id}`,
            sports: `http://localhost:8080/sport/deleteSport/${id}`,
            theater: `http://localhost:8080/theater/deleteTheater/${id}`
        };

        // eslint-disable-next-line no-restricted-globals
        let answer = confirm("Are you sure to delete this");

        if (answer) {
            try {
                await axios.delete(urlMap[type]);
                // Remove event from state after deletion
                if (type === 'general') setGeneralEvents(prev => prev.filter(event => event.eventId !== id));
                if (type === 'sports') setSportsEvents(prev => prev.filter(event => event.eventId !== id));
                if (type === 'theater') setTheaterEvents(prev => prev.filter(event => event.eventId !== id));
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }
    };

    return (
        <div>
            <h3>Delete an Event</h3>
            <div className="error-msg1">
                <div className="alert alert-danger d-flex justify-content-between">Take your own responsibility when deleting any content here<i className="fa-solid fa-circle-exclamation pt-1"></i></div>
            </div>
            <div className="error-msg1">
                {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i className="fa-solid fa-circle-exclamation pt-1"></i></div>)}
            </div>
            <h4 class="fw-bold py-3 my-1"><span class="text-muted fw-light">General Events</span></h4>
            {generalEvents.length > 0 && (
                <div className="event-container1">
                    {generalEvents.map((event) => (
                        <div className="image-box" key={event.eventId}>
                            <div className="image-container">
                                <img src={event.eventImagePath} alt="event" className="display-image" />
                                <div className="textforimg">
                                    <h4 className="mt-3">{event.eventName}</h4>
                                    <span><i className="fa-regular fa-calendar rightgap"></i>{event.eventDate} • {event.eventTime} IST</span><br />
                                    <span><i className="fa-solid fa-location-dot rightgap"></i>  At {event.eventVenue}</span><br />
                                    <span>{event.oneTicketPrice}.00 LKR upwards</span>
                                </div>
                                <div className="button-group">
                                    
                                    <button className="buytickets2" onClick={() => deleteEvent(event.eventId, 'general')}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Repeat for Sports and Theater events */}
            <h4 class="fw-bold py-3 my-1"><span class="text-muted fw-light">Sport Events</span></h4>
            {Sports.map((event) => (
                <div className="event-container1" key={event.eventId}>
                    <div className="image-box">
                        <img src={event.matchImagePath} alt="sports" className="display-image" />
                        <div className="textforimg">
                            <h4 className="mt-3">{event.eventName}</h4>
                            <span><i className="fa-regular fa-calendar rightgap"></i>{event.matchDate} • {event.matchTime} IST</span><br />
                            <span><i className="fa-solid fa-location-dot rightgap"></i>  At {event.matchVenue}</span><br />
                            <span>{event.oneTicketPrice}.00 LKR upwards</span>
                        </div>
                        <div className="button-group">
                            <button className="buytickets2" onClick={() => deleteEvent(event.eventId, 'sports')}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}

            <h4 class="fw-bold py-3 my-1"><span class="text-muted fw-light">Theater Events</span></h4>
            {Theater.map((event) => (
                <div className="event-container1" key={event.eventId}>
                    <div className="image-box">
                        <img src={event.theaterImagePath} alt="theater" className="display-image" />
                        <div className="textforimg">
                            <h4 className="mt-3">{event.eventName}</h4>
                            <span><i className="fa-regular fa-calendar rightgap"></i>{event.theaterDate} • {event.theaterTime} IST</span><br />
                            <span><i className="fa-solid fa-location-dot rightgap"></i>  At {event.theaterVenue}</span><br />
                            <span>{event.oneTicketPrice}.00 LKR upwards</span>
                        </div>
                        <div className="button-group">
                            <button className="buytickets2" onClick={() => deleteEvent(event.eventId, 'theater')}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
