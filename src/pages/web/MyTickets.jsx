import React, { useState } from 'react';
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import FooterRest from '../../components/layout/FooterRest'
import '../../styles/calendar.css';
import MyReservation from '../../components/other/MyReservation';
import useAuthCheck from '../../AuthCheck';
import EventCalendar from '../../components/other/EventCalendar';
import UserProfile from '../../components/other/UserProfile';

export default function MyTickets() {
  useAuthCheck();
  const [visibleDiv, setVisibleDiv] = useState(1);
  return (
    <div>
        <Header/>
            <div className='body-calender'>
                <button className={visibleDiv === 1 ? "btn btn-secondary" : "btn btn-primary"} onClick={() => setVisibleDiv(1)}><i class="fa-solid fa-list"></i><span className='gap'>My Reservation List</span></button>
                <button className={visibleDiv === 2 ? "btn btn-secondary mx-2" : "btn btn-primary mx-2"} onClick={() => setVisibleDiv(2)}><i class="fa-solid fa-calendar-days"></i><span className='gap'>Monthly Schedule</span></button>
                <button className={visibleDiv === 3 ? "btn btn-secondary mx-2" : "btn btn-primary mx-2"} onClick={() => setVisibleDiv(3)}><i class="fa-solid fa-user"></i><span className='gap'>My Profile</span></button>
                <div className='title-margin'>
                  <h2>My Tickets and Events</h2>
                </div>
                <div className={visibleDiv === 1 ? "visible" : "hidden"}>
                    <MyReservation/>
                </div>
                <div className={visibleDiv === 2 ? "visible" : "hidden"}>
                    <EventCalendar height={560}/>
                </div>
                <div className={visibleDiv === 3 ? "visible" : "hidden"}>
                    <UserProfile/>
                </div>
            </div>
        <Footer/>
        <FooterRest/>
    </div>
  )
}
