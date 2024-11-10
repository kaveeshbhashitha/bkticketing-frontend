import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function EventCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/generalEvent/getAllEvents');

        // Map data from backend to calendar format
        const calendarEvents = response.data.map((event) => ({
          title: event.eventName,
          start: new Date(event.eventDate),
          end: new Date(event.eventDate), // End date can be the same for single-day events
        }));

        setEvents(calendarEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ height: '80vh' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        titleAccessor="title"
        views={['month']}
      />
    </div>
  );
}




