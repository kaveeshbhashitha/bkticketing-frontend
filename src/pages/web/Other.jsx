import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import FooterRest from '../../components/layout/FooterRest'
import '../../styles/home.css';
import '../../styles/other.css';
import { Link } from 'react-router-dom';
import Chatbot from '../../components/chatbot/Chatbot';

export default function Other() {
    const [generalEvents, setGeneralEvents] = useState([]);
    const [error, setError] = useState("");
    const [className, setClassName] = useState("");

    useEffect(() => {
        // Fetch event data from backend
        axios.get("http://localhost:8080/generalEvent/getEventByType/Other")
          .then(response => {
            if (response.data && response.data.length > 0) {
                setGeneralEvents(response.data);
            } else {
              setError("No events found to display.");
            }
          })
          .catch(err => {
            setError("Error fetching event data.");
            setClassName('error-msg');
          });
      }, []);

  return (
    <div>
        <Header />
        <hr />
        <div className='content2'>
            <div className="breadcrumb">
            <i className="fa fa-home" aria-hidden="true"></i>  <Link to="/">Home</Link> &gt; <span>Other</span>
            </div></div>

            <div className="search2 hero-section">
                <div class="content">
                <h2>Other</h2>
                </div>
            </div>
  
    
            {/* Filter Buttons */}
         <div class="content2">   
            <div class="button-group">
                <button class="button active">All</button>
                <button class="button">Restaurants</button>
                <button class="button">Attractions</button>
                <button class="button">Transport</button>
                <button class="button">Vouchers</button>
                <button class="button">Hotel</button>
                <button class="button">Family</button>
                <button class="button">Children</button>
                </div>
            </div>


            <div className='event-title'>
                What’s happening <span>this month</span>
            </div>

            <div className={className}>
                {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i class="fa-solid fa-circle-exclamation pt-1"></i></div>)}
            </div>
            {generalEvents.length > 0 ? (
            <div className='event-container'>
                {generalEvents.map((event) => (
                <div class="image-box">
                    <div className='image-container'>
                        <img src={event.eventImagePath} alt="travel" className='display-image'/>
                        <div className='textforimg'>
                            <h4 className='mt-3'>{event.eventName}</h4>
                            <span><i class="fa-regular fa-calendar rightgap"></i>{event.eventDate} • {event.eventTime} IST</span><br/>
                            <span><i class="fa-solid fa-location-dot rightgap"></i>  At {event.eventVenue}</span><br/>
                            <span>{event.oneTicketPrice}.00 LKR upwards</span>
                        </div>
                        <div className='buybtn'>
                            <Link className='buytickets' to={`/selectTicket/${event.eventId}`}>Buy Tickets</Link>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            ) : (
                <div className="d-none" role="alert">
                No events to display.
                </div>
            )}

            <div class="midsection">
                <div class="content-info">
                    <div>
                        <h1 class="midtitle">Transfer & Resend Tickets</h1>
                    </div>
                    <div>
                        <p>Get registered with BkTicket to transfer and receive E-Ticket(s). <br /> Spread the joy by seamlessly transferring tickets to friends and <br /> family.</p>
                    </div>
                    <div class="infobutton">
                        <button class="resend">
                            <i class="fa fa-solid fa-arrow-rotate-right"></i> Resend e-Ticket
                        </button>
                        <button class="transfer">
                            <i class="fa-solid fa-retweet"></i> Transfer Ticket
                        </button>
                    </div>
                </div>
                <div class="infoback">
                    <img src="Images/file.png" alt="" />
                </div>
            </div>
        <Chatbot/>
        <Footer />
        <FooterRest />
    </div>
  )
}
