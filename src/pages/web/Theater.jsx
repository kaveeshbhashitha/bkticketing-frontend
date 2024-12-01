import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import FooterRest from '../../components/layout/FooterRest'
import '../../styles/home.css';
import { Link } from 'react-router-dom';
import Chatbot from '../../components/chatbot/Chatbot';

export default function Other() {
    const [Theater, setSportsEvents] = useState([]);
    const [error, setError] = useState("");
    const [className, setClassName] = useState("");
    


    useEffect(() => {
        // URLs for general events and sports events

        const sportEventUrls = [
            "http://localhost:8080/theater/getAllTheater" // Second URL for sports events
        ];

        // Function to fetch data from a list of URLs
        const fetchData = async (urls, setData) => {
            for (let i = 0; i < urls.length; i++) {
                try {
                    const response = await axios.get(urls[i]);
                    if (response.data && response.data.length > 0) {
                        setData(response.data);
                        setError(null); // Clear any previous error
                        return; // Exit the loop if data is fetched successfully
                    } else {
                        setError("No events found to display.");
                        setClassName('error-msg');
                    }
                } catch (err) {
                    console.error(`Failed to fetch from ${urls[i]}, trying next if available...`);
                }
            }
            setError("Error fetching event data."); // Set error if all URLs fail
            setClassName('error-msg');
        };

        // Fetch general events and sports events
        fetchData(sportEventUrls, setSportsEvents);

    }, []);


  return (
    <div>
        <Header />
        <hr />
        <div className='content2'>
            <div className="breadcrumb">
            <i className="fa fa-home" aria-hidden="true"></i>  <Link to="/">Home</Link> &gt; <span>Theater</span>
            </div></div>

            <div className="search2 hero-section">
                <div class="content">
                <h2>Theater</h2>
                </div>
            </div>
  
    
            {/* Filter Buttons */}
            
            <div className="filter-buttons">
            <button className="filter-btn active">Events</button>
            <button className="filter-btn">Movies</button>
            </div>

            <div className='event-title'>
                What’s happening <span>this month</span>
            </div>

            <div className={className}>
                {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i class="fa-solid fa-circle-exclamation pt-1"></i></div>)}
            </div>
            {Theater.length > 0 ? (
            <div className='event-container'>
                {Theater.map((event) => (
                <div class="image-box">
                    <div className='image-container'>
                        <img src={event.theaterImagePath} alt="travel" className='display-image'/>
                        <div className='textforimg'>
                            <h4 className='mt-3'>{event.eventName}</h4>
                            <span><i class="fa-regular fa-calendar rightgap"></i>{event.theaterDate} • {event.theaterTime1} IST</span><br/>
                            <span><i class="fa-solid fa-location-dot rightgap"></i>  At {event.theaterVenue}</span><br/>
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
