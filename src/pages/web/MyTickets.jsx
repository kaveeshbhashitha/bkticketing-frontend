import React, { useState } from 'react';
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import FooterRest from '../../components/layout/FooterRest'
import '../../styles/calendar.css';
import MyReservation from '../../components/other/MyReservation';
import useAuthCheck from '../../AuthCheck';

export default function MyTickets() {
  useAuthCheck();
  const [visibleDiv, setVisibleDiv] = useState(1);
  return (
    <div>
        <Header/>
            <div className='body-calender'>
                <button className='btn btn-primary' onClick={() => setVisibleDiv(1)}><i class="fa-solid fa-list"></i><span className='gap'>My Reservation List</span></button>
                <button className='btn btn-primary mx-2' onClick={() => setVisibleDiv(2)}><i class="fa-solid fa-calendar-days"></i><span className='gap'>My Reservation Schedule</span></button>
                <div className='title-margin'>
                  <h2>My Tickets and Events</h2>
                </div>
                <div className={visibleDiv === 1 ? "visible" : "hidden"}>
                    <MyReservation/>
                </div>
                <div className={visibleDiv === 2 ? "visible" : "hidden"}>
                    div2
                </div>
            </div>
        <Footer/>
        <FooterRest/>
    </div>
  )
}
