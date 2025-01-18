import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function TodayTickets() {
    const [totalTickets, setTotalTickets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch event data from backend
        axios.get("http://localhost:8080/reservation/totalTickets/today","https://bkticketing-backend-production.up.railway.app/reservation/totalTickets/today")
          .then(response => {
            setTotalTickets(response.data);
          })
          .catch(err => {
            setError("Error fetching event data.");
          });
      }, []);
  return (
    <div>
        {totalTickets}
        {error}
    </div>
  )
}
