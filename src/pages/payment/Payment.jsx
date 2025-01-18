import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '../../styles/checkoutForm.css';
import '../../styles/continue.css'
import CheckoutForm from '../../components/other/CheckoutForm';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FooterRest from '../../components/layout/FooterRest';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51NHnWuSCKBfIrcyXTDjnlJ02Q1NrzvaXIcxUYJnMzxhs6m3YlOI6086oNufEMnQd76GPnFYFp3F4tpj74rShq3lH00L3MDtZ5i');

const Payment = () => {

    const { reservationId } = useParams();
  const [reservationData, setReservationData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [eventId, setEventId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/reservation/getReservationById/${reservationId}`,`https://bkticketing-backend-production.up.railway.app/reservation/getReservationById/${reservationId}`)
      .then((response) => {
        setReservationData(response.data);
        setEventId(response.data.eventId);
        setUserId(response.data.userId);
      })
      .catch((error) => {
        console.error('Unable to fetch reservation details.');
      });
  }, [reservationId]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/user/getUserById/${userId}`,`https://bkticketing-backend-production.up.railway.app/user/getUserById/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Unable to fetch user details.');
        });
    }
  }, [userId]);

  useEffect(() => {
    if (eventId) {
      axios.get(`http://localhost:8080/generalEvent/getEventById/${eventId}`,`https://bkticketing-backend-production.up.railway.app/generalEvent/getEventById/${eventId}`)
        .then((response) => {
          setEventData(response.data);
        })
        .catch((error) => {
          console.error('Unable to fetch event details.');
        });
    }
  }, [eventId]);

  return (
      <div>
        <Header/>
        <div className='hr'></div>
            <div>
                {reservationData && eventData && userData ? (
                <div className="payment-layout">
                    <div className="paymentfinal">
                    <img src={process.env.NODE_ENV === 'development' ? `http://localhost:8080${eventData.eventImagePath}` : `https://bkticketing-backend-production.up.railway.app${eventData.eventImagePath}`} alt="event" className='event-image' />
                    <div className="title">{eventData.eventName}</div>
                    <div className="organizer">Organized by <span className='undeline'>{eventData.eventOrganizer}</span></div>
                    <div className="date">Will be held on <span className='blue'>{eventData.eventDate}</span> at <span className='blue'>{eventData.eventTime}</span></div>
                    <div className="venue">in {eventData.eventVenue}</div>
                    <div className="price"><span className='red'>Rs.{eventData.oneTicketPrice}.00</span> Per one (Reserved {reservationData.numOfTickets}/{eventData.numOfTickets} Tickets)</div>
                    <div className="description">Reservation done by <a href='mailto:{userData.userEmail}'><span className='green'>{userData.firstName} {userData.lastName}</span></a></div>
                    <div className="price">Total Charge: ({reservationData.numOfTickets} x Rs.{eventData.oneTicketPrice}.00) <span className='red'> Rs.{reservationData.totalCharge}.00</span></div>
                </div>
                <div>
                    <Elements stripe={stripePromise}>
                    <CheckoutForm
                        reservationId={reservationId}
                        userId={userId}
                        userEmail={userData.userEmail}
                        amount={reservationData.totalCharge}
                    />
                    </Elements>
                </div>
                </div>
                ) : (
                <div>Loading event details...</div>
                )}
            </div>
        <Footer/>
        <FooterRest/>
      </div>
  );
};

export default Payment;