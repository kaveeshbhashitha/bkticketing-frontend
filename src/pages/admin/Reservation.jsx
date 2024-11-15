import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';

export default function Reservation() {
    const [reservation, setReservation] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch event data from backend
        axios.get("http://localhost:8080/reservation/getAllReservations")
          .then(response => {
            if (response.data && response.data.length > 0) {
              setReservation(response.data);
            } else {
              setError("No reservation found to display.");
            }
          })
          .catch(err => {
            setError("Error fetching event data.");
          });
      }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/reservation/deleteReservation/${id}`)
            .then(() => {
              setReservation(reservation.filter(reservation => reservation.reservationId !== id));
            })
            .catch((error) => setError('Unable to delete the reservation.'));
    };
  return (
    <div>
          <div class="layout-wrapper layout-content-navbar">
              <div class="layout-container">
                  <AdminSideBar />
                  <div class="content-wrapper">
                      <div class="container-xxl flex-grow-1 container-p-y">
                          <h4 class="fw-bold py-3 my-1"><span class="text-muted fw-light">Events /</span> Reservations</h4>
                          <div>
                            {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i class="fa-solid fa-circle-exclamation pt-1"></i></div>)}
                            <div className="table-container">
                                {reservation.length > 0 ? (
                                    <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>UserId</th>
                                            <th>EventId</th>
                                            <th className='text-center'><i class="fa-solid fa-calculator"></i></th>
                                            <th className='text-center'><i class="fa-regular fa-flag"></i></th>
                                            <th className='text-center'><i class="fa-solid fa-money-check-dollar"></i></th>
                                            <th className='text-center'><i class="fa-solid fa-calendar-days"></i></th>
                                            <th className='text-center'><i class="fa-regular fa-clock"></i></th>
                                            <th>Availability</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservation.map((reservations) => (
                                        <tr key={reservations.reservationId}>
                                            <td>{reservations.userId}</td>
                                            <td>{reservations.eventId}</td>
                                            <td>{reservations.numOfTickets}</td>
                                            <td>{reservations.perTicketCharge}.00</td>
                                            <td>{reservations.totalCharge}.00</td>
                                            <td>{reservations.reservationDate}</td>
                                            <td>{reservations.reservationTime}</td>
                                            <td>{reservations.status === "Available" ? (
                                                    <div style={{color:'rgb(14, 181, 14)', textAlign: 'center'}}>Available</div>
                                                ) : (
                                                    <div style={{color:'red'}}>Not Sent</div>
                                                )}
                                            </td>
                                            <td>
                                                <button className="text-warning btn" onClick={() => handleDelete(reservations.eventId)}>
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
