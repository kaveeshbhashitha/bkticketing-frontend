import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddCustomer() {
    const [users, setUsers] = useState([]); // Store all users
    const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users
    const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user data from the backend
    axios
      .get("http://localhost:8080/user/allUsers")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setUsers(response.data);
          setFilteredUsers(response.data); // Initially, show all users
        } else {
          setError("No users found to display.");
        }
      })
      .catch((err) => {
        setError("Error fetching user data.");
      });
  }, []);

  const filterUsers = (filterType) => {
    const now = new Date();
    let filtered = [];

    switch (filterType) {
      case "lastWeek":
        filtered = users.filter((user) => {
          const registrationDate = new Date(user.dateRegistered);
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(now.getDate() - 7);
          return registrationDate >= oneWeekAgo;
        });
        break;

      case "lastMonth":
        filtered = users.filter((user) => {
          const registrationDate = new Date(user.dateRegistered);
          const oneMonthAgo = new Date(now);
          oneMonthAgo.setMonth(now.getMonth() - 1);
          return registrationDate >= oneMonthAgo;
        });
        break;

      case "lastYear":
        filtered = users.filter((user) => {
          const registrationDate = new Date(user.dateRegistered);
          const oneYearAgo = new Date(now);
          oneYearAgo.setFullYear(now.getFullYear() - 1);
          return registrationDate >= oneYearAgo;
        });
        break;

      case "all":
      default:
        filtered = users; // Show all users
        break;
    }

    if (filtered.length === 0) {
      setError("No users found for the selected filter.");
    } else {
      setError("");
    }

    setFilteredUsers(filtered);
  };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/user/delete/${id}`)
            .then(() => {
                setUsers(filterUsers.filter(filterUsers => filterUsers.userId !== id));
            })
            .catch((error) => setError('Unable to delete the user.'));
    };
  return (
    <div>
    {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i class="fa-solid fa-circle-exclamation pt-1"></i></div>)}
    <div className="table-container">
        <div className="d-flex justify-content-between">
            <h4>Customer Data</h4>

            <div>
                <button onClick={() => filterUsers("all")} className='btn btn-success mx-1'>All</button>
                <button onClick={() => filterUsers("lastWeek")} className='btn btn-success'>Last Week</button>
                <button onClick={() => filterUsers("lastMonth")} className='btn btn-success mx-1'>Last Month</button>
                <button onClick={() => filterUsers("lastYear")} className='btn btn-success'>Last Year</button>
            </div>
        </div>

        {filteredUsers.length > 0 ? (
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
                {filteredUsers.map((users) => (
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
