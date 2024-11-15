import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/calendar.css';

export default function MyReservation() {
  const [reservations, setReservations] = useState([]);
  const [userId, setUserId] = useState(null);

  let id = userId;

  useEffect(() => {
    const userEmail = sessionStorage.getItem('user');

    if (userEmail) {
      // Step 1: Get user ID by email
      axios.get(`http://localhost:8080/user/getUserByEmail/${userEmail}`)
        .then((response) => {
          const userId = response.data.userId;
          setUserId(userId);

          // Step 2: Fetch reservations for this user ID
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

  return (
    <div>
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
            <th><i class="fa-regular fa-images"></i></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservationId}>
              <td>{reservation.eventName}</td>
              <td className='text-center'>{reservation.eventDate}</td>
              <td>{reservation.eventTime}</td>
              <td>{reservation.eventVenue}</td>
              <td>{reservation.numOfTickets}</td>
              <td>{reservation.perTicketCharge}.00</td>
              <td className='right'>{reservation.totalCharge}.00</td>
              <td>{reservation.eventIsFor}</td>
              <td><a href={reservation.eventImagePath} target="blank"><i class="fa-regular fa-image"></i></a></td>
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
