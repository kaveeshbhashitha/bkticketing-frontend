import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CongratulationsCard() {
    const [income, setIncome] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch event data from backend
        axios.get("http://localhost:8080/reservation/totalCharge/today")
          .then(response => {
            setIncome(response.data);
          })
          .catch(err => {
            setError("Error fetching event data.");
          });
      }, []);
  return (
    <div className="card-body">
      <h5 className="card-title text-primary">
        Congratulations! 🎉
      </h5>
      <p className="mb-4">
        We have earn <span className="fw-bold text-success">Rs.{income}
        {error}.00 </span> more sales today. Check all incomes under income page.
      </p>
      <a href="/payment" className="btn btn-sm btn-outline-primary">
        View Badges
      </a>
    </div>
  );
}

export default CongratulationsCard;
