import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/calendar.css';

export default function MyReservation() {
  const [reservations, setReservations] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');

  let id = userId;

  useEffect(() => {
    const userEmail = sessionStorage.getItem('user');

    if (userEmail) {
      axios.get(`http://localhost:8080/user/getUserByEmail/${userEmail}`)
        .then((response) => {
          const userId = response.data.userId;
          setUserId(userId);
          return axios.get(`http://localhost:8080/reservation/getReservationByUserId/${userId}`);
        })
        .then(async (reservationResponse) => {
          const reservationData = reservationResponse.data;

          // Step 3: Fetch event details for each reservation based on eventId
          const eventDetailsPromises = reservationData.map((reservation) => 
            axios.get(`http://localhost:8080/generalEvent/getEventById/${reservation.eventId}`)
          );

          const eventsData = await Promise.all(eventDetailsPromises);

          // Step 4: Merge reservation and event details
          const mergedData = reservationData.map((reservation, index) => ({
            ...reservation,
            eventName: eventsData[index].data.eventName,
            eventDate: eventsData[index].data.eventDate,
            eventTime: eventsData[index].data.eventTime,
            eventVenue: eventsData[index].data.eventVenue,
            eventIsFor: eventsData[index].data.eventIsFor,
            eventImagePath: eventsData[index].data.eventImagePath
          }));

          setReservations(mergedData);
        })
        .catch((error) => {
          console.error('Error fetching user or reservation data:', error);
        });
    }
  }, []);

const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
        axios.delete(`http://localhost:8080/reservation/deleteReservation/${id}`)
            .then(() => {
                setReservations(reservations.filter(reservation => reservation.id !== id));
                setError("Reservation cancelled successfully");
            })
            .catch((error) => {
                console.error('Unable to delete the reservation.', error);
                setError("Failed to cancel reservation");
            });
    }
};

  return (
    <div>
      {error && (<div className='reservation-cancel'>{error} <i class="fa-solid fa-circle-exclamation pt-1"></i></div>)}
      <table>
        <thead>
          <tr>
            <th><i class="fa-solid fa-list"></i></th>
            <th><i class="fa-solid fa-calendar-days"></i></th>
            <th><i class="fa-regular fa-clock"></i></th>
            <th><i class="fa-solid fa-map-location"></i></th>
            <th><i class="fa-regular fa-flag"></i></th>
            <th><i class="fa-solid fa-money-check-dollar"></i></th>
            <th><i class="fa-solid fa-calculator"></i></th>
            <th><i class="fa-solid fa-person"></i></th>
            <th><i class="fa-regular fa-trash-can"></i></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservationId}>
              <td style={{textAlign:'left'}}>{reservation.eventName}</td>
              <td style={{textAlign:'center'}}>{reservation.eventDate}</td>
              <td style={{textAlign:'center'}}>{reservation.eventTime}</td>
              <td style={{textAlign:'center'}}>{reservation.eventVenue}</td>
              <td style={{textAlign:'center'}}>{reservation.numOfTickets}</td>
              <td style={{textAlign:'center'}}>{reservation.perTicketCharge}.00</td>
              <td style={{textAlign:'center'}}>{reservation.totalCharge}.00</td>
              <td style={{textAlign:'center'}}>{reservation.eventIsFor}</td>
              <td style={{textAlign:'center'}}>
                  <button className="text-warning btn" onClick={() => handleDelete(reservation.reservationId)}>
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{display:'none'}}>
          {id} 
      </div>
    </div>
  );
}
