import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../styles/userprofile.css'
import { useNavigate } from 'react-router-dom';
import useAuthCheck from '../../AuthCheck';

export default function UserProfile() {
    useAuthCheck();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleButtonClick = () => {
        navigate("/"); // Navigate to '/profile' on button click
    };

    useEffect(() => {
        const fetchUser = async () => {
            const userEmail = sessionStorage.getItem('user');
            if (userEmail) {
                try {
                    const response = await axios.get(`http://localhost:8080/user/getUserByEmail/${userEmail}`);
                    if (response.data) {
                        setUser(response.data);
                    } else {
                        setError("No user found.");
                    }
                } catch (err) {
                    setError("Error fetching user data.");
                }
            }
        };

        fetchUser();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/user/delete/${id}`)
            .then(() => {
                handleLogout();
                setError('User Deleted Successfully')
            })
            .catch((error) => setError(error));
    };

    const handleLogout = async () => {
        try {
          const response = await axios.post('http://localhost:8080/user/logout');
          if (response) {
            sessionStorage.removeItem('user');
            navigate('/login');
          }
        } catch (error) {
          console.error('Error logging out');
        }
    };

    const formatTime = (timeString) => {
        const [hours, minutes, seconds] = timeString.split(':');
        const date = new Date();
        date.setHours(hours, minutes, seconds.split('.')[0]);
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        }).format(date);
    };

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!user) {
        return <p className="loading">Loading user data...</p>;
    }

  return (
    <div className="user-profile-container">
        <div className="user-profile-card">
            {/* Left Column: User Image */}
            <div className="user-image">
                <img src="/images/user.gif" alt="User Profile" />
            </div>

            {/* Right Column: User Details */}
            <div className="user-details">
                <h1>User Profile</h1>
                <div className="user-item">
                    <span className="label">User ID:</span>
                    <span className="value">{user.userId}</span>
                </div>
                <div className="user-item">
                    <span className="label">Email:</span>
                    <span className="value">{user.userEmail}</span>
                </div>
                <div className="user-item">
                    <span className="label">First Name:</span>
                    <span className="value">{user.firstName}</span>
                </div>
                <div className="user-item">
                    <span className="label">Last Name:</span>
                    <span className="value">{user.lastName}</span>
                </div>
                <div className="user-item">
                    <span className="label">Role:</span>
                    <span className="value">{user.userRole}</span>
                </div>
                <div className="user-item">
                    <span className="label">Date Registered:</span>
                    <span className="value">{user.dateRegistered}</span>
                </div>
                <div className="user-item">
                    <span className="label">Time Registered:</span>
                    <span className="value">{formatTime(user.timeRegistered)}</span>
                </div>
                <div className="user-item right">
                    <div>
                        <button className='delete btn btn-secondary gap' onClick={() => handleDelete(user.userId)}><i class="fa-solid fa-trash"></i><span className="gap">Delete My Account</span></button>
                        <button className='back btn btn-primary mx-2' onClick={handleButtonClick}><i class="fa-solid fa-home"></i><span className="gap">Back to Home</span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
