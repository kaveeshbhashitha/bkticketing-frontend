import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function TodayIncome() {
    const [dailyIncome, setDailyIncome] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch event data from backend
        axios.get("http://localhost:8080/reservation/totalCharge/today","https://bkticketing-backend-production.up.railway.app/reservation/totalCharge/today")
          .then(response => {
            setDailyIncome(response.data);
          })
          .catch(err => {
            setError("Error fetching event data.");
          });
      }, []);
  return (
    <div>
        Rs.{dailyIncome}.00
        {error}
    </div>
  )
}
