import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideBar from "../../components/layout/AdminSideBar";

export default function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");
  const [filteredReservations, setFilteredReservations] = useState([]);

  useEffect(() => {
    // Fetch all reservations from the backend
    axios
      .get("http://localhost:8080/reservation/getAllReservations")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setReservations(response.data);
          setFilteredReservations(response.data); // Default to all reservations
        } else {
          setError("No reservations found to display.");
        }
      })
      .catch((err) => {
        setError("Error fetching reservation data.");
      });
  }, []);

  const filterByDate = (filterType) => {
    const now = new Date();
    let filtered = [];

    switch (filterType) {
      case "lastWeek":
        filtered = reservations.filter((reservations) => {
          const dateAdded = new Date(reservations.reservationDate);
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(now.getDate() - 7);
          return dateAdded >= oneWeekAgo;
        });
        break;

      case "lastMonth":
        filtered = reservations.filter((reservations) => {
          const dateAdded = new Date(reservations.reservationDate);
          const oneMonthAgo = new Date(now);
          oneMonthAgo.setMonth(now.getMonth() - 1);
          return dateAdded >= oneMonthAgo;
        });
        break;

      case "lastYear":
        filtered = reservations.filter((reservations) => {
          const dateAdded = new Date(reservations.reservationDate);
          const oneYearAgo = new Date(now);
          oneYearAgo.setFullYear(now.getFullYear() - 1);
          return dateAdded >= oneYearAgo;
        });
        break;

      case "all":
        filtered = reservations; // Show all reservations
        break;
      default:
        filtered = [];
    }

    setFilteredReservations(filtered);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/reservation/deleteReservation/${id}`)
      .then(() => {
        setReservations(
          reservations.filter((reservation) => reservation.reservationId !== id)
        );
      })
      .catch((error) => setError("Unable to delete the reservation."));
  };
  return (
    <div>
      <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
          <AdminSideBar />
          <div class="content-wrapper">
            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 my-1">
                <span class="text-muted fw-light">Events /</span> Reservations
              </h4>
              <div>
                <div className="d-flex justify-content-end">
                  <div>
                    <button
                      onClick={() => filterByDate("all")}
                      className="btn btn-success mx-1"
                    >
                      All
                    </button>
                    <button
                      onClick={() => filterByDate("lastWeek")}
                      className="btn btn-success"
                    >
                      Last Week
                    </button>
                    <button
                      onClick={() => filterByDate("lastMonth")}
                      className="btn btn-success mx-1"
                    >
                      Last Month
                    </button>
                    <button
                      onClick={() => filterByDate("lastYear")}
                      className="btn btn-success"
                    >
                      Last Year
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="alert alert-warning d-flex justify-content-between">
                    {error} <i class="fa-solid fa-circle-exclamation pt-1"></i>
                  </div>
                )}
                <div className="table-container">
                  {filteredReservations.length > 0 ? (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>UserId</th>
                          <th>EventId</th>
                          <th className="text-center">
                            <i class="fa-solid fa-calculator"></i>
                          </th>
                          <th className="text-center">
                            <i class="fa-regular fa-flag"></i>
                          </th>
                          <th className="text-center">
                            <i class="fa-solid fa-money-check-dollar"></i>
                          </th>
                          <th className="text-center">
                            <i class="fa-solid fa-calendar-days"></i>
                          </th>
                          <th className="text-center">
                            <i class="fa-regular fa-clock"></i>
                          </th>
                          <th>Availability</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReservations.map((reservations) => (
                          <tr key={reservations.reservationId}>
                            <td>{reservations.userId}</td>
                            <td>{reservations.eventId}</td>
                            <td>{reservations.numOfTickets}</td>
                            <td>{reservations.perTicketCharge}.00</td>
                            <td>{reservations.totalCharge}.00</td>
                            <td>{reservations.reservationDate}</td>
                            <td>{reservations.reservationTime}</td>
                            <td>
                              {reservations.status === "Available" ? (
                                <div
                                  style={{
                                    color: "rgb(14, 181, 14)",
                                    textAlign: "center",
                                  }}
                                >
                                  Available
                                </div>
                              ) : (
                                <div style={{ color: "red" }}>Not Sent</div>
                              )}
                            </td>
                            <td>
                              <button
                                className="text-warning btn"
                                onClick={() =>
                                  handleDelete(reservations.eventId)
                                }
                              >
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
  );
}
