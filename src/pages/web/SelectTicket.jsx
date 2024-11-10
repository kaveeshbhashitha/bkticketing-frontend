import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FooterRest from '../../components/layout/FooterRest';
import '../../styles/select.css';

export default function SelectTicket() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [numTickets, setNumTickets] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [oneTicketPrice, setOneTicketPrice] = useState(0);

  // Fetch event details
  useEffect(() => {
    axios.get(`http://localhost:8080/generalEvent/getEventById/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        setOneTicketPrice(response.data.oneTicketPrice);
      })
      .catch(() => {
        setError('Unable to fetch event details.');
      });
  }, [eventId]);

  // Fetch user details by email
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setUserEmail(user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:8080/user/getUserByEmail/${userEmail}`)
        .then((response) => {
          setUserId(response.data.userId);
          setUserName(response.data.firstName);
          setLastName(response.data.lastName);
        })
        .catch(() => {
          setError('Unable to fetch user details.');
        });
    }
  }, [userEmail]);

  // Update total price when `numTickets` or `oneTicketPrice` changes
  useEffect(() => {
    setTotalPrice(numTickets * oneTicketPrice);
  }, [numTickets, oneTicketPrice]);

  // Handle changes in the number of tickets
  const handleTicketChange = (e) => {
    setNumTickets(parseInt(e.target.value, 10) || 0); // Prevent NaN values
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      userId,
      eventId: event?.eventId,
      numOfTickets: numTickets,
      perTicketCharge: oneTicketPrice,
      totalCharge: totalPrice,
    };

    try {
      const response = await axios.post('http://localhost:8080/reservation/addReservation', reservationData);
      if (response.status === 200) {
        console.log('Reservation successful...!');
        navigate(`/payment/${response.data.reservationId}`)
      } else {
        setError('Failed to make reservation. Please try again.');
      }
    } catch (error) {
      setError('Error making reservation. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <Header />

      <div className="event-containers">
        {event ? (
          <div className="event-details">
            <div className="left-column">
              <div className="title up">Complete Your Ticket Reservation</div>
              <img src={`http://localhost:8080${event.eventImagePath}`} alt="event" className="select-image" />
              <div className="title">• {event.eventName}</div>
              <div className="organizer">Organized by <span className='undeline'>{event.eventOrganizer}</span></div>
              <div className="date">{event.eventType} will be held on <span className='blue'>{event.eventDate}</span> at <span className='blue'>{event.eventTime}</span></div>
              <div className="venue">in {event.eventVenue}</div>
              <div className="price"><span className='red'>Rs.{event.oneTicketPrice}.00</span> Per one (Available 0/{event.numOfTickets} Tickets)</div>
              <div className="description">{event.description}</div>
              <div className="description">Event is for <span className='green'>{event.eventIsFor}</span> only</div>
            </div>
            <div className="right-column">
              <form className="ticket-form">

                <div className='nameandemail'>
                    <div className='fieldone'>
                        <label htmlFor="userEmail">User Email</label>
                        <input type="email" id="userEmail" value={userEmail} readOnly />
                    </div>
                    <div className='fieldtwo'>
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" value={`${userName} ${lastName}`} readOnly />
                    </div>
                </div>
                <div className="none">
                  <label htmlFor="userId">User ID</label>
                  <input type="text" id="userId" value={userId} readOnly />
                  <label htmlFor="userId">Event ID</label>
                  <input type="text" id="userId" value={event.eventId} readOnly />
                </div>

                <label htmlFor="ticketPrice">Per One Ticket Price</label>
                <input type="text" id="ticketPrice" value={`Rs.${oneTicketPrice}.00`} readOnly />

                <label htmlFor="tickets">Number of Tickets</label>
                <input type="number" id="tickets" min="1" max="10" value={numTickets} onChange={handleTicketChange}/>

                <label htmlFor="totalCharge">Total Charge</label>
                <input type="text" id="totalCharge" value={`Rs.${totalPrice}.00`} readOnly />

                <button type="submit" className="submit-btn" onClick={handleSubmit}>Reserve Now</button>
              </form>
            </div>
          </div>
        ) : (
          <div>Loading event details...</div>
        )}
      </div>

      <Footer />
      <FooterRest />
    </div>
  );
}
