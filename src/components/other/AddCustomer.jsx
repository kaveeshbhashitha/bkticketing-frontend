import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddCustomer() {
    const [user, setUser] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch event data from backend
        axios.get("http://localhost:8080/user/allUsers")
          .then(response => {
            if (response.data && response.data.length > 0) {
                setUser(response.data);
            } else {
              setError("No user found to display.");
            }
          })
          .catch(err => {
            setError("Error fetching event data.");
          });
      }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/user/delete/${id}`)
            .then(() => {
                setUser(user.filter(user => user.userId !== id));
            })
            .catch((error) => setError('Unable to delete the user.'));
    };
  return (
    <div>
    {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i class="fa-solid fa-circle-exclamation pt-1"></i></div>)}
    <div className="table-container">
        <h4>Customer Data</h4>
        {user.length > 0 ? (
            <table className="table table-bordered">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Registered Date</th>
                    <th>Registered Time</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {user.map((users) => (
                <tr key={users.userId}>
                    <td>{users.firstName}</td>
                    <td>{users.lastName}</td>
                    <td>{users.userEmail}</td>
                    <td>{users.password}</td>
                    <td>{users.userRole}</td>
                    <td>{users.dateRegistered}</td>
                    <td>{users.timeRegistered}</td>
                    <td>
                        <button className="text-warning btn" onClick={() => handleDelete(users.userId)}>
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        ) : (
            <div className="alert alert-warning d-none" role="alert">
            No events to display.
            </div>
        )}
        </div>
    </div>
  )
}
