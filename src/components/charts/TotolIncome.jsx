import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function TotolIncome() {
    const [income, setIncome] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch event data from backend
        axios.get("http://localhost:8080/reservation/totalCharge")
          .then(response => {
            setIncome(response.data);
          })
          .catch(err => {
            setError("Error fetching event data.");
          });
      }, []);

  return (
    <div>
        Rs.{income}.00
        {error}
    </div>
  )
}
