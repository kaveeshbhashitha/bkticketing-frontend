import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import FooterRest from "../../components/layout/FooterRest";
import "../../styles/home.css";
import "../../styles/other.css";
import { Link } from "react-router-dom";
import Chatbot from "../../components/chatbot/Chatbot";

export default function Other() {
  const [sports, setSportsEvents] = useState([]);
  const [filteredSports, setFilteredSports] = useState([]); // State for filtered events
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date

  useEffect(() => {
    // Fetch event data from backend
    axios
      .get("http://localhost:8080/sport/getAllSport","https://bkticketing-backend-production.up.railway.app/sport/getAllSport")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setSportsEvents(response.data);
          setFilteredSports(response.data); // Set initial filtered events
        } else {
          setError("No events found to display.");
        }
      })
      .catch((err) => {
        setError("Error fetching event data.");
      });
  }, []);

  // Handle date filter
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    if (date) {
      const filtered = sports.filter((event) => event.matchDate === date);
      setFilteredSports(filtered);
    } else {
      setFilteredSports(sports); // Show all events if no date is selected
    }
  };

  const hasEvents =
   sports.length > 0;

  return (
    <div>
      <Header />
      <hr />
      <div className="content2">
        <div className="breadcrumb">
          <i className="fa fa-home" aria-hidden="true"></i>{" "}
          <Link to="/">Home</Link> &gt; <span>Sports</span>
        </div>
      </div>

      <div className="search2 hero-section">
        <div className="content">
          <h2>Sports</h2>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="content2">
        <div className="button-group">
          <button className="button active">All</button>
          <button className="button">Restaurants</button>
          <button className="button">Attractions</button>
          <button className="button">Transport</button>
          <button className="button">Vouchers</button>
          <button className="button">Hotel</button>
          <button className="button">Family</button>
          <button className="button">Children</button>
        </div>
      </div>

      <div className="event-title">
        What’s happening <span>this month</span>
      </div>

      {hasEvents && (
        <div className="date-filter-container">
          <i className="fa-solid fa-sliders"></i>
          <label htmlFor="date-filter">
            Filter by events by date here
          </label>
          <input
            type="date"
            id="date-filter"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      )} {" "} <br /><br />

      <div className="space"></div>

      {error && (
        <div className="error-msg">
          <div className="alert alert-warning d-flex justify-content-between">
            {error} <i className="fa-solid fa-circle-exclamation pt-1"></i>
          </div>
        </div>
      )}

      {filteredSports.length > 0 ? (
        <div className="event-container">
          {filteredSports.map((event) => (
            <div className="image-box" key={event.matchId}>
              <div className="image-container">
                <img
                  src={event.matchImagePath}
                  alt="travel"
                  className="display-image"
                />
                <div className="textforimg">
                  <h4 className="mt-3" title={event.eventName}>
                    {event.eventName.length > 20
                      ? `${event.eventName.substring(0, 26)}...`
                      : event.eventName}
                  </h4>
                  <span>
                    <i className="fa-regular fa-calendar rightgap"></i>
                    {event.matchDate} • {event.matchTime} IST
                  </span>
                  <br />
                  <span>
                    <i className="fa-solid fa-location-dot rightgap"></i> At {" "}
                    {event.matchVenue}
                  </span>
                  <br />
                  <span>{event.oneTicketPrice}.00 LKR upwards</span>
                </div>
                <div className="buybtn">
                  <Link
                    className="buytickets"
                    to={`/selectTicket/${event.matchId}`}
                  >
                    <span className="buy">Buy Tickets</span>
                  </Link>
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

      <div className="midsection">
        <div className="content-info">
          <div>
            <h1 className="midtitle">Transfer & Resend Tickets</h1>
          </div>
          <div>
            <p>
              Get registered with BkTicket to transfer and receive E-Ticket(s). {" "}
              <br /> Spread the joy by seamlessly transferring tickets to
              friends and <br /> family.
            </p>
          </div>
          <div className="infobutton">
            <button className="resend">
              <i className="fa fa-solid fa-arrow-rotate-right"></i> Resend
              e-Ticket
            </button>
            <button className="transfer">
              <i className="fa-solid fa-retweet"></i> Transfer Ticket
            </button>
          </div>
        </div>
        <div className="infoback">
          <img src="Images/file.png" alt="" />
        </div>
      </div>
      <Chatbot />
      <Footer />
      <FooterRest />
    </div>
  );
}
