import React, { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import FooterRest from '../../components/layout/FooterRest'
import '../../styles/calendar.css';

export default function MyTickets() {
  const [visibleDiv, setVisibleDiv] = useState(1);
  return (
    <div>
        <Header/>
            <div className='body-calender'>
                <button className='btn btn-primary' onClick={() => setVisibleDiv(1)}>My Reservation List</button>
                <button className='btn btn-primary mx-2' onClick={() => setVisibleDiv(2)}>My Reservation Schedule</button>

                <div className={visibleDiv === 1 ? "visible" : "hidden"}>
                    div1
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
