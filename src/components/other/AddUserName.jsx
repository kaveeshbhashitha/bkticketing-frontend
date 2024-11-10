import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CongratulationsCard({ userId }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch the username by user ID
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/getUserNameByID/${userId}`);
        setUsername(response.data); // Directly set the response as username, since it's a string
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [userId]);

  return (
    <div className="card-body">
      <h5 className="card-title text-primary">
        Congratulations {username}! 🎉
      </h5>
      <p className="mb-4">
        You have done <span className="fw-bold">72%</span> more sales today. Check your new badge in
        your profile.
      </p>
      <a href="/payment" className="btn btn-sm btn-outline-primary">
        View Badges
      </a>
    </div>
  );
}

export default CongratulationsCard;
