import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';

export default function Notification() {
    const [email, setEmail] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch event data from backend
        axios.get("http://localhost:8080/notification/getAllNotification")
          .then(response => {
            if (response.data && response.data.length > 0) {
                setEmail(response.data);
            } else {
              setError("No events found to display.");
            }
          })
          .catch(err => {
            setError("Error fetching event data.");
          });
      }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/notification/deleteNotification/${id}`)
            .then(() => {
                setEmail(email.filter(email => email.emailId !== id));
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
                            {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i class="fa-solid fa-circle-exclamation pt-1"></i></div>)}
                            <div className="table-container">
                                {email.length > 0 ? (
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
                                        {email.map((emails) => (
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
