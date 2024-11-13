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
        const response = await axios.get('http://localhost:8080/unifiedEvent/getAllUnifiedEvents');

        // Map data from backend to calendar format
        const calendarEvents = response.data.map((event) => ({
          title: event.eventName,
          start: new Date(event.eventDate),
          end: new Date(event.eventDate),
          type: event.eventType, // Pass event type for color assignment
        }));

        setEvents(calendarEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const getEventColor = (eventType) => {
    if (eventType === 'theater') {
      return '#FF6347'; 
    } else if (eventType === 'sports') {
      return '#4682B4'; 
    } else if (eventType === 'generalEvent') {
      return '#61d53d'; 
    } else {
      return '#135bf2'; 
    }
  };

  // Customize event styling based on type
  const eventStyleGetter = (event) => {
    const backgroundColor = getEventColor(event.type);
    return {
      style: {
        backgroundColor: backgroundColor,
        color: 'white',
        borderRadius: '5px',
        border: 'none',
      },
    };
  };

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
        eventPropGetter={eventStyleGetter} // Apply custom color styling
      />
    </div>
  );
}
