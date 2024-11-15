import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import FooterRest from '../../components/layout/FooterRest'
import '../../styles/home.css';
import { Link } from 'react-router-dom';

export default function Home() {
    const [generalEvents, setGeneralEvents] = useState([]);
    const [error, setError] = useState("");
    const [Sports, setSportsEvents] = useState([]);
    const [Theater, setTheaterEvents] = useState([]);
    

    useEffect(() => {
        // URLs for general events and sports events
        const generalEventUrls = [
            "http://localhost:8080/generalEvent/getAllEvents"
        ];

        const sportEventUrls = [
            "http://localhost:8080/sport/getAllSport"
        ];

        const TheaterEventUrls = [
            "http://localhost:8080/theater/getAllTheater"
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
                    }
                } catch (err) {
                    console.error(`Failed to fetch from ${urls[i]}, trying next if available...`);
                }
            }
            setError("Error fetching event data."); // Set error if all URLs fail
        };

        // Fetch general events and sports events
        fetchData(generalEventUrls, setGeneralEvents);
        fetchData(sportEventUrls, setSportsEvents);
        fetchData(TheaterEventUrls, setTheaterEvents);

    }, []);

  return (
    <div>
        <Header />
        {/* Search section start */}
            <section class="search hero-section">
                <div class="content">
                    <h2>Let’s Book Your Ticket</h2>
                    <p>Discover your favorite entertainment right here</p>
                    <div class="search-bar">
                        <i class="fa fa-search" aria-hidden="true"></i> 
                        <input type="text" placeholder="Search by Artist, Event or Venue" />
                        <button type="submit">Search</button>
                    </div>
                </div>
            </section>
            {/* Search section end */}

            <div className='event-title'>
                What’s happening <span>this month</span>
            </div>

            <div className='error-msg'>
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

                {Sports.map((event) => (
                <div class="image-box">
                    <div className='image-container'>
                        <img src={event.matchImagePath} alt="travel" className='display-image'/>
                        <div className='textforimg'>
                            <h4 className='mt-3'>{event.eventName}</h4>
                            <span><i class="fa-regular fa-calendar rightgap"></i>{event.matchDate} • {event.matchTime} IST</span><br/>
                            <span><i class="fa-solid fa-location-dot rightgap"></i>  At {event.matchVenue}</span><br/>
                            <span>{event.oneTicketPrice}.00 LKR upwards</span>
                        </div>
                        <div className='buybtn'>
                            <Link className='buytickets' to={`/selectTicket/${event.matchtId}`}>Buy Tickets</Link>
                        </div>
                    </div>
                </div>
                ))}

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

        <Footer />
        <FooterRest />
    </div>
  )
}
