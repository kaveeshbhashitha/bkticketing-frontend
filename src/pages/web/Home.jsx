import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import FooterRest from '../../components/layout/FooterRest'
import '../../styles/home.css';
import '../../styles/other.css';
import { Link } from 'react-router-dom';
import Chatbot from '../../components/chatbot/Chatbot';


export default function Home() {
    const [generalEvents, setGeneralEvents] = useState([]);
    const [error, setError] = useState("");
    const [Sports, setSportsEvents] = useState([]);
    const [Theater, setTheaterEvents] = useState([]);
    const [className, setClassName] = useState("");

    const [searchQuery, setSearchQuery] = useState('');
    // States for filtered events (initially show all events)
    const [filteredGeneralEvents, setFilteredGeneralEvents] = useState([]);
    const [filteredSportsEvents, setFilteredSportsEvents] = useState([]);
    const [filteredTheaterEvents, setFilteredTheaterEvents] = useState([]);

    

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
                        setError("");
                        setClassName("none") // Clear any previous error
                        return; // Exit the loop if data is fetched successfully
                    } else {
                        setError("No events found to display.");
                        setClassName('error-msg');
                    }
                } catch (err) {
                    console.error(`Failed to fetch from ${urls[i]}, trying next if available...`);
                }
            }
            setError("Error fetching event data."); 
            setClassName('error-msg');
        };

        // Fetch general events and sports events
        fetchData(generalEventUrls, setGeneralEvents);
        fetchData(sportEventUrls, setSportsEvents);
        fetchData(TheaterEventUrls, setTheaterEvents);

    }, []);


 // Handle search button click
 const handleSearchClick = () => {
    // Filter events when the search button is clicked
    setFilteredGeneralEvents(filterEvents(generalEvents, searchQuery));
    setFilteredSportsEvents(filterEvents(Sports, searchQuery));
    setFilteredTheaterEvents(filterEvents(Theater, searchQuery));
};

 // Initially set filtered events to show all events
 useEffect(() => {
    setFilteredGeneralEvents(generalEvents);
    setFilteredSportsEvents(Sports);
    setFilteredTheaterEvents(Theater);
}, [generalEvents, Sports, Theater]);



 // Filter events based on search query
 const filterEvents = (events, query) => {
    if (!query) return events; // If no query, return all events
    return events.filter(event => 
        event.eventName.toLowerCase().includes(query.toLowerCase()) || 
        event.matchName?.toLowerCase().includes(query.toLowerCase()) ||
        event.theaterName?.toLowerCase().includes(query.toLowerCase())
    );
};


return (
    <div>
        <Header />
        <section className="search hero-section">
            <div className="content">
                <h2>Let’s Book Your Ticket</h2>
                <p>Discover your favorite entertainment right here</p>
                <div className="search-bar">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <input 
                        type="text" 
                        placeholder="Search by Artist, Event or Venue" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}  // Use searchQuery and setSearchQuery properly
                    />
                    <button type="submit" onClick={handleSearchClick}>Search</button>
                </div>
            </div>
        </section>
            {/* Search section end */}

            {/* chatbot */}
            {/* chatbot */}

            <div className='event-title'>
                What’s happening <span>this month</span>
            </div>

            <div className={className}>
                {error && (<div className="alert alert-warning d-flex justify-content-between">{error} <i class="fa-solid fa-circle-exclamation pt-1"></i></div>)}
            </div>

            {generalEvents.length > 0 ? (
            <div className='event-container'>
                {filteredGeneralEvents.map((event) => (
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

                {filteredSportsEvents.map((event) => (
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
                            <Link className='buytickets' to={`/selectTicket/${event.eventId}`}>Buy Tickets</Link>
                        </div>
                    </div>
                </div>
                ))}

                {filteredTheaterEvents.map((event) => (
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
