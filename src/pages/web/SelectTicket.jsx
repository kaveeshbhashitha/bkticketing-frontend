import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FooterRest from '../../components/layout/FooterRest';
import '../../styles/select.css'

export default function SelectTicket() {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
      axios.get(`http://localhost:8080/generalEvent/getEventById/${eventId}`)
          .then((response) => {
              setEvent(response.data);
          })
          .catch((error) => {
              setError('Unable to fetch event details.');
          });
  }, [eventId]);

  useEffect(() => {
      if (userEmail) {
          axios.get(`http://localhost:8080/user/getUserByEmail/${userEmail}`)
              .then((response) => {
                  setUserId(response.data.userId);
                  setUserName(response.data.firstName);
                  setLastName(response.data.lastName);
              })
              .catch((error) => {
                  setError('Unable to fetch user details.');
              });
      }
  }, [userEmail]);

  if (error) {
      return <div className="alert alert-danger">{error}</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
      const user = sessionStorage.getItem('user');
      if (user) {
          setUserEmail(user);
      } else {
          navigate('/login');
      }
  }, [navigate]);

  return (
    <div>
        <Header/>

        <div className="event-containers">
            {event ? (
                <div className="event-details">
                    <div className="left-column">
                        <div className='title up'>Complete Your Ticket Reservation</div>
                        <img src={`http://localhost:8080${event.eventImagePath}`} alt="event" className="select-image"/>
                        <div className="title">• {event.eventName}</div>
                        <div className="organizer">Organized by <span className='undeline'>{event.eventOrganizer}</span></div>
                        <div className="date">{event.eventType} will be held on <span className='blue'>{event.eventDate}</span> at <span className='blue'>{event.eventTime}</span> on time</div>
                        <div className="venue">in {event.eventVenue}</div>
                        <div className="price"><span className='red'>Rs.{event.oneTicketPrice}.00</span> Per one (Available 0/{event.numOfTickets} Tickets)</div>
                        <div className="description">{event.description}</div>
                        <div className="description">Event is for <span className='green'>{event.eventIsFor}</span> only</div>
                    </div>
                    <div className="right-column">
                        <form className="ticket-form">
                            <label htmlFor="email">User Email</label>
                            <input type="email" id="email" placeholder="Your email" value={userEmail} readOnly/>

                            <div className="none">
                              <label htmlFor="email">User Email</label>
                              <input type="email" id="email" placeholder="Your email" value={userId} readOnly/>
                            </div>

                            <label htmlFor="email">Full Name</label>
                            <input type="email" id="email" placeholder="Your email" value={`${userName} ${lastName}`} readOnly/>

                            <label htmlFor="email">Per one Ticket Price</label>
                            <input type="email" id="email" placeholder="Your email" value={`Rs.${event.oneTicketPrice}.00`} readOnly/>
                            
                            <label htmlFor="tickets">Number of Tickets</label>
                            <input type="number" id="tickets" min="1" max="10" placeholder="1" required />
                            
                            <label htmlFor="otherInfo">Additional Info</label>
                            <textarea id="otherInfo" placeholder="Any special requests" rows="3"></textarea>
                            
                            <button type="submit" className="submit-btn">Reserve Now</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div>Loading event details...</div>
            )}
        </div>

        <Footer/>
        <FooterRest/>

        <div className='error-msg'>
            {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i class="fa-solid fa-circle-exclamation pt-1"></i></div>)}
        </div>

        
    </div>
  )
}
