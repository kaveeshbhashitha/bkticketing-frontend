import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/home.css';
import '../../styles/adminEvents.css';

export default function Update() {
    const [generalEvents, setGeneralEvents] = useState([]);
    const [Sports, setSportsEvents] = useState([]);
    const [Theater, setTheaterEvents] = useState([]);
    const [error, setError] = useState("");
    const [editingEvent, setEditingEvent] = useState(null); // Track which event is being edited

    useEffect(() => {
        const fetchData = async (url, setData) => {
            try {
                const response = await axios.get(url);
                setData(response.data || []);
                setError("");
            } catch (err) {
                console.error(`Failed to fetch from ${url}`, err);
                setError("Error fetching event data.");
            }
        };

        fetchData("http://localhost:8080/generalEvent/getAllEvents", setGeneralEvents);
        fetchData("http://localhost:8080/sport/getAllSport", setSportsEvents);
        fetchData("http://localhost:8080/theater/getAllTheater", setTheaterEvents);
    }, []);

    // Function to handle updating an event
    const updateEvent = async (updatedEvent, type) => {
        const urlMap = {
            general: `http://localhost:8080/generalEvent/updateEvent/${updatedEvent.eventId}`,
            sports: `http://localhost:8080/sport/updateSport/${updatedEvent.eventId}`,
            theater: `http://localhost:8080/theater/updateTheater/${updatedEvent.eventId}`
        };

        try {
            await axios.put(urlMap[type], updatedEvent);
            if (type === 'general') setGeneralEvents(prev => prev.map(event => event.eventId === updatedEvent.eventId ? updatedEvent : event));
            if (type === 'sports') setSportsEvents(prev => prev.map(event => event.eventId === updatedEvent.eventId ? updatedEvent : event));
            if (type === 'theater') setTheaterEvents(prev => prev.map(event => event.eventId === updatedEvent.eventId ? updatedEvent : event));
            setEditingEvent(null); // Close editing form
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const startEditing = (event) => {
        setEditingEvent(event);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingEvent(prev => ({ ...prev, [name]: value }));
    };

    const renderEventForm = (event, type) => (
        <div className="mb-3 col-md-12">
            <input class="form-control mb-1" type="text" name="eventName" value={event.eventName} onChange={handleChange} placeholder="Event Name" />
            <input class="form-control mb-1" type="date" name="eventDate" value={event.eventDate} onChange={handleChange} placeholder="Event Date" />
            <input class="form-control mb-1" type="time" name="eventTime" value={event.eventTime} onChange={handleChange} placeholder="Event Time" />
            <input class="form-control mb-1" type="text" name="eventVenue" value={event.eventVenue} onChange={handleChange} placeholder="Venue" />
            <input class="form-control mb-1" type="number" name="oneTicketPrice" value={event.oneTicketPrice} onChange={handleChange} placeholder="Ticket Price" />
           <br /> <button class="btn btn-primary w-100" onClick={() => updateEvent(event, type)}>Save</button>
            <button class="btn btn-warning w-100" onClick={() => setEditingEvent(null)}>Cancel</button>
        </div>
    );

    const renderEventForm1 = (event, type) => (
        <div className="mb-3 col-md-12">
            <input class="form-control mb-1" type="text" name="eventName" value={event.eventName} onChange={handleChange} placeholder="Event Name" />
            <input class="form-control mb-1" type="date" name="matchDate" value={event.eventDate} onChange={handleChange} placeholder="Event Date" />
            <input class="form-control mb-1" type="time" name="matchTime" value={event.eventTime} onChange={handleChange} placeholder="Event Time" />
            <input class="form-control mb-1" type="text" name="matchVenue" value={event.matchVenue} onChange={handleChange} placeholder="Venue" />
            <input class="form-control mb-1" type="number" name="oneTicketPrice" value={event.oneTicketPrice} onChange={handleChange} placeholder="Ticket Price" />
           <br /> <button class="btn btn-primary w-100" onClick={() => updateEvent(event, type)}>Save</button>
            <button class="btn btn-warning w-100" onClick={() => setEditingEvent(null)}>Cancel</button>
        </div>
    );


    const renderEventForm2 = (event, type) => (
        <div className="mb-3 col-md-12">
            <input class="form-control mb-1" type="text" name="eventName" value={event.eventName} onChange={handleChange} placeholder="Event Name" />
            <input class="form-control mb-1" type="date" name="theaterDate" value={event.eventDate} onChange={handleChange} placeholder="Event Date" />
            <input class="form-control mb-1" type="time" name="theaterTime1" value={event.eventTime1} onChange={handleChange} placeholder="Event Time1" />
            <input class="form-control mb-1" type="time" name="theaterTime2" value={event.eventTime2} onChange={handleChange} placeholder="Event Time2" />
            <input class="form-control mb-1" type="text" name="theaterVenue" value={event.theaterVenue} onChange={handleChange} placeholder="Venue" />
            <input class="form-control mb-1" type="number" name="oneTicketPrice" value={event.oneTicketPrice} onChange={handleChange} placeholder="Ticket Price" />
           <br /> <button class="btn btn-primary w-100" onClick={() => updateEvent(event, type)}>Save</button>
            <button class="btn btn-warning w-100" onClick={() => setEditingEvent(null)}>Cancel</button>
        </div>
    );

    return (
        <div>
            <h3>Update an Event</h3>
            <div className="error-msg1">
                <div className="alert alert-success d-flex justify-content-between">Take your own responsibility when updating any content here<i className="fa-solid fa-circle-exclamation pt-1"></i></div>
            </div>
            <div className="error-msg1">
                {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i className="fa-solid fa-circle-exclamation pt-1"></i></div>)}
            </div>

            <h4 className="fw-bold py-3 my-1"><span className="text-muted fw-light">General Events</span></h4>
            <div className="event-container1">
                {generalEvents.map(event => (
                    <div className="image-box" key={event.eventId}>
                        {editingEvent?.eventId === event.eventId ? (
                            renderEventForm(editingEvent, 'general')
                        ) : (
                            <div>
                                <img src={event.eventImagePath} alt="event" className="display-image" />
                                <div className="textforimg">
                                    <h4>{event.eventName}</h4>
                                    <span>{event.eventDate} • {event.eventTime} IST</span><br />
                                    <span>At {event.eventVenue}</span><br />
                                    <span>{event.oneTicketPrice}.00 LKR upwards</span>
                                </div>
                                <button className="buytickets2" onClick={() => startEditing(event)}>Update</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <h4 className="fw-bold py-3 my-1"><span className="text-muted fw-light">Sport Events</span></h4>
            <div className="event-container1">
                {Sports.map(event => (
                    <div className="image-box" key={event.eventId}>
                        {editingEvent?.eventId === event.eventId ? (
                            renderEventForm1(editingEvent, 'sports')
                        ) : (
                            <div>
                                <img src={event.matchImagePath} alt="sports" className="display-image" />
                                <div className="textforimg">
                                    <h4>{event.eventName}</h4>
                                    <span>{event.matchDate} • {event.matchTime} IST</span><br />
                                    <span>At {event.matchVenue}</span><br />
                                    <span>{event.oneTicketPrice}.00 LKR upwards</span>
                                </div>
                                <button className="buytickets2" onClick={() => startEditing(event)}>Update</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <h4 className="fw-bold py-3 my-1"><span className="text-muted fw-light">Theater Events</span></h4>
            <div className="event-container1">
                {Theater.map(event => (
                    <div className="image-box" key={event.eventId}>
                        {editingEvent?.eventId === event.eventId ? (
                            renderEventForm2(editingEvent, 'theater')
                        ) : (
                            <div>
                                <img src={event.theaterImagePath} alt="theater" className="display-image" />
                                <div className="textforimg">
                                    <h4>{event.eventName}</h4>
                                    <span>{event.theaterDate} • {event.theaterTime1} IST</span><br />
                                    <span>{event.theaterDate} • {event.theaterTime2} IST</span><br />
                                    <span>At {event.theaterVenue}</span><br />
                                    <span>{event.oneTicketPrice}.00 LKR upwards</span>
                                </div>
                                <button className="buytickets2" onClick={() => startEditing(event)}>Update</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
