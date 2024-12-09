import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';

export default function Notification() {
    const [notifications, setNotifications] = useState([]); // Store all notifications
    const [filteredNotifications, setFilteredNotifications] = useState([]); // Store filtered notifications
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch notifications from the backend
        axios
        .get("http://localhost:8080/notification/getAllNotification")
        .then((response) => {
            if (response.data && response.data.length > 0) {
            setNotifications(response.data);
            setFilteredNotifications(response.data); // Initially, show all notifications
            } else {
            setError("No notifications found to display.");
            }
        })
        .catch((err) => {
            setError("Error fetching notifications.");
        });
    }, []);

    // Filter notifications based on the date added
    const filterNotifications = (filterType) => {
        const now = new Date();
        let filtered = [];

        switch (filterType) {
        case "lastWeek":
            filtered = notifications.filter((notification) => {
            const dateAdded = new Date(notification.dateAdded);
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(now.getDate() - 7);
            return dateAdded >= oneWeekAgo;
            });
            break;

        case "lastMonth":
            filtered = notifications.filter((notification) => {
            const dateAdded = new Date(notification.dateAdded);
            const oneMonthAgo = new Date(now);
            oneMonthAgo.setMonth(now.getMonth() - 1);
            return dateAdded >= oneMonthAgo;
            });
            break;

        case "lastYear":
            filtered = notifications.filter((notification) => {
            const dateAdded = new Date(notification.dateAdded);
            const oneYearAgo = new Date(now);
            oneYearAgo.setFullYear(now.getFullYear() - 1);
            return dateAdded >= oneYearAgo;
            });
            break;

        case "all":
        default:
            filtered = notifications; // Show all notifications
            break;
        }

        if (filtered.length === 0) {
        setError("No notifications found for the selected filter.");
        } else {
        setError("");
        }

        setFilteredNotifications(filtered);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/notification/deleteNotification/${id}`)
            .then(() => {
                setFilteredNotifications(filteredNotifications.filter(filteredNotifications => filteredNotifications.emailId !== id));
            })
            .catch((error) => setError('Unable to delete the event.'));
    };
    return (
      <div>
          <div class="layout-wrapper layout-content-navbar">
              <div class="layout-container">
                  <AdminSideBar />
  
                  <div class="content-wrapper">
                      <div class="container-xxl flex-grow-1 container-p-y">
                          <h4 class="fw-bold py-3 my-1"><span class="text-muted fw-light">Events /</span> Notification</h4>
                          <div>
                            <div className="d-flex justify-content-end">
                                <div>
                                    <button onClick={() => filterNotifications("all")} className='btn btn-success mx-1'>All</button>
                                    <button onClick={() => filterNotifications("lastWeek")} className='btn btn-success'>Last Week</button>
                                    <button onClick={() => filterNotifications("lastMonth")} className='btn btn-success mx-1'>Last Month</button>
                                    <button onClick={() => filterNotifications("lastYear")} className='btn btn-success'>Last Year</button>
                                </div>
                            </div>
                            {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i class="fa-solid fa-circle-exclamation pt-1"></i></div>)}
                            <div className="table-container">
                                {filteredNotifications.length > 0 ? (
                                    <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>To</th>
                                            <th>Subject</th>
                                            <th>Body</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredNotifications.map((emails) => (
                                        <tr key={emails.eventId}>
                                            <td>{emails.toEmail}</td>
                                            <td>{emails.subject}</td>
                                            <td>{emails.body}</td>
                                            <td>{emails.status === "Sent" ? (
                                                    <div style={{color:'rgb(14, 181, 14)', textAlign: 'center'}}>Sent</div>
                                                ) : (
                                                    <div style={{color:'red'}}>Not Sent</div>
                                                )}
                                            </td>
                                            <td>{emails.dateAdded}</td>
                                            <td>{emails.timeAdded}</td>
                                            <td>
                                                <button className="text-warning btn" onClick={() => handleDelete(emails.eventId)}>
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
                      </div>
                      <div class="content-backdrop fade"></div>
                  </div>
              </div>
          </div>
      </div>
  )
}
